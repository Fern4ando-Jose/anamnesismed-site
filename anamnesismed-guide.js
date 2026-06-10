// anamnesismed-guide.js
// Builders de HTML para o painel de guia clínico (mnemônicas, DDx, manobras, etc.)
// e para o formulário AEA (Anamnese Estruturada Automatizada).
// REGRA: alterações visuais nos painéis de guia vão SOMENTE aqui.
// Depende de: anamnesismed-motivos.js (GUIDE_CONTENT)

// ── AEA GUIDED QUESTIONS HTML BUILDER ──────────────────────────

function buildAEAGuideHTML(mObj, idPfx, lang, titleStyle){
  var ts = titleStyle||'';
  var html = '<div class="aea-guided">';
  html += '<div class="aea-guided-title pt" style="'+ts+'">Perguntas guiadas — '+mObj.name+'</div>';
  html += '<div class="aea-guided-title es" style="'+ts+'">Preguntas guiadas — '+(mObj.nameEs||mObj.name)+'</div>';
  mObj.aeaGuide.forEach(function(q,i){
    var id = idPfx+i;
    html += '<div class="aea-q">';
    html += '<div class="aea-q-lbl pt">'+q.q+'</div>';
    html += '<div class="aea-q-lbl es">'+(q.qEs||q.q)+'</div>';
    if(q.type==='radio'){
      html += '<div class="f-radios" id="'+id+'">';
      q.opts.forEach(function(o,oi){
        var oEs = (q.optsEs && q.optsEs[oi]) || o;
        html += '<div class="f-radio" onclick="selectRadio(this,\''+id+'\')"><span class="pt">'+o+'</span><span class="es">'+oEs+'</span></div>';
      });
      html += '</div>';
    } else if(q.type==='multi'){
      html += '<div class="aea-q-hint pt" style="font-size:11px;color:var(--ink-soft,#6b7c8a);margin-bottom:5px">Selecione quantas opções forem aplicáveis</div>';
      html += '<div class="aea-q-hint es" style="font-size:11px;color:var(--ink-soft,#6b7c8a);margin-bottom:5px">Seleccione todas las opciones que correspondan</div>';
      html += '<div class="f-radios" id="'+id+'">';
      q.opts.forEach(function(o,oi){
        var oEs = (q.optsEs && q.optsEs[oi]) || o;
        html += '<div class="f-radio" onclick="selectMultiChip(this,\''+id+'\')"><span class="pt">'+o+'</span><span class="es">'+oEs+'</span></div>';
      });
      html += '</div>';
    } else if(q.type==='yn'){
      html += '<div class="yn-btns" style="justify-content:flex-start;gap:6px;display:flex">';
      html += '<button class="yn-btn" onclick="ynBtnSel(this,\''+id+'\',\'sim\')"><span class="pt">Sim</span><span class="es">Sí</span></button>';
      html += '<button class="yn-btn" onclick="ynBtnSel(this,\''+id+'\',\'nao\')"><span class="pt">Não</span><span class="es">No</span></button>';
      html += '</div>';
    } else if(q.type==='input'){
      html += '<input class="f-input" type="text" id="'+id+'" placeholder="'+(lang==='es'?(q.ph2||q.ph||''):(q.ph||''))+'">';
    }
    html += '</div>';
  });
  html += '</div>';
  return html;
}

// ── GUIDE CONTENT BUILDERS ────────────────────────────
// Helper bilíngue: emite os dois idiomas em spans .pt/.es (o CSS [data-lang]
// faz a troca instantânea, igual ao resto do site). Fallback: se faltar ES,
// usa o PT (sem regressão enquanto o conteúdo não é traduzido).
function bi(pt, es){
  pt = (pt==null) ? '' : pt;
  var e = (es==null || es==='') ? pt : es;
  return '<span class="pt">'+pt+'</span><span class="es">'+e+'</span>';
}

function buildMnemonicsHTML(gc){
  if(!gc||!gc.mnemonics||!gc.mnemonics.length)
    return '<div class="ibox ibox-primary"><strong>Mnemônicas</strong><span class="pt">Nenhuma mnemônica cadastrada para este motivo ainda.</span><span class="es">Ninguna mnemotécnica registrada aún.</span></div>';
  var html='';
  gc.mnemonics.forEach(function(m){
    html+='<div class="mnem-card"><div class="mnem-card-head"><span class="mnem-kw">'+m.kw+'</span><span class="mnem-name">'+bi(m.name,m.nameEs)+'</span></div>';
    m.rows.forEach(function(r){
      // r = [letra, termo, dica, termoEs?, dicaEs?]
      html+='<div class="mnem-row"><span class="mnem-letter">'+r[0]+'</span><span><span class="mnem-term">'+bi(r[1],r[3])+'</span><span class="mnem-hint">'+bi(r[2],r[4])+'</span></span></div>';
    });
    html+='</div>';
  });
  return html;
}

