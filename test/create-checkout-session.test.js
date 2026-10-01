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

function setup(user) {
  const created = [];
  const supa = { createClient: () => ({ auth: { getUser: async () => (user ? { data: { user }, error: null } : { data: null, error: { message: 'bad' } }) } }) };
  const stripe = () => ({ checkout: { sessions: { create: async (p) => { created.push(p); return { url: 'https://checkout.stripe.com/x' }; } } } });
  return { handler: loadWithMocks(HANDLER, { stripe, '@supabase/supabase-js': supa }), created };
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
