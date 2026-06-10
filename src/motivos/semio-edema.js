// Motivo: semio-edema — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-edema", {
  "name": "Edema",
  "nameEs": "Edema",
  "icon": "🦵",
  "color": "mc-secondary",
  "rasHighlight": [
    "cardio",
    "genito",
    "resp",
    "digest",
    "pele"
  ],
  "aeaGuide": [
    {
      "q": "Localização?",
      "qEs": "¿Localización?",
      "type": "radio",
      "opts": [
        "MMII bilateral",
        "MMII unilateral",
        "Facial/periorbital",
        "Generalizado (anasarca)",
        "Ascite isolada"
      ],
      "optsEs": [
        "MMII bilateral",
        "MMII unilateral",
        "Facial/periorbitario",
        "Generalizado (anasarca)",
        "Ascitis aislada"
      ]
    },
    {
      "q": "Cacifo (pitting — deixa impressão digital)?",
      "qEs": "¿Fóvea (pitting — deja marca digital)?",
      "type": "yn"
    },
    {
      "q": "Piora com ortostase e melhora com elevação dos MMII?",
      "qEs": "¿Empeora con ortostatismo y mejora con elevación de MMII?",
      "type": "yn"
    },
    {
      "q": "Dispneia ou ortopneia associada (insuficiência cardíaca)?",
      "qEs": "¿Disnea u ortopnea asociada (insuficiencia cardíaca)?",
      "type": "yn"
    },
    {
      "q": "Oligúria ou alteração da cor da urina (nefrótico/nefrítico)?",
      "qEs": "¿Oliguria o alteración del color de la orina (nefrótico/nefrítico)?",
      "type": "yn"
    },
    {
      "q": "Uso de medicamentos (BCC, corticoides, AINEs, hormônios)?",
      "qEs": "¿Uso de medicamentos (BCC, corticoides, AINEs, hormonas)?",
      "type": "input",
      "ph": "Liste os medicamentos",
      "ph2": "Liste los medicamentos"
    },
    {
      "q": "Dor, hiperemia ou calor local (trombose venosa profunda)?",
      "qEs": "¿Dolor, hiperemia o calor local (trombosis venosa profunda)?",
      "type": "yn"
    },
    {
      "q": "Febre ou ferida local (erisipela / linfedema infeccioso)?",
      "qEs": "¿Fiebre o herida local (erisipela / linfedema infeccioso)?",
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
  "guideFrom": "edema"
});
