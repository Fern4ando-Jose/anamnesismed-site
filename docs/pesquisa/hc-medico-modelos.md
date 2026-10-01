# HC enxuta do médico: modelos reais, normas e proposta (BR e ES)

Data da pesquisa: 2026-10-01. Método: WebSearch (resumos de buscas). Vários sites oficiais (sistemas.cfm.org.br, legisweb) foram bloqueados pelo proxy no WebFetch, então os textos legais NÃO foram lidos na íntegra: o conteúdo abaixo vem de resumos de resultados de busca. Marcado "[não verificado]" onde não achei fonte.

## 1. O que a lei exige (obrigação legal)

### Brasil
- CFM Res. 1.638/2002 define prontuário como documento único com informações, sinais e imagens registradas, de caráter legal, sigiloso e científico, que permite comunicação da equipe e continuidade do cuidado. Itens mínimos (segundo o resumo da busca): identificação do paciente (nome, idade, sexo e dados necessários); anamnese e exame físico (queixas atuais e achados); dados clínicos necessários ao manejo do caso, preenchidos cronologicamente a cada avaliação, com data, hora, assinatura e CRM do médico. Texto do art. 5 (exames complementares, hipóteses diagnósticas, diagnóstico, tratamento) [não verificado nesta pesquisa; conferir no PDF oficial].
  Fontes: https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2002/1638_2002.pdf ; https://www.legisweb.com.br/legislacao/?id=98099 ; https://www.rio.rj.gov.br/dlstatic/10112/5125745/4209117/RESOLUCAOCFMN1.638DE10DEJULHODE2002.pdf
- CFM Res. 2.299/2021: NÃO trata de estrutura de prontuário. Regula emissão de documentos médicos eletrônicos (prescrição, atestado, laudos, solicitação de exames, relatórios, pareceres), com assinatura digital ICP-Brasil, vigente desde 25/12/2021, presencial ou telemedicina. Só se aplica ao que o sistema emitir (receitas/atestados), não à HC.
  Fonte: https://abmes.org.br/arquivos/legislacoes/Resolucao-CFM-2299-2021-09-30.pdf ; https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2021/2299_2021.pdf
- SUS / e-SUS APS (PEC): usa SOAP + CIAP2/CID10. CIAP2 é obrigatório na "escuta inicial" e no S/A/P do PEC (motivo da consulta). S = motivo/queixa (CIAP2); O = sinais vitais, medidas, exame; A = conclusão com CIAP2/CID10; P = plano de cuidado. Isso é exigência do sistema da rede pública, não de lei para o consultório privado.
  Fontes: https://sisaps.saude.gov.br/sistemas/esusaps/docs/guias-preenchimento/equipeaps/ ; http://aps.saude.gov.br/ape/esus/manual_3_2/capitulo6 ; https://estante-ses.sorocaba.sp.gov.br/books/manuais-de-utilizacao-do-sisweb/page/registro-soap-subjetivo-objetivo-avaliacao-e-plano

### Espanha
- Ley 41/2002 (art. 15): conteúdo mínimo da HC = documentação do registro clínico-estatístico, autorização de ingresso, informe de urgências, anamnese e exploração física, evolução, ordens médicas (e outros itens de hospitalização, não detalhados aqui). Finalidade: conhecimento veraz e atualizado do estado de saúde. Para atenção primária e especializada.
  Fontes: https://www.boe.es/buscar/act.php?id=BOE-A-2002-22188 ; https://www.boe.es/buscar/pdf/2002/BOE-A-2002-22188-consolidado.pdf
- As comunidades autônomas têm normas próprias de HC [não pesquisado].

### Outros países (para contexto do produto)
- México, NOM-004-SSA3-2012: historia clínica = interrogatorio (motivo/queixa, antecedentes heredofamiliares, personales no patológicos e patológicos, padecimiento actual; sintomas por aparelhos, registrando só dados positivos) + exploración física (mínimo: habitus exterior, signos vitales TA/FC/FR/Temp, peso, talla) + resultados de estudios + diagnósticos/problemas clínicos + pronóstico + indicación terapéutica; notas de evolución obrigatórias; guarda mínima de 5 anos desde a última consulta.
  Fontes: https://www.farmacopea.org.mx/Repositorio/LegislacionFiles/NOM-004-SSA3-2012_15oct12.pdf ; https://saludtotal.mx/es/blog/expediente-clinico-contenido-nom-004-ejemplos/
- Argentina, Ley 26.529 art. 15 (asientos): data de início; identificação do paciente e núcleo familiar; identificação do profissional e especialidade; registros claros e precisos dos atos; antecedentes genéticos, fisiológicos e patológicos, se houver; todo ato médico realizado ou indicado (prescrições, medicação). Consentimentos, indicações, estudos fazem parte da HC.
  Fonte: https://www.argentina.gob.ar/normativa/nacional/ley-26529-160432/texto
- Colômbia, Res. 1995/1999: HC obrigatória, privada, sob reserva; componentes = identificação, registros específicos, anexos; deve evidenciar investigação das condições de saúde, diagnóstico e plano de manejo; anotações legíveis, sem espaços em branco nem siglas, com data/hora, nome completo e firma. Detalhe de campos [não lido na íntegra].
  Fonte: https://www.minsalud.gov.co/normatividad_nuevo/resoluci%C3%93n%201995%20de%201999.pdf
