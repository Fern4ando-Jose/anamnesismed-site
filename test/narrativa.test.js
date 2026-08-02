// Testes da narrativa da HC (gerador local, sem IA).
//
// Nasceram do caso real que o dono mandou em 02/08/2026 — uma HC de dor em perna que
// saiu assim: "irradiada para não irradia, de intensidade 7-8, com duração de cada
// episódio de descontínua … Refere ainda: fatores (repouso)". Quatro defeitos de uma vez.
// Cada um deles virou um teste aqui para não voltar.

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// O gerador é um script de navegador (sem module.exports) e lê alguns campos do
// formulário por getElementById. Carregamos o arquivo num contexto com um document
// mínimo — assim o teste exercita EXATAMENTE o código que roda em produção.
function carregarGerador(campos = {}) {
  const src = fs.readFileSync(path.join(__dirname, '..', 'anamnesismed-narrativa.js'), 'utf8');
  const ctx = {
    document: { getElementById: (id) => (id in campos ? { value: campos[id] } : null) },
    window: {},
    console,
  };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx;
}

const MOTIVO_DOR = { name: 'Dor', isPain: true };

/** Monta as respostas no formato que o app entrega ao gerador. */
const r = (qText, resp, type = 'radio') => ({ qText, resp, type });

// O caso do dono: dor em perna direita, sem irradiação, EVA 7-8, descontínua.
const CASO_DONO = [
  r('Localização (L)', 'parte anterior perna direita', 'input'),
  r('Irradiação (I)', 'não irradia', 'input'),
  r('Tipo (T)', 'Urente (queimação)'),
  r('Intensidade (I) — EVA', '7-8 (intensa)'),
  r('Duração (D)', 'Descontínua (em crises)'),
  r('Início (I)', 'Insidioso / gradual'),
  r('Fatores — iniciam, exacerbam ou acalmam (F)', 'Repouso', 'multi'),
  r('Evolução', 'Flutuante'),
];

test('não escreve "irradiada para não irradia" quando o médico nega irradiação', () => {
  const ctx = carregarGerador();
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(!/irradiad[ao] para n[ãa]o/i.test(txt), `saiu: ${txt}`);
  assert.ok(/nega .*irradia/i.test(txt), `a negativa deveria virar negativo pertinente: ${txt}`);
});

test('contínua/descontínua vira caráter, não "duração de cada episódio"', () => {
  const ctx = carregarGerador();
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(!/dura[çc][ãa]o de cada epis[óo]dio de descont/i.test(txt), `saiu: ${txt}`);
  assert.ok(/descont[íi]nua \(em crises\)/i.test(txt), `saiu: ${txt}`);
  // e sem repetir "de caráter" duas vezes na mesma frase
  assert.ok((txt.match(/de car[áa]ter/gi) || []).length <= 1, `"de caráter" repetido: ${txt}`);
});

test('fatores moduladores não caem em "Refere ainda:"', () => {
  const ctx = carregarGerador();
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(!/Refere ainda: fatores/i.test(txt), `saiu: ${txt}`);
  assert.ok(/Relaciona o quadro com repouso/i.test(txt), `saiu: ${txt}`);
});

test('intensidade em faixa ganha a escala ("7-8/10 na EVA")', () => {
  const ctx = carregarGerador();
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(/intensidade 7-8\/10 na EVA/i.test(txt), `saiu: ${txt}`);
});

test('opção com barra não vai inteira para o texto corrido', () => {
  const ctx = carregarGerador();
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(!/insidioso \/ gradual/i.test(txt), `saiu: ${txt}`);
  assert.ok(/de in[íi]cio insidioso/i.test(txt), `saiu: ${txt}`);
});

test('sem sexo e idade, não sobra vírgula depois de "Paciente"', () => {
  const ctx = carregarGerador();
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(/^Paciente com /.test(txt), `saiu: ${txt}`);
});

test('com sexo e idade, o aposto mantém a vírgula', () => {
  const ctx = carregarGerador({ 'dp-idade': '62', 'dp-sexo': 'F' });
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(/^Paciente feminino de 62 anos, com /.test(txt), `saiu: ${txt}`);
});

test('irradiação de verdade continua aparecendo', () => {
  const ctx = carregarGerador();
  const caso = CASO_DONO.map((x) => (x.qText === 'Irradiação (I)' ? r('Irradiação (I)', 'face medial da coxa', 'input') : x));
  const txt = ctx.gerarNarrativaAEA_generica(caso, 'pt', MOTIVO_DOR);
  assert.ok(/irradiada para face medial da coxa/i.test(txt), `saiu: ${txt}`);
});

test('duração de verdade (em horas) continua sendo duração', () => {
  const ctx = carregarGerador();
  const caso = CASO_DONO.map((x) => (x.qText === 'Duração (D)' ? r('Duração (D)', '2 horas') : x));
  const txt = ctx.gerarNarrativaAEA_generica(caso, 'pt', MOTIVO_DOR);
  assert.ok(/dura[çc][ãa]o de cada epis[óo]dio de 2 horas/i.test(txt), `saiu: ${txt}`);
});

// ── FLUIDEZ (02/08/2026, 2ª ordem do dono: "tem que ser uma história clínica fluida,
// igual as histórias clínicas geradas em hospitais") ──────────────────────────────
test('a narrativa é prosa, não uma frase com fila de vírgulas', () => {
  const ctx = carregarGerador({ 'dp-idade': '62', 'dp-sexo': 'F', 'mc-tempo-n': '3', 'mc-tempo-u': 'anos' });
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  const frases = txt.split(/(?<=\.)\s+/).filter(Boolean);
  assert.ok(frases.length >= 4, `deveria ter várias frases, teve ${frases.length}: ${txt}`);
  for (const f of frases) {
    assert.ok((f.match(/,/g) || []).length <= 3, `frase com vírgulas demais: ${f}`);
  }
  // e o tempo de evolução colado no sintoma, não como cabeçalho de relatório
  assert.ok(/perna direita há 3 anos/i.test(txt), `saiu: ${txt}`);
  assert.ok(!/quadro de 3 anos de evolução, caracterizado por/i.test(txt), `saiu: ${txt}`);
});

test('o tipo da dor concorda em gênero ("dor constritiva", não "constritivo")', () => {
  const ctx = carregarGerador({ 'dp-idade': '58', 'dp-sexo': 'M' });
  const caso = CASO_DONO.map((x) => (x.qText === 'Tipo (T)' ? r('Tipo (T)', 'Constritivo (em aperto)') : x));
  const txt = ctx.gerarNarrativaAEA_generica(caso, 'pt', MOTIVO_DOR);
  assert.ok(/dor como constritiva/i.test(txt), `saiu: ${txt}`);
});

test('localização entra colada no sintoma, sem "localizada em" entre vírgulas', () => {
  const ctx = carregarGerador();
  const txt = ctx.gerarNarrativaAEA_generica(CASO_DONO, 'pt', MOTIVO_DOR);
  assert.ok(!/,\s*localizad/i.test(txt), `saiu: ${txt}`);
  assert.ok(/dor em parte anterior perna direita/i.test(txt), `saiu: ${txt}`);
});
