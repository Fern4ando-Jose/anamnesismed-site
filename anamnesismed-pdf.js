// anamnesismed-pdf.js
// Exportação de história clínica para PDF (janela de impressão do navegador).
// REGRA: alterações no layout/conteúdo do PDF vão SOMENTE aqui.
// Depende de: anamnesismed-motivos.js, anamnesismed-narrativa.js, anamnesismed-guide.js


// -- Helpers globais de leitura do DOM ------------------------------------------
// Expostos globalmente para que anamnesismed-narrativa.js possa usa-los
// ao construir a narrativa AEA a partir das respostas guiadas.
function selLangText(sel){
  if(!sel) return '—';
  var lang = document.documentElement.getAttribute('data-lang')||'pt';
  var span = sel.querySelector('.'+lang);
  if(span) return span.textContent.trim();
  return sel.textContent.trim();
}
function fieldVal(id){
  var el = document.getElementById(id);
  if(!el) return '';
  if(el.tagName==='SELECT'){ return el.options[el.selectedIndex] ? el.options[el.selectedIndex].text.trim() : el.value; }
  return el.value;
}
function selOne(containerId){ return selLangText(document.querySelector('#'+containerId+' .sel')); }
function selMulti(containerId){
  var els = document.querySelectorAll('#'+containerId+' .sel');
  if(!els.length) return '—';
  return Array.prototype.map.call(els, selLangText).join(', ');
}
function ynAns(groupId){
  var lang = document.documentElement.getAttribute('data-lang')||'pt';
  var btns = document.querySelectorAll('.yn-btn');
  for(var i=0;i<btns.length;i++){
    var b=btns[i];
    var m=(b.getAttribute('onclick')||'').match(/\(this,\s*'([^']+)'\s*,\s*'([^']+)'\)/);
    if(m && m[1]===groupId && (b.classList.contains('sim')||b.classList.contains('nao')||b.classList.contains('ex'))){
      return m[2]==='sim'?(lang==='pt'?'Sim':'Sí'):(m[2]==='ex'?'Ex':(lang==='pt'?'Não':'No'));
    }
  }
  return '—';
}
// -------------------------------------------------------------------------------

