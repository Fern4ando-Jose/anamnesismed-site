// Motivo: expectoracao — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("expectoracao", {
  "name": "Expectoração",
  "nameEs": "Expectoración",
  "icon": "🫧",
  "color": "mc-primary",
  "rasHighlight": ["resp"],
  "aeaGuide": [
    {
      "q": "Início e duração",
      "qEs": "Inicio y duración",
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
      "q": "Características do escarro (aspecto/cor)",
      "qEs": "Características del esputo (aspecto/color)",
      "type": "radio",
      "opts": [
        "Seroso — líquido, transparente/espumoso (edema pulmonar)",
        "Mucoide — claro/branco, viscoso (bronquite crônica, asma)",
        "Mucopurulento — amarelado (infecção bacteriana inicial)",
        "Purulento — esverdeado/fétido (bacteriana estabelecida)",
        "Sanguinolento/hemoptoico — com sangue",
        "Herrumbroso (enferrujado) — achocolatado (pneumonia pneumocócica)",
        "Numulares (moedas) — coágulos esféricos (TB, bronquiectasia)"
      ],
      "optsEs": [
        "Seroso — líquido, transparente/espumoso (edema pulmonar)",
        "Mucoide — claro/blanco, viscoso (bronquitis crónica, asma)",
        "Mucopurulento — amarillento (infección bacteriana inicial)",
        "Purulento — verdoso/fétido (bacteriana establecida)",
        "Sanguinolento/hemoptoico — con sangre",
        "Herrumbroso (oxidado) — achocolatado (neumonía neumocócica)",
        "Numular (monedas) — coágulos esféricos (TB, bronquiectasia)"
      ]
    },
    {
      "q": "Volume diário estimado de escarro",
      "qEs": "Volumen diario estimado de esputo",
      "type": "radio",
      "opts": [
        "Escasso (< 10 mL/dia — colher de chá)",
        "Moderado (10–150 mL/dia — meia xícara)",
        "Abundante (> 150 mL/dia — bronquiectasia, abscesso)",
        "Vômica — eliminação súbita > 300 mL (ruptura de cavidade)"
      ],
      "optsEs": [
        "Escaso (< 10 mL/día — cucharadita)",
        "Moderado (10–150 mL/día — media taza)",
        "Abundante (> 150 mL/día — bronquiectasia, absceso)",
        "Vómica — eliminación súbita > 300 mL (rotura de cavidad)"
      ]
    },
    {
      "q": "Odor do escarro",
      "qEs": "Olor del esputo",
      "type": "radio",
      "opts": [
        "Inodoro",
        "Fétido/pútrido (anaeróbios — abscesso, bronquiectasia infectada)",
        "Sem referência pelo paciente"
      ],
      "optsEs": [
        "Inodoro",
        "Fétido/pútrido (anaerobios — absceso, bronquiectasia infectada)",
        "Sin referencia por el paciente"
      ]
    },
    {
      "q": "Momento de maior produção",
      "qEs": "Momento de mayor producción",
      "type": "radio",
      "opts": [
        "Matutino (ao acordar) — bronquiectasia, bronquite crônica",
        "Noturno",
        "Contínuo ao longo do dia",
        "Postural (muda com posição) — abscesso, bronquiectasia"
      ],
      "optsEs": [
        "Matutino (al despertar) — bronquiectasia, bronquitis crónica",
        "Nocturno",
        "Continuo a lo largo del día",
        "Postural (cambia con la posición) — absceso, bronquiectasia"
      ]
    },
    {
      "q": "Variação com postura corporal?",
      "qEs": "¿Varía con la postura corporal?",
      "type": "yn"
    },
    {
      "q": "Há sangue no escarro (hemoptise)?",
      "qEs": "¿Hay sangre en el esputo (hemoptisis)?",
      "type": "yn"
    },
    {
      "q": "Tosse associada?",
      "qEs": "¿Tos asociada?",
      "type": "yn"
    },
    {
      "q": "Febre associada?",
      "qEs": "¿Fiebre asociada?",
      "type": "yn"
    },
    {
      "q": "Dispneia associada?",
      "qEs": "¿Disnea asociada?",
      "type": "yn"
    },
    {
      "q": "Dor torácica pleurítica?",
      "qEs": "¿Dolor torácico pleurítico?",
      "type": "yn"
    },
    {
      "q": "Perda de peso não intencional ou sudorese noturna?",
      "qEs": "¿Pérdida de peso no intencional o sudoración nocturna?",
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
        "kw": "ESCARRO",
        "name": "Tipos de escarro e significado clínico",
        "rows": [
          ["Seroso", "Espumoso, rosado → edema agudo de pulmão"],
          ["Mucoide", "Claro/branco → bronquite crônica, asma estável"],
          ["Mucopurulento", "Amarelado → infecção inicial (viral→bacteriana)"],
          ["Purulento", "Esverdeado/fétido → infecção bacteriana"],
          ["Herrumbroso", "Achocolatado → pneumonia pneumocócica"],
          ["Numular", "Moedas esférico → TB, bronquiectasia"]
        ]
      }
    ],
    "ddx": [
      ["Bronquite aguda", "Escarro mucopurulento, febre baixa, IRS prévia, tosse < 3 sem", "Fétido, vômica, perda de peso"],
      ["Pneumonia bacteriana", "Febre alta, crepitantes focais, escarro purulento/herrumbroso", "Crônico, sem febre, vômica"],
      ["DPOC agudizado", "Tabagista, escarro mucopurulento, piora dispneia", "Febre alta, hemoptise franca, jovem"],
      ["Bronquiectasia", "Escarro abundante/fétido matutino, crônico, dedos em baqueta", "Agudo, sem dedos em baqueta"],
      ["Abscesso pulmonar", "Vômica, escarro fétido, febre alta, cavidade Rx", "Crônico, ausência de vômica"],
      ["TB pulmonar", "Crônico, numulares, sudorese noturna, perda de peso", "Agudo febril, sem contato TB"]
    ],
    "conduta": {
      "exames": [
        "Rx tórax PA",
        "Baciloscopia × 3 (se crônico, perda de peso)",
        "Cultura de escarro + antibiograma",
        "Hemograma, PCR, VHS",
        "TC de tórax (se bronquiectasia suspeita ou cavitação)",
        "Oximetria de pulso"
      ],
      "steps": [
        "1. Caracterizar: aspecto, volume, odor, horário",
        "2. Escarro fétido + vômica → suspeitar abscesso/bronquiectasia",
        "3. Herrumbroso → pesquisar pneumococo",
        "4. Numulares + crônico → investigar TB",
        "5. Escarro espumoso rosado → emergência: EAP"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Tipos de esputo y significado clínico",
        "rows": [
          ["Seroso", "Espumoso, rosado → edema agudo de pulmón"],
          ["Mucoide", "Claro/blanco → bronquitis crónica, asma estable"],
          ["Mucopurulento", "Amarillento → infección inicial (viral→bacteriana)"],
          ["Purulento", "Verdoso/fétido → infección bacteriana establecida"],
          ["Herrumbroso", "Achocolatado → neumonía neumocócica"],
          ["Numular", "Esferas (monedas) → TB, bronquiectasia"]
        ]
      }
    ],
    "ddx": [
      ["Bronquitis aguda", "Esputo mucopurulento, fiebre baja, IRS previa, tos < 3 sem", "Fétido, vómica, pérdida de peso"],
      ["Neumonía bacteriana", "Fiebre alta, crepitantes focales, esputo purulento/herrumbroso", "Crónico, sin fiebre, vómica"],
      ["EPOC agudizado", "Fumador, esputo mucopurulento, empeoramiento disnea", "Fiebre alta, hemoptisis franca, joven"],
      ["Bronquiectasia", "Esputo abundante/fétido matutino, crónico, dedos en palillo", "Agudo, sin dedos en palillo"],
      ["Absceso pulmonar", "Vómica, esputo fétido, fiebre alta, cavidad en Rx", "Crónico, sin vómica"],
      ["TB pulmonar", "Crónico, esputo numular, sudoración nocturna, pérdida de peso", "Agudo febril, sin contacto TB"]
    ],
    "conduta": {
      "exames": [
        "Rx tórax PA",
        "Baciloscopía × 3 (si crónico, pérdida de peso)",
        "Cultivo de esputo + antibiograma",
        "Hemograma, PCR, VSG",
        "TC tórax (si bronquiectasia sospechada o cavitación)",
        "Oximetría de pulso"
      ],
      "steps": [
        "1. Caracterizar: aspecto, volumen, olor, horario",
        "2. Esputo fétido + vómica → sospechar absceso/bronquiectasia",
        "3. Herrumbroso → pesquisar neumococo",
        "4. Numular + crónico → investigar TB",
        "5. Espumoso rosado → emergencia: EAP"
      ]
    }
  }
});
