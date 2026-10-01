// Testes do /api/create-checkout-session: exige token, identidade vem do token, body validado.
// Mocka 'stripe' e '@supabase/supabase-js' (sem rede). Roda com: node --test
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'create-checkout-session.js');
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
process.env.STRIPE_PRICE_ID = 'price_dummy';
process.env.NEXT_PUBLIC_URL = 'https://app.example.com';
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';

// opts: perfil ({plano, stripe_id} | null | 'erro'), subs (lista devolvida por subscriptions.list),
// createErr (função que lança em checkout.sessions.create; recebe o payload)
function setup(user, opts) {
  opts = opts || {};
  const created = [];
  const listCalls = [];
  const rpcs = [];
  const perfil = opts.perfil === undefined ? { plano: 'trial', stripe_id: null } : opts.perfil;
  const supa = {
    createClient: () => ({
      auth: { getUser: async () => (user ? { data: { user }, error: null } : { data: null, error: { message: 'bad' } }) },
      rpc: async (fn, args) => { rpcs.push({ fn, args }); return opts.limite || { data: 0, error: null }; },
      from: (tabela) => ({ select: () => ({ eq: () => ({ maybeSingle: async () => {
        if (tabela === 'contas_em_exclusao') return opts.marcaErr ? { data: null, error: opts.marcaErr } : { data: opts.marca ? { user_id: 'u1' } : null, error: null };
        return perfil === 'erro' ? { data: null, error: { code: 'XX000' } } : { data: perfil, error: null };
      } }) }) }),
    }),
  };
  const stripe = () => ({
    subscriptions: { list: async (p) => { listCalls.push(p); if (opts.listErr) throw new Error('stripe fora'); return { data: opts.subs || [] }; } },
    checkout: { sessions: { create: async (p) => { created.push(p); if (opts.createErr) opts.createErr(p); return { url: 'https://checkout.stripe.com/x' }; } } },
  });
  return { handler: loadWithMocks(HANDLER, { stripe, '@supabase/supabase-js': supa }), created, listCalls, rpcs };
}
const withTok = (body) => ({ method: 'POST', headers: { authorization: 'Bearer tok' }, body });

test('sem Authorization → 401 e não cria sessão', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' });
  const res = makeRes();
  await handler({ method: 'POST', headers: {}, body: { email: 'x@y.com', userId: 'outro' } }, res);
  assert.equal(res.code, 401);
  assert.equal(created.length, 0);
});

test('token inválido → 401', async () => {
  const { handler, created } = setup(null);
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(res.code, 401);
  assert.equal(created.length, 0);
});

test('userId/email do body são IGNORADOS: vêm do token', async () => {
  const { handler, created } = setup({ id: 'u-token', email: 'token@b.com' });
  const res = makeRes();
  await handler(withTok({ email: 'atacante@x.com', userId: 'vitima' }), res);
  assert.equal(res.code, 200);
  assert.equal(res.body.url, 'https://checkout.stripe.com/x');
  assert.equal(created[0].metadata.userId, 'u-token');
  assert.equal(created[0].customer_email, 'token@b.com');
});

test('body undefined com token válido → não dá 500', async () => {
  const { handler } = setup({ id: 'u1', email: 'a@b.com' });
  const res = makeRes();
  await handler(withTok(undefined), res);
  assert.equal(res.code, 200);
});

test('body não-objeto → 400', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' });
  const res = makeRes();
  await handler(withTok('lixo'), res);
  assert.equal(res.code, 400);
  assert.equal(created.length, 0);
});

test('método != POST → 405', async () => {
  const { handler } = setup(null);
  const res = makeRes();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.code, 405);
});

// ── Já é pro / customer existente ─────────────────────────────────────────────
test('pro com assinatura ativa → 409 claro e NÃO cria sessão', async () => {
  for (const status of ['active', 'trialing', 'past_due']) {
    const { handler, created, listCalls } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: { plano: 'pro', stripe_id: 'cus_1' }, subs: [{ status }] });
    const res = makeRes();
    await handler(withTok({}), res);
    assert.equal(res.code, 409, status);
    assert.equal(res.body.code, 'already_subscribed');
    assert.match(res.body.error, /assinatura ativa/);
    assert.equal(created.length, 0);
    assert.equal(listCalls[0].customer, 'cus_1');
  }
});

test('plano local desatualizado (trial) mas com assinatura viva no Stripe → 409 e NÃO cria sessão', async () => {
  const { handler, created, listCalls } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: { plano: 'trial', stripe_id: 'cus_1' }, subs: [{ status: 'active' }] });
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(res.code, 409);
  assert.equal(res.body.code, 'already_subscribed');
  assert.equal(created.length, 0);
  assert.equal(listCalls[0].customer, 'cus_1');
});

