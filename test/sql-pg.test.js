// Testes REAIS das migrations em Postgres local (efêmero): sobe um cluster temporário, simula
// o mínimo do Supabase (roles anon/authenticated/service_role, schema auth, auth.uid()/auth.role()),
// aplica TODAS as migrations em ordem e roda os asserts de supabase-migrations/tests/*.sql
// (os mesmos que o dono pode colar no SQL Editor) + um teste de concorrência da cota.
//
// Se não houver binários do Postgres na máquina (initdb/postgres/psql), os testes são PULADOS
// (skip) — a cobertura estática equivalente está em test/sql-migrations.test.js.
// Procura em: $PG_BIN, `initdb` no PATH, /usr/lib/postgresql/*/bin. Como root, roda como `postgres`.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync, spawn } = require('node:child_process');

const MIG = path.join(__dirname, '..', 'supabase-migrations');

function achaBin() {
  const cand = [];
  if (process.env.PG_BIN) cand.push(process.env.PG_BIN);
  const w = spawnSync('sh', ['-c', 'command -v initdb'], { encoding: 'utf8' });
  if (w.status === 0 && w.stdout.trim()) cand.push(path.dirname(w.stdout.trim()));
  try {
    for (const v of fs.readdirSync('/usr/lib/postgresql').sort().reverse()) cand.push('/usr/lib/postgresql/' + v + '/bin');
  } catch (_) { /* sem /usr/lib/postgresql */ }
  return cand.find((d) => ['initdb', 'postgres', 'psql', 'pg_ctl'].every((b) => fs.existsSync(path.join(d, b)))) || null;
}

const BIN = achaBin();
const IS_ROOT = typeof process.getuid === 'function' && process.getuid() === 0;
let postgresUser = null;
if (IS_ROOT) {
  const r = spawnSync('id', ['-u', 'postgres']);
  postgresUser = r.status === 0 ? 'postgres' : null;
}
const PODE = !!BIN && (!IS_ROOT || !!postgresUser);

let dir, sock, porta;

// Executa um binário do Postgres (como `postgres` quando somos root).
function pg(bin, args, extra) {
  extra = extra || {};
  const cmd = IS_ROOT ? 'runuser' : path.join(BIN, bin);
  const argv = IS_ROOT ? ['-u', postgresUser, '--', path.join(BIN, bin)].concat(args) : args;
  return spawnSync(cmd, argv, { encoding: 'utf8', ...extra });
}
function psqlArgs(db, extra) {
  return ['-h', sock, '-p', String(porta), '-U', 'postgres', '-d', db, '-X', '-q', '-v', 'ON_ERROR_STOP=1'].concat(extra || []);
}
function psqlFile(file, db) {
  return pg('psql', psqlArgs(db || 'am', ['-f', file]));
}

const HARNESS = `
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create table auth.users (id uuid primary key, email text);
create function auth.uid() returns uuid language sql stable as
  $$ select coalesce(nullif(current_setting('request.jwt.claim.sub', true), ''), (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'))::uuid $$;
create function auth.role() returns text language sql stable as
  $$ select coalesce(nullif(current_setting('request.jwt.claim.role', true), ''), (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role'))::text $$;
grant usage on schema auth to anon, authenticated, service_role;
grant usage on schema public to anon, authenticated, service_role;
-- Tabelas que o guia do Supabase cria à mão (não vêm de migration):
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text, nome text, sobrenome text, universidade text, ano_curso text, idioma text,
  tipo_usuario text, termos_aceitos boolean default false,
  plano text default 'trial', trial_end timestamptz, stripe_id text,
  criado_em timestamptz default now()
);
create table public.historias_clinicas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id),
  motivo text, dados jsonb, criado_em timestamptz default now()
);
-- Como o Supabase: o cliente tem privilégios de tabela; quem barra é o RLS/trigger.
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;
grant all on all tables in schema public to anon, authenticated, service_role;
`;

const ORDEM = [
  '2026-07-11-schema-migrations.sql',
  '2026-06-08-trigger-criacao-perfil.sql',
  '2026-06-14-ai-assistant-usage.sql',
  '2026-06-23-rls-profiles-historias.sql',
  '2026-06-28-gerar-hc-usage.sql',
  '2026-06-28-stripe-events-idempotencia.sql',
  '2026-07-11-pdf-exports.sql',
  '2026-10-01-profiles-protege-billing.sql',
  '2026-10-01-uso-atomico-rpc.sql',
  '2026-10-02-devolver-cota-e-search-path.sql',
];

test.before(() => {
  if (!PODE) return;
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'am-pg-'));
  if (IS_ROOT) spawnSync('chown', ['-R', postgresUser, dir]);
  fs.chmodSync(dir, 0o755);
  sock = path.join(dir, 's'); fs.mkdirSync(sock);
  if (IS_ROOT) spawnSync('chown', ['-R', postgresUser, dir]);
  porta = 20000 + Math.floor(Math.random() * 20000);
  const data = path.join(dir, 'data');
  let r = pg('initdb', ['-D', data, '-U', 'postgres', '--auth=trust', '-E', 'UTF8', '--no-sync']);
  assert.equal(r.status, 0, 'initdb falhou: ' + r.stderr);
  r = pg('pg_ctl', ['-D', data, '-w', '-o', `-c listen_addresses='' -c unix_socket_directories='${sock}' -c port=${porta} -c fsync=off -c max_connections=60`, '-l', path.join(dir, 'log'), 'start']);
  assert.equal(r.status, 0, 'pg_ctl start falhou: ' + r.stderr + fs.readFileSync(path.join(dir, 'log'), 'utf8'));
  r = pg('psql', psqlArgs('postgres', ['-c', 'create database am']));
  assert.equal(r.status, 0, r.stderr);
  const h = path.join(dir, 'harness.sql');
  fs.writeFileSync(h, HARNESS); if (IS_ROOT) spawnSync('chown', [postgresUser, h]);
  r = psqlFile(h);
  assert.equal(r.status, 0, 'harness falhou: ' + r.stderr);
  for (const f of ORDEM) {
    r = psqlFile(path.join(MIG, f));
    assert.equal(r.status, 0, 'migration ' + f + ' falhou: ' + r.stderr);
  }
});

