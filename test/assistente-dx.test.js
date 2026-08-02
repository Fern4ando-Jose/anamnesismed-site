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

// ── Resposta CORTADA no meio (02/08/2026) ───────────────────────────────────────
// O dono recebeu o JSON cru na tela porque a resposta do modelo passou do limite de
// tamanho e foi truncada no meio de uma frase: o parse falhava e o texto ia inteiro
// para a tela. Agora o que veio inteiro é aproveitado.
test('parseRelatorio: resposta truncada no meio ainda entrega o que veio', () => {
  const truncado = `{
  "resumo": "Mulher de 62 anos com dor urente em perna direita.",
  "diferenciais": [
    { "hipotese": "Neuropatia de fibras finas", "probabilidade": "alta",
      "aFavor": ["Dor urente", "Início insidioso"], "contra": ["Falta glicemia"] },
    { "hipotese": "Síndrome das pernas inquietas", "probabilidade": "media",
      "aFavor": ["Piora ao repouso"], "contra": ["Sem alívio com movimento relatado"] }
  ],
  "exameFisico": ["Pesquisa de pulsos distais", "Monofilamento de 10 g"],
  "sinaisAlarme": ["Dor intensa há 3 anos sem diagnóstico — investigação insuficiente até o`;
  const r = parseRelatorio(truncado);
  assert.ok(r, 'deveria devolver relatório mesmo truncado');
  assert.strictEqual(r.diferenciais.length, 2);
  assert.strictEqual(r.diferenciais[0].hipotese, 'Neuropatia de fibras finas');
  assert.strictEqual(r.exameFisico.length, 2);
});

test('parseRelatorio: as seções novas (manobras, exames, fechar) são lidas', () => {
  const r = parseRelatorio(JSON.stringify({
    resumo: 'x',
    diferenciais: [],
    exameFisico: ['Sinal de Homans'],
    exames: ['Doppler venoso de MID'],
    paraFechar: ['Doppler negativo afasta TVP'],
    perguntasFaltantes: ['Uso de álcool?'],
    sinaisAlarme: [],
  }));
  assert.deepStrictEqual(r.exameFisico, ['Sinal de Homans']);
  assert.deepStrictEqual(r.exames, ['Doppler venoso de MID']);
  assert.deepStrictEqual(r.paraFechar, ['Doppler negativo afasta TVP']);
  assert.deepStrictEqual(r.perguntasFaltantes, ['Uso de álcool?']);
});
