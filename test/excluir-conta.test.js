// Testes do /api/excluir-conta (LGPD — eliminação): auth, confirmação, ordem, idempotência,
// cancelamento no Stripe e fail-closed. Mocka 'stripe' e '@supabase/supabase-js' (sem rede).
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'excluir-conta.js');
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';
process.env.NEXT_PUBLIC_URL = 'https://app.example.com';

// opts: user (null=token inválido), stripeId, profileErr, subs, cancelErr, deleteErr ({tabela: erro}),
//       authDelErr
function setup(opts) {
  opts = opts || {};
  const st = { ops: [], cancelled: [], authDeleted: [], marcas: [], rpcs: [], expiradas: [], ordem: [], customersDel: [] };
  const user = opts.user === null ? null : { id: 'u1', email: 'a@b.com' };
  const supa = {
    createClient: () => ({
      auth: {
        getUser: async () => (user ? { data: { user }, error: null } : { data: null, error: { message: 'bad' } }),
        admin: { deleteUser: async (id) => { st.ordem.push('auth'); st.authDeleted.push(id); return { error: opts.authDelErr || null }; } },
      },
      rpc: async (fn, args) => { st.rpcs.push({ fn, args }); return opts.limite || { data: 0, error: null }; },
      from: (tabela) => ({
        upsert: async (linha) => { st.ordem.push('marca'); st.marcas.push({ tabela, linha }); return { error: opts.marcaErr || null }; },
        select: () => ({ eq: () => ({ maybeSingle: async () => (opts.profileErr ? { data: null, error: { code: 'XX000' } } : { data: { stripe_id: opts.stripeId || null }, error: null }) }) }),
        delete: () => ({ eq: async (col, val) => { st.ordem.push('del:' + tabela); st.ops.push({ tabela, col, val }); return { error: (opts.deleteErr && opts.deleteErr[tabela]) || null }; } }),
      }),
    }),
  };
  const stripe = () => ({
    subscriptions: {
      list: async () => ({ data: opts.subs || [] }),
      cancel: async (id) => { if (opts.cancelErr) throw opts.cancelErr; st.ordem.push('cancela'); st.cancelled.push(id); return {}; },
    },
    customers: { del: async (id) => { if (opts.delCustomerErr) throw opts.delCustomerErr; st.ordem.push('customer-del'); st.customersDel.push(id); return { deleted: true }; } },
    checkout: { sessions: {
      list: async () => ({ data: opts.abertas || [] }),
      expire: async (id) => { st.expiradas.push(id); return {}; },
    } },
  });
  return { handler: loadWithMocks(HANDLER, { stripe, '@supabase/supabase-js': supa }), st };
}
const req = (body, tok) => ({ method: 'POST', headers: tok === '' ? {} : { authorization: 'Bearer ' + (tok || 'tok') }, body });
const quieto = async (fn) => { const e = console.error, l = console.log; console.error = () => {}; console.log = () => {}; try { return await fn(); } finally { console.error = e; console.log = l; } };

test('método != POST → 405; OPTIONS → 200', async () => {
  const { handler } = setup();
  let res = makeRes(); await handler({ method: 'GET', headers: {} }, res); assert.equal(res.code, 405);
  res = makeRes(); await handler({ method: 'OPTIONS', headers: {} }, res); assert.equal(res.code, 200);
});

test('sem token → 401; token inválido → 401; nada é apagado', async () => {
  let { handler, st } = setup();
  let res = makeRes(); await handler(req({ confirmar: true }, ''), res);
  assert.equal(res.code, 401);
  ({ handler, st } = setup({ user: null }));
  res = makeRes(); await handler(req({ confirmar: true }), res);
  assert.equal(res.code, 401);
  assert.equal(st.ops.length, 0);
  assert.equal(st.authDeleted.length, 0);
});

test('sem confirmação explícita → 400 e nada é apagado', async () => {
  for (const body of [undefined, {}, { confirmar: 'true' }, { confirmar: false }, 'lixo']) {
    const { handler, st } = setup();
    const res = makeRes(); await handler(req(body), res);
    assert.equal(res.code, 400);
    assert.equal(res.body.code, 'confirmacao_obrigatoria');
    assert.equal(st.ops.length, 0);
  }
});

test('sucesso (sem Stripe): apaga HCs, PDFs, usos e perfil do usuário DO TOKEN, depois o Auth', async () => {
  const { handler, st } = setup();
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true, userId: 'vitima' }), res));
  assert.equal(res.code, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.deepEqual(st.ops.map((o) => o.tabela), ['historias_clinicas', 'pdf_exports', 'gerar_hc_usage', 'ai_assistant_usage', 'profiles']);
  assert.ok(st.ops.every((o) => o.val === 'u1'), 'sempre o id do token — o body é ignorado');
  assert.equal(st.ops.find((o) => o.tabela === 'profiles').col, 'id');
  assert.deepEqual(st.authDeleted, ['u1']);
  assert.equal(st.cancelled.length, 0);
});

