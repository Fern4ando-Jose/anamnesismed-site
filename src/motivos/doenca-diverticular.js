// Motivo: doenca-diverticular — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("doenca-diverticular", {
  "name": "Doença Diverticular / Diverticulite",
  "nameEs": "Enfermedad Diverticular / Diverticulitis",
  "icon": "🫧",
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
        "Fossa ilíaca esquerda (FIE) — clássico",
        "Hipogástrio",
        "Difusa / periumbilical",
        "Fossa ilíaca direita"
      ],
      "optsEs": [
        "Fosa ilíaca izquierda (FII) — clásico",
        "Hipogastrio",
        "Difusa / periumbilical",
        "Fosa ilíaca derecha"
      ]
    },
    {
      "q": "Início e evolução",
      "qEs": "Inicio y evolución",
      "type": "radio",
      "opts": [
        "Gradual, piora em horas a dias",
        "Súbito e intenso desde o início"
      ],
      "optsEs": [
        "Gradual, empeora en horas a días",
        "Súbito e intenso desde el inicio"
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
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Alteração do hábito intestinal — diarreia ou constipação?",
      "qEs": "¿Alteración del hábito intestinal — diarrea o estreñimiento?",
      "type": "yn"
    },
    {
      "q": "Sangue nas fezes?",
      "qEs": "¿Sangre en las heces?",
      "type": "yn"
    },
    {
      "q": "Náuseas / vômitos?",
      "qEs": "¿Náuseas / vómitos?",
      "type": "yn"
    },
    {
      "q": "Distensão abdominal?",
      "qEs": "¿Distensión abdominal?",
      "type": "yn"
    },
    {
      "q": "Diagnóstico prévio de diverticulose ou episódios anteriores de diverticulite?",
      "qEs": "¿Diagnóstico previo de diverticulosis o episodios anteriores de diverticulitis?",
      "type": "yn"
    },
    {
      "q": "Sinal de complicação — peritonite difusa, massa palpável em FIE (abscesso), saída de gás ou fezes pela urina / vagina (fístula)?",
      "qEs": "¿Signo de complicación — peritonitis difusa, masa palpable en FII (absceso), salida de gas o heces por la orina / vagina (fístula)?",
      "type": "yn"
    },
    {
      "q": "Dieta pobre em fibras?",
      "qEs": "¿Dieta pobre en fibra?",
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
        "kw": "HINCHEY",
        "name": "Classificação da diverticulite complicada",
        "rows": [
          [
            "I",
            "Estágio I",
            "Abscesso pericólico/mesentérico localizado"
          ],
          [
            "II",
            "Estágio II",
            "Abscesso pélvico/à distância"
          ],
          [
            "III",
            "Estágio III",
            "Peritonite purulenta generalizada"
          ],
          [
            "IV",
            "Estágio IV",
            "Peritonite fecal (perfuração livre)"
          ]
        ]
      },
      {
        "kw": "LOCALIZAÇÃO",
        "name": "Características da diverticulite",
        "rows": [
          [
            "S",
            "Sigmoide",
            "Localização mais comum (dor em FIE)"
          ],
          [
            "F",
            "Febre",
            "Sinal inflamatório frequente"
          ],
          [
            "L",
            "Leucocitose",
            "Resposta inflamatória"
          ],
          [
            "A",
            "Alteração do hábito",
            "Constipação/diarreia, alteração do trânsito"
          ],
          [
            "C",
            "Complicações",
            "Abscesso, fístula, obstrução, perfuração"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Palpação da fossa ilíaca esquerda",
        "subtitle": "Diverticulite de sigmoide",
        "steps": [
          "Palpar a FIE",
          "Avaliar dor, massa e defesa"
        ],
        "normal": "Sem dor ou massa",
        "abnormal": "Dor + massa/plastrão em FIE → \"apendicite do lado esquerdo\" (diverticulite)"
      },
      {
        "title": "Pesquisa de irritação peritoneal",
        "subtitle": "Complicação",
        "steps": [
          "Avaliar descompressão dolorosa e defesa",
          "Pesquisar rigidez de parede"
        ],
        "normal": "Abdome depressível, sem peritonismo",
        "abnormal": "Peritonismo difuso → perfuração/peritonite (Hinchey III-IV)"
      },
      {
        "title": "Toque retal",
        "subtitle": "Massa/coleção pélvica",
        "steps": [
          "Realizar toque retal",
          "Avaliar dor, abaulamento e sangue"
        ],
        "normal": "Sem abaulamento doloroso",
        "abnormal": "Abaulamento doloroso → abscesso pélvico"
      }
    ],
    "sinais": [
      {
        "name": "Dor em FIE + febre",
        "eponym": "Diverticulite aguda",
        "how": "Dor persistente na fossa ilíaca esquerda com febre",
        "means": "Apresentação clássica da diverticulite de sigmoide"
      },
      {
        "name": "Plastrão/massa palpável",
        "eponym": "Diverticulite complicada",
        "how": "Massa inflamatória em FIE",
        "means": "Fleimão/abscesso pericólico"
      },
      {
        "name": "Pneumatúria/fecalúria",
        "eponym": "Fístula colovesical",
        "how": "Eliminação de gás/fezes pela urina",
        "means": "Fístula entre cólon e bexiga — complicação tardia"
      },
      {
        "name": "Peritonite generalizada",
        "eponym": "Perfuração (Hinchey III-IV)",
        "how": "Abdome em tábua, sepse",
        "means": "Perfuração livre — cirurgia de urgência"
      }
    ],
    "ddx": [
      [
        "Diverticulite aguda",
        "Dor em FIE, febre, leucocitose, TC com espessamento + densificação",
        "Dor em FID, sem alteração diverticular"
      ],
      [
        "Apendicite",
        "Dor migratória para FID, Blumberg +",
        "Dor em FIE no idoso com divertículos"
      ],
      [
        "Câncer colorretal",
        "Perda de peso, anemia, alteração do hábito, massa",
        "Quadro inflamatório agudo febril"
      ],
      [
        "Colite isquêmica",
        "Dor + sangramento, idoso vasculopata",
        "Febre e plastrão localizado"
      ],
      [
        "Cólica renal/ureteral esquerda",
        "Dor lombar irradiada para virilha, hematúria",
        "Febre, dor à palpação abdominal localizada"
      ],
      [
        "Doença inflamatória intestinal",
        "Diarreia crônica com sangue, sintomas sistêmicos",
        "Episódio agudo isolado em FIE"
      ],
      [
        "Patologia anexial (mulher)",
        "Dor pélvica, alteração menstrual, massa anexial",
        "Dor cólica com divertículos à TC"
      ]
    ],
    "escalas": [
      {
        "title": "Hinchey modificado",
        "headers": [
          "Estágio",
          "Achado",
          "Conduta usual"
        ],
        "rows": [
          [
            "0/Ia",
            "Diverticulite não complicada",
            "ATB ± manejo ambulatorial"
          ],
          [
            "Ib/II",
            "Abscesso",
            "ATB + drenagem percutânea se >4 cm"
          ],
          [
            "III",
            "Peritonite purulenta",
            "Cirurgia"
          ],
          [
            "IV",
            "Peritonite fecal",
            "Cirurgia de urgência (Hartmann)"
          ]
        ],
        "note": "A classificação orienta diretamente a conduta"
      },
      {
        "title": "Não complicada x Complicada",
        "headers": [
          "Característica",
          "Não complicada",
          "Complicada"
        ],
        "rows": [
          [
            "Abscesso/fístula/perfuração",
            "Ausente",
            "Presente"
          ],
          [
            "Peritonite",
            "Ausente",
            "Pode haver"
          ],
          [
            "Tratamento",
            "ATB (às vezes sem ATB em casos leves)",
            "Drenagem/cirurgia"
          ],
          [
            "Internação",
            "Seletiva",
            "Frequente"
          ]
        ],
        "note": "TC de abdome define a presença de complicações"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, PCR",
        "Função renal, eletrólitos",
        "Urina (diferencial urológico) e beta-hCG em mulheres",
        "TC de abdome e pelve com contraste (exame de escolha)",
        "Colonoscopia ELETIVA após 6 semanas (excluir neoplasia) — evitar na fase aguda"
      ],
      "drugs": [
        "Não complicada: dieta + analgesia; ATB seletivo (amoxicilina-clavulanato ou ciprofloxacino + metronidazol)",
        "Complicada: ATB EV de amplo espectro",
        "Drenagem percutânea de abscessos >4 cm",
        "Analgesia (evitar opioides que reduzem motilidade, quando possível)"
      ],
      "steps": [
        "1. Confirmar com TC e classificar (Hinchey)",
        "2. Não complicada → manejo conservador (ambulatorial em casos leves selecionados)",
        "3. Abscesso → ATB + drenagem percutânea",
        "4. Peritonite (III-IV) → cirurgia de urgência",
        "5. Colonoscopia eletiva após resolução para excluir neoplasia"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Clasificación de la diverticulitis complicada",
        "rows": [
          [
            "Estadio I",
            "Absceso pericólico/mesentérico localizado"
          ],
          [
            "Estadio II",
            "Absceso pélvico/a distancia"
          ],
          [
            "Estadio III",
            "Peritonitis purulenta generalizada"
          ],
          [
            "Estadio IV",
            "Peritonitis fecal (perforación libre)"
          ]
        ]
      },
      {
        "name": "Características de la diverticulitis",
        "rows": [
          [
            "Sigmoide",
            "Localización más común (dolor en FII)"
          ],
          [
            "Fiebre",
            "Signo inflamatorio frecuente"
          ],
          [
            "Leucocitosis",
            "Respuesta inflamatoria"
          ],
          [
            "Alteración del hábito",
            "Estreñimiento/diarrea, alteración del tránsito"
          ],
          [
            "Complicaciones",
            "Absceso, fístula, obstrucción, perforación"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Palpación de la fosa ilíaca izquierda",
        "subtitle": "Diverticulitis de sigmoide",
        "steps": [
          "Palpar la FII",
          "Evaluar dolor, masa y defensa"
        ],
        "normal": "Sin dolor ni masa",
        "abnormal": "Dolor + masa/plastrón en FII → \"apendicitis del lado izquierdo\" (diverticulitis)"
      },
      {
        "title": "Búsqueda de irritación peritoneal",
        "subtitle": "Complicación",
        "steps": [
          "Evaluar descompresión dolorosa y defensa",
          "Buscar rigidez de pared"
        ],
        "normal": "Abdomen depresible, sin peritonismo",
        "abnormal": "Peritonismo difuso → perforación/peritonitis (Hinchey III-IV)"
      },
      {
        "title": "Tacto rectal",
        "subtitle": "Masa/colección pélvica",
        "steps": [
          "Realizar tacto rectal",
          "Evaluar dolor, abombamiento y sangre"
        ],
        "normal": "Sin abombamiento doloroso",
        "abnormal": "Abombamiento doloroso → absceso pélvico"
      }
    ],
    "sinais": [
      {
        "name": "Dolor en FII + fiebre",
        "eponym": "Diverticulitis aguda",
        "how": "Dolor persistente en la fosa ilíaca izquierda con fiebre",
        "means": "Presentación clásica de la diverticulitis de sigmoide"
      },
      {
        "name": "Plastrón/masa palpable",
        "eponym": "Diverticulitis complicada",
        "how": "Masa inflamatoria en FII",
        "means": "Flemón/absceso pericólico"
      },
      {
        "name": "Neumaturia/fecaluria",
        "eponym": "Fístula colovesical",
        "how": "Eliminación de gas/heces por la orina",
        "means": "Fístula entre el colon y la vejiga — complicación tardía"
      },
      {
        "name": "Peritonitis generalizada",
        "eponym": "Perforación (Hinchey III-IV)",
        "how": "Abdomen en tabla, sepsis",
        "means": "Perforación libre — cirugía de urgencia"
      }
    ],
    "ddx": [
      [
        "Diverticulitis aguda",
        "Dolor en FII, fiebre, leucocitosis, TC con engrosamiento + densificación",
        "Dolor en FID, sin alteración diverticular"
      ],
      [
        "Apendicitis",
        "Dolor migratorio a FID, Blumberg +",
        "Dolor en FII en el anciano con divertículos"
      ],
      [
        "Cáncer colorrectal",
        "Pérdida de peso, anemia, cambio del hábito, masa",
        "Cuadro inflamatorio agudo febril"
      ],
      [
        "Colitis isquémica",
        "Dolor + sangrado, anciano vasculópata",
        "Fiebre y plastrón localizado"
      ],
      [
        "Cólico renal/ureteral izquierdo",
        "Dolor lumbar irradiado a la ingle, hematuria",
        "Fiebre, dolor a la palpación abdominal localizada"
      ],
      [
        "Enfermedad inflamatoria intestinal",
        "Diarrea crónica con sangre, síntomas sistémicos",
        "Episodio agudo aislado en FII"
      ],
      [
        "Patología anexial (mujer)",
        "Dolor pélvico, alteración menstrual, masa anexial",
        "Dolor cólico con divertículos en la TC"
      ]
    ],
    "escalas": [
      {
        "title": "Hinchey modificado",
        "headers": [
          "Estadio",
          "Hallazgo",
          "Conducta habitual"
        ],
        "rows": [
          [
            "0/Ia",
            "Diverticulitis no complicada",
            "ATB ± manejo ambulatorio"
          ],
          [
            "Ib/II",
            "Absceso",
            "ATB + drenaje percutáneo si >4 cm"
          ],
          [
            "III",
            "Peritonitis purulenta",
            "Cirugía"
          ],
          [
            "IV",
            "Peritonitis fecal",
            "Cirugía de urgencia (Hartmann)"
          ]
        ],
        "note": "La clasificación orienta directamente la conducta"
      },
      {
        "title": "No complicada x Complicada",
        "headers": [
          "Característica",
          "No complicada",
          "Complicada"
        ],
        "rows": [
          [
            "Absceso/fístula/perforación",
            "Ausente",
            "Presente"
          ],
          [
            "Peritonitis",
            "Ausente",
            "Puede haber"
          ],
          [
            "Tratamiento",
            "ATB (a veces sin ATB en casos leves)",
            "Drenaje/cirugía"
          ],
          [
            "Internación",
            "Selectiva",
            "Frecuente"
          ]
        ],
        "note": "La TC de abdomen define la presencia de complicaciones"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, PCR",
        "Función renal, electrolitos",
        "Orina (diferencial urológico) y beta-hCG en mujeres",
        "TC de abdomen y pelvis con contraste (examen de elección)",
        "Colonoscopia ELECTIVA tras 6 semanas (excluir neoplasia) — evitar en la fase aguda"
      ],
      "drugs": [
        "No complicada: dieta + analgesia; ATB selectivo (amoxicilina-clavulanato o ciprofloxacino + metronidazol)",
        "Complicada: ATB EV de amplio espectro",
        "Drenaje percutáneo de abscesos >4 cm",
        "Analgesia (evitar opioides que reducen la motilidad, cuando sea posible)"
      ],
      "steps": [
        "1. Confirmar con TC y clasificar (Hinchey)",
        "2. No complicada → manejo conservador (ambulatorio en casos leves seleccionados)",
        "3. Absceso → ATB + drenaje percutáneo",
        "4. Peritonitis (III-IV) → cirugía de urgencia",
        "5. Colonoscopia electiva tras la resolución para excluir neoplasia"
      ]
    }
  }
});
