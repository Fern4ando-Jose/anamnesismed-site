-- Rollback de 2026-06-28-stripe-events-idempotencia.sql
-- Remove a tabela de idempotência do webhook Stripe.
-- ⚠️ Sem ela, o webhook segue funcionando (a assinatura é validada por constructEvent),
--    mas SEM dedup — uma reentrega do Stripe pode reprocessar a ativação da assinatura.

drop table if exists public.stripe_events;

delete from public.schema_migrations where version = '2026-06-28-stripe-events-idempotencia';
