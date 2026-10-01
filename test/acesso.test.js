// Testes do gate de acesso (api/_lib/acesso.js): autenticação, plano pago, trial, falhas de banco.
const test = require('node:test');
const assert = require('node:assert');
const { makeSupabase, loadHandler, futuro, passado } = require('./_mocks');

function gate(supa) {
  return loadHandler('api/_lib/acesso.js', { '@supabase/supabase-js': supa.exports });
}
const req = (token) => ({ headers: token ? { authorization: 'Bearer ' + token } : {} });
const U = { id: 'u1', email: 'a@x.com' };
const supaCom = (perfil, extra) => makeSupabase(Object.assign({ users: { tok: U }, profiles: perfil ? { u1: perfil } : {} }, extra));

test('avaliarPlano: pago, trial vigente, trial vencido, trial sem data, plano desconhecido', () => {
  const { avaliarPlano } = gate(makeSupabase());
  for (const p of ['pro', 'estudante', 'medico']) assert.equal(avaliarPlano({ plano: p }).pago, true, p);
  assert.equal(avaliarPlano({ plano: 'trial', trial_end: futuro() }).trialAtivo, true);
  assert.equal(avaliarPlano({ plano: 'trial', trial_end: passado() }).trialAtivo, false);
  assert.equal(avaliarPlano({ plano: 'trial', trial_end: null }).trialAtivo, false);
  assert.equal(avaliarPlano({ plano: 'trial', trial_end: 'lixo' }).trialAtivo, false);
  assert.equal(avaliarPlano({ plano: 'admin' }).pago, false);
  assert.equal(avaliarPlano(null).pago, false);
});

test('sem token → 401; token inválido → 401', async () => {
  const { exigirAcesso } = gate(supaCom({ plano: 'pro' }));
  let r = await exigirAcesso(req(null), { exigir: 'pago' });
  assert.equal(r.ok, false); assert.equal(r.status, 401);
  r = await exigirAcesso(req('falso'), { exigir: 'pago' });
  assert.equal(r.ok, false); assert.equal(r.status, 401);
});

test("exigir 'logado': basta autenticar; userId/e-mail vêm do token", async () => {
  const { exigirAcesso } = gate(supaCom(null));
  const r = await exigirAcesso(req('tok'), { exigir: 'logado' });
  assert.equal(r.ok, true); assert.equal(r.userId, 'u1'); assert.equal(r.email, 'a@x.com');
});

test("exigir 'pago': pro/estudante/medico passam; trial e vencido → 403 upgrade", async () => {
  for (const plano of ['pro', 'estudante', 'medico']) {
    const { exigirAcesso } = gate(supaCom({ plano }));
    assert.equal((await exigirAcesso(req('tok'), { exigir: 'pago' })).ok, true, plano);
  }
  for (const perfil of [{ plano: 'trial', trial_end: futuro() }, { plano: 'trial', trial_end: passado() }, { plano: null }, null]) {
    const { exigirAcesso } = gate(supaCom(perfil));
    const r = await exigirAcesso(req('tok'), { exigir: 'pago' });
    assert.equal(r.ok, false, JSON.stringify(perfil)); assert.equal(r.status, 403); assert.equal(r.body.code, 'upgrade');
  }
});

test("exigir 'pago_ou_trial': trial vigente e pago passam; vencido/sem data → 403", async () => {
  let g = gate(supaCom({ plano: 'trial', trial_end: futuro() }));
  assert.equal((await g.exigirAcesso(req('tok'), { exigir: 'pago_ou_trial' })).ok, true);
  g = gate(supaCom({ plano: 'medico' }));
  assert.equal((await g.exigirAcesso(req('tok'), { exigir: 'pago_ou_trial' })).ok, true);
  for (const perfil of [{ plano: 'trial', trial_end: passado() }, { plano: 'trial', trial_end: null }]) {
    g = gate(supaCom(perfil));
    const r = await g.exigirAcesso(req('tok'), { exigir: 'pago_ou_trial' });
    assert.equal(r.ok, false); assert.equal(r.status, 403); assert.equal(r.body.code, 'upgrade');
  }
});

test('erro de banco ao ler profiles → 503 plan_unavailable (fail-closed, não 403 de upgrade)', async () => {
  const { exigirAcesso } = gate(supaCom({ plano: 'pro' }, { profileError: { code: '08006', message: 'db down' } }));
  const r = await exigirAcesso(req('tok'), { exigir: 'pago' });
  assert.equal(r.ok, false); assert.equal(r.status, 503); assert.equal(r.body.code, 'plan_unavailable');
});

test('mensagens respeitam o idioma (msg)', async () => {
  const { exigirAcesso } = gate(supaCom({ plano: 'trial', trial_end: passado() }));
  const es = await exigirAcesso(req('tok'), { exigir: 'pago_ou_trial', msg: (p, e) => e });
  assert.match(es.body.error, /prueba/);
  const pt = await exigirAcesso(req('tok'), { exigir: 'pago_ou_trial', msg: (p) => p });
  assert.match(pt.body.error, /teste/);
});
