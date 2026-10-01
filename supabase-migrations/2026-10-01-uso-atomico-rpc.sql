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
