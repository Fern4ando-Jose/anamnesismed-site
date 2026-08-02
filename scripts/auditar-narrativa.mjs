#!/usr/bin/env node
/**
 * auditar-narrativa.mjs — passa TODOS os motivos pelo gerador da HC e caça frases
 * quebradas antes que um médico as veja.
 *
 * POR QUE EXISTE (02/08/2026): o dono mandou uma HC real que dizia "irradiada para
 * não irradia … com duração de cada episódio de descontínua … Refere ainda: fatores
 * (repouso)". Eram seis defeitos numa frase só, e todos passavam despercebidos porque
 * ninguém lia a narrativa de todos os 33 motivos — só a do motivo que estava testando.
 * Aqui a leitura é automática: simula respostas em cada motivo, gera o texto e aponta
 * padrão suspeito, com o motivo e o trecho.
 *
 * Não chama IA nenhuma (usa só o gerador local) — roda de graça, quantas vezes quiser.
 *
 *   node scripts/auditar-narrativa.mjs            → só os problemas
 *   node scripts/auditar-narrativa.mjs --tudo     → imprime a narrativa de cada motivo
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TUDO = process.argv.includes('--tudo');

// ── Carrega os motivos (arquivos de navegador que chamam AM.motivo(id, obj)) ──
const motivos = {};
const ctxMotivos = { AM: { motivo: (id, obj) => { motivos[id] = obj; } }, console };
vm.createContext(ctxMotivos);
for (const f of fs.readdirSync(path.join(RAIZ, 'src', 'motivos')).filter((x) => x.endsWith('.js'))) {
  try { vm.runInContext(fs.readFileSync(path.join(RAIZ, 'src', 'motivos', f), 'utf8'), ctxMotivos); }
  catch (e) { console.error(`⚠️  não consegui ler ${f}: ${e.message}`); }
}

// ── Carrega o gerador com um formulário mínimo (ele lê idade/sexo por getElementById) ──
const campos = { 'dp-idade': '62', 'dp-sexo': 'F', 'mc-tempo-n': '3', 'mc-tempo-u': 'dias' };
const ctxGer = {
  document: { getElementById: (id) => (id in campos ? { value: campos[id] } : null) },
  window: {}, console,
};
vm.createContext(ctxGer);
vm.runInContext(fs.readFileSync(path.join(RAIZ, 'anamnesismed-narrativa.js'), 'utf8'), ctxGer);

/** Resposta plausível para cada pergunta: 1ª opção do radio/multi, texto típico no input. */
function responder(p) {
  const tipo = p.type || 'radio';
  if (tipo === 'yn') return { qText: p.q, resp: 'Sim', type: 'yn' };
  if (tipo === 'input') {
    // Campo livre: o médico escreve prosa — inclusive negativas, que foi de onde
    // veio o defeito "irradiada para não irradia".
    if (/irradia/i.test(p.q)) return { qText: p.q, resp: 'não irradia', type: 'input' };
    if (/localiza/i.test(p.q)) return { qText: p.q, resp: 'região anterior da perna direita', type: 'input' };
    // Texto diferente por pergunta: repetir a mesma frase em todos os campos livres
    // produzia "repetição" que era do simulador, não do produto.
    return { qText: p.q, resp: 'relato ' + (responder.n = (responder.n || 0) + 1), type: 'input' };
  }
  const opts = p.opts || [];
  return { qText: p.q, resp: opts.length ? opts[opts.length > 1 ? 1 : 0] : 'sim', type: tipo };
}

// ── Padrões que denunciam frase quebrada ─────────────────────────────────────
const SUSPEITOS = [
  [/irradiad[ao] para (n[ãa]o|nenhum|sem|ausente)/i, 'irradiação negada escrita como achado'],
  [/dura[çc][ãa]o de cada epis[óo]dio de (cont[íi]nua|descont[íi]nua|em crises)/i, 'continuidade escrita como duração'],
  [/Refere ainda:[^.]*\b(fatores|sintomas|tipo|caracter[íi]sticas|dura[çc][ãa]o|in[íi]cio)\b\s*\(/i, 'rótulo cru da pergunta no texto'],
  [/intensidade \d+\s*[-–a]\s*\d+(?!\/10)/i, 'faixa de intensidade sem a escala (/10 na EVA)'],
  // Barra só é defeito no INÍCIO ("de início insidioso / gradual"): nos demais campos
  // ela costuma fazer parte da própria opção clínica ("náuseas / vômitos",
  // "decúbito lateral / posição fetal") e ali o texto está certo.
  [/de in[íi]cio [^.,;]*\s\/\s/i, 'opção com barra indo inteira para o texto corrido'],
  [/Paciente,\s+apresentando/i, 'vírgula solta depois de "Paciente"'],
  [/\bde (car[áa]ter|caracter)\b[^.]*\bde (car[áa]ter|caracter)\b/i, '"de caráter" repetido na mesma frase'],
  [/\b(\w{4,}) \1\b/i, 'palavra repetida'],
  [/,\s*,|\s+,|\(\s*\)|\s{2,}/, 'pontuação/espaço quebrados'],
  // ⚠️ nada de "duas preposições seguidas" com \b: em JS o \b não enxerga letra
  // acentuada, então "unidade de saú|de| para" casa como se fosse "de para".
  // Testado e descartado em 02/08 — o padrão acusava os 33 motivos, todos falsos.
  [/:\s*\)|\(\s*;|;\s*\)/, 'lista de descritivos malformada'],
];

let achados = 0, lidos = 0;
for (const [id, m] of Object.entries(motivos)) {
  const guia = m.aeaGuide;
  if (!Array.isArray(guia) || !guia.length) continue;
  lidos++;
  const respostas = guia.filter((p) => p && p.q).map(responder);
  let txt = '';
  try { txt = ctxGer.gerarNarrativaAEA_generica(respostas, 'pt', m) || ''; }
  catch (e) { console.log(`\n❌ ${id}: o gerador estourou — ${e.message}`); achados++; continue; }

  const problemas = SUSPEITOS.filter(([re]) => re.test(txt));
  if (TUDO || problemas.length) {
    console.log(`\n── ${id} (${m.name}) ──`);
    if (TUDO) console.log(txt);
    for (const [re, desc] of problemas) {
      const t = (txt.match(re) || [''])[0];
      console.log(`   ⚠️  ${desc}: "${t.trim()}"`);
      achados++;
    }
  }
}

console.log(`\n${lidos} motivos lidos · ${achados} problema(s) de texto`);
process.exit(achados ? 1 : 0);
