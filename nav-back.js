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
