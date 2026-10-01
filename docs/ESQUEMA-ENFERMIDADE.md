# Esquema da guia de enfermidade e do caso clínico (Fase 0.3)

> **Status: APROVADO e IMPLEMENTADO (menos o renderer).** Código: `AM.enfermidade` em `scripts/build.js`, validador em `scripts/validar-enfermidades.js` (ligado ao `scripts/verify.sh`), testes em `test/enfermidades.test.js`, piloto em `src/enfermidades/apendicite-aguda.js` (**rascunho**).
>
> **Ajustes em relação ao desenho original:**
> - `refs[].verificada` (true/false) é obrigatório. Ref citada mas **ainda não conferida contra o livro** fica `false`; guia `publicado` exige todas `true`. Isso evita um "tem referência" que não significa "foi conferido".
> - Fármaco aponta as refs por **índice**: `farmacologico[].refs: [0, 1]` (índices de `refs[]`).
> - `diagnostico.diferenciais[]` aceita `id` (liga a motivo/enfermidade existente) **ou** `nome` (texto livre, sem link ainda).
> - **Só guias `publicado` vão para `anamnesismed-enfermidades.js`**: o site é estático e tudo que está nesse arquivo é público. Pré-visualização local com rascunhos: `node scripts/build.js --rascunhos` (não commitar).
> - O `build.js` **aborta** se alguma guia tiver erro de validação.
> - Doses: ficam no guia do motivo (`src/motivos/*`) até terem ref; a guia de enfermidade traz só a classe do fármaco.
> Segue o padrão que já existe: `AM.motivo(id, {...})` em `src/motivos/<id>.js`, textos bilíngues (`x` em PT, `xEs` em ES).

## 1. Por que separar "motivo" de "enfermidade"

| | **Motivo** (existe hoje) | **Enfermidade** (novo) |
|---|---|---|
| É | queixa/sintoma para montar a HC (dor torácica, tosse) | doença com guia de estudo (infarto, pneumonia) |
| Serve a | **anamnese**: perguntas da AEA, red flags, manobras | **estudo e revisão**: o que cada livro traz |
| Liga-se por | DDx: o motivo lista enfermidades prováveis | `motivos[]`: com quais queixas a doença se apresenta |

As 8 enfermidades que hoje estão como "motivos" (apendicite, colecistite, pancreatite, oclusão, hérnia, diverticular, anorretais, trauma abdominal) ganham uma guia de enfermidade **sem perder** o motivo atual; os dois se referenciam.

## 2. Esquema `AM.enfermidade`

Arquivo: `src/enfermidades/<id>.js`. Campos de texto existem em PT e ES (`x` / `xEs`). Listas são arrays.

```js
AM.enfermidade("<id>", {
  "name": "", "nameEs": "",
  "especialidade": "<id da especialidade>",      // existente em src/especialidades
  "cid10": ["K35"], "cie10": ["K35"],            // códigos; ES usa CIE-10 (mesma base)
  "motivos": ["dor-abdominal"],                  // ids de src/motivos (queixas com que se apresenta)

  "definicao": "", "definicaoEs": "",
  "epidemiologia": "", "epidemiologiaEs": "",
  "fisiopatologia": "", "fisiopatologiaEs": "",
  "quadroClinico": { "sintomas": [], "sinais": [], "formasAtipicas": [] },   // + *Es
  "diagnostico": {
    "criterios": [],                              // critérios/escores validados, com ref
    "exames": [ { "nome": "", "achado": "", "quando": "" } ],
    "diferenciais": [ { "id": "<enfermidade ou motivo>", "pista": "" } ]
  },
  "tratamento": {
    "medidas": [], "farmacologico": [ { "classe": "", "farmaco": "", "nota": "" } ],
    "cirurgico": [], "encaminhar": ""
  },
  "complicacoes": [], "prognostico": "",
  "sinaisAlarme": [],
  "mnemonicas": [ { "kw": "", "rows": [["A","Termo","Significado"]] } ],      // mesmo formato do motivo

  "casos": [ /* ver §3 */ ],

  "refs": [ /* ver §4 — OBRIGATÓRIO */ ],
  "revisadoEm": "AAAA-MM-DD", "revisor": "dono|agente|externo", "status": "rascunho|revisado|publicado"
});
```

### Dose e conduta
Doses e esquemas só entram **com `ref` apontando diretriz/livro e ano**. Sem ref, o validador reprova. A guia é material de estudo e apoio; mantém o aviso "apoio, não substitui a decisão médica".

