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
  // Índices alinhados ao aeaGuide enxuto da cefaleia (antecedentes de enxaqueca e "medicamentos que usa" migraram p/ APP).
  var L=v(0), IRR=v(1), CAR=v(2), EVA=v(3), DUR=v(4), INI=v(5),
      FAT=v(6), PER=v(7), VALS=v(8), NAUS=v(9), FOTO=v(10),
      AURA=v(11), AUTO=v(12), SNOOP=v(13), TRAUMA=v(14),
      ANALG=v(15),
      EVOL=v(16), MOTIVOBUSCA=v(17);
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

  if(ANALG){
    partes.push((pt ? 'Quanto ao uso de analgésicos, ' : 'En cuanto al uso de analgésicos, ') + ANALG.toLowerCase() + '.');
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
// MOTOR ÚNICO DE NARRATIVA CLÍNICA DA AEA
function gerarNarrativaAEA_generica(ans, lng, mObj, opts){
  opts = opts || {};
  var cont = !!opts.continuation;
  var pt = (lng !== 'es');
  // Gênero do substantivo-guia: "dor" é feminino em PT (→ localizada/irradiada);
  // "dolor" (ES) e "quadro/cuadro" são masculinos (→ localizado/irradiado).
  var isPain = !!(mObj && mObj.isPain);
  var fem = pt && isPain;
  function gA(base){ return base + (fem ? 'a' : 'o'); } // gA('localizad') → localizada/localizado
  var resp = ans.filter(function(a){ return a.resp && a.resp !== '—' && String(a.resp).trim()!==''; });
  if(!resp.length) return '';

  var nomeMotivo = mObj ? (pt ? (mObj.name||'') : (mObj.nameEs||mObj.name||'')) : '';
  nomeMotivo = nomeMotivo.replace(/\s*\/\s*Abd[oô]men Agudo/i,'').replace(/\s*\/\s*.*$/,'').trim();
  var mtxt = nomeMotivo.toLowerCase();

  function gE(id){ var e=document.getElementById(id); return e?(e.value||'').trim():''; }
  var idade=gE('dp-idade'), sexoRaw=gE('dp-sexo'), tempoN=gE('mc-tempo-n'), tempoU=gE('mc-tempo-u');

  // Minúsculas preservando acrônimos médicos (FID, HCD, ACO, MSE, AINEs, IECA, EVA, DPOC…):
  // tokens em MAIÚSCULAS de 2+ letras (com 's' final opcional) voltam à forma original após o lowercase.
  function low(s){
    s = (s==null?'':String(s));
    var acr = s.match(/\b[A-ZÀ-ÖØ-Þ]{2,}s?\b/g);
    var out = s.toLowerCase();
    if(acr){ acr.forEach(function(a){
      out = out.replace(new RegExp('\\b'+a.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','g'), a);
    }); }
    return out;
  }
  function cleanLbl(q){
    var s=(q||'').replace(/\([^)]*\)/g,' ');
    s=s.replace(/^[¿¡\s]+/,'');            // remove ¿/¡ iniciais (espanhol)
    s=s.replace(/[?¿¡].*$/,'');             // corta na 1ª interrogação
    s=s.replace(/\s*[—–-]\s+.*$/,'');       // remove " — explicação"
    return s.replace(/\s+/g,' ').replace(/\s+([,;:.])/g,'$1').trim();   // normaliza espaço antes de pontuação
  }
  function cleanVal(v){ return (v||'').replace(/\s*\([^)]*\)\s*$/,'').trim(); }
  function isPlaceholder(v){ return /^(descreva|describa|relate|liste|ex\.?:|ej\.?:|n[ºo]\/dia|nº|dum\b|fum\b|medicamento,|°c$|0 a 10$|quanto|cu[áa]nt|anos?-ma|a[ñn]os?-paq|%|qual$)/i.test(low(v).trim()); }
  function join(arr, and){ arr=arr.filter(Boolean); if(!arr.length) return ''; if(arr.length===1) return arr[0]; var cp=arr.slice(); var last=cp.pop(); return cp.join(', ')+and+last; }
  function yes(v){ return /^(sim|sí|si)\b/i.test(low(v)); }
  // Resposta que NEGA (campo livre ou opção): "não irradia", "nenhuma", "ausente",
  // "sem irradiação", "nega", "-". Serve para não escrever a resposta negativa como
  // se fosse um achado ("irradiada para não irradia").
  function negativo(v){
    var s=low(v||'').trim().replace(/[.!]+$/,'');
    return !s || /^(n[ãa]o|no|nenhum|nenhuma|ning[úu]n|ninguna|ausente|nega|niega|sem\b|sin\b|nao\b|-|–|n\/a|na)\b/.test(s)
             || /(sem|sin) irradia/.test(s);
  }
  // Radio com duas leituras separadas por barra ("Insidioso / gradual") — no texto
  // corrido só a primeira serve; "de início insidioso / gradual" não é português médico.
  function semBarra(v){ return String(v||'').split(/\s*\/\s*/)[0].trim(); }
  function cap(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }

  function role(a){
    var q=low(a.qText);
    if(/motivou buscar|motiv[óo] buscar|o que motivou|motiv(o|ó) (a|de) (consulta|busca)/.test(q)) return 'MOTIVO';
    if(/alarme|alarma|red\s*flag/.test(q)) return 'ALARME';
    if(/analg[ée]sic|medida terap|tratamento (pr[ée]vio|realizado|j[áa] (feito|realizado))|resposta ao uso|medidas (pr[ée]vias|terap)/.test(q)) return 'MEDIDAS';
    if(/\bmigr/.test(q)) return 'MIGR';
    if(/evolu[çc]|progress|piorando.*est[áa]vel|padr[ãa]o de evolu/.test(q)) return 'EVOL';
    if(a.type!=='yn' && /uso de medicament|medicamentos? (em uso|que|potencialmente|constipant|hepatot)|quais medicament|qual medicament|medicament/.test(q)) return 'MED';
    if(/antecedent|fatores de risco|hist[óo]ria de|epis[óo]dios? (semelhant|pr[ée]vi|anterior)|tabagismo|etilismo|cardiopatia ou pneumopatia|antecedente de hepatopatia|carga tab[áa]gica/.test(q)) return 'ANTEC';
    if(/localiza/.test(q)) return 'LOC';
    if(/irradia/.test(q)) return 'IRR';
    if(/intensidade|\beva\b|escala m?mrc|grau de dispneia|escala (visual|de borg)/.test(q)) return 'INT';
    if(/h[áa] quant|desde quando|tempo decorrido|h[áa] quanto tempo|tempo de evolu/.test(q)) return 'DURTOT';
    if(/dura[çc][ãa]o|duraci[óo]n/.test(q)) return 'DUREP';
    if(/^in[ií]cio|in[ií]cio e |in[ií]cio em rela|circunst[âa]ncia (em que )?ocorreu|mecanismo do trauma/.test(q)) return 'ONSET';
    if(/frequ[êe]ncia|periodicidade|n[úu]mero de|quantos epis[óo]dios|momento do dia|momento de predom|padr[ãa]o.*febr|curva febril|ritmo da dor|nict[úu]ria/.test(q)) return 'FREQ';
    // "Fatores — iniciam, exacerbam ou acalmam (F)" (motivo dor) não casava em nenhum
    // padrão e caía em DESC: a narrativa saía "Refere ainda: fatores (repouso)" em vez
    // de "Como fatores moduladores, refere: repouso". Qualquer pergunta que COMECE por
    // "fatores"/"factores" é fator modulador — menos "fatores de risco", que é antecedente
    // e já foi capturado acima.
    if(/^fatores?\b|^factores?\b|rela[çc][ãa]o com|fatores que (pioram|melhoram)|fatores desencadeant|posi[çc][ãa]o que alivia|outros fatores|que (piora|alivia)|relaci[óo]n con/.test(q)) return 'FATOR';
    if(/car[áa]ter|car[áa]cter|tipo\b|tipo de sensa|como descreveria|conte[úu]do do v[óo]mito|caracter[íi]sticas? d|caracteriza[çc][ãa]o|apresenta[çc][ãa]o|aspecto/.test(q)) return 'CAR';
    if(a.type==='yn') return 'ASSOC';
    return 'DESC';
  }

  var B={LOC:null,IRR:null,CAR:null,INT:null,DURTOT:null,DUREP:null,ONSET:null,FREQ:[],FATOR:[],MIGR:null,EVOL:null,MED:[],ANTEC:[],fatRisco:[],MOTIVO:null,DESC:[],medidas:[],medidasNeg:false,assocSim:[],assocNao:[],alarmeSim:false,alarmeNao:false};
  resp.forEach(function(a){
    var r=role(a), v=cleanVal(a.resp);
    // Anti-vazamento de placeholder: descarta resposta de input que seja vazia,
    // o próprio texto-dica do campo (ph), ou um padrão de placeholder conhecido.
    if(a.type==='input'){
      var aph=cleanVal(a.ph||'');
      if(!v || isPlaceholder(v) || (aph && low(v)===low(aph))) return;
    }
    if(a.type==='yn' && r!=='MIGR' && r!=='ALARME' && r!=='ANTEC' && r!=='MOTIVO' && r!=='MEDIDAS'){
      r = /^(alivia|piora|melhora|rela[çc][ãa]o com|relaci[óo]n con|empeora|alivio)/i.test(low(cleanLbl(a.qText))) ? 'FATORYN' : 'ASSOC';
    }
    switch(r){
      case 'LOC': if(!B.LOC)B.LOC=v; break;
      case 'IRR': if(!B.IRR)B.IRR=v; break;
      case 'CAR': if(!B.CAR)B.CAR=v; else {var dl=cleanLbl(a.qText); if(dl)B.DESC.push({l:dl,v:v});} break;
      case 'INT': if(!B.INT)B.INT=v; break;
      case 'DURTOT': if(!B.DURTOT)B.DURTOT=v; break;
      case 'DUREP': if(!B.DUREP)B.DUREP=v; break;
      case 'ONSET': if(!B.ONSET)B.ONSET=v; break;
      case 'FREQ': B.FREQ.push(v); break;
      case 'FATOR': B.FATOR.push(low(v)); break;
      case 'FATORYN':
        var fl=low(cleanLbl(a.qText));
        if(!fl) break;
        if(yes(v)) B.FATOR.push(fl);
        else if(/^(rela[çc][ãa]o com|relaci[óo]n con)/.test(fl)) B.FATOR.push((pt?'sem ':'sin ')+fl);
        else B.FATOR.push((pt?'não ':'no ')+fl);
        break;
      case 'MIGR': B.MIGR=v; break;
      case 'EVOL': if(!B.EVOL)B.EVOL=v; break;
      case 'MED': if(!isPlaceholder(v)) B.MED.push(v); break;
      case 'MEDIDAS':
        if(/n[ãa]o (usou|fez|tomou)|no (us[óo]|tom[óo]|hizo)|nenhum|ning[úu]n|sem (uso|medica)/.test(low(v))) B.medidasNeg=true;
        else if(!isPlaceholder(v)) B.medidas.push(low(v));
        break;
      case 'ANTEC':
        var albl=low(cleanLbl(a.qText))
          .replace(/^(antecedentes?|hist[óo]ria|antecedentes? patol[óo]gicos?)\b\s*[:—–-]?\s*/,'')                 // "Antecedentes" / "História" / "Antecedentes:" iniciais
          .replace(/^(pessoa(l|is)|familiar(es)?)(\s+(e|ou)\s+(pessoa(l|is)|familiar(es)?))?\s+de\s+/,'')           // "pessoais ou familiares de"
          .replace(/^de\s+/,'')
          .trim();
        if(!albl) break;
        if(/^fatores? de (risco|riesgo)/.test(albl)){                                                              // "fatores de risco" → frase própria
          if(a.type!=='yn' || yes(v)){
            var fr=albl.replace(/^fatores? de (risco|riesgo)\s*[:—–-]?\s*/,'').trim();
            B.fatRisco.push(fr || albl);
          }
          break;
        }
        if(a.type==='yn'){ if(yes(v)) B.ANTEC.push(albl); } else B.ANTEC.push(albl+' ('+v+')');
        break;
      case 'ALARME': if(yes(v)) B.alarmeSim=true; else B.alarmeNao=true; break;
      case 'MOTIVO': if(!isPlaceholder(v)) B.MOTIVO=v; break;
      case 'ASSOC':
        var sl=low(cleanLbl(a.qText)).replace(/\s+associad[oa]s?\b/g,'').replace(/^h[áa]\s+/,'').trim();
        if(!sl) break;
        if(yes(v)) B.assocSim.push(sl); else B.assocNao.push(sl);
        break;
      default: var dl2=cleanLbl(a.qText); if(dl2 && v) B.DESC.push({l:dl2,v:v});
    }
  });

  // tempo de evolução: campo dedicado (só motivo principal) ou DURTOT
  function tempoEvol(){
    if(!cont && tempoN && /^\d+/.test(tempoN)) return (tempoN+' '+low(tempoU)).replace(/\s+/g,' ').trim();
    if(B.DURTOT){ var d=low(B.DURTOT); if(/^\d+$/.test(d)) d+=(pt?' dias':' días'); if(/\d|dias?|d[íi]as?|semana|m[êe]s|mes|hora|ano|a[ñn]o/.test(d)) return d; }
    return '';
  }
  var tEvol=tempoEvol();
  var sexoAdj = sexoRaw==='M'?'masculino':(sexoRaw==='F'?(pt?'feminino':'femenino'):'');

  var P=[];
  // ── 1. ABERTURA: paciente + motivo + localização + "há X" + início ──
  var ab='';
  var tEvolNoFim='';   // o tempo entra depois da localização ("dor em X há 3 anos")
  if(cont){
    ab=(pt?'Adicionalmente, refere quadro de ':'Asimismo, refiere cuadro de ')+mtxt;
    if(tEvol) ab+=(pt?', com '+tEvol+' de evolução':', de '+tEvol+' de evolución');
  } else {
    ab='Paciente';
    if(sexoAdj) ab+=' '+sexoAdj;
    if(idade && /^\d+$/.test(idade)) ab+=(pt?' de '+idade+' anos':' de '+idade+' años de edad');
    if(tEvol){
      // "apresentando quadro de 3 anos de evolução, caracterizado por dor…" é
      // linguagem de relatório. Numa HC de hospital se escreve o sintoma primeiro e
      // o tempo logo depois: "com dor em … há 3 anos".
      ab+=(pt?', com '+mtxt : ', con '+mtxt);
      tEvolNoFim = tEvol;
    } else {
      // Sem sexo/idade/tempo, "Paciente, apresentando quadro de dor" fica com uma
      // vírgula solta logo depois do sujeito. A vírgula só faz sentido quando há
      // aposto antes ("Paciente feminino, 62 anos, apresentando…").
      var temAposto = !!(sexoAdj || (idade && /^\d+$/.test(idade)));
      ab+=(pt ? (temAposto?', ':' ')+'com quadro de '+mtxt
              : (temAposto?', ':' ')+'con cuadro de '+mtxt);
    }
  }
  var locTxt='';
  if(B.MIGR && !/^(n[ãa]o|no)\b/i.test(low(B.MIGR))){
    var mg=low(B.MIGR).replace(/^(sim|sí|si)\s*[—–-]?\s*/i,'');
    if(/migrando/.test(mg)){
      var pr=mg.split(/migrando (?:para|hacia|pa\/)\s*/);
      locTxt+=(pt?', de início em ':', de inicio en ')+(pr[0]||'').replace(/[,;]\s*$/,'').trim()+(pt?', com posterior migração para ':', con posterior migración hacia ')+(pr[1]||'').trim();
    } else {
      locTxt+=(pt?', com migração da dor — ':', con migración del dolor — ')+mg;
    }
  } else if(B.LOC){
    // "dor, localizada em face anterior da perna" → "dor em face anterior da perna".
    // O particípio entre vírgulas é jargão de formulário; a HC de hospital emenda
    // a localização direto no sintoma.
    locTxt+=(pt?' em ':' en ')+low(B.LOC).replace(/^(em|en|na|no)\s+/,'');
  }
  // O tempo de evolução fecha a localização — "dor em face anterior da perna direita
  // há 3 anos" — em vez de abrir a frase como cabeçalho de relatório.
  if(tEvolNoFim) locTxt += (pt?' há ':' desde hace ')+tEvolNoFim;
  if(B.ONSET){
    var on=low(semBarra(B.ONSET)).replace(/^in[íi]cio\s+(e\s+(t[ée]rmino|dura[çc][ãa]o|migra[çc][ãa]o)\s+)?/,'').trim();
    if(on) locTxt+=(pt?', de início ':', de inicio ')+on;
  }
  ab+=locTxt+'.';
  P.push(ab);

  // ── 2. CARACTERIZAÇÃO + EVOLUÇÃO ──
  // Os atributos entram depois de "Descreve a dor COMO …", então o primeiro é o
  // adjetivo puro ("urente"), não "de caráter urente" — que só existia para colar
  // numa enumeração de formulário.
  var c=[];
  // Concordância: o formulário guarda o tipo no masculino ("Constritivo", "Surdo"),
  // mas em PT o substantivo-guia é "dor" (feminino) — saía "a dor como constritivo".
  // Adjetivo terminado em -o concorda; os invariáveis (urente, pulsátil, lancinante…)
  // passam intactos.
  function concorda(adj){
    return (pt && fem) ? adj.replace(/o\b/g, 'a') : adj;
  }
  if(B.CAR) c.push(concorda(low(B.CAR)));
  // Irradiação é campo LIVRE: o médico escreve "não irradia", "nenhuma", "ausente"…
  // A guarda só conhecia "sem irradiação", então saía a frase absurda
  // "irradiada para não irradia". Agora qualquer negativa some da narrativa —
  // e vira negativo pertinente, que é o que o texto médico espera.
  if(B.IRR){
    var ir=low(B.IRR);
    if(negativo(ir)) B.assocNao.unshift(pt?'irradiação':'irradiación');
    else c.push((pt?gA('irradiad')+' para ':'irradiado hacia ')+ir.replace(/^(para|hacia)\s+/,''));
  }
  if(B.INT){
    var iv=B.INT.trim();
    // A EVA vem como número (7) ou FAIXA (7-8, "4 a 6") — a faixa não casava no
    // número puro e o texto perdia o "/10 na EVA", saindo "de intensidade 7-8".
    var ivTxt=/^\d+\s*(?:[-–a]\s*\d+)?$/i.test(iv)
      ? iv.replace(/\s*a\s*/i,'-').replace(/\s+/g,'')+(pt?'/10 na EVA':'/10 en EVA')
      : low(iv).replace(/\s*[—–]\s*(.+)$/, ' ($1)');   // "grau 0 — só com exercício" → "grau 0 (só com exercício)"
    c.push((pt?'de intensidade ':'de intensidad ')+ivTxt);
  }
  // "Duração (D)" do motivo dor responde CONTÍNUA / DESCONTÍNUA — isto é continuidade,
  // não duração. O texto saía "com duração de cada episódio de descontínua". Quando a
  // resposta é uma dessas, a frase vira "de caráter contínuo/descontínuo (em crises)".
  if(B.DUREP){
    var du=low(B.DUREP);
    // Sem repetir "de caráter" quando o tipo da dor já usou a expressão: sai
    // "de caráter urente, descontínua (em crises)", como se escreve na prática.
    if(/^cont[íi]nua?\b|^continua\b/.test(du)){
      c.push(pt ? gA('contínu') : 'continuo');
    } else if(/^descont[íi]nua?\b|^discontinua\b|em crises|por crisis/.test(du)){
      c.push(pt ? gA('descontínu')+' (em crises)' : 'discontinuo (por crisis)');
    }
    else c.push((pt?'com duração de cada episódio de ':'con duración de cada episodio de ')+du);
  }
  if(B.FREQ.length) c.push((pt?'de padrão ':'de patrón ')+join(B.FREQ.map(low),pt?' e ':' y '));
  function normEvol(e){
    // remove parêntese final e um eventual "desde o início" embutido (o frame já adiciona um)
    e=low(e).replace(/\s*\(.*\)$/,'').replace(/\s+desde (o|el) in[íi]cio.*$/,'').trim();
    if(/pior|empeor|progres/.test(e)) return pt?'piora progressiva':'empeoramiento progresivo';
    if(/melhor|mejor|regres/.test(e)) return pt?'melhora gradual':'mejoría gradual';
    if(/est[áa]vel|estable/.test(e)) return pt?'curso estável':'curso estable';
    if(/crise|crisis/.test(e)) return pt?'curso em crises':'curso en crisis';
    if(/flutu|fluct|intermit/.test(e)) return pt?'curso flutuante':'curso fluctuante';
    if(/migrat/.test(e)) return pt?'curso migratório':'curso migratorio';
    if(/aditiv/.test(e)) return pt?'padrão aditivo':'patrón aditivo';
    if(/epis[óo]dic|recorrent|recurrent/.test(e)) return pt?'curso recorrente':'curso recurrente';
    if(/ascendent/.test(e)) return pt?'progressão ascendente':'progresión ascendente';
    if(/migrou|mudou de car|cambi[óo] de car/.test(e)) return pt?'migração e mudança de caráter da dor':'migración y cambio de carácter del dolor';
    return (pt?'curso ':'curso ')+e;   // fallback: prefixa "curso" p/ virar substantivo (ex.: "curso súbito e intenso")
  }
  // ── FLUIDEZ (02/08/2026, ordem do dono: "tem que ser uma história clínica fluida,
  // igual às geradas em hospitais") ──────────────────────────────────────────────
  // Antes, todos os atributos entravam num período só, separados por vírgula:
  // "Refere dor de caráter urente, de intensidade 7-8/10 na EVA, descontínua (em
  // crises), com curso flutuante desde o início." Lê-se como formulário, não como
  // história. Agora os atributos são distribuídos em ATÉ DUAS frases (no máximo três
  // atributos cada), a segunda começando por um conectivo — que é como o médico
  // escreve à mão.
  var leadN = isPain ? (pt?'dor ':'dolor ') : (pt?'quadro ':'cuadro ');
  if(c.length){
    var prim=c.slice(0,3), resto=c.slice(3);
    P.push((pt?'Descreve a ':'Describe el ')+leadN.trim()+(pt?' como ':' como ')+join(prim, pt?' e ':' y ')+'.');
    if(resto.length) P.push((pt?'Refere ainda ser ':'Refiere además ser ')+join(resto, pt?' e ':' y ')+'.');
  }
  if(B.EVOL){
    var ev=normEvol(B.EVOL);
    // "curso flutuante" → "Desde o início, o quadro tem curso flutuante."
    P.push(pt ? 'Desde o início, o quadro apresenta '+ev+'.'
              : 'Desde su inicio, el cuadro presenta '+ev+'.');
  }

  // ── 3. FATORES MODULADORES ──
  // "Como fatores moduladores, refere: repouso" é rótulo de formulário. Numa HC se
  // escreve o que o fator FAZ; quando a pergunta não distingue piora de melhora
  // (o guia pergunta "iniciam, exacerbam ou acalmam" de uma vez), a frase honesta é
  // relacionar sem afirmar a direção — inventar "piora com" seria dado clínico falso.
  if(B.FATOR.length){
    var fs=B.FATOR.filter(function(f){return !/sem rela|sin rela|nenhum|ning[úu]n/.test(f);});
    if(fs.length){
      // "com" e não "a": o fator vem sem artigo do formulário ("repouso", "esforço
      // físico") e "relaciona o quadro a repouso" exigiria contração ("ao repouso"),
      // que erra assim que o fator for feminino ou plural.
      var fsTxt=join(fs.map(low), pt?' e ':' y ');
      P.push(pt ? 'Relaciona o quadro com '+fsTxt+'.' : 'Relaciona el cuadro con '+fsTxt+'.');
    }
  }

  // ── 4. SINTOMAS ASSOCIADOS ──
  if(B.assocSim.length) P.push((pt?'Associa ':'Asocia ')+join(B.assocSim.slice(0,8),pt?' e ':' y ')+(B.assocSim.length>8?(pt?', entre outros':', entre otros'):'')+'.');

  // ── 5. NEGATIVOS PERTINENTES (+ alarme negado no mesmo fôlego) ──
  if(B.assocNao.length || B.alarmeNao){
    var negs=B.assocNao.slice(0,8);
    var tail=B.alarmeNao?(pt?'outros sinais de alarme':'otros signos de alarma'):'';
    var sN=(pt?'Nega ':'Niega ');
    if(negs.length && tail) sN+=negs.join(', ')+(pt?' ou ':' u ')+tail;
    else if(negs.length) sN+=join(negs,pt?' e ':' y ')+(B.assocNao.length>8?(pt?', entre outros':', entre otros'):'');
    else sN+=tail;
    P.push(sN+'.');
  }

  // ── 6. MEDIDAS TERAPÊUTICAS PRÉVIAS ──
  if(B.medidas.length) P.push((pt?'Refere uso prévio de ':'Refiere uso previo de ')+join(B.medidas,pt?' e ':' y ')+'.');
  else if(B.medidasNeg) P.push(pt?'Nega uso de analgésicos ou outras medidas terapêuticas prévias.':'Niega uso de analgésicos u otras medidas terapéuticas previas.');

  // ── 7. ANTECEDENTES / MEDICAÇÃO DE USO ──
  if(B.ANTEC.length){
    // adjetivais ("cardíacos ou pulmonares", "respiratórios", "cirúrgicos…") não levam "de";
    // nominais ("cirurgias abdominais", "doença hepática", "epilepsia…") levam "de".
    var adjRe=/^(card[íi]ac|cardiovascular|pulmonar|cir[úu]rgic|quir[úu]rgic|respiratóri|respiratori|hep[áa]tic|renal|tireoidian|tiroide|neurol[óo]gic|hematol[óo]gic|metab[óo]lic|reumatol[óo]gic|al[ée]rgic|psiqui[áa]tric|relevante)/;
    var aitems=B.ANTEC.slice(0,6).map(function(al){ return (adjRe.test(al) && !/,/.test(al)) ? al : 'de '+al; });
    P.push((pt?'Apresenta antecedentes ':'Presenta antecedentes ')+join(aitems,pt?' e ':' y ')+'.');
  }
  if(B.fatRisco.length){
    var frSingle = B.fatRisco.length===1 && !/,/.test(B.fatRisco[0]);   // adjetivo único → sem dois-pontos
    P.push((pt?'Apresenta fatores de risco':'Presenta factores de riesgo')+(frSingle?' ':': ')+join(B.fatRisco.slice(0,6),'; ')+'.');
  }
  if(B.MED.length) P.push((pt?'Em uso regular de ':'En uso regular de ')+join(B.MED,pt?' e ':' y ')+'.');

  // ── 8. OUTROS DESCRITIVOS (limpos) ──
  if(B.DESC.length){
    var ds=B.DESC.filter(function(d){return d.l && d.v && !isPlaceholder(d.v);}).map(function(d){
      var dv=low(d.v).replace(/\s*[—–]\s*(.+)$/, ' ($1)');   // tail com travessão → parêntese
      return low(d.l)+' ('+dv+')';
    });
    if(ds.length) P.push((pt?'Refere ainda: ':'Refiere además: ')+ds.join('; ')+'.');
  }

  // ── 9. ALARME PRESENTE ──
  if(B.alarmeSim) P.push(pt?'⚠ Sinais de alarme presentes — avaliação prioritária indicada.':'⚠ Signos de alarma presentes — evaluación prioritaria indicada.');

  // ── 10. FECHO: motivo/momento da procura ──
  if(B.MOTIVO) P.push((pt?'Diante de ':'Ante ')+low(B.MOTIVO).replace(/\.$/,'')+(pt?', procura esta unidade de saúde para avaliação médica.':', acude a esta unidad de salud para evaluación médica.'));
  else if(!cont) P.push(pt?'Procura esta unidade de saúde para avaliação médica.':'Acude a esta unidad de salud para evaluación médica.');

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
var AEA_NARRATIVE_GEN = { 'cefaleia': gerarNarrativaAEA_cefaleia, 'tosse': gerarNarrativaAEA_tosse };

// Resolve o roteiro AEA conforme a especialidade de origem (window.currentSpec).
// Ex.: o "Dor" (semio-dor) usa LITIDIFES por padrão e ALICIA (aeaGuideCir) quando vindo de cirurgia.
// Devolve um clone raso do motivo com .aeaGuide já apontando para o roteiro certo — render e coleta
// continuam lendo .aeaGuide sem mudança interna, e os índices dos campos batem entre os dois.
function aeaGuideFor(mObj){
  if(mObj && mObj.aeaGuideCir && mObj.aeaGuideCir.length &&
     typeof window!=='undefined' && window.currentSpec==='cirurgia'){
    var c={}; for(var k in mObj) c[k]=mObj[k]; c.aeaGuide=mObj.aeaGuideCir; return c;
  }
  return mObj;
}
if(typeof window!=='undefined') window.aeaGuideFor = aeaGuideFor;

// Coleta as respostas do guia AEA de um motivo a partir do DOM.
// Reutilizada tanto pelo motor de regex quanto pela geração via IA — fonte única.
function coletarRespostasAEA(mObj, lng, idPfx){
  mObj = mObj ? aeaGuideFor(mObj) : mObj;
  if(!mObj || !mObj.aeaGuide || !mObj.aeaGuide.length) return [];
  idPfx = idPfx || 'aea-g-';
  var ansArr = [];
  mObj.aeaGuide.forEach(function(q,i){
    var id = idPfx+i;
    var resp = '—';
    if(q.type==='radio') resp = selOne(id);
    else if(q.type==='multi') resp = selMulti(id);
    else if(q.type==='yn') resp = ynAns(id);
    else if(q.type==='input') resp = fieldVal(id) || '—';
    ansArr.push({qText:(lng==='es'?(q.qEs||q.q):q.q), type:q.type, resp:resp, ph:(lng==='es'?(q.ph2||q.ph||''):(q.ph||''))});
  });
  return ansArr;
}

function gerarNarrativaAEA(mObj, lng, idPfx, opts){
  if(!mObj || !mObj.aeaGuide || !mObj.aeaGuide.length) return null;
  var ansArr = coletarRespostasAEA(mObj, lng, idPfx);
  var hasAny = ansArr.some(function(a){ return a.resp && a.resp!=='—'; });
  if(!hasAny) return null;
  var gen = AEA_NARRATIVE_GEN[mObj.id];
  return gen ? gen(ansArr, lng) : gerarNarrativaAEA_generica(ansArr, lng, mObj, opts);
}

// ── MOTOR LOCAL COMPLETO (fallback): monta a narrativa dos 3 motivos com fecho no fim ──
// Mesma lógica de montagem usada no PDF (seção 3), exposta aqui para reuso.
function gerarNarrativaAEACompleta(lng){
  function _g(mObj,pfx,cont){
    return (mObj && mObj.aeaGuide && mObj.aeaGuide.length)
      ? (gerarNarrativaAEA(mObj, lng, pfx, cont?{continuation:true}:undefined)||'') : '';
  }
  function _splitFecho(n){
    if(!n) return {body:'',fecho:''};
    var rx = (lng==='es') ? /\s*([^.]*acude a esta unidad de salud para evaluación médica\.)\s*$/i
                          : /\s*([^.]*procura esta unidade de saúde para avaliação médica\.)\s*$/i;
    var m = n.match(rx);
    return m ? {body:n.slice(0,m.index).trim(), fecho:m[1].trim()} : {body:n, fecho:''};
  }
  var m1 = (typeof currentMotivo  !== 'undefined') ? currentMotivo  : null;
  var m2 = (typeof currentMotivo2 !== 'undefined') ? currentMotivo2 : null;
  var m3 = (typeof currentMotivo3 !== 'undefined') ? currentMotivo3 : null;
  var sp = _splitFecho(_g(m1,'aea-g-',false));
  var parts = [];
  if(sp.body) parts.push(sp.body);
  var n2 = _g(m2,'aea-g2-',true); if(n2) parts.push(n2);
  var n3 = _g(m3,'aea-g3-',true); if(n3) parts.push(n3);
  if(sp.fecho) parts.push(sp.fecho);
  return parts.join(' ');
}

// ── MONTA O PAYLOAD enviado à API (/api/gerar-hc) ──
function montarPayloadHC(lng){
  function gE(id){ var e=document.getElementById(id); return e?(e.value||'').trim():''; }
  var pares = [
    {m:(typeof currentMotivo  !== 'undefined') ? currentMotivo  : null, pfx:'aea-g-'},
    {m:(typeof currentMotivo2 !== 'undefined') ? currentMotivo2 : null, pfx:'aea-g2-'},
    {m:(typeof currentMotivo3 !== 'undefined') ? currentMotivo3 : null, pfx:'aea-g3-'}
  ];
  var motivos = [];
  pares.forEach(function(p, idx){
    if(!p.m || !p.m.aeaGuide || !p.m.aeaGuide.length) return;
    var ans = coletarRespostasAEA(p.m, lng, p.pfx).filter(function(a){
      return a.resp && a.resp !== '—' && String(a.resp).trim() !== '';
    }).map(function(a){
      return { pergunta: (a.qText||'').replace(/\s+/g,' ').trim(), resposta: String(a.resp).trim() };
    });
    if(!ans.length) return;
    motivos.push({ ordem: idx+1, nome: (lng==='es'?(p.m.nameEs||p.m.name):p.m.name)||'', respostas: ans });
  });
  var tempoN = gE('mc-tempo-n'), tempoU = gE('mc-tempo-u');
  return {
    lang: lng,
    demografia: {
      idade: gE('dp-idade'),
      sexo:  gE('dp-sexo'),
      tempoEvolucao: (tempoN ? (tempoN + ' ' + tempoU).trim() : '')
    },
    motivos: motivos,
    relatoLivre: gE('aea-texto')   // texto livre da AEA — concatenado para a IA sintetizar junto
  };
}

// ── GERA A HC VIA IA (com fallback automático para o motor local) ──
// Retorna Promise<{ok, narrativa, fonte:'ia'|'local', erro?}>.
function gerarHCviaIA(lng){
  var payload = montarPayloadHC(lng);
  var relato = (payload.relatoLivre||'').trim();
  if(!payload.motivos.length && !relato){
    return Promise.resolve({ ok:false, fonte:'local', narrativa:'', erro: lng==='es'?'Sin respuestas para generar la HC':'Sem respostas para gerar a HC' });
  }
  function fallback(motivo){
    var local = gerarNarrativaAEACompleta(lng) || '';
    if(!local && relato) local = relato; // sem motivos respondidos: usa o relato livre como narrativa
    return { ok: !!local, fonte:'local', narrativa: local, erro: motivo };
  }
  // /api/gerar-hc exige token Supabase (bloqueia anônimo / aplica limite diário).
  // Sem token ou em qualquer erro (401/429/503/rede) caímos no motor local — o usuário
  // sempre recebe a HC; só perde a síntese por IA.
  var tokenP = (typeof window.authGetToken === 'function') ? window.authGetToken() : Promise.resolve(null);
  return Promise.resolve(tokenP).then(function(token){
    if(!token) return fallback('auth');
    return fetch('/api/gerar-hc', {
      method:'POST',
      headers:{'Content-Type':'application/json', 'Authorization':'Bearer '+token},
      body: JSON.stringify(payload)
    }).then(function(r){
      return r.json().then(function(j){ return { status:r.status, j:j }; });
    }).then(function(res){
      if(res.status===200 && res.j && res.j.narrativa){
        return { ok:true, fonte:'ia', narrativa: res.j.narrativa.trim() };
      }
      return fallback((res.j && res.j.error) || ('HTTP '+res.status));
    }).catch(function(err){
      return fallback((err && err.message) || 'rede');
    });
  });
}

// ── PAYLOAD DO ASSISTENTE DE IA (apoio diagnóstico) ───────────────────────────
// Reaproveita montarPayloadHC (demografia + motivos + relato livre) e agrega
// antecedentes, sinais vitais, exame físico e hipóteses. NÃO inclui identificadores
// do paciente (nome, CI/documento) — a análise é feita sobre dados clínicos apenas.
function montarPayloadAssistente(lng){
  function gE(id){ var e=document.getElementById(id); return e?(e.value||'').trim():''; }
  function ecto(groupId){
    var p=document.getElementById(groupId); if(!p) return '';
    var s=p.querySelector('.ecto-opt.sel'); if(!s) return '';
    // pega o rótulo do idioma atual (ou o texto puro)
    var span=s.querySelector(lng==='es'?'.es':'.pt');
    return (span?span.textContent:s.textContent).replace(/\s+/g,' ').trim();
  }
  function linhas(pairs){
    return pairs.map(function(p){ var v=gE(p.id); return v?(p.lbl+': '+v):''; })
                .filter(Boolean).join('\n');
  }

  // ── COLETOR DE SIM/NÃO (02/08/2026, ordem do dono) ──────────────────────────
  // "ele tem que buscar todas as informações da história clínica completa, não
  // somente a informação inicial… ele está falando pode ter referência a diabetes
  // mellitus, mas a gente não tem quadros de diabetes mellitus?"
  // Estava certo: o assistente recebia a AEA, alguns campos de texto, sinais vitais
  // e ectoscopia — e NÃO recebia as doenças crônicas (HAS, DIABETES, dislipidemia),
  // alergias, IST, tabagismo, etilismo nem a revisão por aparelhos e sistemas. Como
  // ninguém lhe dizia que o diabetes fora NEGADO, ele especulava diabetes.
  //
  // As respostas sim/não do app não vivem em campo de formulário: o estado está nas
  // classes do botão (`sim`/`nao`, com `yn-on` nos blocos de antecedentes). Este
  // coletor lê o que foi respondido — inclusive os NÃO, que valem tanto quanto os
  // sim para o raciocínio — e junta os detalhes do bloco que abre no "sim".
  function coletarYN(raizId){
    var raiz = document.getElementById(raizId); if(!raiz) return '';
    var linhasYN = [];
    var rows = raiz.querySelectorAll('.yn-row');
    for(var i=0;i<rows.length;i++){
      var row = rows[i];
      var qEl = row.querySelector('.yn-question'); if(!qEl) continue;
      var qSpan = qEl.querySelector(lng==='es'?'.es':'.pt');
      var q = ((qSpan?qSpan.textContent:qEl.textContent)||'').replace(/\s+/g,' ').trim();
      if(!q) continue;
      // O botão marcado é a fonte: nos antecedentes ele leva `yn-on` e o RÓTULO
      // importa — tabagismo tem três respostas (Sim/Não/Ex) e o "Ex" é gravado com a
      // mesma classe do "Não". Ler a classe perderia "ex-tabagista", que muda o risco.
      var marcado = row.querySelector('.yn-btn.yn-on') || row.querySelector('.yn-btn.sim, .yn-btn.nao');
      if(!marcado) continue;                       // não respondida → não inventa
      var sim = marcado.classList.contains('sim');
      var rot = marcado.querySelector(lng==='es'?'.es':'.pt');
      var val = ((rot?rot.textContent:marcado.textContent)||'').replace(/\s+/g,' ').trim()
                || (sim ? (lng==='es'?'Sí':'Sim') : (lng==='es'?'No':'Não'));
      // Detalhes do bloco que abre no "sim" (tempo de doença, tipo, tratamento…)
      var det = '';
      var extra = row.nextElementSibling;
      if(sim && extra && extra.classList && extra.classList.contains('yn-extra')){
        var partes = [];
        var campos = extra.querySelectorAll('input, textarea');
        for(var k=0;k<campos.length;k++){
          var v=(campos[k].value||'').trim(); if(v) partes.push(v);
        }
        var sels = extra.querySelectorAll('.f-radio.sel, .f-radio.sel-danger');
        for(var m=0;m<sels.length;m++){
          var sv=(sels[m].textContent||'').replace(/\s+/g,' ').trim(); if(sv) partes.push(sv);
        }
        if(partes.length) det = ' ('+partes.join('; ')+')';
      }
      linhasYN.push(q+': '+val+det);
    }
    return linhasYN.join('\n');
  }

  // A revisão por aparelhos vem em blocos por sistema; guarda o nome do sistema para
  // o modelo saber a que aparelho pertence cada resposta.
  function coletarRAS(){
    var raiz = document.getElementById('ras-content'); if(!raiz) return '';
    var blocos = raiz.querySelectorAll('.ras-system'), out=[];
    for(var i=0;i<blocos.length;i++){
      var nomeEl = blocos[i].querySelector('.ras-name');
      var nome = nomeEl ? nomeEl.textContent.replace(/\s+/g,' ').trim() : '';
      var corpo = coletarYN(blocos[i].id);
      var obs = blocos[i].querySelector('textarea');
      var obsTxt = obs && obs.value.trim() ? ((lng==='es'?'Obs.: ':'Obs.: ')+obs.value.trim()) : '';
      var conteudo = [corpo, obsTxt].filter(Boolean).join('\n');
      if(conteudo) out.push(nome+':\n'+conteudo);
    }
    return out.join('\n');
  }

  var base = montarPayloadHC(lng); // { lang, demografia, motivos, relatoLivre }

  var antecedentes = linhas([
    {id:'app-medicacao', lbl: lng==='es'?'Medicación de uso':'Medicação em uso'},
    {id:'app-cirurg',    lbl: lng==='es'?'Cirugías':'Cirurgias'},
    {id:'app-trauma',    lbl: lng==='es'?'Traumas':'Traumas'},
    {id:'app-intern',    lbl: lng==='es'?'Internaciones previas':'Internações prévias'},
    {id:'app-outras',    lbl: lng==='es'?'Otras patologías':'Outras patologias'},
    {id:'apf-mae-patol', lbl: lng==='es'?'Antecedente materno':'Antecedente materno'},
    {id:'apf-pai-patol', lbl: lng==='es'?'Antecedente paterno':'Antecedente paterno'},
    {id:'apf-outros',    lbl: lng==='es'?'Otros antec. familiares':'Outros antec. familiares'},
    {id:'hab-diurese',   lbl: lng==='es'?'Diuresis':'Diurese'},
    {id:'hab-catarse',   lbl: lng==='es'?'Catarsis':'Catarse'},
    {id:'adm-texto',     lbl: lng==='es'?'Admisiones previas':'Admissões prévias'}
  ]);

  var sinaisVitais = linhas([
    {id:'sv-pa',   lbl:'PA'},
    {id:'sv-fc',   lbl:'FC'},
    {id:'sv-fr',   lbl:'FR'},
    {id:'sv-temp', lbl:'Temp'},
    {id:'sv-spo2', lbl:'SpO2'},
    {id:'sv-imc',  lbl:'IMC'}
  ]);

  var ectoPairs = [
    ['ecto-consciencia', lng==='es'?'Conciencia':'Consciência'],
    ['ecto-orientacao',  lng==='es'?'Orientación':'Orientação'],
    ['ecto-nutric',      lng==='es'?'Estado nutricional':'Estado nutricional'],
    ['ecto-facies',      lng==='es'?'Facies':'Fácies'],
    ['ecto-decubito',    lng==='es'?'Decúbito':'Decúbito'],
    ['ecto-marcha',      lng==='es'?'Marcha':'Marcha'],
    ['ecto-impressao',   lng==='es'?'Impresión':'Impressão']
  ];
  var ectoTxt = ectoPairs.map(function(p){ var v=ecto(p[0]); return v?(p[1]+': '+v):''; }).filter(Boolean).join('; ');
  var achados = gE('sum-achados');
  var exameFisico = [ectoTxt, achados].filter(Boolean).join('\n');

  var hipoteses = [
    gE('sum-sindromes') ? ((lng==='es'?'Síndromes: ':'Síndromes: ')+gE('sum-sindromes')) : '',
    gE('sum-hipoteses') ? ((lng==='es'?'Hipótesis: ':'Hipóteses: ')+gE('sum-hipoteses')) : ''
  ].filter(Boolean).join('\n');

  // Doenças crônicas / alergias / IST e hábitos: o "sim" E o "não" vão para a análise.
  var comorbidades = coletarYN('app-cronicas');
  var habitos = [coletarYN('panel-habitos'), linhas([
    {id:'hab-sono-h', lbl: lng==='es'?'Horas de sueño':'Horas de sono'}
  ])].filter(Boolean).join('\n');
  var ras = coletarRAS();

  return {
    lang: base.lang,
    hc: {
      demografia: base.demografia,
      motivos: base.motivos,
      relatoLivre: base.relatoLivre,
      comorbidades: comorbidades,
      antecedentes: antecedentes,
      habitos: habitos,
      ras: ras,
      sinaisVitais: sinaisVitais,
      exameFisico: exameFisico,
      hipoteses: hipoteses
    }
  };
}
if(typeof window!=='undefined'){ window.montarPayloadAssistente = montarPayloadAssistente; }
