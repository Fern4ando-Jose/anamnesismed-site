// anamnesismed-guide-es.js
// Tradução para ESPANHOL do conteúdo clínico do guia (GUIDE_CONTENT).
// REGRA: este arquivo NÃO duplica a estrutura — apenas espelha, por índice,
// os textos de cada seção e injeta os campos *Es nos objetos do GUIDE_CONTENT
// (definido em anamnesismed-motivos.js) através de applyGuideES().
// Os builders (anamnesismed-guide.js) leem esses campos via helper bi() e o
// CSS [data-lang] faz a troca PT/ES instantânea.
//
// Formato de GUIDE_ES[<id>] (espelha o PT na MESMA ordem/contagem):
//   mnemonics: [ { name, rows:[ [termoEs, dicaEs], ... ] }, ... ]
//   manobras:  [ { title, subtitle, steps:[...], normal, abnormal }, ... ]
//   sinais:    [ { name, eponym, how, means }, ... ]
//   ddx:       [ [diagEs, aFavorEs, contraEs], ... ]
//   escalas:   [ { title, headers:[...], rows:[[...],...], note }, ... ]
//   conduta:   { exames:[...], drugs:[...], steps:[...] }
// Campos omitidos mantêm o PT (fallback no bi()).

var GUIDE_ES = {

'febre': {
  mnemonics: [
    { name:'Semiología de la fiebre', rows:[
      ['Inicio','Insidioso/lento (fiebre tifoidea) o brusco con escalofríos (neumonía, sepsis)'],
      ['Intensidad','Febrícula (37,3–38°C), moderada (38–39°C) o alta/hiperpirexia (>39°C)'],
      ['Duración','Corta duración o fiebre prolongada (FOD — >3 semanas sin diagnóstico)'],
      ['Evolución','Continua, remitente, intermitente (normaliza entre picos) o recurrente (alterna fiebre y apirexia)'],
      ['Término','En crisis — caída rápida en pocas horas — o en lisis — descenso lento y gradual']
    ]},
    { name:'Patrones de la curva febril', rows:[
      ['Continua','Nunca normaliza; variación <1°C — fiebre tifoidea, neumonía bacteriana'],
      ['Remitente','Varía >1°C pero no normaliza — endocarditis, absceso'],
      ['Intermitente','Normaliza entre picos — malaria, abscesos'],
      ['Séptica/Héctica','Picos altos + escalofríos + sudoración profusa — sepsis'],
      ['Ondulante','Períodos febriles con afebriles — Hodgkin, brucelosis'],
      ['Humps (bifásica)','Dos períodos febriles separados — dengue, fiebre amarilla']
    ]},
    { name:'Respuesta Inflamatoria Sistémica', rows:[
      ['Temperatura','>38°C o <36°C'],
      ['FC','>90 lpm'],
      ['FR','>20 rpm'],
      ['Leucocitos','>12.000 o <4.000/mm³ o >10% cayados']
    ]}
  ],
  manobras: [
    { title:'Signo de Kernig', subtitle:'Irritación meníngea',
      steps:['Decúbito dorsal','Flexionar cadera y rodilla 90°','Intentar extender la rodilla pasivamente'],
      normal:'Extensión libre sin dolor', abnormal:'Resistencia/dolor a la extensión (Kernig +) → meningitis' },
    { title:'Signo de Brudzinski', subtitle:'Irritación meníngea',
      steps:['Decúbito dorsal sin almohada','Mano detrás de la nuca','Flexionar el cuello pasivamente hacia el tórax'],
      normal:'Sin flexión involuntaria de los MMII', abnormal:'Flexión refleja de rodillas/caderas (Brudzinski +) → meningitis' },
    { title:'Búsqueda de foco infeccioso', subtitle:'Examen sistemático',
      steps:['Inspección: piel, mucosas, orofaringe','Auscultación pulmonar bilateral','Abdomen: dolor, organomegalias','Genitales, articulaciones'],
      normal:'Sin foco identificable → sospechar FOD', abnormal:'Foco identificado → guía diagnóstico y tratamiento' },
    { title:'Búsqueda de ganglios linfáticos', subtitle:'Linfadenopatía',
      steps:['Palpar cadenas cervical, axilar, inguinal','Evaluar tamaño, consistencia, movilidad'],
      normal:'Ganglios <1 cm, móviles, indoloros', abnormal:'Pétreo → neoplasia | Blando+doloroso → infección' }
  ],
  sinais: [
    { name:'Tríada de Charcot', eponym:'Colangitis aguda', how:'Fiebre + dolor HCD + ictericia', means:'Colangitis bacteriana — urgencia quirúrgica' },
    { name:'Péntada de Reynolds', eponym:'Colangitis grave', how:'Tríada de Charcot + shock + confusión mental', means:'Colangitis supurativa — drenaje de urgencia' },
    { name:'Rash petequial/purpúrico', eponym:'Meningococemia', how:'Petequias que no blanquean a la presión', means:'Meningococemia — Penicilina/Ceftriaxona INMEDIATA' },
    { name:'Esplenomegalia febril', eponym:'Fiebre prolongada', how:'Percusión + palpación del bazo aumentado', means:'Malaria, fiebre tifoidea, endocarditis, linfoma' }
  ],
  ddx:[
    ['Infección viral','Mialgias, autolimitada, leucopenia','Leucocitosis +desviación, foco bacteriano'],
    ['Infección bacteriana','Escalofríos, foco identificable, leucocitosis','Curso viral, sin foco'],
    ['Sepsis','qSOFA ≥2, hipotensión, lactato ↑','Fiebre aislada sin disfunción orgánica'],
    ['Tuberculosis','Fiebre vespertina, sudoración nocturna, pérdida de peso','Curso agudo, Rx normal'],
    ['Malaria','Fiebre cíclica, esplenomegalia, viaje Amazonia','Sin exposición, fiebre continua'],
    ['Endocarditis','Soplo nuevo, bacteriemia, émbolos, UDVP','Sin valvulopatía, sin factores de riesgo'],
    ['Neoplasia','Fiebre >3sem, adelgazamiento, adenomegalia pétrea','Causa infecciosa identificada'],
    ['Colagenosis','Fiebre+artritis+rash+ANA+, mujer joven','Infección documentada']
  ],
  escalas:[
    { title:'qSOFA — Triaje de Sepsis', headers:['Criterio','Corte','Puntos'],
      rows:[['FR','≥22 rpm','1'],['Estado mental','Glasgow <15','1'],['PAS','≤100 mmHg','1']],
      note:'qSOFA ≥2 → Sospechar sepsis → evaluar SOFA completo' },
    { title:'SIRS', headers:['Criterio','Valor anormal'],
      rows:[['Temperatura','>38°C o <36°C'],['FC','>90 lpm'],['FR','>20 rpm'],['Leucocitos','>12.000 o <4.000 o >10% cayados']],
      note:'SIRS ≥2 + infección = Sepsis (criterios antiguos; Sepsis-3 usa SOFA)' }
  ],
  conduta:{
    exames:['Hemograma con diferencial','PCR y VSG','Hemocultivos 2x ANTES del ATB','Orina rutina + urocultivo','Rx tórax','TGO, TGP, FA, bilirrubinas','Urea y Creatinina','Lactato venoso (si sepsis)'],
    drugs:['Paracetamol 500-1000 mg VO/EV c/6h (máx 4g/día)','Dipirona 500-1000 mg VO/EV c/6h','ATB empírico SOLO si sepsis o foco bacteriano claro','Hidratación adecuada'],
    steps:['1. Evaluar estabilidad hemodinámica','2. Tomar hemocultivos ANTES del ATB','3. Identificar foco infeccioso','4. Sepsis (qSOFA≥2): ATB en <1h + fluido 30mL/kg','5. Antitérmico según confort','6. Reevaluación en 48-72h con cultivos']
  }
},

'dor-toracica': {
  mnemonics: [
    { name:'Conducta inicial en el IAM/SCA', rows:[
      ['Morfina','2-4 mg EV — dolor refractario'],
      ['Oxígeno','Solo si SpO₂ <94%'],
      ['Nitratos','NTG SL 0,5 mg — contraindicado si PAS <90 o sildenafil'],
      ['AAS','300 mg masticado — dosis de ataque']
    ]},
    { name:'Causas que matan por dolor torácico', rows:[
      ['IAM/SCA','Opresión, irradiación MSI, troponina ↑'],
      ['Disección aórtica','Desgarrante, dorso, asimetría de pulsos'],
      ['TEP','Pleurítico, disnea, TVP, Dímero-D ↑'],
      ['Neumotórax hipertensivo','MV ausente, desviación de tráquea, hipotensión'],
      ['Taponamiento','Beck: hipotensión + IY + ruidos apagados'],
      ['Ruptura esofágica','Pos-vómito, enfisema subcutáneo, Boerhaave']
    ]}
  ],
  manobras:[
    { title:'Signo de Levine', subtitle:'Isquemia miocárdica',
      steps:['Observar cómo el paciente describe el dolor','El paciente coloca el puño cerrado sobre el esternón espontáneamente'],
      normal:'Señala con el dedo el área localizada', abnormal:'Puño cerrado sobre el esternón (Levine +) → alta especificidad para isquemia' },
    { title:'Pulso paradójico', subtitle:'Taponamiento/pericarditis constrictiva',
      steps:['Esfigmomanómetro — inflar por encima de la sistólica','Desinflar: anotar PA del 1er ruido (espiración)','Anotar PA cuando el ruido aparece en TODAS las fases'],
      normal:'Diferencia <10 mmHg entre fases', abnormal:'Diferencia >10 mmHg → taponamiento, pericarditis constrictiva, TEP masivo' },
    { title:'Frote pericárdico', subtitle:'Pericarditis aguda',
      steps:['Diafragma del estetoscopio','Paciente sentado + inclinado hacia adelante','Espiración forzada — BEII inferior'],
      normal:'Sin ruidos extra además de R1 y R2', abnormal:'Ruido de cuero frotado → pericarditis aguda' },
    { title:'Palpación de la pared torácica', subtitle:'Costocondritis',
      steps:['Palpar articulaciones costocondrales 1ª-7ª','Presión digital firme en cada unión'],
      normal:'Sin dolor a la palpación de la pared', abnormal:'Reproducción del dolor → costocondritis (excluye causa cardíaca)' }
  ],
  sinais:[
    { name:'Signo de Levine', eponym:'IAM', how:'Puño cerrado sobre el esternón para describir el dolor', means:'Alta especificidad para isquemia miocárdica' },
    { name:'Tríada de Beck', eponym:'Taponamiento', how:'Hipotensión + Ingurgitación yugular + Ruidos apagados', means:'Taponamiento cardíaco — pericardiocentesis de emergencia' },
    { name:'Asimetría de pulsos', eponym:'Disección aórtica', how:'Comparar PA en ambos brazos + pulso radial bilateral', means:'Diferencia >20 mmHg → disección aórtica tipo A — cirugía de emergencia' },
    { name:'Frote pericárdico', eponym:'Pericarditis aguda', how:'Cuero frotado — mejor sentado + espiración forzada + BEII', means:'Pericarditis aguda — AAS + Colchicina; eco para descartar derrame' }
  ],
  ddx:[
    ['IAM (IAMCEST/NSTEMI)','Opresión >20min, irradiación MSI, sudoración, troponina ↑, ST ↑','Punzada localizada, palpación reproduce dolor'],
    ['Angina inestable','Opresión <20min, alivia con NTG, troponina normal','Dolor >20min, troponina en curva de elevación'],
    ['Disección aórtica','Desgarrante SÚBITO, dorso, HTA, asimetría de pulsos','Gradual, ST ↑ típico, troponina ↑'],
    ['TEP','Pleurítico, disnea, TVP, SpO₂↓, Dímero-D ↑','Dolor isquémico típico, ST ↑, sin TVP'],
    ['Pericarditis','Mejora sentado, empeora acostado, frote, ST difuso cóncavo','Irradiación MSI, troponina muy elevada'],
    ['ERGE','Ardor posprandial, alivia con IBP/antiácido','Relación con esfuerzo, sudoración, troponina ↑'],
    ['Costocondritis','Reproducida por la palpación, empeora con movimientos','En reposo, irradiación, sudoración'],
    ['Neumotórax','Súbito, pleurítico, MV ↓ unilateral','Bilateral, troponina ↑']
  ],
  escalas:[
    { title:'HEART Score — Riesgo MACE en SCA', headers:['Componente','0','1','2'],
      rows:[['H Historia','Inespecífica','Mod sospecha','Altamente sospechosa'],
            ['E ECG','Normal','BRI/repol anormal','ST ↑'],
            ['A Edad','<45','45-64','≥65'],
            ['R Factores de riesgo','0','1-2','≥3 o EAC'],
            ['T Troponina','≤LSN','>1-3x LSN','>3x LSN']],
      note:'0-3: Bajo riesgo | 4-6: Intermedio | 7-10: Alto riesgo (65% MACE)' },
    { title:'Wells TEP', headers:['Criterio','Puntos'],
      rows:[['TVP clínicamente sospechosa','3'],['Alternativo menos probable que TEP','3'],['FC >100','1.5'],['Inmovilización/cirugía <4 sem','1.5'],['TVP/TEP previo','1.5'],['Hemoptisis','1'],['Neoplasia activa','1']],
      note:'<2: Baja | 2-6: Intermedia | >6: Alta probabilidad' }
  ],
  conduta:{
    exames:['ECG 12 derivaciones en <10 min','Troponina I/T ultrasensible (basal + 1-3h)','Hemograma, coagulación','Rx tórax PA','Dímero-D (si TEP — prob baja/intermedia)','Ecocardiograma a pie de cama si inestable'],
    drugs:['AAS 300 mg masticado (SCA sin contraindicación)','NTG SL 0,5 mg c/5min x3 (PAS>90, sin sildenafil)','Morfina 2-4 mg EV (dolor refractario)','Heparina HBPM (SCA confirmado)','O₂ solo si SpO₂ <94%'],
    steps:['1. ECG en <10 min — ¿IAMCEST? → activar hemodinamia','2. Acceso EV + monitorización continua','3. Troponina basal + hemograma + coagulación','4. MONA si SCA','5. IAMCEST: angioplastia <90 min o trombólisis <12h','6. Rx tórax para diagnóstico diferencial']
  }
}

};

