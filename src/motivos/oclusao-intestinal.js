// Motivo: oclusao-intestinal — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("oclusao-intestinal", {
  "name": "Obstrução / Oclusão Intestinal",
  "nameEs": "Obstrucción / Oclusión Intestinal",
  "icon": "⛔",
  "color": "mc-danger",
  "rasHighlight": [
    "digest"
  ],
  "aeaGuide": [
    {
      "q": "Parada de eliminação de fezes e gases (obstipação)?",
      "qEs": "¿Parada de eliminación de heces y gases (obstipación)?",
      "type": "radio",
      "opts": [
        "Sim — parada total de fezes e gases (oclusão completa)",
        "Sim — parada de gases mas ainda elimina fezes líquidas",
        "Não — constipação prévia mas ainda elimina gases",
        "Sem parada de eliminação"
      ],
      "optsEs": [
        "Sí — parada total de heces y gases (oclusión completa)",
        "Sí — parada de gases pero aún elimina heces líquidas",
        "No — estreñimiento previo pero aún elimina gases",
        "Sin parada de eliminación"
      ]
    },
    {
      "q": "Distensão abdominal?",
      "qEs": "¿Distensión abdominal?",
      "type": "yn"
    },
    {
      "q": "Caráter da dor abdominal",
      "qEs": "Carácter del dolor abdominal",
      "type": "radio",
      "opts": [
        "Cólica progressiva (em ondas)",
        "Contínua e difusa — sinal de peritonite",
        "Sem dor significativa"
      ],
      "optsEs": [
        "Cólico progresivo (en ondas)",
        "Continua y difusa — signo de peritonitis",
        "Sin dolor significativo"
      ]
    },
    {
      "q": "Vômitos — caráter (alimentar → bilioso → fecaloide)?",
      "qEs": "¿Vómitos — carácter (alimenticio → bilioso → fecaloide)?",
      "type": "radio",
      "opts": [
        "Ausentes",
        "Alimentares",
        "Biliosos (verdes / amarelados)",
        "Fecaloides — fétidos (oclusão baixa avançada)"
      ],
      "optsEs": [
        "Ausentes",
        "Alimenticios",
        "Biliosos (verdes / amarillentos)",
        "Fecaloides — fétidos (oclusión baja avanzada)"
      ]
    },
    {
      "q": "Ruídos abdominais aumentados (borborigmos / peristalse de luta)?",
      "qEs": "¿Ruidos abdominales aumentados (borborigmos / peristaltismo de lucha)?",
      "type": "yn"
    },
    {
      "q": "Cirurgias abdominais anteriores (aderências)?",
      "qEs": "¿Cirugías abdominales anteriores (adherencias)?",
      "type": "yn"
    },
    {
      "q": "Hérnia conhecida (inguinal, umbilical, incisional)?",
      "qEs": "¿Hernia conocida (inguinal, umbilical, incisional)?",
      "type": "yn"
    },
    {
      "q": "Mudança recente no calibre das fezes ou sangue nas fezes?",
      "qEs": "¿Cambio reciente en el calibre de las heces o sangre en las heces?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Sinal de alarme — dor contínua sem alívio, febre alta, peritonismo (isquemia / estrangulamento)?",
      "qEs": "¿Signo de alarma — dolor continuo sin alivio, fiebre alta, peritonismo (isquemia / estrangulamiento)?",
      "type": "yn"
    },
    {
      "q": "Perda de peso recente ou alteração progressiva do hábito intestinal (suspeita de neoplasia)?",
      "qEs": "¿Pérdida de peso reciente o alteración progresiva del hábito intestinal (sospecha de neoplasia)?",
      "type": "yn"
    },
    {
      "q": "Uso de opioides, antidepressivos tricíclicos ou outros medicamentos constipantes?",
      "qEs": "¿Uso de opioides, antidepresivos tricíclicos u otros medicamentos estreñidores?",
      "type": "input",
      "ph": "Liste os medicamentos em uso",
      "ph2": "Liste los medicamentos en uso"
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
        "kw": "4 SINAIS",
        "name": "Obstrução intestinal",
        "rows": [
          [
            "D",
            "Dor",
            "Cólica abdominal (alta) ou contínua (estrangulamento)"
          ],
          [
            "V",
            "Vômitos",
            "Precoces na alta; tardios e fecaloides na baixa"
          ],
          [
            "D",
            "Distensão",
            "Mais marcada na obstrução baixa"
          ],
          [
            "P",
            "Parada",
            "Parada de eliminação de fezes e gases (obstipação)"
          ]
        ]
      },
      {
        "kw": "ABC",
        "name": "Causas mais comuns no adulto",
        "rows": [
          [
            "A",
            "Aderências",
            "Bridas pós-operatórias (causa mais comum de delgado)"
          ],
          [
            "B",
            "Bulge/hérnia",
            "Hérnia encarcerada (2ª causa)"
          ],
          [
            "C",
            "Cancer",
            "Neoplasia (causa mais comum no cólon)"
          ],
          [
            "V",
            "Vólvulo",
            "Sigmoide/ceco — torção"
          ],
          [
            "I",
            "Intussuscepção",
            "Mais comum em crianças"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Ausculta abdominal",
        "subtitle": "Padrão dos ruídos hidroaéreos",
        "steps": [
          "Auscultar os 4 quadrantes por até 2 minutos",
          "Caracterizar timbre e frequência"
        ],
        "normal": "Ruídos normais (5-30/min)",
        "abnormal": "Ruídos metálicos/aumentados (fase inicial) → silêncio (fase tardia/isquemia)"
      },
      {
        "title": "Toque retal",
        "subtitle": "Ampola e fecaloma",
        "steps": [
          "Inspeção perianal e toque retal",
          "Avaliar conteúdo da ampola e massas"
        ],
        "normal": "Ampola com fezes, sem massa",
        "abnormal": "Ampola vazia (obstrução) ou massa/sangue → neoplasia, fecaloma"
      },
      {
        "title": "Pesquisa de sinais de estrangulamento",
        "subtitle": "Sofrimento de alça",
        "steps": [
          "Avaliar dor contínua intensa, febre, taquicardia",
          "Pesquisar defesa/irritação peritoneal"
        ],
        "normal": "Dor em cólica intermitente, sem peritonite",
        "abnormal": "Dor contínua + febre + peritonismo + acidose → estrangulamento (emergência cirúrgica)"
      }
    ],
    "sinais": [
      {
        "name": "Distensão + timpanismo",
        "eponym": "Obstrução",
        "how": "Abdome distendido, timpânico à percussão",
        "means": "Acúmulo de gás/líquido a montante da obstrução"
      },
      {
        "name": "Vômito fecaloide",
        "eponym": "Obstrução baixa/tardia",
        "how": "Vômito de aspecto e odor fecal",
        "means": "Obstrução distal de longa evolução"
      },
      {
        "name": "Sinais de estrangulamento",
        "eponym": "Isquemia de alça",
        "how": "Dor contínua + febre + taquicardia + peritonismo",
        "means": "Sofrimento vascular da alça — cirurgia de urgência"
      },
      {
        "name": "Sinal do \"grão de café\"",
        "eponym": "Vólvulo de sigmoide",
        "how": "Imagem radiológica de alça distendida em U invertido",
        "means": "Vólvulo de sigmoide — descompressão endoscópica/cirurgia"
      }
    ],
    "ddx": [
      [
        "Obstrução de delgado (aderências)",
        "Vômitos precoces, cólica, cirurgia prévia, distensão central",
        "Sem cirurgia prévia; distensão periférica"
      ],
      [
        "Obstrução de cólon (neoplasia)",
        "Distensão marcada, vômito tardio, alteração do hábito, idoso",
        "Início agudo sem alteração de hábito"
      ],
      [
        "Hérnia encarcerada",
        "Abaulamento doloroso irredutível na parede/região inguinal",
        "Sem hérnia palpável"
      ],
      [
        "Íleo paralítico",
        "Distensão sem dor em cólica, ruídos ausentes, pós-op/distúrbio eletrolítico",
        "Cólica e luta peristáltica presentes"
      ],
      [
        "Vólvulo",
        "Distensão súbita, \"grão de café\" no RX, idoso/acamado",
        "Distribuição difusa de alças"
      ],
      [
        "Pseudo-obstrução (Ogilvie)",
        "Dilatação colônica sem obstrução mecânica",
        "Ponto de transição mecânico identificável"
      ],
      [
        "Isquemia mesentérica",
        "Dor desproporcional, acidose, fibrilação atrial",
        "Padrão obstrutivo clássico sem acidose precoce"
      ]
    ],
    "escalas": [
      {
        "title": "Alta x Baixa",
        "headers": [
          "Característica",
          "Obstrução alta (delgado)",
          "Obstrução baixa (cólon)"
        ],
        "rows": [
          [
            "Vômitos",
            "Precoces, biliosos",
            "Tardios, fecaloides"
          ],
          [
            "Distensão",
            "Discreta/central",
            "Acentuada/periférica"
          ],
          [
            "Cólica",
            "Frequente, curta",
            "Menos intensa"
          ],
          [
            "Desidratação",
            "Rápida",
            "Mais lenta"
          ]
        ],
        "note": "A localização orienta a etiologia mais provável e a urgência"
      },
      {
        "title": "Sinais de gravidade (estrangulamento)",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Dor contínua intensa",
            "Sofrimento de alça"
          ],
          [
            "Febre + taquicardia",
            "Resposta inflamatória/sepse"
          ],
          [
            "Defesa/irritação peritoneal",
            "Peritonite"
          ],
          [
            "Acidose/lactato ↑",
            "Isquemia intestinal"
          ]
        ],
        "note": "Qualquer sinal de estrangulamento indica laparotomia de urgência"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, eletrólitos, função renal, gasometria/lactato",
        "Radiografia de abdome (níveis hidroaéreos, distensão, pneumoperitônio)",
        "TC de abdome com contraste (ponto e causa da obstrução, sinais de isquemia)",
        "Beta-hCG em mulheres em idade fértil"
      ],
      "drugs": [
        "Jejum absoluto",
        "Sonda nasogástrica para descompressão",
        "Hidratação venosa + correção de distúrbios hidroeletrolíticos",
        "Analgesia e antieméticos",
        "ATB se estrangulamento/perfuração/cirurgia"
      ],
      "steps": [
        "1. Jejum + SNG + hidratação (\"drip and suck\")",
        "2. Corrigir distúrbios hidroeletrolíticos",
        "3. Definir mecânica x funcional e alta x baixa por imagem",
        "4. Sem estrangulamento (bridas): tratamento conservador e observação",
        "5. Estrangulamento, hérnia encarcerada, neoplasia obstrutiva ou falha do conservador → cirurgia"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Obstrucción intestinal",
        "rows": [
          [
            "Dolor",
            "Cólico abdominal (alta) o continuo (estrangulamiento)"
          ],
          [
            "Vómitos",
            "Precoces en la alta; tardíos y fecaloides en la baja"
          ],
          [
            "Distensión",
            "Más marcada en la obstrucción baja"
          ],
          [
            "Parada",
            "Parada de eliminación de heces y gases (obstipación)"
          ]
        ]
      },
      {
        "name": "Causas más comunes en el adulto",
        "rows": [
          [
            "Adherencias",
            "Bridas posoperatorias (causa más común de intestino delgado)"
          ],
          [
            "Bulto/hernia",
            "Hernia encarcelada (2ª causa)"
          ],
          [
            "Cáncer",
            "Neoplasia (causa más común en el colon)"
          ],
          [
            "Vólvulo",
            "Sigmoide/ciego — torsión"
          ],
          [
            "Invaginación",
            "Más común en niños"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Auscultación abdominal",
        "subtitle": "Patrón de los ruidos hidroaéreos",
        "steps": [
          "Auscultar los 4 cuadrantes hasta 2 minutos",
          "Caracterizar timbre y frecuencia"
        ],
        "normal": "Ruidos normales (5-30/min)",
        "abnormal": "Ruidos metálicos/aumentados (fase inicial) → silencio (fase tardía/isquemia)"
      },
      {
        "title": "Tacto rectal",
        "subtitle": "Ampolla y fecaloma",
        "steps": [
          "Inspección perianal y tacto rectal",
          "Evaluar contenido de la ampolla y masas"
        ],
        "normal": "Ampolla con heces, sin masa",
        "abnormal": "Ampolla vacía (obstrucción) o masa/sangre → neoplasia, fecaloma"
      },
      {
        "title": "Búsqueda de signos de estrangulamiento",
        "subtitle": "Sufrimiento de asa",
        "steps": [
          "Evaluar dolor continuo intenso, fiebre, taquicardia",
          "Buscar defensa/irritación peritoneal"
        ],
        "normal": "Dolor cólico intermitente, sin peritonitis",
        "abnormal": "Dolor continuo + fiebre + peritonismo + acidosis → estrangulamiento (emergencia quirúrgica)"
      }
    ],
    "sinais": [
      {
        "name": "Distensión + timpanismo",
        "eponym": "Obstrucción",
        "how": "Abdomen distendido, timpánico a la percusión",
        "means": "Acúmulo de gas/líquido proximal a la obstrucción"
      },
      {
        "name": "Vómito fecaloide",
        "eponym": "Obstrucción baja/tardía",
        "how": "Vómito de aspecto y olor fecal",
        "means": "Obstrucción distal de larga evolución"
      },
      {
        "name": "Signos de estrangulamiento",
        "eponym": "Isquemia de asa",
        "how": "Dolor continuo + fiebre + taquicardia + peritonismo",
        "means": "Sufrimiento vascular del asa — cirugía de urgencia"
      },
      {
        "name": "Signo del \"grano de café\"",
        "eponym": "Vólvulo de sigmoide",
        "how": "Imagen radiológica de asa distendida en U invertida",
        "means": "Vólvulo de sigmoide — descompresión endoscópica/cirugía"
      }
    ],
    "ddx": [
      [
        "Obstrucción de delgado (adherencias)",
        "Vómitos precoces, cólico, cirugía previa, distensión central",
        "Sin cirugía previa; distensión periférica"
      ],
      [
        "Obstrucción de colon (neoplasia)",
        "Distensión marcada, vómito tardío, cambio del hábito, anciano",
        "Inicio agudo sin cambio del hábito"
      ],
      [
        "Hernia encarcelada",
        "Abombamiento doloroso irreductible en la pared/región inguinal",
        "Sin hernia palpable"
      ],
      [
        "Íleo paralítico",
        "Distensión sin dolor cólico, ruidos ausentes, posop/trastorno electrolítico",
        "Cólico y lucha peristáltica presentes"
      ],
      [
        "Vólvulo",
        "Distensión súbita, \"grano de café\" en RX, anciano/encamado",
        "Distribución difusa de asas"
      ],
      [
        "Pseudoobstrucción (Ogilvie)",
        "Dilatación colónica sin obstrucción mecánica",
        "Punto de transición mecánico identificable"
      ],
      [
        "Isquemia mesentérica",
        "Dolor desproporcionado, acidosis, fibrilación auricular",
        "Patrón obstructivo clásico sin acidosis precoz"
      ]
    ],
    "escalas": [
      {
        "title": "Alta x Baja",
        "headers": [
          "Característica",
          "Obstrucción alta (delgado)",
          "Obstrucción baja (colon)"
        ],
        "rows": [
          [
            "Vómitos",
            "Precoces, biliosos",
            "Tardíos, fecaloides"
          ],
          [
            "Distensión",
            "Discreta/central",
            "Acentuada/periférica"
          ],
          [
            "Cólico",
            "Frecuente, corto",
            "Menos intenso"
          ],
          [
            "Deshidratación",
            "Rápida",
            "Más lenta"
          ]
        ],
        "note": "La localización orienta la etiología más probable y la urgencia"
      },
      {
        "title": "Signos de gravedad (estrangulamiento)",
        "headers": [
          "Hallazgo",
          "Significado"
        ],
        "rows": [
          [
            "Dolor continuo intenso",
            "Sufrimiento de asa"
          ],
          [
            "Fiebre + taquicardia",
            "Respuesta inflamatoria/sepsis"
          ],
          [
            "Defensa/irritación peritoneal",
            "Peritonitis"
          ],
          [
            "Acidosis/lactato ↑",
            "Isquemia intestinal"
          ]
        ],
        "note": "Cualquier signo de estrangulamiento indica laparotomía de urgencia"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, electrolitos, función renal, gasometría/lactato",
        "Radiografía de abdomen (niveles hidroaéreos, distensión, neumoperitoneo)",
        "TC de abdomen con contraste (punto y causa de la obstrucción, signos de isquemia)",
        "Beta-hCG en mujeres en edad fértil"
      ],
      "drugs": [
        "Ayuno absoluto",
        "Sonda nasogástrica para descompresión",
        "Hidratación venosa + corrección de trastornos hidroelectrolíticos",
        "Analgesia y antieméticos",
        "ATB si estrangulamiento/perforación/cirugía"
      ],
      "steps": [
        "1. Ayuno + SNG + hidratación (\"drip and suck\")",
        "2. Corregir trastornos hidroelectrolíticos",
        "3. Definir mecánica x funcional y alta x baja por imagen",
        "4. Sin estrangulamiento (bridas): tratamiento conservador y observación",
        "5. Estrangulamiento, hernia encarcelada, neoplasia obstructiva o falla del conservador → cirugía"
      ]
    }
  }
});
