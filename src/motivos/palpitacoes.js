// Motivo: palpitacoes — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("palpitacoes", {
  "name": "Palpitações",
  "nameEs": "Palpitaciones",
  "icon": "💓",
  "color": "mc-danger",
  "rasHighlight": [
    "cardio",
    "resp"
  ],
  "aeaGuide": [
    {
      "q": "Como descreveria a sensação?",
      "qEs": "¿Cómo describiría la sensación?",
      "type": "radio",
      "opts": [
        "Coração acelerado/disparado",
        "Coração batendo forte",
        "Falhas/saltos no ritmo (extrassístoles)",
        "Coração irregular/desordenado"
      ]
    },
    {
      "q": "Início e término",
      "qEs": "Inicio y término",
      "type": "radio",
      "opts": [
        "Início e término súbitos (em segundos)",
        "Início e término graduais"
      ]
    },
    {
      "q": "Duração do episódio",
      "qEs": "Duración del episodio",
      "type": "radio",
      "opts": [
        "Segundos",
        "Minutos",
        "Horas",
        "Persistente/contínuo"
      ]
    },
    {
      "q": "Frequência dos episódios",
      "qEs": "Frecuencia de los episodios",
      "type": "input",
      "ph": "Quantas vezes por dia/semana/mês",
      "ph2": "Cuántas veces por día/semana/mes"
    },
    {
      "q": "Fatores desencadeantes (esforço, estresse, cafeína, álcool, posição)?",
      "qEs": "¿Factores desencadenantes (esfuerzo, estrés, cafeína, alcohol, posición)?",
      "type": "input",
      "ph": "Descreva os fatores",
      "ph2": "Describa los factores"
    },
    {
      "q": "Síncope ou pré-síncope associada?",
      "qEs": "¿Síncope o presíncope asociado?",
      "type": "yn"
    },
    {
      "q": "Dor torácica associada?",
      "qEs": "¿Dolor torácico asociado?",
      "type": "yn"
    },
    {
      "q": "Dispneia associada?",
      "qEs": "¿Disnea asociada?",
      "type": "yn"
    },
    {
      "q": "Sudorese, tremor, intolerância ao calor (suspeita de hipertireoidismo)?",
      "qEs": "¿Sudoración, temblor, intolerancia al calor (sospecha de hipertiroidismo)?",
      "type": "yn"
    },
    {
      "q": "Ansiedade ou crises de pânico associadas?",
      "qEs": "¿Ansiedad o crisis de pánico asociadas?",
      "type": "yn"
    },
    {
      "q": "Uso de cafeína, álcool, tabaco, drogas estimulantes ou medicamentos (broncodilatadores, hormônio tireoidiano)?",
      "qEs": "¿Uso de cafeína, alcohol, tabaco, drogas estimulantes o medicamentos (broncodilatadores, hormona tiroidea)?",
      "type": "yn"
    },
    {
      "q": "Antecedentes pessoais ou familiares de arritmia, morte súbita ou doença cardíaca?",
      "qEs": "¿Antecedentes personales o familiares de arritmia, muerte súbita o enfermedad cardíaca?",
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
        "kw": "PULSAR",
        "name": "Causas de palpitações",
        "rows": [
          [
            "P",
            "Pânico/ansiedade",
            "Sensação de \"coração disparado\" associada a sintomas de ansiedade, sudorese, dispneia"
          ],
          [
            "U",
            "Uso de estimulantes",
            "Cafeína, álcool, tabaco, drogas ilícitas, descongestionantes"
          ],
          [
            "L",
            "Labilidade hormonal (tireoide)",
            "Hipertireoidismo — taquicardia, perda de peso, tremor, intolerância ao calor"
          ],
          [
            "S",
            "Sangue (anemia)",
            "Palidez, fadiga, dispneia aos esforços, taquicardia compensatória"
          ],
          [
            "A",
            "Arritmias",
            "Fibrilação atrial, taquicardia supraventricular, extrassístoles, flutter atrial"
          ],
          [
            "R",
            "Repercussão estrutural cardíaca",
            "Valvopatias, cardiomiopatias, insuficiência cardíaca"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Palpação do pulso radial/carotídeo",
        "subtitle": "Identificar irregularidade do ritmo",
        "steps": [
          "Palpar o pulso radial por pelo menos 30-60 segundos",
          "Avaliar frequência, ritmo (regular x irregular) e amplitude"
        ],
        "normal": "Pulso regular, frequência 60-100bpm",
        "abnormal": "Pulso irregularmente irregular → sugere fibrilação atrial; pulso rápido e regular → taquicardia supraventricular"
      },
      {
        "title": "Manobra de Valsalva",
        "subtitle": "Manobra vagal diagnóstica/terapêutica",
        "steps": [
          "Peça ao paciente para inspirar profundamente",
          "Solicite que faça força expiratória contra a glote fechada por 10-15 segundos (como ao evacuar)",
          "Monitorize FC e ritmo durante e após a manobra"
        ],
        "normal": "Variação discreta e transitória da FC",
        "abnormal": "Reversão de taquicardia supraventricular ou queda abrupta da FC → resposta vagal (auxilia diagnóstico e tratamento de TSV)"
      },
      {
        "title": "Ausculta cardíaca completa",
        "subtitle": "Identificar arritmias e sopros",
        "steps": [
          "Auscultar nos 4 focos clássicos (aórtico, pulmonar, tricúspide, mitral)",
          "Avaliar ritmo, frequência, presença de sopros, B3/B4"
        ],
        "normal": "Bulhas rítmicas, normofonéticas, sem sopros",
        "abnormal": "Ritmo irregular, sopros ou bulhas acessórias → investigar arritmia ou cardiopatia estrutural"
      }
    ],
    "sinais": [
      {
        "name": "Síncope associada",
        "eponym": "Arritmia grave",
        "how": "Perda transitória de consciência relacionada ao episódio de palpitação",
        "means": "Sinal de alarme — sugere arritmia com repercussão hemodinâmica significativa, requer avaliação urgente"
      },
      {
        "name": "Dor torácica concomitante",
        "eponym": "Síndrome coronariana associada",
        "how": "Dor ou desconforto torácico durante o episódio de palpitação",
        "means": "Pode indicar isquemia miocárdica desencadeada pela arritmia — investigação cardiológica urgente"
      },
      {
        "name": "Dispneia associada",
        "eponym": "Repercussão hemodinâmica",
        "how": "Falta de ar durante ou após o episódio de palpitação",
        "means": "Sugere repercussão hemodinâmica da arritmia ou descompensação cardíaca subjacente"
      }
    ],
    "ddx": [
      [
        "Arritmia cardíaca (FA, TSV, extrassístoles)",
        "Pulso irregular ou taquicardia documentada, ECG alterado, episódios súbitos e recorrentes",
        "Pulso regular, ECG normal, sintomas claramente situacionais (estresse, cafeína)"
      ],
      [
        "Ansiedade/transtorno do pânico",
        "Episódios associados a estresse, sudorese, sensação de morte iminente, hiperventilação, ECG normal durante crise",
        "Documentação de arritmia ao monitor/ECG durante o episódio"
      ],
      [
        "Tireotoxicose",
        "Perda de peso, tremor, intolerância ao calor, bócio, TSH suprimido",
        "TSH normal, ausência de sinais hiperadrenérgicos"
      ],
      [
        "Anemia",
        "Palidez, fadiga, dispneia aos esforços, hemoglobina baixa",
        "Hemoglobina normal"
      ]
    ],
    "escalas": [
      {
        "title": "Classificação EHRA de sintomas em FA",
        "headers": [
          "Classe",
          "Descrição"
        ],
        "rows": [
          [
            "EHRA 1",
            "Sem sintomas"
          ],
          [
            "EHRA 2a",
            "Sintomas leves, não afetam atividades diárias"
          ],
          [
            "EHRA 2b",
            "Sintomas moderados, incomodam mas não limitam"
          ],
          [
            "EHRA 3",
            "Sintomas graves, afetam atividades diárias"
          ],
          [
            "EHRA 4",
            "Sintomas incapacitantes, interrompem atividades diárias"
          ]
        ],
        "note": "Auxilia a graduar o impacto sintomático da fibrilação atrial e orientar a urgência da investigação/tratamento"
      }
    ],
    "conduta": {
      "exames": [
        "ECG de 12 derivações (preferencialmente durante o episódio)",
        "Holter de 24h ou monitor de eventos (se episódios intermitentes)",
        "Hemograma (anemia), TSH (tireotoxicose)",
        "Eletrólitos (potássio, magnésio, cálcio)",
        "Ecocardiograma se suspeita de cardiopatia estrutural"
      ],
      "drugs": [
        "Manobras vagais (Valsalva, massagem do seio carotídeo por especialista) para TSV",
        "Betabloqueadores (ex.: Propranolol, Metoprolol) conforme avaliação cardiológica",
        "Anticoagulação conforme escore de risco (CHA₂DS₂-VASc) em fibrilação atrial",
        "Tratamento da causa de base (reposição de ferro na anemia, tratamento do hipertireoidismo)"
      ],
      "steps": [
        "1. Caracterizar o episódio (início, duração, ritmo, sintomas associados)",
        "2. ECG imediato — idealmente durante o episódio",
        "3. Pesquisar sinais de alarme (síncope, dor torácica, dispneia) → avaliação cardiológica urgente se presentes",
        "4. Manobras vagais para suspeita de TSV sintomática estável",
        "5. Investigação laboratorial dirigida (hemograma, TSH, eletrólitos)",
        "6. Encaminhar a cardiologia para monitorização prolongada e definição terapêutica conforme achados"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de palpitaciones",
        "rows": [
          [
            "Pánico/ansiedad",
            "Sensación de \"corazón acelerado\" asociada a síntomas de ansiedad, sudoración, disnea"
          ],
          [
            "Uso de estimulantes",
            "Cafeína, alcohol, tabaco, drogas ilícitas, descongestionantes"
          ],
          [
            "Labilidad hormonal (tiroides)",
            "Hipertiroidismo — taquicardia, pérdida de peso, temblor, intolerancia al calor"
          ],
          [
            "Sangre (anemia)",
            "Palidez, fatiga, disnea de esfuerzo, taquicardia compensatoria"
          ],
          [
            "Arritmias",
            "Fibrilación auricular, taquicardia supraventricular, extrasístoles, flutter auricular"
          ],
          [
            "Repercusión estructural cardíaca",
            "Valvulopatías, miocardiopatías, insuficiencia cardíaca"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Palpación del pulso radial/carotídeo",
        "subtitle": "Identificar irregularidad del ritmo",
        "steps": [
          "Palpar el pulso radial durante al menos 30-60 segundos",
          "Evaluar frecuencia, ritmo (regular x irregular) y amplitud"
        ],
        "normal": "Pulso regular, frecuencia 60-100lpm",
        "abnormal": "Pulso irregularmente irregular → sugiere fibrilación auricular; pulso rápido y regular → taquicardia supraventricular"
      },
      {
        "title": "Maniobra de Valsalva",
        "subtitle": "Maniobra vagal diagnóstica/terapéutica",
        "steps": [
          "Pida al paciente inspirar profundamente",
          "Solicite que haga fuerza espiratoria contra la glotis cerrada por 10-15 segundos (como al defecar)",
          "Monitorice FC y ritmo durante y después de la maniobra"
        ],
        "normal": "Variación discreta y transitoria de la FC",
        "abnormal": "Reversión de taquicardia supraventricular o caída abrupta de la FC → respuesta vagal (ayuda al diagnóstico y tratamiento de la TSV)"
      },
      {
        "title": "Auscultación cardíaca completa",
        "subtitle": "Identificar arritmias y soplos",
        "steps": [
          "Auscultar en los 4 focos clásicos (aórtico, pulmonar, tricuspídeo, mitral)",
          "Evaluar ritmo, frecuencia, presencia de soplos, R3/R4"
        ],
        "normal": "Ruidos rítmicos, normofonéticos, sin soplos",
        "abnormal": "Ritmo irregular, soplos o ruidos accesorios → investigar arritmia o cardiopatía estructural"
      }
    ],
    "sinais": [
      {
        "name": "Síncope asociado",
        "eponym": "Arritmia grave",
        "how": "Pérdida transitoria de conciencia relacionada al episodio de palpitación",
        "means": "Signo de alarma — sugiere arritmia con repercusión hemodinámica significativa, requiere evaluación urgente"
      },
      {
        "name": "Dolor torácico concomitante",
        "eponym": "Síndrome coronaria asociada",
        "how": "Dolor o molestia torácica durante el episodio de palpitación",
        "means": "Puede indicar isquemia miocárdica desencadenada por la arritmia — investigación cardiológica urgente"
      },
      {
        "name": "Disnea asociada",
        "eponym": "Repercusión hemodinámica",
        "how": "Falta de aire durante o después del episodio de palpitación",
        "means": "Sugiere repercusión hemodinámica de la arritmia o descompensación cardíaca subyacente"
      }
    ],
    "ddx": [
      [
        "Arritmia cardíaca (FA, TSV, extrasístoles)",
        "Pulso irregular o taquicardia documentada, ECG alterado, episodios súbitos y recurrentes",
        "Pulso regular, ECG normal, síntomas claramente situacionales (estrés, cafeína)"
      ],
      [
        "Ansiedad/trastorno de pánico",
        "Episodios asociados a estrés, sudoración, sensación de muerte inminente, hiperventilación, ECG normal durante la crisis",
        "Documentación de arritmia en monitor/ECG durante el episodio"
      ],
      [
        "Tirotoxicosis",
        "Pérdida de peso, temblor, intolerancia al calor, bocio, TSH suprimida",
        "TSH normal, ausencia de signos hiperadrenérgicos"
      ],
      [
        "Anemia",
        "Palidez, fatiga, disnea de esfuerzo, hemoglobina baja",
        "Hemoglobina normal"
      ]
    ],
    "escalas": [
      {
        "title": "Clasificación EHRA de síntomas en FA",
        "headers": [
          "Clase",
          "Descripción"
        ],
        "rows": [
          [
            "EHRA 1",
            "Sin síntomas"
          ],
          [
            "EHRA 2a",
            "Síntomas leves, no afectan las actividades diarias"
          ],
          [
            "EHRA 2b",
            "Síntomas moderados, molestan pero no limitan"
          ],
          [
            "EHRA 3",
            "Síntomas graves, afectan las actividades diarias"
          ],
          [
            "EHRA 4",
            "Síntomas incapacitantes, interrumpen las actividades diarias"
          ]
        ],
        "note": "Ayuda a graduar el impacto sintomático de la fibrilación auricular y orientar la urgencia de la investigación/tratamiento"
      }
    ],
    "conduta": {
      "exames": [
        "ECG de 12 derivaciones (preferentemente durante el episodio)",
        "Holter de 24h o monitor de eventos (si episodios intermitentes)",
        "Hemograma (anemia), TSH (tirotoxicosis)",
        "Electrolitos (potasio, magnesio, calcio)",
        "Ecocardiograma si sospecha de cardiopatía estructural"
      ],
      "drugs": [
        "Maniobras vagales (Valsalva, masaje del seno carotídeo por especialista) para TSV",
        "Betabloqueantes (ej.: Propranolol, Metoprolol) según evaluación cardiológica",
        "Anticoagulación según escore de riesgo (CHA₂DS₂-VASc) en fibrilación auricular",
        "Tratamiento de la causa de base (reposición de hierro en la anemia, tratamiento del hipertiroidismo)"
      ],
      "steps": [
        "1. Caracterizar el episodio (inicio, duración, ritmo, síntomas asociados)",
        "2. ECG inmediato — idealmente durante el episodio",
        "3. Buscar signos de alarma (síncope, dolor torácico, disnea) → evaluación cardiológica urgente si están presentes",
        "4. Maniobras vagales para sospecha de TSV sintomática estable",
        "5. Investigación de laboratorio dirigida (hemograma, TSH, electrolitos)",
        "6. Derivar a cardiología para monitorización prolongada y definición terapéutica según hallazgos"
      ]
    }
  }
});
