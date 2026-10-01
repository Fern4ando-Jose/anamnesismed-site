// Testes do /api/reconciliar-assinaturas (cron diário): proteção por CRON_SECRET, promoção/rebaixe,
// adoção de perfil por e-mail CONFIRMADO no Auth (e o ataque A1 — profiles.email forjado), duplicidade,
// conta em exclusão e paginação por cursor (?depois). Banco e Stripe em memória (sem rede).
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadWithMocks, makeRes } = require('./_helpers');

const HANDLER = path.join(__dirname, '..', 'api', 'reconciliar-assinaturas.js');
const ENV = { CRON_SECRET: 'segredo-cron', STRIPE_SECRET_KEY: 'sk_test_x', SUPABASE_URL: 'https://x.supabase.co', SUPABASE_SERVICE_KEY: 'svc' };
const CHAVES = [...Object.keys(ENV), 'STRIPE_PRICE_ID'];

const U = (n) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');

// state: { profiles:[{id,plano,stripe_id,email}], marcas:[ids], auth:{ id:{email,email_confirmed_at} }, subs:[{id,status,customer,items?}],
//          customers:{cid:{email}}, pagina (tamanho da página do Stripe), relogioSalto (ms somados a cada list 'all') }
function mundo(state) {
  state.updates = []; state.getUserChamadas = []; state.listagens = [];
  const profiles = state.profiles;
  const fakeSb = {
    from(tabela) {
      if (tabela === 'contas_em_exclusao') {
        return { select: () => ({ eq: (c, id) => ({ maybeSingle: async () => ({ data: (state.marcas || []).includes(id) ? { user_id: id } : null, error: null }) }) }) };
      }
      assert.equal(tabela, 'profiles');
      const filtros = []; let ordem = false; let lim = Infinity; let vals = null;
      const aplica = () => profiles.filter((p) => filtros.every(([op, col, val]) => (
        op === 'eq' ? p[col] === val : op === 'gt' ? p[col] > val : op === 'is' ? (p[col] === null || p[col] === undefined) === (val === null) : op === 'notnull' ? p[col] != null : true)));
      const q = {
        eq: (col, val) => { filtros.push(['eq', col, val]); return q; },
        gt: (col, val) => { filtros.push(['gt', col, val]); return q; },
        is: (col, val) => { filtros.push(['is', col, val]); return q; },
        not: (col, op, val) => { if (op === 'is' && val === null) filtros.push(['notnull', col]); return q; },
        order: () => { ordem = true; return q; },
        limit: (n) => { lim = n; return q; },
        then: (ok, err) => {
          let r;
          if (vals) {
            const alvo = aplica();
            alvo.forEach((p) => Object.assign(p, vals));
            state.updates.push({ vals, ids: alvo.map((p) => p.id) });
            r = { error: state.erroUpdate || null };
          } else {
            let linhas = aplica().map((p) => ({ ...p }));
            if (ordem) linhas.sort((a, b) => (a.id < b.id ? -1 : 1));
            r = { data: linhas.slice(0, lim), error: null };
          }
          return Promise.resolve(r).then(ok, err);
        },
      };
      return { select: () => q, update: (v) => { vals = v; return q; } };
    },
    auth: { admin: { getUserById: async (id) => {
      state.getUserChamadas.push(id);
      const u = (state.auth || {})[id];
      return u ? { data: { user: { id, ...u } }, error: null } : { data: { user: null }, error: { message: 'User not found' } };
    } } },
  };
  const subsDe = (p) => (state.subs || []).filter((s) => (p.status && p.status !== 'all' ? s.status === p.status : true) && (!p.customer || s.customer === p.customer));
  const stripe = () => ({
    subscriptions: { list: async (p) => {
      state.listagens.push(p);
      if (p.status === 'all' && state.relogioSalto) state.salto = (state.salto || 0) + state.relogioSalto;
      const todas = subsDe(p);
      const tam = state.pagina || 100;
      const ini = p.starting_after ? todas.findIndex((s) => s.id === p.starting_after) + 1 : 0;
      const data = todas.slice(ini, ini + tam);
      return { data, has_more: ini + tam < todas.length };
    } },
    customers: { retrieve: async (cid) => { const c = (state.customers || {})[cid]; if (!c) { const e = new Error('x'); e.code = 'resource_missing'; throw e; } return { id: cid, ...c }; } },
  });
  return loadWithMocks(HANDLER, { stripe, '@supabase/supabase-js': { createClient: () => fakeSb } });
}

