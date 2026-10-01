#!/usr/bin/env node
/**
 * gerar-icones-pwa.mjs — gera os PNGs do PWA (pwa/) a partir do mesmo desenho do favicon.svg.
 * Uso: NODE_PATH=$(npm root -g) PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node scripts/gerar-icones-pwa.mjs
 * (usa Chromium via Playwright só para rasterizar SVG; não é dependência do site.)
 */
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'pwa');
fs.mkdirSync(OUT, { recursive: true });

const defs = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e7490"/><stop offset="1" stop-color="#0b5365"/></linearGradient></defs>`;
// Prancheta (clipboard + pulso) do favicon.svg, em coordenadas 240x240
const glyph = `<rect x="70" y="58" width="100" height="126" rx="16" fill="#fff"/><rect x="98" y="44" width="44" height="24" rx="9" fill="#0d2d3d"/><path d="M84 124 H104 L113 100 L127 154 L136 124 H156" fill="none" stroke="#A8564F" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">${defs}${body}</svg>`;
// any: cantos arredondados como o favicon
const any = svg(`<rect width="240" height="240" rx="54" fill="url(#bg)"/>${glyph}`);
// maskable: fundo sangrado até a borda; glifo ampliado 1.1x dentro da zona segura (círculo de 80%)
const maskable = svg(`<rect width="240" height="240" fill="url(#bg)"/><g transform="translate(120 121) scale(1.1) translate(-120 -121)">${glyph}</g>`);
// apple: sem transparência (iOS preenche transparente com preto), sem cantos (iOS arredonda)
const apple = maskable;
const plus = svg(`<rect width="240" height="240" rx="54" fill="url(#bg)"/><path d="M120 62 V178 M62 120 H178" stroke="#fff" stroke-width="22" stroke-linecap="round"/>`);
const list = svg(`<rect width="240" height="240" rx="54" fill="url(#bg)"/><g stroke="#fff" stroke-width="16" stroke-linecap="round"><path d="M92 76 H178"/><path d="M92 120 H178"/><path d="M92 164 H178"/></g><g fill="#fff"><circle cx="62" cy="76" r="9"/><circle cx="62" cy="120" r="9"/><circle cx="62" cy="164" r="9"/></g>`);

const jobs = [
  ['icon-192.png', any, 192], ['icon-512.png', any, 512], ['icon-maskable-512.png', maskable, 512],
  ['shortcut-nova-hc.png', plus, 96], ['shortcut-minhas-hcs.png', list, 96],
];
const browser = await chromium.launch();
const page = await browser.newPage();
for (const [name, markup, size] of jobs) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${markup}`);
  await page.screenshot({ path: path.join(OUT, name), omitBackground: true });
}
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<style>html,body{margin:0}svg{display:block;width:180px;height:180px}</style>${apple}`);
await page.screenshot({ path: path.join(ROOT, 'apple-touch-icon.png') });
await browser.close();
console.log('ícones gerados em pwa/ e apple-touch-icon.png');
