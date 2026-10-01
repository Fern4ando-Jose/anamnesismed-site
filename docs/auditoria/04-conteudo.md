# Auditoria 04 — Pilar "Conteúdo por especialidade"

Data: 2026-10-01. Somente leitura (nenhum código alterado). Meta do pilar (docs/ESCOPO.md): por enfermidade, guia de estudo
(definição, fisiopatologia, quadro clínico, diagnóstico, exames, tratamento, referências) + estudos de caso, com fonte por item.

## 1. Resumo executivo

- Hoje o conteúdo é organizado por **motivo de consulta/sintoma** (anamnese), não por enfermidade. Só ~8 de 33 itens são enfermidades.
- **Não existe**: guia de enfermidade (definição/fisiopatologia/quadro clínico) nem estudo de caso. Nenhuma fonte/referência por item.
- Existem 4 "especialidades" (clínica, semiologia, cirurgia, respiratório), todas só em Clínica Geral/Cirurgia/Pneumo. Faltam 8+ áreas.
- Observação: o pedido cita 38 motivos; o repositório tem **33 arquivos** em `src/motivos/` (32 com guia próprio + `semio-peso`, alias de `perda-peso`).

## 2. Existe

### 2.1 Estrutura de dados (src/motivos/*.js, via `AM.motivo(id, {...})`)
Build: `scripts/build.js` monta `anamnesismed-motivos.js` (MOTIVOS, RAS_SYSTEMS, GUIDE_CONTENT) e `anamnesismed-guide-es.js` (GUIDE_ES).
Campos de um motivo:
- Identidade: `name`, `nameEs`, `icon`, `color`, `isPain`, `rasHighlight` (sistemas da RAS).
- `aeaGuide[]` (anamnese guiada, 9–22 perguntas): `q/qEs`, `type` (radio/multi/yn/input), `opts/optsEs`, `ph/ph2`; opcionais `key`, `showIf`, `redFlag`.
  `aeaGuideCir` (roteiro alternativo cirurgia) só em `semio-dor`.
- `ddx` no nível do motivo: só `dor-toracica` (6 itens). Os demais têm DDx dentro de `guidePt`.
- `guidePt` / `guideEs` / `guideFrom` (alias) com 6 blocos: `mnemonics`, `manobras` (título, passos, normal/anormal), `sinais` (nome, como, significado),
  `ddx` (diagnóstico, a favor, contra), `escalas` (tabelas de pontuação) e `conduta` = `{exames[], drugs[], steps[]}`.
- Páginas: `especialidades.html` (grid por especialidade via MOTIVOS + aba "Referência Clínica"), `explorar.html` (hub + busca de motivo),
  `mnemonicas.html` (registro THEMES **duplicado e hardcoded** com 18 temas, só mnemônicas+manobras), `referencias.html` (cards live/"Em breve"),
  `ref-{clinica,cirurgia,respiratorio}-exfisico.html` (guias de exame físico: sintomas, topografia, inspeção, palpação, percussão, ausculta, manobras, síndromes).

### 2.2 Motivos × natureza
- **Enfermidade/entidade nosológica (8)**: apendicite, colecistite-colelitiase, pancreatite-aguda, oclusao-intestinal, hernia-abdominal,
  doenca-diverticular, doencas-anorretais, trauma-abdominal. Também quase-síndromes: hemorragia-digestiva-alta/baixa.
- **Sintoma/sinal (23)**: dor-abdominal, dor-toracica, dispneia, tosse, expectoracao, hemoptise, febre, cefaleia, convulsao-sincope, tontura-vertigem,
  palpitacoes, edema, ictericia, diarreia, nauseas-vomitos, perda-peso, semio-astenia, semio-cianose, semio-dor, semio-peso, sintomas-urinarios,
  lombalgia, artralgia.
- Mesmo as "enfermidades" são em formato de **consulta rápida** (anamnese + manobras + DDx + conduta em tópicos), não guia de estudo.

