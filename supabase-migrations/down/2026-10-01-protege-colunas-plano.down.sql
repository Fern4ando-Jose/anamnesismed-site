-- Rollback de 2026-10-01-protege-colunas-plano.sql
-- ⚠️ REABRE O FURO DE PAYWALL: o cliente volta a poder alterar plano/trial_end/stripe_id de
--    `profiles` e apagar a própria linha. Só usar se a trigger estiver quebrando o cadastro.

drop trigger if exists trg_proteger_colunas_plano on public.profiles;
drop function if exists public.proteger_colunas_plano();

drop policy if exists "usuario_le_proprio_perfil"    on public.profiles;
drop policy if exists "usuario_cria_proprio_perfil"  on public.profiles;
drop policy if exists "usuario_edita_proprio_perfil" on public.profiles;

create policy "usuario_acessa_proprio_perfil"
  on public.profiles
  for all
  using (id = auth.uid())
  with check (id = auth.uid());

delete from public.schema_migrations where version = '2026-10-01-protege-colunas-plano';
