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
    '      <div class="sidebar-role pt" id="sb-plan-pt">Plano Gratuito</div>',
    '      <div class="sidebar-role es" id="sb-plan-es">Plan Gratuito</div>',
    '    </div>',
    '    <button id="sidebar-close-btn" onclick="toggleSidebar()" aria-label="Fechar menu"',
    '      style="display:none;align-items:center;justify-content:center;background:rgba(13,45,61,.07);border:1.5px solid rgba(13,45,61,.09);border-radius:8px;width:32px;height:32px;color:var(--ink,#0d2d3d);font-size:16px;cursor:pointer;flex-shrink:0">&#x2715;</button>',
    '  </div>',
    '',
    '  <nav class="sidebar-nav">',
    '    <div class="nav-section-label pt">Principal</div>',
    '    <div class="nav-section-label es">Principal</div>',
    '    <a href="anamnesismed-dashboard.html" class="nav-item" id="nav-inicio">',
    '      <span class="nav-icon">&#x1F3E0;</span>',
    '      <span class="pt">In&#xED;cio</span><span class="es">Inicio</span>',
    '    </a>',
    '    <a href="anamnesismed-app.html" class="nav-item" id="nav-nova-hc">',
    '      <span class="nav-icon">&#x1FA7A;</span>',
    '      <span class="pt">Nova HC</span><span class="es">Nueva HC</span>',
    '      <span class="nav-badge">+</span>',
    '    </a>',
    '    <a href="anamnesismed-dashboard.html?view=hcs" class="nav-item" id="nav-hcs">',
    '      <span class="nav-icon">&#x1F4CB;</span>',
    '      <span class="pt">Minhas HCs</span><span class="es">Mis HCs</span>',
    '      <span class="nav-badge hcs-badge" style="display:none"></span>',
    '    </a>',
    '',
    '    <div class="nav-section-label pt">Especialidades</div>',
    '    <div class="nav-section-label es">Especialidades</div>',
    '    <a href="anamnesismed-especialidades.html?esp=semiologia" class="nav-item" id="nav-esp-semiologia">',
    '      <span class="nav-icon">&#x1F4D8;</span>',
    '      <span class="pt">Semiologia B&#xE1;sica</span><span class="es">Semiolog&#xED;a B&#xE1;sica</span>',
    '      <span class="nav-count">9</span>',
    '    </a>',
    '    <a href="anamnesismed-especialidades.html?esp=respiratorio" class="nav-item" id="nav-esp-respiratorio">',
    '      <span class="nav-icon">&#x1FAC1;</span>',
    '      <span class="pt">Respirat&#xF3;rio</span><span class="es">Respiratorio</span>',
    '      <span class="nav-count">5</span>',
    '    </a>',
    '    <a href="anamnesismed-especialidades.html?esp=clinica" class="nav-item" id="nav-esp-clinica">',
    '      <span class="nav-icon">&#x1F3E5;</span>',
    '      <span class="pt">Cl&#xED;nica M&#xE9;dica</span><span class="es">Cl&#xED;nica M&#xE9;dica</span>',
    '      <span class="nav-count">17</span>',
    '    </a>',
    '    <a href="anamnesismed-especialidades.html?esp=cirurgia" class="nav-item" id="nav-esp-cirurgia">',
    '      <span class="nav-icon">&#x1F52A;</span>',
    '      <span class="pt">Cirurgia Geral</span><span class="es">Cirug&#xED;a General</span>',
    '      <span class="nav-count">10</span>',
    '    </a>',
    '',
    '    <div class="nav-section-label pt" style="margin-top:4px">Ferramentas</div>',
    '    <div class="nav-section-label es" style="margin-top:4px">Herramientas</div>',
    '    <a href="anamnesismed-mnemonicas.html" class="nav-item" id="nav-mnemonicas">',
    '      <span class="nav-icon">&#x1F9E9;</span>',
    '      <span class="pt">Mnem&#xF4;nicas</span><span class="es">Mnemot&#xE9;cnicas</span>',
    '    </a>',
    '    <a href="anamnesismed-config.html" class="nav-item" id="nav-config">',
    '      <span class="nav-icon">&#x2699;&#xFE0F;</span>',
    '      <span class="pt">Configura&#xE7;&#xF5;es</span><span class="es">Configuraci&#xF3;n</span>',
    '    </a>',
    '    <a href="anamnesismed-landing.html#pricing" class="nav-item" id="nav-upgrade" style="color:var(--accent,#f59e0b);border-color:rgba(245,158,11,.2)">',
    '      <span class="nav-icon">&#x2728;</span>',
    '      <span class="pt">Upgrade para Pro</span><span class="es">Upgrade a Pro</span>',
    '    </a>',
    '    <button class="nav-item nav-item-logout" onclick="if(window.encerrarSessao)encerrarSessao()">',
    '      <span class="nav-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>',
    '      <span class="pt">Encerrar sess&#xE3;o</span><span class="es">Cerrar sesi&#xF3;n</span>',
    '    </button>',
    '  </nav>',
    '',
    '  <div class="sidebar-foot">',
    '    <a href="anamnesismed-config.html" class="user-info" style="text-decoration:none">',
    '      <div class="user-av user-avatar">?</div>',
    '      <div style="flex:1;min-width:0;overflow:hidden">',
    '        <div class="user-name" id="sidebar-user-name" data-user-name>&#x2014;</div>',
    '        <div class="user-plan pt">Plano Gratuito &middot; <span id="hcs-count-pt">&#x2014;</span>/5 HCs</div>',
    '        <div class="user-plan es">Plan Gratuito &middot; <span id="hcs-count-es">&#x2014;</span>/5 HCs</div>',
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

  /* ── FUNÇÕES DE TOGGLE ── */
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

  /* ── ESTADO ATIVO ── */
  var path   = window.location.pathname;
  var params = new URLSearchParams(window.location.search);
  var esp    = params.get('esp');
  var view   = params.get('view');

  var rules = {
    'nav-inicio':           path.includes('dashboard') && view !== 'hcs',
    'nav-hcs':              path.includes('dashboard') && view === 'hcs',
    'nav-nova-hc':          path.includes('anamnesismed-app'),
    'nav-mnemonicas':       path.includes('mnemonicas'),
    'nav-config':           path.includes('config'),
    'nav-esp-semiologia':   path.includes('especialidades') && esp === 'semiologia',
    'nav-esp-respiratorio': path.includes('especialidades') && esp === 'respiratorio',
    'nav-esp-clinica':      path.includes('especialidades') && esp === 'clinica',
    'nav-esp-cirurgia':     path.includes('especialidades') && esp === 'cirurgia',
  };

  Object.keys(rules).forEach(function (id) {
    var el = document.getElementById(id);
    if (el && rules[id]) el.classList.add('active');
  });

})();
