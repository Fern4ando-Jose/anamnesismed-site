// Testes do /api/stripe-webhook: validação de assinatura + idempotência.
// Mocka 'stripe' e '@supabase/supabase-js' via require.cache (sem rede, sem chaves reais).
// Roda com: node --test  (Node 18+).
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const Module = require('node:module');

const API_DIR = path.join(__dirname, '..', 'api');
const HANDLER = path.join(API_DIR, 'stripe-webhook.js');

// Envs dummy — os mocks ignoram os valores, mas o módulo os lê no load.
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dummy';
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';

// ── Mock do Supabase: registra todas as chamadas para asserção ────────────────
function makeSupabaseMock(insertResult) {
  const calls = [];
  const exports = {
    createClient: () => ({
      from: (table) => ({
        insert: async (row) => { calls.push({ op: 'insert', table, row }); return insertResult; },
        update: (vals) => ({ eq: async (col, val) => { calls.push({ op: 'update', table, vals, col, val }); return { error: null }; } }),
        delete: () => ({ eq: async (col, val) => { calls.push({ op: 'delete', table, col, val }); return { error: null }; } }),
      }),
    }),
  };
  return { exports, calls };
}

// ── Mock do Stripe: constructEvent devolve o evento ou lança (assinatura inválida) ─
function makeStripeMock(event, throwMsg) {
  const fn = () => ({
    webhooks: {
      constructEvent: () => { if (throwMsg) throw new Error(throwMsg); return event; },
    },
  });
  return fn;
}

// ── Carrega uma instância fresca do handler com os mocks injetados ─────────────
// Intercepta os require('stripe') / require('@supabase/supabase-js') do handler via
// Module._load — não exige os pacotes instalados (node_modules pode não existir).
function loadHandler(stripeExports, supaExports) {
  const origLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (request === 'stripe') return stripeExports;
    if (request === '@supabase/supabase-js') return supaExports;
    return origLoad.apply(this, arguments);
  };
  try {
    delete require.cache[require.resolve(HANDLER)];
    return require(HANDLER);
  } finally {
    Module._load = origLoad;
  }
}

// ── Fakes de req/res ──────────────────────────────────────────────────────────
function makeReq(bodyObj, method = 'POST') {
  const buf = Buffer.from(JSON.stringify(bodyObj));
  async function* gen() { yield buf; }
  const req = gen();
  req.method = method;
  req.headers = { 'stripe-signature': 'sig_dummy' };
  return req;
}
function makeRes() {
  const res = { code: null, body: null, ended: false };
  res.status = (c) => { res.code = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  res.end = () => { res.ended = true; return res; };
  return res;
}

test('assinatura inválida → 400 e não toca o banco', async () => {
  const supa = makeSupabaseMock({ error: null });
  const handler = loadHandler(makeStripeMock(null, 'bad signature'), supa.exports);
  const res = makeRes();
  await handler(makeReq({ id: 'evt_1' }), res);
  assert.equal(res.code, 400);
  assert.equal(supa.calls.length, 0);
});

test('método != POST → 405', async () => {
  const supa = makeSupabaseMock({ error: null });
  const handler = loadHandler(makeStripeMock({ id: 'evt_x', type: 'x', data: { object: {} } }), supa.exports);
  const res = makeRes();
  await handler(makeReq({}, 'GET'), res);
  assert.equal(res.code, 405);
});

test('evento novo checkout.session.completed → grava idempotência e ativa pro', async () => {
  const event = { id: 'evt_new', type: 'checkout.session.completed', data: { object: { metadata: { userId: 'u1' }, customer: 'cus_1' } } };
  const supa = makeSupabaseMock({ error: null }); // insert OK (não duplicado)
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  await handler(makeReq(event), res);

  assert.equal(res.code, 200);
  const insert = supa.calls.find((c) => c.op === 'insert');
  assert.ok(insert, 'deve gravar o event.id ANTES de processar');
  assert.equal(insert.table, 'stripe_events');
  assert.equal(insert.row.event_id, 'evt_new');
  const update = supa.calls.find((c) => c.op === 'update' && c.table === 'profiles');
  assert.ok(update, 'deve ativar o perfil');
  assert.equal(update.vals.plano, 'pro');
  assert.equal(update.val, 'u1');
});

test('evento DUPLICADO (23505) → 200 duplicate e NÃO reprocessa', async () => {
  const event = { id: 'evt_dup', type: 'checkout.session.completed', data: { object: { metadata: { userId: 'u1' }, customer: 'cus_1' } } };
  const supa = makeSupabaseMock({ error: { code: '23505', message: 'duplicate key' } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  await handler(makeReq(event), res);

  assert.equal(res.code, 200);
  assert.equal(res.body && res.body.duplicate, true);
  const update = supa.calls.find((c) => c.op === 'update');
  assert.equal(update, undefined, 'evento duplicado não pode reprocessar (sem update)');
});

test('tabela de idempotência ausente → segue sem dedup e ainda processa', async () => {
  const event = { id: 'evt_notable', type: 'checkout.session.completed', data: { object: { metadata: { userId: 'u2' }, customer: 'cus_2' } } };
  // 42P01 (tabela não existe) — não é 23505, então fail-open na idempotência.
  const supa = makeSupabaseMock({ error: { code: '42P01', message: 'relation does not exist' } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  await handler(makeReq(event), res);

  assert.equal(res.code, 200);
  const update = supa.calls.find((c) => c.op === 'update' && c.table === 'profiles');
  assert.ok(update, 'deve processar mesmo sem a tabela de idempotência');
  assert.equal(update.vals.plano, 'pro');
});
