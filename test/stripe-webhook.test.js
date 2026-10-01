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
// opts.updateResult: o que o `update` de profiles devolve (default: 1 linha afetada, sem erro).
// opts.deleteResult: o que o `delete` devolve (default: sem erro).
// opts.evento: resultado do select em stripe_events (linha existente: { data:{status,processing_desde}, error }).
// opts.takeover: resultado do update de reassunção do lease (default: 1 linha).
// opts.doneErr: erro ao marcar status=done.  opts.perfis: resultado do select de profiles por stripe_id.
// Os builders são "thenables" (aguardáveis direto) e aceitam .eq/.limit/.select encadeados, como no supabase-js.
function makeSupabaseMock(insertResult, opts) {
  opts = opts || {};
  const calls = [];
  const chain = (rec, resolver) => {
    const c = {
      eq: (col, val) => { rec.filtros.push([col, val]); if (rec.col === undefined) { rec.col = col; rec.val = val; } return c; },
      limit: () => c,
      select: () => c,
      maybeSingle: () => Promise.resolve(resolver(rec)),
      then: (ok, err) => Promise.resolve(resolver(rec)).then(ok, err),
    };
    return c;
  };
  const exports = {
    createClient: () => ({
      from: (table) => ({
        insert: async (row) => { calls.push({ op: 'insert', table, row }); return insertResult; },
        update: (vals) => {
          const rec = { op: 'update', table, vals, filtros: [] };
          calls.push(rec);
          return chain(rec, (r) => {
            if (table === 'stripe_events') {
              if ('status' in vals) return { error: opts.doneErr || null };
              return opts.takeover || { data: [{ event_id: 'x' }], error: null };
            }
            return opts.updateResult || { data: [{ id: 'x' }], error: null };
          });
        },
        select: () => {
          const rec = { op: 'select', table, filtros: [] };
          calls.push(rec);
          return chain(rec, () => {
            if (table === 'contas_em_exclusao') return opts.marcaErr ? { data: null, error: opts.marcaErr } : { data: opts.marca ? { user_id: 'u1' } : null, error: null };
            if (table === 'stripe_events') return opts.evento || { data: null, error: null };
            if (table === 'profiles') return opts.perfis || { data: [], error: null };
            return { data: null, error: null };
          });
        },
        delete: () => {
          const rec = { op: 'delete', table, filtros: [] };
          const c = { eq: (col, val) => { rec.filtros.push([col, val]); if (rec.col === undefined) { rec.col = col; rec.val = val; } return c; },
            then: (ok, err) => { calls.push(rec); return Promise.resolve(opts.deleteResult || { error: null }).then(ok, err); } };
          return c;
        },
      }),
    }),
  };
  return { exports, calls };
}

