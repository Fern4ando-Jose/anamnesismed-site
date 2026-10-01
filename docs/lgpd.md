# LGPD — retenção, exclusão, exportação e consentimento

> Dados de saúde (história clínica) são **dados pessoais sensíveis** (LGPD art. 5º, II e art. 11).
> Este documento é um resumo **técnico**, não parecer jurídico. Itens **[DONO]** dependem de
> decisão/ação do controlador e não são resolvidos pelo código.

## Mecanismos implementados

### Exportação (art. 18, II e V — acesso e portabilidade) — `GET /api/exportar-dados`
- Exige `Authorization: Bearer <access_token>`. O usuário é o do **token** (não há parâmetro de id).
- Devolve um JSON (download) com `usuario`, `perfil`, `historias_clinicas` e `pdf_exports` do próprio
  usuário. Falha em qualquer leitura → 500 (nunca entrega exportação parcial). `Cache-Control: no-store`.
- **Limites**: 5 exportações/hora por usuário (429 + `Retry-After`; 503 `limite_indisponivel` se a RPC `consumir_limite`
  não existir — fail-closed) e **teto de tamanho**: no máximo 20.000 linhas e ~4 MB de JSON (medido em bytes UTF-8, pois a
  Vercel corta respostas acima de ~4,5 MB). Acima disso → **413 `export_muito_grande`** com mensagem clara — nunca uma
  exportação truncada; o titular pede a exportação completa pelo canal do DPO (**[DONO]** definir o canal e o prazo de resposta).
- Uso no front: **já implementado** em `anamnesismed-config.html` (botão "Baixar meus dados": `GET /api/exportar-dados` com o
  Bearer da sessão, salva o blob; 401 → pede novo login; 413 → mensagem do DPO).

### Exclusão (art. 18, VI — eliminação) — `POST /api/excluir-conta`
- Exige Bearer **e** corpo `{ "confirmar": true }` (ação irreversível).
- Limite: 3 exclusões/hora por usuário (429/503 como acima).
- Ordem: (0) **marca** a conta em `contas_em_exclusao` (tabela só da `service_role`, **sem FK** — sobrevive à exclusão do
  login) antes de qualquer efeito: a partir daí o checkout recusa (409 `conta_em_exclusao`) e o webhook trata um checkout
  tardio como sucesso idempotente e cancela a assinatura criada; sem conseguir marcar → 503 e nada é feito;
  (1) expira checkouts abertos e cancela na hora as assinaturas do Stripe do cliente — se falhar, **aborta sem apagar
  nada** (senão o ex-usuário seguiria sendo cobrado) e **remove a marca** (reversão: a conta não fica travada sem checkout
  depois de uma exclusão que não aconteceu); em seguida **apaga o customer no Stripe** (best effort: falha só gera o log
  `[ALERTA excluir-conta]`; faturas já emitidas permanecem retidas pelo Stripe); (2) apaga `historias_clinicas`,
  `pdf_exports`, `gerar_hc_usage`, `ai_assistant_usage` e `profiles` (falha daqui em diante **mantém** a marca e o usuário
  repete); (3) apaga o usuário no Auth do Supabase. `historias_clinicas.user_id` tem `ON DELETE CASCADE`
  (migration 2026-10-04), então excluir o login pelo painel também leva as HCs.
- Idempotente/retomável: cada passo pode ser repetido; falha no meio → 5xx e basta repetir a chamada
  (enquanto o login existir, o token vale). Depois de concluída, repetir devolve 401 (token do usuário
  apagado) — mesmo resultado final. Tabelas opcionais ausentes (migration não aplicada) são ignoradas.
- Não loga conteúdo clínico, e-mail nem o corpo da requisição; só IDs e códigos de erro.
- **Não é apagado**: faturas/registros fiscais no Stripe (retidos pelo Stripe por obrigação legal/fiscal);
  logs da Vercel/Supabase expiram pelo prazo de cada plano; backups do Supabase seguem o ciclo do plano.
  **[DONO]** declarar isso na política de privacidade.
