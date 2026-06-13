# Pipeline de Reels (vídeo) — AnamnesísMed

Pipeline **grátis** que gera e publica um Reel (vídeo 9:16) por dia no
`@anamnesismed`, reaproveitando o mesmo conteúdo gerado pela IA do carrossel.

## Visão geral do fluxo

```
GitHub Actions (21:00 UTC / 18:00 BRT)
  │
  ├─ 1. curl /api/publish?preview=1&slot=noite   → conteúdo via Claude (NÃO publica)
  │        { title, slides, accentWords, cta, caption, ... }
  │
  ├─ 2. monta REEL_PROPS (title, slides, accentWords, cta, kw, ed)
  │
  ├─ 3. node scripts/render-reel.mjs --props=reel-props.json
  │        Remotion empacota remotion/index.ts e renderiza → out/reel.mp4
  │        (1080x1920, 30fps, H.264/AAC, ~12–15s)
  │
  ├─ 4. node scripts/upload-blob.mjs
  │        sobe out/reel.mp4 para o Vercel Blob → imprime URL pública (stdout)
  │
  └─ 5. curl /api/publish-reel?video=<URL>&caption=...&slot=noite
           cria container REELS → polling status_code até FINISHED → media_publish
```

## Arquivos

| Arquivo | Papel |
|---|---|
| `remotion/Reel.tsx` | Composição do vídeo (capa → slides → CTA), Playfair + DM Sans |
| `remotion/Root.tsx` | Registra a composição `Reel` (1080x1920, 30fps), duração dinâmica |
| `remotion/index.ts` | `registerRoot` — entrada do bundler/renderer |
| `scripts/render-reel.mjs` | Renderiza `Reel` → `out/reel.mp4` (lê `REEL_PROPS` ou `--props=`) |
| `scripts/upload-blob.mjs` | Sobe o mp4 para o Vercel Blob, imprime a URL pública |
| `src/app/api/publish-reel/route.ts` | Publica como REEL (container → polling → publish) |
| `.github/workflows/instagram-reels.yml` | Orquestra tudo, 1x/dia + manual |

## Props de entrada do Reel (`REEL_PROPS` / `--props`)

```jsonc
{
  "title": "O erro que custa o diagnóstico", // gancho da capa
  "slides": ["frase 1", "frase 2", "frase 3"], // cenas internas
  "accentWords": ["diagnóstico", "...", "..."], // palavra vermelha por slide
  "cta": "Qual sua pergunta-chave na anamnese?", // pergunta na cena final
  "kw": "ANAMNESE", // watermark gigante da capa
  "ed": "012" // número da edição (cabeçalho)
}
```

O workflow monta esse objeto a partir do JSON de `/api/publish?preview=1` (que já
devolve `title`, `slides`, `accentWords`, `cta` e `caption`). A `caption` da prévia
é usada como legenda do Reel; `kw` é derivada do título.

## SECRETS necessários (GitHub → Settings → Secrets → Actions)

| Secret | De onde vem | Uso |
|---|---|---|
| `CRON_SECRET` | já existe (mesmo do carrossel) | autentica `/api/publish` e `/api/publish-reel` |
| `BLOB_READ_WRITE_TOKEN` | **criar** — Vercel → Storage → Blob → criar store → token RW | upload do mp4 |

> O Instagram (`META_ACCESS_TOKEN`, `META_INSTAGRAM_ACCOUNT_ID`) e
> `ANTHROPIC_API_KEY` já estão configurados nas **variáveis de ambiente da Vercel**
> (usados pelas rotas), não nos secrets do GitHub.

### Criar o Blob store (passo único do usuário)

1. Vercel → projeto `anamnesismed-ig` → aba **Storage** → **Create Database** → **Blob**.
2. Copie o token `BLOB_READ_WRITE_TOKEN` gerado.
3. GitHub → repositório → **Settings → Secrets and variables → Actions → New secret**
   → nome `BLOB_READ_WRITE_TOKEN`, cole o token.
   (O token também fica disponível para a Vercel automaticamente; aqui ele é usado
   no CI para fazer o upload.)

## Onde o render roda de verdade

O `render-reel.mjs` precisa de **Chromium** (Remotion Headless Shell) e **ffmpeg**.
O runner `ubuntu-latest` do GitHub Actions tem ffmpeg e o Remotion baixa o Chromium
automaticamente — então **o render só roda de verdade no CI** (ou em uma máquina
local com essas dependências). Em ambientes sem isso, o passo de render falha.

## Testar manualmente

1. Garanta os secrets `CRON_SECRET` e `BLOB_READ_WRITE_TOKEN` no GitHub.
2. GitHub → aba **Actions** → workflow **"Instagram Reels — AnamnesísMed"**
   → **Run workflow** → escolha o `slot` (ex.: `noite`) → **Run**.
3. Acompanhe os passos; ao final, o Reel aparece no `@anamnesismed`.

### Teste local da composição (sem publicar)

```bash
cd instagram-automation
npm install                 # instala remotion + deps

# Pré-visualizar no Remotion Studio (abre no navegador):
npx remotion studio remotion/index.ts

# Renderizar um mp4 de teste com props inline:
REEL_PROPS='{"title":"Teste de Reel","slides":["Slide um","Slide dois","Slide três"],"accentWords":["Reel","dois","três"],"cta":"Funcionou?","kw":"TESTE","ed":"000"}' \
  node scripts/render-reel.mjs
# saída: out/reel.mp4
```

## Notas

- **Não** modificamos `api/publish/route.ts` nem `api/og/route.tsx` — só arquivos novos.
- O `npm install` adiciona `remotion`, `@remotion/cli|bundler|renderer|google-fonts`
  (todos `4.0.290`) e `@vercel/blob`. Se a instalação não rodar no seu ambiente,
  as deps já estão no `package.json` — basta rodar `npm install` onde houver rede.
- A duração do vídeo se ajusta ao número de slides (ver `calculateMetadata` em
  `Root.tsx`): ~2.8s capa + 2.6s por slide + 3.0s CTA.
