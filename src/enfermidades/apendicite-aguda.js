// Enfermidade: apendicite aguda — fonte canônica (editar AQUI; rodar scripts/build.js)
// STATUS: RASCUNHO. Escrito a partir do guia clínico já existente em src/motivos/apendicite.js
// (escalas, manobras, conduta) e de conhecimento geral. NADA aqui foi conferido contra os livros:
// todas as refs estão com verificada:false até o dono e o revisor confirmarem edição/página.
// Doses ficam no guia do motivo até terem refs; aqui só a classe do fármaco.
AM.enfermidade("apendicite-aguda", {
  "name": "Apendicite aguda",
  "nameEs": "Apendicitis aguda",
  "especialidade": "cirurgia",
  "cid10": ["K35"],
  "cie10": ["K35"],
  "motivos": ["apendicite", "dor-abdominal"],

  "definicao": "Inflamação aguda do apêndice vermiforme, geralmente por obstrução da luz, com risco de necrose, perfuração e peritonite.",
  "definicaoEs": "Inflamación aguda del apéndice vermiforme, generalmente por obstrucción de la luz, con riesgo de necrosis, perforación y peritonitis.",

  "epidemiologia": "Causa mais comum de abdome agudo cirúrgico. Pode ocorrer em qualquer idade, com maior frequência entre a segunda e a terceira décadas de vida.",
  "epidemiologiaEs": "Causa más común de abdomen agudo quirúrgico. Puede ocurrir a cualquier edad, con mayor frecuencia entre la segunda y la tercera décadas de la vida.",

  "fisiopatologia": "A obstrução da luz (fecalito, hiperplasia linfoide, outras causas) leva ao acúmulo de muco, aumento da pressão intraluminal e distensão. Segue-se comprometimento do retorno venoso e linfático, proliferação bacteriana, isquemia da parede, necrose e, se não tratada, perfuração com peritonite localizada ou difusa. A dor visceral inicial, periumbilical, passa a somática e localizada na fossa ilíaca direita quando o peritônio parietal é irritado.",
  "fisiopatologiaEs": "La obstrucción de la luz (fecalito, hiperplasia linfoide, otras causas) lleva a acumulación de moco, aumento de la presión intraluminal y distensión. Sigue el compromiso del retorno venoso y linfático, proliferación bacteriana, isquemia de la pared, necrosis y, si no se trata, perforación con peritonitis localizada o difusa. El dolor visceral inicial, periumbilical, pasa a somático y localizado en la fosa ilíaca derecha cuando se irrita el peritoneo parietal.",

  "quadroClinico": {
    "sintomas": [
      "Dor periumbilical ou epigástrica que migra para a fossa ilíaca direita",
      "Anorexia",
      "Náuseas e vômitos, que surgem após o início da dor",
      "Febre baixa"
    ],
    "sintomasEs": [
      "Dolor periumbilical o epigástrico que migra a la fosa ilíaca derecha",
      "Anorexia",
      "Náuseas y vómitos, que aparecen después del inicio del dolor",
      "Fiebre baja"
    ],
    "sinais": [
      "Dor à palpação na fossa ilíaca direita (ponto de McBurney)",
      "Sinal de Blumberg (dor à descompressão brusca)",
      "Sinal de Rovsing",
      "Sinais do psoas e do obturador, conforme a posição do apêndice",
      "Defesa e rigidez abdominal na peritonite"
    ],
    "sinaisEs": [
      "Dolor a la palpación en la fosa ilíaca derecha (punto de McBurney)",
      "Signo de Blumberg (dolor a la descompresión brusca)",
      "Signo de Rovsing",
      "Signos del psoas y del obturador, según la posición del apéndice",
      "Defensa y rigidez abdominal en la peritonitis"
    ],
    "formasAtipicas": [
      "Apêndice retrocecal ou pélvico: dor menos localizada, com sinal do psoas ou do obturador",
      "Idosos, crianças e gestantes: apresentação menos típica e diagnóstico mais tardio"
    ],
    "formasAtipicasEs": [
      "Apéndice retrocecal o pélvico: dolor menos localizado, con signo del psoas o del obturador",
      "Ancianos, niños y gestantes: presentación menos típica y diagnóstico más tardío"
    ]
  },

  "diagnostico": {
    "criterios": [
      "Diagnóstico clínico apoiado em escores (Alvarado, AIR) e exames de imagem",
      "Alvarado: soma de 10 pontos (migração da dor, anorexia, náuseas/vômitos, dor em FID, Blumberg, febre, leucocitose, desvio à esquerda)"
    ],
    "criteriosEs": [
      "Diagnóstico clínico apoyado en escalas (Alvarado, AIR) y estudios de imagen",
      "Alvarado: suma de 10 puntos (migración del dolor, anorexia, náuseas/vómitos, dolor en FID, Blumberg, fiebre, leucocitosis, desviación a la izquierda)"
    ],
    "exames": [
      { "nome": "Hemograma e PCR", "nomeEs": "Hemograma y PCR",
        "achado": "Leucocitose com desvio à esquerda e PCR elevada", "achadoEs": "Leucocitosis con desviación a la izquierda y PCR elevada",
        "quando": "Em todo caso suspeito", "quandoEs": "En todo caso sospechoso" },
      { "nome": "β-HCG", "nomeEs": "β-HCG",
        "achado": "Resultado negativo afasta gravidez; positivo exige investigar gravidez ectópica", "achadoEs": "Resultado negativo descarta embarazo; positivo exige investigar embarazo ectópico",
        "quando": "Mulheres em idade fértil", "quandoEs": "Mujeres en edad fértil" },
      { "nome": "Ultrassonografia abdominal", "nomeEs": "Ecografía abdominal",
        "achado": "Apêndice não compressível e aumentado de calibre, líquido periapendicular", "achadoEs": "Apéndice no compresible y aumentado de calibre, líquido periapendicular",
        "quando": "Primeira linha, sobretudo em crianças e gestantes", "quandoEs": "Primera línea, sobre todo en niños y gestantes" },
      { "nome": "TC de abdome e pelve com contraste", "nomeEs": "TC de abdomen y pelvis con contraste",
        "achado": "Apêndice espessado, densificação da gordura, apendicolito, abscesso", "achadoEs": "Apéndice engrosado, densificación de la grasa, apendicolito, absceso",
        "quando": "Dúvida diagnóstica após avaliação clínica e USG", "quandoEs": "Duda diagnóstica tras la evaluación clínica y la ecografía" }
    ],
    "diferenciais": [
      { "id": "colecistite-colelitiase", "pista": "Dor em hipocôndrio direito, sinal de Murphy", "pistaEs": "Dolor en hipocondrio derecho, signo de Murphy" },
      { "id": "pancreatite-aguda", "pista": "Dor epigástrica em barra, amilase/lipase elevadas", "pistaEs": "Dolor epigástrico en barra, amilasa/lipasa elevadas" },
      { "id": "oclusao-intestinal", "pista": "Distensão, vômitos precoces, parada de eliminação de fezes e gases", "pistaEs": "Distensión, vómitos precoces, detención de eliminación de heces y gases" },
      { "id": "doenca-diverticular", "pista": "Dor em fossa ilíaca esquerda (mais comum), idade mais avançada", "pistaEs": "Dolor en fosa ilíaca izquierda (más común), edad más avanzada" },
      { "nome": "Gastroenterite", "nomeEs": "Gastroenteritis", "pista": "Diarreia e vômitos antes da dor, dor difusa", "pistaEs": "Diarrea y vómitos antes del dolor, dolor difuso" },
      { "nome": "Cólica ureteral", "nomeEs": "Cólico ureteral", "pista": "Dor lombar que irradia, hematúria, paciente agitado", "pistaEs": "Dolor lumbar que irradia, hematuria, paciente agitado" },
      { "nome": "Doença inflamatória pélvica", "nomeEs": "Enfermedad inflamatoria pélvica", "pista": "Mulher, dor bilateral, corrimento, dor à mobilização do colo", "pistaEs": "Mujer, dolor bilateral, flujo, dolor a la movilización del cuello" },
      { "nome": "Gravidez ectópica", "nomeEs": "Embarazo ectópico", "pista": "β-HCG positivo, atraso menstrual, instabilidade", "pistaEs": "β-HCG positivo, retraso menstrual, inestabilidad" }
    ]
  },

  "tratamento": {
    "medidas": [
      "Jejum, acesso venoso e hidratação",
      "Analgesia (não atrasa nem prejudica o diagnóstico)",
      "Avaliação do cirurgião e indicação conforme o escore e a imagem"
    ],
    "medidasEs": [
      "Ayuno, acceso venoso e hidratación",
      "Analgesia (no retrasa ni perjudica el diagnóstico)",
      "Evaluación del cirujano e indicación según la escala y la imagen"
    ],
    "farmacologico": [
      { "classe": "Analgésicos e antieméticos", "classeEs": "Analgésicos y antieméticos", "nota": "Sintomáticos; doses a preencher com referência", "notaEs": "Sintomáticos; dosis a completar con referencia", "refs": [0, 1] },
      { "classe": "Antibióticos", "classeEs": "Antibióticos", "nota": "Profilaxia pré-operatória; terapêutico na forma complicada (perfurada). Esquema e doses a preencher com referência", "notaEs": "Profilaxis preoperatoria; terapéutico en la forma complicada (perforada). Esquema y dosis a completar con referencia", "refs": [1] }
    ],
    "cirurgico": [
      "Apendicectomia, preferencialmente por via laparoscópica, nos casos confirmados ou de alta probabilidade",
      "Forma perfurada ou com abscesso: antibioticoterapia e abordagem conforme a gravidade",
      "Tratamento não operatório com antibióticos pode ser considerado em casos selecionados de apendicite não complicada, com risco de recorrência; decisão compartilhada com o paciente [conferir na diretriz WSES e nos livros]"
    ],
    "cirurgicoEs": [
      "Apendicectomía, preferentemente por vía laparoscópica, en los casos confirmados o de alta probabilidad",
      "Forma perforada o con absceso: antibioticoterapia y abordaje según la gravedad",
      "El tratamiento no operatorio con antibióticos puede considerarse en casos seleccionados de apendicitis no complicada, con riesgo de recurrencia; decisión compartida con el paciente [verificar en la guía WSES y en los libros]"
    ],
    "encaminhar": "Todo caso suspeito vai à avaliação cirúrgica no mesmo atendimento.",
    "encaminharEs": "Todo caso sospechoso pasa a evaluación quirúrgica en la misma atención."
  },

  "complicacoes": ["Perfuração", "Peritonite localizada ou difusa", "Abscesso apendicular", "Sepse", "Infecção de sítio cirúrgico"],
  "complicacoesEs": ["Perforación", "Peritonitis localizada o difusa", "Absceso apendicular", "Sepsis", "Infección del sitio quirúrgico"],
  "prognostico": "Bom quando o diagnóstico e o tratamento são precoces; morbidade e mortalidade aumentam com a perfuração e o atraso.",
  "prognosticoEs": "Bueno cuando el diagnóstico y el tratamiento son precoces; la morbimortalidad aumenta con la perforación y el retraso.",
  "sinaisAlarme": ["Rigidez abdominal em tábua", "Instabilidade hemodinâmica", "Dor que piora ao mínimo movimento", "Febre alta com piora clínica"],
  "sinaisAlarmeEs": ["Abdomen en tabla", "Inestabilidad hemodinámica", "Dolor que empeora con el mínimo movimiento", "Fiebre alta con empeoramiento clínico"],

  "casos": [
    {
      "titulo": "Dor abdominal que mudou de lugar",
      "tituloEs": "Dolor abdominal que cambió de lugar",
      "nivel": "basico",
      "apresentacao": "Paciente de 22 anos, sexo masculino, previamente hígido, com dor abdominal há 24 horas. Começou ao redor do umbigo, com perda de apetite, e há 8 horas está localizada no lado direito do abdome. Teve dois vômitos depois do início da dor. Sem diarreia. Caso fictício.",
      "apresentacaoEs": "Paciente de 22 años, sexo masculino, previamente sano, con dolor abdominal desde hace 24 horas. Comenzó alrededor del ombligo, con pérdida de apetito, y desde hace 8 horas está localizado en el lado derecho del abdomen. Tuvo dos vómitos después del inicio del dolor. Sin diarrea. Caso ficticio.",
      "etapas": [
        {
          "dados": "Temperatura 37,8 °C. Abdome com dor à palpação na fossa ilíaca direita e dor à descompressão brusca neste ponto.",
          "dadosEs": "Temperatura 37,8 °C. Abdomen con dolor a la palpación en la fosa ilíaca derecha y dolor a la descompresión brusca en ese punto.",
          "pergunta": "Qual é a hipótese diagnóstica mais provável?",
          "perguntaEs": "¿Cuál es la hipótesis diagnóstica más probable?",
          "opcoes": ["Gastroenterite aguda", "Apendicite aguda", "Cólica ureteral", "Pancreatite aguda"],
          "opcoesEs": ["Gastroenteritis aguda", "Apendicitis aguda", "Cólico ureteral", "Pancreatitis aguda"],
          "correta": 1,
          "comentario": "A dor que migra do umbigo para a fossa ilíaca direita, a anorexia, os vômitos após a dor e a dor à descompressão localizada formam o quadro clássico.",
          "comentarioEs": "El dolor que migra del ombligo a la fosa ilíaca derecha, la anorexia, los vómitos después del dolor y el dolor a la descompresión localizado forman el cuadro clásico."
        },
        {
          "dados": "Leucócitos 14.000/mm³ com desvio à esquerda. Ultrassonografia: apêndice não compressível, com 9 mm de diâmetro e líquido ao redor.",
          "dadosEs": "Leucocitos 14.000/mm³ con desviación a la izquierda. Ecografía: apéndice no compresible, de 9 mm de diámetro y líquido alrededor.",
          "pergunta": "Qual é a conduta?",
          "perguntaEs": "¿Cuál es la conducta?",
          "opcoes": ["Alta com analgésico e retorno se piorar", "Avaliação cirúrgica para apendicectomia", "Observação por uma semana", "Colonoscopia ambulatorial"],
          "opcoesEs": ["Alta con analgésico y regreso si empeora", "Evaluación quirúrgica para apendicectomía", "Observación por una semana", "Colonoscopia ambulatoria"],
          "correta": 1,
          "comentario": "Clínica típica, exames inflamatórios e imagem compatível indicam avaliação cirúrgica no mesmo atendimento.",
          "comentarioEs": "Clínica típica, exámenes inflamatorios e imagen compatible indican evaluación quirúrgica en la misma atención."
        }
      ],
      "diagnostico": "apendicite-aguda",
      "perolas": ["A ordem dos sintomas importa: anorexia e dor antes dos vômitos sugerem apendicite.", "Em mulher em idade fértil, sempre pedir β-HCG."],
      "perolasEs": ["El orden de los síntomas importa: anorexia y dolor antes de los vómitos sugieren apendicitis.", "En mujer en edad fértil, siempre pedir β-HCG."]
    }
  ],

  "refs": [
    { "tipo": "livro", "citacao": "Townsend CM et al. Sabiston Textbook of Surgery (apêndice). Edição mais recente usada pelo dono.", "localizacao": "[conferir capítulo/página]", "verificada": false },
    { "tipo": "diretriz", "citacao": "Di Saverio S et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg 2020;15:27.", "localizacao": "[conferir]", "ano": 2020, "verificada": false },
    { "tipo": "artigo", "citacao": "Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med 1986;15:557-564.", "localizacao": "[conferir]", "ano": 1986, "verificada": false },
    { "tipo": "artigo", "citacao": "Andersson M, Andersson RE. The appendicitis inflammatory response score: a tool for the diagnosis of acute appendicitis that outperforms the Alvarado score. World J Surg 2008;32:1843-1849.", "localizacao": "[conferir]", "ano": 2008, "verificada": false }
  ],
  "status": "rascunho",
  "revisadoEm": "",
  "revisor": ""
});
