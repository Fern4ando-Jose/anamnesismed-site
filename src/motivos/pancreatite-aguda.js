// Motivo: pancreatite-aguda — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("pancreatite-aguda", {
  "name": "Pancreatite Aguda",
  "nameEs": "Pancreatitis Aguda",
  "icon": "🔥",
  "color": "mc-danger",
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
        "Epigástrio",
        "Periumbilical",
        "Difusa",
        "Hipocôndrio direito"
      ],
      "optsEs": [
        "Epigastrio",
        "Periumbilical",
        "Difusa",
        "Hipocondrio derecho"
      ]
    },
    {
      "q": "Irradiação",
      "qEs": "Irradiación",
      "type": "radio",
      "opts": [
        "Em faixa para o dorso / interescapular (clássico)",
        "Para o ombro esquerdo",
        "Sem irradiação"
      ],
      "optsEs": [
        "En faja hacia el dorso / interescapular (clásico)",
        "Hacia el hombro izquierdo",
        "Sin irradiación"
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
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Súbito após refeição abundante ou ingestão de álcool",
        "Gradual / insidioso"
      ],
      "optsEs": [
        "Súbito después de comida abundante o ingesta de alcohol",
        "Gradual / insidioso"
      ]
    },
    {
      "q": "Posição que alivia",
      "qEs": "Posición que alivia",
      "type": "radio",
      "opts": [
        "Sentado inclinado para frente — posição em gatilho (clássico)",
        "Decúbito lateral / posição fetal",
        "Nenhuma posição alivia"
      ],
      "optsEs": [
        "Sentado inclinado hacia adelante — posición en gatillo (clásico)",
        "Decúbito lateral / posición fetal",
        "Ninguna posición alivia"
      ]
    },
    {
      "q": "Náuseas / vômitos? O vômito alivia a dor?",
      "qEs": "¿Náuseas / vómitos? ¿El vómito alivia el dolor?",
      "type": "radio",
      "opts": [
        "Sim — vômitos que aliviam a dor",
        "Sim — vômitos que não aliviam a dor",
        "Sem náuseas ou vômitos"
      ],
      "optsEs": [
        "Sí — vómitos que alivian el dolor",
        "Sí — vómitos que no alivian el dolor",
        "Sin náuseas ni vómitos"
      ]
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Distensão abdominal?",
      "qEs": "¿Distensión abdominal?",
      "type": "yn"
    },
    {
      "q": "Parada de eliminação de fezes e gases?",
      "qEs": "¿Parada de eliminación de heces y gases?",
      "type": "yn"
    },
    {
      "q": "Icterícia?",
      "qEs": "¿Ictericia?",
      "type": "yn"
    },
    {
      "q": "Equimose periumbilical (sinal de Cullen) ou nos flancos (sinal de Grey-Turner) — sinais de alarme?",
      "qEs": "¿Equimosis periumbilical (signo de Cullen) o en los flancos (signo de Grey-Turner) — signos de alarma?",
      "type": "yn"
    },
    {
      "q": "Sinais de instabilidade: hipotensão, taquicardia, confusão mental?",
      "qEs": "¿Signos de inestabilidad: hipotensión, taquicardia, confusión mental?",
      "type": "yn"
    },
    {
      "q": "Episódios prévios de pancreatite ou cálculos biliares conhecidos?",
      "qEs": "¿Episodios previos de pancreatitis o cálculos biliares conocidos?",
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
        "kw": "GET SMASHED",
        "name": "Etiologias da pancreatite",
        "rows": [
          [
            "G",
            "Gallstones",
            "Litíase biliar (causa mais comum)"
          ],
          [
            "E",
            "Ethanol",
            "Álcool (2ª causa mais comum)"
          ],
          [
            "T",
            "Trauma",
            "Trauma abdominal / pós-CPRE"
          ],
          [
            "S",
            "Steroids",
            "Corticoides"
          ],
          [
            "M",
            "Mumps",
            "Caxumba / infecções virais"
          ],
          [
            "A",
            "Autoimmune",
            "Pancreatite autoimune"
          ],
          [
            "S",
            "Scorpion",
            "Picada de escorpião"
          ],
          [
            "H",
            "Hyper",
            "Hipertrigliceridemia / hipercalcemia"
          ],
          [
            "E",
            "ERCP",
            "Pós-CPRE"
          ],
          [
            "D",
            "Drugs",
            "Fármacos (azatioprina, tiazídicos, valproato)"
          ]
        ]
      },
      {
        "kw": "RANSON",
        "name": "Critérios de Ranson (admissão)",
        "rows": [
          [
            "I",
            "Idade",
            ">55 anos"
          ],
          [
            "L",
            "Leucócitos",
            ">16.000/mm³"
          ],
          [
            "G",
            "Glicose",
            ">200 mg/dL"
          ],
          [
            "D",
            "DHL",
            ">350 UI/L"
          ],
          [
            "A",
            "AST/TGO",
            ">250 UI/L"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Cullen",
        "subtitle": "Hemorragia retroperitoneal",
        "steps": [
          "Inspecionar a região periumbilical",
          "Pesquisar equimose azulada ao redor do umbigo"
        ],
        "normal": "Pele periumbilical normal",
        "abnormal": "Equimose periumbilical (Cullen +) → pancreatite hemorrágica/grave"
      },
      {
        "title": "Sinal de Grey-Turner",
        "subtitle": "Hemorragia em flancos",
        "steps": [
          "Inspecionar os flancos",
          "Pesquisar equimose nos flancos"
        ],
        "normal": "Flancos sem equimose",
        "abnormal": "Equimose em flancos (Grey-Turner +) → pancreatite necro-hemorrágica"
      },
      {
        "title": "Palpação epigástrica",
        "subtitle": "Dor pancreática",
        "steps": [
          "Palpar o epigástrio",
          "Avaliar irradiação da dor para o dorso"
        ],
        "normal": "Sem dor à palpação",
        "abnormal": "Dor epigástrica em faixa, irradiada ao dorso → pancreatite"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Cullen",
        "eponym": "Pancreatite hemorrágica",
        "how": "Equimose periumbilical",
        "means": "Sangramento retroperitoneal — pancreatite grave"
      },
      {
        "name": "Sinal de Grey-Turner",
        "eponym": "Pancreatite necro-hemorrágica",
        "how": "Equimose nos flancos",
        "means": "Necrose hemorrágica — mau prognóstico"
      },
      {
        "name": "Sinal de Fox",
        "eponym": "Sangramento retroperitoneal",
        "how": "Equimose na base do ligamento inguinal",
        "means": "Dissecção de sangue retroperitoneal"
      },
      {
        "name": "Dor em faixa",
        "eponym": "Pancreatite aguda",
        "how": "Dor epigástrica que irradia \"em cinturão\" para o dorso, alívio ao inclinar-se para frente",
        "means": "Padrão clássico da dor pancreática"
      }
    ],
    "ddx": [
      [
        "Pancreatite aguda",
        "Dor em faixa, lipase >3x LSN, irradiação dorsal",
        "Enzimas normais; dor localizada sem irradiação"
      ],
      [
        "Úlcera perfurada",
        "Dor súbita, abdome em tábua, pneumoperitônio",
        "Lipase elevada, sem pneumoperitônio"
      ],
      [
        "Colecistite/colangite",
        "Dor HCD, Murphy +, febre, alteração de FA/GGT",
        "Dor epigástrica em faixa, lipase muito elevada"
      ],
      [
        "Obstrução intestinal",
        "Distensão, parada de eliminação, níveis hidroaéreos",
        "Lipase elevada, dor epigástrica contínua"
      ],
      [
        "IAM de parede inferior",
        "Dor epigástrica, sudorese, ECG alterado, troponina ↑",
        "ECG normal, lipase elevada"
      ],
      [
        "Aneurisma de aorta roto",
        "Dor + massa pulsátil + choque",
        "Lipase elevada, sem massa pulsátil"
      ],
      [
        "Isquemia mesentérica",
        "Dor desproporcional ao exame, acidose láctica",
        "Lipase muito elevada, USG/TC com pâncreas alterado"
      ]
    ],
    "escalas": [
      {
        "title": "BISAP — gravidade (0-5)",
        "headers": [
          "Componente",
          "Ponto"
        ],
        "rows": [
          [
            "BUN >25 mg/dL",
            "1"
          ],
          [
            "Impaired mental status (alteração mental)",
            "1"
          ],
          [
            "SIRS",
            "1"
          ],
          [
            "Age >60",
            "1"
          ],
          [
            "Pleural effusion (derrame pleural)",
            "1"
          ]
        ],
        "note": "BISAP ≥3 → maior mortalidade; considerar UTI"
      },
      {
        "title": "Critérios de Ranson (0h e 48h)",
        "headers": [
          "Momento",
          "Critérios"
        ],
        "rows": [
          [
            "Admissão",
            "Idade>55, Leuco>16k, Glicose>200, DHL>350, TGO>250"
          ],
          [
            "48h",
            "Queda Ht>10%, BUN↑>5, Ca<8, PaO₂<60, BE>4, sequestro fluido>6L"
          ]
        ],
        "note": "≥3 critérios → pancreatite grave (mortalidade crescente com a pontuação)"
      }
    ],
    "conduta": {
      "exames": [
        "Lipase (preferível) e amilase séricas",
        "Hemograma, PCR (48h prognóstica)",
        "Ureia, creatinina, glicemia, cálcio, eletrólitos",
        "TGO, TGP, FA, GGT, bilirrubinas, triglicerídeos",
        "USG de abdome (etiologia biliar)",
        "TC de abdome com contraste (após 72h) para necrose se grave/dúvida"
      ],
      "drugs": [
        "Hidratação venosa vigorosa (Ringer lactato) — pilar do tratamento",
        "Analgesia (opioides se necessário)",
        "Antieméticos",
        "Suporte nutricional precoce (enteral preferível)",
        "ATB apenas se necrose infectada/colangite — não profilático"
      ],
      "steps": [
        "1. Diagnóstico: 2 de 3 (dor típica + lipase >3x LSN + imagem)",
        "2. Estratificar gravidade (BISAP/Ranson, PCR 48h)",
        "3. Reposição volêmica agressiva precoce",
        "4. Analgesia e controle de náuseas",
        "5. Tratar a causa: CPRE se colangite/obstrução biliar; suspender álcool; controlar triglicerídeos",
        "6. Casos graves/necrose → UTI; ATB só se infecção documentada"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Etiologías de la pancreatitis",
        "rows": [
          [
            "Gallstones",
            "Litiasis biliar (causa más común)"
          ],
          [
            "Ethanol",
            "Alcohol (2ª causa más común)"
          ],
          [
            "Trauma",
            "Trauma abdominal / pos-CPRE"
          ],
          [
            "Steroids",
            "Corticoides"
          ],
          [
            "Mumps",
            "Parotiditis / infecciones virales"
          ],
          [
            "Autoimmune",
            "Pancreatitis autoinmune"
          ],
          [
            "Scorpion",
            "Picadura de escorpión"
          ],
          [
            "Hyper",
            "Hipertrigliceridemia / hipercalcemia"
          ],
          [
            "ERCP",
            "Pos-CPRE"
          ],
          [
            "Drugs",
            "Fármacos (azatioprina, tiazidas, valproato)"
          ]
        ]
      },
      {
        "name": "Criterios de Ranson (admisión)",
        "rows": [
          [
            "Edad",
            ">55 años"
          ],
          [
            "Leucocitos",
            ">16.000/mm³"
          ],
          [
            "Glucosa",
            ">200 mg/dL"
          ],
          [
            "LDH",
            ">350 UI/L"
          ],
          [
            "AST/TGO",
            ">250 UI/L"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Cullen",
        "subtitle": "Hemorragia retroperitoneal",
        "steps": [
          "Inspeccionar la región periumbilical",
          "Buscar equimosis azulada alrededor del ombligo"
        ],
        "normal": "Piel periumbilical normal",
        "abnormal": "Equimosis periumbilical (Cullen +) → pancreatitis hemorrágica/grave"
      },
      {
        "title": "Signo de Grey-Turner",
        "subtitle": "Hemorragia en flancos",
        "steps": [
          "Inspeccionar los flancos",
          "Buscar equimosis en los flancos"
        ],
        "normal": "Flancos sin equimosis",
        "abnormal": "Equimosis en flancos (Grey-Turner +) → pancreatitis necrohemorrágica"
      },
      {
        "title": "Palpación epigástrica",
        "subtitle": "Dolor pancreático",
        "steps": [
          "Palpar el epigastrio",
          "Evaluar irradiación del dolor hacia el dorso"
        ],
        "normal": "Sin dolor a la palpación",
        "abnormal": "Dolor epigástrico en faja, irradiado al dorso → pancreatitis"
      }
    ],
    "sinais": [
      {
        "name": "Signo de Cullen",
        "eponym": "Pancreatitis hemorrágica",
        "how": "Equimosis periumbilical",
        "means": "Sangrado retroperitoneal — pancreatitis grave"
      },
      {
        "name": "Signo de Grey-Turner",
        "eponym": "Pancreatitis necrohemorrágica",
        "how": "Equimosis en los flancos",
        "means": "Necrosis hemorrágica — mal pronóstico"
      },
      {
        "name": "Signo de Fox",
        "eponym": "Sangrado retroperitoneal",
        "how": "Equimosis en la base del ligamento inguinal",
        "means": "Disección de sangre retroperitoneal"
      },
      {
        "name": "Dolor en faja",
        "eponym": "Pancreatitis aguda",
        "how": "Dolor epigástrico que irradia \"en cinturón\" hacia el dorso, alivio al inclinarse hacia adelante",
        "means": "Patrón clásico del dolor pancreático"
      }
    ],
    "ddx": [
      [
        "Pancreatitis aguda",
        "Dolor en faja, lipasa >3x LSN, irradiación dorsal",
        "Enzimas normales; dolor localizado sin irradiación"
      ],
      [
        "Úlcera perforada",
        "Dolor súbito, abdomen en tabla, neumoperitoneo",
        "Lipasa elevada, sin neumoperitoneo"
      ],
      [
        "Colecistitis/colangitis",
        "Dolor HCD, Murphy +, fiebre, alteración de FA/GGT",
        "Dolor epigástrico en faja, lipasa muy elevada"
      ],
      [
        "Obstrucción intestinal",
        "Distensión, parada de eliminación, niveles hidroaéreos",
        "Lipasa elevada, dolor epigástrico continuo"
      ],
      [
        "IAM de pared inferior",
        "Dolor epigástrico, sudoración, ECG alterado, troponina ↑",
        "ECG normal, lipasa elevada"
      ],
      [
        "Aneurisma de aorta roto",
        "Dolor + masa pulsátil + shock",
        "Lipasa elevada, sin masa pulsátil"
      ],
      [
        "Isquemia mesentérica",
        "Dolor desproporcionado al examen, acidosis láctica",
        "Lipasa muy elevada, USG/TC con páncreas alterado"
      ]
    ],
    "escalas": [
      {
        "title": "BISAP — gravedad (0-5)",
        "headers": [
          "Componente",
          "Punto"
        ],
        "rows": [
          [
            "BUN >25 mg/dL",
            "1"
          ],
          [
            "Alteración del estado mental",
            "1"
          ],
          [
            "SIRS",
            "1"
          ],
          [
            "Edad >60",
            "1"
          ],
          [
            "Derrame pleural",
            "1"
          ]
        ],
        "note": "BISAP ≥3 → mayor mortalidad; considerar UCI"
      },
      {
        "title": "Criterios de Ranson (0h y 48h)",
        "headers": [
          "Momento",
          "Criterios"
        ],
        "rows": [
          [
            "Admisión",
            "Edad>55, Leuco>16k, Glucosa>200, LDH>350, TGO>250"
          ],
          [
            "48h",
            "Caída Hto>10%, BUN↑>5, Ca<8, PaO₂<60, EB>4, secuestro de fluido>6L"
          ]
        ],
        "note": "≥3 criterios → pancreatitis grave (mortalidad creciente con la puntuación)"
      }
    ],
    "conduta": {
      "exames": [
        "Lipasa (preferible) y amilasa séricas",
        "Hemograma, PCR (48h pronóstica)",
        "Urea, creatinina, glucemia, calcio, electrolitos",
        "TGO, TGP, FA, GGT, bilirrubinas, triglicéridos",
        "USG de abdomen (etiología biliar)",
        "TC de abdomen con contraste (tras 72h) para necrosis si es grave/duda"
      ],
      "drugs": [
        "Hidratación venosa vigorosa (Ringer lactato) — pilar del tratamiento",
        "Analgesia (opioides si es necesario)",
        "Antieméticos",
        "Soporte nutricional precoz (enteral preferible)",
        "ATB solo si necrosis infectada/colangitis — no profiláctico"
      ],
      "steps": [
        "1. Diagnóstico: 2 de 3 (dolor típico + lipasa >3x LSN + imagen)",
        "2. Estratificar gravedad (BISAP/Ranson, PCR 48h)",
        "3. Reposición volémica agresiva precoz",
        "4. Analgesia y control de náuseas",
        "5. Tratar la causa: CPRE si colangitis/obstrucción biliar; suspender alcohol; controlar triglicéridos",
        "6. Casos graves/necrosis → UCI; ATB solo si infección documentada"
      ]
    }
  }
});
