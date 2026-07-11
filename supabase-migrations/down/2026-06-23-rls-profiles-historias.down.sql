-- Rollback de 2026-06-23-rls-profiles-historias.sql
-- Volta as policies ao estado ANTERIOR: recria as policies antigas (só USING, sem
-- WITH CHECK) e remove as novas endurecidas.
-- ⚠️ SEGURANÇA: este rollback REABRE o gap de gravar linha com user_id de outro usuário
--    (o WITH CHECK é o que fechava isso). Só use se a policy nova estiver quebrando algo.
--    O RLS em si é deixado LIGADO de propósito — desligá-lo exporia dados de paciente.

-- profiles
drop policy if exists "usuario_acessa_proprio_perfil" on public.profiles;
create policy "usuario ve proprio perfil"
  on public.profiles for all
  using (id = auth.uid());

-- historias_clinicas
drop policy if exists "usuario_acessa_proprias_hcs" on public.historias_clinicas;
create policy "usuario ve proprias HCs"
  on public.historias_clinicas for all
  using (user_id = auth.uid());

delete from public.schema_migrations where version = '2026-06-23-rls-profiles-historias';
