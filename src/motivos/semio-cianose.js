// Motivo: semio-cianose — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-cianose", {
  "name": "Cianose",
  "nameEs": "Cianosis",
  "icon": "🔵",
  "color": "mc-navy",
  "aeaGuide": [
    {
      "q": "Localização da cianose?",
      "qEs": "¿Localización de la cianosis?",
      "type": "radio",
      "opts": [
        "Central (lábios, língua, mucosas)",
        "Periférica (extremidades, dedos)",
        "Mista (central + periférica)"
      ],
      "optsEs": [
        "Central (labios, lengua, mucosas)",
        "Periférica (extremidades, dedos)",
        "Mixta (central + periférica)"
      ]
    },
    {
      "q": "Início?",
      "qEs": "¿Inicio?",
      "type": "radio",
      "opts": [
        "Congênita (desde o nascimento)",
        "Progressiva (anos/meses)",
        "Aguda (horas/minutos)"
      ],
      "optsEs": [
        "Congénita (desde el nacimiento)",
        "Progresiva (años/meses)",
        "Aguda (horas/minutos)"
      ]
    },
    {
      "q": "Melhora com administração de oxigênio?",
      "qEs": "¿Mejora con administración de oxígeno?",
      "type": "yn"
    },
    {
      "q": "Dispneia associada?",
      "qEs": "¿Disnea asociada?",
      "type": "yn"
    },
    {
      "q": "Dor torácica associada?",
      "qEs": "¿Dolor torácico asociado?",
      "type": "yn"
    },
    {
      "q": "Tosse ou expectoração?",
      "qEs": "¿Tos o expectoración?",
      "type": "yn"
    },
    {
      "q": "Edema de membros inferiores?",
      "qEs": "¿Edema de miembros inferiores?",
      "type": "yn"
    },
    {
      "q": "Saturação de O₂ medida?",
      "qEs": "¿Saturación de O₂ medida?",
      "type": "input",
      "ph": "% SpO₂",
      "ph2": "% SpO₂"
    },
    {
      "q": "Cardiopatia ou pneumopatia conhecida?",
      "qEs": "¿Cardiopatía o neumopatía conocida?",
      "type": "input",
      "ph": "Ex: DPOC, ICC, cardiopatia congênita",
      "ph2": "Ej: EPOC, ICC, cardiopatía congénita"
    },
    {
      "q": "Temperatura dos membros?",
      "qEs": "¿Temperatura de los miembros?",
      "type": "radio",
      "opts": [
        "Extremidades frias (sugere cianose periférica)",
        "Extremidades quentes (sugere cianose central)"
      ],
      "optsEs": [
        "Extremidades frías (sugiere cianosis periférica)",
        "Extremidades calientes (sugiere cianosis central)"
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
        "kw": "CENTRAL x PERIFÉRICA",
        "name": "Tipos de cianose",
        "rows": [
          [
            "C",
            "Central",
            "Língua e mucosas cianóticas, extremidades quentes — hipoxemia/shunt; SpO₂ baixa"
          ],
          [
            "P",
            "Periférica",
            "Extremidades frias e cianóticas, mucosas poupadas — baixo débito/vasoconstrição; SpO₂ normal"
          ],
          [
            "M",
            "Mista",
            "Combinação — ex.: insuficiência cardíaca congestiva"
          ],
          [
            "D",
            "Diferencial",
            "Cianose em MMII com MMSS poupados — shunt direita-esquerda pós-ductal (ex.: coarctação)"
          ]
        ]
      },
      {
        "kw": "5 g/dL",
        "name": "Limiar da cianose",
        "rows": [
          [
            "H",
            "Hemoglobina reduzida",
            "Cianose aparece com ≥5 g/dL de Hb desoxigenada no leito capilar"
          ],
          [
            "A",
            "Anemia",
            "Pode haver hipoxemia grave SEM cianose (pouca Hb para dessaturar)"
          ],
          [
            "P",
            "Policitemia",
            "Cianose surge mais facilmente, mesmo com saturação pouco reduzida"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspeção de mucosas e língua",
        "subtitle": "Diferenciar central x periférica",
        "steps": [
          "Examinar língua, mucosa oral e conjuntivas sob boa iluminação",
          "Comparar com leito ungueal e extremidades"
        ],
        "normal": "Mucosas e língua róseas",
        "abnormal": "Língua/mucosas azuladas → cianose central (hipoxemia/shunt)"
      },
      {
        "title": "Teste do aquecimento",
        "subtitle": "Cianose periférica",
        "steps": [
          "Aquecer a extremidade cianótica (massagem/calor)",
          "Observar se a cor melhora"
        ],
        "normal": "Sem cianose após aquecimento",
        "abnormal": "Melhora com aquecimento → cianose periférica (vasoconstrição/baixo débito)"
      },
      {
        "title": "Oximetria + resposta ao O₂",
        "subtitle": "Confirmar hipoxemia",
        "steps": [
          "Medir SpO₂ em ar ambiente",
          "Ofertar O₂ suplementar e remensurar"
        ],
        "normal": "SpO₂ ≥95% e melhora com O₂",
        "abnormal": "Não melhora com O₂ → suspeitar shunt direita-esquerda ou meta-hemoglobinemia"
      }
    ],
    "sinais": [
      {
        "name": "Cianose diferencial",
        "eponym": "Shunt pós-ductal",
        "how": "MMII cianóticos e MMSS rosados (ou vice-versa)",
        "means": "Cardiopatia congênita com shunt — avaliação cardiológica"
      },
      {
        "name": "Baqueteamento digital",
        "eponym": "Hipoxemia crônica",
        "how": "Hipocratismo digital — ângulo de Lovibond >180°",
        "means": "Cardiopatia cianótica crônica, pneumopatia, supuração crônica"
      },
      {
        "name": "Cianose que não responde ao O₂",
        "eponym": "Meta-hemoglobinemia",
        "how": "SpO₂ \"travada\" ~85%, sangue cor de chocolate",
        "means": "Meta-hemoglobinemia (dapsona, nitritos, anestésicos) — azul de metileno"
      }
    ],
    "ddx": [
      [
        "Hipoxemia pulmonar",
        "Cianose central, SpO₂ baixa, melhora com O₂",
        "Não melhora com O₂; extremidades frias isoladas"
      ],
      [
        "Shunt direita-esquerda",
        "Central, baqueteamento, não melhora com O₂",
        "Melhora plena com O₂"
      ],
      [
        "Baixo débito / vasoconstrição",
        "Periférica, extremidades frias, mucosas poupadas",
        "Língua cianótica, SpO₂ baixa"
      ],
      [
        "Meta-hemoglobinemia",
        "SpO₂ ~85% fixa, sangue achocolatado, fármaco causal",
        "Resposta normal ao O₂; gasometria com PaO₂ baixa"
      ],
      [
        "Fenômeno de Raynaud",
        "Cianose episódica das extremidades ao frio, trifásica",
        "Cianose central persistente"
      ]
    ],
    "escalas": [
      {
        "title": "Central x Periférica",
        "headers": [
          "Característica",
          "Central",
          "Periférica"
        ],
        "rows": [
          [
            "Mucosas/língua",
            "Cianóticas",
            "Poupadas"
          ],
          [
            "Temperatura da extremidade",
            "Quente",
            "Fria"
          ],
          [
            "SpO₂",
            "Reduzida",
            "Normal"
          ],
          [
            "Melhora ao aquecer",
            "Não",
            "Sim"
          ]
        ],
        "note": "A cianose central reflete dessaturação arterial; a periférica, aumento da extração tecidual"
      },
      {
        "title": "Sinais de alarme",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Cianose central de início súbito + dispneia",
            "Emergência respiratória/cardíaca"
          ],
          [
            "Cianose que não melhora com O₂",
            "Shunt ou meta-hemoglobinemia"
          ],
          [
            "Cianose + rebaixamento de consciência",
            "Hipóxia grave — suporte imediato"
          ]
        ],
        "note": "Cianose é sinal tardio de hipoxemia — não aguardar seu surgimento para tratar"
      }
    ],
    "conduta": {
      "exames": [
        "Oximetria de pulso e gasometria arterial (PaO₂, SatO₂, metaHb se co-oximetria)",
        "Hemograma (anemia/policitemia)",
        "Radiografia de tórax",
        "ECG e ecocardiograma se suspeita cardíaca/shunt",
        "Dosagem de meta-hemoglobina se SpO₂ fixa não responsiva"
      ],
      "drugs": [
        "Oxigenoterapia conforme a causa e a SpO₂",
        "Tratamento dirigido à doença de base (pulmonar/cardíaca)",
        "Azul de metileno na meta-hemoglobinemia sintomática",
        "Aquecimento e otimização do débito na cianose periférica"
      ],
      "steps": [
        "1. Diferenciar cianose central de periférica pelo exame de mucosas/extremidades",
        "2. Medir SpO₂ e gasometria",
        "3. Ofertar O₂ e observar resposta",
        "4. Investigar a causa (pulmonar, cardíaca, hematológica, vascular)",
        "5. Lembrar que anemia mascara e policitemia exagera a cianose"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Tipos de cianosis",
        "rows": [
          [
            "Central",
            "Lengua y mucosas cianóticas, extremidades calientes — hipoxemia/shunt; SpO₂ baja"
          ],
          [
            "Periférica",
            "Extremidades frías y cianóticas, mucosas respetadas — bajo gasto/vasoconstricción; SpO₂ normal"
          ],
          [
            "Mixta",
            "Combinación — ej.: insuficiencia cardíaca congestiva"
          ],
          [
            "Diferencial",
            "Cianosis en MMII con MMSS respetados — shunt derecha-izquierda posductal (ej.: coartación)"
          ]
        ]
      },
      {
        "name": "Umbral de la cianosis",
        "rows": [
          [
            "Hemoglobina reducida",
            "La cianosis aparece con ≥5 g/dL de Hb desoxigenada en el lecho capilar"
          ],
          [
            "Anemia",
            "Puede haber hipoxemia grave SIN cianosis (poca Hb para desaturar)"
          ],
          [
            "Policitemia",
            "La cianosis surge más fácilmente, aun con saturación poco reducida"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspección de mucosas y lengua",
        "subtitle": "Diferenciar central x periférica",
        "steps": [
          "Examinar lengua, mucosa oral y conjuntivas con buena iluminación",
          "Comparar con lecho ungueal y extremidades"
        ],
        "normal": "Mucosas y lengua rosadas",
        "abnormal": "Lengua/mucosas azuladas → cianosis central (hipoxemia/shunt)"
      },
      {
        "title": "Prueba del calentamiento",
        "subtitle": "Cianosis periférica",
        "steps": [
          "Calentar la extremidad cianótica (masaje/calor)",
          "Observar si el color mejora"
        ],
        "normal": "Sin cianosis tras el calentamiento",
        "abnormal": "Mejora con el calentamiento → cianosis periférica (vasoconstricción/bajo gasto)"
      },
      {
        "title": "Oximetría + respuesta al O₂",
        "subtitle": "Confirmar hipoxemia",
        "steps": [
          "Medir SpO₂ en aire ambiente",
          "Ofrecer O₂ suplementario y volver a medir"
        ],
        "normal": "SpO₂ ≥95% y mejora con O₂",
        "abnormal": "No mejora con O₂ → sospechar shunt derecha-izquierda o metahemoglobinemia"
      }
    ],
    "sinais": [
      {
        "name": "Cianosis diferencial",
        "eponym": "Shunt posductal",
        "how": "MMII cianóticos y MMSS rosados (o viceversa)",
        "means": "Cardiopatía congénita con shunt — evaluación cardiológica"
      },
      {
        "name": "Acropaquia (dedos en palillo)",
        "eponym": "Hipoxemia crónica",
        "how": "Hipocratismo digital — ángulo de Lovibond >180°",
        "means": "Cardiopatía cianótica crónica, neumopatía, supuración crónica"
      },
      {
        "name": "Cianosis que no responde al O₂",
        "eponym": "Metahemoglobinemia",
        "how": "SpO₂ \"fijada\" ~85%, sangre color chocolate",
        "means": "Metahemoglobinemia (dapsona, nitritos, anestésicos) — azul de metileno"
      }
    ],
    "ddx": [
      [
        "Hipoxemia pulmonar",
        "Cianosis central, SpO₂ baja, mejora con O₂",
        "No mejora con O₂; extremidades frías aisladas"
      ],
      [
        "Shunt derecha-izquierda",
        "Central, acropaquia, no mejora con O₂",
        "Mejora plena con O₂"
      ],
      [
        "Bajo gasto / vasoconstricción",
        "Periférica, extremidades frías, mucosas respetadas",
        "Lengua cianótica, SpO₂ baja"
      ],
      [
        "Metahemoglobinemia",
        "SpO₂ ~85% fija, sangre achocolatada, fármaco causal",
        "Respuesta normal al O₂; gasometría con PaO₂ baja"
      ],
      [
        "Fenómeno de Raynaud",
        "Cianosis episódica de las extremidades al frío, trifásica",
        "Cianosis central persistente"
      ]
    ],
    "escalas": [
      {
        "title": "Central x Periférica",
        "headers": [
          "Característica",
          "Central",
          "Periférica"
        ],
        "rows": [
          [
            "Mucosas/lengua",
            "Cianóticas",
            "Respetadas"
          ],
          [
            "Temperatura de la extremidad",
            "Caliente",
            "Fría"
          ],
          [
            "SpO₂",
            "Reducida",
            "Normal"
          ],
          [
            "Mejora al calentar",
            "No",
            "Sí"
          ]
        ],
        "note": "La cianosis central refleja desaturación arterial; la periférica, aumento de la extracción tisular"
      },
      {
        "title": "Signos de alarma",
        "headers": [
          "Hallazgo",
          "Significado"
        ],
        "rows": [
          [
            "Cianosis central de inicio súbito + disnea",
            "Emergencia respiratoria/cardíaca"
          ],
          [
            "Cianosis que no mejora con O₂",
            "Shunt o metahemoglobinemia"
          ],
          [
            "Cianosis + deterioro de la conciencia",
            "Hipoxia grave — soporte inmediato"
          ]
        ],
        "note": "La cianosis es signo tardío de hipoxemia — no esperar su aparición para tratar"
      }
    ],
    "conduta": {
      "exames": [
        "Oximetría de pulso y gasometría arterial (PaO₂, SatO₂, metaHb si co-oximetría)",
        "Hemograma (anemia/policitemia)",
        "Radiografía de tórax",
        "ECG y ecocardiograma si sospecha cardíaca/shunt",
        "Dosaje de metahemoglobina si SpO₂ fija no responsiva"
      ],
      "drugs": [
        "Oxigenoterapia según la causa y la SpO₂",
        "Tratamiento dirigido a la enfermedad de base (pulmonar/cardíaca)",
        "Azul de metileno en la metahemoglobinemia sintomática",
        "Calentamiento y optimización del gasto en la cianosis periférica"
      ],
      "steps": [
        "1. Diferenciar cianosis central de periférica por el examen de mucosas/extremidades",
        "2. Medir SpO₂ y gasometría",
        "3. Ofrecer O₂ y observar la respuesta",
        "4. Investigar la causa (pulmonar, cardíaca, hematológica, vascular)",
        "5. Recordar que la anemia enmascara y la policitemia exagera la cianosis"
      ]
    }
  }
});