// ── Mock do Stripe: constructEvent devolve o evento ou lança (assinatura inválida) ─
// sopts: { subs: lista de subscriptions.list, listErr, cancelErr, sub (retorno do retrieve), retrieveErr };
// sopts.cancelados / listagens / retrieved recebem os efeitos; sopts.construidos conta constructEvent.
function makeStripeMock(event, throwMsg, sopts) {
  sopts = sopts || {};
  sopts.cancelados = sopts.cancelados || [];
  sopts.listagens = sopts.listagens || [];
  sopts.retrieved = sopts.retrieved || [];
  sopts.construidos = 0;
  const fn = () => ({
    webhooks: {
      constructEvent: () => { sopts.construidos++; if (throwMsg) throw new Error(throwMsg); return event; },
    },
    subscriptions: {
      list: async (p) => { sopts.listagens.push(p); if (sopts.listErr) throw new Error('stripe fora'); return { data: sopts.subs || [] }; },
      cancel: async (id) => { if (sopts.cancelErr) throw sopts.cancelErr; sopts.cancelados.push(id); return {}; },
      retrieve: async (id) => { sopts.retrieved.push(id); if (sopts.retrieveErr) throw sopts.retrieveErr; return sopts.sub || { id, status: 'active' }; },
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
function makeReq(bodyObj, method = 'POST', extra) {
  extra = extra || {};
  const buf = extra.buf || Buffer.from(JSON.stringify(bodyObj));
  const lidos = { chunks: 0 };
  async function* gen() { lidos.chunks++; yield buf; }
  const req = gen();
  req.method = method;
  req.headers = extra.semAssinatura ? {} : { 'stripe-signature': 'sig_dummy' };
  req.lidos = lidos;
  return req;
}
function makeRes() {
  const res = { code: null, body: null, ended: false, headers: {} };
  res.setHeader = (k, v) => { res.headers[k] = v; };
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
  const event = { id: 'evt_new', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_1' } } };
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
  assert.deepEqual(supa.calls.map((c) => c.op + ':' + c.table), ['insert:stripe_events', 'select:contas_em_exclusao', 'update:profiles', 'update:stripe_events']);
  const fim = supa.calls[supa.calls.length - 1];
  assert.deepEqual(fim.vals, { status: 'done' });
  assert.deepEqual(fim.filtros, [['event_id', 'evt_new']], 'done só ao FINAL, depois de ativar');
});

test('evento DUPLICADO (23505) → 200 duplicate e NÃO reprocessa', async () => {
  const event = { id: 'evt_dup', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_1' } } };
  const supa = makeSupabaseMock({ error: { code: '23505', message: 'duplicate key' } }, { evento: { data: { status: 'done', processing_desde: new Date().toISOString() }, error: null } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  await handler(makeReq(event), res);

  assert.equal(res.code, 200);
  assert.equal(res.body && res.body.duplicate, true);
  const update = supa.calls.find((c) => c.op === 'update');
  assert.equal(update, undefined, 'evento duplicado não pode reprocessar (sem update)');
});

test('erro de insert que NÃO é 23505 (ex.: tabela ausente) → FALHA FECHADA: 503, nada processado', async () => {
  const event = { id: 'evt_notable', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u2' }, customer: 'cus_2', subscription: 'sub_1' } } };
  for (const code of ['42P01', '57014', 'PGRST301']) {
    const supa = makeSupabaseMock({ error: { code, message: 'relation does not exist com texto@secreto.com' } });
    const handler = loadHandler(makeStripeMock(event), supa.exports);
    const res = makeRes();
    const mudo = mockSilencioso();
    try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
    assert.ok(res.code >= 500, code);
    assert.equal(supa.calls.find((c) => c.op === 'update'), undefined, 'sem idempotência não processa');
    assert.ok(!mudo.linhas.join('\n').includes('texto@secreto.com'), 'log sem a mensagem crua');
  }
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

test('customer.subscription.updated: unpaid/canceled rebaixa; past_due não escreve', async () => {
  for (const status of ['unpaid', 'canceled']) {
    const { update } = await rodaEvento({ id: 'evt_u_' + status, type: 'customer.subscription.updated', data: { object: { customer: 'cus_9', status } } });
    assert.ok(update, status + ' deve rebaixar');
    assert.equal(update.vals.plano, 'trial');
  }
  for (const status of ['past_due', 'incomplete']) {
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
  const event = { id: 'evt_fail1', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_1' } } };
  const supa = makeSupabaseMock({ error: null }, { updateResult: { data: null, error: { code: '57014', message: 'timeout com texto@secreto.com' } } });
  const handler = loadHandler(makeStripeMock(event), supa.exports);
  const res = makeRes();
  const mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 500);
  const del = supa.calls.find((c) => c.op === 'delete' && c.table === 'stripe_events');
  assert.deepEqual(del.filtros.map((f) => f[0]), ['event_id', 'processing_desde'], 'reversão só apaga a linha se o lease ainda for meu');
  assert.equal(del.filtros[1][1], supa.calls.find((c) => c.op === 'insert' && c.table === 'stripe_events').row.processing_desde);
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
  const event = { id: 'evt_fail4', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_1' } } };
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
    { id: 'evt_c', type: 'customer.subscription.updated', data: { object: { customer: 'cus_9', status: 'past_due' } } },
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
  const base = { metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_1' };
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
  const event = { id: 'evt_g5', type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_1' } } };
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

// ── A2: subscription.updated active/trialing PROMOVE a pro ────────────────────
const evUpd = (status, id) => ({ id: id || 'evt_up_' + status, type: 'customer.subscription.updated', data: { object: { id: 'sub_1', customer: 'cus_9', status } } });
const perfilTrial = { perfis: { data: [{ id: 'u9', plano: 'trial' }], error: null } };

test('subscription.updated active/trialing promove a pro (update por stripe_id), confirmando no Stripe', async () => {
  for (const status of ['active', 'trialing']) {
    const sopts = {};
    const { res, calls, update } = await rodaEvento(evUpd(status), sopts, perfilTrial);
    assert.equal(res.code, 200, status);
    assert.ok(update, status + ' deve promover');
    assert.equal(update.vals.plano, 'pro');
    assert.equal(update.col, 'stripe_id');
    assert.equal(update.val, 'cus_9');
    assert.deepEqual(sopts.retrieved, ['sub_1'], 'confirma o status vivo no Stripe antes de ativar');
    assert.ok(calls.some((c) => c.op === 'insert' && c.table === 'stripe_events'), 'passa pela idempotência');
  }
});

test('subscription.updated active: já pro, sem perfil, perfil duplicado, conta em exclusão → não escreve', async () => {
  const casos = [
    [{ perfis: { data: [{ id: 'u9', plano: 'pro' }], error: null } }, 'já pro'],
    [{ perfis: { data: [], error: null } }, 'sem perfil'],
    [{ perfis: { data: [{ id: 'a', plano: 'trial' }, { id: 'b', plano: 'trial' }], error: null } }, 'duplicado'],
    [{ ...perfilTrial, marca: true }, 'em exclusão'],
  ];
  for (const [supaOpts, rotulo] of casos) {
    const mudo = mockSilencioso();
    let r; try { r = await rodaEvento(evUpd('active', 'evt_np_' + rotulo), {}, supaOpts); } finally { mudo.restaura(); }
    assert.equal(r.res.code, 200, rotulo);
    assert.equal(r.update, undefined, rotulo + ' não pode promover');
  }
});

test('subscription.updated active mas o Stripe diz que NÃO está viva (evento atrasado) → não promove', async () => {
  const mudo = mockSilencioso();
  let r; try { r = await rodaEvento(evUpd('active', 'evt_late'), { sub: { id: 'sub_1', status: 'canceled' } }, perfilTrial); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 200);
  assert.equal(r.update, undefined);
});

test('subscription.updated active: erro do Stripe no retrieve → 500 e reverte a idempotência; erro de banco no update → 500', async () => {
  let mudo = mockSilencioso();
  let r; try { r = await rodaEvento(evUpd('active', 'evt_r1'), { retrieveErr: Object.assign(new Error('x'), { type: 'StripeConnectionError' }) }, perfilTrial); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 500);
  assert.equal(r.update, undefined);
  assert.ok(r.calls.some((c) => c.op === 'delete' && c.table === 'stripe_events'));

  mudo = mockSilencioso();
  try { r = await rodaEvento(evUpd('trialing', 'evt_r2'), {}, { ...perfilTrial, updateResult: { data: null, error: { code: '57014' } } }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 500);
});

// ── A3: confirmação no Stripe antes de ativar o checkout ──────────────────────
test('checkout: assinatura NÃO viva no Stripe (ou ausente/inexistente) → plano não é ativado; erro de rede → 500', async () => {
  const base = { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1' };
  for (const [obj, sopts] of [
    [{ ...base, subscription: 'sub_1' }, { sub: { id: 'sub_1', status: 'canceled' } }],
    [{ ...base, subscription: 'sub_1' }, { sub: { id: 'sub_1', status: 'incomplete_expired' } }],
    [{ ...base, subscription: 'sub_1' }, { retrieveErr: Object.assign(new Error('x'), { code: 'resource_missing' }) }],
    [{ ...base }, {}],
  ]) {
    const mudo = mockSilencioso();
    let r; try { r = await rodaEvento({ id: 'evt_nv', type: 'checkout.session.completed', data: { object: obj } }, sopts); } finally { mudo.restaura(); }
    assert.equal(r.res.code, 200);
    assert.equal(r.update, undefined);
  }
  const mudo = mockSilencioso();
  let r; try { r = await rodaEvento({ id: 'evt_nv2', type: 'checkout.session.completed', data: { object: { ...base, subscription: 'sub_1' } } }, { retrieveErr: Object.assign(new Error('x'), { type: 'StripeConnectionError' }) }); } finally { mudo.restaura(); }
  assert.equal(r.res.code, 500);
  assert.equal(r.update, undefined);
});

test('checkout: status vivo (active/trialing/past_due) no Stripe ativa o plano', async () => {
  for (const status of ['active', 'trialing', 'past_due']) {
    const mudo = mockSilencioso();
    let r; try { r = await rodaEvento({ id: 'evt_v_' + status, type: 'checkout.session.completed', data: { object: { mode: 'subscription', payment_status: 'paid', metadata: { userId: 'u1' }, customer: 'cus_1', subscription: 'sub_1' } } }, { sub: { id: 'sub_1', status } }); } finally { mudo.restaura(); }
    assert.ok(r.update && r.update.vals.plano === 'pro', status);
  }
});

// ── A3: lease / status processing|done ────────────────────────────────────────
const dup = { error: { code: '23505', message: 'dup' } };
const evDel = { id: 'evt_lease', type: 'customer.subscription.deleted', data: { object: { id: 'sub_v', customer: 'cus_9' } } };
async function rodaDup(evento, supaOpts) {
  const supa = makeSupabaseMock(dup, supaOpts);
  const handler = loadHandler(makeStripeMock(evDel, null, {}), supa.exports);
  const res = makeRes();
  const mudo = mockSilencioso();
  try { await handler(makeReq(evDel), res); } finally { mudo.restaura(); }
  return { res, calls: supa.calls };
}

test('lease: evento em processing há < 1 min → 503 (Retry-After), NÃO reprocessa e NÃO apaga a linha', async () => {
  const { res, calls } = await rodaDup(evDel, { evento: { data: { status: 'processing', processing_desde: new Date(Date.now() - 10000).toISOString() }, error: null } });
  assert.equal(res.code, 503);
  assert.equal(res.body.code, 'em_processamento');
  assert.ok(res.headers['Retry-After']);
  assert.equal(calls.find((c) => c.op === 'update' || c.op === 'delete'), undefined);
});

test('lease: evento em processing há > 1 min é REASSUMIDO (compare-and-swap) e reprocessado até o done', async () => {
  const antigo = new Date(Date.now() - 120000).toISOString();
  const { res, calls } = await rodaDup(evDel, { evento: { data: { status: 'processing', processing_desde: antigo }, error: null } });
  assert.equal(res.code, 200);
  const cas = calls.find((c) => c.op === 'update' && c.table === 'stripe_events' && 'processing_desde' in c.vals);
  assert.ok(cas, 'reassume o lease');
  assert.deepEqual(cas.filtros, [['event_id', 'evt_lease'], ['status', 'processing'], ['processing_desde', antigo]]);
  assert.ok(calls.some((c) => c.op === 'update' && c.table === 'profiles' && c.vals.plano === 'trial'), 'reprocessou');
  const ult = calls[calls.length - 1];
  assert.deepEqual(ult.vals, { status: 'done' });
});

test('lease vencido mas outro worker reassumiu antes (CAS sem linhas) → 503, sem reprocessar', async () => {
  const { res, calls } = await rodaDup(evDel, {
    evento: { data: { status: 'processing', processing_desde: new Date(Date.now() - 120000).toISOString() }, error: null },
    takeover: { data: [], error: null },
  });
  assert.equal(res.code, 503);
  assert.equal(calls.find((c) => c.op === 'update' && c.table === 'profiles'), undefined);
});

test('colunas do lease ausentes (migration 2026-10-04 pendente: 42703) → duplicado = já processado (modelo antigo)', async () => {
  const { res, calls } = await rodaDup(evDel, { evento: { data: null, error: { code: '42703' } } });
  assert.equal(res.code, 200);
  assert.equal(res.body.duplicate, true);
  assert.equal(calls.find((c) => c.op === 'update'), undefined);
});

test('erro ao ler a linha do evento duplicado (não é 42703) → falha fechada 503', async () => {
  const { res } = await rodaDup(evDel, { evento: { data: null, error: { code: '57014' } } });
  assert.equal(res.code, 503);
});

test('não marca done se o processamento falhou; falha ao marcar done não derruba a resposta (200)', async () => {
  const event = { id: 'evt_nd', type: 'customer.subscription.deleted', data: { object: { id: 'sub_v', customer: 'cus_9' } } };
  let supa = makeSupabaseMock({ error: null }, { updateResult: { error: { code: '08006' } } });
  let handler = loadHandler(makeStripeMock(event, null, {}), supa.exports);
  let res = makeRes(); let mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 500);
  assert.ok(!supa.calls.some((c) => c.op === 'update' && c.table === 'stripe_events'), 'nunca done após falha');

  supa = makeSupabaseMock({ error: null }, { doneErr: { code: '57014' } });
  handler = loadHandler(makeStripeMock(event, null, {}), supa.exports);
  res = makeRes(); mudo = mockSilencioso();
  try { await handler(makeReq(event), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 200);
  assert.ok(mudo.linhas.some((l) => l.includes('não foi marcado done')));
});

// ── B2: assinatura exigida antes de ler; teto de ~1 MB ────────────────────────
test('sem header stripe-signature → 400 sem ler o body, sem criar evento nem tocar o banco', async () => {
  const supa = makeSupabaseMock({ error: null });
  const sopts = {};
  const handler = loadHandler(makeStripeMock({ id: 'e', type: 'x', data: { object: {} } }, null, sopts), supa.exports);
  const res = makeRes();
  const req = makeReq({ a: 1 }, 'POST', { semAssinatura: true });
  const mudo = mockSilencioso();
  try { await handler(req, res); } finally { mudo.restaura(); }
  assert.equal(res.code, 400);
  assert.equal(req.lidos.chunks, 0, 'não leu o stream');
  assert.equal(sopts.construidos, 0);
  assert.equal(supa.calls.length, 0);
});

test('body acima de ~1 MB → 413 sem validar assinatura nem tocar o banco; abaixo do teto passa', async () => {
  const supa = makeSupabaseMock({ error: null });
  const sopts = {};
  const handler = loadHandler(makeStripeMock({ id: 'e', type: 'customer.created', data: { object: {} } }, null, sopts), supa.exports);
  let res = makeRes();
  await handler(makeReq(null, 'POST', { buf: Buffer.alloc(1000001, 97) }), res);
  assert.equal(res.code, 413);
  assert.equal(sopts.construidos, 0);
  assert.equal(supa.calls.length, 0);
  res = makeRes();
  await handler(makeReq(null, 'POST', { buf: Buffer.alloc(900000, 97) }), res);
  assert.equal(res.code, 200);
  assert.equal(sopts.construidos, 1);
});

// ── B3: logs nunca com err.message ────────────────────────────────────────────
test('assinatura inválida: o log não vaza a mensagem do SDK (só tipo/código)', async () => {
  const supa = makeSupabaseMock({ error: null });
  const handler = loadHandler(makeStripeMock(null, 'SEGREDO-do-sdk payload=texto@secreto.com'), supa.exports);
  const res = makeRes();
  const mudo = mockSilencioso();
  try { await handler(makeReq({ id: 'e' }), res); } finally { mudo.restaura(); }
  assert.equal(res.code, 400);
  assert.ok(!mudo.linhas.join('\n').includes('SEGREDO'));
});
