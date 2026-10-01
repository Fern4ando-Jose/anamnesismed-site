# Auditoria 01 — Planos e controle de acesso

Escopo: 2 planos (MÉDICO = HC enxuta; ESTUDANTE = HC extensa/didática). Referência: `docs/ESCOPO.md:7-13`.
Data: 2026-10-01. Somente leitura; nenhum código alterado.

## Existe

**Modelo de dados**
- `profiles` documentada só no guia HTML (não há migration de criação): `plano` TEXT default `'trial'`, `trial_end`, `stripe_id`, `universidade`, `ano_curso` (`anamnesismed-setup-guide.html:238-241`).
- Coluna `tipo_usuario` (medico|estudante) é usada no código (`supabase-integration.js:211-219`, `:237`) mas NÃO está em nenhuma migration nem no guia (grep em `supabase-migrations/*.sql` = 0).
- Trigger cria linha em `profiles` só com id/email (`supabase-migrations/2026-06-08-trigger-criacao-perfil.sql:12-17`); plano/trial vêm dos defaults da tabela.
- RLS `profiles` FOR ALL com `with check (id = auth.uid())` (`2026-06-23-rls-profiles-historias.sql:20-24`).

**Estados de plano (hoje)**: `trial` (30 dias) e `pro` (pago). Sem `medico`/`estudante`/`expired` persistido.
- Trial 30d criado em `authSaveProfile` (`supabase-integration.js:109-112`) e fallback em `profileCheckAccess` (`:376-387`).
- `profileCheckAccess` devolve pro/trial/expired (`:391-408`); `guardCheckAccess` mostra paywall se inativo (`:626-637`, `showPaywall` `:951`). Chamado em `anamnesismed-app.html:2822-2825`.

**Onboarding Médico × Estudante**: modal pós-login grava `tipo_usuario` (`supabase-integration.js:234-237, 329-351`; chamado em `anamnesismed-app.html:2835-2837`). Hoje o valor não altera nada no produto.

**Checkout/webhook**
- `api/create-checkout-session.js:30-37`: um único `STRIPE_PRICE_ID` (env), `mode: subscription`, metadata só `userId`.
- `api/stripe-webhook.js:65-71`: `checkout.session.completed` → `plano='pro'` + `stripe_id`. `:74-83`: `subscription.deleted`/`invoice.payment_failed` → volta a `'trial'` (casando por `stripe_id`).
- Idempotência por `stripe_events` (`:48-59`, migration `2026-06-28-stripe-events-idempotencia.sql`); assinatura validada (`:37-42`); CORS fail-closed (`create-checkout-session.js:17-20`).
- Teste cobre só `pro` (`test/stripe-webhook.test.js:109,137`).

**Gating e limites de IA (servidor)**
- `api/assistente-dx.js:290-298`: exige `plano === 'pro'` (403 `upgrade`); limite `DAILY_LIMIT = 20` fixo (`:43`), tabela `ai_assistant_usage` (`:304-314`). TODO explícito de segmentar médico×estudante (`:38-42`).
- `api/gerar-hc.js`: só autenticação, sem gate de plano (`:8-9, 175`); `DAILY_LIMIT = 40` fixo (`:37`), fail-closed 503 se tabela faltar (`:176-179`), tabela `gerar_hc_usage` (`2026-06-28-gerar-hc-usage.sql`).
- Front: `assistenteApplyGate` só testa `type === 'pro'` (`anamnesismed-assistente.js:27-29`); aba IA com pill PRO e bloqueio (`anamnesismed-app.html:592, 615-622`).

**UI de planos**
- Landing tem 3 cards: Trial, Estudante US$1,99, Médico US$4,99 (`anamnesismed-landing.html:504-554`); botão Médico aponta para auth, sem checkout (`:550-551`). Estudante/Médico também linkam só para `auth.html` (`:535-536`).
- Config: badge plano mostra "Pro"/"Trial" (`anamnesismed-config.html:264`), upgrade genérico (`:199-200`).
- Dashboard: card "Plano Pro $1,99" fixo (`anamnesismed-dashboard.html:293-300`); rótulo "Plano Gratuito · X/5 HCs" mencionado (`supabase-integration.js:681`) mas o contador só exibe a contagem total (`:800-806`), sem limite aplicado.
- Auth: select "Você é..." com student/resident/doctor (`anamnesismed-auth.html:335-345`); nenhum JS lê `#role-register` nem chama `authSaveProfile` neste arquivo (grep).

## Falta

