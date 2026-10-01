# Segurança — decisões, riscos aceitos e plano

Resumo técnico para o dono. Atualizado em 2026-10-02.

## 1. CSP: `'unsafe-inline'` em `script-src` — RISCO ACEITO

**Situação.** A Content-Security-Policy (em `vercel.json`) ainda permite `'unsafe-inline'` em
`script-src`. O front tem ~199 handlers inline (`onclick="..."` etc.) e blocos `<script>` inline;
removê-lo derrubaria o app inteiro. Com `'unsafe-inline'`, a CSP **não** barra um XSS que injete
`<script>`/atributos de evento — ela só limita *para onde* o código pode falar e *o que* pode carregar.

**Risco aceito (por quê é tolerável hoje).**
- O app renderiza conteúdo digitado pelo próprio usuário (HC), não de terceiros; não há campo
  público/compartilhado onde um usuário injete HTML que outro veja.
- `connect-src` é fechado ao próprio domínio e ao projeto Supabase: um XSS teria dificuldade para
  **exfiltrar** dados para um servidor do atacante. `frame-src 'none'`, `object-src 'none'`,
  `form-action 'self'`, `base-uri 'self'` e `frame-ancestors 'none'` fecham os outros caminhos.
- Nenhum token de pagamento/cartão passa pelo nosso domínio (o Stripe Checkout é redirecionamento
  de página inteira).
- O token de sessão do Supabase fica no `localStorage` (padrão do supabase-js): um XSS conseguiria
  lê-lo. É exatamente o risco que o plano abaixo reduz.

**O que está endurecido (mantido o mais restritivo possível).** `default-src 'self'`;
`script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net` (sem `unsafe-eval`; Stripe.js removido —
o front só redireciona para a URL do checkout); `img-src 'self' data: blob:` (sem `https:` aberto);
`connect-src 'self' https://<projeto>.supabase.co` (host exato, sem curinga e sem `wss:`/Stripe — o
front não usa Realtime nem chama o Stripe do navegador); `frame-src 'none'`; `object-src 'none'`;
`base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests`.
Também `Permissions-Policy` (câmera/microfone/geolocalização/pagamento desligados).
`test/vercel-config.test.js` valida o JSON, essas diretivas e que as páginas HTML não carregam nada
que a CSP bloqueie.

**Se você trocar o projeto Supabase**, atualize o host em `connect-src` (`vercel.json`) junto com
`SUPABASE_URL` em `supabase-integration.js` — o teste acima falha se ficarem diferentes.

**Plano para remover `'unsafe-inline'` (ordem sugerida).**
1. Hospedar o supabase-js no próprio domínio (`/vendor/…`, já em andamento) e então **remover
   `https://cdn.jsdelivr.net`** do `script-src`.
2. Migrar os `onclick=`/`oninput=` etc. para `addEventListener` em arquivos `.js` (delegação por
   `data-acao="..."`), página por página (começar por landing/auth/dashboard, deixar o app por último).
3. Mover os blocos `<script>` inline para arquivos externos versionados (`scripts/versionar-assets.mjs`
   já carimba a versão).
4. Passar `style` inline para classes (opcional; `style-src 'unsafe-inline'` é risco bem menor).
5. Com tudo externo: remover `'unsafe-inline'` do `script-src` (ou usar nonce por requisição, que
   exigiria uma Function/middleware servindo o HTML). Antes, rodar um período com
   `Content-Security-Policy-Report-Only` para achar o que sobrou.
Enquanto isso não acontece, o risco é tratado por: sanitização de tudo que vai a `innerHTML`,
dependências mínimas e revisão a cada mudança de front.

## 2. `/api/gerar-hc` sem gate de plano — POR DESENHO

Qualquer usuário logado (trial **ou** pro) pode gerar a HC por IA. É decisão de produto: o trial grátis
precisa experimentar o fluxo central. O custo é contido por: autenticação obrigatória (401), cota
diária por usuário (40/dia, atômica via RPC `consumir_cota_ia`, **fail-closed**: sem a RPC devolve 503
e não chama a API paga), limites de tamanho de entrada, e **devolução da cota** quando o modelo
falha (`devolver_cota_ia`). Já o `/api/assistente-dx` (mais caro) exige plano `pro` e tem teto de 20/dia.
Se o abuso de contas-trial virar problema, as alavancas são: reduzir o teto diário do trial,
exigir e-mail confirmado, ou passar a exigir `pro`/trial ativo (`trial_end > now()`) nessa rota.

## 3. Defesas de back end (referência rápida)

| Tema | Mecanismo |
|---|---|
| Escalada de plano | Trigger `profiles_protege_billing` + RLS por operação; sem DELETE para o cliente |
| Cota de IA | RPC atômica `consumir_cota_ia` (`where count < limite`), `devolver_cota_ia` (nunca < 0), só `service_role` |
| Funções SQL | `SECURITY DEFINER`/triggers com `search_path = public, pg_temp` (migration 2026-10-02) |
| Webhook Stripe | Assinatura validada; idempotência só para tipos que escrevem; falha de escrita → 5xx + reversão da idempotência (Stripe retenta) |
| Checkout | Identidade vem do token; bloqueia quem já tem assinatura viva (409); reaproveita o `customer` |
| Cron | `CRON_SECRET` obrigatório (503 sem ele, 401 com Bearer errado) |
| LGPD | `/api/exportar-dados`, `/api/excluir-conta` (ver `docs/lgpd.md`) |
| Dependências | `npm audit --audit-level=high` falha o CI |
| Testes de SQL | `test/sql-migrations.test.js` (estático), `test/sql-pg.test.js` (Postgres real, quando disponível), `supabase-migrations/tests/*.sql` (SQL Editor) |

## 4. Dependências (`npm audit`)

Em 2026-10-02 o `npm audit` está limpo (0 vulnerabilidades, após `npm audit fix` do `qs` transitivo).
O CI roda `npm audit --audit-level=high` **sem** `continue-on-error`: vulnerabilidade alta/crítica
passa a falhar o job. Se aparecer advisory sem correção disponível, registre aqui a exceção e o motivo.
