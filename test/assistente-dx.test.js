// Testes do parseRelatorio (extração/validação do JSON do modelo no /api/assistente-dx).
// Roda com: node --test  (Node 18+, sem dependências).
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const Module = require('node:module');

// O handler importa SDKs no topo (@anthropic-ai/sdk, @supabase/supabase-js) que podem
// não estar instalados no worktree. parseRelatorio não os usa — stubamos no load.
function loadModule() {
  const origLoad = Module._load;
  Module._load = function (request) {
    if (request === '@anthropic-ai/sdk') return function () {};
    if (request === '@supabase/supabase-js') return { createClient: () => ({}) };
    return origLoad.apply(this, arguments);
  };
  try {
    const id = require.resolve(path.join(__dirname, '..', 'api', 'assistente-dx.js'));
    delete require.cache[id];
    return require(id);
  } finally {
    Module._load = origLoad;
  }
}

const { parseRelatorio } = loadModule();

test('parseRelatorio: JSON limpo é parseado e normalizado', () => {
  const r = parseRelatorio(JSON.stringify({
    resumo: 'Caso de dor torácica',
    diferenciais: [{ hipotese: 'IAM', probabilidade: 'ALTA', aFavor: ['dor', 'sudorese'], contra: [] }],
    sinaisAlarme: ['dor irradiando'],
    proximosPassos: ['ECG'],
  }));
  assert.equal(r.resumo, 'Caso de dor torácica');
  assert.equal(r.diferenciais.length, 1);
  assert.equal(r.diferenciais[0].hipotese, 'IAM');
  assert.equal(r.diferenciais[0].probabilidade, 'alta'); // normalizado p/ minúsculo
  assert.deepEqual(r.diferenciais[0].aFavor, ['dor', 'sudorese']);
  assert.deepEqual(r.sinaisAlarme, ['dor irradiando']);
});

test('parseRelatorio: aceita JSON dentro de cercas ```json', () => {
  const r = parseRelatorio('```json\n{"resumo":"x","diferenciais":[]}\n```');
  assert.equal(r.resumo, 'x');
  assert.deepEqual(r.diferenciais, []);
});

test('parseRelatorio: probabilidade inválida cai para "media"', () => {
  const r = parseRelatorio('{"diferenciais":[{"hipotese":"H","probabilidade":"qualquer"}]}');
  assert.equal(r.diferenciais[0].probabilidade, 'media');
});

test('parseRelatorio: texto sem JSON retorna null', () => {
  assert.equal(parseRelatorio('o modelo falhou e não devolveu json'), null);
  assert.equal(parseRelatorio(''), null);
  assert.equal(parseRelatorio(null), null);
});

test('parseRelatorio: campos ausentes viram defaults seguros (arrays vazios)', () => {
  const r = parseRelatorio('{"resumo":"só resumo"}');
  assert.equal(r.resumo, 'só resumo');
  assert.deepEqual(r.diferenciais, []);
  assert.deepEqual(r.sinaisAlarme, []);
  assert.deepEqual(r.proximosPassos, []);
});
