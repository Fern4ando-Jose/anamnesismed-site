# AnamnesísMed — Instagram Automation

Sistema de posts diários automáticos para @anamnesismed. Arquitetura idêntica ao Dr. Libertad.

## Stack
- **Next.js** (App Router, Edge Runtime para imagens)
- **Vercel** — deploy + Cron Jobs
- **Vercel Postgres** — log dos posts publicados
- **Claude API** (Haiku) — geração de conteúdo médico
- **Tavily API** — pesquisa de contexto clínico
- **Meta Graph API** — publicação no Instagram

---

## 1. Pré-requisitos

### Meta App + Token
1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Crie um app do tipo **Business**
3. Adicione o produto **Instagram Graph API**
4. Conecte a conta @anamnesismed (precisa ser conta profissional)
5. Gere um **User Access Token** com as permissões:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_read_engagement`
6. Troque por um **Long-lived token** (60 dias):
   ```
   https://graph.facebook.com/v25.0/oauth/access_token
     ?grant_type=fb_exchange_token
     &client_id={APP_ID}
     &client_secret={APP_SECRET}
     &fb_exchange_token={SHORT_LIVED_TOKEN}
   ```
7. Anote o **Instagram Account ID** (numérico):
   ```
   https://graph.facebook.com/v25.0/me/accounts?access_token={TOKEN}
   ```

### Claude API
- Crie uma chave em [console.anthropic.com](https://console.anthropic.com)

### Tavily API
- Crie uma chave em [tavily.com](https://tavily.com)

---

## 2. Deploy na Vercel

```bash
cd instagram-automation
npm install
vercel --prod
```

### Adicionar banco de dados
No painel Vercel: **Storage → Create Database → Postgres**
Conecte ao projeto — as variáveis `POSTGRES_URL*` são preenchidas automaticamente.

### Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Valor |
|---|---|
| `META_ACCESS_TOKEN` | token de 60 dias |
| `META_INSTAGRAM_ACCOUNT_ID` | ID numérico da conta |
| `META_APP_ID` | ID do Meta App |
| `META_APP_SECRET` | Secret do Meta App |
| `ANTHROPIC_API_KEY` | chave Claude |
| `TAVILY_API_KEY` | chave Tavily |
| `PRODUCTION_URL` | `https://anamnesismed-ig.vercel.app` |
| `CRON_SECRET` | string aleatória longa (ex: `openssl rand -hex 32`) |

---

## 3. Criar tabelas (uma única vez)

```
curl -H "Authorization: Bearer SEU_CRON_SECRET" \
     https://anamnesismed-ig.vercel.app/api/migrate
```

---

## 4. Crons (configurados em vercel.json)

| Horário UTC | Horário BRT | Slot |
|---|---|---|
| 11:00 | 08:00 | manhã |
| 22:00 | 19:00 | noite |
| 10:00 (dia 1°) | 07:00 | refresh token |

> O Vercel Cron envia automaticamente o header `Authorization: Bearer {CRON_SECRET}`.

---

## 5. Testar manualmente

```bash
# Testar geração + publicação (manhã)
curl -H "Authorization: Bearer SEU_CRON_SECRET" \
     "https://anamnesismed-ig.vercel.app/api/publish?slot=manha"

# Forçar um tópico específico
curl -H "Authorization: Bearer SEU_CRON_SECRET" \
     "https://anamnesismed-ig.vercel.app/api/publish?slot=noite&topic=Score+HEART+para+dor+torácica"

# Prévia de uma imagem (no navegador)
https://anamnesismed-ig.vercel.app/api/og?slide=cover&title=A+anamnese+que+salva+vidas&kw=SOCRATES&ed=001

# Ver posts publicados
curl "https://anamnesismed-ig.vercel.app/api/instagram"
```

---

## 6. Fluxo de cada publicação

```
Cron Vercel (2x/dia)
  └─ GET /api/publish?slot=manha|noite
       ├─ Seleciona tópico médico (rotação semanal determinística)
       ├─ Pesquisa contexto clínico via Tavily
       ├─ Gera conteúdo via Claude Haiku
       │    ├─ postTitle, postBody
       │    ├─ 3 slides (insights clínicos)
       │    ├─ accentWords (palavras destacadas em vermelho)
       │    ├─ cta (slide final)
       │    └─ instagramCaption + tags
       ├─ Constrói URLs dos slides via /api/og
       ├─ Publica como carrossel no @anamnesismed
       └─ Salva log no Postgres
```

---

## 7. Renovação do token

O cron mensal (`/api/refresh-token`) renova automaticamente o token antes dos 60 dias expirarem.
Se precisar forçar:
```bash
curl -H "Authorization: Bearer SEU_CRON_SECRET" \
     https://anamnesismed-ig.vercel.app/api/refresh-token
```

---

## Tópicos programados (21 temas, rotação semanal)

1. Mnemônico SOCRATES para avaliação da dor  
2. Dispneia: abordagem sistemática e diagnóstico diferencial  
3. Score HEART para dor torácica na emergência  
4. Anamnese da febre: quando investigar mais  
5. Perda de peso involuntária: bandeiras vermelhas  
6. Cefaleia em trovão: emergência neurológica  
7. CURB-65 e decisão de internação na pneumonia  
8. Síncope: avaliação clínica e estratificação de risco  
9. FINDRISC e rastreio de diabetes tipo 2  
10. Anamnese psicossocial — o que os livros não ensinam  
11. Semiologia do abdome: da queixa ao diagnóstico  
12. Edema de membros inferiores: causas e investigação  
13. Palpitações: abordagem na consulta  
14. Anamnese geriátrica e síndrome da fragilidade  
15. Mnemônico OPQRST para urgências clínicas  
16. Icterícia: diagnóstico diferencial e semiologia  
17. Dor lombar: bandeiras vermelhas e amarelas  
18. Anamnese cardiorrespiratória completa  
19. Score Well's para TVP e embolia pulmonar  
20. Hemograma alterado: correlação clínica  
21. HAS: anamnese e avaliação de risco cardiovascular  
