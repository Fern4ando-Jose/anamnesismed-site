-- Migração: tabela `contas_em_exclusao` (marca "esta conta está sendo excluída").
-- Contexto (corrida na exclusão): /api/excluir-conta cancelava a assinatura no Stripe e só depois
-- apagava o perfil; nesse intervalo o usuário podia abrir um NOVO checkout e pagar uma conta que
-- está sumindo; e, se o perfil já tivesse sido apagado, o `checkout.session.completed` posterior
-- dava 500 para sempre no webhook (o Stripe reentrega por dias).
--
-- Solução: ANTES de qualquer efeito colateral, a exclusão grava o user_id aqui.
--   - /api/create-checkout-session recusa (409 `conta_em_exclusao`) quem está marcado;
--   - /api/stripe-webhook trata checkout de conta marcada/inexistente como SUCESSO idempotente
--     (200), com log de ALERTA, e cancela a assinatura recém-criada (best effort).
-- A tabela NÃO tem FK para auth.users DE PROPÓSITO: a marca precisa sobreviver à exclusão do login
-- (é ela que reconhece o checkout tardio). Guarda só um uuid e uma data (sem e-mail nem dado clínico).
-- Só a service_role lê/grava: o usuário não consegue limpar a própria marca.
-- Retenção: linhas com mais de ~30 dias podem ser apagadas (checkout/webhook já não chegam) —
--   `delete from public.contas_em_exclusao where iniciado_em < now() - interval '30 days';`
--
-- ⚠️ AÇÃO MANUAL DO DONO: rodar ANTES do deploy do código novo (create-checkout-session e
-- excluir-conta falham fechado — 503 — se a tabela não existir). Idempotente.
-- Rollback: down/2026-10-03-contas-em-exclusao.down.sql

create table if not exists public.contas_em_exclusao (
  user_id     uuid primary key,
  iniciado_em timestamptz not null default now()
);

alter table public.contas_em_exclusao enable row level security;
revoke all on table public.contas_em_exclusao from public, anon, authenticated;
grant select, insert, update, delete on table public.contas_em_exclusao to service_role;

insert into public.schema_migrations (version) values ('2026-10-03-contas-em-exclusao')
  on conflict (version) do nothing;

-- ── Verificação (SQL Editor, como dono) ─────────────────────────────────────────────────────
--   select has_table_privilege('authenticated', 'public.contas_em_exclusao', 'select');  -- false
--   -- teste executável: supabase-migrations/tests/2026-10-03-contas-em-exclusao.test.sql
