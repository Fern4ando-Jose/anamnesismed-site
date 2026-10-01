-- Rollback de 2026-10-03-consumir-limite.sql
-- Efeitos: remove a RPC e a tabela de contadores. ⚠️ As rotas /api/excluir-conta, /api/exportar-dados,
-- /api/create-checkout-session e /api/portal-cliente passam a responder 503 (fail-closed) enquanto o
-- código que chama `consumir_limite` estiver no ar — reverta o deploy junto, ou reaplique a forward.
drop function if exists public.consumir_limite(uuid, text, integer, integer);
drop table if exists public.rate_limits;
delete from public.schema_migrations where version = '2026-10-03-consumir-limite';
