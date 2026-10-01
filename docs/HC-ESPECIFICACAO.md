# Especificação da História Clínica por perfil (Fase 2)

> **Status: PROPOSTA para o dono revisar.** Nenhum código foi alterado: `anamnesismed-app.html`, `anamnesismed-narrativa.js`, `anamnesismed-pdf.js` e `api/` estão em uso pela outra branch (`claude/anamnese-medica-correcao-lfvmyq`), então a implementação só começa **depois do merge dela**.
> Base: `docs/auditoria/02-historia-clinica.md` (o que existe) e `docs/pesquisa/hc-medico-modelos.md` (como se preenche na prática).
> **Limite da base:** os modelos de HC enxuta vêm de resumos de normas, sem o texto integral e sem modelos de hospital. Antes de citar norma na tela, conferir o texto original.

## 1. Princípio

| | **Médico** | **Estudante** |
|---|---|---|
| Objetivo | registrar o atendimento de forma **rápida, objetiva e legalmente suficiente** | **treinar o raciocínio** com a HC completa |
| Tamanho | 8 seções (modelo BR/ES da pesquisa); campo vazio **não aparece** | 13 painéis completos, com dicas e mnemônicas |
| Fechamento | hipótese + exames + conduta, **com sugestão da IA editável** | o mesmo, **com o raciocínio explicado** e o checklist do que falta |
| PDF | 1 a 2 páginas, formato de prontuário | completo, didático |

Regra de segurança em todos os casos: a IA só **sugere**; tudo que ela preenche vem marcado como "sugestão da IA", é editável e **nunca é gravado como decisão**. Aviso "apoio ao raciocínio; a decisão é do profissional" na tela e no PDF.

## 2. Mapa dos 13 painéis atuais por perfil

Legenda: ● mostra aberto · ◐ mostra recolhido/opcional · ○ não mostra.

| # | Painel atual | Médico | Estudante | Observação para o Médico |
|---|---|---|---|---|
| S0 | Identificação | ● | ● | Médico: mínimo (nome, idade, sexo); ocupação recolhida |
| S1 | Motivo de consulta | ● | ● | Vira "queixa principal" |
| S2 | AEA / HDA (guia + relato livre) | ● | ● | Médico: relato livre primeiro; guia opcional |
| S3 | AREA (antecedentes da enfermidade, do estudante) | ○ | ● | Didático; o médico não preenche |
| S4 | Antecedentes pessoais (APP) | ● | ● | Médico: **só** comorbidades, medicações em uso, alergias, cirurgias |
| S5 | APGO (só sexo feminino) | ◐ | ● | Médico: só se relevante ao motivo |
| S6 | Antecedentes familiares | ◐ | ● | Médico: só se relevante |
| S7 | Admissões prévias | ○ | ● | Didático |
| S8 | Hábitos + CASE | ◐ | ● | Médico: tabagismo/álcool se relevante; CASE didático |
| S9 | RAS (revisão de sistemas) | ◐ | ● | Médico: **só os sistemas pertinentes ao motivo** e só sintomas positivos |
| S10 | Exame físico | ● | ● | Médico: sinais vitais + achados pertinentes |
| S11 | Sumário / hipóteses | ● | ● | **Estruturado** (ver §4) |
| S12 | Plano | ● | ● | **Estruturado** (ver §4) |
| — | Assinatura / CRM / data e hora | ● | ○ | Só no médico (obrigatório no prontuário) |

Decisão a confirmar: o perfil vem de `tipo_usuario` (Médico ou Estudante). **Residente conta como Médico** (já decidido). Permitir ao médico "ver HC completa" com um botão, sem trocar de perfil?

## 3. As 8 seções do Médico (modelo da pesquisa)

| Seção | BR (SOAP leve) | ES | Origem dos dados no app |
|---|---|---|---|
| 1 Cabeçalho | paciente, data/hora, médico + CRM | paciente, fecha, profesional + nº colegiado | S0 + perfil |
| 2 Queixa e HDA | S: queixa e HDA | motivo de consulta y enfermedad actual | S1 + S2 (narrativa) |
| 3 Antecedentes relevantes | S: comorbidades, medicações, alergias, cirurgias | antecedentes relevantes, alergias, medicación habitual | S4 (+ S5/S6/S8 se relevante) |
| 4 Exame físico | O: sinais vitais + achados | exploración física (constantes + hallazgos) | S10 |
| 5 Complementares | O: exames trazidos/solicitados | pruebas complementarias | S12 (exames) |
| 6 Hipótese / diagnóstico | A: hipótese + CID-10 | juicio clínico + CIE-10 | S11 |
| 7 Conduta | P: prescrição, exames, orientações, retorno | plan / tratamiento, seguimiento | S12 |
| 8 Assinatura e evolução | assinatura/CRM; retornos | firma / nº colegiado; evolución | perfil + HCs de retorno |

