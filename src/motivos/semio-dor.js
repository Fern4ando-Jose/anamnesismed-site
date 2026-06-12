// Motivo: semio-dor — fonte canônica (editar AQUI; rodar scripts/build.js)
// AEA com roteiro duplo: aeaGuide=LITIDIFES (clínica/semiologia) · aeaGuideCir=ALICIA (cirurgia). Seleção por currentSpec.
AM.motivo("semio-dor", {
  "name": "Dor",
  "nameEs": "Dolor",
  "icon": "🤕",
  "color": "mc-danger",
  "isPain": true,
  "aeaGuide": [
    {
      "q": "Localização (L)",
      "qEs": "Localización (L)",
      "type": "input",
      "ph": "Onde dói? Aponte o ponto de maior dor",
      "ph2": "¿Dónde duele? Señale el punto de mayor dolor"
    },
    {
      "q": "Irradiação (I)",
      "qEs": "Irradiación (I)",
      "type": "input",
      "ph": "Para onde a dor se propaga?",
      "ph2": "¿Hacia dónde se propaga el dolor?"
    },
    {
      "q": "Tipo (T)",
      "qEs": "Tipo (T)",
      "type": "radio",
      "opts": [
        "Urente (queimação)",
        "Constritivo (em aperto)",
        "Gravativo (peso)",
        "Terebrante (perfurante)",
        "Pulsátil (latejante)",
        "Surdo (mal definido)",
        "Fulgurante (descarga elétrica)",
        "Punzante (pontada)",
        "Cólico (em crise)",
        "Lancinante"
      ],
      "optsEs": [
        "Urente (ardor)",
        "Constrictivo (opresivo)",
        "Gravativo (peso)",
        "Terebrante (perforante)",
        "Pulsátil",
        "Sordo (mal definido)",
        "Fulgurante (descarga eléctrica)",
        "Punzante (puntada)",
        "Cólico (por crisis)",
        "Lancinante"
      ]
    },
    {
      "q": "Intensidade (I) — EVA",
      "qEs": "Intensidad (I) — EVA",
      "type": "radio",
      "opts": [
        "1-3 (leve)",
        "4-6 (moderada)",
        "7-8 (intensa)",
        "9-10 (insuportável)"
      ],
      "optsEs": [
        "1-3 (leve)",
        "4-6 (moderada)",
        "7-8 (intensa)",
        "9-10 (insoportable)"
      ]
    },
    {
      "q": "Duração (D)",
      "qEs": "Duración (D)",
      "type": "radio",
      "opts": [
        "Contínua",
        "Descontínua (em crises)"
      ],
      "optsEs": [
        "Continua",
        "Discontinua (por crisis)"
      ]
    },
    {
      "q": "Início (I)",
      "qEs": "Inicio (I)",
      "type": "radio",
      "opts": [
        "Brusco / súbito",
        "Insidioso / gradual"
      ],
      "optsEs": [
        "Brusco / súbito",
        "Insidioso / gradual"
      ]
    },
    {
      "q": "Fatores — iniciam, exacerbam ou acalmam (F)",
      "qEs": "Factores — inician, exacerban o calman (F)",
      "type": "multi",
      "opts": [
        "Esforço físico",
        "Movimento",
        "Palpação",
        "Alimentação",
        "Repouso",
        "Posição antálgica",
        "Calor/frio local",
        "Medicação"
      ],
      "optsEs": [
        "Esfuerzo físico",
        "Movimiento",
        "Palpación",
        "Alimentación",
        "Reposo",
        "Posición antiálgica",
        "Calor/frío local",
        "Medicación"
      ]
    },
    {
      "q": "Evolução (E)",
      "qEs": "Evolución (E)",
      "type": "radio",
      "opts": [
        "Progressiva (piora contínua)",
        "Flutuante (piora e melhora)",
        "Estável (sem mudança)",
        "Regressiva (melhorando)"
      ],
      "optsEs": [
        "Progresiva (empeoramiento continuo)",
        "Fluctuante (empeora y mejora)",
        "Estable (sin cambio)",
        "Regresiva (mejorando)"
      ]
    },
    {
      "q": "Sintomas acompanhantes (S)",
      "qEs": "Síntomas acompañantes (S)",
      "type": "multi",
      "opts": [
        "Náuseas/vômitos",
        "Febre",
        "Dispneia",
        "Sudorese",
        "Palidez",
        "Alteração intestinal"
      ],
      "optsEs": [
        "Náuseas/vómitos",
        "Fiebre",
        "Disnea",
        "Sudoración",
        "Palidez",
        "Alteración intestinal"
      ]
    }
  ],
  "aeaGuideCir": [
    {
      "q": "Aparición / Início (A)",
      "qEs": "Aparición / Inicio (A)",
      "type": "radio",
      "opts": [
        "Súbito (vascular / perfuração)",
        "Gradual (inflamatório)"
      ],
      "optsEs": [
        "Súbito (vascular / perforación)",
        "Gradual (inflamatorio)"
      ]
    },
    {
      "q": "Localização (L)",
      "qEs": "Localización (L)",
      "type": "input",
      "ph": "Onde dói? Aponte o ponto de maior dor",
      "ph2": "¿Dónde duele? Señale el punto de mayor dolor"
    },
    {
      "q": "Irradiação (I)",
      "qEs": "Irradiación (I)",
      "type": "input",
      "ph": "Para onde a dor se propaga?",
      "ph2": "¿Hacia dónde se propaga el dolor?"
    },
    {
      "q": "Caráter (C)",
      "qEs": "Carácter (C)",
      "type": "radio",
      "opts": [
        "Cólica",
        "Queimação",
        "Pontada",
        "Pressão/aperto",
        "Latejante",
        "Surda/em peso",
        "Lancinante"
      ],
      "optsEs": [
        "Cólico",
        "Ardor/quemazón",
        "Punzada",
        "Presión/opresión",
        "Pulsátil",
        "Sorda/pesada",
        "Lancinante"
      ]
    },
    {
      "q": "Intensidade (I) — EVA",
      "qEs": "Intensidad (I) — EVA",
      "type": "radio",
      "opts": [
        "1-3 (leve)",
        "4-6 (moderada)",
        "7-8 (intensa)",
        "9-10 (insuportável)"
      ],
      "optsEs": [
        "1-3 (leve)",
        "4-6 (moderada)",
        "7-8 (intensa)",
        "9-10 (insoportable)"
      ]
    },
    {
      "q": "Atenuantes / Agravantes (A)",
      "qEs": "Atenuantes / Agravantes (A)",
      "type": "multi",
      "opts": [
        "Melhora com repouso",
        "Melhora com analgésico",
        "Melhora com posição",
        "Piora ao movimento",
        "Piora à palpação",
        "Piora com alimentação",
        "Piora à inspiração"
      ],
      "optsEs": [
        "Mejora con reposo",
        "Mejora con analgésico",
        "Mejora con posición",
        "Empeora con el movimiento",
        "Empeora a la palpación",
        "Empeora con la alimentación",
        "Empeora a la inspiración"
      ]
    }
  ],
  "guidePt": {
    "mnemonics": [
      {
        "kw": "LITIDIFES",
        "name": "Caracterização semiológica da dor (clínica)",
        "rows": [
          [
            "L",
            "Localización",
            "Onde dói — apontar com um dedo (somática) ou difusa/mal definida (visceral)"
          ],
          [
            "I",
            "Irradiación",
            "Para onde a dor se propaga (ombro na irritação diafragmática, dorso na pancreatite)"
          ],
          [
            "T",
            "Tipo",
            "Urente, constritivo, gravativo, terebrante, pulsátil, surdo, fulgurante, punzante, cólico, lancinante"
          ],
          [
            "I",
            "Intensidad",
            "EVA 0-10 — leve, moderada, intensa; repercussão em atividades/sono"
          ],
          [
            "D",
            "Duración",
            "Contínua ou descontínua (em crises); tempo de evolução"
          ],
          [
            "I",
            "Inicio",
            "Brusco/súbito (vascular, perfuração) ou insidioso (inflamatório)"
          ],
          [
            "F",
            "Factores",
            "O que inicia, exacerba ou acalma a dor (esforço, alimentação, repouso, medicação)"
          ],
          [
            "E",
            "Evolución",
            "Progressiva, flutuante, estável ou regressiva"
          ],
          [
            "S",
            "Síntomas acompañantes",
            "Náuseas, vômitos, febre, sudorese, alterações intestinais"
          ]
        ]
      },
      {
        "kw": "ALICIA",
        "name": "Caracterização semiológica da dor",
        "rows": [
          [
            "A",
            "Aparición / Início",
            "Quando e como começou: súbito (vascular/perfuração) ou gradual (inflamatório)"
          ],
          [
            "L",
            "Localización",
            "Onde dói — apontar com um dedo (somática) ou difusa/mal definida (visceral)"
          ],
          [
            "I",
            "Irradiación",
            "Para onde a dor se propaga (ex.: ombro na irritação diafragmática, dorso na pancreatite)"
          ],
          [
            "C",
            "Carácter",
            "Tipo: em cólica, queimação, pontada, peso, lancinante"
          ],
          [
            "I",
            "Intensidad",
            "EVA 0-10 e repercussão nas atividades/sono"
          ],
          [
            "A",
            "Atenuantes/Agravantes",
            "O que melhora ou piora: posição, alimentação, repouso, medicação"
          ]
        ]
      },
      {
        "kw": "OPQRST",
        "name": "Roteiro anglo-saxão da dor",
        "rows": [
          [
            "O",
            "Onset",
            "Início e circunstância"
          ],
          [
            "P",
            "Provocação/Paliação",
            "Fatores que pioram ou aliviam"
          ],
          [
            "Q",
            "Quality",
            "Qualidade/caráter da dor"
          ],
          [
            "R",
            "Region/Radiation",
            "Localização e irradiação"
          ],
          [
            "S",
            "Severity",
            "Intensidade (EVA)"
          ],
          [
            "T",
            "Timing",
            "Duração, frequência, evolução temporal"
          ]
        ]
      },
      {
        "kw": "VISCERAL x SOMÁTICA",
        "name": "Tipos de dor",
        "rows": [
          [
            "V",
            "Visceral",
            "Mal localizada, surda, em cólica, acompanha náusea/sudorese — víscera oca/parenquimatosa"
          ],
          [
            "S",
            "Somática",
            "Bem localizada, aguda, piora ao movimento/palpação — peritônio parietal, pele, músculo"
          ],
          [
            "R",
            "Referida",
            "Sentida em local distante da origem (ombro/escápula) por convergência medular"
          ],
          [
            "N",
            "Neuropática",
            "Queimação, choque, formigamento, no trajeto de um nervo"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação da intensidade (EVA)",
        "subtitle": "Escala visual analógica",
        "steps": [
          "Apresentar régua 0 (sem dor) a 10 (pior dor imaginável)",
          "Pedir ao paciente que indique o número",
          "Reavaliar após analgesia para medir resposta"
        ],
        "normal": "0 = ausência de dor",
        "abnormal": "≥7 = dor intensa, exige analgesia e investigação prioritária"
      },
      {
        "title": "Palpação dirigida",
        "subtitle": "Localização e reprodutibilidade",
        "steps": [
          "Iniciar longe do ponto de maior dor",
          "Palpação superficial e depois profunda",
          "Observar fácies de dor e defesa muscular"
        ],
        "normal": "Dor não reproduzível à palpação",
        "abnormal": "Dor reproduzível/defesa → origem na parede ou peritônio"
      },
      {
        "title": "Manobra de Valsalva / movimento",
        "subtitle": "Diferenciar dor parietal x visceral",
        "steps": [
          "Pedir para contrair a parede (levantar a cabeça) ou tossir",
          "Observar se a dor muda de intensidade"
        ],
        "normal": "Dor visceral profunda não se altera",
        "abnormal": "Dor que piora à contração da parede → origem musculoesquelética/parietal (sinal de Carnett +)"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Carnett",
        "eponym": "Dor de parede abdominal",
        "how": "Dor à palpação persiste ou piora quando o paciente tensiona a parede (eleva a cabeça)",
        "means": "Origem na parede abdominal (não intra-abdominal) — evita laparotomia desnecessária"
      },
      {
        "name": "Dor referida ao ombro (Kehr)",
        "eponym": "Irritação diafragmática",
        "how": "Dor no ombro esquerdo por sangue/irritação subfrênica",
        "means": "Ruptura esplênica, gravidez ectópica rota, irritação peritoneal"
      },
      {
        "name": "Hiperalgesia/alodínia",
        "eponym": "Dor neuropática",
        "how": "Dor desproporcional ao estímulo no trajeto de um nervo",
        "means": "Componente neuropático — orienta terapia específica (gabapentinoides)"
      }
    ],
    "ddx": [
      [
        "Dor nociceptiva visceral",
        "Mal localizada, cólica, náusea/sudorese associada",
        "Bem localizada, piora ao movimento"
      ],
      [
        "Dor somática/parietal",
        "Localizada, piora ao movimento e palpação, Carnett +",
        "Difusa, profunda, sem relação com movimento"
      ],
      [
        "Dor neuropática",
        "Queimação/choque, trajeto de nervo, alodínia",
        "Caráter em peso/cólica, sem alteração sensitiva"
      ],
      [
        "Dor referida",
        "Distante da origem, sem alteração local",
        "Reproduzível pela palpação no local"
      ],
      [
        "Dor psicogênica/funcional",
        "Crônica, exame normal, contexto emocional",
        "Sinais objetivos, marcadores inflamatórios alterados"
      ]
    ],
    "escalas": [
      {
        "title": "Escala Visual Analógica (EVA)",
        "headers": [
          "Faixa",
          "Intensidade",
          "Conduta"
        ],
        "rows": [
          [
            "0",
            "Sem dor",
            "Observação"
          ],
          [
            "1-3",
            "Leve",
            "Analgésico simples (paracetamol/dipirona)"
          ],
          [
            "4-6",
            "Moderada",
            "AINE / opioide fraco"
          ],
          [
            "7-10",
            "Intensa",
            "Opioide / analgesia multimodal + investigação prioritária"
          ]
        ],
        "note": "Reavaliar a EVA após cada intervenção analgésica para titular o tratamento"
      },
      {
        "title": "Sinais de alarme da dor",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Início súbito e intenso (\"pior dor da vida\")",
            "Evento vascular/perfuração — emergência"
          ],
          [
            "Dor + instabilidade hemodinâmica",
            "Choque/hemorragia — avaliar imediatamente"
          ],
          [
            "Dor noturna que desperta + perda de peso",
            "Suspeita de neoplasia"
          ],
          [
            "Defesa/rigidez involuntária",
            "Peritonite — avaliação cirúrgica"
          ]
        ],
        "note": "A presença de qualquer sinal de alarme exige investigação imediata"
      }
    ],
    "conduta": {
      "exames": [
        "Direcionar conforme a topografia e a hipótese (a dor é sintoma, não doença)",
        "Hemograma, PCR e exames básicos quando há suspeita inflamatória/infecciosa",
        "Imagem dirigida ao sítio (USG, radiografia, TC) conforme o caso",
        "Reavaliação seriada do exame físico em dores agudas indiferenciadas"
      ],
      "drugs": [
        "Analgesia por degraus conforme a EVA (escada analgésica da OMS)",
        "Paracetamol/dipirona na dor leve; AINE na dor inflamatória (cautela renal/gástrica)",
        "Opioides na dor intensa, titulados",
        "Dor neuropática: gabapentina/pregabalina, amitriptilina"
      ],
      "steps": [
        "1. Caracterizar a dor por roteiro estruturado (ALICIA/OPQRST)",
        "2. Classificar o tipo (visceral, somática, neuropática, referida)",
        "3. Pesquisar sinais de alarme",
        "4. Tratar a dor enquanto se investiga a causa — analgesia não mascara abdome agudo",
        "5. Reavaliar resposta e exame físico de forma seriada"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Caracterización semiológica del dolor (clínica)",
        "rows": [
          [
            "Localización",
            "Dónde duele — señalar con un dedo (somática) o difusa (visceral)"
          ],
          [
            "Irradiación",
            "Hacia dónde se propaga el dolor"
          ],
          [
            "Tipo",
            "Urente, constrictivo, gravativo, terebrante, pulsátil, sordo, fulgurante, punzante, cólico, lancinante"
          ],
          [
            "Intensidad",
            "EVA 0-10 — leve, moderada, intensa"
          ],
          [
            "Duración",
            "Continua o discontinua (por crisis); tiempo de evolución"
          ],
          [
            "Inicio",
            "Brusco/súbito (vascular, perforación) o insidioso (inflamatorio)"
          ],
          [
            "Factores",
            "Qué inicia, exacerba o calma el dolor"
          ],
          [
            "Evolución",
            "Progresiva, fluctuante, estable o regresiva"
          ],
          [
            "Síntomas acompañantes",
            "Náuseas, vómitos, fiebre, sudoración, alteraciones intestinales"
          ]
        ]
      },
      {
        "name": "Caracterización semiológica del dolor",
        "rows": [
          [
            "Aparición / Inicio",
            "Cuándo y cómo comenzó: súbito (vascular/perforación) o gradual (inflamatorio)"
          ],
          [
            "Localización",
            "Dónde duele — señalar con un dedo (somática) o difusa/mal definida (visceral)"
          ],
          [
            "Irradiación",
            "Hacia dónde se propaga el dolor (ej.: hombro en la irritación diafragmática, dorso en la pancreatitis)"
          ],
          [
            "Carácter",
            "Tipo: cólico, ardor, punzada, peso, lancinante"
          ],
          [
            "Intensidad",
            "EVA 0-10 y repercusión en las actividades/sueño"
          ],
          [
            "Atenuantes/Agravantes",
            "Qué mejora o empeora: posición, alimentación, reposo, medicación"
          ]
        ]
      },
      {
        "name": "Esquema anglosajón del dolor",
        "rows": [
          [
            "Onset",
            "Inicio y circunstancia"
          ],
          [
            "Provocación/Paliación",
            "Factores que empeoran o alivian"
          ],
          [
            "Quality",
            "Calidad/carácter del dolor"
          ],
          [
            "Region/Radiation",
            "Localización e irradiación"
          ],
          [
            "Severity",
            "Intensidad (EVA)"
          ],
          [
            "Timing",
            "Duración, frecuencia, evolución temporal"
          ]
        ]
      },
      {
        "name": "Tipos de dolor",
        "rows": [
          [
            "Visceral",
            "Mal localizado, sordo, cólico, acompaña náusea/sudoración — víscera hueca/parenquimatosa"
          ],
          [
            "Somático",
            "Bien localizado, agudo, empeora con el movimiento/palpación — peritoneo parietal, piel, músculo"
          ],
          [
            "Referido",
            "Sentido en lugar distante del origen (hombro/escápula) por convergencia medular"
          ],
          [
            "Neuropático",
            "Ardor, choque, hormigueo, en el trayecto de un nervio"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Evaluación de la intensidad (EVA)",
        "subtitle": "Escala visual analógica",
        "steps": [
          "Presentar regla 0 (sin dolor) a 10 (peor dolor imaginable)",
          "Pedir al paciente que indique el número",
          "Reevaluar tras la analgesia para medir la respuesta"
        ],
        "normal": "0 = ausencia de dolor",
        "abnormal": "≥7 = dolor intenso, exige analgesia e investigación prioritaria"
      },
      {
        "title": "Palpación dirigida",
        "subtitle": "Localización y reproducibilidad",
        "steps": [
          "Iniciar lejos del punto de mayor dolor",
          "Palpación superficial y luego profunda",
          "Observar facies de dolor y defensa muscular"
        ],
        "normal": "Dolor no reproducible a la palpación",
        "abnormal": "Dolor reproducible/defensa → origen en la pared o el peritoneo"
      },
      {
        "title": "Maniobra de Valsalva / movimiento",
        "subtitle": "Diferenciar dolor parietal x visceral",
        "steps": [
          "Pedir contraer la pared (levantar la cabeza) o toser",
          "Observar si el dolor cambia de intensidad"
        ],
        "normal": "El dolor visceral profundo no se altera",
        "abnormal": "Dolor que empeora con la contracción de la pared → origen musculoesquelético/parietal (signo de Carnett +)"
      }
    ],
    "sinais": [
      {
        "name": "Signo de Carnett",
        "eponym": "Dolor de pared abdominal",
        "how": "El dolor a la palpación persiste o empeora cuando el paciente tensiona la pared (eleva la cabeza)",
        "means": "Origen en la pared abdominal (no intraabdominal) — evita laparotomía innecesaria"
      },
      {
        "name": "Dolor referido al hombro (Kehr)",
        "eponym": "Irritación diafragmática",
        "how": "Dolor en el hombro izquierdo por sangre/irritación subfrénica",
        "means": "Ruptura esplénica, embarazo ectópico roto, irritación peritoneal"
      },
      {
        "name": "Hiperalgesia/alodinia",
        "eponym": "Dolor neuropático",
        "how": "Dolor desproporcionado al estímulo en el trayecto de un nervio",
        "means": "Componente neuropático — orienta terapia específica (gabapentinoides)"
      }
    ],
    "ddx": [
      [
        "Dolor nociceptivo visceral",
        "Mal localizado, cólico, náusea/sudoración asociada",
        "Bien localizado, empeora con el movimiento"
      ],
      [
        "Dolor somático/parietal",
        "Localizado, empeora con el movimiento y la palpación, Carnett +",
        "Difuso, profundo, sin relación con el movimiento"
      ],
      [
        "Dolor neuropático",
        "Ardor/choque, trayecto de nervio, alodinia",
        "Carácter en peso/cólico, sin alteración sensitiva"
      ],
      [
        "Dolor referido",
        "Distante del origen, sin alteración local",
        "Reproducible por la palpación en el sitio"
      ],
      [
        "Dolor psicógeno/funcional",
        "Crónico, examen normal, contexto emocional",
        "Signos objetivos, marcadores inflamatorios alterados"
      ]
    ],
    "escalas": [
      {
        "title": "Escala Visual Analógica (EVA)",
        "headers": [
          "Rango",
          "Intensidad",
          "Conducta"
        ],
        "rows": [
          [
            "0",
            "Sin dolor",
            "Observación"
          ],
          [
            "1-3",
            "Leve",
            "Analgésico simple (paracetamol/dipirona)"
          ],
          [
            "4-6",
            "Moderada",
            "AINE / opioide débil"
          ],
          [
            "7-10",
            "Intensa",
            "Opioide / analgesia multimodal + investigación prioritaria"
          ]
        ],
        "note": "Reevaluar la EVA tras cada intervención analgésica para titular el tratamiento"
      },
      {
        "title": "Signos de alarma del dolor",
        "headers": [
          "Hallazgo",
          "Significado"
        ],
        "rows": [
          [
            "Inicio súbito e intenso (\"peor dolor de la vida\")",
            "Evento vascular/perforación — emergencia"
          ],
          [
            "Dolor + inestabilidad hemodinámica",
            "Shock/hemorragia — evaluar inmediatamente"
          ],
          [
            "Dolor nocturno que despierta + pérdida de peso",
            "Sospecha de neoplasia"
          ],
          [
            "Defensa/rigidez involuntaria",
            "Peritonitis — evaluación quirúrgica"
          ]
        ],
        "note": "La presencia de cualquier signo de alarma exige investigación inmediata"
      }
    ],
    "conduta": {
      "exames": [
        "Dirigir según la topografía y la hipótesis (el dolor es síntoma, no enfermedad)",
        "Hemograma, PCR y exámenes básicos cuando hay sospecha inflamatoria/infecciosa",
        "Imagen dirigida al sitio (USG, radiografía, TC) según el caso",
        "Reevaluación seriada del examen físico en dolores agudos indiferenciados"
      ],
      "drugs": [
        "Analgesia por escalones según la EVA (escalera analgésica de la OMS)",
        "Paracetamol/dipirona en el dolor leve; AINE en el dolor inflamatorio (cautela renal/gástrica)",
        "Opioides en el dolor intenso, titulados",
        "Dolor neuropático: gabapentina/pregabalina, amitriptilina"
      ],
      "steps": [
        "1. Caracterizar el dolor con un esquema estructurado (ALICIA/OPQRST)",
        "2. Clasificar el tipo (visceral, somático, neuropático, referido)",
        "3. Buscar signos de alarma",
        "4. Tratar el dolor mientras se investiga la causa — la analgesia no enmascara el abdomen agudo",
        "5. Reevaluar respuesta y examen físico de forma seriada"
      ]
    }
  }
});
