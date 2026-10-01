-- ============================================================
-- APLICAR-TUDO.sql — cola UMA vez no SQL Editor do Supabase e clica Run.
-- Contém, na ordem certa, as 3 migrations novas (2026-10-01 e 2026-10-02).
-- NÃO rode migrations antigas de novo.
-- ============================================================

-- >>>>>>>>>> 2026-10-01-profiles-protege-billing.sql
-- Migração: impede escalada de plano em `profiles` (usuário alterando o próprio plano).
-- Contexto: a policy `usuario_acessa_proprio_perfil` (2026-06-23) é FOR ALL com
-- `using/with check (id = auth.uid())` — protege a LINHA, não as COLUNAS. Qualquer usuário
-- logado podia rodar, do navegador (chave anon + JWT dele):
--     supabase.from('profiles').update({ plano: 'pro' }).eq('id', <meu id>)
-- e ganhar o plano pago sem pagar. Também podia estender `trial_end` ou apagar o próprio
-- perfil e recriá-lo para reiniciar o trial.
--
-- Correção (duas camadas):
--  1) Policies separadas: SELECT/INSERT/UPDATE do próprio perfil; SEM policy de DELETE.
--  2) Trigger BEFORE INSERT/UPDATE que, para chamadas vindas do cliente (role `authenticated`
--     ou `anon`), força as colunas de billing: `plano`, `trial_end`, `stripe_id`.
--     - INSERT: plano='trial', trial_end = now()+30 dias, stripe_id = null.
--     - UPDATE: mantém o valor antigo (a mudança é silenciosamente descartada).
--       Exceção: `trial_end` antigo NULL (perfil legado) recebe now()+30 dias.
--     A service_role (webhook do Stripe), o SQL Editor e o gatilho `handle_new_user`
--     (role sem JWT) NÃO são afetados — por isso o webhook continua ativando o plano.
--  Por que trigger e não REVOKE/GRANT por coluna: o front (supabase-integration.js) faz
--  `upsert` com `plano` e `trial_end` no payload (cadastro/primeiro acesso). Com GRANT por
--  coluna esse upsert passaria a dar erro 42501; com o trigger ele segue funcionando e o
--  servidor decide os valores. Colunas que o cliente realmente grava hoje (preservadas):
--  id, email, nome, sobrenome, universidade, ano_curso, idioma, termos_aceitos, tipo_usuario.
--
-- ⚠️ AÇÃO MANUAL DO DONO: rodar este arquivo no SQL Editor do Supabase (projeto AnamnesisMed).
-- Idempotente — seguro re-rodar. Rollback: down/2026-10-01-profiles-protege-billing.down.sql

-- ── 1) Policies por operação (sem DELETE) ──────────────────────────────────
alter table public.profiles enable row level security;

drop policy if exists "usuario_acessa_proprio_perfil" on public.profiles;
drop policy if exists "usuario_ve_proprio_perfil" on public.profiles;
drop policy if exists "usuario_cria_proprio_perfil" on public.profiles;
drop policy if exists "usuario_atualiza_proprio_perfil" on public.profiles;

create policy "usuario_ve_proprio_perfil"
  on public.profiles for select
  using (id = auth.uid());

create policy "usuario_cria_proprio_perfil"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "usuario_atualiza_proprio_perfil"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ── 2) Trigger que protege as colunas de billing ───────────────────────────
create or replace function public.profiles_protege_billing()
returns trigger
language plpgsql
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

drop trigger if exists trg_profiles_protege_billing on public.profiles;

create trigger trg_profiles_protege_billing
before insert or update on public.profiles
for each row execute procedure public.profiles_protege_billing();

-- ── Registro ───────────────────────────────────────────────────────────────
insert into public.schema_migrations (version) values ('2026-10-01-profiles-protege-billing')
  on conflict (version) do nothing;

-- ── Verificação (rodar manualmente após aplicar) ───────────────────────────
--   select policyname, cmd from pg_policies where schemaname='public' and tablename='profiles';
--   -- esperado: select / insert / update (nenhum delete / all)
--   -- Teste real: logado como usuário comum (anon key + JWT), no console do navegador:
--   --   await sb.from('profiles').update({plano:'pro'}).eq('id', (await sb.auth.getUser()).data.user.id)
--   --   e depois reler o perfil: `plano` deve continuar 'trial'.

-- >>>>>>>>>> 2026-10-01-uso-atomico-rpc.sql
-- Migração: função RPC atômica de cota diária de IA (`consumir_cota_ia`).
-- Contexto: /api/gerar-hc e /api/assistente-dx faziam SELECT + UPSERT (ler, somar, gravar):
-- requisições concorrentes liam o mesmo valor e furavam o limite diário (custo da API).
-- Esta função faz tudo em UMA instrução SQL (insert ... on conflict do update ... where
-- count < limite ... returning), que o Postgres serializa por linha.
--
-- Contrato: retorna o novo contador (1..limite) quando a cota foi consumida, ou -1 quando
-- o limite diário já foi atingido (nada é incrementado). Rotas válidas: 'gerar-hc'
-- (tabela gerar_hc_usage) e 'assistente-dx' (tabela ai_assistant_usage) — pré-requisito:
-- as migrations 2026-06-14 e 2026-06-28 já aplicadas. Dia = data UTC.
--
-- Só a service_role (backend) pode executar — usuário comum NÃO pode chamar via anon key.
-- IMPORTANTE — FAIL-CLOSED: sem esta função, as duas rotas devolvem 503 e NÃO chamam a
-- API paga. ⚠️ AÇÃO MANUAL DO DONO: rodar no SQL Editor do Supabase ANTES do deploy do código.
-- Idempotente. Rollback: down/2026-10-01-uso-atomico-rpc.down.sql

create or replace function public.consumir_cota_ia(p_user_id uuid, p_rota text, p_limite integer)
returns integer
language plpgsql
security definer
set search_path = public
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

insert into public.schema_migrations (version) values ('2026-10-01-uso-atomico-rpc')
  on conflict (version) do nothing;

-- ── Verificação (SQL Editor, como dono) ────────────────────────────────────
--   select public.consumir_cota_ia('<uuid de um usuário>', 'gerar-hc', 40);  -- 1, 2, 3...

-- >>>>>>>>>> 2026-10-02-devolver-cota-e-search-path.sql
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
