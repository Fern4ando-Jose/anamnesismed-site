-- Migração: `historias_clinicas.user_id` passa a ON DELETE CASCADE (M4).
-- Contexto: a FK para auth.users era NO ACTION; apagar o usuário pelo painel (Authentication → Users) falhava
-- enquanto houvesse HCs, e a exclusão LGPD dependia de apagar as HCs antes. Com CASCADE, excluir o login leva
-- as HCs junto (as demais tabelas com dado do usuário já tinham cascade ou são apagadas por /api/excluir-conta).
-- /api/excluir-conta continua apagando as HCs explicitamente antes (idempotente, inofensivo).
--
-- Implementação: localiza a(s) FK(s) de user_id → auth.users por catálogo (o nome varia entre projetos), remove e
-- recria `historias_clinicas_user_id_fkey` com cascade (NOT VALID + VALIDATE: o lock pesado é curto). Se já houver
-- FK com cascade, não faz nada.
--
-- ⚠️ RISCO: ADD CONSTRAINT toma lock breve em historias_clinicas e auth.users; faça fora do horário de pico.
-- E, daqui em diante, apagar um usuário no painel APAGA as HCs dele sem aviso (é o objetivo; backup do plano Supabase).
-- Idempotente. Rollback: down/2026-10-04-historias-fk-cascade.down.sql

do $$
declare
  r record;
begin
  if to_regclass('public.historias_clinicas') is null then
    raise notice 'historias_clinicas inexistente — nada a fazer';
    return;
  end if;

  if exists (
    select 1 from pg_constraint c
      join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
     where c.conrelid = 'public.historias_clinicas'::regclass and c.contype = 'f'
       and c.confrelid = 'auth.users'::regclass and a.attname = 'user_id' and c.confdeltype = 'c'
  ) then
    return;
  end if;

  for r in
    select c.conname from pg_constraint c
      join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
     where c.conrelid = 'public.historias_clinicas'::regclass and c.contype = 'f'
       and c.confrelid = 'auth.users'::regclass and a.attname = 'user_id'
  loop
    execute format('alter table public.historias_clinicas drop constraint %I', r.conname);
  end loop;

  alter table public.historias_clinicas
    add constraint historias_clinicas_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade not valid;
  alter table public.historias_clinicas validate constraint historias_clinicas_user_id_fkey;
end $$;

insert into public.schema_migrations (version) values ('2026-10-04-historias-fk-cascade')
  on conflict (version) do nothing;

-- ── Verificação (SQL Editor, como dono) ─────────────────────────────────────────────────────
--   select conname, confdeltype from pg_constraint where conrelid = 'public.historias_clinicas'::regclass and contype = 'f';
--   -- esperado: confdeltype = 'c'
--   -- teste executável: supabase-migrations/tests/2026-10-04-stripe-events-fk.test.sql
