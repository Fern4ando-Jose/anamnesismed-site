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
// MOTOR ÚNICO DE NARRATIVA CLÍNICA DA AEA
function gerarNarrativaAEA_generica(ans, lng, mObj){
  var pt = (lng !== 'es');
  var resp = ans.filter(function(a){ return a.resp && a.resp !== '—' && String(a.resp).trim()!==''; });
  if(!resp.length) return '';

  var nomeMotivo = mObj ? (pt ? (mObj.name||'') : (mObj.nameEs||mObj.name||'')) : '';
  nomeMotivo = nomeMotivo.replace(/\s*\/\s*Abd[oô]men Agudo/i,'').replace(/\s*\/\s*.*$/,'').trim();

  var idEl=document.getElementById('dp-idade'), sxEl=document.getElementById('dp-sexo');
  var idade = idEl ? (idEl.value||'').trim() : '';
  var sexoRaw = sxEl ? (sxEl.value||'') : '';
  var sexoTxt = sexoRaw==='M' ? (pt?'sexo masculino':'sexo masculino')
              : sexoRaw==='F' ? (pt?'sexo feminino':'sexo femenino') : '';

  // ── util ────────────────────────────────────────────────
  function low(s){ return (s==null?'':String(s)).toLowerCase(); }
  function cleanLbl(q){
    var s=(q||'').replace(/\([^)]*\)/g,' ');   // remove (...)
    s=s.replace(/[?¿].*$/,'');                    // corta na 1a interrogação (descarta orações extras)
    s=s.replace(/\s*[—–-]\s+.*$/,'');           // remove " — explicação"
    return s.replace(/\s+/g,' ').trim();
  }
  function cleanVal(v){ return (v||'').replace(/\s*\([^)]*\)\s*$/,'').trim(); }
  function isPlaceholder(v){ return /^(descreva|relate|liste|ex:|nº|dum|medicamento,|°c$|0 a 10$|n[ºo]\/dia)/i.test(low(v).trim()); }
  function join(arr, and){ arr=arr.filter(Boolean); if(!arr.length) return ''; if(arr.length===1) return arr[0]; var last=arr.pop(); return arr.join(', ')+and+last; }
  function yes(v){ return /^(sim|sí|si)\b/i.test(low(v)); }
  function cap(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }

  // ── classificador de papel semântico ────────────────────
  function role(a){
    var q=low(a.qText);
    if(/motivou buscar|motiv[óo] buscar|o que motivou|motiv(o|ó) (a|de) (consulta|busca)/.test(q)) return 'MOTIVO';
    if(/alarme|alarma|red\s*flag/.test(q)) return 'ALARME';
    if(/migrou|migraci[óo]n|migra[çc][ãa]o/.test(q)) return 'MIGR';
    if(/evolu[çc]|progress|piorando.*est[áa]vel|padr[ãa]o de evolu/.test(q)) return 'EVOL';
    if(a.type!=='yn' && /uso de medicament|medicamentos? (em uso|em uso|que|potencialmente)|quais medicament|qual medicament|medicament[oa]s? hepatot|medicamentos? constipant|medicament/.test(q)) return 'MED';
    if(/antecedent|fatores de risco|hist[óo]ria de|epis[óo]dios? (semelhant|pr[ée]vi|anterior)|tabagismo|etilismo|cardiopatia ou pneumopatia|antecedente de hepatopatia|carga tab[áa]gica/.test(q)) return 'ANTEC';
    if(/localiza/.test(q)) return 'LOC';
    if(/irradia/.test(q)) return 'IRR';
    if(/intensidade|\beva\b|escala m?mrc|grau de dispneia|escala (visual|de borg)/.test(q)) return 'INT';
    if(/h[áa] quant|desde quando|tempo decorrido|h[áa] quanto tempo|tempo de evolu/.test(q)) return 'DURTOT';
    if(/dura[çc][ãa]o|duraci[óo]n/.test(q)) return 'DUREP';
    if(/^in[ií]cio|in[ií]cio e |in[ií]cio em rela|circunst[âa]ncia (em que )?ocorreu|mecanismo do trauma|in[ií]cio\?/.test(q)) return 'ONSET';
    if(/frequ[êe]ncia|periodicidade|n[úu]mero de|quantos epis[óo]dios|momento do dia|momento de predom|padr[ãa]o.*febr|curva febril|ritmo da dor|nict[úu]ria|frequencia/.test(q)) return 'FREQ';
    if(/rela[çc][ãa]o com|fatores que (pioram|melhoram)|fatores desencadeant|posi[çc][ãa]o que alivia|outros fatores|que (piora|alivia)|relaci[óo]n con/.test(q)) return 'FATOR';
    if(/car[áa]ter|car[áa]cter|tipo\b|tipo\/car|tipo de sensa|como descreveria|conte[úu]do do v[óo]mito|caracter[íi]sticas? d|caracteriza[çc][ãa]o|apresenta[çc][ãa]o|aspecto/.test(q)) return 'CAR';
    if(a.type==='yn') return 'ASSOC';
    return 'DESC';
  }

  // ── distribui em baldes ─────────────────────────────────
  var B={LOC:null,IRR:null,CAR:null,INT:null,DURTOT:null,DUREP:null,ONSET:null,FREQ:[],FATOR:[],MIGR:null,EVOL:null,MED:[],ANTEC:[],MOTIVO:null,DESC:[],assocSim:[],assocNao:[],alarmeSim:false,alarmeNao:false};
  resp.forEach(function(a){
    var r=role(a), v=cleanVal(a.resp);
    if(isPlaceholder(v) && a.type==='input') return; // ignora placeholder vazando em input
    // yn só pode ser MIGR/ALARME/ANTEC/MOTIVO; senão é sintoma (ASSOC) ou modulador (FATORYN)
    if(a.type==='yn' && r!=='MIGR' && r!=='ALARME' && r!=='ANTEC' && r!=='MOTIVO'){
      r = /^(alivia|piora|melhora|rela[çc][ãa]o com|relaci[óo]n con|alivio|empeora)/i.test(low(cleanLbl(a.qText))) ? 'FATORYN' : 'ASSOC';
    }
    switch(r){
      case 'LOC': if(!B.LOC)B.LOC=v; break;
      case 'IRR': if(!B.IRR)B.IRR=v; break;
      case 'CAR': if(!B.CAR)B.CAR=v; else B.DESC.push({l:cleanLbl(a.qText),v:v}); break;
      case 'INT': if(!B.INT)B.INT=v; break;
      case 'DURTOT': if(!B.DURTOT)B.DURTOT=v; break;
      case 'DUREP': if(!B.DUREP)B.DUREP=v; break;
      case 'ONSET': if(!B.ONSET)B.ONSET=v; break;
      case 'FREQ': B.FREQ.push(v); break;
      case 'FATOR': B.FATOR.push(low(v)); break;
      case 'MIGR': B.MIGR=v; break;
      case 'EVOL': if(!B.EVOL)B.EVOL=v; break;
      case 'MED': B.MED.push(v); break;
      case 'ANTEC':
        var albl=low(cleanLbl(a.qText)).replace(/^(antecedentes?|hist[óo]ria)\s+(de\s+|pessoa(l|is)\s+de\s+|familiar(es)?\s+de\s+)?/,'').trim();
        if(a.type==='yn'){ if(yes(v)) B.ANTEC.push(albl); }
        else B.ANTEC.push(albl+': '+v);
        break;
      case 'ALARME': if(yes(v)) B.alarmeSim=true; else B.alarmeNao=true; break;
      case 'MOTIVO': if(!isPlaceholder(v)) B.MOTIVO=v; break;
      case 'FATORYN':
        var fl=low(cleanLbl(a.qText));
        if(yes(v)) B.FATOR.push(fl);
        else if(/^(rela[çc][ãa]o com|relaci[óo]n con)/.test(fl)) B.FATOR.push((pt?'sem ':'sin ')+fl.replace(/^rela[çc][ãa]o com\s*|^relaci[óo]n con\s*/,(pt?'relação com ':'relación con ')));
        else B.FATOR.push((pt?'não ':'no ')+fl);
        break;
      case 'ASSOC':
        var sl=low(cleanLbl(a.qText)).replace(/\s+associad[oa]s?\b/g,'').replace(/^h[áa]\s+/,'').trim();
        if(yes(v)) B.assocSim.push(sl); else B.assocNao.push(sl);
        break;
      default: B.DESC.push({l:cleanLbl(a.qText),v:v});
    }
  });

  var P=[];
  // ── 1. ABERTURA: motivo + início ────────────────────────
  var ab='Paciente';
  if(idade && /^\d+$/.test(idade)){ ab+=' de '+idade+(pt?' anos':' años'); if(sexoTxt) ab+=', '+sexoTxt; }
  else if(sexoTxt){ ab+=', '+sexoTxt; }
  ab+=', ';
  var mtxt=low(nomeMotivo);
  ab+=(pt?'refere quadro de ':'refiere cuadro de ')+mtxt;
  var durTxt='';
  if(B.DURTOT){
    var dur=low(B.DURTOT);
    if(/^\d+$/.test(dur)) dur+=(pt?' dias':' días');
    if(/\d|dias?|d[íi]as?|semana|m[êe]s|mes|hora|ano|a[ñn]o|h[áa]\s|hace/.test(dur)) durTxt=(pt?' iniciado há ':' iniciado hace ')+dur;
    else durTxt=(pt?', de evolução ':', de evolución ')+dur;  // aguda/subaguda/crônica
  }
  ab+=durTxt;
  if(B.ONSET){
    var on=low(B.ONSET).replace(/^in[íi]cio\s+(e\s+(t[ée]rmino|dura[çc][ãa]o|migra[çc][ãa]o)\s+)?/,'').trim();
    if(on) ab+=(pt?', de início ':', de inicio ')+on;
  }
  ab+='.';
  P.push(ab);

  // ── 2. CARACTERIZAÇÃO ───────────────────────────────────
  var c=[];
  if(B.CAR) c.push((pt?'de caráter ':'de carácter ')+low(B.CAR));
  if(B.LOC) c.push((pt?'localizado em ':'localizado en ')+low(B.LOC));
  if(B.IRR){ var ir=low(B.IRR); c.push(/sem irradia|sin irradia/.test(ir)?(pt?'sem irradiação':'sin irradiación'):((pt?'com irradiação para ':'con irradiación hacia ')+ir.replace(/^para\s+/,''))); }
  if(B.INT){ var iv=B.INT.trim(); c.push((pt?'intensidade ':'intensidad ')+(/^\d+$/.test(iv)?iv+'/10':low(iv))); }
  if(B.DUREP) c.push((pt?'com duração de ':'con duración de ')+low(B.DUREP));
  if(B.FREQ.length) c.push((pt?'de padrão ':'de patrón ')+join(B.FREQ.map(low),pt?' e ':' y '));
  if(c.length) P.push((pt?'Caracteriza o quadro como ':'Caracteriza el cuadro como ')+join(c,pt?' e ':' y ')+'.');

  // ── 3. MIGRAÇÃO ─────────────────────────────────────────
  if(B.MIGR && !/^(n[ãa]o|no)\b/i.test(low(B.MIGR))){
    var mg=B.MIGR.replace(/^(sim|sí|si)\s*[—–-]?\s*/i,'');
    P.push((pt?'Refere início/migração da dor — ':'Refiere inicio/migración del dolor — ')+low(mg)+'.');
  }

  // ── 4. FATORES MODULADORES ──────────────────────────────
  if(B.FATOR.length){
    var fs=B.FATOR.filter(function(f){return !/sem rela|sin rela|nenhum|ningún/.test(f);});
    if(fs.length) P.push((pt?'Quanto aos fatores moduladores, relata: ':'En cuanto a los factores moduladores, refiere: ')+join(fs,pt?' e ':' y ')+'.');
  }

  // ── 5. EVOLUÇÃO ─────────────────────────────────────────
  if(B.EVOL) P.push((pt?'O quadro evoluiu de forma ':'El cuadro evolucionó de forma ')+low(B.EVOL).replace(/\s*\(.*\)$/,'')+'.');

  // ── 6. SINTOMAS ASSOCIADOS ──────────────────────────────
  if(B.assocSim.length) P.push((pt?'Associa ':'Asocia ')+join(B.assocSim.slice(0,8),pt?' e ':' y ')+(B.assocSim.length>8?(pt?', entre outros':', entre otros'):'')+'.');

  // ── 7. NEGATIVOS PERTINENTES ────────────────────────────
  if(B.assocNao.length) P.push((pt?'Nega ':'Niega ')+join(B.assocNao.slice(0,8),pt?' e ':' y ')+(B.assocNao.length>8?(pt?', bem como os demais sintomas pesquisados':', así como los demás síntomas investigados'):'')+'.');

  // ── 8. ANTECEDENTES / MEDICAÇÃO ─────────────────────────
  if(B.ANTEC.length) P.push((pt?'Apresenta antecedentes de ':'Presenta antecedentes de ')+join(B.ANTEC.slice(0,6),pt?' e ':' y ')+'.');
  if(B.MED.length){ var meds=B.MED.filter(function(m){return !isPlaceholder(m);}); if(meds.length) P.push((pt?'Em uso de ':'En uso de ')+join(meds,pt?' e ':' y ')+'.'); }

  // ── 9. OUTROS DESCRITIVOS (limpos, sem fragmentos) ──────
  if(B.DESC.length){
    var ds=B.DESC.filter(function(d){return d.v && !isPlaceholder(d.v);})
                 .map(function(d){return low(d.l)+': '+low(d.v);});
    if(ds.length) P.push(cap((pt?'descreve ainda — ':'describe además — ')+ds.join('; '))+'.');
  }

  // ── 10. ALARME ──────────────────────────────────────────
  if(B.alarmeSim) P.push(pt?'⚠ Sinais de alarme presentes — avaliação prioritária indicada.':'⚠ Signos de alarma presentes — evaluación prioritaria indicada.');
  else if(B.alarmeNao) P.push(pt?'Nega sinais de alarme.':'Niega signos de alarma.');

  // ── 11. FECHO: motivo/momento da busca ──────────────────
  if(B.MOTIVO) P.push((pt?'Procurou atendimento por ':'Buscó atención por ')+low(B.MOTIVO).replace(/\.$/,'')+'.');

  return P.join(' ');
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
