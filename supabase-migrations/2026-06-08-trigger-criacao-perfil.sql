-- Migração: cria automaticamente uma linha em public.profiles para cada novo usuário
-- Contexto: usuários se cadastravam em auth.users mas nenhuma linha era criada em
-- public.profiles, causando erro 406 (.single() sem linhas) em profileGet()/profileCheckAccess()
-- e travamentos no carregamento do app/config (trial, nome, plano etc. nunca populavam).
--
-- Aplicado diretamente no SQL Editor do Supabase (projeto AnamnesisMed) em 2026-06-08.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Backfill pontual: cria a linha de perfil para o usuário de teste atual
-- (demais usuários de teste serão removidos manualmente pelo usuário).
insert into public.profiles (id, email)
select id, email from auth.users
where id = '3fd5e9fe-8207-4aae-b1c8-8cd08483700b'
on conflict (id) do nothing;
