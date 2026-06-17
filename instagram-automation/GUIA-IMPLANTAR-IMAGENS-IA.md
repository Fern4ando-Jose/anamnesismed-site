# Guia — Implantar geração de imagens por IA no @anamnesismed

Como adicionar **ilustração figurativa por IA (fal.ai / Flux) na capa** dos carrosséis,
do jeito que já roda no Dr. Libertad. A automação do AnamnesísMed **já existe e funciona**
— este guia só **adiciona** a camada de imagem. Nada do que já está no ar é reescrito.

> **Referência:** a implementação original está em `D:\Claude\dr-libertad-site` —
> `src/lib/illustration.ts`, `src/app/api/publish/route.ts`, `src/app/api/og/route.tsx`.

---

## 0. O que muda (visão de 1 minuto)

Hoje, a **capa** do AnamnesísMed é tipográfica sobre fundo escuro (`og/route.tsx`,
bloco `slide === "cover"`). Vamos:

1. Gerar **1 ilustração por post** (só a capa) com a fal, baseada no tema.
2. Passar a URL da imagem pra `og` via `&img=`.
3. A `og` desenha a imagem **full-bleed** atrás do conteúdo + um **scrim** escuro
   pra manter o título legível.
4. As slides internas (insight/CTA) **não mudam** — continuam o design atual.
5. Se a fal falhar (sem saldo, erro, etc.), a capa **cai no fundo escuro de hoje**.
   Ou seja: **nunca quebra um post.**

**Custo:** ~US$ 0,025 por post (modelo `flux/dev`). 3 posts/dia ≈ US$ 0,075/dia.
Slides internas não custam fal.

> ⚠️ **Regra de ouro (igual ao acoplamento TOPIC_CAT↔CATS do Dr. Libertad):**
> o array `SUBJECTS` (metáforas visuais) **tem que ficar alinhado por índice** com
> `TOPICS_BY_LANG.pt` / `.es`. Mexeu num tema, mexe na metáfora dele.

---

## 1. Criar `src/lib/illustration.ts`

Arquivo novo. É o motor da fal, adaptado à paleta clínica do AnamnesísMed
(papel `#f5f1e8`, tinta `#0a0c10`, vermelho clínico `#c0392b`, teal `#1a5c5c`).

```ts
// src/lib/illustration.ts
// ─── Geração de ilustração por IA (fal.ai / Flux) ────────────────────────────
// Gera UMA ilustração figurativa por post (usada na capa). Estilo editorial
// clínico de marca + subject por tema (ver SUBJECTS em /api/publish). Em qualquer
// falha retorna null → o /api/og cai no fundo escuro atual (nunca quebra o post).

// Paleta de marca (espelha og/route.tsx). Acento clínico = vermelho + teal.
const ACCENT_WORD = "deep clinical red and muted teal";
const ACCENT_HEX  = "#c0392b and #1a5c5c";

function buildPrompt(subject: string): string {
  return [
    `Cinematic conceptual medical-editorial illustration: ${subject}.`,
    `Dramatic chiaroscuro lighting, sculptural and atmospheric, fine film grain and subtle texture.`,
    `Anatomically respectful, sober and precise, like a premium clinical journal cover.`,
    `Restricted, desaturated palette: warm off-white paper tone (#f5f1e8) and deep ink black (#0a0c10), with a single muted accent of ${ACCENT_WORD} (${ACCENT_HEX}).`,
    `One bold central medical metaphor, generous negative space.`,
    `No text, no letters, no words, no logo, no watermark. No neon, no purple gradient, no gore, no graphic wounds, no corporate clip-art, no busy clutter.`,
  ].join(" ");
}

export interface IllustrationResult { url: string | null; error?: string; model?: string }

