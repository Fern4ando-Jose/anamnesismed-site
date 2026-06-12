/**
 * sidebar.js — Componente de sidebar compartilhado do AnamnesísMed
 * Adicione <div id="sidebar-root"></div> + <script src="sidebar.js"></script> em cada página.
 */
(function () {
  'use strict';

  var HTML = [
    '<div class="sidebar-backdrop" id="sidebar-backdrop" onclick="toggleSidebar()"></div>',
    '<aside class="sidebar" id="sidebar">',
    '',
    '  <div class="sidebar-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">',
    '    <div>',
    '      <a href="anamnesismed-landing.html" class="sidebar-logo">Anamnesis<span>Med</span></a>',
    '      <div class="sidebar-role pt" id="sb-plan-pt">Teste</div>',
    '      <div class="sidebar-role es" id="sb-plan-es">Prueba</div>',
    '    </div>',
    '    <button id="sidebar-close-btn" onclick="toggleSidebar()" aria-label="Fechar menu"',
    '      style="display:none;align-items:center;justify-content:center;border-radius:8px;width:32px;height:32px;font-size:16px;cursor:pointer;flex-shrink:0">&#x2715;</button>',
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
    '      <span class="nav-icon">' + amIcon('puzzle', 18) + '</span>',
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
    '    <button class="nav-item nav-item-logout" onclick="if(window.encerrarSessao)encerrarSessao()">',
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

  /* ── TOGGLE ── */
  window.toggleSidebar = function () {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-backdrop').classList.toggle('open');
  };
  window.openSidebar = function () {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-backdrop').classList.add('open');
  };
  window.closeSidebar = function () {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-backdrop').classList.remove('open');
  };

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
    'mnemonicas':      { pt: 'Mnemônicas',        es: 'Mnemotécnicas',    icon: 'puzzle', url: 'anamnesismed-mnemonicas.html' },
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
  var show = recent.filter(function (x) { return x !== cur && DEST[x]; }).slice(0, 3);
  if (!show.length) show = ['explorar', 'mnemonicas', 'config'].filter(function (x) { return x !== cur; }).slice(0, 3);
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
