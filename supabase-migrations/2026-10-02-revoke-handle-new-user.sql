-- Migração: fecha a função do gatilho de cadastro para chamadas pela API.
-- Contexto: `public.handle_new_user()` é SECURITY DEFINER e estava executável por `anon` e
-- `authenticated` via /rest/v1/rpc/handle_new_user (alerta do Supabase Advisor, lints 0028/0029).
-- O gatilho `on_auth_user_created` continua disparando normalmente: o Postgres não confere
-- EXECUTE de quem faz o INSERT em auth.users, só do dono do gatilho. Idempotente.
-- Rollback: down/2026-10-02-revoke-handle-new-user.down.sql

revoke all on function public.handle_new_user() from public, anon, authenticated;

insert into public.schema_migrations (version) values ('2026-10-02-revoke-handle-new-user')
  on conflict (version) do nothing;
