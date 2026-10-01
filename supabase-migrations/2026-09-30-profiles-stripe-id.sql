-- Migração: coluna `stripe_id` em `profiles` (ID do customer no Stripe).
-- Contexto: api/stripe-webhook.js grava `stripe_id` ao ativar o plano pro e o procura ao
-- rebaixar (customer.subscription.deleted/updated); api/create-checkout-session.js o lê para
-- reaproveitar o customer. A coluna NUNCA tinha sido criada por nenhuma migration — no banco
-- real `profiles` não tem `stripe_id` (confirmado em 2026-10-01). Sem ela o webhook falhava
-- em silêncio e a trigger `profiles_protege_billing` (2026-10-01) quebraria todo INSERT/UPDATE.
--
-- Deve rodar ANTES de 2026-10-01-profiles-protege-billing. Idempotente.
-- Rollback: down/2026-09-30-profiles-stripe-id.down.sql

alter table public.profiles add column if not exists stripe_id text;

-- Busca do webhook por customer (rebaixe de plano).
create index if not exists idx_profiles_stripe_id on public.profiles (stripe_id)
  where stripe_id is not null;

insert into public.schema_migrations (version) values ('2026-09-30-profiles-stripe-id')
  on conflict (version) do nothing;
