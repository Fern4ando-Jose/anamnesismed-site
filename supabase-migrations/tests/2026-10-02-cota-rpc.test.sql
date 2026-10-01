-- Teste executável: RPCs `consumir_cota_ia` e `devolver_cota_ia` (cota diária de IA).
-- COMO RODAR (dono): colar no SQL Editor do Supabase e executar. Transação com ROLLBACK final —
--   não deixa dado. Sucesso = mostra "OK ..."; falha = erro "FALHOU: <o que>".
--   Pré-requisito: migrations 2026-06-14, 2026-06-28 e 2026-10-01/10-02 aplicadas.
-- Também é executado automaticamente em Postgres local por test/sql-pg.test.js.

begin;

insert into auth.users (id, email) values ('bbbbbbbb-0000-0000-0000-000000000001', 'cota@exemplo.invalid');

-- ── Privilégios: só service_role executa ─────────────────────────────────────────────────────
do $$
declare f text;
begin
  foreach f in array array['public.consumir_cota_ia(uuid,text,integer)', 'public.devolver_cota_ia(uuid,text)'] loop
    if has_function_privilege('anon', f, 'execute') then raise exception 'FALHOU: anon executa %', f; end if;
    if has_function_privilege('authenticated', f, 'execute') then raise exception 'FALHOU: authenticated executa %', f; end if;
    if not has_function_privilege('service_role', f, 'execute') then raise exception 'FALHOU: service_role não executa %', f; end if;
    if (select not p.prosecdef from pg_proc p where p.oid = f::regprocedure) then raise exception 'FALHOU: % deveria ser SECURITY DEFINER', f; end if;
    if not exists (select 1 from pg_proc p, unnest(p.proconfig) c where p.oid = f::regprocedure and c like 'search_path=%pg_temp%') then
      raise exception 'FALHOU: % sem search_path fixo', f;
    end if;
  end loop;
end $$;

-- authenticated chamando de verdade → erro de permissão
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"bbbbbbbb-0000-0000-0000-000000000001"}', true);
set local role authenticated;
do $$ begin
  begin
    perform public.devolver_cota_ia('bbbbbbbb-0000-0000-0000-000000000001', 'gerar-hc');
    raise exception 'FALHOU: authenticated conseguiu chamar devolver_cota_ia';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.consumir_cota_ia('bbbbbbbb-0000-0000-0000-000000000001', 'gerar-hc', 5);
    raise exception 'FALHOU: authenticated conseguiu chamar consumir_cota_ia';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;

-- ── consumir: 1,2,3 e depois -1 (limite 3) sem incrementar ──────────────────────────────────
select set_config('request.jwt.claims', '{"role":"service_role"}', true);
set local role service_role;
do $$
declare u uuid := 'bbbbbbbb-0000-0000-0000-000000000001'; r text; v integer;
begin
  foreach r in array array['gerar-hc', 'assistente-dx'] loop
    if public.consumir_cota_ia(u, r, 3) <> 1 then raise exception 'FALHOU: % 1º consumo', r; end if;
    if public.consumir_cota_ia(u, r, 3) <> 2 then raise exception 'FALHOU: % 2º consumo', r; end if;
    if public.consumir_cota_ia(u, r, 3) <> 3 then raise exception 'FALHOU: % 3º consumo', r; end if;
    if public.consumir_cota_ia(u, r, 3) <> -1 then raise exception 'FALHOU: % passou do limite', r; end if;
    if public.consumir_cota_ia(u, r, 3) <> -1 then raise exception 'FALHOU: % 5º consumo deveria seguir -1', r; end if;

    -- devolver: 3 → 2 → 1 → 0 e nunca abaixo de 0
    if public.devolver_cota_ia(u, r) <> 2 then raise exception 'FALHOU: % devolução 1', r; end if;
    if public.devolver_cota_ia(u, r) <> 1 then raise exception 'FALHOU: % devolução 2', r; end if;
    if public.devolver_cota_ia(u, r) <> 0 then raise exception 'FALHOU: % devolução 3', r; end if;
    if public.devolver_cota_ia(u, r) <> 0 then raise exception 'FALHOU: % devolveu abaixo de 0', r; end if;
    -- depois de devolver, dá para consumir de novo
    if public.consumir_cota_ia(u, r, 3) <> 1 then raise exception 'FALHOU: % consumo após devolução', r; end if;
  end loop;

  -- nunca negativo na tabela
  if exists (select 1 from public.gerar_hc_usage where count < 0) or exists (select 1 from public.ai_assistant_usage where count < 0) then
    raise exception 'FALHOU: contador negativo';
  end if;

  -- devolver sem linha do dia: não cria linha, retorna 0
  delete from public.gerar_hc_usage where user_id = u;
  if public.devolver_cota_ia(u, 'gerar-hc') <> 0 then raise exception 'FALHOU: devolver sem linha deveria retornar 0'; end if;
  if exists (select 1 from public.gerar_hc_usage where user_id = u) then raise exception 'FALHOU: devolver criou linha'; end if;

  -- parâmetros inválidos
  begin perform public.devolver_cota_ia(u, 'rota-x'); raise exception 'FALHOU: rota inválida aceita';
  exception when raise_exception then if sqlerrm like 'FALHOU%' then raise; end if; end;
  begin perform public.devolver_cota_ia(null, 'gerar-hc'); raise exception 'FALHOU: user nulo aceito';
  exception when raise_exception then if sqlerrm like 'FALHOU%' then raise; end if; end;
  begin perform public.consumir_cota_ia(u, 'gerar-hc', 0); raise exception 'FALHOU: limite 0 aceito';
  exception when raise_exception then if sqlerrm like 'FALHOU%' then raise; end if; end;
end $$;
reset role;

select 'OK 2026-10-02-cota-rpc' as resultado;
rollback;
