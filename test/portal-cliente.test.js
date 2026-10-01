// Testes do /api/portal-cliente (Billing Portal do Stripe). Mocka 'stripe' e '@supabase/supabase-js'.
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'portal-cliente.js');
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
process.env.NEXT_PUBLIC_URL = 'https://app.example.com';
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';

// opts: user (null=token inválido), perfil ({stripe_id}|null|'erro'), limite, portalErr
function setup(opts) {
  opts = opts || {};
  const st = { criadas: [], rpcs: [] };
  const user = opts.user === null ? null : { id: 'u1', email: 'a@b.com' };
  const perfil = opts.perfil === undefined ? { stripe_id: 'cus_1' } : opts.perfil;
  const supa = { createClient: () => ({
    auth: { getUser: async () => (user ? { data: { user }, error: null } : { data: null, error: { message: 'bad' } }) },
    rpc: async (fn, args) => { st.rpcs.push({ fn, args }); return opts.limite || { data: 0, error: null }; },
    from: () => ({ select: () => ({ eq: (col, val) => { st.eq = [col, val]; return { maybeSingle: async () => (perfil === 'erro' ? { data: null, error: { code: 'XX000' } } : { data: perfil, error: null }) }; } }) }),
  }) };
  const stripe = () => ({ billingPortal: { sessions: { create: async (p) => { if (opts.portalErr) throw opts.portalErr; st.criadas.push(p); return { url: 'https://billing.stripe.com/p/x' }; } } } });
  return { handler: loadWithMocks(HANDLER, { stripe, '@supabase/supabase-js': supa }), st };
}
const req = (tok) => ({ method: 'POST', headers: tok === '' ? {} : { authorization: 'Bearer ' + (tok || 'tok') }, body: { customer: 'cus_de_outro' } });
const mudo = async (fn) => { const e = console.error; console.error = () => {}; try { return await fn(); } finally { console.error = e; } };

test('método != POST → 405; OPTIONS → 200 com CORS do app e no-store', async () => {
  const { handler } = setup();
  let res = makeRes(); await handler({ method: 'GET', headers: {} }, res); assert.equal(res.code, 405);
  res = makeRes(); await handler({ method: 'OPTIONS', headers: {} }, res);
  assert.equal(res.code, 200);
  assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://app.example.com');
  assert.equal(res.headers['Cache-Control'], 'no-store');
});

test('sem token / token inválido → 401 e não cria sessão', async () => {
  let { handler, st } = setup();
  let res = makeRes(); await handler(req(''), res); assert.equal(res.code, 401);
  ({ handler, st } = setup({ user: null }));
  res = makeRes(); await handler(req(), res); assert.equal(res.code, 401);
  assert.equal(st.criadas.length, 0);
});

test('cria a sessão do customer do PERFIL do token (body ignorado) com return_url do app', async () => {
  const { handler, st } = setup();
  const res = makeRes(); await handler(req(), res);
  assert.equal(res.code, 200);
  assert.equal(res.body.url, 'https://billing.stripe.com/p/x');
  assert.deepEqual(st.criadas[0], { customer: 'cus_1', return_url: 'https://app.example.com/anamnesismed-config.html#plano' });
  assert.deepEqual(st.eq, ['id', 'u1']);
});

test('sem stripe_id → 404 sem_assinatura; customer morto no Stripe → 404; erro do Stripe → 502', async () => {
  let { handler, st } = setup({ perfil: { stripe_id: null } });
  let res = makeRes(); await handler(req(), res);
  assert.equal(res.code, 404); assert.equal(res.body.code, 'sem_assinatura'); assert.equal(st.criadas.length, 0);
  ({ handler } = setup({ perfil: null }));
  res = makeRes(); await handler(req(), res); assert.equal(res.code, 404);
  ({ handler } = setup({ portalErr: Object.assign(new Error('x'), { code: 'resource_missing' }) }));
  res = makeRes(); await mudo(() => handler(req(), res)); assert.equal(res.code, 404);
  ({ handler } = setup({ portalErr: Object.assign(new Error('portal não configurado'), { type: 'invalid_request_error' }) }));
  res = makeRes(); await mudo(() => handler(req(), res)); assert.equal(res.code, 502); assert.equal(res.body.code, 'portal_indisponivel');
});

test('falha ao ler o perfil → 503 fail-closed', async () => {
  const { handler, st } = setup({ perfil: 'erro' });
  const res = makeRes(); await mudo(() => handler(req(), res));
  assert.equal(res.code, 503); assert.equal(st.criadas.length, 0);
});

test('rate limit portal-cliente 20/h: 429 + Retry-After; RPC ausente → 503', async () => {
  let { handler, st } = setup({ limite: { data: 60, error: null } });
  let res = makeRes(); await handler(req(), res);
  assert.equal(res.code, 429); assert.equal(res.headers['Retry-After'], '60'); assert.equal(st.criadas.length, 0);
  assert.deepEqual(st.rpcs[0].args, { p_user_id: 'u1', p_acao: 'portal-cliente', p_janela_seg: 3600, p_max: 20 });
  ({ handler, st } = setup({ limite: { data: null, error: { code: 'PGRST202' } } }));
  res = makeRes(); await mudo(() => handler(req(), res));
  assert.equal(res.code, 503); assert.equal(st.criadas.length, 0);
});

test('envs ausentes → 500', async () => {
  const g = process.env.STRIPE_SECRET_KEY; delete process.env.STRIPE_SECRET_KEY;
  try {
    const { handler } = setup();
    const res = makeRes(); await mudo(() => handler(req(), res)); assert.equal(res.code, 500);
  } finally { process.env.STRIPE_SECRET_KEY = g; }
});
