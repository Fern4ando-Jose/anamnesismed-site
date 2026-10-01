// Testes ESTÁTICOS das migrations (rodam em qualquer máquina, sem Postgres): leem os .sql e
// afirmam de forma estrita as garantias de segurança. A versão com Postgres de verdade está em
// test/sql-pg.test.js (roda quando há binários do Postgres) e em supabase-migrations/tests/*.sql
// (asserts executáveis pelo dono no SQL Editor).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const MIG = path.join(__dirname, '..', 'supabase-migrations');
// Remove comentários (-- ...) para a asserção não ser satisfeita por texto de comentário.
const le = (f) => fs.readFileSync(path.join(MIG, f), 'utf8').split('\n').map((l) => l.replace(/--.*$/, '')).join('\n');
const norm = (s) => s.replace(/\s+/g, ' ').toLowerCase();

const BILLING = norm(le('2026-10-01-profiles-protege-billing.sql'));
const RPC01 = norm(le('2026-10-01-uso-atomico-rpc.sql'));
const NOVA = norm(le('2026-10-02-devolver-cota-e-search-path.sql'));

test('trigger profiles_protege_billing: BEFORE INSERT OR UPDATE, FOR EACH ROW, em public.profiles', () => {
  for (const sql of [BILLING]) {
    assert.match(sql, /create trigger trg_profiles_protege_billing before insert or update on public\.profiles for each row execute (procedure|function) public\.profiles_protege_billing\(\)/);
  }
});

test('trigger trava plano/trial_end/stripe_id para authenticated e anon, e libera service_role/sem JWT', () => {
  for (const sql of [BILLING, NOVA]) {
    assert.match(sql, /coalesce\(auth\.role\(\), 'service_role'\) not in \('authenticated', 'anon'\) then return new/);
    // INSERT: valores forçados
    assert.match(sql, /new\.plano := 'trial'/);
    assert.match(sql, /new\.trial_end := now\(\) \+ interval '30 days'/);
    assert.match(sql, /new\.stripe_id := null/);
    // UPDATE: valores antigos preservados
    assert.match(sql, /new\.plano := old\.plano/);
    assert.match(sql, /new\.stripe_id := old\.stripe_id/);
    assert.match(sql, /new\.trial_end := coalesce\(old\.trial_end, now\(\) \+ interval '30 days'\)/);
  }
});

test('profiles: policies por operação e SEM policy de DELETE/ALL (10-01), ALL antiga removida de novo (10-02)', () => {
  assert.match(BILLING, /create policy "usuario_ve_proprio_perfil" on public\.profiles for select/);
  assert.match(BILLING, /create policy "usuario_cria_proprio_perfil" on public\.profiles for insert with check \(id = auth\.uid\(\)\)/);
  assert.match(BILLING, /create policy "usuario_atualiza_proprio_perfil" on public\.profiles for update using \(id = auth\.uid\(\)\) with check \(id = auth\.uid\(\)\)/);
  assert.doesNotMatch(BILLING, /on public\.profiles for (delete|all)/);
  assert.match(BILLING, /alter table public\.profiles enable row level security/);
  assert.match(NOVA, /drop policy if exists "usuario_acessa_proprio_perfil" on public\.profiles/);
});

test('RPCs de cota: revoke de public/anon/authenticated e grant SOMENTE para service_role', () => {
  const casos = [
    [RPC01, 'consumir_cota_ia', 'uuid, text, integer'],
    [NOVA, 'consumir_cota_ia', 'uuid, text, integer'],
    [NOVA, 'devolver_cota_ia', 'uuid, text'],
  ];
  for (const [sql, fn, args] of casos) {
    assert.ok(sql.includes(`revoke all on function public.${fn}(${args}) from public, anon, authenticated;`), fn + ': revoke');
    assert.ok(sql.includes(`grant execute on function public.${fn}(${args}) to service_role;`), fn + ': grant service_role');
    const grants = sql.match(new RegExp(`grant [a-z ]+ on function public\\.${fn}\\([^)]*\\) to [a-z_, ]+`, 'g')) || [];
    assert.ok(grants.length >= 1 && grants.every((g) => /to service_role$/.test(g.trim())), fn + ': só service_role');
  }
});

