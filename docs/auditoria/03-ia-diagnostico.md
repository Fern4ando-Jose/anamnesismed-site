# Auditoria 03 — Pilar "IA de apoio diagnóstico"

Data: 2026-10-01. Escopo: `api/assistente-dx.js`, `api/gerar-hc.js`, `anamnesismed-assistente.js`, `anamnesismed-narrativa.js`, `test/*.js`, termos e privacidade. Somente leitura, nenhum código alterado.

## 1. Existe

**Apoio diagnóstico (`/api/assistente-dx`)**
- Claude API via SDK, modelo `claude-sonnet-4-6`, `max_tokens` 3000, stream, thinking desligado (`api/assistente-dx.js:30,36,339-349`).
- Prompt PT/ES com regras: usar só a HC, sem inventar dados, "Não" tratado como negado, destaque de "can't-miss", ferramenta de apoio e "não prescreve tratamento" (`:49-58`, `:78-87`).
- Gera diferencial (3-4 hipóteses com probabilidade, a favor e contra), exame físico, **exames**, "para fechar", perguntas faltantes e sinais de alarme (`:59-74`).
- **Tratamento**: o prompt proíbe doses e tratamento (`:74`, `:103`). Não há campo de tratamento no JSON. Exames são gerados (`:64`).
- Segurança de acesso: Bearer do Supabase validado no servidor (`:275-288`), só plano `pro` (`:292-298`) e limite diário de 20 por usuário (`:43,300-318`).
- Entrada limitada por campo e bloco (`:108`). Saída normalizada e com reparo de JSON truncado (`:198-261`).
- Log de custo sem dado de paciente (`:356-365`). Erros 5xx são genéricos (`:376-380`).

**Geração da HDA (`/api/gerar-hc`)**
- `claude-haiku-4-5`, 1800 tokens, `messages.create` (`api/gerar-hc.js:31-32,214-225`).
- Redige a narrativa, sem diagnóstico. Proíbe inventar sintomas, exames, doses e diagnósticos (`:45`). Pede destaque de red flags (`:51`).
- Exige login, sem gate de plano (`:6-9`). Limite de 40 por dia, com fail-closed (`:37,181-202`). O front cai no motor local se falhar.

**Front (`anamnesismed-assistente.js`, `anamnesismed-app.html`)**
- Trava de plano Pro no cliente e no servidor (`anamnesismed-assistente.js:27-42`).
- Saída escapada com `esc()` contra XSS (`:19-23,137`). Tratamento de erro sem despejar JSON cru (`:180-191`).
- Avisos na tela: subtítulo "não substitui o julgamento clínico" (`anamnesismed-app.html:606`), disclaimer fixo "apoio à decisão... não emite diagnóstico definitivo nem prescreve tratamento" (`:637`) e status "revise com julgamento clínico" (`anamnesismed-assistente.js:94`).
- Payload sem nome nem documento (`anamnesismed-narrativa.js:782-785`).

**Termos e privacidade**
- Termos: "AVISO CRÍTICO... Não constitui orientação médica, diagnóstico ou prescrição" (`anamnesismed-terms.html:168-171`). Isenção de responsabilidade clínica (`:195-202`). Público restrito a médicos, estudantes e profissionais de saúde (`:335`). Checkbox de aceite (`:365`).
- Termos citam fontes de referência do conteúdo estático (`:226-257`).
- Privacidade: responsabilidade do usuário pela LGPD (`anamnesismed-privacy.html:172`), recomenda não inserir dados identificáveis, direitos de acesso e exclusão (`:188-190`), sem venda de dados (`:146`).

**Testes (`npm test` = `node --test`, `package.json:6`)**
- `test/assistente-dx.test.js` (104 linhas): só `parseRelatorio` (JSON limpo, cercas, truncado, campos ausentes). Não há teste de qualidade clínica.
- `test/narrativa.test.js` e `test/stripe-webhook.test.js` não cobrem a IA com a Claude API.
- Nenhum teste de `gerar-hc.js`, do handler (auth, plano, limite) nem dos prompts.

