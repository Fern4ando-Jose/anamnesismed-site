-- Teste executável: trava de `profiles.email` (achado A1 — takeover de billing por e-mail).
-- COMO RODAR (dono): colar no SQL Editor do Supabase. Transação com ROLLBACK final — não deixa dado.
--   Sucesso = "OK ..."; falha = erro "FALHOU: <o que>". Pré-requisito: migration 2026-10-04-profiles-protege-email.
-- Também é executado em Postgres local por test/sql-pg.test.js.

begin;

insert into auth.users (id, email) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'atacante@exemplo.invalid'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'vitima@exemplo.invalid');

-- 1) authenticated NÃO troca o próprio e-mail (ataque: apontar para o e-mail do assinante)
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"bbbbbbbb-0000-0000-0000-000000000001"}', true);
set local role authenticated;
update public.profiles set email = 'vitima@exemplo.invalid', nome = 'Atacante' where id = 'bbbbbbbb-0000-0000-0000-000000000001';
reset role;
do $$ declare p public.profiles; begin
  select * into p from public.profiles where id = 'bbbbbbbb-0000-0000-0000-000000000001';
  if p.email is distinct from 'atacante@exemplo.invalid' then raise exception 'FALHOU: authenticated alterou profiles.email para %', p.email; end if;
  if p.nome is distinct from 'Atacante' then raise exception 'FALHOU: colunas comuns (nome) deveriam continuar graváveis'; end if;
end $$;

-- 2) upsert do front (id + email + nome...) com e-mail forjado também não altera o e-mail
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"bbbbbbbb-0000-0000-0000-000000000001"}', true);
set local role authenticated;
insert into public.profiles (id, email, nome) values ('bbbbbbbb-0000-0000-0000-000000000001', 'vitima@exemplo.invalid', 'Upsert')
  on conflict (id) do update set email = excluded.email, nome = excluded.nome;
reset role;
do $$ declare p public.profiles; begin
  select * into p from public.profiles where id = 'bbbbbbbb-0000-0000-0000-000000000001';
  if p.email is distinct from 'atacante@exemplo.invalid' then raise exception 'FALHOU: upsert por authenticated alterou profiles.email para %', p.email; end if;
  if p.nome is distinct from 'Upsert' then raise exception 'FALHOU: upsert deveria gravar nome'; end if;
end $$;

-- 3) INSERT por authenticated: o e-mail enviado é ignorado; vale o do login (auth.users)
delete from public.profiles where id = 'bbbbbbbb-0000-0000-0000-000000000002';   -- como dono
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"bbbbbbbb-0000-0000-0000-000000000002"}', true);
set local role authenticated;
insert into public.profiles (id, email) values ('bbbbbbbb-0000-0000-0000-000000000002', 'forjado@exemplo.invalid');
reset role;
do $$ begin
  if (select email from public.profiles where id = 'bbbbbbbb-0000-0000-0000-000000000002') is distinct from 'vitima@exemplo.invalid' then
    raise exception 'FALHOU: INSERT por authenticated gravou e-mail forjado';
  end if;
end $$;

-- 4) anon não altera nada (sem GRANT/RLS) e o e-mail segue o mesmo
select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
do $$ begin
  begin
    update public.profiles set email = 'x@exemplo.invalid' where id = 'bbbbbbbb-0000-0000-0000-000000000001';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;
do $$ begin
  if (select email from public.profiles where id = 'bbbbbbbb-0000-0000-0000-000000000001') <> 'atacante@exemplo.invalid' then raise exception 'FALHOU: anon alterou o e-mail'; end if;
end $$;

-- 5) service_role e SQL Editor (sem JWT) continuam livres para corrigir o e-mail
select set_config('request.jwt.claims', '{"role":"service_role"}', true);
set local role service_role;
update public.profiles set email = 'corrigido@exemplo.invalid' where id = 'bbbbbbbb-0000-0000-0000-000000000001';
reset role;
do $$ begin
  if (select email from public.profiles where id = 'bbbbbbbb-0000-0000-0000-000000000001') <> 'corrigido@exemplo.invalid' then raise exception 'FALHOU: service_role não conseguiu atualizar o e-mail'; end if;
end $$;
select set_config('request.jwt.claims', '', true);
update public.profiles set email = 'atacante@exemplo.invalid' where id = 'bbbbbbbb-0000-0000-0000-000000000001';
do $$ begin
  if (select email from public.profiles where id = 'bbbbbbbb-0000-0000-0000-000000000001') <> 'atacante@exemplo.invalid' then raise exception 'FALHOU: sem JWT o trigger não deveria bloquear'; end if;
end $$;

-- 6) catálogo: função com search_path fixo e sem EXECUTE para o cliente
do $$ begin
  if not exists (select 1 from pg_proc p where p.oid = 'public.profiles_protege_billing()'::regprocedure
                   and exists (select 1 from unnest(coalesce(p.proconfig, '{}')) c where c like 'search_path=%pg_temp%')) then
    raise exception 'FALHOU: profiles_protege_billing sem search_path fixo';
  end if;
  if has_function_privilege('authenticated', 'public.profiles_protege_billing()', 'execute') then
    raise exception 'FALHOU: authenticated com EXECUTE na função do trigger';
  end if;
end $$;

select 'OK 2026-10-04-profiles-protege-email' as resultado;
rollback;
