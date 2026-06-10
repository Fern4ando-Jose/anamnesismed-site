// Motivo: sintomas-urinarios — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("sintomas-urinarios", {
  "name": "Disúria / Sintomas Urinários",
  "nameEs": "Disuria / Síntomas Urinarios",
  "icon": "🚻",
  "color": "mc-secondary",
  "rasHighlight": [
    "genito"
  ],
  "aeaGuide": [
    {
      "q": "Disúria (dor/ardor ao urinar)?",
      "qEs": "¿Disuria (dolor/ardor al orinar)?",
      "type": "yn"
    },
    {
      "q": "Polaciúria (aumento da frequência urinária)?",
      "qEs": "¿Polaquiuria (aumento de la frecuencia urinaria)?",
      "type": "yn"
    },
    {
      "q": "Urgência miccional ou tenesmo vesical?",
      "qEs": "¿Urgencia miccional o tenesmo vesical?",
      "type": "yn"
    },
    {
      "q": "Hematúria (sangue na urina)? Início ou final da micção?",
      "qEs": "¿Hematuria (sangre en la orina)? ¿Al inicio o al final de la micción?",
      "type": "yn"
    },
    {
      "q": "Características da urina (cor, odor, presença de espuma)",
      "qEs": "Características de la orina (color, olor, presencia de espuma)",
      "type": "input",
      "ph": "Descreva as características",
      "ph2": "Describa las características"
    },
    {
      "q": "Dor lombar ou em flanco associada (cólica renal)?",
      "qEs": "¿Dolor lumbar o en flanco asociado (cólico renal)?",
      "type": "yn"
    },
    {
      "q": "Febre ou calafrios associados?",
      "qEs": "¿Fiebre o escalofríos asociados?",
      "type": "yn"
    },
    {
      "q": "Secreção uretral ou vaginal associada?",
      "qEs": "¿Secreción uretral o vaginal asociada?",
      "type": "yn"
    },
    {
      "q": "Dificuldade para iniciar ou interromper o jato urinário, jato fraco (sintomas obstrutivos)?",
      "qEs": "¿Dificultad para iniciar o detener el chorro urinario, chorro débil (síntomas obstructivos)?",
      "type": "yn"
    },
    {
      "q": "Nictúria (quantas vezes urina à noite)?",
      "qEs": "¿Nicturia (cuántas veces orina por la noche)?",
      "type": "input",
      "ph": "Nº de vezes",
      "ph2": "Nº de veces"
    },
    {
      "q": "Hábitos sexuais e história de infecções sexualmente transmissíveis?",
      "qEs": "¿Hábitos sexuales e historia de infecciones de transmisión sexual?",
      "type": "yn"
    },
    {
      "q": "Episódios prévios semelhantes (infecções urinárias de repetição, cálculos)?",
      "qEs": "¿Episodios previos similares (infecciones urinarias de repetición, cálculos)?",
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
        "kw": "URINA",
        "name": "Causas de disúria/sintomas urinários",
        "rows": [
          [
            "U",
            "Uretrite/DST",
            "Corrimento uretral, relação sexual de risco, disúria, Chlamydia/Gonococo"
          ],
          [
            "R",
            "Renal/litíase",
            "Cólica nefrética, dor lombar irradiada para a virilha, hematúria"
          ],
          [
            "I",
            "Infecção baixa (cistite)",
            "Disúria, polaciúria, urgência miccional, dor suprapúbica, sem febre alta"
          ],
          [
            "N",
            "Nefrite/pielonefrite (ITU alta)",
            "Febre alta, calafrios, dor lombar, Giordano positivo, comprometimento sistêmico"
          ],
          [
            "A",
            "Adenoma/prostatite",
            "Homens — jato urinário fraco, dor perineal, retenção, toque retal alterado"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Giordano (punho-percussão lombar)",
        "subtitle": "Suspeita de pielonefrite",
        "steps": [
          "Posicionar o paciente sentado ou em pé",
          "Percutir suavemente a região lombar (ângulo costovertebral) com a borda da mão fechada",
          "Comparar os dois lados"
        ],
        "normal": "Sem dor à percussão",
        "abnormal": "Dor importante à percussão lombar (Giordano+) → sugere pielonefrite ou litíase renal"
      },
      {
        "title": "Exame de genitália externa",
        "subtitle": "Investigação de uretrite/DST",
        "steps": [
          "Inspecionar meato uretral, presença de corrimento, lesões ou hiperemia",
          "Palpar testículos e epidídimo nos homens; avaliar região vulvovaginal nas mulheres"
        ],
        "normal": "Sem corrimento, lesões ou dor à palpação",
        "abnormal": "Corrimento uretral, lesões ulceradas ou dor testicular → investigar DST/epididimite"
      },
      {
        "title": "Toque retal (avaliação prostática)",
        "subtitle": "Suspeita de prostatite/hiperplasia prostática",
        "steps": [
          "Explicar o procedimento e posicionar o paciente adequadamente",
          "Realizar toque retal avaliando tamanho, consistência, simetria e dor da próstata"
        ],
        "normal": "Próstata de tamanho normal, lisa, indolor, sem nódulos",
        "abnormal": "Próstata aumentada, dolorosa e amolecida (prostatite aguda) ou endurecida/nodular (suspeita neoplásica)"
      }
    ],
    "sinais": [
      {
        "name": "Febre alta + dor lombar",
        "eponym": "Pielonefrite aguda",
        "how": "Febre >38,5°C associada a dor lombar unilateral e Giordano positivo",
        "means": "Sugere infecção do trato urinário alto — necessidade de tratamento sistêmico e possível internação"
      },
      {
        "name": "Hematúria macroscópica",
        "eponym": "Sinal de alarme urológico",
        "how": "Urina com coloração avermelhada/acastanhada visível a olho nu",
        "means": "Pode indicar litíase, infecção complicada, neoplasia urotelial ou glomerulopatia — investigação obrigatória"
      },
      {
        "name": "Retenção urinária aguda",
        "eponym": "Emergência urológica",
        "how": "Incapacidade súbita de urinar com bexiga distendida e dor suprapúbica",
        "means": "Requer alívio imediato (sondagem vesical) e investigação da causa (HPB, prostatite, obstrução)"
      }
    ],
    "ddx": [
      [
        "Cistite (ITU baixa)",
        "Disúria, polaciúria, urgência, dor suprapúbica, sem febre ou dor lombar",
        "Febre alta, dor lombar, comprometimento do estado geral"
      ],
      [
        "Pielonefrite (ITU alta)",
        "Febre alta, calafrios, dor lombar, Giordano+, náuseas/vômitos, comprometimento sistêmico",
        "Sintomas restritos ao trato urinário baixo, sem febre"
      ],
      [
        "Uretrite/DST",
        "Corrimento uretral, relação sexual de risco, parceiro sintomático, disúria predominante no início da micção",
        "Ausência de exposição sexual de risco, sem corrimento"
      ],
      [
        "Litíase urinária",
        "Dor lombar tipo cólica irradiando para a virilha, hematúria, agitação, náuseas",
        "Dor contínua, ausência de hematúria, exame de imagem sem cálculo"
      ],
      [
        "Prostatite",
        "Homem, dor perineal/suprapúbica, sintomas miccionais, próstata dolorosa ao toque, possível febre",
        "Mulher, ou toque retal normal"
      ]
    ],
    "escalas": [
      {
        "title": "Critérios para diferenciação ITU baixa x alta",
        "headers": [
          "Achado",
          "ITU baixa (cistite)",
          "ITU alta (pielonefrite)"
        ],
        "rows": [
          [
            "Febre",
            "Ausente/baixa",
            "Alta (>38,5°C)"
          ],
          [
            "Dor lombar/Giordano",
            "Ausente",
            "Presente"
          ],
          [
            "Estado geral",
            "Preservado",
            "Comprometido (calafrios, náuseas)"
          ],
          [
            "Conduta inicial",
            "Tratamento ambulatorial via oral",
            "Considerar internação/ATB parenteral conforme gravidade"
          ]
        ],
        "note": "Diferenciação fundamental para definir via de administração do antibiótico e necessidade de internação"
      }
    ],
    "conduta": {
      "exames": [
        "Urina rotina (EAS) com sedimento",
        "Urocultura com antibiograma",
        "Hemograma + PCR (suspeita de pielonefrite)",
        "Função renal (ureia/creatinina)",
        "USG de vias urinárias (litíase, complicações)",
        "Pesquisa de DST (Chlamydia/Gonococo) se suspeita de uretrite"
      ],
      "drugs": [
        "Cistite não complicada: Nitrofurantoína 100mg 12/12h por 5 dias ou Fosfomicina dose única, ou Sulfametoxazol-trimetoprima conforme sensibilidade local",
        "Pielonefrite: Ciprofloxacino ou Ceftriaxona conforme gravidade — considerar internação e ATB EV em casos graves",
        "Uretrite/DST: Ceftriaxona + Azitromicina (cobertura para gonococo e clamídia)",
        "Analgesia/antiespasmódicos para cólica renal (ex.: Dipirona + Buscopan), AINEs se sem contraindicação"
      ],
      "steps": [
        "1. Caracterizar os sintomas (disúria isolada x febre/dor lombar x corrimento)",
        "2. Exame físico dirigido (Giordano, genitália, toque retal se indicado)",
        "3. Solicitar EAS + urocultura antes de iniciar antibiótico quando possível",
        "4. Diferenciar ITU baixa (tratamento ambulatorial) de ITU alta (considerar internação)",
        "5. Tratar empiricamente conforme apresentação e ajustar pelo antibiograma",
        "6. Investigar causas estruturais (litíase, HPB) se quadros recorrentes ou complicados"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de disuria/síntomas urinarios",
        "rows": [
          [
            "Uretritis/ITS",
            "Secreción uretral, relación sexual de riesgo, disuria, Chlamydia/Gonococo"
          ],
          [
            "Renal/litiasis",
            "Cólico nefrítico, dolor lumbar irradiado a la ingle, hematuria"
          ],
          [
            "Infección baja (cistitis)",
            "Disuria, polaquiuria, urgencia miccional, dolor suprapúbico, sin fiebre alta"
          ],
          [
            "Nefritis/pielonefritis (ITU alta)",
            "Fiebre alta, escalofríos, dolor lumbar, Giordano positivo, compromiso sistémico"
          ],
          [
            "Adenoma/prostatitis",
            "Hombres — chorro urinario débil, dolor perineal, retención, tacto rectal alterado"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Giordano (puñopercusión lumbar)",
        "subtitle": "Sospecha de pielonefritis",
        "steps": [
          "Colocar al paciente sentado o de pie",
          "Percutir suavemente la región lumbar (ángulo costovertebral) con el borde de la mano cerrada",
          "Comparar ambos lados"
        ],
        "normal": "Sin dolor a la percusión",
        "abnormal": "Dolor importante a la percusión lumbar (Giordano+) → sugiere pielonefritis o litiasis renal"
      },
      {
        "title": "Examen de genitales externos",
        "subtitle": "Investigación de uretritis/ITS",
        "steps": [
          "Inspeccionar meato uretral, presencia de secreción, lesiones o hiperemia",
          "Palpar testículos y epidídimo en hombres; evaluar región vulvovaginal en mujeres"
        ],
        "normal": "Sin secreción, lesiones ni dolor a la palpación",
        "abnormal": "Secreción uretral, lesiones ulceradas o dolor testicular → investigar ITS/epididimitis"
      },
      {
        "title": "Tacto rectal (evaluación prostática)",
        "subtitle": "Sospecha de prostatitis/hiperplasia prostática",
        "steps": [
          "Explicar el procedimiento y colocar al paciente adecuadamente",
          "Realizar tacto rectal evaluando tamaño, consistencia, simetría y dolor de la próstata"
        ],
        "normal": "Próstata de tamaño normal, lisa, indolora, sin nódulos",
        "abnormal": "Próstata aumentada, dolorosa y blanda (prostatitis aguda) o endurecida/nodular (sospecha neoplásica)"
      }
    ],
    "sinais": [
      {
        "name": "Fiebre alta + dolor lumbar",
        "eponym": "Pielonefritis aguda",
        "how": "Fiebre >38,5°C asociada a dolor lumbar unilateral y Giordano positivo",
        "means": "Sugiere infección del tracto urinario alto — necesidad de tratamiento sistémico y posible internación"
      },
      {
        "name": "Hematuria macroscópica",
        "eponym": "Signo de alarma urológico",
        "how": "Orina con coloración rojiza/parduzca visible a simple vista",
        "means": "Puede indicar litiasis, infección complicada, neoplasia urotelial o glomerulopatía — investigación obligatoria"
      },
      {
        "name": "Retención urinaria aguda",
        "eponym": "Emergencia urológica",
        "how": "Incapacidad súbita de orinar con vejiga distendida y dolor suprapúbico",
        "means": "Requiere alivio inmediato (sondaje vesical) e investigación de la causa (HPB, prostatitis, obstrucción)"
      }
    ],
    "ddx": [
      [
        "Cistitis (ITU baja)",
        "Disuria, polaquiuria, urgencia, dolor suprapúbico, sin fiebre ni dolor lumbar",
        "Fiebre alta, dolor lumbar, compromiso del estado general"
      ],
      [
        "Pielonefritis (ITU alta)",
        "Fiebre alta, escalofríos, dolor lumbar, Giordano+, náuseas/vómitos, compromiso sistémico",
        "Síntomas restringidos al tracto urinario bajo, sin fiebre"
      ],
      [
        "Uretritis/ITS",
        "Secreción uretral, relación sexual de riesgo, pareja sintomática, disuria predominante al inicio de la micción",
        "Ausencia de exposición sexual de riesgo, sin secreción"
      ],
      [
        "Litiasis urinaria",
        "Dolor lumbar tipo cólico irradiando a la ingle, hematuria, agitación, náuseas",
        "Dolor continuo, ausencia de hematuria, imagen sin cálculo"
      ],
      [
        "Prostatitis",
        "Hombre, dolor perineal/suprapúbico, síntomas miccionales, próstata dolorosa al tacto, posible fiebre",
        "Mujer, o tacto rectal normal"
      ]
    ],
    "escalas": [
      {
        "title": "Criterios para diferenciar ITU baja x alta",
        "headers": [
          "Hallazgo",
          "ITU baja (cistitis)",
          "ITU alta (pielonefritis)"
        ],
        "rows": [
          [
            "Fiebre",
            "Ausente/baja",
            "Alta (>38,5°C)"
          ],
          [
            "Dolor lumbar/Giordano",
            "Ausente",
            "Presente"
          ],
          [
            "Estado general",
            "Preservado",
            "Comprometido (escalofríos, náuseas)"
          ],
          [
            "Conducta inicial",
            "Tratamiento ambulatorio vía oral",
            "Considerar internación/ATB parenteral según gravedad"
          ]
        ],
        "note": "Diferenciación fundamental para definir la vía de administración del antibiótico y la necesidad de internación"
      }
    ],
    "conduta": {
      "exames": [
        "Orina rutina (sedimento)",
        "Urocultivo con antibiograma",
        "Hemograma + PCR (sospecha de pielonefritis)",
        "Función renal (urea/creatinina)",
        "USG de vías urinarias (litiasis, complicaciones)",
        "Búsqueda de ITS (Chlamydia/Gonococo) si sospecha de uretritis"
      ],
      "drugs": [
        "Cistitis no complicada: Nitrofurantoína 100mg c/12h por 5 días o Fosfomicina dosis única, o Sulfametoxazol-trimetoprima según sensibilidad local",
        "Pielonefritis: Ciprofloxacino o Ceftriaxona según gravedad — considerar internación y ATB EV en casos graves",
        "Uretritis/ITS: Ceftriaxona + Azitromicina (cobertura para gonococo y clamidia)",
        "Analgesia/antiespasmódicos para cólico renal (ej.: Dipirona + Butilescopolamina), AINEs si no hay contraindicación"
      ],
      "steps": [
        "1. Caracterizar los síntomas (disuria aislada x fiebre/dolor lumbar x secreción)",
        "2. Examen físico dirigido (Giordano, genitales, tacto rectal si está indicado)",
        "3. Solicitar sedimento + urocultivo antes de iniciar el antibiótico cuando sea posible",
        "4. Diferenciar ITU baja (tratamiento ambulatorio) de ITU alta (considerar internación)",
        "5. Tratar empíricamente según la presentación y ajustar por el antibiograma",
        "6. Investigar causas estructurales (litiasis, HPB) si cuadros recurrentes o complicados"
      ]
    }
  }
});
