-- Execute no painel do Vercel Postgres (Storage → Query) ou via /api/migrate

CREATE TABLE IF NOT EXISTS posts (
  id                SERIAL PRIMARY KEY,
  topic             TEXT NOT NULL,
  slot              TEXT NOT NULL DEFAULT 'manha',  -- 'manha' | 'noite'
  title             TEXT NOT NULL,
  body              TEXT NOT NULL,
  instagram_caption TEXT NOT NULL,
  tags              TEXT[] NOT NULL DEFAULT '{}',
  instagram_post_id TEXT,
  published_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_topic        ON posts (topic);

-- Armazena o token Meta (renovado mensalmente pelo /api/refresh-token)
CREATE TABLE IF NOT EXISTS config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
