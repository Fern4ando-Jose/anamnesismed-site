-- Migração: tabela de exportações de PDF (contador "PDFs exportados" do dashboard)
-- Contexto: as exportações eram rastreadas SÓ no localStorage (por dispositivo), então
-- o contador do dashboard não sobrevivia à troca de navegador/máquina. Esta tabela
-- persiste a exportação por usuário, com RLS user-scoped — o front insere/lê com a
-- anon key; a service_role ignora RLS.
--
-- Degradação graciosa: enquanto esta migração NÃO rodar, o front cai no localStorage
-- (comportamento atual). Rode no SQL Editor do Supabase (projeto AnamnesisMed) para
-- ligar a contagem cross-device. Idempotente.

create table if not exists public.pdf_exports (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  motivo      text,
  motivo_id   text,
  exported_at timestamptz not null default now()
);

create index if not exists idx_pdf_exports_user on public.pdf_exports (user_id, exported_at desc);

alter table public.pdf_exports enable row level security;

-- Só o dono das linhas lê/escreve (USING + WITH CHECK fecham leitura e gravação).
drop policy if exists "usuario_acessa_proprios_pdfs" on public.pdf_exports;
create policy "usuario_acessa_proprios_pdfs"
  on public.pdf_exports
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

insert into public.schema_migrations (version) values ('2026-07-11-pdf-exports')
  on conflict (version) do nothing;