test('com assinatura no Stripe: cancela as vivas (não as encerradas) ANTES de apagar', async () => {
  const { handler, st } = setup({ stripeId: 'cus_1', subs: [{ id: 'sub_a', status: 'active' }, { id: 'sub_b', status: 'canceled' }, { id: 'sub_c', status: 'past_due' }] });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 200);
  assert.deepEqual(st.cancelled, ['sub_a', 'sub_c']);
  assert.equal(st.authDeleted.length, 1);
});

test('falha ao cancelar no Stripe → 502 e NADA é apagado', async () => {
  const err = new Error('stripe fora'); err.type = 'StripeConnectionError';
  const { handler, st } = setup({ stripeId: 'cus_1', subs: [{ id: 'sub_a', status: 'active' }], cancelErr: err });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 502);
  assert.deepEqual(st.ops.map((o) => o.tabela), ['contas_em_exclusao'], 'nenhum dado apagado; só a marca de exclusão é REVERTIDA (M3)');
  assert.equal(st.ops[0].val, 'u1');
  assert.equal(st.authDeleted.length, 0);
  assert.equal(st.customersDel.length, 0);
});

test('customer inexistente no Stripe (resource_missing) → segue e apaga', async () => {
  const err = new Error('No such customer'); err.code = 'resource_missing';
  const stripeMod = () => ({ subscriptions: { list: async () => { throw err; } } });
  const st = { ops: [], authDeleted: [] };
  const supa = { createClient: () => ({
    rpc: async () => ({ data: 0, error: null }),
    auth: { getUser: async () => ({ data: { user: { id: 'u1' } }, error: null }), admin: { deleteUser: async (id) => { st.authDeleted.push(id); return { error: null }; } } },
    from: (t) => ({ upsert: async () => ({ error: null }), select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { stripe_id: 'cus_morto' }, error: null }) }) }), delete: () => ({ eq: async () => { st.ops.push(t); return { error: null }; } }) }),
  }) };
  const handler = loadWithMocks(HANDLER, { stripe: stripeMod, '@supabase/supabase-js': supa });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 200);
  assert.equal(st.authDeleted.length, 1);
});

test('stripe_id presente e STRIPE_SECRET_KEY ausente → 500 e nada apagado', async () => {
  const guardado = process.env.STRIPE_SECRET_KEY; delete process.env.STRIPE_SECRET_KEY;
  try {
    const { handler, st } = setup({ stripeId: 'cus_1' });
    const res = makeRes();
    await quieto(() => handler(req({ confirmar: true }), res));
    assert.equal(res.code, 500);
    assert.deepEqual(st.ops.map((o) => o.tabela), ['contas_em_exclusao'], 'só a reversão da marca');
  } finally { process.env.STRIPE_SECRET_KEY = guardado; }
});

test('falha ao ler o perfil → 503 fail-closed, nada apagado', async () => {
  const { handler, st } = setup({ profileErr: true });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 503);
  assert.deepEqual(st.ops.map((o) => o.tabela), ['contas_em_exclusao'], 'só a reversão da marca');
});

test('erro real ao apagar uma tabela → 500 e NÃO apaga o login (dá para repetir)', async () => {
  const { handler, st } = setup({ deleteErr: { gerar_hc_usage: { code: '57014' } } });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 500);
  assert.equal(st.authDeleted.length, 0);
  assert.ok(!st.ops.some((o) => o.tabela === 'profiles'), 'para na tabela que falhou');
});

test('tabela opcional ausente (42P01 / PGRST205) não é erro — idempotência com migrations parciais', async () => {
  for (const code of ['42P01', 'PGRST205']) {
    const { handler, st } = setup({ deleteErr: { pdf_exports: { code } } });
    const res = makeRes();
    await quieto(() => handler(req({ confirmar: true }), res));
    assert.equal(res.code, 200, code);
    assert.equal(st.authDeleted.length, 1);
  }
});

test('Auth: usuário já inexistente (404/user_not_found) = sucesso; outro erro → 500', async () => {
  let { handler } = setup({ authDelErr: { status: 404, code: 'user_not_found' } });
  let res = makeRes(); await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 200);
  ({ handler } = setup({ authDelErr: { status: 500, code: 'unexpected_failure' } }));
  res = makeRes(); await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 500);
});

test('logs não vazam e-mail nem conteúdo do body', async () => {
  const linhas = [];
  const e = console.error, l = console.log; console.error = (...a) => linhas.push(a.join(' ')); console.log = (...a) => linhas.push(a.join(' '));
  try {
    const { handler } = setup({ deleteErr: { historias_clinicas: { code: 'XX', message: 'a@b.com paciente Fulano' } } });
    await handler(req({ confirmar: true, nota: 'segredo-clinico' }), makeRes());
    const { handler: h2 } = setup();
    await h2(req({ confirmar: true, nota: 'segredo-clinico' }), makeRes());
  } finally { console.error = e; console.log = l; }
  const tudo = linhas.join('\n');
  assert.ok(!tudo.includes('a@b.com') && !tudo.includes('Fulano') && !tudo.includes('segredo-clinico'));
});

