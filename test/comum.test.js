// Testes diretos dos helpers de api/_comum.js (sem rede): token, CORS, rota, auth, limites, cota,
// logs seguros, comparação de segredo em tempo constante, Stripe/exclusão e limpeza periódica.
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { makeRes } = require('./_helpers');

const C = require(path.join(__dirname, '..', 'api', '_comum.js'));
const quieto = async (fn) => { const e = console.error, w = console.warn; const linhas = []; console.error = (...a) => linhas.push(a.join(' ')); console.warn = () => {}; try { await fn(); } finally { console.error = e; console.warn = w; } return linhas; };

test('lerToken: só aceita "Bearer <token>" (case-insensitive no esquema, aparando espaços)', () => {
  assert.equal(C.lerToken({ headers: { authorization: 'Bearer abc.def' } }), 'abc.def');
  assert.equal(C.lerToken({ headers: { Authorization: 'bearer   xyz  ' } }), 'xyz');
  for (const h of [undefined, '', 'abc', 'Basic abc', 'Bearer', 'Bearer ']) assert.equal(C.lerToken({ headers: h === undefined ? {} : { authorization: h } }), '', String(h));
  assert.equal(C.lerToken({}), '');
});

test('aplicaCors: só a origem de NEXT_PUBLIC_URL (nunca *); sem env não manda Allow-Origin', () => {
  const antes = process.env.NEXT_PUBLIC_URL;
  try {
    process.env.NEXT_PUBLIC_URL = 'https://app.example.com';
    let res = makeRes(); C.aplicaCors(res, 'POST, OPTIONS');
    assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://app.example.com');
    assert.equal(res.headers['Access-Control-Allow-Methods'], 'POST, OPTIONS');
    assert.match(res.headers['Access-Control-Allow-Headers'], /Authorization/);
    delete process.env.NEXT_PUBLIC_URL;
    res = makeRes(); C.aplicaCors(res, 'GET');
    assert.equal(res.headers['Access-Control-Allow-Origin'], undefined);
  } finally { if (antes === undefined) delete process.env.NEXT_PUBLIC_URL; else process.env.NEXT_PUBLIC_URL = antes; }
});

test('iniciaRota: no-store; OPTIONS → 200; método errado → 405; método certo segue (false)', () => {
  let res = makeRes();
  assert.equal(C.iniciaRota({ method: 'OPTIONS' }, res, 'POST'), true);
  assert.equal(res.code, 200);
  assert.equal(res.headers['Cache-Control'], 'no-store');
  res = makeRes();
  assert.equal(C.iniciaRota({ method: 'GET' }, res, 'POST'), true);
  assert.equal(res.code, 405);
  res = makeRes();
  assert.equal(C.iniciaRota({ method: 'POST' }, res, 'POST'), false);
  assert.equal(res.code, null);
});

test('tabelaAusente: 42P01 e PGRST205 sim; outros erros e null não', () => {
  assert.equal(C.tabelaAusente({ code: '42P01' }), true);
  assert.equal(C.tabelaAusente({ code: 'PGRST205' }), true);
  assert.equal(C.tabelaAusente({ code: '23505' }), false);
  assert.equal(C.tabelaAusente(null), false);
  assert.equal(C.tabelaAusente(undefined), false);
});

test('descreveErro: só código/tipo/status/nome — NUNCA a message; falhaSegura expõe a própria mensagem', () => {
  const e = Object.assign(new Error('SEGREDO texto@x.com'), { code: '57014', type: 'StripeAPIError', statusCode: 500 });
  const d = C.descreveErro(e);
  assert.match(d, /57014/); assert.match(d, /StripeAPIError/);
  assert.ok(!d.includes('SEGREDO') && !d.includes('texto@x.com'));
  assert.equal(C.descreveErro(new Error('SEGREDO')), 'erro desconhecido');
  assert.equal(C.descreveErro(new TypeError('SEGREDO')), 'TypeError');
  assert.equal(C.descreveErro(null), 'erro desconhecido');
  assert.equal(C.descreveErro(undefined), 'erro desconhecido');
  assert.equal(C.descreveErro('texto cru'), 'erro');
  assert.equal(C.descreveErro({ message: 'SEGREDO', code: 'PGRST116' }), 'PGRST116');
  assert.equal(C.descreveErro(C.falhaSegura('erro ao ler perfil: 57014')), 'erro ao ler perfil: 57014');
  assert.ok(C.descreveErro(C.falhaSegura('x'.repeat(500))).length <= 120);
});

