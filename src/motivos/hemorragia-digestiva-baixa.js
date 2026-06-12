// Motivo: hemorragia-digestiva-baixa — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("hemorragia-digestiva-baixa", {
  "name": "Hemorragia Digestiva Baixa",
  "nameEs": "Hemorragia Digestiva Baja",
  "icon": "🔴",
  "color": "mc-danger",
  "rasHighlight": [
    "digest"
  ],
  "aeaGuide": [
    {
      "q": "Apresentação do sangramento",
      "qEs": "Presentación del sangrado",
      "type": "radio",
      "opts": [
        "Hematoquezia — sangue vivo nas fezes",
        "Fezes com sangue misturado / avermelhado escuro",
        "Melena — fezes negras e fétidas (pode ser baixa proximal)",
        "Sangue apenas no papel higiênico"
      ],
      "optsEs": [
        "Hematoquecia — sangre roja en las heces",
        "Heces con sangre mezclada / rojiza oscura",
        "Melena — heces negras y fétidas (puede ser baja proximal)",
        "Sangre solo en el papel higiénico"
      ]
    },
    {
      "q": "Relação do sangue com as fezes",
      "qEs": "Relación de la sangre con las heces",
      "type": "radio",
      "opts": [
        "Misturado às fezes (origem alta ou colônica)",
        "Na superfície das fezes / papel (origem anorretal)",
        "Jato livre independente das fezes (hemorroida)",
        "Não consegue distinguir"
      ],
      "optsEs": [
        "Mezclado con las heces (origen alto o colónico)",
        "En la superficie de las heces / papel (origen anorrectal)",
        "Chorro libre independiente de las heces (hemorroide)",
        "No puede distinguir"
      ]
    },
    {
      "q": "Volume estimado",
      "qEs": "Volumen estimado",
      "type": "radio",
      "opts": [
        "Pequeno — manchas",
        "Moderado",
        "Grande — hematoquezia maciça (>500 mL)"
      ],
      "optsEs": [
        "Pequeño — manchas",
        "Moderado",
        "Grande — hematoquecia masiva (>500 mL)"
      ]
    },
    {
      "q": "Dor abdominal associada?",
      "qEs": "¿Dolor abdominal asociado?",
      "type": "yn"
    },
    {
      "q": "Alteração do hábito intestinal recente — constipação, diarreia, fezes em fita?",
      "qEs": "¿Alteración del hábito intestinal reciente — estreñimiento, diarrea, heces en cinta?",
      "type": "yn"
    },
    {
      "q": "Perda de peso involuntária associada?",
      "qEs": "¿Pérdida de peso involuntaria asociada?",
      "type": "yn"
    },
    {
      "q": "Sinais de instabilidade: tontura, pré-síncope, taquicardia, palidez?",
      "qEs": "¿Signos de inestabilidad: mareo, presíncope, taquicardia, palidez?",
      "type": "yn"
    },
    {
      "q": "Dor ou sangramento anal associado à evacuação (fissura, hemorroida)?",
      "qEs": "¿Dolor o sangrado anal asociado a la evacuación (fisura, hemorroide)?",
      "type": "yn"
    },
    {
      "q": "Uso de AINEs, AAS ou anticoagulantes?",
      "qEs": "¿Uso de AINEs, AAS o anticoagulantes?",
      "type": "input",
      "ph": "Liste os medicamentos em uso",
      "ph2": "Liste los medicamentos en uso"
    },
    {
      "q": "Episódios semelhantes anteriores?",
      "qEs": "¿Episodios similares anteriores?",
      "type": "input",
      "ph": "Descreva episódios e tratamento anterior",
      "ph2": "Describa episodios y tratamiento anterior"
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
        "kw": "DRACO",
        "name": "Causas de HDB",
        "rows": [
          [
            "D",
            "Diverticular",
            "Causa mais comum de HDB volumosa no adulto"
          ],
          [
            "R",
            "Rectal/anorretal",
            "Hemorroidas, fissura — sangue vivo recobrindo as fezes"
          ],
          [
            "A",
            "Angiodisplasia",
            "Idoso, sangramento indolor recorrente"
          ],
          [
            "C",
            "Colite",
            "Isquêmica, infecciosa, inflamatória (DII)"
          ],
          [
            "O",
            "Oncológica",
            "Neoplasia colorretal"
          ]
        ]
      },
      {
        "kw": "ALTA x BAIXA",
        "name": "Diferenciar a origem",
        "rows": [
          [
            "M",
            "Melena",
            "Sugere fonte alta (sangue digerido)"
          ],
          [
            "H",
            "Hematoquezia",
            "Sangue vivo/vinhoso — geralmente fonte baixa"
          ],
          [
            "U",
            "Ureia",
            "Relação ureia/creatinina elevada sugere fonte alta"
          ],
          [
            "I",
            "Instabilidade",
            "HDB volumosa instável pode ser HDA maciça — excluir com EDA"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspeção anal e toque retal",
        "subtitle": "Fonte anorretal",
        "steps": [
          "Inspecionar a região perianal",
          "Realizar toque retal e anuscopia se disponível"
        ],
        "normal": "Sem lesões, ampola com fezes normais",
        "abnormal": "Hemorroidas/fissura/massa/sangue → orienta a origem"
      },
      {
        "title": "Caracterização do sangramento",
        "subtitle": "Cor e relação com as fezes",
        "steps": [
          "Perguntar cor (vivo, vinhoso, escuro)",
          "Relação com as fezes (recobrindo, misturado, no papel)"
        ],
        "normal": "—",
        "abnormal": "Sangue vivo no papel → anorretal baixo; misturado/vinhoso → cólon proximal"
      },
      {
        "title": "Avaliação hemodinâmica",
        "subtitle": "Estimar a perda",
        "steps": [
          "PA, FC, sinais de hipoperfusão",
          "Teste ortostático"
        ],
        "normal": "Estável, sem alteração postural",
        "abnormal": "Instabilidade → ressuscitar e excluir HDA maciça"
      }
    ],
    "sinais": [
      {
        "name": "Hematoquezia",
        "eponym": "HDB",
        "how": "Eliminação de sangue vivo/vinhoso pelo reto",
        "means": "Sangramento geralmente abaixo do ângulo de Treitz"
      },
      {
        "name": "Sangramento diverticular",
        "eponym": "HDB volumosa",
        "how": "Hematoquezia indolor, súbita, autolimitada na maioria",
        "means": "Causa mais comum de HDB significativa"
      },
      {
        "name": "Angiodisplasia",
        "eponym": "HDB do idoso",
        "how": "Sangramento indolor recorrente, associado a estenose aórtica (S. de Heyde)",
        "means": "Lesões vasculares do cólon direito"
      },
      {
        "name": "Sangue recobrindo as fezes",
        "eponym": "Doença anorretal",
        "how": "Sangue vivo no papel/sobre as fezes",
        "means": "Hemorroidas ou fissura anal"
      }
    ],
    "ddx": [
      [
        "Doença diverticular",
        "Hematoquezia volumosa indolor, idoso",
        "Dor anal, sangue só no papel"
      ],
      [
        "Doença anorretal (hemorroidas/fissura)",
        "Sangue vivo no papel, dor anal (fissura)",
        "Sangramento volumoso misturado às fezes"
      ],
      [
        "Angiodisplasia",
        "Sangramento indolor recorrente, idoso, anemia",
        "Episódio único com dor abdominal"
      ],
      [
        "Colite isquêmica",
        "Dor abdominal + sangramento, idoso vasculopata",
        "Sangramento indolor isolado"
      ],
      [
        "Doença inflamatória intestinal",
        "Diarreia com sangue/muco, dor, jovem, sintomas crônicos",
        "Sangramento agudo isolado sem diarreia"
      ],
      [
        "Neoplasia colorretal",
        "Alteração do hábito, anemia, perda de peso, sangue oculto",
        "Sangramento agudo volumoso sem sintomas consumptivos"
      ],
      [
        "HDA maciça simulando HDB",
        "Instável, ureia ↑, aspirado/EDA com sangue",
        "Fonte baixa identificada, hemodinâmica estável"
      ]
    ],
    "escalas": [
      {
        "title": "Estratificação de risco",
        "headers": [
          "Achado de alto risco",
          "Implicação"
        ],
        "rows": [
          [
            "Instabilidade hemodinâmica",
            "Ressuscitação + investigação urgente"
          ],
          [
            "Sangramento contínuo/volumoso",
            "Colonoscopia urgente / angio-TC"
          ],
          [
            "Idade avançada + comorbidades",
            "Maior morbimortalidade"
          ],
          [
            "Uso de anticoagulante/antiagregante",
            "Maior gravidade e ressangramento"
          ]
        ],
        "note": "A maioria das HDB é autolimitada, mas o alto risco exige investigação rápida"
      },
      {
        "title": "Sequência diagnóstica",
        "headers": [
          "Cenário",
          "Exame"
        ],
        "rows": [
          [
            "Estável",
            "Colonoscopia eletiva (preparo)"
          ],
          [
            "Sangramento ativo volumoso",
            "Angio-TC / arteriografia"
          ],
          [
            "Suspeita de fonte alta",
            "EDA"
          ],
          [
            "Negativo + recorrente",
            "Cápsula endoscópica / cintilografia"
          ]
        ],
        "note": "A colonoscopia é o exame de escolha na maioria dos casos estáveis"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma seriado, tipagem e prova cruzada",
        "Coagulograma, ureia/creatinina, eletrólitos",
        "EDA se suspeita de fonte alta",
        "Colonoscopia (diagnóstica e terapêutica)",
        "Angio-TC/arteriografia se sangramento ativo volumoso"
      ],
      "drugs": [
        "Ressuscitação volêmica + hemoderivados conforme necessidade",
        "Correção de coagulopatia; suspender/reverter anticoagulantes quando possível",
        "Tratamento dirigido à causa (endoscópico, embolização ou cirúrgico)"
      ],
      "steps": [
        "1. Avaliar estabilidade e ressuscitar se necessário",
        "2. Excluir HDA maciça (toque retal, SNG/EDA se dúvida)",
        "3. Estável → colonoscopia após preparo",
        "4. Sangramento ativo volumoso → angio-TC/arteriografia com embolização",
        "5. Refratário/recorrente → cirurgia; tratar a causa de base"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de HDB",
        "rows": [
          [
            "Diverticular",
            "Causa más común de HDB voluminosa en el adulto"
          ],
          [
            "Rectal/anorrectal",
            "Hemorroides, fisura — sangre fresca recubriendo las heces"
          ],
          [
            "Angiodisplasia",
            "Anciano, sangrado indoloro recurrente"
          ],
          [
            "Colitis",
            "Isquémica, infecciosa, inflamatoria (EII)"
          ],
          [
            "Oncológica",
            "Neoplasia colorrectal"
          ]
        ]
      },
      {
        "name": "Diferenciar el origen",
        "rows": [
          [
            "Melena",
            "Sugiere fuente alta (sangre digerida)"
          ],
          [
            "Hematoquecia",
            "Sangre fresca/vinosa — generalmente fuente baja"
          ],
          [
            "Urea",
            "Relación urea/creatinina elevada sugiere fuente alta"
          ],
          [
            "Inestabilidad",
            "Una HDB voluminosa inestable puede ser una HDA masiva — excluir con EDA"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspección anal y tacto rectal",
        "subtitle": "Fuente anorrectal",
        "steps": [
          "Inspeccionar la región perianal",
          "Realizar tacto rectal y anoscopia si está disponible"
        ],
        "normal": "Sin lesiones, ampolla con heces normales",
        "abnormal": "Hemorroides/fisura/masa/sangre → orienta el origen"
      },
      {
        "title": "Caracterización del sangrado",
        "subtitle": "Color y relación con las heces",
        "steps": [
          "Preguntar color (fresco, vinoso, oscuro)",
          "Relación con las heces (recubriendo, mezclado, en el papel)"
        ],
        "normal": "—",
        "abnormal": "Sangre fresca en el papel → anorrectal bajo; mezclada/vinosa → colon proximal"
      },
      {
        "title": "Evaluación hemodinámica",
        "subtitle": "Estimar la pérdida",
        "steps": [
          "PA, FC, signos de hipoperfusión",
          "Prueba ortostática"
        ],
        "normal": "Estable, sin alteración postural",
        "abnormal": "Inestabilidad → resucitar y excluir HDA masiva"
      }
    ],
    "sinais": [
      {
        "name": "Hematoquecia",
        "eponym": "HDB",
        "how": "Eliminación de sangre fresca/vinosa por el recto",
        "means": "Sangrado generalmente por debajo del ángulo de Treitz"
      },
      {
        "name": "Sangrado diverticular",
        "eponym": "HDB voluminosa",
        "how": "Hematoquecia indolora, súbita, autolimitada en la mayoría",
        "means": "Causa más común de HDB significativa"
      },
      {
        "name": "Angiodisplasia",
        "eponym": "HDB del anciano",
        "how": "Sangrado indoloro recurrente, asociado a estenosis aórtica (S. de Heyde)",
        "means": "Lesiones vasculares del colon derecho"
      },
      {
        "name": "Sangre recubriendo las heces",
        "eponym": "Enfermedad anorrectal",
        "how": "Sangre fresca en el papel/sobre las heces",
        "means": "Hemorroides o fisura anal"
      }
    ],
    "ddx": [
      [
        "Enfermedad diverticular",
        "Hematoquecia voluminosa indolora, anciano",
        "Dolor anal, sangre solo en el papel"
      ],
      [
        "Enfermedad anorrectal (hemorroides/fisura)",
        "Sangre fresca en el papel, dolor anal (fisura)",
        "Sangrado voluminoso mezclado con las heces"
      ],
      [
        "Angiodisplasia",
        "Sangrado indoloro recurrente, anciano, anemia",
        "Episodio único con dolor abdominal"
      ],
      [
        "Colitis isquémica",
        "Dolor abdominal + sangrado, anciano vasculópata",
        "Sangrado indoloro aislado"
      ],
      [
        "Enfermedad inflamatoria intestinal",
        "Diarrea con sangre/moco, dolor, joven, síntomas crónicos",
        "Sangrado agudo aislado sin diarrea"
      ],
      [
        "Neoplasia colorrectal",
        "Cambio del hábito, anemia, pérdida de peso, sangre oculta",
        "Sangrado agudo voluminoso sin síntomas consumptivos"
      ],
      [
        "HDA masiva simulando HDB",
        "Inestable, urea ↑, aspirado/EDA con sangre",
        "Fuente baja identificada, hemodinámica estable"
      ]
    ],
    "escalas": [
      {
        "title": "Estratificación de riesgo",
        "headers": [
          "Hallazgo de alto riesgo",
          "Implicación"
        ],
        "rows": [
          [
            "Inestabilidad hemodinámica",
            "Resucitación + investigación urgente"
          ],
          [
            "Sangrado continuo/voluminoso",
            "Colonoscopia urgente / angio-TC"
          ],
          [
            "Edad avanzada + comorbilidades",
            "Mayor morbimortalidad"
          ],
          [
            "Uso de anticoagulante/antiagregante",
            "Mayor gravedad y resangrado"
          ]
        ],
        "note": "La mayoría de las HDB son autolimitadas, pero el alto riesgo exige investigación rápida"
      },
      {
        "title": "Secuencia diagnóstica",
        "headers": [
          "Escenario",
          "Examen"
        ],
        "rows": [
          [
            "Estable",
            "Colonoscopia electiva (preparación)"
          ],
          [
            "Sangrado activo voluminoso",
            "Angio-TC / arteriografía"
          ],
          [
            "Sospecha de fuente alta",
            "EDA"
          ],
          [
            "Negativo + recurrente",
            "Cápsula endoscópica / gammagrafía"
          ]
        ],
        "note": "La colonoscopia es el examen de elección en la mayoría de los casos estables"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma seriado, tipificación y prueba cruzada",
        "Coagulograma, urea/creatinina, electrolitos",
        "EDA si sospecha de fuente alta",
        "Colonoscopia (diagnóstica y terapéutica)",
        "Angio-TC/arteriografía si sangrado activo voluminoso"
      ],
      "drugs": [
        "Resucitación volémica + hemoderivados según necesidad",
        "Corrección de coagulopatía; suspender/revertir anticoagulantes cuando sea posible",
        "Tratamiento dirigido a la causa (endoscópico, embolización o quirúrgico)"
      ],
      "steps": [
        "1. Evaluar estabilidad y resucitar si es necesario",
        "2. Excluir HDA masiva (tacto rectal, SNG/EDA si hay duda)",
        "3. Estable → colonoscopia tras preparación",
        "4. Sangrado activo voluminoso → angio-TC/arteriografía con embolización",
        "5. Refractario/recurrente → cirugía; tratar la causa de base"
      ]
    }
  }
});
