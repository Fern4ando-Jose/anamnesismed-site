// Motivo: lombalgia — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("lombalgia", {
  "name": "Dor Lombar / Lombalgia",
  "nameEs": "Dolor Lumbar / Lumbalgia",
  "icon": "🦴",
  "color": "mc-purple",
  "isPain": true,
  "rasHighlight": [
    "osteo",
    "neuro"
  ],
  "aeaGuide": [
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Agudo/súbito (após esforço/trauma)",
        "Insidioso/gradual"
      ]
    },
    {
      "q": "Localização",
      "qEs": "Localización",
      "type": "radio",
      "opts": [
        "Linha média lombar",
        "Paravertebral uni/bilateral",
        "Lombar com irradiação para membro inferior"
      ]
    },
    {
      "q": "Irradiação para o membro inferior (ciática)?",
      "qEs": "¿Irradiación al miembro inferior (ciática)?",
      "type": "yn"
    },
    {
      "q": "Caráter da dor",
      "qEs": "Carácter del dolor",
      "type": "radio",
      "opts": [
        "Em pontada/aguda",
        "Em queimação/disestésica",
        "Surda/contínua",
        "Em cólica"
      ]
    },
    {
      "q": "Relação com movimento, esforço ou repouso",
      "qEs": "Relación con movimiento, esfuerzo o reposo",
      "type": "radio",
      "opts": [
        "Piora com movimento/esforço, melhora com repouso (mecânica)",
        "Piora com repouso/à noite, melhora com movimento (inflamatória)",
        "Sem relação clara"
      ]
    },
    {
      "q": "Rigidez matinal? Por quanto tempo dura?",
      "qEs": "¿Rigidez matutina? ¿Cuánto dura?",
      "type": "yn"
    },
    {
      "q": "Parestesias, formigamento ou fraqueza no(s) membro(s) inferior(es)?",
      "qEs": "¿Parestesias, hormigueo o debilidad en miembro(s) inferior(es)?",
      "type": "yn"
    },
    {
      "q": "Alteração do controle esfincteriano (incontinência urinária/fecal) ou anestesia em sela — sinais de alarme?",
      "qEs": "¿Alteración del control esfinteriano (incontinencia urinaria/fecal) o anestesia en silla de montar — signos de alarma?",
      "type": "yn"
    },
    {
      "q": "Febre, perda de peso ou sudorese noturna associadas?",
      "qEs": "¿Fiebre, pérdida de peso o sudoración nocturna asociadas?",
      "type": "yn"
    },
    {
      "q": "Trauma recente?",
      "qEs": "¿Trauma reciente?",
      "type": "yn"
    },
    {
      "q": "História de neoplasia, uso crônico de corticoides ou osteoporose?",
      "qEs": "¿Historia de neoplasia, uso crónico de corticoides u osteoporosis?",
      "type": "yn"
    },
    {
      "q": "Fatores ocupacionais/posturais associados",
      "qEs": "Factores ocupacionales/posturales asociados",
      "type": "multi",
      "opts": [
        "Trabalho com levantamento de peso/carga",
        "Longos períodos sentado",
        "Longos períodos em pé",
        "Movimentos repetitivos de tronco/coluna",
        "Vibração ocupacional (ex: dirigir, máquinas)",
        "Postura inadequada no trabalho ou em casa",
        "Sedentarismo",
        "Nenhum fator ocupacional identificado"
      ],
      "optsEs": [
        "Trabajo con levantamiento de peso/carga",
        "Largos períodos sentado",
        "Largos períodos de pie",
        "Movimientos repetitivos de tronco/columna",
        "Vibración ocupacional (ej: conducir, máquinas)",
        "Postura inadecuada en el trabajo o en casa",
        "Sedentarismo",
        "Ningún factor ocupacional identificado"
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
        "kw": "TUNAFISH",
        "name": "Sinais de alarme (red flags) na lombalgia",
        "rows": [
          [
            "T",
            "Trauma significativo",
            "Queda de altura, acidente automobilístico — risco de fratura"
          ],
          [
            "U",
            "Urinário/intestinal (disfunção esfincteriana)",
            "Retenção urinária, incontinência fecal — suspeita de síndrome da cauda equina"
          ],
          [
            "N",
            "Neurológico (déficit progressivo)",
            "Fraqueza muscular progressiva, alteração sensitiva em sela, perda de reflexos"
          ],
          [
            "A",
            "Anestesia em sela",
            "Hipoestesia perineal/perianal — emergência neurocirúrgica (cauda equina)"
          ],
          [
            "F",
            "Febre/infecção",
            "Febre, uso de drogas IV, imunossupressão — suspeita de espondilodiscite/abscesso"
          ],
          [
            "I",
            "Idade (extremos)",
            "<18 ou >50 anos com lombalgia nova — maior risco de causa estrutural/neoplásica"
          ],
          [
            "S",
            "Sem melhora ao repouso (dor noturna)",
            "Dor que piora à noite ou não alivia em repouso — sugere causa neoplásica/inflamatória"
          ],
          [
            "H",
            "História de câncer/perda de peso",
            "Antecedente oncológico, emagrecimento inexplicado — suspeita de metástase óssea"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Manobra de Lasègue (elevação da perna estendida)",
        "subtitle": "Avaliação de radiculopatia lombar (L4-S1)",
        "steps": [
          "Paciente em decúbito dorsal, relaxado",
          "Eleve a perna estendida lentamente, mantendo o joelho em extensão",
          "Observe o ângulo em que surge dor irradiada para o membro inferior"
        ],
        "normal": "Elevação até 70-90° sem dor irradiada (apenas desconforto posterior na coxa)",
        "abnormal": "Dor radicular reproduzida entre 30-70° de elevação (Lasègue+) → sugere hérnia discal/radiculopatia (geralmente L5-S1)"
      },
      {
        "title": "Teste de Patrick/FABERE",
        "subtitle": "Avaliação de articulação sacroilíaca e quadril",
        "steps": [
          "Paciente em decúbito dorsal",
          "Posicione o tornozelo sobre o joelho contralateral (posição de \"4\")",
          "Aplique pressão suave sobre o joelho fletido em direção à maca"
        ],
        "normal": "Sem dor — boa amplitude de movimento",
        "abnormal": "Dor na região sacroilíaca ou no quadril (Patrick+) → sugere disfunção sacroilíaca ou patologia de quadril"
      },
      {
        "title": "Palpação de pontos dolorosos paravertebrais",
        "subtitle": "Avaliação de dor mecânica/miofascial",
        "steps": [
          "Palpar a musculatura paravertebral lombar e processos espinhosos",
          "Avaliar contratura muscular, pontos-gatilho e dor à palpação"
        ],
        "normal": "Musculatura sem espasmo, sem dor à palpação",
        "abnormal": "Espasmo muscular, dor localizada à palpação → sugere lombalgia mecânica/miofascial"
      },
      {
        "title": "Avaliação neurológica de membros inferiores",
        "subtitle": "Pesquisa de déficit radicular",
        "steps": [
          "Testar força muscular segmentar (dorsiflexão do hálux/pé - L5, flexão plantar - S1)",
          "Avaliar sensibilidade em dermátomos correspondentes",
          "Pesquisar reflexos patelar (L4) e aquileu (S1)"
        ],
        "normal": "Força, sensibilidade e reflexos preservados e simétricos",
        "abnormal": "Déficit motor, hipoestesia ou reflexo abolido → sugere radiculopatia compressiva — investigar com imagem"
      }
    ],
    "sinais": [
      {
        "name": "Síndrome da cauda equina",
        "eponym": "Emergência neurocirúrgica",
        "how": "Retenção urinária, incontinência fecal, anestesia em sela, fraqueza bilateral de membros inferiores",
        "means": "Compressão das raízes da cauda equina — requer descompressão cirúrgica de urgência para evitar sequelas permanentes"
      },
      {
        "name": "Dor noturna que não melhora com repouso",
        "eponym": "Sinal de alarme para causa neoplásica/inflamatória",
        "how": "Dor que desperta o paciente à noite e não alivia com repouso ou mudança de posição",
        "means": "Sugere processo neoplásico (metástase óssea), infeccioso (espondilodiscite) ou inflamatório (espondiloartrite) — investigar com imagem"
      },
      {
        "name": "Sinal de Lasègue contralateral (cruzado)",
        "eponym": "Hérnia discal extrusa",
        "how": "Dor irradiada para o membro testado ao elevar o membro contralateral",
        "means": "Alta especificidade para hérnia discal volumosa comprimindo a raiz nervosa"
      }
    ],
    "ddx": [
      [
        "Lombalgia mecânica/inespecífica",
        "Dor relacionada a esforço/postura, melhora com repouso, sem irradiação ou déficit neurológico, exame neurológico normal",
        "Dor noturna persistente, déficit neurológico, sinais sistêmicos"
      ],
      [
        "Radiculopatia (hérnia discal)",
        "Dor irradiada para membro inferior em trajeto radicular, Lasègue+, déficit motor/sensitivo correspondente ao dermátomo",
        "Dor estritamente lombar sem irradiação, Lasègue negativo"
      ],
      [
        "Causa sistêmica/inflamatória (espondiloartrite, espondilodiscite)",
        "Dor inflamatória (piora em repouso/noite, melhora com movimento), rigidez matinal prolongada, febre, idade jovem, marcadores inflamatórios elevados",
        "Dor de padrão mecânico, sem rigidez matinal ou sinais sistêmicos"
      ],
      [
        "Causa neoplásica (metástase óssea, mieloma)",
        "Dor progressiva, noturna, refratária a analgesia, perda de peso, história oncológica, idade avançada",
        "Dor de início recente relacionada a esforço, sem sintomas sistêmicos"
      ],
      [
        "Dor visceral referida (aneurisma aórtico, doença renal, pancreatite)",
        "Dor lombar associada a sintomas viscerais (massa pulsátil, hematúria, sintomas digestivos), sem relação postural",
        "Dor reproduzida à palpação/mobilização da coluna, sem sintomas viscerais associados"
      ]
    ],
    "escalas": [
      {
        "title": "Sinais de alarme (red flags) — triagem inicial",
        "headers": [
          "Categoria",
          "Achados de alerta"
        ],
        "rows": [
          [
            "Síndrome da cauda equina",
            "Retenção urinária, incontinência fecal, anestesia em sela, fraqueza bilateral"
          ],
          [
            "Infecção",
            "Febre, uso de drogas IV, imunossupressão, cirurgia recente na coluna"
          ],
          [
            "Neoplasia",
            "História de câncer, perda de peso inexplicada, dor noturna progressiva, idade >50 anos"
          ],
          [
            "Fratura",
            "Trauma significativo, uso crônico de corticoide, osteoporose, idade avançada"
          ]
        ],
        "note": "Presença de qualquer red flag indica necessidade de investigação com imagem e/ou encaminhamento urgente — não tratar apenas como lombalgia mecânica"
      }
    ],
    "conduta": {
      "exames": [
        "Geralmente dispensável nas primeiras 4-6 semanas se ausência de red flags (lombalgia aguda inespecífica)",
        "Radiografia de coluna lombar (suspeita de fratura/espondilolistese)",
        "RM de coluna lombar — exame de escolha se red flags, déficit neurológico progressivo ou dor persistente >6 semanas",
        "Hemograma, VHS/PCR (suspeita de infecção/neoplasia/causa inflamatória)",
        "PSA e eletroforese de proteínas conforme suspeita oncológica específica"
      ],
      "drugs": [
        "Analgésicos simples: Paracetamol ou Dipirona",
        "AINEs (ex.: Ibuprofeno, Naproxeno) se sem contraindicação",
        "Relaxantes musculares por curto período em casos de espasmo importante (ex.: Ciclobenzaprina)",
        "Considerar encaminhamento para fisioterapia precoce",
        "Cauda equina/déficit neurológico progressivo → encaminhamento neurocirúrgico de urgência"
      ],
      "steps": [
        "1. Triagem ativa de red flags (TUNAFISH) na anamnese e exame físico",
        "2. Ausência de red flags → tratamento sintomático, manter-se ativo, reavaliação em 4-6 semanas sem necessidade de imagem precoce",
        "3. Presença de red flags → solicitar exames de imagem direcionados (RM preferencialmente)",
        "4. Sinais de síndrome da cauda equina → encaminhamento neurocirúrgico de emergência imediata",
        "5. Radiculopatia sem sinais de alarme → tratamento conservador inicial (analgesia, fisioterapia, atividade gradual)",
        "6. Refratariedade ao tratamento conservador (6-12 semanas) → reavaliação especializada e consideração de tratamento intervencionista/cirúrgico"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Signos de alarma (red flags) en la lumbalgia",
        "rows": [
          [
            "Trauma significativo",
            "Caída de altura, accidente automovilístico — riesgo de fractura"
          ],
          [
            "Urinario/intestinal (disfunción esfinteriana)",
            "Retención urinaria, incontinencia fecal — sospecha de síndrome de cauda equina"
          ],
          [
            "Neurológico (déficit progresivo)",
            "Debilidad muscular progresiva, alteración sensitiva en silla de montar, pérdida de reflejos"
          ],
          [
            "Anestesia en silla de montar",
            "Hipoestesia perineal/perianal — emergencia neuroquirúrgica (cauda equina)"
          ],
          [
            "Fiebre/infección",
            "Fiebre, uso de drogas IV, inmunosupresión — sospecha de espondilodiscitis/absceso"
          ],
          [
            "Edad (extremos)",
            "<18 o >50 años con lumbalgia nueva — mayor riesgo de causa estructural/neoplásica"
          ],
          [
            "Sin mejoría con el reposo (dolor nocturno)",
            "Dolor que empeora de noche o no alivia en reposo — sugiere causa neoplásica/inflamatoria"
          ],
          [
            "Historia de cáncer/pérdida de peso",
            "Antecedente oncológico, adelgazamiento inexplicado — sospecha de metástasis ósea"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Maniobra de Lasègue (elevación de la pierna extendida)",
        "subtitle": "Evaluación de radiculopatía lumbar (L4-S1)",
        "steps": [
          "Paciente en decúbito dorsal, relajado",
          "Eleve la pierna extendida lentamente, manteniendo la rodilla en extensión",
          "Observe el ángulo en que aparece dolor irradiado al miembro inferior"
        ],
        "normal": "Elevación hasta 70-90° sin dolor irradiado (solo molestia posterior en el muslo)",
        "abnormal": "Dolor radicular reproducido entre 30-70° de elevación (Lasègue+) → sugiere hernia discal/radiculopatía (generalmente L5-S1)"
      },
      {
        "title": "Prueba de Patrick/FABERE",
        "subtitle": "Evaluación de articulación sacroilíaca y cadera",
        "steps": [
          "Paciente en decúbito dorsal",
          "Coloque el tobillo sobre la rodilla contralateral (posición de \"4\")",
          "Aplique presión suave sobre la rodilla flexionada hacia la camilla"
        ],
        "normal": "Sin dolor — buena amplitud de movimiento",
        "abnormal": "Dolor en la región sacroilíaca o en la cadera (Patrick+) → sugiere disfunción sacroilíaca o patología de cadera"
      },
      {
        "title": "Palpación de puntos dolorosos paravertebrales",
        "subtitle": "Evaluación de dolor mecánico/miofascial",
        "steps": [
          "Palpar la musculatura paravertebral lumbar y las apófisis espinosas",
          "Evaluar contractura muscular, puntos gatillo y dolor a la palpación"
        ],
        "normal": "Musculatura sin espasmo, sin dolor a la palpación",
        "abnormal": "Espasmo muscular, dolor localizado a la palpación → sugiere lumbalgia mecánica/miofascial"
      },
      {
        "title": "Evaluación neurológica de miembros inferiores",
        "subtitle": "Búsqueda de déficit radicular",
        "steps": [
          "Probar fuerza muscular segmentaria (dorsiflexión del hallux/pie - L5, flexión plantar - S1)",
          "Evaluar sensibilidad en dermatomas correspondientes",
          "Buscar reflejos rotuliano (L4) y aquíleo (S1)"
        ],
        "normal": "Fuerza, sensibilidad y reflejos preservados y simétricos",
        "abnormal": "Déficit motor, hipoestesia o reflejo abolido → sugiere radiculopatía compresiva — investigar con imagen"
      }
    ],
    "sinais": [
      {
        "name": "Síndrome de cauda equina",
        "eponym": "Emergencia neuroquirúrgica",
        "how": "Retención urinaria, incontinencia fecal, anestesia en silla de montar, debilidad bilateral de miembros inferiores",
        "means": "Compresión de las raíces de la cauda equina — requiere descompresión quirúrgica de urgencia para evitar secuelas permanentes"
      },
      {
        "name": "Dolor nocturno que no mejora con el reposo",
        "eponym": "Signo de alarma de causa neoplásica/inflamatoria",
        "how": "Dolor que despierta al paciente de noche y no alivia con reposo o cambio de posición",
        "means": "Sugiere proceso neoplásico (metástasis ósea), infeccioso (espondilodiscitis) o inflamatorio (espondiloartritis) — investigar con imagen"
      },
      {
        "name": "Signo de Lasègue contralateral (cruzado)",
        "eponym": "Hernia discal extruida",
        "how": "Dolor irradiado al miembro evaluado al elevar el miembro contralateral",
        "means": "Alta especificidad para hernia discal voluminosa que comprime la raíz nerviosa"
      }
    ],
    "ddx": [
      [
        "Lumbalgia mecánica/inespecífica",
        "Dolor relacionado con esfuerzo/postura, mejora con el reposo, sin irradiación ni déficit neurológico, examen neurológico normal",
        "Dolor nocturno persistente, déficit neurológico, signos sistémicos"
      ],
      [
        "Radiculopatía (hernia discal)",
        "Dolor irradiado al miembro inferior en trayecto radicular, Lasègue+, déficit motor/sensitivo correspondiente al dermatoma",
        "Dolor estrictamente lumbar sin irradiación, Lasègue negativo"
      ],
      [
        "Causa sistémica/inflamatoria (espondiloartritis, espondilodiscitis)",
        "Dolor inflamatorio (empeora en reposo/noche, mejora con el movimiento), rigidez matinal prolongada, fiebre, edad joven, marcadores inflamatorios elevados",
        "Dolor de patrón mecánico, sin rigidez matinal ni signos sistémicos"
      ],
      [
        "Causa neoplásica (metástasis ósea, mieloma)",
        "Dolor progresivo, nocturno, refractario a la analgesia, pérdida de peso, historia oncológica, edad avanzada",
        "Dolor de inicio reciente relacionado con esfuerzo, sin síntomas sistémicos"
      ],
      [
        "Dolor visceral referido (aneurisma aórtico, enfermedad renal, pancreatitis)",
        "Dolor lumbar asociado a síntomas viscerales (masa pulsátil, hematuria, síntomas digestivos), sin relación postural",
        "Dolor reproducido a la palpación/movilización de la columna, sin síntomas viscerales asociados"
      ]
    ],
    "escalas": [
      {
        "title": "Signos de alarma (red flags) — triaje inicial",
        "headers": [
          "Categoría",
          "Hallazgos de alerta"
        ],
        "rows": [
          [
            "Síndrome de cauda equina",
            "Retención urinaria, incontinencia fecal, anestesia en silla de montar, debilidad bilateral"
          ],
          [
            "Infección",
            "Fiebre, uso de drogas IV, inmunosupresión, cirugía reciente de columna"
          ],
          [
            "Neoplasia",
            "Historia de cáncer, pérdida de peso inexplicada, dolor nocturno progresivo, edad >50 años"
          ],
          [
            "Fractura",
            "Trauma significativo, uso crónico de corticoide, osteoporosis, edad avanzada"
          ]
        ],
        "note": "La presencia de cualquier red flag indica necesidad de investigación con imagen y/o derivación urgente — no tratar solo como lumbalgia mecánica"
      }
    ],
    "conduta": {
      "exames": [
        "Generalmente prescindible en las primeras 4-6 semanas si no hay red flags (lumbalgia aguda inespecífica)",
        "Radiografía de columna lumbar (sospecha de fractura/espondilolistesis)",
        "RM de columna lumbar — examen de elección si red flags, déficit neurológico progresivo o dolor persistente >6 semanas",
        "Hemograma, VSG/PCR (sospecha de infección/neoplasia/causa inflamatoria)",
        "PSA y electroforesis de proteínas según sospecha oncológica específica"
      ],
      "drugs": [
        "Analgésicos simples: Paracetamol o Dipirona",
        "AINEs (ej.: Ibuprofeno, Naproxeno) si no hay contraindicación",
        "Relajantes musculares por corto período en casos de espasmo importante (ej.: Ciclobenzaprina)",
        "Considerar derivación a fisioterapia precoz",
        "Cauda equina/déficit neurológico progresivo → derivación neuroquirúrgica de urgencia"
      ],
      "steps": [
        "1. Triaje activo de red flags (TUNAFISH) en la anamnesis y el examen físico",
        "2. Ausencia de red flags → tratamiento sintomático, mantenerse activo, reevaluación en 4-6 semanas sin necesidad de imagen precoz",
        "3. Presencia de red flags → solicitar imágenes dirigidas (RM preferentemente)",
        "4. Signos de síndrome de cauda equina → derivación neuroquirúrgica de emergencia inmediata",
        "5. Radiculopatía sin signos de alarma → tratamiento conservador inicial (analgesia, fisioterapia, actividad gradual)",
        "6. Refractariedad al tratamiento conservador (6-12 semanas) → reevaluación especializada y consideración de tratamiento intervencionista/quirúrgico"
      ]
    }
  }
});