- Chile, Ley 20.584 art. 12 + Decreto 41/2012: ficha clínica obrigatória, pode ser eletrônica ou papel desde que garanta autenticidade, acesso e confidencialidade. Conteúdo mínimo: identificação atualizada do paciente (nome, documento, sexo, nascimento, endereço, contato, ocupação, representante, sistema de saúde); nº da ficha, data, prestador; registro cronológico e datado de consultas, anamnese, evolução, prescrições, procedimentos.
  Fontes: https://www.teleiberoamerica.com/legislaciones/Chile-Dcto-41-15-dic-2012FichasClinicas.pdf ; https://iura.cl/20584/12

## 2. Obrigatório x prática

Obrigatório (comum a todas as normas achadas): identificar paciente e profissional; data (e hora no BR/CO); queixa/anamnese; exame físico; diagnóstico ou hipótese; conduta/tratamento; evolução cronológica; assinatura/CRM (BR). Nenhuma norma achada dá ordem rígida de seções nem exige um template específico para consulta ambulatorial.
Prática (não imposta por lei, achada só como convenção): SOAP; CIAP2 (só e-SUS/APS); revisão de sistemas completa; antecedentes em blocos fixos. A NOM mexicana é a mais prescritiva sobre antecedentes e sinais vitais mínimos. A espanhola e a brasileira são genéricas (anamnese, exploração, evolução).
Não encontrei fonte sobre modelos de HC do Hospital das Clínicas nem protocolos de pronto-atendimento; não afirmo nada sobre eles.

## 3. Diferenças BR x ES (do que foi achado)
- BR: norma do conselho profissional (CFM) exige CRM e hora; no SUS o formato é SOAP/CIAP2. Termo: "prontuário", "anamnese", "hipótese diagnóstica", "conduta".
- ES: lei estatal (Ley 41/2002) lista conteúdo mínimo com "anamnesis y exploración física", "evolución", "órdenes médicas"; termos: "historia clínica", "motivo de consulta", "juicio clínico", "plan terapéutico" (estes dois rótulos são convenção de uso; [não verificado em fonte]).
- A NOM-004 (MX) é a única que exige explicitamente sinais vitais, peso e talha no mínimo e pede só sintomas positivos na revisão por aparelhos.

## 4. Modelo proposto de HC enxuta (ordem de preenchimento)

Princípio: cada seção cobre um item legal; resto é opcional/colapsado. Texto livre curto, sem exigir campos vazios (Colômbia proíbe espaços em branco; ok, ocultar o que não foi preenchido).

### Modelo BR (SOAP leve, compatível com CFM 1.638 e e-SUS)
1. Cabeçalho automático: paciente (nome, idade, sexo), data/hora, médico (nome + CRM). [obrigatório]
2. S, Queixa principal e HDA (texto livre; duração). [obrigatório: anamnese]
3. S, Antecedentes relevantes: comorbidades, medicações em uso, alergias, cirurgias (só o pertinente; revisão de sistemas opcional). [prática]
4. O, Exame físico: sinais vitais (PA, FC, FR, T, SatO2 se aplicável, peso/altura opcionais) + achados pertinentes. [obrigatório: exame físico]
5. O, Exames complementares (resultados trazidos/solicitados). [prática; ver art. 5 CFM a conferir]
6. A, Hipótese(s) diagnóstica(s)/diagnóstico, CID-10 (CIAP2 opcional para APS/SUS). [obrigatório conforme resumo]
7. P, Conduta: prescrição, exames solicitados, orientações, retorno. [obrigatório: tratamento]
8. Assinatura/CRM; registro cronológico (retornos como evolução). [obrigatório]

### Modelo ES
1. Cabeçalho: paciente, fecha, profesional (nombre + nº colegiado) [prática; Ley 41 exige identificação via registro clínico-estatístico].
2. Motivo de consulta + enfermedad actual (anamnesis). [obrigatório: anamnesis]
3. Antecedentes personales y familiares relevantes, alergias, medicación habitual. [prática]
4. Exploración física (constantes + hallazgos). [obrigatório: exploración física]
5. Pruebas complementarias. [prática]
6. Juicio clínico / diagnóstico (CIE-10, CIE-10-ES). [prática; Ley 41 não detalha]
7. Plan / tratamiento (órdenes médicas, recetas, seguimiento). [obrigatório: órdenes médicas / evolución]
8. Evolución en visitas sucesivas. [obrigatório]

Diferença prática entre os dois: só rótulos e identificação profissional (CRM vs nº colegiado); estrutura de seções pode ser a mesma. Para MX acrescentar sinais vitais + peso/talha como mínimo e prognóstico.

## 5. Lacunas
- Texto íntegro de CFM 1.638 art. 5 e Ley 41 art. 15 completo não lidos (bloqueio de egress); confirmar antes de citar na UI.
- Modelos de HC de hospitais (HC-FMUSP etc.) e pronto-atendimento: não encontrados.
- Normas autonômicas espanholas (ex.: Cataluña, Madrid): não pesquisadas.
- Aviso: não é parecer jurídico.
