#!/usr/bin/env node
/**
 * versionar-assets.mjs — carimba a versão de cada script/estilo local nos HTMLs.
 *
 * POR QUE EXISTE (02/08/2026): corrigimos a narrativa da HC, publicamos, conferimos no
 * ar — e o dono continuava vendo o comportamento antigo. Um dos caminhos para isso é o
 * navegador reaproveitar o arquivo que já tinha guardado. Com `arquivo.js?v=<hash do
 * conteúdo>`, o endereço muda sempre que o conteúdo muda, e o navegador é obrigado a
 * buscar a versão nova. Enquanto o arquivo não muda, o endereço não muda e o cache
 * continua valendo.
 *
 * Roda sozinho dentro do verify.sh, que já é obrigatório antes de cada commit — assim
 * ninguém precisa lembrar de atualizar número de versão à mão (passo manual = defeito).
 *
 *   node scripts/versionar-assets.mjs            → carimba o que mudou
 *   node scripts/versionar-assets.mjs --conferir → só acusa se algo está desatualizado
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SO_CONFERIR = process.argv.includes('--conferir');

const hashDe = (arquivo) =>
  crypto.createHash('sha1').update(fs.readFileSync(arquivo)).digest('hex').slice(0, 8);

const htmls = fs.readdirSync(RAIZ).filter((f) => f.endsWith('.html'));
let mudados = 0, desatualizados = [];

for (const html of htmls) {
  const caminho = path.join(RAIZ, html);
  const original = fs.readFileSync(caminho, 'utf8');

  // src="algo.js" ou href="algo.css", só locais (sem http, sem //)
  const novo = original.replace(
    /((?:src|href)=")(?!https?:|\/\/)([A-Za-z0-9._\-\/]+\.(?:js|css))(\?v=[a-f0-9]+)?(")/g,
    (tudo, antes, arquivo, versaoAtual, depois) => {
      const alvo = path.join(RAIZ, arquivo);
      if (!fs.existsSync(alvo)) return tudo;          // referência externa/gerada: não toca
      const v = '?v=' + hashDe(alvo);
      if (versaoAtual === v) return tudo;
      desatualizados.push(`${html} → ${arquivo}`);
      return antes + arquivo + v + depois;
    },
  );

  if (novo !== original) {
    mudados++;
    if (!SO_CONFERIR) fs.writeFileSync(caminho, novo);
  }
}

if (SO_CONFERIR) {
  if (desatualizados.length) {
    console.error('Versão desatualizada em:\n  ' + desatualizados.join('\n  '));
    console.error('Rode: node scripts/versionar-assets.mjs');
    process.exit(1);
  }
  console.log('Todas as versões de script/estilo em dia.');
} else {
  console.log(mudados ? `${mudados} página(s) recarimbada(s) — ${desatualizados.length} referência(s)`
                      : 'nada a recarimbar');
}
