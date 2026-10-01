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
// opts.updateResult: o que o `update` devolve (default: 1 linha afetada, sem erro).
// opts.deleteResult: o que o `delete` devolve (default: sem erro).
// `update().eq()` é aguardável direto (rebaixe) e também aceita `.select()` (ativação),
// como no supabase-js.
function makeSupabaseMock(insertResult, opts) {
  opts = opts || {};
  const calls = [];
  const exports = {
    createClient: () => ({
      from: (table) => ({
        insert: async (row) => { calls.push({ op: 'insert', table, row }); return insertResult; },
        update: (vals) => ({
          eq: (col, val) => {
            calls.push({ op: 'update', table, vals, col, val });
            const r = opts.updateResult || { data: [{ id: 'x' }], error: null };
            const p = Promise.resolve(r);
            p.select = () => Promise.resolve(r);
            return p;
          },
        }),
        delete: () => ({ eq: async (col, val) => { calls.push({ op: 'delete', table, col, val }); return opts.deleteResult || { error: null }; } }),
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

// ── Rebaixamento de plano ─────────────────────────────────────────────────────
async function rodaEvento(event) {
  const supa = makeSupabaseMock({ error: null });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  await handler(makeReq(event), res);
  return { res, calls: supa.calls, update: supa.calls.find((c) => c.op === 'update' && c.table === 'profiles') };
}

test('invoice.payment_failed NÃO rebaixa o plano (1ª falha)', async () => {
  const { res, update } = await rodaEvento({ id: 'evt_pf', type: 'invoice.payment_failed', data: { object: { customer: 'cus_9' } } });
  assert.equal(res.code, 200);
  assert.equal(update, undefined);
});

test('customer.subscription.deleted → rebaixa para trial pelo stripe_id', async () => {
  const { res, update } = await rodaEvento({ id: 'evt_del', type: 'customer.subscription.deleted', data: { object: { customer: 'cus_9' } } });
  assert.equal(res.code, 200);
  assert.ok(update);
  assert.equal(update.vals.plano, 'trial');
  assert.equal(update.col, 'stripe_id');
  assert.equal(update.val, 'cus_9');
});

test('customer.subscription.updated: unpaid/canceled rebaixa; active não', async () => {
  for (const status of ['unpaid', 'canceled']) {
    const { update } = await rodaEvento({ id: 'evt_u_' + status, type: 'customer.subscription.updated', data: { object: { customer: 'cus_9', status } } });
    assert.ok(update, status + ' deve rebaixar');
    assert.equal(update.vals.plano, 'trial');
  }
  for (const status of ['active', 'past_due']) {
    const { update } = await rodaEvento({ id: 'evt_u_' + status, type: 'customer.subscription.updated', data: { object: { customer: 'cus_9', status } } });
    assert.equal(update, undefined, status + ' não rebaixa');
  }
});

test('env ausente → 500 claro, sem criar clients nem tocar o banco', async () => {
  const guardado = process.env.STRIPE_WEBHOOK_SECRET;
  delete process.env.STRIPE_WEBHOOK_SECRET;
  try {
    const supa = makeSupabaseMock({ error: null });
    const handler = loadHandler(makeStripeMock({ id: 'e', type: 'x', data: { object: {} } }), supa.exports);
    const res = makeRes();
    await handler(makeReq({}), res);
    assert.equal(res.code, 500);
    assert.equal(supa.calls.length, 0);
  } finally {
    process.env.STRIPE_WEBHOOK_SECRET = guardado;
  }
});

// ── Escritas no Supabase que falham → 5xx + reverte idempotência (Stripe retenta) ─
function mockSilencioso() {
  const orig = { error: console.error, warn: console.warn, log: console.log };
  const linhas = [];
  console.error = (...a) => linhas.push(a.join(' '));
  console.warn = () => {}; console.log = () => {};
  return { linhas, restaura: () => { console.error = orig.error; console.warn = orig.warn; console.log = orig.log; } };
}

test('ativação pro com erro no update → 500, reverte idempotência, log sem dado sensível', async () => {
  const event = { id: 'evt_fail1', type: 'checkout.session.completed', data: { object: { metadata: { userId: 'u1' }, customer: 'cus_1' } } };
  const supa = makeSupabaseMock({ error: null }, { updateResult: { data: null, error: { code: '57014', message: 'timeout com texto@secreto.com' } } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  const mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 500);
  const del = supa.calls.find((c) => c.op === 'delete' && c.table === 'stripe_events');
  assert.ok(del, 'deve reverter o registro de idempotência');
  assert.equal(del.val, 'evt_fail1');
  assert.ok(!mudo.linhas.join('\n').includes('texto@secreto.com'), 'log não pode vazar a mensagem crua do banco');
});

test('ativação pro sem nenhuma linha afetada (perfil inexistente) → 500 e reverte', async () => {
  const event = { id: 'evt_fail2', type: 'checkout.session.completed', data: { object: { metadata: { userId: 'fantasma' }, customer: 'cus_1' } } };
  const supa = makeSupabaseMock({ error: null }, { updateResult: { data: [], error: null } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  const mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 500);
  assert.ok(supa.calls.find((c) => c.op === 'delete' && c.table === 'stripe_events'));
});

test('rebaixe com erro no update → 500 e reverte idempotência; zero linhas NÃO é erro', async () => {
  const event = { id: 'evt_fail3', type: 'customer.subscription.deleted', data: { object: { customer: 'cus_9' } } };
  let supa = makeSupabaseMock({ error: null }, { updateResult: { error: { code: '08006', message: 'conexão' } } });
  let handler = loadHandler(makeStripeMock(event), supa.exports);
  let res = makeRes();
  let mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 500);
  assert.ok(supa.calls.find((c) => c.op === 'delete' && c.table === 'stripe_events'));

  // customer desconhecido / conta já excluída: nenhuma linha, sem erro → 200
  supa = makeSupabaseMock({ error: null }, { updateResult: { data: [], error: null } });
  handler = loadHandler(makeStripeMock(event), supa.exports);
  res = makeRes();
  mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 200);
});

test('falha ao reverter a idempotência é logada como ALERTA e ainda responde 500', async () => {
  const event = { id: 'evt_fail4', type: 'checkout.session.completed', data: { object: { metadata: { userId: 'u1' }, customer: 'cus_1' } } };
  const supa = makeSupabaseMock({ error: null }, { updateResult: { data: null, error: { code: 'XX000', message: 'x' } }, deleteResult: { error: { code: 'XX001', message: 'y' } } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  const mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 500);
  assert.ok(mudo.linhas.some((l) => l.includes('ALERTA stripe')));
});

// ── Só tipos tratados entram em stripe_events ─────────────────────────────────
test('tipos não tratados → 200 SEM registrar em stripe_events nem tocar profiles', async () => {
  const tipos = [
    { id: 'evt_a', type: 'customer.created', data: { object: {} } },
    { id: 'evt_b', type: 'invoice.payment_failed', data: { object: { customer: 'cus_9' } } },
    { id: 'evt_c', type: 'customer.subscription.updated', data: { object: { customer: 'cus_9', status: 'active' } } },
  ];
  for (const ev of tipos) {
    const { res, calls } = await rodaEvento(ev);
    assert.equal(res.code, 200, ev.type);
    assert.equal(calls.length, 0, ev.type + ' não deve tocar o banco');
  }
});

test('tipos tratados registram em stripe_events antes de escrever', async () => {
  const ev = { id: 'evt_t', type: 'customer.subscription.deleted', data: { object: { customer: 'cus_9' } } };
  const { calls } = await rodaEvento(ev);
  assert.equal(calls[0].op, 'insert');
  assert.equal(calls[0].table, 'stripe_events');
});

test('exporta config com bodyParser desligado', () => {
  const handler = loadHandler(makeStripeMock(null), makeSupabaseMock({ error: null }).exports);
  assert.equal(handler.config.api.bodyParser, false);
});
