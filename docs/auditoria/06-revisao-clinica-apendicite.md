# Revisão clínica: apendicite aguda (rascunho + guia do motivo)

Revisor: agente revisor-conteudo-clinico. Data: 2026-10-01. Nenhum arquivo de código foi editado.
Arquivos: `src/enfermidades/apendicite-aguda.js` (A) e `src/motivos/apendicite.js` (M).

**Limite da verificação.** O egress bloqueou WebFetch (PubMed, Springer, PMC, LITFL). Só consegui ver resultados do WebSearch (títulos, resumos, trechos). Onde digo "memória" a afirmação vem de conhecimento do revisor, sem abrir a fonte: tratar como **não verificado** até o dono conferir. Nada foi conferido contra livro-texto.

## 1. Achados graves (corrigir antes de publicar)

| # | Afirmação | Classificação | Fonte | Observação |
|---|---|---|---|---|
| G1 | M, AIR: "Defesa leve 1 / moderada-grave 2" **e** "Rebote 1" como itens separados; sem item de neutrófilos | INCORRETO (memória do artigo original) | Andersson 2008, World J Surg 32:1843 (existência confirmada; itens não abertos) | No AIR original, "rebote ou defesa muscular" é um único item: leve 1, moderado 2, forte 3. Neutrófilos (70-84% = 1; ≥85% = 2) fazem parte. A tabela do guia soma no máximo 10 pontos, e o AIR vai de 0 a 12. A faixa de corte 0-4 / 5-8 / 9-12 está correta (confirmado em busca), mas não bate com os itens listados. Refazer a tabela PT e ES. |
| G2 | M, ES: mnemônico "A. MAESTRO" do Alvarado ("Entumecimiento", "Orientación a la izquierda", letras trocadas) | INCORRETO | Alvarado 1986 (MANTRELS) | Mnemônico inventado e traduzido errado ("entumecimiento" = dormência; "orientação à esquerda" não é desvio à esquerda). Os itens também aparecem em ordem e com rótulos diferentes do PT. A própria tabela de escalas em ES usa "MANTRELS". Usar MANTRELS ou remover. |
| G3 | M: "Alvarado ≥7 ou TC confirma: apendicectomia" e "9-10: cirurgia imediata", sem imagem | INCOMPLETO / possível divergência | WSES 2020 (existência confirmada; recomendações exatas não abertas, memória) | Pelo que lembro do WSES 2020, o Alvarado serve melhor para excluir (baixo risco) do que para confirmar, e a imagem é recomendada nos casos intermediários, em mulheres, crianças e idosos. O AIR é preferido ao Alvarado. Decisão cirúrgica direta por escore só em quadro clássico, em homem jovem. O dono deve conferir o texto do guideline. |
| G4 | M: "ATB pré-op: Cefazolina 2g EV 30min antes" | INCOMPLETO | Memória (ASHP/IDSA 2013 para apendicectomia); não verificado | A profilaxia em apendicectomia costuma incluir cobertura anaeróbia (cefazolina + metronidazol, ou cefoxitina/cefotetan). Cefazolina isolada não cobre anaeróbios. A janela costuma ser até 60 min antes da incisão. A dose de 2 g é usual. |
| G5 | M: "Dipirona/Tramadol EV (não retarda diagnóstico)" | INCOMPLETO | Cochrane CD005660 "Analgesia in patients with acute abdominal pain" (existência confirmada; 6 ensaios, 669 pacientes, morfina/tramadol/papaveretum vs placebo) | O resultado cobre **opioides**, incluindo tramadol: sem piora de diagnóstico nem de decisão. **Dipirona não foi estudada** nessa revisão. Para a dipirona não encontrei evidência: não verificado. Reescrever como "analgesia, incluindo opioide, não mascara o diagnóstico". Faltam doses de dipirona e tramadol. |
| G6 | M: "Perfurada: Metronidazol 500mg + Ceftriaxona 2g EV" | INCOMPLETO | Memória (WSES/IDSA/SIS); não verificado | A associação é um esquema aceito para infecção intra-abdominal complicada comunitária. Falta intervalo (metronidazol 500 mg a cada 8 h; ceftriaxona 1-2 g a cada 24 h) e duração. Busca: a edição WSES 2025 fala em 2-3 dias de ATB pós-operatório na forma complicada com controle de foco. O texto de 2020 (memória: até 4 dias) não foi aberto. Duas fontes podem divergir: o dono decide. |
| G7 | M, mnemônico: "Leuco>18.000 → perfuração"; "T>38,5°C → perfuração"; "Anorexia >90%" | SEM FONTE | Nenhuma encontrada | Cortes sem referência. Anorexia em ~70% é o que lembro da literatura (não verificado), então ">90%" é provavelmente exagero. Remover os números ou citar fonte. |
| G8 | M, manobra: "Sinal de Chandelier (grito de Laffont)" | provável INCORRETO (memória) | não verificado | O sinal de Laffont costuma ser dor no ombro por irritação diafragmática (gravidez ectópica rota). O termo clássico para dor no fundo de saco é "grito de Douglas". Chandelier = dor à mobilização cervical. Conferir. |
| G9 | M: "TC abdome+pelve c/ contraste (gold standard)" e "Rx abdome (pneumoperitônio)" | INCOMPLETO / SEM FONTE | WSES 2020 (memória) | A TC é o exame de imagem mais acurado, mas o padrão-ouro diagnóstico é a histologia. A diretriz coloca US primeiro, sobretudo em crianças, gestantes e jovens magros, e TC se US inconclusivo. A enfermidade (A) já diz isso; o motivo (M) diverge. O Rx de abdome tem pouco valor no diagnóstico de apendicite: justificar ou retirar. |

