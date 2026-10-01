// Testes do /api/gerar-hc: auth, validação de body, cota (fail-closed/atômica) e erros fixos.
// Mocka '@anthropic-ai/sdk' e '@supabase/supabase-js' (sem rede). Roda com: node --test
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'gerar-hc.js');
process.env.ANTHROPIC_API_KEY = 'sk-ant-dummy';
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';

// opts: user (null = token inválido), rpc ({data,error}), anthropic (fn create)
function setup(opts) {
  opts = opts || {};
  const state = { rpcCalls: [], created: [] };
  const supa = {
    createClient: () => ({
      auth: { getUser: async () => (opts.user === null ? { data: null, error: { message: 'bad' } } : { data: { user: { id: 'u1' } }, error: null }) },
      rpc: async (fn, args) => {
        state.rpcCalls.push({ fn, args });
        if (fn === 'devolver_cota_ia') { if (opts.rpcDevolverErro) throw new Error('rede'); return { data: 0, error: null }; }
        return opts.rpc || { data: 1, error: null };
      },
    }),
  };
  function Anthropic() {
    return { messages: { create: async (p) => { state.created.push(p); if (opts.anthropicErr) throw opts.anthropicErr; return { content: [{ type: 'text', text: 'Paciente feminino.' }], usage: {} }; } } };
  }
  const handler = loadWithMocks(HANDLER, { '@anthropic-ai/sdk': Anthropic, '@supabase/supabase-js': supa });
  return { handler, state };
}
const req = (body, token) => ({ method: 'POST', headers: token === undefined ? { authorization: 'Bearer tok' } : (token ? { authorization: 'Bearer ' + token } : {}), body });
const bodyOk = { lang: 'pt', relatoLivre: 'Dor há 3 dias', motivos: [] };

test('método != POST → 405', async () => {
  const { handler } = setup();
  const res = makeRes();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.code, 405);
});

test('sem token → 401 e não chama IA', async () => {
  const { handler, state } = setup();
  const res = makeRes();
  await handler(req(bodyOk, ''), res);
  assert.equal(res.code, 401);
  assert.equal(state.created.length, 0);
});

test('token inválido → 401', async () => {
  const { handler } = setup({ user: null });
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 401);
});

test('conteúdo vazio → 400 e NÃO consome cota', async () => {
  const { handler, state } = setup();
  const res = makeRes();
  await handler(req({ lang: 'pt', motivos: [{ nome: 'x', respostas: [] }] }), res);
  assert.equal(res.code, 400);
  assert.equal(state.rpcCalls.length, 0, 'validar conteúdo antes de descontar cota');
});

test('body undefined → 400 (não estoura 500)', async () => {
  const { handler } = setup();
  const res = makeRes();
  await handler(req(undefined), res);
  assert.equal(res.code, 400);
});

test('RPC ausente/erro → 503 fail-closed e NÃO chama o modelo', async () => {
  const { handler, state } = setup({ rpc: { data: null, error: { message: 'function not found', code: '42883' } } });
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 503);
  assert.equal(res.body.code, 'usage_unavailable');
  assert.equal(state.created.length, 0);
});

test('limite atingido (RPC -1) → 429 e não chama o modelo', async () => {
  const { handler, state } = setup({ rpc: { data: -1, error: null } });
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 429);
  assert.equal(state.created.length, 0);
});

test('sucesso → 200 com narrativa; RPC chamada com rota e limite', async () => {
  const { handler, state } = setup();
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 200);
  assert.equal(res.body.narrativa, 'Paciente feminino.');
  assert.equal(state.rpcCalls[0].fn, 'consumir_cota_ia');
  assert.equal(state.rpcCalls[0].args.p_rota, 'gerar-hc');
  assert.equal(state.rpcCalls[0].args.p_user_id, 'u1');
});

