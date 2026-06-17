# Pendências — AnamnesísMed

> Arquivo **canônico** de pendências do projeto. Toda pendência vai aqui (não só na memória do Claude).
> Ordenar por urgência. Ao concluir, marcar `[x]` e mover para o histórico no fim, com a data.
> Última atualização: 2026-06-16

---

## 🔴 Prazo (com data correndo)

- [ ] **Renovar token de deploy da Vercel** — expira **19/06/2026**. Sem ele, deploy do `anamnesismed-ig` (sempre via CLI, não por git) trava. Gerar token novo no painel da Vercel e atualizar onde for usado.

## 🟡 Próximos builds (aprovados)

- [ ] **MIX de formatos no carrossel do IG** — hoje só "Qual o diagnóstico?". Adicionar: mnemônicos, red flags, passo a passo, scores/escalas. Aprovado pelo Fernando; é o próximo build. (`instagram-automation/src/app/api/publish/route.ts`)
- [ ] **Diferenciar PT vs ES editorialmente** — hoje `buildPrompt(lang,…)` tem PT e ES como prompts espelho (ES traduzido). Regra: cada mercado tem gancho/referências/tom/exemplos/hashtags próprios — regenerar, não traduzir. Vale p/ carrossel e Reels.

## 🟢 Expansão / quando liberar

- [ ] **Colocar a conta ES (`@anamnesismed.es`) no ar** — falta: (1) gerar token IGA da conta ES no painel Meta (mesmo Meta App → "Adicionar conta" → token); (2) pegar account id via `graph.instagram.com/me`; (3) criar 2º projeto Vercel `anamnesismed-ig-es` com `POST_LANG=es` + token/id ES; (4) 2º workflow GitHub Actions p/ a conta ES.
- [ ] **Reativar agendamento dos Reels** — hoje desligado (bloco `schedule` comentado em `instagram-reels.yml`), só `workflow_dispatch`. Religar quando o Fernando liberar.

---

## ✅ Histórico (concluídas)

<!-- mover itens [x] pra cá com a data de conclusão -->