### 2.3 Qualidade e completude (medições do código)
| Aspecto | Achado |
|---|---|
| PT vs ES | Paridade estrutural em todos os 32 guias (`guideEs` ≈ tamanho de `guidePt`). Exceção: **hemoptise** (ES 1,7 KB vs PT 2,7 KB, ~35% menor) — verificar. |
| Tamanho do guia PT | Alto: apendicite 9,0 KB, artralgia 10,7 KB, convulsao-sincope 9,5 KB, ictericia 8,2 KB, lombalgia 7,2 KB. Baixo: expectoracao 1,6 KB, hemoptise 2,7 KB, edema 3,2 KB, tosse 3,1 KB, dispneia 3,9 KB. |
| Blocos ausentes | `expectoracao` sem manobras/sinais/escalas; `hemoptise` sem manobras/escalas; `semio-peso` sem guia próprio (herda perda-peso). |
| Anamnese | 9–22 perguntas; mas `redFlag`/`showIf` só em `dor-toracica` (4/11), `febre` (2 redFlag) e `semio-dor` (1) — resto sem lógica condicional nem alarme marcado. |
| DDx | `ddx` em `guidePt` é lista curta (4–8) de 3 colunas; sem prevalência/probabilidade pré-teste. |
| Fontes | **Zero URLs/DOIs; sem campo `fonte`/`ref`**. Só `colecistite` cita "Tokyo Guidelines" no título de uma escala. Escalas (Alvarado, Ranson, BISAP, Wells, Glasgow-Blatchford…) sem citação. |
| Fisiopatologia | Inexistente em todos os motivos. Definição/epidemiologia: inexistente. |
| Casos clínicos | Inexistentes (nenhum campo `caso`; só um texto "casos práticos em breve" em `especialidades.html` linha ~438). |
| Doses/drugs | `conduta.drugs` presente sem fonte, dose ou data de revisão — risco clínico/legal. |
| Cobertura de exame físico | Só 3 guias (clínica, cirurgia, respiratório); semiologia sem página própria. |
| Mnemônicas | Dados duplicados em `mnemonicas.html` (18 temas) vs `src/` (GUIDE_CONTENT): risco de divergência; 15 motivos sem tema lá. |
| Estado | `especialidades.html` mostra "Em breve" onde não há REF_PAGE (semiologia). Vários cards "Em breve" em `referencias.html`. |

## 3. Matriz de cobertura (existente) — especialidade × motivo/enfermidade

Legenda: S = sintoma/motivo, E = enfermidade, G = tem `guidePt`+`guideEs` (consulta rápida), — = não consta. Nenhuma célula tem guia de estudo ou caso.

| Categoria | Item | Tipo | Clínica | Semiologia | Cirurgia | Respiratório | Guia/ES | Caso |
|---|---|---|---|---|---|---|---|---|
| Dor | semio-dor | S | x | x | x | — | G | não |
| Cardio | dor-toracica | S | x | — | — | x | G | não |
| Cardio | dispneia | S | x | x | — | x | G | não |
| Cardio | palpitacoes | S | x | — | — | — | G | não |
| Cardio | edema | S | x | x | — | — | G | não |
| Neuro | cefaleia | S | x | — | — | — | G | não |
| Neuro | convulsao-sincope | S | x | — | — | — | G | não |
| Neuro | tontura-vertigem | S | x | — | — | — | G | não |
| Infecto/geral | febre | S | x | x | — | — | G | não |
| Geral | perda-peso / semio-peso | S | x | x | — | — | G (alias) | não |
| Geral | semio-astenia, semio-cianose | S | — | x | — | — | G | não |
| GI | dor-abdominal, nauseas-vomitos, diarreia | S | x | — | — | — | G | não |
| GI | ictericia | S | x | x | — | — | G | não |
| Resp | tosse | S | x | x | — | x | G | não |
| Resp | expectoracao, hemoptise | S | — | — | — | x | G (parcial) | não |
| Nefro/uro | sintomas-urinarios | S | x | — | — | — | G | não |
| Reumato/orto | lombalgia, artralgia | S | x | — | — | — | G | não |
| Abdome agudo | apendicite, colecistite-colelitiase, pancreatite-aguda, oclusao-intestinal | E | — | — | x | — | G | não |
| Hérnias | hernia-abdominal | E | — | — | x | — | G | não |
| HD | hemorragia-digestiva-alta/baixa | E/S | — | — | x | — | G | não |
| Colorretal | doenca-diverticular, doencas-anorretais | E | — | — | x | — | G | não |
| Trauma | trauma-abdominal | E | — | — | x | — | G | não |

Áreas sem nenhum item: cardiologia, neurologia, endocrinologia, nefrologia, gineco-obstetrícia, pediatria, infectologia, psiquiatria,
hematologia, reumatologia, dermatologia, gastro/hepatologia clínica, urgência/emergência, geriatria, ortopedia.
Obs.: "cardio/neuro" existem apenas como categorias dentro de Clínica; não são especialidades navegáveis.

## 4. Falta

