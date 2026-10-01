-- Migração: RLS de `profiles` e `historias_clinicas` com WITH CHECK (dados sensíveis).
-- Contexto: o RLS dessas tabelas só existia documentado no guia (anamnesismed-setup-guide.html),
-- não como migration executável, e as policies eram `FOR ALL USING (auth.uid())` SEM `WITH CHECK`.
-- Sem `WITH CHECK`, um usuário poderia INSERIR/ATUALIZAR uma linha com o `user_id`/`id` de OUTRO
-- (o `USING` só filtra a leitura/edição de linhas existentes; o `WITH CHECK` valida o que é gravado).
-- Esta migration torna o RLS versionado, idempotente e fecha esse gap.
--
-- Aplicar no SQL Editor do Supabase (projeto AnamnesisMed) e confirmar que rodou sem erro.
-- É segura para re-rodar (idempotente).
--
-- Nota: a `service_role` (backend) ignora o RLS por design — escritas do servidor seguem funcionando.
-- O gatilho `criar_perfil_novo_usuario` é SECURITY DEFINER, então o INSERT automático de perfil
-- também não é afetado por estas policies.

-- ── profiles ───────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

drop policy if exists "usuario ve proprio perfil" on public.profiles;

-- IDEMPOTENTE e à prova de regressão: esta policy FOR ALL deixa o usuário apagar o próprio perfil. A migration
-- 2026-10-01-profiles-protege-billing a SUBSTITUI por policies por operação; por isso, se a 10-01 já foi
-- registrada em schema_migrations, re-rodar este arquivo NÃO recria a FOR ALL.
do $$
begin
  if to_regclass('public.schema_migrations') is not null
     and exists (select 1 from public.schema_migrations where version = '2026-10-01-profiles-protege-billing') then
    raise notice 'policies por operação de profiles já em vigor (2026-10-01) — pulando a FOR ALL antiga';
  else
    drop policy if exists "usuario_acessa_proprio_perfil" on public.profiles;
    create policy "usuario_acessa_proprio_perfil"
      on public.profiles
      for all
      using (id = auth.uid())
      with check (id = auth.uid());
  end if;
end $$;

-- ── historias_clinicas ─────────────────────────────────────────────────────
alter table public.historias_clinicas enable row level security;

drop policy if exists "usuario ve proprias HCs" on public.historias_clinicas;
drop policy if exists "usuario_acessa_proprias_hcs" on public.historias_clinicas;

create policy "usuario_acessa_proprias_hcs"
  on public.historias_clinicas
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ── Verificação (rodar manualmente após aplicar) ───────────────────────────
--   select tablename, rowsecurity from pg_tables
--     where schemaname='public' and tablename in ('profiles','historias_clinicas');
--   -- rowsecurity deve ser TRUE nas duas.
--   select schemaname, tablename, policyname, cmd, qual, with_check
--     from pg_policies where schemaname='public'
--     and tablename in ('profiles','historias_clinicas');
--   -- with_check NÃO pode estar NULL nas policies acima.
