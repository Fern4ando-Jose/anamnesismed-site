// Motivo: artralgia — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("artralgia", {
  "name": "Artralgia / Dor Articular",
  "nameEs": "Artralgia / Dolor Articular",
  "icon": "🦵",
  "color": "mc-purple",
  "isPain": true,
  "rasHighlight": [
    "osteo",
    "pele"
  ],
  "aeaGuide": [
    {
      "q": "Quantas articulações estão acometidas?",
      "qEs": "¿Cuántas articulaciones están afectadas?",
      "type": "radio",
      "opts": [
        "Uma articulação (monoarticular)",
        "Duas a quatro articulações (oligoarticular)",
        "Cinco ou mais articulações (poliarticular)"
      ]
    },
    {
      "q": "Distribuição é simétrica (mesmas articulações dos dois lados)?",
      "qEs": "¿La distribución es simétrica (mismas articulaciones en ambos lados)?",
      "type": "yn"
    },
    {
      "q": "Quais articulações estão envolvidas?",
      "qEs": "¿Qué articulaciones están involucradas?",
      "type": "input",
      "ph": "Ex.: joelhos, mãos, tornozelos...",
      "ph2": "Ej.: rodillas, manos, tobillos..."
    },
    {
      "q": "Tipo/caráter da dor",
      "qEs": "Tipo/carácter del dolor",
      "type": "radio",
      "opts": [
        "Em peso/latejante",
        "Em queimação",
        "Em pontada/aguda",
        "Surda/contínua"
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
        "Agudo/súbito (horas a dias)",
        "Subagudo/gradual (semanas)",
        "Crônico (meses)"
      ]
    },
    {
      "q": "Padrão de evolução entre as articulações",
      "qEs": "Patrón de evolución entre las articulaciones",
      "type": "radio",
      "opts": [
        "Aditivo (vai acometendo novas articulações sem melhora das anteriores)",
        "Migratório (melhora em uma e surge em outra)",
        "Episódico/recorrente (crises intercaladas com períodos assintomáticos)"
      ]
    },
    {
      "q": "Ritmo da dor — piora pela manhã com rigidez prolongada (inflamatório) ou piora ao longo do dia/com uso (mecânico)?",
      "qEs": "¿Ritmo del dolor — empeora por la mañana con rigidez prolongada (inflamatorio) o empeora a lo largo del día/con el uso (mecánico)?",
      "type": "radio",
      "opts": [
        "Inflamatório — pior pela manhã, rigidez >1 hora, melhora com movimento",
        "Mecânico — piora com uso/esforço, alivia com repouso",
        "Misto/indefinido"
      ]
    },
    {
      "q": "Sinais inflamatórios locais — calor, rubor, edema (inchaço) ou derrame articular?",
      "qEs": "¿Signos inflamatorios locales — calor, rubor, edema (hinchazón) o derrame articular?",
      "type": "yn"
    },
    {
      "q": "Fatores que desencadeiam ou pioram",
      "qEs": "Factores que desencadenan o empeoran",
      "type": "multi",
      "opts": [
        "Esforço físico/uso da articulação",
        "Trauma recente",
        "Exposição ao frio",
        "Determinados alimentos (ex: carnes vermelhas, frutos do mar — gota)",
        "Consumo de álcool",
        "Estresse",
        "Mudanças climáticas/pressão atmosférica",
        "Início do movimento após repouso (mecânico)",
        "Nenhum fator identificado"
      ],
      "optsEs": [
        "Esfuerzo físico/uso de la articulación",
        "Trauma reciente",
        "Exposición al frío",
        "Determinados alimentos (ej: carnes rojas, mariscos — gota)",
        "Consumo de alcohol",
        "Estrés",
        "Cambios climáticos/presión atmosférica",
        "Inicio del movimiento tras el reposo (mecánico)",
        "Ningún factor identificado"
      ]
    },
    {
      "q": "Fatores que aliviam",
      "qEs": "Factores que alivian",
      "type": "multi",
      "opts": [
        "Repouso",
        "Calor local",
        "Frio local/gelo",
        "Movimento/uso gradual da articulação",
        "Medicação analgésica/anti-inflamatória",
        "Elevação do membro",
        "Nenhum fator de melhora identificado"
      ],
      "optsEs": [
        "Reposo",
        "Calor local",
        "Frío local/hielo",
        "Movimiento/uso gradual de la articulación",
        "Medicación analgésica/antiinflamatoria",
        "Elevación del miembro",
        "Ningún factor de mejora identificado"
      ]
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Lesões de pele, psoríase ou rash cutâneo associado?",
      "qEs": "¿Lesiones de piel, psoriasis o erupción cutánea asociada?",
      "type": "yn"
    },
    {
      "q": "Lesões orais/genitais, olho vermelho ou conjuntivite associados?",
      "qEs": "¿Lesiones orales/genitales, ojo rojo o conjuntivitis asociados?",
      "type": "yn"
    },
    {
      "q": "Fenômeno de Raynaud (mudança de cor nos dedos com frio/estresse)?",
      "qEs": "¿Fenómeno de Raynaud (cambio de color en los dedos con el frío/estrés)?",
      "type": "yn"
    },
    {
      "q": "Sintomas sistêmicos associados (perda de peso, fadiga, sudorese noturna)?",
      "qEs": "¿Síntomas sistémicos asociados (pérdida de peso, fatiga, sudoración nocturna)?",
      "type": "yn"
    },
    {
      "q": "Trauma recente na(s) articulação(ões)?",
      "qEs": "¿Trauma reciente en la(s) articulación(es)?",
      "type": "yn"
    },
    {
      "q": "Infecção recente (gastrointestinal, urinária, de vias aéreas, picada de carrapato) nas últimas semanas?",
      "qEs": "¿Infección reciente (gastrointestinal, urinaria, de vías respiratorias, picadura de garrapata) en las últimas semanas?",
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
        "kw": "CAUSAS DE MONOARTRITE",
        "name": "Mnemônico GASA — principais causas de monoartrite aguda",
        "rows": [
          [
            "G",
            "Gota / pseudogota (cristais)",
            "Início súbito, dor intensa, frequentemente em 1ª MTF (podagra) ou joelho — confirmar com artrocentese e pesquisa de cristais"
          ],
          [
            "A",
            "Artrite Séptica",
            "Febre + monoartrite aguda + derrame importante — emergência, requer artrocentese e antibioticoterapia imediatas"
          ],
          [
            "S",
            "Sinovite por trauma/hemartrose",
            "Antecedente de trauma, uso de anticoagulantes — avaliar lesão estrutural/sangramento intra-articular"
          ],
          [
            "A",
            "Artrite reativa/espondiloartrite (apresentação monoarticular)",
            "Infecção prévia (gastrointestinal/urinária/STI), associada a entesite, uveíte ou lesões cutâneas"
          ]
        ]
      },
      {
        "kw": "CAUSAS DE POLIARTRITE",
        "name": "Mnemônico SOAP-BRAIN — causas de poliartrite (adaptado)",
        "rows": [
          [
            "S",
            "SLE (Lúpus Eritematoso Sistêmico)",
            "Poliartrite simétrica não erosiva, rash malar, fotossensibilidade, predomínio em mulheres jovens"
          ],
          [
            "O",
            "Osteoartrite",
            "Padrão mecânico, mãos (IFD/IFP), joelhos e quadris, idosos, rigidez matinal curta (<30min)"
          ],
          [
            "A",
            "Artrite Reumatoide",
            "Poliartrite simétrica de pequenas articulações (mãos/punhos), rigidez matinal >1h, FR/anti-CCP positivos"
          ],
          [
            "P",
            "Psoriásica (Artrite)",
            "Associada a psoríase cutânea/ungueal, dactilite (\"dedo em salsicha\"), entesite, padrão assimétrico"
          ],
          [
            "B",
            "Bacteriana/viral (artrites infecciosas e reativas)",
            "Quadro agudo, febre, relação temporal com infecção prévia"
          ],
          [
            "R",
            "Reumática (Febre Reumática)",
            "Poliartrite migratória após faringite estreptocócica, principalmente em crianças/jovens"
          ],
          [
            "A",
            "Artrite gotosa/cristais (poliarticular crônica)",
            "Tofos, antecedente de hiperuricemia, crises recorrentes"
          ],
          [
            "I",
            "Inflamatória — espondiloartrites (axial/periférica)",
            "Dor inflamatória, rigidez matinal prolongada, sacroileíte, uveíte, psoríase, doença inflamatória intestinal associada"
          ],
          [
            "N",
            "Neoplásica (síndrome paraneoplásica)",
            "Poliartrite de início recente em idosos, perda de peso, sintomas sistêmicos — investigar neoplasia oculta"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal da tecla patelar (choque rotuliano)",
        "subtitle": "Avaliação de derrame articular no joelho",
        "steps": [
          "Com o paciente em decúbito dorsal e joelho estendido, comprima o recesso suprapatelar com uma mão para deslocar o líquido",
          "Com os dedos da outra mão, pressione a patela contra o fêmur de forma rápida e firme"
        ],
        "normal": "Patela em contato direto com o fêmur, sem sensação de \"afundar e voltar\"",
        "abnormal": "Sensação de a patela \"flutuar\" e bater contra o fêmur (sinal da tecla positivo) → indica derrame articular significativo no joelho"
      },
      {
        "title": "Avaliação da amplitude de movimento (ADM) articular",
        "subtitle": "Identificação de limitação funcional e dor ao movimento",
        "steps": [
          "Solicite movimentos ativos (o próprio paciente realiza) e depois passivos (o examinador movimenta) de cada articulação suspeita",
          "Compare a amplitude e a presença de dor entre os dois lados",
          "Observe crepitações, bloqueios ou instabilidade durante o movimento"
        ],
        "normal": "ADM completa, simétrica, sem dor ou crepitação",
        "abnormal": "Limitação da ADM, dor ao movimento passivo e ativo, crepitação ou bloqueio articular → sugere processo inflamatório, degenerativo ou mecânico intra-articular"
      },
      {
        "title": "Palpação de entesites e pontos dolorosos periarticulares",
        "subtitle": "Avaliação de inserções tendíneas/ligamentares (entesites)",
        "steps": [
          "Palpe os pontos de inserção tendínea mais comumente acometidos (tendão de Aquiles, fáscia plantar, epicôndilos, trocânter maior)",
          "Avalie dor à palpação localizada e edema associado"
        ],
        "normal": "Sem dor à palpação das ênteses",
        "abnormal": "Dor localizada à palpação de ênteses (entesite) → achado sugestivo de espondiloartrite (psoriásica, axial, reativa)"
      },
      {
        "title": "Inspeção e palpação articular geral",
        "subtitle": "Avaliação de sinais inflamatórios e deformidades",
        "steps": [
          "Inspecione simetria, edema, deformidades, eritema e atrofia muscular adjacente",
          "Palpe a articulação avaliando calor local, derrame, espessamento sinovial e dor à compressão"
        ],
        "normal": "Articulações sem edema, calor, eritema ou deformidade; temperatura local semelhante à pele adjacente",
        "abnormal": "Calor, edema, eritema e dor à palpação (sinovite ativa) ou deformidades estruturais (sugerem doença crônica/erosiva)"
      }
    ],
    "sinais": [
      {
        "name": "Tofos gotosos",
        "eponym": "Depósitos de cristais de urato",
        "how": "Nódulos endurecidos, geralmente em hélice da orelha, cotovelos, mãos e ao redor de articulações, podendo drenar material esbranquiçado/pastoso",
        "means": "Indicam gota tofácea crônica — depósito de cristais de urato monossódico em tecidos moles, associado a hiperuricemia de longa data"
      },
      {
        "name": "Nódulos reumatoides",
        "eponym": "Achado extra-articular da Artrite Reumatoide",
        "how": "Nódulos subcutâneos firmes e indolores, comumente localizados em superfícies extensoras (cotovelos, antebraços)",
        "means": "Marcador de doença mais grave/erosiva e de pior prognóstico na artrite reumatoide, geralmente associados a FR positivo"
      },
      {
        "name": "Dactilite (\"dedo em salsicha\")",
        "eponym": "Achado característico da artrite psoriásica",
        "how": "Edema difuso de todo o dedo (não apenas das articulações), conferindo aspecto de \"salsicha\"",
        "means": "Resulta da inflamação simultânea de articulações e tendões (tenossinovite) — fortemente sugestivo de espondiloartrite, especialmente psoriásica"
      },
      {
        "name": "Deformidades articulares características (mãos)",
        "eponym": "Estigmas de doença articular crônica",
        "how": "Desvio ulnar dos dedos e deformidades em \"pescoço de cisne\"/\"botoeira\" (AR); nódulos de Heberden (IFD) e Bouchard (IFP) na osteoartrite",
        "means": "Indicam doença articular crônica/estabelecida — o padrão de deformidade ajuda a diferenciar artrite reumatoide de osteoartrite"
      }
    ],
    "ddx": [
      [
        "Gota (artrite por cristais de urato)",
        "Monoartrite aguda de início súbito e dor intensa, frequentemente em 1ª MTF (podagra), hiperuricemia, tofos em casos crônicos, boa resposta a anti-inflamatórios",
        "Padrão poliarticular simétrico crônico desde o início, ausência de cristais na artrocentese"
      ],
      [
        "Artrite Reumatoide",
        "Poliartrite simétrica de pequenas articulações (mãos e punhos), rigidez matinal prolongada (>1h), FR/anti-CCP positivos, nódulos reumatoides, evolução crônica e erosiva",
        "Padrão monoarticular agudo e febril, ou padrão assimétrico com entesite/dactilite (mais sugestivo de espondiloartrite)"
      ],
      [
        "Artrite Séptica",
        "Monoartrite aguda, febre, mal-estar importante, derrame articular volumoso e muito doloroso, fator de risco para bacteriemia (uso de drogas IV, imunossupressão, prótese articular) — emergência médica",
        "Quadro crônico e afebril, múltiplas articulações acometidas de forma simétrica e indolente"
      ],
      [
        "Osteoartrite (artrose)",
        "Dor de padrão mecânico (piora ao uso, melhora ao repouso), rigidez matinal curta (<30min), acomete articulações de carga (joelhos, quadris) e mãos (IFD/IFP), idade avançada, crepitação à mobilização",
        "Dor de padrão inflamatório com rigidez matinal prolongada, sinais inflamatórios importantes (calor, eritema, edema significativo)"
      ],
      [
        "Espondiloartrites (psoriásica, axial, reativa, enteropática)",
        "Dor inflamatória, rigidez matinal prolongada, entesite, dactilite, sacroileíte, uveíte, psoríase ou doença inflamatória intestinal associadas, geralmente em adultos jovens, HLA-B27 frequentemente positivo",
        "Padrão puramente mecânico, simetria de pequenas articulações sem entesite, ausência de manifestações extra-articulares"
      ]
    ],
    "escalas": [
      {
        "title": "Diferenciação inicial — padrão inflamatório x mecânico",
        "headers": [
          "Característica",
          "Padrão inflamatório",
          "Padrão mecânico"
        ],
        "rows": [
          [
            "Rigidez matinal",
            "Prolongada (>1 hora)",
            "Curta (<30 minutos)"
          ],
          [
            "Relação com uso/repouso",
            "Melhora com o movimento, piora em repouso/à noite",
            "Piora com o uso/esforço, melhora com repouso"
          ],
          [
            "Sinais inflamatórios locais",
            "Calor, rubor, edema, derrame proeminentes",
            "Discretos ou ausentes, predomínio de crepitação"
          ],
          [
            "Sintomas sistêmicos",
            "Frequentes (febre, fadiga, perda de peso, rash)",
            "Geralmente ausentes"
          ]
        ],
        "note": "Essa diferenciação inicial orienta a priorização diagnóstica — padrão inflamatório direciona a investigação para doenças autoimunes/infecciosas/microcristalinas, enquanto o padrão mecânico sugere causas degenerativas/estruturais"
      }
    ],
    "conduta": {
      "exames": [
        "Artrocentese (punção articular) — mandatória em toda monoartrite aguda febril/com derrame para análise do líquido sinovial (celularidade, cristais, Gram e cultura) — exclui artrite séptica e confirma gota/pseudogota",
        "Hemograma completo, VHS e PCR — avaliar atividade inflamatória/infecciosa sistêmica",
        "Ácido úrico sérico — auxilia na suspeita de gota (lembrando que pode estar normal durante a crise aguda)",
        "Fator reumatoide (FR) e anti-CCP — investigação de artrite reumatoide",
        "FAN e outros autoanticorpos — conforme suspeita de doença autoimune sistêmica (lúpus e correlatos)",
        "Radiografia das articulações acometidas — avaliar erosões, redução de espaço articular, calcificações (condrocalcinose) e alterações estruturais crônicas"
      ],
      "drugs": [
        "Anti-inflamatórios não esteroidais (AINEs) — primeira linha sintomática em crises agudas (gota, padrão mecânico), respeitando contraindicações",
        "Colchicina ou corticoide (oral/intra-articular) — alternativas no manejo da crise aguda de gota",
        "Analgésicos simples (paracetamol/dipirona) para controle sintomático geral da dor",
        "Artrite séptica suspeita/confirmada → antibioticoterapia empírica de amplo espectro IV após coleta de cultura, com avaliação para drenagem articular — não retardar o início",
        "Doença autoimune confirmada (AR, lúpus, espondiloartrites) → encaminhamento à reumatologia para terapia modificadora do curso da doença (DMARDs, biológicos)"
      ],
      "steps": [
        "1. Caracterizar o padrão (mono/oligo/poliarticular, simetria, ritmo inflamatório x mecânico) e sinais de alarme (febre, derrame importante, sinais sistêmicos)",
        "2. Monoartrite aguda febril → considerar artrite séptica como emergência: artrocentese imediata, hemoculturas e início precoce de antibioticoterapia conforme avaliação especializada",
        "3. Suspeita de gota/pseudogota → artrocentese com pesquisa de cristais (padrão-ouro) sempre que possível, além de ácido úrico sérico",
        "4. Padrão poliarticular simétrico crônico com rigidez matinal prolongada → solicitar FR, anti-CCP, FAN, provas inflamatórias e radiografias, com encaminhamento à reumatologia",
        "5. Padrão mecânico em paciente idoso, sem sinais inflamatórios importantes → investigação radiográfica de osteoartrite e manejo conservador (analgesia, fisioterapia, controle de peso)",
        "6. Presença de manifestações extra-articulares (rash, uveíte, lesões orais/genitais, psoríase, sintomas sistêmicos) → ampliar investigação para doença autoimune/espondiloartrite sistêmica"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Mnemónico GASA — principales causas de monoartritis aguda",
        "rows": [
          [
            "Gota / pseudogota (cristales)",
            "Inicio súbito, dolor intenso, frecuentemente en 1ª MTF (podagra) o rodilla — confirmar con artrocentesis y búsqueda de cristales"
          ],
          [
            "Artritis Séptica",
            "Fiebre + monoartritis aguda + derrame importante — emergencia, requiere artrocentesis y antibioticoterapia inmediatas"
          ],
          [
            "Sinovitis por trauma/hemartrosis",
            "Antecedente de trauma, uso de anticoagulantes — evaluar lesión estructural/sangrado intraarticular"
          ],
          [
            "Artritis reactiva/espondiloartritis (presentación monoarticular)",
            "Infección previa (gastrointestinal/urinaria/ITS), asociada a entesitis, uveítis o lesiones cutáneas"
          ]
        ]
      },
      {
        "name": "Mnemónico SOAP-BRAIN — causas de poliartritis (adaptado)",
        "rows": [
          [
            "LES (Lupus Eritematoso Sistémico)",
            "Poliartritis simétrica no erosiva, rash malar, fotosensibilidad, predominio en mujeres jóvenes"
          ],
          [
            "Osteoartritis",
            "Patrón mecánico, manos (IFD/IFP), rodillas y caderas, ancianos, rigidez matinal corta (<30min)"
          ],
          [
            "Artritis Reumatoide",
            "Poliartritis simétrica de pequeñas articulaciones (manos/muñecas), rigidez matinal >1h, FR/anti-CCP positivos"
          ],
          [
            "Psoriásica (Artritis)",
            "Asociada a psoriasis cutánea/ungueal, dactilitis (\"dedo en salchicha\"), entesitis, patrón asimétrico"
          ],
          [
            "Bacteriana/viral (artritis infecciosas y reactivas)",
            "Cuadro agudo, fiebre, relación temporal con infección previa"
          ],
          [
            "Reumática (Fiebre Reumática)",
            "Poliartritis migratoria tras faringitis estreptocócica, principalmente en niños/jóvenes"
          ],
          [
            "Artritis gotosa/cristales (poliarticular crónica)",
            "Tofos, antecedente de hiperuricemia, crisis recurrentes"
          ],
          [
            "Inflamatoria — espondiloartritis (axial/periférica)",
            "Dolor inflamatorio, rigidez matinal prolongada, sacroileítis, uveítis, psoriasis, enfermedad inflamatoria intestinal asociada"
          ],
          [
            "Neoplásica (síndrome paraneoplásica)",
            "Poliartritis de inicio reciente en ancianos, pérdida de peso, síntomas sistémicos — investigar neoplasia oculta"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo del peloteo rotuliano (choque rotuliano)",
        "subtitle": "Evaluación de derrame articular en la rodilla",
        "steps": [
          "Con el paciente en decúbito dorsal y rodilla extendida, comprima el receso suprarrotuliano con una mano para desplazar el líquido",
          "Con los dedos de la otra mano, presione la rótula contra el fémur de forma rápida y firme"
        ],
        "normal": "Rótula en contacto directo con el fémur, sin sensación de \"hundirse y volver\"",
        "abnormal": "Sensación de que la rótula \"flota\" y choca contra el fémur (peloteo positivo) → indica derrame articular significativo en la rodilla"
      },
      {
        "title": "Evaluación de la amplitud de movimiento (ADM) articular",
        "subtitle": "Identificación de limitación funcional y dolor al movimiento",
        "steps": [
          "Solicite movimientos activos (el propio paciente los realiza) y luego pasivos (el examinador los moviliza) de cada articulación sospechosa",
          "Compare la amplitud y la presencia de dolor entre ambos lados",
          "Observe crepitaciones, bloqueos o inestabilidad durante el movimiento"
        ],
        "normal": "ADM completa, simétrica, sin dolor ni crepitación",
        "abnormal": "Limitación de la ADM, dolor al movimiento pasivo y activo, crepitación o bloqueo articular → sugiere proceso inflamatorio, degenerativo o mecánico intraarticular"
      },
      {
        "title": "Palpación de entesitis y puntos dolorosos periarticulares",
        "subtitle": "Evaluación de inserciones tendinosas/ligamentarias (entesitis)",
        "steps": [
          "Palpe los puntos de inserción tendinosa más comúnmente afectados (tendón de Aquiles, fascia plantar, epicóndilos, trocánter mayor)",
          "Evalúe dolor a la palpación localizada y edema asociado"
        ],
        "normal": "Sin dolor a la palpación de las entesis",
        "abnormal": "Dolor localizado a la palpación de entesis (entesitis) → hallazgo sugestivo de espondiloartritis (psoriásica, axial, reactiva)"
      },
      {
        "title": "Inspección y palpación articular general",
        "subtitle": "Evaluación de signos inflamatorios y deformidades",
        "steps": [
          "Inspeccione simetría, edema, deformidades, eritema y atrofia muscular adyacente",
          "Palpe la articulación evaluando calor local, derrame, engrosamiento sinovial y dolor a la compresión"
        ],
        "normal": "Articulaciones sin edema, calor, eritema ni deformidad; temperatura local similar a la piel adyacente",
        "abnormal": "Calor, edema, eritema y dolor a la palpación (sinovitis activa) o deformidades estructurales (sugieren enfermedad crónica/erosiva)"
      }
    ],
    "sinais": [
      {
        "name": "Tofos gotosos",
        "eponym": "Depósitos de cristales de urato",
        "how": "Nódulos endurecidos, generalmente en hélix de la oreja, codos, manos y alrededor de articulaciones, que pueden drenar material blanquecino/pastoso",
        "means": "Indican gota tofácea crónica — depósito de cristales de urato monosódico en tejidos blandos, asociado a hiperuricemia de larga data"
      },
      {
        "name": "Nódulos reumatoides",
        "eponym": "Hallazgo extraarticular de la Artritis Reumatoide",
        "how": "Nódulos subcutáneos firmes e indoloros, comúnmente en superficies extensoras (codos, antebrazos)",
        "means": "Marcador de enfermedad más grave/erosiva y de peor pronóstico en la artritis reumatoide, generalmente asociados a FR positivo"
      },
      {
        "name": "Dactilitis (\"dedo en salchicha\")",
        "eponym": "Hallazgo característico de la artritis psoriásica",
        "how": "Edema difuso de todo el dedo (no solo de las articulaciones), confiriendo aspecto de \"salchicha\"",
        "means": "Resulta de la inflamación simultánea de articulaciones y tendones (tenosinovitis) — fuertemente sugestivo de espondiloartritis, especialmente psoriásica"
      },
      {
        "name": "Deformidades articulares características (manos)",
        "eponym": "Estigmas de enfermedad articular crónica",
        "how": "Desviación cubital de los dedos y deformidades en \"cuello de cisne\"/\"boutonnière\" (AR); nódulos de Heberden (IFD) y Bouchard (IFP) en la osteoartritis",
        "means": "Indican enfermedad articular crónica/establecida — el patrón de deformidad ayuda a diferenciar artritis reumatoide de osteoartritis"
      }
    ],
    "ddx": [
      [
        "Gota (artritis por cristales de urato)",
        "Monoartritis aguda de inicio súbito y dolor intenso, frecuentemente en 1ª MTF (podagra), hiperuricemia, tofos en casos crónicos, buena respuesta a antiinflamatorios",
        "Patrón poliarticular simétrico crónico desde el inicio, ausencia de cristales en la artrocentesis"
      ],
      [
        "Artritis Reumatoide",
        "Poliartritis simétrica de pequeñas articulaciones (manos y muñecas), rigidez matinal prolongada (>1h), FR/anti-CCP positivos, nódulos reumatoides, evolución crónica y erosiva",
        "Patrón monoarticular agudo y febril, o patrón asimétrico con entesitis/dactilitis (más sugestivo de espondiloartritis)"
      ],
      [
        "Artritis Séptica",
        "Monoartritis aguda, fiebre, malestar importante, derrame articular voluminoso y muy doloroso, factor de riesgo para bacteriemia (uso de drogas IV, inmunosupresión, prótesis articular) — emergencia médica",
        "Cuadro crónico y afebril, múltiples articulaciones afectadas de forma simétrica e indolente"
      ],
      [
        "Osteoartritis (artrosis)",
        "Dolor de patrón mecánico (empeora con el uso, mejora con el reposo), rigidez matinal corta (<30min), afecta articulaciones de carga (rodillas, caderas) y manos (IFD/IFP), edad avanzada, crepitación a la movilización",
        "Dolor de patrón inflamatorio con rigidez matinal prolongada, signos inflamatorios importantes (calor, eritema, edema significativo)"
      ],
      [
        "Espondiloartritis (psoriásica, axial, reactiva, enteropática)",
        "Dolor inflamatorio, rigidez matinal prolongada, entesitis, dactilitis, sacroileítis, uveítis, psoriasis o enfermedad inflamatoria intestinal asociadas, generalmente en adultos jóvenes, HLA-B27 frecuentemente positivo",
        "Patrón puramente mecánico, simetría de pequeñas articulaciones sin entesitis, ausencia de manifestaciones extraarticulares"
      ]
    ],
    "escalas": [
      {
        "title": "Diferenciación inicial — patrón inflamatorio x mecánico",
        "headers": [
          "Característica",
          "Patrón inflamatorio",
          "Patrón mecánico"
        ],
        "rows": [
          [
            "Rigidez matinal",
            "Prolongada (>1 hora)",
            "Corta (<30 minutos)"
          ],
          [
            "Relación con uso/reposo",
            "Mejora con el movimiento, empeora en reposo/de noche",
            "Empeora con el uso/esfuerzo, mejora con el reposo"
          ],
          [
            "Signos inflamatorios locales",
            "Calor, rubor, edema, derrame prominentes",
            "Discretos o ausentes, predominio de crepitación"
          ],
          [
            "Síntomas sistémicos",
            "Frecuentes (fiebre, fatiga, pérdida de peso, rash)",
            "Generalmente ausentes"
          ]
        ],
        "note": "Esta diferenciación inicial orienta la priorización diagnóstica — el patrón inflamatorio dirige la investigación hacia enfermedades autoinmunes/infecciosas/microcristalinas, mientras que el patrón mecánico sugiere causas degenerativas/estructurales"
      }
    ],
    "conduta": {
      "exames": [
        "Artrocentesis (punción articular) — mandatoria en toda monoartritis aguda febril/con derrame para análisis del líquido sinovial (celularidad, cristales, Gram y cultivo) — excluye artritis séptica y confirma gota/pseudogota",
        "Hemograma completo, VSG y PCR — evaluar actividad inflamatoria/infecciosa sistémica",
        "Ácido úrico sérico — ayuda en la sospecha de gota (recordando que puede estar normal durante la crisis aguda)",
        "Factor reumatoide (FR) y anti-CCP — investigación de artritis reumatoide",
        "FAN y otros autoanticuerpos — según sospecha de enfermedad autoinmune sistémica (lupus y correlacionados)",
        "Radiografía de las articulaciones afectadas — evaluar erosiones, reducción del espacio articular, calcificaciones (condrocalcinosis) y alteraciones estructurales crónicas"
      ],
      "drugs": [
        "Antiinflamatorios no esteroidales (AINEs) — primera línea sintomática en crisis agudas (gota, patrón mecánico), respetando contraindicaciones",
        "Colchicina o corticoide (oral/intraarticular) — alternativas en el manejo de la crisis aguda de gota",
        "Analgésicos simples (paracetamol/dipirona) para control sintomático general del dolor",
        "Artritis séptica sospechada/confirmada → antibioticoterapia empírica de amplio espectro IV tras tomar el cultivo, con evaluación para drenaje articular — no retrasar el inicio",
        "Enfermedad autoinmune confirmada (AR, lupus, espondiloartritis) → derivación a reumatología para terapia modificadora del curso de la enfermedad (DMARDs, biológicos)"
      ],
      "steps": [
        "1. Caracterizar el patrón (mono/oligo/poliarticular, simetría, ritmo inflamatorio x mecánico) y signos de alarma (fiebre, derrame importante, signos sistémicos)",
        "2. Monoartritis aguda febril → considerar artritis séptica como emergencia: artrocentesis inmediata, hemocultivos e inicio precoz de antibioticoterapia según evaluación especializada",
        "3. Sospecha de gota/pseudogota → artrocentesis con búsqueda de cristales (patrón oro) siempre que sea posible, además de ácido úrico sérico",
        "4. Patrón poliarticular simétrico crónico con rigidez matinal prolongada → solicitar FR, anti-CCP, FAN, pruebas inflamatorias y radiografías, con derivación a reumatología",
        "5. Patrón mecánico en paciente anciano, sin signos inflamatorios importantes → investigación radiográfica de osteoartritis y manejo conservador (analgesia, fisioterapia, control de peso)",
        "6. Presencia de manifestaciones extraarticulares (rash, uveítis, lesiones orales/genitales, psoriasis, síntomas sistémicos) → ampliar la investigación hacia enfermedad autoinmune/espondiloartritis sistémica"
      ]
    }
  }
});