async function roda(state, { auth = 'Bearer ' + ENV.CRON_SECRET, query, method = 'GET', env = {} } = {}) {
  const guardado = {}; CHAVES.forEach((k) => { guardado[k] = process.env[k]; delete process.env[k]; });
  Object.assign(process.env, ENV, env);
  Object.keys(env).forEach((k) => { if (env[k] === undefined) delete process.env[k]; });
  const logs = { log: [], error: [] };
  const o = { log: console.log, error: console.error }; console.log = (...a) => logs.log.push(a.join(' ')); console.error = (...a) => logs.error.push(a.join(' '));
  const realNow = Date.now; Date.now = () => realNow() + (state.salto || 0);
  try {
    const handler = mundo(state);
    const res = makeRes();
    await handler({ method, headers: auth === null ? {} : { authorization: auth }, query: query || {} }, res);
    return { res, logs, alertas: logs.error.filter((l) => l.includes('reconciliacao_alerta')).map((l) => JSON.parse(l)) };
  } finally {
    Date.now = realNow; console.log = o.log; console.error = o.error;
    CHAVES.forEach((k) => { if (guardado[k] === undefined) delete process.env[k]; else process.env[k] = guardado[k]; });
  }
}
const viva = (id, customer, status = 'active') => ({ id, status, customer });

// ── Proteção ──────────────────────────────────────────────────────────────────
test('sem CRON_SECRET → 503 (fail-closed), mesmo com Bearer qualquer; não toca Stripe nem banco', async () => {
  const st = { profiles: [], subs: [] };
  const { res } = await roda(st, { env: { CRON_SECRET: undefined }, auth: 'Bearer qualquer' });
  assert.equal(res.code, 503);
  assert.equal(st.listagens.length, 0);
});

test('Bearer errado/ausente/sem esquema → 401 e não toca Stripe nem banco', async () => {
  for (const auth of ['Bearer errado', null, 'segredo-cron', 'bearer segredo-cron', 'Bearer ']) {
    const st = { profiles: [], subs: [] };
    const { res } = await roda(st, { auth });
    assert.equal(res.code, 401, String(auth));
    assert.equal(st.listagens.length, 0);
  }
});

test('método != GET/HEAD → 405; env do Stripe/Supabase ausente → 503; ?depois inválido → 400', async () => {
  assert.equal((await roda({ profiles: [] }, { method: 'POST' })).res.code, 405);
  assert.equal((await roda({ profiles: [] }, { env: { STRIPE_SECRET_KEY: undefined } })).res.code, 503);
  assert.equal((await roda({ profiles: [] }, { env: { SUPABASE_SERVICE_KEY: undefined } })).res.code, 503);
  const { res } = await roda({ profiles: [] }, { query: { depois: 'nao-e-uuid' } });
  assert.equal(res.code, 400);
});

test('Bearer correto sem divergências → 200 completo, sem proximo', async () => {
  const { res } = await roda({ profiles: [], subs: [] });
  assert.equal(res.code, 200);
  assert.equal(res.body.ok, true); assert.equal(res.body.completo, true);
  assert.equal(res.body.proximo, undefined);
  assert.equal(res.body.corrigidos_pro + res.body.rebaixados + res.body.adotados_por_email + res.body.erros, 0);
});

// ── Promoção / rebaixe ────────────────────────────────────────────────────────
test('assinatura viva (active/trialing/past_due) com perfil trial → promove a pro; já pro não é tocado', async () => {
  const st = {
    profiles: [{ id: U(1), plano: 'trial', stripe_id: 'cus_1' }, { id: U(2), plano: 'trial', stripe_id: 'cus_2' }, { id: U(3), plano: 'trial', stripe_id: 'cus_3' }, { id: U(4), plano: 'pro', stripe_id: 'cus_4' }],
    subs: [viva('sub_1', 'cus_1', 'active'), viva('sub_2', 'cus_2', 'trialing'), viva('sub_3', 'cus_3', 'past_due'), viva('sub_4', 'cus_4')],
  };
  const { res } = await roda(st);
  assert.equal(res.code, 200);
  assert.equal(res.body.corrigidos_pro, 3);
  assert.deepEqual(st.profiles.map((p) => p.plano), ['pro', 'pro', 'pro', 'pro']);
  assert.ok(!st.updates.some((u) => u.ids.includes(U(4))));
});

