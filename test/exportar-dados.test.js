// Testes do /api/exportar-dados (LGPD — acesso/portabilidade). Mocka '@supabase/supabase-js'.
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'exportar-dados.js');
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';

// tabelas: { nome: [linhas] | {error} } — o mock aplica eq(coluna, valor) e range()
function setup(opts) {
  opts = opts || {};
  const consultas = [];
  const rpcs = [];
  const tabelas = opts.tabelas || {};
  const supa = {
    createClient: () => ({
      rpc: async (fn, args) => { rpcs.push({ fn, args }); return opts.limite || { data: 0, error: null }; },
      auth: { getUser: async () => (opts.user === null ? { data: null, error: { message: 'bad' } } : { data: { user: { id: 'u1', email: 'a@b.com' } }, error: null }) },
      from: (nome) => {
        const q = { nome };
        const b = {
          select: () => b,
          eq: (col, val) => { q.col = col; q.val = val; return b; },
          order: () => b,
          range: async (a, z) => {
            consultas.push({ ...q, a, z });
            const t = tabelas[nome];
            if (t && t.error) return { data: null, error: t.error };
            const todas = (t || []).filter((l) => l[q.col] === q.val);
            return { data: todas.slice(a, z + 1), error: null };
          },
        };
        return b;
      },
    }),
  };
  return { handler: loadWithMocks(HANDLER, { '@supabase/supabase-js': supa }), consultas, rpcs };
}
const req = (tok) => ({ method: 'GET', headers: tok === '' ? {} : { authorization: 'Bearer ' + (tok || 'tok') } });

test('método != GET → 405', async () => {
  const { handler } = setup();
  const res = makeRes(); await handler({ method: 'POST', headers: {} }, res);
  assert.equal(res.code, 405);
});

test('sem token / token inválido → 401 e não consulta o banco', async () => {
  let { handler, consultas } = setup();
  let res = makeRes(); await handler(req(''), res); assert.equal(res.code, 401);
  ({ handler, consultas } = setup({ user: null }));
  res = makeRes(); await handler(req(), res); assert.equal(res.code, 401);
  assert.equal(consultas.length, 0);
});

test('devolve perfil + HCs + PDFs SÓ do dono (filtro pelo id do token), sem cache, como download', async () => {
  const { handler, consultas } = setup({ tabelas: {
    profiles: [{ id: 'u1', nome: 'Ana', plano: 'trial' }, { id: 'u2', nome: 'Outro' }],
    historias_clinicas: [{ id: 'h1', user_id: 'u1', motivo: 'tosse' }, { id: 'h2', user_id: 'u2', motivo: 'alheia' }],
    pdf_exports: [{ id: 'p1', user_id: 'u1' }],
  } });
  const res = makeRes(); await handler(req(), res);
  assert.equal(res.code, 200);
  assert.equal(res.body.usuario.id, 'u1');
  assert.equal(res.body.perfil.nome, 'Ana');
  assert.deepEqual(res.body.historias_clinicas.map((h) => h.id), ['h1']);
  assert.deepEqual(res.body.pdf_exports.map((h) => h.id), ['p1']);
  assert.ok(!JSON.stringify(res.body).includes('alheia'));
  assert.ok(consultas.every((c) => c.val === 'u1'));
  assert.equal(res.headers['Cache-Control'], 'no-store');
  assert.match(res.headers['Content-Disposition'], /attachment/);
});

test('pagina quando há mais de 1000 linhas', async () => {
  const muitas = Array.from({ length: 2300 }, (_, i) => ({ id: 'h' + i, user_id: 'u1' }));
  const { handler } = setup({ tabelas: { historias_clinicas: muitas } });
  const res = makeRes(); await handler(req(), res);
  assert.equal(res.body.historias_clinicas.length, 2300);
});

test('tabela opcional ausente (pdf_exports) → lista vazia, não falha', async () => {
  const { handler } = setup({ tabelas: { pdf_exports: { error: { code: '42P01' } } } });
  const res = makeRes(); await handler(req(), res);
  assert.equal(res.code, 200);
  assert.deepEqual(res.body.pdf_exports, []);
  assert.equal(res.body.perfil, null);
});

