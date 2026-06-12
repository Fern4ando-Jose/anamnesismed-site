// Motivo: dor-abdominal — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("dor-abdominal", {
  "name": "Dor Abdominal",
  "nameEs": "Dolor Abdominal",
  "icon": "🫀",
  "color": "mc-accent",
  "isPain": true,
  "rasHighlight": [
    "digest",
    "genito"
  ],
  "aeaGuide": [
    {
      "q": "Localização inicial",
      "qEs": "Localización inicial",
      "type": "radio",
      "opts": [
        "Epigástrio",
        "HCD",
        "HCE",
        "FID",
        "FIE",
        "Periumbilical",
        "Hipogástrio",
        "Difusa"
      ]
    },
    {
      "q": "A dor migrou de localização desde o início?",
      "qEs": "¿El dolor migró de localización desde el inicio?",
      "type": "radio",
      "opts": [
        "Sim — de periumbilical/epigástrio para FID (padrão clássico de apendicite)",
        "Sim — outro padrão de migração",
        "Não migrou, permaneceu no mesmo local"
      ],
      "optsEs": [
        "Sí — de periumbilical/epigástrico hacia FID (patrón clásico de apendicitis)",
        "Sí — otro patrón de migración",
        "No migró, permaneció en el mismo lugar"
      ]
    },
    {
      "q": "Irradiação",
      "qEs": "Irradiación",
      "type": "radio",
      "opts": [
        "Para o dorso",
        "Para o ombro",
        "Para a região inguinal/genital",
        "Para o flanco",
        "Sem irradiação"
      ]
    },
    {
      "q": "Tipo/caráter da dor",
      "qEs": "Tipo/carácter del dolor",
      "type": "radio",
      "opts": [
        "Em cólica",
        "Em queimação",
        "Em peso/distensão",
        "Em facada/aguda",
        "Surda/contínua"
      ]
    },
    {
      "q": "Intensidade (EVA 0-10)",
      "qEs": "Intensidad (EVA 0-10)",
      "type": "input",
      "ph": "0 a 10",
      "ph2": "0 a 10"
    },
    {
      "q": "Duração",
      "qEs": "Duración",
      "type": "radio",
      "opts": [
        "Minutos (em crises)",
        "Horas",
        "Dias",
        "Contínua/persistente"
      ]
    },
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Súbito",
        "Gradual/progressivo"
      ]
    },
    {
      "q": "Relação com alimentação",
      "qEs": "Relación con alimentación",
      "type": "radio",
      "opts": [
        "Piora após refeição",
        "Melhora após refeição",
        "Alivia com jejum",
        "Sem relação"
      ]
    },
    {
      "q": "Relação com posição, evacuação ou eliminação de gases",
      "qEs": "Relación con la posición, la evacuación o la eliminación de gases",
      "type": "multi",
      "opts": [
        "Piora ao evacuar",
        "Melhora ao evacuar/eliminar gases",
        "Piora com movimento ou mudança de posição",
        "Melhora ao se encolher/posição fetal",
        "Piora ao caminhar ou tossir (irritação peritoneal)",
        "Sem relação identificada"
      ],
      "optsEs": [
        "Empeora al evacuar",
        "Mejora al evacuar/eliminar gases",
        "Empeora con el movimiento o cambio de posición",
        "Mejora al encogerse/posición fetal",
        "Empeora al caminar o toser (irritación peritoneal)",
        "Sin relación identificada"
      ]
    },
    {
      "q": "Evolução desde o início (piorando, estável, em crises)?",
      "qEs": "¿Evolución desde el inicio (empeorando, estable, en crisis)?",
      "type": "radio",
      "opts": [
        "Piorando progressivamente",
        "Estável",
        "Melhorando",
        "Em crises intermitentes"
      ]
    },
    {
      "q": "Náuseas / vômitos associados? Em que ordem surgiram em relação à dor?",
      "qEs": "¿Náuseas / vómitos asociados? ¿En qué orden aparecieron respecto al dolor?",
      "type": "yn"
    },
    {
      "q": "Alteração do hábito intestinal (diarreia, constipação, parada de eliminação de fezes e gases)?",
      "qEs": "¿Alteración del hábito intestinal (diarrea, estreñimiento, parada de eliminación de heces y gases)?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Icterícia, colúria ou acolia fecal?",
      "qEs": "¿Ictericia, coluria o acolia fecal?",
      "type": "yn"
    },
    {
      "q": "Distensão abdominal?",
      "qEs": "¿Distensión abdominal?",
      "type": "yn"
    },
    {
      "q": "Hematêmese / melena / hematoquezia (sinais de alarme)?",
      "qEs": "¿Hematemesis / melena / hematoquecia (signos de alarma)?",
      "type": "yn"
    },
    {
      "q": "Sinais de alarme — defesa abdominal, rigidez, sinais de choque, dor súbita e intensa?",
      "qEs": "¿Signos de alarma — defensa abdominal, rigidez, signos de shock, dolor súbito e intenso?",
      "type": "yn"
    },
    {
      "q": "Data da última menstruação / possibilidade de gravidez (se aplicável)?",
      "qEs": "¿Fecha de la última menstruación / posibilidad de embarazo (si aplica)?",
      "type": "input",
      "ph": "DUM / possibilidade de gravidez",
      "ph2": "FUM / posibilidad de embarazo"
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
        "kw": "VINDICATE",
        "name": "Causas de dor abdominal",
        "rows": [
          [
            "V",
            "Vascular",
            "Isquemia mesentérica, aneurisma, TVP"
          ],
          [
            "I",
            "Inflamatório",
            "Apendicite, colecistite, pancreatite"
          ],
          [
            "N",
            "Neoplásico",
            "Ca cólon, gástrico, pancreático"
          ],
          [
            "D",
            "Dietético/DII",
            "Úlcera péptica, Crohn, RCUI"
          ],
          [
            "I²",
            "Iatrogênico",
            "AINEs, pós-op, procedimento"
          ],
          [
            "C",
            "Congênito",
            "Hérnia encarcerada, malrotação"
          ],
          [
            "A",
            "Autoimune",
            "Porfiria, vasculite, lúpus"
          ],
          [
            "T",
            "Trauma",
            "Hematoma hepático/esplênico"
          ],
          [
            "E",
            "Extra-abdominal",
            "CAD, IAM inferior, cólica renal"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Blumberg",
        "subtitle": "Peritonite/irritação peritoneal",
        "steps": [
          "Palpar o ponto de máxima dor",
          "Comprimir profundamente com 3 dedos",
          "Retirar a mão de modo súbito"
        ],
        "normal": "Sem dor à descompressão",
        "abnormal": "Dor aguda ao soltar (Blumberg +) → peritonite (apendicite, perfuração)"
      },
      {
        "title": "Sinal de Murphy",
        "subtitle": "Colecistite aguda",
        "steps": [
          "Posicionar 3 dedos sob o rebordo costal direito",
          "Pedir inspiração profunda",
          "Observar parada da inspiração por dor"
        ],
        "normal": "Inspiração completa sem dor",
        "abnormal": "Parada súbita da inspiração por dor (Murphy +) → colecistite aguda"
      },
      {
        "title": "Sinal de Rovsing",
        "subtitle": "Apendicite",
        "steps": [
          "Comprimir firmemente o QIE",
          "Manter 10 segundos"
        ],
        "normal": "Sem dor em FID",
        "abnormal": "Dor referida em FID (Rovsing +) → apendicite"
      },
      {
        "title": "Sinal do Psoas",
        "subtitle": "Apendicite retrocecal",
        "steps": [
          "DL esquerdo (posição de Sims)",
          "Hiperextender quadril direito passivamente"
        ],
        "normal": "Sem dor com hiperextensão",
        "abnormal": "Dor em FID (Psoas +) → apendicite retrocecal"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Murphy",
        "eponym": "Colecistite aguda",
        "how": "Dor e parada da inspiração com pressão sob o rebordo costal direito",
        "means": "Colecistite aguda — USG abdominal"
      },
      {
        "name": "Defesa involuntária",
        "eponym": "Peritonite",
        "how": "Contração reflexa da parede à palpação",
        "means": "Peritonite — cirurgia de urgência se difusa"
      },
      {
        "name": "Sinal de Courvoisier",
        "eponym": "Neoplasia pancreática",
        "how": "Vesícula palpável + icterícia obstrutiva indolor",
        "means": "Neoplasia cabeça pâncreas — USG + TC + CA19-9"
      },
      {
        "name": "Ponto de McBurney",
        "eponym": "Apendicite",
        "how": "Dor máxima no 1/3 ext. linha umbigo-EIAS direita",
        "means": "Apendicite típica — correlacionar com Alvarado"
      }
    ],
    "ddx": [
      [
        "Apendicite aguda",
        "Migração periumbilical→FID, anorexia, náuseas APÓS dor, febre baixa, Blumberg+",
        "Dor difusa, diarreia ANTES da dor, sem migração"
      ],
      [
        "Colecistite aguda",
        "Dor HCD pós-gordurosa, Murphy+, febre, leucocitose, cálculos USG",
        "Dor FID, sem relação alimentar, Murphy negativo"
      ],
      [
        "Pancreatite aguda",
        "Dor em faixa epigástrica→dorso, lipase/amilase ↑, vômitos",
        "Sem elevação lipase, sem irradiação dorsal"
      ],
      [
        "Cólica renal",
        "Cólica lombar→flanco→FID, hematúria, agitação intensa",
        "Dor contínua, defesa, febre, sem hematúria"
      ],
      [
        "DIP",
        "Mulher, bilateral, corrimento, mobilização uterina dolorosa",
        "Homem, migração típica, sem corrimento"
      ],
      [
        "Gravidez ectópica",
        "β-HCG+, amenorreia, USG sem SIU, dor aguda",
        "Homem, β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Alvarado — Apendicite",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Migração dor para FID",
            "1"
          ],
          [
            "Anorexia",
            "1"
          ],
          [
            "Náuseas/Vômitos",
            "1"
          ],
          [
            "Dor FID à palpação",
            "2"
          ],
          [
            "Blumberg+",
            "1"
          ],
          [
            "Temperatura >37,3°C",
            "1"
          ],
          [
            "Leucocitose >10.000",
            "2"
          ],
          [
            "Desvio à esquerda",
            "1"
          ]
        ],
        "note": "1-4: Baixa | 5-6: Possível | 7-8: Provável | 9-10: Alta → cirurgia"
      },
      {
        "title": "BISAP — Pancreatite (mortalidade)",
        "headers": [
          "Critério (1 ponto)",
          "Descrição"
        ],
        "rows": [
          [
            "BUN >25 mg/dL",
            "Ureia elevada"
          ],
          [
            "Comprometimento mental",
            "Glasgow <15"
          ],
          [
            "SIRS",
            "≥2 critérios"
          ],
          [
            "Idade",
            ">60 anos"
          ],
          [
            "Derrame pleural",
            "Ao Rx tórax"
          ]
        ],
        "note": "0-2: Mortalidade <2% | 3-5: Mortalidade até 22%"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma com diferencial",
        "Lipase e amilase",
        "TGO, TGP, FA, GGT, Bilirrubinas",
        "Ureia, Creatinina",
        "β-HCG (mulheres em idade fértil)",
        "Urina rotina",
        "USG abdominal (1ª linha)",
        "TC abdome+pelve c/ contraste (gold standard)"
      ],
      "drugs": [
        "NPO — suspeita cirúrgica",
        "Dipirona 1-2g EV ou Tramadol 100mg EV (analgesia — não retarda diagnóstico)",
        "Ondansetrona 4-8mg EV",
        "ATB pré-op apendicite: Cefazolina 2g EV 30 min antes"
      ],
      "steps": [
        "1. Sinais de peritonite? Defesa, Blumberg, ventre em tábua",
        "2. Laboratório + USG",
        "3. NPO + analgesia adequada",
        "4. Cirurgia urgência: peritonite difusa, pneumoperitônio",
        "5. Apendicite: apendicectomia laparoscópica <24h"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de dolor abdominal",
        "rows": [
          [
            "Vascular",
            "Isquemia mesentérica, aneurisma, TVP"
          ],
          [
            "Inflamatorio",
            "Apendicitis, colecistitis, pancreatitis"
          ],
          [
            "Neoplásico",
            "Ca colon, gástrico, pancreático"
          ],
          [
            "Dietético/EII",
            "Úlcera péptica, Crohn, CUCI"
          ],
          [
            "Iatrogénico",
            "AINEs, posoperatorio, procedimiento"
          ],
          [
            "Congénito",
            "Hernia encarcelada, malrotación"
          ],
          [
            "Autoinmune",
            "Porfiria, vasculitis, lupus"
          ],
          [
            "Trauma",
            "Hematoma hepático/esplénico"
          ],
          [
            "Extraabdominal",
            "CAD, IAM inferior, cólico renal"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Blumberg",
        "subtitle": "Peritonitis/irritación peritoneal",
        "steps": [
          "Palpar el punto de máximo dolor",
          "Comprimir profundamente con 3 dedos",
          "Retirar la mano de forma súbita"
        ],
        "normal": "Sin dolor a la descompresión",
        "abnormal": "Dolor agudo al soltar (Blumberg +) → peritonitis (apendicitis, perforación)"
      },
      {
        "title": "Signo de Murphy",
        "subtitle": "Colecistitis aguda",
        "steps": [
          "Colocar 3 dedos bajo el reborde costal derecho",
          "Pedir inspiración profunda",
          "Observar la detención de la inspiración por dolor"
        ],
        "normal": "Inspiración completa sin dolor",
        "abnormal": "Detención súbita de la inspiración por dolor (Murphy +) → colecistitis aguda"
      },
      {
        "title": "Signo de Rovsing",
        "subtitle": "Apendicitis",
        "steps": [
          "Comprimir firmemente el CII",
          "Mantener 10 segundos"
        ],
        "normal": "Sin dolor en FID",
        "abnormal": "Dolor referido en FID (Rovsing +) → apendicitis"
      },
      {
        "title": "Signo del Psoas",
        "subtitle": "Apendicitis retrocecal",
        "steps": [
          "DL izquierdo (posición de Sims)",
          "Hiperextender la cadera derecha pasivamente"
        ],
        "normal": "Sin dolor con la hiperextensión",
        "abnormal": "Dolor en FID (Psoas +) → apendicitis retrocecal"
      }
    ],
    "sinais": [
      {
        "name": "Signo de Murphy",
        "eponym": "Colecistitis aguda",
        "how": "Dolor y detención de la inspiración con presión bajo el reborde costal derecho",
        "means": "Colecistitis aguda — USG abdominal"
      },
      {
        "name": "Defensa involuntaria",
        "eponym": "Peritonitis",
        "how": "Contracción refleja de la pared a la palpación",
        "means": "Peritonitis — cirugía de urgencia si es difusa"
      },
      {
        "name": "Signo de Courvoisier",
        "eponym": "Neoplasia pancreática",
        "how": "Vesícula palpable + ictericia obstructiva indolora",
        "means": "Neoplasia de cabeza de páncreas — USG + TC + CA19-9"
      },
      {
        "name": "Punto de McBurney",
        "eponym": "Apendicitis",
        "how": "Dolor máximo en el 1/3 ext. línea ombligo-EIAS derecha",
        "means": "Apendicitis típica — correlacionar con Alvarado"
      }
    ],
    "ddx": [
      [
        "Apendicitis aguda",
        "Migración periumbilical→FID, anorexia, náuseas DESPUÉS del dolor, febrícula, Blumberg+",
        "Dolor difuso, diarrea ANTES del dolor, sin migración"
      ],
      [
        "Colecistitis aguda",
        "Dolor HCD posgraso, Murphy+, fiebre, leucocitosis, cálculos USG",
        "Dolor FID, sin relación alimentaria, Murphy negativo"
      ],
      [
        "Pancreatitis aguda",
        "Dolor en faja epigástrica→dorso, lipasa/amilasa ↑, vómitos",
        "Sin elevación de lipasa, sin irradiación dorsal"
      ],
      [
        "Cólico renal",
        "Cólico lumbar→flanco→FID, hematuria, agitación intensa",
        "Dolor continuo, defensa, fiebre, sin hematuria"
      ],
      [
        "EPI",
        "Mujer, bilateral, flujo, movilización uterina dolorosa",
        "Hombre, migración típica, sin flujo"
      ],
      [
        "Embarazo ectópico",
        "β-HCG+, amenorrea, USG sin saco intrauterino, dolor agudo",
        "Hombre, β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Alvarado — Apendicitis",
        "headers": [
          "Criterio",
          "Puntos"
        ],
        "rows": [
          [
            "Migración del dolor a FID",
            "1"
          ],
          [
            "Anorexia",
            "1"
          ],
          [
            "Náuseas/Vómitos",
            "1"
          ],
          [
            "Dolor FID a la palpación",
            "2"
          ],
          [
            "Blumberg+",
            "1"
          ],
          [
            "Temperatura >37,3°C",
            "1"
          ],
          [
            "Leucocitosis >10.000",
            "2"
          ],
          [
            "Desviación a la izquierda",
            "1"
          ]
        ],
        "note": "1-4: Baja | 5-6: Posible | 7-8: Probable | 9-10: Alta → cirugía"
      },
      {
        "title": "BISAP — Pancreatitis (mortalidad)",
        "headers": [
          "Criterio (1 punto)",
          "Descripción"
        ],
        "rows": [
          [
            "BUN >25 mg/dL",
            "Urea elevada"
          ],
          [
            "Compromiso mental",
            "Glasgow <15"
          ],
          [
            "SIRS",
            "≥2 criterios"
          ],
          [
            "Edad",
            ">60 años"
          ],
          [
            "Derrame pleural",
            "En Rx tórax"
          ]
        ],
        "note": "0-2: Mortalidad <2% | 3-5: Mortalidad hasta 22%"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma con diferencial",
        "Lipasa y amilasa",
        "TGO, TGP, FA, GGT, Bilirrubinas",
        "Urea, Creatinina",
        "β-HCG (mujeres en edad fértil)",
        "Orina rutina",
        "USG abdominal (1ª línea)",
        "TC abdomen+pelvis c/ contraste (gold standard)"
      ],
      "drugs": [
        "NPO — sospecha quirúrgica",
        "Dipirona 1-2g EV o Tramadol 100mg EV (analgesia — no retrasa el diagnóstico)",
        "Ondansetrón 4-8mg EV",
        "ATB prequirúrgico apendicitis: Cefazolina 2g EV 30 min antes"
      ],
      "steps": [
        "1. ¿Signos de peritonitis? Defensa, Blumberg, vientre en tabla",
        "2. Laboratorio + USG",
        "3. NPO + analgesia adecuada",
        "4. Cirugía de urgencia: peritonitis difusa, neumoperitoneo",
        "5. Apendicitis: apendicectomía laparoscópica <24h"
      ]
    }
  }
});