- Envs: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_URL`.
- Uso no front: **já implementado** em `anamnesismed-config.html` (modal de confirmação → `POST` com `{confirmar:true}` →
  `sb.auth.signOut()` e landing; 401 → pede novo login).
- **Pendência de produto (re-autenticação)**: não exigimos login recente (JWT `iat`/`amr` ≤ 10 min) para excluir. Um token
  roubado vale por até 1 h (e a sessão é renovada pelo refresh token). Exigir `reauth_necessaria` precisaria de um fluxo no
  front (hoje a página de login redireciona direto ao dashboard quando já há sessão, o que geraria um laço): é preciso
  fazer `signOut()` + novo magic link antes. **[DONO]** decidir se vale a fricção.

## Tabelas auxiliares e retenção
Tabelas só da `service_role` (RLS sem policy + `revoke all` de anon/authenticated), sem conteúdo clínico:

| Tabela | Conteúdo | Limpeza |
|---|---|---|
| `contas_em_exclusao` | `user_id` + data da marca de exclusão (sem e-mail) | **automática**: linhas > 30 dias (o checkout/webhook tardio já não chegam) |
| `rate_limits` | contador por (usuário, ação) e início da janela | **automática**: janelas > 2 dias (a maior janela usada é 1 h) |
| `stripe_events` | `event_id`, tipo, `status` (`processing`/`done`) e `processing_desde` (lease de 1 min) | **automática**: > 90 dias (cobre a janela de reentrega do Stripe) |
| `gerar_hc_usage` / `ai_assistant_usage` | contagem diária de uso de IA por usuário | manual (abaixo) |

**Limpeza automática**: o cron diário `/api/manter-banco-vivo` (`0 9 * * *`, protegido por `CRON_SECRET`) roda
`limparAntigos` (`api/_comum.js`) depois do keepalive, best effort: falha só vira log (sem `err.message`) e nunca derruba o
keepalive; tabela ausente é ignorada. Roda no mesmo cron para não consumir um 3º agendamento (o plano gratuito da Vercel
limita a quantidade de crons). O cron `/api/reconciliar-assinaturas` (`30 9 * * *`) corrige divergências plano × Stripe.

Hoje `historias_clinicas` e `pdf_exports` ficam por tempo indeterminado (até o usuário excluir a HC ou a
conta); as tabelas de uso crescem sem limpeza automática. **[DONO]** definir o prazo de retenção (e a
fundamentação) e publicá-lo na política de privacidade. Limpeza das tabelas de uso, a rodar
periodicamente no SQL Editor (ou incluir em `RETENCAO`, se decidir):
```sql
delete from public.gerar_hc_usage    where dia < current_date - 90;
delete from public.ai_assistant_usage where dia < current_date - 90;
```

## Consentimento (art. 7º, I / art. 11, I)
O app registra `profiles.termos_aceitos` (aceite dos termos no cadastro). **[DONO]** garantir que
`anamnesismed-terms.html`/`anamnesismed-privacy.html` citem: coleta de dados de saúde, finalidade,
compartilhamento com operadores (Supabase, Vercel, Stripe, Anthropic) e transferência internacional;
considerar guardar **data e versão** do aceite (hoje é só um booleano). Recomendação de produto: o
usuário deve inserir dados **anonimizados** (sem nome/CPF do paciente) — `/api/assistente-dx` já
assume HC anonimizada pelo front.

## Operadores e DPA — PENDÊNCIA DO DONO
O conteúdo da HC é enviado à API da **Anthropic** (`/api/gerar-hc`, `/api/assistente-dx`).
**[DONO]** aceitar/arquivar o **DPA (Data Processing Addendum) da Anthropic**, conferir a política de
retenção de dados da API (e a opção de zero-data-retention, se couber no contrato) e registrar a base legal
da transferência internacional (art. 33). Fazer o mesmo com **Supabase, Vercel e Stripe**. Enquanto o DPA
não estiver arquivado, a evidência de conformidade desse operador está pendente.

## Logs
As rotas logam só IDs (userId do Supabase), contagem de tokens e códigos de erro; nunca texto de paciente
nem `err.message` do SDK/banco: todo log de erro passa por `descreveErro` (`api/_comum.js`: só código/tipo/status). Manter essa
regra em todo código novo (há testes que verificam isso para `/api/excluir-conta`, `/api/exportar-dados`, o webhook, a
reconciliação e os helpers).
