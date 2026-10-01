-- Teste executável: stripe_events com status/lease, revoke de B7 e FK com cascade de historias_clinicas (M4).
-- COMO RODAR (dono): colar no SQL Editor do Supabase. Transação com ROLLBACK final — não deixa dado.
--   Sucesso = "OK ..."; falha = erro "FALHOU: <o que>". Pré-requisitos: migrations 2026-10-04-stripe-events-lease e
--   2026-10-04-historias-fk-cascade.
-- Também é executado em Postgres local por test/sql-pg.test.js.

begin;

-- stripe_events: nova linha nasce 'processing'; colunas e check existem
insert into public.stripe_events (event_id, type) values ('evt_teste_lease', 'checkout.session.completed');
do $$ begin
  if (select status from public.stripe_events where event_id = 'evt_teste_lease') <> 'processing' then raise exception 'FALHOU: linha nova deveria nascer processing'; end if;
  if (select processing_desde from public.stripe_events where event_id = 'evt_teste_lease') is null then raise exception 'FALHOU: processing_desde nulo'; end if;
  begin
    update public.stripe_events set status = 'qualquer' where event_id = 'evt_teste_lease';
    raise exception 'FALHOU: status inválido aceito';
  exception when check_violation then null;
  end;
end $$;
update public.stripe_events set status = 'done' where event_id = 'evt_teste_lease';

-- B7: cliente não tem nenhum privilégio nas três tabelas; service_role tem
do $$
declare t text; priv text; papel text;
begin
  foreach t in array array['public.stripe_events', 'public.ai_assistant_usage', 'public.gerar_hc_usage'] loop
    foreach papel in array array['anon', 'authenticated'] loop
      foreach priv in array array['select', 'insert', 'update', 'delete'] loop
        if has_table_privilege(papel, t, priv) then raise exception 'FALHOU: % tem % em %', papel, priv, t; end if;
      end loop;
    end loop;
    if not has_table_privilege('service_role', t, 'select') or not has_table_privilege('service_role', t, 'insert') then
      raise exception 'FALHOU: service_role perdeu acesso a %', t;
    end if;
  end loop;
end $$;

-- M4: apagar o usuário leva as HCs (cascade) e só as dele
insert into auth.users (id, email) values
  ('ffffffff-0000-0000-0000-000000000001', 'cascade-a@exemplo.invalid'),
  ('ffffffff-0000-0000-0000-000000000002', 'cascade-b@exemplo.invalid');
insert into public.historias_clinicas (user_id) values ('ffffffff-0000-0000-0000-000000000001'), ('ffffffff-0000-0000-0000-000000000002');
do $$ begin
  if not exists (select 1 from pg_constraint c join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
                  where c.conrelid = 'public.historias_clinicas'::regclass and c.contype = 'f' and c.confrelid = 'auth.users'::regclass
                    and a.attname = 'user_id' and c.confdeltype = 'c') then
    raise exception 'FALHOU: FK historias_clinicas.user_id sem ON DELETE CASCADE';
  end if;
end $$;
delete from auth.users where id = 'ffffffff-0000-0000-0000-000000000001';
do $$ begin
  if exists (select 1 from public.historias_clinicas where user_id = 'ffffffff-0000-0000-0000-000000000001') then raise exception 'FALHOU: HC do usuário apagado sobrou'; end if;
  if not exists (select 1 from public.historias_clinicas where user_id = 'ffffffff-0000-0000-0000-000000000002') then raise exception 'FALHOU: apagou HC de OUTRO usuário'; end if;
end $$;

select 'OK 2026-10-04-stripe-events-lease + historias-fk-cascade' as resultado;
rollback;
