// Menu principal: item "Guia de estudo", sidebar recolhível e PDF/Salvar em um único lugar.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const rd = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');

test('sem botões flutuantes (FAB) no app', () => {
  const app = rd('anamnesismed-app.html');
  assert.ok(!/fab-wrap|fab-btn|fab-item/.test(app));
});

test('PDF e Salvar: um único botão de cada no app (cabeçalho da HC)', () => {
  const app = rd('anamnesismed-app.html');
  assert.strictEqual((app.match(/onclick="exportPDF\(\)"/g) || []).length, 1);
  assert.strictEqual((app.match(/onclick="saveHC\(\)"/g) || []).length, 1);
});

test('sidebar tem Guia de estudo e botão recolher com aria-expanded', () => {
  const js = rd('sidebar.js');
  assert.match(js, /id="nav-guia"/);
  assert.match(js, /anamnesismed-referencias\.html/);
  assert.match(js, /id="sb-toggle"[^']*aria-expanded/);
  assert.match(js, /localStorage/);
  assert.match(rd('sidebar.css'), /prefers-reduced-motion/);
});

test('bottom-nav do app tem Guia', () => {
  assert.match(rd('anamnesismed-app.html'), /id="bnav-guia"/);
});
