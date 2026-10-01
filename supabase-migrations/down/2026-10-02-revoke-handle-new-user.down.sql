-- Rollback de 2026-10-02-revoke-handle-new-user: devolve o EXECUTE padrão (NÃO recomendado —
-- reabre a chamada da função SECURITY DEFINER pela API).
grant execute on function public.handle_new_user() to public, anon, authenticated;
delete from public.schema_migrations where version = '2026-10-02-revoke-handle-new-user';
