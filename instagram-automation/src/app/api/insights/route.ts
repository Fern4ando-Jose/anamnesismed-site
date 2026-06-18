import { NextRequest, NextResponse } from "next/server";
import { getInsights, type Lang } from "@/lib/insights";

// GET /api/insights?lang=pt|es — métricas dos posts em JSON (alcance, saves,
// shares, retenção dos Reels) + comparativo por formato. Protegido pelo
// CRON_SECRET (header Authorization: Bearer ... ou ?key=...), pois consome quota
// da Graph API e expõe desempenho do perfil.
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const key = req.nextUrl.searchParams.get("key");
  const authorized = Boolean(secret) && (auth === `Bearer ${secret}` || key === secret);
  if (!authorized) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const lang: Lang = req.nextUrl.searchParams.get("lang") === "es" ? "es" : "pt";
  const data = await getInsights(lang);
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
