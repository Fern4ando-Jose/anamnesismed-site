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
        select: () => ({ eq: () => ({ maybeSingle: async () => {
          calls.push({ op: 'select', table });
          if (table === 'contas_em_exclusao') return opts.marcaErr ? { data: null, error: opts.marcaErr } : { data: opts.marca ? { user_id: 'u1' } : null, error: null };
          return { data: null, error: null };
        } }) }),
        delete: () => ({ eq: async (col, val) => { calls.push({ op: 'delete', table, col, val }); return opts.deleteResult || { error: null }; } }),
      }),
    }),
  };
  return { exports, calls };
}

// ── Mock do Stripe: constructEvent devolve o evento ou lança (assinatura inválida) ─
// sopts: { subs: lista devolvida por subscriptions.list, listErr, cancelErr }; sopts.cancelados recebe os ids.
function makeStripeMock(event, throwMsg, sopts) {
  sopts = sopts || {};
  sopts.cancelados = sopts.cancelados || [];
  sopts.listagens = sopts.listagens || [];
  const fn = () => ({
    webhooks: {
      constructEvent: () => { if (throwMsg) throw new Error(throwMsg); return event; },
    },
    subscriptions: {
      list: async (p) => { sopts.listagens.push(p); if (sopts.listErr) throw new Error('stripe fora'); return { data: sopts.subs || [] }; },
      cancel: async (id) => { if (sopts.cancelErr) throw sopts.cancelErr; sopts.cancelados.push(id); return {}; },
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
  const event = { id: 'evt_new', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1' } } };
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
  const event = { id: 'evt_dup', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1' } } };
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
  const event = { id: 'evt_notable', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u2' }, customer: 'cus_2' } } };
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
async function rodaEvento(event, sopts, supaOpts) {
  const supa = makeSupabaseMock({ error: null }, supaOpts);
  const handler = loadHandler(makeStripeMock(event, null, sopts), supa.exports);
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
  const event = { id: 'evt_fail1', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1' } } };
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

test('ativação pro sem nenhuma linha afetada (perfil inexistente) → 200 idempotente com ALERTA (não é mais 500 eterno)', async () => {
  const event = { id: 'evt_fail2', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'fantasma' }, customer: 'cus_1', subscription: 'sub_fantasma' } } };
  const supa = makeSupabaseMock({ error: null }, { updateResult: { data: [], error: null } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  const mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 200);
  assert.ok(mudo.linhas.some((l) => l.includes('ALERTA stripe')));
  assert.ok(!supa.calls.find((c) => c.op === 'delete' && c.table === 'stripe_events'));
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
  const event = { id: 'evt_fail4', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1' } } };
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

// ── Checkout: mode/payment_status ─────────────────────────────────────────────
test('checkout.session.completed só ativa subscription PAGA (mode/payment_status)', async () => {
  const base = { metadata: { userId: 'u1' }, customer: 'cus_1' };
  const casos = [
    [{ ...base, mode: 'payment', payment_status: 'paid' }, false],
    [{ ...base, mode: 'subscription', payment_status: 'unpaid' }, false],
    [{ ...base, payment_status: 'paid' }, false],
    [{ ...base, mode: 'subscription', payment_status: 'paid' }, true],
    [{ ...base, mode: 'subscription', payment_status: 'no_payment_required' }, true],
  ];
  for (const [obj, ativa] of casos) {
    const mudo = mockSilencioso();
    let r; try { r = await rodaEvento({ id: 'evt_c', type: 'checkout.session.completed', data: { object: obj } }); } finally { mudo.restaura(); }
    assert.equal(r.res.code, 200, JSON.stringify(obj));
    assert.equal(!!r.update, ativa, JSON.stringify(obj));
  }
});

// ── Perfil inexistente / conta em exclusão: sucesso idempotente + cancela a assinatura ──
test('checkout para PERFIL INEXISTENTE → 200 (sem 500 eterno), ALERTA e cancela a assinatura criada', async () => {
  const event = { id: 'evt_g1', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'fantasma' }, customer: 'cus_1', subscription: 'sub_novo' } } };
  const sopts = {};
  const mudo = mockSilencioso();
  let r; try { r = await rodaEvento(event, sopts, { updateResult: { data: [], error: null } }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 200);
  assert.deepEqual(sopts.cancelados, ['sub_novo']);
  assert.ok(mudo.linhas.some((l) => l.includes('ALERTA stripe') && l.includes('sem perfil')));
  assert.ok(!r.calls.some((c) => c.op === 'delete' && c.table === 'stripe_events'), 'evento fica registrado: não reentregar');
});

test('checkout para conta EM EXCLUSÃO → 200, não ativa, cancela a assinatura (acha pela listagem se o evento não trouxer id)', async () => {
  const event = { id: 'evt_g2', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1' } } };
  const sopts = { subs: [{ id: 'sub_a', status: 'active' }, { id: 'sub_b', status: 'canceled' }] };
  const mudo = mockSilencioso();
  let r; try { r = await rodaEvento(event, sopts, { marca: true }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 200);
  assert.equal(r.update, undefined, 'não pode ativar conta em exclusão');
  assert.deepEqual(sopts.cancelados, ['sub_a']);
  assert.ok(mudo.linhas.some((l) => l.includes('ALERTA stripe') && l.includes('exclusão')));
});

test('falha ao cancelar a assinatura órfã é só ALERTA (continua 200); erro ao ler a marca → 500 e reverte', async () => {
  const event = { id: 'evt_g3', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_x' } } };
  let mudo = mockSilencioso();
  let r; try { r = await rodaEvento(event, { cancelErr: Object.assign(new Error('x'), { code: 'api_connection_error' }) }, { marca: true }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 200);
  assert.ok(mudo.linhas.some((l) => l.includes('cancele manualmente')));

  mudo = mockSilencioso();
  try { r = await rodaEvento({ ...event, id: 'evt_g4' }, {}, { marcaErr: { code: 'XX000' } }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 500);
  assert.ok(r.calls.some((c) => c.op === 'delete' && c.table === 'stripe_events'));
});

test('tabela contas_em_exclusao ausente (42P01) → trata como sem marca e ativa normalmente', async () => {
  const event = { id: 'evt_g5', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1' } } };
  const mudo = mockSilencioso();
  let r; try { r = await rodaEvento(event, {}, { marcaErr: { code: '42P01' } }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 200);
  assert.ok(r.update && r.update.vals.plano === 'pro');
});

// ── Rebaixe só se não houver OUTRA assinatura viva ────────────────────────────
test('assinatura ANTIGA encerrada NÃO rebaixa se o customer tem outra viva (todos os status vivos)', async () => {
  for (const status of ['active', 'trialing', 'past_due']) {
    const sopts = { subs: [{ id: 'sub_velha', status: 'canceled' }, { id: 'sub_nova', status }] };
    const mudo = mockSilencioso();
    let r; try { r = await rodaEvento({ id: 'evt_o_' + status, type: 'customer.subscription.deleted', data: { object: { id: 'sub_velha', customer: 'cus_9', status: 'canceled' } } }, sopts); } finally { mudo.restaura(); }
    assert.equal(r.res.code, 200);
    assert.equal(r.update, undefined, status);
    assert.equal(sopts.listagens[0].customer, 'cus_9');
  }
});

test('rebaixa quando as outras assinaturas estão encerradas; a própria assinatura do evento é ignorada na checagem', async () => {
  const sopts = { subs: [{ id: 'sub_velha', status: 'active' /* ainda viva na lista, mas é a do evento */ }, { id: 'sub_antiga', status: 'canceled' }] };
  const { res, update } = await rodaEvento({ id: 'evt_o2', type: 'customer.subscription.updated', data: { object: { id: 'sub_velha', customer: 'cus_9', status: 'unpaid' } } }, sopts);
  assert.equal(res.code, 200);
  assert.ok(update && update.vals.plano === 'trial');
});

test('falha ao consultar o Stripe antes de rebaixar → 500 e reverte (Stripe reentrega)', async () => {
  const mudo = mockSilencioso();
  let r; try { r = await rodaEvento({ id: 'evt_o3', type: 'customer.subscription.deleted', data: { object: { id: 'sub_v', customer: 'cus_9' } } }, { listErr: true }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 500);
  assert.equal(r.update, undefined);
  assert.ok(r.calls.some((c) => c.op === 'delete' && c.table === 'stripe_events'));
});
