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

'artralgia': {
  mnemonics:[
    { name:'Mnemónico GASA — principales causas de monoartritis aguda', rows:[
      ['Gota / pseudogota (cristales)','Inicio súbito, dolor intenso, frecuentemente en 1ª MTF (podagra) o rodilla — confirmar con artrocentesis y búsqueda de cristales'],
      ['Artritis Séptica','Fiebre + monoartritis aguda + derrame importante — emergencia, requiere artrocentesis y antibioticoterapia inmediatas'],
      ['Sinovitis por trauma/hemartrosis','Antecedente de trauma, uso de anticoagulantes — evaluar lesión estructural/sangrado intraarticular'],
      ['Artritis reactiva/espondiloartritis (presentación monoarticular)','Infección previa (gastrointestinal/urinaria/ITS), asociada a entesitis, uveítis o lesiones cutáneas']
    ]},
    { name:'Mnemónico SOAP-BRAIN — causas de poliartritis (adaptado)', rows:[
      ['LES (Lupus Eritematoso Sistémico)','Poliartritis simétrica no erosiva, rash malar, fotosensibilidad, predominio en mujeres jóvenes'],
      ['Osteoartritis','Patrón mecánico, manos (IFD/IFP), rodillas y caderas, ancianos, rigidez matinal corta (<30min)'],
      ['Artritis Reumatoide','Poliartritis simétrica de pequeñas articulaciones (manos/muñecas), rigidez matinal >1h, FR/anti-CCP positivos'],
      ['Psoriásica (Artritis)','Asociada a psoriasis cutánea/ungueal, dactilitis ("dedo en salchicha"), entesitis, patrón asimétrico'],
      ['Bacteriana/viral (artritis infecciosas y reactivas)','Cuadro agudo, fiebre, relación temporal con infección previa'],
      ['Reumática (Fiebre Reumática)','Poliartritis migratoria tras faringitis estreptocócica, principalmente en niños/jóvenes'],
      ['Artritis gotosa/cristales (poliarticular crónica)','Tofos, antecedente de hiperuricemia, crisis recurrentes'],
      ['Inflamatoria — espondiloartritis (axial/periférica)','Dolor inflamatorio, rigidez matinal prolongada, sacroileítis, uveítis, psoriasis, enfermedad inflamatoria intestinal asociada'],
      ['Neoplásica (síndrome paraneoplásica)','Poliartritis de inicio reciente en ancianos, pérdida de peso, síntomas sistémicos — investigar neoplasia oculta']
    ]}
  ],
  manobras:[
    { title:'Signo del peloteo rotuliano (choque rotuliano)', subtitle:'Evaluación de derrame articular en la rodilla',
      steps:['Con el paciente en decúbito dorsal y rodilla extendida, comprima el receso suprarrotuliano con una mano para desplazar el líquido','Con los dedos de la otra mano, presione la rótula contra el fémur de forma rápida y firme'],
      normal:'Rótula en contacto directo con el fémur, sin sensación de "hundirse y volver"', abnormal:'Sensación de que la rótula "flota" y choca contra el fémur (peloteo positivo) → indica derrame articular significativo en la rodilla' },
    { title:'Evaluación de la amplitud de movimiento (ADM) articular', subtitle:'Identificación de limitación funcional y dolor al movimiento',
      steps:['Solicite movimientos activos (el propio paciente los realiza) y luego pasivos (el examinador los moviliza) de cada articulación sospechosa','Compare la amplitud y la presencia de dolor entre ambos lados','Observe crepitaciones, bloqueos o inestabilidad durante el movimiento'],
      normal:'ADM completa, simétrica, sin dolor ni crepitación', abnormal:'Limitación de la ADM, dolor al movimiento pasivo y activo, crepitación o bloqueo articular → sugiere proceso inflamatorio, degenerativo o mecánico intraarticular' },
    { title:'Palpación de entesitis y puntos dolorosos periarticulares', subtitle:'Evaluación de inserciones tendinosas/ligamentarias (entesitis)',
      steps:['Palpe los puntos de inserción tendinosa más comúnmente afectados (tendón de Aquiles, fascia plantar, epicóndilos, trocánter mayor)','Evalúe dolor a la palpación localizada y edema asociado'],
      normal:'Sin dolor a la palpación de las entesis', abnormal:'Dolor localizado a la palpación de entesis (entesitis) → hallazgo sugestivo de espondiloartritis (psoriásica, axial, reactiva)' },
    { title:'Inspección y palpación articular general', subtitle:'Evaluación de signos inflamatorios y deformidades',
      steps:['Inspeccione simetría, edema, deformidades, eritema y atrofia muscular adyacente','Palpe la articulación evaluando calor local, derrame, engrosamiento sinovial y dolor a la compresión'],
      normal:'Articulaciones sin edema, calor, eritema ni deformidad; temperatura local similar a la piel adyacente', abnormal:'Calor, edema, eritema y dolor a la palpación (sinovitis activa) o deformidades estructurales (sugieren enfermedad crónica/erosiva)' }
  ],
  sinais:[
    { name:'Tofos gotosos', eponym:'Depósitos de cristales de urato', how:'Nódulos endurecidos, generalmente en hélix de la oreja, codos, manos y alrededor de articulaciones, que pueden drenar material blanquecino/pastoso', means:'Indican gota tofácea crónica — depósito de cristales de urato monosódico en tejidos blandos, asociado a hiperuricemia de larga data' },
    { name:'Nódulos reumatoides', eponym:'Hallazgo extraarticular de la Artritis Reumatoide', how:'Nódulos subcutáneos firmes e indoloros, comúnmente en superficies extensoras (codos, antebrazos)', means:'Marcador de enfermedad más grave/erosiva y de peor pronóstico en la artritis reumatoide, generalmente asociados a FR positivo' },
    { name:'Dactilitis ("dedo en salchicha")', eponym:'Hallazgo característico de la artritis psoriásica', how:'Edema difuso de todo el dedo (no solo de las articulaciones), confiriendo aspecto de "salchicha"', means:'Resulta de la inflamación simultánea de articulaciones y tendones (tenosinovitis) — fuertemente sugestivo de espondiloartritis, especialmente psoriásica' },
    { name:'Deformidades articulares características (manos)', eponym:'Estigmas de enfermedad articular crónica', how:'Desviación cubital de los dedos y deformidades en "cuello de cisne"/"boutonnière" (AR); nódulos de Heberden (IFD) y Bouchard (IFP) en la osteoartritis', means:'Indican enfermedad articular crónica/establecida — el patrón de deformidad ayuda a diferenciar artritis reumatoide de osteoartritis' }
  ],
  ddx:[
    ['Gota (artritis por cristales de urato)','Monoartritis aguda de inicio súbito y dolor intenso, frecuentemente en 1ª MTF (podagra), hiperuricemia, tofos en casos crónicos, buena respuesta a antiinflamatorios','Patrón poliarticular simétrico crónico desde el inicio, ausencia de cristales en la artrocentesis'],
    ['Artritis Reumatoide','Poliartritis simétrica de pequeñas articulaciones (manos y muñecas), rigidez matinal prolongada (>1h), FR/anti-CCP positivos, nódulos reumatoides, evolución crónica y erosiva','Patrón monoarticular agudo y febril, o patrón asimétrico con entesitis/dactilitis (más sugestivo de espondiloartritis)'],
    ['Artritis Séptica','Monoartritis aguda, fiebre, malestar importante, derrame articular voluminoso y muy doloroso, factor de riesgo para bacteriemia (uso de drogas IV, inmunosupresión, prótesis articular) — emergencia médica','Cuadro crónico y afebril, múltiples articulaciones afectadas de forma simétrica e indolente'],
    ['Osteoartritis (artrosis)','Dolor de patrón mecánico (empeora con el uso, mejora con el reposo), rigidez matinal corta (<30min), afecta articulaciones de carga (rodillas, caderas) y manos (IFD/IFP), edad avanzada, crepitación a la movilización','Dolor de patrón inflamatorio con rigidez matinal prolongada, signos inflamatorios importantes (calor, eritema, edema significativo)'],
    ['Espondiloartritis (psoriásica, axial, reactiva, enteropática)','Dolor inflamatorio, rigidez matinal prolongada, entesitis, dactilitis, sacroileítis, uveítis, psoriasis o enfermedad inflamatoria intestinal asociadas, generalmente en adultos jóvenes, HLA-B27 frecuentemente positivo','Patrón puramente mecánico, simetría de pequeñas articulaciones sin entesitis, ausencia de manifestaciones extraarticulares']
  ],
  escalas:[
    { title:'Diferenciación inicial — patrón inflamatorio x mecánico', headers:['Característica','Patrón inflamatorio','Patrón mecánico'],
      rows:[['Rigidez matinal','Prolongada (>1 hora)','Corta (<30 minutos)'],['Relación con uso/reposo','Mejora con el movimiento, empeora en reposo/de noche','Empeora con el uso/esfuerzo, mejora con el reposo'],['Signos inflamatorios locales','Calor, rubor, edema, derrame prominentes','Discretos o ausentes, predominio de crepitación'],['Síntomas sistémicos','Frecuentes (fiebre, fatiga, pérdida de peso, rash)','Generalmente ausentes']],
      note:'Esta diferenciación inicial orienta la priorización diagnóstica — el patrón inflamatorio dirige la investigación hacia enfermedades autoinmunes/infecciosas/microcristalinas, mientras que el patrón mecánico sugiere causas degenerativas/estructurales' }
  ],
  conduta:{
    exames:['Artrocentesis (punción articular) — mandatoria en toda monoartritis aguda febril/con derrame para análisis del líquido sinovial (celularidad, cristales, Gram y cultivo) — excluye artritis séptica y confirma gota/pseudogota','Hemograma completo, VSG y PCR — evaluar actividad inflamatoria/infecciosa sistémica','Ácido úrico sérico — ayuda en la sospecha de gota (recordando que puede estar normal durante la crisis aguda)','Factor reumatoide (FR) y anti-CCP — investigación de artritis reumatoide','FAN y otros autoanticuerpos — según sospecha de enfermedad autoinmune sistémica (lupus y correlacionados)','Radiografía de las articulaciones afectadas — evaluar erosiones, reducción del espacio articular, calcificaciones (condrocalcinosis) y alteraciones estructurales crónicas'],
    drugs:['Antiinflamatorios no esteroidales (AINEs) — primera línea sintomática en crisis agudas (gota, patrón mecánico), respetando contraindicaciones','Colchicina o corticoide (oral/intraarticular) — alternativas en el manejo de la crisis aguda de gota','Analgésicos simples (paracetamol/dipirona) para control sintomático general del dolor','Artritis séptica sospechada/confirmada → antibioticoterapia empírica de amplio espectro IV tras tomar el cultivo, con evaluación para drenaje articular — no retrasar el inicio','Enfermedad autoinmune confirmada (AR, lupus, espondiloartritis) → derivación a reumatología para terapia modificadora del curso de la enfermedad (DMARDs, biológicos)'],
    steps:['1. Caracterizar el patrón (mono/oligo/poliarticular, simetría, ritmo inflamatorio x mecánico) y signos de alarma (fiebre, derrame importante, signos sistémicos)','2. Monoartritis aguda febril → considerar artritis séptica como emergencia: artrocentesis inmediata, hemocultivos e inicio precoz de antibioticoterapia según evaluación especializada','3. Sospecha de gota/pseudogota → artrocentesis con búsqueda de cristales (patrón oro) siempre que sea posible, además de ácido úrico sérico','4. Patrón poliarticular simétrico crónico con rigidez matinal prolongada → solicitar FR, anti-CCP, FAN, pruebas inflamatorias y radiografías, con derivación a reumatología','5. Patrón mecánico en paciente anciano, sin signos inflamatorios importantes → investigación radiográfica de osteoartritis y manejo conservador (analgesia, fisioterapia, control de peso)','6. Presencia de manifestaciones extraarticulares (rash, uveítis, lesiones orales/genitales, psoriasis, síntomas sistémicos) → ampliar la investigación hacia enfermedad autoinmune/espondiloartritis sistémica']
  }
},
'ictericia': {
  mnemonics:[
    { name:'Clasificación topográfica de la ictericia', rows:[
      ['Aumento de bilirrubina indirecta por hemólisis o eritropoyesis ineficaz','Anemia, esplenomegalia, orina oscura pero heces normales, sin prurito, hemólisis (reticulocitosis, LDH↑, haptoglobina↓)','Prehepática (hemolítica)'],
      ['Lesión de los hepatocitos que afecta la captación/conjugación/excreción de la bilirrubina','Transaminasas muy elevadas, malestar, anorexia, hepatomegalia dolorosa, antecedente de hepatitis/etilismo/hepatotóxicos','Hepática (hepatocelular)'],
      ['Obstrucción del flujo biliar (cálculo, neoplasia, estenosis)','Coluria + acolia fecal + prurito intenso, dolor en HCD, FA y GGT muy elevadas, posible signo de Courvoisier','Posthepática (colestásica/obstructiva)']
    ]}
  ],
  manobras:[
    { title:'Signo de Murphy', subtitle:'Evaluación de colecistitis aguda',
      steps:['Coloque los dedos bajo el reborde costal derecho, en la línea hemiclavicular','Pida al paciente inspirar profundamente','Observe si hay interrupción súbita de la inspiración por dolor (Murphy positivo)'],
      normal:'El paciente completa la inspiración sin dolor', abnormal:'Interrupción de la inspiración por dolor a la palpación del punto cístico (Murphy+) → sugiere colecistitis aguda' },
    { title:'Palpación hepática y esplénica', subtitle:'Evaluación de hepatomegalia/esplenomegalia',
      steps:['Palpe el reborde hepático desde la fosa ilíaca derecha, subiendo durante la espiración','Evalúe consistencia, superficie, borde y dolor a la palpación del hígado','Palpe el hipocondrio izquierdo en busca de bazo palpable (esplenomegalia)'],
      normal:'Hígado no palpable o borde liso, indoloro, hasta 1-2cm del reborde costal; bazo no palpable', abnormal:'Hepatomegalia de borde romo/irregular (sugiere hepatopatía crónica/neoplasia) o esplenomegalia (sugiere causa hemolítica/hipertensión portal)' },
    { title:'Búsqueda del signo de Courvoisier', subtitle:'Vesícula biliar palpable e indolora asociada a ictericia',
      steps:['Palpe el hipocondrio derecho en busca de masa redondeada compatible con vesícula biliar distendida','Evalúe si hay dolor asociado a la palpación'],
      normal:'Vesícula no palpable', abnormal:'Vesícula biliar palpable e indolora en paciente ictérico (Courvoisier+) → sugiere obstrucción biliar maligna (ej.: neoplasia de cabeza de páncreas), ya que los cálculos suelen causar vesícula fibrótica no distensible' },
    { title:'Búsqueda de ascitis — onda ascítica y matidez desplazable', subtitle:'Evaluación de líquido libre en la cavidad abdominal',
      steps:['Onda ascítica: percuta un flanco mientras un asistente comprime la línea media y palpe la transmisión de la onda en el flanco opuesto','Matidez desplazable: percuta del centro (timpánico) hacia los flancos (mate) y repita tras cambiar de decúbito, observando el desplazamiento de la matidez'],
      normal:'Sin transmisión de onda líquida; sin desplazamiento de la matidez con el cambio de posición', abnormal:'Onda líquida transmitida (onda ascítica+) o matidez que se desplaza con la posición (matidez desplazable+) → sugiere ascitis, común en hepatopatía crónica avanzada' }
  ],
  sinais:[
    { name:'Ictericia escleral', eponym:'Signo precoz de hiperbilirrubinemia', how:'Coloración amarillenta de la esclera, generalmente perceptible con bilirrubina total >2-3mg/dL', means:'Indica hiperbilirrubinemia — frecuentemente el primer signo clínico visible de ictericia, antes de la piel' },
    { name:'Arañas vasculares (spiders/telangiectasias)', eponym:'Estigma de hepatopatía crónica', how:'Lesiones vasculares puntiformes con ramificaciones radiales, que palidecen a la compresión central, generalmente en tórax y cara', means:'Sugieren hepatopatía crónica e hiperestrogenismo (metabolismo hepático alterado de los estrógenos)' },
    { name:'Hepatomegalia', eponym:'Hallazgo de examen físico hepatobiliar', how:'Hígado palpable más allá del reborde costal derecho, con evaluación de borde, superficie y consistencia', means:'Puede indicar congestión (insuficiencia cardíaca), infiltración (esteatosis, neoplasia) o proceso inflamatorio/infeccioso hepático' },
    { name:'Signo de Courvoisier', eponym:'Ludwig Georg Courvoisier', how:'Vesícula biliar palpable e indolora en paciente ictérico', means:'Sugiere obstrucción biliar de origen neoplásico (ej.: cáncer de cabeza de páncreas o vía biliar) — "una vesícula de Courvoisier rara vez es causada por un cálculo"' }
  ],
  ddx:[
    ['Ictericia hemolítica (prehepática)','Predominio de bilirrubina indirecta, anemia, esplenomegalia, orina oscura pero heces de color normal, ausencia de prurito, reticulocitosis y LDH elevado','Predominio de bilirrubina directa, transaminasas o enzimas canaliculares muy elevadas, acolia fecal'],
    ['Ictericia hepatocelular (hepatitis/cirrosis)','Transaminasas (TGO/TGP) marcadamente elevadas, malestar, anorexia, hepatomegalia dolorosa, antecedente de etilismo/hepatotóxicos/hepatitis viral, signos de hepatopatía crónica (arañas vasculares, ascitis)','Predominio de FA/GGT con transaminasas poco alteradas, prurito intenso y acolia, sugiriendo causa colestásica'],
    ['Ictericia colestásica/obstructiva (coledocolitiasis, neoplasia de vía biliar/páncreas)','Coluria + acolia fecal + prurito importante, dolor en HCD o epigastrio, fosfatasa alcalina y GGT muy elevadas, posible signo de Courvoisier (obstrucción neoplásica) o fiebre/escalofríos (colangitis)','Patrón predominante de elevación de transaminasas sin colestasis de laboratorio, ausencia de dilatación de vías biliares en la imagen']
  ],
  escalas:[
    { title:'Patrón bioquímico orientador según el tipo de ictericia', headers:['Tipo','Patrón de laboratorio predominante'],
      rows:[['Prehepática (hemolítica)','Bilirrubina indirecta ↑↑, transaminasas normales, FA/GGT normales, reticulocitos y LDH elevados, haptoglobina baja'],['Hepatocelular','Transaminasas (TGO/TGP) muy elevadas, bilirrubina directa e indirecta elevadas, FA/GGT discretamente elevadas'],['Colestásica/obstructiva','Fosfatasa alcalina y GGT muy elevadas, bilirrubina directa predominante, transaminasas discretamente alteradas, USG con posible dilatación de vías biliares']],
      note:'La combinación de historia clínica, examen físico y el patrón bioquímico (transaminasas x enzimas canaliculares x fracciones de bilirrubina) orienta la investigación de imagen dirigida' }
  ],
  conduta:{
    exames:['Bilirrubinas totales y fracciones (directa/indirecta) — define el predominio y orienta la investigación','Transaminasas (TGO/TGP), fosfatasa alcalina (FA) y gamma-GT — diferencian el patrón hepatocelular del colestásico','Hemograma completo, reticulocitos, LDH y haptoglobina — si sospecha de causa hemolítica','Serologías virales (hepatitis A, B, C) según factores de riesgo y cuadro clínico','Ultrasonografía abdominal — examen inicial de elección para evaluar vías biliares, vesícula, hígado y páncreas, e identificar dilatación de vía biliar (sugestiva de obstrucción)','Tomografía/colangiorresonancia y endoscopia (CPRE) según hallazgos — para casos con sospecha de obstrucción biliar no aclarada por la USG'],
    drugs:['Tratamiento dirigido a la causa de base — no hay tratamiento sintomático específico para la ictericia en sí','Suspender inmediatamente medicamentos/sustancias potencialmente hepatotóxicas identificadas en la anamnesis','Colestiramina o antihistamínicos pueden considerarse para alivio sintomático del prurito colestásico, según evaluación especializada','Colangitis aguda (fiebre + ictericia + dolor en HCD — tríada de Charcot) → antibioticoterapia de amplio espectro y evaluación para drenaje biliar de urgencia'],
    steps:['1. Caracterizar el patrón temporal, presencia de coluria/acolia/prurito y signos de alarma (fiebre, dolor importante, pérdida de peso, masa palpable)','2. Examen físico dirigido — buscar hepatomegalia, esplenomegalia, signo de Murphy, signo de Courvoisier y ascitis','3. Solicitar bilirrubinas con fracciones, transaminasas, FA/GGT y hemograma para clasificar el patrón (prehepático, hepatocelular o colestásico)','4. Ultrasonografía abdominal para evaluar dilatación de vías biliares, lesiones hepáticas/pancreáticas y vesícula','5. Signos de colangitis (fiebre + ictericia + dolor) u obstrucción biliar identificada → derivación urgente para evaluación quirúrgica/endoscópica (CPRE)','6. Sospecha de hepatitis aguda/crónica o hepatopatía avanzada → derivación a hepatología/gastroenterología para investigación etiológica completa']
  }
},
'convulsao-sincope': {
  mnemonics:[
    { name:'Diferenciación entre síncope y crisis convulsiva', rows:[
      ['Síncope: mareo, oscurecimiento visual, sudoración, náusea (generalmente presente). Convulsión: aura específica (olfativa, visual, sensación epigástrica) o ausencia de aviso','','Pródromo'],
      ['Síncope: típicamente en ortostatismo, calor, dolor, ayuno, esfuerzo (cardíaca). Convulsión: puede ocurrir en cualquier posición, incluso durante el sueño','','Postura/circunstancia'],
      ['Síncope: puede haber breves sacudidas mioclónicas (síncope convulsivo). Convulsión: movimientos tónico-clónicos rítmicos y prolongados, más sugestivos de crisis epiléptica','','Movimientos'],
      ['Más sugestiva de convulsión cuando es lateral; la mordedura en la punta de la lengua es inespecífica y puede ocurrir en síncope','','Mordedura de lengua'],
      ['Puede ocurrir en ambas, pero es más característica y frecuente en las crisis convulsivas','','Relajación esfinteriana'],
      ['Síncope: recuperación rápida y completa de la conciencia. Convulsión: el período posictal de confusión, somnolencia y desorientación prolongado es altamente sugestivo de crisis epiléptica','','Posevento']
    ]},
    { name:'Clasificación etiológica del síncope (cardíaco / reflejo / ortostático)', rows:[
      ['Arritmias (bradi/taquiarritmias), estenosis aórtica, miocardiopatía hipertrófica, embolia pulmonar','Síncope durante esfuerzo físico, sin pródromo, con palpitaciones o dolor torácico previo, antecedente de cardiopatía/muerte súbita familiar — "el síncope de esfuerzo es cardíaco hasta demostrar lo contrario"','Cardíaca (la más peligrosa)'],
      ['Estímulo vagal — dolor, emoción, calor, visión de sangre, micción, tos, defecación','Pródromo típico (sudoración, náusea, oscurecimiento visual), recuperación rápida, generalmente en jóvenes sin cardiopatía estructural','Refleja (neuromediada/vasovagal)'],
      ['Hipovolemia, disautonomía, medicamentos antihipertensivos/diuréticos, reposo prolongado en cama','Ocurre al levantarse rápidamente, caída documentada de la PA en la maniobra ortostática, ancianos polimedicados','Ortostática']
    ]}
  ],
  manobras:[
    { title:'Medición de la presión arterial en ortostatismo (prueba ortostática)', subtitle:'Evaluación de hipotensión ortostática',
      steps:['Mida la PA y FC con el paciente acostado, tras 5 minutos de reposo','Solicite que se levante y mida nuevamente la PA y FC tras 1 y 3 minutos de pie','Compare los valores y busque síntomas (mareo, oscurecimiento visual)'],
      normal:'Caída de la PA sistólica <20mmHg y de la diastólica <10mmHg, sin síntomas', abnormal:'Caída de la PA sistólica ≥20mmHg o diastólica ≥10mmHg, con síntomas (prueba ortostática positiva) → sugiere síncope ortostático/disautonomía' },
    { title:'Auscultación cardíaca dirigida', subtitle:'Triaje de causas cardíacas estructurales y arrítmicas de síncope',
      steps:['Ausculte los focos cardíacos en busca de soplos (especialmente sistólico en foco aórtico)','Evalúe ritmo cardíaco, frecuencia y regularidad','Busque signos de insuficiencia cardíaca (ingurgitación yugular, crepitaciones, edema)'],
      normal:'Ruidos normofonéticos, ritmo regular, sin soplos', abnormal:'Soplo sistólico en foco aórtico (sugiere estenosis aórtica), arritmia o signos de IC → eleva la sospecha de síncope cardíaco, indicando investigación cardiológica prioritaria' },
    { title:'Examen neurológico posictal', subtitle:'Evaluación de déficits focales y nivel de conciencia tras el episodio',
      steps:['Evalúe nivel de conciencia, orientación y tiempo de recuperación','Busque déficits motores o sensitivos focales (parálisis de Todd)','Evalúe la presencia de confusión mental prolongada característica del estado posictal'],
      normal:'Recuperación rápida de la conciencia, sin déficit focal residual', abnormal:'Confusión prolongada, déficit focal (parálisis de Todd) → sugiere crisis epiléptica, pudiendo indicar lesión estructural subyacente' },
    { title:'Inspección de la lengua', subtitle:'Búsqueda de mordedura lateral de la lengua',
      steps:['Examine los bordes laterales de la lengua en busca de laceraciones o marcas de mordedura','Diferencie de la mordedura en la punta de la lengua (inespecífica)'],
      normal:'Sin lesiones en la lengua', abnormal:'Mordedura lateral de la lengua → hallazgo con buena especificidad para crisis convulsiva tónico-clónica generalizada' }
  ],
  sinais:[
    { name:'Síncope de esfuerzo', eponym:'Signo de alarma cardiológico', how:'Pérdida de conciencia que ocurre durante o inmediatamente después del esfuerzo físico', means:'Debe considerarse siempre de causa cardíaca (arritmia, estenosis aórtica, miocardiopatía hipertrófica) hasta investigación completa — alto riesgo de muerte súbita' },
    { name:'Parálisis de Todd', eponym:'Robert Bentley Todd', how:'Déficit motor focal transitorio (paresia/plejía) que surge tras una crisis convulsiva y se resuelve en horas', means:'Confirma la naturaleza epiléptica del evento y puede enmascarar/mimetizar un ACV agudo en el período posictal' },
    { name:'Pródromo vagal', eponym:'Típico del síncope vasovagal', how:'Sensación de calor, sudoración fría, náusea, oscurecimiento visual y acúfeno segundos antes de la pérdida de conciencia', means:'Sugiere fuertemente síncope reflejo (vasovagal), de buen pronóstico, en contraste con el síncope cardíaco que suele ser súbito y sin aviso' }
  ],
  ddx:[
    ['Síncope vasovagal (reflejo)','Pródromo vagal típico, desencadenante identificable (dolor, calor, emoción, ortostatismo prolongado), recuperación rápida y completa, joven sin cardiopatía','Ausencia de pródromo, ocurrencia durante el esfuerzo, antecedente de cardiopatía estructural'],
    ['Síncope cardíaco (arritmia/estructural)','Inicio súbito sin aviso, ocurrencia durante el esfuerzo físico o en decúbito, palpitaciones/dolor torácico previos, antecedente personal/familiar de cardiopatía o muerte súbita','Pródromo vagal claro, desencadenante situacional típico, examen cardiovascular normal'],
    ['Crisis convulsiva (epilepsia)','Movimientos tónico-clónicos prolongados, mordedura lateral de la lengua, relajación esfinteriana, período posictal de confusión prolongada, puede ocurrir durante el sueño','Recuperación inmediata y completa de la conciencia, ausencia de período confusional, factor situacional típico de síncope'],
    ['Ataque isquémico transitorio (AIT)/causa neurológica focal','Síntomas neurológicos focales asociados (disartria, hemiparesia, alteraciones visuales), sin pérdida completa de conciencia en la mayoría de los casos, factores de riesgo cardiovascular','Pérdida completa y transitoria de conciencia con recuperación espontánea, sin déficit focal persistente']
  ],
  escalas:[
    { title:'Signos de alarma que sugieren causa cardíaca (investigación prioritaria)', headers:['Hallazgo','Relevancia'],
      rows:[['Síncope durante esfuerzo físico','Sugiere obstrucción al flujo (estenosis aórtica, miocardiopatía hipertrófica) o arritmia inducida por esfuerzo'],['Síncope en decúbito/sin pródromo','Sugiere arritmia maligna — alto riesgo de muerte súbita'],['Palpitaciones o dolor torácico precediendo el evento','Sugiere causa arrítmica/isquémica'],['Antecedente familiar de muerte súbita o cardiopatía hereditaria','Eleva la sospecha de canalopatías/miocardiopatías genéticas'],['ECG anormal (bloqueos, intervalo QT alterado, preexcitación)','Indica necesidad de investigación cardiológica y monitorización inmediatas']],
      note:'Cualquiera de estos hallazgos indica evaluación cardiológica urgente con monitorización — "el síncope de esfuerzo es cardíaco hasta demostrar lo contrario"' }
  ],
  conduta:{
    exames:['Electrocardiograma (ECG) — examen obligatorio en toda pérdida de conciencia transitoria, en busca de arritmias, bloqueos, QT largo, signos de isquemia o preexcitación','Glucemia capilar inmediata — excluir hipoglucemia como causa del evento','Electrolitos (sodio, potasio, calcio) y hemograma — buscar trastornos metabólicos/anemia como factores contribuyentes','Prueba ortostática (PA acostado x de pie) — evaluar hipotensión ortostática','Electroencefalograma (EEG) — si sospecha de crisis convulsiva, idealmente tras evaluación neurológica especializada','Tomografía/resonancia de cráneo — si déficit neurológico focal, primera crisis convulsiva en el adulto, trauma craneal asociado o sospecha de lesión estructural','Ecocardiograma y/o Holter/monitorización prolongada — si sospecha de causa cardíaca estructural o arrítmica'],
    drugs:['Tratamiento dirigido a la causa identificada — no hay medicación sintomática genérica para la pérdida de conciencia transitoria','Crisis convulsiva en actividad (estado epiléptico) → benzodiacepina IV (ej.: diazepam/lorazepam) según protocolo de emergencia','Hipoglucemia confirmada → corrección inmediata con glucosa','Síncope cardíaco por arritmia → derivación a cardiología para evaluación de marcapasos/DAI o terapia antiarrítmica según el caso'],
    steps:['1. Caracterizar minuciosamente el episodio (testigos, pródromos, duración, movimientos, relajación esfinteriana, recuperación) para diferenciar síncope de crisis convulsiva','2. Realizar ECG y glucemia capilar en todos los casos — exámenes de bajo costo y alto rendimiento diagnóstico inicial','3. Buscar signos de alarma cardíaco (síncope de esfuerzo, sin pródromo, palpitaciones previas, antecedente familiar de muerte súbita) — si están presentes, derivar para evaluación cardiológica urgente con monitorización','4. Sospecha de crisis convulsiva (mordedura lateral de la lengua, posictal prolongado, primera crisis) → derivar a neurología para EEG y considerar neuroimagen','5. Evaluar factores situacionales y medicamentos en uso (la polifarmacia en ancianos es causa frecuente de síncope ortostático)','6. Orientar sobre medidas de seguridad (evitar conducir/actividades de riesgo) hasta el esclarecimiento diagnóstico completo']
  }
},

