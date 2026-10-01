# O que ainda depende do dono

As migrations do banco **já foram aplicadas e conferidas** (2026-10-01, via conector do
Supabase). Não há mais nada para colar no SQL Editor.

## 1) Vercel: criar uma variável (1 minuto, opcional)

1. vercel.com > projeto do Anamnesis > **Settings** > **Environment Variables** > **Add**.
2. Nome `CRON_SECRET`, valor: um texto aleatório longo (32+ caracteres).
3. **Redeploy** do último deploy.

Serve só para manter o banco acordado no plano gratuito (o projeto estava pausado). Sem ela,
o endpoint `manter-banco-vivo` responde 503 e o resto do site funciona normalmente.

## 2) Publicar

Unir o PR #4 à `main` publica o site. O Claude faz isso quando você autorizar.

## Pode ficar para depois

- Guardar os termos de tratamento de dados (DPA) de Anthropic, Supabase, Vercel e Stripe.
- Definir a retenção dos dados (ver `docs/lgpd.md`).
