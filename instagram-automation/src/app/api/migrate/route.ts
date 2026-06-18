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

  // Idioma/conta do post (pt → @anamnesismed, es → @anamnesismed.es). Usado pelo
  // /api/runs-status p/ saber qual (slot,conta) do dia já publicou de fato.
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS lang TEXT`;

  await sql`
    CREATE TABLE IF NOT EXISTS config (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Governança de custo: 1 linha por chamada paga (fal/Anthropic/Tavily).
  await sql`
    CREATE TABLE IF NOT EXISTS spend_log (
      id         SERIAL PRIMARY KEY,
      automation TEXT NOT NULL,
      platform   TEXT NOT NULL,
      operation  TEXT NOT NULL,
      model      TEXT,
      units      INTEGER NOT NULL DEFAULT 0,
      cost_usd   DOUBLE PRECISION NOT NULL DEFAULT 0,
      meta       JSONB NOT NULL DEFAULT '{}'::jsonb,
      ts         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_spend_log_ts ON spend_log (ts DESC)
  `;

  // Cache de 24h da ilustração aprovada no QA (reuso entre PT/ES e publish/preview).
  await sql`
    CREATE TABLE IF NOT EXISTS illustration_cache (
      cache_key  TEXT PRIMARY KEY,
      url        TEXT NOT NULL,
      subject    TEXT,
      model      TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  return NextResponse.json({ ok: true, message: "Tabelas criadas com sucesso." });
}
