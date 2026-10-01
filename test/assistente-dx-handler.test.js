// Testes do handler /api/assistente-dx: auth, plano, cota atômica e devolução de cota
// quando o modelo falha. Mocka '@anthropic-ai/sdk' e '@supabase/supabase-js' (sem rede).
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'assistente-dx.js');
process.env.ANTHROPIC_API_KEY = 'sk-ant-dummy';
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';

// opts: plano ('pro' default), rpc (resultado de consumir_cota_ia), anthropicErr, texto (saída do modelo),
//       rpcDevolverErro (a RPC de devolução lança)
function setup(opts) {
  opts = opts || {};
  const state = { rpcCalls: [], streams: [] };
  const supa = {
    createClient: () => ({
      auth: { getUser: async () => ({ data: { user: { id: 'u1' } }, error: null }) },
      from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: { plano: opts.plano || 'pro' }, error: null }) }) }) }),
      rpc: async (fn, args) => {
        state.rpcCalls.push({ fn, args });
        if (fn === 'devolver_cota_ia') { if (opts.rpcDevolverErro) throw new Error('rede'); return { data: 0, error: null }; }
        return opts.rpc || { data: 1, error: null };
      },
    }),
  };
  function Anthropic() {
    return {
      messages: {
        stream: (p) => {
          state.streams.push(p);
          return { finalMessage: async () => {
            if (opts.anthropicErr) throw opts.anthropicErr;
            const texto = opts.texto === undefined ? '{"resumo":"ok","diferenciais":[]}' : opts.texto;
            return { content: texto ? [{ type: 'text', text: texto }] : [], usage: {} };
          } };
        },
      },
    };
  }
  return { handler: loadWithMocks(HANDLER, { '@anthropic-ai/sdk': Anthropic, '@supabase/supabase-js': supa }), state };
}
const req = (body) => ({ method: 'POST', headers: { authorization: 'Bearer tok' }, body });
const bodyOk = { lang: 'pt', hc: { relatoLivre: 'Dor torácica há 2 dias' } };
const devolucoes = (state) => state.rpcCalls.filter((c) => c.fn === 'devolver_cota_ia');
const silencia = (fn) => { const o = console.error; console.error = () => {}; return fn().finally(() => { console.error = o; }); };

test('plano != pro → 403 e não consome cota', async () => {
  const { handler, state } = setup({ plano: 'trial' });
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 403);
  assert.equal(state.rpcCalls.length, 0);
});

test('sucesso → 200, cota consumida 1x e NÃO devolvida', async () => {
  const { handler, state } = setup();
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 200);
  assert.equal(state.rpcCalls.filter((c) => c.fn === 'consumir_cota_ia').length, 1);
  assert.equal(devolucoes(state).length, 0);
});

test('limite atingido → 429, modelo não chamado, nada a devolver', async () => {
  const { handler, state } = setup({ rpc: { data: -1, error: null } });
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 429);
  assert.equal(state.streams.length, 0);
  assert.equal(devolucoes(state).length, 0);
});

test('erro/5xx do SDK → devolve a cota e responde 502 com mensagem fixa', async () => {
  const err = new Error('SEGREDO do SDK'); err.status = 500;
  const { handler, state } = setup({ anthropicErr: err });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.equal(res.code, 502);
  assert.ok(!JSON.stringify(res.body).includes('SEGREDO'));
  assert.deepEqual(devolucoes(state).map((c) => c.args), [{ p_user_id: 'u1', p_rota: 'assistente-dx' }]);
});

test('timeout do SDK → devolve a cota', async () => {
  const err = new Error('Request timed out.'); err.name = 'APIConnectionTimeoutError';
  const { handler, state } = setup({ anthropicErr: err });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.ok(res.code >= 500);
  assert.equal(devolucoes(state).length, 1);
});

test('429 do SDK → 503 sobrecarregado e devolve a cota', async () => {
  const err = new Error('rate'); err.status = 429;
  const { handler, state } = setup({ anthropicErr: err });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.equal(res.code, 503);
  assert.equal(devolucoes(state).length, 1);
});

test('modelo sem texto algum → 502 e devolve a cota', async () => {
  const { handler, state } = setup({ texto: '' });
  const res = makeRes();
  await handler(req(bodyOk), res);
  assert.equal(res.code, 502);
  assert.equal(devolucoes(state).length, 1);
});

test('falha na devolução (RPC lança) não mascara o erro original', async () => {
  const err = new Error('x'); err.status = 500;
  const { handler } = setup({ anthropicErr: err, rpcDevolverErro: true });
  const res = makeRes();
  await silencia(() => handler(req(bodyOk), res));
  assert.equal(res.code, 502);
  assert.equal(res.body.error, 'Erro ao gerar a análise');
});
