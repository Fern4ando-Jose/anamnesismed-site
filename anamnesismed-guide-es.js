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

'dispneia': {
  mnemonics:[
    { name:'Causas de disnea aguda', rows:[
      ['Neumonía/Neumotórax','Fiebre+crepitantes / MV ausente unilateral+súbito'],
      ['Asma/EPOC','Sibilancias, uso de musculatura accesoria'],
      ['SCA/ICC','Ortopnea, crepitantes bibasales, BNP ↑'],
      ['TEP','Pleurítico, TVP, taquicardia, Dímero-D ↑'],
      ['Epiglotitis/Obstrucción','Estridor, disfagia, fiebre, posición en trípode']
    ]}
  ],
  manobras:[
    { title:'Expansibilidad torácica', subtitle:'Ventilación simétrica',
      steps:['Manos abiertas en los tercios inferiores posteriores','Pulgares en la línea media','Inspiración profunda — observar separación de los pulgares'],
      normal:'Expansión simétrica bilateral', abnormal:'Asimetría → consolidación, derrame, neumotórax en el lado reducido' },
    { title:'Frémito tóraco-vocal', subtitle:'Transmisión de vibraciones',
      steps:['Borde cubital de las manos en el tórax posterior','Decir "treinta y tres"','Comparar bilateralmente'],
      normal:'FTV simétrico bilateral', abnormal:'↑ → consolidación | ↓ → derrame, neumotórax' },
    { title:'Percusión torácica', subtitle:'Patrones de resonancia',
      steps:['Dedo medio en los espacios intercostales','Percutir comparativamente bilateral'],
      normal:'Sonoridad normal bilateral', abnormal:'Matidez → derrame/consolidación | Hiperresonancia → neumotórax' }
  ],
  sinais:[
    { name:'Tiraje intercostal', eponym:'Trabajo respiratorio aumentado', how:'Retracción de los espacios intercostales en la inspiración', means:'Obstrucción grave — asma grave, neumonía extensa' },
    { name:'Sibilancia espiratoria', eponym:'Broncoespasmo', how:'Ruido musical, fase espiratoria prolongada', means:'Asma (reversible con BD) o EPOC (parcialmente reversible)' },
    { name:'Crepitantes finos bibasales', eponym:'ICC/Fibrosis', how:'Como cabello frotado — inspiración final', means:'Bibasales ICC (edema) | Focales → neumonía, fibrosis' },
    { name:'Ortopnea', eponym:'ICC', how:'Disnea al acostarse — número de almohadas', means:'≥3 almohadas: alta especificidad para ICC' }
  ],
  ddx:[
    ['Asma aguda','Sibilancias, antecedente previo, buena respuesta a BD, joven atópico','Ortopnea, crepitantes, BNP ↑'],
    ['ICC descompensada','Ortopnea, DPN, crepitantes bibasales, BNP ↑, cardiomegalia','Sibilancias puras, BNP normal'],
    ['EPOC agudizado','Fumador, hiperinsuflación, uso de musculatura accesoria','Atopía, sin tabaquismo, buena respuesta a BD'],
    ['Neumonía','Fiebre, crepitantes focales, FTV ↑, consolidación Rx','Bilateral, BNP muy ↑, ortopnea'],
    ['TEP','Pleurítico, TVP, taquicardia, Dímero-D ↑, hipoxemia','Consolidación Rx típica, sibilancias'],
    ['Neumotórax','Súbito, MV ausente unilateral, hiperresonancia','Bilateral, crepitantes, BNP ↑']
  ],
  escalas:[
    { title:'Escala MRC de Disnea', headers:['Grado','Descripción'],
      rows:[['0','Disnea solo con ejercicio intenso'],['1','Disnea al caminar rápido o subir una cuesta'],['2','Camina más lento que sus pares por disnea'],['3','Se detiene al caminar ~100 m'],['4','Disnea al vestirse / no sale de casa']],
      note:'Cuantifica la limitación funcional en enfermedad respiratoria crónica' },
    { title:'Wells TEP', headers:['Criterio','Puntos'],
      rows:[['TVP clínicamente sospechosa','3'],['Alternativo menos probable que TEP','3'],['FC >100','1.5'],['Inmovilización/cirugía <4 sem','1.5'],['TVP/TEP previo','1.5'],['Hemoptisis','1'],['Neoplasia activa','1']],
      note:'<2: Baja | 2-6: Intermedia | >6: Alta probabilidad' }
  ],
  conduta:{
    exames:['Oximetría de pulso y gasometría arterial','Hemograma, BNP/NT-proBNP','Dímero-D (si sospecha de TEP)','Rx tórax PA','ECG','Ecocardiograma (si ICC)','Eco-Doppler de MMII (si TVP)'],
    drugs:['O₂ para SpO₂ ≥94% (88-92% si EPOC retenedor)','Broncodilatador (salbutamol ± ipratropio) en asma/EPOC','Furosemida EV en ICC descompensada','Anticoagulación si TEP/TVP confirmada'],
    steps:['1. Evaluar gravedad: SpO₂, FR, uso de musculatura accesoria','2. Oxigenoterapia según el objetivo','3. Rx tórax + ECG + BNP/Dímero-D dirigidos','4. Tratamiento según la causa','5. Reevaluar respuesta y considerar UCI si fatiga respiratoria']
  }
},
'cefaleia': {
  mnemonics:[
    { name:'Signos de alarma — cefalea secundaria', rows:[
      ['Sistémico','Fiebre, pérdida de peso, VIH, neoplasia'],
      ['Neurológico','Déficit focal, papiledema, meningismo'],
      ['Onset súbito','Thunderclap — peor cefalea de la vida en segundos'],
      ['Older >50 años','1ª cefalea — arteritis temporal, HIC'],
      ['Progresiva','Empeoramiento progresivo sin alivio'],
      ['Posición','Empeora en decúbito, tos, Valsalva'],
      ['Cambio previo','Cambio de patrón en cefalea crónica'],
      ['Embarazo','HTA, eclampsia, TVS cerebral']
    ]},
    { name:'Criterios de Migraña', rows:[
      ['Pulsátil','Latido'],
      ['Un día (4-72h)','Duración sin tratamiento'],
      ['Unilateral','Hemicraneal (60-70%)'],
      ['Náusea','Náuseas/vómitos'],
      ['Incapacitante','Limita las actividades'],
      ['Interfiere','Empeora al moverse'],
      ['Tratamiento','Buena respuesta a triptanos']
    ]}
  ],
  manobras:[
    { title:'Signo de Kernig', subtitle:'Irritación meníngea',
      steps:['Decúbito dorsal','Flexionar cadera y rodilla 90°','Intentar extender la rodilla pasivamente'],
      normal:'Extensión libre sin dolor', abnormal:'Resistencia+dolor → Kernig+ (meningitis, HSA)' },
    { title:'Signo de Brudzinski', subtitle:'Irritación meníngea',
      steps:['Decúbito dorsal sin almohada','Inmovilizar los hombros','Flexionar el cuello hacia el tórax'],
      normal:'Sin flexión de los MMII', abnormal:'Flexión refleja de rodillas/caderas → Brudzinski+' },
    { title:'Fondo de ojo', subtitle:'Papiledema — HIC',
      steps:['Sala oscura, dilatar si es posible','Examinar el disco óptico — bordes, pulso venoso'],
      normal:'Bordes nítidos, pulso venoso presente', abnormal:'Bordes borrosos, elevación → papiledema = HIC → TC urgente' }
  ],
  sinais:[
    { name:'Cefalea en estallido (Thunderclap)', eponym:'HSA', how:'Máxima intensidad en <1 minuto — peor cefalea de la vida', means:'HSA hasta demostrar lo contrario — TC de cráneo urgente; si normal: PL (xantocromía)' },
    { name:'Tríada meníngea', eponym:'Meningitis bacteriana', how:'Cefalea + Fiebre + Rigidez de nuca', means:'ATB INMEDIATO tras hemocultivos — no esperar TC si no hay papiledema' },
    { name:'Aura visual clásica', eponym:'Migraña con aura', how:'Escotoma centelleante en espectro de fortificación — 20-60 min ANTES del dolor', means:'Migraña con aura — triptán en la fase de DOLOR (no durante el aura)' },
    { name:'Rigidez de nuca', eponym:'Irritación meníngea', how:'Resistencia y dolor a la flexión pasiva del cuello', means:'Meningitis, HSA, encefalitis — TC + punción lumbar' }
  ],
  ddx:[
    ['Migraña','Hemicraneal, pulsátil, náuseas, fotofobia, 4-72h, antecedente previo','Thunderclap, déficit neurológico, fiebre, meningismo'],
    ['Cefalea tensional','Bilateral, opresiva, no incapacitante, sin náuseas/foto','Pulsátil, hemicraneal, vómitos, incapacitante'],
    ['HSA','Thunderclap — máxima en segundos, la peor de la vida, meningismo','Gradual, recurrente idéntica, sin meningismo'],
    ['Meningitis','Fiebre + cefalea + rigidez + fotofobia, Kernig+','Sin fiebre, sin meningismo, recurrente desde hace años'],
    ['HIC','Progresiva, peor por la mañana, empeora con Valsalva, papiledema','Hemicraneal, pulsátil, sin papiledema'],
    ['Cefalea en racimos','Periorbitaria unilateral, lagrimeo, rinorrea, 15-180 min, agitación','Bilateral, sin autonómicos, duración >3h']
  ],
  escalas:[
    { title:'ID Migraine', headers:['Pregunta','Puntos'],
      rows:[['¿Náuseas o vómitos durante las crisis?','1'],['¿Cefalea incapacitante?','1'],['¿Sensibilidad a la luz?','1']],
      note:'≥2/3: Sensibilidad 81%, Especificidad 78% para migraña' },
    { title:'ICHD-3: Migraña sin aura', headers:['Criterio','Descripción'],
      rows:[['A','≥5 crisis que cumplen B-D'],['B','4-72h sin tratamiento'],['C','≥2 de: unilateral/pulsátil/moderada-grave/empeora con la actividad'],['D','≥1 de: náuseas/vómitos O foto+fonofobia'],['E','No atribuida a otra causa']],
      note:'' }
  ],
  conduta:{
    exames:['TC de cráneo sin contraste (thunderclap, déficit, fiebre+meningismo, >50 años 1ª cefalea)','PL si TC normal + sospecha de HSA','Hemograma + VSG (arteritis temporal >50 años)','PA (cefalea hipertensiva)','Fondo de ojo (papiledema)'],
    drugs:['Leve-moderada: AAS 1g VO + Metoclopramida 10mg','Moderada-grave: Triptán (Sumatriptán 50-100mg VO o 6mg SC)','Profilaxis (>4 crisis/mes): Propranolol 40-160mg/día, Amitriptilina, Topiramato','En racimos: O₂ 100% 12L/min 15 min + Sumatriptán SC'],
    steps:['1. SNOOP4 — excluir cefalea secundaria','2. TC urgente si hay alarma','3. Clasificar el tipo','4. Tratar la crisis + prevenir si es frecuente','5. Orientar diario de cefaleas']
  }
},
'dor-abdominal': {
  mnemonics:[
    { name:'Causas de dolor abdominal', rows:[
      ['Vascular','Isquemia mesentérica, aneurisma, TVP'],
      ['Inflamatorio','Apendicitis, colecistitis, pancreatitis'],
      ['Neoplásico','Ca colon, gástrico, pancreático'],
      ['Dietético/EII','Úlcera péptica, Crohn, CUCI'],
      ['Iatrogénico','AINEs, posoperatorio, procedimiento'],
      ['Congénito','Hernia encarcelada, malrotación'],
      ['Autoinmune','Porfiria, vasculitis, lupus'],
      ['Trauma','Hematoma hepático/esplénico'],
      ['Extraabdominal','CAD, IAM inferior, cólico renal']
    ]}
  ],
  manobras:[
    { title:'Signo de Blumberg', subtitle:'Peritonitis/irritación peritoneal',
      steps:['Palpar el punto de máximo dolor','Comprimir profundamente con 3 dedos','Retirar la mano de forma súbita'],
      normal:'Sin dolor a la descompresión', abnormal:'Dolor agudo al soltar (Blumberg +) → peritonitis (apendicitis, perforación)' },
    { title:'Signo de Murphy', subtitle:'Colecistitis aguda',
      steps:['Colocar 3 dedos bajo el reborde costal derecho','Pedir inspiración profunda','Observar la detención de la inspiración por dolor'],
      normal:'Inspiración completa sin dolor', abnormal:'Detención súbita de la inspiración por dolor (Murphy +) → colecistitis aguda' },
    { title:'Signo de Rovsing', subtitle:'Apendicitis',
      steps:['Comprimir firmemente el CII','Mantener 10 segundos'],
      normal:'Sin dolor en FID', abnormal:'Dolor referido en FID (Rovsing +) → apendicitis' },
    { title:'Signo del Psoas', subtitle:'Apendicitis retrocecal',
      steps:['DL izquierdo (posición de Sims)','Hiperextender la cadera derecha pasivamente'],
      normal:'Sin dolor con la hiperextensión', abnormal:'Dolor en FID (Psoas +) → apendicitis retrocecal' }
  ],
  sinais:[
    { name:'Signo de Murphy', eponym:'Colecistitis aguda', how:'Dolor y detención de la inspiración con presión bajo el reborde costal derecho', means:'Colecistitis aguda — USG abdominal' },
    { name:'Defensa involuntaria', eponym:'Peritonitis', how:'Contracción refleja de la pared a la palpación', means:'Peritonitis — cirugía de urgencia si es difusa' },
    { name:'Signo de Courvoisier', eponym:'Neoplasia pancreática', how:'Vesícula palpable + ictericia obstructiva indolora', means:'Neoplasia de cabeza de páncreas — USG + TC + CA19-9' },
    { name:'Punto de McBurney', eponym:'Apendicitis', how:'Dolor máximo en el 1/3 ext. línea ombligo-EIAS derecha', means:'Apendicitis típica — correlacionar con Alvarado' }
  ],
  ddx:[
    ['Apendicitis aguda','Migración periumbilical→FID, anorexia, náuseas DESPUÉS del dolor, febrícula, Blumberg+','Dolor difuso, diarrea ANTES del dolor, sin migración'],
    ['Colecistitis aguda','Dolor HCD posgraso, Murphy+, fiebre, leucocitosis, cálculos USG','Dolor FID, sin relación alimentaria, Murphy negativo'],
    ['Pancreatitis aguda','Dolor en faja epigástrica→dorso, lipasa/amilasa ↑, vómitos','Sin elevación de lipasa, sin irradiación dorsal'],
    ['Cólico renal','Cólico lumbar→flanco→FID, hematuria, agitación intensa','Dolor continuo, defensa, fiebre, sin hematuria'],
    ['EPI','Mujer, bilateral, flujo, movilización uterina dolorosa','Hombre, migración típica, sin flujo'],
    ['Embarazo ectópico','β-HCG+, amenorrea, USG sin saco intrauterino, dolor agudo','Hombre, β-HCG negativo']
  ],
  escalas:[
    { title:'Alvarado — Apendicitis', headers:['Criterio','Puntos'],
      rows:[['Migración del dolor a FID','1'],['Anorexia','1'],['Náuseas/Vómitos','1'],['Dolor FID a la palpación','2'],['Blumberg+','1'],['Temperatura >37,3°C','1'],['Leucocitosis >10.000','2'],['Desviación a la izquierda','1']],
      note:'1-4: Baja | 5-6: Posible | 7-8: Probable | 9-10: Alta → cirugía' },
    { title:'BISAP — Pancreatitis (mortalidad)', headers:['Criterio (1 punto)','Descripción'],
      rows:[['BUN >25 mg/dL','Urea elevada'],['Compromiso mental','Glasgow <15'],['SIRS','≥2 criterios'],['Edad','>60 años'],['Derrame pleural','En Rx tórax']],
      note:'0-2: Mortalidad <2% | 3-5: Mortalidad hasta 22%' }
  ],
  conduta:{
    exames:['Hemograma con diferencial','Lipasa y amilasa','TGO, TGP, FA, GGT, Bilirrubinas','Urea, Creatinina','β-HCG (mujeres en edad fértil)','Orina rutina','USG abdominal (1ª línea)','TC abdomen+pelvis c/ contraste (gold standard)'],
    drugs:['NPO — sospecha quirúrgica','Dipirona 1-2g EV o Tramadol 100mg EV (analgesia — no retrasa el diagnóstico)','Ondansetrón 4-8mg EV','ATB prequirúrgico apendicitis: Cefazolina 2g EV 30 min antes'],
    steps:['1. ¿Signos de peritonitis? Defensa, Blumberg, vientre en tabla','2. Laboratorio + USG','3. NPO + analgesia adecuada','4. Cirugía de urgencia: peritonitis difusa, neumoperitoneo','5. Apendicitis: apendicectomía laparoscópica <24h']
  }
},
'edema': {
  mnemonics:[
    { name:'Causas de edema', rows:[
      ['Cardíaco (ICC)','Vespertino MMII, ortopnea, BNP ↑'],
      ['Hepático (cirrosis)','Ascitis + edema, albúmina ↓'],
      ['Flebitis/TVP','Unilateral, dolor, empastamiento'],
      ['Renal (nefrótico)','Periorbitario matutino, proteinuria ↑↑'],
      ['Alérgico/angioedema','Súbito, cara, urticaria'],
      ['Ins. venosa crónica','Várices, lipodermatoesclerosis'],
      ['Nutricional/Medicamento','Albúmina ↓, amlodipino, corticoides']
    ]}
  ],
  manobras:[
    { title:'Fóvea (Godet)', subtitle:'Edema con fóvea = trasudado',
      steps:['Comprimir sobre la tibia con el pulgar 15 segundos','Retirar y observar la depresión residual'],
      normal:'Sin depresión (sin fóvea) → linfedema, mixedema', abnormal:'Depresión persistente (fóvea +) → ICC, cirrosis, nefrótico, hipoalbuminemia' },
    { title:'Signo de Homans', subtitle:'TVP (baja exactitud)',
      steps:['Decúbito dorsal, rodilla levemente flexionada','Dorsiflexión pasiva forzada del pie'],
      normal:'Sin dolor en la pantorrilla', abnormal:'Dolor en la pantorrilla → Homans+ (baja sensibilidad/especificidad → preferir Eco-Doppler)' }
  ],
  sinais:[
    { name:'Edema vespertino bilateral', eponym:'ICC/Ins. venosa', how:'Fóvea en MMII, empeora a lo largo del día, mejora con elevación', means:'BNP para diferenciar ICC de insuficiencia venosa' },
    { name:'Edema periorbitario matutino', eponym:'Síndrome nefrótico', how:'Párpados superiores hinchados al despertar + proteinuria', means:'Síndrome nefrótico — proteinuria 24h, albúmina, biopsia renal' },
    { name:'Mixedema', eponym:'Hipotiroidismo grave', how:'Sin fóvea, piel seca/fría, cara abotagada, bradicardia', means:'Hipotiroidismo — TSH + T4L; levotiroxina' }
  ],
  ddx:[
    ['ICC','Bilateral vespertino, fóvea, ortopnea, crepitantes, BNP ↑','Unilateral, matutino, proteinuria, sin cardiopatía'],
    ['TVP','Unilateral, calor, empastamiento, Dímero-D ↑','Bilateral, sin dolor/calor'],
    ['Sd. Nefrótico','Periorbitario matutino, proteinuria >3,5g/24h, albúmina ↓','Vespertino, sin proteinuria significativa'],
    ['Ins. venosa crónica','Várices, lipodermatoesclerosis, úlcera maleolar','Agudo, asimétrico, sin várices'],
    ['Cirrosis','Ascitis + edema, ictericia, albúmina ↓','Sin hepatopatía, albúmina normal']
  ],
  escalas:[
    { title:'Wells TVP', headers:['Criterio','Puntos'],
      rows:[['Neoplasia activa','1'],['Parálisis/yeso reciente','1'],['Encamado >3 días o cirugía <12 sem','1'],['Dolor en trayecto de venas profundas','1'],['Edema de toda la pierna','1'],['Pantorrilla asimétrica >3cm','1'],['Fóvea confinada a la pierna sintomática','1'],['Circulación colateral','1'],['Diagnóstico alternativo más probable','-2']],
      note:'<2: Baja → Dímero-D | ≥2: Mod/Alta → Eco-Doppler' }
  ],
  conduta:{
    exames:['BNP/NT-proBNP','Albúmina sérica','Orina rutina + proteinuria 24h','Urea, Creatinina','Pruebas de función hepática','TSH','Eco-Doppler MMII (TVP)','Ecocardiograma (ICC)'],
    drugs:['Furosemida 40-80mg/día VO (ICC, nefrótico, cirrosis)','Media elástica 20-30 mmHg (ins. venosa, TVP)','Enoxaparina 1mg/kg SC c/12h (TVP confirmada)'],
    steps:['1. ¿Uni o bilateral? ¿Fóvea? ¿Matutino o vespertino?','2. Unilateral + dolor → Wells TVP → Eco-Doppler','3. Bilateral + BNP ↑ → ICC → Eco cardíaco','4. Periorbitario + proteinuria → nefrótico','5. Albúmina ↓ → hipoalbuminemia → causa','6. Tratar la causa de base']
  }
},


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