test('perfil pro com stripe_id e SEM assinatura viva → rebaixa para trial; pro sem stripe_id (manual) e pro com assinatura viva ficam', async () => {
  const st = {
    profiles: [{ id: U(1), plano: 'pro', stripe_id: 'cus_morto' }, { id: U(2), plano: 'pro', stripe_id: null }, { id: U(3), plano: 'pro', stripe_id: 'cus_vivo' }],
    subs: [viva('sub_v', 'cus_vivo'), { id: 'sub_c', status: 'canceled', customer: 'cus_morto' }],
  };
  const { res } = await roda(st);
  assert.equal(res.body.rebaixados, 1);
  assert.deepEqual(st.profiles.map((p) => p.plano), ['trial', 'pro', 'pro']);
});

// ── Adoção por e-mail CONFIRMADO no Auth ──────────────────────────────────────
test('adoção: perfil sem stripe_id cujo LOGIN (auth.users) tem o e-mail do customer, confirmado → pro + stripe_id', async () => {
  const st = {
    profiles: [{ id: U(1), plano: 'trial', stripe_id: null, email: 'ana@exemplo.com' }],
    auth: { [U(1)]: { email: 'Ana@Exemplo.com', email_confirmed_at: '2026-01-01T00:00:00Z' } },
    subs: [viva('sub_1', 'cus_1')],
    customers: { cus_1: { email: 'ANA@exemplo.com ' } },
  };
  const { res, logs } = await roda(st);
  assert.equal(res.body.adotados_por_email, 1);
  assert.equal(st.profiles[0].plano, 'pro'); assert.equal(st.profiles[0].stripe_id, 'cus_1');
  assert.ok(st.getUserChamadas.includes(U(1)), 'conferiu o Auth (admin.getUserById)');
  assert.ok(!logs.log.concat(logs.error).join('\n').toLowerCase().includes('ana@exemplo'), 'logs sem e-mail');
});

test('adoção NÃO ocorre: e-mail do login não confirmado / diferente / usuário inexistente no Auth', async () => {
  const casos = [
    { auth: { [U(1)]: { email: 'ana@exemplo.com', email_confirmed_at: null } }, rotulo: 'não confirmado' },
    { auth: { [U(1)]: { email: 'outra@exemplo.com', email_confirmed_at: '2026-01-01T00:00:00Z' } }, rotulo: 'e-mail do login diferente' },
    { auth: {}, rotulo: 'sem usuário no Auth' },
  ];
  for (const c of casos) {
    const st = { profiles: [{ id: U(1), plano: 'trial', stripe_id: null, email: 'ana@exemplo.com' }], auth: c.auth, subs: [viva('sub_1', 'cus_1')], customers: { cus_1: { email: 'ana@exemplo.com' } } };
    const { res, alertas } = await roda(st);
    assert.equal(res.body.adotados_por_email, 0, c.rotulo);
    assert.equal(st.profiles[0].plano, 'trial', c.rotulo);
    assert.equal(st.profiles[0].stripe_id, null, c.rotulo);
    assert.ok(alertas.some((a) => a.motivo === 'assinatura_viva_sem_perfil'), c.rotulo);
  }
});

test('ATAQUE A1: perfil do atacante com profiles.email = e-mail do assinante NÃO adota a assinatura (o login dele tem outro e-mail)', async () => {
  const st = {
    profiles: [{ id: U(66), plano: 'trial', stripe_id: null, email: 'vitima@exemplo.com' /* adulterado */ }],
    auth: { [U(66)]: { email: 'atacante@exemplo.com', email_confirmed_at: '2026-01-01T00:00:00Z' } },
    subs: [viva('sub_v', 'cus_vitima')],
    customers: { cus_vitima: { email: 'vitima@exemplo.com' } },
  };
  const { res, alertas } = await roda(st);
  assert.equal(res.body.adotados_por_email, 0);
  assert.equal(st.profiles[0].plano, 'trial'); assert.equal(st.profiles[0].stripe_id, null);
  assert.equal(st.updates.length, 0, 'nenhuma escrita');
  assert.ok(alertas.some((a) => a.motivo === 'assinatura_viva_sem_perfil'));
});

