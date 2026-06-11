// Motivo: semio-dor — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-dor", {
  "name": "Dor",
  "nameEs": "Dolor",
  "icon": "🤕",
  "color": "mc-danger",
  "isPain": true,
  "aeaGuide": [
    {
      "q": "Localização da dor?",
      "qEs": "¿Localización del dolor?",
      "type": "input",
      "ph": "Ex: abdominal, torácica, cabeça, membros",
      "ph2": "Ej: abdominal, torácica, cabeza, miembros"
    },
    {
      "q": "Irradiação?",
      "qEs": "¿Irradiación?",
      "type": "input",
      "ph": "Ex: para o ombro, braço, virilha",
      "ph2": "Ej: hacia el hombro, brazo, ingle"
    },
    {
      "q": "Caráter da dor?",
      "qEs": "¿Carácter del dolor?",
      "type": "radio",
      "opts": [
        "Queimação",
        "Pontada",
        "Cólica",
        "Pressão/aperto",
        "Latejante",
        "Surda/em peso"
      ],
      "optsEs": [
        "Ardor/quemazón",
        "Punzada",
        "Cólico",
        "Presión/opresión",
        "Pulsátil",
        "Sorda/pesada"
      ]
    },
    {
      "q": "Intensidade (EVA 0–10)?",
      "qEs": "¿Intensidad (EVA 0–10)?",
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
      "q": "Início e duração?",
      "qEs": "¿Inicio y duración?",
      "type": "radio",
      "opts": [
        "Agudo (<24h)",
        "Subagudo (dias)",
        "Crônico (>4 semanas)"
      ],
      "optsEs": [
        "Agudo (<24h)",
        "Subagudo (días)",
        "Crónico (>4 semanas)"
      ]
    },
    {
      "q": "Fatores de melhora?",
      "qEs": "¿Factores que alivian?",
      "type": "multi",
      "opts": [
        "Repouso",
        "Analgésicos",
        "Calor local",
        "Frio local",
        "Alimentação",
        "Posição antálgica"
      ],
      "optsEs": [
        "Reposo",
        "Analgésicos",
        "Calor local",
        "Frío local",
        "Alimentación",
        "Posición antiálgica"
      ]
    },
    {
      "q": "Fatores de piora?",
      "qEs": "¿Factores que agravan?",
      "type": "multi",
      "opts": [
        "Esforço físico",
        "Alimentação",
        "Palpação",
        "Movimento",
        "Inspiração profunda",
        "Defecação"
      ],
      "optsEs": [
        "Esfuerzo físico",
        "Alimentación",
        "Palpación",
        "Movimiento",
        "Inspiración profunda",
        "Defecación"
      ]
    },
    {
      "q": "Sintomas associados?",
      "qEs": "¿Síntomas asociados?",
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
    },
    {
      "q": "Evolução do quadro",
      "qEs": "Evolución del cuadro",
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
      "q": "O que motivou buscar atendimento hoje?",
      "qEs": "¿Qué motivó buscar atención hoy?",
      "type": "input",
      "ph": "Descreva o que motivou vir hoje",
      "ph2": "Describa qué motivó venir hoy"
    }
  ],
  "guidePt": {
    "mnemonics": [
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
