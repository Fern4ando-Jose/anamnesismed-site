# AnamnesisMed — Mapa de trabalho

> Base: `docs/ESCOPO.md` + auditorias em `docs/auditoria/` + pesquisas em `docs/pesquisa/`.
> Cada item tem um checklist (`- [ ]`) e um **critério de aceite**. Um item só é marcado `[x]` depois de passar pelo agente de revisão da fase (ver §8).
> Prioridade: **P0** bloqueia o resto · P1 núcleo · P2 expansão · P3 refinamento.

## Estado atual (resumo da auditoria)

| Pilar | Existe | Lacuna principal |
|---|---|---|
| Planos | trial 30d + plano único `pro` (Stripe) | **RLS permite o usuário se dar plano** · checkout sem auth · sem plano Médico |
| HC | 13 painéis fixos, narrativa da HDA por IA, PDF | sem distinção médico×estudante · hipótese/exames/conduta são texto livre vazio |
| IA | `assistente-dx` (diferencial, exame físico, exames) | sem fontes/RAG · sem avaliação · termos/privacidade contradizem o uso da IA |
| Conteúdo | 33 motivos (25 sintomas, 8 enfermidades), 4 especialidades, PT/ES | sem guia de estudo, sem casos, sem referências por item |

---

## FASE 0 — Base e decisões (antes de qualquer funcionalidade)

### 0.1 Segurança de acesso (P0)
> **Feita em outra sessão**, branch `claude/anamnese-medica-correcao-lfvmyq` (ainda **não está no `main`**): checkout autenticado, plano protegido por trigger, cota atômica (`consumir_cota_ia`), CSP e webhook robusto, com testes e migrations. Eu havia implementado o mesmo e **retirei o meu código** deste PR para não duplicar nem conflitar; ficaram só os documentos.
- [x] Bloqueio do cliente em `plano`/`trial_end`/`stripe_id`: **ativo em produção** (trigger `trg_profiles_protege_billing`). Verificado em 01/10/2026 com teste revertido no banco real: `pro` continua `pro`, `trial` não vira `pro`, trial e `stripe_id` não mudam, DELETE bloqueado
- [x] Checkout autenticado, cota atômica, webhook robusto — **na outra branch** (migrations já aplicadas em produção)
- [ ] **Levar a outra branch ao `main`** (dono decide quando mergear; a minha branch não depende dela)
- [ ] **Revisar a outra branch** com o agente `qa-planos-acesso` + `revisor-seguranca-ia` antes do merge (o QA que rodei revisou o *meu* código, não o dela). Pontos a conferir, do QA em `docs/auditoria/05-qa-fase-0.1.md`: webhook conferindo o `error` do `update`; perfil `trial` com `trial_end` NULL; `trial_end` vencido bloqueando `gerar-hc`; testes que aceitam 500/503 como sucesso
- **Aceite:** um usuário autenticado **não** consegue se tornar `pro` via API do Supabase nem criar checkout para outro usuário. ✔ banco (confirmado); checkout: confirmar após o merge da outra branch.

### 0.2 Jurídico e LGPD (P0)
- [ ] Reescrever termos e privacidade: IA generativa, envio à Anthropic, transferência internacional, retenção; remover "não compartilha com terceiros"
- [ ] Aviso de IA + aceite registrado (versão/data) antes da primeira análise
- [ ] Filtro de PII nos textos livres antes do envio à IA
- [ ] Confirmar DPA / zero-retenção com a Anthropic e documentar
- [ ] RIPD e indicação de encarregado (DPO)
- [ ] **Parecer de advogado** sobre SaMD (ANVISA) e CFM — define o enquadramento "apoio educacional" × dispositivo médico
- **Aceite:** textos revisados por advogado; aviso visível na tela, no PDF e nos termos.