test('tipos inválidos em demografia/motivos não quebram e são limitados no prompt', async () => {
  const { handler, state } = setup();
  const res = makeRes();
  await handler(req({
    lang: 'pt',
    demografia: { idade: { x: 1 }, sexo: 'A'.repeat(500), tempoEvolucao: 'T'.repeat(5000) },
    motivos: [null, 'str', { ordem: { a: 1 }, nome: 'N'.repeat(900), respostas: 'não-array' },
      { ordem: '2', nome: 'Dor', respostas: [{ pergunta: 'P', resposta: 'R'.repeat(5000) }, null] }],
  }), res);
  assert.equal(res.code, 200);
  const prompt = state.created[0].messages[0].content;
  assert.ok(!/\[object Object\]/.test(prompt));
  assert.ok(!/A{21}/.test(prompt), 'sexo limitado a 20');
  assert.ok(!/T{1001}/.test(prompt), 'tempoEvolucao limitado');
  assert.ok(!/N{201}/.test(prompt), 'nome limitado');
  assert.ok(!/R{1001}/.test(prompt), 'resposta limitada');
  assert.ok(/Motivo 2: Dor/.test(prompt));
});

test('erro do SDK não vaza err.message ao cliente', async () => {
  const err = new Error('SEGREDO interno do SDK: request_id=abc');
  err.status = 400;
  const { handler } = setup({ anthropicErr: err });
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.ok(res.code >= 500);
  assert.ok(!JSON.stringify(res.body).includes('SEGREDO'));
  assert.equal(res.body.error, 'Erro ao gerar a HC');
});

// ── Devolução de cota quando o modelo falha ───────────────────────────────────
// A cota é consumida ANTES da chamada (atômica); se o modelo falha o usuário não recebeu
// o serviço, então a RPC `devolver_cota_ia` devolve a unidade — sem mascarar o erro original.
function silencia(fn) {
  const o = console.error; console.error = () => {};
  return fn().finally(() => { console.error = o; });
}

test('erro/5xx do SDK → devolve a cota (RPC devolver_cota_ia) e mantém o erro original', async () => {
  const err = new Error('boom'); err.status = 529;
  const { handler, state } = setup({ anthropicErr: err });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.equal(res.code, 502);
  assert.equal(res.body.error, 'Erro ao gerar a HC');
  const dev = state.rpcCalls.filter((c) => c.fn === 'devolver_cota_ia');
  assert.equal(dev.length, 1);
  assert.deepEqual(dev[0].args, { p_user_id: 'u1', p_rota: 'gerar-hc' });
});

test('timeout do SDK (sem status) → devolve a cota', async () => {
  const err = new Error('Request timed out.'); err.name = 'APIConnectionTimeoutError';
  const { handler, state } = setup({ anthropicErr: err });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.ok(res.code >= 500);
  assert.equal(state.rpcCalls.filter((c) => c.fn === 'devolver_cota_ia').length, 1);
});

test('429 do SDK → 503 "sobrecarregado" e devolve a cota', async () => {
  const err = new Error('rate'); err.status = 429;
  const { handler, state } = setup({ anthropicErr: err });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.equal(res.code, 503);
  assert.equal(state.rpcCalls.filter((c) => c.fn === 'devolver_cota_ia').length, 1);
});

test('falha na própria devolução NÃO mascara o erro original da rota', async () => {
  const err = new Error('boom'); err.status = 500;
  const { handler } = setup({ anthropicErr: err, rpcDevolverErro: true });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.equal(res.code, 502);
  assert.equal(res.body.error, 'Erro ao gerar a HC');
});

test('sucesso NÃO devolve cota', async () => {
  const { handler, state } = setup();
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 200);
  assert.equal(state.rpcCalls.filter((c) => c.fn === 'devolver_cota_ia').length, 0);
});

test('limite atingido (429) e RPC de cota indisponível NÃO devolvem nada (nada foi consumido)', async () => {
  for (const rpc of [{ data: -1, error: null }, { data: null, error: { code: '42883' } }]) {
    const { handler, state } = setup({ rpc });
    const res = makeRes();
    await silencia(() => handler(req(bodyOk), res));
    assert.equal(state.rpcCalls.filter((c) => c.fn === 'devolver_cota_ia').length, 0);
  }
});
