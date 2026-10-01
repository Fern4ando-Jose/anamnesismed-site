# 07 - Revisão clínica: pancreatite aguda e colecistite aguda (rascunhos PT/ES)

Revisor: agente revisor-conteudo-clinico, 2026-10-01. Arquivos: `src/enfermidades/pancreatite-aguda.js`, `src/enfermidades/colecistite-aguda.js`; guias do projeto conferidos: `src/motivos/pancreatite-aguda.js`, `src/motivos/colecistite-colelitiase.js`. Nenhum arquivo de código foi editado.
Método: WebSearch (metadados de periódicos, resumos e trechos de diretrizes). O acesso ao texto integral (PMC/NCBI) foi bloqueado pelo proxy, então itens marcados "memória" vêm de conhecimento do revisor e **não foram confirmados no texto**; o dono deve conferir no livro/diretriz antes de publicar. Nenhum livro-texto foi consultado (Sabiston: não verificado).

## Resumo dos achados graves (primeiro)
1. **Motivo colecistite: "colecistectomia idealmente <72h"** contradiz TG18 (a regra rígida de 72h foi relativizada) e WSES 2020 (o mais cedo possível, até 7 dias da admissão e 10 dias do início dos sintomas). DESATUALIZADO. A enfermidade deixou o prazo como "[conferir]".
2. **Motivo pancreatite: "hidratação vigorosa/agressiva/reposição volêmica agressiva"** contradiz ACG 2024 (hidratação "moderadamente agressiva", Ringer lactato) e o próprio rascunho da enfermidade. Risco de sobrecarga volêmica. A literatura sobre excesso de volume (ensaio WATERFALL) vem da memória, não verificada.
3. **Motivo colecistite: critérios ASGE** estão na versão 2010 (bilirrubina >4 isolada "muito forte"; "dilatada + bili 1,8-4 forte"). ASGE 2019 (verificado) exige bilirrubina >4 mg/dL **E** via biliar dilatada. A enfermidade usa a versão 2019 corretamente, mas sem citar a ASGE nas refs.
4. **Refs da colecistite mal atribuídas:** Yokoe 2018 trata de diagnóstico e gravidade, não de analgesia nem de antibióticos (os antibióticos do TG18 estão em outro artigo, Gomi et al.). A nota de antibiótico cita [1,2] e a de analgesia [0,1]. Falta ref da ASGE.
5. **Antibiótico na colecistite ("indicados na colecistite")** é amplo demais: TG18 e WSES admitem dispensar ou limitar antibiótico em colecistite leve com colecistectomia precoce (memória, parcialmente verificado). O caso 2 marca "antibiótico" como correto sem ressalva.
6. As 4 refs principais **existem** com autores, periódico, ano, volume e páginas conferindo (ver tabela de refs). Sabiston permanece não verificado, sem edição nem página. A ASGE 2019 e o artigo TG18 de fluxograma (Okamoto) não estão citados.

## GUIA 1 - Pancreatite aguda (enfermidades/pancreatite-aguda.js)