test('RPCs de cota: SECURITY DEFINER com search_path fixo (public, pg_temp)', () => {
  for (const nome of ['consumir_cota_ia', 'devolver_cota_ia']) {
    const m = NOVA.match(new RegExp(`create or replace function public\\.${nome}\\([^)]*\\) returns integer language plpgsql security definer set search_path = public, pg_temp as`));
    assert.ok(m, nome + ' deve ser security definer com search_path = public, pg_temp');
  }
  assert.match(NOVA, /create or replace function public\.profiles_protege_billing\(\) returns trigger language plpgsql set search_path = public, pg_temp as/);
});

test('search_path: nenhuma função security definer/trigger das migrations 10-0x sem search_path fixo', () => {
  for (const f of ['2026-10-01-profiles-protege-billing.sql', '2026-10-01-uso-atomico-rpc.sql', '2026-10-02-devolver-cota-e-search-path.sql']) {
    const sql = norm(le(f));
    const decl = sql.match(/create or replace function [^$]+?\$\$/g) || [];
    // só as da 10-02 são a versão final; as da 10-01 são endurecidas pela 10-02 (create or replace).
    if (f.startsWith('2026-10-02')) {
      assert.ok(decl.length >= 3, 'esperava consumir, devolver e trigger');
      for (const d of decl) assert.match(d, /set search_path = public, pg_temp/, d.slice(0, 80));
    }
  }
  // funções antigas endurecidas via alter function (se existirem)
  for (const fn of ['handle_new_user()', 'touch_ai_assistant_usage()', 'touch_gerar_hc_usage()']) {
    assert.ok(NOVA.includes(`'public.${fn}'`), fn);
  }
  assert.match(NOVA, /alter function %s set search_path = public, pg_temp/);
});

test('consumir_cota_ia é atômica: insert ... on conflict do update ... where count < limite', () => {
  for (const sql of [RPC01, NOVA]) {
    assert.match(sql, /on conflict \(user_id, dia\) do update set count = t\.count \+ 1 where t\.count < p_limite returning t\.count into v_count/);
    assert.match(sql, /return coalesce\(v_count, -1\)/);
    assert.match(sql, /p_limite < 1 then raise exception/);
  }
});

test('devolver_cota_ia nunca fica abaixo de 0, não cria linha e só mexe no dia UTC corrente', () => {
  assert.ok((NOVA.match(/set count = t\.count - 1 where t\.user_id = p_user_id and t\.dia = v_dia and t\.count > 0 returning t\.count into v_count/g) || []).length === 2, 'as duas tabelas, com where count > 0');
  assert.doesNotMatch(norm(NOVA.slice(NOVA.indexOf('function public.devolver_cota_ia'), NOVA.indexOf('function public.profiles_protege_billing'))), /insert into/);
  assert.match(NOVA, /return coalesce\(v_count, 0\)/);
  assert.match(NOVA, /v_dia date := \(now\(\) at time zone 'utc'\)::date/);
});

test('toda migration forward tem down/ e registro em schema_migrations (a partir de 2026-10-01)', () => {
  for (const f of fs.readdirSync(MIG).filter((x) => /^2026-10-.*\.sql$/.test(x))) {
    const base = f.replace(/\.sql$/, '');
    assert.ok(fs.existsSync(path.join(MIG, 'down', base + '.down.sql')), 'falta down/ de ' + f);
    assert.ok(norm(le(f)).includes(`insert into public.schema_migrations (version) values ('${base}')`), 'falta registro de ' + f);
    assert.match(norm(le('down/' + base + '.down.sql')), new RegExp(`delete from public\\.schema_migrations where version = '${base}'`));
  }
});

