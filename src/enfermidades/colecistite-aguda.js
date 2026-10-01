// Enfermidade: colecistite aguda e colelitíase — fonte canônica (editar AQUI; rodar scripts/build.js)
// STATUS: RASCUNHO. Escrito a partir do guia clínico já existente em src/motivos/colecistite-colelitiase.js
// e de conhecimento geral. NADA foi conferido contra os livros: refs com verificada:false.
// Doses ficam no guia do motivo até terem refs; aqui só a classe do fármaco.
AM.enfermidade("colecistite-aguda", {
  "name": "Colecistite aguda e colelitíase",
  "nameEs": "Colecistitis aguda y colelitiasis",
  "especialidade": "cirurgia",
  "cid10": ["K80", "K81"],
  "cie10": ["K80", "K81"],
  "motivos": ["colecistite-colelitiase", "dor-abdominal", "nauseas-vomitos"],

  "definicao": "Colelitíase é a presença de cálculos na vesícula biliar. Cólica biliar é a dor causada pela obstrução transitória do ducto cístico. Colecistite aguda é a inflamação da vesícula, em geral por obstrução persistente do ducto cístico por cálculo.",
  "definicaoEs": "Colelitiasis es la presencia de cálculos en la vesícula biliar. Cólico biliar es el dolor causado por la obstrucción transitoria del conducto cístico. Colecistitis aguda es la inflamación de la vesícula, en general por obstrucción persistente del conducto cístico por un cálculo.",

  "epidemiologia": "A colelitíase é frequente e muitas vezes assintomática. Os fatores de risco clássicos são sexo feminino, idade em torno de 40 anos, obesidade, multiparidade e história familiar (os 5 F). A colecistite aguda é a complicação mais comum da colelitíase sintomática.",
  "epidemiologiaEs": "La colelitiasis es frecuente y a menudo asintomática. Los factores de riesgo clásicos son sexo femenino, edad alrededor de 40 años, obesidad, multiparidad y antecedentes familiares (las 5 F). La colecistitis aguda es la complicación más común de la colelitiasis sintomática.",

  "fisiopatologia": "A obstrução do ducto cístico por um cálculo aumenta a pressão intravesicular, com distensão, isquemia e inflamação da parede. A estase favorece a proliferação bacteriana. Sem tratamento, pode haver necrose, perfuração, empiema e peritonite biliar. A migração do cálculo para a via biliar causa coledocolitíase, colangite e pancreatite biliar.",
  "fisiopatologiaEs": "La obstrucción del conducto cístico por un cálculo aumenta la presión intravesicular, con distensión, isquemia e inflamación de la pared. La estasis favorece la proliferación bacteriana. Sin tratamiento, puede haber necrosis, perforación, empiema y peritonitis biliar. La migración del cálculo a la vía biliar causa coledocolitiasis, colangitis y pancreatitis biliar.",

  "quadroClinico": {
    "sintomas": [
      "Cólica biliar: dor no hipocôndrio direito ou epigástrio, em geral após refeição gordurosa, que dura de 30 minutos a algumas horas e cede sozinha",
      "Colecistite: dor no hipocôndrio direito que persiste por mais de 6 horas",
      "Náuseas e vômitos",
      "Febre na colecistite"
    ],
    "sintomasEs": [
      "Cólico biliar: dolor en el hipocondrio derecho o epigastrio, en general tras una comida grasa, que dura de 30 minutos a algunas horas y cede solo",
      "Colecistitis: dolor en el hipocondrio derecho que persiste por más de 6 horas",
      "Náuseas y vómitos",
      "Fiebre en la colecistitis"
    ],
    "sinais": [
      "Sinal de Murphy: parada da inspiração durante a palpação do hipocôndrio direito",
      "Dor, defesa ou massa palpável no hipocôndrio direito",
      "Cólica biliar: exame abdominal sem sinais de inflamação fora do episódio"
    ],
    "sinaisEs": [
      "Signo de Murphy: detención de la inspiración durante la palpación del hipocondrio derecho",
      "Dolor, defensa o masa palpable en el hipocondrio derecho",
      "Cólico biliar: examen abdominal sin signos de inflamación fuera del episodio"
    ],
    "formasAtipicas": [
      "Idosos, diabéticos e imunossuprimidos podem ter poucos sinais e evoluir com complicação",
      "Icterícia, colúria e febre com calafrios sugerem coledocolitíase ou colangite (tríade de Charcot)"
    ],
    "formasAtipicasEs": [
      "Ancianos, diabéticos e inmunosuprimidos pueden tener pocos signos y evolucionar con complicación",
      "Ictericia, coluria y fiebre con escalofríos sugieren coledocolitiasis o colangitis (tríada de Charcot)"
    ]
  },

  "diagnostico": {
    "criterios": [
      "Diretrizes de Tóquio 2018: sinal local de inflamação (Murphy; dor, defesa ou massa em hipocôndrio direito) + sinal sistêmico (febre, leucocitose, PCR elevada) + imagem compatível. Suspeita: sinal local + sistêmico; diagnóstico definitivo: com imagem",
      "Gravidade (Tóquio 2018): grau I leve, grau II moderada (leucócitos acima de 18.000, massa palpável, mais de 72 h, inflamação local marcada) e grau III grave (disfunção de órgão)",
      "Coledocolitíase: risco por critérios da ASGE (cálculo no colédoco à imagem, colangite clínica, bilirrubina total acima de 4 mg/dL com via biliar dilatada)"
    ],
    "criteriosEs": [
      "Guías de Tokio 2018: signo local de inflamación (Murphy; dolor, defensa o masa en hipocondrio derecho) + signo sistémico (fiebre, leucocitosis, PCR elevada) + imagen compatible. Sospecha: signo local + sistémico; diagnóstico definitivo: con imagen",
      "Gravedad (Tokio 2018): grado I leve, grado II moderada (leucocitos por encima de 18.000, masa palpable, más de 72 h, inflamación local marcada) y grado III grave (disfunción de órgano)",
      "Coledocolitiasis: riesgo según criterios de la ASGE (cálculo en el colédoco en la imagen, colangitis clínica, bilirrubina total por encima de 4 mg/dL con vía biliar dilatada)"
    ],
    "exames": [
      { "nome": "Ultrassonografia de abdome", "nomeEs": "Ecografía abdominal",
        "achado": "Cálculos, espessamento da parede, líquido perivesicular, Murphy ultrassonográfico, calibre do colédoco", "achadoEs": "Cálculos, engrosamiento de la pared, líquido perivesicular, Murphy ecográfico, calibre del colédoco",
        "quando": "Primeiro exame de imagem", "quandoEs": "Primer examen de imagen" },
      { "nome": "Hemograma e PCR", "nomeEs": "Hemograma y PCR",
        "achado": "Leucocitose e PCR elevada na colecistite", "achadoEs": "Leucocitosis y PCR elevada en la colecistitis",
        "quando": "Em todo caso suspeito", "quandoEs": "En todo caso sospechoso" },
      { "nome": "Bilirrubinas, FA, GGT, TGO, TGP", "nomeEs": "Bilirrubinas, FA, GGT, TGO, TGP",
        "achado": "Padrão colestático sugere obstrução da via biliar", "achadoEs": "Patrón colestásico sugiere obstrucción de la vía biliar",
        "quando": "Para avaliar coledocolitíase e colangite", "quandoEs": "Para evaluar coledocolitiasis y colangitis" },
      { "nome": "Amilase e lipase", "nomeEs": "Amilasa y lipasa",
        "achado": "Elevação sugere pancreatite biliar", "achadoEs": "Elevación sugiere pancreatitis biliar",
        "quando": "Dor epigástrica ou suspeita de pancreatite", "quandoEs": "Dolor epigástrico o sospecha de pancreatitis" },
      { "nome": "Colangiorressonância ou ultrassonografia endoscópica", "nomeEs": "Colangiorresonancia o ecografía endoscópica",
        "achado": "Pesquisam cálculo no colédoco", "achadoEs": "Buscan cálculo en el colédoco",
        "quando": "Risco intermediário de coledocolitíase", "quandoEs": "Riesgo intermedio de coledocolitiasis" }
    ],
    "diferenciais": [
      { "id": "pancreatite-aguda", "pista": "Dor epigástrica em faixa, lipase muito elevada", "pistaEs": "Dolor epigástrico en barra, lipasa muy elevada" },
      { "id": "apendicite-aguda", "pista": "Apêndice alto (gestante) ou dor que migra para a fossa ilíaca direita", "pistaEs": "Apéndice alto (gestante) o dolor que migra a la fosa ilíaca derecha" },
      { "nome": "Úlcera péptica perfurada", "nomeEs": "Úlcera péptica perforada", "pista": "Dor súbita, abdome em tábua, pneumoperitônio", "pistaEs": "Dolor súbito, abdomen en tabla, neumoperitoneo" },
      { "nome": "Hepatite aguda", "nomeEs": "Hepatitis aguda", "pista": "Transaminases muito elevadas, icterícia, astenia", "pistaEs": "Transaminasas muy elevadas, ictericia, astenia" },
      { "nome": "Colangite aguda", "nomeEs": "Colangitis aguda", "pista": "Tríade de Charcot: febre, icterícia e dor em hipocôndrio direito", "pistaEs": "Tríada de Charcot: fiebre, ictericia y dolor en hipocondrio derecho" },
      { "nome": "Síndrome coronariana aguda", "nomeEs": "Síndrome coronario agudo", "pista": "Dor epigástrica com sudorese, ECG alterado, troponina elevada", "pistaEs": "Dolor epigástrico con sudoración, ECG alterado, troponina elevada" }
    ]
  },

  "tratamento": {
    "medidas": [
      "Jejum, hidratação venosa e analgesia",
      "Antieméticos conforme a necessidade",
      "Cólica biliar sem complicação: analgesia e programação de colecistectomia eletiva",
      "Avaliar a gravidade (Tóquio 2018) e a presença de coledocolitíase ou colangite"
    ],
    "medidasEs": [
      "Ayuno, hidratación intravenosa y analgesia",
      "Antieméticos según la necesidad",
      "Cólico biliar sin complicación: analgesia y programación de colecistectomía electiva",
      "Evaluar la gravedad (Tokio 2018) y la presencia de coledocolitiasis o colangitis"
    ],
    "farmacologico": [
      { "classe": "Analgésicos (AINE, opioide se dor intensa) e antieméticos", "classeEs": "Analgésicos (AINE, opioide si dolor intenso) y antieméticos", "nota": "Sintomáticos; doses a preencher com referência", "notaEs": "Sintomáticos; dosis a completar con referencia", "refs": [0, 1] },
      { "classe": "Antibióticos", "classeEs": "Antibióticos", "nota": "Indicados na colecistite e na colangite (por exemplo, cefalosporina de 3ª geração associada a metronidazol). Esquema e duração a preencher com referência", "notaEs": "Indicados en la colecistitis y en la colangitis (por ejemplo, cefalosporina de 3.ª generación asociada a metronidazol). Esquema y duración a completar con referencia", "refs": [1, 2] }
    ],
    "cirurgico": [
      "Colecistectomia videolaparoscópica precoce na colecistite aguda, em centro com experiência; o prazo ideal segue a diretriz [conferir]",
      "Colecistite grave (grau III) ou paciente de alto risco: suporte de órgão e drenagem da vesícula (colecistostomia) ou colecistectomia conforme a condição",
      "Coledocolitíase ou colangite: desobstrução por CPRE e colecistectomia posterior"
    ],
    "cirurgicoEs": [
      "Colecistectomía videolaparoscópica precoz en la colecistitis aguda, en un centro con experiencia; el plazo ideal sigue la guía [verificar]",
      "Colecistitis grave (grado III) o paciente de alto riesgo: soporte de órgano y drenaje de la vesícula (colecistostomía) o colecistectomía según la condición",
      "Coledocolitiasis o colangitis: desobstrucción por CPRE y colecistectomía posterior"
    ],
    "encaminhar": "Colecistite, colangite ou suspeita de coledocolitíase vão à avaliação cirúrgica no mesmo atendimento.",
    "encaminharEs": "Colecistitis, colangitis o sospecha de coledocolitiasis pasan a evaluación quirúrgica en la misma atención."
  },

  "complicacoes": ["Empiema e gangrena da vesícula", "Perfuração e peritonite biliar", "Coledocolitíase e colangite", "Pancreatite biliar", "Íleo biliar", "Síndrome de Mirizzi"],
  "complicacoesEs": ["Empiema y gangrena de la vesícula", "Perforación y peritonitis biliar", "Coledocolitiasis y colangitis", "Pancreatitis biliar", "Íleo biliar", "Síndrome de Mirizzi"],
  "prognostico": "Bom com tratamento precoce e colecistectomia. O risco aumenta com idade avançada, comorbidades, atraso e complicações biliares.",
  "prognosticoEs": "Bueno con tratamiento precoz y colecistectomía. El riesgo aumenta con la edad avanzada, comorbilidades, retraso y complicaciones biliares.",
  "sinaisAlarme": ["Febre com calafrios e icterícia (colangite)", "Hipotensão ou sinais de sepse", "Dor muito intensa com defesa difusa", "Alteração do nível de consciência"],
  "sinaisAlarmeEs": ["Fiebre con escalofríos e ictericia (colangitis)", "Hipotensión o signos de sepsis", "Dolor muy intenso con defensa difusa", "Alteración del nivel de conciencia"],

  "casos": [
    {
      "titulo": "Dor no lado direito depois do jantar",
      "tituloEs": "Dolor en el lado derecho después de la cena",
      "nivel": "basico",
      "apresentacao": "Mulher de 52 anos, obesa, com dor no lado direito e na parte alta do abdome há 2 dias, que começou depois de um jantar gorduroso. A dor não passa há mais de 6 horas, com náuseas e febre. Caso fictício.",
      "apresentacaoEs": "Mujer de 52 años, obesa, con dolor en el lado derecho y en la parte alta del abdomen desde hace 2 días, que comenzó después de una cena grasa. El dolor no cede desde hace más de 6 horas, con náuseas y fiebre. Caso ficticio.",
      "etapas": [
        {
          "dados": "Temperatura 38,2 °C. Dor à palpação do hipocôndrio direito, com parada da inspiração durante a palpação.",
          "dadosEs": "Temperatura 38,2 °C. Dolor a la palpación del hipocondrio derecho, con detención de la inspiración durante la palpación.",
          "pergunta": "Qual é o sinal descrito no exame físico?",
          "perguntaEs": "¿Cuál es el signo descrito en el examen físico?",
          "opcoes": ["Sinal de Blumberg", "Sinal de Murphy", "Sinal de Rovsing", "Sinal de Courvoisier"],
          "opcoesEs": ["Signo de Blumberg", "Signo de Murphy", "Signo de Rovsing", "Signo de Courvoisier"],
          "correta": 1,
          "comentario": "A parada da inspiração durante a palpação do hipocôndrio direito é o sinal de Murphy, típico da colecistite aguda.",
          "comentarioEs": "La detención de la inspiración durante la palpación del hipocondrio derecho es el signo de Murphy, típico de la colecistitis aguda."
        },
        {
          "dados": "Leucócitos 15.000/mm³. Ultrassonografia: cálculos na vesícula, parede espessada e líquido ao redor. Bilirrubinas normais.",
          "dadosEs": "Leucocitos 15.000/mm³. Ecografía: cálculos en la vesícula, pared engrosada y líquido alrededor. Bilirrubinas normales.",
          "pergunta": "Qual é a conduta mais adequada?",
          "perguntaEs": "¿Cuál es la conducta más adecuada?",
          "opcoes": ["Alta com analgésico e dieta sem gordura", "Jejum, hidratação, analgesia, antibiótico e avaliação para colecistectomia precoce", "CPRE de urgência", "Apenas observação por uma semana"],
          "opcoesEs": ["Alta con analgésico y dieta sin grasa", "Ayuno, hidratación, analgesia, antibiótico y evaluación para colecistectomía precoz", "CPRE de urgencia", "Solo observación por una semana"],
          "correta": 1,
          "comentario": "Sinais locais, sistêmicos e imagem compatível indicam colecistite aguda. A CPRE é reservada à suspeita de coledocolitíase ou colangite, o que não há aqui.",
          "comentarioEs": "Los signos locales, sistémicos y la imagen compatible indican colecistitis aguda. La CPRE se reserva para la sospecha de coledocolitiasis o colangitis, que aquí no hay."
        }
      ],
      "diagnostico": "colecistite-aguda",
      "perolas": ["Dor biliar que passa em poucas horas é cólica; se persiste e vem com febre, pense em colecistite.", "Icterícia com febre e dor no hipocôndrio direito é colangite até prova em contrário."],
      "perolasEs": ["El dolor biliar que cede en pocas horas es cólico; si persiste y se acompaña de fiebre, piense en colecistitis.", "Ictericia con fiebre y dolor en hipocondrio derecho es colangitis hasta que se demuestre lo contrario."]
    }
  ],

  "refs": [
    { "tipo": "livro", "citacao": "Townsend CM et al. Sabiston Textbook of Surgery (vesícula e vias biliares). Edição mais recente usada pelo dono.", "localizacao": "[conferir capítulo/página]", "verificada": false },
    { "tipo": "diretriz", "citacao": "Yokoe M et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis (with videos). J Hepatobiliary Pancreat Sci 2018;25:41-54.", "localizacao": "[conferir]", "ano": 2018, "verificada": false },
    { "tipo": "diretriz", "citacao": "Pisano M et al. 2020 World Society of Emergency Surgery updated guidelines for the diagnosis and treatment of acute calculus cholecystitis. World J Emerg Surg 2020;15:61.", "localizacao": "[conferir]", "ano": 2020, "verificada": false }
  ],
  "status": "rascunho",
  "revisadoEm": "",
  "revisor": ""
});
