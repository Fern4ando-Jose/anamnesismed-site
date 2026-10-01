-- Migração: (1) RPC `devolver_cota_ia` e (2) `search_path` fixo nas funções SECURITY DEFINER/triggers.
--
-- (1) Contexto: /api/gerar-hc e /api/assistente-dx consomem a cota diária ANTES de chamar a API
--     paga (atômico, via `consumir_cota_ia`, para o teto de custo valer sob concorrência). Se o
--     modelo falha (erro, timeout, 5xx), o usuário perdia uma unidade da cota sem receber o
--     serviço. Agora as rotas chamam `devolver_cota_ia(user, rota)` nesse caso.
--     Contrato: devolve o novo contador do DIA UTC corrente (0 se nada a devolver). NUNCA
--     fica abaixo de 0 (`where count > 0`) e nunca cria linha. Limitação aceita: se a chamada
--     cruzar a meia-noite UTC, a devolução cai no contador do dia novo (no máximo 1 unidade).
--     Rotas válidas: 'gerar-hc' e 'assistente-dx' (mesmas de `consumir_cota_ia`).
--     Só a service_role executa — usuário comum NÃO pode chamar via anon key (senão zeraria o
--     próprio contador e furaria o teto de custo).
--
-- (2) Contexto: função SECURITY DEFINER (ou trigger) sem `search_path` fixo é vulnerável a
--     sequestro de objetos (um schema na frente do path com função/tabela homônima). Fixamos
--     `public, pg_temp` (pg_temp por ÚLTIMO, para que tabelas temporárias nunca sombreiem as reais)
--     em TODAS as funções das migrations 2026-10-01-* (recriadas abaixo com `create or replace`,
--     mesmo corpo + search_path) e nas funções anteriores (via `alter function`, só se existirem).
--
-- ⚠️ AÇÃO MANUAL DO DONO: rodar no SQL Editor do Supabase (projeto AnamnesisMed) — antes do
-- deploy do código que chama `devolver_cota_ia` (sem ela as rotas só logam o alerta e seguem; a
-- cota simplesmente não é devolvida). Pré-requisitos: migrations 2026-06-14, 2026-06-28 e 2026-10-01-*.
-- Idempotente. Rollback: down/2026-10-02-devolver-cota-e-search-path.down.sql

-- ── 1) consumir_cota_ia: mesmo corpo da 2026-10-01, agora com search_path = public, pg_temp ──
create or replace function public.consumir_cota_ia(p_user_id uuid, p_rota text, p_limite integer)
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_dia date := (now() at time zone 'utc')::date;
  v_count integer;
begin
  if p_user_id is null or p_limite is null or p_limite < 1 then
    raise exception 'parametros invalidos';
  end if;

  if p_rota = 'gerar-hc' then
    insert into public.gerar_hc_usage as t (user_id, dia, count)
    values (p_user_id, v_dia, 1)
    on conflict (user_id, dia) do update set count = t.count + 1
      where t.count < p_limite
    returning t.count into v_count;
  elsif p_rota = 'assistente-dx' then
    insert into public.ai_assistant_usage as t (user_id, dia, count)
    values (p_user_id, v_dia, 1)
    on conflict (user_id, dia) do update set count = t.count + 1
      where t.count < p_limite
    returning t.count into v_count;
  else
    raise exception 'rota desconhecida: %', p_rota;
  end if;

  -- v_count NULL = o `where count < limite` barrou o update → limite atingido.
  return coalesce(v_count, -1);
end;
$$;

revoke all on function public.consumir_cota_ia(uuid, text, integer) from public, anon, authenticated;
grant execute on function public.consumir_cota_ia(uuid, text, integer) to service_role;

-- ── 2) devolver_cota_ia: devolve 1 unidade (nunca abaixo de 0) ──────────────────────────────
create or replace function public.devolver_cota_ia(p_user_id uuid, p_rota text)
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_dia date := (now() at time zone 'utc')::date;
  v_count integer;
begin
  if p_user_id is null then
    raise exception 'parametros invalidos';
  end if;

  if p_rota = 'gerar-hc' then
    update public.gerar_hc_usage as t
       set count = t.count - 1
     where t.user_id = p_user_id and t.dia = v_dia and t.count > 0
    returning t.count into v_count;
  elsif p_rota = 'assistente-dx' then
    update public.ai_assistant_usage as t
       set count = t.count - 1
     where t.user_id = p_user_id and t.dia = v_dia and t.count > 0
    returning t.count into v_count;
  else
    raise exception 'rota desconhecida: %', p_rota;
  end if;

  -- v_count NULL = não havia linha do dia ou já estava em 0 → nada a devolver.
  return coalesce(v_count, 0);
end;
$$;

revoke all on function public.devolver_cota_ia(uuid, text) from public, anon, authenticated;
grant execute on function public.devolver_cota_ia(uuid, text) to service_role;

-- ── 3) profiles_protege_billing: mesmo corpo da 2026-10-01, agora com search_path fixo ───────
create or replace function public.profiles_protege_billing()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  -- auth.role() lê o claim `role` do JWT da requisição. NULL (SQL Editor, gatilho de
  -- cadastro, conexões diretas) e 'service_role' passam livres.
  if coalesce(auth.role(), 'service_role') not in ('authenticated', 'anon') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.plano     := 'trial';
    new.trial_end := now() + interval '30 days';
    new.stripe_id := null;
  else
    new.plano     := old.plano;
    new.stripe_id := old.stripe_id;
    new.trial_end := coalesce(old.trial_end, now() + interval '30 days');
  end if;
  return new;
end;
$$;

-- ── 4) Funções das migrations anteriores: só fixa o search_path (se existirem) ───────────────
do $$
declare
  f text;
begin
  foreach f in array array[
    'public.handle_new_user()',              -- 2026-06-08 (SECURITY DEFINER)
    'public.touch_ai_assistant_usage()',     -- 2026-06-14 (trigger)
    'public.touch_gerar_hc_usage()'          -- 2026-06-28 (trigger)
  ] loop
    if to_regprocedure(f) is not null then
      execute format('alter function %s set search_path = public, pg_temp', f);
    end if;
  end loop;
end;
$$;

-- ── 5) Rede de segurança: re-rodar a 2026-06-23 (antiga, não-idempotente nas policies de
--    historias_clinicas) recria a policy FOR ALL em `profiles`, que reabre o DELETE do próprio
--    perfil (reinício de trial). Esta migration a remove de novo, sem mexer nas policies por operação.
drop policy if exists "usuario_acessa_proprio_perfil" on public.profiles;

insert into public.schema_migrations (version) values ('2026-10-02-devolver-cota-e-search-path')
  on conflict (version) do nothing;

-- ── Verificação (SQL Editor, como dono) ─────────────────────────────────────────────────────
--   -- nenhuma função do schema public sem search_path fixo (esperado: 0 linhas):
--   select p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public' and (p.prosecdef or p.prorettype = 'trigger'::regtype)
--      and not exists (select 1 from unnest(coalesce(p.proconfig, '{}')) c where c like 'search_path=%');
--   -- testes executáveis: supabase-migrations/tests/*.sql (ver README)
