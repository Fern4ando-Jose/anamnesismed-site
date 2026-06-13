/* nav-back.js — Botão "Voltar" padronizado (.topbar-back)
 *
 * Componente único: TODA página da área autenticada usa o mesmo botão de voltar.
 * Comportamento: volta para a página anterior (history.back) quando existe
 * histórico interno do site; se não houver (acesso direto por link, nova aba,
 * primeiro acesso), navega para o destino de fallback — que é o próprio href
 * do link. O rótulo já vem padronizado no HTML como "← Voltar / ← Volver".
 *
 * Páginas com edição não salva (ex.: formulário de HC) marcam o link com
 * data-confirm-discard para chamar confirmDiscardHC() antes de sair.
 *
 * Para usar numa página nova: dar a classe `topbar-back` ao link, com um href
 * de fallback sensato, e incluir <script src="nav-back.js"></script>.
 */
(function () {
  // Estilo canônico do botão "quadradinho" — fonte ÚNICA de aparência, vale em
  // todas as páginas. Padrão: caixa arredondada com borda. var(...) com fallback
  // para funcionar em qualquer tema (refs roxas, app teal, etc.).
  // ensureStyleLast() cria o <style> e o mantém como ÚLTIMO no <head>, para vencer
  // os estilos locais por ordem de cascata mesmo onde o nav-back.js é carregado
  // no <head> antes do <style> inline da página (ex.: especialidades, app).
  var NAV_BACK_CSS =
    '.topbar-back{display:inline-flex;align-items:center;gap:5px;' +
    'font-size:12px;font-weight:700;line-height:1;' +
    'color:var(--muted,#5b6b78);text-decoration:none;cursor:pointer;' +
    'padding:6px 12px;border-radius:6px;' +
    'border:1.5px solid var(--line-md,#d7dee3);background:var(--bg-card,#fff);' +
    'transition:all .18s;white-space:nowrap;flex-shrink:0}' +
    '.topbar-back:hover{border-color:var(--primary,var(--ink,#0e7490));' +
    'color:var(--primary,var(--ink,#0e7490))}';
  function ensureStyleLast() {
    var st = document.getElementById('nav-back-style');
    if (!st) {
      st = document.createElement('style');
      st.id = 'nav-back-style';
      st.textContent = NAV_BACK_CSS;
    }
    (document.head || document.documentElement).appendChild(st); // cria ou move p/ o fim
  }
  ensureStyleLast();

  function handle(e, el) {
    // Confirmação de descarte (formulário com alterações não salvas)
    if (el.hasAttribute('data-confirm-discard') && typeof window.confirmDiscardHC === 'function') {
      if (!window.confirmDiscardHC()) { e.preventDefault(); return; }
    }
    var sameOrigin = false;
    try {
      sameOrigin = !!document.referrer && new URL(document.referrer).origin === location.origin;
    } catch (_) {}
    // Há página anterior do próprio site → volta de verdade.
    if (window.history.length > 1 && sameOrigin) {
      e.preventDefault();
      window.history.back();
      return;
    }
    // Sem histórico interno → deixa o href (fallback) navegar normalmente.
  }

  function init() {
    ensureStyleLast(); // garante que o estilo canônico fique por último no <head>
    var links = document.querySelectorAll('.topbar-back');
    for (var i = 0; i < links.length; i++) {
      (function (el) {
        el.addEventListener('click', function (e) { handle(e, el); });
      })(links[i]);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