// ── MERGE: injeta os campos *Es nos objetos do GUIDE_CONTENT ──────────
function applyGuideES(){
  if(typeof GUIDE_CONTENT === 'undefined' || typeof GUIDE_ES === 'undefined') return;
  Object.keys(GUIDE_ES).forEach(function(id){
    var pt = GUIDE_CONTENT[id], es = GUIDE_ES[id];
    if(!pt || !es) return;

    if(es.mnemonics && pt.mnemonics) es.mnemonics.forEach(function(me, i){
      var mp = pt.mnemonics[i]; if(!mp || !me) return;
      if(me.name) mp.nameEs = me.name;
      if(me.rows && mp.rows) me.rows.forEach(function(re, j){
        var rp = mp.rows[j]; if(!rp || !re) return;
        if(re[0] != null) rp[3] = re[0];
        if(re[1] != null) rp[4] = re[1];
      });
    });

    if(es.manobras && pt.manobras) es.manobras.forEach(function(xe, i){
      var xp = pt.manobras[i]; if(!xp || !xe) return;
      if(xe.title)    xp.titleEs = xe.title;
      if(xe.subtitle) xp.subtitleEs = xe.subtitle;
      if(xe.normal)   xp.normalEs = xe.normal;
      if(xe.abnormal) xp.abnormalEs = xe.abnormal;
      if(xe.steps)    xp.stepsEs = xe.steps;
    });

    if(es.sinais && pt.sinais) es.sinais.forEach(function(se, i){
      var sp = pt.sinais[i]; if(!sp || !se) return;
      if(se.name)   sp.nameEs = se.name;
      if(se.eponym) sp.eponymEs = se.eponym;
      if(se.how)    sp.howEs = se.how;
      if(se.means)  sp.meansEs = se.means;
    });

    if(es.ddx && pt.ddx) es.ddx.forEach(function(de, i){
      var dp = pt.ddx[i]; if(!dp || !de) return;
      if(de[0] != null) dp[3] = de[0];
      if(de[1] != null) dp[4] = de[1];
      if(de[2] != null) dp[5] = de[2];
    });

    if(es.escalas && pt.escalas) es.escalas.forEach(function(ee, i){
      var ep = pt.escalas[i]; if(!ep || !ee) return;
      if(ee.title)   ep.titleEs = ee.title;
      if(ee.headers) ep.headersEs = ee.headers;
      if(ee.rows)    ep.rowsEs = ee.rows;
      if(ee.note)    ep.noteEs = ee.note;
    });

    if(es.conduta && pt.conduta){
      if(es.conduta.exames) pt.conduta.examesEs = es.conduta.exames;
      if(es.conduta.drugs)  pt.conduta.drugsEs = es.conduta.drugs;
      if(es.conduta.steps)  pt.conduta.stepsEs = es.conduta.steps;
    }
  });
}
applyGuideES();
