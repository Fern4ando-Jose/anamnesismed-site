-- Rollback de 2026-10-03-contas-em-exclusao.sql
-- Efeitos: some a marca de contas em exclusão. ⚠️ Reabre a corrida (checkout durante a exclusão) e o
-- código novo (create-checkout-session/excluir-conta) passa a responder 503 até reaplicar ou reverter o deploy.
drop table if exists public.contas_em_exclusao;
delete from public.schema_migrations where version = '2026-10-03-contas-em-exclusao';
