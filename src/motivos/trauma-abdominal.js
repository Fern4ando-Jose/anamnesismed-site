// Motivo: trauma-abdominal — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("trauma-abdominal", {
  "name": "Trauma Abdominal",
  "nameEs": "Trauma Abdominal",
  "icon": "⚠️",
  "color": "mc-danger",
  "rasHighlight": [
    "digest",
    "motor",
    "cardio"
  ],
  "aeaGuide": [
    {
      "q": "Mecanismo do trauma",
      "qEs": "Mecanismo del trauma",
      "type": "radio",
      "opts": [
        "Contuso — colisão veicular (ocupante)",
        "Contuso — atropelamento",
        "Contuso — queda de altura",
        "Contuso — impacto direto / agressão física",
        "Penetrante — arma branca",
        "Penetrante — arma de fogo",
        "Misto"
      ],
      "optsEs": [
        "Contuso — colisión vehicular (ocupante)",
        "Contuso — atropellamiento",
        "Contuso — caída de altura",
        "Contuso — impacto directo / agresión física",
        "Penetrante — arma blanca",
        "Penetrante — arma de fuego",
        "Mixto"
      ]
    },
    {
      "q": "Localização do impacto ou ferimento",
      "qEs": "Localización del impacto o herida",
      "type": "radio",
      "opts": [
        "Flanco direito / HCD",
        "Flanco esquerdo / HCE",
        "Epigástrico / mesogástrico",
        "Hipogástrico / pelve",
        "Difuso / todo abdome",
        "Dorso / lombar"
      ],
      "optsEs": [
        "Flanco derecho / HCD",
        "Flanco izquierdo / HCI",
        "Epigástrico / mesogástrico",
        "Hipogástrico / pelvis",
        "Difuso / todo el abdomen",
        "Dorso / lumbar"
      ]
    },
    {
      "q": "Tempo decorrido desde o trauma",
      "qEs": "Tiempo transcurrido desde el trauma",
      "type": "input",
      "ph": "Horas / minutos desde o trauma",
      "ph2": "Horas / minutos desde el trauma"
    },
    {
      "q": "Perda de consciência após o trauma?",
      "qEs": "¿Pérdida de consciencia después del trauma?",
      "type": "yn"
    },
    {
      "q": "Dor abdominal desde o trauma?",
      "qEs": "¿Dolor abdominal desde el trauma?",
      "type": "yn"
    },
    {
      "q": "Dor à palpação ou ao mínimo movimento (irritação peritoneal)?",
      "qEs": "¿Dolor a la palpación o con el mínimo movimiento (irritación peritoneal)?",
      "type": "yn"
    },
    {
      "q": "Sinais de instabilidade hemodinâmica — hipotensão, taquicardia, sudorese fria, palidez?",
      "qEs": "¿Signos de inestabilidad hemodinámica — hipotensión, taquicardia, sudoración fría, palidez?",
      "type": "yn"
    },
    {
      "q": "Hematúria (sangue na urina)?",
      "qEs": "¿Hematuria (sangre en la orina)?",
      "type": "yn"
    },
    {
      "q": "Distensão abdominal progressiva?",
      "qEs": "¿Distensión abdominal progresiva?",
      "type": "yn"
    },
    {
      "q": "Vômitos ou sangue no vômito após o trauma?",
      "qEs": "¿Vómitos o sangre en el vómito después del trauma?",
      "type": "yn"
    },
    {
      "q": "Usava cinto de segurança / capacete?",
      "qEs": "¿Usaba cinturón de seguridad / casco?",
      "type": "yn"
    },
    {
      "q": "Antecedentes de coagulopatia ou uso de anticoagulantes?",
      "qEs": "¿Antecedentes de coagulopatía o uso de anticoagulantes?",
      "type": "input",
      "ph": "Liste medicamentos anticoagulantes em uso",
      "ph2": "Liste medicamentos anticoagulantes en uso"
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
        "kw": "ABCDE",
        "name": "Atendimento inicial ao trauma (ATLS)",
        "rows": [
          [
            "A",
            "Airway",
            "Via aérea + proteção da coluna cervical"
          ],
          [
            "B",
            "Breathing",
            "Ventilação e oxigenação"
          ],
          [
            "C",
            "Circulation",
            "Controle de hemorragia + reposição; FAST"
          ],
          [
            "D",
            "Disability",
            "Avaliação neurológica (Glasgow, pupilas)"
          ],
          [
            "E",
            "Exposure",
            "Exposição completa + controle de hipotermia"
          ]
        ]
      },
      {
        "kw": "FECHADO x PENETRANTE",
        "name": "Mecanismos de trauma",
        "rows": [
          [
            "F",
            "Fechado/contuso",
            "Baço e fígado são os órgãos mais lesados"
          ],
          [
            "P",
            "Penetrante (arma branca)",
            "Lesão por trajeto; fígado e delgado frequentes"
          ],
          [
            "A",
            "Arma de fogo",
            "Alta energia, múltiplas lesões — laparotomia frequente"
          ],
          [
            "V",
            "Víscera oca",
            "Risco de peritonite tardia"
          ],
          [
            "R",
            "Retroperitônio",
            "Lesões de pâncreas/duodeno/rim podem ser ocultas"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "FAST (USG no trauma)",
        "subtitle": "Pesquisa de líquido livre",
        "steps": [
          "Avaliar 4 janelas: hepatorrenal (Morrison), esplenorrenal, pélvica e pericárdica",
          "Pesquisar líquido livre (sangue)"
        ],
        "normal": "Sem líquido livre",
        "abnormal": "Líquido livre → hemoperitônio; FAST + em instável → laparotomia"
      },
      {
        "title": "Pesquisa de irritação peritoneal",
        "subtitle": "Lesão de víscera",
        "steps": [
          "Palpar o abdome em todos os quadrantes",
          "Avaliar defesa, descompressão e rigidez"
        ],
        "normal": "Abdome depressível, indolor",
        "abnormal": "Peritonismo → lesão visceral/hemoperitônio — avaliação cirúrgica"
      },
      {
        "title": "Inspeção de marcas e estabilidade pélvica",
        "subtitle": "Mecanismo e gravidade",
        "steps": [
          "Pesquisar sinal do cinto de segurança, escoriações, evisceração",
          "Avaliar estabilidade da pelve (uma única vez, com cautela)"
        ],
        "normal": "Sem marcas, pelve estável",
        "abnormal": "Sinal do cinto/equimose → alto risco de lesão de víscera oca/mesentério"
      }
    ],
    "sinais": [
      {
        "name": "Sinal do cinto de segurança",
        "eponym": "Trauma contuso",
        "how": "Equimose linear transversal no abdome",
        "means": "Alto risco de lesão de víscera oca, mesentério e coluna lombar"
      },
      {
        "name": "FAST positivo",
        "eponym": "Hemoperitônio",
        "how": "Líquido livre à USG nas janelas peritoneais",
        "means": "Sangramento intra-abdominal — guia a laparotomia no instável"
      },
      {
        "name": "Sinal de Kehr",
        "eponym": "Lesão esplênica",
        "how": "Dor referida no ombro esquerdo (irritação diafragmática)",
        "means": "Sugere ruptura/hematoma esplênico"
      },
      {
        "name": "Sinal de Grey-Turner/Cullen",
        "eponym": "Hemorragia retroperitoneal",
        "how": "Equimose em flancos/periumbilical (tardia)",
        "means": "Sangramento retroperitoneal (pâncreas, grandes vasos, rim)"
      }
    ],
    "ddx": [
      [
        "Lesão de órgão sólido (baço/fígado)",
        "Trauma contuso, FAST +, instabilidade, dor referida",
        "Sem líquido livre; abdome inocente e estável"
      ],
      [
        "Lesão de víscera oca",
        "Sinal do cinto, peritonite que evolui em horas, pneumoperitônio",
        "FAST + por sangue de órgão sólido, sem ar livre"
      ],
      [
        "Hematoma retroperitoneal",
        "Trauma de alta energia, instabilidade sem líquido intraperitoneal",
        "Sangramento intraperitoneal evidente"
      ],
      [
        "Lesão diafragmática",
        "Trauma penetrante toracoabdominal, herniação à imagem",
        "Trauma isolado de andar inferior"
      ],
      [
        "Trauma de parede sem lesão visceral",
        "Dor localizada na parede, exames normais",
        "Peritonismo, FAST +, instabilidade"
      ],
      [
        "Lesão pélvica/urológica",
        "Fratura de pelve, hematúria, instabilidade",
        "Trauma abdominal alto isolado"
      ]
    ],
    "escalas": [
      {
        "title": "Decisão pelo estado hemodinâmico",
        "headers": [
          "Cenário",
          "Conduta"
        ],
        "rows": [
          [
            "Instável + FAST +",
            "Laparotomia de urgência"
          ],
          [
            "Instável + FAST -",
            "Buscar outra fonte de choque"
          ],
          [
            "Estável + suspeita",
            "TC de abdome com contraste"
          ],
          [
            "Penetrante com evisceração/peritonite/instabilidade",
            "Laparotomia"
          ]
        ],
        "note": "A estabilidade hemodinâmica é o principal determinante da conduta"
      },
      {
        "title": "Indicações de laparotomia",
        "headers": [
          "Indicação",
          "—"
        ],
        "rows": [
          [
            "Instabilidade com FAST/LPD positivo",
            "Hemoperitônio"
          ],
          [
            "Peritonite",
            "Lesão visceral"
          ],
          [
            "Pneumoperitônio",
            "Perfuração de víscera oca"
          ],
          [
            "Evisceração / empalamento",
            "Lesão penetrante"
          ],
          [
            "Sangramento por SNG/reto significativo",
            "Lesão de TGI"
          ]
        ],
        "note": "Pacientes estáveis selecionados podem ser manejados de forma não operatória com TC e observação"
      }
    ],
    "conduta": {
      "exames": [
        "FAST à beira do leito",
        "Hemograma, tipagem e prova cruzada, lactato/gasometria",
        "Coagulograma, função renal, amilase/lipase",
        "Radiografias conforme ATLS (tórax, pelve)",
        "TC de abdome e pelve com contraste no paciente ESTÁVEL"
      ],
      "drugs": [
        "Reposição volêmica + hemoderivados (protocolo de transfusão maciça se necessário)",
        "Ácido tranexâmico precoce no trauma grave",
        "Analgesia",
        "Antibiótico e profilaxia antitetânica em trauma penetrante"
      ],
      "steps": [
        "1. Atendimento ATLS (ABCDE) com controle de hemorragia",
        "2. FAST precoce no instável",
        "3. Instável + FAST + → laparotomia de urgência",
        "4. Estável → TC de abdome e considerar manejo não operatório",
        "5. Peritonite, pneumoperitônio, evisceração ou sangramento maciço → cirurgia"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Atención inicial al trauma (ATLS)",
        "rows": [
          [
            "Airway",
            "Vía aérea + protección de la columna cervical"
          ],
          [
            "Breathing",
            "Ventilación y oxigenación"
          ],
          [
            "Circulation",
            "Control de la hemorragia + reposición; FAST"
          ],
          [
            "Disability",
            "Evaluación neurológica (Glasgow, pupilas)"
          ],
          [
            "Exposure",
            "Exposición completa + control de la hipotermia"
          ]
        ]
      },
      {
        "name": "Mecanismos de trauma",
        "rows": [
          [
            "Cerrado/contuso",
            "El bazo y el hígado son los órganos más lesionados"
          ],
          [
            "Penetrante (arma blanca)",
            "Lesión por trayecto; hígado e intestino delgado frecuentes"
          ],
          [
            "Arma de fuego",
            "Alta energía, múltiples lesiones — laparotomía frecuente"
          ],
          [
            "Víscera hueca",
            "Riesgo de peritonitis tardía"
          ],
          [
            "Retroperitoneo",
            "Lesiones de páncreas/duodeno/riñón pueden ser ocultas"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "FAST (USG en el trauma)",
        "subtitle": "Búsqueda de líquido libre",
        "steps": [
          "Evaluar 4 ventanas: hepatorrenal (Morrison), esplenorrenal, pélvica y pericárdica",
          "Buscar líquido libre (sangre)"
        ],
        "normal": "Sin líquido libre",
        "abnormal": "Líquido libre → hemoperitoneo; FAST + en inestable → laparotomía"
      },
      {
        "title": "Búsqueda de irritación peritoneal",
        "subtitle": "Lesión de víscera",
        "steps": [
          "Palpar el abdomen en todos los cuadrantes",
          "Evaluar defensa, descompresión y rigidez"
        ],
        "normal": "Abdomen depresible, indoloro",
        "abnormal": "Peritonismo → lesión visceral/hemoperitoneo — evaluación quirúrgica"
      },
      {
        "title": "Inspección de marcas y estabilidad pélvica",
        "subtitle": "Mecanismo y gravedad",
        "steps": [
          "Buscar signo del cinturón de seguridad, escoriaciones, evisceración",
          "Evaluar estabilidad de la pelvis (una sola vez, con cautela)"
        ],
        "normal": "Sin marcas, pelvis estable",
        "abnormal": "Signo del cinturón/equimosis → alto riesgo de lesión de víscera hueca/mesenterio"
      }
    ],
    "sinais": [
      {
        "name": "Signo del cinturón de seguridad",
        "eponym": "Trauma contuso",
        "how": "Equimosis lineal transversal en el abdomen",
        "means": "Alto riesgo de lesión de víscera hueca, mesenterio y columna lumbar"
      },
      {
        "name": "FAST positivo",
        "eponym": "Hemoperitoneo",
        "how": "Líquido libre en la USG en las ventanas peritoneales",
        "means": "Sangrado intraabdominal — guía la laparotomía en el inestable"
      },
      {
        "name": "Signo de Kehr",
        "eponym": "Lesión esplénica",
        "how": "Dolor referido en el hombro izquierdo (irritación diafragmática)",
        "means": "Sugiere ruptura/hematoma esplénico"
      },
      {
        "name": "Signo de Grey-Turner/Cullen",
        "eponym": "Hemorragia retroperitoneal",
        "how": "Equimosis en flancos/periumbilical (tardía)",
        "means": "Sangrado retroperitoneal (páncreas, grandes vasos, riñón)"
      }
    ],
    "ddx": [
      [
        "Lesión de órgano sólido (bazo/hígado)",
        "Trauma contuso, FAST +, inestabilidad, dolor referido",
        "Sin líquido libre; abdomen inocente y estable"
      ],
      [
        "Lesión de víscera hueca",
        "Signo del cinturón, peritonitis que evoluciona en horas, neumoperitoneo",
        "FAST + por sangre de órgano sólido, sin aire libre"
      ],
      [
        "Hematoma retroperitoneal",
        "Trauma de alta energía, inestabilidad sin líquido intraperitoneal",
        "Sangrado intraperitoneal evidente"
      ],
      [
        "Lesión diafragmática",
        "Trauma penetrante toracoabdominal, herniación en la imagen",
        "Trauma aislado de piso inferior"
      ],
      [
        "Trauma de pared sin lesión visceral",
        "Dolor localizado en la pared, exámenes normales",
        "Peritonismo, FAST +, inestabilidad"
      ],
      [
        "Lesión pélvica/urológica",
        "Fractura de pelvis, hematuria, inestabilidad",
        "Trauma abdominal alto aislado"
      ]
    ],
    "escalas": [
      {
        "title": "Decisión por el estado hemodinámico",
        "headers": [
          "Escenario",
          "Conducta"
        ],
        "rows": [
          [
            "Inestable + FAST +",
            "Laparotomía de urgencia"
          ],
          [
            "Inestable + FAST -",
            "Buscar otra fuente de shock"
          ],
          [
            "Estable + sospecha",
            "TC de abdomen con contraste"
          ],
          [
            "Penetrante con evisceración/peritonitis/inestabilidad",
            "Laparotomía"
          ]
        ],
        "note": "La estabilidad hemodinámica es el principal determinante de la conducta"
      },
      {
        "title": "Indicaciones de laparotomía",
        "headers": [
          "Indicación",
          "—"
        ],
        "rows": [
          [
            "Inestabilidad con FAST/LPD positivo",
            "Hemoperitoneo"
          ],
          [
            "Peritonitis",
            "Lesión visceral"
          ],
          [
            "Neumoperitoneo",
            "Perforación de víscera hueca"
          ],
          [
            "Evisceración / empalamiento",
            "Lesión penetrante"
          ],
          [
            "Sangrado por SNG/recto significativo",
            "Lesión del TGI"
          ]
        ],
        "note": "Pacientes estables seleccionados pueden manejarse de forma no operatoria con TC y observación"
      }
    ],
    "conduta": {
      "exames": [
        "FAST a pie de cama",
        "Hemograma, tipificación y prueba cruzada, lactato/gasometría",
        "Coagulograma, función renal, amilasa/lipasa",
        "Radiografías según ATLS (tórax, pelvis)",
        "TC de abdomen y pelvis con contraste en el paciente ESTABLE"
      ],
      "drugs": [
        "Reposición volémica + hemoderivados (protocolo de transfusión masiva si es necesario)",
        "Ácido tranexámico precoz en el trauma grave",
        "Analgesia",
        "Antibiótico y profilaxis antitetánica en trauma penetrante"
      ],
      "steps": [
        "1. Atención ATLS (ABCDE) con control de la hemorragia",
        "2. FAST precoz en el inestable",
        "3. Inestable + FAST + → laparotomía de urgencia",
        "4. Estable → TC de abdomen y considerar manejo no operatorio",
        "5. Peritonitis, neumoperitoneo, evisceración o sangrado masivo → cirugía"
      ]
    }
  }
});
