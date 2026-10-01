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

  "definicao": "Colelitíase é a presença de cálculos na vesícula biliar. Cólica biliar é a dor causada pela obstrução transitória do ducto cístico. Colecistite aguda é a inflamação da vesícula, em geral por obstrução persistente do ducto cístico por cálculo. A colecistite acalculosa é uma entidade distinta, típica de pacientes graves.",
  "definicaoEs": "Colelitiasis es la presencia de cálculos en la vesícula biliar. Cólico biliar es el dolor causado por la obstrucción transitoria del conducto cístico. Colecistitis aguda es la inflamación de la vesícula, en general por obstrucción persistente del conducto cístico por un cálculo. La colecistitis alitiásica es una entidad distinta, típica de pacientes graves.",

  "epidemiologia": "A colelitíase é frequente e muitas vezes assintomática. Os fatores de risco clássicos são sexo feminino, idade em torno de 40 anos, obesidade, multiparidade e história familiar (mnemônico em inglês: os 5 F). Também contam cirrose, perda rápida de peso e uso de estrogênio ou contraceptivos orais. Entre os pacientes com cálculos sintomáticos, cerca de 1 a 4% ao ano evoluem com complicações [conferir]. A colecistite aguda é a complicação mais comum da colelitíase sintomática.",
  "epidemiologiaEs": "La colelitiasis es frecuente y a menudo asintomática. Los factores de riesgo clásicos son sexo femenino, edad alrededor de 40 años, obesidad, multiparidad y antecedentes familiares (mnemónico en inglés: las 5 F). También cuentan la cirrosis, la pérdida rápida de peso y el uso de estrógenos o anticonceptivos orales. Entre los pacientes con cálculos sintomáticos, alrededor del 1 al 4% al año evoluciona con complicaciones [verificar]. La colecistitis aguda es la complicación más común de la colelitiasis sintomática.",

  "fisiopatologia": "A obstrução do ducto cístico por um cálculo aumenta a pressão intravesicular, com distensão, isquemia e inflamação da parede. A estase favorece a proliferação bacteriana. Sem tratamento, pode haver necrose, perfuração, empiema e peritonite biliar. A migração do cálculo para a via biliar causa coledocolitíase, colangite e pancreatite biliar.",
  "fisiopatologiaEs": "La obstrucción del conducto cístico por un cálculo aumenta la presión intravesicular, con distensión, isquemia e inflamación de la pared. La estasis favorece la proliferación bacteriana. Sin tratamiento, puede haber necrosis, perforación, empiema y peritonitis biliar. La migración del cálculo a la vía biliar causa coledocolitiasis, colangitis y pancreatitis biliar.",

  "quadroClinico": {
    "sintomas": [
      "Cólica biliar: dor no hipocôndrio direito ou epigástrio, em geral após refeição gordurosa, que dura de 30 minutos a algumas horas e cede sozinha",
      "Colecistite: dor no hipocôndrio direito que em geral persiste por mais de 6 horas (a duração não é critério diagnóstico do Tóquio 2018)",
      "Náuseas e vômitos",
      "Febre na colecistite"
    ],
    "sintomasEs": [
      "Cólico biliar: dolor en el hipocondrio derecho o epigastrio, en general tras una comida grasa, que dura de 30 minutos a algunas horas y cede solo",
      "Colecistitis: dolor en el hipocondrio derecho que en general persiste por más de 6 horas (la duración no es criterio diagnóstico de Tokio 2018)",
      "Náuseas y vómitos",
      "Fiebre en la colecistitis"
    ],
    "sinais": [
      "Sinal de Murphy: parada da inspiração durante a palpação do hipocôndrio direito",
      "Dor, defesa ou massa palpável no hipocôndrio direito",
      "Cólica biliar: exame abdominal sem sinais de inflamação fora do episódio",
      "O Murphy isolado tem sensibilidade moderada: não afasta o diagnóstico"
    ],
    "sinaisEs": [
      "Signo de Murphy: detención de la inspiración durante la palpación del hipocondrio derecho",
      "Dolor, defensa o masa palpable en el hipocondrio derecho",
      "Cólico biliar: examen abdominal sin signos de inflamación fuera del episodio",
      "El Murphy aislado tiene sensibilidad moderada: no descarta el diagnóstico"
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
      "Gravidade (Tóquio 2018): grau I leve; grau II moderada (qualquer um: leucócitos acima de 18.000, massa palpável, mais de 72 h, inflamação local marcada); grau III grave (disfunção de órgão: hipotensão com vasopressor, alteração da consciência, PaO2/FiO2 abaixo de 300, oligúria ou creatinina acima de 2, INR acima de 1,5, plaquetas abaixo de 100.000) [conferir os limites]",
      "Colangite aguda (Tóquio 2018): inflamação sistêmica (A), colestase (B) e imagem (C); a tríade de Charcot é pouco sensível",
      "Coledocolitíase, alto risco (ASGE 2019): cálculo no colédoco à imagem, colangite clínica, bilirrubina total acima de 4 mg/dL com via biliar dilatada. Risco intermediário: testes hepáticos alterados, idade acima de 55 anos ou via biliar dilatada (colangiorressonância ou ecoendoscopia)"
    ],
    "criteriosEs": [
      "Guías de Tokio 2018: signo local de inflamación (Murphy; dolor, defensa o masa en hipocondrio derecho) + signo sistémico (fiebre, leucocitosis, PCR elevada) + imagen compatible. Sospecha: signo local + sistémico; diagnóstico definitivo: con imagen",
      "Gravedad (Tokio 2018): grado I leve; grado II moderada (cualquiera: leucocitos por encima de 18.000, masa palpable, más de 72 h, inflamación local marcada); grado III grave (disfunción de órgano: hipotensión con vasopresor, alteración de la conciencia, PaO2/FiO2 por debajo de 300, oliguria o creatinina por encima de 2, INR por encima de 1,5, plaquetas por debajo de 100.000) [verificar los límites]",
      "Colangitis aguda (Tokio 2018): inflamación sistémica (A), colestasis (B) e imagen (C); la tríada de Charcot es poco sensible",
      "Coledocolitiasis, alto riesgo (ASGE 2019): cálculo en el colédoco en la imagen, colangitis clínica, bilirrubina total por encima de 4 mg/dL con vía biliar dilatada. Riesgo intermedio: pruebas hepáticas alteradas, edad por encima de 55 años o vía biliar dilatada (colangiorresonancia o ecoendoscopia)"
    ],
    "exames": [
      { "nome": "Ultrassonografia de abdome", "nomeEs": "Ecografía abdominal",
        "achado": "Cálculos, espessamento da parede (≥4 mm no Tóquio 2018), distensão da vesícula, líquido perivesicular, sombras lineares, Murphy ultrassonográfico, calibre do colédoco", "achadoEs": "Cálculos, engrosamiento de la pared (≥4 mm en Tokio 2018), distensión de la vesícula, líquido perivesicular, sombras lineales, Murphy ecográfico, calibre del colédoco",
        "quando": "Primeiro exame de imagem", "quandoEs": "Primer examen de imagen" },
      { "nome": "Hemograma e PCR", "nomeEs": "Hemograma y PCR",
        "achado": "Leucocitose e PCR elevada na colecistite", "achadoEs": "Leucocitosis y PCR elevada en la colecistitis",
        "quando": "Em todo caso suspeito", "quandoEs": "En todo caso sospechoso" },
      { "nome": "Bilirrubinas, FA, GGT, TGO, TGP", "nomeEs": "Bilirrubinas, FA, GGT, AST, ALT",
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
      { "classe": "Analgésicos (AINE, opioide se dor intensa) e antieméticos", "classeEs": "Analgésicos (AINE, opioide si dolor intenso) y antieméticos", "nota": "Sintomáticos; doses a preencher com referência", "notaEs": "Sintomáticos; dosis a completar con referencia", "refs": [0] },
      { "classe": "Antibióticos", "classeEs": "Antibióticos", "nota": "A necessidade e a duração dependem da gravidade (Tóquio 2018), do local de aquisição (comunidade ou hospital) e do controle do foco: no grau I, curso curto ou dispensável se houver colecistectomia precoce; nos graus II e III, em geral cerca de 4 a 7 dias após o controle do foco [conferir]. Esquema usual: cefalosporina de 3ª geração associada a metronidazol. Esquema e doses a preencher com referência", "notaEs": "La necesidad y la duración dependen de la gravedad (Tokio 2018), del lugar de adquisición (comunidad u hospital) y del control del foco: en el grado I, curso corto o prescindible si hay colecistectomía precoz; en los grados II y III, en general alrededor de 4 a 7 días tras el control del foco [verificar]. Esquema usual: cefalosporina de 3.ª generación asociada a metronidazol. Esquema y dosis a completar con referencia", "refs": [4, 2] }
    ],
    "cirurgico": [
      "Colecistectomia videolaparoscópica precoce na colecistite aguda, em centro com experiência; precoce, em geral até 7 dias da admissão e 10 dias do início dos sintomas (WSES 2020); no Tóquio 2018, precoce nos graus I e II se índice de Charlson (CCI) ≤5 e ASA-PS ≤2; se a cirurgia precoce não for possível, após cerca de 6 semanas [conferir]",
      "Colecistite grave (grau III) ou paciente de alto risco: suporte de órgão e drenagem da vesícula (colecistostomia); colecistectomia só em centro avançado e em casos selecionados (CCI ≤3 e ASA-PS ≤2) [conferir]",
      "Coledocolitíase ou colangite: desobstrução por CPRE (urgente na colangite grau III; o prazo depende da gravidade [conferir]) e colecistectomia posterior"
    ],
    "cirurgicoEs": [
      "Colecistectomía videolaparoscópica precoz en la colecistitis aguda, en un centro con experiencia; precoz, en general hasta 7 días del ingreso y 10 días del inicio de los síntomas (WSES 2020); en Tokio 2018, precoz en los grados I y II si el índice de Charlson (CCI) es ≤5 y ASA-PS ≤2; si la cirugía precoz no es posible, tras unas 6 semanas [verificar]",
      "Colecistitis grave (grado III) o paciente de alto riesgo: soporte de órgano y drenaje de la vesícula (colecistostomía); colecistectomía solo en centro avanzado y en casos seleccionados (CCI ≤3 y ASA-PS ≤2) [verificar]",
      "Coledocolitiasis o colangitis: desobstrucción por CPRE (urgente en la colangitis grado III; el plazo depende de la gravedad [verificar]) y colecistectomía posterior"
    ],
    "encaminhar": "Colecistite, colangite ou suspeita de coledocolitíase vão à avaliação cirúrgica no mesmo atendimento.",
    "encaminharEs": "Colecistitis, colangitis o sospecha de coledocolitiasis pasan a evaluación quirúrgica en la misma atención."
  },

  "complicacoes": ["Empiema e gangrena da vesícula", "Perfuração e peritonite biliar", "Coledocolitíase e colangite", "Pancreatite biliar", "Íleo biliar", "Síndrome de Mirizzi", "Colecistite enfisematosa"],
  "complicacoesEs": ["Empiema y gangrena de la vesícula", "Perforación y peritonitis biliar", "Coledocolitiasis y colangitis", "Pancreatitis biliar", "Íleo biliar", "Síndrome de Mirizzi", "Colecistitis enfisematosa"],
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
          "opcoes": ["Alta com analgésico e dieta sem gordura", "Jejum, hidratação, analgesia e avaliação para colecistectomia precoce, com antibiótico conforme a gravidade", "CPRE de urgência", "Apenas observação por uma semana"],
          "opcoesEs": ["Alta con analgésico y dieta sin grasa", "Ayuno, hidratación, analgesia y evaluación para colecistectomía precoz, con antibiótico según la gravedad", "CPRE de urgencia", "Solo observación por una semana"],
          "correta": 1,
          "comentario": "Sinais locais, sistêmicos e imagem compatível indicam colecistite aguda, aqui de grau I no Tóquio 2018 (leucócitos abaixo de 18.000 e menos de 72 h): o antibiótico pode ser curto ou dispensável se a colecistectomia for precoce. A CPRE é reservada à suspeita de coledocolitíase ou colangite, o que não há aqui.",
          "comentarioEs": "Los signos locales, sistémicos y la imagen compatible indican colecistitis aguda, aquí de grado I en Tokio 2018 (leucocitos por debajo de 18.000 y menos de 72 h): el antibiótico puede ser corto o prescindible si la colecistectomía es precoz. La CPRE se reserva para la sospecha de coledocolitiasis o colangitis, que aquí no hay."
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
    { "tipo": "diretriz", "citacao": "Pisano M et al. 2020 World Society of Emergency Surgery updated guidelines for the diagnosis and treatment of acute calculus cholecystitis. World J Emerg Surg 2020;15:61.", "localizacao": "[conferir]", "ano": 2020, "verificada": false },
    { "tipo": "diretriz", "citacao": "Buxbaum JL et al. ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis. Gastrointest Endosc 2019;89:1075-1105.", "localizacao": "[conferir]", "ano": 2019, "verificada": false },
    { "tipo": "diretriz", "citacao": "Gomi H et al. Tokyo Guidelines 2018: antimicrobial therapy for acute cholangitis and cholecystitis. J Hepatobiliary Pancreat Sci 2018;25:3-16.", "localizacao": "[conferir]", "ano": 2018, "verificada": false }
  ],
  "status": "rascunho",
  "revisadoEm": "",
  "revisor": ""
});
