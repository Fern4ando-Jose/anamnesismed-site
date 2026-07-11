-- Rollback de 2026-06-28-gerar-hc-usage.sql
-- Remove a tabela de uso da geração de HC por IA e seu trigger/função.
-- ⚠️ FAIL-CLOSED: sem esta tabela, /api/gerar-hc devolve 503 e NÃO chama a API paga
--    (o front cai no motor de narrativa LOCAL — o usuário ainda recebe a HC).

drop trigger if exists trg_touch_gerar_hc_usage on public.gerar_hc_usage;
drop function if exists public.touch_gerar_hc_usage();
drop table if exists public.gerar_hc_usage;

delete from public.schema_migrations where version = '2026-06-28-gerar-hc-usage';
