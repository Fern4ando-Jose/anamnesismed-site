-- Teste executável: trigger `profiles_protege_billing` + policies de `profiles`.
-- COMO RODAR (dono): colar no SQL Editor do Supabase (projeto AnamnesisMed) e executar.
--   Tudo roda dentro de uma transação que termina em ROLLBACK — NÃO deixa dado no banco.
--   Sucesso = termina sem erro e mostra a linha "OK ...". Falha = erro "FALHOU: <o que>".
--   Pré-requisito: migrations 2026-06-08 e 2026-10-01-profiles-protege-billing aplicadas.
--   Se o INSERT em auth.users falhar no seu projeto (colunas obrigatórias), ajuste só essa linha.
-- Também é executado automaticamente em Postgres local por test/sql-pg.test.js.

begin;

-- Dois usuários de teste (o gatilho handle_new_user cria o perfil de cada um).
insert into auth.users (id, email) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'teste-a@exemplo.invalid'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'teste-b@exemplo.invalid');

do $$ begin
  if (select count(*) from public.profiles where id in ('aaaaaaaa-0000-0000-0000-000000000001','aaaaaaaa-0000-0000-0000-000000000002')) <> 2 then
    raise exception 'FALHOU: handle_new_user não criou os perfis de teste';
  end if;
end $$;

-- Dados de partida controlados (como dono, sem JWT → o trigger deixa passar).
update public.profiles set plano = 'trial', stripe_id = null, trial_end = now() + interval '5 days'
 where id = 'aaaaaaaa-0000-0000-0000-000000000001';

-- ── 1) authenticated NÃO escala plano / trial_end / stripe_id no UPDATE ──────────────────────
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"aaaaaaaa-0000-0000-0000-000000000001"}', true);
set local role authenticated;

update public.profiles
   set plano = 'pro', trial_end = now() + interval '999 days', stripe_id = 'cus_hack', nome = 'Nome Novo'
 where id = 'aaaaaaaa-0000-0000-0000-000000000001';

do $$
declare p public.profiles;
begin
  select * into p from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000001';
  if p.plano <> 'trial' then raise exception 'FALHOU: authenticated conseguiu mudar plano para %', p.plano; end if;
  if p.stripe_id is not null then raise exception 'FALHOU: authenticated conseguiu gravar stripe_id'; end if;
  if p.trial_end > now() + interval '6 days' then raise exception 'FALHOU: authenticated estendeu trial_end'; end if;
  if p.nome is distinct from 'Nome Novo' then raise exception 'FALHOU: colunas comuns (nome) deveriam continuar graváveis'; end if;
end $$;

-- ── 2) authenticated NÃO apaga o próprio perfil (sem policy de DELETE) ───────────────────────
delete from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000001';
do $$ begin
  if not exists (select 1 from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000001') then
    raise exception 'FALHOU: authenticated conseguiu apagar o próprio perfil (reiniciaria o trial)';
  end if;
end $$;

-- ── 3) authenticated NÃO edita o perfil de OUTRO usuário (RLS) ───────────────────────────────
update public.profiles set nome = 'invasor' where id = 'aaaaaaaa-0000-0000-0000-000000000002';
reset role;
do $$ begin
  if (select nome from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000002') = 'invasor' then
    raise exception 'FALHOU: RLS deixou editar o perfil de outro usuário';
  end if;
end $$;

-- ── 4) INSERT por authenticated: valores de billing forçados (recria perfil → trial novo) ────
delete from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000002';   -- como dono
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"aaaaaaaa-0000-0000-0000-000000000002"}', true);
set local role authenticated;
insert into public.profiles (id, email, plano, stripe_id, trial_end)
values ('aaaaaaaa-0000-0000-0000-000000000002', 'teste-b@exemplo.invalid', 'pro', 'cus_hack', now() + interval '999 days');
do $$
declare p public.profiles;
begin
  select * into p from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000002';
  if p.plano <> 'trial' then raise exception 'FALHOU: INSERT por authenticated criou perfil com plano %', p.plano; end if;
  if p.stripe_id is not null then raise exception 'FALHOU: INSERT por authenticated gravou stripe_id'; end if;
  if p.trial_end > now() + interval '31 days' or p.trial_end < now() + interval '29 days' then
    raise exception 'FALHOU: trial_end do INSERT deveria ser ~now()+30 dias (veio %)', p.trial_end;
  end if;
