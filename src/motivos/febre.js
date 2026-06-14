// Motivo: febre — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("febre", {
  "name": "Febre",
  "nameEs": "Fiebre",
  "icon": "🌡️",
  "color": "mc-danger",
  "rasHighlight": [
    "cabeca",
    "resp",
    "cardio",
    "digest",
    "genito",
    "pele"
  ],
  "aeaGuide": [
    {
      "q": "Início (I)",
      "qEs": "Inicio (I)",
      "type": "radio",
      "opts": [
        "Brusco (calafrio + pico rápido)",
        "Insidioso / gradual"
      ],
      "optsEs": [
        "Brusco (escalofrío + pico rápido)",
        "Insidioso / gradual"
      ]
    },
    {
      "q": "Intensidade (I) — temperatura máxima registrada",
      "qEs": "Intensidad (I) — temperatura máxima registrada",
      "type": "input",
      "ph": "°C — febrícula 37,3–38 · moderada 38–39 · alta >39 · hiperpirexia >41",
      "ph2": "°C — febrícula 37,3–38 · moderada 38–39 · alta >39 · hiperpirexia >41"
    },
    {
      "q": "Duração (D) — há quantos dias?",
      "qEs": "Duración (D) — ¿hace cuántos días?",
      "type": "input",
      "ph": "Nº de dias (>2 semanas = febre prolongada / FOI)",
      "ph2": "Nº de días (>2 semanas = fiebre prolongada / FOD)"
    },
    {
      "q": "Evolução (E) — padrão / curva febril",
      "qEs": "Evolución (E) — patrón / curva febril",
      "type": "radio",
      "opts": [
        "Contínua",
        "Remitente",
        "Intermitente",
        "Héctica/Séptica",
        "Recorrente",
        "Ondulante"
      ],
      "optsEs": [
        "Continua",
        "Remitente",
        "Intermitente",
        "Héctica/Séptica",
        "Recurrente",
        "Ondulante"
      ]
    },
    {
      "q": "Término (T)",
      "qEs": "Terminación (T)",
      "type": "radio",
      "opts": [
        "Em crise (queda rápida)",
        "Em lise (descenso gradual)",
        "Ainda persiste"
      ],
      "optsEs": [
        "En crisis (caída rápida)",
        "En lisis (descenso gradual)",
        "Aún persiste"
      ]
    },
    {
      "q": "Calafrios e tremores?",
      "qEs": "¿Escalofríos y temblores?",
      "type": "yn"
    },
    {
      "q": "Sintomas respiratórios associados (tosse, expectoração, dor torácica, dispneia)?",
      "qEs": "¿Síntomas respiratorios asociados (tos, expectoración, dolor torácico, disnea)?",
      "type": "yn"
    },
    {
      "q": "Sintomas urinários (disúria, polaciúria, dor lombar)?",
      "qEs": "¿Síntomas urinarios (disuria, polaquiuria, dolor lumbar)?",
      "type": "yn"
    },
    {
      "q": "Sintomas gastrointestinais (diarreia, vômitos, dor abdominal)?",
      "qEs": "¿Síntomas gastrointestinales (diarrea, vómitos, dolor abdominal)?",
      "type": "yn"
    },
    {
      "q": "Odinofagia ou dor de garganta?",
      "qEs": "¿Odinofagia o dolor de garganta?",
      "type": "yn"
    },
    {
      "q": "Cefaleia intensa, rigidez de nuca ou fotofobia (sinais meníngeos)?",
      "qEs": "¿Cefalea intensa, rigidez de nuca o fotofobia (signos meníngeos)?",
      "type": "yn",
      "redFlag": true
    },
    {
      "q": "Exantema, petéquias ou lesões de pele?",
      "qEs": "¿Exantema, petequias o lesiones de piel?",
      "type": "yn",
      "redFlag": true
    },
    {
      "q": "Sudorese noturna e/ou perda de peso não intencional?",
      "qEs": "¿Sudoración nocturna y/o pérdida de peso no intencional?",
      "type": "yn"
    },
    {
      "q": "Viagem recente ou contato com pessoas doentes (exposição epidemiológica)?",
      "qEs": "¿Viaje reciente o contacto con personas enfermas (exposición epidemiológica)?",
      "type": "yn"
    }
  ],
  "guidePt": {
    "mnemonics": [
      {
        "kw": "IIDET",
        "name": "Semiologia da febre",
        "rows": [
          [
            "I",
            "Início",
            "Insidioso/lento (febre tifoide) ou brusco com calafrios (pneumonia, sepse)"
          ],
          [
            "I",
            "Intensidade",
            "Febrícula (37,3–38°C), moderada (38–39°C) ou alta/hiperpirexia (>39°C)"
          ],
          [
            "D",
            "Duração",
            "Curta duração ou febre prolongada (FOI — >3 semanas sem diagnóstico)"
          ],
          [
            "E",
            "Evolução",
            "Contínua, remitente, intermitente (normaliza entre picos) ou recorrente (alterna febre e apirexia)"
          ],
          [
            "T",
            "Término",
            "Em crise — queda rápida em poucas horas — ou em lise — descenso lento e gradual"
          ]
        ]
      },
      {
        "kw": "CRISOH",
        "name": "Padrões da curva febril",
        "rows": [
          [
            "C",
            "Contínua",
            "Nunca normaliza; variação <1°C — febre tifoide, pneumonia bacteriana"
          ],
          [
            "R",
            "Remitente",
            "Varia >1°C mas não normaliza — endocardite, abscesso"
          ],
          [
            "I",
            "Intermitente",
            "Normaliza entre picos — malária, abscessos"
          ],
          [
            "S",
            "Séptica/Héctica",
            "Picos altos + calafrios + sudorese profusa — sepse"
          ],
          [
            "O",
            "Ondulante",
            "Períodos febris com afebris — Hodgkin, brucelose"
          ],
          [
            "H",
            "Humps (bifásica)",
            "Dois períodos febris separados — dengue, febre amarela"
          ]
        ]
      },
      {
        "kw": "SIRS",
        "name": "Resposta Inflamatória Sistêmica",
        "rows": [
          [
            "T",
            "Temperatura",
            ">38°C ou <36°C"
          ],
          [
            "C",
            "FC",
            ">90 bpm"
          ],
          [
            "R",
            "FR",
            ">20 irpm"
          ],
          [
            "L",
            "Leucócitos",
            ">12.000 ou <4.000/mm³ ou >10% bastões"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Kernig",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal",
          "Fletir quadril e joelho 90°",
          "Tentar estender o joelho passivamente"
        ],
        "normal": "Extensão livre sem dor",
        "abnormal": "Resistência/dor na extensão (Kernig +) → meningite"
      },
      {
        "title": "Sinal de Brudzinski",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal sem travesseiro",
          "Mão atrás da nuca",
          "Fletir pescoço passivamente ao tórax"
        ],
        "normal": "Sem flexão involuntária dos MMII",
        "abnormal": "Flexão reflexa dos joelhos/quadris (Brudzinski +) → meningite"
      },
      {
        "title": "Pesquisa de foco infeccioso",
        "subtitle": "Exame sistemático",
        "steps": [
          "Inspeção: pele, mucosas, orofaringe",
          "Ausculta pulmonar bilateral",
          "Abdome: dor, organomegalias",
          "Genitália, articulações"
        ],
        "normal": "Sem foco identificável → suspeitar FOI",
        "abnormal": "Foco identificado → guia diagnóstico e tratamento"
      },
      {
        "title": "Pesquisa de linfonodos",
        "subtitle": "Linfadenopatia",
        "steps": [
          "Palpar cadeias cervical, axilar, inguinal",
          "Avaliar tamanho, consistência, mobilidade"
        ],
        "normal": "Linfonodos <1 cm, móveis, indolores",
        "abnormal": "Pétrea → neoplasia | Mole+dolorosa → infecção"
      }
    ],
    "sinais": [
      {
        "name": "Tríade de Charcot",
        "eponym": "Colangite aguda",
        "how": "Febre + dor HCD + icterícia",
        "means": "Colangite bacteriana — urgência cirúrgica"
      },
      {
        "name": "Péntade de Reynolds",
        "eponym": "Colangite grave",
        "how": "Tríade de Charcot + choque + confusão mental",
        "means": "Colangite supurativa — drenagem de urgência"
      },
      {
        "name": "Rash petequial/purpúrico",
        "eponym": "Meningococcemia",
        "how": "Petéquias que não branqueiam à pressão",
        "means": "Meningococcemia — Penicilina/Ceftriaxona IMEDIATA"
      },
      {
        "name": "Splenomegalia febril",
        "eponym": "Febre prolongada",
        "how": "Percussão + palpação do baço aumentado",
        "means": "Malária, febre tifoide, endocardite, linfoma"
      }
    ],
    "ddx": [
      [
        "Infecção viral",
        "Mialgias, autolimitada, leucopenia",
        "Leucocitose +desvio, foco bacteriano"
      ],
      [
        "Infecção bacteriana",
        "Calafrios, foco identificável, leucocitose",
        "Curso viral, sem foco"
      ],
      [
        "Sepse",
        "qSOFA ≥2, hipotensão, lactato ↑",
        "Febre isolada sem disfunção orgânica"
      ],
      [
        "Tuberculose",
        "Febre vespertina, sudorese noturna, perda peso",
        "Curso agudo, RX normal"
      ],
      [
        "Malária",
        "Febre cíclica, esplenomegalia, viagem Amazônia",
        "Sem exposição, febre contínua"
      ],
      [
        "Endocardite",
        "Sopro novo, bacteremia, êmbolos, UDVP",
        "Sem valvopatia, sem fatores de risco"
      ],
      [
        "Neoplasia",
        "Febre >3sem, emagrecimento, adenomegalia pétrea",
        "Causa infecciosa identificada"
      ],
      [
        "Colagenose",
        "Febre+artrite+rash+ANA+, mulher jovem",
        "Infecção documentada"
      ]
    ],
    "escalas": [
      {
        "title": "qSOFA — Triagem de Sepse",
        "headers": [
          "Critério",
          "Corte",
          "Pontos"
        ],
        "rows": [
          [
            "FR",
            "≥22 irpm",
            "1"
          ],
          [
            "Estado mental",
            "Glasgow <15",
            "1"
          ],
          [
            "PAS",
            "≤100 mmHg",
            "1"
          ]
        ],
        "note": "qSOFA ≥2 → Suspeitar sepse → avaliar SOFA completo"
      },
      {
        "title": "SIRS",
        "headers": [
          "Critério",
          "Valor anormal"
        ],
        "rows": [
          [
            "Temperatura",
            ">38°C ou <36°C"
          ],
          [
            "FC",
            ">90 bpm"
          ],
          [
            "FR",
            ">20 irpm"
          ],
          [
            "Leucócitos",
            ">12.000 ou <4.000 ou >10% bastões"
          ]
        ],
        "note": "SIRS ≥2 + infecção = Sepse (critérios antigos; Sepsis-3 usa SOFA)"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma com diferencial",
        "PCR e VHS",
        "Hemoculturas 2x ANTES do ATB",
        "Urina rotina + urocultura",
        "Rx tórax",
        "TGO, TGP, FA, bilirrubinas",
        "Ureia e Creatinina",
        "Lactato venoso (se sepse)"
      ],
      "drugs": [
        "Paracetamol 500-1000 mg VO/EV q6h (max 4g/dia)",
        "Dipirona 500-1000 mg VO/EV q6h",
        "ATB empírico SOMENTE se sepse ou foco bacteriano claro",
        "Hidratação adequada"
      ],
      "steps": [
        "1. Avaliar estabilidade hemodinâmica",
        "2. Coletar hemoculturas ANTES do ATB",
        "3. Identificar foco infeccioso",
        "4. Sepse (qSOFA≥2): ATB em <1h + fluido 30mL/kg",
        "5. Antitérmico conforme conforto",
        "6. Reavaliação em 48-72h com culturas"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Semiología de la fiebre",
        "rows": [
          [
            "Inicio",
            "Insidioso/lento (fiebre tifoidea) o brusco con escalofríos (neumonía, sepsis)"
          ],
          [
            "Intensidad",
            "Febrícula (37,3–38°C), moderada (38–39°C) o alta/hiperpirexia (>39°C)"
          ],
          [
            "Duración",
            "Corta duración o fiebre prolongada (FOD — >3 semanas sin diagnóstico)"
          ],
          [
            "Evolución",
            "Continua, remitente, intermitente (normaliza entre picos) o recurrente (alterna fiebre y apirexia)"
          ],
          [
            "Término",
            "En crisis — caída rápida en pocas horas — o en lisis — descenso lento y gradual"
          ]
        ]
      },
      {
        "name": "Patrones de la curva febril",
        "rows": [
          [
            "Continua",
            "Nunca normaliza; variación <1°C — fiebre tifoidea, neumonía bacteriana"
          ],
          [
            "Remitente",
            "Varía >1°C pero no normaliza — endocarditis, absceso"
          ],
          [
            "Intermitente",
            "Normaliza entre picos — malaria, abscesos"
          ],
          [
            "Séptica/Héctica",
            "Picos altos + escalofríos + sudoración profusa — sepsis"
          ],
          [
            "Ondulante",
            "Períodos febriles con afebriles — Hodgkin, brucelosis"
          ],
          [
            "Humps (bifásica)",
            "Dos períodos febriles separados — dengue, fiebre amarilla"
          ]
        ]
      },
      {
        "name": "Respuesta Inflamatoria Sistémica",
        "rows": [
          [
            "Temperatura",
            ">38°C o <36°C"
          ],
          [
            "FC",
            ">90 lpm"
          ],
          [
            "FR",
            ">20 rpm"
          ],
          [
            "Leucocitos",
            ">12.000 o <4.000/mm³ o >10% cayados"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Kernig",
        "subtitle": "Irritación meníngea",
        "steps": [
          "Decúbito dorsal",
          "Flexionar cadera y rodilla 90°",
          "Intentar extender la rodilla pasivamente"
        ],
        "normal": "Extensión libre sin dolor",
        "abnormal": "Resistencia/dolor a la extensión (Kernig +) → meningitis"
      },
      {
        "title": "Signo de Brudzinski",
        "subtitle": "Irritación meníngea",
        "steps": [
          "Decúbito dorsal sin almohada",
          "Mano detrás de la nuca",
          "Flexionar el cuello pasivamente hacia el tórax"
        ],
        "normal": "Sin flexión involuntaria de los MMII",
        "abnormal": "Flexión refleja de rodillas/caderas (Brudzinski +) → meningitis"
      },
      {
        "title": "Búsqueda de foco infeccioso",
        "subtitle": "Examen sistemático",
        "steps": [
          "Inspección: piel, mucosas, orofaringe",
          "Auscultación pulmonar bilateral",
          "Abdomen: dolor, organomegalias",
          "Genitales, articulaciones"
        ],
        "normal": "Sin foco identificable → sospechar FOD",
        "abnormal": "Foco identificado → guía diagnóstico y tratamiento"
      },
      {
        "title": "Búsqueda de ganglios linfáticos",
        "subtitle": "Linfadenopatía",
        "steps": [
          "Palpar cadenas cervical, axilar, inguinal",
          "Evaluar tamaño, consistencia, movilidad"
        ],
        "normal": "Ganglios <1 cm, móviles, indoloros",
        "abnormal": "Pétreo → neoplasia | Blando+doloroso → infección"
      }
    ],
    "sinais": [
      {
        "name": "Tríada de Charcot",
        "eponym": "Colangitis aguda",
        "how": "Fiebre + dolor HCD + ictericia",
        "means": "Colangitis bacteriana — urgencia quirúrgica"
      },
      {
        "name": "Péntada de Reynolds",
        "eponym": "Colangitis grave",
        "how": "Tríada de Charcot + shock + confusión mental",
        "means": "Colangitis supurativa — drenaje de urgencia"
      },
      {
        "name": "Rash petequial/purpúrico",
        "eponym": "Meningococemia",
        "how": "Petequias que no blanquean a la presión",
        "means": "Meningococemia — Penicilina/Ceftriaxona INMEDIATA"
      },
      {
        "name": "Esplenomegalia febril",
        "eponym": "Fiebre prolongada",
        "how": "Percusión + palpación del bazo aumentado",
        "means": "Malaria, fiebre tifoidea, endocarditis, linfoma"
      }
    ],
    "ddx": [
      [
        "Infección viral",
        "Mialgias, autolimitada, leucopenia",
        "Leucocitosis +desviación, foco bacteriano"
      ],
      [
        "Infección bacteriana",
        "Escalofríos, foco identificable, leucocitosis",
        "Curso viral, sin foco"
      ],
      [
        "Sepsis",
        "qSOFA ≥2, hipotensión, lactato ↑",
        "Fiebre aislada sin disfunción orgánica"
      ],
      [
        "Tuberculosis",
        "Fiebre vespertina, sudoración nocturna, pérdida de peso",
        "Curso agudo, Rx normal"
      ],
      [
        "Malaria",
        "Fiebre cíclica, esplenomegalia, viaje Amazonia",
        "Sin exposición, fiebre continua"
      ],
      [
        "Endocarditis",
        "Soplo nuevo, bacteriemia, émbolos, UDVP",
        "Sin valvulopatía, sin factores de riesgo"
      ],
      [
        "Neoplasia",
        "Fiebre >3sem, adelgazamiento, adenomegalia pétrea",
        "Causa infecciosa identificada"
      ],
      [
        "Colagenosis",
        "Fiebre+artritis+rash+ANA+, mujer joven",
        "Infección documentada"
      ]
    ],
    "escalas": [
      {
        "title": "qSOFA — Triaje de Sepsis",
        "headers": [
          "Criterio",
          "Corte",
          "Puntos"
        ],
        "rows": [
          [
            "FR",
            "≥22 rpm",
            "1"
          ],
          [
            "Estado mental",
            "Glasgow <15",
            "1"
          ],
          [
            "PAS",
            "≤100 mmHg",
            "1"
          ]
        ],
        "note": "qSOFA ≥2 → Sospechar sepsis → evaluar SOFA completo"
      },
      {
        "title": "SIRS",
        "headers": [
          "Criterio",
          "Valor anormal"
        ],
        "rows": [
          [
            "Temperatura",
            ">38°C o <36°C"
          ],
          [
            "FC",
            ">90 lpm"
          ],
          [
            "FR",
            ">20 rpm"
          ],
          [
            "Leucocitos",
            ">12.000 o <4.000 o >10% cayados"
          ]
        ],
        "note": "SIRS ≥2 + infección = Sepsis (criterios antiguos; Sepsis-3 usa SOFA)"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma con diferencial",
        "PCR y VSG",
        "Hemocultivos 2x ANTES del ATB",
        "Orina rutina + urocultivo",
        "Rx tórax",
        "TGO, TGP, FA, bilirrubinas",
        "Urea y Creatinina",
        "Lactato venoso (si sepsis)"
      ],
      "drugs": [
        "Paracetamol 500-1000 mg VO/EV c/6h (máx 4g/día)",
        "Dipirona 500-1000 mg VO/EV c/6h",
        "ATB empírico SOLO si sepsis o foco bacteriano claro",
        "Hidratación adecuada"
      ],
      "steps": [
        "1. Evaluar estabilidad hemodinámica",
        "2. Tomar hemocultivos ANTES del ATB",
        "3. Identificar foco infeccioso",
        "4. Sepsis (qSOFA≥2): ATB en <1h + fluido 30mL/kg",
        "5. Antitérmico según confort",
        "6. Reevaluación en 48-72h con cultivos"
      ]
    }
  }
});
