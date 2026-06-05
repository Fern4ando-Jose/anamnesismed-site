import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/migrate
 * Cria as tabelas necessárias no Vercel Postgres.
 * Chamar UMA VEZ após o primeiro deploy.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { sql } = await import("@vercel/postgres");

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id                SERIAL PRIMARY KEY,
      topic             TEXT NOT NULL,
      slot              TEXT NOT NULL DEFAULT 'manha',
      title             TEXT NOT NULL,
      body              TEXT NOT NULL,
      instagram_caption TEXT NOT NULL,
      tags              TEXT[] NOT NULL DEFAULT '{}',
      instagram_post_id TEXT,
      published_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts (published_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_posts_topic ON posts (topic)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS config (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  return NextResponse.json({ ok: true, message: "Tabelas criadas com sucesso." });
}
