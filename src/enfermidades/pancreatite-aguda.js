// Enfermidade: pancreatite aguda — fonte canônica (editar AQUI; rodar scripts/build.js)
// STATUS: RASCUNHO. Escrito a partir do guia clínico já existente em src/motivos/pancreatite-aguda.js
// e de conhecimento geral. NADA foi conferido contra os livros: refs com verificada:false.
// Doses ficam no guia do motivo até terem refs; aqui só a classe do fármaco.
AM.enfermidade("pancreatite-aguda", {
  "name": "Pancreatite aguda",
  "nameEs": "Pancreatitis aguda",
  "especialidade": "cirurgia",
  "cid10": ["K85"],
  "cie10": ["K85"],
  "motivos": ["pancreatite-aguda", "dor-abdominal", "nauseas-vomitos"],

  "definicao": "Inflamação aguda do pâncreas, de início súbito, com resposta inflamatória local e, nos casos graves, sistêmica, e com possível falência de órgãos.",
  "definicaoEs": "Inflamación aguda del páncreas, de inicio súbito, con respuesta inflamatoria local y, en los casos graves, sistémica, y con posible falla de órganos.",

  "epidemiologia": "As causas mais frequentes são a litíase biliar e o álcool. Outras: hipertrigliceridemia, hipercalcemia, pós-CPRE, fármacos, trauma, causas autoimunes e infecciosas. Parte dos casos é idiopática. Em algumas regiões o álcool é a primeira causa.",
  "epidemiologiaEs": "Las causas más frecuentes son la litiasis biliar y el alcohol. Otras: hipertrigliceridemia, hipercalcemia, post-CPRE, fármacos, trauma, causas autoinmunes e infecciosas. Parte de los casos es idiopática. En algunas regiones el alcohol es la primera causa.",

  "fisiopatologia": "Ativação intrapancreática prematura de enzimas digestivas (tripsinogênio em tripsina) provoca autodigestão da glândula, inflamação e liberação de mediadores. A resposta inflamatória pode ser local (edema, coleções, necrose) ou sistêmica (SIRS, falência de órgãos). A doença tem uma fase precoce (primeira semana, dominada pela resposta inflamatória) e uma fase tardia (complicações locais). A necrose, inicialmente estéril, pode se infectar nas semanas seguintes.",
  "fisiopatologiaEs": "La activación intrapancreática prematura de enzimas digestivas (tripsinógeno en tripsina) provoca autodigestión de la glándula, inflamación y liberación de mediadores. La respuesta inflamatoria puede ser local (edema, colecciones, necrosis) o sistémica (SIRS, falla de órganos). La enfermedad tiene una fase precoz (primera semana, dominada por la respuesta inflamatoria) y una fase tardía (complicaciones locales). La necrosis, inicialmente estéril, puede infectarse en las semanas siguientes.",

  "quadroClinico": {
    "sintomas": [
      "Dor epigástrica intensa, de início súbito, em faixa, com irradiação para o dorso",
      "Náuseas e vômitos",
      "Piora da dor ao decúbito dorsal e alívio parcial com o tronco inclinado para a frente"
    ],
    "sintomasEs": [
      "Dolor epigástrico intenso, de inicio súbito, en faja, con irradiación al dorso",
      "Náuseas y vómitos",
      "Empeoramiento del dolor en decúbito dorsal y alivio parcial con el tronco inclinado hacia delante"
    ],
    "sinais": [
      "Dor à palpação do epigástrio, com defesa nos casos mais graves",
      "Taquicardia, febre baixa e sinais de desidratação",
      "Sinais de Cullen e de Grey-Turner (equimoses periumbilical e em flancos) na forma hemorrágica grave, tardios e pouco frequentes"
    ],
    "sinaisEs": [
      "Dolor a la palpación del epigastrio, con defensa en los casos más graves",
      "Taquicardia, fiebre baja y signos de deshidratación",
      "Signos de Cullen y de Grey-Turner (equimosis periumbilical y en flancos) en la forma hemorrágica grave, tardíos y poco frecuentes"
    ],
    "formasAtipicas": [
      "Dor menos intensa em alguns pacientes, incluindo idosos",
      "Choque e insuficiência respiratória como apresentação inicial nas formas graves"
    ],
    "formasAtipicasEs": [
      "Dolor menos intenso en algunos pacientes, incluidos los ancianos",
      "Shock e insuficiencia respiratoria como presentación inicial en las formas graves"
    ]
  },

  "diagnostico": {
    "criterios": [
      "Diagnóstico com 2 de 3 critérios: dor abdominal típica; lipase (ou amilase) maior que 3 vezes o limite superior; achados característicos em imagem. A imagem só é necessária se a dor ou as enzimas forem duvidosas; evitar TC precoce",
      "Gravidade (classificação de Atlanta revisada): leve (sem falência de órgão nem complicação local), moderadamente grave (falência transitória, até 48 h, complicação local ou exacerbação de comorbidade) e grave (falência de órgão persistente, acima de 48 h). A falência de órgão é definida pelo escore de Marshall modificado; existe ainda a classificação por determinantes (2012) como alternativa",
      "Escores de apoio ao prognóstico: BISAP e Ranson. A PCR em 48 h (ponto de corte usual de 150 mg/L) também auxilia, mas não é um escore [conferir]"
    ],
    "criteriosEs": [
      "Diagnóstico con 2 de 3 criterios: dolor abdominal típico; lipasa (o amilasa) mayor de 3 veces el límite superior; hallazgos característicos en imagen. La imagen solo es necesaria si el dolor o las enzimas son dudosos; evitar la TC precoz",
      "Gravedad (clasificación de Atlanta revisada): leve (sin falla de órgano ni complicación local), moderadamente grave (falla transitoria, hasta 48 h, complicación local o exacerbación de comorbilidad) y grave (falla de órgano persistente, más de 48 h). La falla de órgano se define por la puntuación de Marshall modificada; existe además la clasificación por determinantes (2012) como alternativa",
      "Escalas de apoyo al pronóstico: BISAP y Ranson. La PCR a las 48 h (punto de corte habitual de 150 mg/L) también ayuda, pero no es una escala [verificar]"
    ],
    "exames": [
      { "nome": "Lipase (preferível) e amilase", "nomeEs": "Lipasa (preferible) y amilasa",
        "achado": "Elevação acima de 3 vezes o limite superior sustenta o diagnóstico; o valor não indica a gravidade", "achadoEs": "Elevación por encima de 3 veces el límite superior sustenta el diagnóstico; el valor no indica la gravedad",
        "quando": "Em toda dor abdominal alta suspeita", "quandoEs": "En todo dolor abdominal alto sospechoso" },
      { "nome": "Hemograma, ureia, creatinina, glicemia, cálcio, eletrólitos", "nomeEs": "Hemograma, urea, creatinina, glucemia, calcio, electrolitos",
        "achado": "Avaliam gravidade, desidratação e causas (hipercalcemia)", "achadoEs": "Evalúan gravedad, deshidratación y causas (hipercalcemia)",
        "quando": "Na admissão", "quandoEs": "Al ingreso" },
      { "nome": "TGO, TGP, FA, GGT, bilirrubinas", "nomeEs": "AST, ALT, FA, GGT, bilirrubinas",
        "achado": "Elevação de TGP (ALT), sobretudo acima de 3 vezes o limite superior, sugere causa biliar [conferir]; padrão colestático sugere obstrução", "achadoEs": "Elevación de ALT, sobre todo por encima de 3 veces el límite superior, sugiere causa biliar [verificar]; patrón colestásico sugiere obstrucción",
        "quando": "Na admissão, para buscar a causa", "quandoEs": "Al ingreso, para buscar la causa" },
      { "nome": "Triglicerídeos", "nomeEs": "Triglicéridos",
        "achado": "Valores muito elevados (em geral acima de 1.000 mg/dL) indicam hipertrigliceridemia como causa", "achadoEs": "Valores muy elevados (en general por encima de 1.000 mg/dL) indican hipertrigliceridemia como causa",
        "quando": "Se a causa não for biliar nem alcoólica", "quandoEs": "Si la causa no es biliar ni alcohólica" },
      { "nome": "Ultrassonografia de abdome", "nomeEs": "Ecografía abdominal",
        "achado": "Pesquisa cálculos na vesícula e dilatação da via biliar; não exclui microlitíase", "achadoEs": "Busca cálculos en la vesícula y dilatación de la vía biliar; no excluye microlitiasis",
        "quando": "Em todos, para a etiologia biliar", "quandoEs": "En todos, para la etiología biliar" },
      { "nome": "TC de abdome com contraste", "nomeEs": "TC de abdomen con contraste",
        "achado": "Necrose e coleções; melhor avaliada após as primeiras 72 h", "achadoEs": "Necrosis y colecciones; mejor evaluada tras las primeras 72 h",
        "quando": "Dúvida diagnóstica ou suspeita de complicação, sem melhora clínica", "quandoEs": "Duda diagnóstica o sospecha de complicación, sin mejoría clínica" }
    ],
    "diferenciais": [
      { "id": "colecistite-colelitiase", "pista": "Dor em hipocôndrio direito, Murphy positivo, enzimas pancreáticas normais", "pistaEs": "Dolor en hipocondrio derecho, Murphy positivo, enzimas pancreáticas normales" },
      { "id": "oclusao-intestinal", "pista": "Distensão, parada de eliminação de fezes e gases, níveis hidroaéreos", "pistaEs": "Distensión, detención de eliminación de heces y gases, niveles hidroaéreos" },
      { "nome": "Úlcera péptica perfurada", "nomeEs": "Úlcera péptica perforada", "pista": "Dor súbita, abdome em tábua, pneumoperitônio", "pistaEs": "Dolor súbito, abdomen en tabla, neumoperitoneo" },
      { "nome": "Infarto de parede inferior", "nomeEs": "Infarto de pared inferior", "pista": "Dor epigástrica com sudorese, ECG alterado, troponina elevada", "pistaEs": "Dolor epigástrico con sudoración, ECG alterado, troponina elevada" },
      { "nome": "Isquemia mesentérica", "nomeEs": "Isquemia mesentérica", "pista": "Dor desproporcional ao exame, acidose láctica", "pistaEs": "Dolor desproporcionado al examen, acidosis láctica" },
      { "nome": "Aneurisma de aorta roto", "nomeEs": "Aneurisma de aorta roto", "pista": "Dor com massa pulsátil e choque", "pistaEs": "Dolor con masa pulsátil y shock" },
      { "nome": "Dissecção aórtica", "nomeEs": "Disección aórtica", "pista": "Dor súbita e lancinante, diferença de pressão entre os braços", "pistaEs": "Dolor súbito y desgarrante, diferencia de presión entre los brazos" },
      { "nome": "Pielonefrite ou cólica renal", "nomeEs": "Pielonefritis o cólico renal", "pista": "Dor lombar, alterações na urina, lipase normal", "pistaEs": "Dolor lumbar, alteraciones en la orina, lipasa normal" }
    ]
  },

  "tratamento": {
    "medidas": [
      "Hidratação venosa precoce, guiada por metas e por reavaliação frequente, preferencialmente com Ringer lactato, evitando excesso de volume",
      "Analgesia adequada, com opioide quando necessário",
      "Dieta oral precoce (em 24 a 48 h), conforme a tolerância; nutrição enteral, por sonda nasogástrica ou nasojejunal, se não houver tolerância à via oral (preferível à parenteral)",
      "Tratar a causa: interromper o consumo de álcool, controlar triglicerídeos e cálcio, tratar a causa biliar",
      "Formas graves ou com falência de órgão: cuidados intensivos"
    ],
    "medidasEs": [
      "Hidratación intravenosa precoz, guiada por metas y por reevaluación frecuente, preferentemente con Ringer lactato, evitando el exceso de volumen",
      "Analgesia adecuada, con opioide cuando sea necesario",
      "Dieta oral precoz (en 24 a 48 h), según la tolerancia; nutrición enteral, por sonda nasogástrica o nasoyeyunal, si no hay tolerancia a la vía oral (preferible a la parenteral)",
      "Tratar la causa: interrumpir el consumo de alcohol, controlar triglicéridos y calcio, tratar la causa biliar",
      "Formas graves o con falla de órgano: cuidados intensivos"
    ],
    "farmacologico": [
      { "classe": "Analgésicos (incluindo opioide) e antieméticos", "classeEs": "Analgésicos (incluido opioide) y antieméticos", "nota": "Sintomáticos; doses a preencher com referência", "notaEs": "Sintomáticos; dosis a completar con referencia", "refs": [0, 1] },
      { "classe": "Antibióticos", "classeEs": "Antibióticos", "nota": "Não usar de forma profilática. Indicados na necrose infectada e na colangite aguda; esquema a preencher com referência", "notaEs": "No usar de forma profiláctica. Indicados en la necrosis infectada y en la colangitis aguda; esquema a completar con referencia", "refs": [1] }
    ],
    "cirurgico": [
      "CPRE urgente (em até 24 h) se houver colangite aguda; sem colangite não há indicação de CPRE precoce, mesmo com obstrução biliar [conferir]",
      "Pancreatite biliar leve: colecistectomia na mesma internação; na forma grave ou necrosante, adiar até a resolução das coleções (cerca de 6 semanas) [conferir]",
      "Necrose infectada: abordagem escalonada (drenagem e, se necessário, desbridamento), preferencialmente após cerca de 4 semanas, com a necrose encapsulada [conferir]"
    ],
    "cirurgicoEs": [
      "CPRE urgente (en hasta 24 h) si hay colangitis aguda; sin colangitis no hay indicación de CPRE precoz, incluso con obstrucción biliar [verificar]",
      "Pancreatitis biliar leve: colecistectomía en el mismo ingreso; en la forma grave o necrosante, diferir hasta la resolución de las colecciones (alrededor de 6 semanas) [verificar]",
      "Necrosis infectada: abordaje escalonado (drenaje y, si es necesario, desbridamiento), preferentemente tras unas 4 semanas, con la necrosis encapsulada [verificar]"
    ],
    "encaminhar": "Internação em todos os casos; unidade de terapia intensiva se houver falência de órgão ou instabilidade.",
    "encaminharEs": "Ingreso en todos los casos; unidad de cuidados intensivos si hay falla de órgano o inestabilidad."
  },

  "complicacoes": ["Necrose pancreática e peripancreática", "Coleção líquida aguda e coleção necrótica aguda", "Pseudocisto e necrose encapsulada", "Infecção da necrose", "Hipertensão intra-abdominal", "Falência de órgãos (respiratória, renal, circulatória)", "Hemorragia, trombose venosa esplâncnica", "Diabetes e insuficiência pancreática exócrina tardias"],
  "complicacoesEs": ["Necrosis pancreática y peripancreática", "Colección líquida aguda y colección necrótica aguda", "Pseudoquiste y necrosis encapsulada", "Infección de la necrosis", "Hipertensión intraabdominal", "Falla de órganos (respiratoria, renal, circulatoria)", "Hemorragia, trombosis venosa esplácnica", "Diabetes e insuficiencia pancreática exocrina tardías"],
  "prognostico": "A maioria dos casos é leve e evolui bem. A mortalidade aumenta com a falência de órgão persistente e com a necrose infectada (cerca de 20 a 40% quando se associam) [conferir].",
  "prognosticoEs": "La mayoría de los casos es leve y evoluciona bien. La mortalidad aumenta con la falla de órgano persistente y con la necrosis infectada (alrededor del 20 al 40% cuando se asocian) [verificar].",
  "sinaisAlarme": ["Hipotensão ou choque", "Insuficiência respiratória", "Oligúria ou piora da função renal", "Alteração do nível de consciência", "Colangite associada (febre, icterícia, dor em hipocôndrio direito)"],
  "sinaisAlarmeEs": ["Hipotensión o shock", "Insuficiencia respiratoria", "Oliguria o empeoramiento de la función renal", "Alteración del nivel de conciencia", "Colangitis asociada (fiebre, ictericia, dolor en hipocondrio derecho)"],

  "casos": [
    {
      "titulo": "Dor em faixa depois de uma festa",
      "tituloEs": "Dolor en faja después de una fiesta",
      "nivel": "basico",
      "apresentacao": "Homem de 45 anos, com dor epigástrica intensa há 12 horas, que irradia para as costas e piora deitado. Teve vários vômitos. Bebeu bastante álcool na noite anterior. Sem febre. Caso fictício.",
      "apresentacaoEs": "Hombre de 45 años, con dolor epigástrico intenso desde hace 12 horas, que irradia a la espalda y empeora acostado. Tuvo varios vómitos. Bebió mucho alcohol la noche anterior. Sin fiebre. Caso ficticio.",
      "etapas": [
        {
          "dados": "Frequência cardíaca 108 bpm, mucosas secas. Abdome com dor à palpação do epigástrio, sem defesa. Lipase 5 vezes o limite superior.",
          "dadosEs": "Frecuencia cardíaca 108 lpm, mucosas secas. Abdomen con dolor a la palpación del epigastrio, sin defensa. Lipasa 5 veces el límite superior.",
          "pergunta": "Qual é o diagnóstico mais provável?",
          "perguntaEs": "¿Cuál es el diagnóstico más probable?",
          "opcoes": ["Úlcera péptica perfurada", "Pancreatite aguda", "Colecistite aguda", "Infarto de parede inferior"],
          "opcoesEs": ["Úlcera péptica perforada", "Pancreatitis aguda", "Colecistitis aguda", "Infarto de pared inferior"],
          "correta": 1,
          "comentario": "Dor típica em faixa e lipase acima de 3 vezes o limite superior fecham 2 dos 3 critérios diagnósticos.",
          "comentarioEs": "El dolor típico en faja y la lipasa por encima de 3 veces el límite superior cumplen 2 de los 3 criterios diagnósticos."
        },
        {
          "dados": "Ultrassonografia sem cálculos na vesícula (o que não exclui microlitíase). TGP, cálcio e triglicerídeos normais. Paciente com náuseas e dor intensa.",
          "dadosEs": "Ecografía sin cálculos en la vesícula (lo que no excluye microlitiasis). ALT, calcio y triglicéridos normales. Paciente con náuseas y dolor intenso.",
          "pergunta": "Qual conduta inicial é a mais adequada?",
          "perguntaEs": "¿Qué conducta inicial es la más adecuada?",
          "opcoes": ["Antibiótico profilático e jejum prolongado", "Hidratação venosa, analgesia e dieta oral precoce conforme a tolerância", "Laparotomia exploradora", "CPRE de urgência em todos os casos"],
          "opcoesEs": ["Antibiótico profiláctico y ayuno prolongado", "Hidratación intravenosa, analgesia y dieta oral precoz según la tolerancia", "Laparotomía exploradora", "CPRE de urgencia en todos los casos"],
          "correta": 1,
          "comentario": "O tratamento é de suporte: hidratação, analgesia e realimentação precoce. Antibiótico profilático não é indicado, e a CPRE urgente é reservada à colangite.",
          "comentarioEs": "El tratamiento es de soporte: hidratación, analgesia y realimentación precoz. El antibiótico profiláctico no está indicado, y la CPRE urgente se reserva para la colangitis."
        }
      ],
      "diagnostico": "pancreatite-aguda",
      "perolas": ["A lipase não mede a gravidade: um valor muito alto não significa um caso pior.", "Sempre procurar a causa: biliar, álcool, triglicerídeos e cálcio."],
      "perolasEs": ["La lipasa no mide la gravedad: un valor muy alto no significa un caso peor.", "Siempre buscar la causa: biliar, alcohol, triglicéridos y calcio."]
    }
  ],

  "refs": [
    { "tipo": "livro", "citacao": "Townsend CM et al. Sabiston Textbook of Surgery (pâncreas). Edição mais recente usada pelo dono.", "localizacao": "[conferir capítulo/página]", "verificada": false },
    { "tipo": "diretriz", "citacao": "Tenner S et al. American College of Gastroenterology Guidelines: Management of Acute Pancreatitis. Am J Gastroenterol 2024;119:419-437.", "localizacao": "[conferir]", "ano": 2024, "verificada": false },
    { "tipo": "artigo", "citacao": "Banks PA et al. Classification of acute pancreatitis—2012: revision of the Atlanta classification and definitions by international consensus. Gut 2013;62:102-111.", "localizacao": "[conferir]", "ano": 2013, "verificada": false }
  ],
  "status": "rascunho",
  "revisadoEm": "",
  "revisor": ""
});