test.after(() => {
  if (!PODE || !dir) return;
  pg('pg_ctl', ['-D', path.join(dir, 'data'), '-m', 'immediate', 'stop']);
  fs.rmSync(dir, { recursive: true, force: true });
});

const skip = PODE ? false : 'Postgres local indisponível (initdb/postgres/psql) — coberto estaticamente por sql-migrations.test.js';

// Os arquivos em supabase-migrations/tests/ precisam estar legíveis pelo usuário `postgres`.
function rodaSqlTeste(nome) {
  const r = psqlFile(path.join(MIG, 'tests', nome));
  assert.equal(r.status, 0, nome + ' FALHOU:\n' + r.stderr + r.stdout);
  assert.match(r.stdout, /OK /);
}

test('trigger profiles_protege_billing + RLS (asserts reais)', { skip }, () => {
  rodaSqlTeste('2026-10-01-profiles-protege-billing.test.sql');
});

test('RPCs consumir_cota_ia / devolver_cota_ia (asserts reais)', { skip }, () => {
  rodaSqlTeste('2026-10-02-cota-rpc.test.sql');
});

// A 2026-06-23 (antiga, imutável) NÃO é idempotente nas policies de historias_clinicas — fica de
// fora daqui; abaixo testamos que re-rodá-la não reabre o DELETE de profiles depois da 10-02.
test('migrations são idempotentes: reaplicar tudo não falha', { skip }, () => {
  for (const f of ORDEM.slice(1).filter((x) => x !== '2026-06-23-rls-profiles-historias.sql')) {
    const r = psqlFile(path.join(MIG, f));
    assert.equal(r.status, 0, 'reaplicar ' + f + ' falhou: ' + r.stderr);
  }
});

test('re-rodar a 2026-06-23 e depois a 10-02 não deixa policy ALL/DELETE em profiles', { skip }, () => {
  psqlFile(path.join(MIG, '2026-06-23-rls-profiles-historias.sql')); // pode falhar no meio (esperado); só importa o efeito
  const r0 = psqlFile(path.join(MIG, '2026-10-02-devolver-cota-e-search-path.sql'));
  assert.equal(r0.status, 0, r0.stderr);
  const r = pg('psql', psqlArgs('am', ['-t', '-A', '-c', "select count(*) from pg_policies where schemaname='public' and tablename='profiles' and cmd in ('ALL','DELETE')"]));
  assert.equal(r.stdout.trim(), '0');
});

test('migrations down da 10-02 e re-aplicação funcionam', { skip }, () => {
  let r = psqlFile(path.join(MIG, 'down', '2026-10-02-devolver-cota-e-search-path.down.sql'));
  assert.equal(r.status, 0, 'down falhou: ' + r.stderr);
  r = pg('psql', psqlArgs('am', ['-t', '-A', '-c', "select to_regprocedure('public.devolver_cota_ia(uuid,text)') is null"]));
  assert.equal(r.stdout.trim(), 't');
  r = psqlFile(path.join(MIG, '2026-10-02-devolver-cota-e-search-path.sql'));
  assert.equal(r.status, 0, r.stderr);
});

test('concorrência: 12 consumos paralelos com limite 5 → exatamente 5 passam e nenhum furo', { skip }, async () => {
  const uid = 'cccccccc-0000-0000-0000-000000000001';
  let r = pg('psql', psqlArgs('am', ['-c', `insert into auth.users (id, email) values ('${uid}','conc@exemplo.invalid')`]));
  assert.equal(r.status, 0, r.stderr);
  const rodar = () => new Promise((resolve) => {
    const cmd = IS_ROOT ? 'runuser' : path.join(BIN, 'psql');
    const base = psqlArgs('am', ['-t', '-A', '-c', `set role service_role; select public.consumir_cota_ia('${uid}','gerar-hc',5)`]);
    const argv = IS_ROOT ? ['-u', postgresUser, '--', path.join(BIN, 'psql')].concat(base) : base;
    const p = spawn(cmd, argv); let out = '';
    p.stdout.on('data', (d) => { out += d; });
    p.on('close', () => resolve(out.split('\n').map((l) => l.trim()).filter((l) => /^-?\d+$/.test(l)).pop()));
  });
  const resultados = await Promise.all(Array.from({ length: 12 }, rodar));
  const ok = resultados.filter((v) => Number(v) > 0).length;
  const barrados = resultados.filter((v) => v === '-1').length;
  assert.equal(ok, 5, 'resultados: ' + resultados.join(','));
  assert.equal(barrados, 7);
  r = pg('psql', psqlArgs('am', ['-t', '-A', '-c', `select count from public.gerar_hc_usage where user_id='${uid}'`]));
  assert.equal(r.stdout.trim(), '5');
});
