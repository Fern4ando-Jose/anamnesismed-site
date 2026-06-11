// Motivo: edema — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("edema", {
  "name": "Edema",
  "nameEs": "Edema",
  "icon": "💧",
  "color": "mc-secondary",
  "rasHighlight": [
    "cardio",
    "genito",
    "resp",
    "digest",
    "pele"
  ],
  "aeaGuide": [
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Agudo/súbito (horas a dias)",
        "Subagudo (dias a semanas)",
        "Crônico/insidioso (semanas a meses)"
      ]
    },
    {
      "q": "Localização",
      "qEs": "Localización",
      "type": "radio",
      "opts": [
        "Membros inferiores (bilateral)",
        "Membro inferior (unilateral)",
        "Membros superiores",
        "Facial/periorbital",
        "Generalizado/anasarca",
        "Escroto/genital",
        "Abdominal (ascite)"
      ]
    },
    {
      "q": "Simetria",
      "qEs": "Simetría",
      "type": "radio",
      "opts": [
        "Simétrico/bilateral",
        "Assimétrico/unilateral"
      ]
    },
    {
      "q": "Progressão",
      "qEs": "Progresión",
      "type": "radio",
      "opts": [
        "Ascendente (pés → pernas → coxas)",
        "Estável, sem progressão",
        "Migratório/intermitente"
      ]
    },
    {
      "q": "Momento do dia / variação",
      "qEs": "Momento del día / variación",
      "type": "radio",
      "opts": [
        "Vespertino (piora no fim do dia, melhora pela manhã)",
        "Matutino/periorbital ao acordar",
        "Constante, sem variação diurna"
      ]
    },
    {
      "q": "Cacifo (sinal de godet positivo)?",
      "qEs": "¿Signo de fóvea/godet positivo?",
      "type": "yn"
    },
    {
      "q": "Dor, calor ou rubor local associado?",
      "qEs": "¿Dolor, calor o rubor local asociado?",
      "type": "yn"
    },
    {
      "q": "Fatores que pioram (ortostatismo prolongado, calor, sal na dieta, viagens longas)",
      "qEs": "Factores que empeoran (bipedestación prolongada, calor, sal en la dieta, viajes largos)",
      "type": "input",
      "ph": "Descreva os fatores desencadeantes/agravantes",
      "ph2": "Describa los factores desencadenantes/agravantes"
    },
    {
      "q": "Fatores que melhoram (repouso, elevação dos membros, restrição de sal, diuréticos)",
      "qEs": "Factores que mejoran (reposo, elevación de miembros, restricción de sal, diuréticos)",
      "type": "input",
      "ph": "Descreva os fatores de melhora",
      "ph2": "Describa los factores de mejora"
    },
    {
      "q": "Dispneia associada (aos esforços, ortopneia, DPN)?",
      "qEs": "¿Disnea asociada (de esfuerzo, ortopnea, DPN)?",
      "type": "yn"
    },
    {
      "q": "Palpitações ou dor torácica associadas?",
      "qEs": "¿Palpitaciones o dolor torácico asociados?",
      "type": "yn"
    },
    {
      "q": "Oligúria, colúria, espuma na urina (proteinúria)?",
      "qEs": "¿Oliguria, coluria, espuma en la orina (proteinuria)?",
      "type": "yn"
    },
    {
      "q": "Aumento do volume abdominal / distensão?",
      "qEs": "¿Aumento del volumen abdominal / distensión?",
      "type": "yn"
    },
    {
      "q": "Icterícia ou outros sinais de hepatopatia?",
      "qEs": "¿Ictericia u otros signos de hepatopatía?",
      "type": "yn"
    },
    {
      "q": "Ganho de peso recente? Quanto e em quanto tempo?",
      "qEs": "¿Aumento de peso reciente? ¿Cuánto y en cuánto tiempo?",
      "type": "input",
      "ph": "kg / período",
      "ph2": "kg / período"
    },
    {
      "q": "Dispneia para deitar (ortopneia) — quantos travesseiros usa para dormir?",
      "qEs": "¿Disnea al acostarse (ortopnea) — cuántas almohadas usa para dormir?",
      "type": "input",
      "ph": "Número de travesseiros",
      "ph2": "Número de almohadas"
    },
    {
      "q": "Imobilização prolongada, viagem longa recente ou cirurgia recente (risco de TVP)?",
      "qEs": "¿Inmovilización prolongada, viaje largo reciente o cirugía reciente (riesgo de TVP)?",
      "type": "yn"
    },
    {
      "q": "Antecedentes de doença cardíaca, renal, hepática ou tireoidiana?",
      "qEs": "¿Antecedentes de enfermedad cardíaca, renal, hepática o tiroidea?",
      "type": "yn"
    },
    {
      "q": "Uso de medicamentos (anti-hipertensivos/BCC, AINEs, corticoides, hormônios, hipoglicemiantes)?",
      "qEs": "¿Uso de medicamentos (antihipertensivos/BCC, AINEs, corticoides, hormonas, hipoglucemiantes)?",
      "type": "input",
      "ph": "Liste os medicamentos em uso",
      "ph2": "Liste los medicamentos en uso"
    },
    {
      "q": "Possibilidade de gravidez / atraso menstrual (em mulheres)?",
      "qEs": "¿Posibilidad de embarazo / atraso menstrual (en mujeres)?",
      "type": "yn"
    },
    {
      "q": "Dieta rica em sal ou baixa ingestão proteica?",
      "qEs": "¿Dieta rica en sal o baja ingesta proteica?",
      "type": "yn"
    },
    {
      "q": "Episódios semelhantes prévios? Como evoluíram e qual tratamento foi feito?",
      "qEs": "¿Episodios similares previos? ¿Cómo evolucionaron y qué tratamiento se realizó?",
      "type": "input",
      "ph": "Descreva episódios anteriores e tratamento",
      "ph2": "Describa episodios anteriores y tratamiento"
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
        "kw": "CHF-RAIN",
        "name": "Causas de edema",
        "rows": [
          [
            "C",
            "Cardíaco (ICC)",
            "Vespertino MMII, ortopneia, BNP ↑"
          ],
          [
            "H",
            "Hepático (cirrose)",
            "Ascite + edema, albumina ↓"
          ],
          [
            "F",
            "Flebite/TVP",
            "Unilateral, dor, empastamento"
          ],
          [
            "R",
            "Renal (nefrótico)",
            "Periorbital matutino, proteinúria ↑↑"
          ],
          [
            "A",
            "Alérgico/angioedema",
            "Súbito, face, urticária"
          ],
          [
            "I",
            "Ins. venosa crônica",
            "Varizes, lipodermatoesclerose"
          ],
          [
            "N",
            "Nutricional/Medicamento",
            "Albumina ↓, anlodipino, corticóides"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Cacifo (Godet)",
        "subtitle": "Edema com cacifo = transudato",
        "steps": [
          "Comprimir sobre a tíbia com polegar 15 segundos",
          "Retirar e observar depressão residual"
        ],
        "normal": "Sem depressão (sem cacifo) → linfedema, mixedema",
        "abnormal": "Depressão persistente (cacifo +) → ICC, cirrose, nefrótico, hipoalbuminemia"
      },
      {
        "title": "Sinal de Homans",
        "subtitle": "TVP (baixa acurácia)",
        "steps": [
          "Decúbito dorsal, joelho levemente fletido",
          "Dorsiflexão passiva forçada do pé"
        ],
        "normal": "Sem dor na panturrilha",
        "abnormal": "Dor na panturrilha → Homans+ (baixa sensibilidade/especificidade → preferir Eco-Doppler)"
      }
    ],
    "sinais": [
      {
        "name": "Edema vespertino bilateral",
        "eponym": "ICC/Ins. venosa",
        "how": "Cacifo em MMII, piora ao longo do dia, melhora com elevação",
        "means": "BNP para diferenciar ICC de insuficiência venosa"
      },
      {
        "name": "Edema periorbital matutino",
        "eponym": "Síndrome nefrótica",
        "how": "Pálpebras superiores inchadas ao acordar + proteinúria",
        "means": "Síndrome nefrótica — proteinúria 24h, albumina, biópsia renal"
      },
      {
        "name": "Mixedema",
        "eponym": "Hipotireoidismo grave",
        "how": "Sem cacifo, pele seca/fria, puffy face, bradicardia",
        "means": "Hipotireoidismo — TSH + T4L; levotiroxina"
      }
    ],
    "ddx": [
      [
        "ICC",
        "Bilateral vespertino, cacifo, ortopneia, crepitantes, BNP ↑",
        "Unilateral, matutino, proteinúria, sem cardiopatia"
      ],
      [
        "TVP",
        "Unilateral, calor, empastamento, D-Dímero ↑",
        "Bilateral, sem dor/calor"
      ],
      [
        "Sd. Nefrótica",
        "Periorbital matutino, proteinúria >3,5g/24h, albumina ↓",
        "Vespertino, sem proteinúria significativa"
      ],
      [
        "Ins. venosa crônica",
        "Varizes, lipodermatoesclerose, úlcera maleolar",
        "Agudo, assimétrico, sem varizes"
      ],
      [
        "Cirrose",
        "Ascite + edema, icterícia, albumina ↓",
        "Sem hepatopatia, albumina normal"
      ]
    ],
    "escalas": [
      {
        "title": "Wells DVT",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Neoplasia ativa",
            "1"
          ],
          [
            "Paralisia/gesso recente",
            "1"
          ],
          [
            "Acamado >3 dias ou cirurgia <12 sem",
            "1"
          ],
          [
            "Dor linha veias profundas",
            "1"
          ],
          [
            "Edema toda a perna",
            "1"
          ],
          [
            "Panturrilha assimétrica >3cm",
            "1"
          ],
          [
            "Cacifo confinado à perna sintomática",
            "1"
          ],
          [
            "Circulação colateral",
            "1"
          ],
          [
            "Diagnóstico alternativo mais provável",
            "-2"
          ]
        ],
        "note": "<2: Baixa → D-Dímero | ≥2: Mod/Alta → Eco-Doppler"
      }
    ],
    "conduta": {
      "exames": [
        "BNP/NT-proBNP",
        "Albumina sérica",
        "Urina rotina + proteinúria 24h",
        "Ureia, Creatinina",
        "TFH",
        "TSH",
        "Eco-Doppler MMII (TVP)",
        "Ecocardiograma (ICC)"
      ],
      "drugs": [
        "Furosemida 40-80mg/dia VO (ICC, nefrótico, cirrose)",
        "Meia elástica 20-30 mmHg (ins. venosa, TVP)",
        "Enoxaparina 1mg/kg SC 12/12h (TVP confirmada)"
      ],
      "steps": [
        "1. Uni ou bilateral? Cacifo? Matutino ou vespertino?",
        "2. Unilateral + dor → Wells DVT → Eco-Doppler",
        "3. Bilateral + BNP ↑ → ICC → Eco cardíaco",
        "4. Periorbital + proteinúria → nefrótico",
        "5. Albumina ↓ → hipoalbuminemia → causa",
        "6. Tratar causa de base"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de edema",
        "rows": [
          [
            "Cardíaco (ICC)",
            "Vespertino MMII, ortopnea, BNP ↑"
          ],
          [
            "Hepático (cirrosis)",
            "Ascitis + edema, albúmina ↓"
          ],
          [
            "Flebitis/TVP",
            "Unilateral, dolor, empastamiento"
          ],
          [
            "Renal (nefrótico)",
            "Periorbitario matutino, proteinuria ↑↑"
          ],
          [
            "Alérgico/angioedema",
            "Súbito, cara, urticaria"
          ],
          [
            "Ins. venosa crónica",
            "Várices, lipodermatoesclerosis"
          ],
          [
            "Nutricional/Medicamento",
            "Albúmina ↓, amlodipino, corticoides"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Fóvea (Godet)",
        "subtitle": "Edema con fóvea = trasudado",
        "steps": [
          "Comprimir sobre la tibia con el pulgar 15 segundos",
          "Retirar y observar la depresión residual"
        ],
        "normal": "Sin depresión (sin fóvea) → linfedema, mixedema",
        "abnormal": "Depresión persistente (fóvea +) → ICC, cirrosis, nefrótico, hipoalbuminemia"
      },
      {
        "title": "Signo de Homans",
        "subtitle": "TVP (baja exactitud)",
        "steps": [
          "Decúbito dorsal, rodilla levemente flexionada",
          "Dorsiflexión pasiva forzada del pie"
        ],
        "normal": "Sin dolor en la pantorrilla",
        "abnormal": "Dolor en la pantorrilla → Homans+ (baja sensibilidad/especificidad → preferir Eco-Doppler)"
      }
    ],
    "sinais": [
      {
        "name": "Edema vespertino bilateral",
        "eponym": "ICC/Ins. venosa",
        "how": "Fóvea en MMII, empeora a lo largo del día, mejora con elevación",
        "means": "BNP para diferenciar ICC de insuficiencia venosa"
      },
      {
        "name": "Edema periorbitario matutino",
        "eponym": "Síndrome nefrótico",
        "how": "Párpados superiores hinchados al despertar + proteinuria",
        "means": "Síndrome nefrótico — proteinuria 24h, albúmina, biopsia renal"
      },
      {
        "name": "Mixedema",
        "eponym": "Hipotiroidismo grave",
        "how": "Sin fóvea, piel seca/fría, cara abotagada, bradicardia",
        "means": "Hipotiroidismo — TSH + T4L; levotiroxina"
      }
    ],
    "ddx": [
      [
        "ICC",
        "Bilateral vespertino, fóvea, ortopnea, crepitantes, BNP ↑",
        "Unilateral, matutino, proteinuria, sin cardiopatía"
      ],
      [
        "TVP",
        "Unilateral, calor, empastamiento, Dímero-D ↑",
        "Bilateral, sin dolor/calor"
      ],
      [
        "Sd. Nefrótico",
        "Periorbitario matutino, proteinuria >3,5g/24h, albúmina ↓",
        "Vespertino, sin proteinuria significativa"
      ],
      [
        "Ins. venosa crónica",
        "Várices, lipodermatoesclerosis, úlcera maleolar",
        "Agudo, asimétrico, sin várices"
      ],
      [
        "Cirrosis",
        "Ascitis + edema, ictericia, albúmina ↓",
        "Sin hepatopatía, albúmina normal"
      ]
    ],
    "escalas": [
      {
        "title": "Wells TVP",
        "headers": [
          "Criterio",
          "Puntos"
        ],
        "rows": [
          [
            "Neoplasia activa",
            "1"
          ],
          [
            "Parálisis/yeso reciente",
            "1"
          ],
          [
            "Encamado >3 días o cirugía <12 sem",
            "1"
          ],
          [
            "Dolor en trayecto de venas profundas",
            "1"
          ],
          [
            "Edema de toda la pierna",
            "1"
          ],
          [
            "Pantorrilla asimétrica >3cm",
            "1"
          ],
          [
            "Fóvea confinada a la pierna sintomática",
            "1"
          ],
          [
            "Circulación colateral",
            "1"
          ],
          [
            "Diagnóstico alternativo más probable",
            "-2"
          ]
        ],
        "note": "<2: Baja → Dímero-D | ≥2: Mod/Alta → Eco-Doppler"
      }
    ],
    "conduta": {
      "exames": [
        "BNP/NT-proBNP",
        "Albúmina sérica",
        "Orina rutina + proteinuria 24h",
        "Urea, Creatinina",
        "Pruebas de función hepática",
        "TSH",
        "Eco-Doppler MMII (TVP)",
        "Ecocardiograma (ICC)"
      ],
      "drugs": [
        "Furosemida 40-80mg/día VO (ICC, nefrótico, cirrosis)",
        "Media elástica 20-30 mmHg (ins. venosa, TVP)",
        "Enoxaparina 1mg/kg SC c/12h (TVP confirmada)"
      ],
      "steps": [
        "1. ¿Uni o bilateral? ¿Fóvea? ¿Matutino o vespertino?",
        "2. Unilateral + dolor → Wells TVP → Eco-Doppler",
        "3. Bilateral + BNP ↑ → ICC → Eco cardíaco",
        "4. Periorbitario + proteinuria → nefrótico",
        "5. Albúmina ↓ → hipoalbuminemia → causa",
        "6. Tratar la causa de base"
      ]
    }
  }
});