| Afirmação | Classificação | Fonte | Observação |
|---|---|---|---|
| Diagnóstico por 2 de 3 critérios (dor típica; lipase/amilase >3x LSN; imagem) | CORRETO | Banks 2013 (verificado nos resumos); ACG 2024 | Conforme. Imagem só é obrigatória se dor ou enzimas forem duvidosos (a TC precoce deve ser evitada). |
| Gravidade Atlanta 2012: leve / moderadamente grave (falência transitória <48 h ou complicação local) / grave (falência persistente >48 h) | CORRETO (incompleto) | Banks 2013 | Falta citar "complicação sistêmica (exacerbação de comorbidade)" como critério de moderadamente grave, a falência definida por Marshall modificado e a classificação por determinantes (2012) como alternativa. INCOMPLETO. |
| Escores: BISAP, Ranson e PCR em 48 h | CORRETO / SEM FONTE | memória; ACG 2024 (escores não confirmados no texto) | PCR não é escore (ponto de corte habitual: 150 mg/L, memória, não verificado). Nenhum desses escores consta em Atlanta. Sem ref. |
| Lipase preferível; valor não indica gravidade | CORRETO | ACG 2024 (memória) | Conferir o texto. |
| TC com contraste: necrose melhor avaliada após 72 h; só se dúvida/sem melhora | CORRETO | ACG 2024 (memória) | Conforme a prática; não verificado no texto. |
| ALT/TGP elevada sugere causa biliar | CORRETO | memória | O guia sugere ALT >3x LSN (valor preditivo, não verificado). Valor sem ponto de corte: INCOMPLETO. |
| Triglicerídeos "muito elevados" | INCOMPLETO | ACG 2024 (memória) | Falta o limiar: >1000 mg/dL (>11,3 mmol/L), não verificado. |
| Etiologias: litíase e álcool mais frequentes; hipertrigliceridemia, hipercalcemia, pós-CPRE, fármacos, autoimune, idiopática | CORRETO | ACG 2024; Banks 2013 (genérico) | Sem números de incidência. Em algumas regiões o álcool é a 1ª causa. SEM FONTE quantitativa. |
| Fisiopatologia (ativação do tripsinogênio, autodigestão, SIRS) | CORRETO | Sabiston (não verificado) | Conceito clássico. Falta citar o papel da necrose estéril/infectada e da fase precoce/tardia (Atlanta). |
| Cullen/Grey-Turner tardios e pouco frequentes | CORRETO | memória | Conforme. Frequência não verificada. |
| Hidratação precoce guiada por metas, Ringer lactato, evitando excesso de volume | CORRETO | ACG 2024: "moderadamente agressiva", Ringer lactato (verificado em resumo) | Conferir no texto se a diretriz traz taxas (ex.: 1,5 mL/kg/h) e a meta. A palavra "metas" é mais forte que o resumo; a decisão de manter fica com o dono. |
| Dieta oral precoce conforme tolerância; enteral se não tolerar | CORRETO | ACG 2024: alimentação oral em 24-48 h, dieta sólida pobre em gordura, na pancreatite leve (verificado em resumo) | Falta especificar enteral > parenteral e via NG/NJ (memória). INCOMPLETO. |
| Antibiótico não profilático; só na necrose infectada e na colangite | CORRETO | ACG 2024: contra profilaxia na pancreatite grave (verificado em resumo) | Conforme. |
| CPRE urgente na colangite; avaliar se obstrução biliar persistente | CORRETO (parcial) | ACG 2024: contra CPRE precoce (72 h) sem colangite (verificado); prazo de 24 h na colangite (memória) | Falta o prazo (24 h) e dizer que "obstrução persistente" não indica CPRE rotineira. INCOMPLETO. |
| Pancreatite biliar leve: colecistectomia na mesma internação | CORRETO | ACG 2024 (memória; não confirmado no texto) | Falta: na pancreatite grave/necrosante, adiar até resolução das coleções (cerca de 6 semanas, memória). INCOMPLETO. |
| Necrose infectada: abordagem escalonada, após a fase aguda | CORRETO | ACG 2024/PANTER (memória) | Falta o prazo (preferencialmente >4 semanas, memória). INCOMPLETO. |
| Opioide quando necessário | CORRETO | ACG 2024 (memória) | Sem dose, por decisão do projeto (OK). |
| Complicações (necrose, coleções, pseudocisto, infecção, falência, trombose esplâncnica, diabetes) | CORRETO | Banks 2013 | Falta a terminologia de Atlanta 2012 (coleção aguda, pseudocisto, necrose encapsulada) e a hipertensão intra-abdominal. INCOMPLETO. |
| Prognóstico: maioria leve; mortalidade sobe com falência persistente e necrose infectada | CORRETO | Banks 2013 (qualitativo) | Sem números (cerca de 20-40% de mortalidade na falência de órgão com necrose infectada, memória, não verificado). |
| Diferenciais e sinais de alarme | CORRETO | memória | Sugerir dissecção aórtica e pielonefrite/cólica renal. Sem fonte. |
| Caso 1 (homem, 45 anos, dor em faixa, lipase 5x, FC 108): gabarito pancreatite aguda | CORRETO | Banks 2013 | Consistente. O comentário "fecham 2 dos 3" está correto. |
| Caso 2: hidratação, analgesia, dieta precoce; sem ATB; CPRE só na colangite | CORRETO | ACG 2024 | Distratores corretos. Observação: US sem cálculos não exclui microlitíase; ALT e Ca ausentes. Melhoria opcional. |
| Perolas: lipase não mede gravidade; sempre buscar causa | CORRETO | memória | OK. |
| Refs: Tenner ACG 2024, Am J Gastroenterol 119(3):419-437 | CORRETO | verificado (busca; autores Tenner, Vege, Sheth, Sauer, Yang, Conwell, Yadlapati, Gardner) | Existe com título, ano, volume e páginas. Marcar `verificada:true` após leitura. |
| Refs: Banks PA et al., Gut 2013;62:102-111 | CORRETO | verificado (62(1):102-11, doi 10.1136/gutjnl-2012-302779) | Existe. O índice 2 de refs não é vinculado a nenhuma afirmação; os critérios de Atlanta não têm `refs`. |
| Refs: Townsend, Sabiston | não verificado | - | Sem edição, ano ou página; campos incompletos. |