test('MARCA a conta em exclusão ANTES de cancelar no Stripe e de apagar qualquer coisa', async () => {
  const { handler, st } = setup({ stripeId: 'cus_1', subs: [{ id: 'sub_a', status: 'active' }] });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 200);
  assert.deepEqual(st.marcas, [{ tabela: 'contas_em_exclusao', linha: { user_id: 'u1' } }]);
  assert.equal(st.ordem[0], 'marca');
  assert.ok(st.ordem.indexOf('marca') < st.ordem.indexOf('cancela'));
  assert.ok(st.ordem.indexOf('cancela') < st.ordem.indexOf('del:historias_clinicas'));
  assert.equal(st.ordem[st.ordem.length - 1], 'auth', 'Auth por último');
});

test('não consegue marcar → 503 e NADA é feito (nem Stripe, nem delete)', async () => {
  const { handler, st } = setup({ stripeId: 'cus_1', subs: [{ id: 'sub_a', status: 'active' }], marcaErr: { code: '42P01' } });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 503);
  assert.equal(st.cancelled.length, 0);
  assert.equal(st.ops.length, 0);
  assert.equal(st.authDeleted.length, 0);
});

test('checkouts abertos do customer são expirados antes do cancelamento', async () => {
  const { handler, st } = setup({ stripeId: 'cus_1', subs: [], abertas: [{ id: 'cs_1' }, { id: 'cs_2' }] });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 200);
  assert.deepEqual(st.expiradas, ['cs_1', 'cs_2']);
});

test('rate limit: 429 com Retry-After (nada é feito); RPC ausente → 503 fail-closed', async () => {
  let { handler, st } = setup({ limite: { data: 1800, error: null } });
  let res = makeRes(); await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 429);
  assert.equal(res.headers['Retry-After'], '1800');
  assert.equal(res.body.code, 'rate_limited');
  assert.equal(st.marcas.length, 0);
  assert.equal(st.ops.length, 0);
  ({ handler, st } = setup({ limite: { data: null, error: { code: 'PGRST202' } } }));
  res = makeRes(); await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 503);
  assert.equal(st.marcas.length, 0);
  assert.equal(st.ops.length, 0);
});

test('o limite usado é excluir-conta 3/h e o Cache-Control é no-store', async () => {
  const { handler, st } = setup();
  const res = makeRes(); await quieto(() => handler(req({ confirmar: true }), res));
  assert.deepEqual(st.rpcs[0], { fn: 'consumir_limite', args: { p_user_id: 'u1', p_acao: 'excluir-conta', p_janela_seg: 3600, p_max: 3 } });
  assert.equal(res.headers['Cache-Control'], 'no-store');
});

test('corpo sem confirmação não gasta o limite', async () => {
  const { handler, st } = setup();
  await handler(req({}), makeRes());
  assert.equal(st.rpcs.length, 0);
});

// ── M2: apaga o customer no Stripe (best effort) ──────────────────────────────
test('após cancelar as assinaturas apaga o customer no Stripe, antes de apagar os dados', async () => {
  const { handler, st } = setup({ stripeId: 'cus_1', subs: [{ id: 'sub_a', status: 'active' }] });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 200);
  assert.deepEqual(st.customersDel, ['cus_1']);
  assert.ok(st.ordem.indexOf('cancela') < st.ordem.indexOf('customer-del'));
  assert.ok(st.ordem.indexOf('customer-del') < st.ordem.indexOf('del:historias_clinicas'));
});

test('falha ao apagar o customer é só log (200) e não vaza a mensagem do SDK', async () => {
  const err = new Error('SEGREDO@x.com'); err.type = 'StripeAPIError';
  const { handler, st } = setup({ stripeId: 'cus_1', delCustomerErr: err });
  const res = makeRes();
  const linhas = [];
  const e = console.error, l = console.log; console.error = (...a) => linhas.push(a.join(' ')); console.log = () => {};
  try { await handler(req({ confirmar: true }), res); } finally { console.error = e; console.log = l; }
  assert.equal(res.code, 200);
  assert.ok(st.authDeleted.length === 1);
  assert.ok(linhas.some((x) => x.includes('customer do Stripe não apagado')));
  assert.ok(!linhas.join('\n').includes('SEGREDO'));
});

test('falha DEPOIS de apagar dados (ex.: tabela) mantém a marca de exclusão (não reverte)', async () => {
  const { handler, st } = setup({ deleteErr: { gerar_hc_usage: { code: '57014' } } });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 500);
  assert.ok(!st.ops.some((o) => o.tabela === 'contas_em_exclusao'));
});