test('pro mas Stripe só mostra assinatura cancelada → deixa assinar de novo', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: { plano: 'pro', stripe_id: 'cus_1' }, subs: [{ status: 'canceled' }] });
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(res.code, 200);
  assert.equal(created[0].customer, 'cus_1');
});

test('pro e falha ao consultar o Stripe → fail-closed (500) sem criar sessão', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: { plano: 'pro', stripe_id: 'cus_1' }, listErr: true });
  const res = makeRes();
  const orig = console.error; console.error = () => {};
  try { await handler(withTok({}), res); } finally { console.error = orig; }
  assert.equal(res.code, 500);
  assert.equal(created.length, 0);
});

test('com stripe_id → usa customer (e NUNCA customer_email junto)', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: { plano: 'trial', stripe_id: 'cus_7' } });
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(res.code, 200);
  assert.equal(created[0].customer, 'cus_7');
  assert.equal(created[0].customer_email, undefined);
});

test('sem stripe_id → customer_email do token', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: { plano: 'trial', stripe_id: null } });
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(created[0].customer_email, 'a@b.com');
  assert.equal(created[0].customer, undefined);
});

test('stripe_id órfão (resource_missing) → recai em customer_email', async () => {
  let n = 0;
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, {
    perfil: { plano: 'trial', stripe_id: 'cus_morto' },
    createErr: () => { if (++n === 1) { const e = new Error('No such customer'); e.code = 'resource_missing'; throw e; } },
  });
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(res.code, 200);
  assert.equal(created.length, 2);
  assert.equal(created[1].customer_email, 'a@b.com');
  assert.equal(created[1].customer, undefined);
});

test('falha ao ler o perfil → 503 fail-closed, sem criar sessão', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: 'erro' });
  const res = makeRes();
  const orig = console.error; console.error = () => {};
  try { await handler(withTok({}), res); } finally { console.error = orig; }
  assert.equal(res.code, 503);
  assert.equal(created.length, 0);
});

test('perfil inexistente (null) → segue como trial com customer_email', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { perfil: null });
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(res.code, 200);
  assert.equal(created[0].customer_email, 'a@b.com');
});

// ── Exclusão em andamento, rate limit e CORS ──────────────────────────────────
test('conta marcada como em exclusão → 409 conta_em_exclusao e NÃO cria sessão', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { marca: true });
  const res = makeRes();
  await handler(withTok({}), res);
  assert.equal(res.code, 409);
  assert.equal(res.body.code, 'conta_em_exclusao');
  assert.equal(created.length, 0);
});

test('não consegue ler a marca de exclusão (tabela ausente/erro) → 503 fail-closed', async () => {
  const { handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { marcaErr: { code: '42P01' } });
  const res = makeRes();
  const orig = console.error; console.error = () => {};
  try { await handler(withTok({}), res); } finally { console.error = orig; }
  assert.equal(res.code, 503);
  assert.equal(created.length, 0);
});

test('rate limit: usa checkout 20/h; 429 + Retry-After; RPC ausente → 503; nada é criado', async () => {
  let { handler, created, rpcs } = setup({ id: 'u1', email: 'a@b.com' });
  let res = makeRes(); await handler(withTok({}), res);
  assert.deepEqual(rpcs[0], { fn: 'consumir_limite', args: { p_user_id: 'u1', p_acao: 'checkout', p_janela_seg: 3600, p_max: 20 } });
  ({ handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { limite: { data: 120, error: null } }));
  res = makeRes(); await handler(withTok({}), res);
  assert.equal(res.code, 429); assert.equal(res.headers['Retry-After'], '120'); assert.equal(created.length, 0);
  const orig = console.error; console.error = () => {};
  try {
    ({ handler, created } = setup({ id: 'u1', email: 'a@b.com' }, { limite: { data: null, error: { code: 'PGRST202' } } }));
    res = makeRes(); await handler(withTok({}), res);
  } finally { console.error = orig; }
  assert.equal(res.code, 503); assert.equal(created.length, 0);
});

test('CORS restrito à origem do app, no-store e preflight', async () => {
  const { handler } = setup({ id: 'u1', email: 'a@b.com' });
  const res = makeRes(); await handler({ method: 'OPTIONS', headers: {} }, res);
  assert.equal(res.code, 200);
  assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://app.example.com');
  assert.equal(res.headers['Cache-Control'], 'no-store');
});
