# QA adversarial — Fase 0.1 (planos/acesso)

Agente: qa-planos-acesso. Commit 93a165c. `npm test`: 44/44 passam. Postgres 16 local descartável (porta 5433, já removido); nada contra produção.
Veredito: **nenhum P0 novo**. O furo original (plano/trial/stripe_id/DELETE) está fechado. Restam 3 P1, vários P2/P3.

## Verificado em Postgres local (migration aplicada sobre schema simulado)
| Cenário | Esperado | Obtido | Arquivo:linha |
|---|---|---|---|
| UPDATE plano='pro', trial_end=2099, stripe_id pelo cliente | ignorado | ignorado (continua trial, 30d, stripe_id nulo) | migration:30-46 |
| UPSERT do authSaveProfile com plano='pro' | ignorado | ignorado (trial) | migration:30-46 |
| DELETE da própria linha | 0 linhas | 0 linhas (sem policy de delete) | migration:63-80 |
| INSERT de linha com id de outro | bloqueado | bloqueado por RLS | migration:73 |
| UPDATE tipo_usuario='medico' | **bloqueado (Fase 1)** | **passa** (conhecido, documentado) | migration:20 |
| Linha com trial_end NULL, cliente tenta corrigir | ver P1-3 | segue NULL → trial vencido p/ sempre | migration:44 |

## P0
Nenhum.

## P1
**P1-1 Webhook ignora erro do UPDATE.** `supabase-js` não lança exceção: devolve `{error}`. Em `checkout.session.completed` e `subscription.deleted/payment_failed` o resultado do `update` não é checado, então o `catch` (que apaga a idempotência) nunca roda. | esperado: falha de banco → 500 e Stripe reentrega | obtido: 200, evento gravado em `stripe_events`, usuário pagou e não ativa (ou cancelou e continua `pro`). Também 0 linhas afetadas (userId sem perfil) passa em silêncio. | api/stripe-webhook.js:120-122, 132-134, 144-152. Sem teste cobrindo (test/stripe-webhook.test.js só testa o caminho feliz).

**P1-2 Limite diário com race (read-then-upsert) e fail-open no assistente.** N requisições paralelas leem `count=0` e todas passam; o contador termina em 1. | esperado: no máx. 20/40 chamadas | obtido: limitado só pela concorrência da Vercel. No `assistente-dx` ainda é fail-open (tabela ausente/erro → chama a IA sem limite) e o erro do upsert nem é lido. Custo na API paga. | api/assistente-dx.js:281-297 (fail-open :286-296), api/gerar-hc.js:174-193. Correção: RPC SQL atômica `insert ... on conflict do update set count=count+1 returning count` e checar o retorno. Nenhum teste cobre concorrência (mock sempre devolve "sem linhas").

**P1-3 Regressão latente: perfil `trial` com `trial_end` NULL não se auto-cura.** O front (authSaveProfile) tenta preencher `trial_end`, mas a trigger mantém o valor antigo (NULL); servidor e front tratam como vencido → paywall permanente. Com os defaults da tabela do guia (`trial_end DEFAULT now()+30d`) só ocorre com linha criada/editada à mão ou schema sem o default. Verificar o default em produção antes de aplicar. | api/_lib/acesso.js:29; supabase-migrations/…protege-colunas-plano.sql:44; supabase-integration.js:109.

## P2
- **P2-1 Front não conhece `estudante`/`medico`.** O servidor libera (acesso.js:17), mas `profileCheckAccess` só reconhece `pro` e `trial`; qualquer outro plano cai em `unknown` → paywall; `assistenteApplyGate` só libera `type==='pro'`. O webhook só grava `pro`, então hoje é inofensivo; vira bloqueio de cliente pagante assim que a Fase 1 gravar os novos planos. | supabase-integration.js:391-407; anamnesismed-assistente.js:28.
- **P2-2 `tipo_usuario` gravável pelo cliente** (confirmado). Hoje não afeta acesso (servidor não lê), mas a Fase 1 (plano × tipo) não pode confiar nele sem RPC. | supabase-integration.js:216.
- **P2-3 `invoice.payment_failed` rebaixa a `trial` já na 1ª tentativa** (Stripe faz retries) e a rebaixa para `trial` mantendo o `trial_end` antigo: quem assinou no dia 5 e cancela no dia 20 volta a ter ~10 dias de trial grátis. Para trial vencido, correto. | api/stripe-webhook.js:128-135.
- **P2-4 Recriar conta.** Não dá mais para apagar o perfil, mas um novo e-mail (alias +, descartável) ganha novo trial de 30 dias; sem verificação de e-mail confirmado/telefone/cartão. Aceito pelo modelo, mas é o bypass remanescente mais barato. | migration:30-34.
- **P2-5 Checkout não bloqueia quem já é pago**: dá para criar uma 2ª assinatura (cobrança dupla). Gate `logado` é intencional, mas bastaria recusar `av.pago`. | api/create-checkout-session.js:34.
- **P2-6 Cota consumida antes de validar conteúdo/chamar o modelo**: requisição com HC vazia (400) ou erro 5xx da Anthropic gasta 1 do limite. | gerar-hc.js:185 vs 196-201; assistente-dx.js:293 vs 301.