function buildManobrasHTML(gc){
  if(!gc||!gc.manobras||!gc.manobras.length)
    return '<div class="ibox ibox-primary"><strong>Manobras Semiológicas</strong><span class="pt">Nenhuma manobra cadastrada para este motivo ainda.</span><span class="es">Ninguna maniobra registrada aún.</span></div>';
  var html='';
  gc.manobras.forEach(function(m,i){
    html+='<div class="acc" id="acc-m-'+i+'">';
    html+='<div class="acc-head" onclick="this.closest(\'.acc\').classList.toggle(\'open\')">';
    html+='<span class="acc-num">'+(i+1)+'</span>';
    html+='<div><div class="acc-title">'+bi(m.title,m.titleEs)+'</div><div class="acc-subtitle">'+bi(m.subtitle,m.subtitleEs)+'</div></div>';
    html+='<span class="acc-toggle">+</span></div>';
    html+='<div class="acc-body"><ul class="acc-steps">';
    m.steps.forEach(function(s,si){var sEs=(m.stepsEs&&m.stepsEs[si]);html+='<li class="acc-step"><span class="acc-step-n">'+(si+1)+'.</span><span>'+bi(s,sEs)+'</span></li>';});
    html+='</ul><div class="acc-findings">';
    html+='<div class="acc-finding normal"><span class="acc-finding-lbl pt">Normal / Negativo</span><span class="acc-finding-lbl es">Normal / Negativo</span>'+bi(m.normal,m.normalEs)+'</div>';
    html+='<div class="acc-finding abnormal"><span class="acc-finding-lbl pt">Alterado / Positivo</span><span class="acc-finding-lbl es">Alterado / Positivo</span>'+bi(m.abnormal,m.abnormalEs)+'</div>';
    html+='</div></div></div>';
  });
  return html;
}

function buildSinaisHTML(gc){
  if(!gc||!gc.sinais||!gc.sinais.length)
    return '<div class="ibox ibox-secondary"><strong>Sinais Clássicos</strong><span class="pt">Nenhum sinal cadastrado para este motivo ainda.</span></div>';
  var html='<div class="sign-grid">';
  gc.sinais.forEach(function(s){
    html+='<div class="sign-card"><div class="sign-name">'+bi(s.name,s.nameEs)+'</div>';
    html+='<span class="sign-eponym">'+bi(s.eponym,s.eponymEs)+'</span>';
    html+='<div class="sign-how">'+bi(s.how,s.howEs)+'</div>';
    html+='<span class="sign-means">'+bi(s.means,s.meansEs)+'</span></div>';
  });
  return html+'</div>';
}

function buildDDxHTML(gc){
  if(!gc||!gc.ddx||!gc.ddx.length)
    return '<div class="ibox ibox-primary"><strong pt>Diagnóstico Diferencial</strong><span class="pt">Nenhum DDx cadastrado para este motivo.</span></div>';
  var html='<table class="ddx-table"><thead><tr><th pt>Diagnóstico</th><th es>Diagnóstico</th><th pt>A favor</th><th es>A favor</th><th pt>Contra</th><th es>En contra</th></tr></thead><tbody>';
  gc.ddx.forEach(function(d){
    // d = [diag, aFavor, contra, diagEs?, aFavorEs?, contraEs?]
    html+='<tr><td>'+bi(d[0],d[3])+'</td><td><span class="ddx-inc">✓</span> '+bi(d[1],d[4])+'</td><td><span class="ddx-exc">✗</span> '+bi(d[2],d[5])+'</td></tr>';
  });
  return html+'</tbody></table>';
}

function buildEscalasHTML(gc){
  if(!gc||!gc.escalas||!gc.escalas.length)
    return '<div class="ibox ibox-secondary"><strong>Escalas</strong><span class="pt">Nenhuma escala cadastrada para este motivo ainda.</span></div>';
  var html='';
  gc.escalas.forEach(function(e){
    html+='<div class="score-title">'+bi(e.title,e.titleEs)+'</div>';
    html+='<table class="score-table"><thead><tr>';
    e.headers.forEach(function(h,hi){var hEs=(e.headersEs&&e.headersEs[hi]);html+='<th>'+bi(h,hEs)+'</th>';});
    html+='</tr></thead><tbody>';
    e.rows.forEach(function(r,ri){html+='<tr>';r.forEach(function(c,ci){var cEs=(e.rowsEs&&e.rowsEs[ri]&&e.rowsEs[ri][ci]);html+='<td>'+bi(c,cEs)+'</td>';});html+='</tr>';});
    html+='</tbody></table>';
    if(e.note)html+='<div class="score-note"><strong pt>Interpretação</strong><strong es>Interpretación</strong>'+bi(e.note,e.noteEs)+'</div>';
  });
  return html;
}

