-- Rollback de 2026-10-01-uso-atomico-rpc.sql
-- ⚠️ FAIL-CLOSED: sem a função, /api/gerar-hc e /api/assistente-dx devolvem 503 e NÃO
--    chamam a API paga (o front cai no motor de narrativa local na HC). Só faça rollback
--    junto com o rollback do código das duas rotas.

drop function if exists public.consumir_cota_ia(uuid, text, integer);

delete from public.schema_migrations where version = '2026-10-01-uso-atomico-rpc';
