// Motivo: hemorragia-digestiva-alta — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("hemorragia-digestiva-alta", {
  "name": "Hemorragia Digestiva Alta",
  "nameEs": "Hemorragia Digestiva Alta",
  "icon": "🩸",
  "color": "mc-danger",
  "rasHighlight": [
    "digest"
  ],
  "aeaGuide": [
    {
      "q": "Apresentação principal",
      "qEs": "Presentación principal",
      "type": "radio",
      "opts": [
        "Hematêmese (vômito com sangue)",
        "Melena (fezes negras e fétidas)",
        "Hematêmese + melena",
        "Sangue oculto / não identificado"
      ],
      "optsEs": [
        "Hematemesis (vómito con sangre)",
        "Melena (heces negras y fétidas)",
        "Hematemesis + melena",
        "Sangre oculta / no identificada"
      ]
    },
    {
      "q": "Caráter do sangue no vômito",
      "qEs": "Carácter de la sangre en el vómito",
      "type": "radio",
      "opts": [
        "Vermelho vivo (sangramento ativo)",
        "Em borra de café (sangramento mais lento / coagulado)",
        "Não houve hematêmese"
      ],
      "optsEs": [
        "Rojo vivo (sangrado activo)",
        "En posos de café (sangrado más lento / coagulado)",
        "No hubo hematemesis"
      ]
    },
    {
      "q": "Volume estimado do sangramento",
      "qEs": "Volumen estimado del sangrado",
      "type": "radio",
      "opts": [
        "Pequeno — manchas / traços (<100 mL)",
        "Moderado (200–500 mL)",
        "Grande — jatos ou múltiplos episódios (>500 mL)"
      ],
      "optsEs": [
        "Pequeño — manchas / trazas (<100 mL)",
        "Moderado (200–500 mL)",
        "Grande — chorros o múltiples episodios (>500 mL)"
      ]
    },
    {
      "q": "Dor epigástrica ou abdominal prévia ao sangramento?",
      "qEs": "¿Dolor epigástrico o abdominal previo al sangrado?",
      "type": "yn"
    },
    {
      "q": "Sinais de instabilidade: tontura, pré-síncope, sudorese fria, palidez, taquicardia?",
      "qEs": "¿Signos de inestabilidad: mareo, presíncope, sudoración fría, palidez, taquicardia?",
      "type": "yn"
    },
    {
      "q": "Vômitos fortes e repetidos antes do sangramento (síndrome de Mallory-Weiss)?",
      "qEs": "¿Vómitos intensos y repetidos antes del sangrado (síndrome de Mallory-Weiss)?",
      "type": "yn"
    },
    {
      "q": "Episódios semelhantes anteriores? Como foram tratados?",
      "qEs": "¿Episodios similares anteriores? ¿Cómo fueron tratados?",
      "type": "input",
      "ph": "Descreva episódios e tratamento anterior",
      "ph2": "Describa episodios y tratamiento anterior"
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
        "kw": "VARIZ x NÃO-VARIZ",
        "name": "Causas de HDA",
        "rows": [
          [
            "U",
            "Úlcera péptica",
            "Causa mais comum (gástrica/duodenal) — não varicosa"
          ],
          [
            "V",
            "Varizes",
            "Esofágicas/gástricas — hipertensão portal"
          ],
          [
            "M",
            "Mallory-Weiss",
            "Laceração após vômitos repetidos"
          ],
          [
            "E",
            "Esofagite/gastrite",
            "Erosões, AINEs, álcool"
          ],
          [
            "N",
            "Neoplasia",
            "Tumor gástrico/esofágico sangrante"
          ],
          [
            "D",
            "Dieulafoy",
            "Artéria submucosa anômala"
          ]
        ]
      },
      {
        "kw": "ABCDE",
        "name": "Abordagem inicial do sangramento",
        "rows": [
          [
            "A",
            "Airway",
            "Proteger via aérea (rebaixamento/hematêmese maciça)"
          ],
          [
            "B",
            "Breathing",
            "Oxigenação"
          ],
          [
            "C",
            "Circulation",
            "2 acessos calibrosos, cristaloides, hemoderivados"
          ],
          [
            "D",
            "Drugs",
            "IBP EV; vasoativo (terlipressina/octreotide) se suspeita varicosa"
          ],
          [
            "E",
            "Endoscopia",
            "Diagnóstica e terapêutica nas primeiras 24h"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Toque retal",
        "subtitle": "Caracterizar o sangramento",
        "steps": [
          "Realizar toque retal",
          "Avaliar presença de melena ou sangue"
        ],
        "normal": "Fezes de cor normal",
        "abnormal": "Melena (fezes negras, fétidas) → confirma HDA"
      },
      {
        "title": "Avaliação hemodinâmica",
        "subtitle": "Estimar a perda",
        "steps": [
          "Aferir PA e FC deitado e em pé (teste ortostático)",
          "Avaliar perfusão, nível de consciência, diurese"
        ],
        "normal": "Sem alterações posturais",
        "abnormal": "Queda de PA / taquicardia postural → perda volêmica significativa"
      },
      {
        "title": "Sondagem nasogástrica (seletiva)",
        "subtitle": "Confirmar fonte alta",
        "steps": [
          "Passar SNG e aspirar conteúdo",
          "Avaliar presença de sangue/borra de café"
        ],
        "normal": "Aspirado claro/bilioso",
        "abnormal": "Sangue vivo/borra de café → confirma fonte alta (aspirado limpo não exclui)"
      }
    ],
    "sinais": [
      {
        "name": "Hematêmese",
        "eponym": "HDA",
        "how": "Vômito de sangue vivo ou em \"borra de café\"",
        "means": "Sangramento acima do ângulo de Treitz"
      },
      {
        "name": "Melena",
        "eponym": "HDA",
        "how": "Fezes enegrecidas, pastosas e fétidas",
        "means": "Sangue digerido — geralmente fonte alta"
      },
      {
        "name": "Estigmas de hepatopatia",
        "eponym": "HDA varicosa",
        "how": "Ascite, circulação colateral, aranhas vasculares, eritema palmar",
        "means": "Sugere varizes por hipertensão portal"
      }
    ],
    "ddx": [
      [
        "Úlcera péptica",
        "Epigastralgia, uso de AINE, H. pylori, melena",
        "Estigmas de hepatopatia, hematêmese volumosa em jato"
      ],
      [
        "Varizes esofágicas",
        "Hepatopata, hematêmese volumosa, sinais de HP",
        "Dor epigástrica prévia, sem hepatopatia"
      ],
      [
        "Mallory-Weiss",
        "Hematêmese após vômitos repetidos/álcool",
        "Sangramento sem história de vômitos prévios"
      ],
      [
        "Gastrite erosiva",
        "AINE, álcool, estresse, sangramento em babação",
        "Sangramento arterial pulsátil volumoso"
      ],
      [
        "Neoplasia gástrica",
        "Perda de peso, saciedade precoce, anemia crônica",
        "Quadro agudo sem sintomas consumptivos"
      ],
      [
        "Lesão de Dieulafoy",
        "Sangramento maciço recorrente sem úlcera evidente",
        "Úlcera/varizes identificadas à EDA"
      ],
      [
        "HDA x HDB",
        "Aspirado/SNG com sangue, melena, ureia/creatinina ↑",
        "Sangue vivo retal (hematoquezia) com fonte baixa"
      ]
    ],
    "escalas": [
      {
        "title": "Escore de Glasgow-Blatchford (triagem)",
        "headers": [
          "Variável",
          "Pontua se"
        ],
        "rows": [
          [
            "Ureia",
            "Elevada"
          ],
          [
            "Hemoglobina",
            "Baixa"
          ],
          [
            "PA sistólica",
            "<110"
          ],
          [
            "Outros",
            "FC≥100, melena, síncope, hepatopatia, ICC"
          ]
        ],
        "note": "Escore 0-1 → baixo risco, possível manejo ambulatorial; ≥7 → alto risco"
      },
      {
        "title": "Rockall (pós-endoscopia)",
        "headers": [
          "Componente",
          "Avalia"
        ],
        "rows": [
          [
            "Idade",
            "Faixa etária"
          ],
          [
            "Choque",
            "PA/FC"
          ],
          [
            "Comorbidades",
            "Cardiopatia, hepatopatia, neoplasia"
          ],
          [
            "Diagnóstico e estigmas",
            "Achados endoscópicos / Forrest"
          ]
        ],
        "note": "Estima risco de ressangramento e mortalidade"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma seriado, tipagem e prova cruzada",
        "Coagulograma, ureia/creatinina (ureia ↑ na HDA), eletrólitos",
        "Função hepática se suspeita varicosa",
        "Endoscopia digestiva alta (diagnóstica + terapêutica) em até 24h"
      ],
      "drugs": [
        "Ressuscitação volêmica + hemoderivados (alvo Hb ~7, restritivo)",
        "IBP EV (omeprazol/pantoprazol) em bolus + infusão",
        "HDA varicosa: terlipressina/octreotide + ATB profilático (ceftriaxona)",
        "Suspender anticoagulantes/AINEs; corrigir coagulopatia"
      ],
      "steps": [
        "1. Estabilizar: ABC, 2 acessos calibrosos, reposição volêmica",
        "2. Avaliar gravidade (Glasgow-Blatchford) e transfundir com alvo restritivo",
        "3. IBP EV; se suspeita varicosa, vasoativo + ATB",
        "4. Endoscopia em até 24h (12h se varicosa/instável)",
        "5. Tratamento endoscópico (clipe, escleroterapia, ligadura); cirurgia/radiologia se refratário"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de HDA",
        "rows": [
          [
            "Úlcera péptica",
            "Causa más común (gástrica/duodenal) — no varicosa"
          ],
          [
            "Várices",
            "Esofágicas/gástricas — hipertensión portal"
          ],
          [
            "Mallory-Weiss",
            "Laceración tras vómitos repetidos"
          ],
          [
            "Esofagitis/gastritis",
            "Erosiones, AINEs, alcohol"
          ],
          [
            "Neoplasia",
            "Tumor gástrico/esofágico sangrante"
          ],
          [
            "Dieulafoy",
            "Arteria submucosa anómala"
          ]
        ]
      },
      {
        "name": "Abordaje inicial del sangrado",
        "rows": [
          [
            "Airway",
            "Proteger la vía aérea (deterioro de conciencia/hematemesis masiva)"
          ],
          [
            "Breathing",
            "Oxigenación"
          ],
          [
            "Circulation",
            "2 accesos calibrosos, cristaloides, hemoderivados"
          ],
          [
            "Drugs",
            "IBP EV; vasoactivo (terlipresina/octreotida) si sospecha varicosa"
          ],
          [
            "Endoscopia",
            "Diagnóstica y terapéutica en las primeras 24h"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Tacto rectal",
        "subtitle": "Caracterizar el sangrado",
        "steps": [
          "Realizar tacto rectal",
          "Evaluar presencia de melena o sangre"
        ],
        "normal": "Heces de color normal",
        "abnormal": "Melena (heces negras, fétidas) → confirma HDA"
      },
      {
        "title": "Evaluación hemodinámica",
        "subtitle": "Estimar la pérdida",
        "steps": [
          "Medir PA y FC acostado y de pie (prueba ortostática)",
          "Evaluar perfusión, nivel de conciencia, diuresis"
        ],
        "normal": "Sin alteraciones posturales",
        "abnormal": "Caída de PA / taquicardia postural → pérdida volémica significativa"
      },
      {
        "title": "Sondaje nasogástrico (selectivo)",
        "subtitle": "Confirmar fuente alta",
        "steps": [
          "Pasar SNG y aspirar contenido",
          "Evaluar presencia de sangre/poso de café"
        ],
        "normal": "Aspirado claro/bilioso",
        "abnormal": "Sangre fresca/poso de café → confirma fuente alta (un aspirado limpio no la excluye)"
      }
    ],
    "sinais": [
      {
        "name": "Hematemesis",
        "eponym": "HDA",
        "how": "Vómito de sangre fresca o en \"poso de café\"",
        "means": "Sangrado por encima del ángulo de Treitz"
      },
      {
        "name": "Melena",
        "eponym": "HDA",
        "how": "Heces ennegrecidas, pastosas y fétidas",
        "means": "Sangre digerida — generalmente fuente alta"
      },
      {
        "name": "Estigmas de hepatopatía",
        "eponym": "HDA varicosa",
        "how": "Ascitis, circulación colateral, arañas vasculares, eritema palmar",
        "means": "Sugiere várices por hipertensión portal"
      }
    ],
    "ddx": [
      [
        "Úlcera péptica",
        "Epigastralgia, uso de AINE, H. pylori, melena",
        "Estigmas de hepatopatía, hematemesis voluminosa en chorro"
      ],
      [
        "Várices esofágicas",
        "Hepatópata, hematemesis voluminosa, signos de HP",
        "Dolor epigástrico previo, sin hepatopatía"
      ],
      [
        "Mallory-Weiss",
        "Hematemesis tras vómitos repetidos/alcohol",
        "Sangrado sin antecedente de vómitos previos"
      ],
      [
        "Gastritis erosiva",
        "AINE, alcohol, estrés, sangrado en babeo",
        "Sangrado arterial pulsátil voluminoso"
      ],
      [
        "Neoplasia gástrica",
        "Pérdida de peso, saciedad precoz, anemia crónica",
        "Cuadro agudo sin síntomas consumptivos"
      ],
      [
        "Lesión de Dieulafoy",
        "Sangrado masivo recurrente sin úlcera evidente",
        "Úlcera/várices identificadas en la EDA"
      ],
      [
        "HDA x HDB",
        "Aspirado/SNG con sangre, melena, urea/creatinina ↑",
        "Sangre fresca rectal (hematoquecia) con fuente baja"
      ]
    ],
    "escalas": [
      {
        "title": "Escore de Glasgow-Blatchford (triaje)",
        "headers": [
          "Variable",
          "Puntúa si"
        ],
        "rows": [
          [
            "Urea",
            "Elevada"
          ],
          [
            "Hemoglobina",
            "Baja"
          ],
          [
            "PA sistólica",
            "<110"
          ],
          [
            "Otros",
            "FC≥100, melena, síncope, hepatopatía, ICC"
          ]
        ],
        "note": "Escore 0-1 → bajo riesgo, posible manejo ambulatorio; ≥7 → alto riesgo"
      },
      {
        "title": "Rockall (posendoscopia)",
        "headers": [
          "Componente",
          "Evalúa"
        ],
        "rows": [
          [
            "Edad",
            "Franja etaria"
          ],
          [
            "Shock",
            "PA/FC"
          ],
          [
            "Comorbilidades",
            "Cardiopatía, hepatopatía, neoplasia"
          ],
          [
            "Diagnóstico y estigmas",
            "Hallazgos endoscópicos / Forrest"
          ]
        ],
        "note": "Estima el riesgo de resangrado y mortalidad"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma seriado, tipificación y prueba cruzada",
        "Coagulograma, urea/creatinina (urea ↑ en la HDA), electrolitos",
        "Función hepática si sospecha varicosa",
        "Endoscopia digestiva alta (diagnóstica + terapéutica) en hasta 24h"
      ],
      "drugs": [
        "Resucitación volémica + hemoderivados (objetivo Hb ~7, restrictivo)",
        "IBP EV (omeprazol/pantoprazol) en bolo + infusión",
        "HDA varicosa: terlipresina/octreotida + ATB profiláctico (ceftriaxona)",
        "Suspender anticoagulantes/AINEs; corregir coagulopatía"
      ],
      "steps": [
        "1. Estabilizar: ABC, 2 accesos calibrosos, reposición volémica",
        "2. Evaluar gravedad (Glasgow-Blatchford) y transfundir con objetivo restrictivo",
        "3. IBP EV; si sospecha varicosa, vasoactivo + ATB",
        "4. Endoscopia en hasta 24h (12h si varicosa/inestable)",
        "5. Tratamiento endoscópico (clip, escleroterapia, ligadura); cirugía/radiología si refractario"
      ]
    }
  }
});
