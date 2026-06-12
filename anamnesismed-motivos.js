// ⚙️ GERADO por scripts/build.js — NÃO editar à mão. Edite src/ e rode: node scripts/build.js
const MOTIVOS = {
  "clinica": [
    {
      "cat": "Cardiorrespiratório / Cardiovascular",
      "catEs": "Cardiorrespiratorio / Cardiovascular",
      "items": [
        {
          "id": "dor-toracica",
          "name": "Dor Torácica",
          "nameEs": "Dolor Torácico",
          "icon": "❤️",
          "color": "mc-danger",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização da dor",
              "qEs": "Localización del dolor",
              "type": "radio",
              "opts": [
                "Retroesternal",
                "Precordial",
                "Lateral/pleural",
                "Epigástrica",
                "Difusa"
              ],
              "optsEs": [
                "Retroesternal",
                "Precordial",
                "Lateral/pleural",
                "Epigástrico",
                "Difuso"
              ]
            },
            {
              "q": "Irradiação",
              "qEs": "Irradiación",
              "type": "radio",
              "opts": [
                "Membro superior esquerdo",
                "Mandíbula/pescoço",
                "Ombro direito",
                "Dorso/interescapular",
                "Sem irradiação"
              ],
              "optsEs": [
                "Miembro superior izquierdo",
                "Mandíbula/cuello",
                "Hombro derecho",
                "Dorso/interescapular",
                "Sin irradiación"
              ]
            },
            {
              "q": "Tipo/caráter da dor",
              "qEs": "Tipo/carácter del dolor",
              "type": "radio",
              "opts": [
                "Em aperto/opressão",
                "Em queimação",
                "Em pontada/agulhada",
                "Lancinante/dilacerante",
                "Em peso"
              ],
              "optsEs": [
                "Opresivo",
                "Ardor/quemante",
                "Punzante",
                "Lancinante/desgarrante",
                "Pesadez"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Duração do episódio",
              "qEs": "Duración del episodio",
              "type": "radio",
              "opts": [
                "Segundos",
                "Minutos (<20min)",
                "Mais de 20-30 minutos",
                "Persistente/contínua"
              ],
              "optsEs": [
                "Segundos",
                "Minutos (<20min)",
                "Más de 20-30 minutos",
                "Persistente/continuo"
              ]
            },
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito (segundos)",
                "Gradual/progressivo"
              ],
              "optsEs": [
                "Súbito (segundos)",
                "Gradual/progresivo"
              ]
            },
            {
              "q": "Relação com esforço",
              "qEs": "Relación con esfuerzo",
              "type": "radio",
              "opts": [
                "Piora com esforço",
                "Melhora com esforço",
                "Sem relação com esforço",
                "Em repouso"
              ],
              "optsEs": [
                "Empeora con el esfuerzo",
                "Mejora con el esfuerzo",
                "Sin relación con el esfuerzo",
                "En reposo"
              ]
            },
            {
              "q": "Relação com a respiração ou tosse (dor pleurítica)?",
              "qEs": "¿Relación con la respiración o la tos (dolor pleurítico)?",
              "type": "yn"
            },
            {
              "q": "Relação com posição ou alimentação",
              "qEs": "Relación con la posición o la alimentación",
              "type": "radio",
              "opts": [
                "Piora ao deitar-se",
                "Melhora ao sentar-se/inclinar para frente",
                "Relação com alimentação (piora/melhora pós-prandial)",
                "Piora ao engolir",
                "Sem relação"
              ],
              "optsEs": [
                "Empeora al acostarse",
                "Mejora al sentarse/inclinarse hacia adelante",
                "Relación con la alimentación (empeora/mejora posprandial)",
                "Empeora al tragar",
                "Sin relación"
              ]
            },
            {
              "q": "Alivia com nitroglicerina?",
              "qEs": "¿Alivia con nitroglicerina?",
              "type": "yn"
            },
            {
              "q": "Evolução desde o início (piorando, estável, melhorando)?",
              "qEs": "¿Evolución desde el inicio (empeorando, estable, mejorando)?",
              "type": "radio",
              "opts": [
                "Piorando progressivamente",
                "Estável",
                "Melhorando",
                "Em crises recorrentes"
              ]
            },
            {
              "q": "Palpitações associadas?",
              "qEs": "¿Palpitaciones asociadas?",
              "type": "yn"
            },
            {
              "q": "Dispneia associada?",
              "qEs": "¿Disnea asociada?",
              "type": "yn"
            },
            {
              "q": "Sudorese fria associada?",
              "qEs": "¿Sudoración fría asociada?",
              "type": "yn"
            },
            {
              "q": "Náuseas ou vômitos associados?",
              "qEs": "¿Náuseas o vómitos asociados?",
              "type": "yn"
            },
            {
              "q": "Síncope ou pré-síncope associada?",
              "qEs": "¿Síncope o presíncope asociado?",
              "type": "yn"
            },
            {
              "q": "Febre?",
              "qEs": "¿Fiebre?",
              "type": "yn"
            },
            {
              "q": "Tosse associada?",
              "qEs": "¿Tos asociada?",
              "type": "yn"
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
              "q": "Dor torácica em \"facada\" no dorso/interescapular, com diferença de pressão arterial entre os braços (suspeita de dissecção aórtica) — sinal de alarme?",
              "qEs": "¿Dolor torácico \"como puñalada\" en dorso/interescapular, con diferencia de presión arterial entre brazos (sospecha de disección aórtica) — signo de alarma?",
              "type": "yn"
            },
            {
              "q": "Antecedentes cardiovasculares (IAM, angina, revascularização, arritmias)?",
              "qEs": "¿Antecedentes cardiovasculares (IAM, angina, revascularización, arritmias)?",
              "type": "yn"
            },
            {
              "q": "Fatores de risco cardiovascular (HAS, diabetes, dislipidemia, tabagismo, obesidade, história familiar)?",
              "qEs": "¿Factores de riesgo cardiovascular (HTA, diabetes, dislipidemia, tabaquismo, obesidad, antecedentes familiares)?",
              "type": "yn"
            },
            {
              "q": "Uso de medicamentos (anticoagulantes, antiagregantes, anti-hipertensivos, estatinas)?",
              "qEs": "¿Uso de medicamentos (anticoagulantes, antiagregantes, antihipertensivos, estatinas)?",
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
          "rasHighlight": [
            "resp",
            "cardio"
          ],
          "ddx": [
            [
              "IAM",
              "Opressão, irradiação MSE, sudorese, >20min",
              "Sem alívio NTG, enzimas ↑"
            ],
            [
              "Angina instável",
              "Opressão típica, <20min",
              "Alivia NTG, enzimas normais"
            ],
            [
              "Dissecção aórtica",
              "Desgarrante, dorso, HTA",
              "Assimetria pulsos"
            ],
            [
              "TEP",
              "Pleurítica, dispneia súbita",
              "SpO2 ↓, TVP"
            ],
            [
              "Pericardite",
              "Melhora sentado, atrito",
              "Difusa, ECG ST difuso"
            ],
            [
              "DRGE",
              "Queimação, pós-prandial",
              "Melhora IBP/antiácido"
            ]
          ]
        },
        {
          "id": "dispneia",
          "name": "Dispneia",
          "nameEs": "Disnea",
          "icon": "🫁",
          "color": "mc-primary",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Brusco/Súbito (minutos)",
                "Agudo (horas a dias)",
                "Progressivo/crônico (semanas a meses)",
                "Crônico com piora aguda"
              ]
            },
            {
              "q": "Intensidade (escala mMRC)",
              "qEs": "Intensidad (escala mMRC)",
              "type": "radio",
              "opts": [
                "Grau 0 — só com exercício intenso",
                "Grau 1 — ao apressar o passo/subir ladeira",
                "Grau 2 — anda mais devagar que pessoas da idade",
                "Grau 3 — para para respirar após ~100m",
                "Grau 4 — ao vestir-se / não sai de casa"
              ]
            },
            {
              "q": "Relação com esforço físico",
              "qEs": "Relación con el esfuerzo físico",
              "type": "radio",
              "opts": [
                "Aos grandes esforços",
                "Aos médios esforços",
                "Aos pequenos esforços",
                "Em repouso"
              ]
            },
            {
              "q": "Relação com decúbito",
              "qEs": "Relación con decúbito",
              "type": "radio",
              "opts": [
                "Ortopneia (piora deitado)",
                "Platipneia (melhora deitado)",
                "Sem relação"
              ]
            },
            {
              "q": "Ortopneia — quantos travesseiros usa para dormir?",
              "qEs": "Ortopnea — ¿cuántas almohadas usa para dormir?",
              "type": "input",
              "ph": "Número de travesseiros",
              "ph2": "Número de almohadas"
            },
            {
              "q": "Dispneia paroxística noturna (acorda sufocado)?",
              "qEs": "¿Disnea paroxística nocturna (se despierta sofocado)?",
              "type": "yn"
            },
            {
              "q": "Fatores desencadeantes (esforço, frio, alérgenos, posição, estresse, infecções)?",
              "qEs": "¿Factores desencadenantes (esfuerzo, frío, alérgenos, posición, estrés, infecciones)?",
              "type": "input",
              "ph": "Descreva os fatores desencadeantes",
              "ph2": "Describa los factores desencadenantes"
            },
            {
              "q": "Chiado no peito / Sibilância?",
              "qEs": "¿Silbido en el pecho?",
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
              "q": "Dor torácica associada?",
              "qEs": "¿Dolor torácico asociado?",
              "type": "yn"
            },
            {
              "q": "Edema de membros inferiores associado?",
              "qEs": "¿Edema de miembros inferiores asociado?",
              "type": "yn"
            },
            {
              "q": "Palpitações associadas?",
              "qEs": "¿Palpitaciones asociadas?",
              "type": "yn"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Antecedentes cardíacos (ICC, valvopatia, IAM) ou pulmonares (asma, DPOC, fibrose)?",
              "qEs": "¿Antecedentes cardíacos (ICC, valvulopatía, IAM) o pulmonares (asma, EPOC, fibrosis)?",
              "type": "yn"
            },
            {
              "q": "Tabagismo (atual ou prévio)? Carga tabágica",
              "qEs": "¿Tabaquismo (actual o previo)? Carga tabáquica",
              "type": "input",
              "ph": "Anos-maço",
              "ph2": "Años-paquete"
            },
            {
              "q": "Exposições ocupacionais ou alérgenos (poeiras, fumaças, animais, mofo)?",
              "qEs": "¿Exposiciones ocupacionales o alérgenos (polvos, humos, animales, moho)?",
              "type": "yn"
            },
            {
              "q": "Episódios semelhantes prévios? Como evoluíram e qual tratamento foi feito?",
              "qEs": "¿Episodios similares previos? ¿Cómo evolucionaron y qué tratamiento se realizó?",
              "type": "input",
              "ph": "Descreva episódios anteriores e tratamento",
              "ph2": "Describa episodios anteriores y tratamiento"
            },
            {
              "q": "Uso de medicamentos (broncodilatadores, diuréticos, anti-hipertensivos, IECA)?",
              "qEs": "¿Uso de medicamentos (broncodilatadores, diuréticos, antihipertensivos, IECA)?",
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
          "rasHighlight": [
            "resp",
            "cardio"
          ]
        }
      ]
    },
    {
      "cat": "Neurológico",
      "catEs": "Neurológico",
      "items": [
        {
          "id": "cefaleia",
          "name": "Cefaleia",
          "nameEs": "Cefalea",
          "icon": "🧠",
          "color": "mc-purple",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização",
              "qEs": "Localización",
              "type": "radio",
              "opts": [
                "Frontal",
                "Temporal",
                "Occipital",
                "Hemicraniana",
                "Holocraniana",
                "Peri-ocular"
              ]
            },
            {
              "q": "Irradiação",
              "qEs": "Irradiación",
              "type": "radio",
              "opts": [
                "Para nuca/pescoço",
                "Para órbita/face",
                "Sem irradiação"
              ]
            },
            {
              "q": "Caráter/tipo",
              "qEs": "Carácter/tipo",
              "type": "radio",
              "opts": [
                "Pulsátil/latejante",
                "Em pressão/aperto",
                "Em facada/lancinante",
                "Em explosão (thunderclap)"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Duração de cada episódio",
              "qEs": "Duración de cada episodio",
              "type": "radio",
              "opts": [
                "Minutos",
                "Horas (4-72h)",
                "Mais de 72h/contínua"
              ]
            },
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito/explosivo (thunderclap — pico em <1min)",
                "Gradual/progressivo"
              ]
            },
            {
              "q": "Fatores desencadeantes ou que aliviam",
              "qEs": "Factores desencadenantes o que alivian",
              "type": "multi",
              "opts": [
                "Estresse/tensão emocional",
                "Privação de sono ou sono em excesso",
                "Jejum prolongado/pular refeições",
                "Consumo de álcool",
                "Período menstrual/ciclo hormonal",
                "Mudança de posição (piora ao deitar/curvar-se)",
                "Luz forte ou brilho intenso (fotofobia)",
                "Odores fortes/perfumes",
                "Mudanças climáticas/pressão atmosférica",
                "Esforço físico",
                "Repouso em ambiente escuro e silencioso alivia",
                "Sem fator identificado"
              ],
              "optsEs": [
                "Estrés/tensión emocional",
                "Privación de sueño o exceso de sueño",
                "Ayuno prolongado/saltarse comidas",
                "Consumo de alcohol",
                "Período menstrual/ciclo hormonal",
                "Cambio de posición (empeora al acostarse/agacharse)",
                "Luz fuerte o brillo intenso (fotofobia)",
                "Olores fuertes/perfumes",
                "Cambios climáticos/presión atmosférica",
                "Esfuerzo físico",
                "El reposo en ambiente oscuro y silencioso alivia",
                "Sin factor identificado"
              ]
            },
            {
              "q": "Periodicidade — episódica, em crises (salvas) ou diária/contínua?",
              "qEs": "¿Periodicidad — episódica, en racimos (salvas) o diaria/continua?",
              "type": "radio",
              "opts": [
                "Episódica esporádica",
                "Em crises/salvas (cluster)",
                "Crônica diária ou quase diária"
              ]
            },
            {
              "q": "Piora com Valsalva, tosse ou esforço físico?",
              "qEs": "¿Empeora con Valsalva, tos o esfuerzo físico?",
              "type": "yn"
            },
            {
              "q": "Náuseas/vômitos associados?",
              "qEs": "¿Náuseas/vómitos asociados?",
              "type": "yn"
            },
            {
              "q": "Fotofobia ou fonofobia?",
              "qEs": "¿Fotofobia o fonofobia?",
              "type": "yn"
            },
            {
              "q": "Aura visual ou sensitiva precedendo a dor (escotomas, zigue-zague, formigamento)?",
              "qEs": "¿Aura visual o sensitiva que precede el dolor (escotomas, zigzag, hormigueo)?",
              "type": "yn"
            },
            {
              "q": "Lacrimejamento, congestão nasal ou ptose do mesmo lado da dor (sinais autonômicos)?",
              "qEs": "¿Lagrimeo, congestión nasal o ptosis del mismo lado del dolor (signos autonómicos)?",
              "type": "yn"
            },
            {
              "q": "Sinais de alarme — pior cefaleia da vida, início súbito, febre, rigidez de nuca, déficit neurológico focal, alteração do nível de consciência, primeira crise após os 50 anos, gravidez/puerpério, mudança no padrão habitual (SNOOP)?",
              "qEs": "¿Signos de alarma — peor cefalea de la vida, inicio súbito, fiebre, rigidez de nuca, déficit neurológico focal, alteración del nivel de conciencia, primera crisis después de los 50 años, embarazo/puerperio, cambio en el patrón habitual (SNOOP)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes pessoais ou familiares de enxaqueca/cefaleias?",
              "qEs": "¿Antecedentes personales o familiares de migraña/cefaleas?",
              "type": "yn"
            },
            {
              "q": "Trauma craniano recente?",
              "qEs": "¿Traumatismo craneal reciente?",
              "type": "yn"
            },
            {
              "q": "Frequência de uso de analgésicos (risco de cefaleia por uso excessivo de medicação)",
              "qEs": "Frecuencia de uso de analgésicos (riesgo de cefalea por uso excesivo de medicación)",
              "type": "radio",
              "opts": [
                "Não usa analgésicos para a dor de cabeça",
                "Uso ocasional (poucas vezes ao mês)",
                "Uso frequente (≥2x/semana)",
                "Uso quase diário (≥10-15 dias/mês — sugere cefaleia por uso excessivo de medicação)"
              ],
              "optsEs": [
                "No usa analgésicos para el dolor de cabeza",
                "Uso ocasional (pocas veces al mes)",
                "Uso frecuente (≥2x/semana)",
                "Uso casi diario (≥10-15 días/mes — sugiere cefalea por uso excesivo de medicación)"
              ]
            },
            {
              "q": "Quais medicamentos costuma usar (nome/marca)?",
              "qEs": "¿Qué medicamentos suele usar (nombre/marca)?",
              "type": "input",
              "ph": "Ex: dipirona, paracetamol, ibuprofeno, triptano...",
              "ph2": "Ej: dipirona, paracetamol, ibuprofeno, triptán..."
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
          "rasHighlight": [
            "cabeca",
            "neuro"
          ]
        },
        {
          "id": "convulsao-sincope",
          "name": "Convulsão / Síncope / Perda de Consciência Transitória",
          "nameEs": "Convulsión / Síncope / Pérdida de Consciencia Transitoria",
          "icon": "⚡",
          "color": "mc-purple",
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
          "rasHighlight": [
            "cabeca",
            "cardio",
            "neuro"
          ]
        }
      ]
    },
    {
      "cat": "Infeccioso / Geral",
      "catEs": "Infeccioso / General",
      "items": [
        {
          "id": "febre",
          "name": "Febre",
          "nameEs": "Fiebre",
          "icon": "🌡️",
          "color": "mc-danger",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito (calafrio + pico rápido)",
                "Gradual/insidioso"
              ]
            },
            {
              "q": "Há quantos dias está com febre?",
              "qEs": "¿Hace cuántos días tiene fiebre?",
              "type": "input",
              "ph": "Nº de dias",
              "ph2": "Nº de días"
            },
            {
              "q": "Temperatura máxima registrada",
              "qEs": "Temperatura máxima registrada",
              "type": "input",
              "ph": "°C",
              "ph2": "°C"
            },
            {
              "q": "Padrão/curva febril ao longo do dia",
              "qEs": "Patrón/curva febril a lo largo del día",
              "type": "radio",
              "opts": [
                "Contínua",
                "Remitente",
                "Intermitente",
                "Héctica/Séptica",
                "Irregular",
                "Ondulante (recorrente)"
              ]
            },
            {
              "q": "A febre cedeu em algum momento? Há quanto tempo terminou (se já cessou)?",
              "qEs": "¿La fiebre cedió en algún momento? ¿Hace cuánto terminó (si ya cesó)?",
              "type": "input",
              "ph": "Descreva o término/evolução",
              "ph2": "Describa el término/evolución"
            },
            {
              "q": "Calafrios / tremores intensos?",
              "qEs": "¿Escalofríos / temblores intensos?",
              "type": "yn"
            },
            {
              "q": "Sudorese profusa, principalmente noturna?",
              "qEs": "¿Sudoración profusa, sobre todo nocturna?",
              "type": "yn"
            },
            {
              "q": "Tratamento com antitérmico? Qual, dose e resposta?",
              "qEs": "¿Tratamiento con antitérmico? ¿Cuál, dosis y respuesta?",
              "type": "input",
              "ph": "Medicamento, dose, resposta",
              "ph2": "Medicamento, dosis, respuesta"
            },
            {
              "q": "Focos infecciosos (selecione os presentes)",
              "qEs": "Focos infecciosos (seleccione los presentes)",
              "type": "multi",
              "opts": [
                "Tosse/dispneia (respiratório)",
                "Odinofagia/dor de garganta",
                "Disúria/polaciúria (urinário)",
                "Diarreia/dor abdominal (digestivo)",
                "Lesão ou secreção cutânea"
              ],
              "optsEs": [
                "Tos/disnea (respiratorio)",
                "Odinofagia/dolor de garganta",
                "Disuria/polaquiuria (urinario)",
                "Diarrea/dolor abdominal (digestivo)",
                "Lesión o secreción cutánea"
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
              "q": "Linfonodos aumentados/dolorosos (gânglios)?",
              "qEs": "¿Ganglios linfáticos aumentados/dolorosos?",
              "type": "yn"
            },
            {
              "q": "Rash ou lesões cutâneas associadas?",
              "qEs": "¿Erupción o lesiones cutáneas asociadas?",
              "type": "yn"
            },
            {
              "q": "Perda de peso associada?",
              "qEs": "¿Pérdida de peso asociada?",
              "type": "yn"
            },
            {
              "q": "Viagem recente para área endêmica (malária, dengue, febre amarela, outras)?",
              "qEs": "¿Viaje reciente a área endémica (malaria, dengue, fiebre amarilla, otras)?",
              "type": "yn"
            },
            {
              "q": "Contato com pessoas doentes ou animais recentemente?",
              "qEs": "¿Contacto con personas enfermas o animales recientemente?",
              "type": "yn"
            },
            {
              "q": "Situação vacinal em dia (incluindo febre amarela, influenza, COVID)?",
              "qEs": "¿Situación de vacunación al día (incluyendo fiebre amarilla, influenza, COVID)?",
              "type": "yn"
            },
            {
              "q": "Condições de imunossupressão (HIV, quimioterapia, corticoide crônico, diabetes descompensado, transplante)?",
              "qEs": "¿Condiciones de inmunosupresión (VIH, quimioterapia, corticoide crónico, diabetes descompensada, trasplante)?",
              "type": "yn"
            },
            {
              "q": "Uso de outros medicamentos recentes (incluindo antibióticos)?",
              "qEs": "¿Uso de otros medicamentos recientes (incluyendo antibióticos)?",
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
          "rasHighlight": [
            "cabeca",
            "resp",
            "cardio",
            "digest",
            "genito",
            "pele"
          ]
        }
      ]
    },
    {
      "cat": "Gastrointestinal",
      "catEs": "Gastrointestinal",
      "items": [
        {
          "id": "dor-abdominal",
          "name": "Dor Abdominal",
          "nameEs": "Dolor Abdominal",
          "icon": "🫀",
          "color": "mc-accent",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização inicial",
              "qEs": "Localización inicial",
              "type": "radio",
              "opts": [
                "Epigástrio",
                "HCD",
                "HCE",
                "FID",
                "FIE",
                "Periumbilical",
                "Hipogástrio",
                "Difusa"
              ]
            },
            {
              "q": "A dor migrou de localização desde o início?",
              "qEs": "¿El dolor migró de localización desde el inicio?",
              "type": "radio",
              "opts": [
                "Sim — de periumbilical/epigástrio para FID (padrão clássico de apendicite)",
                "Sim — outro padrão de migração",
                "Não migrou, permaneceu no mesmo local"
              ],
              "optsEs": [
                "Sí — de periumbilical/epigástrico hacia FID (patrón clásico de apendicitis)",
                "Sí — otro patrón de migración",
                "No migró, permaneció en el mismo lugar"
              ]
            },
            {
              "q": "Irradiação",
              "qEs": "Irradiación",
              "type": "radio",
              "opts": [
                "Para o dorso",
                "Para o ombro",
                "Para a região inguinal/genital",
                "Para o flanco",
                "Sem irradiação"
              ]
            },
            {
              "q": "Tipo/caráter da dor",
              "qEs": "Tipo/carácter del dolor",
              "type": "radio",
              "opts": [
                "Em cólica",
                "Em queimação",
                "Em peso/distensão",
                "Em facada/aguda",
                "Surda/contínua"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Duração",
              "qEs": "Duración",
              "type": "radio",
              "opts": [
                "Minutos (em crises)",
                "Horas",
                "Dias",
                "Contínua/persistente"
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
              "q": "Relação com alimentação",
              "qEs": "Relación con alimentación",
              "type": "radio",
              "opts": [
                "Piora após refeição",
                "Melhora após refeição",
                "Alivia com jejum",
                "Sem relação"
              ]
            },
            {
              "q": "Relação com posição, evacuação ou eliminação de gases",
              "qEs": "Relación con la posición, la evacuación o la eliminación de gases",
              "type": "multi",
              "opts": [
                "Piora ao evacuar",
                "Melhora ao evacuar/eliminar gases",
                "Piora com movimento ou mudança de posição",
                "Melhora ao se encolher/posição fetal",
                "Piora ao caminhar ou tossir (irritação peritoneal)",
                "Sem relação identificada"
              ],
              "optsEs": [
                "Empeora al evacuar",
                "Mejora al evacuar/eliminar gases",
                "Empeora con el movimiento o cambio de posición",
                "Mejora al encogerse/posición fetal",
                "Empeora al caminar o toser (irritación peritoneal)",
                "Sin relación identificada"
              ]
            },
            {
              "q": "Evolução desde o início (piorando, estável, em crises)?",
              "qEs": "¿Evolución desde el inicio (empeorando, estable, en crisis)?",
              "type": "radio",
              "opts": [
                "Piorando progressivamente",
                "Estável",
                "Melhorando",
                "Em crises intermitentes"
              ]
            },
            {
              "q": "Náuseas / vômitos associados? Em que ordem surgiram em relação à dor?",
              "qEs": "¿Náuseas / vómitos asociados? ¿En qué orden aparecieron respecto al dolor?",
              "type": "yn"
            },
            {
              "q": "Alteração do hábito intestinal (diarreia, constipação, parada de eliminação de fezes e gases)?",
              "qEs": "¿Alteración del hábito intestinal (diarrea, estreñimiento, parada de eliminación de heces y gases)?",
              "type": "yn"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Icterícia, colúria ou acolia fecal?",
              "qEs": "¿Ictericia, coluria o acolia fecal?",
              "type": "yn"
            },
            {
              "q": "Distensão abdominal?",
              "qEs": "¿Distensión abdominal?",
              "type": "yn"
            },
            {
              "q": "Hematêmese / melena / hematoquezia (sinais de alarme)?",
              "qEs": "¿Hematemesis / melena / hematoquecia (signos de alarma)?",
              "type": "yn"
            },
            {
              "q": "Sinais de alarme — defesa abdominal, rigidez, sinais de choque, dor súbita e intensa?",
              "qEs": "¿Signos de alarma — defensa abdominal, rigidez, signos de shock, dolor súbito e intenso?",
              "type": "yn"
            },
            {
              "q": "Antecedentes cirúrgicos abdominais ou ginecológicos?",
              "qEs": "¿Antecedentes quirúrgicos abdominales o ginecológicos?",
              "type": "yn"
            },
            {
              "q": "Uso de medicamentos (AINEs, anticoagulantes, corticoides, antibióticos)?",
              "qEs": "¿Uso de medicamentos (AINEs, anticoagulantes, corticoides, antibióticos)?",
              "type": "input",
              "ph": "Liste os medicamentos em uso",
              "ph2": "Liste los medicamentos en uso"
            },
            {
              "q": "Data da última menstruação / possibilidade de gravidez (se aplicável)?",
              "qEs": "¿Fecha de la última menstruación / posibilidad de embarazo (si aplica)?",
              "type": "input",
              "ph": "DUM / possibilidade de gravidez",
              "ph2": "FUM / posibilidad de embarazo"
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
          "rasHighlight": [
            "digest",
            "genito"
          ]
        },
        {
          "id": "ictericia",
          "name": "Icterícia",
          "nameEs": "Ictericia",
          "icon": "🟡",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito (dias)",
                "Insidioso/gradual (semanas a meses)"
              ]
            },
            {
              "q": "Há quanto tempo notou a coloração amarelada da pele/olhos?",
              "qEs": "¿Hace cuánto notó la coloración amarillenta de la piel/ojos?",
              "type": "input",
              "ph": "Tempo de evolução",
              "ph2": "Tiempo de evolución"
            },
            {
              "q": "Quem notou primeiro — o próprio paciente, familiares ou profissional de saúde?",
              "qEs": "¿Quién lo notó primero — el propio paciente, familiares o profesional de salud?",
              "type": "input",
              "ph": "Descreva como foi percebido",
              "ph2": "Describa cómo fue percibido"
            },
            {
              "q": "Urina escurecida (colúria — cor de \"Coca-Cola\" ou chá forte)?",
              "qEs": "¿Orina oscura (coluria — color \"Coca-Cola\" o té fuerte)?",
              "type": "yn"
            },
            {
              "q": "Fezes claras/esbranquiçadas (acolia ou hipocolia fecal)?",
              "qEs": "¿Heces claras/blanquecinas (acolia o hipocolia fecal)?",
              "type": "yn"
            },
            {
              "q": "Prurido (coceira) generalizado, especialmente noturno?",
              "qEs": "¿Prurito (picazón) generalizado, especialmente nocturno?",
              "type": "yn"
            },
            {
              "q": "Dor abdominal associada? Localização e caráter?",
              "qEs": "¿Dolor abdominal asociado? ¿Localización y carácter?",
              "type": "input",
              "ph": "Descreva localização e caráter da dor (se houver)",
              "ph2": "Describa localización y carácter del dolor (si lo hay)"
            },
            {
              "q": "Febre ou calafrios associados?",
              "qEs": "¿Fiebre o escalofríos asociados?",
              "type": "yn"
            },
            {
              "q": "Náuseas, vômitos ou intolerância alimentar (especialmente a gorduras)?",
              "qEs": "¿Náuseas, vómitos o intolerancia alimentaria (especialmente a las grasas)?",
              "type": "yn"
            },
            {
              "q": "Perda de peso não intencional? Quanto e em quanto tempo?",
              "qEs": "¿Pérdida de peso no intencional? ¿Cuánto y en cuánto tiempo?",
              "type": "input",
              "ph": "Quilos perdidos e período",
              "ph2": "Kilos perdidos y período"
            },
            {
              "q": "Distensão abdominal ou aumento do volume do abdome (possível ascite)?",
              "qEs": "¿Distensión abdominal o aumento del volumen del abdomen (posible ascitis)?",
              "type": "yn"
            },
            {
              "q": "Hematêmese, melena ou sangramentos fáceis (gengivorragia, equimoses)?",
              "qEs": "¿Hematemesis, melena o sangrados fáciles (gingivorragia, equimosis)?",
              "type": "yn"
            },
            {
              "q": "Histórico de doença hepática prévia (hepatite, cirrose, esteatose)?",
              "qEs": "¿Historial de enfermedad hepática previa (hepatitis, cirrosis, esteatosis)?",
              "type": "yn"
            },
            {
              "q": "Etilismo — quantidade e tempo de uso de álcool?",
              "qEs": "¿Etilismo — cantidad y tiempo de consumo de alcohol?",
              "type": "input",
              "ph": "Descreva o padrão de consumo de álcool",
              "ph2": "Describa el patrón de consumo de alcohol"
            },
            {
              "q": "Histórico de transfusões sanguíneas, tatuagens, piercings ou uso de drogas injetáveis (risco de hepatites virais)?",
              "qEs": "¿Historial de transfusiones sanguíneas, tatuajes, piercings o uso de drogas inyectables (riesgo de hepatitis virales)?",
              "type": "yn"
            },
            {
              "q": "Viagens recentes para áreas de saneamento precário ou contato com pessoas ictéricas?",
              "qEs": "¿Viajes recientes a zonas de saneamiento precario o contacto con personas ictéricas?",
              "type": "yn"
            },
            {
              "q": "Uso recente de medicamentos, fitoterápicos ou suplementos potencialmente hepatotóxicos (paracetamol em altas doses, antibióticos, anticonvulsivantes, anabolizantes)?",
              "qEs": "¿Uso reciente de medicamentos, fitoterápicos o suplementos potencialmente hepatotóxicos (paracetamol en altas dosis, antibióticos, anticonvulsivantes, anabolizantes)?",
              "type": "input",
              "ph": "Liste os medicamentos/substâncias em uso",
              "ph2": "Liste los medicamentos/sustancias en uso"
            },
            {
              "q": "Histórico pessoal de neoplasia (especialmente digestiva, pancreática ou hepatobiliar)?",
              "qEs": "¿Historial personal de neoplasia (especialmente digestiva, pancreática o hepatobiliar)?",
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
          "rasHighlight": [
            "digest",
            "pele"
          ]
        }
      ]
    },
    {
      "cat": "Outros",
      "catEs": "Otros",
      "items": [
        {
          "id": "edema",
          "name": "Edema",
          "nameEs": "Edema",
          "icon": "💧",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Agudo/súbito (horas a dias)",
                "Subagudo (dias a semanas)",
                "Crônico/insidioso (semanas a meses)"
              ]
            },
            {
              "q": "Localização",
              "qEs": "Localización",
              "type": "radio",
              "opts": [
                "Membros inferiores (bilateral)",
                "Membro inferior (unilateral)",
                "Membros superiores",
                "Facial/periorbital",
                "Generalizado/anasarca",
                "Escroto/genital",
                "Abdominal (ascite)"
              ]
            },
            {
              "q": "Simetria",
              "qEs": "Simetría",
              "type": "radio",
              "opts": [
                "Simétrico/bilateral",
                "Assimétrico/unilateral"
              ]
            },
            {
              "q": "Progressão",
              "qEs": "Progresión",
              "type": "radio",
              "opts": [
                "Ascendente (pés → pernas → coxas)",
                "Estável, sem progressão",
                "Migratório/intermitente"
              ]
            },
            {
              "q": "Momento do dia / variação",
              "qEs": "Momento del día / variación",
              "type": "radio",
              "opts": [
                "Vespertino (piora no fim do dia, melhora pela manhã)",
                "Matutino/periorbital ao acordar",
                "Constante, sem variação diurna"
              ]
            },
            {
              "q": "Cacifo (sinal de godet positivo)?",
              "qEs": "¿Signo de fóvea/godet positivo?",
              "type": "yn"
            },
            {
              "q": "Dor, calor ou rubor local associado?",
              "qEs": "¿Dolor, calor o rubor local asociado?",
              "type": "yn"
            },
            {
              "q": "Fatores que pioram (ortostatismo prolongado, calor, sal na dieta, viagens longas)",
              "qEs": "Factores que empeoran (bipedestación prolongada, calor, sal en la dieta, viajes largos)",
              "type": "input",
              "ph": "Descreva os fatores desencadeantes/agravantes",
              "ph2": "Describa los factores desencadenantes/agravantes"
            },
            {
              "q": "Fatores que melhoram (repouso, elevação dos membros, restrição de sal, diuréticos)",
              "qEs": "Factores que mejoran (reposo, elevación de miembros, restricción de sal, diuréticos)",
              "type": "input",
              "ph": "Descreva os fatores de melhora",
              "ph2": "Describa los factores de mejora"
            },
            {
              "q": "Dispneia associada (aos esforços, ortopneia, DPN)?",
              "qEs": "¿Disnea asociada (de esfuerzo, ortopnea, DPN)?",
              "type": "yn"
            },
            {
              "q": "Palpitações ou dor torácica associadas?",
              "qEs": "¿Palpitaciones o dolor torácico asociados?",
              "type": "yn"
            },
            {
              "q": "Oligúria, colúria, espuma na urina (proteinúria)?",
              "qEs": "¿Oliguria, coluria, espuma en la orina (proteinuria)?",
              "type": "yn"
            },
            {
              "q": "Aumento do volume abdominal / distensão?",
              "qEs": "¿Aumento del volumen abdominal / distensión?",
              "type": "yn"
            },
            {
              "q": "Icterícia ou outros sinais de hepatopatia?",
              "qEs": "¿Ictericia u otros signos de hepatopatía?",
              "type": "yn"
            },
            {
              "q": "Ganho de peso recente? Quanto e em quanto tempo?",
              "qEs": "¿Aumento de peso reciente? ¿Cuánto y en cuánto tiempo?",
              "type": "input",
              "ph": "kg / período",
              "ph2": "kg / período"
            },
            {
              "q": "Dispneia para deitar (ortopneia) — quantos travesseiros usa para dormir?",
              "qEs": "¿Disnea al acostarse (ortopnea) — cuántas almohadas usa para dormir?",
              "type": "input",
              "ph": "Número de travesseiros",
              "ph2": "Número de almohadas"
            },
            {
              "q": "Imobilização prolongada, viagem longa recente ou cirurgia recente (risco de TVP)?",
              "qEs": "¿Inmovilización prolongada, viaje largo reciente o cirugía reciente (riesgo de TVP)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes de doença cardíaca, renal, hepática ou tireoidiana?",
              "qEs": "¿Antecedentes de enfermedad cardíaca, renal, hepática o tiroidea?",
              "type": "yn"
            },
            {
              "q": "Uso de medicamentos (anti-hipertensivos/BCC, AINEs, corticoides, hormônios, hipoglicemiantes)?",
              "qEs": "¿Uso de medicamentos (antihipertensivos/BCC, AINEs, corticoides, hormonas, hipoglucemiantes)?",
              "type": "input",
              "ph": "Liste os medicamentos em uso",
              "ph2": "Liste los medicamentos en uso"
            },
            {
              "q": "Possibilidade de gravidez / atraso menstrual (em mulheres)?",
              "qEs": "¿Posibilidad de embarazo / atraso menstrual (en mujeres)?",
              "type": "yn"
            },
            {
              "q": "Dieta rica em sal ou baixa ingestão proteica?",
              "qEs": "¿Dieta rica en sal o baja ingesta proteica?",
              "type": "yn"
            },
            {
              "q": "Episódios semelhantes prévios? Como evoluíram e qual tratamento foi feito?",
              "qEs": "¿Episodios similares previos? ¿Cómo evolucionaron y qué tratamiento se realizó?",
              "type": "input",
              "ph": "Descreva episódios anteriores e tratamento",
              "ph2": "Describa episodios anteriores y tratamiento"
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
          "rasHighlight": [
            "cardio",
            "genito",
            "resp",
            "digest",
            "pele"
          ]
        },
        {
          "id": "tosse",
          "name": "Tosse",
          "nameEs": "Tos",
          "icon": "😮‍💨",
          "color": "mc-primary",
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
              "q": "Tipo de tosse",
              "qEs": "Tipo de tos",
              "type": "radio",
              "opts": [
                "Seca (não produtiva)",
                "Produtiva/Úmida",
                "Metálica/rouca"
              ],
              "optsEs": [
                "Seca (no productiva)",
                "Productiva/Húmeda",
                "Metálica/ronca"
              ]
            },
            {
              "q": "Há expectoração (escarro)?",
              "qEs": "¿Hay expectoración (esputo)?",
              "type": "yn"
            },
            {
              "q": "Características do escarro (cor/aspecto)",
              "qEs": "Características del esputo (color/aspecto)",
              "type": "radio",
              "opts": [
                "Mucoide (claro/branco)",
                "Mucopurulento (amarelado — infecção)",
                "Purulento (esverdeado/fétido — bacteriana)",
                "Hemoptoico — com sangue (alarme)",
                "Seroso/espumoso (rosado — edema pulmonar)"
              ],
              "optsEs": [
                "Mucoide (claro/blanco)",
                "Mucopurulento (amarillento — infección)",
                "Purulento (verdoso/fétido — bacteriana)",
                "Hemoptoico — con sangre (alarma)",
                "Seroso/espumoso (rosado — edema pulmonar)"
              ]
            },
            {
              "q": "Hemoptise (sangue no escarro)?",
              "qEs": "¿Hemoptisis (sangre en el esputo)?",
              "type": "yn"
            },
            {
              "q": "Momento de predomínio",
              "qEs": "Momento de predominio",
              "type": "radio",
              "opts": [
                "Constante (diurna)",
                "Noturna",
                "Matutina (ao acordar)",
                "Pós-prandial ou ao deitar"
              ],
              "optsEs": [
                "Constante (diurna)",
                "Nocturna",
                "Matutina (al despertar)",
                "Posprandial o al acostarse"
              ]
            },
            {
              "q": "Fatores desencadeantes ou agravantes",
              "qEs": "Factores desencadenantes o agravantes",
              "type": "multi",
              "opts": [
                "Frio/ar gelado",
                "Exercício físico",
                "Decúbito (ao deitar)",
                "Alérgenos (pólen, pelos, ácaros)",
                "Fumaça/irritantes",
                "Pós-refeição",
                "Conversa prolongada",
                "Inspiração profunda"
              ],
              "optsEs": [
                "Frío/aire frío",
                "Ejercicio físico",
                "Decúbito (al acostarse)",
                "Alérgenos (polvo, pelo, ácaros)",
                "Humo/irritantes",
                "Posprandial",
                "Conversación prolongada",
                "Inspiración profunda"
              ]
            },
            {
              "q": "Outros fatores desencadeantes (campo livre)",
              "qEs": "Otros factores desencadenantes (campo libre)",
              "type": "input",
              "ph": "Descreva outros fatores",
              "ph2": "Describa otros factores"
            },
            {
              "q": "Fatores de alívio",
              "qEs": "Factores de alivio",
              "type": "multi",
              "opts": [
                "Repouso",
                "Mudança de posição",
                "Broncodilatadores/inalador",
                "Antitussígenos",
                "Vapor/umidificação",
                "Nenhum fator identificado"
              ],
              "optsEs": [
                "Reposo",
                "Cambio de posición",
                "Broncodilatadores/inhalador",
                "Antitusígenos",
                "Vapor/humidificación",
                "Ningún factor identificado"
              ]
            },
            {
              "q": "Outros fatores de alívio (campo livre)",
              "qEs": "Otros factores de alivio (campo libre)",
              "type": "input",
              "ph": "Descreva outros fatores",
              "ph2": "Describa otros factores"
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
              "q": "Sibilância/chiado?",
              "qEs": "¿Sibilancias?",
              "type": "yn"
            },
            {
              "q": "Dor torácica associada?",
              "qEs": "¿Dolor torácico asociado?",
              "type": "yn"
            },
            {
              "q": "Coriza, espirros ou gotejamento pós-nasal?",
              "qEs": "¿Rinorrea, estornudos o goteo posnasal?",
              "type": "yn"
            },
            {
              "q": "Pirose ou regurgitação (DRGE)?",
              "qEs": "¿Pirosis o regurgitación (ERGE)?",
              "type": "yn"
            },
            {
              "q": "Tabagismo — carga tabágica",
              "qEs": "Tabaquismo — carga tabáquica",
              "type": "input",
              "ph": "Anos-maço (ex: 20 cigarros/dia × 10 anos = 10 maços-ano)",
              "ph2": "Paquetes-año (ej: 20 cigarrillos/día × 10 años = 10 paquetes-año)"
            },
            {
              "q": "Uso de IECA (captopril, enalapril, lisinopril)?",
              "qEs": "¿Uso de IECA (captopril, enalapril, lisinopril)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes respiratórios",
              "qEs": "Antecedentes respiratorios",
              "type": "multi",
              "opts": [
                "Asma",
                "DPOC",
                "Tuberculose prévia",
                "Bronquiectasia",
                "Nenhum antecedente relevante"
              ],
              "optsEs": [
                "Asma",
                "EPOC",
                "Tuberculosis previa",
                "Bronquiectasia",
                "Sin antecedente relevante"
              ]
            },
            {
              "q": "Exposição ocupacional ou ambiental",
              "qEs": "Exposición ocupacional o ambiental",
              "type": "multi",
              "opts": [
                "Poeiras (madeira, farinha, cimento)",
                "Fumaças e gases tóxicos",
                "Animais/penas/pelos",
                "Fibras minerais (amianto, sílica)",
                "Fungos/mofo em ambiente fechado",
                "Sem exposição identificada"
              ],
              "optsEs": [
                "Polvos (madera, harina, cemento)",
                "Humos y gases tóxicos",
                "Animales/plumas/pelaje",
                "Fibras minerales (amianto, sílice)",
                "Hongos/moho en ambientes cerrados",
                "Sin exposición identificada"
              ]
            },
            {
              "q": "Perda de peso não intencional?",
              "qEs": "¿Pérdida de peso no intencional?",
              "type": "yn"
            },
            {
              "q": "Sudorese noturna?",
              "qEs": "¿Sudoración nocturna?",
              "type": "yn"
            },
            {
              "q": "Situação vacinal (influenza, pneumocócica, coqueluche)?",
              "qEs": "¿Estado vacunal (influenza, neumocócica, tos ferina)?",
              "type": "yn"
            },
            {
              "q": "Contato com pessoa doente ou caso suspeito de TB?",
              "qEs": "¿Contacto con persona enferma o caso sospechoso de TB?",
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
          "rasHighlight": [
            "resp",
            "cabeca"
          ]
        },
        {
          "id": "tontura-vertigem",
          "name": "Tontura / Vertigem",
          "nameEs": "Mareo / Vértigo",
          "icon": "🌀",
          "color": "mc-purple",
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
          "rasHighlight": [
            "cabeca",
            "neuro",
            "cardio"
          ]
        },
        {
          "id": "perda-peso",
          "name": "Perda de Peso / Anorexia",
          "nameEs": "Pérdida de Peso / Anorexia",
          "icon": "⚖️",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Quantidade de peso perdido e em quanto tempo?",
              "qEs": "¿Cuánto peso perdió y en cuánto tiempo?",
              "type": "input",
              "ph": "kg / período",
              "ph2": "kg / período"
            },
            {
              "q": "Perda foi intencional (dieta/exercício) ou não intencional?",
              "qEs": "¿La pérdida fue intencional (dieta/ejercicio) o no intencional?",
              "type": "radio",
              "opts": [
                "Intencional",
                "Não intencional/involuntária"
              ]
            },
            {
              "q": "Diminuição do apetite (anorexia)?",
              "qEs": "¿Disminución del apetito (anorexia)?",
              "type": "yn"
            },
            {
              "q": "Febre, sudorese noturna associadas?",
              "qEs": "¿Fiebre, sudoración nocturna asociadas?",
              "type": "yn"
            },
            {
              "q": "Alteração do hábito intestinal (diarreia, constipação, esteatorreia)?",
              "qEs": "¿Alteración del hábito intestinal (diarrea, estreñimiento, esteatorrea)?",
              "type": "yn"
            },
            {
              "q": "Disfagia ou odinofagia?",
              "qEs": "¿Disfagia u odinofagia?",
              "type": "yn"
            },
            {
              "q": "Sintomas de hipertireoidismo (palpitações, tremor, intolerância ao calor)?",
              "qEs": "¿Síntomas de hipertiroidismo (palpitaciones, temblor, intolerancia al calor)?",
              "type": "yn"
            },
            {
              "q": "Sintomas depressivos, ansiedade, estresse recente?",
              "qEs": "¿Síntomas depresivos, ansiedad, estrés reciente?",
              "type": "yn"
            },
            {
              "q": "Uso de álcool, drogas ou medicamentos novos?",
              "qEs": "¿Uso de alcohol, drogas o medicamentos nuevos?",
              "type": "yn"
            },
            {
              "q": "Antecedentes familiares de neoplasia?",
              "qEs": "¿Antecedentes familiares de neoplasia?",
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
          "rasHighlight": [
            "digest",
            "endocrino",
            "psiquismo"
          ]
        }
      ]
    },
    {
      "cat": "Gastrointestinal — Outros",
      "catEs": "Gastrointestinal — Otros",
      "items": [
        {
          "id": "nauseas-vomitos",
          "name": "Náuseas e Vômitos",
          "nameEs": "Náuseas y Vómitos",
          "icon": "🤢",
          "color": "mc-accent",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Agudo/súbito",
                "Gradual",
                "Recorrente/cíclico"
              ]
            },
            {
              "q": "Frequência e quantidade dos vômitos",
              "qEs": "Frecuencia y cantidad de los vómitos",
              "type": "input",
              "ph": "Nº de episódios/dia, volume aproximado",
              "ph2": "Nº de episodios/día, volumen aproximado"
            },
            {
              "q": "Conteúdo do vômito",
              "qEs": "Contenido del vómito",
              "type": "radio",
              "opts": [
                "Alimentar",
                "Bilioso (esverdeado)",
                "Fecaloide",
                "Hemático (hematêmese)",
                "Em borra de café"
              ]
            },
            {
              "q": "Relação temporal com as refeições?",
              "qEs": "¿Relación temporal con las comidas?",
              "type": "radio",
              "opts": [
                "Imediatamente após comer",
                "Horas após comer",
                "Em jejum/matutino",
                "Sem relação"
              ]
            },
            {
              "q": "Alívio da dor/náusea após o vômito?",
              "qEs": "¿Alivio del dolor/náusea tras el vómito?",
              "type": "yn"
            },
            {
              "q": "Dor abdominal associada?",
              "qEs": "¿Dolor abdominal asociado?",
              "type": "yn"
            },
            {
              "q": "Diarreia ou constipação associada?",
              "qEs": "¿Diarrea o estreñimiento asociado?",
              "type": "yn"
            },
            {
              "q": "Cefaleia, vertigem ou alterações neurológicas associadas?",
              "qEs": "¿Cefalea, vértigo o alteraciones neurológicas asociadas?",
              "type": "yn"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Possibilidade de gravidez (mulheres em idade fértil)?",
              "qEs": "¿Posibilidad de embarazo (mujeres en edad fértil)?",
              "type": "yn"
            },
            {
              "q": "Sinais de desidratação (sede intensa, diminuição da diurese, tontura postural)?",
              "qEs": "¿Signos de deshidratación (sed intensa, disminución de la diuresis, mareo postural)?",
              "type": "yn"
            },
            {
              "q": "Uso recente de medicamentos, álcool ou alimentos suspeitos?",
              "qEs": "¿Uso reciente de medicamentos, alcohol o alimentos sospechosos?",
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
          "rasHighlight": [
            "digest",
            "cabeca"
          ]
        },
        {
          "id": "diarreia",
          "name": "Diarreia",
          "nameEs": "Diarrea",
          "icon": "🚽",
          "color": "mc-accent",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Agudo (<2 semanas)",
                "Crônico (>4 semanas)"
              ]
            },
            {
              "q": "Número de evacuações por dia e volume aproximado",
              "qEs": "Número de evacuaciones por día y volumen aproximado",
              "type": "input",
              "ph": "Nº/dia, volume",
              "ph2": "Nº/día, volumen"
            },
            {
              "q": "Características das fezes",
              "qEs": "Características de las heces",
              "type": "radio",
              "opts": [
                "Aquosa",
                "Pastosa",
                "Com muco",
                "Com sangue (enterorragia)",
                "Esteatorreica (gordurosa, fétida)"
              ]
            },
            {
              "q": "Presença de sangue ou muco nas fezes?",
              "qEs": "¿Presencia de sangre o moco en las heces?",
              "type": "yn"
            },
            {
              "q": "Dor abdominal ou cólicas associadas?",
              "qEs": "¿Dolor abdominal o cólicos asociados?",
              "type": "yn"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Náuseas / vômitos associados?",
              "qEs": "¿Náuseas / vómitos asociados?",
              "type": "yn"
            },
            {
              "q": "Tenesmo ou urgência evacuatória?",
              "qEs": "¿Tenesmo o urgencia evacuatoria?",
              "type": "yn"
            },
            {
              "q": "Relação com determinados alimentos (ex.: laticínios, glúten)?",
              "qEs": "¿Relación con ciertos alimentos (ej.: lácteos, gluten)?",
              "type": "yn"
            },
            {
              "q": "Viagens recentes, ingestão de água/alimentos suspeitos, contato com doentes?",
              "qEs": "¿Viajes recientes, ingestión de agua/alimentos sospechosos, contacto con enfermos?",
              "type": "yn"
            },
            {
              "q": "Uso recente de antibióticos ou outros medicamentos?",
              "qEs": "¿Uso reciente de antibióticos u otros medicamentos?",
              "type": "yn"
            },
            {
              "q": "Sinais de desidratação?",
              "qEs": "¿Signos de deshidratación?",
              "type": "yn"
            },
            {
              "q": "Perda de peso associada (se crônica)?",
              "qEs": "¿Pérdida de peso asociada (si es crónica)?",
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
          "rasHighlight": [
            "digest"
          ]
        }
      ]
    },
    {
      "cat": "Cardiovascular — Outros",
      "catEs": "Cardiovascular — Otros",
      "items": [
        {
          "id": "palpitacoes",
          "name": "Palpitações",
          "nameEs": "Palpitaciones",
          "icon": "💓",
          "color": "mc-danger",
          "aeaGuide": [
            {
              "q": "Como descreveria a sensação?",
              "qEs": "¿Cómo describiría la sensación?",
              "type": "radio",
              "opts": [
                "Coração acelerado/disparado",
                "Coração batendo forte",
                "Falhas/saltos no ritmo (extrassístoles)",
                "Coração irregular/desordenado"
              ]
            },
            {
              "q": "Início e término",
              "qEs": "Inicio y término",
              "type": "radio",
              "opts": [
                "Início e término súbitos (em segundos)",
                "Início e término graduais"
              ]
            },
            {
              "q": "Duração do episódio",
              "qEs": "Duración del episodio",
              "type": "radio",
              "opts": [
                "Segundos",
                "Minutos",
                "Horas",
                "Persistente/contínuo"
              ]
            },
            {
              "q": "Frequência dos episódios",
              "qEs": "Frecuencia de los episodios",
              "type": "input",
              "ph": "Quantas vezes por dia/semana/mês",
              "ph2": "Cuántas veces por día/semana/mes"
            },
            {
              "q": "Fatores desencadeantes (esforço, estresse, cafeína, álcool, posição)?",
              "qEs": "¿Factores desencadenantes (esfuerzo, estrés, cafeína, alcohol, posición)?",
              "type": "input",
              "ph": "Descreva os fatores",
              "ph2": "Describa los factores"
            },
            {
              "q": "Síncope ou pré-síncope associada?",
              "qEs": "¿Síncope o presíncope asociado?",
              "type": "yn"
            },
            {
              "q": "Dor torácica associada?",
              "qEs": "¿Dolor torácico asociado?",
              "type": "yn"
            },
            {
              "q": "Dispneia associada?",
              "qEs": "¿Disnea asociada?",
              "type": "yn"
            },
            {
              "q": "Sudorese, tremor, intolerância ao calor (suspeita de hipertireoidismo)?",
              "qEs": "¿Sudoración, temblor, intolerancia al calor (sospecha de hipertiroidismo)?",
              "type": "yn"
            },
            {
              "q": "Ansiedade ou crises de pânico associadas?",
              "qEs": "¿Ansiedad o crisis de pánico asociadas?",
              "type": "yn"
            },
            {
              "q": "Uso de cafeína, álcool, tabaco, drogas estimulantes ou medicamentos (broncodilatadores, hormônio tireoidiano)?",
              "qEs": "¿Uso de cafeína, alcohol, tabaco, drogas estimulantes o medicamentos (broncodilatadores, hormona tiroidea)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes pessoais ou familiares de arritmia, morte súbita ou doença cardíaca?",
              "qEs": "¿Antecedentes personales o familiares de arritmia, muerte súbita o enfermedad cardíaca?",
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
          "rasHighlight": [
            "cardio",
            "resp"
          ]
        }
      ]
    },
    {
      "cat": "Geniturinário",
      "catEs": "Genitourinario",
      "items": [
        {
          "id": "sintomas-urinarios",
          "name": "Disúria / Sintomas Urinários",
          "nameEs": "Disuria / Síntomas Urinarios",
          "icon": "🚻",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Disúria (dor/ardor ao urinar)?",
              "qEs": "¿Disuria (dolor/ardor al orinar)?",
              "type": "yn"
            },
            {
              "q": "Polaciúria (aumento da frequência urinária)?",
              "qEs": "¿Polaquiuria (aumento de la frecuencia urinaria)?",
              "type": "yn"
            },
            {
              "q": "Urgência miccional ou tenesmo vesical?",
              "qEs": "¿Urgencia miccional o tenesmo vesical?",
              "type": "yn"
            },
            {
              "q": "Hematúria (sangue na urina)? Início ou final da micção?",
              "qEs": "¿Hematuria (sangre en la orina)? ¿Al inicio o al final de la micción?",
              "type": "yn"
            },
            {
              "q": "Características da urina (cor, odor, presença de espuma)",
              "qEs": "Características de la orina (color, olor, presencia de espuma)",
              "type": "input",
              "ph": "Descreva as características",
              "ph2": "Describa las características"
            },
            {
              "q": "Dor lombar ou em flanco associada (cólica renal)?",
              "qEs": "¿Dolor lumbar o en flanco asociado (cólico renal)?",
              "type": "yn"
            },
            {
              "q": "Febre ou calafrios associados?",
              "qEs": "¿Fiebre o escalofríos asociados?",
              "type": "yn"
            },
            {
              "q": "Secreção uretral ou vaginal associada?",
              "qEs": "¿Secreción uretral o vaginal asociada?",
              "type": "yn"
            },
            {
              "q": "Dificuldade para iniciar ou interromper o jato urinário, jato fraco (sintomas obstrutivos)?",
              "qEs": "¿Dificultad para iniciar o detener el chorro urinario, chorro débil (síntomas obstructivos)?",
              "type": "yn"
            },
            {
              "q": "Nictúria (quantas vezes urina à noite)?",
              "qEs": "¿Nicturia (cuántas veces orina por la noche)?",
              "type": "input",
              "ph": "Nº de vezes",
              "ph2": "Nº de veces"
            },
            {
              "q": "Hábitos sexuais e história de infecções sexualmente transmissíveis?",
              "qEs": "¿Hábitos sexuales e historia de infecciones de transmisión sexual?",
              "type": "yn"
            },
            {
              "q": "Episódios prévios semelhantes (infecções urinárias de repetição, cálculos)?",
              "qEs": "¿Episodios previos similares (infecciones urinarias de repetición, cálculos)?",
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
          "rasHighlight": [
            "genito"
          ]
        }
      ]
    },
    {
      "cat": "Osteoarticular",
      "catEs": "Osteoarticular",
      "items": [
        {
          "id": "lombalgia",
          "name": "Dor Lombar / Lombalgia",
          "nameEs": "Dolor Lumbar / Lumbalgia",
          "icon": "🦴",
          "color": "mc-purple",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Agudo/súbito (após esforço/trauma)",
                "Insidioso/gradual"
              ]
            },
            {
              "q": "Localização",
              "qEs": "Localización",
              "type": "radio",
              "opts": [
                "Linha média lombar",
                "Paravertebral uni/bilateral",
                "Lombar com irradiação para membro inferior"
              ]
            },
            {
              "q": "Irradiação para o membro inferior (ciática)?",
              "qEs": "¿Irradiación al miembro inferior (ciática)?",
              "type": "yn"
            },
            {
              "q": "Caráter da dor",
              "qEs": "Carácter del dolor",
              "type": "radio",
              "opts": [
                "Em pontada/aguda",
                "Em queimação/disestésica",
                "Surda/contínua",
                "Em cólica"
              ]
            },
            {
              "q": "Relação com movimento, esforço ou repouso",
              "qEs": "Relación con movimiento, esfuerzo o reposo",
              "type": "radio",
              "opts": [
                "Piora com movimento/esforço, melhora com repouso (mecânica)",
                "Piora com repouso/à noite, melhora com movimento (inflamatória)",
                "Sem relação clara"
              ]
            },
            {
              "q": "Rigidez matinal? Por quanto tempo dura?",
              "qEs": "¿Rigidez matutina? ¿Cuánto dura?",
              "type": "yn"
            },
            {
              "q": "Parestesias, formigamento ou fraqueza no(s) membro(s) inferior(es)?",
              "qEs": "¿Parestesias, hormigueo o debilidad en miembro(s) inferior(es)?",
              "type": "yn"
            },
            {
              "q": "Alteração do controle esfincteriano (incontinência urinária/fecal) ou anestesia em sela — sinais de alarme?",
              "qEs": "¿Alteración del control esfinteriano (incontinencia urinaria/fecal) o anestesia en silla de montar — signos de alarma?",
              "type": "yn"
            },
            {
              "q": "Febre, perda de peso ou sudorese noturna associadas?",
              "qEs": "¿Fiebre, pérdida de peso o sudoración nocturna asociadas?",
              "type": "yn"
            },
            {
              "q": "Trauma recente?",
              "qEs": "¿Trauma reciente?",
              "type": "yn"
            },
            {
              "q": "História de neoplasia, uso crônico de corticoides ou osteoporose?",
              "qEs": "¿Historia de neoplasia, uso crónico de corticoides u osteoporosis?",
              "type": "yn"
            },
            {
              "q": "Fatores ocupacionais/posturais associados",
              "qEs": "Factores ocupacionales/posturales asociados",
              "type": "multi",
              "opts": [
                "Trabalho com levantamento de peso/carga",
                "Longos períodos sentado",
                "Longos períodos em pé",
                "Movimentos repetitivos de tronco/coluna",
                "Vibração ocupacional (ex: dirigir, máquinas)",
                "Postura inadequada no trabalho ou em casa",
                "Sedentarismo",
                "Nenhum fator ocupacional identificado"
              ],
              "optsEs": [
                "Trabajo con levantamiento de peso/carga",
                "Largos períodos sentado",
                "Largos períodos de pie",
                "Movimientos repetitivos de tronco/columna",
                "Vibración ocupacional (ej: conducir, máquinas)",
                "Postura inadecuada en el trabajo o en casa",
                "Sedentarismo",
                "Ningún factor ocupacional identificado"
              ]
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
          "rasHighlight": [
            "osteo",
            "neuro"
          ]
        },
        {
          "id": "artralgia",
          "name": "Artralgia / Dor Articular",
          "nameEs": "Artralgia / Dolor Articular",
          "icon": "🦵",
          "color": "mc-purple",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Quantas articulações estão acometidas?",
              "qEs": "¿Cuántas articulaciones están afectadas?",
              "type": "radio",
              "opts": [
                "Uma articulação (monoarticular)",
                "Duas a quatro articulações (oligoarticular)",
                "Cinco ou mais articulações (poliarticular)"
              ]
            },
            {
              "q": "Distribuição é simétrica (mesmas articulações dos dois lados)?",
              "qEs": "¿La distribución es simétrica (mismas articulaciones en ambos lados)?",
              "type": "yn"
            },
            {
              "q": "Quais articulações estão envolvidas?",
              "qEs": "¿Qué articulaciones están involucradas?",
              "type": "input",
              "ph": "Ex.: joelhos, mãos, tornozelos...",
              "ph2": "Ej.: rodillas, manos, tobillos..."
            },
            {
              "q": "Tipo/caráter da dor",
              "qEs": "Tipo/carácter del dolor",
              "type": "radio",
              "opts": [
                "Em peso/latejante",
                "Em queimação",
                "Em pontada/aguda",
                "Surda/contínua"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Agudo/súbito (horas a dias)",
                "Subagudo/gradual (semanas)",
                "Crônico (meses)"
              ]
            },
            {
              "q": "Padrão de evolução entre as articulações",
              "qEs": "Patrón de evolución entre las articulaciones",
              "type": "radio",
              "opts": [
                "Aditivo (vai acometendo novas articulações sem melhora das anteriores)",
                "Migratório (melhora em uma e surge em outra)",
                "Episódico/recorrente (crises intercaladas com períodos assintomáticos)"
              ]
            },
            {
              "q": "Ritmo da dor — piora pela manhã com rigidez prolongada (inflamatório) ou piora ao longo do dia/com uso (mecânico)?",
              "qEs": "¿Ritmo del dolor — empeora por la mañana con rigidez prolongada (inflamatorio) o empeora a lo largo del día/con el uso (mecánico)?",
              "type": "radio",
              "opts": [
                "Inflamatório — pior pela manhã, rigidez >1 hora, melhora com movimento",
                "Mecânico — piora com uso/esforço, alivia com repouso",
                "Misto/indefinido"
              ]
            },
            {
              "q": "Sinais inflamatórios locais — calor, rubor, edema (inchaço) ou derrame articular?",
              "qEs": "¿Signos inflamatorios locales — calor, rubor, edema (hinchazón) o derrame articular?",
              "type": "yn"
            },
            {
              "q": "Fatores que desencadeiam ou pioram",
              "qEs": "Factores que desencadenan o empeoran",
              "type": "multi",
              "opts": [
                "Esforço físico/uso da articulação",
                "Trauma recente",
                "Exposição ao frio",
                "Determinados alimentos (ex: carnes vermelhas, frutos do mar — gota)",
                "Consumo de álcool",
                "Estresse",
                "Mudanças climáticas/pressão atmosférica",
                "Início do movimento após repouso (mecânico)",
                "Nenhum fator identificado"
              ],
              "optsEs": [
                "Esfuerzo físico/uso de la articulación",
                "Trauma reciente",
                "Exposición al frío",
                "Determinados alimentos (ej: carnes rojas, mariscos — gota)",
                "Consumo de alcohol",
                "Estrés",
                "Cambios climáticos/presión atmosférica",
                "Inicio del movimiento tras el reposo (mecánico)",
                "Ningún factor identificado"
              ]
            },
            {
              "q": "Fatores que aliviam",
              "qEs": "Factores que alivian",
              "type": "multi",
              "opts": [
                "Repouso",
                "Calor local",
                "Frio local/gelo",
                "Movimento/uso gradual da articulação",
                "Medicação analgésica/anti-inflamatória",
                "Elevação do membro",
                "Nenhum fator de melhora identificado"
              ],
              "optsEs": [
                "Reposo",
                "Calor local",
                "Frío local/hielo",
                "Movimiento/uso gradual de la articulación",
                "Medicación analgésica/antiinflamatoria",
                "Elevación del miembro",
                "Ningún factor de mejora identificado"
              ]
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Lesões de pele, psoríase ou rash cutâneo associado?",
              "qEs": "¿Lesiones de piel, psoriasis o erupción cutánea asociada?",
              "type": "yn"
            },
            {
              "q": "Lesões orais/genitais, olho vermelho ou conjuntivite associados?",
              "qEs": "¿Lesiones orales/genitales, ojo rojo o conjuntivitis asociados?",
              "type": "yn"
            },
            {
              "q": "Fenômeno de Raynaud (mudança de cor nos dedos com frio/estresse)?",
              "qEs": "¿Fenómeno de Raynaud (cambio de color en los dedos con el frío/estrés)?",
              "type": "yn"
            },
            {
              "q": "Sintomas sistêmicos associados (perda de peso, fadiga, sudorese noturna)?",
              "qEs": "¿Síntomas sistémicos asociados (pérdida de peso, fatiga, sudoración nocturna)?",
              "type": "yn"
            },
            {
              "q": "Trauma recente na(s) articulação(ões)?",
              "qEs": "¿Trauma reciente en la(s) articulación(es)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes pessoais ou familiares de doença autoimune, psoríase, gota ou espondiloartrite?",
              "qEs": "¿Antecedentes personales o familiares de enfermedad autoinmune, psoriasis, gota o espondiloartritis?",
              "type": "yn"
            },
            {
              "q": "Infecção recente (gastrointestinal, urinária, de vias aéreas, picada de carrapato) nas últimas semanas?",
              "qEs": "¿Infección reciente (gastrointestinal, urinaria, de vías respiratorias, picadura de garrapata) en las últimas semanas?",
              "type": "yn"
            },
            {
              "q": "Uso de medicamentos (diuréticos, corticoides, imunossupressores, anticoagulantes)?",
              "qEs": "¿Uso de medicamentos (diuréticos, corticoides, inmunosupresores, anticoagulantes)?",
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
          "rasHighlight": [
            "osteo",
            "pele"
          ]
        }
      ]
    }
  ],
  "semiologia": [
    {
      "cat": "Dor e Dispneia",
      "catEs": "Dolor y Disnea",
      "items": [
        {
          "id": "semio-dor",
          "name": "Dor",
          "nameEs": "Dolor",
          "icon": "🤕",
          "color": "mc-danger",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização da dor?",
              "qEs": "¿Localización del dolor?",
              "type": "input",
              "ph": "Ex: abdominal, torácica, cabeça, membros",
              "ph2": "Ej: abdominal, torácica, cabeza, miembros"
            },
            {
              "q": "Irradiação?",
              "qEs": "¿Irradiación?",
              "type": "input",
              "ph": "Ex: para o ombro, braço, virilha",
              "ph2": "Ej: hacia el hombro, brazo, ingle"
            },
            {
              "q": "Caráter da dor?",
              "qEs": "¿Carácter del dolor?",
              "type": "radio",
              "opts": [
                "Queimação",
                "Pontada",
                "Cólica",
                "Pressão/aperto",
                "Latejante",
                "Surda/em peso"
              ],
              "optsEs": [
                "Ardor/quemazón",
                "Punzada",
                "Cólico",
                "Presión/opresión",
                "Pulsátil",
                "Sorda/pesada"
              ]
            },
            {
              "q": "Intensidade (EVA 0–10)?",
              "qEs": "¿Intensidad (EVA 0–10)?",
              "type": "radio",
              "opts": [
                "1-3 (leve)",
                "4-6 (moderada)",
                "7-8 (intensa)",
                "9-10 (insuportável)"
              ],
              "optsEs": [
                "1-3 (leve)",
                "4-6 (moderada)",
                "7-8 (intensa)",
                "9-10 (insoportable)"
              ]
            },
            {
              "q": "Início e duração?",
              "qEs": "¿Inicio y duración?",
              "type": "radio",
              "opts": [
                "Agudo (<24h)",
                "Subagudo (dias)",
                "Crônico (>4 semanas)"
              ],
              "optsEs": [
                "Agudo (<24h)",
                "Subagudo (días)",
                "Crónico (>4 semanas)"
              ]
            },
            {
              "q": "Fatores de melhora?",
              "qEs": "¿Factores que alivian?",
              "type": "multi",
              "opts": [
                "Repouso",
                "Analgésicos",
                "Calor local",
                "Frio local",
                "Alimentação",
                "Posição antálgica"
              ],
              "optsEs": [
                "Reposo",
                "Analgésicos",
                "Calor local",
                "Frío local",
                "Alimentación",
                "Posición antiálgica"
              ]
            },
            {
              "q": "Fatores de piora?",
              "qEs": "¿Factores que agravan?",
              "type": "multi",
              "opts": [
                "Esforço físico",
                "Alimentação",
                "Palpação",
                "Movimento",
                "Inspiração profunda",
                "Defecação"
              ],
              "optsEs": [
                "Esfuerzo físico",
                "Alimentación",
                "Palpación",
                "Movimiento",
                "Inspiración profunda",
                "Defecación"
              ]
            },
            {
              "q": "Sintomas associados?",
              "qEs": "¿Síntomas asociados?",
              "type": "multi",
              "opts": [
                "Náuseas/vômitos",
                "Febre",
                "Dispneia",
                "Sudorese",
                "Palidez",
                "Alteração intestinal"
              ],
              "optsEs": [
                "Náuseas/vómitos",
                "Fiebre",
                "Disnea",
                "Sudoración",
                "Palidez",
                "Alteración intestinal"
              ]
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
          ]
        },
        {
          "id": "dispneia",
          "name": "Dispneia",
          "nameEs": "Disnea",
          "icon": "🫁",
          "color": "mc-primary",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Brusco/Súbito (minutos)",
                "Agudo (horas a dias)",
                "Progressivo/crônico (semanas a meses)",
                "Crônico com piora aguda"
              ]
            },
            {
              "q": "Intensidade (escala mMRC)",
              "qEs": "Intensidad (escala mMRC)",
              "type": "radio",
              "opts": [
                "Grau 0 — só com exercício intenso",
                "Grau 1 — ao apressar o passo/subir ladeira",
                "Grau 2 — anda mais devagar que pessoas da idade",
                "Grau 3 — para para respirar após ~100m",
                "Grau 4 — ao vestir-se / não sai de casa"
              ]
            },
            {
              "q": "Relação com esforço físico",
              "qEs": "Relación con el esfuerzo físico",
              "type": "radio",
              "opts": [
                "Aos grandes esforços",
                "Aos médios esforços",
                "Aos pequenos esforços",
                "Em repouso"
              ]
            },
            {
              "q": "Relação com decúbito",
              "qEs": "Relación con decúbito",
              "type": "radio",
              "opts": [
                "Ortopneia (piora deitado)",
                "Platipneia (melhora deitado)",
                "Sem relação"
              ]
            },
            {
              "q": "Ortopneia — quantos travesseiros usa para dormir?",
              "qEs": "Ortopnea — ¿cuántas almohadas usa para dormir?",
              "type": "input",
              "ph": "Número de travesseiros",
              "ph2": "Número de almohadas"
            },
            {
              "q": "Dispneia paroxística noturna (acorda sufocado)?",
              "qEs": "¿Disnea paroxística nocturna (se despierta sofocado)?",
              "type": "yn"
            },
            {
              "q": "Fatores desencadeantes (esforço, frio, alérgenos, posição, estresse, infecções)?",
              "qEs": "¿Factores desencadenantes (esfuerzo, frío, alérgenos, posición, estrés, infecciones)?",
              "type": "input",
              "ph": "Descreva os fatores desencadeantes",
              "ph2": "Describa los factores desencadenantes"
            },
            {
              "q": "Chiado no peito / Sibilância?",
              "qEs": "¿Silbido en el pecho?",
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
              "q": "Dor torácica associada?",
              "qEs": "¿Dolor torácico asociado?",
              "type": "yn"
            },
            {
              "q": "Edema de membros inferiores associado?",
              "qEs": "¿Edema de miembros inferiores asociado?",
              "type": "yn"
            },
            {
              "q": "Palpitações associadas?",
              "qEs": "¿Palpitaciones asociadas?",
              "type": "yn"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Antecedentes cardíacos (ICC, valvopatia, IAM) ou pulmonares (asma, DPOC, fibrose)?",
              "qEs": "¿Antecedentes cardíacos (ICC, valvulopatía, IAM) o pulmonares (asma, EPOC, fibrosis)?",
              "type": "yn"
            },
            {
              "q": "Tabagismo (atual ou prévio)? Carga tabágica",
              "qEs": "¿Tabaquismo (actual o previo)? Carga tabáquica",
              "type": "input",
              "ph": "Anos-maço",
              "ph2": "Años-paquete"
            },
            {
              "q": "Exposições ocupacionais ou alérgenos (poeiras, fumaças, animais, mofo)?",
              "qEs": "¿Exposiciones ocupacionales o alérgenos (polvos, humos, animales, moho)?",
              "type": "yn"
            },
            {
              "q": "Episódios semelhantes prévios? Como evoluíram e qual tratamento foi feito?",
              "qEs": "¿Episodios similares previos? ¿Cómo evolucionaron y qué tratamiento se realizó?",
              "type": "input",
              "ph": "Descreva episódios anteriores e tratamento",
              "ph2": "Describa episodios anteriores y tratamiento"
            },
            {
              "q": "Uso de medicamentos (broncodilatadores, diuréticos, anti-hipertensivos, IECA)?",
              "qEs": "¿Uso de medicamentos (broncodilatadores, diuréticos, antihipertensivos, IECA)?",
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
          "rasHighlight": [
            "resp",
            "cardio"
          ]
        },
        {
          "id": "tosse",
          "name": "Tosse",
          "nameEs": "Tos",
          "icon": "😮‍💨",
          "color": "mc-primary",
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
              "q": "Tipo de tosse",
              "qEs": "Tipo de tos",
              "type": "radio",
              "opts": [
                "Seca (não produtiva)",
                "Produtiva/Úmida",
                "Metálica/rouca"
              ],
              "optsEs": [
                "Seca (no productiva)",
                "Productiva/Húmeda",
                "Metálica/ronca"
              ]
            },
            {
              "q": "Há expectoração (escarro)?",
              "qEs": "¿Hay expectoración (esputo)?",
              "type": "yn"
            },
            {
              "q": "Características do escarro (cor/aspecto)",
              "qEs": "Características del esputo (color/aspecto)",
              "type": "radio",
              "opts": [
                "Mucoide (claro/branco)",
                "Mucopurulento (amarelado — infecção)",
                "Purulento (esverdeado/fétido — bacteriana)",
                "Hemoptoico — com sangue (alarme)",
                "Seroso/espumoso (rosado — edema pulmonar)"
              ],
              "optsEs": [
                "Mucoide (claro/blanco)",
                "Mucopurulento (amarillento — infección)",
                "Purulento (verdoso/fétido — bacteriana)",
                "Hemoptoico — con sangre (alarma)",
                "Seroso/espumoso (rosado — edema pulmonar)"
              ]
            },
            {
              "q": "Hemoptise (sangue no escarro)?",
              "qEs": "¿Hemoptisis (sangre en el esputo)?",
              "type": "yn"
            },
            {
              "q": "Momento de predomínio",
              "qEs": "Momento de predominio",
              "type": "radio",
              "opts": [
                "Constante (diurna)",
                "Noturna",
                "Matutina (ao acordar)",
                "Pós-prandial ou ao deitar"
              ],
              "optsEs": [
                "Constante (diurna)",
                "Nocturna",
                "Matutina (al despertar)",
                "Posprandial o al acostarse"
              ]
            },
            {
              "q": "Fatores desencadeantes ou agravantes",
              "qEs": "Factores desencadenantes o agravantes",
              "type": "multi",
              "opts": [
                "Frio/ar gelado",
                "Exercício físico",
                "Decúbito (ao deitar)",
                "Alérgenos (pólen, pelos, ácaros)",
                "Fumaça/irritantes",
                "Pós-refeição",
                "Conversa prolongada",
                "Inspiração profunda"
              ],
              "optsEs": [
                "Frío/aire frío",
                "Ejercicio físico",
                "Decúbito (al acostarse)",
                "Alérgenos (polvo, pelo, ácaros)",
                "Humo/irritantes",
                "Posprandial",
                "Conversación prolongada",
                "Inspiración profunda"
              ]
            },
            {
              "q": "Outros fatores desencadeantes (campo livre)",
              "qEs": "Otros factores desencadenantes (campo libre)",
              "type": "input",
              "ph": "Descreva outros fatores",
              "ph2": "Describa otros factores"
            },
            {
              "q": "Fatores de alívio",
              "qEs": "Factores de alivio",
              "type": "multi",
              "opts": [
                "Repouso",
                "Mudança de posição",
                "Broncodilatadores/inalador",
                "Antitussígenos",
                "Vapor/umidificação",
                "Nenhum fator identificado"
              ],
              "optsEs": [
                "Reposo",
                "Cambio de posición",
                "Broncodilatadores/inhalador",
                "Antitusígenos",
                "Vapor/humidificación",
                "Ningún factor identificado"
              ]
            },
            {
              "q": "Outros fatores de alívio (campo livre)",
              "qEs": "Otros factores de alivio (campo libre)",
              "type": "input",
              "ph": "Descreva outros fatores",
              "ph2": "Describa otros factores"
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
              "q": "Sibilância/chiado?",
              "qEs": "¿Sibilancias?",
              "type": "yn"
            },
            {
              "q": "Dor torácica associada?",
              "qEs": "¿Dolor torácico asociado?",
              "type": "yn"
            },
            {
              "q": "Coriza, espirros ou gotejamento pós-nasal?",
              "qEs": "¿Rinorrea, estornudos o goteo posnasal?",
              "type": "yn"
            },
            {
              "q": "Pirose ou regurgitação (DRGE)?",
              "qEs": "¿Pirosis o regurgitación (ERGE)?",
              "type": "yn"
            },
            {
              "q": "Tabagismo — carga tabágica",
              "qEs": "Tabaquismo — carga tabáquica",
              "type": "input",
              "ph": "Anos-maço (ex: 20 cigarros/dia × 10 anos = 10 maços-ano)",
              "ph2": "Paquetes-año (ej: 20 cigarrillos/día × 10 años = 10 paquetes-año)"
            },
            {
              "q": "Uso de IECA (captopril, enalapril, lisinopril)?",
              "qEs": "¿Uso de IECA (captopril, enalapril, lisinopril)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes respiratórios",
              "qEs": "Antecedentes respiratorios",
              "type": "multi",
              "opts": [
                "Asma",
                "DPOC",
                "Tuberculose prévia",
                "Bronquiectasia",
                "Nenhum antecedente relevante"
              ],
              "optsEs": [
                "Asma",
                "EPOC",
                "Tuberculosis previa",
                "Bronquiectasia",
                "Sin antecedente relevante"
              ]
            },
            {
              "q": "Exposição ocupacional ou ambiental",
              "qEs": "Exposición ocupacional o ambiental",
              "type": "multi",
              "opts": [
                "Poeiras (madeira, farinha, cimento)",
                "Fumaças e gases tóxicos",
                "Animais/penas/pelos",
                "Fibras minerais (amianto, sílica)",
                "Fungos/mofo em ambiente fechado",
                "Sem exposição identificada"
              ],
              "optsEs": [
                "Polvos (madera, harina, cemento)",
                "Humos y gases tóxicos",
                "Animales/plumas/pelaje",
                "Fibras minerales (amianto, sílice)",
                "Hongos/moho en ambientes cerrados",
                "Sin exposición identificada"
              ]
            },
            {
              "q": "Perda de peso não intencional?",
              "qEs": "¿Pérdida de peso no intencional?",
              "type": "yn"
            },
            {
              "q": "Sudorese noturna?",
              "qEs": "¿Sudoración nocturna?",
              "type": "yn"
            },
            {
              "q": "Situação vacinal (influenza, pneumocócica, coqueluche)?",
              "qEs": "¿Estado vacunal (influenza, neumocócica, tos ferina)?",
              "type": "yn"
            },
            {
              "q": "Contato com pessoa doente ou caso suspeito de TB?",
              "qEs": "¿Contacto con persona enferma o caso sospechoso de TB?",
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
          "rasHighlight": [
            "resp",
            "cabeca"
          ]
        }
      ]
    },
    {
      "cat": "Sinais Clínicos",
      "catEs": "Signos Clínicos",
      "items": [
        {
          "id": "semio-cianose",
          "name": "Cianose",
          "nameEs": "Cianosis",
          "icon": "🔵",
          "color": "mc-navy",
          "aeaGuide": [
            {
              "q": "Localização da cianose?",
              "qEs": "¿Localización de la cianosis?",
              "type": "radio",
              "opts": [
                "Central (lábios, língua, mucosas)",
                "Periférica (extremidades, dedos)",
                "Mista (central + periférica)"
              ],
              "optsEs": [
                "Central (labios, lengua, mucosas)",
                "Periférica (extremidades, dedos)",
                "Mixta (central + periférica)"
              ]
            },
            {
              "q": "Início?",
              "qEs": "¿Inicio?",
              "type": "radio",
              "opts": [
                "Congênita (desde o nascimento)",
                "Progressiva (anos/meses)",
                "Aguda (horas/minutos)"
              ],
              "optsEs": [
                "Congénita (desde el nacimiento)",
                "Progresiva (años/meses)",
                "Aguda (horas/minutos)"
              ]
            },
            {
              "q": "Melhora com administração de oxigênio?",
              "qEs": "¿Mejora con administración de oxígeno?",
              "type": "yn"
            },
            {
              "q": "Dispneia associada?",
              "qEs": "¿Disnea asociada?",
              "type": "yn"
            },
            {
              "q": "Saturação de O₂ medida?",
              "qEs": "¿Saturación de O₂ medida?",
              "type": "input",
              "ph": "% SpO₂",
              "ph2": "% SpO₂"
            },
            {
              "q": "Cardiopatia ou pneumopatia conhecida?",
              "qEs": "¿Cardiopatía o neumopatía conocida?",
              "type": "input",
              "ph": "Ex: DPOC, ICC, cardiopatia congênita",
              "ph2": "Ej: EPOC, ICC, cardiopatía congénita"
            },
            {
              "q": "Temperatura dos membros?",
              "qEs": "¿Temperatura de los miembros?",
              "type": "radio",
              "opts": [
                "Extremidades frias (sugere cianose periférica)",
                "Extremidades quentes (sugere cianose central)"
              ],
              "optsEs": [
                "Extremidades frías (sugiere cianosis periférica)",
                "Extremidades calientes (sugiere cianosis central)"
              ]
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
          ]
        },
        {
          "id": "edema",
          "name": "Edema",
          "nameEs": "Edema",
          "icon": "💧",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Agudo/súbito (horas a dias)",
                "Subagudo (dias a semanas)",
                "Crônico/insidioso (semanas a meses)"
              ]
            },
            {
              "q": "Localização",
              "qEs": "Localización",
              "type": "radio",
              "opts": [
                "Membros inferiores (bilateral)",
                "Membro inferior (unilateral)",
                "Membros superiores",
                "Facial/periorbital",
                "Generalizado/anasarca",
                "Escroto/genital",
                "Abdominal (ascite)"
              ]
            },
            {
              "q": "Simetria",
              "qEs": "Simetría",
              "type": "radio",
              "opts": [
                "Simétrico/bilateral",
                "Assimétrico/unilateral"
              ]
            },
            {
              "q": "Progressão",
              "qEs": "Progresión",
              "type": "radio",
              "opts": [
                "Ascendente (pés → pernas → coxas)",
                "Estável, sem progressão",
                "Migratório/intermitente"
              ]
            },
            {
              "q": "Momento do dia / variação",
              "qEs": "Momento del día / variación",
              "type": "radio",
              "opts": [
                "Vespertino (piora no fim do dia, melhora pela manhã)",
                "Matutino/periorbital ao acordar",
                "Constante, sem variação diurna"
              ]
            },
            {
              "q": "Cacifo (sinal de godet positivo)?",
              "qEs": "¿Signo de fóvea/godet positivo?",
              "type": "yn"
            },
            {
              "q": "Dor, calor ou rubor local associado?",
              "qEs": "¿Dolor, calor o rubor local asociado?",
              "type": "yn"
            },
            {
              "q": "Fatores que pioram (ortostatismo prolongado, calor, sal na dieta, viagens longas)",
              "qEs": "Factores que empeoran (bipedestación prolongada, calor, sal en la dieta, viajes largos)",
              "type": "input",
              "ph": "Descreva os fatores desencadeantes/agravantes",
              "ph2": "Describa los factores desencadenantes/agravantes"
            },
            {
              "q": "Fatores que melhoram (repouso, elevação dos membros, restrição de sal, diuréticos)",
              "qEs": "Factores que mejoran (reposo, elevación de miembros, restricción de sal, diuréticos)",
              "type": "input",
              "ph": "Descreva os fatores de melhora",
              "ph2": "Describa los factores de mejora"
            },
            {
              "q": "Dispneia associada (aos esforços, ortopneia, DPN)?",
              "qEs": "¿Disnea asociada (de esfuerzo, ortopnea, DPN)?",
              "type": "yn"
            },
            {
              "q": "Palpitações ou dor torácica associadas?",
              "qEs": "¿Palpitaciones o dolor torácico asociados?",
              "type": "yn"
            },
            {
              "q": "Oligúria, colúria, espuma na urina (proteinúria)?",
              "qEs": "¿Oliguria, coluria, espuma en la orina (proteinuria)?",
              "type": "yn"
            },
            {
              "q": "Aumento do volume abdominal / distensão?",
              "qEs": "¿Aumento del volumen abdominal / distensión?",
              "type": "yn"
            },
            {
              "q": "Icterícia ou outros sinais de hepatopatia?",
              "qEs": "¿Ictericia u otros signos de hepatopatía?",
              "type": "yn"
            },
            {
              "q": "Ganho de peso recente? Quanto e em quanto tempo?",
              "qEs": "¿Aumento de peso reciente? ¿Cuánto y en cuánto tiempo?",
              "type": "input",
              "ph": "kg / período",
              "ph2": "kg / período"
            },
            {
              "q": "Dispneia para deitar (ortopneia) — quantos travesseiros usa para dormir?",
              "qEs": "¿Disnea al acostarse (ortopnea) — cuántas almohadas usa para dormir?",
              "type": "input",
              "ph": "Número de travesseiros",
              "ph2": "Número de almohadas"
            },
            {
              "q": "Imobilização prolongada, viagem longa recente ou cirurgia recente (risco de TVP)?",
              "qEs": "¿Inmovilización prolongada, viaje largo reciente o cirugía reciente (riesgo de TVP)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes de doença cardíaca, renal, hepática ou tireoidiana?",
              "qEs": "¿Antecedentes de enfermedad cardíaca, renal, hepática o tiroidea?",
              "type": "yn"
            },
            {
              "q": "Uso de medicamentos (anti-hipertensivos/BCC, AINEs, corticoides, hormônios, hipoglicemiantes)?",
              "qEs": "¿Uso de medicamentos (antihipertensivos/BCC, AINEs, corticoides, hormonas, hipoglucemiantes)?",
              "type": "input",
              "ph": "Liste os medicamentos em uso",
              "ph2": "Liste los medicamentos en uso"
            },
            {
              "q": "Possibilidade de gravidez / atraso menstrual (em mulheres)?",
              "qEs": "¿Posibilidad de embarazo / atraso menstrual (en mujeres)?",
              "type": "yn"
            },
            {
              "q": "Dieta rica em sal ou baixa ingestão proteica?",
              "qEs": "¿Dieta rica en sal o baja ingesta proteica?",
              "type": "yn"
            },
            {
              "q": "Episódios semelhantes prévios? Como evoluíram e qual tratamento foi feito?",
              "qEs": "¿Episodios similares previos? ¿Cómo evolucionaron y qué tratamiento se realizó?",
              "type": "input",
              "ph": "Descreva episódios anteriores e tratamento",
              "ph2": "Describa episodios anteriores y tratamiento"
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
          "rasHighlight": [
            "cardio",
            "genito",
            "resp",
            "digest",
            "pele"
          ]
        },
        {
          "id": "ictericia",
          "name": "Icterícia",
          "nameEs": "Ictericia",
          "icon": "🟡",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito (dias)",
                "Insidioso/gradual (semanas a meses)"
              ]
            },
            {
              "q": "Há quanto tempo notou a coloração amarelada da pele/olhos?",
              "qEs": "¿Hace cuánto notó la coloración amarillenta de la piel/ojos?",
              "type": "input",
              "ph": "Tempo de evolução",
              "ph2": "Tiempo de evolución"
            },
            {
              "q": "Quem notou primeiro — o próprio paciente, familiares ou profissional de saúde?",
              "qEs": "¿Quién lo notó primero — el propio paciente, familiares o profesional de salud?",
              "type": "input",
              "ph": "Descreva como foi percebido",
              "ph2": "Describa cómo fue percibido"
            },
            {
              "q": "Urina escurecida (colúria — cor de \"Coca-Cola\" ou chá forte)?",
              "qEs": "¿Orina oscura (coluria — color \"Coca-Cola\" o té fuerte)?",
              "type": "yn"
            },
            {
              "q": "Fezes claras/esbranquiçadas (acolia ou hipocolia fecal)?",
              "qEs": "¿Heces claras/blanquecinas (acolia o hipocolia fecal)?",
              "type": "yn"
            },
            {
              "q": "Prurido (coceira) generalizado, especialmente noturno?",
              "qEs": "¿Prurito (picazón) generalizado, especialmente nocturno?",
              "type": "yn"
            },
            {
              "q": "Dor abdominal associada? Localização e caráter?",
              "qEs": "¿Dolor abdominal asociado? ¿Localización y carácter?",
              "type": "input",
              "ph": "Descreva localização e caráter da dor (se houver)",
              "ph2": "Describa localización y carácter del dolor (si lo hay)"
            },
            {
              "q": "Febre ou calafrios associados?",
              "qEs": "¿Fiebre o escalofríos asociados?",
              "type": "yn"
            },
            {
              "q": "Náuseas, vômitos ou intolerância alimentar (especialmente a gorduras)?",
              "qEs": "¿Náuseas, vómitos o intolerancia alimentaria (especialmente a las grasas)?",
              "type": "yn"
            },
            {
              "q": "Perda de peso não intencional? Quanto e em quanto tempo?",
              "qEs": "¿Pérdida de peso no intencional? ¿Cuánto y en cuánto tiempo?",
              "type": "input",
              "ph": "Quilos perdidos e período",
              "ph2": "Kilos perdidos y período"
            },
            {
              "q": "Distensão abdominal ou aumento do volume do abdome (possível ascite)?",
              "qEs": "¿Distensión abdominal o aumento del volumen del abdomen (posible ascitis)?",
              "type": "yn"
            },
            {
              "q": "Hematêmese, melena ou sangramentos fáceis (gengivorragia, equimoses)?",
              "qEs": "¿Hematemesis, melena o sangrados fáciles (gingivorragia, equimosis)?",
              "type": "yn"
            },
            {
              "q": "Histórico de doença hepática prévia (hepatite, cirrose, esteatose)?",
              "qEs": "¿Historial de enfermedad hepática previa (hepatitis, cirrosis, esteatosis)?",
              "type": "yn"
            },
            {
              "q": "Etilismo — quantidade e tempo de uso de álcool?",
              "qEs": "¿Etilismo — cantidad y tiempo de consumo de alcohol?",
              "type": "input",
              "ph": "Descreva o padrão de consumo de álcool",
              "ph2": "Describa el patrón de consumo de alcohol"
            },
            {
              "q": "Histórico de transfusões sanguíneas, tatuagens, piercings ou uso de drogas injetáveis (risco de hepatites virais)?",
              "qEs": "¿Historial de transfusiones sanguíneas, tatuajes, piercings o uso de drogas inyectables (riesgo de hepatitis virales)?",
              "type": "yn"
            },
            {
              "q": "Viagens recentes para áreas de saneamento precário ou contato com pessoas ictéricas?",
              "qEs": "¿Viajes recientes a zonas de saneamiento precario o contacto con personas ictéricas?",
              "type": "yn"
            },
            {
              "q": "Uso recente de medicamentos, fitoterápicos ou suplementos potencialmente hepatotóxicos (paracetamol em altas doses, antibióticos, anticonvulsivantes, anabolizantes)?",
              "qEs": "¿Uso reciente de medicamentos, fitoterápicos o suplementos potencialmente hepatotóxicos (paracetamol en altas dosis, antibióticos, anticonvulsivantes, anabolizantes)?",
              "type": "input",
              "ph": "Liste os medicamentos/substâncias em uso",
              "ph2": "Liste los medicamentos/sustancias en uso"
            },
            {
              "q": "Histórico pessoal de neoplasia (especialmente digestiva, pancreática ou hepatobiliar)?",
              "qEs": "¿Historial personal de neoplasia (especialmente digestiva, pancreática o hepatobiliar)?",
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
          "rasHighlight": [
            "digest",
            "pele"
          ]
        }
      ]
    },
    {
      "cat": "Sintomas Constitucionais",
      "catEs": "Síntomas Constitucionales",
      "items": [
        {
          "id": "febre",
          "name": "Febre",
          "nameEs": "Fiebre",
          "icon": "🌡️",
          "color": "mc-danger",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito (calafrio + pico rápido)",
                "Gradual/insidioso"
              ]
            },
            {
              "q": "Há quantos dias está com febre?",
              "qEs": "¿Hace cuántos días tiene fiebre?",
              "type": "input",
              "ph": "Nº de dias",
              "ph2": "Nº de días"
            },
            {
              "q": "Temperatura máxima registrada",
              "qEs": "Temperatura máxima registrada",
              "type": "input",
              "ph": "°C",
              "ph2": "°C"
            },
            {
              "q": "Padrão/curva febril ao longo do dia",
              "qEs": "Patrón/curva febril a lo largo del día",
              "type": "radio",
              "opts": [
                "Contínua",
                "Remitente",
                "Intermitente",
                "Héctica/Séptica",
                "Irregular",
                "Ondulante (recorrente)"
              ]
            },
            {
              "q": "A febre cedeu em algum momento? Há quanto tempo terminou (se já cessou)?",
              "qEs": "¿La fiebre cedió en algún momento? ¿Hace cuánto terminó (si ya cesó)?",
              "type": "input",
              "ph": "Descreva o término/evolução",
              "ph2": "Describa el término/evolución"
            },
            {
              "q": "Calafrios / tremores intensos?",
              "qEs": "¿Escalofríos / temblores intensos?",
              "type": "yn"
            },
            {
              "q": "Sudorese profusa, principalmente noturna?",
              "qEs": "¿Sudoración profusa, sobre todo nocturna?",
              "type": "yn"
            },
            {
              "q": "Tratamento com antitérmico? Qual, dose e resposta?",
              "qEs": "¿Tratamiento con antitérmico? ¿Cuál, dosis y respuesta?",
              "type": "input",
              "ph": "Medicamento, dose, resposta",
              "ph2": "Medicamento, dosis, respuesta"
            },
            {
              "q": "Focos infecciosos (selecione os presentes)",
              "qEs": "Focos infecciosos (seleccione los presentes)",
              "type": "multi",
              "opts": [
                "Tosse/dispneia (respiratório)",
                "Odinofagia/dor de garganta",
                "Disúria/polaciúria (urinário)",
                "Diarreia/dor abdominal (digestivo)",
                "Lesão ou secreção cutânea"
              ],
              "optsEs": [
                "Tos/disnea (respiratorio)",
                "Odinofagia/dolor de garganta",
                "Disuria/polaquiuria (urinario)",
                "Diarrea/dolor abdominal (digestivo)",
                "Lesión o secreción cutánea"
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
              "q": "Linfonodos aumentados/dolorosos (gânglios)?",
              "qEs": "¿Ganglios linfáticos aumentados/dolorosos?",
              "type": "yn"
            },
            {
              "q": "Rash ou lesões cutâneas associadas?",
              "qEs": "¿Erupción o lesiones cutáneas asociadas?",
              "type": "yn"
            },
            {
              "q": "Perda de peso associada?",
              "qEs": "¿Pérdida de peso asociada?",
              "type": "yn"
            },
            {
              "q": "Viagem recente para área endêmica (malária, dengue, febre amarela, outras)?",
              "qEs": "¿Viaje reciente a área endémica (malaria, dengue, fiebre amarilla, otras)?",
              "type": "yn"
            },
            {
              "q": "Contato com pessoas doentes ou animais recentemente?",
              "qEs": "¿Contacto con personas enfermas o animales recientemente?",
              "type": "yn"
            },
            {
              "q": "Situação vacinal em dia (incluindo febre amarela, influenza, COVID)?",
              "qEs": "¿Situación de vacunación al día (incluyendo fiebre amarilla, influenza, COVID)?",
              "type": "yn"
            },
            {
              "q": "Condições de imunossupressão (HIV, quimioterapia, corticoide crônico, diabetes descompensado, transplante)?",
              "qEs": "¿Condiciones de inmunosupresión (VIH, quimioterapia, corticoide crónico, diabetes descompensada, trasplante)?",
              "type": "yn"
            },
            {
              "q": "Uso de outros medicamentos recentes (incluindo antibióticos)?",
              "qEs": "¿Uso de otros medicamentos recientes (incluyendo antibióticos)?",
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
          "rasHighlight": [
            "cabeca",
            "resp",
            "cardio",
            "digest",
            "genito",
            "pele"
          ]
        },
        {
          "id": "semio-astenia",
          "name": "Astenia / Fadiga",
          "nameEs": "Astenia / Fatiga",
          "icon": "😔",
          "color": "mc-purple",
          "aeaGuide": [
            {
              "q": "Início?",
              "qEs": "¿Inicio?",
              "type": "radio",
              "opts": [
                "Agudo (dias)",
                "Progressivo (semanas/meses)",
                "Crônico (>6 meses)"
              ],
              "optsEs": [
                "Agudo (días)",
                "Progresivo (semanas/meses)",
                "Crónico (>6 meses)"
              ]
            },
            {
              "q": "Relação com atividade física?",
              "qEs": "¿Relación con actividad física?",
              "type": "radio",
              "opts": [
                "Presente mesmo em repouso",
                "Piora com esforço mínimo",
                "Só com esforço moderado/intenso"
              ],
              "optsEs": [
                "Presente incluso en reposo",
                "Empeora con esfuerzo mínimo",
                "Solo con esfuerzo moderado/intenso"
              ]
            },
            {
              "q": "Melhora com repouso?",
              "qEs": "¿Mejora con el reposo?",
              "type": "yn"
            },
            {
              "q": "Palidez ou dispneia de esforço (suspeita de anemia)?",
              "qEs": "¿Palidez o disnea de esfuerzo (sospecha de anemia)?",
              "type": "yn"
            },
            {
              "q": "Perda de peso não intencional associada?",
              "qEs": "¿Pérdida de peso no intencional asociada?",
              "type": "yn"
            },
            {
              "q": "Alterações do sono (insônia, hipersonia, ronco)?",
              "qEs": "¿Alteraciones del sueño (insomnio, hipersomnia, ronquidos)?",
              "type": "input",
              "ph": "Descreva as alterações",
              "ph2": "Describa las alteraciones"
            },
            {
              "q": "Poliúria e polidipsia (suspeita de diabetes)?",
              "qEs": "¿Poliuria y polidipsia (sospecha de diabetes)?",
              "type": "yn"
            },
            {
              "q": "Intolerância ao frio, obstipação, queda de cabelo (suspeita de hipotireoidismo)?",
              "qEs": "¿Intolerancia al frío, estreñimiento, caída de cabello (sospecha de hipotiroidismo)?",
              "type": "yn"
            },
            {
              "q": "Humor depressivo, anedonia ou ansiedade?",
              "qEs": "¿Estado de ánimo depresivo, anhedonia o ansiedad?",
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
          ]
        },
        {
          "id": "semio-peso",
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
          ]
        }
      ]
    }
  ],
  "cirurgia": [
    {
      "cat": "Abdome Agudo",
      "catEs": "Abdomen Agudo",
      "items": [
        {
          "id": "apendicite",
          "name": "Apendicite / Abdome Agudo",
          "nameEs": "Apendicitis / Abdomen Agudo",
          "icon": "🔪",
          "color": "mc-danger",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Início e migração da dor",
              "qEs": "Inicio y migración del dolor",
              "type": "radio",
              "opts": [
                "Periumbilical/epigástrica migrando para FID (clássico)",
                "FID desde o início",
                "Difusa, sem migração definida",
                "Epigástrica persistente"
              ]
            },
            {
              "q": "Caráter da dor",
              "qEs": "Carácter del dolor",
              "type": "radio",
              "opts": [
                "Surda/contínua, em peso",
                "Em cólica",
                "Em facada/aguda, localizada"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Evolução temporal — a dor está piorando, estável ou melhorando desde o início?",
              "qEs": "¿Evolución temporal — el dolor está empeorando, estable o mejorando desde el inicio?",
              "type": "radio",
              "opts": [
                "Piorando progressivamente",
                "Estável",
                "Melhorando",
                "Migrou e mudou de caráter"
              ]
            },
            {
              "q": "Anorexia (perda de apetite)?",
              "qEs": "¿Anorexia (pérdida de apetito)?",
              "type": "yn"
            },
            {
              "q": "Náuseas / vômitos? Surgiram antes ou depois do início da dor?",
              "qEs": "¿Náuseas / vómitos? ¿Aparecieron antes o después del inicio del dolor?",
              "type": "radio",
              "opts": [
                "Antes da dor",
                "Depois da dor",
                "Sem náuseas/vômitos"
              ]
            },
            {
              "q": "Febre associada? Há quanto tempo e qual temperatura?",
              "qEs": "¿Fiebre asociada? ¿Hace cuánto y qué temperatura?",
              "type": "yn"
            },
            {
              "q": "Alteração do hábito intestinal (diarreia, constipação)?",
              "qEs": "¿Alteración del hábito intestinal (diarrea, estreñimiento)?",
              "type": "yn"
            },
            {
              "q": "Parada de eliminação de fezes e gases?",
              "qEs": "¿Parada de eliminación de heces y gases?",
              "type": "yn"
            },
            {
              "q": "Sinais de alarme — dor que piora ao mínimo movimento, defesa abdominal involuntária (rigidez em tábua), sinais de instabilidade (taquicardia, hipotensão, palidez, sudorese)?",
              "qEs": "¿Signos de alarma — dolor que empeora con el mínimo movimiento, defensa abdominal involuntaria (vientre en tabla), signos de inestabilidad (taquicardia, hipotensión, palidez, sudoración)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes de cirurgias abdominais prévias (aderências, apendicectomia)?",
              "qEs": "¿Antecedentes de cirugías abdominales previas (adherencias, apendicectomía)?",
              "type": "yn"
            },
            {
              "q": "Data da última menstruação / possibilidade de gravidez (mulheres em idade fértil)?",
              "qEs": "¿Fecha de la última menstruación / posibilidad de embarazo (mujeres en edad fértil)?",
              "type": "input",
              "ph": "DUM / possibilidade de gravidez",
              "ph2": "FUM / posibilidad de embarazo"
            },
            {
              "q": "Resposta ao uso de analgésico para essa dor",
              "qEs": "Respuesta al uso de analgésico para este dolor",
              "type": "radio",
              "opts": [
                "Não usou analgésico",
                "Usou e a dor melhorou bem",
                "Usou e a dor melhorou parcialmente",
                "Usou e não houve melhora (sinal de alerta)"
              ],
              "optsEs": [
                "No usó analgésico",
                "Usó y el dolor mejoró bien",
                "Usó y el dolor mejoró parcialmente",
                "Usó y no hubo mejoría (señal de alarma)"
              ]
            },
            {
              "q": "Qual medicamento usou?",
              "qEs": "¿Qué medicamento usó?",
              "type": "input",
              "ph": "Ex: dipirona, paracetamol, ibuprofeno...",
              "ph2": "Ej: dipirona, paracetamol, ibuprofeno..."
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
          "rasHighlight": [
            "digest",
            "genito"
          ]
        },
        {
          "id": "colecistite-colelitiase",
          "name": "Colecistite / Cólica Biliar",
          "nameEs": "Colecistitis / Cólico Biliar",
          "icon": "💛",
          "color": "mc-accent",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização da dor",
              "qEs": "Localización del dolor",
              "type": "radio",
              "opts": [
                "Hipocôndrio direito (HCD)",
                "Epigástrio",
                "HCD e epigástrio",
                "Difusa"
              ],
              "optsEs": [
                "Hipocondrio derecho (HCD)",
                "Epigastrio",
                "HCD y epigastrio",
                "Difusa"
              ]
            },
            {
              "q": "Irradiação",
              "qEs": "Irradiación",
              "type": "radio",
              "opts": [
                "Escápula / ombro direito (clássico)",
                "Dorso",
                "Sem irradiação"
              ],
              "optsEs": [
                "Escápula / hombro derecho (clásico)",
                "Dorso",
                "Sin irradiación"
              ]
            },
            {
              "q": "Caráter da dor",
              "qEs": "Carácter del dolor",
              "type": "radio",
              "opts": [
                "Cólica intensa (em crise, cessa espontaneamente)",
                "Constante e progressiva",
                "Surda / em peso"
              ],
              "optsEs": [
                "Cólico intenso (en crisis, cede espontáneamente)",
                "Constante y progresiva",
                "Sorda / pesadez"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Início em relação à alimentação",
              "qEs": "Inicio en relación a la alimentación",
              "type": "radio",
              "opts": [
                "Logo após refeição gordurosa (30 min–2h)",
                "Algumas horas após comer",
                "Sem relação com alimentação"
              ],
              "optsEs": [
                "Justo después de comida grasa (30 min–2h)",
                "Algunas horas después de comer",
                "Sin relación con la alimentación"
              ]
            },
            {
              "q": "Duração do episódio atual",
              "qEs": "Duración del episodio actual",
              "type": "radio",
              "opts": [
                "Menos de 6 horas",
                "Entre 6 e 24 horas",
                "Mais de 24 horas",
                "Contínua / persistente"
              ],
              "optsEs": [
                "Menos de 6 horas",
                "Entre 6 y 24 horas",
                "Más de 24 horas",
                "Continua / persistente"
              ]
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Náuseas ou vômitos?",
              "qEs": "¿Náuseas o vómitos?",
              "type": "yn"
            },
            {
              "q": "Icterícia (pele ou olhos amarelados)?",
              "qEs": "¿Ictericia (piel u ojos amarillos)?",
              "type": "yn"
            },
            {
              "q": "Urina escurecida (colúria)?",
              "qEs": "¿Orina oscurecida (coluria)?",
              "type": "yn"
            },
            {
              "q": "Fezes claras / esbranquiçadas (acolia)?",
              "qEs": "¿Heces claras / blanquecinas (acolia)?",
              "type": "yn"
            },
            {
              "q": "Episódios semelhantes anteriores? Com que frequência?",
              "qEs": "¿Episodios similares anteriores? ¿Con qué frecuencia?",
              "type": "input",
              "ph": "Número de episódios e intervalo entre eles",
              "ph2": "Número de episodios e intervalo entre ellos"
            },
            {
              "q": "Piora ao inspirar fundo com palpação do HCD (sinal de Murphy)?",
              "qEs": "¿Empeora al inspirar profundo con palpación del HCD (signo de Murphy)?",
              "type": "yn"
            },
            {
              "q": "Sinal de alarme — febre alta com calafrios + icterícia (tríade de Charcot — sugere colangite)?",
              "qEs": "¿Signo de alarma — fiebre alta con escalofríos + ictericia (tríada de Charcot — sugiere colangitis)?",
              "type": "yn"
            },
            {
              "q": "Fatores de risco: sexo feminino, obesidade, multiparidade, uso de ACO, emagrecimento rápido?",
              "qEs": "¿Factores de riesgo: sexo femenino, obesidad, multiparidad, uso de ACO, adelgazamiento rápido?",
              "type": "yn"
            },
            {
              "q": "Medicamentos em uso (anticoncepcionais, fibratos, ceftriaxona)?",
              "qEs": "¿Medicamentos en uso (anticonceptivos, fibratos, ceftriaxona)?",
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
          "rasHighlight": [
            "digest"
          ]
        },
        {
          "id": "pancreatite-aguda",
          "name": "Pancreatite Aguda",
          "nameEs": "Pancreatitis Aguda",
          "icon": "🔥",
          "color": "mc-danger",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização da dor",
              "qEs": "Localización del dolor",
              "type": "radio",
              "opts": [
                "Epigástrio",
                "Periumbilical",
                "Difusa",
                "Hipocôndrio direito"
              ],
              "optsEs": [
                "Epigastrio",
                "Periumbilical",
                "Difusa",
                "Hipocondrio derecho"
              ]
            },
            {
              "q": "Irradiação",
              "qEs": "Irradiación",
              "type": "radio",
              "opts": [
                "Em faixa para o dorso / interescapular (clássico)",
                "Para o ombro esquerdo",
                "Sem irradiação"
              ],
              "optsEs": [
                "En faja hacia el dorso / interescapular (clásico)",
                "Hacia el hombro izquierdo",
                "Sin irradiación"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito após refeição abundante ou ingestão de álcool",
                "Gradual / insidioso"
              ],
              "optsEs": [
                "Súbito después de comida abundante o ingesta de alcohol",
                "Gradual / insidioso"
              ]
            },
            {
              "q": "Posição que alivia",
              "qEs": "Posición que alivia",
              "type": "radio",
              "opts": [
                "Sentado inclinado para frente — posição em gatilho (clássico)",
                "Decúbito lateral / posição fetal",
                "Nenhuma posição alivia"
              ],
              "optsEs": [
                "Sentado inclinado hacia adelante — posición en gatillo (clásico)",
                "Decúbito lateral / posición fetal",
                "Ninguna posición alivia"
              ]
            },
            {
              "q": "Náuseas / vômitos? O vômito alivia a dor?",
              "qEs": "¿Náuseas / vómitos? ¿El vómito alivia el dolor?",
              "type": "radio",
              "opts": [
                "Sim — vômitos que aliviam a dor",
                "Sim — vômitos que não aliviam a dor",
                "Sem náuseas ou vômitos"
              ],
              "optsEs": [
                "Sí — vómitos que alivian el dolor",
                "Sí — vómitos que no alivian el dolor",
                "Sin náuseas ni vómitos"
              ]
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Distensão abdominal?",
              "qEs": "¿Distensión abdominal?",
              "type": "yn"
            },
            {
              "q": "Parada de eliminação de fezes e gases?",
              "qEs": "¿Parada de eliminación de heces y gases?",
              "type": "yn"
            },
            {
              "q": "Icterícia?",
              "qEs": "¿Ictericia?",
              "type": "yn"
            },
            {
              "q": "Equimose periumbilical (sinal de Cullen) ou nos flancos (sinal de Grey-Turner) — sinais de alarme?",
              "qEs": "¿Equimosis periumbilical (signo de Cullen) o en los flancos (signo de Grey-Turner) — signos de alarma?",
              "type": "yn"
            },
            {
              "q": "Sinais de instabilidade: hipotensão, taquicardia, confusão mental?",
              "qEs": "¿Signos de inestabilidad: hipotensión, taquicardia, confusión mental?",
              "type": "yn"
            },
            {
              "q": "Etilismo — quantidade e frequência de consumo de álcool?",
              "qEs": "¿Etilismo — cantidad y frecuencia de consumo de alcohol?",
              "type": "input",
              "ph": "Descreva padrão de consumo de álcool",
              "ph2": "Describa patrón de consumo de alcohol"
            },
            {
              "q": "Episódios prévios de pancreatite ou cálculos biliares conhecidos?",
              "qEs": "¿Episodios previos de pancreatitis o cálculos biliares conocidos?",
              "type": "yn"
            },
            {
              "q": "Medicamentos potencialmente pancreatotóxicos em uso (azatioprina, furosemida, tetraciclinas, estrógenos)?",
              "qEs": "¿Medicamentos potencialmente pancreatotóxicos en uso (azatioprina, furosemida, tetraciclinas, estrógenos)?",
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
          "rasHighlight": [
            "digest"
          ]
        },
        {
          "id": "oclusao-intestinal",
          "name": "Obstrução / Oclusão Intestinal",
          "nameEs": "Obstrucción / Oclusión Intestinal",
          "icon": "⛔",
          "color": "mc-danger",
          "aeaGuide": [
            {
              "q": "Parada de eliminação de fezes e gases (obstipação)?",
              "qEs": "¿Parada de eliminación de heces y gases (obstipación)?",
              "type": "radio",
              "opts": [
                "Sim — parada total de fezes e gases (oclusão completa)",
                "Sim — parada de gases mas ainda elimina fezes líquidas",
                "Não — constipação prévia mas ainda elimina gases",
                "Sem parada de eliminação"
              ],
              "optsEs": [
                "Sí — parada total de heces y gases (oclusión completa)",
                "Sí — parada de gases pero aún elimina heces líquidas",
                "No — estreñimiento previo pero aún elimina gases",
                "Sin parada de eliminación"
              ]
            },
            {
              "q": "Distensão abdominal?",
              "qEs": "¿Distensión abdominal?",
              "type": "yn"
            },
            {
              "q": "Caráter da dor abdominal",
              "qEs": "Carácter del dolor abdominal",
              "type": "radio",
              "opts": [
                "Cólica progressiva (em ondas)",
                "Contínua e difusa — sinal de peritonite",
                "Sem dor significativa"
              ],
              "optsEs": [
                "Cólico progresivo (en ondas)",
                "Continua y difusa — signo de peritonitis",
                "Sin dolor significativo"
              ]
            },
            {
              "q": "Vômitos — caráter (alimentar → bilioso → fecaloide)?",
              "qEs": "¿Vómitos — carácter (alimenticio → bilioso → fecaloide)?",
              "type": "radio",
              "opts": [
                "Ausentes",
                "Alimentares",
                "Biliosos (verdes / amarelados)",
                "Fecaloides — fétidos (oclusão baixa avançada)"
              ],
              "optsEs": [
                "Ausentes",
                "Alimenticios",
                "Biliosos (verdes / amarillentos)",
                "Fecaloides — fétidos (oclusión baja avanzada)"
              ]
            },
            {
              "q": "Ruídos abdominais aumentados (borborigmos / peristalse de luta)?",
              "qEs": "¿Ruidos abdominales aumentados (borborigmos / peristaltismo de lucha)?",
              "type": "yn"
            },
            {
              "q": "Cirurgias abdominais anteriores (aderências)?",
              "qEs": "¿Cirugías abdominales anteriores (adherencias)?",
              "type": "yn"
            },
            {
              "q": "Hérnia conhecida (inguinal, umbilical, incisional)?",
              "qEs": "¿Hernia conocida (inguinal, umbilical, incisional)?",
              "type": "yn"
            },
            {
              "q": "Mudança recente no calibre das fezes ou sangue nas fezes?",
              "qEs": "¿Cambio reciente en el calibre de las heces o sangre en las heces?",
              "type": "yn"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Sinal de alarme — dor contínua sem alívio, febre alta, peritonismo (isquemia / estrangulamento)?",
              "qEs": "¿Signo de alarma — dolor continuo sin alivio, fiebre alta, peritonismo (isquemia / estrangulamiento)?",
              "type": "yn"
            },
            {
              "q": "Perda de peso recente ou alteração progressiva do hábito intestinal (suspeita de neoplasia)?",
              "qEs": "¿Pérdida de peso reciente o alteración progresiva del hábito intestinal (sospecha de neoplasia)?",
              "type": "yn"
            },
            {
              "q": "Uso de opioides, antidepressivos tricíclicos ou outros medicamentos constipantes?",
              "qEs": "¿Uso de opioides, antidepresivos tricíclicos u otros medicamentos estreñidores?",
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
          "rasHighlight": [
            "digest"
          ]
        }
      ]
    },
    {
      "cat": "Hérnias",
      "catEs": "Hernias",
      "items": [
        {
          "id": "hernia-abdominal",
          "name": "Hérnia da Parede Abdominal",
          "nameEs": "Hernia de Pared Abdominal",
          "icon": "🫸",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Localização da tumoração",
              "qEs": "Localización de la tumoración",
              "type": "radio",
              "opts": [
                "Inguinal direita",
                "Inguinal esquerda",
                "Umbilical",
                "Epigástrica / linha branca",
                "Incisional (sobre cicatriz cirúrgica)",
                "Femoral",
                "Outra"
              ],
              "optsEs": [
                "Inguinal derecha",
                "Inguinal izquierda",
                "Umbilical",
                "Epigástrica / línea blanca",
                "Incisional (sobre cicatriz quirúrgica)",
                "Femoral",
                "Otra"
              ]
            },
            {
              "q": "Há quanto tempo notou o abaulamento?",
              "qEs": "¿Hace cuánto tiempo notó el abultamiento?",
              "type": "input",
              "ph": "Tempo de evolução",
              "ph2": "Tiempo de evolución"
            },
            {
              "q": "A tumoração some ao deitar-se (redutível)?",
              "qEs": "¿La tumoración desaparece al acostarse (reductible)?",
              "type": "radio",
              "opts": [
                "Sim — reduz espontaneamente ao deitar",
                "Sim — reduz com manobra manual",
                "Não — irredutível (encarcerada)"
              ],
              "optsEs": [
                "Sí — se reduce espontáneamente al acostarse",
                "Sí — se reduce con maniobra manual",
                "No — irreductible (encarcelada)"
              ]
            },
            {
              "q": "Dor associada — quando piora?",
              "qEs": "Dolor asociado — ¿cuándo empeora?",
              "type": "radio",
              "opts": [
                "Sem dor",
                "Leve ao esforço / tosse",
                "Moderada constante",
                "Intensa e súbita (encarceramento / estrangulamento)"
              ],
              "optsEs": [
                "Sin dolor",
                "Leve al esfuerzo / tos",
                "Moderada constante",
                "Intensa y súbita (encarcelamiento / estrangulamiento)"
              ]
            },
            {
              "q": "Piora ao tossir, espirrar ou realizar esforço físico?",
              "qEs": "¿Empeora al toser, estornudar o realizar esfuerzo físico?",
              "type": "yn"
            },
            {
              "q": "Episódio prévio de encarceramento (hérnia ficou dura, dolorosa e não reduziu)?",
              "qEs": "¿Episodio previo de encarcelamiento (hernia se quedó dura, dolorosa y no se redujo)?",
              "type": "yn"
            },
            {
              "q": "Sinal de alarme — dor intensa e súbita, irredutível, febre, pele sobre a hérnia eritematosa ou escurecida (estrangulamento)?",
              "qEs": "¿Signo de alarma — dolor intenso y súbito, irreductible, fiebre, piel sobre la hernia eritematosa u oscurecida (estrangulamiento)?",
              "type": "yn"
            },
            {
              "q": "Náuseas / vômitos / parada de fezes e gases (oclusão por estrangulamento)?",
              "qEs": "¿Náuseas / vómitos / parada de heces y gases (oclusión por estrangulamiento)?",
              "type": "yn"
            },
            {
              "q": "Fatores precipitantes: constipação crônica, tosse crônica, esforço físico intenso?",
              "qEs": "¿Factores precipitantes: estreñimiento crónico, tos crónica, esfuerzo físico intenso?",
              "type": "yn"
            },
            {
              "q": "Cirurgias abdominais anteriores (hérnia incisional)?",
              "qEs": "¿Cirugías abdominales anteriores (hernia incisional)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes de hérnia reparada anteriormente (recidiva)?",
              "qEs": "¿Antecedentes de hernia reparada anteriormente (recidiva)?",
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
          "rasHighlight": [
            "digest",
            "motor"
          ]
        }
      ]
    },
    {
      "cat": "Hemorragia Digestiva",
      "catEs": "Hemorragia Digestiva",
      "items": [
        {
          "id": "hemorragia-digestiva-alta",
          "name": "Hemorragia Digestiva Alta",
          "nameEs": "Hemorragia Digestiva Alta",
          "icon": "🩸",
          "color": "mc-danger",
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
              "q": "Uso recente de AINEs, AAS, anticoagulantes ou corticoides?",
              "qEs": "¿Uso reciente de AINEs, AAS, anticoagulantes o corticoides?",
              "type": "input",
              "ph": "Liste os medicamentos em uso",
              "ph2": "Liste los medicamentos en uso"
            },
            {
              "q": "Etilismo — quantidade e frequência?",
              "qEs": "¿Etilismo — cantidad y frecuencia?",
              "type": "input",
              "ph": "Descreva padrão de consumo",
              "ph2": "Describa patrón de consumo"
            },
            {
              "q": "Antecedente de úlcera péptica, gastrite ou infecção por H. pylori?",
              "qEs": "¿Antecedente de úlcera péptica, gastritis o infección por H. pylori?",
              "type": "yn"
            },
            {
              "q": "Antecedente de doença hepática (cirrose, hepatite) ou varizes esofágicas conhecidas?",
              "qEs": "¿Antecedente de enfermedad hepática (cirrosis, hepatitis) o várices esofágicas conocidas?",
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
          "rasHighlight": [
            "digest"
          ]
        },
        {
          "id": "hemorragia-digestiva-baixa",
          "name": "Hemorragia Digestiva Baixa",
          "nameEs": "Hemorragia Digestiva Baja",
          "icon": "🔴",
          "color": "mc-danger",
          "aeaGuide": [
            {
              "q": "Apresentação do sangramento",
              "qEs": "Presentación del sangrado",
              "type": "radio",
              "opts": [
                "Hematoquezia — sangue vivo nas fezes",
                "Fezes com sangue misturado / avermelhado escuro",
                "Melena — fezes negras e fétidas (pode ser baixa proximal)",
                "Sangue apenas no papel higiênico"
              ],
              "optsEs": [
                "Hematoquecia — sangre roja en las heces",
                "Heces con sangre mezclada / rojiza oscura",
                "Melena — heces negras y fétidas (puede ser baja proximal)",
                "Sangre solo en el papel higiénico"
              ]
            },
            {
              "q": "Relação do sangue com as fezes",
              "qEs": "Relación de la sangre con las heces",
              "type": "radio",
              "opts": [
                "Misturado às fezes (origem alta ou colônica)",
                "Na superfície das fezes / papel (origem anorretal)",
                "Jato livre independente das fezes (hemorroida)",
                "Não consegue distinguir"
              ],
              "optsEs": [
                "Mezclado con las heces (origen alto o colónico)",
                "En la superficie de las heces / papel (origen anorrectal)",
                "Chorro libre independiente de las heces (hemorroide)",
                "No puede distinguir"
              ]
            },
            {
              "q": "Volume estimado",
              "qEs": "Volumen estimado",
              "type": "radio",
              "opts": [
                "Pequeno — manchas",
                "Moderado",
                "Grande — hematoquezia maciça (>500 mL)"
              ],
              "optsEs": [
                "Pequeño — manchas",
                "Moderado",
                "Grande — hematoquecia masiva (>500 mL)"
              ]
            },
            {
              "q": "Dor abdominal associada?",
              "qEs": "¿Dolor abdominal asociado?",
              "type": "yn"
            },
            {
              "q": "Alteração do hábito intestinal recente — constipação, diarreia, fezes em fita?",
              "qEs": "¿Alteración del hábito intestinal reciente — estreñimiento, diarrea, heces en cinta?",
              "type": "yn"
            },
            {
              "q": "Perda de peso involuntária associada?",
              "qEs": "¿Pérdida de peso involuntaria asociada?",
              "type": "yn"
            },
            {
              "q": "Sinais de instabilidade: tontura, pré-síncope, taquicardia, palidez?",
              "qEs": "¿Signos de inestabilidad: mareo, presíncope, taquicardia, palidez?",
              "type": "yn"
            },
            {
              "q": "Dor ou sangramento anal associado à evacuação (fissura, hemorroida)?",
              "qEs": "¿Dolor o sangrado anal asociado a la evacuación (fisura, hemorroide)?",
              "type": "yn"
            },
            {
              "q": "Uso de AINEs, AAS ou anticoagulantes?",
              "qEs": "¿Uso de AINEs, AAS o anticoagulantes?",
              "type": "input",
              "ph": "Liste os medicamentos em uso",
              "ph2": "Liste los medicamentos en uso"
            },
            {
              "q": "Antecedentes: diverticulose, doença inflamatória intestinal (Crohn / RCU), pólipos ou câncer colorretal?",
              "qEs": "¿Antecedentes: diverticulosis, enfermedad inflamatoria intestinal (Crohn / CU), pólipos o cáncer colorrectal?",
              "type": "yn"
            },
            {
              "q": "História familiar de câncer colorretal ou pólipos?",
              "qEs": "¿Antecedentes familiares de cáncer colorrectal o pólipos?",
              "type": "yn"
            },
            {
              "q": "Episódios semelhantes anteriores?",
              "qEs": "¿Episodios similares anteriores?",
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
          "rasHighlight": [
            "digest"
          ]
        }
      ]
    },
    {
      "cat": "Doenças Colorretais",
      "catEs": "Enfermedades Colorrectales",
      "items": [
        {
          "id": "doenca-diverticular",
          "name": "Doença Diverticular / Diverticulite",
          "nameEs": "Enfermedad Diverticular / Diverticulitis",
          "icon": "🫧",
          "color": "mc-accent",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização da dor",
              "qEs": "Localización del dolor",
              "type": "radio",
              "opts": [
                "Fossa ilíaca esquerda (FIE) — clássico",
                "Hipogástrio",
                "Difusa / periumbilical",
                "Fossa ilíaca direita"
              ],
              "optsEs": [
                "Fosa ilíaca izquierda (FII) — clásico",
                "Hipogastrio",
                "Difusa / periumbilical",
                "Fosa ilíaca derecha"
              ]
            },
            {
              "q": "Início e evolução",
              "qEs": "Inicio y evolución",
              "type": "radio",
              "opts": [
                "Gradual, piora em horas a dias",
                "Súbito e intenso desde o início"
              ],
              "optsEs": [
                "Gradual, empeora en horas a días",
                "Súbito e intenso desde el inicio"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Alteração do hábito intestinal — diarreia ou constipação?",
              "qEs": "¿Alteración del hábito intestinal — diarrea o estreñimiento?",
              "type": "yn"
            },
            {
              "q": "Sangue nas fezes?",
              "qEs": "¿Sangre en las heces?",
              "type": "yn"
            },
            {
              "q": "Náuseas / vômitos?",
              "qEs": "¿Náuseas / vómitos?",
              "type": "yn"
            },
            {
              "q": "Distensão abdominal?",
              "qEs": "¿Distensión abdominal?",
              "type": "yn"
            },
            {
              "q": "Diagnóstico prévio de diverticulose ou episódios anteriores de diverticulite?",
              "qEs": "¿Diagnóstico previo de diverticulosis o episodios anteriores de diverticulitis?",
              "type": "yn"
            },
            {
              "q": "Sinal de complicação — peritonite difusa, massa palpável em FIE (abscesso), saída de gás ou fezes pela urina / vagina (fístula)?",
              "qEs": "¿Signo de complicación — peritonitis difusa, masa palpable en FII (absceso), salida de gas o heces por la orina / vagina (fístula)?",
              "type": "yn"
            },
            {
              "q": "Dieta pobre em fibras?",
              "qEs": "¿Dieta pobre en fibra?",
              "type": "yn"
            },
            {
              "q": "Uso de AINEs, opioides ou corticoides?",
              "qEs": "¿Uso de AINEs, opioides o corticoides?",
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
          "rasHighlight": [
            "digest"
          ]
        },
        {
          "id": "doencas-anorretais",
          "name": "Doenças Anorretais",
          "nameEs": "Enfermedades Anorrectales",
          "icon": "🔻",
          "color": "mc-secondary",
          "aeaGuide": [
            {
              "q": "Queixa principal",
              "qEs": "Queja principal",
              "type": "radio",
              "opts": [
                "Sangramento anal",
                "Dor anal",
                "Prolapso / tumoração anal",
                "Prurido anal",
                "Secreção / corrimento anal",
                "Mais de uma queixa"
              ],
              "optsEs": [
                "Sangrado anal",
                "Dolor anal",
                "Prolapso / tumoración anal",
                "Prurito anal",
                "Secreción / flujo anal",
                "Más de una queja"
              ]
            },
            {
              "q": "Caracterização do sangramento anal",
              "qEs": "Caracterización del sangrado anal",
              "type": "radio",
              "opts": [
                "Sangue vivo no papel higiênico",
                "Jato de sangue ao evacuar",
                "Sangue misturado às fezes",
                "Manchas na roupa íntima",
                "Não há sangramento"
              ],
              "optsEs": [
                "Sangre roja en el papel higiénico",
                "Chorro de sangre al evacuar",
                "Sangre mezclada con las heces",
                "Manchas en la ropa interior",
                "No hay sangrado"
              ]
            },
            {
              "q": "Dor anal — quando ocorre?",
              "qEs": "Dolor anal — ¿cuándo ocurre?",
              "type": "radio",
              "opts": [
                "Durante a evacuação",
                "Após a evacuação (ardor prolongado)",
                "Contínua, independente da evacuação",
                "Pulsátil / latejante (sugere abscesso)",
                "Sem dor"
              ],
              "optsEs": [
                "Durante la evacuación",
                "Después de la evacuación (ardor prolongado)",
                "Continua, independiente de la evacuación",
                "Pulsátil / latente (sugiere absceso)",
                "Sin dolor"
              ]
            },
            {
              "q": "Prolapso — sai algo pelo ânus? É redutível?",
              "qEs": "Prolapso — ¿sale algo por el ano? ¿Es reductible?",
              "type": "radio",
              "opts": [
                "Não há prolapso",
                "Sim — reduz espontaneamente",
                "Sim — necessita reposição manual",
                "Sim — irredutível"
              ],
              "optsEs": [
                "No hay prolapso",
                "Sí — se reduce espontáneamente",
                "Sí — requiere reducción manual",
                "Sí — irreductible"
              ]
            },
            {
              "q": "Secreção / corrimento anal",
              "qEs": "Secreción / flujo anal",
              "type": "radio",
              "opts": [
                "Ausente",
                "Purulenta — pus (fístula / abscesso)",
                "Mucosa / serosa",
                "Fecal (fístula perianal)"
              ],
              "optsEs": [
                "Ausente",
                "Purulenta — pus (fístula / absceso)",
                "Mucosa / serosa",
                "Fecal (fístula perianal)"
              ]
            },
            {
              "q": "Prurido anal?",
              "qEs": "¿Prurito anal?",
              "type": "yn"
            },
            {
              "q": "Constipação crônica com esforço evacuatório intenso?",
              "qEs": "¿Estreñimiento crónico con esfuerzo evacuatorio intenso?",
              "type": "yn"
            },
            {
              "q": "Febre ou calafrios — sugere abscesso anorretal?",
              "qEs": "¿Fiebre o escalofríos — sugiere absceso anorrectal?",
              "type": "yn"
            },
            {
              "q": "Diagnóstico prévio de hemorroidas, fissura anal, fístula ou doença de Crohn perianal?",
              "qEs": "¿Diagnóstico previo de hemorroides, fisura anal, fístula o enfermedad de Crohn perianal?",
              "type": "yn"
            },
            {
              "q": "Cirurgia anorretal anterior (hemorroidectomia, esfincteroplastia)?",
              "qEs": "¿Cirugía anorrectal anterior (hemorroidectomía, esfinteroplastia)?",
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
          "rasHighlight": [
            "digest"
          ]
        }
      ]
    },
    {
      "cat": "Trauma",
      "catEs": "Trauma",
      "items": [
        {
          "id": "trauma-abdominal",
          "name": "Trauma Abdominal",
          "nameEs": "Trauma Abdominal",
          "icon": "⚠️",
          "color": "mc-danger",
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
          "rasHighlight": [
            "digest",
            "motor",
            "cardio"
          ]
        }
      ]
    }
  ],
  "respiratorio": [
    {
      "cat": "Sintomas Respiratórios",
      "catEs": "Síntomas Respiratorios",
      "items": [
        {
          "id": "tosse",
          "name": "Tosse",
          "nameEs": "Tos",
          "icon": "😮‍💨",
          "color": "mc-primary",
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
              "q": "Tipo de tosse",
              "qEs": "Tipo de tos",
              "type": "radio",
              "opts": [
                "Seca (não produtiva)",
                "Produtiva/Úmida",
                "Metálica/rouca"
              ],
              "optsEs": [
                "Seca (no productiva)",
                "Productiva/Húmeda",
                "Metálica/ronca"
              ]
            },
            {
              "q": "Há expectoração (escarro)?",
              "qEs": "¿Hay expectoración (esputo)?",
              "type": "yn"
            },
            {
              "q": "Características do escarro (cor/aspecto)",
              "qEs": "Características del esputo (color/aspecto)",
              "type": "radio",
              "opts": [
                "Mucoide (claro/branco)",
                "Mucopurulento (amarelado — infecção)",
                "Purulento (esverdeado/fétido — bacteriana)",
                "Hemoptoico — com sangue (alarme)",
                "Seroso/espumoso (rosado — edema pulmonar)"
              ],
              "optsEs": [
                "Mucoide (claro/blanco)",
                "Mucopurulento (amarillento — infección)",
                "Purulento (verdoso/fétido — bacteriana)",
                "Hemoptoico — con sangre (alarma)",
                "Seroso/espumoso (rosado — edema pulmonar)"
              ]
            },
            {
              "q": "Hemoptise (sangue no escarro)?",
              "qEs": "¿Hemoptisis (sangre en el esputo)?",
              "type": "yn"
            },
            {
              "q": "Momento de predomínio",
              "qEs": "Momento de predominio",
              "type": "radio",
              "opts": [
                "Constante (diurna)",
                "Noturna",
                "Matutina (ao acordar)",
                "Pós-prandial ou ao deitar"
              ],
              "optsEs": [
                "Constante (diurna)",
                "Nocturna",
                "Matutina (al despertar)",
                "Posprandial o al acostarse"
              ]
            },
            {
              "q": "Fatores desencadeantes ou agravantes",
              "qEs": "Factores desencadenantes o agravantes",
              "type": "multi",
              "opts": [
                "Frio/ar gelado",
                "Exercício físico",
                "Decúbito (ao deitar)",
                "Alérgenos (pólen, pelos, ácaros)",
                "Fumaça/irritantes",
                "Pós-refeição",
                "Conversa prolongada",
                "Inspiração profunda"
              ],
              "optsEs": [
                "Frío/aire frío",
                "Ejercicio físico",
                "Decúbito (al acostarse)",
                "Alérgenos (polvo, pelo, ácaros)",
                "Humo/irritantes",
                "Posprandial",
                "Conversación prolongada",
                "Inspiración profunda"
              ]
            },
            {
              "q": "Outros fatores desencadeantes (campo livre)",
              "qEs": "Otros factores desencadenantes (campo libre)",
              "type": "input",
              "ph": "Descreva outros fatores",
              "ph2": "Describa otros factores"
            },
            {
              "q": "Fatores de alívio",
              "qEs": "Factores de alivio",
              "type": "multi",
              "opts": [
                "Repouso",
                "Mudança de posição",
                "Broncodilatadores/inalador",
                "Antitussígenos",
                "Vapor/umidificação",
                "Nenhum fator identificado"
              ],
              "optsEs": [
                "Reposo",
                "Cambio de posición",
                "Broncodilatadores/inhalador",
                "Antitusígenos",
                "Vapor/humidificación",
                "Ningún factor identificado"
              ]
            },
            {
              "q": "Outros fatores de alívio (campo livre)",
              "qEs": "Otros factores de alivio (campo libre)",
              "type": "input",
              "ph": "Descreva outros fatores",
              "ph2": "Describa otros factores"
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
              "q": "Sibilância/chiado?",
              "qEs": "¿Sibilancias?",
              "type": "yn"
            },
            {
              "q": "Dor torácica associada?",
              "qEs": "¿Dolor torácico asociado?",
              "type": "yn"
            },
            {
              "q": "Coriza, espirros ou gotejamento pós-nasal?",
              "qEs": "¿Rinorrea, estornudos o goteo posnasal?",
              "type": "yn"
            },
            {
              "q": "Pirose ou regurgitação (DRGE)?",
              "qEs": "¿Pirosis o regurgitación (ERGE)?",
              "type": "yn"
            },
            {
              "q": "Tabagismo — carga tabágica",
              "qEs": "Tabaquismo — carga tabáquica",
              "type": "input",
              "ph": "Anos-maço (ex: 20 cigarros/dia × 10 anos = 10 maços-ano)",
              "ph2": "Paquetes-año (ej: 20 cigarrillos/día × 10 años = 10 paquetes-año)"
            },
            {
              "q": "Uso de IECA (captopril, enalapril, lisinopril)?",
              "qEs": "¿Uso de IECA (captopril, enalapril, lisinopril)?",
              "type": "yn"
            },
            {
              "q": "Antecedentes respiratórios",
              "qEs": "Antecedentes respiratorios",
              "type": "multi",
              "opts": [
                "Asma",
                "DPOC",
                "Tuberculose prévia",
                "Bronquiectasia",
                "Nenhum antecedente relevante"
              ],
              "optsEs": [
                "Asma",
                "EPOC",
                "Tuberculosis previa",
                "Bronquiectasia",
                "Sin antecedente relevante"
              ]
            },
            {
              "q": "Exposição ocupacional ou ambiental",
              "qEs": "Exposición ocupacional o ambiental",
              "type": "multi",
              "opts": [
                "Poeiras (madeira, farinha, cimento)",
                "Fumaças e gases tóxicos",
                "Animais/penas/pelos",
                "Fibras minerais (amianto, sílica)",
                "Fungos/mofo em ambiente fechado",
                "Sem exposição identificada"
              ],
              "optsEs": [
                "Polvos (madera, harina, cemento)",
                "Humos y gases tóxicos",
                "Animales/plumas/pelaje",
                "Fibras minerales (amianto, sílice)",
                "Hongos/moho en ambientes cerrados",
                "Sin exposición identificada"
              ]
            },
            {
              "q": "Perda de peso não intencional?",
              "qEs": "¿Pérdida de peso no intencional?",
              "type": "yn"
            },
            {
              "q": "Sudorese noturna?",
              "qEs": "¿Sudoración nocturna?",
              "type": "yn"
            },
            {
              "q": "Situação vacinal (influenza, pneumocócica, coqueluche)?",
              "qEs": "¿Estado vacunal (influenza, neumocócica, tos ferina)?",
              "type": "yn"
            },
            {
              "q": "Contato com pessoa doente ou caso suspeito de TB?",
              "qEs": "¿Contacto con persona enferma o caso sospechoso de TB?",
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
          "rasHighlight": [
            "resp",
            "cabeca"
          ]
        },
        {
          "id": "expectoracao",
          "name": "Expectoração",
          "nameEs": "Expectoración",
          "icon": "🫧",
          "color": "mc-primary",
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
              "q": "Antecedentes respiratórios relevantes",
              "qEs": "Antecedentes respiratorios relevantes",
              "type": "multi",
              "opts": [
                "Bronquiectasia",
                "DPOC / Bronquite crônica",
                "Asma",
                "Tuberculose prévia",
                "Abscesso pulmonar",
                "Fibrose cística",
                "Nenhum antecedente relevante"
              ],
              "optsEs": [
                "Bronquiectasia",
                "EPOC / Bronquitis crónica",
                "Asma",
                "Tuberculosis previa",
                "Absceso pulmonar",
                "Fibrosis quística",
                "Sin antecedente relevante"
              ]
            },
            {
              "q": "Tabagismo (atual ou prévio)? Carga tabágica",
              "qEs": "¿Tabaquismo (actual o previo)? Carga tabáquica",
              "type": "input",
              "ph": "Anos-maço (ex: 20 cigarros/dia × 10 anos = 10 maços-ano)",
              "ph2": "Paquetes-año (ej: 20 cigarrillos/día × 10 años = 10 paquetes-año)"
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
          "rasHighlight": [
            "resp"
          ]
        },
        {
          "id": "hemoptise",
          "name": "Hemoptise",
          "nameEs": "Hemoptisis",
          "icon": "🩸",
          "color": "mc-danger",
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
              "q": "Antecedentes relevantes",
              "qEs": "Antecedentes relevantes",
              "type": "multi",
              "opts": [
                "Tuberculose prévia ou contato TB",
                "Neoplasia pulmonar (diagnóstico ou suspeita)",
                "Bronquiectasia",
                "Estenose mitral / cardiopatia",
                "Tromboembolismo pulmonar (TEP)",
                "Insuficiência cardíaca",
                "Bronquite crônica / DPOC",
                "Coagulopatia / uso de anticoagulante",
                "Nenhum antecedente relevante"
              ],
              "optsEs": [
                "Tuberculosis previa o contacto TB",
                "Neoplasia pulmonar (diagnóstico o sospecha)",
                "Bronquiectasia",
                "Estenosis mitral / cardiopatía",
                "Tromboembolismo pulmonar (TEP)",
                "Insuficiencia cardíaca",
                "Bronquitis crónica / EPOC",
                "Coagulopatía / uso de anticoagulante",
                "Sin antecedente relevante"
              ]
            },
            {
              "q": "Tabagismo (atual ou prévio)? Carga tabágica",
              "qEs": "¿Tabaquismo (actual o previo)? Carga tabáquica",
              "type": "input",
              "ph": "Anos-maço (ex: 20 cigarros/dia × 10 anos = 10 maços-ano)",
              "ph2": "Paquetes-año (ej: 20 cigarrillos/día × 10 años = 10 paquetes-año)"
            },
            {
              "q": "Uso de anticoagulantes ou antiagregantes?",
              "qEs": "¿Uso de anticoagulantes o antiagregantes?",
              "type": "yn"
            },
            {
              "q": "Trauma torácico recente?",
              "qEs": "¿Trauma torácico reciente?",
              "type": "yn"
            },
            {
              "q": "Episódios anteriores de hemoptise — frequência?",
              "qEs": "¿Episodios previos de hemoptisis — frecuencia?",
              "type": "input",
              "ph": "Descreva frequência e volume de episódios anteriores",
              "ph2": "Describa frecuencia y volumen de episodios anteriores"
            },
            {
              "q": "O que motivou buscar atendimento hoje?",
              "qEs": "¿Qué motivó buscar atención hoy?",
              "type": "input",
              "ph": "Descreva o que motivou vir hoje",
              "ph2": "Describa qué motivó venir hoy"
            }
          ],
          "rasHighlight": [
            "resp",
            "cardio"
          ]
        },
        {
          "id": "dispneia",
          "name": "Dispneia",
          "nameEs": "Disnea",
          "icon": "🫁",
          "color": "mc-primary",
          "aeaGuide": [
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Brusco/Súbito (minutos)",
                "Agudo (horas a dias)",
                "Progressivo/crônico (semanas a meses)",
                "Crônico com piora aguda"
              ]
            },
            {
              "q": "Intensidade (escala mMRC)",
              "qEs": "Intensidad (escala mMRC)",
              "type": "radio",
              "opts": [
                "Grau 0 — só com exercício intenso",
                "Grau 1 — ao apressar o passo/subir ladeira",
                "Grau 2 — anda mais devagar que pessoas da idade",
                "Grau 3 — para para respirar após ~100m",
                "Grau 4 — ao vestir-se / não sai de casa"
              ]
            },
            {
              "q": "Relação com esforço físico",
              "qEs": "Relación con el esfuerzo físico",
              "type": "radio",
              "opts": [
                "Aos grandes esforços",
                "Aos médios esforços",
                "Aos pequenos esforços",
                "Em repouso"
              ]
            },
            {
              "q": "Relação com decúbito",
              "qEs": "Relación con decúbito",
              "type": "radio",
              "opts": [
                "Ortopneia (piora deitado)",
                "Platipneia (melhora deitado)",
                "Sem relação"
              ]
            },
            {
              "q": "Ortopneia — quantos travesseiros usa para dormir?",
              "qEs": "Ortopnea — ¿cuántas almohadas usa para dormir?",
              "type": "input",
              "ph": "Número de travesseiros",
              "ph2": "Número de almohadas"
            },
            {
              "q": "Dispneia paroxística noturna (acorda sufocado)?",
              "qEs": "¿Disnea paroxística nocturna (se despierta sofocado)?",
              "type": "yn"
            },
            {
              "q": "Fatores desencadeantes (esforço, frio, alérgenos, posição, estresse, infecções)?",
              "qEs": "¿Factores desencadenantes (esfuerzo, frío, alérgenos, posición, estrés, infecciones)?",
              "type": "input",
              "ph": "Descreva os fatores desencadeantes",
              "ph2": "Describa los factores desencadenantes"
            },
            {
              "q": "Chiado no peito / Sibilância?",
              "qEs": "¿Silbido en el pecho?",
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
              "q": "Dor torácica associada?",
              "qEs": "¿Dolor torácico asociado?",
              "type": "yn"
            },
            {
              "q": "Edema de membros inferiores associado?",
              "qEs": "¿Edema de miembros inferiores asociado?",
              "type": "yn"
            },
            {
              "q": "Palpitações associadas?",
              "qEs": "¿Palpitaciones asociadas?",
              "type": "yn"
            },
            {
              "q": "Febre associada?",
              "qEs": "¿Fiebre asociada?",
              "type": "yn"
            },
            {
              "q": "Antecedentes cardíacos (ICC, valvopatia, IAM) ou pulmonares (asma, DPOC, fibrose)?",
              "qEs": "¿Antecedentes cardíacos (ICC, valvulopatía, IAM) o pulmonares (asma, EPOC, fibrosis)?",
              "type": "yn"
            },
            {
              "q": "Tabagismo (atual ou prévio)? Carga tabágica",
              "qEs": "¿Tabaquismo (actual o previo)? Carga tabáquica",
              "type": "input",
              "ph": "Anos-maço",
              "ph2": "Años-paquete"
            },
            {
              "q": "Exposições ocupacionais ou alérgenos (poeiras, fumaças, animais, mofo)?",
              "qEs": "¿Exposiciones ocupacionales o alérgenos (polvos, humos, animales, moho)?",
              "type": "yn"
            },
            {
              "q": "Episódios semelhantes prévios? Como evoluíram e qual tratamento foi feito?",
              "qEs": "¿Episodios similares previos? ¿Cómo evolucionaron y qué tratamiento se realizó?",
              "type": "input",
              "ph": "Descreva episódios anteriores e tratamento",
              "ph2": "Describa episodios anteriores y tratamiento"
            },
            {
              "q": "Uso de medicamentos (broncodilatadores, diuréticos, anti-hipertensivos, IECA)?",
              "qEs": "¿Uso de medicamentos (broncodilatadores, diuréticos, antihipertensivos, IECA)?",
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
          "rasHighlight": [
            "resp",
            "cardio"
          ]
        },
        {
          "id": "dor-toracica",
          "name": "Dor Torácica",
          "nameEs": "Dolor Torácico",
          "icon": "❤️",
          "color": "mc-danger",
          "isPain": true,
          "aeaGuide": [
            {
              "q": "Localização da dor",
              "qEs": "Localización del dolor",
              "type": "radio",
              "opts": [
                "Retroesternal",
                "Precordial",
                "Lateral/pleural",
                "Epigástrica",
                "Difusa"
              ],
              "optsEs": [
                "Retroesternal",
                "Precordial",
                "Lateral/pleural",
                "Epigástrico",
                "Difuso"
              ]
            },
            {
              "q": "Irradiação",
              "qEs": "Irradiación",
              "type": "radio",
              "opts": [
                "Membro superior esquerdo",
                "Mandíbula/pescoço",
                "Ombro direito",
                "Dorso/interescapular",
                "Sem irradiação"
              ],
              "optsEs": [
                "Miembro superior izquierdo",
                "Mandíbula/cuello",
                "Hombro derecho",
                "Dorso/interescapular",
                "Sin irradiación"
              ]
            },
            {
              "q": "Tipo/caráter da dor",
              "qEs": "Tipo/carácter del dolor",
              "type": "radio",
              "opts": [
                "Em aperto/opressão",
                "Em queimação",
                "Em pontada/agulhada",
                "Lancinante/dilacerante",
                "Em peso"
              ],
              "optsEs": [
                "Opresivo",
                "Ardor/quemante",
                "Punzante",
                "Lancinante/desgarrante",
                "Pesadez"
              ]
            },
            {
              "q": "Intensidade (EVA 0-10)",
              "qEs": "Intensidad (EVA 0-10)",
              "type": "input",
              "ph": "0 a 10",
              "ph2": "0 a 10"
            },
            {
              "q": "Duração do episódio",
              "qEs": "Duración del episodio",
              "type": "radio",
              "opts": [
                "Segundos",
                "Minutos (<20min)",
                "Mais de 20-30 minutos",
                "Persistente/contínua"
              ],
              "optsEs": [
                "Segundos",
                "Minutos (<20min)",
                "Más de 20-30 minutos",
                "Persistente/continuo"
              ]
            },
            {
              "q": "Início",
              "qEs": "Inicio",
              "type": "radio",
              "opts": [
                "Súbito (segundos)",
                "Gradual/progressivo"
              ],
              "optsEs": [
                "Súbito (segundos)",
                "Gradual/progresivo"
              ]
            },
            {
              "q": "Relação com esforço",
              "qEs": "Relación con esfuerzo",
              "type": "radio",
              "opts": [
                "Piora com esforço",
                "Melhora com esforço",
                "Sem relação com esforço",
                "Em repouso"
              ],
              "optsEs": [
                "Empeora con el esfuerzo",
                "Mejora con el esfuerzo",
                "Sin relación con el esfuerzo",
                "En reposo"
              ]
            },
            {
              "q": "Relação com a respiração ou tosse (dor pleurítica)?",
              "qEs": "¿Relación con la respiración o la tos (dolor pleurítico)?",
              "type": "yn"
            },
            {
              "q": "Relação com posição ou alimentação",
              "qEs": "Relación con la posición o la alimentación",
              "type": "radio",
              "opts": [
                "Piora ao deitar-se",
                "Melhora ao sentar-se/inclinar para frente",
                "Relação com alimentação (piora/melhora pós-prandial)",
                "Piora ao engolir",
                "Sem relação"
              ],
              "optsEs": [
                "Empeora al acostarse",
                "Mejora al sentarse/inclinarse hacia adelante",
                "Relación con la alimentación (empeora/mejora posprandial)",
                "Empeora al tragar",
                "Sin relación"
              ]
            },
            {
              "q": "Alivia com nitroglicerina?",
              "qEs": "¿Alivia con nitroglicerina?",
              "type": "yn"
            },
            {
              "q": "Evolução desde o início (piorando, estável, melhorando)?",
              "qEs": "¿Evolución desde el inicio (empeorando, estable, mejorando)?",
              "type": "radio",
              "opts": [
                "Piorando progressivamente",
                "Estável",
                "Melhorando",
                "Em crises recorrentes"
              ]
            },
            {
              "q": "Palpitações associadas?",
              "qEs": "¿Palpitaciones asociadas?",
              "type": "yn"
            },
            {
              "q": "Dispneia associada?",
              "qEs": "¿Disnea asociada?",
              "type": "yn"
            },
            {
              "q": "Sudorese fria associada?",
              "qEs": "¿Sudoración fría asociada?",
              "type": "yn"
            },
            {
              "q": "Náuseas ou vômitos associados?",
              "qEs": "¿Náuseas o vómitos asociados?",
              "type": "yn"
            },
            {
              "q": "Síncope ou pré-síncope associada?",
              "qEs": "¿Síncope o presíncope asociado?",
              "type": "yn"
            },
            {
              "q": "Febre?",
              "qEs": "¿Fiebre?",
              "type": "yn"
            },
            {
              "q": "Tosse associada?",
              "qEs": "¿Tos asociada?",
              "type": "yn"
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
              "q": "Dor torácica em \"facada\" no dorso/interescapular, com diferença de pressão arterial entre os braços (suspeita de dissecção aórtica) — sinal de alarme?",
              "qEs": "¿Dolor torácico \"como puñalada\" en dorso/interescapular, con diferencia de presión arterial entre brazos (sospecha de disección aórtica) — signo de alarma?",
              "type": "yn"
            },
            {
              "q": "Antecedentes cardiovasculares (IAM, angina, revascularização, arritmias)?",
              "qEs": "¿Antecedentes cardiovasculares (IAM, angina, revascularización, arritmias)?",
              "type": "yn"
            },
            {
              "q": "Fatores de risco cardiovascular (HAS, diabetes, dislipidemia, tabagismo, obesidade, história familiar)?",
              "qEs": "¿Factores de riesgo cardiovascular (HTA, diabetes, dislipidemia, tabaquismo, obesidad, antecedentes familiares)?",
              "type": "yn"
            },
            {
              "q": "Uso de medicamentos (anticoagulantes, antiagregantes, anti-hipertensivos, estatinas)?",
              "qEs": "¿Uso de medicamentos (anticoagulantes, antiagregantes, antihipertensivos, estatinas)?",
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
          "rasHighlight": [
            "resp",
            "cardio"
          ],
          "ddx": [
            [
              "IAM",
              "Opressão, irradiação MSE, sudorese, >20min",
              "Sem alívio NTG, enzimas ↑"
            ],
            [
              "Angina instável",
              "Opressão típica, <20min",
              "Alivia NTG, enzimas normais"
            ],
            [
              "Dissecção aórtica",
              "Desgarrante, dorso, HTA",
              "Assimetria pulsos"
            ],
            [
              "TEP",
              "Pleurítica, dispneia súbita",
              "SpO2 ↓, TVP"
            ],
            [
              "Pericardite",
              "Melhora sentado, atrito",
              "Difusa, ECG ST difuso"
            ],
            [
              "DRGE",
              "Queimação, pós-prandial",
              "Melhora IBP/antiácido"
            ]
          ]
        }
      ]
    }
  ]
};

const RAS_SYSTEMS = [
  {
    "id": "cabeca",
    "icon": "🧠",
    "name": "Cabeça e pescoço",
    "nameEs": "Cabeza y cuello",
    "questions": [
      "Cefaleia — localização, caráter, duração",
      "Tonturas / vertigens",
      "Convulsões / síncopes",
      "Perda de consciência",
      "Rigidez de nuca",
      "Adenomegalias / tumorações cervicais"
    ]
  },
  {
    "id": "olhos",
    "icon": "👁️",
    "name": "Olhos",
    "nameEs": "Ojos",
    "questions": [
      "Acuidade visual",
      "Diplopia / escotomas",
      "Epífora / lacrimejamento",
      "Fotofobia",
      "Dor ocular",
      "Uso de lentes"
    ]
  },
  {
    "id": "ouvidos",
    "icon": "👂",
    "name": "Ouvidos",
    "nameEs": "Oídos",
    "questions": [
      "Acuidade auditiva",
      "Otalgia / otorreia",
      "Zumbidos / acúfenos",
      "Otite prévia"
    ]
  },
  {
    "id": "nariz",
    "icon": "👃",
    "name": "Nariz e seios paranasais",
    "nameEs": "Nariz y senos paranasales",
    "questions": [
      "Obstrução nasal",
      "Epistaxe / sangramento",
      "Rinite / sinusite",
      "Alterações do olfato",
      "Alergias nasais"
    ]
  },
  {
    "id": "boca",
    "icon": "🦷",
    "name": "Boca e garganta",
    "nameEs": "Boca y garganta",
    "questions": [
      "Dor dentária / gengival",
      "Úlceras na mucosa",
      "Disfagia / odinofagia",
      "Rouquidão / disfonia",
      "Sialorréia / xerostomia"
    ]
  },
  {
    "id": "pele",
    "icon": "🫱",
    "name": "Pele e anexos",
    "nameEs": "Piel y anexos",
    "questions": [
      "Lesões elementares (erupções, úlceras, tumores)",
      "Icterícia / mudança de coloração",
      "Prurido (localizado ou generalizado)",
      "Sudorese anormal / noturna",
      "Alterações em unhas / cabelos"
    ]
  },
  {
    "id": "resp",
    "icon": "🫁",
    "name": "Ap. Respiratório",
    "nameEs": "Ap. Respiratorio",
    "questions": [
      "Dor torácica e relação com respiração",
      "Dispneia — grau de limitação",
      "Tosse — tipo, momento, duração",
      "Expectoração — quantidade, cor, consistência",
      "Hemoptise",
      "Sibilância / chiado"
    ]
  },
  {
    "id": "cardio",
    "icon": "❤️",
    "name": "Ap. Cardiovascular",
    "nameEs": "Ap. Cardiovascular",
    "questions": [
      "Dor precordial — relação com esforço, repouso",
      "Palpitações — início, duração, frequência",
      "Dispneia aos esforços / ortopneia",
      "Edema vespertino de membros inferiores",
      "HTA / cardiopatia conhecida",
      "Uso de medicação cardíaca"
    ]
  },
  {
    "id": "digest",
    "icon": "🫀",
    "name": "Ap. Digestivo",
    "nameEs": "Ap. Digestivo",
    "questions": [
      "Dor abdominal — localização, relação com alimentação",
      "Náuseas / vômitos",
      "Hematemese / melena / hematoquezia",
      "Hábito intestinal — frequência, consistência, cor",
      "Disfagia",
      "Pirosis / azia",
      "Icterícia",
      "Distensão abdominal"
    ]
  },
  {
    "id": "genito",
    "icon": "🫘",
    "name": "Ap. Geniturinário",
    "nameEs": "Ap. Genitourinario",
    "questions": [
      "Dificuldade miccional (disúria, polaquiúria, tenesmo)",
      "Características da urina (cor, turbidez)",
      "Cólica renal / dor lombar",
      "Edema palpebral matutino",
      "Secreção uretral / vaginal",
      "Disfunção sexual"
    ]
  },
  {
    "id": "motor",
    "icon": "🦿",
    "name": "Ap. Motor e osteoarticular",
    "nameEs": "Ap. Motor y osteoarticular",
    "questions": [
      "Artralgia / artrite — localização, simetria, horário",
      "Edema articular",
      "Limitação de movimento / rigidez matinal",
      "Mialgias / fraqueza muscular",
      "Deformidades / fraturas prévias"
    ]
  },
  {
    "id": "neuro",
    "icon": "🔬",
    "name": "Sistema Nervoso",
    "nameEs": "Sistema Nervioso",
    "questions": [
      "Alterações da sensibilidade",
      "Fraqueza / paresia",
      "Convulsões / crises epilépticas",
      "Alterações da marcha",
      "Alterações da fala / linguagem",
      "Tremores"
    ]
  },
  {
    "id": "endocrino",
    "icon": "⚗️",
    "name": "Glândulas endócrinas",
    "nameEs": "Glándulas endócrinas",
    "questions": [
      "Sintomas de hipo/hipertireoidismo",
      "Poliúria / polidipsia / polifagia (DM)",
      "Alterações de peso inexplicadas",
      "Mudanças nos caracteres sexuais secundários",
      "Cefaleia e alterações visuais (hipófise)"
    ]
  },
  {
    "id": "sangue",
    "icon": "🩸",
    "name": "Hematopoiético",
    "nameEs": "Hematopoyético",
    "questions": [
      "Palidez / cansaço fácil",
      "Sangramento anormal (petéquias, equimoses)",
      "Linfoadenomegalias",
      "Esplenomegalia"
    ]
  },
  {
    "id": "psiquico",
    "icon": "💭",
    "name": "Saúde mental",
    "nameEs": "Salud mental",
    "questions": [
      "Humor (depressão / ansiedade)",
      "Alterações do sono",
      "Ideação suicida / automutilação",
      "Alterações de comportamento",
      "Uso de psicofármacos"
    ]
  }
];

const GUIDE_CONTENT = {
  "apendicite": {
    "mnemonics": [
      {
        "kw": "APENDICITE",
        "name": "Características clínicas",
        "rows": [
          [
            "A",
            "Anorexia",
            ">90% dos casos"
          ],
          [
            "P",
            "Pain migration",
            "Periumbilical → FID (mais específico)"
          ],
          [
            "E",
            "Enjoo/náuseas",
            "Presentes após a dor"
          ],
          [
            "N",
            "Náusea APÓS a dor",
            "IMPORTANTE: dor precede vômitos (≠ gastroenterite)"
          ],
          [
            "D",
            "Defesa em FID",
            "Peritonite local"
          ],
          [
            "I",
            "Incapacitante",
            "Piora ao andar, sentar, tossir"
          ],
          [
            "C",
            "Calafrio/febre",
            "Febre baixa — alta → perfuração"
          ],
          [
            "I²",
            "Instabilidade",
            "FC↑, T>38,5°C, Leuco>18.000 → perfuração"
          ],
          [
            "T",
            "Toque retal",
            "Apendicite pélvica — Douglas doloroso"
          ],
          [
            "E",
            "Exames",
            "Leucocitose + USG/TC"
          ]
        ]
      },
      {
        "kw": "MANTRELS",
        "name": "Escore de Alvarado (10 pontos)",
        "rows": [
          [
            "M",
            "Migração da dor para a FID",
            "1 ponto"
          ],
          [
            "A",
            "Anorexia",
            "1 ponto"
          ],
          [
            "N",
            "Náuseas/vômitos",
            "1 ponto"
          ],
          [
            "T",
            "Tenderness — dor à palpação na FID",
            "2 pontos"
          ],
          [
            "R",
            "Rebound — dor à descompressão súbita (Blumberg)",
            "1 ponto"
          ],
          [
            "E",
            "Elevação da temperatura (≥ 37,3 °C)",
            "1 ponto"
          ],
          [
            "L",
            "Leucocitose (≥ 10.000/mm³)",
            "2 pontos"
          ],
          [
            "S",
            "Shift to the left — desvio à esquerda no hemograma",
            "1 ponto"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Blumberg",
        "subtitle": "Irritação peritoneal localizada na FID",
        "steps": [
          "Decúbito dorsal; localizar o ponto de McBurney (1/3 externo da linha umbigo–EIAS direita)",
          "Compressão profunda, lenta e contínua, mantida por alguns segundos",
          "Retirar a mão da parede abdominal de forma súbita e brusca"
        ],
        "normal": "Sem dor à descompressão",
        "abnormal": "Dor aguda e intensa no momento exato da descompressão — mais dolorosa que a compressão (Blumberg +)"
      },
      {
        "title": "Sinal de Rovsing",
        "subtitle": "Deslocamento retrógrado de gases ao ceco inflamado",
        "steps": [
          "Decúbito dorsal",
          "Compressões profundas (ou deslizamento palmar firme) ascendentes ao longo do cólon esquerdo",
          "Iniciar na FIE em direção ao cólon descendente"
        ],
        "normal": "Sem dor referida em FID",
        "abnormal": "Dor referida na FID durante a manipulação do lado esquerdo do abdome (Rovsing +)"
      },
      {
        "title": "Sinal do Psoas",
        "subtitle": "Apendicite retrocecal (fricção do psoas maior)",
        "steps": [
          "Decúbito lateral esquerdo; estabilizar a bacia com uma das mãos",
          "Com a outra mão, hiperextensão passiva forçada da coxa direita estendida (puxar o membro para trás)",
          "Alternativa: em decúbito dorsal, elevar a perna direita estendida contra a resistência da mão do examinador"
        ],
        "normal": "Sem dor à hiperextensão/elevação",
        "abnormal": "Surgimento ou agravamento substancial de dor na FID (Psoas +)"
      },
      {
        "title": "Sinal do Obturador",
        "subtitle": "Apendicite pélvica (fricção do obturatório interno)",
        "steps": [
          "Decúbito dorsal",
          "Flexionar passivamente a coxa e o joelho direitos a 90°",
          "Segurar o tornozelo e o joelho e realizar rotação interna passiva do quadril (pé para fora, joelho para dentro)"
        ],
        "normal": "Sem dor à rotação interna",
        "abnormal": "Dor hipogástrica ou profunda na FID (Obturador +)"
      },
      {
        "title": "Sinal de Dunphy",
        "subtitle": "Irritação peritoneal por variação brusca da pressão intra-abdominal",
        "steps": [
          "Decúbito dorsal",
          "Solicitar esforço de tossir firmemente uma ou duas vezes"
        ],
        "normal": "Tosse sem dor localizada",
        "abnormal": "Incremento agudo ou localização precisa da dor na FID ao tossir (Dunphy +)"
      },
      {
        "title": "Sinal de Lapinsky",
        "subtitle": "Apendicite retrocecal — compressão direta sob atividade muscular",
        "steps": [
          "Decúbito dorsal",
          "Manter compressão moderada com a mão espalmada sobre a FID",
          "Simultaneamente, pedir para elevar a perna direita com o joelho totalmente estendido"
        ],
        "normal": "Sem dor à elevação ativa",
        "abnormal": "Reprodução ou forte intensificação da dor na FID durante a elevação ativa do membro (Lapinsky +)"
      },
      {
        "title": "Sinal de Lenander",
        "subtitle": "Dissociação térmica por processo inflamatório intra-abdominal/pélvico ativo",
        "steps": [
          "Aferir concomitantemente a temperatura axilar e a temperatura retal",
          "Utilizar termômetros clínicos calibrados"
        ],
        "normal": "Diferença axilo-retal ≤1 °C",
        "abnormal": "Dissociação >1 °C entre a temperatura retal (mais elevada) e a axilar (Lenander +)"
      },
      {
        "title": "Sinal de Aaron",
        "subtitle": "Reflexo doloroso à distância (ceco/apêndice distendidos)",
        "steps": [
          "Aplicar e sustentar pressão contínua e profunda com a ponta dos dedos sobre o ponto de McBurney"
        ],
        "normal": "Sem dor referida à distância",
        "abnormal": "Dor, aperto ou queimação referida no epigástrio ou região periumbilical (Aaron +)"
      },
      {
        "title": "Sinal de Ten Horn",
        "subtitle": "Apendicite no sexo masculino (tração peritoneal via funículo espermático)",
        "steps": [
          "Decúbito dorsal",
          "Segurar delicadamente o testículo direito entre os dedos",
          "Exercer tração suave, contínua e firme em direção caudal"
        ],
        "normal": "Sem dor à tração testicular",
        "abnormal": "Dor aguda e imediata na FID durante o estiramento testicular (Ten Horn +)"
      },
      {
        "title": "Sinal de Markle (teste do calcanhar)",
        "subtitle": "Triagem de irritação peritoneal por ondas de choque",
        "steps": [
          "Em pé: erguer-se na ponta dos pés com os joelhos estendidos e deixar o corpo cair abruptamente sobre os calcanhares",
          "Acamado: manter a perna direita estendida e desferir percussão concussiva firme com o punho na planta do calcanhar direito"
        ],
        "normal": "Sem dor ao impacto",
        "abnormal": "Despertar de dor aguda localizada na FID ao impacto (Markle +)"
      },
      {
        "title": "Sinal de Guéneau de Mussy",
        "subtitle": "Irritação peritoneal generalizada (suspeita de perfuração com peritonite difusa)",
        "steps": [
          "Decúbito dorsal",
          "Compressão profunda seguida de descompressão súbita em qualquer quadrante FORA da FID (ou difusamente por toda a parede)"
        ],
        "normal": "Descompressão indolor fora da FID",
        "abnormal": "Dor intensa e generalizada à descompressão súbita — acometimento de todo o peritônio parietal (Guéneau de Mussy +)"
      },
      {
        "title": "Sinal de Chandelier (grito de Laffont)",
        "subtitle": "Foco inflamatório pélvico (DDx ou apendicite pélvica)",
        "steps": [
          "Paciente em posição ginecológica",
          "Toque vaginal bimanual até o fundo de saco posterior e lateral",
          "Mobilização lateral e cervical abrupta do colo do útero"
        ],
        "normal": "Mobilização do colo indolor",
        "abnormal": "Dor pélvica extrema com reação abrupta da paciente (Chandelier +) — estiramento de tecidos inflamados adjacentes"
      },
      {
        "title": "Sinal de Kocher",
        "subtitle": "Padrão cronológico de evolução (dor visceral → somática)",
        "steps": [
          "Manobra de anamnese dirigida",
          "Interrogar o local exato do início dos sintomas e o trajeto da dor nas últimas horas"
        ],
        "normal": "Dor sem migração característica",
        "abnormal": "Dor que iniciou em epigástrio/periumbilical e, após 4–6 h, migrou e fixou-se na FID (Kocher +)"
      }
    ],
    "sinais": [
      {
        "name": "Ponto de McBurney",
        "eponym": "Apendicite típica",
        "how": "Dor máxima no 1/3 externo da linha umbigo-EIAS direita",
        "means": "Apendicite com localização típica"
      },
      {
        "name": "Sinal do Psoas",
        "eponym": "Apendicite retrocecal",
        "how": "Hiperextensão do quadril direito em DL esquerdo → dor FID",
        "means": "Apêndice retrocecal — variante comum"
      },
      {
        "name": "Contratura da parede",
        "eponym": "Peritonite pós-perfuração",
        "how": "\"Ventre em tábua\" — rigidez difusa involuntária",
        "means": "Peritonite difusa → cirurgia de urgência imediata"
      }
    ],
    "ddx": [
      [
        "Apendicite",
        "Migração periumbilical→FID, anorexia, náuseas APÓS dor, febre baixa, Blumberg+",
        "Dor difusa, diarreia ANTES da dor, sem migração"
      ],
      [
        "Gastrenterite",
        "Diarreia+vômitos ANTES da dor, difusa, sem rigidez localizada",
        "Migração de dor, defesa FID, anorexia precedendo"
      ],
      [
        "Cólica ureteral",
        "Cólica lombar→FID, hematúria, agitação, inquieto",
        "Contínua, defesa, febre, sem hematúria"
      ],
      [
        "DIP",
        "Mulher, bilateral, corrimento, mobilização uterina dolorosa",
        "Homem, migração típica, sem corrimento"
      ],
      [
        "Gravidez ectópica",
        "β-HCG+, amenorreia, USG sem SIU, dor aguda+instabilidade",
        "Homem, β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Alvarado Score (MANTRELS)",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Migração dor FID",
            "1"
          ],
          [
            "Anorexia",
            "1"
          ],
          [
            "Náuseas/Vômitos",
            "1"
          ],
          [
            "Dor FID palpação",
            "2"
          ],
          [
            "Blumberg+",
            "1"
          ],
          [
            "Temperatura >37,3°C",
            "1"
          ],
          [
            "Leucocitose >10.000",
            "2"
          ],
          [
            "Desvio esquerda",
            "1"
          ]
        ],
        "note": "1-4: Baixa | 5-6: Observação | 7-8: Provável → cirurgia | 9-10: Alta → cirurgia imediata"
      },
      {
        "title": "AIR Score",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Vômito",
            "1"
          ],
          [
            "Dor FID",
            "1"
          ],
          [
            "Defesa FID leve",
            "1"
          ],
          [
            "Defesa FID moderada/grave",
            "2"
          ],
          [
            "Rebote FID",
            "1"
          ],
          [
            "Temperatura ≥38,5°C",
            "1"
          ],
          [
            "Leuco 10.000-14.900",
            "1"
          ],
          [
            "Leuco ≥15.000",
            "2"
          ],
          [
            "PCR 10-49",
            "1"
          ],
          [
            "PCR ≥50",
            "2"
          ]
        ],
        "note": "0-4: Alta com orientação | 5-8: Observação + imagem | 9-12: Cirurgia direta"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma + PCR",
        "β-HCG (mulheres)",
        "Urina rotina",
        "USG abdominal (1ª linha)",
        "TC abdome+pelve c/ contraste (gold standard)",
        "Rx abdome (pneumoperitônio)"
      ],
      "drugs": [
        "NPO + hidratação EV",
        "Dipirona/Tramadol EV (não retarda diagnóstico)",
        "Ondansetrona 4-8mg EV",
        "ATB pré-op: Cefazolina 2g EV 30min antes",
        "Perfurada: Metronidazol 500mg + Ceftriaxona 2g EV"
      ],
      "steps": [
        "1. Anamnese + exame → Alvarado score",
        "2. Laboratório + β-HCG + USG",
        "3. NPO + acesso EV + analgesia",
        "4. Alvarado ≤4 + USG normal: alta c/ orientação",
        "5. Alvarado 5-6: observação 12-24h",
        "6. Alvarado ≥7 ou TC confirma: apendicectomia laparoscópica <24h"
      ]
    }
  },
  "artralgia": {
    "mnemonics": [
      {
        "kw": "CAUSAS DE MONOARTRITE",
        "name": "Mnemônico GASA — principais causas de monoartrite aguda",
        "rows": [
          [
            "G",
            "Gota / pseudogota (cristais)",
            "Início súbito, dor intensa, frequentemente em 1ª MTF (podagra) ou joelho — confirmar com artrocentese e pesquisa de cristais"
          ],
          [
            "A",
            "Artrite Séptica",
            "Febre + monoartrite aguda + derrame importante — emergência, requer artrocentese e antibioticoterapia imediatas"
          ],
          [
            "S",
            "Sinovite por trauma/hemartrose",
            "Antecedente de trauma, uso de anticoagulantes — avaliar lesão estrutural/sangramento intra-articular"
          ],
          [
            "A",
            "Artrite reativa/espondiloartrite (apresentação monoarticular)",
            "Infecção prévia (gastrointestinal/urinária/STI), associada a entesite, uveíte ou lesões cutâneas"
          ]
        ]
      },
      {
        "kw": "CAUSAS DE POLIARTRITE",
        "name": "Mnemônico SOAP-BRAIN — causas de poliartrite (adaptado)",
        "rows": [
          [
            "S",
            "SLE (Lúpus Eritematoso Sistêmico)",
            "Poliartrite simétrica não erosiva, rash malar, fotossensibilidade, predomínio em mulheres jovens"
          ],
          [
            "O",
            "Osteoartrite",
            "Padrão mecânico, mãos (IFD/IFP), joelhos e quadris, idosos, rigidez matinal curta (<30min)"
          ],
          [
            "A",
            "Artrite Reumatoide",
            "Poliartrite simétrica de pequenas articulações (mãos/punhos), rigidez matinal >1h, FR/anti-CCP positivos"
          ],
          [
            "P",
            "Psoriásica (Artrite)",
            "Associada a psoríase cutânea/ungueal, dactilite (\"dedo em salsicha\"), entesite, padrão assimétrico"
          ],
          [
            "B",
            "Bacteriana/viral (artrites infecciosas e reativas)",
            "Quadro agudo, febre, relação temporal com infecção prévia"
          ],
          [
            "R",
            "Reumática (Febre Reumática)",
            "Poliartrite migratória após faringite estreptocócica, principalmente em crianças/jovens"
          ],
          [
            "A",
            "Artrite gotosa/cristais (poliarticular crônica)",
            "Tofos, antecedente de hiperuricemia, crises recorrentes"
          ],
          [
            "I",
            "Inflamatória — espondiloartrites (axial/periférica)",
            "Dor inflamatória, rigidez matinal prolongada, sacroileíte, uveíte, psoríase, doença inflamatória intestinal associada"
          ],
          [
            "N",
            "Neoplásica (síndrome paraneoplásica)",
            "Poliartrite de início recente em idosos, perda de peso, sintomas sistêmicos — investigar neoplasia oculta"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal da tecla patelar (choque rotuliano)",
        "subtitle": "Avaliação de derrame articular no joelho",
        "steps": [
          "Com o paciente em decúbito dorsal e joelho estendido, comprima o recesso suprapatelar com uma mão para deslocar o líquido",
          "Com os dedos da outra mão, pressione a patela contra o fêmur de forma rápida e firme"
        ],
        "normal": "Patela em contato direto com o fêmur, sem sensação de \"afundar e voltar\"",
        "abnormal": "Sensação de a patela \"flutuar\" e bater contra o fêmur (sinal da tecla positivo) → indica derrame articular significativo no joelho"
      },
      {
        "title": "Avaliação da amplitude de movimento (ADM) articular",
        "subtitle": "Identificação de limitação funcional e dor ao movimento",
        "steps": [
          "Solicite movimentos ativos (o próprio paciente realiza) e depois passivos (o examinador movimenta) de cada articulação suspeita",
          "Compare a amplitude e a presença de dor entre os dois lados",
          "Observe crepitações, bloqueios ou instabilidade durante o movimento"
        ],
        "normal": "ADM completa, simétrica, sem dor ou crepitação",
        "abnormal": "Limitação da ADM, dor ao movimento passivo e ativo, crepitação ou bloqueio articular → sugere processo inflamatório, degenerativo ou mecânico intra-articular"
      },
      {
        "title": "Palpação de entesites e pontos dolorosos periarticulares",
        "subtitle": "Avaliação de inserções tendíneas/ligamentares (entesites)",
        "steps": [
          "Palpe os pontos de inserção tendínea mais comumente acometidos (tendão de Aquiles, fáscia plantar, epicôndilos, trocânter maior)",
          "Avalie dor à palpação localizada e edema associado"
        ],
        "normal": "Sem dor à palpação das ênteses",
        "abnormal": "Dor localizada à palpação de ênteses (entesite) → achado sugestivo de espondiloartrite (psoriásica, axial, reativa)"
      },
      {
        "title": "Inspeção e palpação articular geral",
        "subtitle": "Avaliação de sinais inflamatórios e deformidades",
        "steps": [
          "Inspecione simetria, edema, deformidades, eritema e atrofia muscular adjacente",
          "Palpe a articulação avaliando calor local, derrame, espessamento sinovial e dor à compressão"
        ],
        "normal": "Articulações sem edema, calor, eritema ou deformidade; temperatura local semelhante à pele adjacente",
        "abnormal": "Calor, edema, eritema e dor à palpação (sinovite ativa) ou deformidades estruturais (sugerem doença crônica/erosiva)"
      }
    ],
    "sinais": [
      {
        "name": "Tofos gotosos",
        "eponym": "Depósitos de cristais de urato",
        "how": "Nódulos endurecidos, geralmente em hélice da orelha, cotovelos, mãos e ao redor de articulações, podendo drenar material esbranquiçado/pastoso",
        "means": "Indicam gota tofácea crônica — depósito de cristais de urato monossódico em tecidos moles, associado a hiperuricemia de longa data"
      },
      {
        "name": "Nódulos reumatoides",
        "eponym": "Achado extra-articular da Artrite Reumatoide",
        "how": "Nódulos subcutâneos firmes e indolores, comumente localizados em superfícies extensoras (cotovelos, antebraços)",
        "means": "Marcador de doença mais grave/erosiva e de pior prognóstico na artrite reumatoide, geralmente associados a FR positivo"
      },
      {
        "name": "Dactilite (\"dedo em salsicha\")",
        "eponym": "Achado característico da artrite psoriásica",
        "how": "Edema difuso de todo o dedo (não apenas das articulações), conferindo aspecto de \"salsicha\"",
        "means": "Resulta da inflamação simultânea de articulações e tendões (tenossinovite) — fortemente sugestivo de espondiloartrite, especialmente psoriásica"
      },
      {
        "name": "Deformidades articulares características (mãos)",
        "eponym": "Estigmas de doença articular crônica",
        "how": "Desvio ulnar dos dedos e deformidades em \"pescoço de cisne\"/\"botoeira\" (AR); nódulos de Heberden (IFD) e Bouchard (IFP) na osteoartrite",
        "means": "Indicam doença articular crônica/estabelecida — o padrão de deformidade ajuda a diferenciar artrite reumatoide de osteoartrite"
      }
    ],
    "ddx": [
      [
        "Gota (artrite por cristais de urato)",
        "Monoartrite aguda de início súbito e dor intensa, frequentemente em 1ª MTF (podagra), hiperuricemia, tofos em casos crônicos, boa resposta a anti-inflamatórios",
        "Padrão poliarticular simétrico crônico desde o início, ausência de cristais na artrocentese"
      ],
      [
        "Artrite Reumatoide",
        "Poliartrite simétrica de pequenas articulações (mãos e punhos), rigidez matinal prolongada (>1h), FR/anti-CCP positivos, nódulos reumatoides, evolução crônica e erosiva",
        "Padrão monoarticular agudo e febril, ou padrão assimétrico com entesite/dactilite (mais sugestivo de espondiloartrite)"
      ],
      [
        "Artrite Séptica",
        "Monoartrite aguda, febre, mal-estar importante, derrame articular volumoso e muito doloroso, fator de risco para bacteriemia (uso de drogas IV, imunossupressão, prótese articular) — emergência médica",
        "Quadro crônico e afebril, múltiplas articulações acometidas de forma simétrica e indolente"
      ],
      [
        "Osteoartrite (artrose)",
        "Dor de padrão mecânico (piora ao uso, melhora ao repouso), rigidez matinal curta (<30min), acomete articulações de carga (joelhos, quadris) e mãos (IFD/IFP), idade avançada, crepitação à mobilização",
        "Dor de padrão inflamatório com rigidez matinal prolongada, sinais inflamatórios importantes (calor, eritema, edema significativo)"
      ],
      [
        "Espondiloartrites (psoriásica, axial, reativa, enteropática)",
        "Dor inflamatória, rigidez matinal prolongada, entesite, dactilite, sacroileíte, uveíte, psoríase ou doença inflamatória intestinal associadas, geralmente em adultos jovens, HLA-B27 frequentemente positivo",
        "Padrão puramente mecânico, simetria de pequenas articulações sem entesite, ausência de manifestações extra-articulares"
      ]
    ],
    "escalas": [
      {
        "title": "Diferenciação inicial — padrão inflamatório x mecânico",
        "headers": [
          "Característica",
          "Padrão inflamatório",
          "Padrão mecânico"
        ],
        "rows": [
          [
            "Rigidez matinal",
            "Prolongada (>1 hora)",
            "Curta (<30 minutos)"
          ],
          [
            "Relação com uso/repouso",
            "Melhora com o movimento, piora em repouso/à noite",
            "Piora com o uso/esforço, melhora com repouso"
          ],
          [
            "Sinais inflamatórios locais",
            "Calor, rubor, edema, derrame proeminentes",
            "Discretos ou ausentes, predomínio de crepitação"
          ],
          [
            "Sintomas sistêmicos",
            "Frequentes (febre, fadiga, perda de peso, rash)",
            "Geralmente ausentes"
          ]
        ],
        "note": "Essa diferenciação inicial orienta a priorização diagnóstica — padrão inflamatório direciona a investigação para doenças autoimunes/infecciosas/microcristalinas, enquanto o padrão mecânico sugere causas degenerativas/estruturais"
      }
    ],
    "conduta": {
      "exames": [
        "Artrocentese (punção articular) — mandatória em toda monoartrite aguda febril/com derrame para análise do líquido sinovial (celularidade, cristais, Gram e cultura) — exclui artrite séptica e confirma gota/pseudogota",
        "Hemograma completo, VHS e PCR — avaliar atividade inflamatória/infecciosa sistêmica",
        "Ácido úrico sérico — auxilia na suspeita de gota (lembrando que pode estar normal durante a crise aguda)",
        "Fator reumatoide (FR) e anti-CCP — investigação de artrite reumatoide",
        "FAN e outros autoanticorpos — conforme suspeita de doença autoimune sistêmica (lúpus e correlatos)",
        "Radiografia das articulações acometidas — avaliar erosões, redução de espaço articular, calcificações (condrocalcinose) e alterações estruturais crônicas"
      ],
      "drugs": [
        "Anti-inflamatórios não esteroidais (AINEs) — primeira linha sintomática em crises agudas (gota, padrão mecânico), respeitando contraindicações",
        "Colchicina ou corticoide (oral/intra-articular) — alternativas no manejo da crise aguda de gota",
        "Analgésicos simples (paracetamol/dipirona) para controle sintomático geral da dor",
        "Artrite séptica suspeita/confirmada → antibioticoterapia empírica de amplo espectro IV após coleta de cultura, com avaliação para drenagem articular — não retardar o início",
        "Doença autoimune confirmada (AR, lúpus, espondiloartrites) → encaminhamento à reumatologia para terapia modificadora do curso da doença (DMARDs, biológicos)"
      ],
      "steps": [
        "1. Caracterizar o padrão (mono/oligo/poliarticular, simetria, ritmo inflamatório x mecânico) e sinais de alarme (febre, derrame importante, sinais sistêmicos)",
        "2. Monoartrite aguda febril → considerar artrite séptica como emergência: artrocentese imediata, hemoculturas e início precoce de antibioticoterapia conforme avaliação especializada",
        "3. Suspeita de gota/pseudogota → artrocentese com pesquisa de cristais (padrão-ouro) sempre que possível, além de ácido úrico sérico",
        "4. Padrão poliarticular simétrico crônico com rigidez matinal prolongada → solicitar FR, anti-CCP, FAN, provas inflamatórias e radiografias, com encaminhamento à reumatologia",
        "5. Padrão mecânico em paciente idoso, sem sinais inflamatórios importantes → investigação radiográfica de osteoartrite e manejo conservador (analgesia, fisioterapia, controle de peso)",
        "6. Presença de manifestações extra-articulares (rash, uveíte, lesões orais/genitais, psoríase, sintomas sistêmicos) → ampliar investigação para doença autoimune/espondiloartrite sistêmica"
      ]
    }
  },
  "cefaleia": {
    "mnemonics": [
      {
        "kw": "SNOOP4",
        "name": "Sinais de alarme — cefaleia secundária",
        "rows": [
          [
            "S",
            "Sistêmico",
            "Febre, perda de peso, HIV, neoplasia"
          ],
          [
            "N",
            "Neurológico",
            "Déficit focal, papiledema, meningismo"
          ],
          [
            "O",
            "Onset súbito",
            "Thunderclap — pior cefaleia da vida em segundos"
          ],
          [
            "O²",
            "Older >50 anos",
            "1ª cefaleia — arterite temporal, HIC"
          ],
          [
            "P",
            "Progressiva",
            "Piora progressiva sem alívio"
          ],
          [
            "P²",
            "Position",
            "Piora em decúbito, tosse, Valsalva"
          ],
          [
            "P³",
            "Prior change",
            "Mudança de padrão em crônico"
          ],
          [
            "P⁴",
            "Pregnancy",
            "HAS, eclâmpsia, TVS cerebral"
          ]
        ]
      },
      {
        "kw": "POUNDIT",
        "name": "Critérios de Enxaqueca",
        "rows": [
          [
            "P",
            "Pulsátil",
            "Latejante"
          ],
          [
            "O",
            "One day (4-72h)",
            "Duração sem tratamento"
          ],
          [
            "U",
            "Unilateral",
            "Hemicraniana (60-70%)"
          ],
          [
            "N",
            "Nausea",
            "Náuseas/vômitos"
          ],
          [
            "D",
            "Disabling",
            "Incapacitante"
          ],
          [
            "I",
            "Interfere",
            "Piora ao movimentar"
          ],
          [
            "T",
            "Treatment",
            "Boa resposta a triptanos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Kernig",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal",
          "Fletir quadril e joelho 90°",
          "Tentar estender joelho passivamente"
        ],
        "normal": "Extensão livre sem dor",
        "abnormal": "Resistência+dor → Kernig+ (meningite, HSA)"
      },
      {
        "title": "Sinal de Brudzinski",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal sem travesseiro",
          "Imobilizar ombros",
          "Fletir pescoço ao tórax"
        ],
        "normal": "Sem flexão dos MMII",
        "abnormal": "Flexão reflexa dos joelhos/quadris → Brudzinski+"
      },
      {
        "title": "Fundoscopia",
        "subtitle": "Papiledema — HIC",
        "steps": [
          "Sala escura, dilatar se possível",
          "Examinar disco óptico — bordas, pulso venoso"
        ],
        "normal": "Bordas nítidas, pulso venoso presente",
        "abnormal": "Bordas apagadas, elevação → papiledema = HIC → TC urgente"
      }
    ],
    "sinais": [
      {
        "name": "Thunderclap Headache",
        "eponym": "HSA",
        "how": "Máxima intensidade em <1 minuto — pior cefaleia da vida",
        "means": "HSA até prova em contrário — TC crânio urgente; se normal: PL (xantocromia)"
      },
      {
        "name": "Tríade meningítica",
        "eponym": "Meningite bacteriana",
        "how": "Cefaleia + Febre + Rigidez de nuca",
        "means": "ATB IMEDIATO após hemoculturas — não aguardar TC se sem papiledema"
      },
      {
        "name": "Aura visual clássica",
        "eponym": "Enxaqueca com aura",
        "how": "Escotoma cintilante em espectro de fortificação — 20-60 min ANTES da dor",
        "means": "Enxaqueca com aura — triptano na fase de DOR (não durante a aura)"
      },
      {
        "name": "Rigidez de nuca",
        "eponym": "Irritação meníngea",
        "how": "Resistência e dor à flexão passiva do pescoço",
        "means": "Meningite, HSA, encefalite — TC + punção lombar"
      }
    ],
    "ddx": [
      [
        "Enxaqueca",
        "Hemicraniana, pulsátil, náuseas, fotofobia, 4-72h, história prévia",
        "Thunderclap, déficit neurológico, febre, meningismo"
      ],
      [
        "Cefaleia tensional",
        "Bilateral, aperto/pressão, não incapacitante, sem náuseas/foto",
        "Pulsátil, hemicraniana, vômitos, incapacitante"
      ],
      [
        "HSA",
        "Thunderclap — máxima em segundos, pior da vida, meningismo",
        "Gradual, recorrente idêntica, sem meningismo"
      ],
      [
        "Meningite",
        "Febre + cefaleia + rigidez + fotofobia, Kernig+",
        "Sem febre, sem meningismo, recorrente há anos"
      ],
      [
        "HIC",
        "Progressiva, pior manhã, piora Valsalva, papiledema",
        "Hemicraniana, pulsátil, sem papiledema"
      ],
      [
        "Cefaleia em salvas",
        "Periorbital unilateral, lacrimejo, rinorreia, 15-180 min, agitação",
        "Bilateral, sem autonômicos, duração >3h"
      ]
    ],
    "escalas": [
      {
        "title": "ID Migraine",
        "headers": [
          "Pergunta",
          "Pontos"
        ],
        "rows": [
          [
            "Náuseas ou vômitos durante as crises?",
            "1"
          ],
          [
            "Cefaleia incapacitante?",
            "1"
          ],
          [
            "Sensibilidade à luz?",
            "1"
          ]
        ],
        "note": "≥2/3: Sensibilidade 81%, Especificidade 78% para enxaqueca"
      },
      {
        "title": "ICHD-3: Enxaqueca sem aura",
        "headers": [
          "Critério",
          "Descrição"
        ],
        "rows": [
          [
            "A",
            "≥5 crises preenchendo B-D"
          ],
          [
            "B",
            "4-72h sem tratamento"
          ],
          [
            "C",
            "≥2 de: unilateral/pulsátil/moderada-grave/piora com atividade"
          ],
          [
            "D",
            "≥1 de: náuseas/vômitos OU foto+fonofobia"
          ],
          [
            "E",
            "Não atribuída a outra causa"
          ]
        ],
        "note": ""
      }
    ],
    "conduta": {
      "exames": [
        "TC crânio sem contraste (thunderclap, déficit, febre+meningismo, >50 anos 1ª cefaleia)",
        "PL se TC normal + suspeita HSA",
        "Hemograma + VHS (arterite temporal >50 anos)",
        "PA (cefaleia hipertensiva)",
        "Fundoscopia (papiledema)"
      ],
      "drugs": [
        "Leve-moderada: AAS 1g VO + Metoclopramida 10mg",
        "Moderada-grave: Triptano (Sumatriptano 50-100mg VO ou 6mg SC)",
        "Profilaxia (>4 crises/mês): Propranolol 40-160mg/dia, Amitriptilina, Topiramato",
        "Em salvas: O₂ 100% 12L/min 15 min + Sumatriptano SC"
      ],
      "steps": [
        "1. SNOOP4 — excluir cefaleia secundária",
        "2. TC urgente se alarme",
        "3. Classificar tipo",
        "4. Tratar crise + prevenir se frequente",
        "5. Orientar diário de cefaleias"
      ]
    }
  },
  "colecistite-colelitiase": {
    "mnemonics": [
      {
        "kw": "5 F",
        "name": "Fatores de risco para colelitíase",
        "rows": [
          [
            "F",
            "Female",
            "Sexo feminino"
          ],
          [
            "F",
            "Forty",
            "Idade ~40 anos"
          ],
          [
            "F",
            "Fat",
            "Obesidade / dislipidemia"
          ],
          [
            "F",
            "Fertile",
            "Multiparidade / estrógeno"
          ],
          [
            "F",
            "Family",
            "História familiar"
          ]
        ]
      },
      {
        "kw": "CHARCOT",
        "name": "Tríade da colangite",
        "rows": [
          [
            "F",
            "Febre",
            "Febre com calafrios"
          ],
          [
            "I",
            "Icterícia",
            "Icterícia obstrutiva"
          ],
          [
            "D",
            "Dor HCD",
            "Dor no hipocôndrio direito"
          ]
        ]
      },
      {
        "kw": "COMPLICA",
        "name": "Complicações da litíase biliar",
        "rows": [
          [
            "C",
            "Colecistite",
            "Inflamação aguda da vesícula"
          ],
          [
            "O",
            "Obstrução",
            "Coledocolitíase → icterícia"
          ],
          [
            "M",
            "colangite",
            "Infecção da via biliar"
          ],
          [
            "P",
            "Pancreatite",
            "Cálculo impactado na papila"
          ],
          [
            "I",
            "Íleo biliar",
            "Fístula + obstrução por cálculo"
          ],
          [
            "A",
            "Abscesso/empiema",
            "Vesícula supurada"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Murphy",
        "subtitle": "Colecistite aguda",
        "steps": [
          "Mão sob o rebordo costal direito (linha hemiclavicular)",
          "Pedir ao paciente para inspirar profundamente",
          "Observar interrupção súbita da inspiração por dor"
        ],
        "normal": "Inspiração completa sem dor",
        "abnormal": "Parada inspiratória dolorosa (Murphy +) → colecistite aguda"
      },
      {
        "title": "Murphy ultrassonográfico",
        "subtitle": "Confirmação por imagem",
        "steps": [
          "Transdutor sobre a vesícula durante a USG",
          "Pesquisar dor máxima sobre a vesícula visualizada"
        ],
        "normal": "Sem dor focal; parede fina <3 mm",
        "abnormal": "Dor focal + parede >3 mm + líquido perivesicular → colecistite"
      },
      {
        "title": "Pesquisa de icterícia",
        "subtitle": "Suspeita de coledocolitíase",
        "steps": [
          "Inspecionar esclera sob luz natural",
          "Avaliar colúria e acolia fecal"
        ],
        "normal": "Esclera anictérica",
        "abnormal": "Icterícia + colúria → obstrução biliar (coledocolitíase/colangite)"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Murphy",
        "eponym": "Colecistite aguda",
        "how": "Parada inspiratória à palpação do HCD",
        "means": "Colecistite aguda — alta sensibilidade"
      },
      {
        "name": "Tríade de Charcot",
        "eponym": "Colangite",
        "how": "Febre + icterícia + dor HCD",
        "means": "Colangite aguda — antibiótico + drenagem biliar"
      },
      {
        "name": "Sinal de Courvoisier",
        "eponym": "Obstrução maligna",
        "how": "Vesícula palpável, indolor, com icterícia",
        "means": "Sugere obstrução maligna (tumor de cabeça de pâncreas), não litíase"
      },
      {
        "name": "Pêntade de Reynolds",
        "eponym": "Colangite tóxica",
        "how": "Charcot + hipotensão + confusão",
        "means": "Colangite supurativa grave — drenagem de urgência"
      }
    ],
    "ddx": [
      [
        "Cólica biliar",
        "Dor HCD pós-gordurosa, <6h, sem febre, Murphy -",
        "Febre, leucocitose, Murphy +"
      ],
      [
        "Colecistite aguda",
        "Dor HCD >6h, febre, Murphy +, parede vesicular espessa",
        "Dor curta autolimitada, sem inflamação"
      ],
      [
        "Coledocolitíase",
        "Icterícia, colúria, FA/GGT ↑, dilatação de via biliar",
        "Bilirrubina normal, via biliar fina"
      ],
      [
        "Colangite",
        "Tríade de Charcot, sepse biliar",
        "Sem febre/icterícia"
      ],
      [
        "Pancreatite biliar",
        "Dor epigástrica em faixa, amilase/lipase ↑",
        "Enzimas pancreáticas normais"
      ],
      [
        "Úlcera péptica perfurada",
        "Dor súbita, abdome em tábua, pneumoperitônio",
        "Dor localizada HCD, Murphy +"
      ],
      [
        "Hepatite aguda",
        "Transaminases muito elevadas, icterícia, astenia",
        "Predomínio de FA/GGT, dor tipo cólica"
      ]
    ],
    "escalas": [
      {
        "title": "Tokyo Guidelines — Gravidade da colecistite",
        "headers": [
          "Grau",
          "Critério"
        ],
        "rows": [
          [
            "I (leve)",
            "Sem disfunção orgânica, inflamação leve"
          ],
          [
            "II (moderada)",
            "Leucócitos >18.000, massa palpável, >72h, inflamação local marcada"
          ],
          [
            "III (grave)",
            "Disfunção de órgão (cardiovascular, neurológica, respiratória, renal, hepática, hematológica)"
          ]
        ],
        "note": "Grau III exige suporte de órgão + drenagem precoce"
      },
      {
        "title": "Preditores de coledocolitíase (ASGE)",
        "headers": [
          "Preditor",
          "Força"
        ],
        "rows": [
          [
            "Cálculo no colédoco à USG",
            "Muito forte"
          ],
          [
            "Bilirrubina total >4 mg/dL",
            "Muito forte"
          ],
          [
            "Via biliar dilatada + Bili 1,8-4",
            "Forte"
          ],
          [
            "Colangite clínica",
            "Muito forte"
          ]
        ],
        "note": "Alto risco → CPRE; risco intermediário → colangio-RM ou USG endoscópica"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, PCR",
        "Bilirrubinas, FA, GGT, TGO, TGP",
        "Amilase e lipase (excluir pancreatite)",
        "USG de abdome (exame de escolha)",
        "Colangio-RM/USG endoscópica se suspeita de coledocolitíase"
      ],
      "drugs": [
        "Jejum + hidratação venosa",
        "Analgesia (dipirona/AINE; opioide se intensa)",
        "Antieméticos",
        "Antibiótico (ex.: ceftriaxona + metronidazol) na colecistite/colangite",
        "CPRE para desobstrução na coledocolitíase/colangite"
      ],
      "steps": [
        "1. Confirmar diagnóstico clínico + USG",
        "2. Jejum, hidratação e analgesia",
        "3. ATB se colecistite/colangite",
        "4. Colecistectomia videolaparoscópica precoce (idealmente <72h) na colecistite aguda",
        "5. Coledocolitíase/colangite: CPRE para drenagem + colecistectomia posterior"
      ]
    }
  },
  "convulsao-sincope": {
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
  "diarreia": {
    "mnemonics": [
      {
        "kw": "DIARREIA",
        "name": "Causas e mecanismos da diarreia",
        "rows": [
          [
            "D",
            "Disabsortiva",
            "Doença celíaca, insuficiência pancreática, supercrescimento bacteriano"
          ],
          [
            "I",
            "Infecciosa aguda",
            "Viral (rotavírus, norovírus), bacteriana (Salmonella, Shigella, E. coli), parasitária"
          ],
          [
            "A",
            "Alimentar/intolerâncias",
            "Intolerância à lactose, ingestão de laxantes/adoçantes (osmótica)"
          ],
          [
            "R",
            "Resposta inflamatória (DII)",
            "Doença de Crohn, retocolite ulcerativa — sangue, muco, dor abdominal"
          ],
          [
            "R²",
            "Redução de absorção (secretora)",
            "Toxinas bacterianas, tumores neuroendócrinos — diarreia aquosa volumosa, persiste em jejum"
          ],
          [
            "E",
            "Endócrina/medicamentosa",
            "Hipertireoidismo, diabetes (neuropatia autonômica), antibióticos, laxantes"
          ],
          [
            "I²",
            "Intestino irritável (funcional)",
            "Dor abdominal associada, alternância com constipação, sem sinais de alarme"
          ],
          [
            "A²",
            "AIDS/imunossupressão",
            "Infecções oportunistas em imunocomprometidos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação de sinais de desidratação",
        "subtitle": "Gravidade da diarreia aguda",
        "steps": [
          "Avaliar turgor cutâneo e mucosas",
          "Aferir PA e FC, pesquisar hipotensão postural",
          "Avaliar diurese e nível de consciência"
        ],
        "normal": "Mucosas úmidas, turgor normal, sinais vitais estáveis",
        "abnormal": "Sinais de desidratação moderada a grave → necessidade de reposição volêmica EV"
      },
      {
        "title": "Toque retal",
        "subtitle": "Avaliação de sangramento e massas (quando indicado)",
        "steps": [
          "Explicar o procedimento e obter consentimento",
          "Inspecionar região perianal",
          "Realizar toque digital avaliando tônus, presença de massas e sangue nas luvas"
        ],
        "normal": "Sem massas, sangue ou fezes endurecidas",
        "abnormal": "Sangue vivo/oculto, massa palpável, impactação fecal → investigar causa orgânica"
      },
      {
        "title": "Exame abdominal",
        "subtitle": "Identificar dor localizada, distensão ou massas",
        "steps": [
          "Inspeção, ausculta, percussão e palpação dos quadrantes",
          "Pesquisar dor à palpação, distensão e massas"
        ],
        "normal": "Abdome flácido, indolor, sem massas",
        "abnormal": "Dor localizada, massas palpáveis ou distensão → investigar causa orgânica/inflamatória"
      }
    ],
    "sinais": [
      {
        "name": "Sangue nas fezes (hematoquezia/melena)",
        "eponym": "Diarreia inflamatória/invasiva",
        "how": "Presença visível de sangue ou muco nas fezes",
        "means": "Sugere DII, infecção invasiva (Shigella, E. coli êntero-hemorrágica) ou neoplasia — investigar com urgência"
      },
      {
        "name": "Febre alta associada",
        "eponym": "Diarreia infecciosa invasiva",
        "how": "Temperatura >38,5°C acompanhando quadro diarreico",
        "means": "Sugere etiologia bacteriana invasiva — considerar coprocultura e possível antibioticoterapia"
      },
      {
        "name": "Sinais sistêmicos de toxemia",
        "eponym": "Quadro grave/complicado",
        "how": "Taquicardia, hipotensão, alteração do estado mental, oligúria",
        "means": "Sinaliza desidratação grave ou sepse de foco entérico — necessidade de internação e suporte intensivo"
      }
    ],
    "ddx": [
      [
        "Diarreia infecciosa aguda",
        "Início súbito, <2 semanas, possível febre, contactantes/viagens recentes, autolimitada",
        "Curso crônico (>4 semanas), perda de peso progressiva"
      ],
      [
        "Doença inflamatória intestinal (DII)",
        "Diarreia crônica com sangue/muco, dor abdominal, perda de peso, manifestações extraintestinais",
        "Episódio agudo autolimitado sem recorrência"
      ],
      [
        "Síndrome do intestino irritável",
        "Dor abdominal associada à alteração do hábito intestinal, alívio com evacuação, sem sinais de alarme, exames normais",
        "Presença de sangue, febre, perda de peso ou alterações laboratoriais (sinais de alarme)"
      ],
      [
        "Diarreia disabsortiva (doença celíaca, insuficiência pancreática)",
        "Esteatorreia, perda de peso, deficiências nutricionais, distensão abdominal pós-prandial",
        "Fezes de aspecto normal, sem sinais de má-absorção"
      ],
      [
        "Diarreia osmótica (intolerâncias/laxantes)",
        "Relação temporal com alimentos/medicamentos, melhora com jejum",
        "Diarreia que persiste mesmo em jejum (sugere secretora)"
      ]
    ],
    "escalas": [
      {
        "title": "Escala de Bristol (forma das fezes)",
        "headers": [
          "Tipo",
          "Descrição"
        ],
        "rows": [
          [
            "Tipo 1-2",
            "Fezes endurecidas/em pedaços — constipação"
          ],
          [
            "Tipo 3-4",
            "Fezes normais/bem formadas"
          ],
          [
            "Tipo 5",
            "Fezes pastosas com bordas definidas — tendência a diarreia"
          ],
          [
            "Tipo 6-7",
            "Fezes pastosas/líquidas sem forma — diarreia"
          ]
        ],
        "note": "Útil para padronizar a descrição do hábito intestinal e acompanhar evolução"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, eletrólitos e função renal (avaliar repercussão sistêmica)",
        "Coprocultura e parasitológico de fezes (diarreia persistente, sangue, febre alta, imunossuprimidos)",
        "Pesquisa de toxina de Clostridioides difficile (uso recente de antibióticos)",
        "Calprotectina fecal/marcadores inflamatórios (suspeita de DII)",
        "Colonoscopia/endoscopia conforme suspeita de causa orgânica crônica"
      ],
      "drugs": [
        "Hidratação oral (sais de reidratação) ou EV conforme gravidade",
        "Antitérmicos/analgésicos sintomáticos (Dipirona/Paracetamol)",
        "Loperamida com cautela (evitar se febre alta, sangue nas fezes ou suspeita de quadro invasivo)",
        "Antibioticoterapia dirigida apenas em casos selecionados: disenteria, imunossuprimidos, febre alta persistente, viagem a área de risco com quadro grave (ex.: Azitromicina ou Ciprofloxacino conforme suspeita)"
      ],
      "steps": [
        "1. Caracterizar a diarreia (aguda x crônica, aquosa x com sangue/muco)",
        "2. Avaliar gravidade da desidratação e sinais de alarme",
        "3. Hidratação adequada (oral ou EV)",
        "4. Solicitar exames conforme sinais de alarme ou cronicidade",
        "5. Reservar antibioticoterapia para casos selecionados (não usar empiricamente na maioria das diarreias agudas)",
        "6. Investigação adicional (endoscopia/colonoscopia) se quadro crônico ou sinais de DII"
      ]
    }
  },
  "dispneia": {
    "mnemonics": [
      {
        "kw": "PASTE",
        "name": "Causas de dispneia aguda",
        "rows": [
          [
            "P",
            "Pneumonia/Pneumotórax",
            "Febre+crepitantes / MV ausente unilateral+súbito"
          ],
          [
            "A",
            "Asma/DPOC",
            "Sibilância, uso musculatura acessória"
          ],
          [
            "S",
            "SCA/ICC",
            "Ortopneia, crepitantes bibasais, BNP ↑"
          ],
          [
            "T",
            "TEP",
            "Pleurítica, TVP, taquicardia, D-Dímero ↑"
          ],
          [
            "E",
            "Epiglotite/Obstrução",
            "Estridor, disfagia, febre, posição trípode"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Expansibilidade torácica",
        "subtitle": "Ventilação simétrica",
        "steps": [
          "Mãos abertas nos terços inferiores posterior",
          "Polegares na linha média",
          "Inspiração profunda — observar separação dos polegares"
        ],
        "normal": "Expansão simétrica bilateralmente",
        "abnormal": "Assimetria → consolidação, derrame, pneumotórax no lado reduzido"
      },
      {
        "title": "Frêmito Tóraco-Vocal",
        "subtitle": "Transmissão de vibrações",
        "steps": [
          "Borda ulnar das mãos no tórax posterior",
          "Dizer \"trinta e três\"",
          "Comparar bilateralmente"
        ],
        "normal": "FTV simétrico bilateralmente",
        "abnormal": "↑ → consolidação | ↓ → derrame, pneumotórax"
      },
      {
        "title": "Percussão torácica",
        "subtitle": "Padrões de ressonância",
        "steps": [
          "Dedo médio nos espaços intercostais",
          "Percutir comparativamente bilateral"
        ],
        "normal": "Sonoridade normal bilateralmente",
        "abnormal": "Macicez → derrame/consolidação | Hiperressonância → pneumotórax"
      }
    ],
    "sinais": [
      {
        "name": "Tiragem intercostal",
        "eponym": "Trabalho respiratório aumentado",
        "how": "Retração dos espaços intercostais na inspiração",
        "means": "Obstrução grave — asma grave, pneumonia extensa"
      },
      {
        "name": "Sibilância expiratória",
        "eponym": "Broncoespasmo",
        "how": "Ruído musical, fase expiratória prolongada",
        "means": "Asma (reversível com BD) ou DPOC (parcialmente reversível)"
      },
      {
        "name": "Crepitantes finos bibasais",
        "eponym": "ICC/Fibrose",
        "how": "Como cabelo friccionado — inspiração final",
        "means": "Bibasais ICC (edema) | Focais → pneumonia, fibrose"
      },
      {
        "name": "Ortopneia",
        "eponym": "ICC",
        "how": "Dispneia ao deitar — número de travesseiros",
        "means": "≥3 travesseiros: alta especificidade para ICC"
      }
    ],
    "ddx": [
      [
        "Asma aguda",
        "Sibilância, história prévia, boa resposta BD, jovem atópico",
        "Ortopneia, crepitantes, BNP ↑"
      ],
      [
        "ICC descompensada",
        "Ortopneia, DPN, crepitantes bibasais, BNP ↑, cardiomegalia",
        "Sibilância pura, BNP normal"
      ],
      [
        "DPOC agudizado",
        "Tabagista, hiperinsuflação, uso musculatura acessória",
        "Atopia, sem tabagismo, boa resposta BD"
      ],
      [
        "Pneumonia",
        "Febre, crepitantes focais, FTV ↑, consolidação Rx",
        "Bilateral, BNP muito ↑, ortopneia"
      ],
      [
        "TEP",
        "Pleurítica, TVP, taquicardia, D-Dímero ↑, hipoxemia",
        "Consolidação Rx típica, sibilância"
      ],
      [
        "Pneumotórax",
        "Súbito, MV ausente unilateral, hiperressonância",
        "Bilateral, insidioso, febre"
      ]
    ],
    "escalas": [
      {
        "title": "Escala MRC de Dispneia",
        "headers": [
          "Grau",
          "Descrição"
        ],
        "rows": [
          [
            "0",
            "Dispneia só ao exercício extenuante"
          ],
          [
            "1",
            "Dispneia ao apressar o passo ou aclive leve"
          ],
          [
            "2",
            "Anda mais devagar que coetâneos no plano"
          ],
          [
            "3",
            "Para após ~100m ou alguns minutos no plano"
          ],
          [
            "4",
            "Não sai de casa — dispneia ao vestir-se"
          ]
        ],
        "note": "MRC ≥2: dispneia clinicamente significativa — investigar causa"
      },
      {
        "title": "Wells TEP",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "TVP suspeita",
            "3"
          ],
          [
            "Diagnóstico alternativo menos provável",
            "3"
          ],
          [
            "FC >100",
            "1.5"
          ],
          [
            "Imobilização/cirurgia <4sem",
            "1.5"
          ],
          [
            "TVP/TEP prévio",
            "1.5"
          ],
          [
            "Hemoptise",
            "1"
          ],
          [
            "Neoplasia",
            "1"
          ]
        ],
        "note": "<2: Baixa → D-Dímero | 2-6: Intermediária → TC | >6: Alta → anticoagulação"
      }
    ],
    "conduta": {
      "exames": [
        "Oximetria + gasometria arterial",
        "Rx tórax PA",
        "ECG",
        "BNP ou NT-proBNP",
        "D-Dímero (prob baixa/intermediária)",
        "Hemograma, função renal",
        "Peak flow"
      ],
      "drugs": [
        "O₂ → SpO₂ >94% (92-88% em DPOC)",
        "Salbutamol 2,5-5 mg nebulização",
        "Furosemida 40-80 mg EV (ICC)",
        "Metilprednisolona 125 mg EV (asma grave)"
      ],
      "steps": [
        "1. O₂, acesso EV, monitorização",
        "2. Posição sentada ou semi-sentada",
        "3. Sibilos? Crepitantes? MV ausente?",
        "4. BNP para ICC; Wells+D-Dímero para TEP",
        "5. Tratar causa + reavaliação frequente"
      ]
    }
  },
  "doenca-diverticular": {
    "mnemonics": [
      {
        "kw": "HINCHEY",
        "name": "Classificação da diverticulite complicada",
        "rows": [
          [
            "I",
            "Estágio I",
            "Abscesso pericólico/mesentérico localizado"
          ],
          [
            "II",
            "Estágio II",
            "Abscesso pélvico/à distância"
          ],
          [
            "III",
            "Estágio III",
            "Peritonite purulenta generalizada"
          ],
          [
            "IV",
            "Estágio IV",
            "Peritonite fecal (perfuração livre)"
          ]
        ]
      },
      {
        "kw": "LOCALIZAÇÃO",
        "name": "Características da diverticulite",
        "rows": [
          [
            "S",
            "Sigmoide",
            "Localização mais comum (dor em FIE)"
          ],
          [
            "F",
            "Febre",
            "Sinal inflamatório frequente"
          ],
          [
            "L",
            "Leucocitose",
            "Resposta inflamatória"
          ],
          [
            "A",
            "Alteração do hábito",
            "Constipação/diarreia, alteração do trânsito"
          ],
          [
            "C",
            "Complicações",
            "Abscesso, fístula, obstrução, perfuração"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Palpação da fossa ilíaca esquerda",
        "subtitle": "Diverticulite de sigmoide",
        "steps": [
          "Palpar a FIE",
          "Avaliar dor, massa e defesa"
        ],
        "normal": "Sem dor ou massa",
        "abnormal": "Dor + massa/plastrão em FIE → \"apendicite do lado esquerdo\" (diverticulite)"
      },
      {
        "title": "Pesquisa de irritação peritoneal",
        "subtitle": "Complicação",
        "steps": [
          "Avaliar descompressão dolorosa e defesa",
          "Pesquisar rigidez de parede"
        ],
        "normal": "Abdome depressível, sem peritonismo",
        "abnormal": "Peritonismo difuso → perfuração/peritonite (Hinchey III-IV)"
      },
      {
        "title": "Toque retal",
        "subtitle": "Massa/coleção pélvica",
        "steps": [
          "Realizar toque retal",
          "Avaliar dor, abaulamento e sangue"
        ],
        "normal": "Sem abaulamento doloroso",
        "abnormal": "Abaulamento doloroso → abscesso pélvico"
      }
    ],
    "sinais": [
      {
        "name": "Dor em FIE + febre",
        "eponym": "Diverticulite aguda",
        "how": "Dor persistente na fossa ilíaca esquerda com febre",
        "means": "Apresentação clássica da diverticulite de sigmoide"
      },
      {
        "name": "Plastrão/massa palpável",
        "eponym": "Diverticulite complicada",
        "how": "Massa inflamatória em FIE",
        "means": "Fleimão/abscesso pericólico"
      },
      {
        "name": "Pneumatúria/fecalúria",
        "eponym": "Fístula colovesical",
        "how": "Eliminação de gás/fezes pela urina",
        "means": "Fístula entre cólon e bexiga — complicação tardia"
      },
      {
        "name": "Peritonite generalizada",
        "eponym": "Perfuração (Hinchey III-IV)",
        "how": "Abdome em tábua, sepse",
        "means": "Perfuração livre — cirurgia de urgência"
      }
    ],
    "ddx": [
      [
        "Diverticulite aguda",
        "Dor em FIE, febre, leucocitose, TC com espessamento + densificação",
        "Dor em FID, sem alteração diverticular"
      ],
      [
        "Apendicite",
        "Dor migratória para FID, Blumberg +",
        "Dor em FIE no idoso com divertículos"
      ],
      [
        "Câncer colorretal",
        "Perda de peso, anemia, alteração do hábito, massa",
        "Quadro inflamatório agudo febril"
      ],
      [
        "Colite isquêmica",
        "Dor + sangramento, idoso vasculopata",
        "Febre e plastrão localizado"
      ],
      [
        "Cólica renal/ureteral esquerda",
        "Dor lombar irradiada para virilha, hematúria",
        "Febre, dor à palpação abdominal localizada"
      ],
      [
        "Doença inflamatória intestinal",
        "Diarreia crônica com sangue, sintomas sistêmicos",
        "Episódio agudo isolado em FIE"
      ],
      [
        "Patologia anexial (mulher)",
        "Dor pélvica, alteração menstrual, massa anexial",
        "Dor cólica com divertículos à TC"
      ]
    ],
    "escalas": [
      {
        "title": "Hinchey modificado",
        "headers": [
          "Estágio",
          "Achado",
          "Conduta usual"
        ],
        "rows": [
          [
            "0/Ia",
            "Diverticulite não complicada",
            "ATB ± manejo ambulatorial"
          ],
          [
            "Ib/II",
            "Abscesso",
            "ATB + drenagem percutânea se >4 cm"
          ],
          [
            "III",
            "Peritonite purulenta",
            "Cirurgia"
          ],
          [
            "IV",
            "Peritonite fecal",
            "Cirurgia de urgência (Hartmann)"
          ]
        ],
        "note": "A classificação orienta diretamente a conduta"
      },
      {
        "title": "Não complicada x Complicada",
        "headers": [
          "Característica",
          "Não complicada",
          "Complicada"
        ],
        "rows": [
          [
            "Abscesso/fístula/perfuração",
            "Ausente",
            "Presente"
          ],
          [
            "Peritonite",
            "Ausente",
            "Pode haver"
          ],
          [
            "Tratamento",
            "ATB (às vezes sem ATB em casos leves)",
            "Drenagem/cirurgia"
          ],
          [
            "Internação",
            "Seletiva",
            "Frequente"
          ]
        ],
        "note": "TC de abdome define a presença de complicações"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, PCR",
        "Função renal, eletrólitos",
        "Urina (diferencial urológico) e beta-hCG em mulheres",
        "TC de abdome e pelve com contraste (exame de escolha)",
        "Colonoscopia ELETIVA após 6 semanas (excluir neoplasia) — evitar na fase aguda"
      ],
      "drugs": [
        "Não complicada: dieta + analgesia; ATB seletivo (amoxicilina-clavulanato ou ciprofloxacino + metronidazol)",
        "Complicada: ATB EV de amplo espectro",
        "Drenagem percutânea de abscessos >4 cm",
        "Analgesia (evitar opioides que reduzem motilidade, quando possível)"
      ],
      "steps": [
        "1. Confirmar com TC e classificar (Hinchey)",
        "2. Não complicada → manejo conservador (ambulatorial em casos leves selecionados)",
        "3. Abscesso → ATB + drenagem percutânea",
        "4. Peritonite (III-IV) → cirurgia de urgência",
        "5. Colonoscopia eletiva após resolução para excluir neoplasia"
      ]
    }
  },
  "doencas-anorretais": {
    "mnemonics": [
      {
        "kw": "HEMORROIDA",
        "name": "Classificação das hemorroidas internas",
        "rows": [
          [
            "I",
            "Grau I",
            "Sangram, não prolapsam"
          ],
          [
            "II",
            "Grau II",
            "Prolapsam ao esforço, reduzem espontaneamente"
          ],
          [
            "III",
            "Grau III",
            "Prolapsam e exigem redução manual"
          ],
          [
            "IV",
            "Grau IV",
            "Prolapso permanente, irredutível"
          ]
        ]
      },
      {
        "kw": "DOR x SANGUE",
        "name": "Diferenciar as causas",
        "rows": [
          [
            "F",
            "Fissura",
            "Dor anal intensa \"em lâmina\" ao evacuar + sangue vivo no papel"
          ],
          [
            "H",
            "Hemorroida",
            "Sangramento indolor vivo; dor só se trombosada"
          ],
          [
            "A",
            "Abscesso",
            "Dor pulsátil contínua + febre + abaulamento perianal"
          ],
          [
            "F",
            "Fístula",
            "Drenagem purulenta crônica por orifício perianal"
          ],
          [
            "N",
            "Neoplasia",
            "Sangramento + massa + alteração do hábito — sempre excluir"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspeção perianal",
        "subtitle": "Avaliação inicial",
        "steps": [
          "Posição de Sims ou genupeitoral",
          "Inspecionar com afastamento das nádegas",
          "Pedir esforço evacuatório para evidenciar prolapso"
        ],
        "normal": "Pele perianal íntegra, sem lesões",
        "abnormal": "Plicoma, mariscos, prolapso, orifício fistuloso, fissura na linha média posterior"
      },
      {
        "title": "Toque retal",
        "subtitle": "Massas e tônus",
        "steps": [
          "Toque retal cuidadoso (evitar se fissura muito dolorosa)",
          "Avaliar tônus, massas, dor e sangue na luva"
        ],
        "normal": "Tônus normal, sem massas, sem sangue",
        "abnormal": "Massa endurecida → neoplasia; dor intensa → fissura/abscesso"
      },
      {
        "title": "Anuscopia",
        "subtitle": "Visualização do canal anal",
        "steps": [
          "Introduzir o anuscópio lubrificado",
          "Inspecionar mamilos hemorroidários e mucosa"
        ],
        "normal": "Mucosa normal",
        "abnormal": "Hemorroidas internas, fissura, lesões da mucosa"
      }
    ],
    "sinais": [
      {
        "name": "Sangramento indolor vivo",
        "eponym": "Hemorroidas",
        "how": "Sangue vivo recobrindo as fezes/no papel, indolor",
        "means": "Hemorroidas internas (sempre excluir neoplasia)"
      },
      {
        "name": "Dor anal \"em lâmina\"",
        "eponym": "Fissura anal",
        "how": "Dor intensa ao evacuar + sangramento vivo + espasmo esfincteriano",
        "means": "Fissura anal (linha média posterior)"
      },
      {
        "name": "Tríade do abscesso",
        "eponym": "Abscesso perianal",
        "how": "Dor contínua + abaulamento flutuante + febre",
        "means": "Abscesso anorretal — drenagem cirúrgica"
      },
      {
        "name": "Orifício com drenagem crônica",
        "eponym": "Fístula perianal",
        "how": "Saída de secreção purulenta por orifício cutâneo perianal",
        "means": "Fístula (frequentemente sequela de abscesso prévio)"
      }
    ],
    "ddx": [
      [
        "Hemorroidas",
        "Sangramento vivo indolor, prolapso, dor só se trombose",
        "Dor intensa ao evacuar (fissura)"
      ],
      [
        "Fissura anal",
        "Dor \"em lâmina\" ao evacuar, sangue vivo, espasmo esfincteriano",
        "Sangramento indolor; massa endurecida"
      ],
      [
        "Abscesso perianal",
        "Dor pulsátil contínua, febre, abaulamento flutuante",
        "Dor apenas à evacuação, sem febre"
      ],
      [
        "Fístula perianal",
        "Drenagem purulenta crônica por orifício perianal",
        "Quadro agudo único sem orifício"
      ],
      [
        "Câncer anorretal",
        "Massa endurecida, alteração do hábito, perda de peso, sangramento persistente",
        "Lesão benigna típica que regride com tratamento"
      ],
      [
        "Plicoma/marisco",
        "Pele redundante indolor, sem sangramento ativo",
        "Sangramento ou dor significativos"
      ],
      [
        "Prolapso retal",
        "Protrusão circunferencial de mucosa retal",
        "Prolapso apenas dos mamilos hemorroidários"
      ]
    ],
    "escalas": [
      {
        "title": "Conduta por grau (hemorroidas internas)",
        "headers": [
          "Grau",
          "Tratamento"
        ],
        "rows": [
          [
            "I-II",
            "Medidas higienodietéticas, fibras, banho de assento; ligadura elástica"
          ],
          [
            "III",
            "Ligadura elástica / hemorroidectomia conforme sintomas"
          ],
          [
            "IV",
            "Hemorroidectomia cirúrgica"
          ],
          [
            "Trombose",
            "Analgesia; trombectomia se <72h e muito dolorosa"
          ]
        ],
        "note": "A maioria responde a medidas conservadoras e aumento de fibras"
      },
      {
        "title": "Sinais de alarme anorretal",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Massa endurecida/irregular",
            "Suspeita de neoplasia"
          ],
          [
            "Alteração persistente do hábito intestinal",
            "Investigar cólon"
          ],
          [
            "Perda de peso/anemia",
            "Doença orgânica/neoplásica"
          ],
          [
            "Sangramento que não cessa com tratamento",
            "Colonoscopia obrigatória"
          ]
        ],
        "note": "Nunca atribuir sangramento a hemorroidas sem excluir neoplasia em pacientes de risco"
      }
    ],
    "conduta": {
      "exames": [
        "Diagnóstico essencialmente clínico (inspeção + toque + anuscopia)",
        "Colonoscopia se sinais de alarme, idade >45-50 anos ou sangramento persistente",
        "Hemograma se sangramento crônico (anemia)",
        "RM de pelve para mapeamento de fístulas complexas"
      ],
      "drugs": [
        "Dieta rica em fibras + hidratação + banhos de assento mornos",
        "Laxantes/formadores de bolo fecal",
        "Analgésicos tópicos/sistêmicos; pomadas (anestésico ± corticoide) por curto período",
        "Fissura: pomada de nitrato/bloqueador de canal de cálcio para relaxar o esfíncter"
      ],
      "steps": [
        "1. Caracterizar a queixa (dor x sangramento) e examinar (inspeção, toque, anuscopia)",
        "2. Medidas higienodietéticas como base do tratamento",
        "3. Hemorroidas: tratamento por grau (ligadura/cirurgia)",
        "4. Abscesso → drenagem cirúrgica; fístula → tratamento cirúrgico",
        "5. Excluir neoplasia com colonoscopia nos casos de risco/alarme"
      ]
    }
  },
  "dor-abdominal": {
    "mnemonics": [
      {
        "kw": "VINDICATE",
        "name": "Causas de dor abdominal",
        "rows": [
          [
            "V",
            "Vascular",
            "Isquemia mesentérica, aneurisma, TVP"
          ],
          [
            "I",
            "Inflamatório",
            "Apendicite, colecistite, pancreatite"
          ],
          [
            "N",
            "Neoplásico",
            "Ca cólon, gástrico, pancreático"
          ],
          [
            "D",
            "Dietético/DII",
            "Úlcera péptica, Crohn, RCUI"
          ],
          [
            "I²",
            "Iatrogênico",
            "AINEs, pós-op, procedimento"
          ],
          [
            "C",
            "Congênito",
            "Hérnia encarcerada, malrotação"
          ],
          [
            "A",
            "Autoimune",
            "Porfiria, vasculite, lúpus"
          ],
          [
            "T",
            "Trauma",
            "Hematoma hepático/esplênico"
          ],
          [
            "E",
            "Extra-abdominal",
            "CAD, IAM inferior, cólica renal"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Blumberg",
        "subtitle": "Peritonite/irritação peritoneal",
        "steps": [
          "Palpar o ponto de máxima dor",
          "Comprimir profundamente com 3 dedos",
          "Retirar a mão de modo súbito"
        ],
        "normal": "Sem dor à descompressão",
        "abnormal": "Dor aguda ao soltar (Blumberg +) → peritonite (apendicite, perfuração)"
      },
      {
        "title": "Sinal de Murphy",
        "subtitle": "Colecistite aguda",
        "steps": [
          "Posicionar 3 dedos sob o rebordo costal direito",
          "Pedir inspiração profunda",
          "Observar parada da inspiração por dor"
        ],
        "normal": "Inspiração completa sem dor",
        "abnormal": "Parada súbita da inspiração por dor (Murphy +) → colecistite aguda"
      },
      {
        "title": "Sinal de Rovsing",
        "subtitle": "Apendicite",
        "steps": [
          "Comprimir firmemente o QIE",
          "Manter 10 segundos"
        ],
        "normal": "Sem dor em FID",
        "abnormal": "Dor referida em FID (Rovsing +) → apendicite"
      },
      {
        "title": "Sinal do Psoas",
        "subtitle": "Apendicite retrocecal",
        "steps": [
          "DL esquerdo (posição de Sims)",
          "Hiperextender quadril direito passivamente"
        ],
        "normal": "Sem dor com hiperextensão",
        "abnormal": "Dor em FID (Psoas +) → apendicite retrocecal"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Murphy",
        "eponym": "Colecistite aguda",
        "how": "Dor e parada da inspiração com pressão sob o rebordo costal direito",
        "means": "Colecistite aguda — USG abdominal"
      },
      {
        "name": "Defesa involuntária",
        "eponym": "Peritonite",
        "how": "Contração reflexa da parede à palpação",
        "means": "Peritonite — cirurgia de urgência se difusa"
      },
      {
        "name": "Sinal de Courvoisier",
        "eponym": "Neoplasia pancreática",
        "how": "Vesícula palpável + icterícia obstrutiva indolor",
        "means": "Neoplasia cabeça pâncreas — USG + TC + CA19-9"
      },
      {
        "name": "Ponto de McBurney",
        "eponym": "Apendicite",
        "how": "Dor máxima no 1/3 ext. linha umbigo-EIAS direita",
        "means": "Apendicite típica — correlacionar com Alvarado"
      }
    ],
    "ddx": [
      [
        "Apendicite aguda",
        "Migração periumbilical→FID, anorexia, náuseas APÓS dor, febre baixa, Blumberg+",
        "Dor difusa, diarreia ANTES da dor, sem migração"
      ],
      [
        "Colecistite aguda",
        "Dor HCD pós-gordurosa, Murphy+, febre, leucocitose, cálculos USG",
        "Dor FID, sem relação alimentar, Murphy negativo"
      ],
      [
        "Pancreatite aguda",
        "Dor em faixa epigástrica→dorso, lipase/amilase ↑, vômitos",
        "Sem elevação lipase, sem irradiação dorsal"
      ],
      [
        "Cólica renal",
        "Cólica lombar→flanco→FID, hematúria, agitação intensa",
        "Dor contínua, defesa, febre, sem hematúria"
      ],
      [
        "DIP",
        "Mulher, bilateral, corrimento, mobilização uterina dolorosa",
        "Homem, migração típica, sem corrimento"
      ],
      [
        "Gravidez ectópica",
        "β-HCG+, amenorreia, USG sem SIU, dor aguda",
        "Homem, β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Alvarado — Apendicite",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Migração dor para FID",
            "1"
          ],
          [
            "Anorexia",
            "1"
          ],
          [
            "Náuseas/Vômitos",
            "1"
          ],
          [
            "Dor FID à palpação",
            "2"
          ],
          [
            "Blumberg+",
            "1"
          ],
          [
            "Temperatura >37,3°C",
            "1"
          ],
          [
            "Leucocitose >10.000",
            "2"
          ],
          [
            "Desvio à esquerda",
            "1"
          ]
        ],
        "note": "1-4: Baixa | 5-6: Possível | 7-8: Provável | 9-10: Alta → cirurgia"
      },
      {
        "title": "BISAP — Pancreatite (mortalidade)",
        "headers": [
          "Critério (1 ponto)",
          "Descrição"
        ],
        "rows": [
          [
            "BUN >25 mg/dL",
            "Ureia elevada"
          ],
          [
            "Comprometimento mental",
            "Glasgow <15"
          ],
          [
            "SIRS",
            "≥2 critérios"
          ],
          [
            "Idade",
            ">60 anos"
          ],
          [
            "Derrame pleural",
            "Ao Rx tórax"
          ]
        ],
        "note": "0-2: Mortalidade <2% | 3-5: Mortalidade até 22%"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma com diferencial",
        "Lipase e amilase",
        "TGO, TGP, FA, GGT, Bilirrubinas",
        "Ureia, Creatinina",
        "β-HCG (mulheres em idade fértil)",
        "Urina rotina",
        "USG abdominal (1ª linha)",
        "TC abdome+pelve c/ contraste (gold standard)"
      ],
      "drugs": [
        "NPO — suspeita cirúrgica",
        "Dipirona 1-2g EV ou Tramadol 100mg EV (analgesia — não retarda diagnóstico)",
        "Ondansetrona 4-8mg EV",
        "ATB pré-op apendicite: Cefazolina 2g EV 30 min antes"
      ],
      "steps": [
        "1. Sinais de peritonite? Defesa, Blumberg, ventre em tábua",
        "2. Laboratório + USG",
        "3. NPO + analgesia adequada",
        "4. Cirurgia urgência: peritonite difusa, pneumoperitônio",
        "5. Apendicite: apendicectomia laparoscópica <24h"
      ]
    }
  },
  "dor-toracica": {
    "mnemonics": [
      {
        "kw": "MONA",
        "name": "Conduta inicial no IAM/SCA",
        "rows": [
          [
            "M",
            "Morfina",
            "2-4 mg EV — dor refratária"
          ],
          [
            "O",
            "Oxigênio",
            "Só se SpO₂ <94%"
          ],
          [
            "N",
            "Nitratos",
            "NTG SL 0,5 mg — contraindicado se PAS <90 ou sildenafil"
          ],
          [
            "A",
            "AAS",
            "300 mg mastigado — dose de ataque"
          ]
        ]
      },
      {
        "kw": "6 EMERGÊNCIAS",
        "name": "Causas que matam por dor torácica",
        "rows": [
          [
            "1",
            "IAM/SCA",
            "Opressão, irradiação MSE, troponina ↑"
          ],
          [
            "2",
            "Dissecção aórtica",
            "Desgarrante, dorso, assimetria de pulsos"
          ],
          [
            "3",
            "TEP",
            "Pleurítica, dispneia, TVP, D-Dímero ↑"
          ],
          [
            "4",
            "Pneumotórax hipertensivo",
            "MV ausente, desvio de traqueia, hipotensão"
          ],
          [
            "5",
            "Tamponamento",
            "Beck: hipotensão + TJ + bulhas abafadas"
          ],
          [
            "6",
            "Ruptura esofágica",
            "Pós-vômito, enfisema subcutâneo, Boerhaave"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Levine",
        "subtitle": "Isquemia miocárdica",
        "steps": [
          "Observar como o paciente descreve a dor",
          "Paciente coloca punho fechado sobre o esterno espontaneamente"
        ],
        "normal": "Aponta com dedo a área localizada",
        "abnormal": "Punho fechado no esterno (Levine +) → alta especificidade para isquemia"
      },
      {
        "title": "Pulso paradoxal",
        "subtitle": "Tamponamento/pericardite constritiva",
        "steps": [
          "Esfigmomanômetro — inflar acima da sistólica",
          "Desinflar: anotar PA do 1º som (expiração)",
          "Anotar PA quando som aparece em TODAS as fases"
        ],
        "normal": "Diferença <10 mmHg entre fases",
        "abnormal": "Diferença >10 mmHg → tamponamento, pericardite constritiva, TEP maciço"
      },
      {
        "title": "Atrito pericárdico",
        "subtitle": "Pericardite aguda",
        "steps": [
          "Diafragma do estetoscópio",
          "Paciente sentado + inclinado para frente",
          "Expiração forçada — LLEB inferior"
        ],
        "normal": "Sem ruídos extras além de B1 e B2",
        "abnormal": "Ruído de couro friccionado → pericardite aguda"
      },
      {
        "title": "Palpação da parede torácica",
        "subtitle": "Costocondrite",
        "steps": [
          "Palpar articulações costocondrais 1ª-7ª",
          "Pressão digital firme em cada junção"
        ],
        "normal": "Sem dor à palpação da parede",
        "abnormal": "Reprodução da dor → costocondrite (exclui causa cardíaca)"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Levine",
        "eponym": "IAM",
        "how": "Punho fechado sobre o esterno para descrever a dor",
        "means": "Alta especificidade para isquemia miocárdica"
      },
      {
        "name": "Tríade de Beck",
        "eponym": "Tamponamento",
        "how": "Hipotensão + Turgência jugular + Bulhas abafadas",
        "means": "Tamponamento cardíaco — pericardiocentese de emergência"
      },
      {
        "name": "Assimetria de pulsos",
        "eponym": "Dissecção aórtica",
        "how": "Comparar PA nos dois braços + pulso radial bilateral",
        "means": "Diferença >20 mmHg → dissecção aórtica tipo A — cirurgia emergência"
      },
      {
        "name": "Atrito pericárdico",
        "eponym": "Pericardite aguda",
        "how": "Couro friccionado — melhor sentado + expiração forçada + LLEB",
        "means": "Pericardite aguda — AAS + Colchicina; eco para descartar derrame"
      }
    ],
    "ddx": [
      [
        "IAM (IAMEST/NSTEMI)",
        "Opressão >20min, irradiação MSE, sudorese, troponina ↑, ST ↑",
        "Pontada localizada, palpação reproduz dor"
      ],
      [
        "Angina instável",
        "Opressão <20min, alivia NTG, troponina normal",
        "Dor >20min, troponina em curva de elevação"
      ],
      [
        "Dissecção aórtica",
        "Desgarrante SÚBITO, dorso, HTA, assimetria de pulsos",
        "Gradual, ST ↑ típico, troponina ↑"
      ],
      [
        "TEP",
        "Pleurítica, dispneia, TVP, SpO₂↓, D-Dímero ↑",
        "Dor isquêmica típica, ST ↑, sem TVP"
      ],
      [
        "Pericardite",
        "Melhora sentado, piora deitado, atrito, ST difuso côncavo",
        "Irradiação MSE, troponina muito elevada"
      ],
      [
        "DRGE",
        "Queimação pós-prandial, alivia IBP/antiácido",
        "Relação com esforço, sudorese, troponina ↑"
      ],
      [
        "Costocondrite",
        "Reproduzida pela palpação, piora com movimentos",
        "Em repouso, irradiação, sudorese"
      ],
      [
        "Pneumotórax",
        "Súbito, pleurítico, MV ↓ unilateral",
        "Bilateral, troponina ↑"
      ]
    ],
    "escalas": [
      {
        "title": "HEART Score — Risco MACE em SCA",
        "headers": [
          "Componente",
          "0",
          "1",
          "2"
        ],
        "rows": [
          [
            "H História",
            "Inespecífica",
            "Mod suspeita",
            "Altamente suspeita"
          ],
          [
            "E ECG",
            "Normal",
            "BRE/repol anormal",
            "ST ↑"
          ],
          [
            "A Idade",
            "<45",
            "45-64",
            "≥65"
          ],
          [
            "R Fatores risco",
            "0",
            "1-2",
            "≥3 ou DAC"
          ],
          [
            "T Troponina",
            "≤LSN",
            ">1-3x LSN",
            ">3x LSN"
          ]
        ],
        "note": "0-3: Baixo risco | 4-6: Intermediário | 7-10: Alto risco (65% MACE)"
      },
      {
        "title": "Wells TEP",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "TVP clinicamente suspeita",
            "3"
          ],
          [
            "Alternativo menos provável que TEP",
            "3"
          ],
          [
            "FC >100",
            "1.5"
          ],
          [
            "Imobilização/cirurgia <4 sem",
            "1.5"
          ],
          [
            "TVP/TEP prévio",
            "1.5"
          ],
          [
            "Hemoptise",
            "1"
          ],
          [
            "Neoplasia ativa",
            "1"
          ]
        ],
        "note": "<2: Baixa | 2-6: Intermediária | >6: Alta probabilidade"
      }
    ],
    "conduta": {
      "exames": [
        "ECG 12 derivações em <10 min",
        "Troponina I/T ultrassensível (basal + 1-3h)",
        "Hemograma, coagulação",
        "Rx tórax PA",
        "D-Dímero (se TEP — prob baixa/intermediária)",
        "Ecocardiograma bedside se instável"
      ],
      "drugs": [
        "AAS 300 mg mastigado (SCA sem contraindicação)",
        "NTG SL 0,5 mg q5min x3 (PAS>90, sem sildenafil)",
        "Morfina 2-4 mg EV (dor refratária)",
        "Heparina HBPM (SCA confirmado)",
        "O₂ só se SpO₂ <94%"
      ],
      "steps": [
        "1. ECG em <10 min — IAMEST? → ativar hemodinâmica",
        "2. Acesso EV + monitorização contínua",
        "3. Troponina basal + hemograma + coagulação",
        "4. MONA se SCA",
        "5. IAMEST: angioplastia <90 min ou trombólise <12h",
        "6. Rx tórax para diagnóstico diferencial"
      ]
    }
  },
  "edema": {
    "mnemonics": [
      {
        "kw": "CHF-RAIN",
        "name": "Causas de edema",
        "rows": [
          [
            "C",
            "Cardíaco (ICC)",
            "Vespertino MMII, ortopneia, BNP ↑"
          ],
          [
            "H",
            "Hepático (cirrose)",
            "Ascite + edema, albumina ↓"
          ],
          [
            "F",
            "Flebite/TVP",
            "Unilateral, dor, empastamento"
          ],
          [
            "R",
            "Renal (nefrótico)",
            "Periorbital matutino, proteinúria ↑↑"
          ],
          [
            "A",
            "Alérgico/angioedema",
            "Súbito, face, urticária"
          ],
          [
            "I",
            "Ins. venosa crônica",
            "Varizes, lipodermatoesclerose"
          ],
          [
            "N",
            "Nutricional/Medicamento",
            "Albumina ↓, anlodipino, corticóides"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Cacifo (Godet)",
        "subtitle": "Edema com cacifo = transudato",
        "steps": [
          "Comprimir sobre a tíbia com polegar 15 segundos",
          "Retirar e observar depressão residual"
        ],
        "normal": "Sem depressão (sem cacifo) → linfedema, mixedema",
        "abnormal": "Depressão persistente (cacifo +) → ICC, cirrose, nefrótico, hipoalbuminemia"
      },
      {
        "title": "Sinal de Homans",
        "subtitle": "TVP (baixa acurácia)",
        "steps": [
          "Decúbito dorsal, joelho levemente fletido",
          "Dorsiflexão passiva forçada do pé"
        ],
        "normal": "Sem dor na panturrilha",
        "abnormal": "Dor na panturrilha → Homans+ (baixa sensibilidade/especificidade → preferir Eco-Doppler)"
      }
    ],
    "sinais": [
      {
        "name": "Edema vespertino bilateral",
        "eponym": "ICC/Ins. venosa",
        "how": "Cacifo em MMII, piora ao longo do dia, melhora com elevação",
        "means": "BNP para diferenciar ICC de insuficiência venosa"
      },
      {
        "name": "Edema periorbital matutino",
        "eponym": "Síndrome nefrótica",
        "how": "Pálpebras superiores inchadas ao acordar + proteinúria",
        "means": "Síndrome nefrótica — proteinúria 24h, albumina, biópsia renal"
      },
      {
        "name": "Mixedema",
        "eponym": "Hipotireoidismo grave",
        "how": "Sem cacifo, pele seca/fria, puffy face, bradicardia",
        "means": "Hipotireoidismo — TSH + T4L; levotiroxina"
      }
    ],
    "ddx": [
      [
        "ICC",
        "Bilateral vespertino, cacifo, ortopneia, crepitantes, BNP ↑",
        "Unilateral, matutino, proteinúria, sem cardiopatia"
      ],
      [
        "TVP",
        "Unilateral, calor, empastamento, D-Dímero ↑",
        "Bilateral, sem dor/calor"
      ],
      [
        "Sd. Nefrótica",
        "Periorbital matutino, proteinúria >3,5g/24h, albumina ↓",
        "Vespertino, sem proteinúria significativa"
      ],
      [
        "Ins. venosa crônica",
        "Varizes, lipodermatoesclerose, úlcera maleolar",
        "Agudo, assimétrico, sem varizes"
      ],
      [
        "Cirrose",
        "Ascite + edema, icterícia, albumina ↓",
        "Sem hepatopatia, albumina normal"
      ]
    ],
    "escalas": [
      {
        "title": "Wells DVT",
        "headers": [
          "Critério",
          "Pontos"
        ],
        "rows": [
          [
            "Neoplasia ativa",
            "1"
          ],
          [
            "Paralisia/gesso recente",
            "1"
          ],
          [
            "Acamado >3 dias ou cirurgia <12 sem",
            "1"
          ],
          [
            "Dor linha veias profundas",
            "1"
          ],
          [
            "Edema toda a perna",
            "1"
          ],
          [
            "Panturrilha assimétrica >3cm",
            "1"
          ],
          [
            "Cacifo confinado à perna sintomática",
            "1"
          ],
          [
            "Circulação colateral",
            "1"
          ],
          [
            "Diagnóstico alternativo mais provável",
            "-2"
          ]
        ],
        "note": "<2: Baixa → D-Dímero | ≥2: Mod/Alta → Eco-Doppler"
      }
    ],
    "conduta": {
      "exames": [
        "BNP/NT-proBNP",
        "Albumina sérica",
        "Urina rotina + proteinúria 24h",
        "Ureia, Creatinina",
        "TFH",
        "TSH",
        "Eco-Doppler MMII (TVP)",
        "Ecocardiograma (ICC)"
      ],
      "drugs": [
        "Furosemida 40-80mg/dia VO (ICC, nefrótico, cirrose)",
        "Meia elástica 20-30 mmHg (ins. venosa, TVP)",
        "Enoxaparina 1mg/kg SC 12/12h (TVP confirmada)"
      ],
      "steps": [
        "1. Uni ou bilateral? Cacifo? Matutino ou vespertino?",
        "2. Unilateral + dor → Wells DVT → Eco-Doppler",
        "3. Bilateral + BNP ↑ → ICC → Eco cardíaco",
        "4. Periorbital + proteinúria → nefrótico",
        "5. Albumina ↓ → hipoalbuminemia → causa",
        "6. Tratar causa de base"
      ]
    }
  },
  "expectoracao": {
    "mnemonics": [
      {
        "kw": "ESCARRO",
        "name": "Tipos de escarro e significado clínico",
        "rows": [
          [
            "Seroso",
            "Espumoso, rosado → edema agudo de pulmão"
          ],
          [
            "Mucoide",
            "Claro/branco → bronquite crônica, asma estável"
          ],
          [
            "Mucopurulento",
            "Amarelado → infecção inicial (viral→bacteriana)"
          ],
          [
            "Purulento",
            "Esverdeado/fétido → infecção bacteriana"
          ],
          [
            "Herrumbroso",
            "Achocolatado → pneumonia pneumocócica"
          ],
          [
            "Numular",
            "Moedas esférico → TB, bronquiectasia"
          ]
        ]
      }
    ],
    "ddx": [
      [
        "Bronquite aguda",
        "Escarro mucopurulento, febre baixa, IRS prévia, tosse < 3 sem",
        "Fétido, vômica, perda de peso"
      ],
      [
        "Pneumonia bacteriana",
        "Febre alta, crepitantes focais, escarro purulento/herrumbroso",
        "Crônico, sem febre, vômica"
      ],
      [
        "DPOC agudizado",
        "Tabagista, escarro mucopurulento, piora dispneia",
        "Febre alta, hemoptise franca, jovem"
      ],
      [
        "Bronquiectasia",
        "Escarro abundante/fétido matutino, crônico, dedos em baqueta",
        "Agudo, sem dedos em baqueta"
      ],
      [
        "Abscesso pulmonar",
        "Vômica, escarro fétido, febre alta, cavidade Rx",
        "Crônico, ausência de vômica"
      ],
      [
        "TB pulmonar",
        "Crônico, numulares, sudorese noturna, perda de peso",
        "Agudo febril, sem contato TB"
      ]
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
  "febre": {
    "mnemonics": [
      {
        "kw": "IIDET",
        "name": "Semiologia da febre",
        "rows": [
          [
            "I",
            "Início",
            "Insidioso/lento (febre tifoide) ou brusco com calafrios (pneumonia, sepse)"
          ],
          [
            "I",
            "Intensidade",
            "Febrícula (37,3–38°C), moderada (38–39°C) ou alta/hiperpirexia (>39°C)"
          ],
          [
            "D",
            "Duração",
            "Curta duração ou febre prolongada (FOI — >3 semanas sem diagnóstico)"
          ],
          [
            "E",
            "Evolução",
            "Contínua, remitente, intermitente (normaliza entre picos) ou recorrente (alterna febre e apirexia)"
          ],
          [
            "T",
            "Término",
            "Em crise — queda rápida em poucas horas — ou em lise — descenso lento e gradual"
          ]
        ]
      },
      {
        "kw": "CRISOH",
        "name": "Padrões da curva febril",
        "rows": [
          [
            "C",
            "Contínua",
            "Nunca normaliza; variação <1°C — febre tifoide, pneumonia bacteriana"
          ],
          [
            "R",
            "Remitente",
            "Varia >1°C mas não normaliza — endocardite, abscesso"
          ],
          [
            "I",
            "Intermitente",
            "Normaliza entre picos — malária, abscessos"
          ],
          [
            "S",
            "Séptica/Héctica",
            "Picos altos + calafrios + sudorese profusa — sepse"
          ],
          [
            "O",
            "Ondulante",
            "Períodos febris com afebris — Hodgkin, brucelose"
          ],
          [
            "H",
            "Humps (bifásica)",
            "Dois períodos febris separados — dengue, febre amarela"
          ]
        ]
      },
      {
        "kw": "SIRS",
        "name": "Resposta Inflamatória Sistêmica",
        "rows": [
          [
            "T",
            "Temperatura",
            ">38°C ou <36°C"
          ],
          [
            "C",
            "FC",
            ">90 bpm"
          ],
          [
            "R",
            "FR",
            ">20 irpm"
          ],
          [
            "L",
            "Leucócitos",
            ">12.000 ou <4.000/mm³ ou >10% bastões"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Kernig",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal",
          "Fletir quadril e joelho 90°",
          "Tentar estender o joelho passivamente"
        ],
        "normal": "Extensão livre sem dor",
        "abnormal": "Resistência/dor na extensão (Kernig +) → meningite"
      },
      {
        "title": "Sinal de Brudzinski",
        "subtitle": "Irritação meníngea",
        "steps": [
          "Decúbito dorsal sem travesseiro",
          "Mão atrás da nuca",
          "Fletir pescoço passivamente ao tórax"
        ],
        "normal": "Sem flexão involuntária dos MMII",
        "abnormal": "Flexão reflexa dos joelhos/quadris (Brudzinski +) → meningite"
      },
      {
        "title": "Pesquisa de foco infeccioso",
        "subtitle": "Exame sistemático",
        "steps": [
          "Inspeção: pele, mucosas, orofaringe",
          "Ausculta pulmonar bilateral",
          "Abdome: dor, organomegalias",
          "Genitália, articulações"
        ],
        "normal": "Sem foco identificável → suspeitar FOI",
        "abnormal": "Foco identificado → guia diagnóstico e tratamento"
      },
      {
        "title": "Pesquisa de linfonodos",
        "subtitle": "Linfadenopatia",
        "steps": [
          "Palpar cadeias cervical, axilar, inguinal",
          "Avaliar tamanho, consistência, mobilidade"
        ],
        "normal": "Linfonodos <1 cm, móveis, indolores",
        "abnormal": "Pétrea → neoplasia | Mole+dolorosa → infecção"
      }
    ],
    "sinais": [
      {
        "name": "Tríade de Charcot",
        "eponym": "Colangite aguda",
        "how": "Febre + dor HCD + icterícia",
        "means": "Colangite bacteriana — urgência cirúrgica"
      },
      {
        "name": "Péntade de Reynolds",
        "eponym": "Colangite grave",
        "how": "Tríade de Charcot + choque + confusão mental",
        "means": "Colangite supurativa — drenagem de urgência"
      },
      {
        "name": "Rash petequial/purpúrico",
        "eponym": "Meningococcemia",
        "how": "Petéquias que não branqueiam à pressão",
        "means": "Meningococcemia — Penicilina/Ceftriaxona IMEDIATA"
      },
      {
        "name": "Splenomegalia febril",
        "eponym": "Febre prolongada",
        "how": "Percussão + palpação do baço aumentado",
        "means": "Malária, febre tifoide, endocardite, linfoma"
      }
    ],
    "ddx": [
      [
        "Infecção viral",
        "Mialgias, autolimitada, leucopenia",
        "Leucocitose +desvio, foco bacteriano"
      ],
      [
        "Infecção bacteriana",
        "Calafrios, foco identificável, leucocitose",
        "Curso viral, sem foco"
      ],
      [
        "Sepse",
        "qSOFA ≥2, hipotensão, lactato ↑",
        "Febre isolada sem disfunção orgânica"
      ],
      [
        "Tuberculose",
        "Febre vespertina, sudorese noturna, perda peso",
        "Curso agudo, RX normal"
      ],
      [
        "Malária",
        "Febre cíclica, esplenomegalia, viagem Amazônia",
        "Sem exposição, febre contínua"
      ],
      [
        "Endocardite",
        "Sopro novo, bacteremia, êmbolos, UDVP",
        "Sem valvopatia, sem fatores de risco"
      ],
      [
        "Neoplasia",
        "Febre >3sem, emagrecimento, adenomegalia pétrea",
        "Causa infecciosa identificada"
      ],
      [
        "Colagenose",
        "Febre+artrite+rash+ANA+, mulher jovem",
        "Infecção documentada"
      ]
    ],
    "escalas": [
      {
        "title": "qSOFA — Triagem de Sepse",
        "headers": [
          "Critério",
          "Corte",
          "Pontos"
        ],
        "rows": [
          [
            "FR",
            "≥22 irpm",
            "1"
          ],
          [
            "Estado mental",
            "Glasgow <15",
            "1"
          ],
          [
            "PAS",
            "≤100 mmHg",
            "1"
          ]
        ],
        "note": "qSOFA ≥2 → Suspeitar sepse → avaliar SOFA completo"
      },
      {
        "title": "SIRS",
        "headers": [
          "Critério",
          "Valor anormal"
        ],
        "rows": [
          [
            "Temperatura",
            ">38°C ou <36°C"
          ],
          [
            "FC",
            ">90 bpm"
          ],
          [
            "FR",
            ">20 irpm"
          ],
          [
            "Leucócitos",
            ">12.000 ou <4.000 ou >10% bastões"
          ]
        ],
        "note": "SIRS ≥2 + infecção = Sepse (critérios antigos; Sepsis-3 usa SOFA)"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma com diferencial",
        "PCR e VHS",
        "Hemoculturas 2x ANTES do ATB",
        "Urina rotina + urocultura",
        "Rx tórax",
        "TGO, TGP, FA, bilirrubinas",
        "Ureia e Creatinina",
        "Lactato venoso (se sepse)"
      ],
      "drugs": [
        "Paracetamol 500-1000 mg VO/EV q6h (max 4g/dia)",
        "Dipirona 500-1000 mg VO/EV q6h",
        "ATB empírico SOMENTE se sepse ou foco bacteriano claro",
        "Hidratação adequada"
      ],
      "steps": [
        "1. Avaliar estabilidade hemodinâmica",
        "2. Coletar hemoculturas ANTES do ATB",
        "3. Identificar foco infeccioso",
        "4. Sepse (qSOFA≥2): ATB em <1h + fluido 30mL/kg",
        "5. Antitérmico conforme conforto",
        "6. Reavaliação em 48-72h com culturas"
      ]
    }
  },
  "hemoptise": {
    "mnemonics": [
      {
        "kw": "Classificação por volume",
        "name": "Hemoptise — gravidade",
        "rows": [
          [
            "Mínima/laivos",
            "Estrias — baixo risco imediato"
          ],
          [
            "Leve",
            "< 250 mL/24h — investigar causa, sem risco asfixia"
          ],
          [
            "Moderada",
            "250–500 mL/24h — internação, vigilância intensiva"
          ],
          [
            "Grave",
            "500–600 mL/24h — UTI, broncoscopia urgente"
          ],
          [
            "Fulminante",
            "> 600 mL/24h — morte por asfixia — emergência"
          ]
        ]
      },
      {
        "kw": "Causas por frequência",
        "name": "Etiologia da hemoptise",
        "rows": [
          [
            "Bronquite/DPOC",
            "Causa mais comum (escarro hemoptoico leve)"
          ],
          [
            "Carcinoma broncogênico",
            "2ª causa — adulto tabagista > 40 anos"
          ],
          [
            "Bronquiectasia",
            "Volume alto, matutino, crônico"
          ],
          [
            "TB ativa ou cicatriz",
            "Contato TB, sintomas B, nódulo/cavidade"
          ],
          [
            "TEP",
            "Pleurítica + DVT + taquicardia + D-Dímero ↑"
          ],
          [
            "Estenose mitral",
            "Dispneia de esforço, sopro mitral, ortopneia"
          ]
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
      [
        "Bronquite crônica/DPOC",
        "Tabagista, escarro hemoptoico leve, crônico, sem perda de peso",
        "Volume alto, massa Rx, perda de peso"
      ],
      [
        "Carcinoma broncogênico",
        "Tabagista > 40 anos, perda de peso, massa Rx, linfonodomegalia",
        "Jovem, sem tabagismo, febre alta"
      ],
      [
        "TB pulmonar",
        "Contato TB, sudorese noturna, perda de peso, cavidade Rx",
        "Sem contato, agudo febril sem sintomas B"
      ],
      [
        "Bronquiectasia",
        "Escarro abundante fétido matutino, dedos em baqueta, histórico desde infância",
        "Agudo, sem escarro abundante"
      ],
      [
        "TEP",
        "Pleurítica, TVP, taquicardia, D-Dímero ↑, hipoxemia",
        "Febre alta, cavidade Rx, perda de peso"
      ],
      [
        "Estenose mitral",
        "Sopro mitral, ortopneia, FA, dispneia de esforço",
        "Sem cardiopatia, sem sopro"
      ]
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
  "hemorragia-digestiva-alta": {
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
  "hemorragia-digestiva-baixa": {
    "mnemonics": [
      {
        "kw": "DRACO",
        "name": "Causas de HDB",
        "rows": [
          [
            "D",
            "Diverticular",
            "Causa mais comum de HDB volumosa no adulto"
          ],
          [
            "R",
            "Rectal/anorretal",
            "Hemorroidas, fissura — sangue vivo recobrindo as fezes"
          ],
          [
            "A",
            "Angiodisplasia",
            "Idoso, sangramento indolor recorrente"
          ],
          [
            "C",
            "Colite",
            "Isquêmica, infecciosa, inflamatória (DII)"
          ],
          [
            "O",
            "Oncológica",
            "Neoplasia colorretal"
          ]
        ]
      },
      {
        "kw": "ALTA x BAIXA",
        "name": "Diferenciar a origem",
        "rows": [
          [
            "M",
            "Melena",
            "Sugere fonte alta (sangue digerido)"
          ],
          [
            "H",
            "Hematoquezia",
            "Sangue vivo/vinhoso — geralmente fonte baixa"
          ],
          [
            "U",
            "Ureia",
            "Relação ureia/creatinina elevada sugere fonte alta"
          ],
          [
            "I",
            "Instabilidade",
            "HDB volumosa instável pode ser HDA maciça — excluir com EDA"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspeção anal e toque retal",
        "subtitle": "Fonte anorretal",
        "steps": [
          "Inspecionar a região perianal",
          "Realizar toque retal e anuscopia se disponível"
        ],
        "normal": "Sem lesões, ampola com fezes normais",
        "abnormal": "Hemorroidas/fissura/massa/sangue → orienta a origem"
      },
      {
        "title": "Caracterização do sangramento",
        "subtitle": "Cor e relação com as fezes",
        "steps": [
          "Perguntar cor (vivo, vinhoso, escuro)",
          "Relação com as fezes (recobrindo, misturado, no papel)"
        ],
        "normal": "—",
        "abnormal": "Sangue vivo no papel → anorretal baixo; misturado/vinhoso → cólon proximal"
      },
      {
        "title": "Avaliação hemodinâmica",
        "subtitle": "Estimar a perda",
        "steps": [
          "PA, FC, sinais de hipoperfusão",
          "Teste ortostático"
        ],
        "normal": "Estável, sem alteração postural",
        "abnormal": "Instabilidade → ressuscitar e excluir HDA maciça"
      }
    ],
    "sinais": [
      {
        "name": "Hematoquezia",
        "eponym": "HDB",
        "how": "Eliminação de sangue vivo/vinhoso pelo reto",
        "means": "Sangramento geralmente abaixo do ângulo de Treitz"
      },
      {
        "name": "Sangramento diverticular",
        "eponym": "HDB volumosa",
        "how": "Hematoquezia indolor, súbita, autolimitada na maioria",
        "means": "Causa mais comum de HDB significativa"
      },
      {
        "name": "Angiodisplasia",
        "eponym": "HDB do idoso",
        "how": "Sangramento indolor recorrente, associado a estenose aórtica (S. de Heyde)",
        "means": "Lesões vasculares do cólon direito"
      },
      {
        "name": "Sangue recobrindo as fezes",
        "eponym": "Doença anorretal",
        "how": "Sangue vivo no papel/sobre as fezes",
        "means": "Hemorroidas ou fissura anal"
      }
    ],
    "ddx": [
      [
        "Doença diverticular",
        "Hematoquezia volumosa indolor, idoso",
        "Dor anal, sangue só no papel"
      ],
      [
        "Doença anorretal (hemorroidas/fissura)",
        "Sangue vivo no papel, dor anal (fissura)",
        "Sangramento volumoso misturado às fezes"
      ],
      [
        "Angiodisplasia",
        "Sangramento indolor recorrente, idoso, anemia",
        "Episódio único com dor abdominal"
      ],
      [
        "Colite isquêmica",
        "Dor abdominal + sangramento, idoso vasculopata",
        "Sangramento indolor isolado"
      ],
      [
        "Doença inflamatória intestinal",
        "Diarreia com sangue/muco, dor, jovem, sintomas crônicos",
        "Sangramento agudo isolado sem diarreia"
      ],
      [
        "Neoplasia colorretal",
        "Alteração do hábito, anemia, perda de peso, sangue oculto",
        "Sangramento agudo volumoso sem sintomas consumptivos"
      ],
      [
        "HDA maciça simulando HDB",
        "Instável, ureia ↑, aspirado/EDA com sangue",
        "Fonte baixa identificada, hemodinâmica estável"
      ]
    ],
    "escalas": [
      {
        "title": "Estratificação de risco",
        "headers": [
          "Achado de alto risco",
          "Implicação"
        ],
        "rows": [
          [
            "Instabilidade hemodinâmica",
            "Ressuscitação + investigação urgente"
          ],
          [
            "Sangramento contínuo/volumoso",
            "Colonoscopia urgente / angio-TC"
          ],
          [
            "Idade avançada + comorbidades",
            "Maior morbimortalidade"
          ],
          [
            "Uso de anticoagulante/antiagregante",
            "Maior gravidade e ressangramento"
          ]
        ],
        "note": "A maioria das HDB é autolimitada, mas o alto risco exige investigação rápida"
      },
      {
        "title": "Sequência diagnóstica",
        "headers": [
          "Cenário",
          "Exame"
        ],
        "rows": [
          [
            "Estável",
            "Colonoscopia eletiva (preparo)"
          ],
          [
            "Sangramento ativo volumoso",
            "Angio-TC / arteriografia"
          ],
          [
            "Suspeita de fonte alta",
            "EDA"
          ],
          [
            "Negativo + recorrente",
            "Cápsula endoscópica / cintilografia"
          ]
        ],
        "note": "A colonoscopia é o exame de escolha na maioria dos casos estáveis"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma seriado, tipagem e prova cruzada",
        "Coagulograma, ureia/creatinina, eletrólitos",
        "EDA se suspeita de fonte alta",
        "Colonoscopia (diagnóstica e terapêutica)",
        "Angio-TC/arteriografia se sangramento ativo volumoso"
      ],
      "drugs": [
        "Ressuscitação volêmica + hemoderivados conforme necessidade",
        "Correção de coagulopatia; suspender/reverter anticoagulantes quando possível",
        "Tratamento dirigido à causa (endoscópico, embolização ou cirúrgico)"
      ],
      "steps": [
        "1. Avaliar estabilidade e ressuscitar se necessário",
        "2. Excluir HDA maciça (toque retal, SNG/EDA se dúvida)",
        "3. Estável → colonoscopia após preparo",
        "4. Sangramento ativo volumoso → angio-TC/arteriografia com embolização",
        "5. Refratário/recorrente → cirurgia; tratar a causa de base"
      ]
    }
  },
  "hernia-abdominal": {
    "mnemonics": [
      {
        "kw": "RICE",
        "name": "Estados clínicos da hérnia",
        "rows": [
          [
            "R",
            "Redutível",
            "Conteúdo retorna à cavidade espontaneamente ou com manobra"
          ],
          [
            "I",
            "Irredutível/Encarcerada",
            "Não reduz, sem isquemia — risco de obstrução"
          ],
          [
            "C",
            "Comprometimento",
            "Estrangulada — sofrimento vascular, dor intensa, sinais inflamatórios"
          ],
          [
            "E",
            "Emergência",
            "Estrangulamento = urgência cirúrgica"
          ]
        ]
      },
      {
        "kw": "LOCAIS",
        "name": "Tipos por localização",
        "rows": [
          [
            "I",
            "Inguinal indireta",
            "Mais comum; trajeto pelo canal inguinal, lateral aos vasos epigástricos"
          ],
          [
            "D",
            "Inguinal direta",
            "Triângulo de Hesselbach, medial aos vasos epigástricos"
          ],
          [
            "F",
            "Femoral",
            "Abaixo do ligamento inguinal; maior risco de encarceramento (mulheres)"
          ],
          [
            "U",
            "Umbilical",
            "Anel umbilical"
          ],
          [
            "I",
            "Incisional",
            "Cicatriz cirúrgica prévia"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Manobra de redução",
        "subtitle": "Avaliar redutibilidade",
        "steps": [
          "Paciente em decúbito dorsal, relaxado",
          "Pressão suave e sustentada sobre o conteúdo herniário"
        ],
        "normal": "Conteúdo reduz facilmente (hérnia redutível)",
        "abnormal": "Não reduz → encarcerada; dor intensa/sinais inflamatórios → estrangulada (NÃO insistir)"
      },
      {
        "title": "Teste de Valsalva em pé",
        "subtitle": "Detectar a hérnia",
        "steps": [
          "Examinar o paciente em pé",
          "Pedir para tossir / fazer força abdominal",
          "Palpar o abaulamento e o anel"
        ],
        "normal": "Sem abaulamento à manobra",
        "abnormal": "Abaulamento que protrui à tosse/esforço → hérnia"
      },
      {
        "title": "Diferenciar inguinal x femoral",
        "subtitle": "Relação com o ligamento inguinal",
        "steps": [
          "Localizar o tubérculo púbico e o ligamento inguinal",
          "Determinar se a protrusão é acima/medial (inguinal) ou abaixo/lateral (femoral)"
        ],
        "normal": "—",
        "abnormal": "Abaixo e lateral ao tubérculo púbico → femoral (alto risco de encarceramento)"
      }
    ],
    "sinais": [
      {
        "name": "Hérnia redutível",
        "eponym": "Hérnia não complicada",
        "how": "Abaulamento que aumenta ao esforço e reduz ao decúbito",
        "means": "Tratamento eletivo"
      },
      {
        "name": "Encarceramento",
        "eponym": "Hérnia complicada",
        "how": "Abaulamento irredutível, doloroso, sem sinais inflamatórios",
        "means": "Risco de obstrução — cirurgia precoce"
      },
      {
        "name": "Estrangulamento",
        "eponym": "Emergência",
        "how": "Dor intensa, pele eritematosa, vômitos, sinais de obstrução/isquemia",
        "means": "Sofrimento vascular — cirurgia de urgência"
      },
      {
        "name": "Sinal de Howship-Romberg",
        "eponym": "Hérnia obturatória",
        "how": "Dor na face medial da coxa por compressão do nervo obturador",
        "means": "Hérnia obturatória (idosa, magra) — alto índice de encarceramento"
      }
    ],
    "ddx": [
      [
        "Hérnia inguinal",
        "Abaulamento na virilha que protrui ao esforço, redutível",
        "Massa fixa, não redutível, sem relação com esforço"
      ],
      [
        "Hérnia femoral",
        "Abaulamento abaixo do ligamento inguinal, mulher, encarcera fácil",
        "Protrusão acima do ligamento (inguinal)"
      ],
      [
        "Adenomegalia inguinal",
        "Linfonodo firme, não reduz, não muda com Valsalva",
        "Reduz ao decúbito, protrui à tosse"
      ],
      [
        "Lipoma/tumor de parede",
        "Massa subcutânea fixa, sem anel herniário",
        "Anel palpável, conteúdo redutível"
      ],
      [
        "Hidrocele/varicocele",
        "Transiluminação positiva (hidrocele), \"saco de vermes\" (varicocele)",
        "Conteúdo intestinal redutível"
      ],
      [
        "Abscesso/coleção",
        "Sinais flogísticos, flutuação, febre",
        "Redutível, sem flogose (se não complicada)"
      ]
    ],
    "escalas": [
      {
        "title": "Quando operar de urgência",
        "headers": [
          "Situação",
          "Conduta"
        ],
        "rows": [
          [
            "Redutível assintomática",
            "Eletiva (avaliar risco x benefício)"
          ],
          [
            "Encarcerada recente sem isquemia",
            "Tentar redução suave; cirurgia precoce"
          ],
          [
            "Estrangulada",
            "Cirurgia de URGÊNCIA"
          ],
          [
            "Femoral (qualquer)",
            "Correção recomendada pelo alto risco de encarceramento"
          ]
        ],
        "note": "Hérnias femorais e sintomáticas têm indicação cirúrgica mais firme"
      },
      {
        "title": "Sinais de estrangulamento",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Dor intensa e contínua na hérnia",
            "Isquemia do conteúdo"
          ],
          [
            "Pele eritematosa/edemaciada sobre o saco",
            "Inflamação/necrose"
          ],
          [
            "Vômitos + distensão",
            "Obstrução associada"
          ],
          [
            "Febre/taquicardia/leucocitose",
            "Resposta sistêmica/sepse"
          ]
        ],
        "note": "NÃO tentar reduzir uma hérnia estrangulada — risco de reduzir alça inviável"
      }
    ],
    "conduta": {
      "exames": [
        "Diagnóstico é clínico na maioria dos casos",
        "USG de parede/região inguinal em dúvida diagnóstica",
        "TC de abdome se suspeita de complicação/obstrução",
        "Hemograma, eletrólitos e lactato se suspeita de estrangulamento"
      ],
      "drugs": [
        "Analgesia",
        "Hidratação e SNG se obstrução associada",
        "ATB se estrangulamento/ressecção intestinal",
        "Não há tratamento medicamentoso curativo — a correção é cirúrgica"
      ],
      "steps": [
        "1. Caracterizar localização e estado (redutível/encarcerada/estrangulada)",
        "2. Hérnia não complicada → correção eletiva (tela)",
        "3. Encarcerada recente sem isquemia → redução suave + cirurgia precoce",
        "4. Estrangulada → cirurgia de urgência (NÃO reduzir)",
        "5. Avaliar viabilidade da alça no intraoperatório"
      ]
    }
  },
  "ictericia": {
    "mnemonics": [
      {
        "kw": "PRÉ / HEPÁTICA / PÓS",
        "name": "Classificação topográfica da icterícia",
        "rows": [
          [
            "Pré-hepática (hemolítica)",
            "Aumento de bilirrubina indireta por hemólise ou eritropoiese ineficaz",
            "Anemia, esplenomegalia, urina escura mas fezes normais, sem prurido, hemólise (reticulocitose, LDH↑, haptoglobina↓)"
          ],
          [
            "Hepática (hepatocelular)",
            "Lesão dos hepatócitos prejudicando captação/conjugação/excreção da bilirrubina",
            "Transaminases muito elevadas, mal-estar, anorexia, hepatomegalia dolorosa, antecedente de hepatite/etilismo/hepatotóxicos"
          ],
          [
            "Pós-hepática (colestática/obstrutiva)",
            "Obstrução do fluxo biliar (cálculo, neoplasia, estenose)",
            "Colúria + acolia fecal + prurido intenso, dor em HCD, FA e GGT muito elevadas, possível sinal de Courvoisier"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Murphy",
        "subtitle": "Avaliação de colecistite aguda",
        "steps": [
          "Posicione os dedos sob o rebordo costal direito, na linha hemiclavicular",
          "Peça ao paciente para inspirar profundamente",
          "Observe se há interrupção súbita da inspiração por dor (Murphy positivo)"
        ],
        "normal": "Paciente completa a inspiração sem dor",
        "abnormal": "Interrupção da inspiração por dor à palpação do ponto cístico (Murphy+) → sugere colecistite aguda"
      },
      {
        "title": "Palpação hepática e esplênica",
        "subtitle": "Avaliação de hepatomegalia/esplenomegalia",
        "steps": [
          "Palpe o rebordo hepático a partir da fossa ilíaca direita, subindo durante a expiração",
          "Avalie consistência, superfície, borda e dor à palpação do fígado",
          "Palpe o hipocôndrio esquerdo em busca de baço palpável (esplenomegalia)"
        ],
        "normal": "Fígado não palpável ou borda lisa, indolor, até 1-2cm do rebordo costal; baço não palpável",
        "abnormal": "Hepatomegalia de borda romba/irregular (sugere hepatopatia crônica/neoplasia) ou esplenomegalia (sugere causa hemolítica/hipertensão portal)"
      },
      {
        "title": "Pesquisa do sinal de Courvoisier",
        "subtitle": "Vesícula biliar palpável e indolor associada a icterícia",
        "steps": [
          "Palpe o hipocôndrio direito em busca de massa arredondada compatível com vesícula biliar distendida",
          "Avalie se há dor associada à palpação"
        ],
        "normal": "Vesícula não palpável",
        "abnormal": "Vesícula biliar palpável e indolor em paciente ictérico (Courvoisier+) → sugere obstrução biliar maligna (ex.: neoplasia de cabeça de pâncreas), pois cálculos geralmente causam vesícula fibrótica não distensível"
      },
      {
        "title": "Pesquisa de ascite — piparote e macicez móvel",
        "subtitle": "Avaliação de líquido livre na cavidade abdominal",
        "steps": [
          "Piparote: percuta um flanco enquanto um assistente comprime a linha média e palpe a transmissão da onda no flanco oposto",
          "Macicez móvel: percuta do centro (timpânico) para os flancos (maciço) e repita após mudança de decúbito, observando deslocamento da macicez"
        ],
        "normal": "Sem transmissão de onda líquida; sem deslocamento da macicez com a mudança de posição",
        "abnormal": "Onda líquida transmitida (piparote+) ou macicez que se desloca com a posição (macicez móvel+) → sugere ascite, comum em hepatopatia crônica avançada"
      }
    ],
    "sinais": [
      {
        "name": "Icterícia escleral",
        "eponym": "Sinal precoce de hiperbilirrubinemia",
        "how": "Coloração amarelada da esclera, geralmente perceptível com bilirrubina total >2-3mg/dL",
        "means": "Indica hiperbilirrubinemia — frequentemente o primeiro sinal clínico visível de icterícia, antes da pele"
      },
      {
        "name": "Aranhas vasculares (spiders/telangiectasias)",
        "eponym": "Estigma de hepatopatia crônica",
        "how": "Lesões vasculares puntiformes com ramificações radiais, que empalidecem à compressão central, geralmente em tórax e face",
        "means": "Sugerem hepatopatia crônica e hiperestrogenismo (metabolismo hepático alterado dos estrógenos)"
      },
      {
        "name": "Hepatomegalia",
        "eponym": "Achado de exame físico hepatobiliar",
        "how": "Fígado palpável além do rebordo costal direito, com avaliação de borda, superfície e consistência",
        "means": "Pode indicar congestão (insuficiência cardíaca), infiltração (esteatose, neoplasia) ou processo inflamatório/infeccioso hepático"
      },
      {
        "name": "Sinal de Courvoisier",
        "eponym": "Ludwig Georg Courvoisier",
        "how": "Vesícula biliar palpável e indolor em paciente ictérico",
        "means": "Sugere obstrução biliar de origem neoplásica (ex.: câncer de cabeça de pâncreas ou via biliar) — \"vesícula de Courvoisier raramente é causada por cálculo\""
      }
    ],
    "ddx": [
      [
        "Icterícia hemolítica (pré-hepática)",
        "Predomínio de bilirrubina indireta, anemia, esplenomegalia, urina escura mas fezes de cor normal, ausência de prurido, reticulocitose e LDH elevado",
        "Predomínio de bilirrubina direta, transaminases ou enzimas canaliculares muito elevadas, acolia fecal"
      ],
      [
        "Icterícia hepatocelular (hepatite/cirrose)",
        "Transaminases (TGO/TGP) marcadamente elevadas, mal-estar, anorexia, hepatomegalia dolorosa, antecedente de etilismo/hepatotóxicos/hepatite viral, sinais de hepatopatia crônica (aranhas vasculares, ascite)",
        "Predomínio de FA/GGT com transaminases pouco alteradas, prurido intenso e acolia, sugerindo causa colestática"
      ],
      [
        "Icterícia colestática/obstrutiva (coledocolitíase, neoplasia de via biliar/pâncreas)",
        "Colúria + acolia fecal + prurido importante, dor em HCD ou epigástrio, fosfatase alcalina e GGT muito elevadas, possível sinal de Courvoisier (obstrução neoplásica) ou febre/calafrios (colangite)",
        "Padrão predominantemente de elevação de transaminases sem colestase laboratorial, ausência de dilatação de vias biliares à imagem"
      ]
    ],
    "escalas": [
      {
        "title": "Padrão bioquímico orientador conforme o tipo de icterícia",
        "headers": [
          "Tipo",
          "Padrão laboratorial predominante"
        ],
        "rows": [
          [
            "Pré-hepática (hemolítica)",
            "Bilirrubina indireta ↑↑, transaminases normais, FA/GGT normais, reticulócitos e LDH elevados, haptoglobina baixa"
          ],
          [
            "Hepatocelular",
            "Transaminases (TGO/TGP) muito elevadas, bilirrubina direta e indireta elevadas, FA/GGT discretamente elevadas"
          ],
          [
            "Colestática/obstrutiva",
            "Fosfatase alcalina e GGT muito elevadas, bilirrubina direta predominante, transaminases discretamente alteradas, USG com possível dilatação de vias biliares"
          ]
        ],
        "note": "A combinação de história clínica, exame físico e o padrão bioquímico (transaminases x enzimas canaliculares x frações de bilirrubina) orienta a investigação de imagem direcionada"
      }
    ],
    "conduta": {
      "exames": [
        "Bilirrubinas totais e frações (direta/indireta) — define o predomínio e orienta a investigação",
        "Transaminases (TGO/TGP), fosfatase alcalina (FA) e gama-GT — diferenciam padrão hepatocelular de colestático",
        "Hemograma completo, reticulócitos, LDH e haptoglobina — se suspeita de causa hemolítica",
        "Sorologias virais (hepatites A, B, C) conforme fatores de risco e quadro clínico",
        "Ultrassonografia abdominal — exame inicial de escolha para avaliar vias biliares, vesícula, fígado e pâncreas, e identificar dilatação de via biliar (sugestiva de obstrução)",
        "Tomografia/colangiorressonância e endoscopia (CPRE) conforme achados — para casos com suspeita de obstrução biliar não esclarecida pela USG"
      ],
      "drugs": [
        "Tratamento dirigido à causa de base — não há tratamento sintomático específico para a icterícia em si",
        "Suspender imediatamente medicamentos/substâncias potencialmente hepatotóxicas identificadas na anamnese",
        "Colestiramina ou anti-histamínicos podem ser considerados para alívio sintomático do prurido colestático, conforme avaliação especializada",
        "Colangite aguda (febre + icterícia + dor em HCD — tríade de Charcot) → antibioticoterapia de amplo espectro e avaliação para drenagem biliar de urgência"
      ],
      "steps": [
        "1. Caracterizar o padrão temporal, presença de colúria/acolia/prurido e sinais de alarme (febre, dor importante, perda de peso, massa palpável)",
        "2. Exame físico dirigido — pesquisar hepatomegalia, esplenomegalia, sinal de Murphy, sinal de Courvoisier e ascite",
        "3. Solicitar bilirrubinas com frações, transaminases, FA/GGT e hemograma para classificar o padrão (pré-hepático, hepatocelular ou colestático)",
        "4. Ultrassonografia abdominal para avaliar dilatação de vias biliares, lesões hepáticas/pancreáticas e vesícula",
        "5. Sinais de colangite (febre + icterícia + dor) ou obstrução biliar identificada → encaminhamento urgente para avaliação cirúrgica/endoscópica (CPRE)",
        "6. Suspeita de hepatite aguda/crônica ou hepatopatia avançada → encaminhamento à hepatologia/gastroenterologia para investigação etiológica completa"
      ]
    }
  },
  "lombalgia": {
    "mnemonics": [
      {
        "kw": "TUNAFISH",
        "name": "Sinais de alarme (red flags) na lombalgia",
        "rows": [
          [
            "T",
            "Trauma significativo",
            "Queda de altura, acidente automobilístico — risco de fratura"
          ],
          [
            "U",
            "Urinário/intestinal (disfunção esfincteriana)",
            "Retenção urinária, incontinência fecal — suspeita de síndrome da cauda equina"
          ],
          [
            "N",
            "Neurológico (déficit progressivo)",
            "Fraqueza muscular progressiva, alteração sensitiva em sela, perda de reflexos"
          ],
          [
            "A",
            "Anestesia em sela",
            "Hipoestesia perineal/perianal — emergência neurocirúrgica (cauda equina)"
          ],
          [
            "F",
            "Febre/infecção",
            "Febre, uso de drogas IV, imunossupressão — suspeita de espondilodiscite/abscesso"
          ],
          [
            "I",
            "Idade (extremos)",
            "<18 ou >50 anos com lombalgia nova — maior risco de causa estrutural/neoplásica"
          ],
          [
            "S",
            "Sem melhora ao repouso (dor noturna)",
            "Dor que piora à noite ou não alivia em repouso — sugere causa neoplásica/inflamatória"
          ],
          [
            "H",
            "História de câncer/perda de peso",
            "Antecedente oncológico, emagrecimento inexplicado — suspeita de metástase óssea"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Manobra de Lasègue (elevação da perna estendida)",
        "subtitle": "Avaliação de radiculopatia lombar (L4-S1)",
        "steps": [
          "Paciente em decúbito dorsal, relaxado",
          "Eleve a perna estendida lentamente, mantendo o joelho em extensão",
          "Observe o ângulo em que surge dor irradiada para o membro inferior"
        ],
        "normal": "Elevação até 70-90° sem dor irradiada (apenas desconforto posterior na coxa)",
        "abnormal": "Dor radicular reproduzida entre 30-70° de elevação (Lasègue+) → sugere hérnia discal/radiculopatia (geralmente L5-S1)"
      },
      {
        "title": "Teste de Patrick/FABERE",
        "subtitle": "Avaliação de articulação sacroilíaca e quadril",
        "steps": [
          "Paciente em decúbito dorsal",
          "Posicione o tornozelo sobre o joelho contralateral (posição de \"4\")",
          "Aplique pressão suave sobre o joelho fletido em direção à maca"
        ],
        "normal": "Sem dor — boa amplitude de movimento",
        "abnormal": "Dor na região sacroilíaca ou no quadril (Patrick+) → sugere disfunção sacroilíaca ou patologia de quadril"
      },
      {
        "title": "Palpação de pontos dolorosos paravertebrais",
        "subtitle": "Avaliação de dor mecânica/miofascial",
        "steps": [
          "Palpar a musculatura paravertebral lombar e processos espinhosos",
          "Avaliar contratura muscular, pontos-gatilho e dor à palpação"
        ],
        "normal": "Musculatura sem espasmo, sem dor à palpação",
        "abnormal": "Espasmo muscular, dor localizada à palpação → sugere lombalgia mecânica/miofascial"
      },
      {
        "title": "Avaliação neurológica de membros inferiores",
        "subtitle": "Pesquisa de déficit radicular",
        "steps": [
          "Testar força muscular segmentar (dorsiflexão do hálux/pé - L5, flexão plantar - S1)",
          "Avaliar sensibilidade em dermátomos correspondentes",
          "Pesquisar reflexos patelar (L4) e aquileu (S1)"
        ],
        "normal": "Força, sensibilidade e reflexos preservados e simétricos",
        "abnormal": "Déficit motor, hipoestesia ou reflexo abolido → sugere radiculopatia compressiva — investigar com imagem"
      }
    ],
    "sinais": [
      {
        "name": "Síndrome da cauda equina",
        "eponym": "Emergência neurocirúrgica",
        "how": "Retenção urinária, incontinência fecal, anestesia em sela, fraqueza bilateral de membros inferiores",
        "means": "Compressão das raízes da cauda equina — requer descompressão cirúrgica de urgência para evitar sequelas permanentes"
      },
      {
        "name": "Dor noturna que não melhora com repouso",
        "eponym": "Sinal de alarme para causa neoplásica/inflamatória",
        "how": "Dor que desperta o paciente à noite e não alivia com repouso ou mudança de posição",
        "means": "Sugere processo neoplásico (metástase óssea), infeccioso (espondilodiscite) ou inflamatório (espondiloartrite) — investigar com imagem"
      },
      {
        "name": "Sinal de Lasègue contralateral (cruzado)",
        "eponym": "Hérnia discal extrusa",
        "how": "Dor irradiada para o membro testado ao elevar o membro contralateral",
        "means": "Alta especificidade para hérnia discal volumosa comprimindo a raiz nervosa"
      }
    ],
    "ddx": [
      [
        "Lombalgia mecânica/inespecífica",
        "Dor relacionada a esforço/postura, melhora com repouso, sem irradiação ou déficit neurológico, exame neurológico normal",
        "Dor noturna persistente, déficit neurológico, sinais sistêmicos"
      ],
      [
        "Radiculopatia (hérnia discal)",
        "Dor irradiada para membro inferior em trajeto radicular, Lasègue+, déficit motor/sensitivo correspondente ao dermátomo",
        "Dor estritamente lombar sem irradiação, Lasègue negativo"
      ],
      [
        "Causa sistêmica/inflamatória (espondiloartrite, espondilodiscite)",
        "Dor inflamatória (piora em repouso/noite, melhora com movimento), rigidez matinal prolongada, febre, idade jovem, marcadores inflamatórios elevados",
        "Dor de padrão mecânico, sem rigidez matinal ou sinais sistêmicos"
      ],
      [
        "Causa neoplásica (metástase óssea, mieloma)",
        "Dor progressiva, noturna, refratária a analgesia, perda de peso, história oncológica, idade avançada",
        "Dor de início recente relacionada a esforço, sem sintomas sistêmicos"
      ],
      [
        "Dor visceral referida (aneurisma aórtico, doença renal, pancreatite)",
        "Dor lombar associada a sintomas viscerais (massa pulsátil, hematúria, sintomas digestivos), sem relação postural",
        "Dor reproduzida à palpação/mobilização da coluna, sem sintomas viscerais associados"
      ]
    ],
    "escalas": [
      {
        "title": "Sinais de alarme (red flags) — triagem inicial",
        "headers": [
          "Categoria",
          "Achados de alerta"
        ],
        "rows": [
          [
            "Síndrome da cauda equina",
            "Retenção urinária, incontinência fecal, anestesia em sela, fraqueza bilateral"
          ],
          [
            "Infecção",
            "Febre, uso de drogas IV, imunossupressão, cirurgia recente na coluna"
          ],
          [
            "Neoplasia",
            "História de câncer, perda de peso inexplicada, dor noturna progressiva, idade >50 anos"
          ],
          [
            "Fratura",
            "Trauma significativo, uso crônico de corticoide, osteoporose, idade avançada"
          ]
        ],
        "note": "Presença de qualquer red flag indica necessidade de investigação com imagem e/ou encaminhamento urgente — não tratar apenas como lombalgia mecânica"
      }
    ],
    "conduta": {
      "exames": [
        "Geralmente dispensável nas primeiras 4-6 semanas se ausência de red flags (lombalgia aguda inespecífica)",
        "Radiografia de coluna lombar (suspeita de fratura/espondilolistese)",
        "RM de coluna lombar — exame de escolha se red flags, déficit neurológico progressivo ou dor persistente >6 semanas",
        "Hemograma, VHS/PCR (suspeita de infecção/neoplasia/causa inflamatória)",
        "PSA e eletroforese de proteínas conforme suspeita oncológica específica"
      ],
      "drugs": [
        "Analgésicos simples: Paracetamol ou Dipirona",
        "AINEs (ex.: Ibuprofeno, Naproxeno) se sem contraindicação",
        "Relaxantes musculares por curto período em casos de espasmo importante (ex.: Ciclobenzaprina)",
        "Considerar encaminhamento para fisioterapia precoce",
        "Cauda equina/déficit neurológico progressivo → encaminhamento neurocirúrgico de urgência"
      ],
      "steps": [
        "1. Triagem ativa de red flags (TUNAFISH) na anamnese e exame físico",
        "2. Ausência de red flags → tratamento sintomático, manter-se ativo, reavaliação em 4-6 semanas sem necessidade de imagem precoce",
        "3. Presença de red flags → solicitar exames de imagem direcionados (RM preferencialmente)",
        "4. Sinais de síndrome da cauda equina → encaminhamento neurocirúrgico de emergência imediata",
        "5. Radiculopatia sem sinais de alarme → tratamento conservador inicial (analgesia, fisioterapia, atividade gradual)",
        "6. Refratariedade ao tratamento conservador (6-12 semanas) → reavaliação especializada e consideração de tratamento intervencionista/cirúrgico"
      ]
    }
  },
  "nauseas-vomitos": {
    "mnemonics": [
      {
        "kw": "VOMITAR",
        "name": "Causas de náuseas e vômitos",
        "rows": [
          [
            "V",
            "Vestibular/SNC",
            "Vertigem, labirintite, hipertensão intracraniana, enxaqueca"
          ],
          [
            "O",
            "Obstrução/causas GI",
            "Obstrução intestinal, gastroparesia, úlcera péptica, colecistite"
          ],
          [
            "M",
            "Medicamentos/toxinas",
            "Quimioterápicos, opioides, anti-inflamatórios, álcool, intoxicações"
          ],
          [
            "I",
            "Infecção",
            "Gastroenterite viral/bacteriana, ITU, meningite"
          ],
          [
            "T",
            "Transtornos metabólicos",
            "Cetoacidose diabética, uremia, hipercalcemia, insuficiência adrenal"
          ],
          [
            "A",
            "Abdome agudo",
            "Apendicite, pancreatite, obstrução, isquemia mesentérica"
          ],
          [
            "R",
            "Reprodutivo (gravidez)",
            "Hiperêmese gravídica, primeiro trimestre de gestação"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação de sinais de desidratação",
        "subtitle": "Gravidade do quadro de vômitos",
        "steps": [
          "Avaliar turgor cutâneo (prega cutânea)",
          "Inspecionar mucosas orais (umidade)",
          "Avaliar tempo de enchimento capilar e nível de consciência",
          "Aferir PA e FC (hipotensão/taquicardia postural)"
        ],
        "normal": "Mucosas úmidas, turgor normal, sinais vitais estáveis",
        "abnormal": "Mucosas secas, turgor diminuído, taquicardia, hipotensão → desidratação significativa"
      },
      {
        "title": "Exame abdominal sistemático",
        "subtitle": "Identificar causa abdominal",
        "steps": [
          "Inspeção, ausculta de ruídos hidroaéreos, percussão e palpação",
          "Pesquisar distensão, massas, dor localizada e sinais de irritação peritoneal"
        ],
        "normal": "Abdome flácido, ruídos hidroaéreos normais, sem dor à palpação",
        "abnormal": "Distensão, ruídos hidroaéreos aumentados (\"de luta\") ou ausentes, dor localizada → investigar obstrução/abdome agudo"
      },
      {
        "title": "Sinal de Murphy",
        "subtitle": "Suspeita de colecistite",
        "steps": [
          "Palpar o hipocôndrio direito (ponto cístico)",
          "Pedir ao paciente para inspirar profundamente durante a palpação"
        ],
        "normal": "Inspiração completa sem dor",
        "abnormal": "Interrupção súbita da inspiração por dor (Murphy+) → sugere colecistite aguda"
      }
    ],
    "sinais": [
      {
        "name": "Vômitos biliosos",
        "eponym": "Obstrução intestinal baixa/pós-pilórica",
        "how": "Vômito de coloração esverdeada/amarelada (bile)",
        "means": "Sugere obstrução abaixo da ampola de Vater — investigação urgente"
      },
      {
        "name": "Vômitos fecaloides",
        "eponym": "Obstrução intestinal avançada",
        "how": "Vômito com odor e aspecto fecal",
        "means": "Sinal de obstrução intestinal baixa avançada ou fístula — emergência cirúrgica"
      },
      {
        "name": "Hematêmese",
        "eponym": "Sangramento digestivo alto",
        "how": "Vômito com sangue vivo ou em \"borra de café\"",
        "means": "Sugere úlcera péptica, varizes esofágicas ou laceração de Mallory-Weiss — risco de instabilidade hemodinâmica"
      },
      {
        "name": "Sinais de hipertensão intracraniana",
        "eponym": "Causa central de vômitos",
        "how": "Cefaleia matinal, vômitos em jato sem náusea prévia, papiledema, alteração do nível de consciência",
        "means": "Sugere lesão intracraniana — investigação neurológica de urgência"
      }
    ],
    "ddx": [
      [
        "Gastroenterite aguda",
        "Início agudo, diarreia associada, contactantes com sintomas similares, febre baixa",
        "Vômitos persistentes sem diarreia, sinais de abdome agudo"
      ],
      [
        "Obstrução intestinal",
        "Distensão abdominal, parada de eliminação de gases/fezes, vômitos biliosos/fecaloides, RHA aumentados/ausentes",
        "Trânsito intestinal preservado, abdome plano e indolor"
      ],
      [
        "Causa central (HIC, enxaqueca, vestibular)",
        "Cefaleia, vertigem, alteração neurológica, vômitos em jato sem náusea prévia",
        "Dor abdominal proeminente, sinais de irritação peritoneal"
      ],
      [
        "Causa metabólica (cetoacidose, uremia)",
        "Histórico de diabetes/doença renal, hálito cetônico, alteração do estado mental, exames laboratoriais alterados",
        "Glicemia e função renal normais"
      ],
      [
        "Gravidez/hiperêmese gravídica",
        "Mulher em idade fértil, atraso menstrual, β-HCG positivo, sintomas no 1º trimestre",
        "β-HCG negativo"
      ]
    ],
    "escalas": [
      {
        "title": "Critérios de gravidade da desidratação (OMS, adaptado)",
        "headers": [
          "Sinal",
          "Leve",
          "Moderada",
          "Grave"
        ],
        "rows": [
          [
            "Estado geral",
            "Alerta",
            "Irritado/sonolento",
            "Letárgico/inconsciente"
          ],
          [
            "Mucosas",
            "Úmidas",
            "Secas",
            "Muito secas"
          ],
          [
            "Turgor cutâneo",
            "Normal",
            "Diminuído",
            "Muito diminuído (prega persiste)"
          ],
          [
            "Pulso/PA",
            "Normais",
            "Levemente alterados",
            "Taquicardia/hipotensão"
          ]
        ],
        "note": "Desidratação grave exige reposição volêmica EV imediata e reavaliação contínua"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, eletrólitos, função renal",
        "Glicemia e gasometria (se suspeita metabólica)",
        "β-HCG em mulheres em idade fértil",
        "Amilase/lipase (suspeita de pancreatite)",
        "Exames de imagem abdominal (USG/TC) conforme suspeita de causa estrutural",
        "TC de crânio se sinais de alarme neurológico"
      ],
      "drugs": [
        "Hidratação oral ou EV conforme grau de desidratação (Ringer lactato/SF 0,9%)",
        "Ondansetrona 4-8mg EV/VO ou Metoclopramida 10mg EV/VO",
        "Correção de distúrbios eletrolíticos e metabólicos identificados",
        "Evitar antieméticos que mascarem quadro de abdome agudo até definição diagnóstica"
      ],
      "steps": [
        "1. Avaliar gravidade da desidratação e sinais de alarme (sangue, vômito bilioso/fecaloide, sinais neurológicos)",
        "2. Hidratação adequada conforme gravidade (oral leve/moderada, EV se grave ou intolerância)",
        "3. Antieméticos sintomáticos quando seguro",
        "4. Investigar causa de base conforme contexto clínico (GI, metabólica, central, gestacional)",
        "5. Tratar causa específica identificada",
        "6. Reavaliar resposta ao tratamento e necessidade de internação"
      ]
    }
  },
  "oclusao-intestinal": {
    "mnemonics": [
      {
        "kw": "4 SINAIS",
        "name": "Obstrução intestinal",
        "rows": [
          [
            "D",
            "Dor",
            "Cólica abdominal (alta) ou contínua (estrangulamento)"
          ],
          [
            "V",
            "Vômitos",
            "Precoces na alta; tardios e fecaloides na baixa"
          ],
          [
            "D",
            "Distensão",
            "Mais marcada na obstrução baixa"
          ],
          [
            "P",
            "Parada",
            "Parada de eliminação de fezes e gases (obstipação)"
          ]
        ]
      },
      {
        "kw": "ABC",
        "name": "Causas mais comuns no adulto",
        "rows": [
          [
            "A",
            "Aderências",
            "Bridas pós-operatórias (causa mais comum de delgado)"
          ],
          [
            "B",
            "Bulge/hérnia",
            "Hérnia encarcerada (2ª causa)"
          ],
          [
            "C",
            "Cancer",
            "Neoplasia (causa mais comum no cólon)"
          ],
          [
            "V",
            "Vólvulo",
            "Sigmoide/ceco — torção"
          ],
          [
            "I",
            "Intussuscepção",
            "Mais comum em crianças"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Ausculta abdominal",
        "subtitle": "Padrão dos ruídos hidroaéreos",
        "steps": [
          "Auscultar os 4 quadrantes por até 2 minutos",
          "Caracterizar timbre e frequência"
        ],
        "normal": "Ruídos normais (5-30/min)",
        "abnormal": "Ruídos metálicos/aumentados (fase inicial) → silêncio (fase tardia/isquemia)"
      },
      {
        "title": "Toque retal",
        "subtitle": "Ampola e fecaloma",
        "steps": [
          "Inspeção perianal e toque retal",
          "Avaliar conteúdo da ampola e massas"
        ],
        "normal": "Ampola com fezes, sem massa",
        "abnormal": "Ampola vazia (obstrução) ou massa/sangue → neoplasia, fecaloma"
      },
      {
        "title": "Pesquisa de sinais de estrangulamento",
        "subtitle": "Sofrimento de alça",
        "steps": [
          "Avaliar dor contínua intensa, febre, taquicardia",
          "Pesquisar defesa/irritação peritoneal"
        ],
        "normal": "Dor em cólica intermitente, sem peritonite",
        "abnormal": "Dor contínua + febre + peritonismo + acidose → estrangulamento (emergência cirúrgica)"
      }
    ],
    "sinais": [
      {
        "name": "Distensão + timpanismo",
        "eponym": "Obstrução",
        "how": "Abdome distendido, timpânico à percussão",
        "means": "Acúmulo de gás/líquido a montante da obstrução"
      },
      {
        "name": "Vômito fecaloide",
        "eponym": "Obstrução baixa/tardia",
        "how": "Vômito de aspecto e odor fecal",
        "means": "Obstrução distal de longa evolução"
      },
      {
        "name": "Sinais de estrangulamento",
        "eponym": "Isquemia de alça",
        "how": "Dor contínua + febre + taquicardia + peritonismo",
        "means": "Sofrimento vascular da alça — cirurgia de urgência"
      },
      {
        "name": "Sinal do \"grão de café\"",
        "eponym": "Vólvulo de sigmoide",
        "how": "Imagem radiológica de alça distendida em U invertido",
        "means": "Vólvulo de sigmoide — descompressão endoscópica/cirurgia"
      }
    ],
    "ddx": [
      [
        "Obstrução de delgado (aderências)",
        "Vômitos precoces, cólica, cirurgia prévia, distensão central",
        "Sem cirurgia prévia; distensão periférica"
      ],
      [
        "Obstrução de cólon (neoplasia)",
        "Distensão marcada, vômito tardio, alteração do hábito, idoso",
        "Início agudo sem alteração de hábito"
      ],
      [
        "Hérnia encarcerada",
        "Abaulamento doloroso irredutível na parede/região inguinal",
        "Sem hérnia palpável"
      ],
      [
        "Íleo paralítico",
        "Distensão sem dor em cólica, ruídos ausentes, pós-op/distúrbio eletrolítico",
        "Cólica e luta peristáltica presentes"
      ],
      [
        "Vólvulo",
        "Distensão súbita, \"grão de café\" no RX, idoso/acamado",
        "Distribuição difusa de alças"
      ],
      [
        "Pseudo-obstrução (Ogilvie)",
        "Dilatação colônica sem obstrução mecânica",
        "Ponto de transição mecânico identificável"
      ],
      [
        "Isquemia mesentérica",
        "Dor desproporcional, acidose, fibrilação atrial",
        "Padrão obstrutivo clássico sem acidose precoce"
      ]
    ],
    "escalas": [
      {
        "title": "Alta x Baixa",
        "headers": [
          "Característica",
          "Obstrução alta (delgado)",
          "Obstrução baixa (cólon)"
        ],
        "rows": [
          [
            "Vômitos",
            "Precoces, biliosos",
            "Tardios, fecaloides"
          ],
          [
            "Distensão",
            "Discreta/central",
            "Acentuada/periférica"
          ],
          [
            "Cólica",
            "Frequente, curta",
            "Menos intensa"
          ],
          [
            "Desidratação",
            "Rápida",
            "Mais lenta"
          ]
        ],
        "note": "A localização orienta a etiologia mais provável e a urgência"
      },
      {
        "title": "Sinais de gravidade (estrangulamento)",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Dor contínua intensa",
            "Sofrimento de alça"
          ],
          [
            "Febre + taquicardia",
            "Resposta inflamatória/sepse"
          ],
          [
            "Defesa/irritação peritoneal",
            "Peritonite"
          ],
          [
            "Acidose/lactato ↑",
            "Isquemia intestinal"
          ]
        ],
        "note": "Qualquer sinal de estrangulamento indica laparotomia de urgência"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma, eletrólitos, função renal, gasometria/lactato",
        "Radiografia de abdome (níveis hidroaéreos, distensão, pneumoperitônio)",
        "TC de abdome com contraste (ponto e causa da obstrução, sinais de isquemia)",
        "Beta-hCG em mulheres em idade fértil"
      ],
      "drugs": [
        "Jejum absoluto",
        "Sonda nasogástrica para descompressão",
        "Hidratação venosa + correção de distúrbios hidroeletrolíticos",
        "Analgesia e antieméticos",
        "ATB se estrangulamento/perfuração/cirurgia"
      ],
      "steps": [
        "1. Jejum + SNG + hidratação (\"drip and suck\")",
        "2. Corrigir distúrbios hidroeletrolíticos",
        "3. Definir mecânica x funcional e alta x baixa por imagem",
        "4. Sem estrangulamento (bridas): tratamento conservador e observação",
        "5. Estrangulamento, hérnia encarcerada, neoplasia obstrutiva ou falha do conservador → cirurgia"
      ]
    }
  },
  "palpitacoes": {
    "mnemonics": [
      {
        "kw": "PULSAR",
        "name": "Causas de palpitações",
        "rows": [
          [
            "P",
            "Pânico/ansiedade",
            "Sensação de \"coração disparado\" associada a sintomas de ansiedade, sudorese, dispneia"
          ],
          [
            "U",
            "Uso de estimulantes",
            "Cafeína, álcool, tabaco, drogas ilícitas, descongestionantes"
          ],
          [
            "L",
            "Labilidade hormonal (tireoide)",
            "Hipertireoidismo — taquicardia, perda de peso, tremor, intolerância ao calor"
          ],
          [
            "S",
            "Sangue (anemia)",
            "Palidez, fadiga, dispneia aos esforços, taquicardia compensatória"
          ],
          [
            "A",
            "Arritmias",
            "Fibrilação atrial, taquicardia supraventricular, extrassístoles, flutter atrial"
          ],
          [
            "R",
            "Repercussão estrutural cardíaca",
            "Valvopatias, cardiomiopatias, insuficiência cardíaca"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Palpação do pulso radial/carotídeo",
        "subtitle": "Identificar irregularidade do ritmo",
        "steps": [
          "Palpar o pulso radial por pelo menos 30-60 segundos",
          "Avaliar frequência, ritmo (regular x irregular) e amplitude"
        ],
        "normal": "Pulso regular, frequência 60-100bpm",
        "abnormal": "Pulso irregularmente irregular → sugere fibrilação atrial; pulso rápido e regular → taquicardia supraventricular"
      },
      {
        "title": "Manobra de Valsalva",
        "subtitle": "Manobra vagal diagnóstica/terapêutica",
        "steps": [
          "Peça ao paciente para inspirar profundamente",
          "Solicite que faça força expiratória contra a glote fechada por 10-15 segundos (como ao evacuar)",
          "Monitorize FC e ritmo durante e após a manobra"
        ],
        "normal": "Variação discreta e transitória da FC",
        "abnormal": "Reversão de taquicardia supraventricular ou queda abrupta da FC → resposta vagal (auxilia diagnóstico e tratamento de TSV)"
      },
      {
        "title": "Ausculta cardíaca completa",
        "subtitle": "Identificar arritmias e sopros",
        "steps": [
          "Auscultar nos 4 focos clássicos (aórtico, pulmonar, tricúspide, mitral)",
          "Avaliar ritmo, frequência, presença de sopros, B3/B4"
        ],
        "normal": "Bulhas rítmicas, normofonéticas, sem sopros",
        "abnormal": "Ritmo irregular, sopros ou bulhas acessórias → investigar arritmia ou cardiopatia estrutural"
      }
    ],
    "sinais": [
      {
        "name": "Síncope associada",
        "eponym": "Arritmia grave",
        "how": "Perda transitória de consciência relacionada ao episódio de palpitação",
        "means": "Sinal de alarme — sugere arritmia com repercussão hemodinâmica significativa, requer avaliação urgente"
      },
      {
        "name": "Dor torácica concomitante",
        "eponym": "Síndrome coronariana associada",
        "how": "Dor ou desconforto torácico durante o episódio de palpitação",
        "means": "Pode indicar isquemia miocárdica desencadeada pela arritmia — investigação cardiológica urgente"
      },
      {
        "name": "Dispneia associada",
        "eponym": "Repercussão hemodinâmica",
        "how": "Falta de ar durante ou após o episódio de palpitação",
        "means": "Sugere repercussão hemodinâmica da arritmia ou descompensação cardíaca subjacente"
      }
    ],
    "ddx": [
      [
        "Arritmia cardíaca (FA, TSV, extrassístoles)",
        "Pulso irregular ou taquicardia documentada, ECG alterado, episódios súbitos e recorrentes",
        "Pulso regular, ECG normal, sintomas claramente situacionais (estresse, cafeína)"
      ],
      [
        "Ansiedade/transtorno do pânico",
        "Episódios associados a estresse, sudorese, sensação de morte iminente, hiperventilação, ECG normal durante crise",
        "Documentação de arritmia ao monitor/ECG durante o episódio"
      ],
      [
        "Tireotoxicose",
        "Perda de peso, tremor, intolerância ao calor, bócio, TSH suprimido",
        "TSH normal, ausência de sinais hiperadrenérgicos"
      ],
      [
        "Anemia",
        "Palidez, fadiga, dispneia aos esforços, hemoglobina baixa",
        "Hemoglobina normal"
      ]
    ],
    "escalas": [
      {
        "title": "Classificação EHRA de sintomas em FA",
        "headers": [
          "Classe",
          "Descrição"
        ],
        "rows": [
          [
            "EHRA 1",
            "Sem sintomas"
          ],
          [
            "EHRA 2a",
            "Sintomas leves, não afetam atividades diárias"
          ],
          [
            "EHRA 2b",
            "Sintomas moderados, incomodam mas não limitam"
          ],
          [
            "EHRA 3",
            "Sintomas graves, afetam atividades diárias"
          ],
          [
            "EHRA 4",
            "Sintomas incapacitantes, interrompem atividades diárias"
          ]
        ],
        "note": "Auxilia a graduar o impacto sintomático da fibrilação atrial e orientar a urgência da investigação/tratamento"
      }
    ],
    "conduta": {
      "exames": [
        "ECG de 12 derivações (preferencialmente durante o episódio)",
        "Holter de 24h ou monitor de eventos (se episódios intermitentes)",
        "Hemograma (anemia), TSH (tireotoxicose)",
        "Eletrólitos (potássio, magnésio, cálcio)",
        "Ecocardiograma se suspeita de cardiopatia estrutural"
      ],
      "drugs": [
        "Manobras vagais (Valsalva, massagem do seio carotídeo por especialista) para TSV",
        "Betabloqueadores (ex.: Propranolol, Metoprolol) conforme avaliação cardiológica",
        "Anticoagulação conforme escore de risco (CHA₂DS₂-VASc) em fibrilação atrial",
        "Tratamento da causa de base (reposição de ferro na anemia, tratamento do hipertireoidismo)"
      ],
      "steps": [
        "1. Caracterizar o episódio (início, duração, ritmo, sintomas associados)",
        "2. ECG imediato — idealmente durante o episódio",
        "3. Pesquisar sinais de alarme (síncope, dor torácica, dispneia) → avaliação cardiológica urgente se presentes",
        "4. Manobras vagais para suspeita de TSV sintomática estável",
        "5. Investigação laboratorial dirigida (hemograma, TSH, eletrólitos)",
        "6. Encaminhar a cardiologia para monitorização prolongada e definição terapêutica conforme achados"
      ]
    }
  },
  "pancreatite-aguda": {
    "mnemonics": [
      {
        "kw": "GET SMASHED",
        "name": "Etiologias da pancreatite",
        "rows": [
          [
            "G",
            "Gallstones",
            "Litíase biliar (causa mais comum)"
          ],
          [
            "E",
            "Ethanol",
            "Álcool (2ª causa mais comum)"
          ],
          [
            "T",
            "Trauma",
            "Trauma abdominal / pós-CPRE"
          ],
          [
            "S",
            "Steroids",
            "Corticoides"
          ],
          [
            "M",
            "Mumps",
            "Caxumba / infecções virais"
          ],
          [
            "A",
            "Autoimmune",
            "Pancreatite autoimune"
          ],
          [
            "S",
            "Scorpion",
            "Picada de escorpião"
          ],
          [
            "H",
            "Hyper",
            "Hipertrigliceridemia / hipercalcemia"
          ],
          [
            "E",
            "ERCP",
            "Pós-CPRE"
          ],
          [
            "D",
            "Drugs",
            "Fármacos (azatioprina, tiazídicos, valproato)"
          ]
        ]
      },
      {
        "kw": "RANSON",
        "name": "Critérios de Ranson (admissão)",
        "rows": [
          [
            "I",
            "Idade",
            ">55 anos"
          ],
          [
            "L",
            "Leucócitos",
            ">16.000/mm³"
          ],
          [
            "G",
            "Glicose",
            ">200 mg/dL"
          ],
          [
            "D",
            "DHL",
            ">350 UI/L"
          ],
          [
            "A",
            "AST/TGO",
            ">250 UI/L"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Cullen",
        "subtitle": "Hemorragia retroperitoneal",
        "steps": [
          "Inspecionar a região periumbilical",
          "Pesquisar equimose azulada ao redor do umbigo"
        ],
        "normal": "Pele periumbilical normal",
        "abnormal": "Equimose periumbilical (Cullen +) → pancreatite hemorrágica/grave"
      },
      {
        "title": "Sinal de Grey-Turner",
        "subtitle": "Hemorragia em flancos",
        "steps": [
          "Inspecionar os flancos",
          "Pesquisar equimose nos flancos"
        ],
        "normal": "Flancos sem equimose",
        "abnormal": "Equimose em flancos (Grey-Turner +) → pancreatite necro-hemorrágica"
      },
      {
        "title": "Palpação epigástrica",
        "subtitle": "Dor pancreática",
        "steps": [
          "Palpar o epigástrio",
          "Avaliar irradiação da dor para o dorso"
        ],
        "normal": "Sem dor à palpação",
        "abnormal": "Dor epigástrica em faixa, irradiada ao dorso → pancreatite"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Cullen",
        "eponym": "Pancreatite hemorrágica",
        "how": "Equimose periumbilical",
        "means": "Sangramento retroperitoneal — pancreatite grave"
      },
      {
        "name": "Sinal de Grey-Turner",
        "eponym": "Pancreatite necro-hemorrágica",
        "how": "Equimose nos flancos",
        "means": "Necrose hemorrágica — mau prognóstico"
      },
      {
        "name": "Sinal de Fox",
        "eponym": "Sangramento retroperitoneal",
        "how": "Equimose na base do ligamento inguinal",
        "means": "Dissecção de sangue retroperitoneal"
      },
      {
        "name": "Dor em faixa",
        "eponym": "Pancreatite aguda",
        "how": "Dor epigástrica que irradia \"em cinturão\" para o dorso, alívio ao inclinar-se para frente",
        "means": "Padrão clássico da dor pancreática"
      }
    ],
    "ddx": [
      [
        "Pancreatite aguda",
        "Dor em faixa, lipase >3x LSN, irradiação dorsal",
        "Enzimas normais; dor localizada sem irradiação"
      ],
      [
        "Úlcera perfurada",
        "Dor súbita, abdome em tábua, pneumoperitônio",
        "Lipase elevada, sem pneumoperitônio"
      ],
      [
        "Colecistite/colangite",
        "Dor HCD, Murphy +, febre, alteração de FA/GGT",
        "Dor epigástrica em faixa, lipase muito elevada"
      ],
      [
        "Obstrução intestinal",
        "Distensão, parada de eliminação, níveis hidroaéreos",
        "Lipase elevada, dor epigástrica contínua"
      ],
      [
        "IAM de parede inferior",
        "Dor epigástrica, sudorese, ECG alterado, troponina ↑",
        "ECG normal, lipase elevada"
      ],
      [
        "Aneurisma de aorta roto",
        "Dor + massa pulsátil + choque",
        "Lipase elevada, sem massa pulsátil"
      ],
      [
        "Isquemia mesentérica",
        "Dor desproporcional ao exame, acidose láctica",
        "Lipase muito elevada, USG/TC com pâncreas alterado"
      ]
    ],
    "escalas": [
      {
        "title": "BISAP — gravidade (0-5)",
        "headers": [
          "Componente",
          "Ponto"
        ],
        "rows": [
          [
            "BUN >25 mg/dL",
            "1"
          ],
          [
            "Impaired mental status (alteração mental)",
            "1"
          ],
          [
            "SIRS",
            "1"
          ],
          [
            "Age >60",
            "1"
          ],
          [
            "Pleural effusion (derrame pleural)",
            "1"
          ]
        ],
        "note": "BISAP ≥3 → maior mortalidade; considerar UTI"
      },
      {
        "title": "Critérios de Ranson (0h e 48h)",
        "headers": [
          "Momento",
          "Critérios"
        ],
        "rows": [
          [
            "Admissão",
            "Idade>55, Leuco>16k, Glicose>200, DHL>350, TGO>250"
          ],
          [
            "48h",
            "Queda Ht>10%, BUN↑>5, Ca<8, PaO₂<60, BE>4, sequestro fluido>6L"
          ]
        ],
        "note": "≥3 critérios → pancreatite grave (mortalidade crescente com a pontuação)"
      }
    ],
    "conduta": {
      "exames": [
        "Lipase (preferível) e amilase séricas",
        "Hemograma, PCR (48h prognóstica)",
        "Ureia, creatinina, glicemia, cálcio, eletrólitos",
        "TGO, TGP, FA, GGT, bilirrubinas, triglicerídeos",
        "USG de abdome (etiologia biliar)",
        "TC de abdome com contraste (após 72h) para necrose se grave/dúvida"
      ],
      "drugs": [
        "Hidratação venosa vigorosa (Ringer lactato) — pilar do tratamento",
        "Analgesia (opioides se necessário)",
        "Antieméticos",
        "Suporte nutricional precoce (enteral preferível)",
        "ATB apenas se necrose infectada/colangite — não profilático"
      ],
      "steps": [
        "1. Diagnóstico: 2 de 3 (dor típica + lipase >3x LSN + imagem)",
        "2. Estratificar gravidade (BISAP/Ranson, PCR 48h)",
        "3. Reposição volêmica agressiva precoce",
        "4. Analgesia e controle de náuseas",
        "5. Tratar a causa: CPRE se colangite/obstrução biliar; suspender álcool; controlar triglicerídeos",
        "6. Casos graves/necrose → UTI; ATB só se infecção documentada"
      ]
    }
  },
  "perda-peso": {
    "mnemonics": [
      {
        "kw": "EMAGRECE",
        "name": "Causas de perda de peso involuntária",
        "rows": [
          [
            "E",
            "Endócrino",
            "Hipertireoidismo, diabetes mellitus descompensado, insuficiência adrenal"
          ],
          [
            "M",
            "Maligno (neoplasia)",
            "Emagrecimento + sintomas B (febre, sudorese noturna) — investigar sempre"
          ],
          [
            "A",
            "Aparelho digestivo",
            "DII, má-absorção, doença celíaca, úlcera péptica"
          ],
          [
            "G",
            "Geriátrico/funcional",
            "Disfagia, problemas dentários, isolamento social, depressão"
          ],
          [
            "R",
            "Repetidas infecções (consumptivas)",
            "Tuberculose, HIV/AIDS, endocardite"
          ],
          [
            "E²",
            "Emocional/psiquiátrico",
            "Depressão, transtornos alimentares (anorexia/bulimia), ansiedade"
          ],
          [
            "C",
            "Crônicas (doenças sistêmicas)",
            "DPOC, insuficiência cardíaca, doença renal crônica, hepatopatia"
          ],
          [
            "E³",
            "Estimulantes/drogas/álcool",
            "Uso de substâncias, efeitos adversos medicamentosos"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação nutricional/IMC",
        "subtitle": "Quantificação da perda de peso",
        "steps": [
          "Calcular % de perda em relação ao peso habitual e tempo decorrido",
          "IMC = peso(kg)/altura²(m)",
          "Classificar perda significativa: >5% em 1 mês ou >10% em 6 meses"
        ],
        "normal": "Peso estável, IMC adequado",
        "abnormal": "Perda ≥5%/mês ou ≥10%/6 meses → perda de peso clinicamente significativa, investigar"
      },
      {
        "title": "Palpação de linfonodos",
        "subtitle": "Rastreio de neoplasia/infecção",
        "steps": [
          "Palpar cadeias cervicais, supraclaviculares, axilares e inguinais",
          "Avaliar tamanho, consistência, mobilidade e dor"
        ],
        "normal": "Linfonodos não palpáveis ou <1cm, móveis, indolores",
        "abnormal": "Linfonodomegalia endurecida, fixa, indolor (especialmente supraclavicular - nódulo de Virchow) → investigar neoplasia"
      },
      {
        "title": "Palpação da tireoide",
        "subtitle": "Rastreio de hipertireoidismo",
        "steps": [
          "Palpar a glândula durante a deglutição, por trás ou pela frente do paciente",
          "Avaliar tamanho, nódulos, consistência e frêmito"
        ],
        "normal": "Tireoide não palpável ou de tamanho normal, sem nódulos",
        "abnormal": "Bócio difuso ou nodular, frêmito → investigar disfunção tireoidiana"
      },
      {
        "title": "Exame abdominal completo",
        "subtitle": "Rastreio de massas e organomegalias",
        "steps": [
          "Inspeção, ausculta, percussão e palpação sistemática dos quadrantes",
          "Pesquisar hepatomegalia, esplenomegalia e massas palpáveis"
        ],
        "normal": "Abdome flácido, sem massas ou organomegalias",
        "abnormal": "Massa palpável, hepatoesplenomegalia → investigar causa neoplásica/infecciosa/hepática"
      }
    ],
    "sinais": [
      {
        "name": "Bócio",
        "eponym": "Hipertireoidismo/doença tireoidiana",
        "how": "Aumento visível ou palpável da glândula tireoide",
        "means": "Sugere disfunção tireoidiana como causa do emagrecimento"
      },
      {
        "name": "Palidez cutaneomucosa",
        "eponym": "Anemia associada",
        "how": "Coloração pálida de conjuntivas, mucosa oral e leitos ungueais",
        "means": "Sugere anemia — pode acompanhar doença consumptiva, neoplasia ou má-absorção"
      },
      {
        "name": "Caquexia",
        "eponym": "Síndrome consumptiva",
        "how": "Perda importante de massa muscular e gordura, fraqueza, fadiga",
        "means": "Sinal de doença sistêmica avançada — neoplasia, infecção crônica (TB/HIV), insuficiência orgânica terminal"
      }
    ],
    "ddx": [
      [
        "Neoplasia maligna",
        "Emagrecimento progressivo, sintomas B, massa/linfonodomegalia, idade avançada, tabagismo",
        "Ausência de massas, exames de rastreio normais, melhora com tratamento de causa benigna"
      ],
      [
        "Hipertireoidismo",
        "Perda de peso com aumento do apetite, taquicardia, tremor, intolerância ao calor, bócio",
        "TSH normal, sem sinais adrenérgicos"
      ],
      [
        "Diabetes mellitus descompensado",
        "Poliúria, polidipsia, polifagia com emagrecimento, glicemia elevada",
        "Glicemia normal, sem sintomas cardinais de DM"
      ],
      [
        "Depressão/transtorno psiquiátrico",
        "Humor deprimido, anedonia, alteração de sono e apetite, isolamento social",
        "Exame físico e laboratorial completamente normais não excluem, mas ausência de sintomas depressivos torna menos provável"
      ],
      [
        "Doença consumptiva/infecciosa (TB, HIV)",
        "Febre, sudorese noturna, tosse crônica, fatores de risco epidemiológicos, linfonodomegalia",
        "Sorologias e investigação infecciosa negativas"
      ],
      [
        "DII/má-absorção",
        "Diarreia crônica, dor abdominal, sangue nas fezes, deficiências nutricionais",
        "Trânsito intestinal normal, exames de má-absorção negativos"
      ]
    ],
    "escalas": [
      {
        "title": "Classificação de perda de peso significativa (tempo x percentual)",
        "headers": [
          "Período",
          "% de perda considerada significativa",
          "% considerada grave"
        ],
        "rows": [
          [
            "1 semana",
            "1-2%",
            ">2%"
          ],
          [
            "1 mês",
            "5%",
            ">5%"
          ],
          [
            "3 meses",
            "7,5%",
            ">7,5%"
          ],
          [
            "6 meses",
            "10%",
            ">10%"
          ]
        ],
        "note": "Perda \"grave\" no período exige investigação ativa e prioritária da causa"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma completo + VHS/PCR",
        "Glicemia de jejum/HbA1c",
        "TSH e T4 livre",
        "Função renal e hepática, eletrólitos",
        "Urina rotina",
        "Rastreio de HIV e sorologias conforme epidemiologia",
        "Radiografia de tórax ± TC conforme suspeita",
        "Rastreio oncológico orientado por idade/sexo (endoscopia, colonoscopia, mamografia, etc.)"
      ],
      "drugs": [
        "Tratamento dirigido à causa identificada (não há tratamento sintomático específico)",
        "Suporte nutricional/suplementação conforme avaliação",
        "Encaminhamento a especialista conforme achados (endocrinologia, oncologia, psiquiatria, gastroenterologia)"
      ],
      "steps": [
        "1. Confirmar e quantificar a perda de peso (peso habitual x atual x tempo)",
        "2. Anamnese dirigida: apetite, sintomas B, hábito intestinal, humor, medicações, contexto social",
        "3. Exame físico completo (linfonodos, tireoide, abdome, estado nutricional)",
        "4. Rastreio laboratorial amplo inicial",
        "5. Investigação direcionada conforme hipótese mais provável (imagem, endoscopia, sorologias)",
        "6. Encaminhar a especialista se achados sugestivos de neoplasia ou doença sistêmica grave"
      ]
    }
  },
  "semio-astenia": {
    "mnemonics": [
      {
        "kw": "VITAMINAS-D",
        "name": "Causas de astenia/fadiga",
        "rows": [
          [
            "V",
            "Vascular/Cardíaca",
            "Insuficiência cardíaca, anemia, hipotensão"
          ],
          [
            "I",
            "Infecciosa",
            "Mononucleose, tuberculose, HIV, COVID, endocardite"
          ],
          [
            "T",
            "Tóxico/Medicamentosa",
            "Betabloqueadores, sedativos, álcool, quimioterapia"
          ],
          [
            "A",
            "Autoimune/Inflamatória",
            "Lúpus, artrite reumatoide, polimialgia"
          ],
          [
            "M",
            "Metabólica/Endócrina",
            "Hipotireoidismo, diabetes, Addison, distúrbios eletrolíticos"
          ],
          [
            "N",
            "Neoplásica",
            "Síndrome consumptiva, anemia paraneoplásica"
          ],
          [
            "D",
            "Depressão/Psíquica",
            "Depressão, ansiedade, distúrbio do sono"
          ]
        ]
      },
      {
        "kw": "ORGÂNICA x FUNCIONAL",
        "name": "Padrão temporal da fadiga",
        "rows": [
          [
            "O",
            "Orgânica",
            "Piora ao longo do dia, com o esforço; melhora com repouso; início recente e progressivo"
          ],
          [
            "F",
            "Funcional/psicogênica",
            "Presente já ao acordar, não melhora com repouso, crônica e flutuante"
          ],
          [
            "A",
            "Alarme",
            "Perda de peso, febre, sudorese noturna, linfadenomegalia → investigar causa orgânica grave"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Diferenciar astenia de fraqueza muscular real",
        "subtitle": "Semiologia neuromuscular",
        "steps": [
          "Testar a força muscular segmentar (escala MRC 0-5)",
          "Pedir tarefas funcionais: levantar da cadeira sem apoio, elevar os braços"
        ],
        "normal": "Força preservada (5/5) — cansaço sem déficit = astenia",
        "abnormal": "Força reduzida objetivamente → fraqueza neuromuscular (miopatia, neuropatia), não astenia"
      },
      {
        "title": "Pesquisa de palidez/anemia",
        "subtitle": "Causa frequente de astenia",
        "steps": [
          "Inspecionar conjuntivas, palmas e mucosas",
          "Avaliar taquicardia e sopro sistólico funcional"
        ],
        "normal": "Mucosas coradas",
        "abnormal": "Palidez mucosa → anemia provável; solicitar hemograma"
      },
      {
        "title": "Avaliação da tireoide",
        "subtitle": "Hipotireoidismo",
        "steps": [
          "Palpar a glândula tireoide",
          "Pesquisar pele seca, bradicardia, reflexo aquileu lentificado"
        ],
        "normal": "Tireoide normal, sem sinais de hipofunção",
        "abnormal": "Bócio/sinais de hipotireoidismo → dosar TSH"
      }
    ],
    "sinais": [
      {
        "name": "Reflexo aquileu lentificado",
        "eponym": "Hipotireoidismo",
        "how": "Fase de relaxamento lenta do reflexo do tornozelo",
        "means": "Sugere hipotireoidismo como causa da astenia"
      },
      {
        "name": "Palidez palmar",
        "eponym": "Anemia",
        "how": "Pregas palmares descoradas",
        "means": "Anemia significativa — investigar causa"
      },
      {
        "name": "Hiperpigmentação cutânea",
        "eponym": "Insuficiência adrenal (Addison)",
        "how": "Escurecimento de pregas, cicatrizes e mucosas",
        "means": "Doença de Addison — fadiga + hipotensão + avidez por sal"
      }
    ],
    "ddx": [
      [
        "Anemia",
        "Palidez, dispneia aos esforços, taquicardia, Hb baixa",
        "Hemograma normal"
      ],
      [
        "Hipotireoidismo",
        "Intolerância ao frio, pele seca, ganho de peso, TSH ↑",
        "TSH normal"
      ],
      [
        "Depressão",
        "Anedonia, fadiga ao acordar, alteração do sono/apetite",
        "Anedonia ausente, fadiga ao esforço"
      ],
      [
        "Apneia do sono",
        "Sonolência diurna, ronco, fadiga matinal, obesidade",
        "Sono reparador, sem ronco"
      ],
      [
        "Neoplasia/doença crônica",
        "Perda de peso, febre, sudorese noturna, sinais de alarme",
        "Exame e marcadores normais"
      ],
      [
        "Fadiga relacionada a fármacos",
        "Início após novo medicamento (betabloq., sedativo)",
        "Sem mudança medicamentosa recente"
      ],
      [
        "Síndrome da fadiga crônica",
        "Fadiga >6 meses, pós-esforço, exames normais",
        "Causa orgânica identificável"
      ]
    ],
    "escalas": [
      {
        "title": "Orgânica x Funcional",
        "headers": [
          "Característica",
          "Orgânica",
          "Funcional/Psíquica"
        ],
        "rows": [
          [
            "Início",
            "Recente, progressivo",
            "Crônico, flutuante"
          ],
          [
            "Relação com esforço",
            "Piora ao esforço",
            "Já presente ao acordar"
          ],
          [
            "Repouso",
            "Melhora",
            "Não melhora"
          ],
          [
            "Sinais de alarme",
            "Frequentes",
            "Ausentes"
          ]
        ],
        "note": "O padrão temporal ajuda a priorizar a investigação orgânica versus o suporte psicossocial"
      },
      {
        "title": "Sinais de alarme na astenia",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Perda de peso não intencional",
            "Neoplasia, infecção crônica, hipertireoidismo"
          ],
          [
            "Febre/sudorese noturna",
            "Infecção crônica, linfoma"
          ],
          [
            "Linfadenomegalia/visceromegalia",
            "Doença hematológica/neoplásica"
          ],
          [
            "Fraqueza muscular objetiva",
            "Doença neuromuscular — não é astenia"
          ]
        ],
        "note": "Astenia com sinais de alarme exige investigação orgânica dirigida e precoce"
      }
    ],
    "conduta": {
      "exames": [
        "Hemograma completo (anemia)",
        "TSH e T4 livre (tireoide)",
        "Glicemia/HbA1c",
        "Função renal e hepática, eletrólitos (Na, K, Ca)",
        "Ferritina e perfil de ferro",
        "Sorologias conforme suspeita (HIV, hepatites, mononucleose)",
        "VHS/PCR; rastreio oncológico conforme idade e sinais de alarme"
      ],
      "drugs": [
        "Não há medicação sintomática genérica — tratar a causa de base",
        "Repor ferro/vitaminas se carência documentada",
        "Ajustar/retirar fármacos sedativos quando possível",
        "Abordar higiene do sono e suporte para depressão/ansiedade"
      ],
      "steps": [
        "1. Diferenciar astenia (cansaço) de fraqueza muscular objetiva",
        "2. Definir o padrão temporal (orgânico x funcional)",
        "3. Pesquisar sinais de alarme",
        "4. Solicitar rastreio laboratorial básico (hemograma, TSH, glicemia, função renal/hepática)",
        "5. Tratar a causa identificada e reavaliar; considerar causas psíquicas quando a investigação orgânica é negativa"
      ]
    }
  },
  "semio-cianose": {
    "mnemonics": [
      {
        "kw": "CENTRAL x PERIFÉRICA",
        "name": "Tipos de cianose",
        "rows": [
          [
            "C",
            "Central",
            "Língua e mucosas cianóticas, extremidades quentes — hipoxemia/shunt; SpO₂ baixa"
          ],
          [
            "P",
            "Periférica",
            "Extremidades frias e cianóticas, mucosas poupadas — baixo débito/vasoconstrição; SpO₂ normal"
          ],
          [
            "M",
            "Mista",
            "Combinação — ex.: insuficiência cardíaca congestiva"
          ],
          [
            "D",
            "Diferencial",
            "Cianose em MMII com MMSS poupados — shunt direita-esquerda pós-ductal (ex.: coarctação)"
          ]
        ]
      },
      {
        "kw": "5 g/dL",
        "name": "Limiar da cianose",
        "rows": [
          [
            "H",
            "Hemoglobina reduzida",
            "Cianose aparece com ≥5 g/dL de Hb desoxigenada no leito capilar"
          ],
          [
            "A",
            "Anemia",
            "Pode haver hipoxemia grave SEM cianose (pouca Hb para dessaturar)"
          ],
          [
            "P",
            "Policitemia",
            "Cianose surge mais facilmente, mesmo com saturação pouco reduzida"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Inspeção de mucosas e língua",
        "subtitle": "Diferenciar central x periférica",
        "steps": [
          "Examinar língua, mucosa oral e conjuntivas sob boa iluminação",
          "Comparar com leito ungueal e extremidades"
        ],
        "normal": "Mucosas e língua róseas",
        "abnormal": "Língua/mucosas azuladas → cianose central (hipoxemia/shunt)"
      },
      {
        "title": "Teste do aquecimento",
        "subtitle": "Cianose periférica",
        "steps": [
          "Aquecer a extremidade cianótica (massagem/calor)",
          "Observar se a cor melhora"
        ],
        "normal": "Sem cianose após aquecimento",
        "abnormal": "Melhora com aquecimento → cianose periférica (vasoconstrição/baixo débito)"
      },
      {
        "title": "Oximetria + resposta ao O₂",
        "subtitle": "Confirmar hipoxemia",
        "steps": [
          "Medir SpO₂ em ar ambiente",
          "Ofertar O₂ suplementar e remensurar"
        ],
        "normal": "SpO₂ ≥95% e melhora com O₂",
        "abnormal": "Não melhora com O₂ → suspeitar shunt direita-esquerda ou meta-hemoglobinemia"
      }
    ],
    "sinais": [
      {
        "name": "Cianose diferencial",
        "eponym": "Shunt pós-ductal",
        "how": "MMII cianóticos e MMSS rosados (ou vice-versa)",
        "means": "Cardiopatia congênita com shunt — avaliação cardiológica"
      },
      {
        "name": "Baqueteamento digital",
        "eponym": "Hipoxemia crônica",
        "how": "Hipocratismo digital — ângulo de Lovibond >180°",
        "means": "Cardiopatia cianótica crônica, pneumopatia, supuração crônica"
      },
      {
        "name": "Cianose que não responde ao O₂",
        "eponym": "Meta-hemoglobinemia",
        "how": "SpO₂ \"travada\" ~85%, sangue cor de chocolate",
        "means": "Meta-hemoglobinemia (dapsona, nitritos, anestésicos) — azul de metileno"
      }
    ],
    "ddx": [
      [
        "Hipoxemia pulmonar",
        "Cianose central, SpO₂ baixa, melhora com O₂",
        "Não melhora com O₂; extremidades frias isoladas"
      ],
      [
        "Shunt direita-esquerda",
        "Central, baqueteamento, não melhora com O₂",
        "Melhora plena com O₂"
      ],
      [
        "Baixo débito / vasoconstrição",
        "Periférica, extremidades frias, mucosas poupadas",
        "Língua cianótica, SpO₂ baixa"
      ],
      [
        "Meta-hemoglobinemia",
        "SpO₂ ~85% fixa, sangue achocolatado, fármaco causal",
        "Resposta normal ao O₂; gasometria com PaO₂ baixa"
      ],
      [
        "Fenômeno de Raynaud",
        "Cianose episódica das extremidades ao frio, trifásica",
        "Cianose central persistente"
      ]
    ],
    "escalas": [
      {
        "title": "Central x Periférica",
        "headers": [
          "Característica",
          "Central",
          "Periférica"
        ],
        "rows": [
          [
            "Mucosas/língua",
            "Cianóticas",
            "Poupadas"
          ],
          [
            "Temperatura da extremidade",
            "Quente",
            "Fria"
          ],
          [
            "SpO₂",
            "Reduzida",
            "Normal"
          ],
          [
            "Melhora ao aquecer",
            "Não",
            "Sim"
          ]
        ],
        "note": "A cianose central reflete dessaturação arterial; a periférica, aumento da extração tecidual"
      },
      {
        "title": "Sinais de alarme",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Cianose central de início súbito + dispneia",
            "Emergência respiratória/cardíaca"
          ],
          [
            "Cianose que não melhora com O₂",
            "Shunt ou meta-hemoglobinemia"
          ],
          [
            "Cianose + rebaixamento de consciência",
            "Hipóxia grave — suporte imediato"
          ]
        ],
        "note": "Cianose é sinal tardio de hipoxemia — não aguardar seu surgimento para tratar"
      }
    ],
    "conduta": {
      "exames": [
        "Oximetria de pulso e gasometria arterial (PaO₂, SatO₂, metaHb se co-oximetria)",
        "Hemograma (anemia/policitemia)",
        "Radiografia de tórax",
        "ECG e ecocardiograma se suspeita cardíaca/shunt",
        "Dosagem de meta-hemoglobina se SpO₂ fixa não responsiva"
      ],
      "drugs": [
        "Oxigenoterapia conforme a causa e a SpO₂",
        "Tratamento dirigido à doença de base (pulmonar/cardíaca)",
        "Azul de metileno na meta-hemoglobinemia sintomática",
        "Aquecimento e otimização do débito na cianose periférica"
      ],
      "steps": [
        "1. Diferenciar cianose central de periférica pelo exame de mucosas/extremidades",
        "2. Medir SpO₂ e gasometria",
        "3. Ofertar O₂ e observar resposta",
        "4. Investigar a causa (pulmonar, cardíaca, hematológica, vascular)",
        "5. Lembrar que anemia mascara e policitemia exagera a cianose"
      ]
    }
  },
  "semio-dor": {
    "mnemonics": [
      {
        "kw": "ALICIA",
        "name": "Caracterização semiológica da dor",
        "rows": [
          [
            "A",
            "Aparición / Início",
            "Quando e como começou: súbito (vascular/perfuração) ou gradual (inflamatório)"
          ],
          [
            "L",
            "Localización",
            "Onde dói — apontar com um dedo (somática) ou difusa/mal definida (visceral)"
          ],
          [
            "I",
            "Irradiación",
            "Para onde a dor se propaga (ex.: ombro na irritação diafragmática, dorso na pancreatite)"
          ],
          [
            "C",
            "Carácter",
            "Tipo: em cólica, queimação, pontada, peso, lancinante"
          ],
          [
            "I",
            "Intensidad",
            "EVA 0-10 e repercussão nas atividades/sono"
          ],
          [
            "A",
            "Atenuantes/Agravantes",
            "O que melhora ou piora: posição, alimentação, repouso, medicação"
          ]
        ]
      },
      {
        "kw": "OPQRST",
        "name": "Roteiro anglo-saxão da dor",
        "rows": [
          [
            "O",
            "Onset",
            "Início e circunstância"
          ],
          [
            "P",
            "Provocação/Paliação",
            "Fatores que pioram ou aliviam"
          ],
          [
            "Q",
            "Quality",
            "Qualidade/caráter da dor"
          ],
          [
            "R",
            "Region/Radiation",
            "Localização e irradiação"
          ],
          [
            "S",
            "Severity",
            "Intensidade (EVA)"
          ],
          [
            "T",
            "Timing",
            "Duração, frequência, evolução temporal"
          ]
        ]
      },
      {
        "kw": "VISCERAL x SOMÁTICA",
        "name": "Tipos de dor",
        "rows": [
          [
            "V",
            "Visceral",
            "Mal localizada, surda, em cólica, acompanha náusea/sudorese — víscera oca/parenquimatosa"
          ],
          [
            "S",
            "Somática",
            "Bem localizada, aguda, piora ao movimento/palpação — peritônio parietal, pele, músculo"
          ],
          [
            "R",
            "Referida",
            "Sentida em local distante da origem (ombro/escápula) por convergência medular"
          ],
          [
            "N",
            "Neuropática",
            "Queimação, choque, formigamento, no trajeto de um nervo"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Avaliação da intensidade (EVA)",
        "subtitle": "Escala visual analógica",
        "steps": [
          "Apresentar régua 0 (sem dor) a 10 (pior dor imaginável)",
          "Pedir ao paciente que indique o número",
          "Reavaliar após analgesia para medir resposta"
        ],
        "normal": "0 = ausência de dor",
        "abnormal": "≥7 = dor intensa, exige analgesia e investigação prioritária"
      },
      {
        "title": "Palpação dirigida",
        "subtitle": "Localização e reprodutibilidade",
        "steps": [
          "Iniciar longe do ponto de maior dor",
          "Palpação superficial e depois profunda",
          "Observar fácies de dor e defesa muscular"
        ],
        "normal": "Dor não reproduzível à palpação",
        "abnormal": "Dor reproduzível/defesa → origem na parede ou peritônio"
      },
      {
        "title": "Manobra de Valsalva / movimento",
        "subtitle": "Diferenciar dor parietal x visceral",
        "steps": [
          "Pedir para contrair a parede (levantar a cabeça) ou tossir",
          "Observar se a dor muda de intensidade"
        ],
        "normal": "Dor visceral profunda não se altera",
        "abnormal": "Dor que piora à contração da parede → origem musculoesquelética/parietal (sinal de Carnett +)"
      }
    ],
    "sinais": [
      {
        "name": "Sinal de Carnett",
        "eponym": "Dor de parede abdominal",
        "how": "Dor à palpação persiste ou piora quando o paciente tensiona a parede (eleva a cabeça)",
        "means": "Origem na parede abdominal (não intra-abdominal) — evita laparotomia desnecessária"
      },
      {
        "name": "Dor referida ao ombro (Kehr)",
        "eponym": "Irritação diafragmática",
        "how": "Dor no ombro esquerdo por sangue/irritação subfrênica",
        "means": "Ruptura esplênica, gravidez ectópica rota, irritação peritoneal"
      },
      {
        "name": "Hiperalgesia/alodínia",
        "eponym": "Dor neuropática",
        "how": "Dor desproporcional ao estímulo no trajeto de um nervo",
        "means": "Componente neuropático — orienta terapia específica (gabapentinoides)"
      }
    ],
    "ddx": [
      [
        "Dor nociceptiva visceral",
        "Mal localizada, cólica, náusea/sudorese associada",
        "Bem localizada, piora ao movimento"
      ],
      [
        "Dor somática/parietal",
        "Localizada, piora ao movimento e palpação, Carnett +",
        "Difusa, profunda, sem relação com movimento"
      ],
      [
        "Dor neuropática",
        "Queimação/choque, trajeto de nervo, alodínia",
        "Caráter em peso/cólica, sem alteração sensitiva"
      ],
      [
        "Dor referida",
        "Distante da origem, sem alteração local",
        "Reproduzível pela palpação no local"
      ],
      [
        "Dor psicogênica/funcional",
        "Crônica, exame normal, contexto emocional",
        "Sinais objetivos, marcadores inflamatórios alterados"
      ]
    ],
    "escalas": [
      {
        "title": "Escala Visual Analógica (EVA)",
        "headers": [
          "Faixa",
          "Intensidade",
          "Conduta"
        ],
        "rows": [
          [
            "0",
            "Sem dor",
            "Observação"
          ],
          [
            "1-3",
            "Leve",
            "Analgésico simples (paracetamol/dipirona)"
          ],
          [
            "4-6",
            "Moderada",
            "AINE / opioide fraco"
          ],
          [
            "7-10",
            "Intensa",
            "Opioide / analgesia multimodal + investigação prioritária"
          ]
        ],
        "note": "Reavaliar a EVA após cada intervenção analgésica para titular o tratamento"
      },
      {
        "title": "Sinais de alarme da dor",
        "headers": [
          "Achado",
          "Significado"
        ],
        "rows": [
          [
            "Início súbito e intenso (\"pior dor da vida\")",
            "Evento vascular/perfuração — emergência"
          ],
          [
            "Dor + instabilidade hemodinâmica",
            "Choque/hemorragia — avaliar imediatamente"
          ],
          [
            "Dor noturna que desperta + perda de peso",
            "Suspeita de neoplasia"
          ],
          [
            "Defesa/rigidez involuntária",
            "Peritonite — avaliação cirúrgica"
          ]
        ],
        "note": "A presença de qualquer sinal de alarme exige investigação imediata"
      }
    ],
    "conduta": {
      "exames": [
        "Direcionar conforme a topografia e a hipótese (a dor é sintoma, não doença)",
        "Hemograma, PCR e exames básicos quando há suspeita inflamatória/infecciosa",
        "Imagem dirigida ao sítio (USG, radiografia, TC) conforme o caso",
        "Reavaliação seriada do exame físico em dores agudas indiferenciadas"
      ],
      "drugs": [
        "Analgesia por degraus conforme a EVA (escada analgésica da OMS)",
        "Paracetamol/dipirona na dor leve; AINE na dor inflamatória (cautela renal/gástrica)",
        "Opioides na dor intensa, titulados",
        "Dor neuropática: gabapentina/pregabalina, amitriptilina"
      ],
      "steps": [
        "1. Caracterizar a dor por roteiro estruturado (ALICIA/OPQRST)",
        "2. Classificar o tipo (visceral, somática, neuropática, referida)",
        "3. Pesquisar sinais de alarme",
        "4. Tratar a dor enquanto se investiga a causa — analgesia não mascara abdome agudo",
        "5. Reavaliar resposta e exame físico de forma seriada"
      ]
    }
  },
  "sintomas-urinarios": {
    "mnemonics": [
      {
        "kw": "URINA",
        "name": "Causas de disúria/sintomas urinários",
        "rows": [
          [
            "U",
            "Uretrite/DST",
            "Corrimento uretral, relação sexual de risco, disúria, Chlamydia/Gonococo"
          ],
          [
            "R",
            "Renal/litíase",
            "Cólica nefrética, dor lombar irradiada para a virilha, hematúria"
          ],
          [
            "I",
            "Infecção baixa (cistite)",
            "Disúria, polaciúria, urgência miccional, dor suprapúbica, sem febre alta"
          ],
          [
            "N",
            "Nefrite/pielonefrite (ITU alta)",
            "Febre alta, calafrios, dor lombar, Giordano positivo, comprometimento sistêmico"
          ],
          [
            "A",
            "Adenoma/prostatite",
            "Homens — jato urinário fraco, dor perineal, retenção, toque retal alterado"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Sinal de Giordano (punho-percussão lombar)",
        "subtitle": "Suspeita de pielonefrite",
        "steps": [
          "Posicionar o paciente sentado ou em pé",
          "Percutir suavemente a região lombar (ângulo costovertebral) com a borda da mão fechada",
          "Comparar os dois lados"
        ],
        "normal": "Sem dor à percussão",
        "abnormal": "Dor importante à percussão lombar (Giordano+) → sugere pielonefrite ou litíase renal"
      },
      {
        "title": "Exame de genitália externa",
        "subtitle": "Investigação de uretrite/DST",
        "steps": [
          "Inspecionar meato uretral, presença de corrimento, lesões ou hiperemia",
          "Palpar testículos e epidídimo nos homens; avaliar região vulvovaginal nas mulheres"
        ],
        "normal": "Sem corrimento, lesões ou dor à palpação",
        "abnormal": "Corrimento uretral, lesões ulceradas ou dor testicular → investigar DST/epididimite"
      },
      {
        "title": "Toque retal (avaliação prostática)",
        "subtitle": "Suspeita de prostatite/hiperplasia prostática",
        "steps": [
          "Explicar o procedimento e posicionar o paciente adequadamente",
          "Realizar toque retal avaliando tamanho, consistência, simetria e dor da próstata"
        ],
        "normal": "Próstata de tamanho normal, lisa, indolor, sem nódulos",
        "abnormal": "Próstata aumentada, dolorosa e amolecida (prostatite aguda) ou endurecida/nodular (suspeita neoplásica)"
      }
    ],
    "sinais": [
      {
        "name": "Febre alta + dor lombar",
        "eponym": "Pielonefrite aguda",
        "how": "Febre >38,5°C associada a dor lombar unilateral e Giordano positivo",
        "means": "Sugere infecção do trato urinário alto — necessidade de tratamento sistêmico e possível internação"
      },
      {
        "name": "Hematúria macroscópica",
        "eponym": "Sinal de alarme urológico",
        "how": "Urina com coloração avermelhada/acastanhada visível a olho nu",
        "means": "Pode indicar litíase, infecção complicada, neoplasia urotelial ou glomerulopatia — investigação obrigatória"
      },
      {
        "name": "Retenção urinária aguda",
        "eponym": "Emergência urológica",
        "how": "Incapacidade súbita de urinar com bexiga distendida e dor suprapúbica",
        "means": "Requer alívio imediato (sondagem vesical) e investigação da causa (HPB, prostatite, obstrução)"
      }
    ],
    "ddx": [
      [
        "Cistite (ITU baixa)",
        "Disúria, polaciúria, urgência, dor suprapúbica, sem febre ou dor lombar",
        "Febre alta, dor lombar, comprometimento do estado geral"
      ],
      [
        "Pielonefrite (ITU alta)",
        "Febre alta, calafrios, dor lombar, Giordano+, náuseas/vômitos, comprometimento sistêmico",
        "Sintomas restritos ao trato urinário baixo, sem febre"
      ],
      [
        "Uretrite/DST",
        "Corrimento uretral, relação sexual de risco, parceiro sintomático, disúria predominante no início da micção",
        "Ausência de exposição sexual de risco, sem corrimento"
      ],
      [
        "Litíase urinária",
        "Dor lombar tipo cólica irradiando para a virilha, hematúria, agitação, náuseas",
        "Dor contínua, ausência de hematúria, exame de imagem sem cálculo"
      ],
      [
        "Prostatite",
        "Homem, dor perineal/suprapúbica, sintomas miccionais, próstata dolorosa ao toque, possível febre",
        "Mulher, ou toque retal normal"
      ]
    ],
    "escalas": [
      {
        "title": "Critérios para diferenciação ITU baixa x alta",
        "headers": [
          "Achado",
          "ITU baixa (cistite)",
          "ITU alta (pielonefrite)"
        ],
        "rows": [
          [
            "Febre",
            "Ausente/baixa",
            "Alta (>38,5°C)"
          ],
          [
            "Dor lombar/Giordano",
            "Ausente",
            "Presente"
          ],
          [
            "Estado geral",
            "Preservado",
            "Comprometido (calafrios, náuseas)"
          ],
          [
            "Conduta inicial",
            "Tratamento ambulatorial via oral",
            "Considerar internação/ATB parenteral conforme gravidade"
          ]
        ],
        "note": "Diferenciação fundamental para definir via de administração do antibiótico e necessidade de internação"
      }
    ],
    "conduta": {
      "exames": [
        "Urina rotina (EAS) com sedimento",
        "Urocultura com antibiograma",
        "Hemograma + PCR (suspeita de pielonefrite)",
        "Função renal (ureia/creatinina)",
        "USG de vias urinárias (litíase, complicações)",
        "Pesquisa de DST (Chlamydia/Gonococo) se suspeita de uretrite"
      ],
      "drugs": [
        "Cistite não complicada: Nitrofurantoína 100mg 12/12h por 5 dias ou Fosfomicina dose única, ou Sulfametoxazol-trimetoprima conforme sensibilidade local",
        "Pielonefrite: Ciprofloxacino ou Ceftriaxona conforme gravidade — considerar internação e ATB EV em casos graves",
        "Uretrite/DST: Ceftriaxona + Azitromicina (cobertura para gonococo e clamídia)",
        "Analgesia/antiespasmódicos para cólica renal (ex.: Dipirona + Buscopan), AINEs se sem contraindicação"
      ],
      "steps": [
        "1. Caracterizar os sintomas (disúria isolada x febre/dor lombar x corrimento)",
        "2. Exame físico dirigido (Giordano, genitália, toque retal se indicado)",
        "3. Solicitar EAS + urocultura antes de iniciar antibiótico quando possível",
        "4. Diferenciar ITU baixa (tratamento ambulatorial) de ITU alta (considerar internação)",
        "5. Tratar empiricamente conforme apresentação e ajustar pelo antibiograma",
        "6. Investigar causas estruturais (litíase, HPB) se quadros recorrentes ou complicados"
      ]
    }
  },
  "tontura-vertigem": {
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
  "tosse": {
    "mnemonics": [
      {
        "kw": "FACTS",
        "name": "Causas de tosse crônica (>8 semanas)",
        "rows": [
          [
            "F",
            "FPNS (gotejamento pós-nasal)",
            "Rinorreia, sensação de catarro, piora ao deitar"
          ],
          [
            "A",
            "Asma",
            "Noturna, frio/alérgenos, sibilância, variabilidade PEF"
          ],
          [
            "C",
            "Cardiovascular (ICC)",
            "Ortopneia, crepitantes, BNP ↑"
          ],
          [
            "T",
            "TECA (IECA)",
            "Início após IECA, seca irritativa, desaparece ao suspender"
          ],
          [
            "S",
            "SRGE (refluxo)",
            "Pós-prandial, noturna, azia, melhora com IBP"
          ]
        ]
      }
    ],
    "manobras": [
      {
        "title": "Peak flow (PEF)",
        "subtitle": "Diagnóstico de asma — variabilidade",
        "steps": [
          "Paciente em pé",
          "Inspiração máxima",
          "Soprar com força máxima no medidor",
          "Repetir 3x — registrar o maior valor"
        ],
        "normal": "PEF >80% do previsto",
        "abnormal": "<80% ou variabilidade >20% → obstrução brônquica → asma/DPOC"
      },
      {
        "title": "Ausculta pulmonar",
        "subtitle": "Padrões na tosse",
        "steps": [
          "6 pontos comparativos bilaterais",
          "Fase inspiratória e expiratória"
        ],
        "normal": "Murmúrio vesicular presente e simétrico",
        "abnormal": "Sibilos → broncoespasmo | Crepitantes focais → pneumonia | Bibasais → ICC"
      }
    ],
    "sinais": [
      {
        "name": "Sibilância expiratória",
        "eponym": "Broncoespasmo",
        "how": "Ruído musical na ausculta, expiração prolongada",
        "means": "Asma (reversível) ou DPOC (parcial) — Salbutamol para teste terapêutico"
      },
      {
        "name": "Dedos em baqueta",
        "eponym": "Hipoxemia crônica",
        "how": "Perda do ângulo de Lovibond >180° na base da unha",
        "means": "Doença pulmonar crônica, neoplasia, bronquiectasia — investigar com TC"
      }
    ],
    "ddx": [
      [
        "FPNS",
        "Sensação de catarro, piora deitado, rinite, melhora anti-histamínico",
        "Sibilância, febre, hemoptise"
      ],
      [
        "Asma",
        "Noturna, alérgenos, sibilância, variabilidade PEF, atopia",
        "Purulenta, febre, tabagista >40 anos"
      ],
      [
        "TECA",
        "Após IECA, seca irritativa, melhora suspendendo IECA",
        "Produtiva, febre, antes do IECA"
      ],
      [
        "DRGE",
        "Pós-prandial, noturna, azia, melhora IBP",
        "Sibilância, variabilidade, esforço"
      ],
      [
        "Pneumonia",
        "Produtiva purulenta, febre, dor pleurítica, Rx com infiltrado",
        "Crônica, seca, afebril, Rx normal"
      ],
      [
        "Neoplasia",
        "Tabagista >40 anos, hemoptise, perda peso, Rx com massa",
        "Jovem, sem tabagismo, Rx normal, >8 sem sem alarme"
      ]
    ],
    "escalas": [
      {
        "title": "Gravidade da crise de asma",
        "headers": [
          "Critério",
          "Leve",
          "Moderada",
          "Grave"
        ],
        "rows": [
          [
            "Dispneia",
            "Ao caminhar",
            "Em repouso",
            "Frases incompletas"
          ],
          [
            "FR",
            "<25",
            "25-30",
            ">30 irpm"
          ],
          [
            "Peak flow",
            ">70%",
            "50-70%",
            "<50%"
          ],
          [
            "SpO₂",
            ">95%",
            "91-95%",
            "<91%"
          ]
        ],
        "note": "Grave: Salbutamol+Ipratrópio+Corticóide EV+O₂; Sem melhora → UTI"
      }
    ],
    "conduta": {
      "exames": [
        "Rx tórax PA",
        "Peak flow",
        "Espirometria (crônico)",
        "Hemograma + PCR",
        "TC tórax (suspeita neoplasia ou bronquiectasia)",
        "Cultura escarro (pneumonia grave)"
      ],
      "drugs": [
        "Asma leve-mod: Salbutamol 2,5-5mg nebulização ou spray",
        "Asma grave: Prednisolona 40-50mg/dia VO x5 dias",
        "Pneumonia comunitária: Amoxicilina 500mg 8/8h x7d",
        "IECA: Suspender → BRA (losartana)",
        "DRGE: Omeprazol 20-40mg antes café"
      ],
      "steps": [
        "1. Aguda (<3sem), subaguda (3-8sem) ou crônica (>8sem)?",
        "2. Alarme: hemoptise, perda peso, tabagismo, febre persistente, massa Rx",
        "3. Rx tórax para todos",
        "4. FACTS — tratar causa mais provável",
        "5. Crônica persistente: espirometria + TC tórax"
      ]
    }
  },
  "trauma-abdominal": {
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
  }
};

// Aliases: motivos que herdam o guia clínico de outro (definido uma única vez)
GUIDE_CONTENT["semio-peso"] = GUIDE_CONTENT["perda-peso"];
