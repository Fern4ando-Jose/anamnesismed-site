# LGPD — retenção, exclusão, exportação e consentimento

> Dados de saúde (história clínica) são **dados pessoais sensíveis** (LGPD art. 5º, II e art. 11).
> Este documento é um resumo **técnico**, não parecer jurídico. Itens **[DONO]** dependem de
> decisão/ação do controlador e não são resolvidos pelo código.

## Mecanismos implementados

### Exportação (art. 18, II e V — acesso e portabilidade) — `GET /api/exportar-dados`
- Exige `Authorization: Bearer <access_token>`. O usuário é o do **token** (não há parâmetro de id).
- Devolve um JSON (download) com `usuario`, `perfil`, `historias_clinicas` e `pdf_exports` do próprio
  usuário. Falha em qualquer leitura → 500 (nunca entrega exportação parcial). `Cache-Control: no-store`.
- Uso no front (a fazer pelo front): `fetch('/api/exportar-dados', { headers: { Authorization: 'Bearer ' + token } })`
  e salvar o blob como arquivo.

### Exclusão (art. 18, VI — eliminação) — `POST /api/excluir-conta`
- Exige Bearer **e** corpo `{ "confirmar": true }` (ação irreversível).
- Ordem: (1) cancela na hora as assinaturas do Stripe do cliente — se falhar, **aborta sem apagar nada**
  (senão o ex-usuário seguiria sendo cobrado); (2) apaga `historias_clinicas`, `pdf_exports`,
  `gerar_hc_usage`, `ai_assistant_usage` e `profiles`; (3) apaga o usuário no Auth do Supabase.
- Idempotente/retomável: cada passo pode ser repetido; falha no meio → 5xx e basta repetir a chamada
  (enquanto o login existir, o token vale). Depois de concluída, repetir devolve 401 (token do usuário
  apagado) — mesmo resultado final. Tabelas opcionais ausentes (migration não aplicada) são ignoradas.
- Não loga conteúdo clínico, e-mail nem o corpo da requisição; só IDs e códigos de erro.
- **Não é apagado**: faturas/registros fiscais no Stripe (retidos pelo Stripe por obrigação legal/fiscal);
  logs da Vercel/Supabase expiram pelo prazo de cada plano; backups do Supabase seguem o ciclo do plano.
  **[DONO]** declarar isso na política de privacidade.
- Envs: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_URL`.
- Uso no front (a fazer): botão "Excluir minha conta" com confirmação dupla → `POST` com `{confirmar:true}` →
  `sb.auth.signOut()` e redirecionar à landing.

## Retenção
Hoje `historias_clinicas` e `pdf_exports` ficam por tempo indeterminado (até o usuário excluir a HC ou a
conta); as tabelas de uso (`*_usage`) crescem sem limpeza. **[DONO]** definir o prazo de retenção (e a
fundamentação) e publicá-lo na política de privacidade. Limpeza segura das tabelas de uso, a rodar
periodicamente no SQL Editor:
```sql
delete from public.gerar_hc_usage    where dia < current_date - 90;
delete from public.ai_assistant_usage where dia < current_date - 90;
delete from public.stripe_events      where received_at < now() - interval '90 days';
```
(`stripe_events` só guarda o id/tipo do evento do Stripe; 90 dias cobre a janela de reentrega.)

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
nem `err.message` do SDK/banco. Manter essa regra em todo código novo (há testes que verificam isso para
`/api/excluir-conta`, `/api/exportar-dados` e o webhook).
