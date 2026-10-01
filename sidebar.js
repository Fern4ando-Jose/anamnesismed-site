/**
 * sidebar.js — Componente de sidebar compartilhado do AnamnesísMed
 * Adicione <div id="sidebar-root"></div> + <script src="sidebar.js"></script> em cada página.
 */
(function () {
  'use strict';

  var HTML = [
    '<div class="sidebar-backdrop" id="sidebar-backdrop" aria-hidden="true"></div>',
    '<aside class="sidebar" id="sidebar" aria-label="Menu principal / Menú principal">',
    '',
    '  <div class="sidebar-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">',
    '    <div>',
    '      <a href="anamnesismed-landing.html" class="sidebar-logo">Anamnesis<span>Med</span></a>',
    '      <div class="sidebar-role pt" id="sb-plan-pt">Teste</div>',
    '      <div class="sidebar-role es" id="sb-plan-es">Prueba</div>',
    '    </div>',
    '    <button type="button" id="sidebar-close-btn" aria-label="Fechar menu / Cerrar menú"',
    '      style="display:none;align-items:center;justify-content:center;border-radius:10px;width:44px;height:44px;font-size:16px;cursor:pointer;flex-shrink:0">&#x2715;</button>',
    '  </div>',
    '',
    '  <nav class="sidebar-nav">',
    '    <div class="nav-section-label pt">Principal</div>',
    '    <div class="nav-section-label es">Principal</div>',
    '    <a href="anamnesismed-dashboard.html" class="nav-item" id="nav-inicio">',
    '      <span class="nav-icon">' + amIcon('home', 18) + '</span>',
    '      <span class="pt">In&#xED;cio</span><span class="es">Inicio</span>',
    '    </a>',
    '    <a href="anamnesismed-explorar.html" class="nav-item" id="nav-explorar">',
    '      <span class="nav-icon">' + amIcon('compass', 18) + '</span>',
    '      <span class="pt">Especialidades</span><span class="es">Especialidades</span>',
    '    </a>',
    '    <a href="anamnesismed-dashboard.html?view=hcs" class="nav-item" id="nav-hcs">',
    '      <span class="nav-icon">' + amIcon('clipboard', 18) + '</span>',
    '      <span class="pt">Minhas HCs</span><span class="es">Mis HCs</span>',
    '      <span class="nav-badge hcs-badge" style="display:none"></span>',
    '    </a>',
    '',
    '    <div class="nav-section-label pt" id="recent-label-pt" style="display:none">Acessado por &#xFA;ltimo</div>',
    '    <div class="nav-section-label es" id="recent-label-es" style="display:none">Accedido recientemente</div>',
    '    <div id="nav-recent"></div>',
    '',
    '    <div class="nav-section-label pt" style="margin-top:4px">Ferramentas</div>',
    '    <div class="nav-section-label es" style="margin-top:4px">Herramientas</div>',
    '    <a href="anamnesismed-mnemonicas.html" class="nav-item" id="nav-mnemonicas">',
    '      <span class="nav-icon">' + amIcon('brain', 18) + '</span>',
    '      <span class="pt">Mnem&#xF4;nicas</span><span class="es">Mnemot&#xE9;cnicas</span>',
    '    </a>',
    '    <a href="anamnesismed-config.html" class="nav-item" id="nav-config">',
    '      <span class="nav-icon">' + amIcon('settings', 18) + '</span>',
    '      <span class="pt">Configura&#xE7;&#xF5;es</span><span class="es">Configuraci&#xF3;n</span>',
    '    </a>',
    '    <a href="anamnesismed-landing.html#pricing" class="nav-item" id="nav-upgrade" style="color:var(--accent,#FF5C49);border-color:rgba(255,92,73,.22)">',
    '      <span class="nav-icon">' + amIcon('sparkles', 18) + '</span>',
    '      <span class="pt">Upgrade para Pro</span><span class="es">Upgrade a Pro</span>',
    '    </a>',
    '    <button type="button" class="nav-item nav-item-logout" onclick="if(window.encerrarSessao)encerrarSessao()">',
    '      <span class="nav-icon">' + amIcon('logout', 16) + '</span>',
    '      <span class="pt">Encerrar sess&#xE3;o</span><span class="es">Cerrar sesi&#xF3;n</span>',
    '    </button>',
    '  </nav>',
    '',
    '  <div class="sidebar-foot">',
    '    <a href="anamnesismed-config.html" class="user-info" style="text-decoration:none">',
    '      <div class="user-av user-avatar">?</div>',
    '      <div style="flex:1;min-width:0;overflow:hidden">',
    '        <div class="user-name" id="sidebar-user-name" data-user-name>&#x2014;</div>',
    '        <div class="user-plan pt">Teste</div>',
    '        <div class="user-plan es">Prueba</div>',
    '      </div>',
    '      <span class="user-caret">&#x22EE;</span>',
    '    </a>',
    '  </div>',
    '</aside>'
  ].join('\n');

  /* ── INJECT ── */
  var root = document.getElementById('sidebar-root');
  if (!root) return;
  root.innerHTML = HTML;

  /* Dica (title) em cada item: no tablet a barra vira trilho de ícones e o rótulo some da tela. */
  function _titulos() {
    root.querySelectorAll('.nav-item,.esp-nav-item,.sidebar-foot .user-info').forEach(function (a) {
      if (a.getAttribute('title')) return;
      var t = Array.prototype.map.call(a.querySelectorAll('.pt,.es'), function (n) { return (n.textContent || '').trim(); })
        .filter(function (x, i, arr) { return x && arr.indexOf(x) === i; }).join(' / ');
      if (t) a.setAttribute('title', t);
    });
  }
  _titulos();
  try { new MutationObserver(function () { _titulos(); }).observe(document.getElementById('nav-recent') || root, { childList: true, subtree: true }); } catch (e) {}

  /* ── TOGGLE ── */
  /* Botões que abrem/fecham o menu (hambúrguer de cada página) recebem aria-expanded/aria-controls. */
  function _toggleButtons() {
    return document.querySelectorAll('[onclick*="toggleSidebar"],[onclick*="openSidebar"],[data-sidebar-toggle]');
  }
  var _lastTrigger = null;
  function _syncBodyState() {
    var sb = document.getElementById('sidebar');
    var open = sb.classList.contains('open');
    document.body.classList.toggle('sb-open', open);
    _toggleButtons().forEach(function (b) {
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.setAttribute('aria-controls', 'sidebar');
    });
    var closeBtn = document.getElementById('sidebar-close-btn');
    if (open && window.matchMedia('(max-width:768px)').matches) {
      if (document.activeElement && document.activeElement !== document.body) _lastTrigger = document.activeElement;
      if (closeBtn) closeBtn.focus();
    } else if (!open && _lastTrigger && document.body.contains(_lastTrigger) && sb.contains(document.activeElement)) {
      try { _lastTrigger.focus(); } catch (e) {}
    }
  }
  window.toggleSidebar = function () {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-backdrop').classList.toggle('open');
    _syncBodyState();
  };
  window.openSidebar = function () {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-backdrop').classList.add('open');
    _syncBodyState();
  };
  window.closeSidebar = function () {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-backdrop').classList.remove('open');
    _syncBodyState();
  };
  document.getElementById('sidebar-backdrop').addEventListener('click', window.closeSidebar);
  document.getElementById('sidebar-close-btn').addEventListener('click', window.closeSidebar);
  /* Esc fecha o menu (teclado) */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('sidebar').classList.contains('open')) window.closeSidebar();
  });
  _syncBodyState();

  /* ── NOME INSTANTÂNEO (cache local — elimina o delay até o Supabase resolver) ── */
  try {
    var uname = localStorage.getItem('am-uname');
    if (uname) {
      document.querySelectorAll('[data-user-name],.user-name').forEach(function (el) { el.textContent = uname; });
      var ini = uname.replace(/^dr\.?\s*/i, '').charAt(0).toUpperCase() || '?';
      document.querySelectorAll('.user-avatar,.user-av').forEach(function (el) { el.textContent = ini; });
      var gp = document.getElementById('page-title');
      var ge = document.getElementById('page-title-es');
      if (gp) gp.textContent = 'Olá, ' + uname + ' 👋';
      if (ge) ge.textContent = 'Hola, ' + uname + ' 👋';
    }
  } catch (e) {}

  /* ── ACESSADO POR ÚLTIMO (dinâmico, 3 últimos) ── */
  var DEST = {
    'esp-semiologia':  { pt: 'Semiologia Básica', es: 'Semiología Básica', icon: 'book', url: 'anamnesismed-especialidades.html?esp=semiologia' },
    'esp-respiratorio':{ pt: 'Respiratório',       es: 'Respiratorio',          icon: 'lung', url: 'anamnesismed-especialidades.html?esp=respiratorio' },
    'esp-clinica':     { pt: 'Clínica Médica',es: 'Clínica Médica',icon: 'hospital', url: 'anamnesismed-especialidades.html?esp=clinica' },
    'esp-cirurgia':    { pt: 'Cirurgia Geral',         es: 'Cirugía General',   icon: 'scalpel', url: 'anamnesismed-especialidades.html?esp=cirurgia' },
    'explorar':        { pt: 'Especialidades',         es: 'Especialidades',        icon: 'compass', url: 'anamnesismed-explorar.html' },
    'mnemonicas':      { pt: 'Mnemônicas',        es: 'Mnemotécnicas',    icon: 'brain', url: 'anamnesismed-mnemonicas.html' },
    'config':          { pt: 'Configurações',es: 'Configuración',    icon: 'settings',  url: 'anamnesismed-config.html' },
    'app':             { pt: 'Nova HC',                es: 'Nueva HC',              icon: 'stethoscope', url: 'anamnesismed-app.html?novo=1' },
    'ref-resp-exfisico':{ pt: 'Exame Físico (Resp.)', es: 'Examen Físico (Resp.)', icon: 'book', url: 'anamnesismed-ref-respiratorio-exfisico.html#topografia' }
  };
  var path = window.location.pathname;
  var params = new URLSearchParams(window.location.search);
  var esp = params.get('esp');
  var view = params.get('view');

  function currentDest() {
    if (path.indexOf('especialidades') > -1 && esp) return 'esp-' + esp;
    if (path.indexOf('explorar') > -1) return 'explorar';
    if (path.indexOf('mnemonicas') > -1) return 'mnemonicas';
    if (path.indexOf('config') > -1) return 'config';
    if (path.indexOf('ref-respiratorio-exfisico') > -1) return 'ref-resp-exfisico';
    if (path.indexOf('anamnesismed-app') > -1) return 'app';
    return null;
  }
  var cur = currentDest();
  var recent = [];
  try { recent = JSON.parse(localStorage.getItem('am-recent') || '[]'); } catch (e) {}
  if (cur && DEST[cur]) {
    recent = recent.filter(function (x) { return x !== cur; });
    recent.unshift(cur);
    recent = recent.slice(0, 8);
    try { localStorage.setItem('am-recent', JSON.stringify(recent)); } catch (e) {}
  }
  /* Itens que já estão no menu fixo (Início, Especialidades, Minhas HCs, Ferramentas) NÃO entram
     em "Acessado por último" — antes eles apareciam duas vezes (no trilho de ícones do tablet isso
     virava ícones repetidos em sequência). Sem histórico útil, o bloco fica oculto. */
  var FIXOS = { explorar: 1, mnemonicas: 1, config: 1 };
  var show = recent.filter(function (x) { return x !== cur && DEST[x] && !FIXOS[x]; }).slice(0, 3);
  var box = document.getElementById('nav-recent');
  if (box && show.length) {
    box.innerHTML = show.map(function (id) {
      var d = DEST[id];
      return '<a href="' + d.url + '" class="nav-item"><span class="nav-icon">' + amIcon(d.icon, 18) + '</span>' +
             '<span class="pt">' + d.pt + '</span><span class="es">' + d.es + '</span></a>';
    }).join('');
    var lp = document.getElementById('recent-label-pt'); if (lp) lp.style.display = '';
    var le = document.getElementById('recent-label-es'); if (le) le.style.display = '';
  }

  /* ── ESTADO ATIVO ── */
  var rules = {
    'nav-inicio':     path.includes('dashboard') && view !== 'hcs',
    'nav-hcs':        path.includes('dashboard') && view === 'hcs',
    'nav-explorar':   path.includes('explorar') || path.includes('especialidades') || path.includes('ref-respiratorio'),
    'nav-mnemonicas': path.includes('mnemonicas'),
    'nav-config':     path.includes('config')
  };
  Object.keys(rules).forEach(function (id) {
    var el = document.getElementById(id);
    if (el && rules[id]) el.classList.add('active');
  });

})();

