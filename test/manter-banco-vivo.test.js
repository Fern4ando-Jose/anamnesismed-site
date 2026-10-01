// Testes do /api/manter-banco-vivo (cron): fail-closed sem CRON_SECRET, 401 com Bearer errado, 200 correto.
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'manter-banco-vivo.js');

function setup(resultado) {
  const state = { consultas: 0 };
  const supa = { createClient: () => ({ from: () => ({ select: async () => { state.consultas++; return resultado || { error: null, count: 7 }; } }) }) };
  return { handler: loadWithMocks(HANDLER, { '@supabase/supabase-js': supa }), state };
}
function comEnv(env, fn) {
  const chaves = ['CRON_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_KEY'];
  const antes = {}; chaves.forEach((k) => { antes[k] = process.env[k]; delete process.env[k]; });
  Object.assign(process.env, env);
  const e = console.error, l = console.log; console.error = () => {}; console.log = () => {};
  return Promise.resolve(fn()).finally(() => {
    console.error = e; console.log = l;
    chaves.forEach((k) => { if (antes[k] === undefined) delete process.env[k]; else process.env[k] = antes[k]; });
  });
}
const ENV = { CRON_SECRET: 'segredo-cron', SUPABASE_URL: 'https://x.supabase.co', SUPABASE_SERVICE_KEY: 'svc' };
const req = (auth, method) => ({ method: method || 'GET', headers: auth === undefined ? {} : { authorization: auth } });

test('sem CRON_SECRET → 503 (fail-closed), mesmo com header x-vercel-cron forjado, e não toca o banco', async () => {
  await comEnv({ SUPABASE_URL: ENV.SUPABASE_URL, SUPABASE_SERVICE_KEY: ENV.SUPABASE_SERVICE_KEY }, async () => {
    const { handler, state } = setup();
    const res = makeRes();
    await handler({ method: 'GET', headers: { 'x-vercel-cron': '1', authorization: 'Bearer qualquer' } }, res);
    assert.equal(res.code, 503);
    assert.equal(state.consultas, 0);
  });
});

test('Bearer errado ou ausente → 401 e não toca o banco', async () => {
  await comEnv(ENV, async () => {
    for (const auth of ['Bearer errado', undefined, 'segredo-cron', 'bearer segredo-cron']) {
      const { handler, state } = setup();
      const res = makeRes(); await handler(req(auth), res);
      assert.equal(res.code, 401, String(auth));
      assert.equal(state.consultas, 0);
    }
  });
});

test('Bearer correto → 200 com contagem de perfis (sem dado de paciente)', async () => {
  await comEnv(ENV, async () => {
    const { handler, state } = setup();
    const res = makeRes(); await handler(req('Bearer segredo-cron'), res);
    assert.equal(res.code, 200);
    assert.equal(res.body.ok, true);
    assert.equal(res.body.perfis, 7);
    assert.equal(state.consultas, 1);
  });
});

test('banco fora do ar → 503 com mensagem fixa (sem vazar erro cru)', async () => {
  await comEnv(ENV, async () => {
    const { handler } = setup({ error: { message: 'connection to 10.0.0.5 refused' }, count: null });
    const res = makeRes(); await handler(req('Bearer segredo-cron'), res);
    assert.equal(res.code, 503);
    assert.ok(!JSON.stringify(res.body).includes('10.0.0.5'));
  });
});

test('env do Supabase ausente → 503; método POST → 405', async () => {
  await comEnv({ CRON_SECRET: 'segredo-cron' }, async () => {
    const { handler } = setup();
    let res = makeRes(); await handler(req('Bearer segredo-cron'), res);
    assert.equal(res.code, 503);
    res = makeRes(); await handler(req('Bearer segredo-cron', 'POST'), res);
    assert.equal(res.code, 405);
  });
});
