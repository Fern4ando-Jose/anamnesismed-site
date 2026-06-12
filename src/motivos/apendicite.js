// Motivo: apendicite — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("apendicite", {
  "name": "Apendicite / Abdome Agudo",
  "nameEs": "Apendicitis / Abdomen Agudo",
  "icon": "🔪",
  "color": "mc-danger",
  "isPain": true,
  "rasHighlight": [
    "digest",
    "genito"
  ],
  "aeaGuide": [
    {
      "q": "Início e migração da dor",
      "qEs": "Inicio y migración del dolor",
      "type": "radio",
      "opts": [
        "Periumbilical/epigástrica migrando para FID (clássico)",
        "FID desde o início",
        "Difusa, sem migração definida",
        "Epigástrica persistente"
      ]
    },
    {
      "q": "Caráter da dor",
      "qEs": "Carácter del dolor",
      "type": "radio",
      "opts": [
        "Surda/contínua, em peso",
        "Em cólica",
        "Em facada/aguda, localizada"
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
      "q": "Evolução temporal — a dor está piorando, estável ou melhorando desde o início?",
      "qEs": "¿Evolución temporal — el dolor está empeorando, estable o mejorando desde el inicio?",
      "type": "radio",
      "opts": [
        "Piorando progressivamente",
        "Estável",
        "Melhorando",
        "Migrou e mudou de caráter"
      ]
    },
    {
      "q": "Anorexia (perda de apetite)?",
      "qEs": "¿Anorexia (pérdida de apetito)?",
      "type": "yn"
    },
    {
      "q": "Náuseas / vômitos? Surgiram antes ou depois do início da dor?",
      "qEs": "¿Náuseas / vómitos? ¿Aparecieron antes o después del inicio del dolor?",
      "type": "radio",
      "opts": [
        "Antes da dor",
        "Depois da dor",
        "Sem náuseas/vômitos"
      ]
    },
    {
      "q": "Febre associada? Há quanto tempo e qual temperatura?",
      "qEs": "¿Fiebre asociada? ¿Hace cuánto y qué temperatura?",
      "type": "yn"
    },
    {
      "q": "Alteração do hábito intestinal (diarreia, constipação)?",
      "qEs": "¿Alteración del hábito intestinal (diarrea, estreñimiento)?",
      "type": "yn"
    },
    {
      "q": "Parada de eliminação de fezes e gases?",
      "qEs": "¿Parada de eliminación de heces y gases?",
      "type": "yn"
    },
    {
      "q": "Sinais de alarme — dor que piora ao mínimo movimento, defesa abdominal involuntária (rigidez em tábua), sinais de instabilidade (taquicardia, hipotensão, palidez, sudorese)?",
      "qEs": "¿Signos de alarma — dolor que empeora con el mínimo movimiento, defensa abdominal involuntaria (vientre en tabla), signos de inestabilidad (taquicardia, hipotensión, palidez, sudoración)?",
      "type": "yn"
    },
    {
      "q": "Data da última menstruação / possibilidade de gravidez (mulheres em idade fértil)?",
      "qEs": "¿Fecha de la última menstruación / posibilidad de embarazo (mujeres en edad fértil)?",
      "type": "input",
      "ph": "DUM / possibilidade de gravidez",
      "ph2": "FUM / posibilidad de embarazo"
    },
    {
      "q": "Resposta ao uso de analgésico para essa dor",
      "qEs": "Respuesta al uso de analgésico para este dolor",
      "type": "radio",
      "opts": [
        "Não usou analgésico",
        "Usou e a dor melhorou bem",
        "Usou e a dor melhorou parcialmente",
        "Usou e não houve melhora (sinal de alerta)"
      ],
      "optsEs": [
        "No usó analgésico",
        "Usó y el dolor mejoró bien",
        "Usó y el dolor mejoró parcialmente",
        "Usó y no hubo mejoría (señal de alarma)"
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
        "kw": "APENDICITE",
        "name": "Características clínicas",
        "rows": [
          [
            "A",
            "Anorexia",
            ">90% dos casos"
          ],
          [
            "P",
            "Pain migration",
            "Periumbilical → FID (mais específico)"
          ],
          [
            "E",
            "Enjoo/náuseas",
            "Presentes após a dor"
          ],
          [
            "N",
            "Náusea APÓS a dor",
            "IMPORTANTE: dor precede vômitos (≠ gastroenterite)"
          ],
          [
            "D",
            "Defesa em FID",
            "Peritonite local"
          ],
          [
            "I",
            "Incapacitante",
            "Piora ao andar, sentar, tossir"
          ],
          [
            "C",
            "Calafrio/febre",
            "Febre baixa — alta → perfuração"
          ],
          [
            "I²",
            "Instabilidade",
            "FC↑, T>38,5°C, Leuco>18.000 → perfuração"
          ],
          [
            "T",
            "Toque retal",
            "Apendicite pélvica — Douglas doloroso"
          ],
          [
            "E",
            "Exames",
            "Leucocitose + USG/TC"
          ]
        ]
      },
      {
        "kw": "MANTRELS",
        "name": "Escore de Alvarado (10 pontos)",
        "rows": [
          [
            "M",
            "Migração da dor para a FID",
            "1 ponto"
          ],
          [
            "A",
            "Anorexia",
            "1 ponto"
          ],
          [
            "N",
            "Náuseas/vômitos",
            "1 ponto"
          ],
          [
            "T",
            "Tenderness — dor à palpação na FID",
            "2 pontos"
          ],
          [
            "R",
            "Rebound — dor à descompressão súbita (Blumberg)",
            "1 ponto"
          ],
          [
            "E",
            "Elevação da temperatura (≥ 37,3 °C)",
            "1 ponto"
          ],
          [
            "L",
            "Leucocitose (≥ 10.000/mm³)",
            "2 pontos"
          ],
          [
            "S",
            "Shift to the left — desvio à esquerda no hemograma",
            "1 ponto"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Blumberg",
        "subtitle": "Irritação peritoneal localizada na FID",
        "steps": [
          "Decúbito dorsal; localizar o ponto de McBurney (1/3 externo da linha umbigo–EIAS direita)",
          "Compressão profunda, lenta e contínua, mantida por alguns segundos",
          "Retirar a mão da parede abdominal de forma súbita e brusca"
        ],
        "normal": "Sem dor à descompressão",
        "abnormal": "Dor aguda e intensa no momento exato da descompressão — mais dolorosa que a compressão (Blumberg +)"
      },
      {
        "title": "Sinal de Rovsing",
        "subtitle": "Deslocamento retrógrado de gases ao ceco inflamado",
        "steps": [
          "Decúbito dorsal",
          "Compressões profundas (ou deslizamento palmar firme) ascendentes ao longo do cólon esquerdo",
          "Iniciar na FIE em direção ao cólon descendente"
        ],
        "normal": "Sem dor referida em FID",
        "abnormal": "Dor referida na FID durante a manipulação do lado esquerdo do abdome (Rovsing +)"
      },
      {
        "title": "Sinal do Psoas",
        "subtitle": "Apendicite retrocecal (fricção do psoas maior)",
        "steps": [
          "Decúbito lateral esquerdo; estabilizar a bacia com uma das mãos",
          "Com a outra mão, hiperextensão passiva forçada da coxa direita estendida (puxar o membro para trás)",
          "Alternativa: em decúbito dorsal, elevar a perna direita estendida contra a resistência da mão do examinador"
        ],
        "normal": "Sem dor à hiperextensão/elevação",
        "abnormal": "Surgimento ou agravamento substancial de dor na FID (Psoas +)"
      },
      {
        "title": "Sinal do Obturador",
        "subtitle": "Apendicite pélvica (fricção do obturatório interno)",
        "steps": [
          "Decúbito dorsal",
          "Flexionar passivamente a coxa e o joelho direitos a 90°",
          "Segurar o tornozelo e o joelho e realizar rotação interna passiva do quadril (pé para fora, joelho para dentro)"
        ],
        "normal": "Sem dor à rotação interna",
        "abnormal": "Dor hipogástrica ou profunda na FID (Obturador +)"
      },
      {
        "title": "Sinal de Dunphy",
        "subtitle": "Irritação peritoneal por variação brusca da pressão intra-abdominal",
        "steps": [
          "Decúbito dorsal",
          "Solicitar esforço de tossir firmemente uma ou duas vezes"
        ],
        "normal": "Tosse sem dor localizada",
        "abnormal": "Incremento agudo ou localização precisa da dor na FID ao tossir (Dunphy +)"
      },
      {
        "title": "Sinal de Lapinsky",
        "subtitle": "Apendicite retrocecal — compressão direta sob atividade muscular",
        "steps": [
          "Decúbito dorsal",
          "Manter compressão moderada com a mão espalmada sobre a FID",
          "Simultaneamente, pedir para elevar a perna direita com o joelho totalmente estendido"
        ],
        "normal": "Sem dor à elevação ativa",
        "abnormal": "Reprodução ou forte intensificação da dor na FID durante a elevação ativa do membro (Lapinsky +)"
      },
      {
        "title": "Sinal de Lenander",
        "subtitle": "Dissociação térmica por processo inflamatório intra-abdominal/pélvico ativo",
        "steps": [
          "Aferir concomitantemente a temperatura axilar e a temperatura retal",
          "Utilizar termômetros clínicos calibrados"
        ],
        "normal": "Diferença axilo-retal ≤1 °C",
        "abnormal": "Dissociação >1 °C entre a temperatura retal (mais elevada) e a axilar (Lenander +)"
      },
      {
        "title": "Sinal de Aaron",
        "subtitle": "Reflexo doloroso à distância (ceco/apêndice distendidos)",
        "steps": [
          "Aplicar e sustentar pressão contínua e profunda com a ponta dos dedos sobre o ponto de McBurney"
        ],
        "normal": "Sem dor referida à distância",
        "abnormal": "Dor, aperto ou queimação referida no epigástrio ou região periumbilical (Aaron +)"
      },
      {
        "title": "Sinal de Ten Horn",
        "subtitle": "Apendicite no sexo masculino (tração peritoneal via funículo espermático)",
        "steps": [
          "Decúbito dorsal",
          "Segurar delicadamente o testículo direito entre os dedos",
          "Exercer tração suave, contínua e firme em direção caudal"
        ],
        "normal": "Sem dor à tração testicular",
        "abnormal": "Dor aguda e imediata na FID durante o estiramento testicular (Ten Horn +)"
      },
      {
        "title": "Sinal de Markle (teste do calcanhar)",
        "subtitle": "Triagem de irritação peritoneal por ondas de choque",
        "steps": [
          "Em pé: erguer-se na ponta dos pés com os joelhos estendidos e deixar o corpo cair abruptamente sobre os calcanhares",
          "Acamado: manter a perna direita estendida e desferir percussão concussiva firme com o punho na planta do calcanhar direito"
        ],
        "normal": "Sem dor ao impacto",
        "abnormal": "Despertar de dor aguda localizada na FID ao impacto (Markle +)"
      },
      {
        "title": "Sinal de Guéneau de Mussy",
        "subtitle": "Irritação peritoneal generalizada (suspeita de perfuração com peritonite difusa)",
        "steps": [
          "Decúbito dorsal",
          "Compressão profunda seguida de descompressão súbita em qualquer quadrante FORA da FID (ou difusamente por toda a parede)"
        ],
        "normal": "Descompressão indolor fora da FID",
        "abnormal": "Dor intensa e generalizada à descompressão súbita — acometimento de todo o peritônio parietal (Guéneau de Mussy +)"
      },
      {
        "title": "Sinal de Chandelier (grito de Laffont)",
        "subtitle": "Foco inflamatório pélvico (DDx ou apendicite pélvica)",
        "steps": [
          "Paciente em posição ginecológica",
          "Toque vaginal bimanual até o fundo de saco posterior e lateral",
          "Mobilização lateral e cervical abrupta do colo do útero"
        ],
        "normal": "Mobilização do colo indolor",
        "abnormal": "Dor pélvica extrema com reação abrupta da paciente (Chandelier +) — estiramento de tecidos inflamados adjacentes"
      },
      {
        "title": "Sinal de Kocher",
        "subtitle": "Padrão cronológico de evolução (dor visceral → somática)",
        "steps": [
          "Manobra de anamnese dirigida",
          "Interrogar o local exato do início dos sintomas e o trajeto da dor nas últimas horas"
        ],
        "normal": "Dor sem migração característica",
        "abnormal": "Dor que iniciou em epigástrio/periumbilical e, após 4–6 h, migrou e fixou-se na FID (Kocher +)"
      }
    ],
    "sinais": [
      {
        "name": "Ponto de McBurney",
        "eponym": "Apendicite típica",
        "how": "Dor máxima no 1/3 externo da linha umbigo-EIAS direita",
        "means": "Apendicite com localização típica"
      },
      {
        "name": "Sinal do Psoas",
        "eponym": "Apendicite retrocecal",
        "how": "Hiperextensão do quadril direito em DL esquerdo → dor FID",
        "means": "Apêndice retrocecal — variante comum"
      },
      {
        "name": "Contratura da parede",
        "eponym": "Peritonite pós-perfuração",
        "how": "\"Ventre em tábua\" — rigidez difusa involuntária",
        "means": "Peritonite difusa → cirurgia de urgência imediata"
      }
    ],
    "ddx": [
      [
        "Apendicite",
        "Migração periumbilical→FID, anorexia, náuseas APÓS dor, febre baixa, Blumberg+",
        "Dor difusa, diarreia ANTES da dor, sem migração"
      ],
      [
        "Gastrenterite",
        "Diarreia+vômitos ANTES da dor, difusa, sem rigidez localizada",
        "Migração de dor, defesa FID, anorexia precedendo"
      ],
      [
        "Cólica ureteral",
        "Cólica lombar→FID, hematúria, agitação, inquieto",
        "Contínua, defesa, febre, sem hematúria"
      ],
      [
        "DIP",
        "Mulher, bilateral, corrimento, mobilização uterina dolorosa",
        "Homem, migração típica, sem corrimento"
      ],
      [
        "Gravidez ectópica",
        "β-HCG+, amenorreia, USG sem SIU, dor aguda+instabilidade",
        "Homem, β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Alvarado Score (MANTRELS)",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Migração dor FID",
            "1"
          ],
          [
            "Anorexia",
            "1"
          ],
          [
            "Náuseas/Vômitos",
            "1"
          ],
          [
            "Dor FID palpação",
            "2"
          ],
          [
            "Blumberg+",
            "1"
          ],
          [
            "Temperatura >37,3°C",
            "1"
          ],
          [
            "Leucocitose >10.000",
            "2"
          ],
          [
            "Desvio esquerda",
            "1"
          ]
        ],
        "note": "1-4: Baixa | 5-6: Observação | 7-8: Provável → cirurgia | 9-10: Alta → cirurgia imediata"
      },
      {
        "title": "AIR Score",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Vômito",
            "1"
          ],
          [
            "Dor FID",
            "1"
          ],
          [
            "Defesa FID leve",
            "1"
          ],
          [
            "Defesa FID moderada/grave",
            "2"
          ],
          [
            "Rebote FID",
            "1"
          ],
          [
            "Temperatura ≥38,5°C",
            "1"
          ],
          [
            "Leuco 10.000-14.900",
            "1"
          ],
          [
            "Leuco ≥15.000",
            "2"
          ],
          [
            "PCR 10-49",
            "1"
          ],
          [
            "PCR ≥50",
            "2"
          ]
        ],
        "note": "0-4: Alta com orientação | 5-8: Observação + imagem | 9-12: Cirurgia direta"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma + PCR",
        "β-HCG (mulheres)",
        "Urina rotina",
        "USG abdominal (1ª linha)",
        "TC abdome+pelve c/ contraste (gold standard)",
        "Rx abdome (pneumoperitônio)"
      ],
      "drugs": [
        "NPO + hidratação EV",
        "Dipirona/Tramadol EV (não retarda diagnóstico)",
        "Ondansetrona 4-8mg EV",
        "ATB pré-op: Cefazolina 2g EV 30min antes",
        "Perfurada: Metronidazol 500mg + Ceftriaxona 2g EV"
      ],
      "steps": [
        "1. Anamnese + exame → Alvarado score",
        "2. Laboratório + β-HCG + USG",
        "3. NPO + acesso EV + analgesia",
        "4. Alvarado ≤4 + USG normal: alta c/ orientação",
        "5. Alvarado 5-6: observação 12-24h",
        "6. Alvarado ≥7 ou TC confirma: apendicectomia laparoscópica <24h"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Características clínicas",
        "rows": [
          [
            "Anorexia",
            ">90% de los casos"
          ],
          [
            "Migración del dolor",
            "Periumbilical → FID (más específico)"
          ],
          [
            "Náuseas",
            "Presentes después del dolor"
          ],
          [
            "Náusea DESPUÉS del dolor",
            "IMPORTANTE: el dolor precede a los vómitos (≠ gastroenteritis)"
          ],
          [
            "Defensa en FID",
            "Peritonitis local"
          ],
          [
            "Incapacitante",
            "Empeora al caminar, sentarse, toser"
          ],
          [
            "Escalofrío/fiebre",
            "Fiebre baja — alta → perforación"
          ],
          [
            "Inestabilidad",
            "FC↑, T>38,5°C, Leuco>18.000 → perforación"
          ],
          [
            "Tacto rectal",
            "Apendicitis pélvica — Douglas doloroso"
          ],
          [
            "Exámenes",
            "Leucocitosis + USG/TC"
          ]
        ]
      },
      {
        "kw": "A. MAESTRO",
        "name": "Escala de Alvarado (10 puntos)",
        "rows": [
          [
            "Anorexia",
            "1 punto",
            "A"
          ],
          [
            "Migración del dolor a FID",
            "1 punto",
            "M"
          ],
          [
            "Aumento de leucocitos (Leucocitosis)",
            "2 puntos",
            "A"
          ],
          [
            "Entumecimiento / dolor a la descompresión",
            "1 punto",
            "E"
          ],
          [
            "Signo de rebote (Blumberg)",
            "1 punto",
            "S"
          ],
          [
            "Temperatura elevada (Fiebre)",
            "1 punto",
            "T"
          ],
          [
            "Rigidez / dolor exquisito en FID",
            "2 puntos",
            "R"
          ],
          [
            "Orientación a la izquierda (Desviación)",
            "1 punto",
            "O"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Blumberg",
        "subtitle": "Irritación peritoneal localizada en la FID",
        "steps": [
          "Decúbito dorsal; localizar el punto de McBurney (1/3 externo de la línea ombligo–EIAS derecha)",
          "Compresión profunda, lenta y continua, mantenida unos segundos",
          "Retirar la mano de la pared abdominal de forma súbita y brusca"
        ],
        "normal": "Sin dolor a la descompresión",
        "abnormal": "Dolor agudo e intenso en el momento exacto de la descompresión — más doloroso que la compresión (Blumberg +)"
      },
      {
        "title": "Signo de Rovsing",
        "subtitle": "Desplazamiento retrógrado de gases hacia el ciego inflamado",
        "steps": [
          "Decúbito dorsal",
          "Compresiones profundas (o deslizamiento palmar firme) ascendentes a lo largo del colon izquierdo",
          "Iniciar en la FII hacia el colon descendente"
        ],
        "normal": "Sin dolor referido en FID",
        "abnormal": "Dolor referido en la FID durante la manipulación del lado izquierdo del abdomen (Rovsing +)"
      },
      {
        "title": "Signo del Psoas",
        "subtitle": "Apendicitis retrocecal (fricción del psoas mayor)",
        "steps": [
          "Decúbito lateral izquierdo; estabilizar la pelvis con una mano",
          "Con la otra mano, hiperextensión pasiva forzada del muslo derecho extendido (traccionar el miembro hacia atrás)",
          "Alternativa: en decúbito dorsal, elevar la pierna derecha extendida contra la resistencia de la mano del examinador"
        ],
        "normal": "Sin dolor a la hiperextensión/elevación",
        "abnormal": "Aparición o agravamiento sustancial del dolor en la FID (Psoas +)"
      },
      {
        "title": "Signo del Obturador",
        "subtitle": "Apendicitis pélvica (fricción del obturador interno)",
        "steps": [
          "Decúbito dorsal",
          "Flexionar pasivamente el muslo y la rodilla derechos a 90°",
          "Sujetar el tobillo y la rodilla y realizar rotación interna pasiva de la cadera (pie hacia afuera, rodilla hacia adentro)"
        ],
        "normal": "Sin dolor a la rotación interna",
        "abnormal": "Dolor hipogástrico o profundo en la FID (Obturador +)"
      },
      {
        "title": "Signo de Dunphy",
        "subtitle": "Irritación peritoneal por variación brusca de la presión intraabdominal",
        "steps": [
          "Decúbito dorsal",
          "Solicitar un esfuerzo de tos firme una o dos veces"
        ],
        "normal": "Tos sin dolor localizado",
        "abnormal": "Incremento agudo o localización precisa del dolor en la FID al toser (Dunphy +)"
      },
      {
        "title": "Signo de Lapinsky",
        "subtitle": "Apendicitis retrocecal — compresión directa bajo actividad muscular",
        "steps": [
          "Decúbito dorsal",
          "Mantener compresión moderada con la mano extendida sobre la FID",
          "Simultáneamente, pedir elevar la pierna derecha con la rodilla totalmente extendida"
        ],
        "normal": "Sin dolor a la elevación activa",
        "abnormal": "Reproducción o fuerte intensificación del dolor en la FID durante la elevación activa del miembro (Lapinsky +)"
      },
      {
        "title": "Signo de Lenander",
        "subtitle": "Disociación térmica por proceso inflamatorio intraabdominal/pélvico activo",
        "steps": [
          "Medir concomitantemente la temperatura axilar y la temperatura rectal",
          "Utilizar termómetros clínicos calibrados"
        ],
        "normal": "Diferencia axilo-rectal ≤1 °C",
        "abnormal": "Disociación >1 °C entre la temperatura rectal (más elevada) y la axilar (Lenander +)"
      },
      {
        "title": "Signo de Aaron",
        "subtitle": "Reflejo doloroso a distancia (ciego/apéndice distendidos)",
        "steps": [
          "Aplicar y sostener presión continua y profunda con la punta de los dedos sobre el punto de McBurney"
        ],
        "normal": "Sin dolor referido a distancia",
        "abnormal": "Dolor, opresión o ardor referido en el epigastrio o la región periumbilical (Aaron +)"
      },
      {
        "title": "Signo de Ten Horn",
        "subtitle": "Apendicitis en el sexo masculino (tracción peritoneal vía cordón espermático)",
        "steps": [
          "Decúbito dorsal",
          "Sujetar delicadamente el testículo derecho entre los dedos",
          "Ejercer tracción suave, continua y firme en dirección caudal"
        ],
        "normal": "Sin dolor a la tracción testicular",
        "abnormal": "Dolor agudo e inmediato en la FID durante el estiramiento testicular (Ten Horn +)"
      },
      {
        "title": "Signo de Markle (prueba del talón)",
        "subtitle": "Triaje de irritación peritoneal por ondas de choque",
        "steps": [
          "De pie: elevarse sobre las puntas de los pies con las rodillas extendidas y dejar caer el cuerpo abruptamente sobre los talones",
          "Encamado: mantener la pierna derecha extendida y aplicar percusión concusiva firme con el puño en la planta del talón derecho"
        ],
        "normal": "Sin dolor al impacto",
        "abnormal": "Aparición de dolor agudo localizado en la FID al impacto (Markle +)"
      },
      {
        "title": "Signo de Guéneau de Mussy",
        "subtitle": "Irritación peritoneal generalizada (sospecha de perforación con peritonitis difusa)",
        "steps": [
          "Decúbito dorsal",
          "Compresión profunda seguida de descompresión súbita en cualquier cuadrante FUERA de la FID (o difusamente por toda la pared)"
        ],
        "normal": "Descompresión indolora fuera de la FID",
        "abnormal": "Dolor intenso y generalizado a la descompresión súbita — afectación de todo el peritoneo parietal (Guéneau de Mussy +)"
      },
      {
        "title": "Signo de Chandelier (grito de Laffont)",
        "subtitle": "Foco inflamatorio pélvico (DDx o apendicitis pélvica)",
        "steps": [
          "Paciente en posición ginecológica",
          "Tacto vaginal bimanual hasta el fondo de saco posterior y lateral",
          "Movilización lateral y cervical abrupta del cuello uterino"
        ],
        "normal": "Movilización del cuello indolora",
        "abnormal": "Dolor pélvico extremo con reacción abrupta de la paciente (Chandelier +) — estiramiento de los tejidos inflamados adyacentes"
      },
      {
        "title": "Signo de Kocher",
        "subtitle": "Patrón cronológico de evolución (dolor visceral → somático)",
        "steps": [
          "Maniobra de anamnesis dirigida",
          "Interrogar el lugar exacto del inicio de los síntomas y el trayecto del dolor en las últimas horas"
        ],
        "normal": "Dolor sin migración característica",
        "abnormal": "Dolor que se inició en epigastrio/periumbilical y, tras 4–6 h, migró y se fijó en la FID (Kocher +)"
      }
    ],
    "sinais": [
      {
        "name": "Punto de McBurney",
        "eponym": "Apendicitis típica",
        "how": "Dolor máximo en el 1/3 externo de la línea ombligo-EIAS derecha",
        "means": "Apendicitis con localización típica"
      },
      {
        "name": "Signo del Psoas",
        "eponym": "Apendicitis retrocecal",
        "how": "Hiperextensión de la cadera derecha en DL izquierdo → dolor FID",
        "means": "Apéndice retrocecal — variante común"
      },
      {
        "name": "Contractura de la pared",
        "eponym": "Peritonitis posperforación",
        "how": "\"Vientre en tabla\" — rigidez difusa involuntaria",
        "means": "Peritonitis difusa → cirugía de urgencia inmediata"
      }
    ],
    "ddx": [
      [
        "Apendicitis",
        "Migración periumbilical→FID, anorexia, náuseas DESPUÉS del dolor, fiebre baja, Blumberg+",
        "Dolor difuso, diarrea ANTES del dolor, sin migración"
      ],
      [
        "Gastroenteritis",
        "Diarrea+vómitos ANTES del dolor, difuso, sin rigidez localizada",
        "Migración del dolor, defensa FID, anorexia precediendo"
      ],
      [
        "Cólico ureteral",
        "Cólico lumbar→FID, hematuria, agitación, inquieto",
        "Continuo, defensa, fiebre, sin hematuria"
      ],
      [
        "EPI",
        "Mujer, bilateral, flujo, movilización uterina dolorosa",
        "Hombre, migración típica, sin flujo"
      ],
      [
        "Embarazo ectópico",
        "β-HCG+, amenorrea, USG sin saco intrauterino, dolor agudo+inestabilidad",
        "Hombre, β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Alvarado Score (MANTRELS)",
        "headers": [
          "Criterio",
          "Puntos"
        ],
        "rows": [
          [
            "Migración del dolor a FID",
            "1"
          ],
          [
            "Anorexia",
            "1"
          ],
          [
            "Náuseas/Vómitos",
            "1"
          ],
          [
            "Dolor FID a la palpación",
            "2"
          ],
          [
            "Blumberg+",
            "1"
          ],
          [
            "Temperatura >37,3°C",
            "1"
          ],
          [
            "Leucocitosis >10.000",
            "2"
          ],
          [
            "Desviación a la izquierda",
            "1"
          ]
        ],
        "note": "1-4: Baja | 5-6: Observación | 7-8: Probable → cirugía | 9-10: Alta → cirugía inmediata"
      },
      {
        "title": "AIR Score",
        "headers": [
          "Criterio",
          "Puntos"
        ],
        "rows": [
          [
            "Vómito",
            "1"
          ],
          [
            "Dolor FID",
            "1"
          ],
          [
            "Defensa FID leve",
            "1"
          ],
          [
            "Defensa FID moderada/grave",
            "2"
          ],
          [
            "Rebote FID",
            "1"
          ],
          [
            "Temperatura ≥38,5°C",
            "1"
          ],
          [
            "Leuco 10.000-14.900",
            "1"
          ],
          [
            "Leuco ≥15.000",
            "2"
          ],
          [
            "PCR 10-49",
            "1"
          ],
          [
            "PCR ≥50",
            "2"
          ]
        ],
        "note": "0-4: Alta con indicaciones | 5-8: Observación + imagen | 9-12: Cirugía directa"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma + PCR",
        "β-HCG (mujeres)",
        "Orina rutina",
        "USG abdominal (1ª línea)",
        "TC abdomen+pelvis c/ contraste (gold standard)",
        "Rx abdomen (neumoperitoneo)"
      ],
      "drugs": [
        "NPO + hidratación EV",
        "Dipirona/Tramadol EV (no retrasa el diagnóstico)",
        "Ondansetrón 4-8mg EV",
        "ATB prequirúrgico: Cefazolina 2g EV 30min antes",
        "Perforada: Metronidazol 500mg + Ceftriaxona 2g EV"
      ],
      "steps": [
        "1. Anamnesis + examen → Alvarado score",
        "2. Laboratorio + β-HCG + USG",
        "3. NPO + acceso EV + analgesia",
        "4. Alvarado ≤4 + USG normal: alta con indicaciones",
        "5. Alvarado 5-6: observación 12-24h",
        "6. Alvarado ≥7 o TC confirma: apendicectomía laparoscópica <24h"
      ]
    }
  }
});
