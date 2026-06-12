// Motivo: diarreia — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("diarreia", {
  "name": "Diarreia",
  "nameEs": "Diarrea",
  "icon": "🚽",
  "color": "mc-accent",
  "rasHighlight": [
    "digest"
  ],
  "aeaGuide": [
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Agudo (<2 semanas)",
        "Crônico (>4 semanas)"
      ]
    },
    {
      "q": "Número de evacuações por dia e volume aproximado",
      "qEs": "Número de evacuaciones por día y volumen aproximado",
      "type": "input",
      "ph": "Nº/dia, volume",
      "ph2": "Nº/día, volumen"
    },
    {
      "q": "Características das fezes",
      "qEs": "Características de las heces",
      "type": "radio",
      "opts": [
        "Aquosa",
        "Pastosa",
        "Com muco",
        "Com sangue (enterorragia)",
        "Esteatorreica (gordurosa, fétida)"
      ]
    },
    {
      "q": "Presença de sangue ou muco nas fezes?",
      "qEs": "¿Presencia de sangre o moco en las heces?",
      "type": "yn"
    },
    {
      "q": "Dor abdominal ou cólicas associadas?",
      "qEs": "¿Dolor abdominal o cólicos asociados?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Náuseas / vômitos associados?",
      "qEs": "¿Náuseas / vómitos asociados?",
      "type": "yn"
    },
    {
      "q": "Tenesmo ou urgência evacuatória?",
      "qEs": "¿Tenesmo o urgencia evacuatoria?",
      "type": "yn"
    },
    {
      "q": "Relação com determinados alimentos (ex.: laticínios, glúten)?",
      "qEs": "¿Relación con ciertos alimentos (ej.: lácteos, gluten)?",
      "type": "yn"
    },
    {
      "q": "Sinais de desidratação?",
      "qEs": "¿Signos de deshidratación?",
      "type": "yn"
    },
    {
      "q": "Perda de peso associada (se crônica)?",
      "qEs": "¿Pérdida de peso asociada (si es crónica)?",
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
        "kw": "DIARREIA",
        "name": "Causas e mecanismos da diarreia",
        "rows": [
          [
            "D",
            "Disabsortiva",
            "Doença celíaca, insuficiência pancreática, supercrescimento bacteriano"
          ],
          [
            "I",
            "Infecciosa aguda",
            "Viral (rotavírus, norovírus), bacteriana (Salmonella, Shigella, E. coli), parasitária"
          ],
          [
            "A",
            "Alimentar/intolerâncias",
            "Intolerância à lactose, ingestão de laxantes/adoçantes (osmótica)"
          ],
          [
            "R",
            "Resposta inflamatória (DII)",
            "Doença de Crohn, retocolite ulcerativa — sangue, muco, dor abdominal"
          ],
          [
            "R²",
            "Redução de absorção (secretora)",
            "Toxinas bacterianas, tumores neuroendócrinos — diarreia aquosa volumosa, persiste em jejum"
          ],
          [
            "E",
            "Endócrina/medicamentosa",
            "Hipertireoidismo, diabetes (neuropatia autonômica), antibióticos, laxantes"
          ],
          [
            "I²",
            "Intestino irritável (funcional)",
            "Dor abdominal associada, alternância com constipação, sem sinais de alarme"
          ],
          [
            "A²",
            "AIDS/imunossupressão",
            "Infecções oportunistas em imunocomprometidos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação de sinais de desidratação",
        "subtitle": "Gravidade da diarreia aguda",
        "steps": [
          "Avaliar turgor cutâneo e mucosas",
          "Aferir PA e FC, pesquisar hipotensão postural",
          "Avaliar diurese e nível de consciência"
        ],
        "normal": "Mucosas úmidas, turgor normal, sinais vitais estáveis",
        "abnormal": "Sinais de desidratação moderada a grave → necessidade de reposição volêmica EV"
      },
      {
        "title": "Toque retal",
        "subtitle": "Avaliação de sangramento e massas (quando indicado)",
        "steps": [
          "Explicar o procedimento e obter consentimento",
          "Inspecionar região perianal",
          "Realizar toque digital avaliando tônus, presença de massas e sangue nas luvas"
        ],
        "normal": "Sem massas, sangue ou fezes endurecidas",
        "abnormal": "Sangue vivo/oculto, massa palpável, impactação fecal → investigar causa orgânica"
      },
      {
        "title": "Exame abdominal",
        "subtitle": "Identificar dor localizada, distensão ou massas",
        "steps": [
          "Inspeção, ausculta, percussão e palpação dos quadrantes",
          "Pesquisar dor à palpação, distensão e massas"
        ],
        "normal": "Abdome flácido, indolor, sem massas",
        "abnormal": "Dor localizada, massas palpáveis ou distensão → investigar causa orgânica/inflamatória"
      }
    ],
    "sinais": [
      {
        "name": "Sangue nas fezes (hematoquezia/melena)",
        "eponym": "Diarreia inflamatória/invasiva",
        "how": "Presença visível de sangue ou muco nas fezes",
        "means": "Sugere DII, infecção invasiva (Shigella, E. coli êntero-hemorrágica) ou neoplasia — investigar com urgência"
      },
      {
        "name": "Febre alta associada",
        "eponym": "Diarreia infecciosa invasiva",
        "how": "Temperatura >38,5°C acompanhando quadro diarreico",
        "means": "Sugere etiologia bacteriana invasiva — considerar coprocultura e possível antibioticoterapia"
      },
      {
        "name": "Sinais sistêmicos de toxemia",
        "eponym": "Quadro grave/complicado",
        "how": "Taquicardia, hipotensão, alteração do estado mental, oligúria",
        "means": "Sinaliza desidratação grave ou sepse de foco entérico — necessidade de internação e suporte intensivo"
      }
    ],
    "ddx": [
      [
        "Diarreia infecciosa aguda",
        "Início súbito, <2 semanas, possível febre, contactantes/viagens recentes, autolimitada",
        "Curso crônico (>4 semanas), perda de peso progressiva"
      ],
      [
        "Doença inflamatória intestinal (DII)",
        "Diarreia crônica com sangue/muco, dor abdominal, perda de peso, manifestações extraintestinais",
        "Episódio agudo autolimitado sem recorrência"
      ],
      [
        "Síndrome do intestino irritável",
        "Dor abdominal associada à alteração do hábito intestinal, alívio com evacuação, sem sinais de alarme, exames normais",
        "Presença de sangue, febre, perda de peso ou alterações laboratoriais (sinais de alarme)"
      ],
      [
        "Diarreia disabsortiva (doença celíaca, insuficiência pancreática)",
        "Esteatorreia, perda de peso, deficiências nutricionais, distensão abdominal pós-prandial",
        "Fezes de aspecto normal, sem sinais de má-absorção"
      ],
      [
        "Diarreia osmótica (intolerâncias/laxantes)",
        "Relação temporal com alimentos/medicamentos, melhora com jejum",
        "Diarreia que persiste mesmo em jejum (sugere secretora)"
      ]
    ],
    "escalas": [
      {
        "title": "Escala de Bristol (forma das fezes)",
        "headers": [
          "Tipo",
          "Descrição"
        ],
        "rows": [
          [
            "Tipo 1-2",
            "Fezes endurecidas/em pedaços — constipação"
          ],
          [
            "Tipo 3-4",
            "Fezes normais/bem formadas"
          ],
          [
            "Tipo 5",
            "Fezes pastosas com bordas definidas — tendência a diarreia"
          ],
          [
            "Tipo 6-7",
            "Fezes pastosas/líquidas sem forma — diarreia"
          ]
        ],
        "note": "Útil para padronizar a descrição do hábito intestinal e acompanhar evolução"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, eletrólitos e função renal (avaliar repercussão sistêmica)",
        "Coprocultura e parasitológico de fezes (diarreia persistente, sangue, febre alta, imunossuprimidos)",
        "Pesquisa de toxina de Clostridioides difficile (uso recente de antibióticos)",
        "Calprotectina fecal/marcadores inflamatórios (suspeita de DII)",
        "Colonoscopia/endoscopia conforme suspeita de causa orgânica crônica"
      ],
      "drugs": [
        "Hidratação oral (sais de reidratação) ou EV conforme gravidade",
        "Antitérmicos/analgésicos sintomáticos (Dipirona/Paracetamol)",
        "Loperamida com cautela (evitar se febre alta, sangue nas fezes ou suspeita de quadro invasivo)",
        "Antibioticoterapia dirigida apenas em casos selecionados: disenteria, imunossuprimidos, febre alta persistente, viagem a área de risco com quadro grave (ex.: Azitromicina ou Ciprofloxacino conforme suspeita)"
      ],
      "steps": [
        "1. Caracterizar a diarreia (aguda x crônica, aquosa x com sangue/muco)",
        "2. Avaliar gravidade da desidratação e sinais de alarme",
        "3. Hidratação adequada (oral ou EV)",
        "4. Solicitar exames conforme sinais de alarme ou cronicidade",
        "5. Reservar antibioticoterapia para casos selecionados (não usar empiricamente na maioria das diarreias agudas)",
        "6. Investigação adicional (endoscopia/colonoscopia) se quadro crônico ou sinais de DII"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas y mecanismos de la diarrea",
        "rows": [
          [
            "Malabsortiva",
            "Enfermedad celíaca, insuficiencia pancreática, sobrecrecimiento bacteriano"
          ],
          [
            "Infecciosa aguda",
            "Viral (rotavirus, norovirus), bacteriana (Salmonella, Shigella, E. coli), parasitaria"
          ],
          [
            "Alimentaria/intolerancias",
            "Intolerancia a la lactosa, ingesta de laxantes/edulcorantes (osmótica)"
          ],
          [
            "Respuesta inflamatoria (EII)",
            "Enfermedad de Crohn, colitis ulcerosa — sangre, moco, dolor abdominal"
          ],
          [
            "Reducción de absorción (secretora)",
            "Toxinas bacterianas, tumores neuroendocrinos — diarrea acuosa voluminosa, persiste en ayunas"
          ],
          [
            "Endocrina/medicamentosa",
            "Hipertiroidismo, diabetes (neuropatía autonómica), antibióticos, laxantes"
          ],
          [
            "Intestino irritable (funcional)",
            "Dolor abdominal asociado, alternancia con estreñimiento, sin signos de alarma"
          ],
          [
            "SIDA/inmunosupresión",
            "Infecciones oportunistas en inmunocomprometidos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Evaluación de signos de deshidratación",
        "subtitle": "Gravedad de la diarrea aguda",
        "steps": [
          "Evaluar turgencia cutánea y mucosas",
          "Medir PA y FC, buscar hipotensión postural",
          "Evaluar diuresis y nivel de conciencia"
        ],
        "normal": "Mucosas húmedas, turgencia normal, signos vitales estables",
        "abnormal": "Signos de deshidratación moderada a grave → necesidad de reposición volémica EV"
      },
      {
        "title": "Tacto rectal",
        "subtitle": "Evaluación de sangrado y masas (cuando esté indicado)",
        "steps": [
          "Explicar el procedimiento y obtener consentimiento",
          "Inspeccionar la región perianal",
          "Realizar tacto digital evaluando tono, presencia de masas y sangre en el guante"
        ],
        "normal": "Sin masas, sangre ni heces endurecidas",
        "abnormal": "Sangre fresca/oculta, masa palpable, impactación fecal → investigar causa orgánica"
      },
      {
        "title": "Examen abdominal",
        "subtitle": "Identificar dolor localizado, distensión o masas",
        "steps": [
          "Inspección, auscultación, percusión y palpación de los cuadrantes",
          "Buscar dolor a la palpación, distensión y masas"
        ],
        "normal": "Abdomen blando, indoloro, sin masas",
        "abnormal": "Dolor localizado, masas palpables o distensión → investigar causa orgánica/inflamatoria"
      }
    ],
    "sinais": [
      {
        "name": "Sangre en las heces (hematoquecia/melena)",
        "eponym": "Diarrea inflamatoria/invasiva",
        "how": "Presencia visible de sangre o moco en las heces",
        "means": "Sugiere EII, infección invasiva (Shigella, E. coli enterohemorrágica) o neoplasia — investigar con urgencia"
      },
      {
        "name": "Fiebre alta asociada",
        "eponym": "Diarrea infecciosa invasiva",
        "how": "Temperatura >38,5°C acompañando el cuadro diarreico",
        "means": "Sugiere etiología bacteriana invasiva — considerar coprocultivo y posible antibioticoterapia"
      },
      {
        "name": "Signos sistémicos de toxemia",
        "eponym": "Cuadro grave/complicado",
        "how": "Taquicardia, hipotensión, alteración del estado mental, oliguria",
        "means": "Señala deshidratación grave o sepsis de foco entérico — necesidad de internación y soporte intensivo"
      }
    ],
    "ddx": [
      [
        "Diarrea infecciosa aguda",
        "Inicio súbito, <2 semanas, posible fiebre, contactos/viajes recientes, autolimitada",
        "Curso crónico (>4 semanas), pérdida de peso progresiva"
      ],
      [
        "Enfermedad inflamatoria intestinal (EII)",
        "Diarrea crónica con sangre/moco, dolor abdominal, pérdida de peso, manifestaciones extraintestinales",
        "Episodio agudo autolimitado sin recurrencia"
      ],
      [
        "Síndrome de intestino irritable",
        "Dolor abdominal asociado al cambio del hábito intestinal, alivio con la defecación, sin signos de alarma, exámenes normales",
        "Presencia de sangre, fiebre, pérdida de peso o alteraciones de laboratorio (signos de alarma)"
      ],
      [
        "Diarrea malabsortiva (celíaca, insuficiencia pancreática)",
        "Esteatorrea, pérdida de peso, deficiencias nutricionales, distensión abdominal posprandial",
        "Heces de aspecto normal, sin signos de malabsorción"
      ],
      [
        "Diarrea osmótica (intolerancias/laxantes)",
        "Relación temporal con alimentos/medicamentos, mejora con el ayuno",
        "Diarrea que persiste incluso en ayunas (sugiere secretora)"
      ]
    ],
    "escalas": [
      {
        "title": "Escala de Bristol (forma de las heces)",
        "headers": [
          "Tipo",
          "Descripción"
        ],
        "rows": [
          [
            "Tipo 1-2",
            "Heces endurecidas/en trozos — estreñimiento"
          ],
          [
            "Tipo 3-4",
            "Heces normales/bien formadas"
          ],
          [
            "Tipo 5",
            "Heces pastosas con bordes definidos — tendencia a diarrea"
          ],
          [
            "Tipo 6-7",
            "Heces pastosas/líquidas sin forma — diarrea"
          ]
        ],
        "note": "Útil para estandarizar la descripción del hábito intestinal y seguir la evolución"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, electrolitos y función renal (evaluar repercusión sistémica)",
        "Coprocultivo y parasitológico de heces (diarrea persistente, sangre, fiebre alta, inmunosuprimidos)",
        "Búsqueda de toxina de Clostridioides difficile (uso reciente de antibióticos)",
        "Calprotectina fecal/marcadores inflamatorios (sospecha de EII)",
        "Colonoscopia/endoscopia según sospecha de causa orgánica crónica"
      ],
      "drugs": [
        "Hidratación oral (sales de rehidratación) o EV según gravedad",
        "Antitérmicos/analgésicos sintomáticos (Dipirona/Paracetamol)",
        "Loperamida con cautela (evitar si fiebre alta, sangre en las heces o sospecha de cuadro invasivo)",
        "Antibioticoterapia dirigida solo en casos seleccionados: disentería, inmunosuprimidos, fiebre alta persistente, viaje a área de riesgo con cuadro grave (ej.: Azitromicina o Ciprofloxacino según sospecha)"
      ],
      "steps": [
        "1. Caracterizar la diarrea (aguda x crónica, acuosa x con sangre/moco)",
        "2. Evaluar gravedad de la deshidratación y signos de alarma",
        "3. Hidratación adecuada (oral o EV)",
        "4. Solicitar exámenes según signos de alarma o cronicidad",
        "5. Reservar la antibioticoterapia para casos seleccionados (no usar empíricamente en la mayoría de las diarreas agudas)",
        "6. Investigación adicional (endoscopia/colonoscopia) si cuadro crónico o signos de EII"
      ]
    }
  }
});