export async function generateIllustration(subject: string): Promise<IllustrationResult> {
  // Lê no momento da chamada (igual CRON_SECRET) — evita leitura na hora errada do build.
  const FAL_KEY   = process.env.FAL_KEY;
  const FAL_MODEL = process.env.FAL_MODEL || "fal-ai/flux/dev";
  if (!FAL_KEY)  return { url: null, error: "FAL_KEY ausente no runtime" };
  if (!subject)  return { url: null, error: "subject vazio" };

  const prompt = buildPrompt(subject);
  try {
    const res = await fetch(`https://fal.run/${FAL_MODEL}`, {
      method: "POST",
      headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        image_size: { width: 1024, height: 1280 }, // 4:5 — og faz cover-fit p/ 1080×1350
        num_images: 1,
        enable_safety_checker: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { url: null, error: `fal HTTP ${res.status}: ${body.slice(0, 220)}`, model: FAL_MODEL };
    }
    const data = await res.json();
    const url: string | undefined = data?.images?.[0]?.url;
    if (!url) return { url: null, error: `fal sem images[0].url: ${JSON.stringify(data).slice(0, 220)}`, model: FAL_MODEL };

    // Confirma que a URL responde antes de mandar pro Instagram.
    let check: Response | null = null;
    try { check = await fetch(url, { method: "GET" }); }
    catch (e) { return { url: null, error: `url não responde: ${e instanceof Error ? e.message : String(e)}`, model: FAL_MODEL }; }
    if (!check.ok) return { url: null, error: `url não responde (HTTP ${check.status})`, model: FAL_MODEL };

    return { url, model: FAL_MODEL };
  } catch (e) {
    return { url: null, error: `exceção: ${e instanceof Error ? e.message : String(e)}`, model: FAL_MODEL };
  }
}
```

---

## 2. Definir as metáforas visuais por tema (`SUBJECTS`)

Em `src/app/api/publish/route.ts`, logo **abaixo** de `TOPICS_BY_LANG`, adicione o
array `SUBJECTS`. **Cada linha corresponde ao tema do MESMO índice** em
`TOPICS_BY_LANG.pt`/`.es` (por isso PT e ES compartilham a mesma imagem — é o mesmo
conceito clínico). Os subjects são em **inglês** (o Flux responde melhor) e são
**metáforas**, nunca literais/gráficas.

```ts
// ─── Metáfora visual por tema (alinhada por ÍNDICE com TOPICS_BY_LANG) ─────────
// Mexeu num tema acima? Ajuste a metáfora na MESMA posição aqui.
const SUBJECTS: string[] = [
  // 0 SOCRATES / dor
  "a single human figure in profile with a glowing locus of pain radiating soft concentric rings, anatomical and restrained",
  // 1 Dispneia
  "a pair of human lungs rendered as delicate branching airways, one side shadowed and struggling for air",
  // 2 Score HEART / dor torácica
  "a sculptural human heart with a faint single EKG line crossing it, clinical and tense",
  // 3 Anamnese da febre
  "a slender clinical thermometer dissolving into a human silhouette with a warm glow at its core",
  // 4 Perda de peso involuntária
  "an hourglass shaped like a human torso, the sand thinning to almost nothing, quiet alarm",
  // 5 Cefaleia em trovão
  "a human head in profile struck by a single sudden fracture of light across the skull",
  // 6 CURB-65 / pneumonia
  "lungs veiled by clouded-glass opacities, a faint crossroads of two paths implied below",
  // 7 Síncope
  "a falling human silhouette dissolving into soft drifting particles, a fainting moment",
  // 8 FINDRISC / diabetes
  "a winding bloodstream river where crystalline glucose slowly forms, a subtle measuring scale",
  // 9 Anamnese psicossocial
  "two overlapping head profiles connected by fine listening threads, empathy and attention",
  // 10 Semiologia do abdome
  "a human abdomen mapped into four quadrants like an old anatomical chart, a guiding hand near it",
  // 11 Edema de MMII
  "a lower leg where a pressed fingertip leaves a lingering soft pit, swelling rendered gently",
  // 12 Palpitações
  "a human heart with irregular pulse waves scattering outward off-rhythm",
  // 13 Anamnese geriátrica / fragilidade
  "aged hands cradling a single fragile thread about to fray, frailty and care",
  // 14 OPQRST / urgências
  "a clock face merging with a locus of pain, the time-pressure of triage",
  // 15 Icterícia
  "an extreme clinical close study of a human eye with a warm amber sclera",
  // 16 Dor lombar / bandeiras
  "a human spine in profile with small red and amber flags marking certain vertebrae",
  // 17 Anamnese cardiorrespiratória
  "a chest cavity with heart and lungs intertwined, a stethoscope arc framing them",
  // 18 Score de Wells / TVP
  "a deep leg vein in cross-section with a clot slowly forming, blood flow obstructed",
  // 19 Hemograma alterado
  "blood cells under a microscope lens, one population visibly skewed in a luminous field",
  // 20 HAS / risco cardiovascular
  "a pressure gauge fused with a tense human artery under strain",
];
```

> Se você adicionar/remover temas em `TOPICS_BY_LANG`, **adicione/remova a linha
> correspondente aqui** — senão a capa pega a metáfora do tema errado.

---

## 3. Importar e chamar `generateIllustration` na `publish`

### 3.1 Import (topo do arquivo)

```ts
import { generateIllustration } from "@/lib/illustration";
```

### 3.2 Descobrir o índice do tema + gerar a imagem

Dentro do `GET`, **depois** de `const topic = ...` e **antes** de montar `slideUrls`
(perto da linha onde hoje começa "Construir URLs de cada slide"), adicione:

```ts
// Índice canônico do tema (mesma posição em TOPICS_BY_LANG e em SUBJECTS).
// getTopicForSlot devolve a string original, então indexOf na lista canônica acha o índice.
const topicIdx = TOPICS_BY_LANG[lang].indexOf(topic);
const subject  = topicIdx >= 0 ? (SUBJECTS[topicIdx] ?? "") : "";

// Ilustração por IA (fal/Flux) só na CAPA. Falha → og usa o fundo escuro atual.
const ill = await generateIllustration(subject);
log.illustration = ill.url ? "ia" : `fallback: ${ill.error ?? "?"}`;
const imgParam = ill.url ? `&img=${encodeURIComponent(ill.url)}` : "";
```

### 3.3 Anexar `&img=` SÓ na URL da capa

Na montagem de `slideUrls`, na **primeira** entrada (slide capa), acrescente `${imgParam}`:

```ts
const slideUrls: string[] = [
  // Slide 1 — capa  (← acrescente ${imgParam} no fim)
  `${base}/api/og?slide=cover&slot=${slot}&title=${enc(content.postTitle)}&kw=${enc(kw)}&ed=${ed}${hq}${imgParam}`,
  // ...resto IGUAL (insights e CTA não recebem imagem)
  ...content.slides.map((text, i) =>
    `${base}/api/og?slide=insight&text=${enc(text)}&accent=${enc(content.accentWords[i] ?? "")}&num=${i + 2}&total=${totalSlides}&kw=${enc(kw)}&ed=${ed}${hq}`
  ),
  `${base}/api/og?slide=cta&text=${enc(content.cta)}&num=${totalSlides}&total=${totalSlides}&kw=${enc(kw)}&ed=${ed}${hq}${ctaExtra}`,
];
```

> Como `generateIllustration` roda **antes** de montar `slideUrls`, o modo
> `?preview=1` (que já existe e devolve `slideUrls` sem publicar) já vai incluir a
> imagem — é o seu "dryrun" para testar sem postar (ver passo 6).

---

## 4. Fazer a `og` desenhar a imagem na capa

Em `src/app/api/og/route.tsx`:

### 4.1 Ler o novo parâmetro (junto dos outros `searchParams.get`)

```ts
const img = searchParams.get("img") ?? "";
```

### 4.2 No bloco `slide === "cover"`, renderizar a imagem + scrim

A capa hoje tem `backgroundImage: radial-gradient(...)`. Mantemos isso como fallback.
**Logo após** abrir a `<div>` raiz da capa (antes do watermark da keyword), insira o
bloco da imagem. Como o texto já é branco sobre escuro, um scrim escuro garante leitura:

```tsx
{/* Ilustração de IA full-bleed + scrim (só quando ?img= vem) */}
{img ? (
  <>
    <img
      src={img}
      width={W}
      height={H}
      style={{ position: "absolute", top: 0, left: 0, width: W, height: H, objectFit: "cover" }}
    />
    {/* Scrim: escurece topo e base pra título/keyword/CTA ficarem legíveis */}
    <div style={{
      position: "absolute", top: 0, left: 0, width: W, height: H, display: "flex",
      backgroundImage: "linear-gradient(180deg, rgba(10,12,16,0.62) 0%, rgba(10,12,16,0.20) 42%, rgba(10,12,16,0.88) 100%)",
    }} />
  </>
) : null}
```

Observações:
- O `next/og` (satori) **suporta `<img>` com URL remota** no edge runtime — é assim
  que o Dr. Libertad usa as URLs da fal. Não precisa baixar/converter.
- A barra vermelha do topo, o header, o título e a pílula "ARRASTE" continuam por
  cima (eles vêm **depois** no JSX, então ficam na frente da imagem e do scrim).
- Quando `img` está vazio, **nada muda** — a capa fica idêntica à de hoje.

---

## 5. Variáveis de ambiente + redeploy

A geração só liga quando a `FAL_KEY` existe **no projeto Vercel certo**.

1. No painel da Vercel, abra o **projeto da automação do AnamnesísMed** (o que
   deploya esta pasta `instagram-automation` — confira em Settings, não confunda
   com outro projeto).
2. **Settings → Environment Variables → Add:**
   - `FAL_KEY` = sua chave da fal (formato `xxxx:yyyy`). Marque **Production** (e
     **Preview** se quiser testar em branch). Marque como **Sensitive**.
   - (opcional) `FAL_MODEL` = `fal-ai/flux/schnell` para ~8× mais barato/rápido
     (qualidade um pouco menor). Sem isso, usa `fal-ai/flux/dev`.
3. **Redeploy** — variável de ambiente **só vale em deploy novo** criado depois de
   salvar. Faça um commit (pode ser vazio) ou clique em "Redeploy" no último deploy.

> 🔑 **Pegadinha que custou tempo no Dr. Libertad:** a `FAL_KEY` foi criada em
> OUTRO projeto Vercel por engano → o runtime via `FAL_KEY ausente`. Confirme que
> ela está no projeto que realmente serve esta automação.

**Conta fal:** pode reusar a mesma conta do Dr. Libertad (o saldo é compartilhado)
ou criar uma separada pra contabilidade do AnamnesísMed. A chave é independente por
projeto Vercel de qualquer forma.

---

## 6. Testar SEM publicar (e sem gastar à toa)

O endpoint já tem o modo `preview`, que gera o conteúdo + as URLs das slides **sem
postar nem salvar**. Depois das mudanças, ele também gera a imagem da capa:

```bash
# precisa do header de cron (mesmo do agendamento)
curl -H "Authorization: Bearer $CRON_SECRET" \
  "https://SEU-DEPLOY.vercel.app/api/publish?preview=1&slot=manha&lang=pt"
```

No JSON de resposta:
- `slideUrls[0]` deve conter `&img=https%3A...` → a imagem foi gerada. Abra essa
  URL `/api/og?...&img=...` no navegador pra ver a capa renderizada (HTTP 200 +
  bytes = ok; o `preview_screenshot` está quebrado neste ambiente, então a
  conferência visual é abrindo o link).
- Se `slideUrls[0]` **não** tiver `&img=`, a geração caiu no fallback — cheque o
  `log` (vai aparecer `fallback: <motivo>`, ex.: `FAL_KEY ausente no runtime`).

⚠️ **Cada `preview` gera 1 imagem na fal** (custa ~US$0,025) e chama a Claude (custo
de texto). Use com parcimônia. Se quiser testar SÓ o texto/layout sem queimar fal,
rode o preview antes de configurar a `FAL_KEY` (cai no fallback, custo fal zero).

Quando estiver bom, é só deixar o **cron** (GitHub Actions / Vercel) rodar normal —
ele chama o mesmo endpoint sem `preview`, e agora cada post sai com capa de IA.

---

## 7. Checklist de implantação

- [ ] `src/lib/illustration.ts` criado (passo 1)
- [ ] `SUBJECTS` adicionado e **alinhado por índice** com `TOPICS_BY_LANG` (passo 2)
- [ ] `import { generateIllustration }` + geração + `imgParam` na capa (passo 3)
- [ ] `og` lê `?img=` e desenha imagem + scrim na capa (passo 4)
- [ ] `FAL_KEY` no projeto Vercel **certo** + **redeploy** (passo 5)
- [ ] Saldo na fal (sem saldo → 403 "Exhausted balance" → cai no fallback)
- [ ] Testado via `?preview=1`: `slideUrls[0]` tem `&img=` e a capa abre 200 (passo 6)
- [ ] Deploy Vercel **verde** no commit antes de deixar o cron postar em produção

---

## 8. Diferenças propositais vs. Dr. Libertad

| Item | Dr. Libertad | AnamnesísMed |
|---|---|---|
| Temas | 21 (libertdade/mente) | 21 médicos, **bilíngue PT/ES** |
| Mapa de subject | `TOPIC_SUBJECT` (por string) | `SUBJECTS` (por **índice**, PT/ES compartilham) |
| Categorias/cores | `CATS` + `TOPIC_CAT` (6 cores) | sem categorias — **1 paleta clínica** (vermelho+teal) |
| Motivo abstrato | sim (`MotifId`, fallback) | **não** — fallback é o fundo escuro atual |
| Capa | imagem OU motivo | imagem OU gradiente escuro de hoje |
| Teste sem postar | `?dryrun=1` | `?preview=1` (já existia) |
| Estilo do prompt | editorial literário | editorial **clínico** (anatômico, sóbrio, sem gore) |

---

## 9. Manutenção e cuidados

- **Acoplamento `SUBJECTS`↔`TOPICS_BY_LANG`** é a regra inviolável aqui (equivale ao
  `TOPIC_CAT`↔`CATS` do Dr. Libertad). Sempre mexa nos dois juntos.
- **CSS satori-safe** na `og`: todo elemento com >1 filho precisa de `display:"flex"`.
  O bloco da imagem acima já segue isso.
- **A fresta "pagou mas não postou":** a imagem é gerada antes da publicação. Se o
  Instagram falhar depois, a imagem já foi cobrada. O `log` registra
  (`illustration` + `instagramError`). Se virar problema, dá pra reordenar para
  gerar por último.
- **Temas sensíveis:** o prompt já bloqueia `gore`/feridas gráficas. Se algum tema
  gerar imagem desconfortável, ajuste a metáfora em `SUBJECTS` (mais abstrata).
- **Conteúdo médico:** as imagens são **metáforas estéticas**, não material clínico
  de referência — não devem ser lidas como ilustração diagnóstica.
```