function buildCondutaHTML(gc){
  if(!gc||!gc.conduta)
    return '<div class="ibox ibox-primary"><strong>Conduta</strong><span class="pt">Nenhuma conduta cadastrada para este motivo ainda.</span></div>';
  var c=gc.conduta,html='';
  if(c.steps&&c.steps.length){
    html+='<div class="score-title pt">Passos da abordagem</div><div class="score-title es">Pasos del abordaje</div>';
    html+='<div style="background:rgba(14,116,144,.05);border:1px solid rgba(14,116,144,.18);border-radius:10px;padding:14px;margin-bottom:12px">';
    c.steps.forEach(function(s,si){var sEs=(c.stepsEs&&c.stepsEs[si]);html+='<div style="font-size:13px;padding:5px 0;border-bottom:1px solid var(--line);color:var(--ink)">'+bi(s,sEs)+'</div>';});
    html+='</div>';
  }
  if(c.exames&&c.exames.length){
    html+='<div class="score-title pt">Exames a solicitar</div><div class="score-title es">Exámenes a solicitar</div>';
    html+='<div class="f-checks f-checks-3" style="margin-bottom:12px">';
    c.exames.forEach(function(ex,xi){var exEs=(c.examesEs&&c.examesEs[xi]);html+='<div class="f-check" onclick="toggleCheck(this)"><div class="f-checkbox">✓</div><span style="font-size:11px">'+bi(ex,exEs)+'</span></div>';});
    html+='</div>';
  }
  if(c.drugs&&c.drugs.length){
    html+='<div class="score-title pt">Tratamento / Medicação</div><div class="score-title es">Tratamiento / Medicación</div>';
    c.drugs.forEach(function(d,di){var dEs=(c.drugsEs&&c.drugsEs[di]);html+='<div class="ibox ibox-secondary" style="margin-bottom:6px;padding:8px 12px;font-size:12px">'+bi(d,dEs)+'</div>';});
  }
  return html;
}

// ── GUIDE CONTENT (Mnemônicas, DDx etc.) ──────────────
function renderGuideContent(mObj){
  var area=document.getElementById('guide-content-area');
  if(!mObj)return;
  var gc=GUIDE_CONTENT[mObj.id]||null;
  var p='<div style="padding:18px 24px 60px">',pe='</div>';
  var html='';
  html+='<div class="guide-page active" id="gp-mnemonics">'+p+buildMnemonicsHTML(gc)+pe+'</div>';
  html+='<div class="guide-page" id="gp-manobras">'+p+buildManobrasHTML(gc)+pe+'</div>';
  html+='<div class="guide-page" id="gp-sinais">'+p+buildSinaisHTML(gc)+pe+'</div>';
  html+='<div class="guide-page" id="gp-ddx">'+p+buildDDxHTML(gc)+pe+'</div>';
  html+='<div class="guide-page" id="gp-escalas">'+p+buildEscalasHTML(gc)+pe+'</div>';
  html+='<div class="guide-page" id="gp-conduta">'+p+buildCondutaHTML(gc)
    +'<div class="f-row" style="margin-top:14px"><label class="f-label pt">Notas de conduta para este paciente</label><label class="f-label es">Notas de conducta para este paciente</label><textarea class="f-input" rows="4" id="conduta-guide-text"></textarea></div>'
    +pe+'</div>';
  area.innerHTML=html;
}
// ── GUIDE TABS ────────────────────────────────────────
function showGuide(tab, el){
  var guideMap = {form:null, mnemonics:'gp-mnemonics', manobras:'gp-manobras', sinais:'gp-sinais', ddx:'gp-ddx', escalas:'gp-escalas', conduta:'gp-conduta'};
  var secs = document.getElementById('hc-sections');
  var area = document.getElementById('guide-content-area');
  
  if(tab === 'form'){
    secs.style.display = '';
    area.style.display = 'none';
  } else {
    secs.style.display = 'none';
    area.style.display = '';
    area.querySelectorAll('.guide-page').forEach(function(p){p.classList.remove('active')});
    var gp = document.getElementById(guideMap[tab]);
    if(gp) gp.classList.add('active');
  }
  
  document.querySelectorAll('.guide-tab').forEach(function(t){t.classList.remove('active')});
  if(el) el.classList.add('active');
}