'diarreia': {
  mnemonics:[
    { name:'Causas y mecanismos de la diarrea', rows:[
      ['Malabsortiva','Enfermedad celíaca, insuficiencia pancreática, sobrecrecimiento bacteriano'],
      ['Infecciosa aguda','Viral (rotavirus, norovirus), bacteriana (Salmonella, Shigella, E. coli), parasitaria'],
      ['Alimentaria/intolerancias','Intolerancia a la lactosa, ingesta de laxantes/edulcorantes (osmótica)'],
      ['Respuesta inflamatoria (EII)','Enfermedad de Crohn, colitis ulcerosa — sangre, moco, dolor abdominal'],
      ['Reducción de absorción (secretora)','Toxinas bacterianas, tumores neuroendocrinos — diarrea acuosa voluminosa, persiste en ayunas'],
      ['Endocrina/medicamentosa','Hipertiroidismo, diabetes (neuropatía autonómica), antibióticos, laxantes'],
      ['Intestino irritable (funcional)','Dolor abdominal asociado, alternancia con estreñimiento, sin signos de alarma'],
      ['SIDA/inmunosupresión','Infecciones oportunistas en inmunocomprometidos']
    ]}
  ],
  manobras:[
    { title:'Evaluación de signos de deshidratación', subtitle:'Gravedad de la diarrea aguda',
      steps:['Evaluar turgencia cutánea y mucosas','Medir PA y FC, buscar hipotensión postural','Evaluar diuresis y nivel de conciencia'],
      normal:'Mucosas húmedas, turgencia normal, signos vitales estables', abnormal:'Signos de deshidratación moderada a grave → necesidad de reposición volémica EV' },
    { title:'Tacto rectal', subtitle:'Evaluación de sangrado y masas (cuando esté indicado)',
      steps:['Explicar el procedimiento y obtener consentimiento','Inspeccionar la región perianal','Realizar tacto digital evaluando tono, presencia de masas y sangre en el guante'],
      normal:'Sin masas, sangre ni heces endurecidas', abnormal:'Sangre fresca/oculta, masa palpable, impactación fecal → investigar causa orgánica' },
    { title:'Examen abdominal', subtitle:'Identificar dolor localizado, distensión o masas',
      steps:['Inspección, auscultación, percusión y palpación de los cuadrantes','Buscar dolor a la palpación, distensión y masas'],
      normal:'Abdomen blando, indoloro, sin masas', abnormal:'Dolor localizado, masas palpables o distensión → investigar causa orgánica/inflamatoria' }
  ],
  sinais:[
    { name:'Sangre en las heces (hematoquecia/melena)', eponym:'Diarrea inflamatoria/invasiva', how:'Presencia visible de sangre o moco en las heces', means:'Sugiere EII, infección invasiva (Shigella, E. coli enterohemorrágica) o neoplasia — investigar con urgencia' },
    { name:'Fiebre alta asociada', eponym:'Diarrea infecciosa invasiva', how:'Temperatura >38,5°C acompañando el cuadro diarreico', means:'Sugiere etiología bacteriana invasiva — considerar coprocultivo y posible antibioticoterapia' },
    { name:'Signos sistémicos de toxemia', eponym:'Cuadro grave/complicado', how:'Taquicardia, hipotensión, alteración del estado mental, oliguria', means:'Señala deshidratación grave o sepsis de foco entérico — necesidad de internación y soporte intensivo' }
  ],
  ddx:[
    ['Diarrea infecciosa aguda','Inicio súbito, <2 semanas, posible fiebre, contactos/viajes recientes, autolimitada','Curso crónico (>4 semanas), pérdida de peso progresiva'],
    ['Enfermedad inflamatoria intestinal (EII)','Diarrea crónica con sangre/moco, dolor abdominal, pérdida de peso, manifestaciones extraintestinales','Episodio agudo autolimitado sin recurrencia'],
    ['Síndrome de intestino irritable','Dolor abdominal asociado al cambio del hábito intestinal, alivio con la defecación, sin signos de alarma, exámenes normales','Presencia de sangre, fiebre, pérdida de peso o alteraciones de laboratorio (signos de alarma)'],
    ['Diarrea malabsortiva (celíaca, insuficiencia pancreática)','Esteatorrea, pérdida de peso, deficiencias nutricionales, distensión abdominal posprandial','Heces de aspecto normal, sin signos de malabsorción'],
    ['Diarrea osmótica (intolerancias/laxantes)','Relación temporal con alimentos/medicamentos, mejora con el ayuno','Diarrea que persiste incluso en ayunas (sugiere secretora)']
  ],
  escalas:[
    { title:'Escala de Bristol (forma de las heces)', headers:['Tipo','Descripción'],
      rows:[['Tipo 1-2','Heces endurecidas/en trozos — estreñimiento'],['Tipo 3-4','Heces normales/bien formadas'],['Tipo 5','Heces pastosas con bordes definidos — tendencia a diarrea'],['Tipo 6-7','Heces pastosas/líquidas sin forma — diarrea']],
      note:'Útil para estandarizar la descripción del hábito intestinal y seguir la evolución' }
  ],
  conduta:{
    exames:['Hemograma, electrolitos y función renal (evaluar repercusión sistémica)','Coprocultivo y parasitológico de heces (diarrea persistente, sangre, fiebre alta, inmunosuprimidos)','Búsqueda de toxina de Clostridioides difficile (uso reciente de antibióticos)','Calprotectina fecal/marcadores inflamatorios (sospecha de EII)','Colonoscopia/endoscopia según sospecha de causa orgánica crónica'],
    drugs:['Hidratación oral (sales de rehidratación) o EV según gravedad','Antitérmicos/analgésicos sintomáticos (Dipirona/Paracetamol)','Loperamida con cautela (evitar si fiebre alta, sangre en las heces o sospecha de cuadro invasivo)','Antibioticoterapia dirigida solo en casos seleccionados: disentería, inmunosuprimidos, fiebre alta persistente, viaje a área de riesgo con cuadro grave (ej.: Azitromicina o Ciprofloxacino según sospecha)'],
    steps:['1. Caracterizar la diarrea (aguda x crónica, acuosa x con sangre/moco)','2. Evaluar gravedad de la deshidratación y signos de alarma','3. Hidratación adecuada (oral o EV)','4. Solicitar exámenes según signos de alarma o cronicidad','5. Reservar la antibioticoterapia para casos seleccionados (no usar empíricamente en la mayoría de las diarreas agudas)','6. Investigación adicional (endoscopia/colonoscopia) si cuadro crónico o signos de EII']
  }
},
'palpitacoes': {
  mnemonics:[
    { name:'Causas de palpitaciones', rows:[
      ['Pánico/ansiedad','Sensación de "corazón acelerado" asociada a síntomas de ansiedad, sudoración, disnea'],
      ['Uso de estimulantes','Cafeína, alcohol, tabaco, drogas ilícitas, descongestionantes'],
      ['Labilidad hormonal (tiroides)','Hipertiroidismo — taquicardia, pérdida de peso, temblor, intolerancia al calor'],
      ['Sangre (anemia)','Palidez, fatiga, disnea de esfuerzo, taquicardia compensatoria'],
      ['Arritmias','Fibrilación auricular, taquicardia supraventricular, extrasístoles, flutter auricular'],
      ['Repercusión estructural cardíaca','Valvulopatías, miocardiopatías, insuficiencia cardíaca']
    ]}
  ],
  manobras:[
    { title:'Palpación del pulso radial/carotídeo', subtitle:'Identificar irregularidad del ritmo',
      steps:['Palpar el pulso radial durante al menos 30-60 segundos','Evaluar frecuencia, ritmo (regular x irregular) y amplitud'],
      normal:'Pulso regular, frecuencia 60-100lpm', abnormal:'Pulso irregularmente irregular → sugiere fibrilación auricular; pulso rápido y regular → taquicardia supraventricular' },
    { title:'Maniobra de Valsalva', subtitle:'Maniobra vagal diagnóstica/terapéutica',
      steps:['Pida al paciente inspirar profundamente','Solicite que haga fuerza espiratoria contra la glotis cerrada por 10-15 segundos (como al defecar)','Monitorice FC y ritmo durante y después de la maniobra'],
      normal:'Variación discreta y transitoria de la FC', abnormal:'Reversión de taquicardia supraventricular o caída abrupta de la FC → respuesta vagal (ayuda al diagnóstico y tratamiento de la TSV)' },
    { title:'Auscultación cardíaca completa', subtitle:'Identificar arritmias y soplos',
      steps:['Auscultar en los 4 focos clásicos (aórtico, pulmonar, tricuspídeo, mitral)','Evaluar ritmo, frecuencia, presencia de soplos, R3/R4'],
      normal:'Ruidos rítmicos, normofonéticos, sin soplos', abnormal:'Ritmo irregular, soplos o ruidos accesorios → investigar arritmia o cardiopatía estructural' }
  ],
  sinais:[
    { name:'Síncope asociado', eponym:'Arritmia grave', how:'Pérdida transitoria de conciencia relacionada al episodio de palpitación', means:'Signo de alarma — sugiere arritmia con repercusión hemodinámica significativa, requiere evaluación urgente' },
    { name:'Dolor torácico concomitante', eponym:'Síndrome coronaria asociada', how:'Dolor o molestia torácica durante el episodio de palpitación', means:'Puede indicar isquemia miocárdica desencadenada por la arritmia — investigación cardiológica urgente' },
    { name:'Disnea asociada', eponym:'Repercusión hemodinámica', how:'Falta de aire durante o después del episodio de palpitación', means:'Sugiere repercusión hemodinámica de la arritmia o descompensación cardíaca subyacente' }
  ],
  ddx:[
    ['Arritmia cardíaca (FA, TSV, extrasístoles)','Pulso irregular o taquicardia documentada, ECG alterado, episodios súbitos y recurrentes','Pulso regular, ECG normal, síntomas claramente situacionales (estrés, cafeína)'],
    ['Ansiedad/trastorno de pánico','Episodios asociados a estrés, sudoración, sensación de muerte inminente, hiperventilación, ECG normal durante la crisis','Documentación de arritmia en monitor/ECG durante el episodio'],
    ['Tirotoxicosis','Pérdida de peso, temblor, intolerancia al calor, bocio, TSH suprimida','TSH normal, ausencia de signos hiperadrenérgicos'],
    ['Anemia','Palidez, fatiga, disnea de esfuerzo, hemoglobina baja','Hemoglobina normal']
  ],
  escalas:[
    { title:'Clasificación EHRA de síntomas en FA', headers:['Clase','Descripción'],
      rows:[['EHRA 1','Sin síntomas'],['EHRA 2a','Síntomas leves, no afectan las actividades diarias'],['EHRA 2b','Síntomas moderados, molestan pero no limitan'],['EHRA 3','Síntomas graves, afectan las actividades diarias'],['EHRA 4','Síntomas incapacitantes, interrumpen las actividades diarias']],
      note:'Ayuda a graduar el impacto sintomático de la fibrilación auricular y orientar la urgencia de la investigación/tratamiento' }
  ],
  conduta:{
    exames:['ECG de 12 derivaciones (preferentemente durante el episodio)','Holter de 24h o monitor de eventos (si episodios intermitentes)','Hemograma (anemia), TSH (tirotoxicosis)','Electrolitos (potasio, magnesio, calcio)','Ecocardiograma si sospecha de cardiopatía estructural'],
    drugs:['Maniobras vagales (Valsalva, masaje del seno carotídeo por especialista) para TSV','Betabloqueantes (ej.: Propranolol, Metoprolol) según evaluación cardiológica','Anticoagulación según escore de riesgo (CHA₂DS₂-VASc) en fibrilación auricular','Tratamiento de la causa de base (reposición de hierro en la anemia, tratamiento del hipertiroidismo)'],
    steps:['1. Caracterizar el episodio (inicio, duración, ritmo, síntomas asociados)','2. ECG inmediato — idealmente durante el episodio','3. Buscar signos de alarma (síncope, dolor torácico, disnea) → evaluación cardiológica urgente si están presentes','4. Maniobras vagales para sospecha de TSV sintomática estable','5. Investigación de laboratorio dirigida (hemograma, TSH, electrolitos)','6. Derivar a cardiología para monitorización prolongada y definición terapéutica según hallazgos']
  }
},
'sintomas-urinarios': {
  mnemonics:[
    { name:'Causas de disuria/síntomas urinarios', rows:[
      ['Uretritis/ITS','Secreción uretral, relación sexual de riesgo, disuria, Chlamydia/Gonococo'],
      ['Renal/litiasis','Cólico nefrítico, dolor lumbar irradiado a la ingle, hematuria'],
      ['Infección baja (cistitis)','Disuria, polaquiuria, urgencia miccional, dolor suprapúbico, sin fiebre alta'],
      ['Nefritis/pielonefritis (ITU alta)','Fiebre alta, escalofríos, dolor lumbar, Giordano positivo, compromiso sistémico'],
      ['Adenoma/prostatitis','Hombres — chorro urinario débil, dolor perineal, retención, tacto rectal alterado']
    ]}
  ],
  manobras:[
    { title:'Signo de Giordano (puñopercusión lumbar)', subtitle:'Sospecha de pielonefritis',
      steps:['Colocar al paciente sentado o de pie','Percutir suavemente la región lumbar (ángulo costovertebral) con el borde de la mano cerrada','Comparar ambos lados'],
      normal:'Sin dolor a la percusión', abnormal:'Dolor importante a la percusión lumbar (Giordano+) → sugiere pielonefritis o litiasis renal' },
    { title:'Examen de genitales externos', subtitle:'Investigación de uretritis/ITS',
      steps:['Inspeccionar meato uretral, presencia de secreción, lesiones o hiperemia','Palpar testículos y epidídimo en hombres; evaluar región vulvovaginal en mujeres'],
      normal:'Sin secreción, lesiones ni dolor a la palpación', abnormal:'Secreción uretral, lesiones ulceradas o dolor testicular → investigar ITS/epididimitis' },
    { title:'Tacto rectal (evaluación prostática)', subtitle:'Sospecha de prostatitis/hiperplasia prostática',
      steps:['Explicar el procedimiento y colocar al paciente adecuadamente','Realizar tacto rectal evaluando tamaño, consistencia, simetría y dolor de la próstata'],
      normal:'Próstata de tamaño normal, lisa, indolora, sin nódulos', abnormal:'Próstata aumentada, dolorosa y blanda (prostatitis aguda) o endurecida/nodular (sospecha neoplásica)' }
  ],
  sinais:[
    { name:'Fiebre alta + dolor lumbar', eponym:'Pielonefritis aguda', how:'Fiebre >38,5°C asociada a dolor lumbar unilateral y Giordano positivo', means:'Sugiere infección del tracto urinario alto — necesidad de tratamiento sistémico y posible internación' },
    { name:'Hematuria macroscópica', eponym:'Signo de alarma urológico', how:'Orina con coloración rojiza/parduzca visible a simple vista', means:'Puede indicar litiasis, infección complicada, neoplasia urotelial o glomerulopatía — investigación obligatoria' },
    { name:'Retención urinaria aguda', eponym:'Emergencia urológica', how:'Incapacidad súbita de orinar con vejiga distendida y dolor suprapúbico', means:'Requiere alivio inmediato (sondaje vesical) e investigación de la causa (HPB, prostatitis, obstrucción)' }
  ],
  ddx:[
    ['Cistitis (ITU baja)','Disuria, polaquiuria, urgencia, dolor suprapúbico, sin fiebre ni dolor lumbar','Fiebre alta, dolor lumbar, compromiso del estado general'],
    ['Pielonefritis (ITU alta)','Fiebre alta, escalofríos, dolor lumbar, Giordano+, náuseas/vómitos, compromiso sistémico','Síntomas restringidos al tracto urinario bajo, sin fiebre'],
    ['Uretritis/ITS','Secreción uretral, relación sexual de riesgo, pareja sintomática, disuria predominante al inicio de la micción','Ausencia de exposición sexual de riesgo, sin secreción'],
    ['Litiasis urinaria','Dolor lumbar tipo cólico irradiando a la ingle, hematuria, agitación, náuseas','Dolor continuo, ausencia de hematuria, imagen sin cálculo'],
    ['Prostatitis','Hombre, dolor perineal/suprapúbico, síntomas miccionales, próstata dolorosa al tacto, posible fiebre','Mujer, o tacto rectal normal']
  ],
  escalas:[
    { title:'Criterios para diferenciar ITU baja x alta', headers:['Hallazgo','ITU baja (cistitis)','ITU alta (pielonefritis)'],
      rows:[['Fiebre','Ausente/baja','Alta (>38,5°C)'],['Dolor lumbar/Giordano','Ausente','Presente'],['Estado general','Preservado','Comprometido (escalofríos, náuseas)'],['Conducta inicial','Tratamiento ambulatorio vía oral','Considerar internación/ATB parenteral según gravedad']],
      note:'Diferenciación fundamental para definir la vía de administración del antibiótico y la necesidad de internación' }
  ],
  conduta:{
    exames:['Orina rutina (sedimento)','Urocultivo con antibiograma','Hemograma + PCR (sospecha de pielonefritis)','Función renal (urea/creatinina)','USG de vías urinarias (litiasis, complicaciones)','Búsqueda de ITS (Chlamydia/Gonococo) si sospecha de uretritis'],
    drugs:['Cistitis no complicada: Nitrofurantoína 100mg c/12h por 5 días o Fosfomicina dosis única, o Sulfametoxazol-trimetoprima según sensibilidad local','Pielonefritis: Ciprofloxacino o Ceftriaxona según gravedad — considerar internación y ATB EV en casos graves','Uretritis/ITS: Ceftriaxona + Azitromicina (cobertura para gonococo y clamidia)','Analgesia/antiespasmódicos para cólico renal (ej.: Dipirona + Butilescopolamina), AINEs si no hay contraindicación'],
    steps:['1. Caracterizar los síntomas (disuria aislada x fiebre/dolor lumbar x secreción)','2. Examen físico dirigido (Giordano, genitales, tacto rectal si está indicado)','3. Solicitar sedimento + urocultivo antes de iniciar el antibiótico cuando sea posible','4. Diferenciar ITU baja (tratamiento ambulatorio) de ITU alta (considerar internación)','5. Tratar empíricamente según la presentación y ajustar por el antibiograma','6. Investigar causas estructurales (litiasis, HPB) si cuadros recurrentes o complicados']
  }
},
'lombalgia': {
  mnemonics:[
    { name:'Signos de alarma (red flags) en la lumbalgia', rows:[
      ['Trauma significativo','Caída de altura, accidente automovilístico — riesgo de fractura'],
      ['Urinario/intestinal (disfunción esfinteriana)','Retención urinaria, incontinencia fecal — sospecha de síndrome de cauda equina'],
      ['Neurológico (déficit progresivo)','Debilidad muscular progresiva, alteración sensitiva en silla de montar, pérdida de reflejos'],
      ['Anestesia en silla de montar','Hipoestesia perineal/perianal — emergencia neuroquirúrgica (cauda equina)'],
      ['Fiebre/infección','Fiebre, uso de drogas IV, inmunosupresión — sospecha de espondilodiscitis/absceso'],
      ['Edad (extremos)','<18 o >50 años con lumbalgia nueva — mayor riesgo de causa estructural/neoplásica'],
      ['Sin mejoría con el reposo (dolor nocturno)','Dolor que empeora de noche o no alivia en reposo — sugiere causa neoplásica/inflamatoria'],
      ['Historia de cáncer/pérdida de peso','Antecedente oncológico, adelgazamiento inexplicado — sospecha de metástasis ósea']
    ]}
  ],
  manobras:[
    { title:'Maniobra de Lasègue (elevación de la pierna extendida)', subtitle:'Evaluación de radiculopatía lumbar (L4-S1)',
      steps:['Paciente en decúbito dorsal, relajado','Eleve la pierna extendida lentamente, manteniendo la rodilla en extensión','Observe el ángulo en que aparece dolor irradiado al miembro inferior'],
      normal:'Elevación hasta 70-90° sin dolor irradiado (solo molestia posterior en el muslo)', abnormal:'Dolor radicular reproducido entre 30-70° de elevación (Lasègue+) → sugiere hernia discal/radiculopatía (generalmente L5-S1)' },
    { title:'Prueba de Patrick/FABERE', subtitle:'Evaluación de articulación sacroilíaca y cadera',
      steps:['Paciente en decúbito dorsal','Coloque el tobillo sobre la rodilla contralateral (posición de "4")','Aplique presión suave sobre la rodilla flexionada hacia la camilla'],
      normal:'Sin dolor — buena amplitud de movimiento', abnormal:'Dolor en la región sacroilíaca o en la cadera (Patrick+) → sugiere disfunción sacroilíaca o patología de cadera' },
    { title:'Palpación de puntos dolorosos paravertebrales', subtitle:'Evaluación de dolor mecánico/miofascial',
      steps:['Palpar la musculatura paravertebral lumbar y las apófisis espinosas','Evaluar contractura muscular, puntos gatillo y dolor a la palpación'],
      normal:'Musculatura sin espasmo, sin dolor a la palpación', abnormal:'Espasmo muscular, dolor localizado a la palpación → sugiere lumbalgia mecánica/miofascial' },
    { title:'Evaluación neurológica de miembros inferiores', subtitle:'Búsqueda de déficit radicular',
      steps:['Probar fuerza muscular segmentaria (dorsiflexión del hallux/pie - L5, flexión plantar - S1)','Evaluar sensibilidad en dermatomas correspondientes','Buscar reflejos rotuliano (L4) y aquíleo (S1)'],
      normal:'Fuerza, sensibilidad y reflejos preservados y simétricos', abnormal:'Déficit motor, hipoestesia o reflejo abolido → sugiere radiculopatía compresiva — investigar con imagen' }
  ],
  sinais:[
    { name:'Síndrome de cauda equina', eponym:'Emergencia neuroquirúrgica', how:'Retención urinaria, incontinencia fecal, anestesia en silla de montar, debilidad bilateral de miembros inferiores', means:'Compresión de las raíces de la cauda equina — requiere descompresión quirúrgica de urgencia para evitar secuelas permanentes' },
    { name:'Dolor nocturno que no mejora con el reposo', eponym:'Signo de alarma de causa neoplásica/inflamatoria', how:'Dolor que despierta al paciente de noche y no alivia con reposo o cambio de posición', means:'Sugiere proceso neoplásico (metástasis ósea), infeccioso (espondilodiscitis) o inflamatorio (espondiloartritis) — investigar con imagen' },
    { name:'Signo de Lasègue contralateral (cruzado)', eponym:'Hernia discal extruida', how:'Dolor irradiado al miembro evaluado al elevar el miembro contralateral', means:'Alta especificidad para hernia discal voluminosa que comprime la raíz nerviosa' }
  ],
  ddx:[
    ['Lumbalgia mecánica/inespecífica','Dolor relacionado con esfuerzo/postura, mejora con el reposo, sin irradiación ni déficit neurológico, examen neurológico normal','Dolor nocturno persistente, déficit neurológico, signos sistémicos'],
    ['Radiculopatía (hernia discal)','Dolor irradiado al miembro inferior en trayecto radicular, Lasègue+, déficit motor/sensitivo correspondiente al dermatoma','Dolor estrictamente lumbar sin irradiación, Lasègue negativo'],
    ['Causa sistémica/inflamatoria (espondiloartritis, espondilodiscitis)','Dolor inflamatorio (empeora en reposo/noche, mejora con el movimiento), rigidez matinal prolongada, fiebre, edad joven, marcadores inflamatorios elevados','Dolor de patrón mecánico, sin rigidez matinal ni signos sistémicos'],
    ['Causa neoplásica (metástasis ósea, mieloma)','Dolor progresivo, nocturno, refractario a la analgesia, pérdida de peso, historia oncológica, edad avanzada','Dolor de inicio reciente relacionado con esfuerzo, sin síntomas sistémicos'],
    ['Dolor visceral referido (aneurisma aórtico, enfermedad renal, pancreatitis)','Dolor lumbar asociado a síntomas viscerales (masa pulsátil, hematuria, síntomas digestivos), sin relación postural','Dolor reproducido a la palpación/movilización de la columna, sin síntomas viscerales asociados']
  ],
  escalas:[
    { title:'Signos de alarma (red flags) — triaje inicial', headers:['Categoría','Hallazgos de alerta'],
      rows:[['Síndrome de cauda equina','Retención urinaria, incontinencia fecal, anestesia en silla de montar, debilidad bilateral'],['Infección','Fiebre, uso de drogas IV, inmunosupresión, cirugía reciente de columna'],['Neoplasia','Historia de cáncer, pérdida de peso inexplicada, dolor nocturno progresivo, edad >50 años'],['Fractura','Trauma significativo, uso crónico de corticoide, osteoporosis, edad avanzada']],
      note:'La presencia de cualquier red flag indica necesidad de investigación con imagen y/o derivación urgente — no tratar solo como lumbalgia mecánica' }
  ],
  conduta:{
    exames:['Generalmente prescindible en las primeras 4-6 semanas si no hay red flags (lumbalgia aguda inespecífica)','Radiografía de columna lumbar (sospecha de fractura/espondilolistesis)','RM de columna lumbar — examen de elección si red flags, déficit neurológico progresivo o dolor persistente >6 semanas','Hemograma, VSG/PCR (sospecha de infección/neoplasia/causa inflamatoria)','PSA y electroforesis de proteínas según sospecha oncológica específica'],
    drugs:['Analgésicos simples: Paracetamol o Dipirona','AINEs (ej.: Ibuprofeno, Naproxeno) si no hay contraindicación','Relajantes musculares por corto período en casos de espasmo importante (ej.: Ciclobenzaprina)','Considerar derivación a fisioterapia precoz','Cauda equina/déficit neurológico progresivo → derivación neuroquirúrgica de urgencia'],
    steps:['1. Triaje activo de red flags (TUNAFISH) en la anamnesis y el examen físico','2. Ausencia de red flags → tratamiento sintomático, mantenerse activo, reevaluación en 4-6 semanas sin necesidad de imagen precoz','3. Presencia de red flags → solicitar imágenes dirigidas (RM preferentemente)','4. Signos de síndrome de cauda equina → derivación neuroquirúrgica de emergencia inmediata','5. Radiculopatía sin signos de alarma → tratamiento conservador inicial (analgesia, fisioterapia, actividad gradual)','6. Refractariedad al tratamiento conservador (6-12 semanas) → reevaluación especializada y consideración de tratamiento intervencionista/quirúrgico']
  }
},