## P3
- Checkout sem `NEXT_PUBLIC_URL` gera `success_url` "undefined/…"; CORS sem `Vary: Origin` (create-checkout-session.js:22-23,46). Sem risco de bypass (Bearer, não cookie).
- `manter-banco-vivo`: sem `CRON_SECRET` configurado o endpoint fica aberto (`!segredo` → ok) e o header `x-vercel-cron` é forjável por qualquer cliente. Só conta linhas, sem dado; mas a doc diz "exige token". Defina CRON_SECRET. | api/manter-banco-vivo.js:184-187.
- `health.js` público, só booleanos: ok. `stripe-webhook`: assinatura validada antes de qualquer escrita: ok.
- Trigger usa `current_user`: ok sob PostgREST (SET ROLE). Se um dia o Supabase mudar para outro role de cliente, a trigger deixa passar (lista branca invertida: só bloqueia `authenticated`/`anon`). Preferir bloquear tudo exceto `service_role`/`postgres`.
- Migration não tem teste automatizado no repo (só o relato do MAPA); `npm test` não exercita SQL.

## Qualidade dos testes
| Teste | Problema | Arquivo:linha |
|---|---|---|
| "planos pagos passam do gate (chegam à IA)" | O mock da IA **lança** erro; `chamadas>=1` prova só que passou do gate (ok), mas `!=401/403` aceita 500/503/429 — um 503 `usage_unavailable` também passaria. Assertar o status esperado (502/500 da IA mock) | test/api-acesso-handlers.test.js:234-242, 262-270 |
| Mock `single()` ignora o filtro de `user_id` | Um gate que lesse o perfil errado (ex.: sem `.eq('id')`) passaria; ver `profiles[filters.id]` indefinido dá "sem linha" → só prova 403, não prova isolamento | test/_mocks.js:21-26 |
| Mock de upsert sempre sucesso; contador nunca é lido | Nenhum teste de limite diário (429), da race, do fail-open do assistente nem do fail-closed do gerar-hc | test/_mocks.js:27-29 |
| Webhook: sem teste de falha de UPDATE, `payment_failed`, `subscription.deleted`, cancelar/expirar | O pedido do agente (transições assinar/falhar/cancelar/expirar) está só parcialmente coberto | test/stripe-webhook.test.js:78-138 |
| Checkout "CORS libera Authorization" | Só checa o header; não testa origem estranha nem falta de env | test/api-acesso-handlers.test.js:210-214 |
| Front (authSaveProfile, profileCheckAccess, stripeCheckout) | Zero teste; regressão de cadastro novo só verificada por leitura (OK: defaults + trigger resultam em trial 30d; upsert não quebra) | supabase-integration.js:87-118, 371-407 |
| Bom: 401 sem/ com token inválido, userId do token e não do corpo, trial vencido/sem data/lixo, 503 fail-closed | Provam de fato o que dizem | acesso.test.js:118-160 |

## Regressão para usuário legítimo (conferido)
Cadastro novo via magic link/Google: `handle_new_user` (definer, passa) cria a linha com defaults; `authSaveProfile` faz upsert com plano/trial_end que a trigger neutraliza sem erro; `profileCheckAccess` com perfil ausente faz upsert → INSERT ganha trial 30d. Sem regressão. Trial vigente continua usando `gerar-hc`; trial vencido cai no motor local (narrativa.js:759-777 trata qualquer status ≠ 200 como fallback).
Ressalva: trial vencido recebe 403 e a mensagem de upgrade vira apenas "motivo" do fallback; não há aviso visível ao usuário (UX, P3).

## Ordem sugerida de correção
1. P1-1 (webhook checar `error` + contar linhas). 2. P1-2 (contador atômico). 3. Confirmar default de `trial_end` em produção (P1-3). 4. P2-1 antes da Fase 1.
