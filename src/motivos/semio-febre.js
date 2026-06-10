// Motivo: semio-febre — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-febre", {
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
      "q": "Temperatura máxima registrada?",
      "qEs": "¿Temperatura máxima registrada?",
      "type": "input",
      "ph": "°C — se não medida, descrever como subjetiva",
      "ph2": "°C — si no medida, describir como subjetiva"
    },
    {
      "q": "Padrão da febre?",
      "qEs": "¿Patrón de la fiebre?",
      "type": "radio",
      "opts": [
        "Contínua (não normaliza)",
        "Remitente (cai mas não normaliza)",
        "Intermitente (normaliza entre picos)",
        "Héctica/séptica (oscilações com calafrios intensos)"
      ],
      "optsEs": [
        "Continua (no normaliza)",
        "Remitente (baja pero no normaliza)",
        "Intermitente (normaliza entre picos)",
        "Héctica/séptica (oscilaciones con escalofríos intensos)"
      ]
    },
    {
      "q": "Calafrios e tremores?",
      "qEs": "¿Escalofríos y temblores?",
      "type": "yn"
    },
    {
      "q": "Sudorese (especialmente noturna)?",
      "qEs": "¿Sudoración (especialmente nocturna)?",
      "type": "yn"
    },
    {
      "q": "Focos infecciosos identificados?",
      "qEs": "¿Focos infecciosos identificados?",
      "type": "multi",
      "opts": [
        "Odinofagia/faringite",
        "Tosse/dispneia (pulmonar)",
        "Disúria/polaciúria (urinário)",
        "Dor abdominal (digestivo)",
        "Secreção ou ferida local"
      ],
      "optsEs": [
        "Odinofagia/faringitis",
        "Tos/disnea (pulmonar)",
        "Disuria/polaquiuria (urinario)",
        "Dolor abdominal (digestivo)",
        "Secreción o herida local"
      ]
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
      "q": "Dispneia associada à tosse?",
      "qEs": "¿Disnea asociada a la tos?",
      "type": "yn"
    },
    {
      "q": "Viagens recentes ou contato com animais?",
      "qEs": "¿Viajes recientes o contacto con animales?",
      "type": "input",
      "ph": "Local da viagem / tipo de animal",
      "ph2": "Lugar del viaje / tipo de animal"
    },
    {
      "q": "Uso de medicamentos ou internação recente?",
      "qEs": "¿Uso de medicamentos o internación reciente?",
      "type": "input",
      "ph": "Liste medicamentos e data de internação",
      "ph2": "Liste medicamentos y fecha de internación"
    },
    {
      "q": "Imunossupressão ou doenças de base (HIV, neoplasia, corticoides)?",
      "qEs": "¿Inmunosupresión o enfermedades de base (HIV, neoplasia, corticoides)?",
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
  "guideFrom": "febre"
});