test('bearerConfere: tempo constante, só "Bearer <segredo>" exato; segredo vazio nunca confere', () => {
  assert.equal(C.bearerConfere('Bearer s3gredo', 's3gredo'), true);
  for (const h of ['Bearer errado', 'bearer s3gredo', 's3gredo', 'Bearer s3gredo ', 'Bearer', '', undefined, null, 123]) assert.equal(C.bearerConfere(h, 's3gredo'), false, String(h));
  assert.equal(C.bearerConfere('Bearer ', ''), false);
  assert.equal(C.bearerConfere('Bearer undefined', undefined), false);
  // comprimentos diferentes não lançam (timingSafeEqual exigiria o mesmo tamanho)
  assert.equal(C.bearerConfere('Bearer ' + 'x'.repeat(500), 'curto'), false);
});

test('autenticar: sem token / token inválido / exceção → 401 (bilíngue); válido → { user }', async () => {
  const sb = (r) => ({ auth: { getUser: async () => { if (r === 'throw') throw new Error('rede'); return r; } } });
  assert.deepEqual(await C.autenticar(sb({}), { headers: {} }), { status: 401, error: 'Não autenticado' });
  assert.equal((await C.autenticar(sb({}), { headers: {} }, (p, e) => e)).error, 'No autenticado');
  const h = { headers: { authorization: 'Bearer t' } };
  assert.equal((await C.autenticar(sb({ data: null, error: { message: 'x' } }), h)).status, 401);
  assert.equal((await C.autenticar(sb({ data: { user: {} }, error: null }), h)).status, 401);
  assert.equal((await C.autenticar(sb('throw'), h)).status, 401);
  assert.deepEqual(await C.autenticar(sb({ data: { user: { id: 'u1' } }, error: null }), h), { user: { id: 'u1' } });
});

test('usuarioDoToken: devolve o usuário ou null (nunca lança)', async () => {
  assert.deepEqual(await C.usuarioDoToken({ auth: { getUser: async () => ({ data: { user: { id: 'u1' } }, error: null }) } }, 't'), { id: 'u1' });
  assert.equal(await C.usuarioDoToken({ auth: { getUser: async () => ({ data: null, error: { message: 'x' } }) } }, 't'), null);
  assert.equal(await C.usuarioDoToken({ auth: { getUser: async () => { throw new Error('x'); } } }, 't'), null);
});

test('aplicaLimite: 0 → segue; >0 → 429 + Retry-After; erro/retorno inesperado/exceção → 503 fail-closed', async () => {
  const chamadas = [];
  const sb = (ret) => ({ rpc: async (fn, args) => { chamadas.push({ fn, args }); if (ret === 'throw') throw new Error('x'); return ret; } });
  let res = makeRes();
  assert.equal(await C.aplicaLimite(res, sb({ data: 0, error: null }), 'u1', 'excluir-conta'), true);
  assert.deepEqual(chamadas[0], { fn: 'consumir_limite', args: { p_user_id: 'u1', p_acao: 'excluir-conta', p_janela_seg: 3600, p_max: 3 } });
  res = makeRes();
  assert.equal(await C.aplicaLimite(res, sb({ data: 90, error: null }), 'u1', 'checkout'), false);
  assert.equal(res.code, 429); assert.equal(res.headers['Retry-After'], '90'); assert.equal(res.body.code, 'rate_limited'); assert.equal(res.body.retry_after, 90);
  for (const ret of [{ data: null, error: { code: '42883' } }, { data: 'x', error: null }, { data: -1, error: null }, undefined, 'throw']) {
    res = makeRes();
    let ok; await quieto(async () => { ok = await C.aplicaLimite(res, sb(ret), 'u1', 'exportar-dados'); });
    assert.equal(ok, false, String(JSON.stringify(ret)));
    assert.equal(res.code, 503); assert.equal(res.body.code, 'limite_indisponivel');
  }
});

test('LIMITES: toda ação cabe na regex da RPC e tem janela/máximo válidos; rajada das rotas de IA existe', () => {
  for (const [acao, cfg] of Object.entries(C.LIMITES)) {
    assert.match(acao, /^[a-z0-9_-]{1,40}$/, acao);
    assert.ok(cfg.max >= 1 && cfg.janelaSeg >= 1 && cfg.janelaSeg <= 86400, acao);
  }
  for (const a of ['gerar-hc-rajada', 'assistente-dx-rajada']) assert.equal(C.LIMITES[a].janelaSeg, 60, a);
});

