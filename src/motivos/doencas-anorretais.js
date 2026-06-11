// Motivo: doencas-anorretais — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("doencas-anorretais", {
  "name": "Doenças Anorretais",
  "nameEs": "Enfermedades Anorrectales",
  "icon": "🔻",
  "color": "mc-secondary",
  "rasHighlight": [
    "digest"
  ],
  "aeaGuide": [
    {
      "q": "Queixa principal",
      "qEs": "Queja principal",
      "type": "radio",
      "opts": [
        "Sangramento anal",
        "Dor anal",
        "Prolapso / tumoração anal",
        "Prurido anal",
        "Secreção / corrimento anal",
        "Mais de uma queixa"
      ],
      "optsEs": [
        "Sangrado anal",
        "Dolor anal",
        "Prolapso / tumoración anal",
        "Prurito anal",
        "Secreción / flujo anal",
        "Más de una queja"
      ]
    },
    {
      "q": "Caracterização do sangramento anal",
      "qEs": "Caracterización del sangrado anal",
      "type": "radio",
      "opts": [
        "Sangue vivo no papel higiênico",
        "Jato de sangue ao evacuar",
        "Sangue misturado às fezes",
        "Manchas na roupa íntima",
        "Não há sangramento"
      ],
      "optsEs": [
        "Sangre roja en el papel higiénico",
        "Chorro de sangre al evacuar",
        "Sangre mezclada con las heces",
        "Manchas en la ropa interior",
        "No hay sangrado"
      ]
    },
    {
      "q": "Dor anal — quando ocorre?",
      "qEs": "Dolor anal — ¿cuándo ocurre?",
      "type": "radio",
      "opts": [
        "Durante a evacuação",
        "Após a evacuação (ardor prolongado)",
        "Contínua, independente da evacuação",
        "Pulsátil / latejante (sugere abscesso)",
        "Sem dor"
      ],
      "optsEs": [
        "Durante la evacuación",
        "Después de la evacuación (ardor prolongado)",
        "Continua, independiente de la evacuación",
        "Pulsátil / latente (sugiere absceso)",
        "Sin dolor"
      ]
    },
    {
      "q": "Prolapso — sai algo pelo ânus? É redutível?",
      "qEs": "Prolapso — ¿sale algo por el ano? ¿Es reductible?",
      "type": "radio",
      "opts": [
        "Não há prolapso",
        "Sim — reduz espontaneamente",
        "Sim — necessita reposição manual",
        "Sim — irredutível"
      ],
      "optsEs": [
        "No hay prolapso",
        "Sí — se reduce espontáneamente",
        "Sí — requiere reducción manual",
        "Sí — irreductible"
      ]
    },
    {
      "q": "Secreção / corrimento anal",
      "qEs": "Secreción / flujo anal",
      "type": "radio",
      "opts": [
        "Ausente",
        "Purulenta — pus (fístula / abscesso)",
        "Mucosa / serosa",
        "Fecal (fístula perianal)"
      ],
      "optsEs": [
        "Ausente",
        "Purulenta — pus (fístula / absceso)",
        "Mucosa / serosa",
        "Fecal (fístula perianal)"
      ]
    },
    {
      "q": "Prurido anal?",
      "qEs": "¿Prurito anal?",
      "type": "yn"
    },
    {
      "q": "Constipação crônica com esforço evacuatório intenso?",
      "qEs": "¿Estreñimiento crónico con esfuerzo evacuatorio intenso?",
      "type": "yn"
    },
    {
      "q": "Febre ou calafrios — sugere abscesso anorretal?",
      "qEs": "¿Fiebre o escalofríos — sugiere absceso anorrectal?",
      "type": "yn"
    },
    {
      "q": "Diagnóstico prévio de hemorroidas, fissura anal, fístula ou doença de Crohn perianal?",
      "qEs": "¿Diagnóstico previo de hemorroides, fisura anal, fístula o enfermedad de Crohn perianal?",
      "type": "yn"
    },
    {
      "q": "Cirurgia anorretal anterior (hemorroidectomia, esfincteroplastia)?",
      "qEs": "¿Cirugía anorrectal anterior (hemorroidectomía, esfinteroplastia)?",
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
        "kw": "HEMORROIDA",
        "name": "Classificação das hemorroidas internas",
        "rows": [
          [
            "I",
            "Grau I",
            "Sangram, não prolapsam"
          ],
          [
            "II",
            "Grau II",
            "Prolapsam ao esforço, reduzem espontaneamente"
          ],
          [
            "III",
            "Grau III",
            "Prolapsam e exigem redução manual"
          ],
          [
            "IV",
            "Grau IV",
            "Prolapso permanente, irredutível"
          ]
        ]
      },
      {
        "kw": "DOR x SANGUE",
        "name": "Diferenciar as causas",
        "rows": [
          [
            "F",
            "Fissura",
            "Dor anal intensa \"em lâmina\" ao evacuar + sangue vivo no papel"
          ],
          [
            "H",
            "Hemorroida",
            "Sangramento indolor vivo; dor só se trombosada"
          ],
          [
            "A",
            "Abscesso",
            "Dor pulsátil contínua + febre + abaulamento perianal"
          ],
          [
            "F",
            "Fístula",
            "Drenagem purulenta crônica por orifício perianal"
          ],
          [
            "N",
            "Neoplasia",
            "Sangramento + massa + alteração do hábito — sempre excluir"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspeção perianal",
        "subtitle": "Avaliação inicial",
        "steps": [
          "Posição de Sims ou genupeitoral",
          "Inspecionar com afastamento das nádegas",
          "Pedir esforço evacuatório para evidenciar prolapso"
        ],
        "normal": "Pele perianal íntegra, sem lesões",
        "abnormal": "Plicoma, mariscos, prolapso, orifício fistuloso, fissura na linha média posterior"
      },
      {
        "title": "Toque retal",
        "subtitle": "Massas e tônus",
        "steps": [
          "Toque retal cuidadoso (evitar se fissura muito dolorosa)",
          "Avaliar tônus, massas, dor e sangue na luva"
        ],
        "normal": "Tônus normal, sem massas, sem sangue",
        "abnormal": "Massa endurecida → neoplasia; dor intensa → fissura/abscesso"
      },
      {
        "title": "Anuscopia",
        "subtitle": "Visualização do canal anal",
        "steps": [
          "Introduzir o anuscópio lubrificado",
          "Inspecionar mamilos hemorroidários e mucosa"
        ],
        "normal": "Mucosa normal",
        "abnormal": "Hemorroidas internas, fissura, lesões da mucosa"
      }
    ],
    "sinais": [
      {
        "name": "Sangramento indolor vivo",
        "eponym": "Hemorroidas",
        "how": "Sangue vivo recobrindo as fezes/no papel, indolor",
        "means": "Hemorroidas internas (sempre excluir neoplasia)"
      },
      {
        "name": "Dor anal \"em lâmina\"",
        "eponym": "Fissura anal",
        "how": "Dor intensa ao evacuar + sangramento vivo + espasmo esfincteriano",
        "means": "Fissura anal (linha média posterior)"
      },
      {
        "name": "Tríade do abscesso",
        "eponym": "Abscesso perianal",
        "how": "Dor contínua + abaulamento flutuante + febre",
        "means": "Abscesso anorretal — drenagem cirúrgica"
      },
      {
        "name": "Orifício com drenagem crônica",
        "eponym": "Fístula perianal",
        "how": "Saída de secreção purulenta por orifício cutâneo perianal",
        "means": "Fístula (frequentemente sequela de abscesso prévio)"
      }
    ],
    "ddx": [
      [
        "Hemorroidas",
        "Sangramento vivo indolor, prolapso, dor só se trombose",
        "Dor intensa ao evacuar (fissura)"
      ],
      [
        "Fissura anal",
        "Dor \"em lâmina\" ao evacuar, sangue vivo, espasmo esfincteriano",
        "Sangramento indolor; massa endurecida"
      ],
      [
        "Abscesso perianal",
        "Dor pulsátil contínua, febre, abaulamento flutuante",
        "Dor apenas à evacuação, sem febre"
      ],
      [
        "Fístula perianal",
        "Drenagem purulenta crônica por orifício perianal",
        "Quadro agudo único sem orifício"
      ],
      [
        "Câncer anorretal",
        "Massa endurecida, alteração do hábito, perda de peso, sangramento persistente",
        "Lesão benigna típica que regride com tratamento"
      ],
      [
        "Plicoma/marisco",
        "Pele redundante indolor, sem sangramento ativo",
        "Sangramento ou dor significativos"
      ],
      [
        "Prolapso retal",
        "Protrusão circunferencial de mucosa retal",
        "Prolapso apenas dos mamilos hemorroidários"
      ]
    ],
    "escalas": [
      {
        "title": "Conduta por grau (hemorroidas internas)",
        "headers": [
          "Grau",
          "Tratamento"
        ],
        "rows": [
          [
            "I-II",
            "Medidas higienodietéticas, fibras, banho de assento; ligadura elástica"
          ],
          [
            "III",
            "Ligadura elástica / hemorroidectomia conforme sintomas"
          ],
          [
            "IV",
            "Hemorroidectomia cirúrgica"
          ],
          [
            "Trombose",
            "Analgesia; trombectomia se <72h e muito dolorosa"
          ]
        ],
        "note": "A maioria responde a medidas conservadoras e aumento de fibras"
      },
      {
        "title": "Sinais de alarme anorretal",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Massa endurecida/irregular",
            "Suspeita de neoplasia"
          ],
          [
            "Alteração persistente do hábito intestinal",
            "Investigar cólon"
          ],
          [
            "Perda de peso/anemia",
            "Doença orgânica/neoplásica"
          ],
          [
            "Sangramento que não cessa com tratamento",
            "Colonoscopia obrigatória"
          ]
        ],
        "note": "Nunca atribuir sangramento a hemorroidas sem excluir neoplasia em pacientes de risco"
      }
    ],
    "conduta": {
      "exames": [
        "Diagnóstico essencialmente clínico (inspeção + toque + anuscopia)",
        "Colonoscopia se sinais de alarme, idade >45-50 anos ou sangramento persistente",
        "Hemograma se sangramento crônico (anemia)",
        "RM de pelve para mapeamento de fístulas complexas"
      ],
      "drugs": [
        "Dieta rica em fibras + hidratação + banhos de assento mornos",
        "Laxantes/formadores de bolo fecal",
        "Analgésicos tópicos/sistêmicos; pomadas (anestésico ± corticoide) por curto período",
        "Fissura: pomada de nitrato/bloqueador de canal de cálcio para relaxar o esfíncter"
      ],
      "steps": [
        "1. Caracterizar a queixa (dor x sangramento) e examinar (inspeção, toque, anuscopia)",
        "2. Medidas higienodietéticas como base do tratamento",
        "3. Hemorroidas: tratamento por grau (ligadura/cirurgia)",
        "4. Abscesso → drenagem cirúrgica; fístula → tratamento cirúrgico",
        "5. Excluir neoplasia com colonoscopia nos casos de risco/alarme"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Clasificación de las hemorroides internas",
        "rows": [
          [
            "Grado I",
            "Sangran, no prolapsan"
          ],
          [
            "Grado II",
            "Prolapsan con el esfuerzo, reducen espontáneamente"
          ],
          [
            "Grado III",
            "Prolapsan y exigen reducción manual"
          ],
          [
            "Grado IV",
            "Prolapso permanente, irreductible"
          ]
        ]
      },
      {
        "name": "Diferenciar las causas",
        "rows": [
          [
            "Fisura",
            "Dolor anal intenso \"en cuchilla\" al defecar + sangre fresca en el papel"
          ],
          [
            "Hemorroide",
            "Sangrado indoloro fresco; dolor solo si está trombosada"
          ],
          [
            "Absceso",
            "Dolor pulsátil continuo + fiebre + abombamiento perianal"
          ],
          [
            "Fístula",
            "Drenaje purulento crónico por orificio perianal"
          ],
          [
            "Neoplasia",
            "Sangrado + masa + cambio del hábito — siempre excluir"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspección perianal",
        "subtitle": "Evaluación inicial",
        "steps": [
          "Posición de Sims o genupectoral",
          "Inspeccionar separando las nalgas",
          "Pedir esfuerzo defecatorio para evidenciar el prolapso"
        ],
        "normal": "Piel perianal íntegra, sin lesiones",
        "abnormal": "Plicoma, hemorroides externas, prolapso, orificio fistuloso, fisura en la línea media posterior"
      },
      {
        "title": "Tacto rectal",
        "subtitle": "Masas y tono",
        "steps": [
          "Tacto rectal cuidadoso (evitar si la fisura es muy dolorosa)",
          "Evaluar tono, masas, dolor y sangre en el guante"
        ],
        "normal": "Tono normal, sin masas, sin sangre",
        "abnormal": "Masa endurecida → neoplasia; dolor intenso → fisura/absceso"
      },
      {
        "title": "Anoscopia",
        "subtitle": "Visualización del canal anal",
        "steps": [
          "Introducir el anoscopio lubricado",
          "Inspeccionar paquetes hemorroidales y mucosa"
        ],
        "normal": "Mucosa normal",
        "abnormal": "Hemorroides internas, fisura, lesiones de la mucosa"
      }
    ],
    "sinais": [
      {
        "name": "Sangrado indoloro fresco",
        "eponym": "Hemorroides",
        "how": "Sangre fresca recubriendo las heces/en el papel, indoloro",
        "means": "Hemorroides internas (siempre excluir neoplasia)"
      },
      {
        "name": "Dolor anal \"en cuchilla\"",
        "eponym": "Fisura anal",
        "how": "Dolor intenso al defecar + sangrado fresco + espasmo esfinteriano",
        "means": "Fisura anal (línea media posterior)"
      },
      {
        "name": "Tríada del absceso",
        "eponym": "Absceso perianal",
        "how": "Dolor continuo + abombamiento fluctuante + fiebre",
        "means": "Absceso anorrectal — drenaje quirúrgico"
      },
      {
        "name": "Orificio con drenaje crónico",
        "eponym": "Fístula perianal",
        "how": "Salida de secreción purulenta por orificio cutáneo perianal",
        "means": "Fístula (frecuentemente secuela de absceso previo)"
      }
    ],
    "ddx": [
      [
        "Hemorroides",
        "Sangrado fresco indoloro, prolapso, dolor solo si trombosis",
        "Dolor intenso al defecar (fisura)"
      ],
      [
        "Fisura anal",
        "Dolor \"en cuchilla\" al defecar, sangre fresca, espasmo esfinteriano",
        "Sangrado indoloro; masa endurecida"
      ],
      [
        "Absceso perianal",
        "Dolor pulsátil continuo, fiebre, abombamiento fluctuante",
        "Dolor solo a la defecación, sin fiebre"
      ],
      [
        "Fístula perianal",
        "Drenaje purulento crónico por orificio perianal",
        "Cuadro agudo único sin orificio"
      ],
      [
        "Cáncer anorrectal",
        "Masa endurecida, cambio del hábito, pérdida de peso, sangrado persistente",
        "Lesión benigna típica que regresa con el tratamiento"
      ],
      [
        "Plicoma/hemorroide externa",
        "Piel redundante indolora, sin sangrado activo",
        "Sangrado o dolor significativos"
      ],
      [
        "Prolapso rectal",
        "Protrusión circunferencial de mucosa rectal",
        "Prolapso solo de los paquetes hemorroidales"
      ]
    ],
    "escalas": [
      {
        "title": "Conducta por grado (hemorroides internas)",
        "headers": [
          "Grado",
          "Tratamiento"
        ],
        "rows": [
          [
            "I-II",
            "Medidas higienodietéticas, fibras, baño de asiento; ligadura elástica"
          ],
          [
            "III",
            "Ligadura elástica / hemorroidectomía según síntomas"
          ],
          [
            "IV",
            "Hemorroidectomía quirúrgica"
          ],
          [
            "Trombosis",
            "Analgesia; trombectomía si <72h y muy dolorosa"
          ]
        ],
        "note": "La mayoría responde a medidas conservadoras y aumento de fibras"
      },
      {
        "title": "Signos de alarma anorrectal",
        "headers": [
          "Hallazgo",
          "Significado"
        ],
        "rows": [
          [
            "Masa endurecida/irregular",
            "Sospecha de neoplasia"
          ],
          [
            "Alteración persistente del hábito intestinal",
            "Investigar colon"
          ],
          [
            "Pérdida de peso/anemia",
            "Enfermedad orgánica/neoplásica"
          ],
          [
            "Sangrado que no cesa con el tratamiento",
            "Colonoscopia obligatoria"
          ]
        ],
        "note": "Nunca atribuir el sangrado a hemorroides sin excluir neoplasia en pacientes de riesgo"
      }
    ],
    "conduta": {
      "exames": [
        "Diagnóstico esencialmente clínico (inspección + tacto + anoscopia)",
        "Colonoscopia si signos de alarma, edad >45-50 años o sangrado persistente",
        "Hemograma si sangrado crónico (anemia)",
        "RM de pelvis para mapeo de fístulas complejas"
      ],
      "drugs": [
        "Dieta rica en fibras + hidratación + baños de asiento tibios",
        "Laxantes/formadores de bolo fecal",
        "Analgésicos tópicos/sistémicos; pomadas (anestésico ± corticoide) por corto período",
        "Fisura: pomada de nitrato/bloqueador de canal de calcio para relajar el esfínter"
      ],
      "steps": [
        "1. Caracterizar la queja (dolor x sangrado) y examinar (inspección, tacto, anoscopia)",
        "2. Medidas higienodietéticas como base del tratamiento",
        "3. Hemorroides: tratamiento por grado (ligadura/cirugía)",
        "4. Absceso → drenaje quirúrgico; fístula → tratamiento quirúrgico",
        "5. Excluir neoplasia con colonoscopia en los casos de riesgo/alarma"
      ]
    }
  }
});