test('ATAQUE A1 com o perfil legítimo presente: só o dono real (login confirmado) adota; o adulterado é ignorado', async () => {
  const st = {
    profiles: [
      { id: U(66), plano: 'trial', stripe_id: null, email: 'vitima@exemplo.com' /* adulterado */ },
      { id: U(7), plano: 'trial', stripe_id: null, email: 'vitima@exemplo.com' },
    ],
    auth: {
      [U(66)]: { email: 'atacante@exemplo.com', email_confirmed_at: '2026-01-01T00:00:00Z' },
      [U(7)]: { email: 'vitima@exemplo.com', email_confirmed_at: '2026-01-01T00:00:00Z' },
    },
    subs: [viva('sub_v', 'cus_vitima')],
    customers: { cus_vitima: { email: 'vitima@exemplo.com' } },
  };
  const { res } = await roda(st);
  assert.equal(res.body.adotados_por_email, 1);
  assert.equal(st.profiles.find((p) => p.id === U(7)).stripe_id, 'cus_vitima');
  assert.equal(st.profiles.find((p) => p.id === U(66)).plano, 'trial');
  assert.equal(st.profiles.find((p) => p.id === U(66)).stripe_id, null);
});

test('adoção: perfil que já tem stripe_id próprio não é adotado; customer sem e-mail / deletado → só alerta; preço fora do app → ignora', async () => {
  let st = { profiles: [{ id: U(1), plano: 'trial', stripe_id: 'cus_outro', email: 'ana@exemplo.com' }], auth: { [U(1)]: { email: 'ana@exemplo.com', email_confirmed_at: 'x' } }, subs: [viva('sub_1', 'cus_1')], customers: { cus_1: { email: 'ana@exemplo.com' } } };
  let r = await roda(st);
  assert.equal(r.res.body.adotados_por_email, 0); assert.equal(st.profiles[0].plano, 'trial');

  st = { profiles: [{ id: U(1), plano: 'trial', stripe_id: null, email: 'ana@exemplo.com' }], auth: { [U(1)]: { email: 'ana@exemplo.com', email_confirmed_at: 'x' } }, subs: [viva('sub_1', 'cus_1')], customers: { cus_1: {} } };
  r = await roda(st);
  assert.equal(r.res.body.adotados_por_email, 0);
  assert.ok(r.alertas.some((a) => a.motivo === 'assinatura_viva_sem_perfil'));

  st = { profiles: [{ id: U(1), plano: 'trial', stripe_id: null, email: 'ana@exemplo.com' }], auth: { [U(1)]: { email: 'ana@exemplo.com', email_confirmed_at: 'x' } },
    subs: [{ ...viva('sub_1', 'cus_1'), items: { data: [{ price: { id: 'price_outro' } }] } }], customers: { cus_1: { email: 'ana@exemplo.com' } } };
  r = await roda(st, { env: { STRIPE_PRICE_ID: 'price_app' } });
  assert.equal(r.res.body.adotados_por_email, 0);
  assert.equal(st.profiles[0].plano, 'trial');
});

// ── Duplicidade / exclusão em andamento ───────────────────────────────────────
test('duplicidade: dois perfis com o mesmo stripe_id → só ALERTA, nada é alterado', async () => {
  const st = { profiles: [{ id: U(1), plano: 'trial', stripe_id: 'cus_1' }, { id: U(2), plano: 'trial', stripe_id: 'cus_1' }], subs: [viva('sub_1', 'cus_1')] };
  const { res, alertas } = await roda(st);
  assert.equal(res.code, 200);
  assert.equal(res.body.alertas, 1);
  assert.ok(alertas.some((a) => a.motivo === 'stripe_id_duplicado'));
  assert.deepEqual(st.profiles.map((p) => p.plano), ['trial', 'trial']);
});

test('duplicidade por e-mail: dois logins confirmados com o mesmo e-mail → alerta, ninguém adotado', async () => {
  const st = {
    profiles: [{ id: U(1), plano: 'trial', stripe_id: null, email: 'ana@exemplo.com' }, { id: U(2), plano: 'trial', stripe_id: null, email: 'ana@exemplo.com' }],
    auth: { [U(1)]: { email: 'ana@exemplo.com', email_confirmed_at: 'x' }, [U(2)]: { email: 'ana@exemplo.com', email_confirmed_at: 'x' } },
    subs: [viva('sub_1', 'cus_1')], customers: { cus_1: { email: 'ana@exemplo.com' } },
  };
  const { res, alertas } = await roda(st);
  assert.equal(res.body.adotados_por_email, 0);
  assert.ok(alertas.some((a) => a.motivo === 'email_duplicado_no_auth'));
  assert.deepEqual(st.profiles.map((p) => p.plano), ['trial', 'trial']);
});