## 3. Esquema `caso` (estudo de caso)

```js
{ "titulo": "", "tituloEs": "",
  "nivel": "basico|intermediario|avancado",
  "apresentacao": "", "apresentacaoEs": "",          // identificação + queixa + HDA
  "etapas": [                                         // dados revelados aos poucos
    { "dados": "", "dadosEs": "",                     // ex.: exame físico, depois exames
      "pergunta": "", "perguntaEs": "",
      "opcoes": ["",""], "correta": 0,                // ou "livre": true
      "comentario": "", "comentarioEs": "" } ],
  "diagnostico": "<id da enfermidade>",
  "perolas": [], "refs": []
}
```
Um caso é **fictício e anonimizado**. Nunca usar paciente real.

## 4. Referências — "citação sem cópia"

Decisão validada: o texto é **nosso**; a fonte é **citada**, nunca copiada.

```js
{ "tipo": "livro|diretriz|artigo",
  "citacao": "Sobrenome. Título. Edição, ano.",       // formato único
  "localizacao": "cap. 123, p. 456",                  // onde conferir
  "ano": 2024, "doi": "" }                            // doi/URL só quando existir
```
- Edição mais recente que **o dono** usa é a referência (validado em `docs/FONTES-E-ESPECIALIDADES.md`).
- Cada afirmação clínica forte (critério, ponto de corte, dose, conduta) aponta um `ref`; o mínimo por guia é **2 referências, sendo ≥1 livro-texto ou diretriz de sociedade**.

## 5. Regras do validador (ligado ao `scripts/verify.sh`)

| # | Regra | Falha = |
|---|---|---|
| 1 | campos obrigatórios presentes (`name`, `especialidade`, `definicao`, `quadroClinico`, `diagnostico`, `tratamento`, `refs`) | erro |
| 2 | **paridade PT/ES**: todo campo `x` tem `xEs` | erro |
| 3 | `refs` com ≥2 itens e ≥1 livro/diretriz | erro |
| 4 | `motivos[]`, `diferenciais[].id` e `especialidade` apontam para ids existentes | erro |
| 5 | `farmacologico` não vazio ⇒ cada item referenciado | erro |
| 6 | `status: "publicado"` exige `revisadoEm` e `revisor` | erro |
| 7 | `cid10` válido (formato) | aviso |
| 8 | caso: `correta` dentro do intervalo de `opcoes` | erro |

## 6. Fluxo de trabalho de uma guia

1. **Rascunho** (`status: rascunho`): preenchido a partir dos livros do dono (ele revisa pelos seus livros).
2. **Revisão independente**: agente `revisor-conteudo-clinico` confronta com fontes confiáveis e lista divergências; divergência vai para decisão do dono.
3. **Validação**: `scripts/verify.sh` verde.
4. **Publicado** (`status: publicado`, `revisadoEm`, `revisor`).

## 7. Piloto proposto
Apendicite, pancreatite aguda e colecistite: já existem como motivos com mnemônicas, escalas e conduta, então o trabalho é **reorganizar + referenciar + escrever o que falta** (fisiopatologia, quadro, caso). Aproveita-se o conteúdo atual sem reescrevê-lo.

## 8. Decisões do dono
- [x] Esquema aprovado e **enfermidade separada do motivo**
- [ ] Mínimo de 2 referências por guia (≥1 livro/diretriz): confirmar
- [ ] Piloto: apendicite feita como rascunho; pancreatite e colecistite a seguir — confirmar
- [ ] Quem preenche o rascunho: dono (pelos livros) ou agente gera rascunho para o dono conferir? (a apendicite foi rascunhada pelo agente a partir do guia do projeto)

## 9. Implementação
- [x] `AM.enfermidade` em `scripts/build.js` (casos dentro da enfermidade)
- [x] `scripts/validar-enfermidades.js` + chamada no `verify.sh` + 11 testes
- [ ] Ordem das especialidades dinâmica (hoje `ESP_ORDER` fixo no `build.js`; especialidades novas exigirão ajuste)
- [ ] Renderer da guia e do caso (modo estudante), exibição de refs e `revisadoEm`
- [ ] Piloto: apendicite ✔ rascunho com 1 caso · pancreatite ☐ · colecistite ☐
- [ ] **Conferir a apendicite**: dono pelos livros + agente `revisor-conteudo-clinico`; depois trocar `verificada` e `status`