end $$;

-- ── 5) INSERT por authenticated com id de OUTRO usuário é barrado pelo WITH CHECK ────────────
do $$ begin
  begin
    insert into public.profiles (id, email) values ('aaaaaaaa-0000-0000-0000-000000000099', 'x@exemplo.invalid');
    raise exception 'FALHOU: WITH CHECK deixou inserir perfil com id de outro usuário';
  exception when insufficient_privilege or check_violation or foreign_key_violation then
    null; -- esperado (RLS ou FK)
  end;
end $$;
reset role;

-- ── 6) anon: sem JWT de usuário não altera nada ──────────────────────────────────────────────
select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
do $$ begin
  begin
    update public.profiles set plano = 'pro' where id = 'aaaaaaaa-0000-0000-0000-000000000001';
  exception when insufficient_privilege then
    null; -- anon sem GRANT: também é "barrado"
  end;
end $$;
reset role;
do $$ begin
  if (select plano from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000001') <> 'trial' then
    raise exception 'FALHOU: anon alterou o plano';
  end if;
end $$;

-- ── 7) service_role (webhook do Stripe) AINDA grava plano/stripe_id ──────────────────────────
select set_config('request.jwt.claims', '{"role":"service_role"}', true);
set local role service_role;
update public.profiles set plano = 'pro', stripe_id = 'cus_pago' where id = 'aaaaaaaa-0000-0000-0000-000000000001';
reset role;
do $$ begin
  if (select plano || '/' || stripe_id from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000001') <> 'pro/cus_pago' then
    raise exception 'FALHOU: service_role não conseguiu ativar o plano (webhook quebraria)';
  end if;
end $$;

-- ── 8) sem JWT (SQL Editor / gatilhos / conexão direta) também passa ─────────────────────────
select set_config('request.jwt.claims', '', true);
update public.profiles set plano = 'trial', stripe_id = null where id = 'aaaaaaaa-0000-0000-0000-000000000001';
do $$ begin
  if (select plano from public.profiles where id = 'aaaaaaaa-0000-0000-0000-000000000001') <> 'trial' then
    raise exception 'FALHOU: sem JWT o trigger não deveria bloquear (dono/SQL Editor)';
  end if;
end $$;

-- ── 9) catálogo: trigger BEFORE INSERT OR UPDATE ativo; search_path fixo ─────────────────────
do $$
declare t pg_trigger;
begin
  select * into t from pg_trigger where tgname = 'trg_profiles_protege_billing' and tgrelid = 'public.profiles'::regclass and not tgisinternal;
  if t.oid is null then raise exception 'FALHOU: trigger trg_profiles_protege_billing ausente'; end if;
  if (t.tgtype & 2) = 0 then raise exception 'FALHOU: trigger não é BEFORE'; end if;
  if (t.tgtype & 4) = 0 or (t.tgtype & 16) = 0 then raise exception 'FALHOU: trigger precisa cobrir INSERT e UPDATE'; end if;
  if (t.tgtype & 1) = 0 then raise exception 'FALHOU: trigger precisa ser FOR EACH ROW'; end if;
  if t.tgenabled = 'D' then raise exception 'FALHOU: trigger desabilitado'; end if;
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and cmd in ('ALL', 'DELETE')) then
    raise exception 'FALHOU: profiles não pode ter policy ALL/DELETE para o cliente';
  end if;
end $$;

do $$ begin
  if exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
     where n.nspname = 'public' and (p.prosecdef or p.prorettype = 'trigger'::regtype)
       and not exists (select 1 from unnest(coalesce(p.proconfig, '{}')) c where c like 'search_path=%pg_temp%')
  ) then
    raise exception 'FALHOU: há função SECURITY DEFINER/trigger em public sem search_path fixo com pg_temp (rode a migration 2026-10-02)';
  end if;
end $$;

select 'OK 2026-10-01-profiles-protege-billing' as resultado;
rollback;
