# AnamnesísMed como app (PWA)

O site é instalável: abre em janela própria (standalone), com ícone na tela inicial, e a casca estática carrega rápido e até sem internet (mostra `offline.html`).

## Como instalar
- **Android / Chrome / Edge:** abra `https://anamnesismed.com`, toque em **Instalar app** (botão na barra lateral, no Início ou no topo da landing) ou no menu do navegador → *Instalar app*.
- **iPad / iPhone (Safari):** não existe prompt automático. Toque em **Compartilhar** → **Adicionar à Tela de Início**. O site mostra essa dica (dispensável; volta após ~14 dias).
- **Desktop (Chrome/Edge):** ícone de instalar na barra de endereço ou o botão **Instalar app**.
- Depois de instalado, os botões de instalar somem sozinhos.

## Arquivos
`manifest.webmanifest` (nome, ícones, atalhos "Nova HC" e "Minhas HCs", screenshots) · `sw.js` (service worker) · `pwa.js` (registro, botão de instalar, aviso de nova versão) · `offline.html` · `pwa/` (ícones e screenshots; `node scripts/gerar-icones-pwa.mjs` regera os ícones) · headers de `/sw.js` e do manifest em `vercel.json`.

## Atualização e invalidar cache
- `CACHE_VERSION` em `sw.js` é carimbada automaticamente por `node scripts/versionar-assets.mjs` (hash de todo o site; o `verify.sh` já roda isso). **Qualquer mudança no site muda a versão.**
- Nova versão = o SW novo instala em segundo plano e aparece o aviso "Nova versão disponível — Atualizar" (`role="status"`); ao tocar, ele assume e a página recarrega. Caches antigos são apagados no `activate`.
- Para forçar a limpeza de todos: mude qualquer arquivo e rode o versionar; ou, no navegador, *DevTools → Application → Storage → Clear site data*.
- Páginas usam rede primeiro (sempre a versão mais nova quando online); assets com `?v=hash` ficam em cache até o hash mudar.

## O que NÃO é cacheado (LGPD)
O SW **nunca** intercepta nem guarda: `/api/*`, Supabase (`*.supabase.co`), Stripe, qualquer origem externa (fontes do Google), métodos que não sejam GET, pedidos com `Authorization`, respostas com `Set-Cookie`/`no-store`/`private`. Páginas são guardadas **sem query string** (`?hc=...` nunca entra). Dados de pacientes/HCs só trafegam por esses canais → nada clínico fica no cache. Só entram HTML/CSS/JS/ícones estáticos do próprio domínio.
Sem internet, a casca abre mas as HCs não carregam (vêm do Supabase) — o usuário vê o erro normal do app, não dados antigos.

## Como testar
1. `npm test` (inclui `test/pwa.test.js`: manifest, dimensões dos PNG, SW, páginas, headers).
2. Sirva localmente (`python3 -m http.server` serve o manifest/SW, mas sem os rewrites `/dashboard`, `/app`; prefira um servidor que emule o `vercel.json`) e abra em `http://localhost`.
3. Chrome DevTools → *Application* → *Manifest* (sem erros, "Installability" ok) e *Service Workers* (ativado). *Network → Offline* e recarregue: abre `offline.html`.
4. Playwright/CDP: `Page.getInstallabilityErrors` deve devolver `[]`.
5. Tablet: DevTools com 820×1180 e 1180×820. Em ≥1000px paisagem o app mostra formulário e guia lado a lado; abaixo, trilho de ícones + abas verticais.
