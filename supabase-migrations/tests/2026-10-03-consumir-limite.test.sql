-- Teste executável: RPC `consumir_limite` (limitador de taxa atômico) e tabela `rate_limits`.
-- COMO RODAR (dono): colar no SQL Editor do Supabase. Transação com ROLLBACK final — não deixa dado.
--   Sucesso = "OK ..."; falha = erro "FALHOU: <o que>". Pré-requisito: migration 2026-10-03-consumir-limite.
-- Também é executado em Postgres local por test/sql-pg.test.js.

begin;

insert into auth.users (id, email) values ('dddddddd-0000-0000-0000-000000000001', 'limite@exemplo.invalid');

-- ── Privilégios: só service_role executa e acessa a tabela ──────────────────────────────────
do $$
declare f text := 'public.consumir_limite(uuid,text,integer,integer)';
begin
  if has_function_privilege('anon', f, 'execute') then raise exception 'FALHOU: anon executa'; end if;
  if has_function_privilege('authenticated', f, 'execute') then raise exception 'FALHOU: authenticated executa'; end if;
  if not has_function_privilege('service_role', f, 'execute') then raise exception 'FALHOU: service_role não executa'; end if;
  if (select not p.prosecdef from pg_proc p where p.oid = f::regprocedure) then raise exception 'FALHOU: deveria ser SECURITY DEFINER'; end if;
  if not exists (select 1 from pg_proc p, unnest(p.proconfig) c where p.oid = f::regprocedure and c like 'search_path=%pg_temp%') then
    raise exception 'FALHOU: sem search_path fixo';
  end if;
  if has_table_privilege('anon', 'public.rate_limits', 'select') or has_table_privilege('authenticated', 'public.rate_limits', 'select') then
    raise exception 'FALHOU: anon/authenticated leem rate_limits';
  end if;
  if not (select relrowsecurity from pg_class where oid = 'public.rate_limits'::regclass) then raise exception 'FALHOU: RLS desligado em rate_limits'; end if;
end $$;

select set_config('request.jwt.claims', '{"role":"authenticated","sub":"dddddddd-0000-0000-0000-000000000001"}', true);
set local role authenticated;
do $$ begin
  begin
    perform public.consumir_limite('dddddddd-0000-0000-0000-000000000001', 'x', 3600, 5);
    raise exception 'FALHOU: authenticated conseguiu chamar consumir_limite';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;

-- ── Comportamento ───────────────────────────────────────────────────────────────────────────
select set_config('request.jwt.claims', '{"role":"service_role"}', true);
set local role service_role;
do $$
declare u uuid := 'dddddddd-0000-0000-0000-000000000001'; r integer;
begin
  -- limite 3: três 0, depois >0 (segundos até reabrir, entre 1 e a janela)
  if public.consumir_limite(u, 'exportar-dados', 3600, 3) <> 0 then raise exception 'FALHOU: 1ª chamada'; end if;
  if public.consumir_limite(u, 'exportar-dados', 3600, 3) <> 0 then raise exception 'FALHOU: 2ª chamada'; end if;
  if public.consumir_limite(u, 'exportar-dados', 3600, 3) <> 0 then raise exception 'FALHOU: 3ª chamada'; end if;
  r := public.consumir_limite(u, 'exportar-dados', 3600, 3);
  if r < 1 or r > 3600 then raise exception 'FALHOU: 4ª chamada deveria ser barrada com retry entre 1 e 3600 (veio %)', r; end if;
  if public.consumir_limite(u, 'exportar-dados', 3600, 3) < 1 then raise exception 'FALHOU: 5ª chamada deveria seguir barrada'; end if;
  -- o contador não passa do máximo
  if (select count from public.rate_limits where user_id = u and acao = 'exportar-dados') <> 3 then raise exception 'FALHOU: contador passou do máximo'; end if;

  -- ações são independentes
  if public.consumir_limite(u, 'excluir-conta', 3600, 3) <> 0 then raise exception 'FALHOU: ação diferente deveria ter contador próprio'; end if;

  -- janela vencida reinicia
  update public.rate_limits set janela_inicio = now() - interval '2 hours' where user_id = u and acao = 'exportar-dados';
  if public.consumir_limite(u, 'exportar-dados', 3600, 3) <> 0 then raise exception 'FALHOU: janela vencida não reiniciou'; end if;
  if (select count from public.rate_limits where user_id = u and acao = 'exportar-dados') <> 1 then raise exception 'FALHOU: contador não voltou a 1'; end if;

  -- parâmetros inválidos
  begin perform public.consumir_limite(null, 'x', 60, 1); raise exception 'FALHOU: user nulo aceito';
  exception when raise_exception then if sqlerrm like 'FALHOU%' then raise; end if; end;
  begin perform public.consumir_limite(u, 'Ação Inválida!', 60, 1); raise exception 'FALHOU: ação inválida aceita';
  exception when raise_exception then if sqlerrm like 'FALHOU%' then raise; end if; end;
  begin perform public.consumir_limite(u, 'x', 0, 1); raise exception 'FALHOU: janela 0 aceita';
  exception when raise_exception then if sqlerrm like 'FALHOU%' then raise; end if; end;
  begin perform public.consumir_limite(u, 'x', 60, 0); raise exception 'FALHOU: max 0 aceito';
  exception when raise_exception then if sqlerrm like 'FALHOU%' then raise; end if; end;
end $$;
reset role;

-- apagar o usuário limpa os contadores (ON DELETE CASCADE)
delete from auth.users where id = 'dddddddd-0000-0000-0000-000000000001';
do $$ begin
  if exists (select 1 from public.rate_limits where user_id = 'dddddddd-0000-0000-0000-000000000001') then
    raise exception 'FALHOU: rate_limits não foi limpa pelo cascade';
  end if;
end $$;

select 'OK 2026-10-03-consumir-limite' as resultado;
rollback;
