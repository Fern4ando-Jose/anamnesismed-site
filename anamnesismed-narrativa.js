// anamnesismed-narrativa.js
// Geradores de narrativa clínica para a AEA (Anamnese Estruturada Automatizada)
// REGRA: adicionar novos geradores APENAS neste arquivo.
// Para adicionar um gerador específico:
//   1. Crie a função gerarNarrativaAEA_<motivo>(ans, lng)
//   2. Registre no objeto AEA_NARRATIVE_GEN abaixo
//   3. A função gerarNarrativaAEA() despacha automaticamente

// ── GERADOR DE NARRATIVA CLÍNICA DA AEA (substitui a listagem "pergunta: resposta") ──
function gerarNarrativaAEA_cefaleia(ans, lng){
  var pt = (lng!=='es');
  // Demographics
  var idadeEl = document.getElementById('dp-idade');
  var sexoEl  = document.getElementById('dp-sexo');
  var idadeVal = idadeEl ? (idadeEl.value||'').trim() : '';
  var sexoRaw  = sexoEl  ? (sexoEl.value ||'')        : '';
  var sexoTxt  = sexoRaw === 'M' ? (pt?'sexo masculino':'sexo masculino')
               : sexoRaw === 'F' ? (pt?'sexo feminino':'sexo femenino') : '';
  function v(i){ var a=ans[i]; return (a && a.resp && a.resp!=='—') ? a.resp : null; }
  var L=v(0), IRR=v(1), CAR=v(2), EVA=v(3), DUR=v(4), INI=v(5),
      FAT=v(6), PER=v(7), VALS=v(8), NAUS=v(9), FOTO=v(10),
      AURA=v(11), AUTO=v(12), SNOOP=v(13), HIST=v(14), TRAUMA=v(15),
      ANALG=v(16), MEDS=v(17),
      EVOL=v(18), MOTIVOBUSCA=v(19);
  var partes = [], alarmes = [];
  var yes = function(x){ return /^(Sim|Sí)/.test(x||''); };

  if(L||CAR||EVA||DUR){
    var f = 'Paciente';
    if(idadeVal && /^\d+$/.test(idadeVal)){
      f += (pt?' de ':' de ') + idadeVal + (pt?' anos':' años');
      if(sexoTxt) f += ', ' + sexoTxt;
      f += ', ';
    } else { f += ' '; }
    f += pt ? 'refere quadro de cefaleia' : 'refiere cuadro de cefalea';
    if(L) f += (pt?' de localização ':' de localización ') + L.toLowerCase();
    if(IRR && !/^(Sem|Sin) irradia/.test(IRR)) f += (pt?', com irradiação ':', con irradiación ') + IRR.toLowerCase();
    if(CAR) f += (pt?', de caráter ':', de carácter ') + CAR.toLowerCase();
    if(EVA) f += (pt?', de intensidade ':', de intensidad ') + EVA + '/10 ' + (pt?'na escala visual analógica (EVA)':'en la escala visual analógica (EVA)');
    f += '.';
    if(DUR) f += ' ' + (pt?'Cada episódio tem duração aproximada de ':'Cada episodio tiene una duración aproximada de ') + DUR.toLowerCase() + '.';
    partes.push(f);
  }

  if(INI){
    if(/[Ss]úbito\/explosivo|[Tt]hunderclap/.test(INI)){
      partes.push(pt
        ? 'O início da dor foi súbito e explosivo (padrão thunderclap), com pico de intensidade em menos de um minuto.'
        : 'El inicio del dolor fue súbito y explosivo (patrón thunderclap), con pico de intensidad en menos de un minuto.');
      alarmes.push(pt ? 'início explosivo em "trovoada" (thunderclap)' : 'inicio explosivo "en trueno" (thunderclap)');
    } else {
      partes.push((pt?'O início da dor foi de caráter ':'El inicio del dolor fue de carácter ') + INI.toLowerCase().replace(/\s*\(.*?\)/,'') + '.');
    }
  }

  if(FAT && !/[Ss]em fator|[Ss]in factor/.test(FAT)){
    partes.push((pt?'Como fatores desencadeantes ou de alívio, identifica: ':'Como factores desencadenantes o de alivio, identifica: ') + FAT.toLowerCase() + '.');
  }
  if(PER){
    partes.push((pt?'Quanto à periodicidade, o quadro se apresenta de forma ':'En cuanto a la periodicidad, el cuadro se presenta de forma ') + PER.toLowerCase() + '.');
  }

  if(VALS){
    if(yes(VALS)){
      partes.push(pt
        ? 'Chama atenção o relato de piora da cefaleia com manobra de Valsalva, tosse ou esforço físico — achado sugestivo de hipertensão intracraniana, que indica investigação complementar.'
        : 'Llama la atención el relato de empeoramiento de la cefalea con la maniobra de Valsalva, la tos o el esfuerzo físico — hallazgo sugestivo de hipertensión intracraneal, que amerita investigación complementaria.');
      alarmes.push(pt ? 'piora da dor com Valsalva/esforço físico' : 'empeoramiento del dolor con Valsalva/esfuerzo físico');
    } else {
      partes.push(pt ? 'Nega piora da dor com manobra de Valsalva, tosse ou esforço físico.' : 'Niega empeoramiento del dolor con la maniobra de Valsalva, la tos o el esfuerzo físico.');
    }
  }

  var assoc = [];
  if(NAUS) assoc.push(yes(NAUS) ? (pt?'náuseas e/ou vômitos':'náuseas y/o vómitos') : (pt?'nega náuseas ou vômitos':'niega náuseas o vómitos'));
  if(FOTO) assoc.push(yes(FOTO) ? (pt?'fotofobia e/ou fonofobia':'fotofobia y/o fonofobia') : (pt?'nega fotofobia ou fonofobia':'niega fotofobia o fonofobia'));
  if(AURA) assoc.push(yes(AURA) ? (pt?'episódios de aura visual ou sensitiva precedendo a dor (escotomas, zigue-zague, formigamento)':'episodios de aura visual o sensitiva que preceden el dolor (escotomas, zigzag, hormigueo)') : (pt?'nega aura precedendo a dor':'niega aura que preceda el dolor'));
  if(AUTO) assoc.push(yes(AUTO) ? (pt?'sinais autonômicos ipsilaterais (lacrimejamento, congestão nasal ou ptose do mesmo lado da dor)':'signos autonómicos ipsilaterales (lagrimeo, congestión nasal o ptosis del mismo lado del dolor)') : (pt?'nega sinais autonômicos associados':'niega signos autonómicos asociados'));
  if(assoc.length){
    partes.push((pt?'Associadamente, ':'De forma asociada, ') + assoc.join('; ') + '.');
  }

  if(SNOOP){
    if(yes(SNOOP)){
      partes.push(pt
        ? 'Refere ainda a presença de outros sinais de alarme (critérios SNOOP — pior cefaleia da vida, início súbito, febre, rigidez de nuca, déficit neurológico focal, alteração do nível de consciência, primeira crise após os 50 anos, gestação/puerpério ou mudança no padrão habitual da dor), o que reforça a indicação de investigação complementar urgente.'
        : 'Refiere además la presencia de otros signos de alarma (criterios SNOOP — peor cefalea de la vida, inicio súbito, fiebre, rigidez de nuca, déficit neurológico focal, alteración del nivel de conciencia, primera crisis después de los 50 años, embarazo/puerperio o cambio en el patrón habitual del dolor), lo que refuerza la indicación de investigación complementaria urgente.');
      alarmes.push(pt ? 'critérios de alarme SNOOP positivos' : 'criterios de alarma SNOOP positivos');
    } else {
      partes.push(pt ? 'Nega outros sinais de alarme associados (critérios SNOOP).' : 'Niega otros signos de alarma asociados (criterios SNOOP).');
    }
  }

  if(HIST){
    partes.push(yes(HIST)
      ? (pt? 'Relata antecedentes pessoais e/ou familiares de enxaqueca/cefaleias recorrentes.' : 'Relata antecedentes personales y/o familiares de migraña/cefaleas recurrentes.')
      : (pt? 'Nega antecedentes pessoais ou familiares de enxaqueca.' : 'Niega antecedentes personales o familiares de migraña.'));
  }

  if(TRAUMA){
    if(yes(TRAUMA)){
      partes.push(pt
        ? 'Importante destacar o relato de traumatismo craniano recente — sinal de alarme que impõe a exclusão de complicações pós-traumáticas (ex.: hematoma subdural ou extradural).'
        : 'Es importante destacar el relato de traumatismo craneal reciente — signo de alarma que impone la exclusión de complicaciones postraumáticas (p. ej., hematoma subdural o extradural).');
      alarmes.push(pt ? 'traumatismo craniano recente' : 'traumatismo craneal reciente');
    } else {
      partes.push(pt ? 'Nega traumatismo craniano recente.' : 'Niega traumatismo craneal reciente.');
    }
  }

  if(ANALG || MEDS){
    var fr2 = pt ? 'Quanto ao uso de analgésicos, ' : 'En cuanto al uso de analgésicos, ';
    if(ANALG) fr2 += ANALG.toLowerCase() + (MEDS ? '; ' : '.');
    if(MEDS) fr2 += (pt? 'faz uso de '+MEDS+' para alívio do quadro.' : 'utiliza '+MEDS+' para el alivio del cuadro.');
    partes.push(fr2);
  }

  // ── Evolução e motivo de busca ──────────────────────────────
  if(EVOL){
    partes.push((pt?'Evoluiu de forma ':'Evolucionó de forma ')+EVOL.toLowerCase()+'.');
  }
  if(MOTIVOBUSCA && MOTIVOBUSCA!=='—'){
    partes.push((pt?'Buscou atendimento médico ':'Buscó atención médica ')+MOTIVOBUSCA.toLowerCase().replace(/\.$/,'')+'.');
  }

  var texto = partes.join(' ');
  if(alarmes.length){
    texto += '\n\n' + (pt
      ? '⚠ Sinais de alarme (red flags) identificados nesta anamnese: ' + alarmes.join('; ') + '. Recomenda-se atenção redobrada e investigação complementar direcionada para descartar causas secundárias de cefaleia.'
      : '⚠ Señales de alarma (red flags) identificadas en esta anamnesis: ' + alarmes.join('; ') + '. Se recomienda atención redoblada e investigación complementaria dirigida para descartar causas secundarias de cefalea.');
  }
  return texto;
}

