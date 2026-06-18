import { NextRequest, NextResponse } from "next/server";

// GET /api/runs-status — diagnóstico do agendamento do dia para o catch-up.
// Reporta quais (slot, idioma) já VENCERAM (passou do horário do cron + carência)
// e ainda NÃO publicaram com sucesso hoje (instagram_post_id não nulo). O
// catchup.yml lê `missing[]` e redispara só esses workflows. Idempotente: a trava
// anti-duplicata (mesmo caso por conta em 7 dias) impede republicação se o cron
// real atrasado chegar depois.

type Lang = "pt" | "es";
type Slot = "manha" | "tarde" | "noite";

// Agendamento (UTC) — espelha os crons de instagram-posts.yml (PT) e
// instagram-posts-es.yml (ES). BRT = UTC-3.
const SCHEDULE: { lang: Lang; slot: Slot; h: number; m: number }[] = [
  { lang: "pt", slot: "manha", h: 10, m: 0 },
  { lang: "pt", slot: "tarde", h: 15, m: 30 },
  { lang: "pt", slot: "noite", h: 23, m: 0 },
  { lang: "es", slot: "manha", h: 9, m: 0 },
  { lang: "es", slot: "tarde", h: 13, m: 0 },
  { lang: "es", slot: "noite", h: 18, m: 0 },
];

// Carência após o horário do cron antes de considerar o slot "vencido" — dá
// tempo de o cron normal rodar e publicar antes do catch-up disparar de novo.
const GRACE_MIN = 20;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const now = new Date();
  const minutesNowUTC = now.getUTCHours() * 60 + now.getUTCMinutes();
  const today = now.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

  // Slots cujo horário (+ carência) já passou hoje.
  const due = SCHEDULE.filter((s) => minutesNowUTC >= s.h * 60 + s.m + GRACE_MIN);

  let publishedKeys = new Set<string>();
  try {
    const { sql } = await import("@vercel/postgres");
    const rows = await sql<{ slot: string; lang: string }>`
      SELECT slot, lang FROM posts
      WHERE instagram_post_id IS NOT NULL
        AND (published_at AT TIME ZONE 'utc')::date = ${today}::date
    `;
    publishedKeys = new Set(rows.rows.map((r) => `${r.lang}:${r.slot}`));
  } catch {
    // Sem banco: não há como saber o que faltou → não reporta missing (fail-safe:
    // o catch-up não dispara nada às cegas).
    return NextResponse.json({ ok: true, today, missing: [], note: "sem banco — catch-up inativo" });
  }

  const missing = due
    .filter((s) => !publishedKeys.has(`${s.lang}:${s.slot}`))
    .map((s) => ({ lang: s.lang, slot: s.slot }));

  return NextResponse.json({
    ok: true,
    today,
    nowUTC: now.toISOString(),
    due: due.map((s) => ({ lang: s.lang, slot: s.slot })),
    published: [...publishedKeys],
    missing,
  });
}
