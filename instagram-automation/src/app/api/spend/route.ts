import { NextRequest, NextResponse } from "next/server";
import { spendSummary } from "@/lib/spend";

// GET /api/spend — painel de gasto do dia/mês + tetos por automação.
// Protegido pelo CRON_SECRET (mesmo segredo do publish/migrate).
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const data = await spendSummary();
    return NextResponse.json({ ok: true, ...data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