'tosse': {
  mnemonics:[
    { name:'Causas de tos crónica (>8 semanas)', rows:[
      ['Goteo posnasal','Rinorrea, sensación de flema, empeora al acostarse'],
      ['Asma','Nocturna, frío/alérgenos, sibilancias, variabilidad del PEF'],
      ['Cardiovascular (ICC)','Ortopnea, crepitantes, BNP ↑'],
      ['IECA','Inicio tras IECA, seca irritativa, desaparece al suspender'],
      ['ERGE (reflujo)','Posprandial, nocturna, pirosis, mejora con IBP']
    ]}
  ],
  manobras:[
    { title:'Pico flujo (PEF)', subtitle:'Diagnóstico de asma — variabilidad',
      steps:['Paciente de pie','Inspiración máxima','Soplar con fuerza máxima en el medidor','Repetir 3x — registrar el mayor valor'],
      normal:'PEF >80% del previsto', abnormal:'<80% o variabilidad >20% → obstrucción bronquial → asma/EPOC' },
    { title:'Auscultación pulmonar', subtitle:'Patrones en la tos',
      steps:['6 puntos comparativos bilaterales','Fase inspiratoria y espiratoria'],
      normal:'Murmullo vesicular presente y simétrico', abnormal:'Sibilancias → broncoespasmo | Crepitantes focales → neumonía | Bibasales → ICC' }
  ],
  sinais:[
    { name:'Sibilancia espiratoria', eponym:'Broncoespasmo', how:'Ruido musical en la auscultación, espiración prolongada', means:'Asma (reversible) o EPOC (parcial) — Salbutamol para prueba terapéutica' },
    { name:'Dedos en palillo de tambor', eponym:'Hipoxemia crónica', how:'Pérdida del ángulo de Lovibond >180° en la base de la uña', means:'Enfermedad pulmonar crónica, neoplasia, bronquiectasia — investigar con TC' }
  ],
  ddx:[
    ['Goteo posnasal','Sensación de flema, empeora acostado, rinitis, mejora con antihistamínico','Sibilancias, fiebre, hemoptisis'],
    ['Asma','Nocturna, alérgenos, sibilancias, variabilidad PEF, atopía','Purulenta, fiebre, fumador >40 años'],
    ['Tos por IECA','Tras IECA, seca irritativa, mejora al suspender el IECA','Productiva, fiebre, antes del IECA'],
    ['ERGE','Posprandial, nocturna, pirosis, mejora con IBP','Sibilancias, variabilidad, esfuerzo'],
    ['Neumonía','Productiva purulenta, fiebre, dolor pleurítico, Rx con infiltrado','Crónica, seca, afebril, Rx normal'],
    ['Neoplasia','Fumador >40 años, hemoptisis, pérdida de peso, Rx con masa','Joven, sin tabaquismo, Rx normal, >8 sem sin alarma']
  ],
  escalas:[
    { title:'Gravedad de la crisis de asma', headers:['Criterio','Leve','Moderada','Grave'],
      rows:[['Disnea','Al caminar','En reposo','Frases incompletas'],['FR','<25','25-30','>30 rpm'],['Pico flujo','>70%','50-70%','<50%'],['SpO₂','>95%','91-95%','<91%']],
      note:'Grave: Salbutamol+Ipratropio+Corticoide EV+O₂; Sin mejoría → UCI' }
  ],
  conduta:{
    exames:['Rx tórax PA','Pico flujo','Espirometría (crónico)','Hemograma + PCR','TC tórax (sospecha de neoplasia o bronquiectasia)','Cultivo de esputo (neumonía grave)'],
    drugs:['Asma leve-mod: Salbutamol 2,5-5mg nebulización o spray','Asma grave: Prednisolona 40-50mg/día VO x5 días','Neumonía comunitaria: Amoxicilina 500mg c/8h x7d','IECA: Suspender → ARA (losartán)','ERGE: Omeprazol 20-40mg antes del desayuno'],
    steps:['1. ¿Aguda (<3sem), subaguda (3-8sem) o crónica (>8sem)?','2. Alarma: hemoptisis, pérdida de peso, tabaquismo, fiebre persistente, masa en Rx','3. Rx tórax para todos','4. FACTS — tratar la causa más probable','5. Crónica persistente: espirometría + TC tórax']
  }
},
'tontura-vertigem': {
  mnemonics:[
    { name:'Causas de mareo/vértigo', rows:[
      ['VPPB','Crisis breves (<1min) con cambio de posición de la cabeza'],
      ['Espontánea (Ménière)','Vértigo + acúfeno + hipoacusia fluctuante + plenitud auricular'],
      ['Reacción vestibular (neuritis)','Vértigo continuo, intenso, días, sin pérdida auditiva'],
      ['Tronco encefálico/ACV','Vértigo central + diplopía, disartria, ataxia, déficit focal'],
      ['Isquemia/arritmia','Presíncope, palpitaciones, relación con esfuerzo/postura'],
      ['Gravedad postural (hipotensión ortostática)','Mareo al levantarse, caída de PA >20/10mmHg'],
      ['Estímulos/medicamentos','Ototóxicos, antihipertensivos, sedantes, alcohol'],
      ['Migraña vestibular','Vértigo asociado a cefalea, fotofobia, antecedente de migraña']
    ]}
  ],
  manobras:[
    { title:'Dix-Hallpike', subtitle:'Diagnóstico de VPPB (canal posterior)',
      steps:['Paciente sentado, gire la cabeza 45° hacia un lado','Acueste rápidamente en decúbito dorsal con la cabeza colgando 20° bajo la camilla','Observe los ojos por 30-60s esperando nistagmo','Repita para el lado opuesto'],
      normal:'Sin nistagmo ni vértigo', abnormal:'Nistagmo rotatorio con latencia, fatigable y que reproduce el vértigo → VPPB del lado evaluado' },
    { title:'Prueba de Romberg', subtitle:'Evaluación del equilibrio/propiocepción',
      steps:['Paciente de pie, pies juntos, brazos al costado','Pida cerrar los ojos por 30s','Observe oscilación o caída'],
      normal:'Se mantiene estable con los ojos cerrados', abnormal:'Desequilibrio/caída al cerrar los ojos → disfunción vestibular o propioceptiva (Romberg+)' },
    { title:'Prueba de impulso cefálico (HINTS - Head Impulse)', subtitle:'Diferenciación periférico vs central',
      steps:['Pida al paciente fijar la mirada en su nariz','Gire la cabeza del paciente rápidamente 10-20° hacia un lado','Observe si los ojos permanecen fijos en el objetivo'],
      normal:'Los ojos permanecen fijos (sin sacada de corrección) → sugiere causa central (atención: HINTS "peligroso" cuando es normal en cuadro vertiginoso agudo)', abnormal:'Sacada de corrección (catch-up saccade) → lesión vestibular periférica' },
    { title:'Medición de PA ortostática', subtitle:'Hipotensión postural',
      steps:['Mida PA y FC con el paciente acostado tras 5 minutos de reposo','Mida nuevamente tras 1 y 3 minutos de pie'],
      normal:'Caída <20mmHg sistólica y <10mmHg diastólica', abnormal:'Caída ≥20/10mmHg con síntomas → hipotensión ortostática' }
  ],
  sinais:[
    { name:'Nistagmo vertical o que cambia de dirección', eponym:'Signo de alarma central', how:'Nistagmo bidireccional, vertical puro o no-fatigable al examen', means:'Sugiere lesión de tronco encefálico/cerebelo — investigar ACV vertebrobasilar' },
    { name:'Skew deviation (desviación ocular vertical)', eponym:'Componente del HINTS', how:'Un ojo se desvía verticalmente respecto al otro al cubrir alternadamente', means:'Fuerte indicio de causa central (tronco encefálico)' },
    { name:'Dismetría/disdiadococinesia', eponym:'Síndrome cerebelosa', how:'Error de blanco en la prueba índice-nariz y dificultad en movimientos alternos rápidos', means:'Sugiere lesión cerebelosa — vértigo central' }
  ],
  ddx:[
    ['VPPB','Crisis cortas (segundos a 1 min), desencadenadas por movimiento de la cabeza, Dix-Hallpike+, sin pérdida auditiva','Vértigo continuo >1h o síntomas neurológicos asociados'],
    ['Enfermedad de Ménière','Episodios de minutos a horas + acúfeno + hipoacusia fluctuante + plenitud auricular','Ausencia de síntomas auditivos, episodios muy breves'],
    ['Neuritis/laberintitis vestibular','Vértigo continuo intenso por días, náuseas/vómitos, sin síntomas auditivos (laberintitis: con hipoacusia)','Inicio súbito con déficit neurológico focal asociado'],
    ['Causa central (ACV/AIT vertebrobasilar)','Inicio súbito, cefalea occipital, diplopía, disartria, ataxia, déficit focal, HINTS sugestivo de central','Crisis cortas posicionales típicas de VPPB, síntomas auditivos aislados'],
    ['Hipotensión ortostática/causa cardiovascular','Mareo al levantarse, síncope, palpitaciones, caída de PA postural, arritmia en ECG','Vértigo rotatorio verdadero desencadenado por posición de la cabeza']
  ],
  escalas:[
    { title:'Examen HINTS (a pie de cama, vértigo agudo continuo)', headers:['Componente','Hallazgo periférico','Hallazgo central'],
      rows:[['Head Impulse','Sacada de corrección presente','Prueba normal (sin sacada)'],['Nystagmus','Unidireccional, horizontal, fatigable','Bidireccional, vertical o que cambia de dirección'],['Test of Skew','Ausente','Presente (desviación vertical)']],
      note:'"INFARCT" (Impulse Normal, Fast-phase Alternating, Refixation on Cover Test) sugiere causa central → indicación de neuroimagen urgente aun con TC inicial normal' }
  ],
  conduta:{
    exames:['Examen neurológico completo + otoscopia','Evaluación de PA acostado/de pie (ortostatismo)','ECG (arritmias)','Audiometría (si sospecha de Ménière/laberintitis)','RM de cráneo con difusión (sospecha de causa central — la TC tiene baja sensibilidad para fosa posterior)'],
    drugs:['Sintomáticos de corta duración: Dimenhidrinato 50mg VO/EV o Meclizina 25mg VO','Antiemético: Ondansetrón 4-8mg EV/VO','Evitar supresores vestibulares prolongados (retrasan la compensación central)','Corticoide (Prednisona) en neuritis vestibular según evaluación especializada'],
    steps:['1. Diferenciar central x periférico (HINTS, signos neurológicos, inicio y duración)','2. Signos de alarma central → neuroimagen urgente (RM) y evaluación neurológica','3. Sospecha de VPPB → confirmar con Dix-Hallpike y tratar con maniobra de Epley (reposicionamiento canalicular)','4. Sospecha de Ménière → derivar a otorrino, dieta hiposódica, diuréticos según evaluación','5. Hipotensión ortostática → revisar medicaciones, hidratación, medias de compresión','6. Reevaluación y seguimiento según evolución']
  }
},
'perda-peso': {
  mnemonics:[
    { name:'Causas de pérdida de peso involuntaria', rows:[
      ['Endocrino','Hipertiroidismo, diabetes mellitus descompensada, insuficiencia adrenal'],
      ['Maligno (neoplasia)','Adelgazamiento + síntomas B (fiebre, sudoración nocturna) — investigar siempre'],
      ['Aparato digestivo','EII, malabsorción, enfermedad celíaca, úlcera péptica'],
      ['Geriátrico/funcional','Disfagia, problemas dentales, aislamiento social, depresión'],
      ['Infecciones consumptivas','Tuberculosis, VIH/SIDA, endocarditis'],
      ['Emocional/psiquiátrico','Depresión, trastornos alimentarios (anorexia/bulimia), ansiedad'],
      ['Crónicas (enfermedades sistémicas)','EPOC, insuficiencia cardíaca, enfermedad renal crónica, hepatopatía'],
      ['Estimulantes/drogas/alcohol','Uso de sustancias, efectos adversos medicamentosos']
    ]}
  ],
  manobras:[
    { title:'Evaluación nutricional/IMC', subtitle:'Cuantificación de la pérdida de peso',
      steps:['Calcular % de pérdida respecto al peso habitual y tiempo transcurrido','IMC = peso(kg)/altura²(m)','Clasificar pérdida significativa: >5% en 1 mes o >10% en 6 meses'],
      normal:'Peso estable, IMC adecuado', abnormal:'Pérdida ≥5%/mes o ≥10%/6 meses → pérdida de peso clínicamente significativa, investigar' },
    { title:'Palpación de ganglios linfáticos', subtitle:'Rastreo de neoplasia/infección',
      steps:['Palpar cadenas cervicales, supraclaviculares, axilares e inguinales','Evaluar tamaño, consistencia, movilidad y dolor'],
      normal:'Ganglios no palpables o <1cm, móviles, indoloros', abnormal:'Adenomegalia endurecida, fija, indolora (especialmente supraclavicular - nódulo de Virchow) → investigar neoplasia' },
    { title:'Palpación de la tiroides', subtitle:'Rastreo de hipertiroidismo',
      steps:['Palpar la glándula durante la deglución, por detrás o por delante del paciente','Evaluar tamaño, nódulos, consistencia y frémito'],
      normal:'Tiroides no palpable o de tamaño normal, sin nódulos', abnormal:'Bocio difuso o nodular, frémito → investigar disfunción tiroidea' },
    { title:'Examen abdominal completo', subtitle:'Rastreo de masas y organomegalias',
      steps:['Inspección, auscultación, percusión y palpación sistemática de los cuadrantes','Buscar hepatomegalia, esplenomegalia y masas palpables'],
      normal:'Abdomen blando, sin masas ni organomegalias', abnormal:'Masa palpable, hepatoesplenomegalia → investigar causa neoplásica/infecciosa/hepática' }
  ],
  sinais:[
    { name:'Bocio', eponym:'Hipertiroidismo/enfermedad tiroidea', how:'Aumento visible o palpable de la glándula tiroides', means:'Sugiere disfunción tiroidea como causa del adelgazamiento' },
    { name:'Palidez cutaneomucosa', eponym:'Anemia asociada', how:'Coloración pálida de conjuntivas, mucosa oral y lechos ungueales', means:'Sugiere anemia — puede acompañar enfermedad consumptiva, neoplasia o malabsorción' },
    { name:'Caquexia', eponym:'Síndrome consumptiva', how:'Pérdida importante de masa muscular y grasa, debilidad, fatiga', means:'Signo de enfermedad sistémica avanzada — neoplasia, infección crónica (TB/VIH), insuficiencia orgánica terminal' }
  ],
  ddx:[
    ['Neoplasia maligna','Adelgazamiento progresivo, síntomas B, masa/adenomegalia, edad avanzada, tabaquismo','Ausencia de masas, exámenes de rastreo normales, mejora con tratamiento de causa benigna'],
    ['Hipertiroidismo','Pérdida de peso con aumento del apetito, taquicardia, temblor, intolerancia al calor, bocio','TSH normal, sin signos adrenérgicos'],
    ['Diabetes mellitus descompensada','Poliuria, polidipsia, polifagia con adelgazamiento, glucemia elevada','Glucemia normal, sin síntomas cardinales de DM'],
    ['Depresión/trastorno psiquiátrico','Ánimo deprimido, anhedonia, alteración del sueño y apetito, aislamiento social','Examen físico y laboratorio completamente normales no excluyen, pero ausencia de síntomas depresivos lo hace menos probable'],
    ['Enfermedad consumptiva/infecciosa (TB, VIH)','Fiebre, sudoración nocturna, tos crónica, factores de riesgo epidemiológicos, adenomegalia','Serologías e investigación infecciosa negativas'],
    ['EII/malabsorción','Diarrea crónica, dolor abdominal, sangre en las heces, deficiencias nutricionales','Tránsito intestinal normal, exámenes de malabsorción negativos']
  ],
  escalas:[
    { title:'Clasificación de pérdida de peso significativa (tiempo x porcentaje)', headers:['Período','% de pérdida considerada significativa','% considerada grave'],
      rows:[['1 semana','1-2%','>2%'],['1 mes','5%','>5%'],['3 meses','7,5%','>7,5%'],['6 meses','10%','>10%']],
      note:'Pérdida "grave" en el período exige investigación activa y prioritaria de la causa' }
  ],
  conduta:{
    exames:['Hemograma completo + VSG/PCR','Glucemia en ayunas/HbA1c','TSH y T4 libre','Función renal y hepática, electrolitos','Orina rutina','Rastreo de VIH y serologías según epidemiología','Radiografía de tórax ± TC según sospecha','Rastreo oncológico orientado por edad/sexo (endoscopia, colonoscopia, mamografía, etc.)'],
    drugs:['Tratamiento dirigido a la causa identificada (no hay tratamiento sintomático específico)','Soporte nutricional/suplementación según evaluación','Derivación a especialista según hallazgos (endocrinología, oncología, psiquiatría, gastroenterología)'],
    steps:['1. Confirmar y cuantificar la pérdida de peso (peso habitual x actual x tiempo)','2. Anamnesis dirigida: apetito, síntomas B, hábito intestinal, ánimo, medicaciones, contexto social','3. Examen físico completo (ganglios, tiroides, abdomen, estado nutricional)','4. Rastreo laboratorial amplio inicial','5. Investigación dirigida según la hipótesis más probable (imagen, endoscopia, serologías)','6. Derivar a especialista si hay hallazgos sugestivos de neoplasia o enfermedad sistémica grave']
  }
},
'nauseas-vomitos': {
  mnemonics:[
    { name:'Causas de náuseas y vómitos', rows:[
      ['Vestibular/SNC','Vértigo, laberintitis, hipertensión intracraneal, migraña'],
      ['Obstrucción/causas GI','Obstrucción intestinal, gastroparesia, úlcera péptica, colecistitis'],
      ['Medicamentos/toxinas','Quimioterápicos, opioides, antiinflamatorios, alcohol, intoxicaciones'],
      ['Infección','Gastroenteritis viral/bacteriana, ITU, meningitis'],
      ['Trastornos metabólicos','Cetoacidosis diabética, uremia, hipercalcemia, insuficiencia adrenal'],
      ['Abdomen agudo','Apendicitis, pancreatitis, obstrucción, isquemia mesentérica'],
      ['Reproductivo (embarazo)','Hiperémesis gravídica, primer trimestre de gestación']
    ]}
  ],
  manobras:[
    { title:'Evaluación de signos de deshidratación', subtitle:'Gravedad del cuadro de vómitos',
      steps:['Evaluar turgencia cutánea (pliegue cutáneo)','Inspeccionar mucosas orales (humedad)','Evaluar tiempo de relleno capilar y nivel de conciencia','Medir PA y FC (hipotensión/taquicardia postural)'],
      normal:'Mucosas húmedas, turgencia normal, signos vitales estables', abnormal:'Mucosas secas, turgencia disminuida, taquicardia, hipotensión → deshidratación significativa' },
    { title:'Examen abdominal sistemático', subtitle:'Identificar causa abdominal',
      steps:['Inspección, auscultación de ruidos hidroaéreos, percusión y palpación','Buscar distensión, masas, dolor localizado y signos de irritación peritoneal'],
      normal:'Abdomen blando, ruidos hidroaéreos normales, sin dolor a la palpación', abnormal:'Distensión, ruidos hidroaéreos aumentados ("de lucha") o ausentes, dolor localizado → investigar obstrucción/abdomen agudo' },
    { title:'Signo de Murphy', subtitle:'Sospecha de colecistitis',
      steps:['Palpar el hipocondrio derecho (punto cístico)','Pedir al paciente inspirar profundamente durante la palpación'],
      normal:'Inspiración completa sin dolor', abnormal:'Interrupción súbita de la inspiración por dolor (Murphy+) → sugiere colecistitis aguda' }
  ],
  sinais:[
    { name:'Vómitos biliosos', eponym:'Obstrucción intestinal baja/pospilórica', how:'Vómito de coloración verdosa/amarillenta (bilis)', means:'Sugiere obstrucción por debajo de la ampolla de Vater — investigación urgente' },
    { name:'Vómitos fecaloides', eponym:'Obstrucción intestinal avanzada', how:'Vómito con olor y aspecto fecal', means:'Signo de obstrucción intestinal baja avanzada o fístula — emergencia quirúrgica' },
    { name:'Hematemesis', eponym:'Sangrado digestivo alto', how:'Vómito con sangre fresca o en "borra de café"', means:'Sugiere úlcera péptica, várices esofágicas o laceración de Mallory-Weiss — riesgo de inestabilidad hemodinámica' },
    { name:'Signos de hipertensión intracraneal', eponym:'Causa central de vómitos', how:'Cefalea matinal, vómitos en proyectil sin náusea previa, papiledema, alteración del nivel de conciencia', means:'Sugiere lesión intracraneal — investigación neurológica de urgencia' }
  ],
  ddx:[
    ['Gastroenteritis aguda','Inicio agudo, diarrea asociada, contactos con síntomas similares, febrícula','Vómitos persistentes sin diarrea, signos de abdomen agudo'],
    ['Obstrucción intestinal','Distensión abdominal, parada de eliminación de gases/heces, vómitos biliosos/fecaloides, RHA aumentados/ausentes','Tránsito intestinal preservado, abdomen plano e indoloro'],
    ['Causa central (HIC, migraña, vestibular)','Cefalea, vértigo, alteración neurológica, vómitos en proyectil sin náusea previa','Dolor abdominal prominente, signos de irritación peritoneal'],
    ['Causa metabólica (cetoacidosis, uremia)','Antecedente de diabetes/enfermedad renal, aliento cetónico, alteración del estado mental, laboratorio alterado','Glucemia y función renal normales'],
    ['Embarazo/hiperémesis gravídica','Mujer en edad fértil, atraso menstrual, β-HCG positivo, síntomas en el 1er trimestre','β-HCG negativo']
  ],
  escalas:[
    { title:'Criterios de gravedad de la deshidratación (OMS, adaptado)', headers:['Signo','Leve','Moderada','Grave'],
      rows:[['Estado general','Alerta','Irritado/somnoliento','Letárgico/inconsciente'],['Mucosas','Húmedas','Secas','Muy secas'],['Turgencia cutánea','Normal','Disminuida','Muy disminuida (el pliegue persiste)'],['Pulso/PA','Normales','Levemente alterados','Taquicardia/hipotensión']],
      note:'La deshidratación grave exige reposición volémica EV inmediata y reevaluación continua' }
  ],
  conduta:{
    exames:['Hemograma, electrolitos, función renal','Glucemia y gasometría (si sospecha metabólica)','β-HCG en mujeres en edad fértil','Amilasa/lipasa (sospecha de pancreatitis)','Imagen abdominal (USG/TC) según sospecha de causa estructural','TC de cráneo si hay signos de alarma neurológico'],
    drugs:['Hidratación oral o EV según grado de deshidratación (Ringer lactato/SF 0,9%)','Ondansetrón 4-8mg EV/VO o Metoclopramida 10mg EV/VO','Corrección de trastornos electrolíticos y metabólicos identificados','Evitar antieméticos que enmascaren un cuadro de abdomen agudo hasta la definición diagnóstica'],
    steps:['1. Evaluar gravedad de la deshidratación y signos de alarma (sangre, vómito bilioso/fecaloide, signos neurológicos)','2. Hidratación adecuada según gravedad (oral leve/moderada, EV si grave o intolerancia)','3. Antieméticos sintomáticos cuando sea seguro','4. Investigar la causa de base según el contexto clínico (GI, metabólica, central, gestacional)','5. Tratar la causa específica identificada','6. Reevaluar la respuesta al tratamiento y la necesidad de internación']
  }
},

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
        if(re[2] != null) rp[5] = re[2];
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
