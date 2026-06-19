import { NextRequest, NextResponse } from "next/server";
import { generateSceneImage } from "@/lib/reel-build";

// Gera UMA imagem (Flux) de uma cena do reel. A CI chama 1× por cena — cada
// chamada é curta e cabe no timeout da função (ao contrário de gerar tudo de uma
// vez no preview, que estoura). Protegido pelo CRON_SECRET.
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, reason: "não autorizado" }, { status: 401 });
  }
  const prompt = req.nextUrl.searchParams.get("prompt") || "";
  if (!prompt.trim()) return NextResponse.json({ ok: false, reason: "sem prompt" }, { status: 400 });
  try {
    const url = await generateSceneImage(prompt, "manual");
    if (!url) return NextResponse.json({ ok: false, reason: "falha ao gerar imagem" }, { status: 502 });
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