// Motor narrativo cronológico universal — gera prosa clínica para QUALQUER motivo automaticamente
function gerarNarrativaAEA_generica(ans, lng, mObj){
  var pt = (lng !== 'es');
  var respondidas = ans.filter(function(a){ return a.resp && a.resp !== '—'; });
  if(!respondidas.length) return '';

  var nomeMotivo = mObj ? (pt ? (mObj.name||'') : (mObj.nameEs||mObj.name||'')) : '';

  var idadeEl = document.getElementById('dp-idade');
  var sexoEl  = document.getElementById('dp-sexo');
  var idadeVal = idadeEl ? (idadeEl.value||'').trim() : '';
  var sexoRaw  = sexoEl  ? (sexoEl.value ||'')        : '';
  var sexoTxt  = sexoRaw === 'M' ? 'sexo masculino'
               : sexoRaw === 'F' ? (pt?'sexo feminino':'sexo femenino') : '';

  // ── Detectores de pergunta por conteúdo ──────────────────────
  // duração: "quantos dias", "cuántos días", "hace cuánto", "há quanto"
  function isDuracaoQ(a){ return /quantos\s+dias|cuántos|h[aá]\s+quanto|hace\s+cuánto/i.test(a.qText||''); }
  // tipo de início: qText é exatamente "Início" ou "Inicio"
  function isOnsetQ(a){   return /^in[ií]cio$/i.test((a.qText||'').trim()); }
  function isEvolucaoQ(a){ return /evolução.*quadro|evolución.*cuadro/i.test(a.qText||''); }
  function isMotivoQ(a){   return /motivou buscar|motivó buscar/i.test(a.qText||''); }
  function isAlarmQ(a){    return /alarme|alarma|red\s*flag/i.test(a.qText||''); }

  // ── Separar respostas em buckets ──────────────────────────────
  var duracaoAns=null, onsetAns=null, evolucaoAns=null, motivoAns=null, restAns=[];
  respondidas.forEach(function(a){
    if(!evolucaoAns && isEvolucaoQ(a))  { evolucaoAns=a; return; }
    if(!motivoAns   && isMotivoQ(a))    { motivoAns=a;   return; }
    if(!duracaoAns  && isDuracaoQ(a))   { duracaoAns=a;  return; }
    if(!onsetAns    && isOnsetQ(a))     { onsetAns=a;    return; }
    restAns.push(a);
  });

  var descr=[], sim=[], nao=[], alarme_sim=false, alarme_nao=false;
  restAns.forEach(function(a){
    if(isAlarmQ(a)){
      if(/^(Sim|Sí)/.test(a.resp)) alarme_sim=true; else alarme_nao=true;
    } else if(a.type==='yn'){
      if(/^(Sim|Sí)/.test(a.resp)) sim.push(a); else nao.push(a);
    } else {
      descr.push(a);
    }
  });

  function cleanQ(a){
    return (a.qText||'').replace(/[?¿]/g,'').replace(/\s*\([^)]*\)/g,'').trim().toLowerCase();
  }
  function shortLabel(a){
    var q = cleanQ(a);
    // Cortar na primeira barra ("/") para rótulos compostos
    var slash = q.indexOf('/');
    if(slash > 4 && slash < 30) q = q.substring(0, slash).trim();
    return q.length > 40 ? q.substring(0,40) : q;
  }
  function joinList(arr, andWord){
    var cp = arr.slice();
    var last = cp.length > 1 ? cp.pop() : null;
    return last ? cp.join(', ') + andWord + last : cp[0] || '';
  }
  // Adiciona unidade temporal quando o valor é um número puro
  function addUnit(val){
    return /^\d+$/.test(val.trim()) ? val.trim() + (pt?' dias':' días') : val;
  }

  var partes = [];

  // ── Abertura cronológica ──────────────────────────────────────
  var abertura = 'Paciente';
  if(idadeVal && /^\d+$/.test(idadeVal)){
    abertura += ' de ' + idadeVal + (pt?' anos':' años');
    if(sexoTxt) abertura += ', ' + sexoTxt;
    abertura += ', ';
  } else { abertura += ' '; }

  if(duracaoAns){
    // "refere que há X dias iniciou com [motivo], de início súbito/gradual"
    var dur = addUnit(duracaoAns.resp).toLowerCase();
    abertura += (pt?'refere que há ':'refiere que hace ') + dur
             + (pt?' iniciou com ':' inició con ') + nomeMotivo.toLowerCase();
    if(onsetAns) abertura += (pt?', de início ':', de inicio ') + onsetAns.resp.toLowerCase();
  } else if(onsetAns){
    // sem duração mas tem tipo de início
    abertura += (pt?'refere ':'refiere ') + nomeMotivo.toLowerCase()
             + (pt?' de início ':' de inicio ') + onsetAns.resp.toLowerCase();
  } else {
    abertura += (pt?'refere ':'refiere ') + nomeMotivo.toLowerCase();
  }
  abertura += '.';
  partes.push(abertura);

  // ── Descritivos com rótulo (radio e input não-cronológicos) ───
  descr.forEach(function(a){
    var val = a.resp; if(!val || val==='—') return;
    var lbl = shortLabel(a);
    if(a.type === 'multi'){
      var items = val.split(',').map(function(s){ return s.trim().toLowerCase(); }).filter(Boolean);
      if(items.length) partes.push(lbl + ': ' + joinList(items, pt?' e ':' y ') + '.');
    } else {
      partes.push(lbl + ': ' + val + '.');
    }
  });

  // ── Evolução ─────────────────────────────────────────────────
  if(evolucaoAns){
    partes.push((pt?'Evoluiu de forma ':'Evolucionó de forma ')
              + evolucaoAns.resp.toLowerCase() + '.');
  }

  // ── Sintomas associados (máx 5) ───────────────────────────────
  if(sim.length){
    var simLbls = sim.slice(0,5).map(cleanQ).filter(Boolean);
    partes.push((pt?'Associa ':'Asocia ')
              + joinList(simLbls, pt?' e ':' y ')
              + (sim.length > 5 ? (pt?' (e outros).':' (y otros).') : '.'));
  }

  // ── Nega — somente sinais de alarme ou lista curta (≤ 3) ─────
  if(alarme_sim){
    partes.push(pt?'⚠ Sinais de alarme presentes — avaliação prioritária indicada.'
                  :'⚠ Signos de alarma presentes — evaluación prioritaria indicada.');
  } else if(alarme_nao){
    partes.push(pt?'Nega sinais de alarme.':'Niega signos de alarma.');
  } else if(nao.length && nao.length <= 3){
    partes.push((pt?'Nega ':'Niega ')
              + joinList(nao.map(cleanQ).filter(Boolean), pt?' e ':' y ') + '.');
  }

  // ── Motivo de busca ───────────────────────────────────────────
  if(motivoAns && motivoAns.resp && motivoAns.resp !== '—'){
    partes.push((pt?'Buscou atendimento médico ':'Buscó atención médica ')
              + motivoAns.resp.toLowerCase().replace(/\.$/, '') + '.');
  }

  return partes.join(' ');
}

