# Auditoria 02 — Pilar História Clínica (HC)

Escopo: HC do ESTUDANTE = completa/didática; HC do MÉDICO = enxuta (só o usado na prática BR/ES), terminando em hipótese diagnóstica + exames + plano terapêutico. Somente leitura; nenhum código alterado.

## 1. Existe (hoje)

Estrutura única de 13 painéis em `anamnesismed-app.html` (`#hc-sections`, l.644):
- S0 Identificação `panel-dados` (l.646; inclui Ocupação l.706) | S1 Motivo de consulta `panel-mc` (l.820)
- S2 AEA/HDA `panel-aea` (l.910): guia por motivo (até 3 motivos) + relato livre `#aea-texto` (l.931) + botão "Gerar HC" (l.937)
- S3 AREA `panel-area` (l.974) | S4 APP (l.1007) | S5 APGO só sexo F (l.1203, `display:none` por padrão) | S6 APF (l.1250) | S7 Admissões prévias (l.1322) | S8 Hábitos + CASE (l.1343)
- S9 RAS `panel-ras` (l.1498), 100% local: `src/ras.js` (sistemas com perguntas fixas, ex. l.1-40) + `renderRAS` (app.html:2300) destaca sistemas por motivo
- S10 Exame físico `panel-exfis` (l.1517)
- S11 Sumário: achados, síndromes, hipóteses `#sum-hipoteses` (l.1653-1680, textarea livre)
- S12 Plano `panel-plano` (l.1684): `plan-exames`, `plan-trat`, `plan-conduta`, `plan-obs` (l.1700-1712), textareas livres.

Quem gera o quê:
- IA (Claude Haiku 4.5, `api/gerar-hc.js:34`) gera SOMENTE a narrativa da AEA/HDA (prompt l.40-85, "seção AEA"). Entrada: idade, sexo, tempo de evolução, motivos+respostas do guia e relato livre (`anamnesismed-narrativa.js:715-745`). Antecedentes, RAS, exame físico, hipóteses e plano NÃO vão no payload.
- Motor local (fallback) `anamnesismed-narrativa.js`: `gerarNarrativaAEACompleta` (l.690), `gerarNarrativaAEA_generica/_cefaleia/_tosse` (l.130/10/483). Fallback automático em `gerarHCviaIA` (l.748-780); status da fonte exibido ao usuário (app.html:2599+).
- Antecedentes, RAS, exame físico, sumário e plano: 100% manuais/locais, só montados no PDF (`anamnesismed-pdf.js:166-277` seções 2-12; RAS l.314-342; plano l.277-285).
- IA de apoio diagnóstico é SEPARADA: `api/assistente-dx.js` (hipóteses ddx, "paraFechar", l.49-72), acionada por `hcAnalisarComIA` (app.html:2713). O resultado vive na aba "Assistente IA" e não é gravado em `sum-hipoteses`/`plan-*` (nenhuma escrita automática encontrada).
- Conduta do guia: `anamnesismed-guide.js:239-259` (`buildCondutaHTML`: passos, exames, drogas) a partir de `conduta` em `anamnesismed-motivos.js` (32 ocorrências, l.7720...); só vira texto na HC via campo livre `conduta-guide-text` (pdf.js:282).
- Rascunho/PDF: `exportPDF` (pdf.js:43), omite seções vazias e renumera (pdf.js ~292).

## 2. Falta

1. Distinção por perfil: NÃO existe. Nenhum campo/flag estudante×médico em app.html, narrativa.js, pdf.js, gerar-hc.js, guide.js (grep de perfil/role/estudante: só landing e roadmap citam). `gerar-hc.js:30-32` admite: "quando os planos forem segmentados (médico×estudante)". Todos veem os mesmos 13 painéis; `onboardingCheckAndShow(profile)` (app.html:2835) é o único gancho de perfil.
2. Modo enxuto do médico: não há versão curta. Painéis S3, S7, parte de S8 (CASE), RAS completo e AREA são didáticos e pesam num atendimento real.
3. Fecho diagnóstico+exames+tratamento: os campos existem (S11/S12) mas são texto livre vazio. Nada os pré-preenche a partir do assistente-dx (que já produz hipóteses e "paraFechar") nem do `conduta` do guia (exames/drogas só como checklist visual, pdf só copia notas livres).
4. A IA não redige a HC inteira: sem texto integrado de antecedentes + exame físico + raciocínio; PDF é colagem de blocos.
5. Hipótese sem estrutura: sem CID-10/CIE-10, sem principal×diferenciais, sem grau de certeza. Plano sem separação exames laboratoriais×imagem×encaminhamento, sem posologia estruturada, sem retorno/orientações/sinais de alarme ao paciente.
6. Sem ES-específico de prática (ex.: CIE-10, nomenclatura de fármacos/esquemas locais); `gerar-hc.js` só troca idioma, não o protocolo local.
7. Prompt proíbe inventar (regra 1) e o tema "11. sem comentários": coerente, mas impede a IA de propor hipótese/plano; é preciso rota/prompt novo, não ajuste.
8. Teto único DAILY_LIMIT=40 (`gerar-hc.js:35`) e sem gate de plano/perfil (l.5-6).

