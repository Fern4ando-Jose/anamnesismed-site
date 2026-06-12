// Motivo: dor-toracica — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("dor-toracica", {
  "name": "Dor Torácica",
  "nameEs": "Dolor Torácico",
  "icon": "❤️",
  "color": "mc-danger",
  "isPain": true,
  "rasHighlight": [
    "resp",
    "cardio"
  ],
  "ddx": [
    [
      "IAM",
      "Opressão, irradiação MSE, sudorese, >20min",
      "Sem alívio NTG, enzimas ↑"
    ],
    [
      "Angina instável",
      "Opressão típica, <20min",
      "Alivia NTG, enzimas normais"
    ],
    [
      "Dissecção aórtica",
      "Desgarrante, dorso, HTA",
      "Assimetria pulsos"
    ],
    [
      "TEP",
      "Pleurítica, dispneia súbita",
      "SpO2 ↓, TVP"
    ],
    [
      "Pericardite",
      "Melhora sentado, atrito",
      "Difusa, ECG ST difuso"
    ],
    [
      "DRGE",
      "Queimação, pós-prandial",
      "Melhora IBP/antiácido"
    ]
  ],
  "aeaGuide": [
    {
      "q": "Localização da dor",
      "qEs": "Localización del dolor",
      "type": "radio",
      "opts": [
        "Retroesternal",
        "Precordial",
        "Lateral/pleural",
        "Epigástrica",
        "Difusa"
      ],
      "optsEs": [
        "Retroesternal",
        "Precordial",
        "Lateral/pleural",
        "Epigástrico",
        "Difuso"
      ]
    },
    {
      "q": "Irradiação",
      "qEs": "Irradiación",
      "type": "radio",
      "opts": [
        "Membro superior esquerdo",
        "Mandíbula/pescoço",
        "Ombro direito",
        "Dorso/interescapular",
        "Sem irradiação"
      ],
      "optsEs": [
        "Miembro superior izquierdo",
        "Mandíbula/cuello",
        "Hombro derecho",
        "Dorso/interescapular",
        "Sin irradiación"
      ]
    },
    {
      "q": "Tipo/caráter da dor",
      "qEs": "Tipo/carácter del dolor",
      "type": "radio",
      "opts": [
        "Em aperto/opressão",
        "Em queimação",
        "Em pontada/agulhada",
        "Lancinante/dilacerante",
        "Em peso"
      ],
      "optsEs": [
        "Opresivo",
        "Ardor/quemante",
        "Punzante",
        "Lancinante/desgarrante",
        "Pesadez"
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
      "q": "Duração do episódio",
      "qEs": "Duración del episodio",
      "type": "radio",
      "opts": [
        "Segundos",
        "Minutos (<20min)",
        "Mais de 20-30 minutos",
        "Persistente/contínua"
      ],
      "optsEs": [
        "Segundos",
        "Minutos (<20min)",
        "Más de 20-30 minutos",
        "Persistente/continuo"
      ]
    },
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Súbito (segundos)",
        "Gradual/progressivo"
      ],
      "optsEs": [
        "Súbito (segundos)",
        "Gradual/progresivo"
      ]
    },
    {
      "q": "Relação com esforço",
      "qEs": "Relación con esfuerzo",
      "type": "radio",
      "opts": [
        "Piora com esforço",
        "Melhora com esforço",
        "Sem relação com esforço",
        "Em repouso"
      ],
      "optsEs": [
        "Empeora con el esfuerzo",
        "Mejora con el esfuerzo",
        "Sin relación con el esfuerzo",
        "En reposo"
      ]
    },
    {
      "q": "Relação com a respiração ou tosse (dor pleurítica)?",
      "qEs": "¿Relación con la respiración o la tos (dolor pleurítico)?",
      "type": "yn"
    },
    {
      "q": "Relação com posição ou alimentação",
      "qEs": "Relación con la posición o la alimentación",
      "type": "radio",
      "opts": [
        "Piora ao deitar-se",
        "Melhora ao sentar-se/inclinar para frente",
        "Relação com alimentação (piora/melhora pós-prandial)",
        "Piora ao engolir",
        "Sem relação"
      ],
      "optsEs": [
        "Empeora al acostarse",
        "Mejora al sentarse/inclinarse hacia adelante",
        "Relación con la alimentación (empeora/mejora posprandial)",
        "Empeora al tragar",
        "Sin relación"
      ]
    },
    {
      "q": "Alivia com nitroglicerina?",
      "qEs": "¿Alivia con nitroglicerina?",
      "type": "yn"
    },
    {
      "q": "Evolução desde o início (piorando, estável, melhorando)?",
      "qEs": "¿Evolución desde el inicio (empeorando, estable, mejorando)?",
      "type": "radio",
      "opts": [
        "Piorando progressivamente",
        "Estável",
        "Melhorando",
        "Em crises recorrentes"
      ]
    },
    {
      "q": "Palpitações associadas?",
      "qEs": "¿Palpitaciones asociadas?",
      "type": "yn"
    },
    {
      "q": "Dispneia associada?",
      "qEs": "¿Disnea asociada?",
      "type": "yn"
    },
    {
      "q": "Sudorese fria associada?",
      "qEs": "¿Sudoración fría asociada?",
      "type": "yn"
    },
    {
      "q": "Náuseas ou vômitos associados?",
      "qEs": "¿Náuseas o vómitos asociados?",
      "type": "yn"
    },
    {
      "q": "Síncope ou pré-síncope associada?",
      "qEs": "¿Síncope o presíncope asociado?",
      "type": "yn"
    },
    {
      "q": "Febre?",
      "qEs": "¿Fiebre?",
      "type": "yn"
    },
    {
      "q": "Tosse associada?",
      "qEs": "¿Tos asociada?",
      "type": "yn"
    },
    {
      "q": "Tosse — seca ou produtiva?",
      "qEs": "Tos — ¿seca o productiva?",
      "type": "radio",
      "opts": [
        "Seca (não produtiva)",
        "Produtiva — com escarro"
      ],
      "optsEs": [
        "Seca (no productiva)",
        "Productiva — con esputo"
      ]
    },
    {
      "q": "Há expectoração?",
      "qEs": "¿Hay expectoración?",
      "type": "yn"
    },
    {
      "q": "Hemoptise?",
      "qEs": "¿Hemoptisis?",
      "type": "yn"
    },
    {
      "q": "Dor torácica em \"facada\" no dorso/interescapular, com diferença de pressão arterial entre os braços (suspeita de dissecção aórtica) — sinal de alarme?",
      "qEs": "¿Dolor torácico \"como puñalada\" en dorso/interescapular, con diferencia de presión arterial entre brazos (sospecha de disección aórtica) — signo de alarma?",
      "type": "yn"
    }
  ],
  "guidePt": {
    "mnemonics": [
      {
        "kw": "MONA",
        "name": "Conduta inicial no IAM/SCA",
        "rows": [
          [
            "M",
            "Morfina",
            "2-4 mg EV — dor refratária"
          ],
          [
            "O",
            "Oxigênio",
            "Só se SpO₂ <94%"
          ],
          [
            "N",
            "Nitratos",
            "NTG SL 0,5 mg — contraindicado se PAS <90 ou sildenafil"
          ],
          [
            "A",
            "AAS",
            "300 mg mastigado — dose de ataque"
          ]
        ]
      },
      {
        "kw": "6 EMERGÊNCIAS",
        "name": "Causas que matam por dor torácica",
        "rows": [
          [
            "1",
            "IAM/SCA",
            "Opressão, irradiação MSE, troponina ↑"
          ],
          [
            "2",
            "Dissecção aórtica",
            "Desgarrante, dorso, assimetria de pulsos"
          ],
          [
            "3",
            "TEP",
            "Pleurítica, dispneia, TVP, D-Dímero ↑"
          ],
          [
            "4",
            "Pneumotórax hipertensivo",
            "MV ausente, desvio de traqueia, hipotensão"
          ],
          [
            "5",
            "Tamponamento",
            "Beck: hipotensão + TJ + bulhas abafadas"
          ],
          [
            "6",
            "Ruptura esofágica",
            "Pós-vômito, enfisema subcutâneo, Boerhaave"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Levine",
        "subtitle": "Isquemia miocárdica",
        "steps": [
          "Observar como o paciente descreve a dor",
          "Paciente coloca punho fechado sobre o esterno espontaneamente"
        ],
        "normal": "Aponta com dedo a área localizada",
        "abnormal": "Punho fechado no esterno (Levine +) → alta especificidade para isquemia"
      },
      {
        "title": "Pulso paradoxal",
        "subtitle": "Tamponamento/pericardite constritiva",
        "steps": [
          "Esfigmomanômetro — inflar acima da sistólica",
          "Desinflar: anotar PA do 1º som (expiração)",
          "Anotar PA quando som aparece em TODAS as fases"
        ],
        "normal": "Diferença <10 mmHg entre fases",
        "abnormal": "Diferença >10 mmHg → tamponamento, pericardite constritiva, TEP maciço"
      },
      {
        "title": "Atrito pericárdico",
        "subtitle": "Pericardite aguda",
        "steps": [
          "Diafragma do estetoscópio",
          "Paciente sentado + inclinado para frente",
          "Expiração forçada — LLEB inferior"
        ],
        "normal": "Sem ruídos extras além de B1 e B2",
        "abnormal": "Ruído de couro friccionado → pericardite aguda"
      },
      {
        "title": "Palpação da parede torácica",
        "subtitle": "Costocondrite",
        "steps": [
          "Palpar articulações costocondrais 1ª-7ª",
          "Pressão digital firme em cada junção"
        ],
        "normal": "Sem dor à palpação da parede",
        "abnormal": "Reprodução da dor → costocondrite (exclui causa cardíaca)"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Levine",
        "eponym": "IAM",
        "how": "Punho fechado sobre o esterno para descrever a dor",
        "means": "Alta especificidade para isquemia miocárdica"
      },
      {
        "name": "Tríade de Beck",
        "eponym": "Tamponamento",
        "how": "Hipotensão + Turgência jugular + Bulhas abafadas",
        "means": "Tamponamento cardíaco — pericardiocentese de emergência"
      },
      {
        "name": "Assimetria de pulsos",
        "eponym": "Dissecção aórtica",
        "how": "Comparar PA nos dois braços + pulso radial bilateral",
        "means": "Diferença >20 mmHg → dissecção aórtica tipo A — cirurgia emergência"
      },
      {
        "name": "Atrito pericárdico",
        "eponym": "Pericardite aguda",
        "how": "Couro friccionado — melhor sentado + expiração forçada + LLEB",
        "means": "Pericardite aguda — AAS + Colchicina; eco para descartar derrame"
      }
    ],
    "ddx": [
      [
        "IAM (IAMEST/NSTEMI)",
        "Opressão >20min, irradiação MSE, sudorese, troponina ↑, ST ↑",
        "Pontada localizada, palpação reproduz dor"
      ],
      [
        "Angina instável",
        "Opressão <20min, alivia NTG, troponina normal",
        "Dor >20min, troponina em curva de elevação"
      ],
      [
        "Dissecção aórtica",
        "Desgarrante SÚBITO, dorso, HTA, assimetria de pulsos",
        "Gradual, ST ↑ típico, troponina ↑"
      ],
      [
        "TEP",
        "Pleurítica, dispneia, TVP, SpO₂↓, D-Dímero ↑",
        "Dor isquêmica típica, ST ↑, sem TVP"
      ],
      [
        "Pericardite",
        "Melhora sentado, piora deitado, atrito, ST difuso côncavo",
        "Irradiação MSE, troponina muito elevada"
      ],
      [
        "DRGE",
        "Queimação pós-prandial, alivia IBP/antiácido",
        "Relação com esforço, sudorese, troponina ↑"
      ],
      [
        "Costocondrite",
        "Reproduzida pela palpação, piora com movimentos",
        "Em repouso, irradiação, sudorese"
      ],
      [
        "Pneumotórax",
        "Súbito, pleurítico, MV ↓ unilateral",
        "Bilateral, troponina ↑"
      ]
    ],
    "escalas": [
      {
        "title": "HEART Score — Risco MACE em SCA",
        "headers": [
          "Componente",
          "0",
          "1",
          "2"
        ],
        "rows": [
          [
            "H História",
            "Inespecífica",
            "Mod suspeita",
            "Altamente suspeita"
          ],
          [
            "E ECG",
            "Normal",
            "BRE/repol anormal",
            "ST ↑"
          ],
          [
            "A Idade",
            "<45",
            "45-64",
            "≥65"
          ],
          [
            "R Fatores risco",
            "0",
            "1-2",
            "≥3 ou DAC"
          ],
          [
            "T Troponina",
            "≤LSN",
            ">1-3x LSN",
            ">3x LSN"
          ]
        ],
        "note": "0-3: Baixo risco | 4-6: Intermediário | 7-10: Alto risco (65% MACE)"
      },
      {
        "title": "Wells TEP",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "TVP clinicamente suspeita",
            "3"
          ],
          [
            "Alternativo menos provável que TEP",
            "3"
          ],
          [
            "FC >100",
            "1.5"
          ],
          [
            "Imobilização/cirurgia <4 sem",
            "1.5"
          ],
          [
            "TVP/TEP prévio",
            "1.5"
          ],
          [
            "Hemoptise",
            "1"
          ],
          [
            "Neoplasia ativa",
            "1"
          ]
        ],
        "note": "<2: Baixa | 2-6: Intermediária | >6: Alta probabilidade"
      }
    ],
    "conduta": {
      "exames": [
        "ECG 12 derivações em <10 min",
        "Troponina I/T ultrassensível (basal + 1-3h)",
        "Hemograma, coagulação",
        "Rx tórax PA",
        "D-Dímero (se TEP — prob baixa/intermediária)",
        "Ecocardiograma bedside se instável"
      ],
      "drugs": [
        "AAS 300 mg mastigado (SCA sem contraindicação)",
        "NTG SL 0,5 mg q5min x3 (PAS>90, sem sildenafil)",
        "Morfina 2-4 mg EV (dor refratária)",
        "Heparina HBPM (SCA confirmado)",
        "O₂ só se SpO₂ <94%"
      ],
      "steps": [
        "1. ECG em <10 min — IAMEST? → ativar hemodinâmica",
        "2. Acesso EV + monitorização contínua",
        "3. Troponina basal + hemograma + coagulação",
        "4. MONA se SCA",
        "5. IAMEST: angioplastia <90 min ou trombólise <12h",
        "6. Rx tórax para diagnóstico diferencial"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Conducta inicial en el IAM/SCA",
        "rows": [
          [
            "Morfina",
            "2-4 mg EV — dolor refractario"
          ],
          [
            "Oxígeno",
            "Solo si SpO₂ <94%"
          ],
          [
            "Nitratos",
            "NTG SL 0,5 mg — contraindicado si PAS <90 o sildenafil"
          ],
          [
            "AAS",
            "300 mg masticado — dosis de ataque"
          ]
        ]
      },
      {
        "name": "Causas que matan por dolor torácico",
        "rows": [
          [
            "IAM/SCA",
            "Opresión, irradiación MSI, troponina ↑"
          ],
          [
            "Disección aórtica",
            "Desgarrante, dorso, asimetría de pulsos"
          ],
          [
            "TEP",
            "Pleurítico, disnea, TVP, Dímero-D ↑"
          ],
          [
            "Neumotórax hipertensivo",
            "MV ausente, desviación de tráquea, hipotensión"
          ],
          [
            "Taponamiento",
            "Beck: hipotensión + IY + ruidos apagados"
          ],
          [
            "Ruptura esofágica",
            "Pos-vómito, enfisema subcutáneo, Boerhaave"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Signo de Levine",
        "subtitle": "Isquemia miocárdica",
        "steps": [
          "Observar cómo el paciente describe el dolor",
          "El paciente coloca el puño cerrado sobre el esternón espontáneamente"
        ],
        "normal": "Señala con el dedo el área localizada",
        "abnormal": "Puño cerrado sobre el esternón (Levine +) → alta especificidad para isquemia"
      },
      {
        "title": "Pulso paradójico",
        "subtitle": "Taponamiento/pericarditis constrictiva",
        "steps": [
          "Esfigmomanómetro — inflar por encima de la sistólica",
          "Desinflar: anotar PA del 1er ruido (espiración)",
          "Anotar PA cuando el ruido aparece en TODAS las fases"
        ],
        "normal": "Diferencia <10 mmHg entre fases",
        "abnormal": "Diferencia >10 mmHg → taponamiento, pericarditis constrictiva, TEP masivo"
      },
      {
        "title": "Frote pericárdico",
        "subtitle": "Pericarditis aguda",
        "steps": [
          "Diafragma del estetoscopio",
          "Paciente sentado + inclinado hacia adelante",
          "Espiración forzada — BEII inferior"
        ],
        "normal": "Sin ruidos extra además de R1 y R2",
        "abnormal": "Ruido de cuero frotado → pericarditis aguda"
      },
      {
        "title": "Palpación de la pared torácica",
        "subtitle": "Costocondritis",
        "steps": [
          "Palpar articulaciones costocondrales 1ª-7ª",
          "Presión digital firme en cada unión"
        ],
        "normal": "Sin dolor a la palpación de la pared",
        "abnormal": "Reproducción del dolor → costocondritis (excluye causa cardíaca)"
      }
    ],
    "sinais": [
      {
        "name": "Signo de Levine",
        "eponym": "IAM",
        "how": "Puño cerrado sobre el esternón para describir el dolor",
        "means": "Alta especificidad para isquemia miocárdica"
      },
      {
        "name": "Tríada de Beck",
        "eponym": "Taponamiento",
        "how": "Hipotensión + Ingurgitación yugular + Ruidos apagados",
        "means": "Taponamiento cardíaco — pericardiocentesis de emergencia"
      },
      {
        "name": "Asimetría de pulsos",
        "eponym": "Disección aórtica",
        "how": "Comparar PA en ambos brazos + pulso radial bilateral",
        "means": "Diferencia >20 mmHg → disección aórtica tipo A — cirugía de emergencia"
      },
      {
        "name": "Frote pericárdico",
        "eponym": "Pericarditis aguda",
        "how": "Cuero frotado — mejor sentado + espiración forzada + BEII",
        "means": "Pericarditis aguda — AAS + Colchicina; eco para descartar derrame"
      }
    ],
    "ddx": [
      [
        "IAM (IAMCEST/NSTEMI)",
        "Opresión >20min, irradiación MSI, sudoración, troponina ↑, ST ↑",
        "Punzada localizada, palpación reproduce dolor"
      ],
      [
        "Angina inestable",
        "Opresión <20min, alivia con NTG, troponina normal",
        "Dolor >20min, troponina en curva de elevación"
      ],
      [
        "Disección aórtica",
        "Desgarrante SÚBITO, dorso, HTA, asimetría de pulsos",
        "Gradual, ST ↑ típico, troponina ↑"
      ],
      [
        "TEP",
        "Pleurítico, disnea, TVP, SpO₂↓, Dímero-D ↑",
        "Dolor isquémico típico, ST ↑, sin TVP"
      ],
      [
        "Pericarditis",
        "Mejora sentado, empeora acostado, frote, ST difuso cóncavo",
        "Irradiación MSI, troponina muy elevada"
      ],
      [
        "ERGE",
        "Ardor posprandial, alivia con IBP/antiácido",
        "Relación con esfuerzo, sudoración, troponina ↑"
      ],
      [
        "Costocondritis",
        "Reproducida por la palpación, empeora con movimientos",
        "En reposo, irradiación, sudoración"
      ],
      [
        "Neumotórax",
        "Súbito, pleurítico, MV ↓ unilateral",
        "Bilateral, troponina ↑"
      ]
    ],
    "escalas": [
      {
        "title": "HEART Score — Riesgo MACE en SCA",
        "headers": [
          "Componente",
          "0",
          "1",
          "2"
        ],
        "rows": [
          [
            "H Historia",
            "Inespecífica",
            "Mod sospecha",
            "Altamente sospechosa"
          ],
          [
            "E ECG",
            "Normal",
            "BRI/repol anormal",
            "ST ↑"
          ],
          [
            "A Edad",
            "<45",
            "45-64",
            "≥65"
          ],
          [
            "R Factores de riesgo",
            "0",
            "1-2",
            "≥3 o EAC"
          ],
          [
            "T Troponina",
            "≤LSN",
            ">1-3x LSN",
            ">3x LSN"
          ]
        ],
        "note": "0-3: Bajo riesgo | 4-6: Intermedio | 7-10: Alto riesgo (65% MACE)"
      },
      {
        "title": "Wells TEP",
        "headers": [
          "Criterio",
          "Puntos"
        ],
        "rows": [
          [
            "TVP clínicamente sospechosa",
            "3"
          ],
          [
            "Alternativo menos probable que TEP",
            "3"
          ],
          [
            "FC >100",
            "1.5"
          ],
          [
            "Inmovilización/cirugía <4 sem",
            "1.5"
          ],
          [
            "TVP/TEP previo",
            "1.5"
          ],
          [
            "Hemoptisis",
            "1"
          ],
          [
            "Neoplasia activa",
            "1"
          ]
        ],
        "note": "<2: Baja | 2-6: Intermedia | >6: Alta probabilidad"
      }
    ],
    "conduta": {
      "exames": [
        "ECG 12 derivaciones en <10 min",
        "Troponina I/T ultrasensible (basal + 1-3h)",
        "Hemograma, coagulación",
        "Rx tórax PA",
        "Dímero-D (si TEP — prob baja/intermedia)",
        "Ecocardiograma a pie de cama si inestable"
      ],
      "drugs": [
        "AAS 300 mg masticado (SCA sin contraindicación)",
        "NTG SL 0,5 mg c/5min x3 (PAS>90, sin sildenafil)",
        "Morfina 2-4 mg EV (dolor refractario)",
        "Heparina HBPM (SCA confirmado)",
        "O₂ solo si SpO₂ <94%"
      ],
      "steps": [
        "1. ECG en <10 min — ¿IAMCEST? → activar hemodinamia",
        "2. Acceso EV + monitorización continua",
        "3. Troponina basal + hemograma + coagulación",
        "4. MONA si SCA",
        "5. IAMCEST: angioplastia <90 min o trombólisis <12h",
        "6. Rx tórax para diagnóstico diferencial"
      ]
    }
  }
});
