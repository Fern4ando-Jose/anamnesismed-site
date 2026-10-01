// PWA: manifest, ícones/screenshots (dimensões reais), service worker (sem cache de /api nem de dado clínico),
// páginas ligadas ao manifest + pwa.js e headers do vercel.json. Sem rede.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const manifest = JSON.parse(read('manifest.webmanifest'));
const vercel = JSON.parse(read('vercel.json'));

function pngSize(rel) {
  const buf = fs.readFileSync(path.join(ROOT, rel));
  assert.equal(buf.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', rel + ' não é PNG');
  assert.equal(buf.subarray(12, 16).toString('ascii'), 'IHDR');
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}
const localPath = (src) => src.replace(/^\//, '').split('?')[0];

test('manifest: campos obrigatórios e de instalação', () => {
  assert.equal(manifest.name, 'AnamnesísMed');
  assert.ok(manifest.short_name && manifest.short_name.length <= 12, 'short_name <= 12 caracteres');
  assert.ok(manifest.description);
  assert.equal(manifest.display, 'standalone');
  assert.deepEqual(manifest.display_override, ['standalone', 'minimal-ui']);
  assert.equal(manifest.orientation, 'any');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.id, '/dashboard');
  assert.match(manifest.start_url, /^\/dashboard\?source=pwa$/);
  assert.match(manifest.theme_color, /^#[0-9a-fA-F]{6}$/);
  assert.match(manifest.background_color, /^#[0-9a-fA-F]{6}$/);
  assert.ok(manifest.lang && manifest.dir);
  for (const c of ['medical', 'education', 'productivity']) assert.ok(manifest.categories.includes(c), 'categoria ' + c);
});

test('manifest: start_url, scope e atalhos apontam para rotas reais do vercel.json', () => {
  const rotas = vercel.rewrites.map((r) => r.source);
  const caminho = (u) => u.split('?')[0];
  assert.ok(rotas.includes(caminho(manifest.start_url)), 'start_url precisa ser um rewrite do vercel.json');
  const urls = manifest.shortcuts.map((s) => caminho(s.url));
  assert.ok(urls.includes('/app') && urls.includes('/dashboard'), 'atalhos Nova HC (/app) e Minhas HCs (/dashboard)');
  for (const u of urls) assert.ok(rotas.includes(u) || fs.existsSync(path.join(ROOT, localPath(u))), 'atalho sem rota: ' + u);
  assert.ok(manifest.shortcuts.length >= 2);
});

test('manifest: ícones PNG 192/512 (any) e 512 maskable existem com as dimensões declaradas', () => {
  const png = manifest.icons.filter((i) => i.type === 'image/png');
  const has = (size, purpose) => png.some((i) => i.sizes === size && i.purpose === purpose);
  assert.ok(has('192x192', 'any'), 'PNG 192 any');
  assert.ok(has('512x512', 'any'), 'PNG 512 any');
  assert.ok(has('512x512', 'maskable'), 'PNG 512 maskable');
  for (const i of manifest.icons) {
    assert.ok(fs.existsSync(path.join(ROOT, localPath(i.src))), 'ícone ausente: ' + i.src);
    if (i.type === 'image/png') {
      const [w, h] = i.sizes.split('x').map(Number);
      const real = pngSize(localPath(i.src));
      assert.deepEqual([real.w, real.h], [w, h], i.src + ' dimensão real ≠ declarada');
    }
  }
});

test('manifest: ícone maskable tem fundo opaco (sem canal alfa) e shortcuts/screenshots existem com dimensão certa', () => {
  const mk = manifest.icons.find((i) => i.purpose === 'maskable');
  const buf = fs.readFileSync(path.join(ROOT, localPath(mk.src)));
  assert.notEqual(buf[25], 6, 'maskable não pode ser RGBA (cantos transparentes quebram a máscara)');
  for (const s of manifest.shortcuts) for (const i of s.icons) {
    const [w, h] = i.sizes.split('x').map(Number);
    const real = pngSize(localPath(i.src));
    assert.deepEqual([real.w, real.h], [w, h], i.src);
  }
  const forms = new Set();
  for (const sc of manifest.screenshots) {
    const [w, h] = sc.sizes.split('x').map(Number);
    const real = pngSize(localPath(sc.src));
    assert.deepEqual([real.w, real.h], [w, h], sc.src);
    forms.add(sc.form_factor);
    assert.ok(fs.statSync(path.join(ROOT, localPath(sc.src))).size < 600 * 1024, 'screenshot pequeno (<600KB): ' + sc.src);
  }
  assert.ok(forms.has('wide') && forms.has('narrow'));
  const wide = manifest.screenshots.find((s) => s.form_factor === 'wide');
  const narrow = manifest.screenshots.find((s) => s.form_factor === 'narrow');
  assert.equal(wide.sizes, '1280x800');
  assert.equal(narrow.sizes, '390x844');
});

test('apple-touch-icon.png é 180x180', () => {
  assert.deepEqual(Object.values(pngSize('apple-touch-icon.png')), [180, 180]);
});

const sw = read('sw.js');

test('sw.js: sintaxe válida, CACHE_VERSION, fetch handler e limpeza de caches antigos', () => {
  new vm.Script(sw, { filename: 'sw.js' });
  assert.match(sw, /const CACHE_VERSION = 'am-pwa-[a-z0-9]+';/);
  assert.match(sw, /addEventListener\('fetch'/);
  assert.match(sw, /addEventListener\('activate'/);
  assert.match(sw, /caches\.delete/);
  assert.match(sw, /clients\.claim\(\)/);
  assert.match(sw, /SKIP_WAITING/);
  assert.ok(!/self\.skipWaiting\(\);\s*\n\}\);\s*\n\s*self\.addEventListener\('activate'/.test(sw), 'skipWaiting não pode rodar no install (só por mensagem)');
  assert.match(sw, /offline\.html/);
});

test('sw.js: nunca intercepta/cacheia /api, Supabase, Stripe, não-GET, Authorization nem Set-Cookie', () => {
  assert.match(sw, /request\.method !== 'GET'/);
  assert.match(sw, /url\.origin !== self\.location\.origin/);
  assert.match(sw, /\/api\//);
  assert.match(sw, /supabase/);
  assert.match(sw, /stripe/);
  assert.match(sw, /authorization/);
  assert.match(sw, /set-cookie/);
  assert.match(sw, /no-store/);
  // nenhuma entrada de pré-cache aponta para /api ou para fora do domínio
  const m = sw.match(/const PRECACHE = \[([\s\S]*?)\];/);
  assert.ok(m, 'lista PRECACHE');
  const itens = [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  assert.ok(itens.length > 10);
  for (const it of itens) {
    assert.ok(it.startsWith('/'), 'pré-cache só do próprio domínio: ' + it);
    assert.ok(!/^\/api(\/|$)/.test(it), 'pré-cache de /api proibido: ' + it);
    const f = it === '/' || ['/login', '/dashboard', '/app'].includes(it) ? null : it.replace(/^\//, '');
    if (f) assert.ok(fs.existsSync(path.join(ROOT, f)), 'arquivo do pré-cache não existe: ' + it);
  }
  for (const rota of itens.filter((i) => ['/login', '/dashboard', '/app', '/'].includes(i))) {
    assert.ok(rota === '/' || vercel.rewrites.some((r) => r.source === rota), 'rota inexistente: ' + rota);
  }
  // só uma chamada de gravação no cache por URL "limpa": chave sem query para páginas
  assert.match(sw, /chaveDe\(url, false\)/);
});

test('sw.js (comportamento): ignora /api, Supabase, POST e Authorization; cacheia só asset/página do próprio domínio', async () => {
  const handlers = {};
  const store = new Map();
  const caches = {
    open: async () => ({
      match: async (k) => store.get(typeof k === 'string' ? k : k.url),
      put: async (k, v) => { store.set(typeof k === 'string' ? k : k.url, v); },
    }),
    keys: async () => [], delete: async () => true,
  };
  const ctx = {
    self: { location: new URL('https://anamnesismed.com/sw.js'), addEventListener: (t, f) => { handlers[t] = f; }, skipWaiting() {}, clients: { claim() {} } },
    caches, URL, Request: class { constructor(u) { this.url = u; } }, Promise, console,
    Response: class { constructor(b, o) { this.body = b; Object.assign(this, o); } },
    fetch: async () => ({ status: 200, type: 'basic', headers: { has: () => false, get: () => 'public, max-age=0' }, clone() { return this; } }),
  };
  vm.runInNewContext(sw, ctx);
  const chamada = (url, method = 'GET', headers = {}, mode = 'cors') => {
    let respondeu = false;
    handlers.fetch({
      request: { url, method, mode, headers: { has: (h) => h in headers }, },
      respondWith: () => { respondeu = true; }, waitUntil: () => {},
    });
    return respondeu;
  };
  const O = 'https://anamnesismed.com';
  assert.equal(chamada(O + '/api/gerar-hc'), false, '/api não pode ser interceptado');
  assert.equal(chamada(O + '/api/gerar-hc.js'), false);
  assert.equal(chamada('https://zrntgfsciiwhwghadosg.supabase.co/rest/v1/historias_clinicas'), false, 'Supabase não pode ser interceptado');
  assert.equal(chamada('https://js.stripe.com/v3/'), false);
  assert.equal(chamada(O + '/anamnesismed-pdf.js', 'POST'), false, 'não-GET');
  assert.equal(chamada(O + '/anamnesismed-pdf.js', 'GET', { authorization: 'Bearer x' }), false, 'com Authorization');
  assert.equal(chamada(O + '/dados.json'), false, 'JSON/dados do mesmo domínio não são cacheados');
  assert.equal(chamada(O + '/anamnesismed-pdf.js?v=abc'), true);
  assert.equal(chamada(O + '/dashboard', 'GET', {}, 'navigate'), true);
});

test('todas as páginas HTML ligam o manifest, o tema/ícones PWA e carregam pwa.js', () => {
  const paginas = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !/^google.*\.html$/.test(f));
  assert.ok(paginas.length >= 15, 'esperava as páginas do site');
  for (const f of paginas) {
    const h = read(f);
    assert.match(h, /<link rel="manifest" href="\/manifest\.webmanifest">/, f + ': manifest');
    assert.match(h, /<meta name="theme-color" content="#[0-9a-fA-F]{6}">/, f + ': theme-color');
    assert.match(h, /<meta name="mobile-web-app-capable" content="yes">/, f + ': mobile-web-app-capable');
    assert.match(h, /<meta name="apple-mobile-web-app-capable" content="yes">/, f + ': apple-mobile-web-app-capable');
    assert.match(h, /<meta name="apple-mobile-web-app-title" content="[^"]+">/, f + ': apple title');
    assert.match(h, /<meta name="apple-mobile-web-app-status-bar-style" content="(default|black|black-translucent)">/, f + ': status bar');
    assert.match(h, /<link rel="apple-touch-icon" sizes="180x180" href="\/apple-touch-icon\.png">/, f + ': apple-touch-icon 180');
    if (f !== 'offline.html') assert.match(h, /<script src="\/pwa\.js(\?v=[a-f0-9]+)?" defer><\/script>/, f + ': pwa.js');
    if (f !== 'index.html' && f !== 'offline.html') assert.match(h, /viewport-fit=cover/, f + ': viewport-fit=cover');
    // páginas internas continuam noindex
    if (/dashboard|app\.html|config|auth/.test(f)) assert.match(h, /name="robots" content="noindex/, f + ': noindex');
    const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
    assert.deepEqual([...new Set(dup)].filter((d) => !/\$\{/.test(d)), [], f + ': ids duplicados');
  }
});

test('offline.html: bilíngue, com botão "tentar de novo" e sem recurso externo', () => {
  const h = read('offline.html');
  assert.match(h, /Tentar de novo/);
  assert.match(h, /Intentar de nuevo/);
  assert.match(h, /id="retry"/);
  assert.match(h, /name="robots" content="noindex/);
  assert.ok(!/https?:\/\/(?!www\.w3\.org)/.test(h.replace(/<svg[^>]*xmlns="[^"]+"/g, '')), 'sem recurso externo');
});

test('pwa.js: sem dependência externa, sem alert(), registra /sw.js só em https/localhost', () => {
  const js = read('pwa.js');
  new vm.Script(js, { filename: 'pwa.js' });
  assert.ok(!/\balert\s*\(/.test(js.replace(/\/\*[\s\S]*?\*\//g, '')));
  assert.ok(!/https?:\/\//.test(js.replace(/\/\*[\s\S]*?\*\//g, '')), 'sem URL externa');
  assert.match(js, /beforeinstallprompt/);
  assert.match(js, /appinstalled/);
  assert.match(js, /display-mode/);
  assert.match(js, /navigator\.standalone/);
  assert.match(js, /localStorage/);
  assert.match(js, /location\.protocol === 'https:'/);
  assert.match(js, /role: 'status'/);
  assert.match(js, /14 \* 24 \* 60 \* 60 \* 1000/);
});

test('vercel.json: headers do service worker e do manifest; rewrites não capturam esses arquivos', () => {
  const bloco = (src) => vercel.headers.find((b) => b.source === src);
  const get = (b, k) => (b.headers.find((h) => h.key.toLowerCase() === k.toLowerCase()) || {}).value;
  const swh = bloco('/sw.js');
  assert.ok(swh, 'headers de /sw.js');
  assert.match(get(swh, 'Cache-Control'), /no-cache/);
  assert.match(get(swh, 'Cache-Control'), /no-store/);
  assert.match(get(swh, 'Cache-Control'), /must-revalidate/);
  assert.equal(get(swh, 'Service-Worker-Allowed'), '/');
  const mh = bloco('/manifest.webmanifest');
  assert.ok(mh, 'headers do manifest');
  assert.match(get(mh, 'Content-Type'), /^application\/manifest\+json/);
  assert.match(get(mh, 'Cache-Control'), /max-age=\d{1,5}\b/);
  for (const r of vercel.rewrites) {
    assert.ok(!['/sw.js', '/manifest.webmanifest', '/offline.html', '/pwa.js'].includes(r.source));
    assert.ok(!/\*|\(\.\*\)/.test(r.source), 'rewrite genérico capturaria sw.js/manifest: ' + r.source);
  }
  // a CSP continua restritiva e já cobre worker/manifest
  const csp = vercel.headers[0].headers.find((h) => h.key === 'Content-Security-Policy').value;
  assert.match(csp, /worker-src 'self' blob:/);
  assert.match(csp, /manifest-src 'self'/);
  assert.ok(!/script-src[^;]*\*/.test(csp));
});
