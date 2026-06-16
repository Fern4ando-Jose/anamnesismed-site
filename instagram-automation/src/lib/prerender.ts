// ─── Pré-renderização de slide para o Blob ───────────────────────────────────
// Busca um PNG do /api/og NO SERVIDOR e o sobe para o Vercel Blob, devolvendo
// uma URL pública estática. Usado na CAPA (única com ilustração de IA): assim o
// Instagram busca uma imagem JÁ PRONTA, sem a composição on-the-fly (download da
// ilustração do fal.media + render Satori) que, em cold start, estourava o
// timeout do fetch do IG → "Media download has failed".
//
// Qualquer falha retorna null → o chamador mantém a URL on-the-fly do /api/og
// (nunca quebra o post).

import { put } from "@vercel/blob";

export async function prerenderToBlob(ogUrl: string, key: string): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(ogUrl);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const blob = await put(key, buf, {
      access: "public",
      contentType: "image/png",
      token,
      addRandomSuffix: true, // evita colisão/cache entre execuções
    });
    return blob.url;
  } catch {
    return null;
  }
}
