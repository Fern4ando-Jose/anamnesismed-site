/**
 * am-icons.js — Conjunto ÚNICO de ícones do AnamnesísMed (SVG de linha, estilo Lucide).
 *
 * Fonte canônica de todos os ícones. Use SEMPRE via amIcon(key, size):
 *   amIcon('home')           -> <svg> de 20px
 *   amIcon('lung', 28)       -> <svg> de 28px
 *   amIcon(motivo.icon)      -> aceita uma KEY ou um EMOJI legado (resolve via AM_EMOJI)
 *
 * Os SVGs herdam a cor do texto (stroke:currentColor), então combinam com qualquer
 * contexto (sidebar escuro, cards claros, abas ativas) sem precisar de variações.
 *
 * Para adicionar um ícone novo: inclua o path em AM_ICONS e, se algum dado legado
 * ainda usa emoji, mapeie o emoji -> key em AM_EMOJI.
 */
(function () {
  'use strict';

  /* alinhamento padrão dos ícones (inline e dentro de flex) */
  if (typeof document !== 'undefined' && !document.getElementById('am-icons-style')) {
    var st = document.createElement('style');
    st.id = 'am-icons-style';
    st.textContent = '.am-ico{display:inline-block;vertical-align:middle;flex-shrink:0}';
    (document.head || document.documentElement).appendChild(st);
  }

  var AM_ICONS = {
    /* ── navegação ── */
    home:        '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    compass:     '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    clipboard:   '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/>',
    puzzle:      '<path d="M15.5 2a2.5 2.5 0 0 1 2.45 2.99A.5.5 0 0 0 18.4 5.5H20a2 2 0 0 1 2 2v1.6a.5.5 0 0 1-.51.45 2.5 2.5 0 0 0 0 4.9.5.5 0 0 1 .51.45V20a2 2 0 0 1-2 2h-1.6a.5.5 0 0 1-.45-.51 2.5 2.5 0 1 0-4.9 0 .5.5 0 0 1-.45.51H4a2 2 0 0 1-2-2v-1.6a.5.5 0 0 1 .51-.45 2.5 2.5 0 0 0 0-4.9A.5.5 0 0 1 2 9.6V8a2 2 0 0 1 2-2h1.6a.5.5 0 0 0 .45-.51A2.5 2.5 0 0 1 8.5 2.5"/>',
    settings:    '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    sparkles:    '<path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11.02a.5.5 0 0 1 0-.97L8.5 8.47a2 2 0 0 0 1.44-1.44L11.52.92a.5.5 0 0 1 .96 0l1.58 6.11A2 2 0 0 0 15.5 8.47l6.1 1.58a.5.5 0 0 1 0 .97l-6.1 1.58a2 2 0 0 0-1.44 1.46l-1.58 6.1a.5.5 0 0 1-.96 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    logout:      '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    menu:        '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
    plus:        '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'file-plus': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M12 12v6"/>',
    file:        '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13h6"/><path d="M9 17h6"/>',
    target:      '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    book:        '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    user:        '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',

    /* ── especialidades ── */
    stethoscope: '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    lung:        '<path d="M12 4v8"/><path d="M8.5 4h7"/><path d="M12 12c0-1.2-1-2.2-2.2-2.2C8.5 9.8 8 11 8 12.2c0 1.9-.4 3-1.4 4.5C5.8 17.9 5 19.2 5 20.6c0 1.1.9 2 2 2s2-.9 2.2-2c.3-1.7.8-3.4.8-5.3z"/><path d="M12 12c0-1.2 1-2.2 2.2-2.2 1.3 0 1.8 1.2 1.8 2.4 0 1.9.4 3 1.4 4.5.8 1.2 1.6 2.5 1.6 3.9 0 1.1-.9 2-2 2s-2-.9-2.2-2c-.3-1.7-.8-3.4-.8-5.3z"/>',
    scalpel:     '<path d="M20.5 3.5 9 15l-3 .5L6.5 12 18 .5a2.12 2.12 0 0 1 2.5 3z"/><path d="M6 15.5 3.5 18a2.12 2.12 0 0 0 3 3L9 18.5"/>',
    hospital:    '<path d="M12 6v4"/><path d="M14 8h-4"/><path d="M3 21V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v13"/><path d="M3 21h18"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/>',

    /* ── sintomas / clínico ── */
    heart:       '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
    heartpulse:  '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/><path d="M3.5 12h3l1.5-3 2 5 1.5-2h3" stroke-width="1.6"/>',
    brain:       '<path d="M12 5a3 3 0 1 0-5.99.14 4 4 0 0 0-1.96 6.32A3.5 3.5 0 0 0 6 18.5a3 3 0 0 0 6 .5z"/><path d="M12 5a3 3 0 1 1 5.99.14 4 4 0 0 1 1.96 6.32A3.5 3.5 0 0 1 18 18.5a3 3 0 0 1-6 .5z"/><path d="M12 5v14"/>',
    thermometer: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/>',
    flame:       '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    droplet:     '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    droplets:    '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 4.8 7 3.5c-.29 1.3-1.14 2.63-2.29 3.56S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
    zap:         '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    tornado:     '<path d="M21 4H3"/><path d="M18 8H6"/><path d="M19 12H9"/><path d="M16 16h-6"/><path d="M11 20H9"/>',
    wind:        '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
    bone:        '<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5z"/>',
    activity:    '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    moon:        '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    frown:       '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    scale:       '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    'trending-down': '<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>',
    hand:        '<path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    ban:         '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    alert:       '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    eye:         '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0z"/><circle cx="12" cy="12" r="3"/>',
    ruler:       '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
    toilet:      '<path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/><path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v8"/>',
    pill:        '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/>',
    abdomen:     '<circle cx="12" cy="12" r="9"/><path d="M12 3a4 4 0 0 0 0 8 4 4 0 0 1 0 8"/>',
    drum:        '<path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="4"/><path d="M2 9v6a10 4 0 0 0 20 0V9"/>',

    /* RAS — sistemas */
    ear:         '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>',
    nose:        '<path d="M12 3c-1 4-2.5 6-4 8.5-.8 1.3-.5 3 1 3.5"/><path d="M9 15a3 3 0 0 0 6 0"/><path d="M15 15c1.5-.5 1.8-2.2 1-3.5C14.5 9 13 7 12 3"/>',
    tooth:       '<path d="M9 22c-1.5 0-2-2-2.5-5C6 14 5 12 5 9a7 7 0 0 1 14 0c0 3-1 5-1.5 8C17 20 16.5 22 15 22s-2-3-3-3-1.5 3-3 3z"/>',
    kidney:      '<path d="M14 3c-4 0-7 3-7 8s3 8 7 8c2 0 3.2-1.2 3.2-3.2 0-1.6-1.2-2.3-1.2-3.8s1.2-2.2 1.2-3.8C17.2 5 16 3 14 3z"/>',
    cloud:       '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>',
    microscope:  '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
    flask:       '<path d="M10 2v6.3a1 1 0 0 1-.17.55L4.6 17a1 1 0 0 0 .83 1.55h13.14a1 1 0 0 0 .83-1.55l-5.23-8.15a1 1 0 0 1-.17-.55V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',

    /* fallback */
    _fallback:   '<circle cx="12" cy="12" r="9"/>'
  };

  // Mapa de emoji legado -> key semântica (escolhida pelo SIGNIFICADO clínico do motivo,
  // não pela aparência do emoji — ex.: 🔴 "dor" -> flame; 🟡 "icterícia" -> droplet).
  var AM_EMOJI = {
    '🏠':'home','🧭':'compass','📋':'clipboard','🧩':'puzzle','🧠':'brain',
    '⚙️':'settings','⚙':'settings','✨':'sparkles','➕':'plus','✚':'plus','＋':'plus',
    '📖':'book','📘':'book','📚':'book','🩺':'stethoscope','🏥':'hospital',
    '🫁':'lung','🔪':'scalpel','🫀':'heart','❤️':'heart','💛':'droplet','💓':'heartpulse',
    '🩸':'droplet','🔴':'flame','🔵':'droplet','🟡':'droplet','🟤':'droplet','🟠':'flame',
    '💧':'droplet','🫧':'droplets','🌡️':'thermometer','🔥':'flame','⚡':'zap','🌀':'tornado',
    '😮‍💨':'wind','😤':'wind','💨':'wind','🤢':'frown','😔':'frown','😴':'moon',
    '🦴':'bone','🦵':'activity','⚖️':'scale','⚖':'scale','🔻':'trending-down','🫸':'hand','✋':'hand',
    '🚽':'toilet','🚻':'toilet','⛔':'ban','⚠️':'alert','🚨':'alert','🤕':'alert',
    '👁️':'eye','👁':'eye','📐':'ruler','🥁':'drum','🫃':'abdomen','💊':'pill',
    '📄':'file','📝':'file','📋':'clipboard','🎯':'target','🏠':'home',
    '👂':'ear','👃':'nose','🦷':'tooth','🫘':'kidney','🫱':'hand','🦿':'bone','🩻':'abdomen',
    '💭':'cloud','🔬':'microscope','⚗️':'flask','⚗':'flask','🫀':'heart',
    '🔘':'_fallback','◎':'home','☰':'clipboard','⊕':'plus','◯':'_fallback'
  };

  function resolveKey(k) {
    if (!k) return '_fallback';
    if (AM_ICONS[k]) return k;          // já é uma key
    if (AM_EMOJI[k]) return AM_EMOJI[k]; // é um emoji legado
    return '_fallback';
  }

  window.AM_ICONS = AM_ICONS;
  window.AM_EMOJI = AM_EMOJI;
  window.amIcon = function (key, size) {
    size = size || 20;
    var path = AM_ICONS[resolveKey(key)];
    return '<svg class="am-ico" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true" focusable="false">' + path + '</svg>';
  };

  /* Hidratação declarativa para HTML estático:
     <span data-am-icon="home"></span> ou <span data-am-icon="home" data-am-size="22"></span> */
  function amHydrateIcons(root) {
    (root || document).querySelectorAll('[data-am-icon]').forEach(function (el) {
      if (el.dataset.amDone) return;
      var size = parseInt(el.getAttribute('data-am-size'), 10) || 20;
      el.innerHTML = amIcon(el.getAttribute('data-am-icon'), size);
      el.dataset.amDone = '1';
    });
  }
  window.amHydrateIcons = amHydrateIcons;
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { amHydrateIcons(); });
    } else {
      amHydrateIcons();
    }
  }
})();
