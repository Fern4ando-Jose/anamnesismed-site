// Testes de INTEGRAÇÃO do controle de acesso nos handlers: checkout, gerar-hc, assistente-dx.
// Garante que ninguém sem direito chega ao Stripe nem à API paga da Anthropic.
const test = require('node:test');
const assert = require('node:assert');
const { makeSupabase, makeAnthropic, makeStripe, loadHandler, makeRes, futuro, passado } = require('./_mocks');

const U = { id: 'u1', email: 'dono@x.com' };
const reqPost = (body, token) => ({ method: 'POST', headers: token ? { authorization: 'Bearer ' + token } : {}, body });

// ── create-checkout-session ───────────────────────────────────────────────────
function checkout(supa, stripe) {
  return loadHandler('api/create-checkout-session.js', { '@supabase/supabase-js': supa.exports, stripe: stripe.exports });
}

test('checkout: sem Authorization → 401 e NENHUMA sessão Stripe criada', async () => {
  const stripe = makeStripe();
  const res = makeRes();
  await checkout(makeSupabase({ users: { tok: U } }), stripe)(reqPost({ email: 'x@y', userId: 'vitima' }), res);
  assert.equal(res.statusCode, 401);
  assert.equal(stripe.state.sessions.length, 0);
});

test('checkout: token inválido → 401', async () => {
  const stripe = makeStripe();
  const res = makeRes();
  await checkout(makeSupabase({ users: { tok: U } }), stripe)(reqPost({}, 'falso'), res);
  assert.equal(res.statusCode, 401);
  assert.equal(stripe.state.sessions.length, 0);
});

test('checkout: usa userId/e-mail do TOKEN e ignora os do corpo (não dá para pagar por outro)', async () => {
  const stripe = makeStripe();
  const res = makeRes();
  await checkout(makeSupabase({ users: { tok: U } }), stripe)(reqPost({ email: 'outro@y', userId: 'vitima' }, 'tok'), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.url, 'https://stripe.test/pay');
  assert.equal(stripe.state.sessions.length, 1);
  assert.equal(stripe.state.sessions[0].metadata.userId, 'u1');
  assert.equal(stripe.state.sessions[0].customer_email, 'dono@x.com');
});

test('checkout: CORS libera o header Authorization', async () => {
  const res = makeRes();
  await checkout(makeSupabase(), makeStripe())({ method: 'OPTIONS', headers: {} }, res);
  assert.match(res.headers['Access-Control-Allow-Headers'], /Authorization/);
});

// ── gerar-hc ──────────────────────────────────────────────────────────────────
const bodyHC = { lang: 'pt', motivos: [{ ordem: 1, nome: 'Dor', respostas: [{ pergunta: 'p', resposta: 'r' }] }], relatoLivre: 'dor há 2 dias' };
function gerarHC(supa, ia) {
  return loadHandler('api/gerar-hc.js', { '@supabase/supabase-js': supa.exports, '@anthropic-ai/sdk': ia.exports });
}

test('gerar-hc: sem token → 401, IA não chamada', async () => {
  const ia = makeAnthropic(); const res = makeRes();
  await gerarHC(makeSupabase({ users: { tok: U } }), ia)(reqPost(bodyHC), res);
  assert.equal(res.statusCode, 401); assert.equal(ia.state.chamadas, 0);
});

test('gerar-hc: trial VENCIDO → 403 upgrade, IA não chamada (antes passava)', async () => {
  const ia = makeAnthropic(); const res = makeRes();
  await gerarHC(makeSupabase({ users: { tok: U }, profiles: { u1: { plano: 'trial', trial_end: passado() } } }), ia)(reqPost(bodyHC, 'tok'), res);
  assert.equal(res.statusCode, 403); assert.equal(res.body.code, 'upgrade'); assert.equal(ia.state.chamadas, 0);
});

test('gerar-hc: trial vigente e planos pagos passam do gate (chegam à IA)', async () => {
  for (const perfil of [{ plano: 'trial', trial_end: futuro() }, { plano: 'pro' }, { plano: 'medico' }]) {
    const ia = makeAnthropic(); const res = makeRes();
    await gerarHC(makeSupabase({ users: { tok: U }, profiles: { u1: perfil } }), ia)(reqPost(bodyHC, 'tok'), res);
    assert.notEqual(res.statusCode, 401, JSON.stringify(perfil));
    assert.notEqual(res.statusCode, 403, JSON.stringify(perfil));
    assert.ok(ia.state.chamadas >= 1, 'deveria ter chegado à chamada da IA: ' + JSON.stringify(perfil));
  }
});

// ── assistente-dx ─────────────────────────────────────────────────────────────
const bodyDx = { lang: 'pt', hc: { relatoLivre: 'dor abdominal há 2 dias' } };
function assistente(supa, ia) {
  return loadHandler('api/assistente-dx.js', { '@supabase/supabase-js': supa.exports, '@anthropic-ai/sdk': ia.exports });
}

test('assistente-dx: trial (mesmo vigente) → 403 upgrade; IA não chamada', async () => {
  const ia = makeAnthropic(); const res = makeRes();
  await assistente(makeSupabase({ users: { tok: U }, profiles: { u1: { plano: 'trial', trial_end: futuro() } } }), ia)(reqPost(bodyDx, 'tok'), res);
  assert.equal(res.statusCode, 403); assert.equal(res.body.code, 'upgrade'); assert.equal(ia.state.chamadas, 0);
});

test('assistente-dx: erro de banco ao ler o plano → 503, IA não chamada', async () => {
  const ia = makeAnthropic(); const res = makeRes();
  await assistente(makeSupabase({ users: { tok: U }, profileError: { code: '08006', message: 'down' } }), ia)(reqPost(bodyDx, 'tok'), res);
  assert.equal(res.statusCode, 503); assert.equal(ia.state.chamadas, 0);
});

test('assistente-dx: planos pro/estudante/medico passam do gate', async () => {
  for (const plano of ['pro', 'estudante', 'medico']) {
    const ia = makeAnthropic(); const res = makeRes();
    await assistente(makeSupabase({ users: { tok: U }, profiles: { u1: { plano } } }), ia)(reqPost(bodyDx, 'tok'), res);
    assert.notEqual(res.statusCode, 401, plano);
    assert.notEqual(res.statusCode, 403, plano);
    assert.ok(ia.state.chamadas >= 1, plano);
  }
});