Diferença BR × ES: **rótulos e identificação profissional**; a estrutura é a mesma. México: acrescentar peso e estatura nos sinais vitais **[conferir NOM-004]**.

## 4. Fechamento estruturado (S11 e S12)

Hoje são campos de texto livre e vazios. Proposta de estrutura, preenchida **manualmente ou pela sugestão da IA**:

**Hipótese (S11)**
- Hipótese principal (texto + CID-10/CIE-10 opcional)
- Diferenciais (lista, em ordem)
- Grau de certeza: **sem cor nem percentual** (o selo atual de probabilidade em vermelho foi apontado como risco de viés de automação) — usar "mais provável / possível / a excluir"
- Sinais de alarme encontrados

**Plano (S12)**
- Exames: laboratoriais · imagem · outros
- Tratamento: medidas · medicamentos (a dose só entra se vier de fonte e for confirmada pelo médico)
- Encaminhamento · retorno · orientações e sinais de alarme ao paciente

**Fontes de preenchimento (cada item mostra de onde veio)**
1. Digitado pelo profissional
2. "Adicionar ao plano" a partir da `conduta` do guia do motivo (1 clique)
3. Sugestão da IA (rótulo "sugestão da IA", com fonte citada quando houver RAG)

## 5. Contrato da IA (nova rota, depois do merge)

A rota atual `gerar-hc` só redige a HDA e o prompt **proíbe** opinar; para sugerir hipótese e plano é preciso **rota e prompt novos**, sem alterar a atual.

| Item | Médico | Estudante |
|---|---|---|
| Entrada | HC sem identificadores diretos (sem nome, documento, telefone, datas exatas) | igual |
| Saída | hipótese principal + diferenciais, exames, conduta — **direto e curto** | igual **+ raciocínio explicado**, achados a favor/contra, perguntas que faltam, referência de estudo |
| Fonte | cita diretriz/livro/ano quando houver | idem |
| Doses | não gera doses; só classe do fármaco | idem |
| Aviso | sempre | sempre |
| Falha | cai no motor local e **diz o motivo na tela** (como hoje) | igual |

Pontos de LGPD, aceite de IA e filtro de PII ficam na Fase 0.2; a outra branch já tem `docs/lgpd.md`, a conferir.

## 6. PDF

| | Médico | Estudante |
|---|---|---|
| Formato | prontuário de 1 a 2 páginas, 8 seções, sem seção vazia, assinatura/CRM | completo (como hoje) |
| Rótulos | por idioma e país (HDA × HEA, CID-10 × CIE-10) | por idioma |
| Rodapé | aviso de apoio à decisão | idem |

## 7. Critérios de aceite (para o agente `qa-historia-clinica`)

Para cada combinação **perfil (médico, estudante) × idioma (PT, ES) × caminho (com IA, motor local)**:
- [ ] A HC mostra as seções do perfil e nenhuma outra
- [ ] Termina com hipótese, exames e conduta; tudo da IA marcado "sugestão" e editável
- [ ] O PDF não tem seção vazia, usa os rótulos do idioma e traz o aviso
- [ ] O texto da IA e o do motor local seguem o mesmo padrão
- [ ] Nenhum identificador direto do paciente vai à IA
- [ ] Médico preenche uma HC típica em **poucos minutos** (medir com 3 casos reais fictícios)

## 8. Decisões do dono

- [ ] Aprovar o mapa de painéis por perfil (§2): o que o médico vê aberto, recolhido ou oculto
- [ ] Médico poderá abrir a "HC completa" por um botão?
- [ ] Aprovar as 8 seções (§3) e a estrutura de hipótese/plano (§4)
- [ ] Grau de certeza só em palavras, sem cor nem percentual?
- [ ] O que o seu estágio/hospital realmente preenche, para ajustar o modelo do médico (a pesquisa não achou modelo de hospital)

## 9. Implementação (depois do merge da outra branch)

- [ ] `tipo_usuario` exposto ao app e gravado na HC salva (hoje o cliente grava esse campo; ver Fase 1)
- [ ] Modo Médico no `anamnesismed-app.html` (painéis por perfil) e S11/S12 estruturados
- [ ] Nova rota de IA de fechamento + prompts por perfil
- [ ] PDF enxuto do médico e rótulos por país
- [ ] Testes de aceite do §7 e revisão pelo agente `qa-historia-clinica`