## 2. Tabela: A (`apendicite-aguda.js`)

| Afirmação | Classificação | Fonte | Observação |
|---|---|---|---|
| Definição: inflamação aguda do apêndice, geralmente por obstrução, risco de necrose/perfuração/peritonite | CORRETO | Memória (consenso de livros-texto); não verificado | Coerente com o ES. |
| Mais comum causa de abdome agudo cirúrgico; pico na 2ª-3ª décadas | SEM FONTE | não verificado | Cabe incluir risco ao longo da vida (~7-8%, memória) e predomínio discreto no sexo masculino. Pico citado em 10-30 anos, varia por livro. |
| Fisiopatologia: obstrução, pressão, isquemia, necrose, perfuração; dor visceral para somática | CORRETO | Memória (Sabiston, ref. 0); não verificado | INCOMPLETO: não menciona que parte dos casos tem curso não progressivo (não complicado vs complicado), base da conduta com antibiótico. |
| Sintomas: migração, anorexia, náuseas/vômitos após a dor, febre baixa | CORRETO | Clássico (Murphy); não verificado | Falta mencionar que a gestante pode ter dor em quadrante superior direito. |
| Sinais: McBurney, Blumberg, Rovsing, psoas, obturador, defesa | CORRETO | Memória | Técnicas coerentes com M; ver G8 e a lista de manobras em M (Psoas, Obturador, Dunphy, Markle, Aaron, Ten Horn, Guéneau de Mussy, Kocher conferem com a descrição clássica; Lapinsky e Lenander: não verificado). |
| Formas atípicas: retrocecal/pélvico; idosos, crianças, gestantes | CORRETO | Memória | Falta citar maior taxa de perfuração e atraso nesses grupos. |
| Alvarado: soma de 10 pontos com os 8 itens | CORRETO | Alvarado 1986, Ann Emerg Med 15:557 (existência confirmada; 305 pacientes; MANTRELS) | Pontos conferem: 2 para dor à palpação e 2 para leucocitose, 1 para os demais. Sem pontos de corte no texto (adequado, dado G3). |
| "Diagnóstico clínico apoiado em escores (Alvarado, AIR) e imagem" | CORRETO | WSES 2020 (resumo confirmado: escores e imagem reduzem apendicectomia em branco) | Sem divergência. |
| Exames: hemograma/PCR; β-HCG "afasta ectópica" | INCOMPLETO | Memória | Só o β-HCG **negativo** afasta gravidez/ectópica. Reescrever. Falta urina rotina (presente em M). |
| USG: apêndice não compressível, aumentado de calibre, líquido periapendicular | INCOMPLETO | Memória | Falta o corte usual (diâmetro >6 mm). O caso usa 9 mm, compatível. |
| TC com contraste após dúvida pós-USG | CORRETO | WSES 2020 (memória) | Coerente com a diretriz. Divergente de M (G9). |
| Diferenciais (8) | INCOMPLETO | Memória | Faltam linfadenite mesentérica/ileíte (crianças e jovens), doença de Crohn, torção/cisto ovariano roto, torção testicular, hérnia. Os 4 ids (`colecistite-colelitiase`, `pancreatite-aguda`, `oclusao-intestinal`, `doenca-diverticular`) existem em `src/motivos/`. |
| Tratamento: jejum, hidratação, cirurgião | CORRETO | Prática | Sem dose, conforme o cabeçalho do arquivo. |
| "Analgesia não atrasa nem prejudica o diagnóstico" | CORRETO | Cochrane CD005660 (confirmado, vale para opioides) | As refs [0,1] ligadas à analgesia não são a fonte desta afirmação; sugerir incluir o Cochrane. |
| Antibiótico: profilaxia; terapêutico na forma perfurada | INCOMPLETO | WSES 2020 (resumo: seção de manejo não operatório e de profilaxia) | Falta que o manejo não operatório com antibiótico é opção em casos selecionados sem complicação (WSES 2020 e 2025, confirmado no resumo). Falta citar controle de foco e curso curto na complicada. |
| Apendicectomia, preferencialmente laparoscópica | CORRETO | WSES 2020/2025 ("laparoscopia padrão", confirmado no resumo) | Falta o prazo (<24 h aceitável na forma não complicada; WSES 2025 confirmado em busca). |
| Abscesso/perfurada: antibiótico e abordagem conforme gravidade | INCOMPLETO | WSES 2020 (memória) | Falta drenagem percutânea do abscesso e a decisão sobre apendicectomia de intervalo. |
| Complicações e prognóstico | CORRETO / INCOMPLETO | Memória | Qualitativo correto. Falta íleo, abscesso residual, aderências; não há números de mortalidade (não verificado). |
| Sinais de alarme | CORRETO | Memória | Coerentes com M. |

