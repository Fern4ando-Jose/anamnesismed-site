// Motivo: tontura-vertigem — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("tontura-vertigem", {
  "name": "Tontura / Vertigem",
  "nameEs": "Mareo / Vértigo",
  "icon": "🌀",
  "color": "mc-purple",
  "rasHighlight": [
    "cabeca",
    "neuro",
    "cardio"
  ],
  "aeaGuide": [
    {
      "q": "Tipo de sensação",
      "qEs": "Tipo de sensación",
      "type": "radio",
      "opts": [
        "Vertigem rotatória (sensação de giro)",
        "Pré-síncope (sensação de desmaio iminente)",
        "Desequilíbrio/instabilidade à marcha",
        "Tontura inespecífica/cabeça leve"
      ]
    },
    {
      "q": "Início",
      "qEs": "Inicio",
      "type": "radio",
      "opts": [
        "Súbito",
        "Gradual/progressivo"
      ]
    },
    {
      "q": "Duração de cada episódio",
      "qEs": "Duración de cada episodio",
      "type": "radio",
      "opts": [
        "Segundos",
        "Minutos",
        "Horas",
        "Dias",
        "Constante"
      ]
    },
    {
      "q": "Relação com mudança de posição da cabeça?",
      "qEs": "¿Relación con cambios de posición de la cabeza?",
      "type": "yn"
    },
    {
      "q": "Náuseas / vômitos associados?",
      "qEs": "¿Náuseas / vómitos asociados?",
      "type": "yn"
    },
    {
      "q": "Zumbido (tinnitus) ou perda auditiva?",
      "qEs": "¿Acúfenos (tinnitus) o pérdida auditiva?",
      "type": "yn"
    },
    {
      "q": "Cefaleia associada?",
      "qEs": "¿Cefalea asociada?",
      "type": "yn"
    },
    {
      "q": "Diplopia, disartria, fraqueza ou alterações sensitivas associadas?",
      "qEs": "¿Diplopía, disartria, debilidad o alteraciones sensitivas asociadas?",
      "type": "yn"
    },
    {
      "q": "Palpitações ou síncope associadas?",
      "qEs": "¿Palpitaciones o síncope asociados?",
      "type": "yn"
    },
    {
      "q": "Uso de medicamentos (anti-hipertensivos, sedativos, ototóxicos)?",
      "qEs": "¿Uso de medicamentos (antihipertensivos, sedantes, ototóxicos)?",
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
        "kw": "VERTIGEM",
        "name": "Causas de tontura/vertigem",
        "rows": [
          [
            "V",
            "VPPB",
            "Crises breves (<1min) com mudança de posição da cabeça"
          ],
          [
            "E",
            "Espontânea (Ménière)",
            "Vertigem + zumbido + hipoacusia flutuante + plenitude auricular"
          ],
          [
            "R",
            "Reação vestibular (neurite)",
            "Vertigem contínua, intensa, dias, sem perda auditiva"
          ],
          [
            "T",
            "Tronco encefálico/AVC",
            "Vertigem central + diplopia, disartria, ataxia, déficit focal"
          ],
          [
            "I",
            "Isquemia/arritmia",
            "Pré-síncope, palpitações, relação com esforço/postura"
          ],
          [
            "G",
            "Gravidade postural (hipotensão ortostática)",
            "Tontura ao levantar, queda de PA >20/10mmHg"
          ],
          [
            "E²",
            "Estímulos/medicamentos",
            "Ototóxicos, anti-hipertensivos, sedativos, álcool"
          ],
          [
            "M",
            "Migrânea vestibular",
            "Vertigem associada à cefaleia, fotofobia, história de enxaqueca"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Dix-Hallpike",
        "subtitle": "Diagnóstico de VPPB (canal posterior)",
        "steps": [
          "Paciente sentado, vire a cabeça 45° para um lado",
          "Deite rapidamente em decúbito dorsal com a cabeça pendente 20° abaixo da maca",
          "Observe os olhos por 30-60s aguardando nistagmo",
          "Repita para o lado oposto"
        ],
        "normal": "Sem nistagmo ou vertigem",
        "abnormal": "Nistagmo rotatório com latência, fatigável e que reproduz a vertigem → VPPB do lado testado"
      },
      {
        "title": "Teste de Romberg",
        "subtitle": "Avaliação do equilíbrio/propriocepção",
        "steps": [
          "Paciente em pé, pés juntos, braços ao lado do corpo",
          "Peça para fechar os olhos por 30s",
          "Observe oscilação ou queda"
        ],
        "normal": "Mantém-se estável de olhos fechados",
        "abnormal": "Desequilíbrio/queda ao fechar os olhos → disfunção vestibular ou proprioceptiva (Romberg+)"
      },
      {
        "title": "Teste do impulso cefálico (HINTS - Head Impulse)",
        "subtitle": "Diferenciação periférico vs central",
        "steps": [
          "Peça para o paciente fixar o olhar no seu nariz",
          "Gire a cabeça do paciente rapidamente 10-20° para um lado",
          "Observe se os olhos permanecem fixos no alvo"
        ],
        "normal": "Olhos permanecem fixos (sem sacada de correção) → sugere causa central (atenção: HINTS \"perigoso\" quando normal em quadro vertiginoso agudo)",
        "abnormal": "Sacada de correção (catch-up saccade) → lesão vestibular periférica"
      },
      {
        "title": "Aferição de PA ortostática",
        "subtitle": "Hipotensão postural",
        "steps": [
          "Meça PA e FC com paciente deitado após 5 minutos de repouso",
          "Meça novamente após 1 e 3 minutos em pé"
        ],
        "normal": "Queda <20mmHg sistólica e <10mmHg diastólica",
        "abnormal": "Queda ≥20/10mmHg com sintomas → hipotensão ortostática"
      }
    ],
    "sinais": [
      {
        "name": "Nistagmo vertical ou que muda de direção",
        "eponym": "Sinal de alarme central",
        "how": "Nistagmo bidirecional, vertical puro ou não-fatigável ao exame",
        "means": "Sugere lesão de tronco encefálico/cerebelo — investigar AVC vertebrobasilar"
      },
      {
        "name": "Skew deviation (desvio ocular vertical)",
        "eponym": "Componente do HINTS",
        "how": "Um olho desvia verticalmente em relação ao outro ao cobrir alternadamente",
        "means": "Forte indício de causa central (tronco encefálico)"
      },
      {
        "name": "Dismetria/disdiadococinesia",
        "eponym": "Síndrome cerebelar",
        "how": "Erro de alvo no teste index-nariz e dificuldade em movimentos alternados rápidos",
        "means": "Sugere lesão cerebelar — vertigem central"
      }
    ],
    "ddx": [
      [
        "VPPB",
        "Crises curtas (segundos a 1 min), desencadeadas por movimento da cabeça, Dix-Hallpike+, sem perda auditiva",
        "Vertigem contínua >1h ou sintomas neurológicos associados"
      ],
      [
        "Doença de Ménière",
        "Episódios de minutos a horas + zumbido + hipoacusia flutuante + plenitude auricular",
        "Ausência de sintomas auditivos, episódios muito breves"
      ],
      [
        "Neurite/labirintite vestibular",
        "Vertigem contínua intensa por dias, náuseas/vômitos, sem sintomas auditivos (labirintite: com hipoacusia)",
        "Início súbito com déficit neurológico focal associado"
      ],
      [
        "Causa central (AVC/AIT vertebrobasilar)",
        "Início súbito, cefaleia occipital, diplopia, disartria, ataxia, déficit focal, HINTS sugestivo de central",
        "Crises curtas posicionais típicas de VPPB, sintomas auditivos isolados"
      ],
      [
        "Hipotensão ortostática/causa cardiovascular",
        "Tontura ao levantar-se, síncope, palpitações, queda de PA postural, arritmia ao ECG",
        "Vertigem rotatória verdadeira desencadeada por posição da cabeça"
      ]
    ],
    "escalas": [
      {
        "title": "HINTS Exam (bedside, vertigem aguda contínua)",
        "headers": [
          "Componente",
          "Achado periférico",
          "Achado central"
        ],
        "rows": [
          [
            "Head Impulse",
            "Sacada de correção presente",
            "Teste normal (sem sacada)"
          ],
          [
            "Nystagmus",
            "Unidirecional, horizontal, fatigável",
            "Bidirecional, vertical ou que muda de direção"
          ],
          [
            "Test of Skew",
            "Ausente",
            "Presente (desvio vertical)"
          ]
        ],
        "note": "\"INFARCT\" (Impulse Normal, Fast-phase Alternating, Refixation on Cover Test) sugere causa central → indicação de neuroimagem urgente mesmo com TC inicial normal"
      }
    ],
    "conduta": {
      "exames": [
        "Exame neurológico completo + otoscopia",
        "Avaliação de PA deitado/em pé (ortostase)",
        "ECG (arritmias)",
        "Audiometria (se suspeita de Ménière/labirintite)",
        "RM de crânio com difusão (suspeita de causa central — TC tem baixa sensibilidade para fossa posterior)"
      ],
      "drugs": [
        "Sintomáticos de curta duração: Dimenidrinato 50mg VO/EV ou Meclizina 25mg VO",
        "Antiemético: Ondansetrona 4-8mg EV/VO",
        "Evitar supressores vestibulares prolongados (atrasam compensação central)",
        "Corticoide (Prednisona) em neurite vestibular conforme avaliação especializada"
      ],
      "steps": [
        "1. Diferenciar central x periférico (HINTS, sinais neurológicos, início e duração)",
        "2. Sinais de alarme central → neuroimagem urgente (RM) e avaliação neurológica",
        "3. Suspeita de VPPB → confirmar com Dix-Hallpike e tratar com manobra de Epley (reposicionamento canalicular)",
        "4. Suspeita de Ménière → encaminhar otorrino, dieta hipossódica, diuréticos conforme avaliação",
        "5. Hipotensão ortostática → revisar medicações, hidratação, meias de compressão",
        "6. Reavaliação e seguimento conforme evolução"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Causas de mareo/vértigo",
        "rows": [
          [
            "VPPB",
            "Crisis breves (<1min) con cambio de posición de la cabeza"
          ],
          [
            "Espontánea (Ménière)",
            "Vértigo + acúfeno + hipoacusia fluctuante + plenitud auricular"
          ],
          [
            "Reacción vestibular (neuritis)",
            "Vértigo continuo, intenso, días, sin pérdida auditiva"
          ],
          [
            "Tronco encefálico/ACV",
            "Vértigo central + diplopía, disartria, ataxia, déficit focal"
          ],
          [
            "Isquemia/arritmia",
            "Presíncope, palpitaciones, relación con esfuerzo/postura"
          ],
          [
            "Gravedad postural (hipotensión ortostática)",
            "Mareo al levantarse, caída de PA >20/10mmHg"
          ],
          [
            "Estímulos/medicamentos",
            "Ototóxicos, antihipertensivos, sedantes, alcohol"
          ],
          [
            "Migraña vestibular",
            "Vértigo asociado a cefalea, fotofobia, antecedente de migraña"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Dix-Hallpike",
        "subtitle": "Diagnóstico de VPPB (canal posterior)",
        "steps": [
          "Paciente sentado, gire la cabeza 45° hacia un lado",
          "Acueste rápidamente en decúbito dorsal con la cabeza colgando 20° bajo la camilla",
          "Observe los ojos por 30-60s esperando nistagmo",
          "Repita para el lado opuesto"
        ],
        "normal": "Sin nistagmo ni vértigo",
        "abnormal": "Nistagmo rotatorio con latencia, fatigable y que reproduce el vértigo → VPPB del lado evaluado"
      },
      {
        "title": "Prueba de Romberg",
        "subtitle": "Evaluación del equilibrio/propiocepción",
        "steps": [
          "Paciente de pie, pies juntos, brazos al costado",
          "Pida cerrar los ojos por 30s",
          "Observe oscilación o caída"
        ],
        "normal": "Se mantiene estable con los ojos cerrados",
        "abnormal": "Desequilibrio/caída al cerrar los ojos → disfunción vestibular o propioceptiva (Romberg+)"
      },
      {
        "title": "Prueba de impulso cefálico (HINTS - Head Impulse)",
        "subtitle": "Diferenciación periférico vs central",
        "steps": [
          "Pida al paciente fijar la mirada en su nariz",
          "Gire la cabeza del paciente rápidamente 10-20° hacia un lado",
          "Observe si los ojos permanecen fijos en el objetivo"
        ],
        "normal": "Los ojos permanecen fijos (sin sacada de corrección) → sugiere causa central (atención: HINTS \"peligroso\" cuando es normal en cuadro vertiginoso agudo)",
        "abnormal": "Sacada de corrección (catch-up saccade) → lesión vestibular periférica"
      },
      {
        "title": "Medición de PA ortostática",
        "subtitle": "Hipotensión postural",
        "steps": [
          "Mida PA y FC con el paciente acostado tras 5 minutos de reposo",
          "Mida nuevamente tras 1 y 3 minutos de pie"
        ],
        "normal": "Caída <20mmHg sistólica y <10mmHg diastólica",
        "abnormal": "Caída ≥20/10mmHg con síntomas → hipotensión ortostática"
      }
    ],
    "sinais": [
      {
        "name": "Nistagmo vertical o que cambia de dirección",
        "eponym": "Signo de alarma central",
        "how": "Nistagmo bidireccional, vertical puro o no-fatigable al examen",
        "means": "Sugiere lesión de tronco encefálico/cerebelo — investigar ACV vertebrobasilar"
      },
      {
        "name": "Skew deviation (desviación ocular vertical)",
        "eponym": "Componente del HINTS",
        "how": "Un ojo se desvía verticalmente respecto al otro al cubrir alternadamente",
        "means": "Fuerte indicio de causa central (tronco encefálico)"
      },
      {
        "name": "Dismetría/disdiadococinesia",
        "eponym": "Síndrome cerebelosa",
        "how": "Error de blanco en la prueba índice-nariz y dificultad en movimientos alternos rápidos",
        "means": "Sugiere lesión cerebelosa — vértigo central"
      }
    ],
    "ddx": [
      [
        "VPPB",
        "Crisis cortas (segundos a 1 min), desencadenadas por movimiento de la cabeza, Dix-Hallpike+, sin pérdida auditiva",
        "Vértigo continuo >1h o síntomas neurológicos asociados"
      ],
      [
        "Enfermedad de Ménière",
        "Episodios de minutos a horas + acúfeno + hipoacusia fluctuante + plenitud auricular",
        "Ausencia de síntomas auditivos, episodios muy breves"
      ],
      [
        "Neuritis/laberintitis vestibular",
        "Vértigo continuo intenso por días, náuseas/vómitos, sin síntomas auditivos (laberintitis: con hipoacusia)",
        "Inicio súbito con déficit neurológico focal asociado"
      ],
      [
        "Causa central (ACV/AIT vertebrobasilar)",
        "Inicio súbito, cefalea occipital, diplopía, disartria, ataxia, déficit focal, HINTS sugestivo de central",
        "Crisis cortas posicionales típicas de VPPB, síntomas auditivos aislados"
      ],
      [
        "Hipotensión ortostática/causa cardiovascular",
        "Mareo al levantarse, síncope, palpitaciones, caída de PA postural, arritmia en ECG",
        "Vértigo rotatorio verdadero desencadenado por posición de la cabeza"
      ]
    ],
    "escalas": [
      {
        "title": "Examen HINTS (a pie de cama, vértigo agudo continuo)",
        "headers": [
          "Componente",
          "Hallazgo periférico",
          "Hallazgo central"
        ],
        "rows": [
          [
            "Head Impulse",
            "Sacada de corrección presente",
            "Prueba normal (sin sacada)"
          ],
          [
            "Nystagmus",
            "Unidireccional, horizontal, fatigable",
            "Bidireccional, vertical o que cambia de dirección"
          ],
          [
            "Test of Skew",
            "Ausente",
            "Presente (desviación vertical)"
          ]
        ],
        "note": "\"INFARCT\" (Impulse Normal, Fast-phase Alternating, Refixation on Cover Test) sugiere causa central → indicación de neuroimagen urgente aun con TC inicial normal"
      }
    ],
    "conduta": {
      "exames": [
        "Examen neurológico completo + otoscopia",
        "Evaluación de PA acostado/de pie (ortostatismo)",
        "ECG (arritmias)",
        "Audiometría (si sospecha de Ménière/laberintitis)",
        "RM de cráneo con difusión (sospecha de causa central — la TC tiene baja sensibilidad para fosa posterior)"
      ],
      "drugs": [
        "Sintomáticos de corta duración: Dimenhidrinato 50mg VO/EV o Meclizina 25mg VO",
        "Antiemético: Ondansetrón 4-8mg EV/VO",
        "Evitar supresores vestibulares prolongados (retrasan la compensación central)",
        "Corticoide (Prednisona) en neuritis vestibular según evaluación especializada"
      ],
      "steps": [
        "1. Diferenciar central x periférico (HINTS, signos neurológicos, inicio y duración)",
        "2. Signos de alarma central → neuroimagen urgente (RM) y evaluación neurológica",
        "3. Sospecha de VPPB → confirmar con Dix-Hallpike y tratar con maniobra de Epley (reposicionamiento canalicular)",
        "4. Sospecha de Ménière → derivar a otorrino, dieta hiposódica, diuréticos según evaluación",
        "5. Hipotensión ortostática → revisar medicaciones, hidratación, medias de compresión",
        "6. Reevaluación y seguimiento según evolución"
      ]
    }
  }
});
