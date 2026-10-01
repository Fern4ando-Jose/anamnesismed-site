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
  const st = { ops: [], cancelled: [], authDeleted: [] };
  const user = opts.user === null ? null : { id: 'u1', email: 'a@b.com' };
  const supa = {
    createClient: () => ({
      auth: {
        getUser: async () => (user ? { data: { user }, error: null } : { data: null, error: { message: 'bad' } }),
        admin: { deleteUser: async (id) => { st.authDeleted.push(id); return { error: opts.authDelErr || null }; } },
      },
      from: (tabela) => ({
        select: () => ({ eq: () => ({ maybeSingle: async () => (opts.profileErr ? { data: null, error: { code: 'XX000' } } : { data: { stripe_id: opts.stripeId || null }, error: null }) }) }),
        delete: () => ({ eq: async (col, val) => { st.ops.push({ tabela, col, val }); return { error: (opts.deleteErr && opts.deleteErr[tabela]) || null }; } }),
      }),
    }),
  };
  const stripe = () => ({
    subscriptions: {
      list: async () => ({ data: opts.subs || [] }),
      cancel: async (id) => { if (opts.cancelErr) throw opts.cancelErr; st.cancelled.push(id); return {}; },
    },
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
  assert.equal(st.ops.length, 0);
  assert.equal(st.authDeleted.length, 0);
});

test('customer inexistente no Stripe (resource_missing) → segue e apaga', async () => {
  const err = new Error('No such customer'); err.code = 'resource_missing';
  const stripeMod = () => ({ subscriptions: { list: async () => { throw err; } } });
  const st = { ops: [], authDeleted: [] };
  const supa = { createClient: () => ({
    auth: { getUser: async () => ({ data: { user: { id: 'u1' } }, error: null }), admin: { deleteUser: async (id) => { st.authDeleted.push(id); return { error: null }; } } },
    from: (t) => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { stripe_id: 'cus_morto' }, error: null }) }) }), delete: () => ({ eq: async () => { st.ops.push(t); return { error: null }; } }) }),
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
    assert.equal(st.ops.length, 0);
  } finally { process.env.STRIPE_SECRET_KEY = guardado; }
});

test('falha ao ler o perfil → 503 fail-closed, nada apagado', async () => {
  const { handler, st } = setup({ profileErr: true });
  const res = makeRes();
  await quieto(() => handler(req({ confirmar: true }), res));
  assert.equal(res.code, 503);
  assert.equal(st.ops.length, 0);
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
