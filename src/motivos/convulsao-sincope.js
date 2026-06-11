// Motivo: convulsao-sincope — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("convulsao-sincope", {
  "name": "Convulsão / Síncope / Perda de Consciência Transitória",
  "nameEs": "Convulsión / Síncope / Pérdida de Consciencia Transitoria",
  "icon": "⚡",
  "color": "mc-purple",
  "rasHighlight": [
    "cabeca",
    "cardio",
    "neuro"
  ],
  "aeaGuide": [
    {
      "q": "Houve testemunhas do episódio? O que relataram?",
      "qEs": "¿Hubo testigos del episodio? ¿Qué relataron?",
      "type": "input",
      "ph": "Descreva o relato das testemunhas",
      "ph2": "Describa el relato de los testigos"
    },
    {
      "q": "Houve algum sintoma de aviso (pródromo) antes da perda de consciência (tontura, escurecimento visual, sudorese, náusea, palpitações)?",
      "qEs": "¿Hubo algún síntoma de aviso (pródromo) antes de la pérdida de consciencia (mareo, visión borrosa, sudoración, náuseas, palpitaciones)?",
      "type": "yn"
    },
    {
      "q": "Em que circunstância ocorreu (em pé/sentado, ao levantar-se, durante esforço físico, durante emoção forte/dor/medo, ao urinar/evacuar/tossir)?",
      "qEs": "¿En qué circunstancia ocurrió (de pie/sentado, al levantarse, durante esfuerzo físico, durante emoción fuerte/dolor/miedo, al orinar/defecar/toser)?",
      "type": "radio",
      "opts": [
        "Em ortostase/ao levantar-se",
        "Durante esforço físico",
        "Em repouso/sentado",
        "Relacionado a emoção/dor/visão de sangue",
        "Ao urinar, evacuar ou tossir",
        "Sem relação clara identificada"
      ]
    },
    {
      "q": "Duração do episódio (perda de consciência)",
      "qEs": "Duración del episodio (pérdida de consciencia)",
      "type": "radio",
      "opts": [
        "Segundos",
        "Menos de 5 minutos",
        "Mais de 5 minutos"
      ]
    },
    {
      "q": "Houve movimentos tônico-clônicos (contrações rítmicas/abalos generalizados)?",
      "qEs": "¿Hubo movimientos tónico-clónicos (contracciones rítmicas/sacudidas generalizadas)?",
      "type": "yn"
    },
    {
      "q": "Perda do controle esfincteriano (urinário ou fecal) durante o episódio?",
      "qEs": "¿Pérdida del control esfinteriano (urinario o fecal) durante el episodio?",
      "type": "yn"
    },
    {
      "q": "Mordedura de língua (especialmente lateral)?",
      "qEs": "¿Mordedura de lengua (especialmente lateral)?",
      "type": "yn"
    },
    {
      "q": "Período de confusão mental, sonolência ou desorientação após o episódio (pós-ictal)? Por quanto tempo?",
      "qEs": "¿Período de confusión mental, somnolencia o desorientación después del episodio (poscrítico)? ¿Por cuánto tiempo?",
      "type": "input",
      "ph": "Descreva a recuperação/duração",
      "ph2": "Describa la recuperación/duración"
    },
    {
      "q": "Recuperação foi rápida e completa, sem confusão residual?",
      "qEs": "¿La recuperación fue rápida y completa, sin confusión residual?",
      "type": "yn"
    },
    {
      "q": "Quantos episódios semelhantes já ocorreram? Com que frequência?",
      "qEs": "¿Cuántos episodios similares ya ocurrieron? ¿Con qué frecuencia?",
      "type": "input",
      "ph": "Nº de episódios e frequência",
      "ph2": "Nº de episodios y frecuencia"
    },
    {
      "q": "Palpitações ou dor torácica imediatamente antes do episódio?",
      "qEs": "¿Palpitaciones o dolor torácico inmediatamente antes del episodio?",
      "type": "yn"
    },
    {
      "q": "Cefaleia associada antes ou após o episódio?",
      "qEs": "¿Cefalea asociada antes o después del episodio?",
      "type": "yn"
    },
    {
      "q": "Trauma associado à queda (corte, fratura, traumatismo craniano)?",
      "qEs": "¿Traumatismo asociado a la caída (corte, fractura, traumatismo craneal)?",
      "type": "yn"
    },
    {
      "q": "Privação de sono, jejum prolongado, uso recente de álcool ou outras drogas?",
      "qEs": "¿Privación de sueño, ayuno prolongado, uso reciente de alcohol u otras drogas?",
      "type": "yn"
    },
    {
      "q": "Antecedentes pessoais de epilepsia, cardiopatia, AVC prévio ou diabetes?",
      "qEs": "¿Antecedentes personales de epilepsia, cardiopatía, ACV previo o diabetes?",
      "type": "yn"
    },
    {
      "q": "Antecedentes familiares de epilepsia ou morte súbita cardíaca?",
      "qEs": "¿Antecedentes familiares de epilepsia o muerte súbita cardíaca?",
      "type": "yn"
    },
    {
      "q": "Uso de medicamentos que possam causar hipotensão, arritmia ou reduzir o limiar convulsivo (anti-hipertensivos, antidepressivos, antipsicóticos)?",
      "qEs": "¿Uso de medicamentos que puedan causar hipotensión, arritmia o reducir el umbral convulsivo (antihipertensivos, antidepresivos, antipsicóticos)?",
      "type": "input",
      "ph": "Liste os medicamentos em uso",
      "ph2": "Liste los medicamentos en uso"
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
        "kw": "SÍNCOPE x CONVULSÃO",
        "name": "Diferenciação entre síncope e crise convulsiva",
        "rows": [
          [
            "Pródromo",
            "Síncope: tontura, escurecimento visual, sudorese, náusea (geralmente presente). Convulsão: aura específica (olfativa, visual, sensação epigástrica) ou ausência de aviso",
            ""
          ],
          [
            "Postura/circunstância",
            "Síncope: tipicamente em ortostase, calor, dor, jejum, esforço (cardíaca). Convulsão: pode ocorrer em qualquer posição, inclusive durante o sono",
            ""
          ],
          [
            "Movimentos",
            "Síncope: pode haver breves abalos mioclônicos (síncope convulsiva). Convulsão: movimentos tônico-clônicos rítmicos e prolongados, mais sugestivos de crise epiléptica",
            ""
          ],
          [
            "Mordedura de língua",
            "Mais sugestiva de convulsão quando lateral; mordedura na ponta da língua é inespecífica e pode ocorrer em síncope",
            ""
          ],
          [
            "Liberação esfincteriana",
            "Pode ocorrer em ambas, porém mais característica e frequente nas crises convulsivas",
            ""
          ],
          [
            "Pós-evento",
            "Síncope: recuperação rápida e completa da consciência. Convulsão: período pós-ictal de confusão, sonolência e desorientação prolongado é altamente sugestivo de crise epiléptica",
            ""
          ]
        ]
      },
      {
        "kw": "CAUSAS DE SÍNCOPE",
        "name": "Classificação etiológica da síncope (cardíaca / reflexa / ortostática)",
        "rows": [
          [
            "Cardíaca (a mais perigosa)",
            "Arritmias (bradi/taquiarritmias), estenose aórtica, cardiomiopatia hipertrófica, embolia pulmonar",
            "Síncope durante esforço físico, sem pródromo, com palpitações ou dor torácica prévia, antecedente de cardiopatia/morte súbita familiar — \"síncope de esforço é cardíaca até prova em contrário\""
          ],
          [
            "Reflexa (neuromediada/vasovagal)",
            "Estímulo vagal — dor, emoção, calor, visão de sangue, micção, tosse, defecação",
            "Pródromo típico (sudorese, náusea, escurecimento visual), recuperação rápida, geralmente em jovens sem cardiopatia estrutural"
          ],
          [
            "Ortostática",
            "Hipovolemia, disautonomia, medicamentos anti-hipertensivos/diuréticos, repouso prolongado no leito",
            "Ocorre ao levantar-se rapidamente, queda documentada da PA na manobra ortostática, idosos polimedicados"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Aferição da pressão arterial em ortostase (teste ortostático)",
        "subtitle": "Avaliação de hipotensão ortostática",
        "steps": [
          "Meça a PA e FC com o paciente deitado, após 5 minutos de repouso",
          "Solicite que se levante e meça novamente a PA e FC após 1 e 3 minutos em pé",
          "Compare os valores e pesquise sintomas (tontura, escurecimento visual)"
        ],
        "normal": "Queda da PA sistólica <20mmHg e da diastólica <10mmHg, sem sintomas",
        "abnormal": "Queda da PA sistólica ≥20mmHg ou diastólica ≥10mmHg, com sintomas (teste ortostático positivo) → sugere síncope ortostática/disautonomia"
      },
      {
        "title": "Ausculta cardíaca dirigida",
        "subtitle": "Triagem de causas cardíacas estruturais e arrítmicas de síncope",
        "steps": [
          "Ausculte os focos cardíacos em busca de sopros (especialmente sistólico em foco aórtico)",
          "Avalie ritmo cardíaco, frequência e regularidade",
          "Pesquise sinais de insuficiência cardíaca (estase jugular, crepitações, edema)"
        ],
        "normal": "Bulhas normofonéticas, ritmo regular, sem sopros",
        "abnormal": "Sopro sistólico em foco aórtico (sugere estenose aórtica), arritmia ou sinais de IC → eleva a suspeita de síncope cardíaca, indicando investigação cardiológica prioritária"
      },
      {
        "title": "Exame neurológico pós-ictal",
        "subtitle": "Avaliação de déficits focais e nível de consciência após o episódio",
        "steps": [
          "Avalie nível de consciência, orientação e tempo de recuperação",
          "Pesquise déficits motores ou sensitivos focais (paralisia de Todd)",
          "Avalie a presença de confusão mental prolongada característica do estado pós-ictal"
        ],
        "normal": "Recuperação rápida da consciência, sem déficit focal residual",
        "abnormal": "Confusão prolongada, déficit focal (paralisia de Todd) → sugere crise epiléptica, podendo indicar lesão estrutural subjacente"
      },
      {
        "title": "Inspeção da língua",
        "subtitle": "Pesquisa de mordedura lateral da língua",
        "steps": [
          "Examine as bordas laterais da língua em busca de lacerações ou marcas de mordedura",
          "Diferencie de mordedura na ponta da língua (inespecífica)"
        ],
        "normal": "Sem lesões na língua",
        "abnormal": "Mordedura lateral da língua → achado com boa especificidade para crise convulsiva tônico-clônica generalizada"
      }
    ],
    "sinais": [
      {
        "name": "Síncope de esforço",
        "eponym": "Sinal de alarme cardiológico",
        "how": "Perda de consciência que ocorre durante ou imediatamente após esforço físico",
        "means": "Deve ser sempre considerada de causa cardíaca (arritmia, estenose aórtica, cardiomiopatia hipertrófica) até investigação completa — alto risco de morte súbita"
      },
      {
        "name": "Paralisia de Todd",
        "eponym": "Robert Bentley Todd",
        "how": "Déficit motor focal transitório (paresia/plegia) que surge após uma crise convulsiva e se resolve em horas",
        "means": "Confirma a natureza epiléptica do evento e pode mascarar/mimetizar um AVC agudo no período pós-ictal"
      },
      {
        "name": "Pródromo vagal",
        "eponym": "Típico da síncope vasovagal",
        "how": "Sensação de calor, sudorese fria, náusea, escurecimento visual e zumbido segundos antes da perda de consciência",
        "means": "Sugere fortemente síncope reflexa (vasovagal), de bom prognóstico, em contraste com a síncope cardíaca que costuma ser súbita e sem aviso"
      }
    ],
    "ddx": [
      [
        "Síncope vasovagal (reflexa)",
        "Pródromo vagal típico, gatilho identificável (dor, calor, emoção, ortostase prolongada), recuperação rápida e completa, jovem sem cardiopatia",
        "Ausência de pródromo, ocorrência durante esforço, antecedente de cardiopatia estrutural"
      ],
      [
        "Síncope cardíaca (arritmia/estrutural)",
        "Início súbito sem aviso, ocorrência durante esforço físico ou em decúbito, palpitações/dor torácica prévias, antecedente pessoal/familiar de cardiopatia ou morte súbita",
        "Pródromo vagal claro, gatilho situacional típico, exame cardiovascular normal"
      ],
      [
        "Crise convulsiva (epilepsia)",
        "Movimentos tônico-clônicos prolongados, mordedura lateral de língua, liberação esfincteriana, período pós-ictal de confusão prolongada, pode ocorrer durante o sono",
        "Recuperação imediata e completa da consciência, ausência de período confusional, fator situacional típico de síncope"
      ],
      [
        "Ataque isquêmico transitório (AIT)/causa neurológica focal",
        "Sintomas neurológicos focais associados (disartria, hemiparesia, alterações visuais), sem perda completa de consciência na maioria dos casos, fatores de risco cardiovascular",
        "Perda completa e transitória de consciência com recuperação espontânea, sem déficit focal persistente"
      ]
    ],
    "escalas": [
      {
        "title": "Sinais de alarme que sugerem causa cardíaca (investigação prioritária)",
        "headers": [
          "Achado",
          "Relevância"
        ],
        "rows": [
          [
            "Síncope durante esforço físico",
            "Sugere obstrução ao fluxo (estenose aórtica, cardiomiopatia hipertrófica) ou arritmia induzida por esforço"
          ],
          [
            "Síncope em decúbito/sem pródromo",
            "Sugere arritmia maligna — alto risco de morte súbita"
          ],
          [
            "Palpitações ou dor torácica precedendo o evento",
            "Sugere causa arrítmica/isquêmica"
          ],
          [
            "História familiar de morte súbita ou cardiopatia hereditária",
            "Eleva a suspeita de canalopatias/cardiomiopatias genéticas"
          ],
          [
            "ECG anormal (bloqueios, intervalo QT alterado, pré-excitação)",
            "Indica necessidade de investigação cardiológica e monitorização imediatas"
          ]
        ],
        "note": "Qualquer um destes achados indica avaliação cardiológica urgente com monitorização — \"síncope de esforço é cardíaca até prova em contrário\""
      }
    ],
    "conduta": {
      "exames": [
        "Eletrocardiograma (ECG) — exame obrigatório em toda perda de consciência transitória, em busca de arritmias, bloqueios, QT longo, sinais de isquemia ou pré-excitação",
        "Glicemia capilar imediata — excluir hipoglicemia como causa do evento",
        "Eletrólitos (sódio, potássio, cálcio) e hemograma — pesquisar distúrbios metabólicos/anemia como fatores contribuintes",
        "Teste ortostático (PA deitado x em pé) — avaliar hipotensão ortostática",
        "Eletroencefalograma (EEG) — se suspeita de crise convulsiva, idealmente após avaliação neurológica especializada",
        "Tomografia/ressonância de crânio — se déficit neurológico focal, primeira crise convulsiva no adulto, trauma craniano associado ou suspeita de lesão estrutural",
        "Ecocardiograma e/ou Holter/monitorização prolongada — se suspeita de causa cardíaca estrutural ou arrítmica"
      ],
      "drugs": [
        "Tratamento dirigido à causa identificada — não há medicação sintomática genérica para perda de consciência transitória",
        "Crise convulsiva em atividade (status epilepticus) → benzodiazepínico IV (ex.: diazepam/lorazepam) conforme protocolo de emergência",
        "Hipoglicemia confirmada → correção imediata com glicose",
        "Síncope cardíaca por arritmia → encaminhamento à cardiologia para avaliação de marca-passo/CDI ou terapia antiarrítmica conforme o caso"
      ],
      "steps": [
        "1. Caracterizar minuciosamente o episódio (testemunhas, pródromos, duração, movimentos, liberação esfincteriana, recuperação) para diferenciar síncope de crise convulsiva",
        "2. Realizar ECG e glicemia capilar em todos os casos — exames de baixo custo e alto rendimento diagnóstico inicial",
        "3. Pesquisar sinais de alarme cardíaco (síncope de esforço, sem pródromo, palpitações prévias, antecedente familiar de morte súbita) — se presentes, encaminhar para avaliação cardiológica urgente com monitorização",
        "4. Suspeita de crise convulsiva (mordedura lateral de língua, pós-ictal prolongado, primeira crise) → encaminhar à neurologia para EEG e considerar neuroimagem",
        "5. Avaliar fatores situacionais e medicamentos em uso (polifarmácia em idosos é causa frequente de síncope ortostática)",
        "6. Orientar sobre medidas de segurança (evitar dirigir/atividades de risco) até esclarecimento diagnóstico completo"
      ]
    }
  },
  "guideEs": {
    "mnemonics": [
      {
        "name": "Diferenciación entre síncope y crisis convulsiva",
        "rows": [
          [
            "Síncope: mareo, oscurecimiento visual, sudoración, náusea (generalmente presente). Convulsión: aura específica (olfativa, visual, sensación epigástrica) o ausencia de aviso",
            "",
            "Pródromo"
          ],
          [
            "Síncope: típicamente en ortostatismo, calor, dolor, ayuno, esfuerzo (cardíaca). Convulsión: puede ocurrir en cualquier posición, incluso durante el sueño",
            "",
            "Postura/circunstancia"
          ],
          [
            "Síncope: puede haber breves sacudidas mioclónicas (síncope convulsivo). Convulsión: movimientos tónico-clónicos rítmicos y prolongados, más sugestivos de crisis epiléptica",
            "",
            "Movimientos"
          ],
          [
            "Más sugestiva de convulsión cuando es lateral; la mordedura en la punta de la lengua es inespecífica y puede ocurrir en síncope",
            "",
            "Mordedura de lengua"
          ],
          [
            "Puede ocurrir en ambas, pero es más característica y frecuente en las crisis convulsivas",
            "",
            "Relajación esfinteriana"
          ],
          [
            "Síncope: recuperación rápida y completa de la conciencia. Convulsión: el período posictal de confusión, somnolencia y desorientación prolongado es altamente sugestivo de crisis epiléptica",
            "",
            "Posevento"
          ]
        ]
      },
      {
        "name": "Clasificación etiológica del síncope (cardíaco / reflejo / ortostático)",
        "rows": [
          [
            "Arritmias (bradi/taquiarritmias), estenosis aórtica, miocardiopatía hipertrófica, embolia pulmonar",
            "Síncope durante esfuerzo físico, sin pródromo, con palpitaciones o dolor torácico previo, antecedente de cardiopatía/muerte súbita familiar — \"el síncope de esfuerzo es cardíaco hasta demostrar lo contrario\"",
            "Cardíaca (la más peligrosa)"
          ],
          [
            "Estímulo vagal — dolor, emoción, calor, visión de sangre, micción, tos, defecación",
            "Pródromo típico (sudoración, náusea, oscurecimiento visual), recuperación rápida, generalmente en jóvenes sin cardiopatía estructural",
            "Refleja (neuromediada/vasovagal)"
          ],
          [
            "Hipovolemia, disautonomía, medicamentos antihipertensivos/diuréticos, reposo prolongado en cama",
            "Ocurre al levantarse rápidamente, caída documentada de la PA en la maniobra ortostática, ancianos polimedicados",
            "Ortostática"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Medición de la presión arterial en ortostatismo (prueba ortostática)",
        "subtitle": "Evaluación de hipotensión ortostática",
        "steps": [
          "Mida la PA y FC con el paciente acostado, tras 5 minutos de reposo",
          "Solicite que se levante y mida nuevamente la PA y FC tras 1 y 3 minutos de pie",
          "Compare los valores y busque síntomas (mareo, oscurecimiento visual)"
        ],
        "normal": "Caída de la PA sistólica <20mmHg y de la diastólica <10mmHg, sin síntomas",
        "abnormal": "Caída de la PA sistólica ≥20mmHg o diastólica ≥10mmHg, con síntomas (prueba ortostática positiva) → sugiere síncope ortostático/disautonomía"
      },
      {
        "title": "Auscultación cardíaca dirigida",
        "subtitle": "Triaje de causas cardíacas estructurales y arrítmicas de síncope",
        "steps": [
          "Ausculte los focos cardíacos en busca de soplos (especialmente sistólico en foco aórtico)",
          "Evalúe ritmo cardíaco, frecuencia y regularidad",
          "Busque signos de insuficiencia cardíaca (ingurgitación yugular, crepitaciones, edema)"
        ],
        "normal": "Ruidos normofonéticos, ritmo regular, sin soplos",
        "abnormal": "Soplo sistólico en foco aórtico (sugiere estenosis aórtica), arritmia o signos de IC → eleva la sospecha de síncope cardíaco, indicando investigación cardiológica prioritaria"
      },
      {
        "title": "Examen neurológico posictal",
        "subtitle": "Evaluación de déficits focales y nivel de conciencia tras el episodio",
        "steps": [
          "Evalúe nivel de conciencia, orientación y tiempo de recuperación",
          "Busque déficits motores o sensitivos focales (parálisis de Todd)",
          "Evalúe la presencia de confusión mental prolongada característica del estado posictal"
        ],
        "normal": "Recuperación rápida de la conciencia, sin déficit focal residual",
        "abnormal": "Confusión prolongada, déficit focal (parálisis de Todd) → sugiere crisis epiléptica, pudiendo indicar lesión estructural subyacente"
      },
      {
        "title": "Inspección de la lengua",
        "subtitle": "Búsqueda de mordedura lateral de la lengua",
        "steps": [
          "Examine los bordes laterales de la lengua en busca de laceraciones o marcas de mordedura",
          "Diferencie de la mordedura en la punta de la lengua (inespecífica)"
        ],
        "normal": "Sin lesiones en la lengua",
        "abnormal": "Mordedura lateral de la lengua → hallazgo con buena especificidad para crisis convulsiva tónico-clónica generalizada"
      }
    ],
    "sinais": [
      {
        "name": "Síncope de esfuerzo",
        "eponym": "Signo de alarma cardiológico",
        "how": "Pérdida de conciencia que ocurre durante o inmediatamente después del esfuerzo físico",
        "means": "Debe considerarse siempre de causa cardíaca (arritmia, estenosis aórtica, miocardiopatía hipertrófica) hasta investigación completa — alto riesgo de muerte súbita"
      },
      {
        "name": "Parálisis de Todd",
        "eponym": "Robert Bentley Todd",
        "how": "Déficit motor focal transitorio (paresia/plejía) que surge tras una crisis convulsiva y se resuelve en horas",
        "means": "Confirma la naturaleza epiléptica del evento y puede enmascarar/mimetizar un ACV agudo en el período posictal"
      },
      {
        "name": "Pródromo vagal",
        "eponym": "Típico del síncope vasovagal",
        "how": "Sensación de calor, sudoración fría, náusea, oscurecimiento visual y acúfeno segundos antes de la pérdida de conciencia",
        "means": "Sugiere fuertemente síncope reflejo (vasovagal), de buen pronóstico, en contraste con el síncope cardíaco que suele ser súbito y sin aviso"
      }
    ],
    "ddx": [
      [
        "Síncope vasovagal (reflejo)",
        "Pródromo vagal típico, desencadenante identificable (dolor, calor, emoción, ortostatismo prolongado), recuperación rápida y completa, joven sin cardiopatía",
        "Ausencia de pródromo, ocurrencia durante el esfuerzo, antecedente de cardiopatía estructural"
      ],
      [
        "Síncope cardíaco (arritmia/estructural)",
        "Inicio súbito sin aviso, ocurrencia durante el esfuerzo físico o en decúbito, palpitaciones/dolor torácico previos, antecedente personal/familiar de cardiopatía o muerte súbita",
        "Pródromo vagal claro, desencadenante situacional típico, examen cardiovascular normal"
      ],
      [
        "Crisis convulsiva (epilepsia)",
        "Movimientos tónico-clónicos prolongados, mordedura lateral de la lengua, relajación esfinteriana, período posictal de confusión prolongada, puede ocurrir durante el sueño",
        "Recuperación inmediata y completa de la conciencia, ausencia de período confusional, factor situacional típico de síncope"
      ],
      [
        "Ataque isquémico transitorio (AIT)/causa neurológica focal",
        "Síntomas neurológicos focales asociados (disartria, hemiparesia, alteraciones visuales), sin pérdida completa de conciencia en la mayoría de los casos, factores de riesgo cardiovascular",
        "Pérdida completa y transitoria de conciencia con recuperación espontánea, sin déficit focal persistente"
      ]
    ],
    "escalas": [
      {
        "title": "Signos de alarma que sugieren causa cardíaca (investigación prioritaria)",
        "headers": [
          "Hallazgo",
          "Relevancia"
        ],
        "rows": [
          [
            "Síncope durante esfuerzo físico",
            "Sugiere obstrucción al flujo (estenosis aórtica, miocardiopatía hipertrófica) o arritmia inducida por esfuerzo"
          ],
          [
            "Síncope en decúbito/sin pródromo",
            "Sugiere arritmia maligna — alto riesgo de muerte súbita"
          ],
          [
            "Palpitaciones o dolor torácico precediendo el evento",
            "Sugiere causa arrítmica/isquémica"
          ],
          [
            "Antecedente familiar de muerte súbita o cardiopatía hereditaria",
            "Eleva la sospecha de canalopatías/miocardiopatías genéticas"
          ],
          [
            "ECG anormal (bloqueos, intervalo QT alterado, preexcitación)",
            "Indica necesidad de investigación cardiológica y monitorización inmediatas"
          ]
        ],
        "note": "Cualquiera de estos hallazgos indica evaluación cardiológica urgente con monitorización — \"el síncope de esfuerzo es cardíaco hasta demostrar lo contrario\""
      }
    ],
    "conduta": {
      "exames": [
        "Electrocardiograma (ECG) — examen obligatorio en toda pérdida de conciencia transitoria, en busca de arritmias, bloqueos, QT largo, signos de isquemia o preexcitación",
        "Glucemia capilar inmediata — excluir hipoglucemia como causa del evento",
        "Electrolitos (sodio, potasio, calcio) y hemograma — buscar trastornos metabólicos/anemia como factores contribuyentes",
        "Prueba ortostática (PA acostado x de pie) — evaluar hipotensión ortostática",
        "Electroencefalograma (EEG) — si sospecha de crisis convulsiva, idealmente tras evaluación neurológica especializada",
        "Tomografía/resonancia de cráneo — si déficit neurológico focal, primera crisis convulsiva en el adulto, trauma craneal asociado o sospecha de lesión estructural",
        "Ecocardiograma y/o Holter/monitorización prolongada — si sospecha de causa cardíaca estructural o arrítmica"
      ],
      "drugs": [
        "Tratamiento dirigido a la causa identificada — no hay medicación sintomática genérica para la pérdida de conciencia transitoria",
        "Crisis convulsiva en actividad (estado epiléptico) → benzodiacepina IV (ej.: diazepam/lorazepam) según protocolo de emergencia",
        "Hipoglucemia confirmada → corrección inmediata con glucosa",
        "Síncope cardíaco por arritmia → derivación a cardiología para evaluación de marcapasos/DAI o terapia antiarrítmica según el caso"
      ],
      "steps": [
        "1. Caracterizar minuciosamente el episodio (testigos, pródromos, duración, movimientos, relajación esfinteriana, recuperación) para diferenciar síncope de crisis convulsiva",
        "2. Realizar ECG y glucemia capilar en todos los casos — exámenes de bajo costo y alto rendimiento diagnóstico inicial",
        "3. Buscar signos de alarma cardíaco (síncope de esfuerzo, sin pródromo, palpitaciones previas, antecedente familiar de muerte súbita) — si están presentes, derivar para evaluación cardiológica urgente con monitorización",
        "4. Sospecha de crisis convulsiva (mordedura lateral de la lengua, posictal prolongado, primera crisis) → derivar a neurología para EEG y considerar neuroimagen",
        "5. Evaluar factores situacionales y medicamentos en uso (la polifarmacia en ancianos es causa frecuente de síncope ortostático)",
        "6. Orientar sobre medidas de seguridad (evitar conducir/actividades de riesgo) hasta el esclarecimiento diagnóstico completo"
      ]
    }
  }
});
