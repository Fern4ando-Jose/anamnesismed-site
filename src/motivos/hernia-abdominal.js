// Motivo: hernia-abdominal — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("hernia-abdominal", {
  "name": "Hérnia da Parede Abdominal",
  "nameEs": "Hernia de Pared Abdominal",
  "icon": "🫸",
  "color": "mc-secondary",
  "rasHighlight": [
    "digest",
    "motor"
  ],
  "aeaGuide": [
    {
      "q": "Localização da tumoração",
      "qEs": "Localización de la tumoración",
      "type": "radio",
      "opts": [
        "Inguinal direita",
        "Inguinal esquerda",
        "Umbilical",
        "Epigástrica / linha branca",
        "Incisional (sobre cicatriz cirúrgica)",
        "Femoral",
        "Outra"
      ],
      "optsEs": [
        "Inguinal derecha",
        "Inguinal izquierda",
        "Umbilical",
        "Epigástrica / línea blanca",
        "Incisional (sobre cicatriz quirúrgica)",
        "Femoral",
        "Otra"
      ]
    },
    {
      "q": "Há quanto tempo notou o abaulamento?",
      "qEs": "¿Hace cuánto tiempo notó el abultamiento?",
      "type": "input",
      "ph": "Tempo de evolução",
      "ph2": "Tiempo de evolución"
    },
    {
      "q": "A tumoração some ao deitar-se (redutível)?",
      "qEs": "¿La tumoración desaparece al acostarse (reductible)?",
      "type": "radio",
      "opts": [
        "Sim — reduz espontaneamente ao deitar",
        "Sim — reduz com manobra manual",
        "Não — irredutível (encarcerada)"
      ],
      "optsEs": [
        "Sí — se reduce espontáneamente al acostarse",
        "Sí — se reduce con maniobra manual",
        "No — irreductible (encarcelada)"
      ]
    },
    {
      "q": "Dor associada — quando piora?",
      "qEs": "Dolor asociado — ¿cuándo empeora?",
      "type": "radio",
      "opts": [
        "Sem dor",
        "Leve ao esforço / tosse",
        "Moderada constante",
        "Intensa e súbita (encarceramento / estrangulamento)"
      ],
      "optsEs": [
        "Sin dolor",
        "Leve al esfuerzo / tos",
        "Moderada constante",
        "Intensa y súbita (encarcelamiento / estrangulamiento)"
      ]
    },
    {
      "q": "Piora ao tossir, espirrar ou realizar esforço físico?",
      "qEs": "¿Empeora al toser, estornudar o realizar esfuerzo físico?",
      "type": "yn"
    },
    {
      "q": "Episódio prévio de encarceramento (hérnia ficou dura, dolorosa e não reduziu)?",
      "qEs": "¿Episodio previo de encarcelamiento (hernia se quedó dura, dolorosa y no se redujo)?",
      "type": "yn"
    },
    {
      "q": "Sinal de alarme — dor intensa e súbita, irredutível, febre, pele sobre a hérnia eritematosa ou escurecida (estrangulamento)?",
      "qEs": "¿Signo de alarma — dolor intenso y súbito, irreductible, fiebre, piel sobre la hernia eritematosa u oscurecida (estrangulamiento)?",
      "type": "yn"
    },
    {
      "q": "Náuseas / vômitos / parada de fezes e gases (oclusão por estrangulamento)?",
      "qEs": "¿Náuseas / vómitos / parada de heces y gases (oclusión por estrangulamiento)?",
      "type": "yn"
    },
    {
      "q": "Fatores precipitantes: constipação crônica, tosse crônica, esforço físico intenso?",
      "qEs": "¿Factores precipitantes: estreñimiento crónico, tos crónica, esfuerzo físico intenso?",
      "type": "yn"
    },
    {
      "q": "Cirurgias abdominais anteriores (hérnia incisional)?",
      "qEs": "¿Cirugías abdominales anteriores (hernia incisional)?",
      "type": "yn"
    },
    {
      "q": "Antecedentes de hérnia reparada anteriormente (recidiva)?",
      "qEs": "¿Antecedentes de hernia reparada anteriormente (recidiva)?",
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
        "kw": "RICE",
        "name": "Estados clínicos da hérnia",
        "rows": [
          [
            "R",
            "Redutível",
            "Conteúdo retorna à cavidade espontaneamente ou com manobra"
          ],
          [
            "I",
            "Irredutível/Encarcerada",
            "Não reduz, sem isquemia — risco de obstrução"
          ],
          [
            "C",
            "Comprometimento",
            "Estrangulada — sofrimento vascular, dor intensa, sinais inflamatórios"
          ],
          [
            "E",
            "Emergência",
            "Estrangulamento = urgência cirúrgica"
          ]
        ]
      },
      {
        "kw": "LOCAIS",
        "name": "Tipos por localização",
        "rows": [
          [
            "I",
            "Inguinal indireta",
            "Mais comum; trajeto pelo canal inguinal, lateral aos vasos epigástricos"
          ],
          [
            "D",
            "Inguinal direta",
            "Triângulo de Hesselbach, medial aos vasos epigástricos"
          ],
          [
            "F",
            "Femoral",
            "Abaixo do ligamento inguinal; maior risco de encarceramento (mulheres)"
          ],
          [
            "U",
            "Umbilical",
            "Anel umbilical"
          ],
          [
            "I",
            "Incisional",
            "Cicatriz cirúrgica prévia"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Manobra de redução",
        "subtitle": "Avaliar redutibilidade",
        "steps": [
          "Paciente em decúbito dorsal, relaxado",
          "Pressão suave e sustentada sobre o conteúdo herniário"
        ],
        "normal": "Conteúdo reduz facilmente (hérnia redutível)",
        "abnormal": "Não reduz → encarcerada; dor intensa/sinais inflamatórios → estrangulada (NÃO insistir)"
      },
      {
        "title": "Teste de Valsalva em pé",
        "subtitle": "Detectar a hérnia",
        "steps": [
          "Examinar o paciente em pé",
          "Pedir para tossir / fazer força abdominal",
          "Palpar o abaulamento e o anel"
        ],
        "normal": "Sem abaulamento à manobra",
        "abnormal": "Abaulamento que protrui à tosse/esforço → hérnia"
      },
      {
        "title": "Diferenciar inguinal x femoral",
        "subtitle": "Relação com o ligamento inguinal",
        "steps": [
          "Localizar o tubérculo púbico e o ligamento inguinal",
          "Determinar se a protrusão é acima/medial (inguinal) ou abaixo/lateral (femoral)"
        ],
        "normal": "—",
        "abnormal": "Abaixo e lateral ao tubérculo púbico → femoral (alto risco de encarceramento)"
      }
    ],
    "sinais": [
      {
        "name": "Hérnia redutível",
        "eponym": "Hérnia não complicada",
        "how": "Abaulamento que aumenta ao esforço e reduz ao decúbito",
        "means": "Tratamento eletivo"
      },
      {
        "name": "Encarceramento",
        "eponym": "Hérnia complicada",
        "how": "Abaulamento irredutível, doloroso, sem sinais inflamatórios",
        "means": "Risco de obstrução — cirurgia precoce"
      },
      {
        "name": "Estrangulamento",
        "eponym": "Emergência",
        "how": "Dor intensa, pele eritematosa, vômitos, sinais de obstrução/isquemia",
        "means": "Sofrimento vascular — cirurgia de urgência"
      },
      {
        "name": "Sinal de Howship-Romberg",
        "eponym": "Hérnia obturatória",
        "how": "Dor na face medial da coxa por compressão do nervo obturador",
        "means": "Hérnia obturatória (idosa, magra) — alto índice de encarceramento"
      }
    ],
    "ddx": [
      [
        "Hérnia inguinal",
        "Abaulamento na virilha que protrui ao esforço, redutível",
        "Massa fixa, não redutível, sem relação com esforço"
      ],
      [
        "Hérnia femoral",
        "Abaulamento abaixo do ligamento inguinal, mulher, encarcera fácil",
        "Protrusão acima do ligamento (inguinal)"
      ],
      [
        "Adenomegalia inguinal",
        "Linfonodo firme, não reduz, não muda com Valsalva",
        "Reduz ao decúbito, protrui à tosse"
      ],
      [
        "Lipoma/tumor de parede",
        "Massa subcutânea fixa, sem anel herniário",
        "Anel palpável, conteúdo redutível"
      ],
      [
        "Hidrocele/varicocele",
        "Transiluminação positiva (hidrocele), \"saco de vermes\" (varicocele)",
        "Conteúdo intestinal redutível"
      ],
      [
        "Abscesso/coleção",
        "Sinais flogísticos, flutuação, febre",
        "Redutível, sem flogose (se não complicada)"
      ]
    ],
    "escalas": [
      {
        "title": "Quando operar de urgência",
        "headers": [
          "Situação",
          "Conduta"
        ],
        "rows": [
          [
            "Redutível assintomática",
            "Eletiva (avaliar risco x benefício)"
          ],
          [
            "Encarcerada recente sem isquemia",
            "Tentar redução suave; cirurgia precoce"
          ],
          [
            "Estrangulada",
            "Cirurgia de URGÊNCIA"
          ],
          [
            "Femoral (qualquer)",
            "Correção recomendada pelo alto risco de encarceramento"
          ]
        ],
        "note": "Hérnias femorais e sintomáticas têm indicação cirúrgica mais firme"
      },
      {
        "title": "Sinais de estrangulamento",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Dor intensa e contínua na hérnia",
            "Isquemia do conteúdo"
          ],
          [
            "Pele eritematosa/edemaciada sobre o saco",
            "Inflamação/necrose"
          ],
          [
            "Vômitos + distensão",
            "Obstrução associada"
          ],
          [
            "Febre/taquicardia/leucocitose",
            "Resposta sistêmica/sepse"
          ]
        ],
        "note": "NÃO tentar reduzir uma hérnia estrangulada — risco de reduzir alça inviável"
      }
    ],
    "conduta": {
      "exames": [
        "Diagnóstico é clínico na maioria dos casos",
        "USG de parede/região inguinal em dúvida diagnóstica",
        "TC de abdome se suspeita de complicação/obstrução",
        "Hemograma, eletrólitos e lactato se suspeita de estrangulamento"
      ],
      "drugs": [
        "Analgesia",
        "Hidratação e SNG se obstrução associada",
        "ATB se estrangulamento/ressecção intestinal",
        "Não há tratamento medicamentoso curativo — a correção é cirúrgica"
      ],
      "steps": [
        "1. Caracterizar localização e estado (redutível/encarcerada/estrangulada)",
        "2. Hérnia não complicada → correção eletiva (tela)",
        "3. Encarcerada recente sem isquemia → redução suave + cirurgia precoce",
        "4. Estrangulada → cirurgia de urgência (NÃO reduzir)",
        "5. Avaliar viabilidade da alça no intraoperatório"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Estados clínicos de la hernia",
        "rows": [
          [
            "Reductible",
            "El contenido vuelve a la cavidad espontáneamente o con maniobra"
          ],
          [
            "Irreductible/Encarcelada",
            "No reduce, sin isquemia — riesgo de obstrucción"
          ],
          [
            "Compromiso",
            "Estrangulada — sufrimiento vascular, dolor intenso, signos inflamatorios"
          ],
          [
            "Emergencia",
            "Estrangulamiento = urgencia quirúrgica"
          ]
        ]
      },
      {
        "name": "Tipos por localización",
        "rows": [
          [
            "Inguinal indirecta",
            "Más común; trayecto por el canal inguinal, lateral a los vasos epigástricos"
          ],
          [
            "Inguinal directa",
            "Triángulo de Hesselbach, medial a los vasos epigástricos"
          ],
          [
            "Femoral",
            "Bajo el ligamento inguinal; mayor riesgo de encarcelamiento (mujeres)"
          ],
          [
            "Umbilical",
            "Anillo umbilical"
          ],
          [
            "Incisional",
            "Cicatriz quirúrgica previa"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Maniobra de reducción",
        "subtitle": "Evaluar reductibilidad",
        "steps": [
          "Paciente en decúbito dorsal, relajado",
          "Presión suave y sostenida sobre el contenido herniario"
        ],
        "normal": "El contenido reduce fácilmente (hernia reductible)",
        "abnormal": "No reduce → encarcelada; dolor intenso/signos inflamatorios → estrangulada (NO insistir)"
      },
      {
        "title": "Prueba de Valsalva de pie",
        "subtitle": "Detectar la hernia",
        "steps": [
          "Examinar al paciente de pie",
          "Pedir toser / hacer fuerza abdominal",
          "Palpar el abombamiento y el anillo"
        ],
        "normal": "Sin abombamiento a la maniobra",
        "abnormal": "Abombamiento que protruye con la tos/esfuerzo → hernia"
      },
      {
        "title": "Diferenciar inguinal x femoral",
        "subtitle": "Relación con el ligamento inguinal",
        "steps": [
          "Localizar el tubérculo púbico y el ligamento inguinal",
          "Determinar si la protrusión es por encima/medial (inguinal) o por debajo/lateral (femoral)"
        ],
        "normal": "—",
        "abnormal": "Por debajo y lateral al tubérculo púbico → femoral (alto riesgo de encarcelamiento)"
      }
    ],
    "sinais": [
      {
        "name": "Hernia reductible",
        "eponym": "Hernia no complicada",
        "how": "Abombamiento que aumenta con el esfuerzo y reduce en decúbito",
        "means": "Tratamiento electivo"
      },
      {
        "name": "Encarcelamiento",
        "eponym": "Hernia complicada",
        "how": "Abombamiento irreductible, doloroso, sin signos inflamatorios",
        "means": "Riesgo de obstrucción — cirugía precoz"
      },
      {
        "name": "Estrangulamiento",
        "eponym": "Emergencia",
        "how": "Dolor intenso, piel eritematosa, vómitos, signos de obstrucción/isquemia",
        "means": "Sufrimiento vascular — cirugía de urgencia"
      },
      {
        "name": "Signo de Howship-Romberg",
        "eponym": "Hernia obturatriz",
        "how": "Dolor en la cara medial del muslo por compresión del nervio obturador",
        "means": "Hernia obturatriz (anciana, delgada) — alto índice de encarcelamiento"
      }
    ],
    "ddx": [
      [
        "Hernia inguinal",
        "Abombamiento en la ingle que protruye con el esfuerzo, reductible",
        "Masa fija, no reductible, sin relación con el esfuerzo"
      ],
      [
        "Hernia femoral",
        "Abombamiento bajo el ligamento inguinal, mujer, encarcela fácil",
        "Protrusión por encima del ligamento (inguinal)"
      ],
      [
        "Adenomegalia inguinal",
        "Ganglio firme, no reduce, no cambia con Valsalva",
        "Reduce en decúbito, protruye con la tos"
      ],
      [
        "Lipoma/tumor de pared",
        "Masa subcutánea fija, sin anillo herniario",
        "Anillo palpable, contenido reductible"
      ],
      [
        "Hidrocele/varicocele",
        "Transiluminación positiva (hidrocele), \"saco de gusanos\" (varicocele)",
        "Contenido intestinal reductible"
      ],
      [
        "Absceso/colección",
        "Signos flogísticos, fluctuación, fiebre",
        "Reductible, sin flogosis (si no está complicada)"
      ]
    ],
    "escalas": [
      {
        "title": "Cuándo operar de urgencia",
        "headers": [
          "Situación",
          "Conducta"
        ],
        "rows": [
          [
            "Reductible asintomática",
            "Electiva (evaluar riesgo x beneficio)"
          ],
          [
            "Encarcelada reciente sin isquemia",
            "Intentar reducción suave; cirugía precoz"
          ],
          [
            "Estrangulada",
            "Cirugía de URGENCIA"
          ],
          [
            "Femoral (cualquiera)",
            "Corrección recomendada por el alto riesgo de encarcelamiento"
          ]
        ],
        "note": "Las hernias femorales y sintomáticas tienen indicación quirúrgica más firme"
      },
      {
        "title": "Signos de estrangulamiento",
        "headers": [
          "Hallazgo",
          "Significado"
        ],
        "rows": [
          [
            "Dolor intenso y continuo en la hernia",
            "Isquemia del contenido"
          ],
          [
            "Piel eritematosa/edematosa sobre el saco",
            "Inflamación/necrosis"
          ],
          [
            "Vómitos + distensión",
            "Obstrucción asociada"
          ],
          [
            "Fiebre/taquicardia/leucocitosis",
            "Respuesta sistémica/sepsis"
          ]
        ],
        "note": "NO intentar reducir una hernia estrangulada — riesgo de reducir un asa inviable"
      }
    ],
    "conduta": {
      "exames": [
        "El diagnóstico es clínico en la mayoría de los casos",
        "USG de pared/región inguinal en duda diagnóstica",
        "TC de abdomen si sospecha de complicación/obstrucción",
        "Hemograma, electrolitos y lactato si sospecha de estrangulamiento"
      ],
      "drugs": [
        "Analgesia",
        "Hidratación y SNG si obstrucción asociada",
        "ATB si estrangulamiento/resección intestinal",
        "No hay tratamiento medicamentoso curativo — la corrección es quirúrgica"
      ],
      "steps": [
        "1. Caracterizar localización y estado (reductible/encarcelada/estrangulada)",
        "2. Hernia no complicada → corrección electiva (malla)",
        "3. Encarcelada reciente sin isquemia → reducción suave + cirugía precoz",
        "4. Estrangulada → cirugía de urgencia (NO reducir)",
        "5. Evaluar la viabilidad del asa en el intraoperatorio"
      ]
    }
  }
});
