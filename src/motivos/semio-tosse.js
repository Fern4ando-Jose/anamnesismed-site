// Motivo: semio-tosse — fonte canônica (editar AQUI; rodar scripts/build.js)
AM.motivo("semio-tosse", {
  "name": "Tosse",
  "nameEs": "Tos",
  "icon": "😮‍💨",
  "color": "mc-primary",
  "rasHighlight": [
    "resp",
    "cabeca"
  ],
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
  "guideFrom": "tosse"
});
