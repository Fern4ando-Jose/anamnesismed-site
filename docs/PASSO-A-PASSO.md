# Passo a passo do dono (só 2 coisas)

Tudo o mais já foi feito no código. Faltam apenas estas duas ações, que só você pode fazer
porque exigem o seu login no Supabase e na Vercel. Tempo total: cerca de 10 minutos.

## 1) Supabase: colar um arquivo (uma vez)

1. Abra o GitHub, vá em `supabase-migrations/APLICAR-TUDO.sql` (branch
   `claude/anamnese-medica-correcao-lfvmyq`) e clique em **Raw**.
2. Selecione tudo (Ctrl+A) e copie (Ctrl+C).
3. Entre em supabase.com, abra o projeto do Anamnesis, clique em **SQL Editor** e depois
   em **New query**.
4. Cole (Ctrl+V) e clique em **Run**.
5. Deve aparecer **Success**. Se aparecer um erro, copie o texto do erro e me mande
   (sem nenhuma chave ou senha).

Observação: rode esse arquivo **uma vez só**. Não rode migrations antigas de novo.

## 2) Vercel: criar uma variável

1. Entre em vercel.com, abra o projeto do Anamnesis e vá em **Settings**, depois
   **Environment Variables**.
2. Clique em **Add**. Nome: `CRON_SECRET`. Valor: um texto longo e aleatório, com 32
   caracteres ou mais (pode gerar num gerador de senhas). Guarde esse valor num lugar seguro.
3. Salve e depois vá em **Deployments** e clique em **Redeploy** no último deploy.

## Depois disso

Só então una o PR #4 à `main` (botão **Merge** no GitHub). Se unir antes de colar o arquivo
do passo 1, as rotas de IA respondem erro 503 de propósito, até as migrations serem aplicadas.

## Pode ficar para depois (não trava nada)

- Guardar os termos de tratamento de dados (DPA) da Anthropic, Supabase, Vercel e Stripe.
- Definir por quanto tempo guardar os dados (retenção). Ver `docs/lgpd.md`.