/* ── A11Y: elementos clicáveis não-nativos (div/span com onclick) ───────────────────────────
   Cards, chips, cabeçalhos de acordeão etc. são gerados em HTML/JS como <div onclick>. Em vez de
   reescrever centenas de pontos (e arriscar o layout), damos a eles semântica de botão:
   role + tabindex=0 + Enter/Espaço, e espelhamos o estado (aria-pressed / aria-expanded) a
   partir das classes (.sel/.on/.active/.open). Roda também em conteúdo inserido depois. */
(function () {
  'use strict';
  var SKIP = 'button,a,input,select,textarea,summary,label,[role],[tabindex]';
  var NOISE = /overlay|backdrop/i;
  var PRESSED = '.f-radio,.f-check,.ecto-opt,.filter-chip,.f-eva-btn,.f-chip,.chip';
  var EXPAND = '.hc-panel-head,.acc-head,.ras-head';

  function label(el) {
    if (el.hasAttribute('aria-label') || el.textContent.trim()) return;
    el.setAttribute('aria-label', 'Fechar / Cerrar');
  }
  function sync(el) {
    if (el.matches(EXPAND)) {
      var p = el.parentElement;
      el.setAttribute('aria-expanded', p && /\bopen\b/.test(p.className) ? 'true' : 'false');
    } else if (el.matches(PRESSED)) {
      el.setAttribute('aria-pressed', /\b(sel|sel-danger|on|active)\b/.test(el.className) ? 'true' : 'false');
    }
  }
  function enhance(root) {
    if (!root || root.nodeType !== 1) return;
    var list = [].slice.call(root.querySelectorAll('[onclick]'));
    if (root.hasAttribute && root.hasAttribute('onclick')) list.unshift(root);
    list.forEach(function (el) {
      if (el.matches(SKIP) || NOISE.test(el.className + ' ' + el.id)) return;
      el.setAttribute('role', 'button');
      el.tabIndex = 0;
      el.setAttribute('data-am-kb', '');
      if (/^[×✕xX]$/.test(el.textContent.trim())) label(el);
      sync(el);
    });
  }
  function init() {
    enhance(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(enhance);
          if (m.target.nodeType === 1 && m.target.parentElement) {
            var c = m.target.closest(EXPAND + ',' + PRESSED); if (c) sync(c);
          }
        } else if (m.target.nodeType === 1) {
          var t = m.target;
          if (t.matches(EXPAND + ',' + PRESSED)) sync(t);
          var h = t.querySelector(':scope > ' + EXPAND.split(',').join(',:scope > ')); if (h) sync(h);
        }
      });
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', function (e) {
      var el = e.target;
      if (!el || !el.hasAttribute || !el.hasAttribute('data-am-kb')) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); el.click(); }
    });
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
