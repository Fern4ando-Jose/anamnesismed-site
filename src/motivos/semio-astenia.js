// Motivo: semio-astenia — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-astenia", {
  "name": "Astenia / Fadiga",
  "nameEs": "Astenia / Fatiga",
  "icon": "😔",
  "color": "mc-purple",
  "aeaGuide": [
    {
      "q": "Início?",
      "qEs": "¿Inicio?",
      "type": "radio",
      "opts": [
        "Agudo (dias)",
        "Progressivo (semanas/meses)",
        "Crônico (>6 meses)"
      ],
      "optsEs": [
        "Agudo (días)",
        "Progresivo (semanas/meses)",
        "Crónico (>6 meses)"
      ]
    },
    {
      "q": "Relação com atividade física?",
      "qEs": "¿Relación con actividad física?",
      "type": "radio",
      "opts": [
        "Presente mesmo em repouso",
        "Piora com esforço mínimo",
        "Só com esforço moderado/intenso"
      ],
      "optsEs": [
        "Presente incluso en reposo",
        "Empeora con esfuerzo mínimo",
        "Solo con esfuerzo moderado/intenso"
      ]
    },
    {
      "q": "Melhora com repouso?",
      "qEs": "¿Mejora con el reposo?",
      "type": "yn"
    },
    {
      "q": "Palidez ou dispneia de esforço (suspeita de anemia)?",
      "qEs": "¿Palidez o disnea de esfuerzo (sospecha de anemia)?",
      "type": "yn"
    },
    {
      "q": "Perda de peso não intencional associada?",
      "qEs": "¿Pérdida de peso no intencional asociada?",
      "type": "yn"
    },
    {
      "q": "Alterações do sono (insônia, hipersonia, ronco)?",
      "qEs": "¿Alteraciones del sueño (insomnio, hipersomnia, ronquidos)?",
      "type": "input",
      "ph": "Descreva as alterações",
      "ph2": "Describa las alteraciones"
    },
    {
      "q": "Poliúria e polidipsia (suspeita de diabetes)?",
      "qEs": "¿Poliuria y polidipsia (sospecha de diabetes)?",
      "type": "yn"
    },
    {
      "q": "Intolerância ao frio, obstipação, queda de cabelo (suspeita de hipotireoidismo)?",
      "qEs": "¿Intolerancia al frío, estreñimiento, caída de cabello (sospecha de hipotiroidismo)?",
      "type": "yn"
    },
    {
      "q": "Humor depressivo, anedonia ou ansiedade?",
      "qEs": "¿Estado de ánimo depresivo, anhedonia o ansiedad?",
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
        "kw": "VITAMINAS-D",
        "name": "Causas de astenia/fadiga",
        "rows": [
          [
            "V",
            "Vascular/Cardíaca",
            "Insuficiência cardíaca, anemia, hipotensão"
          ],
          [
            "I",
            "Infecciosa",
            "Mononucleose, tuberculose, HIV, COVID, endocardite"
          ],
          [
            "T",
            "Tóxico/Medicamentosa",
            "Betabloqueadores, sedativos, álcool, quimioterapia"
          ],
          [
            "A",
            "Autoimune/Inflamatória",
            "Lúpus, artrite reumatoide, polimialgia"
          ],
          [
            "M",
            "Metabólica/Endócrina",
            "Hipotireoidismo, diabetes, Addison, distúrbios eletrolíticos"
          ],
          [
            "N",
            "Neoplásica",
            "Síndrome consumptiva, anemia paraneoplásica"
          ],
          [
            "D",
            "Depressão/Psíquica",
            "Depressão, ansiedade, distúrbio do sono"
          ]
        ]
      },
      {
        "kw": "ORGÂNICA x FUNCIONAL",
        "name": "Padrão temporal da fadiga",
        "rows": [
          [
            "O",
            "Orgânica",
            "Piora ao longo do dia, com o esforço; melhora com repouso; início recente e progressivo"
          ],
          [
            "F",
            "Funcional/psicogênica",
            "Presente já ao acordar, não melhora com repouso, crônica e flutuante"
          ],
          [
            "A",
            "Alarme",
            "Perda de peso, febre, sudorese noturna, linfadenomegalia → investigar causa orgânica grave"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Diferenciar astenia de fraqueza muscular real",
        "subtitle": "Semiologia neuromuscular",
        "steps": [
          "Testar a força muscular segmentar (escala MRC 0-5)",
          "Pedir tarefas funcionais: levantar da cadeira sem apoio, elevar os braços"
        ],
        "normal": "Força preservada (5/5) — cansaço sem déficit = astenia",
        "abnormal": "Força reduzida objetivamente → fraqueza neuromuscular (miopatia, neuropatia), não astenia"
      },
      {
        "title": "Pesquisa de palidez/anemia",
        "subtitle": "Causa frequente de astenia",
        "steps": [
          "Inspecionar conjuntivas, palmas e mucosas",
          "Avaliar taquicardia e sopro sistólico funcional"
        ],
        "normal": "Mucosas coradas",
        "abnormal": "Palidez mucosa → anemia provável; solicitar hemograma"
      },
      {
        "title": "Avaliação da tireoide",
        "subtitle": "Hipotireoidismo",
        "steps": [
          "Palpar a glândula tireoide",
          "Pesquisar pele seca, bradicardia, reflexo aquileu lentificado"
        ],
        "normal": "Tireoide normal, sem sinais de hipofunção",
        "abnormal": "Bócio/sinais de hipotireoidismo → dosar TSH"
      }
    ],
    "sinais": [
      {
        "name": "Reflexo aquileu lentificado",
        "eponym": "Hipotireoidismo",
        "how": "Fase de relaxamento lenta do reflexo do tornozelo",
        "means": "Sugere hipotireoidismo como causa da astenia"
      },
      {
        "name": "Palidez palmar",
        "eponym": "Anemia",
        "how": "Pregas palmares descoradas",
        "means": "Anemia significativa — investigar causa"
      },
      {
        "name": "Hiperpigmentação cutânea",
        "eponym": "Insuficiência adrenal (Addison)",
        "how": "Escurecimento de pregas, cicatrizes e mucosas",
        "means": "Doença de Addison — fadiga + hipotensão + avidez por sal"
      }
    ],
    "ddx": [
      [
        "Anemia",
        "Palidez, dispneia aos esforços, taquicardia, Hb baixa",
        "Hemograma normal"
      ],
      [
        "Hipotireoidismo",
        "Intolerância ao frio, pele seca, ganho de peso, TSH ↑",
        "TSH normal"
      ],
      [
        "Depressão",
        "Anedonia, fadiga ao acordar, alteração do sono/apetite",
        "Anedonia ausente, fadiga ao esforço"
      ],
      [
        "Apneia do sono",
        "Sonolência diurna, ronco, fadiga matinal, obesidade",
        "Sono reparador, sem ronco"
      ],
      [
        "Neoplasia/doença crônica",
        "Perda de peso, febre, sudorese noturna, sinais de alarme",
        "Exame e marcadores normais"
      ],
      [
        "Fadiga relacionada a fármacos",
        "Início após novo medicamento (betabloq., sedativo)",
        "Sem mudança medicamentosa recente"
      ],
      [
        "Síndrome da fadiga crônica",
        "Fadiga >6 meses, pós-esforço, exames normais",
        "Causa orgânica identificável"
      ]
    ],
    "escalas": [
      {
        "title": "Orgânica x Funcional",
        "headers": [
          "Característica",
          "Orgânica",
          "Funcional/Psíquica"
        ],
        "rows": [
          [
            "Início",
            "Recente, progressivo",
            "Crônico, flutuante"
          ],
          [
            "Relação com esforço",
            "Piora ao esforço",
            "Já presente ao acordar"
          ],
          [
            "Repouso",
            "Melhora",
            "Não melhora"
          ],
          [
            "Sinais de alarme",
            "Frequentes",
            "Ausentes"
          ]
        ],
        "note": "O padrão temporal ajuda a priorizar a investigação orgânica versus o suporte psicossocial"
      },
      {
        "title": "Sinais de alarme na astenia",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Perda de peso não intencional",
            "Neoplasia, infecção crônica, hipertireoidismo"
          ],
          [
            "Febre/sudorese noturna",
            "Infecção crônica, linfoma"
          ],
          [
            "Linfadenomegalia/visceromegalia",
            "Doença hematológica/neoplásica"
          ],
          [
            "Fraqueza muscular objetiva",
            "Doença neuromuscular — não é astenia"
          ]
        ],
        "note": "Astenia com sinais de alarme exige investigação orgânica dirigida e precoce"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma completo (anemia)",
        "TSH e T4 livre (tireoide)",
        "Glicemia/HbA1c",
        "Função renal e hepática, eletrólitos (Na, K, Ca)",
        "Ferritina e perfil de ferro",
        "Sorologias conforme suspeita (HIV, hepatites, mononucleose)",
        "VHS/PCR; rastreio oncológico conforme idade e sinais de alarme"
      ],
      "drugs": [
        "Não há medicação sintomática genérica — tratar a causa de base",
        "Repor ferro/vitaminas se carência documentada",
        "Ajustar/retirar fármacos sedativos quando possível",
        "Abordar higiene do sono e suporte para depressão/ansiedade"
      ],
      "steps": [
        "1. Diferenciar astenia (cansaço) de fraqueza muscular objetiva",
        "2. Definir o padrão temporal (orgânico x funcional)",
        "3. Pesquisar sinais de alarme",
        "4. Solicitar rastreio laboratorial básico (hemograma, TSH, glicemia, função renal/hepática)",
        "5. Tratar a causa identificada e reavaliar; considerar causas psíquicas quando a investigação orgânica é negativa"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de astenia/fatiga",
        "rows": [
          [
            "Vascular/Cardíaca",
            "Insuficiencia cardíaca, anemia, hipotensión"
          ],
          [
            "Infecciosa",
            "Mononucleosis, tuberculosis, VIH, COVID, endocarditis"
          ],
          [
            "Tóxico/Medicamentosa",
            "Betabloqueantes, sedantes, alcohol, quimioterapia"
          ],
          [
            "Autoinmune/Inflamatoria",
            "Lupus, artritis reumatoide, polimialgia"
          ],
          [
            "Metabólica/Endocrina",
            "Hipotiroidismo, diabetes, Addison, trastornos electrolíticos"
          ],
          [
            "Neoplásica",
            "Síndrome consumptiva, anemia paraneoplásica"
          ],
          [
            "Depresión/Psíquica",
            "Depresión, ansiedad, trastorno del sueño"
          ]
        ]
      },
      {
        "name": "Patrón temporal de la fatiga",
        "rows": [
          [
            "Orgánica",
            "Empeora a lo largo del día, con el esfuerzo; mejora con el reposo; inicio reciente y progresivo"
          ],
          [
            "Funcional/psicógena",
            "Ya presente al despertar, no mejora con el reposo, crónica y fluctuante"
          ],
          [
            "Alarma",
            "Pérdida de peso, fiebre, sudoración nocturna, adenomegalia → investigar causa orgánica grave"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Diferenciar astenia de debilidad muscular real",
        "subtitle": "Semiología neuromuscular",
        "steps": [
          "Probar la fuerza muscular segmentaria (escala MRC 0-5)",
          "Pedir tareas funcionales: levantarse de la silla sin apoyo, elevar los brazos"
        ],
        "normal": "Fuerza preservada (5/5) — cansancio sin déficit = astenia",
        "abnormal": "Fuerza reducida objetivamente → debilidad neuromuscular (miopatía, neuropatía), no astenia"
      },
      {
        "title": "Búsqueda de palidez/anemia",
        "subtitle": "Causa frecuente de astenia",
        "steps": [
          "Inspeccionar conjuntivas, palmas y mucosas",
          "Evaluar taquicardia y soplo sistólico funcional"
        ],
        "normal": "Mucosas coloreadas",
        "abnormal": "Palidez mucosa → anemia probable; solicitar hemograma"
      },
      {
        "title": "Evaluación de la tiroides",
        "subtitle": "Hipotiroidismo",
        "steps": [
          "Palpar la glándula tiroides",
          "Buscar piel seca, bradicardia, reflejo aquíleo enlentecido"
        ],
        "normal": "Tiroides normal, sin signos de hipofunción",
        "abnormal": "Bocio/signos de hipotiroidismo → dosar TSH"
      }
    ],
    "sinais": [
      {
        "name": "Reflejo aquíleo enlentecido",
        "eponym": "Hipotiroidismo",
        "how": "Fase de relajación lenta del reflejo del tobillo",
        "means": "Sugiere hipotiroidismo como causa de la astenia"
      },
      {
        "name": "Palidez palmar",
        "eponym": "Anemia",
        "how": "Pliegues palmares descoloridos",
        "means": "Anemia significativa — investigar la causa"
      },
      {
        "name": "Hiperpigmentación cutánea",
        "eponym": "Insuficiencia adrenal (Addison)",
        "how": "Oscurecimiento de pliegues, cicatrices y mucosas",
        "means": "Enfermedad de Addison — fatiga + hipotensión + avidez por sal"
      }
    ],
    "ddx": [
      [
        "Anemia",
        "Palidez, disnea de esfuerzo, taquicardia, Hb baja",
        "Hemograma normal"
      ],
      [
        "Hipotiroidismo",
        "Intolerancia al frío, piel seca, ganancia de peso, TSH ↑",
        "TSH normal"
      ],
      [
        "Depresión",
        "Anhedonia, fatiga al despertar, alteración del sueño/apetito",
        "Anhedonia ausente, fatiga con el esfuerzo"
      ],
      [
        "Apnea del sueño",
        "Somnolencia diurna, ronquido, fatiga matinal, obesidad",
        "Sueño reparador, sin ronquido"
      ],
      [
        "Neoplasia/enfermedad crónica",
        "Pérdida de peso, fiebre, sudoración nocturna, signos de alarma",
        "Examen y marcadores normales"
      ],
      [
        "Fatiga relacionada con fármacos",
        "Inicio tras un nuevo medicamento (betabloq., sedante)",
        "Sin cambio medicamentoso reciente"
      ],
      [
        "Síndrome de fatiga crónica",
        "Fatiga >6 meses, posesfuerzo, exámenes normales",
        "Causa orgánica identificable"
      ]
    ],
    "escalas": [
      {
        "title": "Orgánica x Funcional",
        "headers": [
          "Característica",
          "Orgánica",
          "Funcional/Psíquica"
        ],
        "rows": [
          [
            "Inicio",
            "Reciente, progresivo",
            "Crónico, fluctuante"
          ],
          [
            "Relación con el esfuerzo",
            "Empeora con el esfuerzo",
            "Ya presente al despertar"
          ],
          [
            "Reposo",
            "Mejora",
            "No mejora"
          ],
          [
            "Signos de alarma",
            "Frecuentes",
            "Ausentes"
          ]
        ],
        "note": "El patrón temporal ayuda a priorizar la investigación orgánica frente al soporte psicosocial"
      },
      {
        "title": "Signos de alarma en la astenia",
        "headers": [
          "Hallazgo",
          "Significado"
        ],
        "rows": [
          [
            "Pérdida de peso no intencional",
            "Neoplasia, infección crónica, hipertiroidismo"
          ],
          [
            "Fiebre/sudoración nocturna",
            "Infección crónica, linfoma"
          ],
          [
            "Adenomegalia/visceromegalia",
            "Enfermedad hematológica/neoplásica"
          ],
          [
            "Debilidad muscular objetiva",
            "Enfermedad neuromuscular — no es astenia"
          ]
        ],
        "note": "La astenia con signos de alarma exige investigación orgánica dirigida y precoz"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma completo (anemia)",
        "TSH y T4 libre (tiroides)",
        "Glucemia/HbA1c",
        "Función renal y hepática, electrolitos (Na, K, Ca)",
        "Ferritina y perfil de hierro",
        "Serologías según sospecha (VIH, hepatitis, mononucleosis)",
        "VSG/PCR; rastreo oncológico según edad y signos de alarma"
      ],
      "drugs": [
        "No hay medicación sintomática genérica — tratar la causa de base",
        "Reponer hierro/vitaminas si hay carencia documentada",
        "Ajustar/retirar fármacos sedantes cuando sea posible",
        "Abordar higiene del sueño y soporte para depresión/ansiedad"
      ],
      "steps": [
        "1. Diferenciar astenia (cansancio) de debilidad muscular objetiva",
        "2. Definir el patrón temporal (orgánico x funcional)",
        "3. Buscar signos de alarma",
        "4. Solicitar rastreo de laboratorio básico (hemograma, TSH, glucemia, función renal/hepática)",
        "5. Tratar la causa identificada y reevaluar; considerar causas psíquicas cuando la investigación orgánica es negativa"
      ]
    }
  }
});
