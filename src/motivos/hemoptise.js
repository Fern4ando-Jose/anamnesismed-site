// Motivo: hemoptise — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("hemoptise", {
  "name": "Hemoptise",
  "nameEs": "Hemoptisis",
  "icon": "🩸",
  "color": "mc-danger",
  "rasHighlight": ["resp", "cardio"],
  "aeaGuide": [
    {
      "q": "Confirmação: sangue é de origem respiratória?",
      "qEs": "Confirmación: ¿la sangre es de origen respiratorio?",
      "type": "radio",
      "opts": [
        "Sim — escarrado com tosse, espumoso, rutilante (vivo)",
        "Possível epistaxe deglutida — sangue pelo nariz/garganta",
        "Possível hematêmese — vômito com sangue escuro/borra de café",
        "Incerto"
      ],
      "optsEs": [
        "Sí — expectorado con tos, espumoso, rutilante (vivo)",
        "Posible epistaxis deglutida — sangre por nariz/garganta",
        "Posible hematemesis — vómito con sangre oscura/borra de café",
        "Incierto"
      ]
    },
    {
      "q": "Volume estimado de sangue expectorado",
      "qEs": "Volumen estimado de sangre expectorada",
      "type": "radio",
      "opts": [
        "Laivos (estrias) — hemoptise mínima / escarro hemoptoico",
        "< 250 mL/24h — hemoptise leve (não compromete via aérea)",
        "250–500 mL/24h — hemoptise moderada (vigilância intensiva)",
        "500–600 mL/24h — hemoptise grave (risco de asfixia)",
        "> 600 mL/24h — hemoptise fulminante (emergência)"
      ],
      "optsEs": [
        "Estrías — hemoptisis mínima / esputo hemoptoico",
        "< 250 mL/24h — hemoptisis leve (no compromete la vía aérea)",
        "250–500 mL/24h — hemoptisis moderada (vigilancia intensiva)",
        "500–600 mL/24h — hemoptisis grave (riesgo de asfixia)",
        "> 600 mL/24h — hemoptisis fulminante (emergencia)"
      ]
    },
    {
      "q": "Início do episódio atual",
      "qEs": "Inicio del episodio actual",
      "type": "radio",
      "opts": [
        "Súbito (sem aviso)",
        "Precedido de tosse ou esforço",
        "Gradual — escarro cada vez mais sanguinolento",
        "Episódios recorrentes"
      ],
      "optsEs": [
        "Súbito (sin aviso)",
        "Precedido de tos o esfuerzo",
        "Gradual — esputo progresivamente sanguinolento",
        "Episodios recurrentes"
      ]
    },
    {
      "q": "Cor do sangue expectorado",
      "qEs": "Color de la sangre expectorada",
      "type": "radio",
      "opts": [
        "Vermelho vivo / rutilante",
        "Rosado/espumoso (edema pulmonar)",
        "Escuro/acastanhado",
        "Misto (variável)"
      ],
      "optsEs": [
        "Rojo vivo / rutilante",
        "Rosado/espumoso (edema pulmonar)",
        "Oscuro/achocolatado",
        "Mixto (variable)"
      ]
    },
    {
      "q": "Tosse precedendo ou acompanhando?",
      "qEs": "¿Tos precediendo o acompañando?",
      "type": "yn"
    },
    {
      "q": "Dor torácica pleurítica (piora à respiração/tosse)?",
      "qEs": "¿Dolor torácico pleurítico (empeora con la respiración/tos)?",
      "type": "yn"
    },
    {
      "q": "Dispneia associada?",
      "qEs": "¿Disnea asociada?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Sintomas constitucionais (perda de peso, sudorese noturna, fadiga)?",
      "qEs": "¿Síntomas constitucionales (pérdida de peso, sudoración nocturna, fatiga)?",
      "type": "yn"
    },
    {
      "q": "Trauma torácico recente?",
      "qEs": "¿Trauma torácico reciente?",
      "type": "yn"
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
        "kw": "Classificação por volume",
        "name": "Hemoptise — gravidade",
        "rows": [
          ["Mínima/laivos", "Estrias — baixo risco imediato"],
          ["Leve", "< 250 mL/24h — investigar causa, sem risco asfixia"],
          ["Moderada", "250–500 mL/24h — internação, vigilância intensiva"],
          ["Grave", "500–600 mL/24h — UTI, broncoscopia urgente"],
          ["Fulminante", "> 600 mL/24h — morte por asfixia — emergência"]
        ]
      },
      {
        "kw": "Causas por frequência",
        "name": "Etiologia da hemoptise",
        "rows": [
          ["Bronquite/DPOC", "Causa mais comum (escarro hemoptoico leve)"],
          ["Carcinoma broncogênico", "2ª causa — adulto tabagista > 40 anos"],
          ["Bronquiectasia", "Volume alto, matutino, crônico"],
          ["TB ativa ou cicatriz", "Contato TB, sintomas B, nódulo/cavidade"],
          ["TEP", "Pleurítica + DVT + taquicardia + D-Dímero ↑"],
          ["Estenose mitral", "Dispneia de esforço, sopro mitral, ortopneia"]
        ]
      }
    ],
    "sinais": [
      {
        "name": "Hemoptise fulminante",
        "eponym": "Emergência",
        "how": "> 600 mL/24h ou obstrução de via aérea",
        "means": "Decúbito lateral para o lado da lesão — isolar pulmão são; considerar intubação + broncoscopia rígida"
      },
      {
        "name": "Cianose + taquicardia",
        "eponym": "Comprometimento hemodinâmico",
        "how": "SpO₂ < 90%, FC > 120",
        "means": "Hemoptise comprometendo ventilação — UTI urgente"
      }
    ],
    "ddx": [
      ["Bronquite crônica/DPOC", "Tabagista, escarro hemoptoico leve, crônico, sem perda de peso", "Volume alto, massa Rx, perda de peso"],
      ["Carcinoma broncogênico", "Tabagista > 40 anos, perda de peso, massa Rx, linfonodomegalia", "Jovem, sem tabagismo, febre alta"],
      ["TB pulmonar", "Contato TB, sudorese noturna, perda de peso, cavidade Rx", "Sem contato, agudo febril sem sintomas B"],
      ["Bronquiectasia", "Escarro abundante fétido matutino, dedos em baqueta, histórico desde infância", "Agudo, sem escarro abundante"],
      ["TEP", "Pleurítica, TVP, taquicardia, D-Dímero ↑, hipoxemia", "Febre alta, cavidade Rx, perda de peso"],
      ["Estenose mitral", "Sopro mitral, ortopneia, FA, dispneia de esforço", "Sem cardiopatia, sem sopro"]
    ],
    "conduta": {
      "exames": [
        "Rx tórax PA (urgente)",
        "Oximetria + gasometria arterial",
        "Hemograma, coagulograma, tipagem sanguínea",
        "TC de tórax com contraste",
        "Broncoscopia (localizar sítio de sangramento)",
        "Baciloscopia × 3 (se crônico, perda de peso)",
        "D-Dímero + AngioTC (se suspeita TEP)"
      ],
      "drugs": [
        "O₂ para SpO₂ ≥94%",
        "Acesso EV calibroso — reposição se instabilidade",
        "Ácido tranexâmico 1g EV (hemoptise moderada/grave)",
        "Reverter anticoagulação se causa"
      ],
      "steps": [
        "1. Confirmar origem respiratória (vs epistaxe deglutida / hematêmese)",
        "2. Estimar volume — leve/moderada/grave/fulminante",
        "3. Posicionar decúbito lateral para o lado da lesão (se conhecido)",
        "4. Oximetria, acesso EV, Rx tórax urgente",
        "5. TC tórax + broncoscopia para localizar e tratar sítio",
        "6. UTI se > 300 mL/24h ou instabilidade hemodinâmica"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Hemoptisis — clasificación por volumen",
        "rows": [
          ["Mínima/estrías", "Bajo riesgo inmediato — investigar causa"],
          ["Leve", "< 250 mL/24h — hospitalizar, sin riesgo de asfixia"],
          ["Moderada", "250–500 mL/24h — internación, vigilancia intensiva"],
          ["Grave", "500–600 mL/24h — UCI, broncoscopia urgente"],
          ["Fulminante", "> 600 mL/24h — muerte por asfixia — emergencia"]
        ]
      }
    ],
    "ddx": [
      ["Bronquitis crónica/EPOC", "Fumador, esputo hemoptoico leve, crónico, sin pérdida de peso", "Volumen alto, masa Rx, pérdida de peso"],
      ["Carcinoma broncogénico", "Fumador > 40 años, pérdida de peso, masa Rx, adenopatías", "Joven, sin tabaquismo, fiebre alta"],
      ["TB pulmonar", "Contacto TB, sudoración nocturna, pérdida de peso, cavidad Rx", "Sin contacto, agudo febril sin síntomas B"],
      ["Bronquiectasia", "Esputo abundante fétido matutino, dedos en palillo, desde infancia", "Agudo, sin esputo abundante"],
      ["TEP", "Pleurítico, TVP, taquicardia, Dímero-D ↑, hipoxemia", "Fiebre alta, cavidad Rx, pérdida de peso"],
      ["Estenosis mitral", "Soplo mitral, ortopnea, FA, disnea de esfuerzo", "Sin cardiopatía, sin soplo"]
    ],
    "conduta": {
      "exames": [
        "Rx tórax PA (urgente)",
        "Oximetría + gasometría arterial",
        "Hemograma, coagulograma, tipificación sanguínea",
        "TC tórax con contraste",
        "Broncoscopia (localizar sitio de sangrado)",
        "Baciloscopía × 3 (si crónico, pérdida de peso)",
        "Dímero-D + AngioTC (si sospecha TEP)"
      ],
      "steps": [
        "1. Confirmar origen respiratorio (vs epistaxis deglutida / hematemesis)",
        "2. Estimar volumen — leve/moderada/grave/fulminante",
        "3. Posición en decúbito lateral hacia el lado de la lesión (si conocido)",
        "4. Oximetría, acceso EV, Rx tórax urgente",
        "5. TC tórax + broncoscopia para localizar y tratar el sitio",
        "6. UCI si > 300 mL/24h o inestabilidad hemodinámica"
      ]
    }
  }
});
