// Motivo: tosse — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("tosse", {
  "name": "Tosse",
  "nameEs": "Tos",
  "icon": "😮‍💨",
  "color": "mc-primary",
  "rasHighlight": [
    "resp",
    "cabeca"
  ],
  "aeaGuide": [
    {
      "q": "Início e duração",
      "qEs": "Inicio y duración",
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
      "q": "Tipo de tosse",
      "qEs": "Tipo de tos",
      "type": "radio",
      "opts": [
        "Seca (não produtiva)",
        "Produtiva/Úmida",
        "Metálica/rouca"
      ],
      "optsEs": [
        "Seca (no productiva)",
        "Productiva/Húmeda",
        "Metálica/ronca"
      ]
    },
    {
      "q": "Há expectoração (escarro)?",
      "qEs": "¿Hay expectoración (esputo)?",
      "type": "yn"
    },
    {
      "q": "Características do escarro (cor/aspecto)",
      "qEs": "Características del esputo (color/aspecto)",
      "type": "radio",
      "opts": [
        "Mucoide (claro/branco)",
        "Mucopurulento (amarelado — infecção)",
        "Purulento (esverdeado/fétido — bacteriana)",
        "Hemoptoico — com sangue (alarme)",
        "Seroso/espumoso (rosado — edema pulmonar)"
      ],
      "optsEs": [
        "Mucoide (claro/blanco)",
        "Mucopurulento (amarillento — infección)",
        "Purulento (verdoso/fétido — bacteriana)",
        "Hemoptoico — con sangre (alarma)",
        "Seroso/espumoso (rosado — edema pulmonar)"
      ]
    },
    {
      "q": "Hemoptise (sangue no escarro)?",
      "qEs": "¿Hemoptisis (sangre en el esputo)?",
      "type": "yn"
    },
    {
      "q": "Momento de predomínio",
      "qEs": "Momento de predominio",
      "type": "radio",
      "opts": [
        "Constante (diurna)",
        "Noturna",
        "Matutina (ao acordar)",
        "Pós-prandial ou ao deitar"
      ],
      "optsEs": [
        "Constante (diurna)",
        "Nocturna",
        "Matutina (al despertar)",
        "Posprandial o al acostarse"
      ]
    },
    {
      "q": "Fatores desencadeantes ou agravantes",
      "qEs": "Factores desencadenantes o agravantes",
      "type": "multi",
      "opts": [
        "Frio/ar gelado",
        "Exercício físico",
        "Decúbito (ao deitar)",
        "Alérgenos (pólen, pelos, ácaros)",
        "Fumaça/irritantes",
        "Pós-refeição",
        "Conversa prolongada",
        "Inspiração profunda"
      ],
      "optsEs": [
        "Frío/aire frío",
        "Ejercicio físico",
        "Decúbito (al acostarse)",
        "Alérgenos (polvo, pelo, ácaros)",
        "Humo/irritantes",
        "Posprandial",
        "Conversación prolongada",
        "Inspiración profunda"
      ]
    },
    {
      "q": "Outros fatores desencadeantes (campo livre)",
      "qEs": "Otros factores desencadenantes (campo libre)",
      "type": "input",
      "ph": "Descreva outros fatores",
      "ph2": "Describa otros factores"
    },
    {
      "q": "Fatores de alívio",
      "qEs": "Factores de alivio",
      "type": "multi",
      "opts": [
        "Repouso",
        "Mudança de posição",
        "Broncodilatadores/inalador",
        "Antitussígenos",
        "Vapor/umidificação",
        "Nenhum fator identificado"
      ],
      "optsEs": [
        "Reposo",
        "Cambio de posición",
        "Broncodilatadores/inhalador",
        "Antitusígenos",
        "Vapor/humidificación",
        "Ningún factor identificado"
      ]
    },
    {
      "q": "Outros fatores de alívio (campo livre)",
      "qEs": "Otros factores de alivio (campo libre)",
      "type": "input",
      "ph": "Descreva outros fatores",
      "ph2": "Describa otros factores"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Dispneia associada?",
      "qEs": "¿Disnea asociada?",
      "type": "yn"
    },
    {
      "q": "Sibilância/chiado?",
      "qEs": "¿Sibilancias?",
      "type": "yn"
    },
    {
      "q": "Dor torácica associada?",
      "qEs": "¿Dolor torácico asociado?",
      "type": "yn"
    },
    {
      "q": "Coriza, espirros ou gotejamento pós-nasal?",
      "qEs": "¿Rinorrea, estornudos o goteo posnasal?",
      "type": "yn"
    },
    {
      "q": "Pirose ou regurgitação (DRGE)?",
      "qEs": "¿Pirosis o regurgitación (ERGE)?",
      "type": "yn"
    },
    {
      "q": "Tabagismo — carga tabágica",
      "qEs": "Tabaquismo — carga tabáquica",
      "type": "input",
      "ph": "Anos-maço (ex: 20 cigarros/dia × 10 anos = 10 maços-ano)",
      "ph2": "Paquetes-año (ej: 20 cigarrillos/día × 10 años = 10 paquetes-año)"
    },
    {
      "q": "Uso de IECA (captopril, enalapril, lisinopril)?",
      "qEs": "¿Uso de IECA (captopril, enalapril, lisinopril)?",
      "type": "yn"
    },
    {
      "q": "Antecedentes respiratórios",
      "qEs": "Antecedentes respiratorios",
      "type": "multi",
      "opts": [
        "Asma",
        "DPOC",
        "Tuberculose prévia",
        "Bronquiectasia",
        "Nenhum antecedente relevante"
      ],
      "optsEs": [
        "Asma",
        "EPOC",
        "Tuberculosis previa",
        "Bronquiectasia",
        "Sin antecedente relevante"
      ]
    },
    {
      "q": "Exposição ocupacional ou ambiental",
      "qEs": "Exposición ocupacional o ambiental",
      "type": "multi",
      "opts": [
        "Poeiras (madeira, farinha, cimento)",
        "Fumaças e gases tóxicos",
        "Animais/penas/pelos",
        "Fibras minerais (amianto, sílica)",
        "Fungos/mofo em ambiente fechado",
        "Sem exposição identificada"
      ],
      "optsEs": [
        "Polvos (madera, harina, cemento)",
        "Humos y gases tóxicos",
        "Animales/plumas/pelaje",
        "Fibras minerales (amianto, sílice)",
        "Hongos/moho en ambientes cerrados",
        "Sin exposición identificada"
      ]
    },
    {
      "q": "Perda de peso não intencional?",
      "qEs": "¿Pérdida de peso no intencional?",
      "type": "yn"
    },
    {
      "q": "Sudorese noturna?",
      "qEs": "¿Sudoración nocturna?",
      "type": "yn"
    },
    {
      "q": "Situação vacinal (influenza, pneumocócica, coqueluche)?",
      "qEs": "¿Estado vacunal (influenza, neumocócica, tos ferina)?",
      "type": "yn"
    },
    {
      "q": "Contato com pessoa doente ou caso suspeito de TB?",
      "qEs": "¿Contacto con persona enferma o caso sospechoso de TB?",
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
        "kw": "FACTS",
        "name": "Causas de tosse crônica (>8 semanas)",
        "rows": [
          [
            "F",
            "FPNS (gotejamento pós-nasal)",
            "Rinorreia, sensação de catarro, piora ao deitar"
          ],
          [
            "A",
            "Asma",
            "Noturna, frio/alérgenos, sibilância, variabilidade PEF"
          ],
          [
            "C",
            "Cardiovascular (ICC)",
            "Ortopneia, crepitantes, BNP ↑"
          ],
          [
            "T",
            "TECA (IECA)",
            "Início após IECA, seca irritativa, desaparece ao suspender"
          ],
          [
            "S",
            "SRGE (refluxo)",
            "Pós-prandial, noturna, azia, melhora com IBP"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Peak flow (PEF)",
        "subtitle": "Diagnóstico de asma — variabilidade",
        "steps": [
          "Paciente em pé",
          "Inspiração máxima",
          "Soprar com força máxima no medidor",
          "Repetir 3x — registrar o maior valor"
        ],
        "normal": "PEF >80% do previsto",
        "abnormal": "<80% ou variabilidade >20% → obstrução brônquica → asma/DPOC"
      },
      {
        "title": "Ausculta pulmonar",
        "subtitle": "Padrões na tosse",
        "steps": [
          "6 pontos comparativos bilaterais",
          "Fase inspiratória e expiratória"
        ],
        "normal": "Murmúrio vesicular presente e simétrico",
        "abnormal": "Sibilos → broncoespasmo | Crepitantes focais → pneumonia | Bibasais → ICC"
      }
    ],
    "sinais": [
      {
        "name": "Sibilância expiratória",
        "eponym": "Broncoespasmo",
        "how": "Ruído musical na ausculta, expiração prolongada",
        "means": "Asma (reversível) ou DPOC (parcial) — Salbutamol para teste terapêutico"
      },
      {
        "name": "Dedos em baqueta",
        "eponym": "Hipoxemia crônica",
        "how": "Perda do ângulo de Lovibond >180° na base da unha",
        "means": "Doença pulmonar crônica, neoplasia, bronquiectasia — investigar com TC"
      }
    ],
    "ddx": [
      [
        "FPNS",
        "Sensação de catarro, piora deitado, rinite, melhora anti-histamínico",
        "Sibilância, febre, hemoptise"
      ],
      [
        "Asma",
        "Noturna, alérgenos, sibilância, variabilidade PEF, atopia",
        "Purulenta, febre, tabagista >40 anos"
      ],
      [
        "TECA",
        "Após IECA, seca irritativa, melhora suspendendo IECA",
        "Produtiva, febre, antes do IECA"
      ],
      [
        "DRGE",
        "Pós-prandial, noturna, azia, melhora IBP",
        "Sibilância, variabilidade, esforço"
      ],
      [
        "Pneumonia",
        "Produtiva purulenta, febre, dor pleurítica, Rx com infiltrado",
        "Crônica, seca, afebril, Rx normal"
      ],
      [
        "Neoplasia",
        "Tabagista >40 anos, hemoptise, perda peso, Rx com massa",
        "Jovem, sem tabagismo, Rx normal, >8 sem sem alarme"
      ]
    ],
    "escalas": [
      {
        "title": "Gravidade da crise de asma",
        "headers": [
          "Critério",
          "Leve",
          "Moderada",
          "Grave"
        ],
        "rows": [
          [
            "Dispneia",
            "Ao caminhar",
            "Em repouso",
            "Frases incompletas"
          ],
          [
            "FR",
            "<25",
            "25-30",
            ">30 irpm"
          ],
          [
            "Peak flow",
            ">70%",
            "50-70%",
            "<50%"
          ],
          [
            "SpO₂",
            ">95%",
            "91-95%",
            "<91%"
          ]
        ],
        "note": "Grave: Salbutamol+Ipratrópio+Corticóide EV+O₂; Sem melhora → UTI"
      }
    ],
    "conduta": {
      "exames": [
        "Rx tórax PA",
        "Peak flow",
        "Espirometria (crônico)",
        "Hemograma + PCR",
        "TC tórax (suspeita neoplasia ou bronquiectasia)",
        "Cultura escarro (pneumonia grave)"
      ],
      "drugs": [
        "Asma leve-mod: Salbutamol 2,5-5mg nebulização ou spray",
        "Asma grave: Prednisolona 40-50mg/dia VO x5 dias",
        "Pneumonia comunitária: Amoxicilina 500mg 8/8h x7d",
        "IECA: Suspender → BRA (losartana)",
        "DRGE: Omeprazol 20-40mg antes café"
      ],
      "steps": [
        "1. Aguda (<3sem), subaguda (3-8sem) ou crônica (>8sem)?",
        "2. Alarme: hemoptise, perda peso, tabagismo, febre persistente, massa Rx",
        "3. Rx tórax para todos",
        "4. FACTS — tratar causa mais provável",
        "5. Crônica persistente: espirometria + TC tórax"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de tos crónica (>8 semanas)",
        "rows": [
          [
            "Goteo posnasal",
            "Rinorrea, sensación de flema, empeora al acostarse"
          ],
          [
            "Asma",
            "Nocturna, frío/alérgenos, sibilancias, variabilidad del PEF"
          ],
          [
            "Cardiovascular (ICC)",
            "Ortopnea, crepitantes, BNP ↑"
          ],
          [
            "IECA",
            "Inicio tras IECA, seca irritativa, desaparece al suspender"
          ],
          [
            "ERGE (reflujo)",
            "Posprandial, nocturna, pirosis, mejora con IBP"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Pico flujo (PEF)",
        "subtitle": "Diagnóstico de asma — variabilidad",
        "steps": [
          "Paciente de pie",
          "Inspiración máxima",
          "Soplar con fuerza máxima en el medidor",
          "Repetir 3x — registrar el mayor valor"
        ],
        "normal": "PEF >80% del previsto",
        "abnormal": "<80% o variabilidad >20% → obstrucción bronquial → asma/EPOC"
      },
      {
        "title": "Auscultación pulmonar",
        "subtitle": "Patrones en la tos",
        "steps": [
          "6 puntos comparativos bilaterales",
          "Fase inspiratoria y espiratoria"
        ],
        "normal": "Murmullo vesicular presente y simétrico",
        "abnormal": "Sibilancias → broncoespasmo | Crepitantes focales → neumonía | Bibasales → ICC"
      }
    ],
    "sinais": [
      {
        "name": "Sibilancia espiratoria",
        "eponym": "Broncoespasmo",
        "how": "Ruido musical en la auscultación, espiración prolongada",
        "means": "Asma (reversible) o EPOC (parcial) — Salbutamol para prueba terapéutica"
      },
      {
        "name": "Dedos en palillo de tambor",
        "eponym": "Hipoxemia crónica",
        "how": "Pérdida del ángulo de Lovibond >180° en la base de la uña",
        "means": "Enfermedad pulmonar crónica, neoplasia, bronquiectasia — investigar con TC"
      }
    ],
    "ddx": [
      [
        "Goteo posnasal",
        "Sensación de flema, empeora acostado, rinitis, mejora con antihistamínico",
        "Sibilancias, fiebre, hemoptisis"
      ],
      [
        "Asma",
        "Nocturna, alérgenos, sibilancias, variabilidad PEF, atopía",
        "Purulenta, fiebre, fumador >40 años"
      ],
      [
        "Tos por IECA",
        "Tras IECA, seca irritativa, mejora al suspender el IECA",
        "Productiva, fiebre, antes del IECA"
      ],
      [
        "ERGE",
        "Posprandial, nocturna, pirosis, mejora con IBP",
        "Sibilancias, variabilidad, esfuerzo"
      ],
      [
        "Neumonía",
        "Productiva purulenta, fiebre, dolor pleurítico, Rx con infiltrado",
        "Crónica, seca, afebril, Rx normal"
      ],
      [
        "Neoplasia",
        "Fumador >40 años, hemoptisis, pérdida de peso, Rx con masa",
        "Joven, sin tabaquismo, Rx normal, >8 sem sin alarma"
      ]
    ],
    "escalas": [
      {
        "title": "Gravedad de la crisis de asma",
        "headers": [
          "Criterio",
          "Leve",
          "Moderada",
          "Grave"
        ],
        "rows": [
          [
            "Disnea",
            "Al caminar",
            "En reposo",
            "Frases incompletas"
          ],
          [
            "FR",
            "<25",
            "25-30",
            ">30 rpm"
          ],
          [
            "Pico flujo",
            ">70%",
            "50-70%",
            "<50%"
          ],
          [
            "SpO₂",
            ">95%",
            "91-95%",
            "<91%"
          ]
        ],
        "note": "Grave: Salbutamol+Ipratropio+Corticoide EV+O₂; Sin mejoría → UCI"
      }
    ],
    "conduta": {
      "exames": [
        "Rx tórax PA",
        "Pico flujo",
        "Espirometría (crónico)",
        "Hemograma + PCR",
        "TC tórax (sospecha de neoplasia o bronquiectasia)",
        "Cultivo de esputo (neumonía grave)"
      ],
      "drugs": [
        "Asma leve-mod: Salbutamol 2,5-5mg nebulización o spray",
        "Asma grave: Prednisolona 40-50mg/día VO x5 días",
        "Neumonía comunitaria: Amoxicilina 500mg c/8h x7d",
        "IECA: Suspender → ARA (losartán)",
        "ERGE: Omeprazol 20-40mg antes del desayuno"
      ],
      "steps": [
        "1. ¿Aguda (<3sem), subaguda (3-8sem) o crónica (>8sem)?",
        "2. Alarma: hemoptisis, pérdida de peso, tabaquismo, fiebre persistente, masa en Rx",
        "3. Rx tórax para todos",
        "4. FACTS — tratar la causa más probable",
        "5. Crónica persistente: espirometría + TC tórax"
      ]
    }
  }
});
