-- Rollback de 2026-10-04-stripe-events-lease.sql
-- Remove `status`/`processing_desde` de stripe_events (o webhook novo tolera a ausência: sem lease, duplicado = já
-- processado). Os GRANTs revogados NÃO são devolvidos a anon/authenticated (continuam protegidos por RLS sem policy).
drop index if exists public.idx_stripe_events_received_at;
alter table public.stripe_events drop constraint if exists stripe_events_status_check;
alter table public.stripe_events drop column if exists status;
alter table public.stripe_events drop column if exists processing_desde;
delete from public.schema_migrations where version = '2026-10-04-stripe-events-lease';
