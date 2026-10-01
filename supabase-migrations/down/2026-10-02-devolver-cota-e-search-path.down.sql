-- Rollback de 2026-10-02-devolver-cota-e-search-path.sql
-- Efeitos: remove `devolver_cota_ia` (as rotas de IA passam a só logar o alerta e NÃO devolvem
-- a cota quando o modelo falha — não quebra nada) e volta o search_path das funções para o estado
-- anterior. ⚠️ Voltar o search_path reabre o risco de sequestro de objetos; só use se algo quebrar.

drop function if exists public.devolver_cota_ia(uuid, text);

-- Estado anterior: consumir_cota_ia tinha `search_path = public`; profiles_protege_billing,
-- as funções touch_* não tinham search_path; handle_new_user tinha `public`.
alter function public.consumir_cota_ia(uuid, text, integer) set search_path = public;
alter function public.profiles_protege_billing() reset search_path;

do $$
begin
  if to_regprocedure('public.handle_new_user()') is not null then
    alter function public.handle_new_user() set search_path = public;
  end if;
  if to_regprocedure('public.touch_ai_assistant_usage()') is not null then
    alter function public.touch_ai_assistant_usage() reset search_path;
  end if;
  if to_regprocedure('public.touch_gerar_hc_usage()') is not null then
    alter function public.touch_gerar_hc_usage() reset search_path;
  end if;
end;
$$;

delete from public.schema_migrations where version = '2026-10-02-devolver-cota-e-search-path';
