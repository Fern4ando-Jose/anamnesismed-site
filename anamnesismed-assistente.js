/* ============================================================================
 * anamnesismed-assistente.js — Assistente de IA (apoio diagnóstico)
 * Responsabilidade: aba "Assistente IA" dentro do app.
 *  - Gating: recurso EXCLUSIVO do plano pago (Pro). Trava visual + servidor.
 *  - Coleta a HC atual (montarPayloadAssistente em narrativa.js), envia o token
 *    Supabase para /api/assistente-dx e renderiza o relatório estruturado.
 * Carregado DEPOIS de supabase-integration.js e narrativa.js (regra 6 do CLAUDE.md):
 *   depende de window.authGetToken e window.montarPayloadAssistente.
 * ========================================================================== */
(function(){
  'use strict';

  // Estado de acesso: true=Pro, false=sem acesso, undefined=ainda não verificado
  window.__iaDxPro = window.__iaDxPro;
  var loading = false;

  function L(){ return document.documentElement.getAttribute('data-lang')==='es' ? 'es' : 'pt'; }
  function t(pt, es){ return L()==='es' ? es : pt; }
  function esc(s){
    return String(s==null?'':s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function el(id){ return document.getElementById(id); }

  // ── Gating: chamado pelo bloco de integração Supabase do app.html ──────────
  function assistenteApplyGate(access){
    window.__iaDxPro = !!(access && access.type === 'pro');
    renderGate();
  }
  function renderGate(){
    var locked = el('ia-dx-locked'), tool = el('ia-dx-tool'), check = el('ia-dx-checking');
    if(!locked || !tool) return;
    if(window.__iaDxPro === undefined){
      if(check) check.style.display = '';
      locked.style.display = 'none'; tool.style.display = 'none';
      return;
    }
    if(check) check.style.display = 'none';
    if(window.__iaDxPro){ tool.style.display = ''; locked.style.display = 'none'; }
    else { locked.style.display = ''; tool.style.display = 'none'; }
  }

  // ── Aberta a aba (chamado por showGuide) ───────────────────────────────────
  function assistenteOnOpen(){ renderGate(); }

  // ── Disparo da análise ─────────────────────────────────────────────────────
  function assistenteAnalisar(){
    if(loading) return;
    if(!window.__iaDxPro){ renderGate(); return; }
    var btn = el('ia-dx-btn'), status = el('ia-dx-status'), out = el('ia-dx-result');
    if(typeof window.montarPayloadAssistente !== 'function'){
      if(status) status.textContent = t('Ferramenta indisponível. Recarregue a página.','Herramienta no disponible. Recarga la página.');
      return;
    }
    var payload = window.montarPayloadAssistente(L());
    var hc = payload.hc || {};
    var temConteudo = (hc.relatoLivre && hc.relatoLivre.trim()) ||
      (Array.isArray(hc.motivos) && hc.motivos.length) ||
      (hc.exameFisico && hc.exameFisico.trim());
    if(!temConteudo){
      if(status){ status.textContent = t('Preencha a HC antes de pedir a análise.','Completa la HC antes de pedir el análisis.'); }
      return;
    }

    loading = true;
    if(btn){ btn.disabled = true; }
    if(status){ status.textContent = t('Analisando a HC…','Analizando la HC…'); }
    if(out){ out.innerHTML = '<div class="ia-dx-skel"></div><div class="ia-dx-skel"></div><div class="ia-dx-skel" style="width:60%"></div>'; }

    var tokenP = (typeof window.authGetToken === 'function') ? window.authGetToken() : Promise.resolve(null);
    Promise.resolve(tokenP).then(function(token){
      if(!token){ throw { _code:'auth' }; }
      return fetch('/api/assistente-dx', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+token },
        body: JSON.stringify(payload)
      }).then(function(r){
        // A resposta nem sempre é JSON: quando a análise passa do tempo máximo, a
        // plataforma devolve uma página de erro. Antes isso estourava no r.json() e
        // caía no catch, e a tela dizia "Falha de conexão" — que mandava o médico
        // procurar problema na internet dele, sendo que a internet estava boa.
        return r.text().then(function(txt){
          var j = null;
          try { j = JSON.parse(txt); } catch (e) { j = null; }
          return { status:r.status, j:j, cru:txt };
        });
      });
    }).then(function(res){
      if(res.status === 200 && res.j){
        if(res.j.relatorio){ renderRelatorio(res.j.relatorio); }
        else if(res.j.raw){ renderRaw(res.j.raw); }
        else { showError(t('O modelo não retornou análise.','El modelo no devolvió análisis.')); }
        if(status){ status.textContent = t('Pronto — revise com julgamento clínico.','Listo — revisa con juicio clínico.'); }
        return;
      }
      var code = res.j && res.j.code;
      if(res.status === 403 || code === 'upgrade'){
        window.__iaDxPro = false; renderGate(); if(status) status.textContent='';
      } else if(res.status === 401){
        showError(t('Sessão expirada. Faça login novamente.','Sesión expirada. Inicia sesión de nuevo.')); if(status) status.textContent='';
      } else if(res.status === 429 || code === 'rate_limit'){
        showError((res.j && res.j.error) || t('Limite diário atingido.','Límite diario alcanzado.')); if(status) status.textContent='';
      } else if(!res.j){
        // Resposta sem JSON = a análise foi cortada por tempo (504/502) ou a rota caiu.
        showError(t('A análise demorou mais que o tempo permitido e foi interrompida. Tente novamente — se repetir, reduza o tamanho da HC.',
                    'El análisis tardó más del tiempo permitido y se interrumpió. Inténtalo de nuevo — si se repite, reduce el tamaño de la HC.'));
        if(status) status.textContent='';
      } else {
        showError((res.j && res.j.error) || t('Erro ao gerar a análise.','Error al generar el análisis.')); if(status) status.textContent='';
      }
    }).catch(function(err){
      if(err && err._code === 'auth'){ showError(t('Faça login para usar o assistente.','Inicia sesión para usar el asistente.')); }
      else { showError(t('Falha de conexão. Tente novamente.','Error de conexión. Inténtalo de nuevo.')); }
      if(status) status.textContent='';
    }).then(function(){
      loading = false; if(btn){ btn.disabled = false; }
    });
  }

  function showError(m){
    var out = el('ia-dx-result'); if(out) out.innerHTML = '<div class="ia-dx-err">'+esc(m)+'</div>';
  }

  // ── Renderização do relatório estruturado ──────────────────────────────────
  function probBadge(p){
    var map = {
      alta:  {pt:'Alta', es:'Alta',  c:'#dc2626', bg:'rgba(220,38,38,.12)'},
      media: {pt:'Média',es:'Media', c:'#d97706', bg:'rgba(217,119,6,.14)'},
      baixa: {pt:'Baixa',es:'Baja',  c:'#64748b', bg:'rgba(100,116,139,.14)'}
    };
    var m = map[p] || map.media;
    return '<span class="ia-dx-badge" style="color:'+m.c+';background:'+m.bg+'">'+esc(t(m.pt,m.es))+'</span>';
  }
  function ul(items, cls){
    if(!items || !items.length) return '';
    return '<ul class="'+cls+'">'+items.map(function(i){ return '<li>'+esc(i)+'</li>'; }).join('')+'</ul>';
  }
  function renderRelatorio(r){
    var out = el('ia-dx-result'); if(!out) return;
    var h = '';
    if(r.resumo){
      h += '<div class="ia-dx-resumo"><span class="ia-dx-sec-lbl">'+esc(t('Resumo do caso','Resumen del caso'))+'</span><p>'+esc(r.resumo)+'</p></div>';
    }
    if(r.diferenciais && r.diferenciais.length){
      h += '<div class="ia-dx-sec-lbl">'+esc(t('Diagnóstico diferencial','Diagnóstico diferencial'))+'</div>';
      h += r.diferenciais.map(function(d){
        var s = '<div class="ia-dx-card"><div class="ia-dx-card-top"><strong>'+esc(d.hipotese)+'</strong>'+probBadge(d.probabilidade)+'</div>';
        if(d.aFavor && d.aFavor.length){ s += '<div class="ia-dx-fav"><span>'+esc(t('A favor','A favor'))+'</span>'+ul(d.aFavor,'ia-dx-li-fav')+'</div>'; }
        if(d.contra && d.contra.length){ s += '<div class="ia-dx-con"><span>'+esc(t('Contra / a investigar','En contra / a investigar'))+'</span>'+ul(d.contra,'ia-dx-li-con')+'</div>'; }
        return s + '</div>';
      }).join('');
    }
    if(r.sinaisAlarme && r.sinaisAlarme.length){
      h += '<div class="ia-dx-alarme"><span class="ia-dx-sec-lbl">'+esc(t('Sinais de alarme','Signos de alarma'))+'</span>'+ul(r.sinaisAlarme,'ia-dx-li-alarme')+'</div>';
    }
    // As três seções que respondem "e agora, o que eu faço?" — pedido do dono em
    // 02/08: o que examinar na hora, o que pedir e o que fecha o diagnóstico.
    if(r.exameFisico && r.exameFisico.length){
      h += '<div class="ia-dx-passos"><span class="ia-dx-sec-lbl">'+esc(t('Ao exame — manobras e sinais a pesquisar','Al examen — maniobras y signos a buscar'))+'</span>'+ul(r.exameFisico,'ia-dx-li-passos')+'</div>';
    }
    if(r.exames && r.exames.length){
      h += '<div class="ia-dx-passos"><span class="ia-dx-sec-lbl">'+esc(t('Exames a solicitar','Estudios a solicitar'))+'</span>'+ul(r.exames,'ia-dx-li-passos')+'</div>';
    }
    if(r.paraFechar && r.paraFechar.length){
      h += '<div class="ia-dx-passos"><span class="ia-dx-sec-lbl">'+esc(t('Para fechar o diagnóstico','Para cerrar el diagnóstico'))+'</span>'+ul(r.paraFechar,'ia-dx-li-passos')+'</div>';
    }
    if(r.perguntasFaltantes && r.perguntasFaltantes.length){
      h += '<div class="ia-dx-passos"><span class="ia-dx-sec-lbl">'+esc(t('Falta perguntar','Falta preguntar'))+'</span>'+ul(r.perguntasFaltantes,'ia-dx-li-passos')+'</div>';
    }
    if(r.proximosPassos && r.proximosPassos.length){
      h += '<div class="ia-dx-passos"><span class="ia-dx-sec-lbl">'+esc(t('Próximos passos','Próximos pasos'))+'</span>'+ul(r.proximosPassos,'ia-dx-li-passos')+'</div>';
    }
    out.innerHTML = h || ('<div class="ia-dx-err">'+esc(t('Sem conteúdo para exibir.','Sin contenido para mostrar.'))+'</div>');
  }
  // Texto que o servidor não conseguiu organizar. NUNCA despejar JSON na tela: em
  // 02/08 o relatório veio cortado, o servidor não conseguiu montar a estrutura e o
  // médico recebeu chaves, colchetes e aspas na cara. Se o que sobrou parece código,
  // a tela diz o que houve e oferece repetir; se for texto legível, mostra o texto.
  function renderRaw(text){
    var out = el('ia-dx-result'); if(!out) return;
    var s = String(text||'').trim();
    var pareceCodigo = /^[\{\[]/.test(s) || /"\s*:\s*[\["{]/.test(s.slice(0,400));
    if(pareceCodigo){
      out.innerHTML = '<div class="ia-dx-err">'+esc(t(
        'A análise voltou incompleta e não pôde ser organizada na tela. Clique em "Analisar HC" novamente — se repetir, resuma a HC.',
        'El análisis volvió incompleto y no se pudo organizar en pantalla. Pulsa "Analizar HC" de nuevo — si se repite, resume la HC.'))+'</div>';
      return;
    }
    out.innerHTML = '<div class="ia-dx-raw">'+esc(s).replace(/\n/g,'<br>')+'</div>';
  }

  // expõe API usada pelo app.html / guide.js
  window.assistenteApplyGate = assistenteApplyGate;
  window.assistenteOnOpen    = assistenteOnOpen;
  window.assistenteAnalisar  = assistenteAnalisar;
})();
