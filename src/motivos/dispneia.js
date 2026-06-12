// Motivo: dispneia — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("dispneia", {
  "name": "Dispneia",
  "nameEs": "Disnea",
  "icon": "🫁",
  "color": "mc-primary",
  "rasHighlight": [
    "resp",
    "cardio"
  ],
  "aeaGuide": [
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Brusco/Súbito (minutos)",
        "Agudo (horas a dias)",
        "Progressivo/crônico (semanas a meses)",
        "Crônico com piora aguda"
      ]
    },
    {
      "q": "Intensidade (escala mMRC)",
      "qEs": "Intensidad (escala mMRC)",
      "type": "radio",
      "opts": [
        "Grau 0 — só com exercício intenso",
        "Grau 1 — ao apressar o passo/subir ladeira",
        "Grau 2 — anda mais devagar que pessoas da idade",
        "Grau 3 — para para respirar após ~100m",
        "Grau 4 — ao vestir-se / não sai de casa"
      ]
    },
    {
      "q": "Relação com esforço físico",
      "qEs": "Relación con el esfuerzo físico",
      "type": "radio",
      "opts": [
        "Aos grandes esforços",
        "Aos médios esforços",
        "Aos pequenos esforços",
        "Em repouso"
      ]
    },
    {
      "q": "Relação com decúbito",
      "qEs": "Relación con decúbito",
      "type": "radio",
      "opts": [
        "Ortopneia (piora deitado)",
        "Platipneia (melhora deitado)",
        "Sem relação"
      ]
    },
    {
      "q": "Ortopneia — quantos travesseiros usa para dormir?",
      "qEs": "Ortopnea — ¿cuántas almohadas usa para dormir?",
      "type": "input",
      "ph": "Número de travesseiros",
      "ph2": "Número de almohadas"
    },
    {
      "q": "Dispneia paroxística noturna (acorda sufocado)?",
      "qEs": "¿Disnea paroxística nocturna (se despierta sofocado)?",
      "type": "yn"
    },
    {
      "q": "Fatores desencadeantes (esforço, frio, alérgenos, posição, estresse, infecções)?",
      "qEs": "¿Factores desencadenantes (esfuerzo, frío, alérgenos, posición, estrés, infecciones)?",
      "type": "input",
      "ph": "Descreva os fatores desencadeantes",
      "ph2": "Describa los factores desencadenantes"
    },
    {
      "q": "Chiado no peito / Sibilância?",
      "qEs": "¿Silbido en el pecho?",
      "type": "yn"
    },
    {
      "q": "Tosse associada?",
      "qEs": "¿Tos asociada?",
      "type": "yn"
    },
    {
      "q": "Tosse — desde quando?",
      "qEs": "Tos — ¿desde cuándo?",
      "type": "radio",
      "opts": [
        "Aguda (< 3 semanas)",
        "Subaguda (3–8 semanas)",
        "Crônica (> 8 semanas)"
      ],
      "optsEs": [
        "Aguda (< 3 semanas)",
        "Subaguda (3–8 semanas)",
        "Crónica (> 8 semanas)"
      ]
    },
    {
      "q": "Tosse — seca ou produtiva?",
      "qEs": "Tos — ¿seca o productiva?",
      "type": "radio",
      "opts": [
        "Seca (não produtiva)",
        "Produtiva — com escarro"
      ],
      "optsEs": [
        "Seca (no productiva)",
        "Productiva — con esputo"
      ]
    },
    {
      "q": "Há expectoração?",
      "qEs": "¿Hay expectoración?",
      "type": "yn"
    },
    {
      "q": "Hemoptise?",
      "qEs": "¿Hemoptisis?",
      "type": "yn"
    },
    {
      "q": "Predomínio noturno da tosse?",
      "qEs": "¿Predominio nocturno de la tos?",
      "type": "yn"
    },
    {
      "q": "Dor torácica associada?",
      "qEs": "¿Dolor torácico asociado?",
      "type": "yn"
    },
    {
      "q": "Edema de membros inferiores associado?",
      "qEs": "¿Edema de miembros inferiores asociado?",
      "type": "yn"
    },
    {
      "q": "Palpitações associadas?",
      "qEs": "¿Palpitaciones asociadas?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
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
    }
  ],
  "guidePt": {
    "mnemonics": [
      {
        "kw": "PASTE",
        "name": "Causas de dispneia aguda",
        "rows": [
          [
            "P",
            "Pneumonia/Pneumotórax",
            "Febre+crepitantes / MV ausente unilateral+súbito"
          ],
          [
            "A",
            "Asma/DPOC",
            "Sibilância, uso musculatura acessória"
          ],
          [
            "S",
            "SCA/ICC",
            "Ortopneia, crepitantes bibasais, BNP ↑"
          ],
          [
            "T",
            "TEP",
            "Pleurítica, TVP, taquicardia, D-Dímero ↑"
          ],
          [
            "E",
            "Epiglotite/Obstrução",
            "Estridor, disfagia, febre, posição trípode"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Expansibilidade torácica",
        "subtitle": "Ventilação simétrica",
        "steps": [
          "Mãos abertas nos terços inferiores posterior",
          "Polegares na linha média",
          "Inspiração profunda — observar separação dos polegares"
        ],
        "normal": "Expansão simétrica bilateralmente",
        "abnormal": "Assimetria → consolidação, derrame, pneumotórax no lado reduzido"
      },
      {
        "title": "Frêmito Tóraco-Vocal",
        "subtitle": "Transmissão de vibrações",
        "steps": [
          "Borda ulnar das mãos no tórax posterior",
          "Dizer \"trinta e três\"",
          "Comparar bilateralmente"
        ],
        "normal": "FTV simétrico bilateralmente",
        "abnormal": "↑ → consolidação | ↓ → derrame, pneumotórax"
      },
      {
        "title": "Percussão torácica",
        "subtitle": "Padrões de ressonância",
        "steps": [
          "Dedo médio nos espaços intercostais",
          "Percutir comparativamente bilateral"
        ],
        "normal": "Sonoridade normal bilateralmente",
        "abnormal": "Macicez → derrame/consolidação | Hiperressonância → pneumotórax"
      }
    ],
    "sinais": [
      {
        "name": "Tiragem intercostal",
        "eponym": "Trabalho respiratório aumentado",
        "how": "Retração dos espaços intercostais na inspiração",
        "means": "Obstrução grave — asma grave, pneumonia extensa"
      },
      {
        "name": "Sibilância expiratória",
        "eponym": "Broncoespasmo",
        "how": "Ruído musical, fase expiratória prolongada",
        "means": "Asma (reversível com BD) ou DPOC (parcialmente reversível)"
      },
      {
        "name": "Crepitantes finos bibasais",
        "eponym": "ICC/Fibrose",
        "how": "Como cabelo friccionado — inspiração final",
        "means": "Bibasais ICC (edema) | Focais → pneumonia, fibrose"
      },
      {
        "name": "Ortopneia",
        "eponym": "ICC",
        "how": "Dispneia ao deitar — número de travesseiros",
        "means": "≥3 travesseiros: alta especificidade para ICC"
      }
    ],
    "ddx": [
      [
        "Asma aguda",
        "Sibilância, história prévia, boa resposta BD, jovem atópico",
        "Ortopneia, crepitantes, BNP ↑"
      ],
      [
        "ICC descompensada",
        "Ortopneia, DPN, crepitantes bibasais, BNP ↑, cardiomegalia",
        "Sibilância pura, BNP normal"
      ],
      [
        "DPOC agudizado",
        "Tabagista, hiperinsuflação, uso musculatura acessória",
        "Atopia, sem tabagismo, boa resposta BD"
      ],
      [
        "Pneumonia",
        "Febre, crepitantes focais, FTV ↑, consolidação Rx",
        "Bilateral, BNP muito ↑, ortopneia"
      ],
      [
        "TEP",
        "Pleurítica, TVP, taquicardia, D-Dímero ↑, hipoxemia",
        "Consolidação Rx típica, sibilância"
      ],
      [
        "Pneumotórax",
        "Súbito, MV ausente unilateral, hiperressonância",
        "Bilateral, insidioso, febre"
      ]
    ],
    "escalas": [
      {
        "title": "Escala MRC de Dispneia",
        "headers": [
          "Grau",
          "Descrição"
        ],
        "rows": [
          [
            "0",
            "Dispneia só ao exercício extenuante"
          ],
          [
            "1",
            "Dispneia ao apressar o passo ou aclive leve"
          ],
          [
            "2",
            "Anda mais devagar que coetâneos no plano"
          ],
          [
            "3",
            "Para após ~100m ou alguns minutos no plano"
          ],
          [
            "4",
            "Não sai de casa — dispneia ao vestir-se"
          ]
        ],
        "note": "MRC ≥2: dispneia clinicamente significativa — investigar causa"
      },
      {
        "title": "Wells TEP",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "TVP suspeita",
            "3"
          ],
          [
            "Diagnóstico alternativo menos provável",
            "3"
          ],
          [
            "FC >100",
            "1.5"
          ],
          [
            "Imobilização/cirurgia <4sem",
            "1.5"
          ],
          [
            "TVP/TEP prévio",
            "1.5"
          ],
          [
            "Hemoptise",
            "1"
          ],
          [
            "Neoplasia",
            "1"
          ]
        ],
        "note": "<2: Baixa → D-Dímero | 2-6: Intermediária → TC | >6: Alta → anticoagulação"
      }
    ],
    "conduta": {
      "exames": [
        "Oximetria + gasometria arterial",
        "Rx tórax PA",
        "ECG",
        "BNP ou NT-proBNP",
        "D-Dímero (prob baixa/intermediária)",
        "Hemograma, função renal",
        "Peak flow"
      ],
      "drugs": [
        "O₂ → SpO₂ >94% (92-88% em DPOC)",
        "Salbutamol 2,5-5 mg nebulização",
        "Furosemida 40-80 mg EV (ICC)",
        "Metilprednisolona 125 mg EV (asma grave)"
      ],
      "steps": [
        "1. O₂, acesso EV, monitorização",
        "2. Posição sentada ou semi-sentada",
        "3. Sibilos? Crepitantes? MV ausente?",
        "4. BNP para ICC; Wells+D-Dímero para TEP",
        "5. Tratar causa + reavaliação frequente"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de disnea aguda",
        "rows": [
          [
            "Neumonía/Neumotórax",
            "Fiebre+crepitantes / MV ausente unilateral+súbito"
          ],
          [
            "Asma/EPOC",
            "Sibilancias, uso de musculatura accesoria"
          ],
          [
            "SCA/ICC",
            "Ortopnea, crepitantes bibasales, BNP ↑"
          ],
          [
            "TEP",
            "Pleurítico, TVP, taquicardia, Dímero-D ↑"
          ],
          [
            "Epiglotitis/Obstrucción",
            "Estridor, disfagia, fiebre, posición en trípode"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Expansibilidad torácica",
        "subtitle": "Ventilación simétrica",
        "steps": [
          "Manos abiertas en los tercios inferiores posteriores",
          "Pulgares en la línea media",
          "Inspiración profunda — observar separación de los pulgares"
        ],
        "normal": "Expansión simétrica bilateral",
        "abnormal": "Asimetría → consolidación, derrame, neumotórax en el lado reducido"
      },
      {
        "title": "Frémito tóraco-vocal",
        "subtitle": "Transmisión de vibraciones",
        "steps": [
          "Borde cubital de las manos en el tórax posterior",
          "Decir \"treinta y tres\"",
          "Comparar bilateralmente"
        ],
        "normal": "FTV simétrico bilateral",
        "abnormal": "↑ → consolidación | ↓ → derrame, neumotórax"
      },
      {
        "title": "Percusión torácica",
        "subtitle": "Patrones de resonancia",
        "steps": [
          "Dedo medio en los espacios intercostales",
          "Percutir comparativamente bilateral"
        ],
        "normal": "Sonoridad normal bilateral",
        "abnormal": "Matidez → derrame/consolidación | Hiperresonancia → neumotórax"
      }
    ],
    "sinais": [
      {
        "name": "Tiraje intercostal",
        "eponym": "Trabajo respiratorio aumentado",
        "how": "Retracción de los espacios intercostales en la inspiración",
        "means": "Obstrucción grave — asma grave, neumonía extensa"
      },
      {
        "name": "Sibilancia espiratoria",
        "eponym": "Broncoespasmo",
        "how": "Ruido musical, fase espiratoria prolongada",
        "means": "Asma (reversible con BD) o EPOC (parcialmente reversible)"
      },
      {
        "name": "Crepitantes finos bibasales",
        "eponym": "ICC/Fibrosis",
        "how": "Como cabello frotado — inspiración final",
        "means": "Bibasales ICC (edema) | Focales → neumonía, fibrosis"
      },
      {
        "name": "Ortopnea",
        "eponym": "ICC",
        "how": "Disnea al acostarse — número de almohadas",
        "means": "≥3 almohadas: alta especificidad para ICC"
      }
    ],
    "ddx": [
      [
        "Asma aguda",
        "Sibilancias, antecedente previo, buena respuesta a BD, joven atópico",
        "Ortopnea, crepitantes, BNP ↑"
      ],
      [
        "ICC descompensada",
        "Ortopnea, DPN, crepitantes bibasales, BNP ↑, cardiomegalia",
        "Sibilancias puras, BNP normal"
      ],
      [
        "EPOC agudizado",
        "Fumador, hiperinsuflación, uso de musculatura accesoria",
        "Atopía, sin tabaquismo, buena respuesta a BD"
      ],
      [
        "Neumonía",
        "Fiebre, crepitantes focales, FTV ↑, consolidación Rx",
        "Bilateral, BNP muy ↑, ortopnea"
      ],
      [
        "TEP",
        "Pleurítico, TVP, taquicardia, Dímero-D ↑, hipoxemia",
        "Consolidación Rx típica, sibilancias"
      ],
      [
        "Neumotórax",
        "Súbito, MV ausente unilateral, hiperresonancia",
        "Bilateral, crepitantes, BNP ↑"
      ]
    ],
    "escalas": [
      {
        "title": "Escala MRC de Disnea",
        "headers": [
          "Grado",
          "Descripción"
        ],
        "rows": [
          [
            "0",
            "Disnea solo con ejercicio intenso"
          ],
          [
            "1",
            "Disnea al caminar rápido o subir una cuesta"
          ],
          [
            "2",
            "Camina más lento que sus pares por disnea"
          ],
          [
            "3",
            "Se detiene al caminar ~100 m"
          ],
          [
            "4",
            "Disnea al vestirse / no sale de casa"
          ]
        ],
        "note": "Cuantifica la limitación funcional en enfermedad respiratoria crónica"
      },
      {
        "title": "Wells TEP",
        "headers": [
          "Criterio",
          "Puntos"
        ],
        "rows": [
          [
            "TVP clínicamente sospechosa",
            "3"
          ],
          [
            "Alternativo menos probable que TEP",
            "3"
          ],
          [
            "FC >100",
            "1.5"
          ],
          [
            "Inmovilización/cirugía <4 sem",
            "1.5"
          ],
          [
            "TVP/TEP previo",
            "1.5"
          ],
          [
            "Hemoptisis",
            "1"
          ],
          [
            "Neoplasia activa",
            "1"
          ]
        ],
        "note": "<2: Baja | 2-6: Intermedia | >6: Alta probabilidad"
      }
    ],
    "conduta": {
      "exames": [
        "Oximetría de pulso y gasometría arterial",
        "Hemograma, BNP/NT-proBNP",
        "Dímero-D (si sospecha de TEP)",
        "Rx tórax PA",
        "ECG",
        "Ecocardiograma (si ICC)",
        "Eco-Doppler de MMII (si TVP)"
      ],
      "drugs": [
        "O₂ para SpO₂ ≥94% (88-92% si EPOC retenedor)",
        "Broncodilatador (salbutamol ± ipratropio) en asma/EPOC",
        "Furosemida EV en ICC descompensada",
        "Anticoagulación si TEP/TVP confirmada"
      ],
      "steps": [
        "1. Evaluar gravedad: SpO₂, FR, uso de musculatura accesoria",
        "2. Oxigenoterapia según el objetivo",
        "3. Rx tórax + ECG + BNP/Dímero-D dirigidos",
        "4. Tratamiento según la causa",
        "5. Reevaluar respuesta y considerar UCI si fatiga respiratoria"
      ]
    }
  }
});
