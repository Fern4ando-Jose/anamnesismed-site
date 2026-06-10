// Motivo: nauseas-vomitos — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("nauseas-vomitos", {
  "name": "Náuseas e Vômitos",
  "nameEs": "Náuseas y Vómitos",
  "icon": "🤢",
  "color": "mc-accent",
  "rasHighlight": [
    "digest",
    "cabeca"
  ],
  "aeaGuide": [
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Agudo/súbito",
        "Gradual",
        "Recorrente/cíclico"
      ]
    },
    {
      "q": "Frequência e quantidade dos vômitos",
      "qEs": "Frecuencia y cantidad de los vómitos",
      "type": "input",
      "ph": "Nº de episódios/dia, volume aproximado",
      "ph2": "Nº de episodios/día, volumen aproximado"
    },
    {
      "q": "Conteúdo do vômito",
      "qEs": "Contenido del vómito",
      "type": "radio",
      "opts": [
        "Alimentar",
        "Bilioso (esverdeado)",
        "Fecaloide",
        "Hemático (hematêmese)",
        "Em borra de café"
      ]
    },
    {
      "q": "Relação temporal com as refeições?",
      "qEs": "¿Relación temporal con las comidas?",
      "type": "radio",
      "opts": [
        "Imediatamente após comer",
        "Horas após comer",
        "Em jejum/matutino",
        "Sem relação"
      ]
    },
    {
      "q": "Alívio da dor/náusea após o vômito?",
      "qEs": "¿Alivio del dolor/náusea tras el vómito?",
      "type": "yn"
    },
    {
      "q": "Dor abdominal associada?",
      "qEs": "¿Dolor abdominal asociado?",
      "type": "yn"
    },
    {
      "q": "Diarreia ou constipação associada?",
      "qEs": "¿Diarrea o estreñimiento asociado?",
      "type": "yn"
    },
    {
      "q": "Cefaleia, vertigem ou alterações neurológicas associadas?",
      "qEs": "¿Cefalea, vértigo o alteraciones neurológicas asociadas?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Possibilidade de gravidez (mulheres em idade fértil)?",
      "qEs": "¿Posibilidad de embarazo (mujeres en edad fértil)?",
      "type": "yn"
    },
    {
      "q": "Sinais de desidratação (sede intensa, diminuição da diurese, tontura postural)?",
      "qEs": "¿Signos de deshidratación (sed intensa, disminución de la diuresis, mareo postural)?",
      "type": "yn"
    },
    {
      "q": "Uso recente de medicamentos, álcool ou alimentos suspeitos?",
      "qEs": "¿Uso reciente de medicamentos, alcohol o alimentos sospechosos?",
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
        "kw": "VOMITAR",
        "name": "Causas de náuseas e vômitos",
        "rows": [
          [
            "V",
            "Vestibular/SNC",
            "Vertigem, labirintite, hipertensão intracraniana, enxaqueca"
          ],
          [
            "O",
            "Obstrução/causas GI",
            "Obstrução intestinal, gastroparesia, úlcera péptica, colecistite"
          ],
          [
            "M",
            "Medicamentos/toxinas",
            "Quimioterápicos, opioides, anti-inflamatórios, álcool, intoxicações"
          ],
          [
            "I",
            "Infecção",
            "Gastroenterite viral/bacteriana, ITU, meningite"
          ],
          [
            "T",
            "Transtornos metabólicos",
            "Cetoacidose diabética, uremia, hipercalcemia, insuficiência adrenal"
          ],
          [
            "A",
            "Abdome agudo",
            "Apendicite, pancreatite, obstrução, isquemia mesentérica"
          ],
          [
            "R",
            "Reprodutivo (gravidez)",
            "Hiperêmese gravídica, primeiro trimestre de gestação"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação de sinais de desidratação",
        "subtitle": "Gravidade do quadro de vômitos",
        "steps": [
          "Avaliar turgor cutâneo (prega cutânea)",
          "Inspecionar mucosas orais (umidade)",
          "Avaliar tempo de enchimento capilar e nível de consciência",
          "Aferir PA e FC (hipotensão/taquicardia postural)"
        ],
        "normal": "Mucosas úmidas, turgor normal, sinais vitais estáveis",
        "abnormal": "Mucosas secas, turgor diminuído, taquicardia, hipotensão → desidratação significativa"
      },
      {
        "title": "Exame abdominal sistemático",
        "subtitle": "Identificar causa abdominal",
        "steps": [
          "Inspeção, ausculta de ruídos hidroaéreos, percussão e palpação",
          "Pesquisar distensão, massas, dor localizada e sinais de irritação peritoneal"
        ],
        "normal": "Abdome flácido, ruídos hidroaéreos normais, sem dor à palpação",
        "abnormal": "Distensão, ruídos hidroaéreos aumentados (\"de luta\") ou ausentes, dor localizada → investigar obstrução/abdome agudo"
      },
      {
        "title": "Sinal de Murphy",
        "subtitle": "Suspeita de colecistite",
        "steps": [
          "Palpar o hipocôndrio direito (ponto cístico)",
          "Pedir ao paciente para inspirar profundamente durante a palpação"
        ],
        "normal": "Inspiração completa sem dor",
        "abnormal": "Interrupção súbita da inspiração por dor (Murphy+) → sugere colecistite aguda"
      }
    ],
    "sinais": [
      {
        "name": "Vômitos biliosos",
        "eponym": "Obstrução intestinal baixa/pós-pilórica",
        "how": "Vômito de coloração esverdeada/amarelada (bile)",
        "means": "Sugere obstrução abaixo da ampola de Vater — investigação urgente"
      },
      {
        "name": "Vômitos fecaloides",
        "eponym": "Obstrução intestinal avançada",
        "how": "Vômito com odor e aspecto fecal",
        "means": "Sinal de obstrução intestinal baixa avançada ou fístula — emergência cirúrgica"
      },
      {
        "name": "Hematêmese",
        "eponym": "Sangramento digestivo alto",
        "how": "Vômito com sangue vivo ou em \"borra de café\"",
        "means": "Sugere úlcera péptica, varizes esofágicas ou laceração de Mallory-Weiss — risco de instabilidade hemodinâmica"
      },
      {
        "name": "Sinais de hipertensão intracraniana",
        "eponym": "Causa central de vômitos",
        "how": "Cefaleia matinal, vômitos em jato sem náusea prévia, papiledema, alteração do nível de consciência",
        "means": "Sugere lesão intracraniana — investigação neurológica de urgência"
      }
    ],
    "ddx": [
      [
        "Gastroenterite aguda",
        "Início agudo, diarreia associada, contactantes com sintomas similares, febre baixa",
        "Vômitos persistentes sem diarreia, sinais de abdome agudo"
      ],
      [
        "Obstrução intestinal",
        "Distensão abdominal, parada de eliminação de gases/fezes, vômitos biliosos/fecaloides, RHA aumentados/ausentes",
        "Trânsito intestinal preservado, abdome plano e indolor"
      ],
      [
        "Causa central (HIC, enxaqueca, vestibular)",
        "Cefaleia, vertigem, alteração neurológica, vômitos em jato sem náusea prévia",
        "Dor abdominal proeminente, sinais de irritação peritoneal"
      ],
      [
        "Causa metabólica (cetoacidose, uremia)",
        "Histórico de diabetes/doença renal, hálito cetônico, alteração do estado mental, exames laboratoriais alterados",
        "Glicemia e função renal normais"
      ],
      [
        "Gravidez/hiperêmese gravídica",
        "Mulher em idade fértil, atraso menstrual, β-HCG positivo, sintomas no 1º trimestre",
        "β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Critérios de gravidade da desidratação (OMS, adaptado)",
        "headers": [
          "Sinal",
          "Leve",
          "Moderada",
          "Grave"
        ],
        "rows": [
          [
            "Estado geral",
            "Alerta",
            "Irritado/sonolento",
            "Letárgico/inconsciente"
          ],
          [
            "Mucosas",
            "Úmidas",
            "Secas",
            "Muito secas"
          ],
          [
            "Turgor cutâneo",
            "Normal",
            "Diminuído",
            "Muito diminuído (prega persiste)"
          ],
          [
            "Pulso/PA",
            "Normais",
            "Levemente alterados",
            "Taquicardia/hipotensão"
          ]
        ],
        "note": "Desidratação grave exige reposição volêmica EV imediata e reavaliação contínua"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, eletrólitos, função renal",
        "Glicemia e gasometria (se suspeita metabólica)",
        "β-HCG em mulheres em idade fértil",
        "Amilase/lipase (suspeita de pancreatite)",
        "Exames de imagem abdominal (USG/TC) conforme suspeita de causa estrutural",
        "TC de crânio se sinais de alarme neurológico"
      ],
      "drugs": [
        "Hidratação oral ou EV conforme grau de desidratação (Ringer lactato/SF 0,9%)",
        "Ondansetrona 4-8mg EV/VO ou Metoclopramida 10mg EV/VO",
        "Correção de distúrbios eletrolíticos e metabólicos identificados",
        "Evitar antieméticos que mascarem quadro de abdome agudo até definição diagnóstica"
      ],
      "steps": [
        "1. Avaliar gravidade da desidratação e sinais de alarme (sangue, vômito bilioso/fecaloide, sinais neurológicos)",
        "2. Hidratação adequada conforme gravidade (oral leve/moderada, EV se grave ou intolerância)",
        "3. Antieméticos sintomáticos quando seguro",
        "4. Investigar causa de base conforme contexto clínico (GI, metabólica, central, gestacional)",
        "5. Tratar causa específica identificada",
        "6. Reavaliar resposta ao tratamento e necessidade de internação"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de náuseas y vómitos",
        "rows": [
          [
            "Vestibular/SNC",
            "Vértigo, laberintitis, hipertensión intracraneal, migraña"
          ],
          [
            "Obstrucción/causas GI",
            "Obstrucción intestinal, gastroparesia, úlcera péptica, colecistitis"
          ],
          [
            "Medicamentos/toxinas",
            "Quimioterápicos, opioides, antiinflamatorios, alcohol, intoxicaciones"
          ],
          [
            "Infección",
            "Gastroenteritis viral/bacteriana, ITU, meningitis"
          ],
          [
            "Trastornos metabólicos",
            "Cetoacidosis diabética, uremia, hipercalcemia, insuficiencia adrenal"
          ],
          [
            "Abdomen agudo",
            "Apendicitis, pancreatitis, obstrucción, isquemia mesentérica"
          ],
          [
            "Reproductivo (embarazo)",
            "Hiperémesis gravídica, primer trimestre de gestación"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Evaluación de signos de deshidratación",
        "subtitle": "Gravedad del cuadro de vómitos",
        "steps": [
          "Evaluar turgencia cutánea (pliegue cutáneo)",
          "Inspeccionar mucosas orales (humedad)",
          "Evaluar tiempo de relleno capilar y nivel de conciencia",
          "Medir PA y FC (hipotensión/taquicardia postural)"
        ],
        "normal": "Mucosas húmedas, turgencia normal, signos vitales estables",
        "abnormal": "Mucosas secas, turgencia disminuida, taquicardia, hipotensión → deshidratación significativa"
      },
      {
        "title": "Examen abdominal sistemático",
        "subtitle": "Identificar causa abdominal",
        "steps": [
          "Inspección, auscultación de ruidos hidroaéreos, percusión y palpación",
          "Buscar distensión, masas, dolor localizado y signos de irritación peritoneal"
        ],
        "normal": "Abdomen blando, ruidos hidroaéreos normales, sin dolor a la palpación",
        "abnormal": "Distensión, ruidos hidroaéreos aumentados (\"de lucha\") o ausentes, dolor localizado → investigar obstrucción/abdomen agudo"
      },
      {
        "title": "Signo de Murphy",
        "subtitle": "Sospecha de colecistitis",
        "steps": [
          "Palpar el hipocondrio derecho (punto cístico)",
          "Pedir al paciente inspirar profundamente durante la palpación"
        ],
        "normal": "Inspiración completa sin dolor",
        "abnormal": "Interrupción súbita de la inspiración por dolor (Murphy+) → sugiere colecistitis aguda"
      }
    ],
    "sinais": [
      {
        "name": "Vómitos biliosos",
        "eponym": "Obstrucción intestinal baja/pospilórica",
        "how": "Vómito de coloración verdosa/amarillenta (bilis)",
        "means": "Sugiere obstrucción por debajo de la ampolla de Vater — investigación urgente"
      },
      {
        "name": "Vómitos fecaloides",
        "eponym": "Obstrucción intestinal avanzada",
        "how": "Vómito con olor y aspecto fecal",
        "means": "Signo de obstrucción intestinal baja avanzada o fístula — emergencia quirúrgica"
      },
      {
        "name": "Hematemesis",
        "eponym": "Sangrado digestivo alto",
        "how": "Vómito con sangre fresca o en \"borra de café\"",
        "means": "Sugiere úlcera péptica, várices esofágicas o laceración de Mallory-Weiss — riesgo de inestabilidad hemodinámica"
      },
      {
        "name": "Signos de hipertensión intracraneal",
        "eponym": "Causa central de vómitos",
        "how": "Cefalea matinal, vómitos en proyectil sin náusea previa, papiledema, alteración del nivel de conciencia",
        "means": "Sugiere lesión intracraneal — investigación neurológica de urgencia"
      }
    ],
    "ddx": [
      [
        "Gastroenteritis aguda",
        "Inicio agudo, diarrea asociada, contactos con síntomas similares, febrícula",
        "Vómitos persistentes sin diarrea, signos de abdomen agudo"
      ],
      [
        "Obstrucción intestinal",
        "Distensión abdominal, parada de eliminación de gases/heces, vómitos biliosos/fecaloides, RHA aumentados/ausentes",
        "Tránsito intestinal preservado, abdomen plano e indoloro"
      ],
      [
        "Causa central (HIC, migraña, vestibular)",
        "Cefalea, vértigo, alteración neurológica, vómitos en proyectil sin náusea previa",
        "Dolor abdominal prominente, signos de irritación peritoneal"
      ],
      [
        "Causa metabólica (cetoacidosis, uremia)",
        "Antecedente de diabetes/enfermedad renal, aliento cetónico, alteración del estado mental, laboratorio alterado",
        "Glucemia y función renal normales"
      ],
      [
        "Embarazo/hiperémesis gravídica",
        "Mujer en edad fértil, atraso menstrual, β-HCG positivo, síntomas en el 1er trimestre",
        "β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Criterios de gravedad de la deshidratación (OMS, adaptado)",
        "headers": [
          "Signo",
          "Leve",
          "Moderada",
          "Grave"
        ],
        "rows": [
          [
            "Estado general",
            "Alerta",
            "Irritado/somnoliento",
            "Letárgico/inconsciente"
          ],
          [
            "Mucosas",
            "Húmedas",
            "Secas",
            "Muy secas"
          ],
          [
            "Turgencia cutánea",
            "Normal",
            "Disminuida",
            "Muy disminuida (el pliegue persiste)"
          ],
          [
            "Pulso/PA",
            "Normales",
            "Levemente alterados",
            "Taquicardia/hipotensión"
          ]
        ],
        "note": "La deshidratación grave exige reposición volémica EV inmediata y reevaluación continua"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, electrolitos, función renal",
        "Glucemia y gasometría (si sospecha metabólica)",
        "β-HCG en mujeres en edad fértil",
        "Amilasa/lipasa (sospecha de pancreatitis)",
        "Imagen abdominal (USG/TC) según sospecha de causa estructural",
        "TC de cráneo si hay signos de alarma neurológico"
      ],
      "drugs": [
        "Hidratación oral o EV según grado de deshidratación (Ringer lactato/SF 0,9%)",
        "Ondansetrón 4-8mg EV/VO o Metoclopramida 10mg EV/VO",
        "Corrección de trastornos electrolíticos y metabólicos identificados",
        "Evitar antieméticos que enmascaren un cuadro de abdomen agudo hasta la definición diagnóstica"
      ],
      "steps": [
        "1. Evaluar gravedad de la deshidratación y signos de alarma (sangre, vómito bilioso/fecaloide, signos neurológicos)",
        "2. Hidratación adecuada según gravedad (oral leve/moderada, EV si grave o intolerancia)",
        "3. Antieméticos sintomáticos cuando sea seguro",
        "4. Investigar la causa de base según el contexto clínico (GI, metabólica, central, gestacional)",
        "5. Tratar la causa específica identificada",
        "6. Reevaluar la respuesta al tratamiento y la necesidad de internación"
      ]
    }
  }
});