function gerarNarrativaAEA_tosse(ans, lng){
  // Índices (24 perguntas, iguais para tosse e semio-tosse):
  // 0=Início, 1=Tipo, 2=Expectoração, 3=Caráter escarro, 4=Hemoptise
  // 5=Momento, 6=Desencadeantes(multi), 7=Outros desencad.(input)
  // 8=Alívio(multi), 9=Outros alívio(input), 10=Febre, 11=Dispneia
  // 12=Sibilância, 13=Dor torácica, 14=Coriza, 15=Pirose
  // 16=Tabagismo, 17=IECA, 18=Antec.resp(multi), 19=Exposição(multi)
  // 20=Perda peso, 21=Sudorese noturna, 22=Vacinal, 23=Contato TB
  var pt = (lng !== 'es');
  // Demographics
  var idadeEl = document.getElementById('dp-idade');
  var sexoEl  = document.getElementById('dp-sexo');
  var idadeVal = idadeEl ? (idadeEl.value||'').trim() : '';
  var sexoRaw  = sexoEl  ? (sexoEl.value ||'')        : '';
  var sexoTxt  = sexoRaw === 'M' ? (pt?'sexo masculino':'sexo masculino')
               : sexoRaw === 'F' ? (pt?'sexo feminino':'sexo femenino') : '';
  function v(i){ var a=ans[i]; return (a && a.resp && a.resp!=='—') ? a.resp : null; }
  var yes = function(x){ return /^(Sim|Sí)/.test(x||''); };

  var INI=v(0), TIPO=v(1), EXPEC=v(2), CARAC=v(3), HEMOPT=v(4),
      MOM=v(5), DESENC=v(6), DESENC2=v(7), ALIVIO=v(8), ALIVIO2=v(9),
      FEBRE=v(10), DISPN=v(11), SIBIL=v(12), DORT=v(13),
      CORIZA=v(14), PIROSE=v(15), TABACO=v(16), IECA=v(17),
      ANTEC_RESP=v(18), EXPOS=v(19),
      PESO=v(20), SUDOR=v(21), VACIN=v(22), TB=v(23),
      EVOL=v(24), MOTIVOBUSCA=v(25);

  var partes=[], alarmes=[];

  // ── Frase de abertura cronológica: início + tipo + expectoração + momento ──
  var p1 = 'Paciente';
  if(idadeVal && /^\d+$/.test(idadeVal)){
    p1 += (pt?' de ':' de ') + idadeVal + (pt?' anos':' años');
    if(sexoTxt) p1 += ', ' + sexoTxt;
    p1 += ', ';
  } else { p1 += ' '; }
  p1 += pt ? 'refere quadro de tosse' : 'refiere cuadro de tos';
  if(INI){
    if(/Aguda/.test(INI))    p1 += pt?' aguda (menos de 3 semanas de evolução)'  :' aguda (menos de tres semanas de evolución)';
    else if(/Subaguda/.test(INI)) p1 += pt?' subaguda (3 a 8 semanas de evolução)':' subaguda (entre tres y ocho semanas de evolución)';
    else if(/Crônica|Crónica/.test(INI)){
      p1 += pt?' crônica (mais de 8 semanas de evolução)':' crónica (más de ocho semanas de evolución)';
      alarmes.push(pt?'tosse crônica (> 8 semanas)':'tos crónica (> 8 semanas)');
    }
  }
  if(TIPO){
    if(/Seca/.test(TIPO))          p1 += pt?', seca (não produtiva)':', seca (no productiva)';
    else if(/Produtiva|Productiva/.test(TIPO)) p1 += pt?', produtiva':', productiva';
    else if(/Metálica|Metálica/.test(TIPO))    p1 += pt?', metálica/rouca':', metálica/ronca';
  }
  if(EXPEC && yes(EXPEC) && CARAC){
    var dc = /Mucopurulento/.test(CARAC) ? (pt?'mucopurulenta (amarelada — sugestivo de infecção)':'mucopurulenta (amarillenta — sugestivo de infección)')
           : /Purulento/.test(CARAC)     ? (pt?'purulenta (esverdeada/fétida)':'purulenta (verdosa/fétida)')
           : /Hemoptoico/.test(CARAC)    ? (pt?'hemoptoica (com sangue)':'hemoptoica (con sangre)')
           : /Seroso/.test(CARAC)        ? (pt?'serosa/espumosa':'serosa/espumosa')
           :                               (pt?'mucoide':'mucoide');
    p1 += pt?', com expectoração '+dc:', con expectoración '+dc;
  }
  if(MOM){
    if(/Constante/.test(MOM))       p1 += pt?', de caráter constante':', de carácter constante';
    else if(/Noturna|Nocturna/.test(MOM))  p1 += pt?', de predomínio noturno':', predominantemente nocturna';
    else if(/Matutina/.test(MOM))   p1 += pt?', de predomínio matutino':', predominantemente matutina';
    else if(/Pós-prandial|Posprandial/.test(MOM)) p1 += pt?', com piora pós-prandial ou ao deitar':', con empeoramiento posprandial o al acostarse';
  }
  p1 += '.';
  partes.push(p1);

  // ── Hemoptise ──
  if(HEMOPT && yes(HEMOPT)){
    partes.push(pt?'Refere hemoptise associada.':'Refiere hemoptisis asociada.');
    alarmes.push(pt?'hemoptise':'hemoptisis');
  }

  // ── Fatores desencadeantes ──
  var desencArr = [];
  if(DESENC && DESENC!=='—') desencArr.push(DESENC.toLowerCase());
  if(DESENC2 && DESENC2!=='—') desencArr.push(DESENC2.toLowerCase());
  if(desencArr.length){
    partes.push((pt?'A tosse é desencadeada ou agravada por: ':'La tos es desencadenada o agravada por: ')+desencArr.join('; ')+'.');
  }

  // ── Fatores de alívio ──
  var alivArr = [];
  if(ALIVIO && ALIVIO!=='—' && !/Nenhum|Ningún/.test(ALIVIO)) alivArr.push(ALIVIO.toLowerCase());
  if(ALIVIO2 && ALIVIO2!=='—') alivArr.push(ALIVIO2.toLowerCase());
  if(alivArr.length){
    partes.push((pt?'Apresenta alívio com: ':'Presenta alivio con: ')+alivArr.join('; ')+'.');
  }

  // ── Sintomas associados positivos ──
  var assoc=[];
  if(FEBRE  && yes(FEBRE))  { assoc.push(pt?'febre':'fiebre'); alarmes.push(pt?'febre persistente':'fiebre persistente'); }
  if(DISPN  && yes(DISPN))  { assoc.push(pt?'dispneia':'disnea'); alarmes.push(pt?'dispneia associada':'disnea asociada'); }
  if(SIBIL  && yes(SIBIL))  assoc.push(pt?'sibilância':'sibilancias');
  if(DORT   && yes(DORT))   assoc.push(pt?'dor torácica':'dolor torácico');
  if(CORIZA && yes(CORIZA)) assoc.push(pt?'coriza e gotejamento pós-nasal':'rinorrea y goteo posnasal');
  if(PIROSE && yes(PIROSE)) assoc.push(pt?'pirose ou regurgitação':'pirosis o regurgitación');
  if(assoc.length){
    partes.push((pt?'Associa-se a ':'Se acompaña de ')+assoc.join(', ')+'.');
  }

  // ── Perda de peso / sudorese noturna ──
  if(PESO && yes(PESO)){
    partes.push(pt?'Refere perda de peso não intencional.':'Refiere pérdida de peso no intencional.');
    alarmes.push(pt?'perda de peso não intencional':'pérdida de peso no intencional');
  }
  if(SUDOR && yes(SUDOR)){
    partes.push(pt?'Relata sudorese noturna.':'Relata sudoración nocturna.');
    alarmes.push(pt?'sudorese noturna':'sudoración nocturna');
  }

  // ── Tabagismo ──
  if(TABACO && TABACO!=='—'){
    partes.push((pt?'Tabagismo: ':'Tabaquismo: ')+TABACO.toLowerCase()+'.');
    alarmes.push(pt?'tabagismo (fator de risco)':'tabaquismo (factor de riesgo)');
  }

  // ── IECA ──
  if(IECA && yes(IECA)){
    partes.push(pt
      ?'Faz uso de IECA — causa frequente de tosse seca persistente.'
      :'Refiere uso de IECA — causa frecuente de tos seca persistente.');
  }

  // ── Antecedentes respiratórios ──
  if(ANTEC_RESP && ANTEC_RESP!=='—' && !/Nenhum|Sin antecedente/.test(ANTEC_RESP)){
    partes.push((pt?'Antecedentes respiratórios: ':'Antecedentes respiratorios: ')+ANTEC_RESP.toLowerCase()+'.');
  }

  // ── Exposição ──
  if(EXPOS && EXPOS!=='—' && !/Sem exposição|Sin exposición/.test(EXPOS)){
    partes.push((pt?'Exposição relevante: ':'Exposición relevante: ')+EXPOS.toLowerCase()+'.');
  }

  // ── Contato TB ──
  if(TB && yes(TB)){
    partes.push(pt?'Refere contato com pessoa doente ou caso suspeito de tuberculose.':'Refiere contacto con persona enferma o caso sospechoso de tuberculosis.');
    alarmes.push(pt?'contato com caso suspeito de TB':'contacto con caso sospechoso de TB');
  }

  // ── Vacinal ──
  if(VACIN && yes(VACIN)){
    partes.push(pt?'Situação vacinal referida.':'Esquema vacunal referido.');
  }

  // ── Evolução e motivo de busca ──────────────────────────────
  if(EVOL){
    partes.push((pt?'Evoluiu de forma ':'Evolucionó de forma ')+EVOL.toLowerCase()+'.');
  }
  if(MOTIVOBUSCA && MOTIVOBUSCA!=='—'){
    partes.push((pt?'Buscou atendimento médico ':'Buscó atención médica ')+MOTIVOBUSCA.toLowerCase().replace(/\.$/,'')+'.');
  }

  // ── Texto final + alarmes ──
  var texto = partes.join(' ');
  if(alarmes.length){
    texto += '\n\n'+(pt
      ?'⚠ Sinais de alarme identificados: '+alarmes.join('; ')+'. Recomenda-se investigação complementar prioritária (imagem torácica, broncoscopia se hemoptise volumosa, PPD/IGRA se suspeita de TB).'
      :'⚠ Signos de alarma identificados: '+alarmes.join('; ')+'. Se recomienda investigación complementaria prioritaria (imagen torácica, broncoscopia si hemoptisis abundante, PPD/IGRA si sospecha de TB).');
  }
  return texto;
}
var AEA_NARRATIVE_GEN = { 'cefaleia': gerarNarrativaAEA_cefaleia, 'tosse': gerarNarrativaAEA_tosse, 'semio-tosse': gerarNarrativaAEA_tosse };

function gerarNarrativaAEA(mObj, lng, idPfx){
  if(!mObj || !mObj.aeaGuide || !mObj.aeaGuide.length) return null;
  idPfx = idPfx || 'aea-g-';
  var ansArr = [];
  mObj.aeaGuide.forEach(function(q,i){
    var id = idPfx+i;
    var resp = '—';
    if(q.type==='radio') resp = selOne(id);
    else if(q.type==='multi') resp = selMulti(id);
    else if(q.type==='yn') resp = ynAns(id);
    else if(q.type==='input') resp = fieldVal(id) || '—';
    ansArr.push({qText:(lng==='es'?(q.qEs||q.q):q.q), type:q.type, resp:resp});
  });
  var hasAny = ansArr.some(function(a){ return a.resp && a.resp!=='—'; });
  if(!hasAny) return null;
  var gen = AEA_NARRATIVE_GEN[mObj.id];
  return gen ? gen(ansArr, lng) : gerarNarrativaAEA_generica(ansArr, lng, mObj);
}
