// Motivo: semio-peso — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-peso", {
  "name": "Perda / Ganho de Peso",
  "nameEs": "Pérdida / Ganancia de Peso",
  "icon": "⚖️",
  "color": "mc-secondary",
  "aeaGuide": [
    {
      "q": "Quanto kg? Em quanto tempo?",
      "qEs": "¿Cuántos kg? ¿En cuánto tiempo?",
      "type": "input",
      "ph": "Ex: −8 kg em 2 meses / +5 kg em 1 mês",
      "ph2": "Ej: −8 kg en 2 meses / +5 kg en 1 mes"
    },
    {
      "q": "A variação de peso foi intencional?",
      "qEs": "¿La variación de peso fue intencional?",
      "type": "yn"
    },
    {
      "q": "Apetite?",
      "qEs": "¿Apetito?",
      "type": "radio",
      "opts": [
        "Aumentado (hiperfagia)",
        "Diminuído / anorexia",
        "Normal"
      ],
      "optsEs": [
        "Aumentado (hiperfagia)",
        "Disminuido / anorexia",
        "Normal"
      ]
    },
    {
      "q": "Poliúria e polidipsia (diabetes)?",
      "qEs": "¿Poliuria y polidipsia (diabetes)?",
      "type": "yn"
    },
    {
      "q": "Sudorese, taquicardia, tremores, nervosismo (hipertireoidismo)?",
      "qEs": "¿Sudoración, taquicardia, temblores, nerviosismo (hipertiroidismo)?",
      "type": "yn"
    },
    {
      "q": "Intolerância ao frio, fadiga, obstipação (hipotireoidismo)?",
      "qEs": "¿Intolerancia al frío, fatiga, estreñimiento (hipotiroidismo)?",
      "type": "yn"
    },
    {
      "q": "Sintomas digestivos associados?",
      "qEs": "¿Síntomas digestivos asociados?",
      "type": "multi",
      "opts": [
        "Disfagia",
        "Diarreia crônica",
        "Náuseas/vômitos",
        "Sangue nas fezes",
        "Esteatorreia"
      ],
      "optsEs": [
        "Disfagia",
        "Diarrea crónica",
        "Náuseas/vómitos",
        "Sangre en heces",
        "Esteatorrea"
      ]
    },
    {
      "q": "Febre, sudorese noturna ou adenomegalia (neoplasia / infecção crônica)?",
      "qEs": "¿Fiebre, sudoración nocturna o adenomegalias (neoplasia / infección crónica)?",
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
  "guideFrom": "perda-peso"
});