### 0.3 Modelo de dados do conteúdo (P0)
> Desenho aprovado pelo dono (enfermidade **separada** do motivo). Detalhes e ajustes: `docs/ESQUEMA-ENFERMIDADE.md`.
- [x] Esquema `enfermidade` (com `casos[]` dentro) documentado
- [x] `scripts/build.js` com `AM.enfermidade`; aborta se houver erro; só guias `publicado` vão ao arquivo público
- [x] Validador (obrigatórios, paridade PT/ES, refs, ids, fármacos, status, casos) ligado ao `scripts/verify.sh` — 11 testes
- [x] Piloto: `apendicite-aguda`, `pancreatite-aguda` e `colecistite-aguda` em `src/enfermidades/` (**rascunhos**, 1 caso cada, refs ainda não conferidas)
- [ ] Unificar a lista de especialidades (hoje duplicada em `build.js`, `SPEC_META`, `REF_PAGE`) — **toca HTML**, esperar o merge da outra branch
- [x] Revisão independente da apendicite feita: `docs/auditoria/06-revisao-clinica-apendicite.md` (refs 1–3 existem; ref 0 Sabiston não verificada; limite: sem acesso a texto integral nem livro)
- [x] **Guia do motivo `src/motivos/apendicite.js` corrigido (autorizado pelo dono)**, PT e ES: tabela do AIR refeita (rebote/defesa = 1 item de 1 a 3; neutrófilos incluídos; soma máx. 12), mnemônico ES do Alvarado trocado por MANTRELS, > em vez de ≥ (temperatura e leucocitose), analgesia sem citar dipirona como estudada, antibiótico pré-op com cobertura de anaeróbios e janela de 60 min, esquema da forma perfurada com intervalos, TC sem "gold standard" e Rx só se suspeita de perfuração/obstrução, "grito de Laffont" removido, cortes sem fonte (leucocitose >18.000, T >38,5, anorexia >90%) removidos, Alvarado não decide cirurgia sozinho em mulher/criança/idoso
- [ ] **Dono confirma pelos livros**: doses e intervalos (cefazolina 2 g, metronidazol 500 mg 8/8h, ceftriaxona 1–2 g 24/24h), duração do antibiótico na forma perfurada, janela de observação de 12–24 h (sem fonte) e o ponto de corte da USG (>6 mm), ainda não incluído
- [ ] **Depois do merge das duas branches: rodar `node scripts/versionar-assets.mjs`** (ou `scripts/verify.sh`) e commitar os HTMLs. `anamnesismed-motivos.js` mudou e o navegador só baixa a versão nova se o carimbo `?v=` mudar. Não commitei os HTMLs agora para não conflitar com a outra branch
- [ ] Dono confere a guia `apendicite-aguda` pelos livros; depois `verificada: true` e `status`
- **Aceite:** `verify.sh` falha se uma enfermidade não tiver referência ou tradução. ✔

### 0.4 Decisões do dono (bloqueiam fases seguintes)
- [x] Residente conta como **Médico** (decidido pelo dono)
- [x] Preço e limites: **definir depois da ferramenta 100% pronta** (decidido pelo dono)
- [x] Fontes aceitas: `docs/FONTES-E-ESPECIALIDADES.md` §1 (livros, diretrizes, periódicos; citação sem cópia) — **validado pelo dono**; edições a confirmar por área
- [ ] Posicionamento regulatório após o parecer (educacional × registro)
- [x] 1ª onda: cardiologia, endocrinologia, neurologia, infectologia, gineco-obstetrícia, pediatria — **validado pelo dono**

---

## FASE 1 — Planos Médico e Estudante

- [ ] **P1** Migration de `profiles`: `tipo_usuario` CHECK, `plano` CHECK (`trial|estudante|medico`), `plano_status`
- [ ] **P1** Unificar a escolha de perfil (modal de onboarding × `role-register` do cadastro)
- [ ] **P1** Dois preços no Stripe; checkout valida plano × `tipo_usuario`
- [ ] **P1** Webhook por plano (`subscription.updated`, `payment_failed` com carência) + testes
- [ ] **P1** `profileCheckAccess` devolve `{plano, tipo, active}`; gate da UI aceita qualquer plano pago
- [ ] **P2** Mapa de limites por plano, lido do perfil
- [ ] **P3** Landing/dashboard/config com rótulos e botões reais; remover promessas não entregues
- [ ] **P3** Vínculo acadêmico para Estudante · Billing Portal · estado `expired`
- **Aceite:** os dois planos cobram, ativam, expiram e limitam a IA corretamente; teste de webhook para cada plano.