test('há asserts executáveis para o dono em supabase-migrations/tests/', () => {
  const dir = path.join(MIG, 'tests');
  const arqs = fs.readdirSync(dir).filter((f) => f.endsWith('.sql'));
  assert.ok(arqs.length >= 2);
  for (const f of arqs) {
    const sql = fs.readFileSync(path.join(dir, f), 'utf8');
    assert.match(sql, /\brollback;\s*$/m, f + ': deve terminar em ROLLBACK (não deixa dado)');
    assert.match(sql, /FALHOU/, f);
  }
});

// ── 2026-10-04 ──────────────────────────────────────────────────────────────────────────────
test('10-04 e-mail: trigger trava profiles.email (UPDATE preserva, INSERT vem de auth.users), search_path fixo, sem EXECUTE ao cliente', () => {
  const sql = norm(le('2026-10-04-profiles-protege-email.sql'));
  assert.match(sql, /create or replace function public\.profiles_protege_billing\(\) returns trigger language plpgsql security definer set search_path = public, pg_temp as/);
  assert.match(sql, /coalesce\(auth\.role\(\), 'service_role'\) not in \('authenticated', 'anon'\) then return new/);
  assert.match(sql, /new\.email := old\.email/);
  assert.match(sql, /select u\.email into v_email from auth\.users u where u\.id = new\.id/);
  assert.match(sql, /new\.plano := old\.plano/);
  assert.match(sql, /new\.stripe_id := old\.stripe_id/);
  assert.ok(sql.includes('revoke all on function public.profiles_protege_billing() from public, anon, authenticated;'));
  assert.match(sql, /create trigger trg_profiles_protege_billing before insert or update on public\.profiles for each row/);
  assert.match(sql, /update public\.profiles p set email = u\.email from auth\.users u where u\.id = p\.id/);
  // tipo_usuario/termos_aceitos NÃO são travados (o onboarding os grava pelo cliente)
  assert.doesNotMatch(sql, /new\.(tipo_usuario|termos_aceitos|genero) :=/);
});

test('10-04 stripe_events: status processing/done + lease, e revoke explícito das 3 tabelas de uso/eventos', () => {
  const sql = norm(le('2026-10-04-stripe-events-lease.sql'));
  assert.match(sql, /add column if not exists status text not null default 'done'/);
  assert.match(sql, /alter column status set default 'processing'/);
  assert.match(sql, /add column if not exists processing_desde timestamptz not null default now\(\)/);
  assert.match(sql, /check \(status in \('processing', 'done'\)\)/);
  for (const t of ['stripe_events', 'ai_assistant_usage', 'gerar_hc_usage']) {
    assert.ok(new RegExp(`revoke all on table public\\.${t}\\s+from public, anon, authenticated;`).test(sql), 'revoke ' + t);
    assert.ok(new RegExp(`grant select, insert, update, delete on table public\\.${t}\\s+to service_role;`).test(sql), 'grant ' + t);
  }
});

test('10-04 historias: FK user_id → auth.users com ON DELETE CASCADE (NOT VALID + VALIDATE)', () => {
  const sql = norm(le('2026-10-04-historias-fk-cascade.sql'));
  assert.match(sql, /foreign key \(user_id\) references auth\.users \(id\) on delete cascade not valid/);
  assert.match(sql, /validate constraint historias_clinicas_user_id_fkey/);
});

test('06-23 é idempotente: drop policy if exists antes de cada create e não recria a FOR ALL de profiles após a 10-01', () => {
  const sql = norm(le('2026-06-23-rls-profiles-historias.sql'));
  assert.ok(sql.indexOf('drop policy if exists "usuario_acessa_proprias_hcs"') >= 0 && sql.indexOf('drop policy if exists "usuario_acessa_proprias_hcs"') < sql.indexOf('create policy "usuario_acessa_proprias_hcs"'));
  assert.ok(sql.indexOf('drop policy if exists "usuario_acessa_proprio_perfil"') >= 0 && sql.indexOf('drop policy if exists "usuario_acessa_proprio_perfil"') < sql.indexOf('create policy "usuario_acessa_proprio_perfil"'));
  assert.match(sql, /version = '2026-10-01-profiles-protege-billing'/);
});
