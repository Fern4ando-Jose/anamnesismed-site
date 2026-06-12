// Motivo: perda-peso — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("perda-peso", {
  "name": "Perda de Peso / Anorexia",
  "nameEs": "Pérdida de Peso / Anorexia",
  "icon": "⚖️",
  "color": "mc-secondary",
  "rasHighlight": [
    "digest",
    "endocrino",
    "psiquismo"
  ],
  "aeaGuide": [
    {
      "q": "Quantidade de peso perdido e em quanto tempo?",
      "qEs": "¿Cuánto peso perdió y en cuánto tiempo?",
      "type": "input",
      "ph": "kg / período",
      "ph2": "kg / período"
    },
    {
      "q": "Perda foi intencional (dieta/exercício) ou não intencional?",
      "qEs": "¿La pérdida fue intencional (dieta/ejercicio) o no intencional?",
      "type": "radio",
      "opts": [
        "Intencional",
        "Não intencional/involuntária"
      ]
    },
    {
      "q": "Diminuição do apetite (anorexia)?",
      "qEs": "¿Disminución del apetito (anorexia)?",
      "type": "yn"
    },
    {
      "q": "Febre, sudorese noturna associadas?",
      "qEs": "¿Fiebre, sudoración nocturna asociadas?",
      "type": "yn"
    },
    {
      "q": "Alteração do hábito intestinal (diarreia, constipação, esteatorreia)?",
      "qEs": "¿Alteración del hábito intestinal (diarrea, estreñimiento, esteatorrea)?",
      "type": "yn"
    },
    {
      "q": "Disfagia ou odinofagia?",
      "qEs": "¿Disfagia u odinofagia?",
      "type": "yn"
    },
    {
      "q": "Sintomas de hipertireoidismo (palpitações, tremor, intolerância ao calor)?",
      "qEs": "¿Síntomas de hipertiroidismo (palpitaciones, temblor, intolerancia al calor)?",
      "type": "yn"
    },
    {
      "q": "Sintomas depressivos, ansiedade, estresse recente?",
      "qEs": "¿Síntomas depresivos, ansiedad, estrés reciente?",
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
        "kw": "EMAGRECE",
        "name": "Causas de perda de peso involuntária",
        "rows": [
          [
            "E",
            "Endócrino",
            "Hipertireoidismo, diabetes mellitus descompensado, insuficiência adrenal"
          ],
          [
            "M",
            "Maligno (neoplasia)",
            "Emagrecimento + sintomas B (febre, sudorese noturna) — investigar sempre"
          ],
          [
            "A",
            "Aparelho digestivo",
            "DII, má-absorção, doença celíaca, úlcera péptica"
          ],
          [
            "G",
            "Geriátrico/funcional",
            "Disfagia, problemas dentários, isolamento social, depressão"
          ],
          [
            "R",
            "Repetidas infecções (consumptivas)",
            "Tuberculose, HIV/AIDS, endocardite"
          ],
          [
            "E²",
            "Emocional/psiquiátrico",
            "Depressão, transtornos alimentares (anorexia/bulimia), ansiedade"
          ],
          [
            "C",
            "Crônicas (doenças sistêmicas)",
            "DPOC, insuficiência cardíaca, doença renal crônica, hepatopatia"
          ],
          [
            "E³",
            "Estimulantes/drogas/álcool",
            "Uso de substâncias, efeitos adversos medicamentosos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação nutricional/IMC",
        "subtitle": "Quantificação da perda de peso",
        "steps": [
          "Calcular % de perda em relação ao peso habitual e tempo decorrido",
          "IMC = peso(kg)/altura²(m)",
          "Classificar perda significativa: >5% em 1 mês ou >10% em 6 meses"
        ],
        "normal": "Peso estável, IMC adequado",
        "abnormal": "Perda ≥5%/mês ou ≥10%/6 meses → perda de peso clinicamente significativa, investigar"
      },
      {
        "title": "Palpação de linfonodos",
        "subtitle": "Rastreio de neoplasia/infecção",
        "steps": [
          "Palpar cadeias cervicais, supraclaviculares, axilares e inguinais",
          "Avaliar tamanho, consistência, mobilidade e dor"
        ],
        "normal": "Linfonodos não palpáveis ou <1cm, móveis, indolores",
        "abnormal": "Linfonodomegalia endurecida, fixa, indolor (especialmente supraclavicular - nódulo de Virchow) → investigar neoplasia"
      },
      {
        "title": "Palpação da tireoide",
        "subtitle": "Rastreio de hipertireoidismo",
        "steps": [
          "Palpar a glândula durante a deglutição, por trás ou pela frente do paciente",
          "Avaliar tamanho, nódulos, consistência e frêmito"
        ],
        "normal": "Tireoide não palpável ou de tamanho normal, sem nódulos",
        "abnormal": "Bócio difuso ou nodular, frêmito → investigar disfunção tireoidiana"
      },
      {
        "title": "Exame abdominal completo",
        "subtitle": "Rastreio de massas e organomegalias",
        "steps": [
          "Inspeção, ausculta, percussão e palpação sistemática dos quadrantes",
          "Pesquisar hepatomegalia, esplenomegalia e massas palpáveis"
        ],
        "normal": "Abdome flácido, sem massas ou organomegalias",
        "abnormal": "Massa palpável, hepatoesplenomegalia → investigar causa neoplásica/infecciosa/hepática"
      }
    ],
    "sinais": [
      {
        "name": "Bócio",
        "eponym": "Hipertireoidismo/doença tireoidiana",
        "how": "Aumento visível ou palpável da glândula tireoide",
        "means": "Sugere disfunção tireoidiana como causa do emagrecimento"
      },
      {
        "name": "Palidez cutaneomucosa",
        "eponym": "Anemia associada",
        "how": "Coloração pálida de conjuntivas, mucosa oral e leitos ungueais",
        "means": "Sugere anemia — pode acompanhar doença consumptiva, neoplasia ou má-absorção"
      },
      {
        "name": "Caquexia",
        "eponym": "Síndrome consumptiva",
        "how": "Perda importante de massa muscular e gordura, fraqueza, fadiga",
        "means": "Sinal de doença sistêmica avançada — neoplasia, infecção crônica (TB/HIV), insuficiência orgânica terminal"
      }
    ],
    "ddx": [
      [
        "Neoplasia maligna",
        "Emagrecimento progressivo, sintomas B, massa/linfonodomegalia, idade avançada, tabagismo",
        "Ausência de massas, exames de rastreio normais, melhora com tratamento de causa benigna"
      ],
      [
        "Hipertireoidismo",
        "Perda de peso com aumento do apetite, taquicardia, tremor, intolerância ao calor, bócio",
        "TSH normal, sem sinais adrenérgicos"
      ],
      [
        "Diabetes mellitus descompensado",
        "Poliúria, polidipsia, polifagia com emagrecimento, glicemia elevada",
        "Glicemia normal, sem sintomas cardinais de DM"
      ],
      [
        "Depressão/transtorno psiquiátrico",
        "Humor deprimido, anedonia, alteração de sono e apetite, isolamento social",
        "Exame físico e laboratorial completamente normais não excluem, mas ausência de sintomas depressivos torna menos provável"
      ],
      [
        "Doença consumptiva/infecciosa (TB, HIV)",
        "Febre, sudorese noturna, tosse crônica, fatores de risco epidemiológicos, linfonodomegalia",
        "Sorologias e investigação infecciosa negativas"
      ],
      [
        "DII/má-absorção",
        "Diarreia crônica, dor abdominal, sangue nas fezes, deficiências nutricionais",
        "Trânsito intestinal normal, exames de má-absorção negativos"
      ]
    ],
    "escalas": [
      {
        "title": "Classificação de perda de peso significativa (tempo x percentual)",
        "headers": [
          "Período",
          "% de perda considerada significativa",
          "% considerada grave"
        ],
        "rows": [
          [
            "1 semana",
            "1-2%",
            ">2%"
          ],
          [
            "1 mês",
            "5%",
            ">5%"
          ],
          [
            "3 meses",
            "7,5%",
            ">7,5%"
          ],
          [
            "6 meses",
            "10%",
            ">10%"
          ]
        ],
        "note": "Perda \"grave\" no período exige investigação ativa e prioritária da causa"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma completo + VHS/PCR",
        "Glicemia de jejum/HbA1c",
        "TSH e T4 livre",
        "Função renal e hepática, eletrólitos",
        "Urina rotina",
        "Rastreio de HIV e sorologias conforme epidemiologia",
        "Radiografia de tórax ± TC conforme suspeita",
        "Rastreio oncológico orientado por idade/sexo (endoscopia, colonoscopia, mamografia, etc.)"
      ],
      "drugs": [
        "Tratamento dirigido à causa identificada (não há tratamento sintomático específico)",
        "Suporte nutricional/suplementação conforme avaliação",
        "Encaminhamento a especialista conforme achados (endocrinologia, oncologia, psiquiatria, gastroenterologia)"
      ],
      "steps": [
        "1. Confirmar e quantificar a perda de peso (peso habitual x atual x tempo)",
        "2. Anamnese dirigida: apetite, sintomas B, hábito intestinal, humor, medicações, contexto social",
        "3. Exame físico completo (linfonodos, tireoide, abdome, estado nutricional)",
        "4. Rastreio laboratorial amplo inicial",
        "5. Investigação direcionada conforme hipótese mais provável (imagem, endoscopia, sorologias)",
        "6. Encaminhar a especialista se achados sugestivos de neoplasia ou doença sistêmica grave"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de pérdida de peso involuntaria",
        "rows": [
          [
            "Endocrino",
            "Hipertiroidismo, diabetes mellitus descompensada, insuficiencia adrenal"
          ],
          [
            "Maligno (neoplasia)",
            "Adelgazamiento + síntomas B (fiebre, sudoración nocturna) — investigar siempre"
          ],
          [
            "Aparato digestivo",
            "EII, malabsorción, enfermedad celíaca, úlcera péptica"
          ],
          [
            "Geriátrico/funcional",
            "Disfagia, problemas dentales, aislamiento social, depresión"
          ],
          [
            "Infecciones consumptivas",
            "Tuberculosis, VIH/SIDA, endocarditis"
          ],
          [
            "Emocional/psiquiátrico",
            "Depresión, trastornos alimentarios (anorexia/bulimia), ansiedad"
          ],
          [
            "Crónicas (enfermedades sistémicas)",
            "EPOC, insuficiencia cardíaca, enfermedad renal crónica, hepatopatía"
          ],
          [
            "Estimulantes/drogas/alcohol",
            "Uso de sustancias, efectos adversos medicamentosos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Evaluación nutricional/IMC",
        "subtitle": "Cuantificación de la pérdida de peso",
        "steps": [
          "Calcular % de pérdida respecto al peso habitual y tiempo transcurrido",
          "IMC = peso(kg)/altura²(m)",
          "Clasificar pérdida significativa: >5% en 1 mes o >10% en 6 meses"
        ],
        "normal": "Peso estable, IMC adecuado",
        "abnormal": "Pérdida ≥5%/mes o ≥10%/6 meses → pérdida de peso clínicamente significativa, investigar"
      },
      {
        "title": "Palpación de ganglios linfáticos",
        "subtitle": "Rastreo de neoplasia/infección",
        "steps": [
          "Palpar cadenas cervicales, supraclaviculares, axilares e inguinales",
          "Evaluar tamaño, consistencia, movilidad y dolor"
        ],
        "normal": "Ganglios no palpables o <1cm, móviles, indoloros",
        "abnormal": "Adenomegalia endurecida, fija, indolora (especialmente supraclavicular - nódulo de Virchow) → investigar neoplasia"
      },
      {
        "title": "Palpación de la tiroides",
        "subtitle": "Rastreo de hipertiroidismo",
        "steps": [
          "Palpar la glándula durante la deglución, por detrás o por delante del paciente",
          "Evaluar tamaño, nódulos, consistencia y frémito"
        ],
        "normal": "Tiroides no palpable o de tamaño normal, sin nódulos",
        "abnormal": "Bocio difuso o nodular, frémito → investigar disfunción tiroidea"
      },
      {
        "title": "Examen abdominal completo",
        "subtitle": "Rastreo de masas y organomegalias",
        "steps": [
          "Inspección, auscultación, percusión y palpación sistemática de los cuadrantes",
          "Buscar hepatomegalia, esplenomegalia y masas palpables"
        ],
        "normal": "Abdomen blando, sin masas ni organomegalias",
        "abnormal": "Masa palpable, hepatoesplenomegalia → investigar causa neoplásica/infecciosa/hepática"
      }
    ],
    "sinais": [
      {
        "name": "Bocio",
        "eponym": "Hipertiroidismo/enfermedad tiroidea",
        "how": "Aumento visible o palpable de la glándula tiroides",
        "means": "Sugiere disfunción tiroidea como causa del adelgazamiento"
      },
      {
        "name": "Palidez cutaneomucosa",
        "eponym": "Anemia asociada",
        "how": "Coloración pálida de conjuntivas, mucosa oral y lechos ungueales",
        "means": "Sugiere anemia — puede acompañar enfermedad consumptiva, neoplasia o malabsorción"
      },
      {
        "name": "Caquexia",
        "eponym": "Síndrome consumptiva",
        "how": "Pérdida importante de masa muscular y grasa, debilidad, fatiga",
        "means": "Signo de enfermedad sistémica avanzada — neoplasia, infección crónica (TB/VIH), insuficiencia orgánica terminal"
      }
    ],
    "ddx": [
      [
        "Neoplasia maligna",
        "Adelgazamiento progresivo, síntomas B, masa/adenomegalia, edad avanzada, tabaquismo",
        "Ausencia de masas, exámenes de rastreo normales, mejora con tratamiento de causa benigna"
      ],
      [
        "Hipertiroidismo",
        "Pérdida de peso con aumento del apetito, taquicardia, temblor, intolerancia al calor, bocio",
        "TSH normal, sin signos adrenérgicos"
      ],
      [
        "Diabetes mellitus descompensada",
        "Poliuria, polidipsia, polifagia con adelgazamiento, glucemia elevada",
        "Glucemia normal, sin síntomas cardinales de DM"
      ],
      [
        "Depresión/trastorno psiquiátrico",
        "Ánimo deprimido, anhedonia, alteración del sueño y apetito, aislamiento social",
        "Examen físico y laboratorio completamente normales no excluyen, pero ausencia de síntomas depresivos lo hace menos probable"
      ],
      [
        "Enfermedad consumptiva/infecciosa (TB, VIH)",
        "Fiebre, sudoración nocturna, tos crónica, factores de riesgo epidemiológicos, adenomegalia",
        "Serologías e investigación infecciosa negativas"
      ],
      [
        "EII/malabsorción",
        "Diarrea crónica, dolor abdominal, sangre en las heces, deficiencias nutricionales",
        "Tránsito intestinal normal, exámenes de malabsorción negativos"
      ]
    ],
    "escalas": [
      {
        "title": "Clasificación de pérdida de peso significativa (tiempo x porcentaje)",
        "headers": [
          "Período",
          "% de pérdida considerada significativa",
          "% considerada grave"
        ],
        "rows": [
          [
            "1 semana",
            "1-2%",
            ">2%"
          ],
          [
            "1 mes",
            "5%",
            ">5%"
          ],
          [
            "3 meses",
            "7,5%",
            ">7,5%"
          ],
          [
            "6 meses",
            "10%",
            ">10%"
          ]
        ],
        "note": "Pérdida \"grave\" en el período exige investigación activa y prioritaria de la causa"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma completo + VSG/PCR",
        "Glucemia en ayunas/HbA1c",
        "TSH y T4 libre",
        "Función renal y hepática, electrolitos",
        "Orina rutina",
        "Rastreo de VIH y serologías según epidemiología",
        "Radiografía de tórax ± TC según sospecha",
        "Rastreo oncológico orientado por edad/sexo (endoscopia, colonoscopia, mamografía, etc.)"
      ],
      "drugs": [
        "Tratamiento dirigido a la causa identificada (no hay tratamiento sintomático específico)",
        "Soporte nutricional/suplementación según evaluación",
        "Derivación a especialista según hallazgos (endocrinología, oncología, psiquiatría, gastroenterología)"
      ],
      "steps": [
        "1. Confirmar y cuantificar la pérdida de peso (peso habitual x actual x tiempo)",
        "2. Anamnesis dirigida: apetito, síntomas B, hábito intestinal, ánimo, medicaciones, contexto social",
        "3. Examen físico completo (ganglios, tiroides, abdomen, estado nutricional)",
        "4. Rastreo laboratorial amplio inicial",
        "5. Investigación dirigida según la hipótesis más probable (imagen, endoscopia, serologías)",
        "6. Derivar a especialista si hay hallazgos sugestivos de neoplasia o enfermedad sistémica grave"
      ]
    }
  }
});