test('conta em exclusão: não promove (stripe_id já vinculado) nem adota por e-mail; só alerta', async () => {
  const st = {
    profiles: [{ id: U(1), plano: 'trial', stripe_id: 'cus_1' }, { id: U(2), plano: 'trial', stripe_id: null, email: 'ana@exemplo.com' }],
    marcas: [U(1), U(2)],
    auth: { [U(2)]: { email: 'ana@exemplo.com', email_confirmed_at: 'x' } },
    subs: [viva('sub_1', 'cus_1'), viva('sub_2', 'cus_2')], customers: { cus_2: { email: 'ana@exemplo.com' } },
  };
  const { res, alertas } = await roda(st);
  assert.equal(res.body.corrigidos_pro, 0); assert.equal(res.body.adotados_por_email, 0);
  assert.deepEqual(st.profiles.map((p) => p.plano), ['trial', 'trial']);
  assert.equal(st.profiles[1].stripe_id, null);
  assert.ok(alertas.some((a) => a.motivo === 'assinatura_viva_conta_em_exclusao'));
});

// ── Paginação, cursor e erros ─────────────────────────────────────────────────
test('pagina o Stripe (has_more/starting_after): conta todas as assinaturas vivas', async () => {
  const subs = []; const profiles = [];
  for (let i = 1; i <= 5; i++) { subs.push(viva('sub_' + i, 'cus_' + i)); profiles.push({ id: U(i), plano: 'trial', stripe_id: 'cus_' + i }); }
  const st = { profiles, subs, pagina: 2 };
  const { res } = await roda(st);
  assert.equal(res.body.vivas_vistas, 5);
  assert.equal(res.body.corrigidos_pro, 5);
  assert.ok(st.listagens.some((l) => l.starting_after), 'usou starting_after');
});

test('?depois=<uuid>: o passo A (rebaixe) só olha perfis com id MAIOR que o cursor', async () => {
  const st = { profiles: [1, 2, 3, 4].map((i) => ({ id: U(i), plano: 'pro', stripe_id: 'cus_morto_' + i })), subs: [] };
  const { res } = await roda(st, { query: { depois: U(2) } });
  assert.equal(res.body.rebaixados, 2);
  assert.deepEqual(st.profiles.map((p) => p.plano), ['pro', 'pro', 'trial', 'trial']);
  assert.equal(res.body.completo, true);
});

test('estouro do prazo no passo A → completo:false com `proximo` = último perfil visto; a chamada seguinte retoma dali', async () => {
  const st = { profiles: [1, 2, 3].map((i) => ({ id: U(i), plano: 'pro', stripe_id: 'cus_morto_' + i })), subs: [], relogioSalto: 50000 };
  let r = await roda(st);
  assert.equal(r.res.code, 200);
  assert.equal(r.res.body.completo, false);
  assert.equal(r.res.body.proximo, U(1));
  assert.equal(st.profiles[0].plano, 'trial');
  assert.equal(st.profiles[1].plano, 'pro');
  st.salto = 0; st.relogioSalto = 0;
  r = await roda(st, { query: { depois: r.res.body.proximo } });
  assert.equal(r.res.body.completo, true);
  assert.deepEqual(st.profiles.map((p) => p.plano), ['trial', 'trial', 'trial']);
});

test('erro do banco ao atualizar conta como erro (sem derrubar a rotina) e o log não vaza a mensagem', async () => {
  const st = { profiles: [{ id: U(1), plano: 'trial', stripe_id: 'cus_1' }], subs: [viva('sub_1', 'cus_1')], erroUpdate: { code: '57014', message: 'SEGREDO texto@x.com' } };
  const { res, logs } = await roda(st);
  assert.equal(res.code, 200);
  assert.equal(res.body.erros, 1);
  assert.ok(!logs.log.concat(logs.error).join('\n').includes('SEGREDO'));
});
