/* AnamnesísMed — Service Worker (escopo "/").
 *
 * O QUE FAZ: deixa o app instalável e abrir rápido/offline apenas o CASCA ESTÁTICA do site
 * (HTML, CSS, JS próprios, ícones, offline.html).
 *
 * O QUE NUNCA FAZ (LGPD / dado clínico): não intercepta nem guarda /api/*, Supabase
 * (*.supabase.co), Stripe, fontes de terceiros, qualquer pedido que não seja GET, qualquer
 * pedido com Authorization e qualquer resposta com Set-Cookie / Cache-Control: no-store|private.
 * Os dados de pacientes/HCs trafegam só por esses canais — portanto nunca entram no cache.
 * Só respostas do MESMO domínio entram no cache, e páginas são guardadas SEM query string
 * (ex.: ?hc=<id> nunca é gravado).
 *
 * VERSÃO DO CACHE: CACHE_VERSION é carimbado por `node scripts/versionar-assets.mjs`
 * (hash de todo o casca). Mudou o site → muda a versão → caches antigos são apagados no activate.
 */
const CACHE_VERSION = 'am-pwa-0d2f02fa3c';
const CACHE_PREFIX = 'am-pwa-';
const OFFLINE_URL = '/offline.html';

/* Casca estática pré-guardada na instalação (tudo do mesmo domínio, nada de dado de usuário). */
const PRECACHE = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/pwa.js',
  '/pwa/icon-192.png',
  '/pwa/icon-512.png',
  '/apple-touch-icon.png',
  '/favicon.svg',
  '/anamnesismed-theme.css',
  '/anamnesismed-components.css',
  '/sidebar.css',
  '/sidebar.js',
  '/am-icons.js',
  '/nav-back.js',
  '/supabase-integration.js',
  '/vendor/supabase-2.110.2.js',
  '/anamnesismed-motivos.js',
  '/anamnesismed-guide.js',
  '/anamnesismed-guide-es.js',
  '/anamnesismed-narrativa.js',
  '/anamnesismed-pdf.js',
  '/anamnesismed-assistente.js',
  /* páginas (HTML estático, sem dado de usuário), pelas rotas reais do vercel.json */
  '/',
  '/login',
  '/dashboard',
  '/app',
  '/anamnesismed-config.html',
  '/anamnesismed-explorar.html',
];

const STATIC_EXT = /\.(?:css|js|mjs|png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|otf|webmanifest)$/i;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      /* tolerante: um arquivo que falhe não derruba a instalação */
      Promise.all(PRECACHE.map((url) =>
        fetch(new Request(url, { cache: 'reload', credentials: 'same-origin' }))
          .then((res) => (podeGuardar(res) ? cache.put(chaveDe(new URL(url, self.location.origin), false), res) : null))
          .catch(() => null)
      ))
    )
  );
  /* sem skipWaiting aqui: a página avisa "Nova versão disponível" e manda SKIP_WAITING */
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n.startsWith(CACHE_PREFIX) && n !== CACHE_VERSION).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* Chave de cache: páginas sem query string; assets com a query (?v=hash é parte da identidade). */
function chaveDe(url, comQuery) {
  return url.origin + url.pathname + (comQuery ? url.search : '');
}

/* Só guarda resposta própria, 200, sem cookie e que não peça para não ser guardada. */
function podeGuardar(res) {
  if (!res || res.status !== 200 || res.type !== 'basic') return false;
  if (res.headers.has('set-cookie')) return false;
  const cc = (res.headers.get('cache-control') || '').toLowerCase();
  if (cc.includes('no-store') || cc.includes('private')) return false;
  return true;
}

/* Nunca tocar: API, Supabase, Stripe, outros domínios, não-GET, Authorization, Range. */
function deveIgnorar(request, url) {
  if (request.method !== 'GET') return true;
  if (url.origin !== self.location.origin) return true; // cobre *.supabase.co, Stripe, Google Fonts
  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) return true;
  if (/(^|\.)supabase\.(co|in)$/i.test(url.hostname) || /(^|\.)stripe\.(com|network)$/i.test(url.hostname)) return true;
  if (request.headers.has('authorization') || request.headers.has('range')) return true;
  if (url.pathname === '/sw.js') return true;
  return false;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (deveIgnorar(request, url)) return; // deixa o navegador resolver normalmente

  if (request.mode === 'navigate') {
    event.respondWith(navegacao(request, url));
    return;
  }
  if (STATIC_EXT.test(url.pathname)) {
    event.respondWith(url.search.indexOf('v=') !== -1 ? assetVersionado(request, url) : assetSWR(request, url, event));
  }
  /* qualquer outra coisa do mesmo domínio: passa direto, sem cache */
});

/* Navegação: rede primeiro → cache → offline.html */
async function navegacao(request, url) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const res = await fetch(request);
    if (podeGuardar(res)) cache.put(chaveDe(url, false), res.clone()).catch(() => {});
    return res;
  } catch (e) {
    const guardada = await cache.match(chaveDe(url, false));
    if (guardada) return guardada;
    const off = await cache.match(chaveDe(new URL(OFFLINE_URL, self.location.origin), false));
    return off || new Response('Sem conexão / Sin conexión', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

/* Asset com ?v=hash: endereço muda quando o conteúdo muda → cache primeiro é seguro. */
async function assetVersionado(request, url) {
  const cache = await caches.open(CACHE_VERSION);
  const chave = chaveDe(url, true);
  const hit = await cache.match(chave);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (podeGuardar(res)) cache.put(chave, res.clone()).catch(() => {});
    return res;
  } catch (e) {
    /* offline: aceita a cópia pré-guardada (sem ?v) */
    const antigo = await cache.match(chaveDe(url, false));
    if (antigo) return antigo;
    throw e;
  }
}

/* Asset sem versão: stale-while-revalidate. */
async function assetSWR(request, url, event) {
  const cache = await caches.open(CACHE_VERSION);
  const chave = chaveDe(url, true);
  const hit = await cache.match(chave);
  const rede = fetch(request).then((res) => {
    if (podeGuardar(res)) cache.put(chave, res.clone()).catch(() => {});
    return res;
  });
  if (hit) {
    event.waitUntil(rede.catch(() => {}));
    return hit;
  }
  return rede;
}
