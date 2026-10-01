/**
 * pwa.js — AnamnesísMed como app instalável (PWA). Carregado em TODAS as páginas.
 *  1. registra o service worker (/sw.js) só em https ou localhost; avisa quando há versão nova;
 *  2. botão "Instalar app / Instalar la app" (beforeinstallprompt) na sidebar, no dashboard e na landing;
 *  3. iOS/iPadOS (sem beforeinstallprompt): dica dispensável "Compartilhar → Adicionar à Tela de Início";
 *  4. some quando já está instalado (display-mode standalone / navigator.standalone / appinstalled);
 *  5. conforto de toque: campo focado não fica sob o teclado virtual.
 * Sem dependências, sem alert(). Dispensa lembrada em localStorage por ~14 dias (com try/catch).
 */
(function () {
  'use strict';
  if (window.__amPwa) return;
  window.__amPwa = true;

  var DISMISS_KEY = 'am-pwa-dismiss';
  var DISMISS_MS = 14 * 24 * 60 * 60 * 1000;
  var deferredPrompt = null;
  var installed = false;

  /* ── utilidades ─────────────────────────────────────────── */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function isStandalone() {
    try {
      if (window.navigator.standalone === true) return true;
      return ['standalone', 'minimal-ui', 'fullscreen', 'window-controls-overlay'].some(function (m) {
        return window.matchMedia('(display-mode: ' + m + ')').matches;
      });
    } catch (e) { return false; }
  }
  function isIOS() {
    var ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function dismissed() {
    var t = parseInt(lsGet(DISMISS_KEY) || '0', 10);
    if (!t) return false;
    if (Date.now() - t > DISMISS_MS) { lsDel(DISMISS_KEY); return false; }
    return true;
  }
  function dismiss() { lsSet(DISMISS_KEY, String(Date.now())); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in (attrs || {})) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  /* texto bilíngue — as páginas escondem .pt / .es conforme data-lang */
  function bi(pt, es) { return '<span class="pt">' + pt + '</span><span class="es">' + es + '</span>'; }

  /* ── estilos (injetados: funciona em qualquer página) ───── */
  var css = [
    '.pwa-ui .pt,.pwa-ui .es{display:inline}',
    '[data-lang="es"] .pwa-ui .pt{display:none!important}',
    '[data-lang="pt"] .pwa-ui .es{display:none!important}',
    '[data-pwa-install][hidden],.pwa-ui[hidden]{display:none!important}',
    '.pwa-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 14px;border-radius:10px;border:1.5px solid #0B7C88;background:transparent;color:#0A6A75;font:600 13px/1 var(--sans,system-ui,sans-serif);cursor:pointer;white-space:nowrap;touch-action:manipulation}',
    '.pwa-btn:hover{background:rgba(11,124,136,.08)}',
    '.pwa-btn svg{flex-shrink:0}',
    '.pwa-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(var(--pwa-bottom,0px) + env(safe-area-inset-bottom,0px) + 14px);z-index:2147483000;width:min(94vw,460px);background:#0A1A24;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:14px;box-shadow:0 12px 36px rgba(10,26,36,.4);padding:12px 12px 12px 16px;display:flex;align-items:center;gap:12px;font:500 14px/1.4 var(--sans,system-ui,sans-serif)}',
    '.pwa-toast .pwa-msg{flex:1;min-width:0}',
    '.pwa-toast .pwa-msg small{display:block;color:#9DB6BD;font-size:12.5px;margin-top:2px}',
    '.pwa-toast button{font:700 14px/1 var(--sans,system-ui,sans-serif);min-height:44px;min-width:44px;padding:0 16px;border-radius:10px;border:0;cursor:pointer;touch-action:manipulation}',
    '.pwa-toast .pwa-go{background:#0B7C88;color:#fff}',
    '.pwa-toast .pwa-x{background:transparent;color:#9DB6BD;font-size:20px;padding:0 10px}',
    '.pwa-toast button:focus-visible{outline:2px solid #5ED6E3;outline-offset:2px}',
    '.pwa-toast svg{vertical-align:-3px}',
    '@media print{.pwa-ui{display:none!important}}'
  ].join('\n');
  var st = el('style'); st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  var ICON_DL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/></svg>';
  var ICON_SHARE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="m8 7 4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';

  /* ── botões de instalar ─────────────────────────────────── */
  var LABEL = bi('Instalar app', 'Instalar la app');

  function ensureButtons() {
    /* sidebar (injetada por sidebar.js): item acima do rodapé/usuário */
    var foot = document.querySelector('.sidebar .sidebar-foot');
    if (foot && !foot.querySelector('.pwa-install-btn')) {
      var b = el('button', { type: 'button', 'class': 'nav-item pwa-install-btn pwa-ui', 'data-pwa-install': '', hidden: '', title: 'Instalar app / Instalar la app' },
        '<span class="nav-icon">' + ICON_DL + '</span>' + LABEL);
      b.style.marginBottom = '8px';
      foot.insertBefore(b, foot.firstChild);
    }
    /* demais botões declarados nas páginas: <button data-pwa-install class="pwa-btn pwa-ui" hidden> */
    document.querySelectorAll('[data-pwa-install]:not([data-pwa-bound])').forEach(function (b) {
      b.setAttribute('data-pwa-bound', '1');
      b.addEventListener('click', onInstallClick);
    });
  }

  function canInstallNow() { return !installed && !isStandalone() && (deferredPrompt || isIOS()); }

  function refresh() {
    ensureButtons();
    var show = canInstallNow();
    document.querySelectorAll('[data-pwa-install]').forEach(function (b) { b.hidden = !show; });
    if (!show) removeToast('pwa-ios');
  }

  function onInstallClick() {
    if (deferredPrompt) {
      var p = deferredPrompt;
      deferredPrompt = null;               // o evento só pode ser usado uma vez
      try {
        p.prompt();
        p.userChoice.then(function (c) {
          if (c && c.outcome === 'accepted') { installed = true; }
          refresh();
        }, refresh);
      } catch (e) { refresh(); }
      refresh();
    } else if (isIOS()) {
      showIosHint(true);
    }
  }

  /* ── dica iOS / iPadOS ──────────────────────────────────── */
  function removeToast(id) { var t = document.getElementById(id); if (t && t.parentNode) t.parentNode.removeChild(t); }
  function bottomOffset() {
    var nav = document.querySelector('.bottom-nav,.mobile-nav');
    var vis = nav && getComputedStyle(nav).display !== 'none';
    document.documentElement.style.setProperty('--pwa-bottom', vis ? (nav.offsetHeight + 6) + 'px' : '0px');
  }
  function showIosHint(force) {
    if (!isIOS() || isStandalone() || installed) return;
    if (!force && dismissed()) return;
    if (document.getElementById('pwa-ios')) return;
    bottomOffset();
    var t = el('div', { id: 'pwa-ios', 'class': 'pwa-toast pwa-ui', role: 'status' },
      '<div class="pwa-msg"><strong>' + bi('Instale o AnamnesísMed', 'Instala AnamnesísMed') + '</strong>' +
      '<small>' + bi('Toque em ' + ICON_SHARE + ' Compartilhar e depois em “Adicionar à Tela de Início”.',
        'Toca ' + ICON_SHARE + ' Compartilir y luego “Añadir a pantalla de inicio”.') + '</small></div>');
    var x = el('button', { type: 'button', 'class': 'pwa-x', 'aria-label': 'Fechar / Cerrar' }, '&times;');
    x.addEventListener('click', function () { dismiss(); removeToast('pwa-ios'); });
    t.appendChild(x);
    document.body.appendChild(t);
  }

  /* ── eventos de instalação ──────────────────────────────── */
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    refresh();
  });
  window.addEventListener('appinstalled', function () {
    installed = true;
    deferredPrompt = null;
    lsDel(DISMISS_KEY);
    refresh();
  });
  try {
    var mq = window.matchMedia('(display-mode: standalone)');
    var onMq = function () { refresh(); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  } catch (e) {}

  /* ── service worker + aviso de atualização ──────────────── */
  var reloading = false, wantsUpdate = false;
  function showUpdate(reg) {
    if (document.getElementById('pwa-update')) return;
    bottomOffset();
    var t = el('div', { id: 'pwa-update', 'class': 'pwa-toast pwa-ui', role: 'status', 'aria-live': 'polite' },
      '<div class="pwa-msg">' + bi('Nova versão disponível', 'Nueva versión disponible') + '</div>');
    var go = el('button', { type: 'button', 'class': 'pwa-go' }, bi('Atualizar', 'Actualizar'));
    go.addEventListener('click', function () {
      wantsUpdate = true;
      go.disabled = true;
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      else location.reload();
    });
    var x = el('button', { type: 'button', 'class': 'pwa-x', 'aria-label': 'Depois / Después' }, '&times;');
    x.addEventListener('click', function () { removeToast('pwa-update'); });
    t.appendChild(go); t.appendChild(x);
    document.body.appendChild(t);
  }
  function watchRegistration(reg) {
    if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg);
    reg.addEventListener('updatefound', function () {
      var nw = reg.installing;
      if (!nw) return;
      nw.addEventListener('statechange', function () {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdate(reg);
      });
    });
  }
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    var h = location.hostname;
    var ok = location.protocol === 'https:' || h === 'localhost' || h === '127.0.0.1' || h === '[::1]';
    if (!ok) return;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!wantsUpdate || reloading) return;   // 1ª instalação (clients.claim) não recarrega a página
      reloading = true;
      location.reload();
    });
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
      watchRegistration(reg);
      /* atualização silenciosa: confere versão nova ao voltar para a aba/app */
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') reg.update().catch(function () {});
      });
    }).catch(function () { /* sem SW o site continua funcionando normalmente */ });
  }

  /* ── teclado virtual não cobre o campo focado (tablet/celular) ── */
  function keepFocusVisible() {
    var coarse = false;
    try { coarse = window.matchMedia('(pointer: coarse)').matches; } catch (e) {}
    if (!coarse) return;
    function reveal(target) {
      if (!target || !target.matches || !target.matches('input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]),textarea,select,[contenteditable="true"]')) return;
      var vv = window.visualViewport;
      var r = target.getBoundingClientRect();
      var vh = vv ? vv.height : window.innerHeight;
      if (r.top < 70 || r.bottom > vh - 12) {
        try { target.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { target.scrollIntoView(); }
      }
    }
    document.addEventListener('focusin', function (e) {
      var t = e.target;
      setTimeout(function () { reveal(t); }, 320);   // espera o teclado subir
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', function () { reveal(document.activeElement); });
    }
  }

  function init() {
    refresh();
    if (isIOS() && !isStandalone()) setTimeout(function () { showIosHint(false); }, 3500);
    keepFocusVisible();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', function () { refresh(); registerSW(); });
})();
