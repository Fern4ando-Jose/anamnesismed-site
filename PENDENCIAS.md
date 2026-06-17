# Pendências — AnamnesísMed

> Arquivo **canônico** de pendências do projeto. Toda pendência vai aqui (não só na memória do Claude).
> Ordenar por urgência. Ao concluir, marcar `[x]` e mover para o histórico no fim, com a data.
> Última atualização: 2026-06-16

---

## 🟡 Próximos builds (aprovados)

- [ ] **MIX de formatos no carrossel do IG** — hoje só "Qual o diagnóstico?". Adicionar: mnemônicos, red flags, passo a passo, scores/escalas. Aprovado pelo Fernando; é o próximo build. (`instagram-automation/src/app/api/publish/route.ts`)
- [ ] **Diferenciar PT vs ES editorialmente** — hoje `buildPrompt(lang,…)` tem PT e ES como prompts espelho (ES traduzido). Regra: cada mercado tem gancho/referências/tom/exemplos/hashtags próprios — regenerar, não traduzir. Vale p/ carrossel e Reels.

## 🟢 Expansão / quando liberar

- [ ] **Colocar a conta ES (`@anamnesismed.es`) no ar** — falta: (1) gerar token IGA da conta ES no painel Meta (mesmo Meta App → "Adicionar conta" → token); (2) pegar account id via `graph.instagram.com/me`; (3) criar 2º projeto Vercel `anamnesismed-ig-es` com `POST_LANG=es` + token/id ES; (4) 2º workflow GitHub Actions p/ a conta ES.
- [ ] **Reativar agendamento dos Reels** — hoje desligado (bloco `schedule` comentado em `instagram-reels.yml`), só `workflow_dispatch`. Religar quando o Fernando liberar.

---

## ✅ Histórico (concluídas)

<!-- mover itens [x] pra cá com a data de conclusão -->

- [x] **(2026-06-16) Token de deploy da Vercel "expira 19/06"** — investigado: **não é bloqueio.** Posts/Reels publicam via GitHub Actions com `CRON_SECRET` (não usam token Vercel). Deploy de código roda pelo CLI **já logado** como `fern4ando-jose` (projeto `anamnesismed-ig` linkado, acesso confirmado) — `vercel --prod` funciona sem o token. O token `--token` só seria preciso para deploy headless/CI, que não está configurado. *Opcional:* se um dia quiser auto-deploy em CI, gerar um `VERCEL_TOKEN` com expiração longa em vercel.com/account/tokens e colar em `_segredos/CHAVES.md`.