1. Entidade "enfermidade" no modelo de dados: `AM.enfermidade(id,{...})` com definição, epidemiologia, fisiopatologia, quadro clínico, diagnóstico,
   exames, tratamento, complicações, prognóstico, `refs[]` (livro/diretriz/ano/página/DOI), `revisadoEm`, `revisor`; bilíngue PT/ES.
2. Estudos de caso: campo `casos[]` (apresentação, dados progressivos, perguntas, gabarito comentado, pérolas, ref).
3. Referências por item (`fonte` em escalas, sinais, doses, DDx).
4. Vínculo motivo → enfermidades (DDx clicável abrindo o guia) e enfermidade → motivos/mnemônicas/manobras.
5. Novas especialidades (seção 5) em `ESP_ORDER` de `build.js`, `SPEC_META` e `REFERENCIAS/REF_PAGE`; hoje a lista é duplicada em 3 lugares.
6. Fonte única para `mnemonicas.html` (gerar a partir de GUIDE_CONTENT em vez de THEMES hardcoded).
7. Ferramenta de QA: script que valide paridade PT/ES, campos obrigatórios, presença de `refs`, e links DDx.
8. Página "guia de estudo" (renderer) e modo estudante (revisão, autoteste, casos) — nada existe.

## 5. Proposta de especialidades prioritárias (prevalência/relevância no Brasil)

Critério: carga de doença (DATASUS/GBD/SBC/SBD), prevalência em APS e provas de residência. Lista inicial para validação do dono.

| # | Especialidade | Enfermidades/queixas prioritárias (10–15) |
|---|---|---|
| 1 | Cardiologia | HAS; insuficiência cardíaca; SCA/IAM; angina estável/DAC; fibrilação atrial; dislipidemia; valvopatias (febre reumática); TEP/TVP; endocardite; síncope; arritmias; cardiomiopatia chagásica; AVC isquêmico (interface); crise hipertensiva; pericardite |
| 2 | Endocrinologia | DM2; DM1 e cetoacidose; hipoglicemia; hipotireoidismo; hipertireoidismo/Graves; nódulo tireoidiano; obesidade/síndrome metabólica; dislipidemia; osteoporose; SOP; insuficiência adrenal; Cushing; hiperparatireoidismo; hiperprolactinemia; hiponatremia |
| 3 | Neurologia | Cefaleias primárias (enxaqueca); AVC; epilepsia; demências (Alzheimer); Parkinson; neuropatia periférica/diabética; vertigem (VPPB); meningite/encefalite; TCE; lombociatalgia/radiculopatia; esclerose múltipla; Guillain-Barré; miastenia; ELA; hipertensão intracraniana |
| 4 | Nefrologia / Urologia | DRC; IRA; ITU/pielonefrite; nefrolitíase; HPB; glomerulopatias/síndrome nefrótica e nefrítica; distúrbios hidroeletrolíticos e ácido-base; nefropatia diabética; hematúria; incontinência urinária; câncer de próstata; torção testicular; ITS; hiperplasia prostática; poliúria |
| 5 | Ginecologia e Obstetrícia | Pré-natal de baixo risco; pré-eclâmpsia/eclâmpsia; DMG; hemorragias 1º/3º trim (aborto, DPP, placenta prévia); trabalho de parto; hemorragia pós-parto; gravidez ectópica; sangramento uterino anormal; vulvovaginites; DIP; endometriose; mioma; câncer de colo/mama (rastreio); contracepção; climatério |
| 6 | Pediatria | Febre; IVAS/otite/amigdalite; bronquiolite/asma; pneumonia; diarreia e desidratação; crescimento e desenvolvimento; vacinação (PNI); icterícia neonatal; dengue/exantemas; ITU; anemia ferropriva; parasitoses; convulsão febril; maus-tratos; desnutrição/obesidade |
| 7 | Infectologia | Dengue/Zika/Chikungunya; HIV/AIDS; tuberculose; sífilis e ITS; hepatites virais; COVID-19 e SRAG; malária; leptospirose; sepse; pneumonia comunitária; meningites; hanseníase; leishmanioses; doença de Chagas; febre amarela |
| 8 | Psiquiatria | Depressão; transtornos de ansiedade; transtorno bipolar; esquizofrenia/psicoses; uso de álcool e drogas; suicídio/avaliação de risco; TDAH; transtornos alimentares; TEPT/luto; delirium; insônia; demência (interface); TOC; transtornos de personalidade; agitação psicomotora |
| 9 | Gastroenterologia / Hepatologia | DRGE; úlcera péptica e H. pylori; cirrose e complicações; hepatites; DII (Crohn/RCU); SII; doença celíaca; pancreatite crônica; HDA varicosa; câncer colorretal; esteatose hepática (MASLD); litíase biliar; constipação; dispepsia; diarreia crônica |
| 10 | Reumatologia / Ortopedia | Osteoartrite; artrite reumatoide; lúpus; gota; fibromialgia; espondiloartrites; lombalgia; osteoporose; fraturas comuns; síndrome do túnel do carpo; tendinopatias/ombro doloroso; vasculites; esclerodermia; polimialgia; entorses/lesão de LCA |
| 11 | Hematologia | Anemia ferropriva; anemia megaloblástica; falciforme; leucemias; linfomas; trombocitopenia (PTI); coagulopatias; mieloma; anticoagulação; policitemia; hemocromatose; talassemias; neutropenia febril; transfusão; linfonodomegalia |
| 12 | Dermatologia | Dermatite atópica; acne; psoríase; escabiose/pediculose; micoses; urticária; herpes zóster; carcinoma basocelular/melanoma; hanseníase (interface); pioderma/celulite; lesões elementares; vitiligo; rosácea; úlcera de perna; alopecias |
| 13 | Urgência / Emergência | PCR/ACLS; choque; sepse; politrauma (ATLS); intoxicações; anafilaxia; AVC agudo; IAM com supra; TEP; CAD; crise asmática/DPOC exacerbado; abdome agudo; queimaduras; afogamento; convulsão/estado de mal |
| 14 | Pneumologia (completar) | Asma; DPOC; pneumonia; TB; TEP; derrame pleural; câncer de pulmão; apneia do sono; DPI; bronquiectasia; pneumotórax; SDRA; embolia; sarcoidose; tabagismo |
| 15 | Geriatria / Saúde mental e APS | Quedas; polifarmácia; demências; incontinência; imobilidade; úlcera por pressão; desnutrição; sarcopenia; depressão no idoso; delirium; osteoporose; cuidados paliativos; fragilidade; disfagia; avaliação geriátrica ampla |

