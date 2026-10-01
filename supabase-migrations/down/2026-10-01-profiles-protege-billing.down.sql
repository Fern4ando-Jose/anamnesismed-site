-- Rollback de 2026-10-01-profiles-protege-billing.sql
-- ⚠️ SEGURANÇA: REABRE a escalada de plano (qualquer usuário logado volta a poder
--    gravar plano='pro' / trial_end / stripe_id no próprio perfil e a apagar o perfil).
--    Só use se o trigger estiver quebrando algo. O RLS em si fica LIGADO.

drop trigger if exists trg_profiles_protege_billing on public.profiles;
drop function if exists public.profiles_protege_billing();

drop policy if exists "usuario_ve_proprio_perfil" on public.profiles;
drop policy if exists "usuario_cria_proprio_perfil" on public.profiles;
drop policy if exists "usuario_atualiza_proprio_perfil" on public.profiles;
drop policy if exists "usuario_acessa_proprio_perfil" on public.profiles;

create policy "usuario_acessa_proprio_perfil"
  on public.profiles
  for all
  using (id = auth.uid())
  with check (id = auth.uid());

delete from public.schema_migrations where version = '2026-10-01-profiles-protege-billing';