## 2. Falta

- **Citação de fontes: zero.** Prompt, schema e UI não têm campo de referência. O prompt nem instrui fontes (`api/assistente-dx.js:59-68`). O modelo responde só do conhecimento paramétrico, sem fonte aberta, recente ou verificável. Não há RAG, busca, web ou base de guias.
- Sem conduta terapêutica (proibida no prompt), então o pilar "plano de tratamento" não existe. Há apenas lista de exames, sem justificativa, prioridade nem custo, e sem diretriz que a embase.
- Sem avaliação de qualidade: nenhum conjunto de casos de referência (golden set), métrica (acerto do diagnóstico em top-3, sensibilidade a can't-miss), revisão por especialistas, teste de regressão do prompt ao trocar modelo, nem verificação de alucinação.
- Sem feedback do médico (útil/inútil, correto/errado) e sem registro da saída da IA para auditoria.
- `probabilidade` alta/média/baixa é opinião do LLM, sem calibração e sem aviso disso na tela.
- Aviso legal só aparece **depois** do resultado e em fonte de 11px (`anamnesismed-app.html:459,637`). Não há aceite específico do uso de IA, nem aviso de "pode conter erros".
- Os termos descrevem a ferramenta como "educacional" e não mencionam IA generativa nem o Assistente. A privacidade não cita a Anthropic como operador/suboperador nem a transferência internacional. Também não cita retenção ou treino em dados.
- Termos dizem "não compartilha dados de pacientes com terceiros" (`anamnesismed-terms.html:299`) e privacidade "nunca compartilha... com terceiros" (`anamnesismed-privacy.html:146`), o que **conflita** com o envio da HC à Anthropic.
- Sem DPO/encarregado, RIPD/DPIA, base legal (art. 11 LGPD) nem registro de consentimento do paciente.
- Sem plano de IA própria (dados, rotulagem, licenças de livros/guias).

## 3. Riscos

**Segurança do paciente**
- Alucinação de diagnóstico ou exame sem fonte nem verificação. Prompt exige "can't-miss", mas nada garante que ocorra.
- Viés de automação: o texto "alta probabilidade" em badge vermelho (`anamnesismed-assistente.js:128`) pode ancorar o médico, sobretudo o estudante.
- Fail-open do limite no assistente (`api/assistente-dx.js:305-318`): falha da tabela libera chamadas sem teto (risco de custo, não clínico).
- Parser permissivo: resposta truncada é "reparada" e exibida como completa (`:198-218`). Seções finais, como sinais de alarme, podem sumir sem aviso na tela.
- `raw` exibido quando o parse falha (`:369`) é conteúdo não validado.
- Prompt injection: `relatoLivre` e respostas entram no prompt sem delimitação nem instrução anti-injeção (`:112-188`).
- Sem alerta de emergência (ex.: dor torácica) por regra determinística, só pelo LLM.

**LGPD**
- Dados de saúde são sensíveis (art. 5, II e art. 11). A HC vai a um suboperador nos EUA (Anthropic) sem previsão nos documentos nem cláusulas de transferência (art. 33).
- "Anonimização" é só omitir nome e documento do payload (`anamnesismed-narrativa.js:782-785`). Textos livres (`relatoLivre`, medicação, cirurgias, antecedentes) não passam por filtro de PII. Idade, sexo e história rara podem reidentificar. Logo, não é anonimização no sentido do art. 12, e sim pseudonimização na melhor hipótese.
- Cláusulas contraditórias (ver Falta) geram risco de propaganda enganosa e de descumprimento do dever de informação (arts. 6, VI e 9).
- Responsabilização integral do usuário (`anamnesismed-privacy.html:172`) não afasta o dever do controlador/operador. Nem os termos descrevem o papel da plataforma.
- Sem política de retenção da saída da IA nem opção de exclusão específica.

**Regulação (SaMD / ANVISA)**
- Software que sugere diagnóstico e exames a partir de dados do paciente tende a ser **SaMD** (RDC ANVISA 657/2022 e 751/2022). Pode ser classe II ou superior pela regra de software de apoio à decisão. Rotular como "educacional" nos termos não afasta a classificação, pois a finalidade real é o apoio clínico (e a landing/roadmap devem ser conferidos).
- Sem registro/notificação, sistema de qualidade (ISO 13485), gestão de risco (ISO 14971), validação clínica nem vigilância pós-mercado.
- CFM (Res. 2.314/2022 sobre telemedicina) e Res. CFM sobre IA em medicina em discussão: exigem supervisão humana e transparência. Verificar com jurídico o enquadramento atual.
- Mitigação possível: restringir o produto a ensino/revisão de caso, ou posicionar como apoio sem diagnóstico, com consulta formal à ANVISA.

## 4. Checklist priorizado

**P0 — antes de ampliar o uso**
- [ ] Corrigir termos e privacidade: informar IA generativa, envio de dados à Anthropic, transferência internacional, retenção e papel de operador. Remover "não compartilha com terceiros".
- [ ] Parecer jurídico/regulatório sobre SaMD (ANVISA) e CFM; decidir entre posicionamento educacional estrito e caminho de registro.
- [ ] Aviso de IA **antes** de analisar e aceite específico registrado (versão e data), em tamanho legível.
- [ ] Filtro de PII nos textos livres (nome, CPF, telefone, datas exatas) antes do envio, com aviso ao usuário.
- [ ] Confirmar com a Anthropic o acordo de zero retenção/sem treino (DPA) e documentar.
- [ ] RIPD (relatório de impacto) e indicação de encarregado/DPO.

**P1 — qualidade e segurança clínica**
- [ ] Criar golden set (30-100 casos revisados por médicos) e script de avaliação (top-3, can't-miss, alucinação, exames desnecessários) rodando em CI.
- [ ] Teste de regressão de prompt ao trocar de modelo (`MODEL` fixo em `api/assistente-dx.js:30`).
- [ ] Testes de handler com mocks: 401/403/429, fail-open vs fail-closed, input acima do limite, injeção no `relatoLivre`.
- [ ] Delimitar a HC no prompt (tags XML) e instruir contra instruções embutidas nos dados.
- [ ] Sinalizar na tela quando a resposta foi truncada/reparada; não exibir `raw` sem aviso.
- [ ] Coletar feedback do médico por análise (útil/errado/perigoso) e registrar versão de prompt e modelo.
- [ ] Reavaliar o selo de probabilidade (renomear para "plausibilidade qualitativa" ou remover a cor vermelha).

**P2 — fase 1 com fontes (RAG)**
- [ ] Definir fontes abertas e recentes (guias SBC, MS/CONITEC, NICE, WHO, PubMed/Europe PMC, UpToDate fora) e licenças.
- [ ] Adicionar `fontes:[{titulo,url,ano,trecho}]` ao schema, ao prompt e à UI. Proibir afirmação clínica sem fonte e validar URL/DOI.
- [ ] Recuperação (busca vetorial ou web tool) com data de revisão visível; mostrar "sem fonte encontrada" em vez de inventar.
- [ ] Decidir se haverá sugestão terapêutica; se sim, só com diretriz citada, sem doses, e reclassificar o risco regulatório.
- [ ] Fail-closed no limite do assistente, como em `gerar-hc.js`.

**P3 — IA própria (fase futura)**
- [ ] Inventário de livros/guias, licenças de uso para treino e plano de curadoria.
- [ ] Governança de dados de treino (sem HC de usuários sem base legal e consentimento).
- [ ] Plano de validação clínica prospectiva, monitoramento de deriva e vigilância pós-mercado.