## 3. Riscos

- Clínico/legal: IA sugerir conduta/dose sem profissional revisar. Mitigar: sempre rascunho editável, rótulo "sugestão", sem prescrição automática; fonte e data do conteúdo do guia.
- Alucinação em hipótese/plano (o prompt atual só é seguro porque a IA não opina).
- Divergência IA × motor local: o prompt precisa espelhar o motor (comentário gerar-hc.js:~85); um modo médico duplica esse custo de manutenção.
- LGPD/dados sensíveis: payload hoje sem nome (bom: só idade/sexo); ampliar para antecedentes/exame exige continuar sem identificadores diretos. HC salva em `saveHC`; revisar retenção.
- Custo: HC completa maior que 1800 tokens (`MAX_TOKENS`, l.35) e mais chamadas por perfil; cache do system não ativa (<4096 tokens, comentário l.~190).
- UX: médico ver 13 painéis abandona o produto; estudante com versão curta perde didática.
- PDF: renumeração dinâmica e seções omitidas podem esconder lacunas importantes (ex.: alergias não preenchidas = "sem dado" vs "nega").
- Consistência: textos "AEA/AREA" são nomenclatura ES; BR usa HDA/antecedentes — revisar rótulos por idioma.

## 4. Checklist priorizado

P0 (decisão e base)
- [ ] Definir perfil (estudante|médico) em `profiles` e expor via `profileGet()`; guardar também no PDF/HC salva
- [ ] Mapear por painel: obrigatório médico / opcional / só estudante (S0 mín., S1, S2, S4 alergias+medicações+comorbidades, S10 sinais vitais+exame dirigido, S11, S12)
- [ ] Regra de design: o médico sempre termina em S11+S12 preenchidos antes de exportar (aviso, não bloqueio)

P1 (fechar a HC)
- [ ] Botão "Sugerir hipótese + exames + conduta" que reaproveita `assistente-dx` e pré-preenche `sum-hipoteses`, `plan-exames`, `plan-trat`, `plan-conduta` (editáveis, marcados como sugestão da IA)
- [ ] Pré-popular exames/drogas a partir de `conduta` do guia (`anamnesismed-guide.js:239`) com 1 clique "adicionar ao plano"
- [ ] Estruturar hipótese (principal + diferenciais + CID-10/CIE-10) e plano (exames, tratamento com posologia, encaminhamento, retorno, sinais de alarme)
- [ ] Ampliar payload de `gerar-hc` (antecedentes, RAS positivo, exame físico) para HC integrada, sem identificadores diretos

P2 (perfil)
- [ ] Esconder/colapsar painéis didáticos no modo médico (S3, S7, CASE, RAS completo → só sistemas relevantes ao motivo)
- [ ] Modo estudante: manter completo + dicas/mnemônicas + checklist do que falta para fechar o diagnóstico
- [ ] Prompt e `MAX_TOKENS` distintos por perfil em `api/gerar-hc.js`; limite diário por perfil (comentário l.30-32)
- [ ] Template PDF enxuto (1-2 páginas) para médico; completo para estudante

P3 (ES/qualidade)
- [ ] Rótulos BR (HDA) × ES (HEA/Enfermedad actual) e protocolos locais (CIE-10, fármacos) por idioma
- [ ] Testes: HC com/sem IA, fallback local, PDF sem seções vazias, mesmo conteúdo IA×motor
- [ ] Aviso legal "apoio ao raciocínio; responsabilidade do profissional" no PDF e na tela
