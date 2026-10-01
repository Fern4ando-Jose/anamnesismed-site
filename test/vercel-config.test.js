// Valida o vercel.json (JSON, headers de segurança, CSP, rotas /api e cron) e confere que as
// páginas do front só carregam recursos permitidos pela CSP (nada quebra por causa dela).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

const headers = {};
for (const bloco of cfg.headers) for (const h of bloco.headers) headers[h.key] = h.value;

function parseCsp(v) {
  const o = {};
  for (const parte of v.split(';').map((x) => x.trim()).filter(Boolean)) {
    const [nome, ...vals] = parte.split(/\s+/);
    assert.ok(!(nome in o), 'diretiva duplicada: ' + nome);
    o[nome] = vals;
  }
  return o;
}
const csp = parseCsp(headers['Content-Security-Policy'] || '');

test('vercel.json é JSON válido com rewrites, headers, functions e crons', () => {
  assert.ok(Array.isArray(cfg.rewrites) && Array.isArray(cfg.headers) && cfg.functions && Array.isArray(cfg.crons));
});

test('headers de segurança básicos presentes', () => {
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.match(headers['Strict-Transport-Security'], /max-age=\d{8,}/);
  assert.ok(headers['Referrer-Policy']);
  assert.match(headers['Permissions-Policy'], /camera=\(\)/);
});

test('CSP: diretivas restritivas esperadas', () => {
  assert.deepEqual(csp['default-src'], ["'self'"]);
  assert.deepEqual(csp['object-src'], ["'none'"]);
  assert.deepEqual(csp['base-uri'], ["'self'"]);
  assert.deepEqual(csp['form-action'], ["'self'"]);
  assert.deepEqual(csp['frame-ancestors'], ["'none'"]);
  assert.ok('upgrade-insecure-requests' in csp);
  assert.deepEqual(csp['frame-src'], ["'none'"]);
  for (const d of ['script-src', 'style-src', 'img-src', 'connect-src', 'font-src']) {
    assert.ok(csp[d], d + ' ausente');
    assert.ok(!csp[d].includes('*') && !csp[d].some((v) => /^\w+:$/.test(v) && v !== 'data:' && v !== 'blob:'), d + ' não pode ter curinga/esquema aberto');
    assert.ok(!csp[d].some((v) => v.includes('*')), d + ' sem host curinga');
  }
  assert.ok(!csp['img-src'].includes('https:'), 'img-src não pode liberar todo https:');
});

test("CSP: script-src permite 'self' (supabase-js hospedado no domínio); 'unsafe-inline' é RISCO ACEITO documentado", () => {
  assert.ok(csp['script-src'].includes("'self'"));
  assert.ok(!csp['script-src'].includes("'unsafe-eval'"), "nunca 'unsafe-eval'");
  // Risco aceito (199 handlers inline no front): enquanto existir, tem de estar documentado.
  if (csp['script-src'].includes("'unsafe-inline'")) {
    const doc = fs.readFileSync(path.join(ROOT, 'docs', 'seguranca.md'), 'utf8');
    assert.match(doc, /unsafe-inline/);
    assert.match(doc, /risco aceito/i);
  }
  // Só hosts externos conhecidos em script-src (jsdelivr sai quando o front concluir a troca).
  const externos = csp['script-src'].filter((v) => /^https:/.test(v));
  assert.deepEqual(externos.filter((h) => h !== 'https://cdn.jsdelivr.net'), []);
});

test('CSP: connect-src só o próprio domínio e o projeto Supabase (sem Stripe no navegador)', () => {
  const externos = csp['connect-src'].filter((v) => /^https?:|^wss?:/.test(v));
  assert.ok(externos.every((h) => /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(h)), externos.join(' '));
  assert.ok(csp['connect-src'].includes("'self'"));
});

test('rotas /api: cada função pública tem maxDuration e o cron aponta para um arquivo existente', () => {
  const rotas = fs.readdirSync(path.join(ROOT, 'api')).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
  for (const f of rotas) {
    if (f === 'health.js') continue; // leve, sem I/O
    const c = cfg.functions['api/' + f];
    assert.ok(c && c.maxDuration >= 1 && c.maxDuration <= 60, 'maxDuration ausente/ inválido em api/' + f);
  }
  for (const k of Object.keys(cfg.functions)) assert.ok(fs.existsSync(path.join(ROOT, k)), 'functions aponta para arquivo inexistente: ' + k);
  for (const cr of cfg.crons) {
    assert.ok(fs.existsSync(path.join(ROOT, cr.path.replace(/^\//, '') + '.js')), 'cron sem rota: ' + cr.path);
    assert.match(cr.schedule, /^(\S+\s+){4}\S+$/);
  }
});

// ── O front não pode depender de nada que a CSP bloqueia ─────────────────────────────────────
function hostPermitido(url, diretiva) {
  const u = new URL(url);
  return csp[diretiva].some((v) => v === u.origin);
}
test('páginas HTML: scripts, estilos, imagens e iframes cumprem a CSP', () => {
  const htmls = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
  assert.ok(htmls.length > 5);
  for (const f of htmls) {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of html.matchAll(/<script[^>]+src=["'](https?:\/\/[^"']+)["']/gi)) assert.ok(hostPermitido(m[1], 'script-src'), f + ': script externo bloqueado pela CSP: ' + m[1]);
    for (const m of html.matchAll(/<link[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>/gi)) {
      if (/rel=["']?(stylesheet|preload)/i.test(m[0]) && /stylesheet|as=["']?style/i.test(m[0])) assert.ok(hostPermitido(m[1], 'style-src') || hostPermitido(m[1], 'font-src'), f + ': estilo externo bloqueado: ' + m[1]);
    }
    for (const m of html.matchAll(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/gi)) assert.fail(f + ': <img> externo bloqueado pela CSP: ' + m[1]);
    assert.ok(!/<(iframe|object|embed)\b/i.test(html), f + ': iframe/object/embed bloqueado pela CSP');
    for (const m of html.matchAll(/<form[^>]+action=["'](https?:\/\/[^"']+)["']/gi)) assert.fail(f + ': form-action externo: ' + m[1]);
  }
});

test('JS do front: fetch/connect só para o próprio domínio ou o projeto Supabase', () => {
  const alvo = ['supabase-integration.js', 'anamnesismed-assistente.js', 'sidebar.js', 'nav-back.js'].filter((f) => fs.existsSync(path.join(ROOT, f)));
  for (const f of alvo) {
    const js = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of js.matchAll(/fetch\(\s*['"`](https?:\/\/[^'"`]+)['"`]/g)) assert.ok(hostPermitido(m[1], 'connect-src'), f + ': fetch externo bloqueado: ' + m[1]);
  }
  const integ = fs.readFileSync(path.join(ROOT, 'supabase-integration.js'), 'utf8');
  const url = integ.match(/SUPABASE_URL\s*=\s*['"](https:\/\/[^'"]+)['"]/);
  assert.ok(url && hostPermitido(url[1], 'connect-src'), 'SUPABASE_URL do front precisa estar no connect-src da CSP: ' + (url && url[1]));
});