test('erro real de leitura → 500 (nunca exportação parcial) e log sem dado clínico', async () => {
  const { handler } = setup({ tabelas: { historias_clinicas: { error: { code: '57014', message: 'texto clínico secreto' } } } });
  const res = makeRes();
  const linhas = []; const o = console.error; console.error = (...a) => linhas.push(a.join(' '));
  try { await handler(req(), res); } finally { console.error = o; }
  assert.equal(res.code, 500);
  assert.equal(res.body.historias_clinicas, undefined);
  assert.ok(!linhas.join('\n').includes('secreto'));
});

test('rate limit: 429 + Retry-After sem ler dados; RPC ausente → 503; usa exportar-dados 5/h', async () => {
  let { handler, consultas, rpcs } = setup();
  let res = makeRes(); await handler(req(), res);
  assert.deepEqual(rpcs[0], { fn: 'consumir_limite', args: { p_user_id: 'u1', p_acao: 'exportar-dados', p_janela_seg: 3600, p_max: 5 } });
  ({ handler, consultas } = setup({ limite: { data: 900, error: null } }));
  res = makeRes(); await handler(req(), res);
  assert.equal(res.code, 429); assert.equal(res.headers['Retry-After'], '900'); assert.equal(consultas.length, 0);
  const o = console.error; console.error = () => {};
  try {
    ({ handler, consultas } = setup({ limite: { data: null, error: { code: 'PGRST202' } } }));
    res = makeRes(); await handler(req(), res);
  } finally { console.error = o; }
  assert.equal(res.code, 503); assert.equal(consultas.length, 0);
});

test('teto de linhas TOTAL: acima de 20.000 → 413 claro (nunca exportação truncada) e para de ler', async () => {
  const muitas = Array.from({ length: 20001 }, (_, i) => ({ id: 'h' + i, user_id: 'u1' }));
  const { handler, consultas } = setup({ tabelas: { historias_clinicas: muitas, pdf_exports: [{ id: 'p1', user_id: 'u1' }] } });
  const res = makeRes(); const w = console.warn; console.warn = () => {};
  try { await handler(req(), res); } finally { console.warn = w; }
  assert.equal(res.code, 413);
  assert.equal(res.body.code, 'export_muito_grande');
  assert.match(res.body.error, /DPO/);
  assert.equal(res.body.historias_clinicas, undefined);
  assert.ok(!consultas.some((c) => c.nome === 'pdf_exports'), 'não lê as tabelas seguintes depois de estourar');
});

test('exatamente 20.000 linhas ainda passa; o teto soma TODAS as tabelas', async () => {
  const hcs = Array.from({ length: 19999 }, (_, i) => ({ id: 'h' + i, user_id: 'u1' }));
  let { handler } = setup({ tabelas: { profiles: [{ id: 'u1' }], historias_clinicas: hcs } });
  let res = makeRes(); await handler(req(), res);
  assert.equal(res.code, 200);
  ({ handler } = setup({ tabelas: { profiles: [{ id: 'u1' }], historias_clinicas: hcs, pdf_exports: [{ id: 'p1', user_id: 'u1' }] } }));
  res = makeRes(); const w = console.warn; console.warn = () => {};
  try { await handler(req(), res); } finally { console.warn = w; }
  assert.equal(res.code, 413);
});

test('teto de BYTES (~4 MB): poucas HCs enormes → 413', async () => {
  const grande = 'x'.repeat(1500000);
  const { handler } = setup({ tabelas: { historias_clinicas: [1, 2, 3].map((n) => ({ id: 'h' + n, user_id: 'u1', dados: grande })) } });
  const res = makeRes(); const w = console.warn; console.warn = () => {};
  try { await handler(req(), res); } finally { console.warn = w; }
  assert.equal(res.code, 413);
});

test('OPTIONS → 200 e CORS só da origem do app', async () => {
  process.env.NEXT_PUBLIC_URL = 'https://app.example.com';
  const { handler } = setup();
  const res = makeRes(); await handler({ method: 'OPTIONS', headers: {} }, res);
  assert.equal(res.code, 200);
  assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://app.example.com');
  assert.equal(res.headers['Cache-Control'], 'no-store');
});
