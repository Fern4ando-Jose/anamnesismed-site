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

  "epidemiologia": "As causas mais frequentes são a litíase biliar e o álcool. Outras: hipertrigliceridemia, hipercalcemia, pós-CPRE, fármacos, trauma, causas autoimunes e infecciosas. Parte dos casos é idiopática.",
  "epidemiologiaEs": "Las causas más frecuentes son la litiasis biliar y el alcohol. Otras: hipertrigliceridemia, hipercalcemia, post-CPRE, fármacos, trauma, causas autoinmunes e infecciosas. Parte de los casos es idiopática.",

  "fisiopatologia": "Ativação intrapancreática prematura de enzimas digestivas (tripsinogênio em tripsina) provoca autodigestão da glândula, inflamação e liberação de mediadores. A resposta inflamatória pode ser local (edema, coleções, necrose) ou sistêmica (SIRS, falência de órgãos). A necrose pode se infectar nas semanas seguintes.",
  "fisiopatologiaEs": "La activación intrapancreática prematura de enzimas digestivas (tripsinógeno en tripsina) provoca autodigestión de la glándula, inflamación y liberación de mediadores. La respuesta inflamatoria puede ser local (edema, colecciones, necrosis) o sistémica (SIRS, falla de órganos). La necrosis puede infectarse en las semanas siguientes.",

  "quadroClinico": {
    "sintomas": [
      "Dor epigástrica intensa, de início súbito, em faixa, com irradiação para o dorso",
      "Náuseas e vômitos",
      "Piora da dor ao decúbito dorsal e alívio parcial com o tronco inclinado para a frente"
    ],
    "sintomasEs": [
      "Dolor epigástrico intenso, de inicio súbito, en barra, con irradiación al dorso",
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
      "Diagnóstico com 2 de 3 critérios: dor abdominal típica; lipase (ou amilase) maior que 3 vezes o limite superior; achados característicos em imagem",
      "Gravidade (classificação de Atlanta revisada): leve (sem falência de órgão nem complicação local), moderadamente grave (falência transitória, até 48 h, ou complicação local) e grave (falência de órgão persistente, acima de 48 h)",
      "Escores de apoio ao prognóstico: BISAP, Ranson e PCR em 48 h"
    ],
    "criteriosEs": [
      "Diagnóstico con 2 de 3 criterios: dolor abdominal típico; lipasa (o amilasa) mayor de 3 veces el límite superior; hallazgos característicos en imagen",
      "Gravedad (clasificación de Atlanta revisada): leve (sin falla de órgano ni complicación local), moderadamente grave (falla transitoria, hasta 48 h, o complicación local) y grave (falla de órgano persistente, más de 48 h)",
      "Escalas de apoyo al pronóstico: BISAP, Ranson y PCR a las 48 h"
    ],
    "exames": [
      { "nome": "Lipase (preferível) e amilase", "nomeEs": "Lipasa (preferible) y amilasa",
        "achado": "Elevação acima de 3 vezes o limite superior sustenta o diagnóstico; o valor não indica a gravidade", "achadoEs": "Elevación por encima de 3 veces el límite superior sustenta el diagnóstico; el valor no indica la gravedad",
        "quando": "Em toda dor abdominal alta suspeita", "quandoEs": "En todo dolor abdominal alto sospechoso" },
      { "nome": "Hemograma, ureia, creatinina, glicemia, cálcio, eletrólitos", "nomeEs": "Hemograma, urea, creatinina, glucemia, calcio, electrolitos",
        "achado": "Avaliam gravidade, desidratação e causas (hipercalcemia)", "achadoEs": "Evalúan gravedad, deshidratación y causas (hipercalcemia)",
        "quando": "Na admissão", "quandoEs": "Al ingreso" },
      { "nome": "TGO, TGP, FA, GGT, bilirrubinas", "nomeEs": "TGO, TGP, FA, GGT, bilirrubinas",
        "achado": "Elevação de ALT/TGP sugere causa biliar; padrão colestático sugere obstrução", "achadoEs": "Elevación de ALT/TGP sugiere causa biliar; patrón colestásico sugiere obstrucción",
        "quando": "Na admissão, para buscar a causa", "quandoEs": "Al ingreso, para buscar la causa" },
      { "nome": "Triglicerídeos", "nomeEs": "Triglicéridos",
        "achado": "Valores muito elevados indicam hipertrigliceridemia como causa", "achadoEs": "Valores muy elevados indican hipertrigliceridemia como causa",
        "quando": "Se a causa não for biliar nem alcoólica", "quandoEs": "Si la causa no es biliar ni alcohólica" },
      { "nome": "Ultrassonografia de abdome", "nomeEs": "Ecografía abdominal",
        "achado": "Pesquisa cálculos na vesícula e dilatação da via biliar", "achadoEs": "Busca cálculos en la vesícula y dilatación de la vía biliar",
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
      { "nome": "Aneurisma de aorta roto", "nomeEs": "Aneurisma de aorta roto", "pista": "Dor com massa pulsátil e choque", "pistaEs": "Dolor con masa pulsátil y shock" }
    ]
  },

  "tratamento": {
    "medidas": [
      "Hidratação venosa precoce, guiada por metas e por reavaliação frequente, preferencialmente com Ringer lactato, evitando excesso de volume",
      "Analgesia adequada, com opioide quando necessário",
      "Dieta oral precoce, conforme a tolerância; nutrição enteral se não houver tolerância à via oral",
      "Tratar a causa: afastar e suspender o álcool, controlar triglicerídeos e cálcio, tratar a causa biliar",
      "Formas graves ou com falência de órgão: cuidados intensivos"
    ],
    "medidasEs": [
      "Hidratación intravenosa precoz, guiada por metas y por reevaluación frecuente, preferentemente con Ringer lactato, evitando el exceso de volumen",
      "Analgesia adecuada, con opioide cuando sea necesario",
      "Dieta oral precoz, según la tolerancia; nutrición enteral si no hay tolerancia a la vía oral",
      "Tratar la causa: suspender el alcohol, controlar triglicéridos y calcio, tratar la causa biliar",
      "Formas graves o con falla de órgano: cuidados intensivos"
    ],
    "farmacologico": [
      { "classe": "Analgésicos (incluindo opioide) e antieméticos", "classeEs": "Analgésicos (incluido opioide) y antieméticos", "nota": "Sintomáticos; doses a preencher com referência", "notaEs": "Sintomáticos; dosis a completar con referencia", "refs": [0, 1] },
      { "classe": "Antibióticos", "classeEs": "Antibióticos", "nota": "Não usar de forma profilática. Indicados na necrose infectada e na colangite aguda; esquema a preencher com referência", "notaEs": "No usar de forma profiláctica. Indicados en la necrosis infectada y en la colangitis aguda; esquema a completar con referencia", "refs": [1] }
    ],
    "cirurgico": [
      "CPRE urgente se houver colangite aguda; avaliar nos casos com obstrução biliar persistente",
      "Pancreatite biliar leve: colecistectomia na mesma internação",
      "Necrose infectada: abordagem escalonada (drenagem e, se necessário, desbridamento), preferencialmente após a fase aguda"
    ],
    "cirurgicoEs": [
      "CPRE urgente si hay colangitis aguda; valorar en los casos con obstrucción biliar persistente",
      "Pancreatitis biliar leve: colecistectomía en el mismo ingreso",
      "Necrosis infectada: abordaje escalonado (drenaje y, si es necesario, desbridamiento), preferentemente tras la fase aguda"
    ],
    "encaminhar": "Internação em todos os casos; unidade de terapia intensiva se houver falência de órgão ou instabilidade.",
    "encaminharEs": "Ingreso en todos los casos; unidad de cuidados intensivos si hay falla de órgano o inestabilidad."
  },

  "complicacoes": ["Necrose pancreática e peripancreática", "Coleções agudas, pseudocisto", "Infecção da necrose", "Falência de órgãos (respiratória, renal, circulatória)", "Hemorragia, trombose venosa esplâncnica", "Diabetes e insuficiência pancreática exócrina tardias"],
  "complicacoesEs": ["Necrosis pancreática y peripancreática", "Colecciones agudas, pseudoquiste", "Infección de la necrosis", "Falla de órganos (respiratoria, renal, circulatoria)", "Hemorragia, trombosis venosa esplácnica", "Diabetes e insuficiencia pancreática exocrina tardías"],
  "prognostico": "A maioria dos casos é leve e evolui bem. A mortalidade aumenta com a falência de órgão persistente e com a necrose infectada.",
  "prognosticoEs": "La mayoría de los casos es leve y evoluciona bien. La mortalidad aumenta con la falla de órgano persistente y con la necrosis infectada.",
  "sinaisAlarme": ["Hipotensão ou choque", "Insuficiência respiratória", "Oligúria ou piora da função renal", "Alteração do nível de consciência", "Colangite associada (febre, icterícia, dor em hipocôndrio direito)"],
  "sinaisAlarmeEs": ["Hipotensión o shock", "Insuficiencia respiratoria", "Oliguria o empeoramiento de la función renal", "Alteración del nivel de conciencia", "Colangitis asociada (fiebre, ictericia, dolor en hipocondrio derecho)"],

  "casos": [
    {
      "titulo": "Dor em faixa depois de uma festa",
      "tituloEs": "Dolor en barra después de una fiesta",
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
          "comentarioEs": "El dolor típico en barra y la lipasa por encima de 3 veces el límite superior cumplen 2 de los 3 criterios diagnósticos."
        },
        {
          "dados": "Ultrassonografia sem cálculos na vesícula. Triglicerídeos normais. Paciente com náuseas e dor intensa.",
          "dadosEs": "Ecografía sin cálculos en la vesícula. Triglicéridos normales. Paciente con náuseas y dolor intenso.",
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