---

## FASE 2 — História clínica

### 2.1 HC por perfil
- [ ] **P0** Expor `tipo_usuario` ao app e gravá-lo na HC salva
- [ ] **P0** Mapear cada painel: obrigatório (médico) / opcional / só estudante, usando `docs/pesquisa/hc-medico-modelos.md`
- [ ] **P2** Modo Médico: 8 seções (cabeçalho, queixa e HDA, antecedentes relevantes, exame físico, complementares, hipótese/CID, conduta, assinatura/evolução); painéis didáticos colapsados
- [ ] **P2** Modo Estudante: HC completa + dicas, mnemônicas e checklist do que falta para fechar o diagnóstico
- [ ] **P2** PDF enxuto (1–2 páginas) para o médico · PDF completo para o estudante
- [ ] **P3** Rótulos BR (HDA) × ES (HEA/Enfermedad actual), CID-10 × CIE-10, protocolos locais

### 2.2 Fechar a HC (hipótese + exames + conduta)
- [ ] **P1** Botão "Sugerir hipótese + exames + conduta" (usa `assistente-dx`) que pré-preenche os campos S11/S12, marcados como **sugestão da IA** e editáveis
- [ ] **P1** "Adicionar ao plano" com 1 clique a partir da conduta do guia
- [ ] **P1** Hipótese estruturada (principal + diferenciais + CID) e plano estruturado (exames, tratamento, encaminhamento, retorno, sinais de alarme)
- [ ] **P1** Ampliar o payload de `gerar-hc` (antecedentes, RAS, exame físico) sem identificadores diretos
- [ ] **P3** Aviso "apoio ao raciocínio; decisão do profissional" no PDF e na tela
- **Aceite:** uma HC completa termina com hipótese, exames e conduta, sem seção vazia no PDF; igual com IA e com o motor local.

---

## FASE 3 — IA de apoio (fase 1: fontes abertas + Claude)

- [ ] **P1** Golden set de 30–100 casos revisados por médicos + script de avaliação em CI (top-3, não perder diagnóstico grave, alucinação)
- [ ] **P1** Testes de handler (401/403/429, injeção no relato livre, limite) · delimitar a HC no prompt (XML) · avisar quando a resposta foi truncada/reparada
- [ ] **P1** Feedback do médico por análise (útil/errado/perigoso) registrando versão de prompt e modelo
- [ ] **P1** Reavaliar o selo de probabilidade (vermelho induz viés de automação)
- [ ] **P2** Corpus RAG inicial só de fontes seguras: PMC (uso comercial), SciELO, MedlinePlus; pedir autorização escrita para SBC/SBP/SBPT/AMB/GuíaSalud etc.; **não** indexar StatPearls/NICE/OMS/PCDT sem checar licença
- [ ] **P2** pgvector no Supabase, busca híbrida PT/ES, citações validadas no servidor, "sem fonte encontrada" em vez de inventar
- [ ] **P2** Decidir se a IA sugere tratamento; se sim, só com diretriz citada e reclassificando o risco regulatório
- [ ] **P2** Fail-closed no limite do assistente
- [ ] **P3 (futuro)** IA própria: inventário de licenças de livros, governança de dados de treino com consentimento, validação clínica prospectiva
- [ ] **P3 (futuro)** Consulta a advogado de PI **antes** de divulgar a arquitetura publicamente (patenteabilidade)
- **Aceite:** toda afirmação clínica da IA traz fonte verificável; golden set acima do limiar definido com o dono.

---

## FASE 4 — Conteúdo por especialidade