### Paridade PT/ES (pancreatite)
Conteúdo clínico equivalente item a item. Pontos de forma: PT "afastar e suspender o álcool" vs ES "suspender el alcohol" (PT ambíguo: "afastar" pode ler-se "excluir"); PT mistura TGO/TGP e "ALT/TGP" (ES igual); dor "en barra" (enfermidade) vs "en faja" (guia do motivo): padronizar. "TGO/TGP" é uso latino-americano (na Espanha: AST/ALT). Termos ES (lipasa, pseudoquiste, falla de órgano, CPRE, UCI) adequados.

### Guia do projeto (src/motivos/pancreatite-aguda.js)
| Item | Classificação | Observação |
|---|---|---|
| "Hidratação venosa vigorosa", "reposição volêmica agressiva precoce" (conduta, drugs, steps) | DESATUALIZADO | ACG 2024: moderadamente agressiva, Ringer lactato, reavaliação frequente. Alinhar com a enfermidade. |
| Ranson admissão (>55 anos, leuco >16.000, glicose >200, DHL >350, TGO >250) e 48 h (Ht >10%, BUN >5, Ca <8, PaO2 <60, BE >4, sequestro >6 L); ≥3 grave | CORRETO | Ranson clássico (memória). Obs.: é a versão para pancreatite não biliar (a biliar usa outros limites: 70 anos, leuco 18.000, glicose 220, DHL 400, AST 250). Não distingue. |
| BISAP (BUN >25, mental, SIRS, >60 anos, derrame pleural); ≥3 maior mortalidade | CORRETO | Memória. |
| Mnemônico GET SMASHED | CORRETO (ressalva) | "Trauma" e "ERCP" duplicam pós-CPRE; "Scorpion" é regional (Tityus trinitatis, Trinidad). |
| "CPRE se colangite/obstrução biliar" | INCOMPLETO | ACG 2024 desaconselha CPRE precoce sem colangite. Reescrever como "CPRE urgente se colangite". |
| "Suporte nutricional precoce (enteral preferível)" | INCOMPLETO | Falta a via oral precoce (24-48 h) como primeira opção. |
| Cullen/Grey-Turner/Fox | CORRETO | Sinais raros; o guia pode induzir expectativa. |
| Sem doses nem pontos de corte divergentes além dos acima | - | Nenhuma dose no guia. |

## GUIA 2 - Colecistite aguda e colelitíase (enfermidades/colecistite-aguda.js)