## 3. Caso fictício "Dor abdominal que mudou de lugar"

| Afirmação | Classificação | Fonte | Observação |
|---|---|---|---|
| Homem de 22 anos, 24 h, migração, anorexia, 2 vômitos após a dor, sem diarreia | CORRETO | Apresentação clássica | Coerente com a faixa de pico. |
| Etapa 1: T 37,8 °C, dor à palpação e Blumberg em FID; resposta "apendicite" (índice 1) | CORRETO | Memória | Alvarado clínico = 7 (migração 1, anorexia 1, náusea/vômito 1, palpação 2, rebote 1, temperatura 1). Gabarito e comentário coerentes. |
| Etapa 2: leucócitos 14.000 com desvio, USG com apêndice não compressível de 9 mm; resposta "avaliação cirúrgica" (índice 1) | CORRETO | WSES 2020 (memória) | Alvarado total = 10. Distratores plausíveis. Em rascunho: sugerir pergunta sobre analgesia/antibiótico quando houver doses com fonte. |
| Pérolas: ordem dos sintomas; β-HCG em mulher fértil | CORRETO | Memória | Sem divergência. |

## 4. Referências

| Ref | Classificação | Verificação |
|---|---|---|
| [0] Townsend CM et al. Sabiston Textbook of Surgery | não verificado | O livro existe (memória). Edição, ano, capítulo e página ausentes. |
| [1] Di Saverio S et al. 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg 2020;15:27 | CORRETO (dados bibliográficos) | Confirmado em busca (volume 15, artigo 27, 2020; PubMed 32295644). O periódico usa número de artigo, não página. Há uma **edição 2025** das diretrizes (resumo no ResearchGate/QxMD): a ref de 2020 pode estar DESATUALIZADA. Não consegui abrir a 2025; dados bibliográficos dela não verificados. |
| [2] Alvarado A. Ann Emerg Med 1986;15:557-564 | CORRETO | Confirmado: Ann Emerg Med 1986;15(5):557-64, PMID 3963537. |
| [3] Andersson M, Andersson RE. World J Surg 2008;32:1843-1849 | CORRETO (autores, periódico, ano, volume, páginas); título INCOMPLETO | O título real é "The Appendicitis Inflammatory Response Score: A Tool for the Diagnosis of Acute Appendicitis that Outperforms the Alvarado Score". O arquivo cita só "The appendicitis inflammatory response score". |

