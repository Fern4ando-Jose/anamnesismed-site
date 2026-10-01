-- Teste executável: tabela `contas_em_exclusao` (marca de conta em exclusão).
-- COMO RODAR (dono): colar no SQL Editor do Supabase. Transação com ROLLBACK final — não deixa dado.
--   Sucesso = "OK ..."; falha = erro "FALHOU: <o que>". Pré-requisito: migration 2026-10-03-contas-em-exclusao.
-- Também é executado em Postgres local por test/sql-pg.test.js.

begin;

insert into auth.users (id, email) values ('eeeeeeee-0000-0000-0000-000000000001', 'exclusao@exemplo.invalid');

do $$
begin
  if not (select relrowsecurity from pg_class where oid = 'public.contas_em_exclusao'::regclass) then raise exception 'FALHOU: RLS desligado'; end if;
  if has_table_privilege('anon', 'public.contas_em_exclusao', 'select') or has_table_privilege('authenticated', 'public.contas_em_exclusao', 'select') then
    raise exception 'FALHOU: anon/authenticated leem a tabela';
  end if;
  if has_table_privilege('authenticated', 'public.contas_em_exclusao', 'delete') or has_table_privilege('authenticated', 'public.contas_em_exclusao', 'insert') then
    raise exception 'FALHOU: authenticated escreve na tabela (poderia limpar a própria marca)';
  end if;
  if exists (select 1 from pg_constraint where conrelid = 'public.contas_em_exclusao'::regclass and contype = 'f') then
    raise exception 'FALHOU: a marca não pode ter FK (precisa sobreviver à exclusão do login)';
  end if;
end $$;

-- service_role marca (idempotente) e a marca sobrevive à exclusão do usuário no Auth
select set_config('request.jwt.claims', '{"role":"service_role"}', true);
set local role service_role;
insert into public.contas_em_exclusao (user_id) values ('eeeeeeee-0000-0000-0000-000000000001') on conflict (user_id) do nothing;
insert into public.contas_em_exclusao (user_id) values ('eeeeeeee-0000-0000-0000-000000000001') on conflict (user_id) do nothing;
reset role;
do $$ begin
  if (select count(*) from public.contas_em_exclusao where user_id = 'eeeeeeee-0000-0000-0000-000000000001') <> 1 then raise exception 'FALHOU: marca duplicada'; end if;
end $$;
delete from auth.users where id = 'eeeeeeee-0000-0000-0000-000000000001';
do $$ begin
  if not exists (select 1 from public.contas_em_exclusao where user_id = 'eeeeeeee-0000-0000-0000-000000000001') then raise exception 'FALHOU: marca sumiu junto com o usuário'; end if;
end $$;

-- authenticated não consegue nem ler nem limpar
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"eeeeeeee-0000-0000-0000-000000000001"}', true);
set local role authenticated;
do $$ begin
  begin perform 1 from public.contas_em_exclusao; raise exception 'FALHOU: authenticated leu a tabela';
  exception when insufficient_privilege then null; end;
  begin delete from public.contas_em_exclusao; raise exception 'FALHOU: authenticated apagou a marca';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

select 'OK 2026-10-03-contas-em-exclusao' as resultado;
rollback;