test('devolverCota: true se a RPC confirma; false (sem lançar e sem vazar a message) em erro/exceção', async () => {
  const args = [];
  assert.equal(await C.devolverCota({ rpc: async (fn, a) => { args.push([fn, a]); return { error: null }; } }, 'u1', 'gerar-hc'), true);
  assert.deepEqual(args[0], ['devolver_cota_ia', { p_user_id: 'u1', p_rota: 'gerar-hc' }]);
  let r; const l1 = await quieto(async () => { r = await C.devolverCota({ rpc: async () => ({ error: { code: '42883', message: 'SEGREDO' } }) }, 'u1', 'gerar-hc'); });
  assert.equal(r, false); assert.ok(!l1.join('').includes('SEGREDO'));
  const l2 = await quieto(async () => { r = await C.devolverCota({ rpc: async () => { throw new Error('SEGREDO'); } }, 'u1', 'gerar-hc'); });
  assert.equal(r, false); assert.ok(!l2.join('').includes('SEGREDO'));
});

test('temAssinaturaViva: ignora a assinatura informada e as encerradas; erro do Stripe propaga', async () => {
  const stripe = (data) => ({ subscriptions: { list: async () => ({ data }) } });
  assert.equal(C.STATUS_VIVOS.join(), 'active,trialing,past_due');
  assert.equal(await C.temAssinaturaViva(stripe([{ id: 'a', status: 'active' }]), 'cus', 'a'), false);
  assert.equal(await C.temAssinaturaViva(stripe([{ id: 'a', status: 'active' }, { id: 'b', status: 'past_due' }]), 'cus', 'a'), true);
  assert.equal(await C.temAssinaturaViva(stripe([{ id: 'b', status: 'canceled' }, { id: 'c', status: 'unpaid' }]), 'cus'), false);
  assert.equal(await C.temAssinaturaViva(stripe(undefined), 'cus'), false);
  await assert.rejects(() => C.temAssinaturaViva({ subscriptions: { list: async () => { throw new Error('x'); } } }, 'cus'));
});

test('contaEmExclusao: true/false; erro lança (fail-closed); tabela ausente só é tolerada com a opção', async () => {
  const sb = (ret) => ({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ret }) }) }) });
  assert.equal(await C.contaEmExclusao(sb({ data: { user_id: 'u' }, error: null }), 'u'), true);
  assert.equal(await C.contaEmExclusao(sb({ data: null, error: null }), 'u'), false);
  await assert.rejects(() => C.contaEmExclusao(sb({ data: null, error: { code: 'XX000', message: 'SEGREDO' } }), 'u'), (e) => !e.message.includes('SEGREDO'));
  await assert.rejects(() => C.contaEmExclusao(sb({ data: null, error: { code: '42P01' } }), 'u'));
  assert.equal(await C.contaEmExclusao(sb({ data: null, error: { code: '42P01' } }), 'u', { toleraAusente: true }), false);
  await assert.rejects(() => C.contaEmExclusao(sb({ data: null, error: { code: 'XX000' } }), 'u', { toleraAusente: true }));
});

test('limparAntigos: apaga rate_limits >2d, contas_em_exclusao >30d e stripe_events >90d; tolera tabela ausente e erro, sem lançar', async () => {
  const agora = new Date('2026-10-04T12:00:00.000Z');
  const feitos = [];
  const sb = (falhas) => ({ from: (t) => ({ delete: (o) => ({ lt: async (col, corte) => {
    feitos.push({ t, col, corte, o });
    if (falhas && falhas[t] === 'throw') throw new Error('SEGREDO');
    if (falhas && falhas[t]) return { error: falhas[t], count: null };
    return { error: null, count: 3 };
  } }) }) });
  let r = await C.limparAntigos(sb(), agora);
  assert.deepEqual(r, { rate_limits: 3, contas_em_exclusao: 3, stripe_events: 3, gerar_hc_usage: 3, ai_assistant_usage: 3 });
  const dias = (t) => Math.round((agora - new Date(feitos.find((f) => f.t === t).corte)) / 86400000);
  assert.equal(dias('rate_limits'), 2); assert.equal(dias('contas_em_exclusao'), 30); assert.equal(dias('stripe_events'), 90);
  assert.equal(dias('gerar_hc_usage'), 90); assert.equal(dias('ai_assistant_usage'), 90);
  assert.deepEqual(feitos.map((f) => f.col), ['janela_inicio', 'iniciado_em', 'received_at', 'dia', 'dia']);
  assert.deepEqual(feitos[0].o, { count: 'exact' });

  const logs = await quieto(async () => {
    r = await C.limparAntigos(sb({ rate_limits: { code: '42P01' }, contas_em_exclusao: { code: '57014', message: 'SEGREDO' }, stripe_events: 'throw' }), agora);
  });
  assert.deepEqual(r, { rate_limits: null, contas_em_exclusao: null, stripe_events: null, gerar_hc_usage: 3, ai_assistant_usage: 3 });
  assert.ok(!logs.join('\n').includes('SEGREDO'));
  assert.equal(logs.filter((l) => l.includes('rate_limits')).length, 0, 'tabela ausente não gera alerta');
});