| Afirmação | Classificação | Fonte | Observação |
|---|---|---|---|
| Definições: colelitíase, cólica biliar (obstrução transitória do cístico), colecistite (obstrução persistente) | CORRETO | memória; TG18 (conceitual) | Falta citar colecistite acalculosa (pacientes graves) como entidade distinta. INCOMPLETO. |
| Fatores de risco "5 F" (feminino, 40 anos, obeso, multípara, família) | CORRETO | memória | Mnemônico clássico; ref ausente. Sem incidência (cerca de 1-4%/ano de sintomas, memória, não verificado) e sem cirrose/perda rápida de peso/ACO (presentes no guia do motivo). INCOMPLETO. |
| Colecistite é a complicação mais comum da colelitíase sintomática | CORRETO | memória | Sem fonte. |
| Cólica biliar 30 min a algumas horas; colecistite se dor >6 h | CORRETO | memória | O ponto de corte de 6 h é prática clínica, não critério do TG18 (o TG18 não usa duração para diagnóstico). Sem ref. |
| Sinal de Murphy descrito corretamente | CORRETO | memória | Falta mencionar a baixa sensibilidade do Murphy isolado. |
| Tríade de Charcot sugere coledocolitíase/colangite | INCOMPLETO | TG18 colangite (Kiriyama; memória) | O TG18 diagnostica colangite por critérios A (inflamação sistêmica), B (colestase), C (imagem); Charcot é pouco sensível. Citar. |
| Diagnóstico TG18: sinal local + sistêmico + imagem; suspeito = local + sistêmico | CORRETO | Yokoe 2018 (verificado em resumo: critérios A, B, C; sem modificação do TG13) | Conforme. |
| Imagem: achados do TG18 | INCOMPLETO | Yokoe 2018 (verificado: parede ≥4 mm, distensão, líquido, sombras lineares) | O rascunho não cita limiar de parede. |
| Gravidade grau I/II/III; II = leuco >18.000, massa palpável, >72 h, inflamação local marcada | CORRETO | Yokoe 2018 (grau II confirmado em resumo; detalhes na memória) | Falta definir grau III: disfunção (hipotensão com vasopressor, consciência, PaO2/FiO2 <300, oligúria/creatinina >2, INR >1,5, plaquetas <100.000, memória). INCOMPLETO. Grau II: qualquer 1 critério (memória). |
| ASGE: cálculo no colédoco, colangite, bilirrubina >4 com via dilatada | CORRETO | ASGE 2019 (verificado em resumos: alto risco = cálculo à imagem, colangite ascendente, bilirrubina >4 + dilatação) | Falta o risco intermediário (testes hepáticos alterados, >55 anos, dilatação) e a ref (Buxbaum et al., GIE 2019: volume e páginas não verificados). SEM FONTE na lista de refs. |
| CRM ou USE no risco intermediário; CPRE no alto | CORRETO | ASGE 2019 (verificado) | Conforme. |
| Hemograma, PCR, BHC, amilase/lipase, USG como 1º exame | CORRETO | memória; TG18 | OK. |
| Jejum, hidratação, analgesia, antiemético | CORRETO | memória | Sem fonte. "Jejum" na colecistite é prática; sem evidência verificada. |
| AINE para dor biliar | CORRETO | memória | Evidência de AINE (cetorolaco, diclofenaco) na cólica biliar é da memória, não verificada. Cuidado com doença renal/gestação. |
| Antibióticos "indicados na colecistite e na colangite"; cefalosporina 3ª + metronidazol | DESATUALIZADO / INCOMPLETO | TG18 antimicrobianos (Gomi): grau I curto ou sem pós-op se colecistectomia precoce (memória); WSES 2020 (parcial) | Citar a estratificação por gravidade e comunidade vs hospital, a duração após controle da fonte (cerca de 4-7 dias nos graus II/III, memória) e esquemas. A ref [1,2] não cobre antibiótico (Yokoe é diagnóstico). |
| Colecistectomia VLP precoce em centro experiente; prazo "[conferir]" | INCOMPLETO | TG18 fluxograma (verificado em resumo: precoce se CCI ≤5 e ASA-PS ≤2 nos graus I e II); WSES 2020: até 7 dias da admissão e 10 do início dos sintomas; se não, após 6 semanas (verificado em resumo) | Preencher o prazo e os critérios CCI/ASA. |
| Grau III/alto risco: suporte, drenagem (colecistostomia) ou colecistectomia | CORRETO | TG18 (verificado em resumo: grau III não vai direto à VLP, exceção em centro avançado com CCI ≤3 e ASA ≤2) | Conforme. |
| Coledocolitíase/colangite: CPRE e colecistectomia posterior | CORRETO (parcial) | TG18 colangite (memória) | Falta o prazo de drenagem por gravidade (grau III urgente; memória). INCOMPLETO. |
| Cólica biliar: colecistectomia eletiva | CORRETO | memória | Prazo não verificado. |
| Complicações (empiema, gangrena, perfuração, íleo biliar, Mirizzi) | CORRETO | memória | Falta colecistite enfisematosa. |
| Prognóstico "bom" | SEM FONTE | - | Sem números. |
| Sinais de alarme | CORRETO | memória | OK. |
| Caso (mulher 52 anos, T 38,2, Murphy, leuco 15.000, USG com cálculos): colecistite | CORRETO | Yokoe 2018 | Pelo TG18 é diagnóstico definitivo, grau I (leuco <18.000, <72 h). Opção 2 inclui "antibiótico": defensável, mas em grau I o TG18 admite não usar se cirurgia precoce (ver acima). |
| Etapa 1 do caso (sinal descrito = Murphy) | CORRETO | - | Distratores adequados. |
| Pérola: "icterícia com febre e dor em HCD é colangite" | CORRETO | TG18 | OK. |