Primeira onda recomendada (maior retorno, menor esforço de curadoria): Cardiologia, Endocrinologia, Neurologia, Infectologia, Gineco-Obstetrícia, Pediatria.

## 6. Checklist

### P0 — modelo e processo
- [ ] Definir esquema `enfermidade` (campos da seção 4.1) e `caso`; documentar em `docs/`
- [ ] Estender `scripts/build.js` (novo registro `AM.enfermidade`, `ESP_ORDER` dinâmico) e gerar `GUIDE_ES` equivalente
- [ ] Criar validador (campos obrigatórios, `refs`, paridade PT/ES) e ligar ao `scripts/verify.sh`
- [ ] Acordar com o dono fontes aceitas (livros próprios, diretrizes SBC/SBD/SBP/MS, UpToDate etc.) e formato de citação
### P1 — conteúdo existente
- [ ] Adicionar `refs[]` a todas as escalas, sinais e doses dos 32 guias
- [ ] Converter as 8 enfermidades cirúrgicas existentes em guias de estudo completos (piloto: apendicite, pancreatite, colecistite)
- [ ] Completar `expectoracao`, `hemoptise` (PT/ES), `edema`, `tosse`, `dispneia` (blocos faltantes)
- [ ] Marcar `redFlag`/`showIf` nas anamneses fora de dor-toracica/febre/semio-dor
- [ ] Remover duplicação `mnemonicas.html` (THEMES) usando GUIDE_CONTENT; cobrir os 15 motivos faltantes
- [ ] Ligar DDx dos motivos aos guias de enfermidade
### P2 — novas especialidades (1ª onda)
- [ ] Cardiologia (15 itens) — guia + 1 caso por item
- [ ] Endocrinologia
- [ ] Neurologia
- [ ] Infectologia
- [ ] Gineco-Obstetrícia
- [ ] Pediatria
- [ ] Registrar cada uma em `SPEC_META`, `ESP_ORDER`, `explorar.html` e `referencias.html`
- [ ] Páginas de exame físico (`ref-*-exfisico`) para cardio, neuro e semiologia
### P3 — estudantes
- [ ] Renderer de guia de estudo e de casos (PT/ES), com autoavaliação
- [ ] Revisão por agentes contra fontes confiáveis + selo `revisadoEm/revisor`
- [ ] 2ª onda: psiquiatria, nefro/uro, gastro, reumato/orto, hemato, dermato, urgência, geriatria
