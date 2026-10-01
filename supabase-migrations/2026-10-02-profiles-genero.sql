-- Migração: coluna `genero` em `profiles` ('F' ou 'M') — usada para o tratamento "Dra."/"Dr."
-- de médicos na saudação. Opcional (NULL = ainda não informado → o app mostra "Dr(a).").
-- O usuário grava o próprio gênero (policy de UPDATE do próprio perfil já cobre); não é coluna de billing.
-- Idempotente. Rollback: down/2026-10-02-profiles-genero.down.sql

alter table public.profiles add column if not exists genero text;

alter table public.profiles drop constraint if exists profiles_genero_check;
alter table public.profiles add constraint profiles_genero_check
  check (genero is null or genero in ('F', 'M'));

insert into public.schema_migrations (version) values ('2026-10-02-profiles-genero')
  on conflict (version) do nothing;