## 5. Guia do projeto (M): outros pontos de corte

| Item | Classificação | Observação |
|---|---|---|
| Alvarado 1-4 / 5-6 / 7-8 / 9-10 | CORRETO | Confere com o consenso (busca: 1-4 improvável, 5-6 compatível, 7-8 provável, 9-10 muito provável). |
| Temperatura: "≥ 37,3 °C" no mnemônico e ">37,3°C" na tabela; leucocitose "≥ 10.000" vs ">10.000" | INCORRETO (inconsistência interna) | O artigo original e as fontes de busca usam "elevated >37.3 °C" e ">10,000". Padronizar com o texto do artigo (não aberto: não verificado). |
| AIR: temperatura ≥38,5, leucócitos 10-14,9 (1) / ≥15 (2), PCR 10-49 (1) / ≥50 (2) | CORRETO (memória + busca parcial) | Confirmado em busca apenas o corte 0-4 / 5-8 / 9-12. Ver G1 sobre itens. |
| Passo 4: "Alvarado ≤4 + USG normal: alta" | CORRETO | Coerente com Alvarado como regra de exclusão (memória do WSES). |
| Passo 5: "Alvarado 5-6: observação 12-24 h" | não verificado | Sem fonte para a janela de tempo. |
| Passo 6: "apendicectomia laparoscópica <24h" | CORRETO | WSES 2020/2025: atraso <24 h seguro nas formas não complicadas (busca). |
| Ondansetrona 4-8 mg EV | CORRETO (não verificado em bula) | Faixa usual de 4 mg, até 8 mg. |
| "Douglas doloroso" no toque retal; Lenander >1 °C | não verificado | Descrições clássicas; sem fonte aberta. |
| Paridade PT/ES do guia | INCOMPLETO | Mnemônico ES diverge (G2). Resto equivalente. ES "USG sin saco intrauterino" está certo. |

## 6. Paridade PT/ES em A

Conteúdo clínico equivalente em todas as chaves. Termos corretos: "ecografía", "fosa ilíaca derecha", "abdomen en tabla", "defensa", "apendicolito", "cólico ureteral", "EPI". Ressalvas menores: "FID" usada sem expansão em `criterios`; "β-HCG" é mais comum como "hCG/β-hCG" em ES; "cuello" em "movilización del cuello" deveria ser "cuello uterino".

## Resumo (5 linhas)

1. Referências 1, 2 e 3 existem com autores/periódico/ano/volume corretos (busca); título da ref 3 está truncado, a ref 0 (Sabiston) não foi verificada, e há edição 2025 do WSES.
2. A (enfermidade) está majoritariamente CORRETO; lacunas: β-HCG "afasta", sem corte de USG, sem manejo não operatório com antibiótico, diferenciais incompletos.
3. Em M o AIR está errado (rebote/defesa como item único 1-3, falta neutrófilos) e o mnemônico ES "A. MAESTRO" está incorreto.
4. Dipirona sem evidência (Cochrane cobre opioides); cefazolina sem anaeróbios; perfurada sem intervalo/duração; "gold standard TC" e cortes ">18.000"/">90%" sem fonte.
5. Caso e gabarito coerentes (Alvarado 7 após etapa 1, 10 após etapa 2); decisões de conduta e doses exigem conferência do dono com os textos completos, bloqueados nesta sessão.