- Plano Médico inexistente no backend: nem preço Stripe, nem valor de `plano`, nem webhook que o distinga. Tudo pago vira `'pro'` (`stripe-webhook.js:68`).
- Diferenciação de HC por perfil: zero ocorrências de `tipo_usuario`/medico/estudante em `anamnesismed-app.html`, `anamnesismed-narrativa.js`, `anamnesismed-motivos.js`, `src/motivos/*` (grep). O formulário é único e extenso; não há flag "essencial vs didático" por campo/seção.
- Fonte única de verdade de perfil: dois campos concorrentes (`tipo_usuario` do modal vs `role-register` do cadastro vs `plano`).
- Limites por plano: `DAILY_LIMIT` fixos em dois endpoints; sem mapa por perfil.
- Gate do `gerar-hc` por plano/trial vencido: hoje trial expirado ainda gera HC por IA (backend não checa `trial_end`), só o paywall do front bloqueia.
- IA com modo "raciocínio explicado" (Estudante) vs "direto" (Médico): prompt único (`assistente-dx.js` `buildSystemPrompt`).
- Verificação de vínculo acadêmico (citada em `landing.html:556`) não existe; qualquer um pode escolher Estudante (mais barato).
- Portal de cobrança/cancelamento (Stripe Billing Portal), troca Estudante↔Médico, `expired` persistido.
- Migration versionada de `profiles` (criação + `tipo_usuario`, `plano` com CHECK, `trial_end`, `stripe_id`).

## Riscos

1. **Autoescalação de plano**: RLS `FOR ALL ... with check (id = auth.uid())` (`2026-06-23-rls-profiles-historias.sql:20-24`) permite ao próprio usuário `update profiles set plano='pro'` via anon key. Nenhuma coluna é protegida. Bypass de todo o paywall e do gate de `assistente-dx` (que confia em `profiles.plano`). **Crítico.**
2. Mesma brecha permite alterar `trial_end` (trial infinito) e `tipo_usuario` (fraude de preço Estudante).
3. `create-checkout-session` não autentica: aceita `email/userId` do body sem token (`:23-28`) — qualquer um inicia checkout com userId de terceiro e, ao pagar, ativa a conta alheia; também sem escolha de price server-side.
4. Webhook: cancelamento/falha rebaixa para `'trial'` sem checar `trial_end` — usuário antigo cai em trial já vencido (ok), mas um trial ainda vigente retoma acesso. `invoice.payment_failed` rebaixa no 1º erro (sem retry/grace). Falta `customer.subscription.updated`.
5. `.update()` por `stripe_id` sem dedupe de cliente; usuário sem `stripe_id` prévio não é achado se checkout falhar parcialmente.
6. Custo de IA: `gerar-hc` liberado a trial/expirado (até 40/dia/usuário); contas descartáveis multiplicam custo.
7. Fail-closed depende de migrations aplicadas manualmente no SQL Editor (`gerar-hc-usage` cabeçalho); sem garantia de ambiente.
8. Landing anuncia plano Médico com features não implementadas ("exportação em lote", "EMR", suporte prioritário — `landing.html:546-550`) e "HCs ilimitadas" no Estudante; risco de promessa/consumidor.
9. Dashboard/Config sempre exibem "$1,99"/"Pro" (`dashboard.html:298`), confuso com 2 planos.

## Checklist de tarefas (priorizado)

**P0 — segurança de acesso**
- [ ] Bloquear escrita de `plano`, `trial_end`, `stripe_id`, `tipo_usuario` pelo cliente (trigger BEFORE UPDATE ou column privileges; só service_role altera plano).
- [ ] Autenticar `create-checkout-session` (Bearer token → userId do servidor; ignorar userId/email do body).
- [ ] Gate server-side compartilhado (`api/_lib/acesso.js`): valida token, lê perfil, checa plano ativo/trial vigente; usar em `assistente-dx` e `gerar-hc`.

**P1 — modelo de planos**
- [ ] Migration versionada de `profiles`: `tipo_usuario` CHECK ('medico','estudante'), `plano` CHECK ('trial','estudante','medico'), `trial_end`, `stripe_id`, `plano_status`.
- [ ] Unificar `tipo_usuario` (modal) e `role-register` (cadastro) numa única escolha; mapear resident → medico ou estudante (decidir).
- [ ] Dois Prices Stripe (`STRIPE_PRICE_ESTUDANTE`, `STRIPE_PRICE_MEDICO`); checkout recebe `plano` e valida contra `tipo_usuario`; metadata `{userId, plano}`.
- [ ] Webhook: gravar plano pelo price/metadata; tratar `subscription.updated`, grace em `payment_failed`; testes para os 2 planos.
- [ ] `profileCheckAccess` retornar `{plano, tipo, active}` e atualizar `assistenteApplyGate` (`assistente.js:28`) para qualquer plano pago.

**P2 — diferenciação de HC**
- [ ] Definir em `src/motivos/*` marcação por campo/seção (`essencial` vs `didatico`) a partir de `docs/ESCOPO.md`.
- [ ] `anamnesismed-app.html`/narrativa/PDF renderizam conforme `tipo_usuario` (Médico: enxuto; Estudante: completo + mnemônicas).
- [ ] Prompts de IA por perfil (direto vs raciocínio explicado) em `assistente-dx.js`.
- [ ] Mapa de limites por plano `{estudante:N, medico:M}` lido do perfil (remover TODOs `assistente-dx.js:38-43`, `gerar-hc.js:34-37`).

**P3 — produto/UX**
- [ ] Landing/dashboard/config: cards e rótulos por plano real, botões de assinar com checkout do plano certo; remover promessas não entregues.
- [ ] Verificação de vínculo acadêmico (e-mail institucional ou upload) para Estudante.
- [ ] Stripe Billing Portal (cancelar/trocar plano); estado `expired` explícito.
- [ ] Decidir limite do trial para IA e política para trial vencido.