function exportPDF(){
  var lang = document.documentElement.getAttribute('data-lang')||'pt';
  // Salva a HC (igual ao botão "Salvar") e registra a exportação para o contador "PDFs exportados"
  try{ saveHC(); }catch(e){ console.warn('saveHC erro ao exportar PDF:', e); }
  if (window.pdfExportRecord) {
    var expMotivoNome = currentMotivo ? (lang==='es' ? (currentMotivo.nameEs||currentMotivo.name) : currentMotivo.name) : null;
    window.pdfExportRecord({ motivo: expMotivoNome, motivoId: currentMotivo ? currentMotivo.id : null }).catch(function(e){ console.warn('pdfExportRecord erro:', e); });
  }
  var mNome = document.getElementById('dp-nome').value || (lang==='pt'?'Não informado':'No informado');
  var mSexo = document.getElementById('dp-sexo').value || '—';
  var mIdade = document.getElementById('dp-idade').value || '—';
  var mMC = document.getElementById('mc-a').value || (currentMotivo ? (lang==='es'?(currentMotivo.nameEs||currentMotivo.name):currentMotivo.name) : '—');
  var mAEA = document.getElementById('aea-texto').value || '—';
  var mHipo = document.getElementById('sum-hipoteses').value || '—';
  var mPlano = document.getElementById('plan-trat').value || '—';
  var mNom = currentMotivo ? (lang==='es'?currentMotivo.nameEs||currentMotivo.name:currentMotivo.name) : '—';
  
  var w = window.open('','_blank');
  w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8">');
  w.document.write('<title>HC — '+mNome+'</title>');
  w.document.write('<style>');
  w.document.write('*{margin:0;padding:0;box-sizing:border-box}');
  w.document.write('body{font-family:Arial,sans-serif;font-size:12px;color:#0d2d3d;padding:30px}');
  w.document.write('h1{font-size:18px;font-weight:700;margin-bottom:4px;color:#0d2d3d}');
  w.document.write('h2{font-size:13px;font-weight:700;background:#0d2d3d;color:#fff;padding:5px 8px;margin:16px 0 6px;border-radius:3px}');
  w.document.write('h3{font-size:11px;font-weight:700;color:#0e7490;text-transform:uppercase;letter-spacing:1px;margin:12px 0 4px}');
  w.document.write('.header{border-bottom:2px solid #0e7490;padding-bottom:10px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-start}');
  w.document.write('.logo{font-size:16px;font-weight:700;color:#0d2d3d}.logo span{color:#0e7490}');
  w.document.write('table.dados{width:100%;border-collapse:collapse;margin-bottom:14px;table-layout:fixed}');
  w.document.write('table.dados td{border:1px solid #ddd;padding:5px 8px;font-size:11px;vertical-align:top;word-wrap:break-word;overflow-wrap:break-word}');
  w.document.write('table.dados td:nth-child(1),table.dados td:nth-child(3){font-weight:700;background:#f0f4f8;color:#0d2d3d;width:17%}');
  w.document.write('table.dados td:nth-child(2),table.dados td:nth-child(4){width:33%}');
  w.document.write('p{margin-bottom:6px;line-height:1.6}');
  w.document.write('.field{margin-bottom:8px}.field-label{font-weight:700;font-size:10px;text-transform:uppercase;color:#4b6070;display:block;margin-bottom:2px}');
  w.document.write('.footer{border-top:1px solid #ddd;margin-top:24px;padding-top:8px;font-size:10px;color:#4b6070;display:flex;justify-content:space-between}');
  w.document.write('@media print{button{display:none}}');
  w.document.write('</style></head><body>');
  
  // Header
  w.document.write('<div class="header">');
  w.document.write('<div><div class="logo">Anamnesis<span>Med</span></div><p style="font-size:10px;color:#4b6070;margin-top:2px">História Clínica — Documento gerado em '+new Date().toLocaleDateString('pt-BR')+'</p></div>');
  w.document.write('<div style="text-align:right;font-size:10px;color:#4b6070"><strong>Motivo:</strong> '+mNom+'<br><strong>Data:</strong> '+new Date().toLocaleDateString('pt-BR')+' '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+'</div>');
  w.document.write('</div>');
  
  // DADOS PESSOAIS — TABELA
  w.document.write('<h2>'+(lang==='pt'?'1. Dados Pessoais':'1. Datos Personales')+'</h2>');
  w.document.write('<table class="dados">');
  w.document.write('<tr><td>'+(lang==='pt'?'Nome':'Nombre')+'</td><td>'+mNome+'</td><td>'+(lang==='pt'?'Sexo':'Sexo')+'</td><td>'+(mSexo==='M'?(lang==='pt'?'Masculino':'Masculino'):(mSexo==='F'?(lang==='pt'?'Feminino':'Femenino'):'—'))+'</td></tr>');
  w.document.write('<tr><td>'+(lang==='pt'?'Idade':'Edad')+'</td><td>'+mIdade+' anos</td><td>CI/RG</td><td>'+(document.getElementById('dp-ci').value||'—')+'</td></tr>');
  w.document.write('<tr><td>'+(lang==='pt'?'Procedência':'Procedencia')+'</td><td>'+(document.getElementById('dp-proc').value||'—')+'</td><td>'+(lang==='pt'?'Ocupação':'Ocupación')+'</td><td>'+(document.getElementById('dp-ocup').value||'—')+'</td></tr>');
  w.document.write('<tr><td>'+(lang==='pt'?'Estado Civil':'Estado Civil')+'</td><td>'+(document.getElementById('dp-ecivil').value||'—')+'</td><td>'+(lang==='pt'?'Telefone':'Teléfono')+'</td><td>'+(document.getElementById('dp-tel').value||'—')+'</td></tr>');
  w.document.write('<tr><td>'+(lang==='pt'?'Data Ingresso':'Fecha Ingreso')+'</td><td>'+(document.getElementById('dp-dtingresso').value||'—')+'</td><td>'+(lang==='pt'?'Acompanhante':'Acompañante')+'</td><td>'+(document.getElementById('dp-acomp-nome').value||'—')+'</td></tr>');
  
  function selLangText(sel){
    if(!sel) return '—';
    var span = sel.querySelector('.'+lang);
    if(span) return span.textContent.trim();
    return sel.textContent.trim();
  }
  // ── Helpers genéricos de leitura do DOM para o PDF ──
  function fieldVal(id){
    var el = document.getElementById(id);
    if(!el) return '';
    if(el.tagName==='SELECT'){ return el.options[el.selectedIndex] ? el.options[el.selectedIndex].text.trim() : el.value; }
    return el.value;
  }
  function selOne(containerId){ return selLangText(document.querySelector('#'+containerId+' .sel')); }
  function selMulti(containerId){
    var els = document.querySelectorAll('#'+containerId+' .sel');
    if(!els.length) return '—';
    return Array.prototype.map.call(els, selLangText).join(', ');
  }
  function checksReport(panelId){
    var els = document.querySelectorAll('#'+panelId+' .f-check.on');
    if(!els.length) return null;
    return Array.prototype.map.call(els, function(el){ return selLangText(el); });
  }
  // Lê um grupo Sim/Não/Ex pelo id passado para ynSelect/ynBtnSel, retornando o texto da resposta
  function ynAns(groupId){
    var btns = document.querySelectorAll('.yn-btn');
    for(var i=0;i<btns.length;i++){
      var b=btns[i];
      var m=(b.getAttribute('onclick')||'').match(/\(this,\s*'([^']+)'\s*,\s*'([^']+)'\)/);
      if(m && m[1]===groupId && (b.classList.contains('sim')||b.classList.contains('nao')||b.classList.contains('ex'))){
        return m[2]==='sim'?(lang==='pt'?'Sim':'Sí'):(m[2]==='ex'?'Ex':(lang==='pt'?'Não':'No'));
      }
    }
    return '—';
  }
  // Varre todas as .yn-row de um painel e monta "Pergunta: Resposta" usando o rótulo já visível no idioma atual
  function ynRowsReport(panelId){
    var rows = document.querySelectorAll('#'+panelId+' .yn-row');
    var lines = [];
    rows.forEach(function(row){
      var qEl = row.querySelector('.yn-question');
      if(!qEl) return;
      var span = qEl.querySelector('.'+lang);
      var qText = (span?span.textContent:qEl.textContent).trim();
      var sel = row.querySelector('.yn-btn.sim, .yn-btn.nao');
      var ans = '—';
      if(sel){
        var m=(sel.getAttribute('onclick')||'').match(/\(this,\s*'([^']+)'\s*,\s*'([^']+)'\)/);
        var v = m?m[2]:null;
        ans = v==='sim'?(lang==='pt'?'Sim':'Sí'):(v==='ex'?'Ex':(lang==='pt'?'Não':'No'));
      }
      if(qText) lines.push(qText+': '+ans);
    });
    return lines;
  }
  var feSel = document.querySelector('#dp-fe .sel');
  var feVal = selLangText(feSel);
  var ingr = document.querySelector('#dp-ingresso .sel');
  var ingrVal = selLangText(ingr);
  w.document.write('<tr><td>'+(lang==='pt'?'Forma de ingresso':'Forma de ingreso')+'</td><td>'+ingrVal+'</td><td>'+(lang==='pt'?'Fonte e Fé':'Fuente y Fe')+'</td><td>'+feVal+'</td></tr>');
  w.document.write('</table>');

  // NARRATIVE SECTIONS — cobre todos os painéis preenchíveis da HC (não apenas um subconjunto fixo)
  var sections = [
    {n:'2', tPt:'Motivo de Consulta', tEs:'Motivo de Consulta',
     txt: function(){return 'a) '+mMC+(document.getElementById('mc-b').value?'\nb) '+document.getElementById('mc-b').value:'')+(document.getElementById('mc-c').value?'\nc) '+document.getElementById('mc-c').value:'');}},
    {n:'3', tPt:'AEA — Antecedentes da Enfermidade Atual', tEs:'AEA — Antecedentes de la Enfermedad Actual',
     txt: function(){
      // PRIORIDADE: narrativa gerada/revisada pela IA (campo aea-narrativa).
      // Se o médico gerou a HC com IA e revisou, ela é a fonte da verdade da seção.
      var iaEl = document.getElementById('aea-narrativa');
      var iaNarr = iaEl ? (iaEl.value||'').trim() : '';
      if(iaNarr){
        var pIA = [iaNarr];
        if(mAEA && mAEA !== '—'){
          var rlIA = mAEA.trim().replace(/\s*\.\s*$/,'');
          if(rlIA){ rlIA = rlIA.charAt(0).toLowerCase()+rlIA.slice(1);
            pIA.push((lang==='es'?'Relata además que ':'Relata ainda que ')+rlIA+'.'); }
        }
        return pIA.join(' ');
      }
      // A AEA é montada como UMA narrativa cronológica corrida:
      // motivo1 + motivo2 + motivo3 + relato livre do médico, com a frase de fecho
      // ("Procura esta unidade de saúde…") reposicionada para o FINAL de tudo.
      function _g(mObj,pfx,cont){
        return (mObj && mObj.aeaGuide && mObj.aeaGuide.length)
          ? (gerarNarrativaAEA(mObj, lang, pfx, cont?{continuation:true}:undefined)||'') : '';
      }
      // separa a frase de fecho da narrativa do 1º motivo p/ recolocá-la no fim
      function _splitFecho(n){
        if(!n) return {body:'',fecho:''};
        var rx = (lang==='es') ? /\s*([^.]*acude a esta unidad de salud para evaluación médica\.)\s*$/i
                               : /\s*([^.]*procura esta unidade de saúde para avaliação médica\.)\s*$/i;
        var m = n.match(rx);
        return m ? {body:n.slice(0,m.index).trim(), fecho:m[1].trim()} : {body:n, fecho:''};
      }
      var m3 = (typeof currentMotivo3 !== 'undefined') ? currentMotivo3 : null;
      var sp = _splitFecho(_g(currentMotivo,'aea-g-',false));
      var parts = [];
      if(sp.body) parts.push(sp.body);
      var n2 = _g(currentMotivo2,'aea-g2-',true); if(n2) parts.push(n2);
      var n3 = _g(m3,'aea-g3-',true);             if(n3) parts.push(n3);
      // relato livre do médico, enquadrado como continuação cronológica da história
      if(mAEA && mAEA !== '—'){
        var rl = mAEA.trim().replace(/\s*\.\s*$/,'');
        if(rl){ rl = rl.charAt(0).toLowerCase()+rl.slice(1);
          parts.push((lang==='es'?'Relata además que ':'Relata ainda que ')+rl+'.'); }
      }
      if(sp.fecho) parts.push(sp.fecho);   // fecho por último
      return parts.join(' ') || '—';
    }},
    {n:'4', tPt:'AREA — Antecedentes Remotos', tEs:'AREA — Antecedentes Remotos',
     txt: function(){return document.getElementById('area-desc').value||'—';}},
    {n:'5', tPt:'Antecedentes Patológicos Pessoais (APP)', tEs:'Antecedentes Patológicos Personales (APP)',
     txt: function(){
      var t = ynRowsReport('panel-app').join('\n');
      var extras = [];
      if(fieldVal('app-cirurg')) extras.push((lang==='pt'?'Cirurgias prévias: ':'Cirugías previas: ')+fieldVal('app-cirurg'));
      if(fieldVal('app-trauma')) extras.push((lang==='pt'?'Traumatismos: ':'Traumatismos: ')+fieldVal('app-trauma'));
      if(fieldVal('app-intern')) extras.push((lang==='pt'?'Internações prévias: ':'Internaciones previas: ')+fieldVal('app-intern'));
      var vac = selOne('app-vacina'); if(vac && vac!=='—') extras.push((lang==='pt'?'Vacinação: ':'Vacunación: ')+vac);
      if(fieldVal('app-medicacao')) extras.push((lang==='pt'?'Medicação em uso: ':'Medicación en uso: ')+fieldVal('app-medicacao'));
      if(fieldVal('app-outras')) extras.push((lang==='pt'?'Outros antecedentes: ':'Otros antecedentes: ')+fieldVal('app-outras'));
      if(extras.length) t += (t?'\n':'')+extras.join('\n');
      return t||'—';
    }},
  ];
  if(mSexo==='F'){
    sections.push({n:'6', tPt:'APGO — Antecedentes Gineco-Obstétricos', tEs:'APGO — Antecedentes Gineco-Obstétricos',
     txt: function(){
      var t='';
      t += (lang==='pt'?'Menarca: ':'Menarquía: ')+(fieldVal('apgo-menarca')||'—')+'\n';
      t += (lang==='pt'?'Ciclos menstruais: ':'Ciclos menstruales: ')+(fieldVal('apgo-reg')||'—')+'\n';
      t += 'FUM: '+(fieldVal('apgo-fum')||'—')+'\n';
      t += (lang==='pt'?'Gestações: ':'Gestaciones: ')+(fieldVal('apgo-gest')||'0')+' | '+(lang==='pt'?'Partos normais: ':'Partos vaginales: ')+(fieldVal('apgo-pnorm')||'0')+' | '+(lang==='pt'?'Cesáreas: ':'Cesáreas: ')+(fieldVal('apgo-cesar')||'0')+' | '+(lang==='pt'?'Abortos: ':'Abortos: ')+(fieldVal('apgo-abort')||'0');
      var checks = checksReport('panel-apgo');
      if(checks) t += '\n'+checks.join(', ');
      return t;
     }});
  }
  sections.push(
    {n: mSexo==='F'?'7':'6', tPt:'APF — Antecedentes Pessoais Familiares', tEs:'APF — Antecedentes Personales Familiares',
     txt: function(){
      var t='';
      t += (lang==='pt'?'Mãe — viva: ':'Madre — viva: ')+selOne('apf-mae-viva')+(fieldVal('apf-mae-idade')?(' ('+fieldVal('apf-mae-idade')+(lang==='pt'?' anos':' años')+')'):'')+(fieldVal('apf-mae-patol')?(' — '+fieldVal('apf-mae-patol')):'')+'\n';
      t += (lang==='pt'?'Pai — vivo: ':'Padre — vivo: ')+selOne('apf-pai-vivo')+(fieldVal('apf-pai-idade')?(' ('+fieldVal('apf-pai-idade')+(lang==='pt'?' anos':' años')+')'):'')+(fieldVal('apf-pai-patol')?(' — '+fieldVal('apf-pai-patol')):'')+'\n';
      t += (lang==='pt'?'Irmãos — total: ':'Hermanos — total: ')+(fieldVal('apf-irm-tot')||'—')+' (♂ '+(fieldVal('apf-irm-m')||'0')+' / ♀ '+(fieldVal('apf-irm-f')||'0')+')\n';
      t += (lang==='pt'?'Filhos — total: ':'Hijos — total: ')+(fieldVal('apf-fil-tot')||'—')+' (♂ '+(fieldVal('apf-fil-m')||'0')+' / ♀ '+(fieldVal('apf-fil-f')||'0')+')';
      if(fieldVal('apf-outros')) t += '\n'+(lang==='pt'?'Outros antecedentes familiares: ':'Otros antecedentes familiares: ')+fieldVal('apf-outros');
      return t;
     }},
    {n: mSexo==='F'?'8':'7', tPt:'Resumo de Admissões Prévias', tEs:'Resumen de Admisiones Previas',
     txt: function(){return fieldVal('adm-texto')||'—';}},
    {n: mSexo==='F'?'9':'8', tPt:'Hábitos, História Pessoal e CASE', tEs:'Hábitos, Historia Personal y CASE',
     txt: function(){
      var t='';
      t += (lang==='pt'?'Ingesta hídrica: ':'Ingesta hídrica: ')+selOne('hab-ingesta')+'\n';
      t += (lang==='pt'?'Apetite: ':'Apetito: ')+selOne('hab-apetite')+'\n';
      t += (lang==='pt'?'Atividade física: ':'Actividad física: ')+selOne('hab-atfis')+'\n';
      t += (lang==='pt'?'Diurese: ':'Diuresis: ')+(fieldVal('hab-diurese')||'—')+'\n';
      t += (lang==='pt'?'Catarse intestinal: ':'Catarsis intestinal: ')+(fieldVal('hab-catarse')||'—')+'\n';
      t += (lang==='pt'?'Sono: ':'Sueño: ')+(fieldVal('hab-sono-h')||'—')+(lang==='pt'?'h/noite — qualidade: ':'h/noche — calidad: ')+selOne('hab-sono-q')+'\n';
      t += (lang==='pt'?'Tabagismo: ':'Tabaquismo: ')+ynAns('hab-tabaco')+(selOne('hab-tab-tipo')!=='—'?(' — '+selOne('hab-tab-tipo')):'')+'\n';
      t += (lang==='pt'?'Etilismo: ':'Etilismo: ')+ynAns('hab-alcool')+'\n';
      t += (lang==='pt'?'Classe social (Graffar): ':'Clase social (Graffar): ')+selOne('case-macro')+' / '+selOne('case-nivel')+'\n';
      t += (lang==='pt'?'Pessoas na casa: ':'Personas en casa: ')+(fieldVal('case-pessoas')||'—')+' | '+(lang==='pt'?'Nº de cômodos: ':'Nº de habitaciones: ')+(fieldVal('case-comodos')||'—')+' | '+(lang==='pt'?'Água: ':'Agua: ')+(fieldVal('case-agua')||'—');
      return t;
     }},
  );
  var nApp = mSexo==='F'?10:9;
  sections.push(
    {n:String(nApp), tPt:'Sumário de Achados', tEs:'Sumario de Hallazgos',
     txt: function(){return document.getElementById('sum-achados').value||'—';}},
    {n:String(nApp+1), tPt:'Hipótese Diagnóstica', tEs:'Hipótesis Diagnóstica',
     txt: function(){return mHipo;}},
    {n:String(nApp+2), tPt:'Plano de Trabalho / Conduta', tEs:'Plan de Trabajo / Conducta',
     txt: function(){
      var t=(lang==='pt'?'Exames: ':'Exámenes: ')+(document.getElementById('plan-exames').value||'—');
      t+='\n'+(lang==='pt'?'Tratamento: ':'Tratamiento: ')+(document.getElementById('plan-trat').value||'—');
      t+='\n'+(lang==='pt'?'Conduta: ':'Conducta: ')+(document.getElementById('plan-conduta').value||'—');
      var notas = fieldVal('conduta-guide-text');
      if(notas) t += '\n'+(lang==='pt'?'Notas de conduta (guia): ':'Notas de conducta (guía): ')+notas;
      return t;
    }},
  );

  sections.forEach(function(s){
    var tit = lang==='pt'?s.n+'. '+s.tPt:s.n+'. '+s.tEs;
    w.document.write('<h2>'+tit+'</h2>');
    // Blindagem: uma seção que falhe (ex.: erro no gerador de narrativa) NÃO pode
    // apagar as demais seções do PDF. Captura o erro e segue.
    var txt;
    try { txt = s.txt(); } catch(e){ console.warn('Erro na seção '+s.n+':', e); txt = '—'; }
    txt = (txt==null) ? '' : String(txt);
    txt.split('\n').forEach(function(line){if(line.trim())w.document.write('<p>'+line+'</p>');});
  });

  // RAS — Revisão por Aparatos e Sistemas (gerado dinamicamente por sistema)
  var rasSystems = document.querySelectorAll('#ras-content .ras-system');
  if(rasSystems.length){
    w.document.write('<h2>'+(lang==='pt'?(nApp+3)+'. Revisão por Aparelhos e Sistemas (RAS)':(nApp+3)+'. Revisión por Aparatos y Sistemas (RAS)')+'</h2>');
    rasSystems.forEach(function(sys){
      var nameEl = sys.querySelector('.ras-name');
      var sysName = nameEl ? nameEl.textContent.trim() : '';
      var lines = [];
      sys.querySelectorAll('.yn-row').forEach(function(row){
        var qEl = row.querySelector('.yn-question');
        var qText = qEl ? qEl.textContent.trim() : '';
        var sel = row.querySelector('.yn-btn.sim, .yn-btn.nao');
        var ans = '—';
        if(sel){
          var m=(sel.getAttribute('onclick')||'').match(/\(this,\s*'([^']+)'\s*,\s*'([^']+)'\)/);
          ans = (m&&m[2]==='sim')?(lang==='pt'?'Sim':'Sí'):(lang==='pt'?'Não':'No');
        }
        if(qText) lines.push(qText+': '+ans);
      });
      var obs = sys.querySelector('textarea');
      var obsVal = obs ? obs.value : '';
      var anyAnswered = lines.some(function(l){return l.indexOf(': —')===-1;});
      if(anyAnswered || obsVal){
        w.document.write('<h3>'+sysName+'</h3>');
        lines.forEach(function(l){w.document.write('<p>'+l+'</p>');});
        if(obsVal) w.document.write('<p><em>'+(lang==='pt'?'Observações: ':'Observaciones: ')+obsVal+'</em></p>');
      }
    });
  }

  // Exame Físico Geral — Ectoscopia (chips selecionados) + Sinais vitais
  w.document.write('<h2>'+(nApp+4)+'. '+(lang==='pt'?'Exame Físico Geral — Ectoscopia':'Examen Físico General — Ectoscopia')+'</h2>');
  var ectoMap = [
    ['ecto-consciencia', lang==='pt'?'Estado de consciência':'Estado de consciencia'],
    ['ecto-orientacao', lang==='pt'?'Orientação':'Orientación'],
    ['ecto-habito', lang==='pt'?'Hábito corporal':'Hábito corporal'],
    ['ecto-nutric', lang==='pt'?'Estado nutricional':'Estado nutricional'],
    ['ecto-facies', lang==='pt'?'Fácies':'Facies'],
    ['ecto-decubito', lang==='pt'?'Atitude e decúbito':'Actitud y decúbito'],
    ['ecto-marcha', 'Marcha'],
    ['ecto-impressao', lang==='pt'?'Impressão geral':'Impresión general'],
  ];
  ectoMap.forEach(function(e){
    var v = selOne(e[0]);
    if(v && v!=='—') w.document.write('<p>'+e[1]+': '+v+'</p>');
  });
  // Sinais vitais
  var pa=document.getElementById('sv-pa').value,fc=document.getElementById('sv-fc').value,fr=document.getElementById('sv-fr').value,temp=document.getElementById('sv-temp').value,spo2=document.getElementById('sv-spo2').value;
  if(pa||fc||fr||temp||spo2){
    w.document.write('<h3>'+(lang==='pt'?'Sinais Vitais':'Signos Vitales')+'</h3>');
    w.document.write('<p>PA: '+(pa||'—')+' mmHg | FC: '+(fc||'—')+' bpm | FR: '+(fr||'—')+' irpm | Temp: '+(temp||'—')+'°C | SpO₂: '+(spo2||'—')+'%</p>');
    w.document.write('<p>Peso: '+(document.getElementById('sv-peso').value||'—')+' kg | Altura: '+(document.getElementById('sv-altura').value||'—')+' cm | IMC: '+(document.getElementById('sv-imc').value||'—')+'</p>');
  }
  
  w.document.write('<div class="footer"><span>AnamnesísMed · anamnesismed.com</span><span>Documento de uso educacional — não substitui avaliação médica</span><span>'+new Date().toLocaleDateString('pt-BR')+'</span></div>');
  w.document.write('<br><button onclick="window.print()" style="padding:8px 20px;background:#0e7490;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">Imprimir / Salvar PDF</button>');
  w.document.write('</body></html>');
  w.document.close();
}
