-- Rollback de 2026-07-11-pdf-exports.sql
-- Remove a tabela de exportações de PDF. O front volta a contar só pelo localStorage
-- (o contador do dashboard deixa de ser cross-device). Não perde dado local.

drop table if exists public.pdf_exports;

delete from public.schema_migrations where version = '2026-07-11-pdf-exports';
