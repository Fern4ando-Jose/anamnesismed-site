-- Rollback de 2026-09-30-profiles-stripe-id.
-- ⚠️ Rode ANTES o down de 2026-10-01-profiles-protege-billing (a trigger usa stripe_id) e
-- saiba que apagar a coluna perde o vínculo usuário↔customer do Stripe (webhook de rebaixe
-- e checkout deixam de funcionar).

drop index if exists public.idx_profiles_stripe_id;
alter table public.profiles drop column if exists stripe_id;

delete from public.schema_migrations where version = '2026-09-30-profiles-stripe-id';
