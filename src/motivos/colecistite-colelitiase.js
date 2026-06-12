// Motivo: colecistite-colelitiase — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("colecistite-colelitiase", {
  "name": "Colecistite / Cólica Biliar",
  "nameEs": "Colecistitis / Cólico Biliar",
  "icon": "💛",
  "color": "mc-accent",
  "isPain": true,
  "rasHighlight": [
    "digest"
  ],
  "aeaGuide": [
    {
      "q": "Localização da dor",
      "qEs": "Localización del dolor",
      "type": "radio",
      "opts": [
        "Hipocôndrio direito (HCD)",
        "Epigástrio",
        "HCD e epigástrio",
        "Difusa"
      ],
      "optsEs": [
        "Hipocondrio derecho (HCD)",
        "Epigastrio",
        "HCD y epigastrio",
        "Difusa"
      ]
    },
    {
      "q": "Irradiação",
      "qEs": "Irradiación",
      "type": "radio",
      "opts": [
        "Escápula / ombro direito (clássico)",
        "Dorso",
        "Sem irradiação"
      ],
      "optsEs": [
        "Escápula / hombro derecho (clásico)",
        "Dorso",
        "Sin irradiación"
      ]
    },
    {
      "q": "Caráter da dor",
      "qEs": "Carácter del dolor",
      "type": "radio",
      "opts": [
        "Cólica intensa (em crise, cessa espontaneamente)",
        "Constante e progressiva",
        "Surda / em peso"
      ],
      "optsEs": [
        "Cólico intenso (en crisis, cede espontáneamente)",
        "Constante y progresiva",
        "Sorda / pesadez"
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
      "q": "Início em relação à alimentação",
      "qEs": "Inicio en relación a la alimentación",
      "type": "radio",
      "opts": [
        "Logo após refeição gordurosa (30 min–2h)",
        "Algumas horas após comer",
        "Sem relação com alimentação"
      ],
      "optsEs": [
        "Justo después de comida grasa (30 min–2h)",
        "Algunas horas después de comer",
        "Sin relación con la alimentación"
      ]
    },
    {
      "q": "Duração do episódio atual",
      "qEs": "Duración del episodio actual",
      "type": "radio",
      "opts": [
        "Menos de 6 horas",
        "Entre 6 e 24 horas",
        "Mais de 24 horas",
        "Contínua / persistente"
      ],
      "optsEs": [
        "Menos de 6 horas",
        "Entre 6 y 24 horas",
        "Más de 24 horas",
        "Continua / persistente"
      ]
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Náuseas ou vômitos?",
      "qEs": "¿Náuseas o vómitos?",
      "type": "yn"
    },
    {
      "q": "Icterícia (pele ou olhos amarelados)?",
      "qEs": "¿Ictericia (piel u ojos amarillos)?",
      "type": "yn"
    },
    {
      "q": "Urina escurecida (colúria)?",
      "qEs": "¿Orina oscurecida (coluria)?",
      "type": "yn"
    },
    {
      "q": "Fezes claras / esbranquiçadas (acolia)?",
      "qEs": "¿Heces claras / blanquecinas (acolia)?",
      "type": "yn"
    },
    {
      "q": "Episódios semelhantes anteriores? Com que frequência?",
      "qEs": "¿Episodios similares anteriores? ¿Con qué frecuencia?",
      "type": "input",
      "ph": "Número de episódios e intervalo entre eles",
      "ph2": "Número de episodios e intervalo entre ellos"
    },
    {
      "q": "Piora ao inspirar fundo com palpação do HCD (sinal de Murphy)?",
      "qEs": "¿Empeora al inspirar profundo con palpación del HCD (signo de Murphy)?",
      "type": "yn"
    },
    {
      "q": "Sinal de alarme — febre alta com calafrios + icterícia (tríade de Charcot — sugere colangite)?",
      "qEs": "¿Signo de alarma — fiebre alta con escalofríos + ictericia (tríada de Charcot — sugiere colangitis)?",
      "type": "yn"
    },
    {
      "q": "Fatores de risco: sexo feminino, obesidade, multiparidade, uso de ACO, emagrecimento rápido?",
      "qEs": "¿Factores de riesgo: sexo femenino, obesidad, multiparidad, uso de ACO, adelgazamiento rápido?",
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
        "kw": "5 F",
        "name": "Fatores de risco para colelitíase",
        "rows": [
          [
            "F",
            "Female",
            "Sexo feminino"
          ],
          [
            "F",
            "Forty",
            "Idade ~40 anos"
          ],
          [
            "F",
            "Fat",
            "Obesidade / dislipidemia"
          ],
          [
            "F",
            "Fertile",
            "Multiparidade / estrógeno"
          ],
          [
            "F",
            "Family",
            "História familiar"
          ]
        ]
      },
      {
        "kw": "CHARCOT",
        "name": "Tríade da colangite",
        "rows": [
          [
            "F",
            "Febre",
            "Febre com calafrios"
          ],
          [
            "I",
            "Icterícia",
            "Icterícia obstrutiva"
          ],
          [
            "D",
            "Dor HCD",
            "Dor no hipocôndrio direito"
          ]
        ]
      },
      {
        "kw": "COMPLICA",
        "name": "Complicações da litíase biliar",
        "rows": [
          [
            "C",
            "Colecistite",
            "Inflamação aguda da vesícula"
          ],
          [
            "O",
            "Obstrução",
            "Coledocolitíase → icterícia"
          ],
          [
            "M",
            "colangite",
            "Infecção da via biliar"
          ],
          [
            "P",
            "Pancreatite",
            "Cálculo impactado na papila"
          ],
          [
            "I",
            "Íleo biliar",
            "Fístula + obstrução por cálculo"
          ],
          [
            "A",
            "Abscesso/empiema",
            "Vesícula supurada"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Murphy",
        "subtitle": "Colecistite aguda",
        "steps": [
          "Mão sob o rebordo costal direito (linha hemiclavicular)",
          "Pedir ao paciente para inspirar profundamente",
          "Observar interrupção súbita da inspiração por dor"
        ],
        "normal": "Inspiração completa sem dor",
        "abnormal": "Parada inspiratória dolorosa (Murphy +) → colecistite aguda"
      },
      {
        "title": "Murphy ultrassonográfico",
        "subtitle": "Confirmação por imagem",
        "steps": [
          "Transdutor sobre a vesícula durante a USG",
          "Pesquisar dor máxima sobre a vesícula visualizada"
        ],
        "normal": "Sem dor focal; parede fina <3 mm",
        "abnormal": "Dor focal + parede >3 mm + líquido perivesicular → colecistite"
      },
      {
        "title": "Pesquisa de icterícia",
        "subtitle": "Suspeita de coledocolitíase",
        "steps": [
          "Inspecionar esclera sob luz natural",
          "Avaliar colúria e acolia fecal"
        ],
        "normal": "Esclera anictérica",
        "abnormal": "Icterícia + colúria → obstrução biliar (coledocolitíase/colangite)"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Murphy",
        "eponym": "Colecistite aguda",
        "how": "Parada inspiratória à palpação do HCD",
        "means": "Colecistite aguda — alta sensibilidade"
      },
      {
        "name": "Tríade de Charcot",
        "eponym": "Colangite",
        "how": "Febre + icterícia + dor HCD",
        "means": "Colangite aguda — antibiótico + drenagem biliar"
      },
      {
        "name": "Sinal de Courvoisier",
        "eponym": "Obstrução maligna",
        "how": "Vesícula palpável, indolor, com icterícia",
        "means": "Sugere obstrução maligna (tumor de cabeça de pâncreas), não litíase"
      },
      {
        "name": "Pêntade de Reynolds",
        "eponym": "Colangite tóxica",
        "how": "Charcot + hipotensão + confusão",
        "means": "Colangite supurativa grave — drenagem de urgência"
      }
    ],
    "ddx": [
      [
        "Cólica biliar",
        "Dor HCD pós-gordurosa, <6h, sem febre, Murphy -",
        "Febre, leucocitose, Murphy +"
      ],
      [
        "Colecistite aguda",
        "Dor HCD >6h, febre, Murphy +, parede vesicular espessa",
        "Dor curta autolimitada, sem inflamação"
      ],
      [
        "Coledocolitíase",
        "Icterícia, colúria, FA/GGT ↑, dilatação de via biliar",
        "Bilirrubina normal, via biliar fina"
      ],
      [
        "Colangite",
        "Tríade de Charcot, sepse biliar",
        "Sem febre/icterícia"
      ],
      [
        "Pancreatite biliar",
        "Dor epigástrica em faixa, amilase/lipase ↑",
        "Enzimas pancreáticas normais"
      ],
      [
        "Úlcera péptica perfurada",
        "Dor súbita, abdome em tábua, pneumoperitônio",
        "Dor localizada HCD, Murphy +"
      ],
      [
        "Hepatite aguda",
        "Transaminases muito elevadas, icterícia, astenia",
        "Predomínio de FA/GGT, dor tipo cólica"
      ]
    ],
    "escalas": [
      {
        "title": "Tokyo Guidelines — Gravidade da colecistite",
        "headers": [
          "Grau",
          "Critério"
        ],
        "rows": [
          [
            "I (leve)",
            "Sem disfunção orgânica, inflamação leve"
          ],
          [
            "II (moderada)",
            "Leucócitos >18.000, massa palpável, >72h, inflamação local marcada"
          ],
          [
            "III (grave)",
            "Disfunção de órgão (cardiovascular, neurológica, respiratória, renal, hepática, hematológica)"
          ]
        ],
        "note": "Grau III exige suporte de órgão + drenagem precoce"
      },
      {
        "title": "Preditores de coledocolitíase (ASGE)",
        "headers": [
          "Preditor",
          "Força"
        ],
        "rows": [
          [
            "Cálculo no colédoco à USG",
            "Muito forte"
          ],
          [
            "Bilirrubina total >4 mg/dL",
            "Muito forte"
          ],
          [
            "Via biliar dilatada + Bili 1,8-4",
            "Forte"
          ],
          [
            "Colangite clínica",
            "Muito forte"
          ]
        ],
        "note": "Alto risco → CPRE; risco intermediário → colangio-RM ou USG endoscópica"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, PCR",
        "Bilirrubinas, FA, GGT, TGO, TGP",
        "Amilase e lipase (excluir pancreatite)",
        "USG de abdome (exame de escolha)",
        "Colangio-RM/USG endoscópica se suspeita de coledocolitíase"
      ],
      "drugs": [
        "Jejum + hidratação venosa",
        "Analgesia (dipirona/AINE; opioide se intensa)",
        "Antieméticos",
        "Antibiótico (ex.: ceftriaxona + metronidazol) na colecistite/colangite",
        "CPRE para desobstrução na coledocolitíase/colangite"
      ],
      "steps": [
        "1. Confirmar diagnóstico clínico + USG",
        "2. Jejum, hidratação e analgesia",
        "3. ATB se colecistite/colangite",
        "4. Colecistectomia videolaparoscópica precoce (idealmente <72h) na colecistite aguda",
        "5. Coledocolitíase/colangite: CPRE para drenagem + colecistectomia posterior"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Factores de riesgo para colelitiasis",
        "rows": [
          [
            "Female",
            "Sexo femenino"
          ],
          [
            "Forty",
            "Edad ~40 años"
          ],
          [
            "Fat",
            "Obesidad / dislipidemia"
          ],
          [
            "Fertile",
            "Multiparidad / estrógeno"
          ],
          [
            "Family",
            "Antecedente familiar"
          ]
        ]
      },
      {
        "name": "Tríada de la colangitis",
        "rows": [
          [
            "Fiebre",
            "Fiebre con escalofríos"
          ],
          [
            "Ictericia",
            "Ictericia obstructiva"
          ],
          [
            "Dolor HCD",
            "Dolor en el hipocondrio derecho"
          ]
        ]
      },
      {
        "name": "Complicaciones de la litiasis biliar",
        "rows": [
          [
            "Colecistitis",
            "Inflamación aguda de la vesícula"
          ],
          [
            "Obstrucción",
            "Coledocolitiasis → ictericia"
          ],
          [
            "colangitis",
            "Infección de la vía biliar"
          ],
          [
            "Pancreatitis",
            "Cálculo impactado en la papila"
          ],
          [
            "Íleo biliar",
            "Fístula + obstrucción por cálculo"
          ],
          [
            "Absceso/empiema",
            "Vesícula supurada"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Murphy",
        "subtitle": "Colecistitis aguda",
        "steps": [
          "Mano bajo el reborde costal derecho (línea hemiclavicular)",
          "Pedir al paciente inspirar profundamente",
          "Observar interrupción súbita de la inspiración por dolor"
        ],
        "normal": "Inspiración completa sin dolor",
        "abnormal": "Detención inspiratoria dolorosa (Murphy +) → colecistitis aguda"
      },
      {
        "title": "Murphy ecográfico",
        "subtitle": "Confirmación por imagen",
        "steps": [
          "Transductor sobre la vesícula durante la USG",
          "Buscar dolor máximo sobre la vesícula visualizada"
        ],
        "normal": "Sin dolor focal; pared fina <3 mm",
        "abnormal": "Dolor focal + pared >3 mm + líquido perivesicular → colecistitis"
      },
      {
        "title": "Búsqueda de ictericia",
        "subtitle": "Sospecha de coledocolitiasis",
        "steps": [
          "Inspeccionar esclera bajo luz natural",
          "Evaluar coluria y acolia fecal"
        ],
        "normal": "Esclera anictérica",
        "abnormal": "Ictericia + coluria → obstrucción biliar (coledocolitiasis/colangitis)"
      }
    ],
    "sinais": [
      {
        "name": "Signo de Murphy",
        "eponym": "Colecistitis aguda",
        "how": "Detención inspiratoria a la palpación del HCD",
        "means": "Colecistitis aguda — alta sensibilidad"
      },
      {
        "name": "Tríada de Charcot",
        "eponym": "Colangitis",
        "how": "Fiebre + ictericia + dolor HCD",
        "means": "Colangitis aguda — antibiótico + drenaje biliar"
      },
      {
        "name": "Signo de Courvoisier",
        "eponym": "Obstrucción maligna",
        "how": "Vesícula palpable, indolora, con ictericia",
        "means": "Sugiere obstrucción maligna (tumor de cabeza de páncreas), no litiasis"
      },
      {
        "name": "Péntada de Reynolds",
        "eponym": "Colangitis tóxica",
        "how": "Charcot + hipotensión + confusión",
        "means": "Colangitis supurativa grave — drenaje de urgencia"
      }
    ],
    "ddx": [
      [
        "Cólico biliar",
        "Dolor HCD posgraso, <6h, sin fiebre, Murphy -",
        "Fiebre, leucocitosis, Murphy +"
      ],
      [
        "Colecistitis aguda",
        "Dolor HCD >6h, fiebre, Murphy +, pared vesicular engrosada",
        "Dolor corto autolimitado, sin inflamación"
      ],
      [
        "Coledocolitiasis",
        "Ictericia, coluria, FA/GGT ↑, dilatación de vía biliar",
        "Bilirrubina normal, vía biliar fina"
      ],
      [
        "Colangitis",
        "Tríada de Charcot, sepsis biliar",
        "Sin fiebre/ictericia"
      ],
      [
        "Pancreatitis biliar",
        "Dolor epigástrico en faja, amilasa/lipasa ↑",
        "Enzimas pancreáticas normales"
      ],
      [
        "Úlcera péptica perforada",
        "Dolor súbito, abdomen en tabla, neumoperitoneo",
        "Dolor localizado HCD, Murphy +"
      ],
      [
        "Hepatitis aguda",
        "Transaminasas muy elevadas, ictericia, astenia",
        "Predominio de FA/GGT, dolor tipo cólico"
      ]
    ],
    "escalas": [
      {
        "title": "Tokyo Guidelines — Gravedad de la colecistitis",
        "headers": [
          "Grado",
          "Criterio"
        ],
        "rows": [
          [
            "I (leve)",
            "Sin disfunción orgánica, inflamación leve"
          ],
          [
            "II (moderada)",
            "Leucocitos >18.000, masa palpable, >72h, inflamación local marcada"
          ],
          [
            "III (grave)",
            "Disfunción de órgano (cardiovascular, neurológica, respiratoria, renal, hepática, hematológica)"
          ]
        ],
        "note": "El grado III exige soporte de órgano + drenaje precoz"
      },
      {
        "title": "Predictores de coledocolitiasis (ASGE)",
        "headers": [
          "Predictor",
          "Fuerza"
        ],
        "rows": [
          [
            "Cálculo en el colédoco en la USG",
            "Muy fuerte"
          ],
          [
            "Bilirrubina total >4 mg/dL",
            "Muy fuerte"
          ],
          [
            "Vía biliar dilatada + Bili 1,8-4",
            "Fuerte"
          ],
          [
            "Colangitis clínica",
            "Muy fuerte"
          ]
        ],
        "note": "Alto riesgo → CPRE; riesgo intermedio → colangio-RM o USG endoscópica"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, PCR",
        "Bilirrubinas, FA, GGT, TGO, TGP",
        "Amilasa y lipasa (excluir pancreatitis)",
        "USG de abdomen (examen de elección)",
        "Colangio-RM/USG endoscópica si sospecha de coledocolitiasis"
      ],
      "drugs": [
        "Ayuno + hidratación venosa",
        "Analgesia (dipirona/AINE; opioide si es intensa)",
        "Antieméticos",
        "Antibiótico (ej.: ceftriaxona + metronidazol) en colecistitis/colangitis",
        "CPRE para desobstrucción en la coledocolitiasis/colangitis"
      ],
      "steps": [
        "1. Confirmar diagnóstico clínico + USG",
        "2. Ayuno, hidratación y analgesia",
        "3. ATB si colecistitis/colangitis",
        "4. Colecistectomía videolaparoscópica precoz (idealmente <72h) en la colecistitis aguda",
        "5. Coledocolitiasis/colangitis: CPRE para drenaje + colecistectomía posterior"
      ]
    }
  }
});