### Refs da colecistite
| Ref | Resultado | Observação |
|---|---|---|
| Yokoe M et al. TG18 diagnostic criteria and severity grading..., JHBPS 2018;25:41-54 | CORRETO (verificado: 25(1):41-54, doi 10.1002/jhbp.515) | Existe. Cobre diagnóstico e gravidade apenas. |
| Pisano M et al. 2020 WSES updated guidelines ... acute calculus cholecystitis, World J Emerg Surg 15:61 | CORRETO (verificado: 5 nov 2020; autores Pisano, Allievi, Gurusamy et al.) | Existe. Cobre diagnóstico e tratamento. |
| Townsend, Sabiston | não verificado | Edição/página ausentes. |
| Faltam: ASGE 2019; TG18 fluxograma (Okamoto, JHBPS 2018, doi 10.1002/jhbp.516; páginas não verificadas); TG18 antimicrobianos (Gomi) | SEM FONTE | Incluir. |

### Paridade PT/ES (colecistite)
Equivalência clínica mantida. Termos ES adequados: colecistitis, cólico biliar, coledocolitiasis, colangiorresonancia, tríada de Charcot, péntada de Reynolds, cefalosporina de 3.ª generación. Pontos: PT "[conferir]" vs ES "[verificar]" (ok); ES usa "las 5 F" (mnemônico em inglês, não funciona em ES: "Female, Forty, Fat, Fertile, Family" não aparece em ES na enfermidade, só no guia); "ceftriaxona + metronidazol" igual nas duas.

### Guia do projeto (src/motivos/colecistite-colelitiase.js)
| Item | Classificação | Observação |
|---|---|---|
| "Colecistectomia VLP precoce (idealmente <72h)" (steps, PT e ES) | DESATUALIZADO | WSES 2020: até 7 dias da admissão/10 dias do início; TG18 relativiza os 72 h. |
| Preditores ASGE: bilirrubina >4 isolada "muito forte"; "dilatada + bili 1,8-4 forte" | DESATUALIZADO | ASGE 2019 (verificado): alto risco = cálculo à imagem, colangite, ou bilirrubina >4 + dilatação. Em 2019 "bili 1,8-4" não é critério de alto risco. |
| Grau III "exige suporte de órgão + drenagem precoce" | INCOMPLETO | TG18: VLP possível em centro avançado em casos selecionados. |
| Murphy "alta sensibilidade" | não verificado (provável INCORRETO) | Sensibilidade do Murphy isolado é moderada; só a especificidade é boa (memória). Reescrever. |
| Parede vesicular normal <3 mm, anormal >3 mm | CORRETO (ressalva) | TG18 cita ≥4 mm (verificado em resumo). Duas fontes divergem; decidir. |
| "Antibiótico (ex.: ceftriaxona + metronidazol) na colecistite" | INCOMPLETO | Ver acima. |
| "Dipirona/AINE" | não verificado | Dipirona/metamizol não consta nas diretrizes consultadas e é restrito em vários países. |
| Sem doses nos guias | - | Nenhuma dose contradiz as fontes. |
