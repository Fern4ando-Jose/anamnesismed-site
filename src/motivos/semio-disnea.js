// Motivo: semio-disnea — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-disnea", {
  "name": "Dispneia",
  "nameEs": "Disnea",
  "icon": "🫁",
  "color": "mc-primary",
  "rasHighlight": [
    "resp",
    "cardio"
  ],
  "aeaGuide": [
    {
      "q": "Início?",
      "qEs": "¿Inicio?",
      "type": "radio",
      "opts": [
        "Súbito (minutos)",
        "Progressivo (horas/dias)",
        "Crônico (semanas/meses)"
      ],
      "optsEs": [
        "Súbito (minutos)",
        "Progresivo (horas/días)",
        "Crónico (semanas/meses)"
      ]
    },
    {
      "q": "Grau de dispneia (MRC)?",
      "qEs": "¿Grado de disnea (MRC)?",
      "type": "radio",
      "opts": [
        "Grau 1 — só esforço intenso",
        "Grau 2 — sobe escadas/ladeiras",
        "Grau 3 — caminhada plana em ritmo normal",
        "Grau 4 — repouso ou mínimo esforço"
      ],
      "optsEs": [
        "Grado 1 — solo esfuerzo intenso",
        "Grado 2 — sube escaleras/cuestas",
        "Grado 3 — caminata plana a ritmo normal",
        "Grado 4 — reposo o mínimo esfuerzo"
      ]
    },
    {
      "q": "Ortopneia (dispneia ao deitar)?",
      "qEs": "¿Ortopnea (disnea al acostarse)?",
      "type": "yn"
    },
    {
      "q": "Dispneia paroxística noturna (acorda com falta de ar)?",
      "qEs": "¿Disnea paroxística nocturna (se despierta con falta de aire)?",
      "type": "yn"
    },
    {
      "q": "Sibilos ou chiado no peito?",
      "qEs": "¿Sibilancias o pito en el pecho?",
      "type": "yn"
    },
    {
      "q": "Tosse associada?",
      "qEs": "¿Tos asociada?",
      "type": "yn"
    },
    {
      "q": "Tosse — desde quando?",
      "qEs": "Tos — ¿desde cuándo?",
      "type": "radio",
      "opts": [
        "Aguda (< 3 semanas)",
        "Subaguda (3–8 semanas)",
        "Crônica (> 8 semanas)"
      ],
      "optsEs": [
        "Aguda (< 3 semanas)",
        "Subaguda (3–8 semanas)",
        "Crónica (> 8 semanas)"
      ]
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
      "q": "Predomínio noturno da tosse?",
      "qEs": "¿Predominio nocturno de la tos?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Dor torácica associada?",
      "qEs": "¿Dolor torácico asociado?",
      "type": "yn"
    },
    {
      "q": "Edema de membros inferiores?",
      "qEs": "¿Edema de miembros inferiores?",
      "type": "yn"
    },
    {
      "q": "Tabagismo ou exposição ocupacional (poeiras, gases)?",
      "qEs": "¿Tabaquismo o exposición ocupacional (polvos, gases)?",
      "type": "input",
      "ph": "Anos / maços-ano / tipo de exposição",
      "ph2": "Años / paquetes-año / tipo de exposición"
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
  "guideFrom": "dispneia"
});