### 4.1 Corrigir o que existe
- [ ] **P1** `refs[]` em todas as escalas, sinais e doses dos guias
- [ ] **P1** Converter as 8 enfermidades cirúrgicas em guias de estudo completos (piloto: apendicite, pancreatite, colecistite)
- [ ] **P1** Completar `expectoracao`, `hemoptise` (ES), `edema`, `tosse`, `dispneia`
- [ ] **P1** Marcar `redFlag`/`showIf` nas anamneses que não têm
- [ ] **P1** `mnemonicas.html` passa a ser gerada de `GUIDE_CONTENT` (sem lista duplicada)
- [ ] **P1** DDx dos motivos clicáveis, abrindo o guia da enfermidade

### 4.2 Novas especialidades — 1ª onda
Cardiologia · Endocrinologia · Neurologia · Infectologia · Gineco-Obstetrícia · Pediatria (10–15 enfermidades cada; lista em `docs/auditoria/04-conteudo.md` §5).
Para cada enfermidade: guia de estudo + 1 caso + referências + PT/ES.
- [ ] Cardiologia · [ ] Endocrinologia · [ ] Neurologia · [ ] Infectologia · [ ] Gineco-Obstetrícia · [ ] Pediatria
- [ ] Páginas de exame físico para cardio, neuro e semiologia

### 4.3 Experiência do estudante
- [ ] **P3** Renderer de guia de estudo e de casos (PT/ES) com autoavaliação
- [ ] **P3** Selo `revisadoEm` / `revisor` visível no guia
- [ ] **P3** 2ª onda: psiquiatria, nefro/uro, gastro/hepato, reumato/orto, hemato, dermato, urgência, geriatria, pneumo completo
- **Aceite:** cada enfermidade passa no validador (refs, PT/ES) e na revisão clínica (§8).

---

## FASE 5 — Qualidade e lançamento

- [ ] Todos os testes automatizados verdes (`npm test` + `scripts/verify.sh`)
- [ ] Teste ponta a ponta por perfil (cadastro → plano → HC → IA → PDF) em PT e ES
- [ ] Revisão de acessibilidade e mobile
- [ ] Monitoramento de erro e custo da IA
- [ ] Todos os agentes do §8 sem pendência P0/P1

---

## 8. Agentes de revisão e teste

Definidos em `docs/agentes/` (versionados; copiar para `.claude/agents/` para usar, pois essa pasta é ignorada pelo git). Rodar o agente da fase **antes** de marcar o item como concluído.

| Agente | Quando roda | O que faz |
|---|---|---|
| `revisor-conteudo-clinico` | todo guia/caso novo ou alterado | confronta o conteúdo com fontes confiáveis, aponta divergências, doses, condutas desatualizadas; **não edita** |
| `revisor-seguranca-ia` | mudança em prompts, `api/`, termos, privacidade | alucinação, injeção, PII/LGPD, avisos legais, viés de automação |
| `qa-planos-acesso` | Fase 0.1 e Fase 1 | tenta burlar o paywall, testa checkout, webhook, limites e RLS |
| `qa-historia-clinica` | Fase 2 | percorre a HC por perfil e idioma; PDF sem seção vazia; paridade IA × motor local |
| `qa-conteudo-build` | Fase 4 | roda build + verify, valida paridade PT/ES, refs, links de DDx |

**Regra:** o dono (estudante, 4º ano) revisa pelos próprios livros; o `revisor-conteudo-clinico` traz a conferência independente com fontes citadas. Divergência entre os dois vai para decisão do dono, nunca é resolvida em silêncio.

## Ordem sugerida

`0.1 → 0.2 (em paralelo com o parecer jurídico) → 0.3 → Fase 1 → Fase 2 → Fase 3 → Fase 4 (pilotos desde a 0.3)`
Os pilotos de conteúdo (apendicite, pancreatite, colecistite) podem começar assim que o esquema da 0.3 existir, em paralelo com as Fases 1–3.
