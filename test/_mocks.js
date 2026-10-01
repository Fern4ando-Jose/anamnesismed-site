// Helpers de teste das Vercel Functions: carregam um handler com 'stripe',
// '@supabase/supabase-js' e '@anthropic-ai/sdk' mockados (sem rede, sem chaves, sem node_modules).
const path = require('node:path');
const Module = require('node:module');

process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'service_dummy';
process.env.ANTHROPIC_API_KEY = 'sk-ant-dummy';
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
process.env.STRIPE_PRICE_ID = 'price_dummy';
process.env.NEXT_PUBLIC_URL = 'https://app.test';

// users: { '<token>': { id, email } } · profiles: { '<userId>': { plano, trial_end } }
// profileError: força erro de banco na leitura de profiles (simula Supabase fora do ar)
function makeSupabase({ users = {}, profiles = {}, profileError = null } = {}) {
  const calls = [];
  const chain = (table, filters) => {
    const q = {
      select: () => q,
      eq: (col, val) => { filters[col] = val; return q; },
      single: async () => {
        if (table === 'profiles') {
          if (profileError) return { data: null, error: profileError };
          const p = profiles[filters.id];
          return p ? { data: p, error: null } : { data: null, error: { code: 'PGRST116', message: 'no rows' } };
        }
        return { data: null, error: { code: 'PGRST116', message: 'no rows' } }; // tabelas de uso: 1º uso do dia
      },
      upsert: async (row) => { calls.push({ table, op: 'upsert', row }); return { error: null }; },
    };
    return q;
  };
  return {
    calls,
    exports: {
      createClient: () => ({
        auth: { getUser: async (token) => (users[token] ? { data: { user: users[token] }, error: null } : { data: { user: null }, error: { message: 'bad jwt' } }) },
        from: (table) => chain(table, {}),
      }),
    },
  };
}

function makeAnthropic() {
  const state = { chamadas: 0 };
  class Anthropic {
    constructor() {
      this.messages = {
        stream: () => { state.chamadas += 1; throw new Error('anthropic NÃO deveria ser chamado neste teste'); },
        create: async () => { state.chamadas += 1; throw new Error('anthropic NÃO deveria ser chamado neste teste'); },
      };
    }
  }
  return { state, exports: Anthropic };
}

function makeStripe() {
  const state = { sessions: [] };
  const fn = () => ({
    checkout: { sessions: { create: async (args) => { state.sessions.push(args); return { url: 'https://stripe.test/pay' }; } } },
  });
  return { state, exports: fn };
}

function loadHandler(file, mocks) {
  const full = path.join(__dirname, '..', file);
  const orig = Module._load;
  Module._load = function (request) {
    if (request in mocks) return mocks[request];
    return orig.apply(this, arguments);
  };
  try {
    for (const k of Object.keys(require.cache)) {
      if (k.includes(`${path.sep}api${path.sep}`)) delete require.cache[k];
    }
    return require(full);
  } finally {
    Module._load = orig;
  }
}

function makeRes() {
  const res = { statusCode: 200, body: null, headers: {} };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  res.end = () => res;
  return res;
}

const futuro = () => new Date(Date.now() + 10 * 864e5).toISOString();
const passado = () => new Date(Date.now() - 864e5).toISOString();

module.exports = { makeSupabase, makeAnthropic, makeStripe, loadHandler, makeRes, futuro, passado };
