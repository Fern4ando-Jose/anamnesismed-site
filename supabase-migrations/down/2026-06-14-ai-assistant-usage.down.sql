-- Rollback de 2026-06-14-ai-assistant-usage.sql
-- Remove a tabela de uso do assistente de IA e seu trigger/função.
-- ⚠️ Apaga o histórico de contagem de uso. O endpoint /api/assistente-dx volta ao
--    modo fail-open (não bloqueia por limite diário) enquanto a tabela não existir.

drop trigger if exists trg_touch_ai_assistant_usage on public.ai_assistant_usage;
drop function if exists public.touch_ai_assistant_usage();
drop table if exists public.ai_assistant_usage;

delete from public.schema_migrations where version = '2026-06-14-ai-assistant-usage';
