// Motivo: cefaleia — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("cefaleia", {
  "name": "Cefaleia",
  "nameEs": "Cefalea",
  "icon": "🧠",
  "color": "mc-purple",
  "isPain": true,
  "rasHighlight": [
    "cabeca",
    "neuro"
  ],
  "aeaGuide": [
    {
      "q": "Localização",
      "qEs": "Localización",
      "type": "radio",
      "opts": [
        "Frontal",
        "Temporal",
        "Occipital",
        "Hemicraniana",
        "Holocraniana",
        "Peri-ocular"
      ]
    },
    {
      "q": "Irradiação",
      "qEs": "Irradiación",
      "type": "radio",
      "opts": [
        "Para nuca/pescoço",
        "Para órbita/face",
        "Sem irradiação"
      ]
    },
    {
      "q": "Caráter/tipo",
      "qEs": "Carácter/tipo",
      "type": "radio",
      "opts": [
        "Pulsátil/latejante",
        "Em pressão/aperto",
        "Em facada/lancinante",
        "Em explosão (thunderclap)"
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
      "q": "Duração de cada episódio",
      "qEs": "Duración de cada episodio",
      "type": "radio",
      "opts": [
        "Minutos",
        "Horas (4-72h)",
        "Mais de 72h/contínua"
      ]
    },
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Súbito/explosivo (thunderclap — pico em <1min)",
        "Gradual/progressivo"
      ]
    },
    {
      "q": "Fatores desencadeantes ou que aliviam",
      "qEs": "Factores desencadenantes o que alivian",
      "type": "multi",
      "opts": [
        "Estresse/tensão emocional",
        "Privação de sono ou sono em excesso",
        "Jejum prolongado/pular refeições",
        "Consumo de álcool",
        "Período menstrual/ciclo hormonal",
        "Mudança de posição (piora ao deitar/curvar-se)",
        "Luz forte ou brilho intenso (fotofobia)",
        "Odores fortes/perfumes",
        "Mudanças climáticas/pressão atmosférica",
        "Esforço físico",
        "Repouso em ambiente escuro e silencioso alivia",
        "Sem fator identificado"
      ],
      "optsEs": [
        "Estrés/tensión emocional",
        "Privación de sueño o exceso de sueño",
        "Ayuno prolongado/saltarse comidas",
        "Consumo de alcohol",
        "Período menstrual/ciclo hormonal",
        "Cambio de posición (empeora al acostarse/agacharse)",
        "Luz fuerte o brillo intenso (fotofobia)",
        "Olores fuertes/perfumes",
        "Cambios climáticos/presión atmosférica",
        "Esfuerzo físico",
        "El reposo en ambiente oscuro y silencioso alivia",
        "Sin factor identificado"
      ]
    },
    {
      "q": "Periodicidade — episódica, em crises (salvas) ou diária/contínua?",
      "qEs": "¿Periodicidad — episódica, en racimos (salvas) o diaria/continua?",
      "type": "radio",
      "opts": [
        "Episódica esporádica",
        "Em crises/salvas (cluster)",
        "Crônica diária ou quase diária"
      ]
    },
    {
      "q": "Piora com Valsalva, tosse ou esforço físico?",
      "qEs": "¿Empeora con Valsalva, tos o esfuerzo físico?",
      "type": "yn"
    },
    {
      "q": "Náuseas/vômitos associados?",
      "qEs": "¿Náuseas/vómitos asociados?",
      "type": "yn"
    },
    {
      "q": "Fotofobia ou fonofobia?",
      "qEs": "¿Fotofobia o fonofobia?",
      "type": "yn"
    },
    {
      "q": "Aura visual ou sensitiva precedendo a dor (escotomas, zigue-zague, formigamento)?",
      "qEs": "¿Aura visual o sensitiva que precede el dolor (escotomas, zigzag, hormigueo)?",
      "type": "yn"
    },
    {
      "q": "Lacrimejamento, congestão nasal ou ptose do mesmo lado da dor (sinais autonômicos)?",
      "qEs": "¿Lagrimeo, congestión nasal o ptosis del mismo lado del dolor (signos autonómicos)?",
      "type": "yn"
    },
    {
      "q": "Sinais de alarme — pior cefaleia da vida, início súbito, febre, rigidez de nuca, déficit neurológico focal, alteração do nível de consciência, primeira crise após os 50 anos, gravidez/puerpério, mudança no padrão habitual (SNOOP)?",
      "qEs": "¿Signos de alarma — peor cefalea de la vida, inicio súbito, fiebre, rigidez de nuca, déficit neurológico focal, alteración del nivel de conciencia, primera crisis después de los 50 años, embarazo/puerperio, cambio en el patrón habitual (SNOOP)?",
      "type": "yn"
    },
    {
      "q": "Trauma craniano recente?",
      "qEs": "¿Traumatismo craneal reciente?",
      "type": "yn"
    },
    {
      "q": "Frequência de uso de analgésicos (risco de cefaleia por uso excessivo de medicação)",
      "qEs": "Frecuencia de uso de analgésicos (riesgo de cefalea por uso excesivo de medicación)",
      "type": "radio",
      "opts": [
        "Não usa analgésicos para a dor de cabeça",
        "Uso ocasional (poucas vezes ao mês)",
        "Uso frequente (≥2x/semana)",
        "Uso quase diário (≥10-15 dias/mês — sugere cefaleia por uso excessivo de medicação)"
      ],
      "optsEs": [
        "No usa analgésicos para el dolor de cabeza",
        "Uso ocasional (pocas veces al mes)",
        "Uso frecuente (≥2x/semana)",
        "Uso casi diario (≥10-15 días/mes — sugiere cefalea por uso excesivo de medicación)"
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
        "kw": "SNOOP4",
        "name": "Sinais de alarme — cefaleia secundária",
        "rows": [
          [
            "S",
            "Sistêmico",
            "Febre, perda de peso, HIV, neoplasia"
          ],
          [
            "N",
            "Neurológico",
            "Déficit focal, papiledema, meningismo"
          ],
          [
            "O",
            "Onset súbito",
            "Thunderclap — pior cefaleia da vida em segundos"
          ],
          [
            "O²",
            "Older >50 anos",
            "1ª cefaleia — arterite temporal, HIC"
          ],
          [
            "P",
            "Progressiva",
            "Piora progressiva sem alívio"
          ],
          [
            "P²",
            "Position",
            "Piora em decúbito, tosse, Valsalva"
          ],
          [
            "P³",
            "Prior change",
            "Mudança de padrão em crônico"
          ],
          [
            "P⁴",
            "Pregnancy",
            "HAS, eclâmpsia, TVS cerebral"
          ]
        ]
      },
      {
        "kw": "POUNDIT",
        "name": "Critérios de Enxaqueca",
        "rows": [
          [
            "P",
            "Pulsátil",
            "Latejante"
          ],
          [
            "O",
            "One day (4-72h)",
            "Duração sem tratamento"
          ],
          [
            "U",
            "Unilateral",
            "Hemicraniana (60-70%)"
          ],
          [
            "N",
            "Nausea",
            "Náuseas/vômitos"
          ],
          [
            "D",
            "Disabling",
            "Incapacitante"
          ],
          [
            "I",
            "Interfere",
            "Piora ao movimentar"
          ],
          [
            "T",
            "Treatment",
            "Boa resposta a triptanos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Kernig",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal",
          "Fletir quadril e joelho 90°",
          "Tentar estender joelho passivamente"
        ],
        "normal": "Extensão livre sem dor",
        "abnormal": "Resistência+dor → Kernig+ (meningite, HSA)"
      },
      {
        "title": "Sinal de Brudzinski",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal sem travesseiro",
          "Imobilizar ombros",
          "Fletir pescoço ao tórax"
        ],
        "normal": "Sem flexão dos MMII",
        "abnormal": "Flexão reflexa dos joelhos/quadris → Brudzinski+"
      },
      {
        "title": "Fundoscopia",
        "subtitle": "Papiledema — HIC",
        "steps": [
          "Sala escura, dilatar se possível",
          "Examinar disco óptico — bordas, pulso venoso"
        ],
        "normal": "Bordas nítidas, pulso venoso presente",
        "abnormal": "Bordas apagadas, elevação → papiledema = HIC → TC urgente"
      }
    ],
    "sinais": [
      {
        "name": "Thunderclap Headache",
        "eponym": "HSA",
        "how": "Máxima intensidade em <1 minuto — pior cefaleia da vida",
        "means": "HSA até prova em contrário — TC crânio urgente; se normal: PL (xantocromia)"
      },
      {
        "name": "Tríade meningítica",
        "eponym": "Meningite bacteriana",
        "how": "Cefaleia + Febre + Rigidez de nuca",
        "means": "ATB IMEDIATO após hemoculturas — não aguardar TC se sem papiledema"
      },
      {
        "name": "Aura visual clássica",
        "eponym": "Enxaqueca com aura",
        "how": "Escotoma cintilante em espectro de fortificação — 20-60 min ANTES da dor",
        "means": "Enxaqueca com aura — triptano na fase de DOR (não durante a aura)"
      },
      {
        "name": "Rigidez de nuca",
        "eponym": "Irritação meníngea",
        "how": "Resistência e dor à flexão passiva do pescoço",
        "means": "Meningite, HSA, encefalite — TC + punção lombar"
      }
    ],
    "ddx": [
      [
        "Enxaqueca",
        "Hemicraniana, pulsátil, náuseas, fotofobia, 4-72h, história prévia",
        "Thunderclap, déficit neurológico, febre, meningismo"
      ],
      [
        "Cefaleia tensional",
        "Bilateral, aperto/pressão, não incapacitante, sem náuseas/foto",
        "Pulsátil, hemicraniana, vômitos, incapacitante"
      ],
      [
        "HSA",
        "Thunderclap — máxima em segundos, pior da vida, meningismo",
        "Gradual, recorrente idêntica, sem meningismo"
      ],
      [
        "Meningite",
        "Febre + cefaleia + rigidez + fotofobia, Kernig+",
        "Sem febre, sem meningismo, recorrente há anos"
      ],
      [
        "HIC",
        "Progressiva, pior manhã, piora Valsalva, papiledema",
        "Hemicraniana, pulsátil, sem papiledema"
      ],
      [
        "Cefaleia em salvas",
        "Periorbital unilateral, lacrimejo, rinorreia, 15-180 min, agitação",
        "Bilateral, sem autonômicos, duração >3h"
      ]
    ],
    "escalas": [
      {
        "title": "ID Migraine",
        "headers": [
          "Pergunta",
          "Pontos"
        ],
        "rows": [
          [
            "Náuseas ou vômitos durante as crises?",
            "1"
          ],
          [
            "Cefaleia incapacitante?",
            "1"
          ],
          [
            "Sensibilidade à luz?",
            "1"
          ]
        ],
        "note": "≥2/3: Sensibilidade 81%, Especificidade 78% para enxaqueca"
      },
      {
        "title": "ICHD-3: Enxaqueca sem aura",
        "headers": [
          "Critério",
          "Descrição"
        ],
        "rows": [
          [
            "A",
            "≥5 crises preenchendo B-D"
          ],
          [
            "B",
            "4-72h sem tratamento"
          ],
          [
            "C",
            "≥2 de: unilateral/pulsátil/moderada-grave/piora com atividade"
          ],
          [
            "D",
            "≥1 de: náuseas/vômitos OU foto+fonofobia"
          ],
          [
            "E",
            "Não atribuída a outra causa"
          ]
        ],
        "note": ""
      }
    ],
    "conduta": {
      "exames": [
        "TC crânio sem contraste (thunderclap, déficit, febre+meningismo, >50 anos 1ª cefaleia)",
        "PL se TC normal + suspeita HSA",
        "Hemograma + VHS (arterite temporal >50 anos)",
        "PA (cefaleia hipertensiva)",
        "Fundoscopia (papiledema)"
      ],
      "drugs": [
        "Leve-moderada: AAS 1g VO + Metoclopramida 10mg",
        "Moderada-grave: Triptano (Sumatriptano 50-100mg VO ou 6mg SC)",
        "Profilaxia (>4 crises/mês): Propranolol 40-160mg/dia, Amitriptilina, Topiramato",
        "Em salvas: O₂ 100% 12L/min 15 min + Sumatriptano SC"
      ],
      "steps": [
        "1. SNOOP4 — excluir cefaleia secundária",
        "2. TC urgente se alarme",
        "3. Classificar tipo",
        "4. Tratar crise + prevenir se frequente",
        "5. Orientar diário de cefaleias"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Signos de alarma — cefalea secundaria",
        "rows": [
          [
            "Sistémico",
            "Fiebre, pérdida de peso, VIH, neoplasia"
          ],
          [
            "Neurológico",
            "Déficit focal, papiledema, meningismo"
          ],
          [
            "Onset súbito",
            "Thunderclap — peor cefalea de la vida en segundos"
          ],
          [
            "Older >50 años",
            "1ª cefalea — arteritis temporal, HIC"
          ],
          [
            "Progresiva",
            "Empeoramiento progresivo sin alivio"
          ],
          [
            "Posición",
            "Empeora en decúbito, tos, Valsalva"
          ],
          [
            "Cambio previo",
            "Cambio de patrón en cefalea crónica"
          ],
          [
            "Embarazo",
            "HTA, eclampsia, TVS cerebral"
          ]
        ]
      },
      {
        "name": "Criterios de Migraña",
        "rows": [
          [
            "Pulsátil",
            "Latido"
          ],
          [
            "Un día (4-72h)",
            "Duración sin tratamiento"
          ],
          [
            "Unilateral",
            "Hemicraneal (60-70%)"
          ],
          [
            "Náusea",
            "Náuseas/vómitos"
          ],
          [
            "Incapacitante",
            "Limita las actividades"
          ],
          [
            "Interfiere",
            "Empeora al moverse"
          ],
          [
            "Tratamiento",
            "Buena respuesta a triptanos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Kernig",
        "subtitle": "Irritación meníngea",
        "steps": [
          "Decúbito dorsal",
          "Flexionar cadera y rodilla 90°",
          "Intentar extender la rodilla pasivamente"
        ],
        "normal": "Extensión libre sin dolor",
        "abnormal": "Resistencia+dolor → Kernig+ (meningitis, HSA)"
      },
      {
        "title": "Signo de Brudzinski",
        "subtitle": "Irritación meníngea",
        "steps": [
          "Decúbito dorsal sin almohada",
          "Inmovilizar los hombros",
          "Flexionar el cuello hacia el tórax"
        ],
        "normal": "Sin flexión de los MMII",
        "abnormal": "Flexión refleja de rodillas/caderas → Brudzinski+"
      },
      {
        "title": "Fondo de ojo",
        "subtitle": "Papiledema — HIC",
        "steps": [
          "Sala oscura, dilatar si es posible",
          "Examinar el disco óptico — bordes, pulso venoso"
        ],
        "normal": "Bordes nítidos, pulso venoso presente",
        "abnormal": "Bordes borrosos, elevación → papiledema = HIC → TC urgente"
      }
    ],
    "sinais": [
      {
        "name": "Cefalea en estallido (Thunderclap)",
        "eponym": "HSA",
        "how": "Máxima intensidad en <1 minuto — peor cefalea de la vida",
        "means": "HSA hasta demostrar lo contrario — TC de cráneo urgente; si normal: PL (xantocromía)"
      },
      {
        "name": "Tríada meníngea",
        "eponym": "Meningitis bacteriana",
        "how": "Cefalea + Fiebre + Rigidez de nuca",
        "means": "ATB INMEDIATO tras hemocultivos — no esperar TC si no hay papiledema"
      },
      {
        "name": "Aura visual clásica",
        "eponym": "Migraña con aura",
        "how": "Escotoma centelleante en espectro de fortificación — 20-60 min ANTES del dolor",
        "means": "Migraña con aura — triptán en la fase de DOLOR (no durante el aura)"
      },
      {
        "name": "Rigidez de nuca",
        "eponym": "Irritación meníngea",
        "how": "Resistencia y dolor a la flexión pasiva del cuello",
        "means": "Meningitis, HSA, encefalitis — TC + punción lumbar"
      }
    ],
    "ddx": [
      [
        "Migraña",
        "Hemicraneal, pulsátil, náuseas, fotofobia, 4-72h, antecedente previo",
        "Thunderclap, déficit neurológico, fiebre, meningismo"
      ],
      [
        "Cefalea tensional",
        "Bilateral, opresiva, no incapacitante, sin náuseas/foto",
        "Pulsátil, hemicraneal, vómitos, incapacitante"
      ],
      [
        "HSA",
        "Thunderclap — máxima en segundos, la peor de la vida, meningismo",
        "Gradual, recurrente idéntica, sin meningismo"
      ],
      [
        "Meningitis",
        "Fiebre + cefalea + rigidez + fotofobia, Kernig+",
        "Sin fiebre, sin meningismo, recurrente desde hace años"
      ],
      [
        "HIC",
        "Progresiva, peor por la mañana, empeora con Valsalva, papiledema",
        "Hemicraneal, pulsátil, sin papiledema"
      ],
      [
        "Cefalea en racimos",
        "Periorbitaria unilateral, lagrimeo, rinorrea, 15-180 min, agitación",
        "Bilateral, sin autonómicos, duración >3h"
      ]
    ],
    "escalas": [
      {
        "title": "ID Migraine",
        "headers": [
          "Pregunta",
          "Puntos"
        ],
        "rows": [
          [
            "¿Náuseas o vómitos durante las crisis?",
            "1"
          ],
          [
            "¿Cefalea incapacitante?",
            "1"
          ],
          [
            "¿Sensibilidad a la luz?",
            "1"
          ]
        ],
        "note": "≥2/3: Sensibilidad 81%, Especificidad 78% para migraña"
      },
      {
        "title": "ICHD-3: Migraña sin aura",
        "headers": [
          "Criterio",
          "Descripción"
        ],
        "rows": [
          [
            "A",
            "≥5 crisis que cumplen B-D"
          ],
          [
            "B",
            "4-72h sin tratamiento"
          ],
          [
            "C",
            "≥2 de: unilateral/pulsátil/moderada-grave/empeora con la actividad"
          ],
          [
            "D",
            "≥1 de: náuseas/vómitos O foto+fonofobia"
          ],
          [
            "E",
            "No atribuida a otra causa"
          ]
        ],
        "note": ""
      }
    ],
    "conduta": {
      "exames": [
        "TC de cráneo sin contraste (thunderclap, déficit, fiebre+meningismo, >50 años 1ª cefalea)",
        "PL si TC normal + sospecha de HSA",
        "Hemograma + VSG (arteritis temporal >50 años)",
        "PA (cefalea hipertensiva)",
        "Fondo de ojo (papiledema)"
      ],
      "drugs": [
        "Leve-moderada: AAS 1g VO + Metoclopramida 10mg",
        "Moderada-grave: Triptán (Sumatriptán 50-100mg VO o 6mg SC)",
        "Profilaxis (>4 crisis/mes): Propranolol 40-160mg/día, Amitriptilina, Topiramato",
        "En racimos: O₂ 100% 12L/min 15 min + Sumatriptán SC"
      ],
      "steps": [
        "1. SNOOP4 — excluir cefalea secundaria",
        "2. TC urgente si hay alarma",
        "3. Clasificar el tipo",
        "4. Tratar la crisis + prevenir si es frecuente",
        "5. Orientar diario de cefaleas"
      ]
    }
  }
});
