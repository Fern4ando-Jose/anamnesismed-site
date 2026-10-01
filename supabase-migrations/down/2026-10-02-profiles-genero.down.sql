-- Rollback de 2026-10-02-profiles-genero (perde o gênero informado; o app volta a mostrar "Dr(a).").
alter table public.profiles drop constraint if exists profiles_genero_check;
alter table public.profiles drop column if exists genero;
delete from public.schema_migrations where version = '2026-10-02-profiles-genero';
