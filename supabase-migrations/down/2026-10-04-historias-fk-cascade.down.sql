-- Rollback de 2026-10-04-historias-fk-cascade.sql: volta a FK para NO ACTION (apagar usuário com HCs falha de novo).
do $$
declare
  r record;
begin
  if to_regclass('public.historias_clinicas') is null then return; end if;
  for r in
    select c.conname from pg_constraint c
      join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
     where c.conrelid = 'public.historias_clinicas'::regclass and c.contype = 'f'
       and c.confrelid = 'auth.users'::regclass and a.attname = 'user_id'
  loop
    execute format('alter table public.historias_clinicas drop constraint %I', r.conname);
  end loop;
  alter table public.historias_clinicas
    add constraint historias_clinicas_user_id_fkey foreign key (user_id) references auth.users (id) not valid;
  alter table public.historias_clinicas validate constraint historias_clinicas_user_id_fkey;
end $$;
delete from public.schema_migrations where version = '2026-10-04-historias-fk-cascade';
