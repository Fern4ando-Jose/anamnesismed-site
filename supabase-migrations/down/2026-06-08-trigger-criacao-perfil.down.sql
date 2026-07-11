-- Rollback de 2026-06-08-trigger-criacao-perfil.sql
-- Remove o trigger e a função que criam public.profiles a cada novo usuário.
-- ⚠️ QUEBRA o cadastro: sem o trigger, novos usuários ficam sem linha em profiles e o
--    app volta a dar erro 406 em profileGet()/profileCheckAccess(). Use apenas para
--    substituir por outra implementação de criação de perfil.

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

delete from public.schema_migrations where version = '2026-06-08-trigger-criacao-perfil';
