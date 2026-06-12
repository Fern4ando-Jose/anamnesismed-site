import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/refresh-token
 *
 * Renova o token de longa duração do Instagram automaticamente.
 * Executado via cron mensal (todo dia 1° às 10:00 UTC).
 *
 * Usa a Instagram API with Instagram Login (graph.instagram.com):
 * o endpoint `refresh_access_token` renova um long-lived token (60 dias)
 * usando APENAS o próprio token — NÃO precisa de App ID/Secret.
 *
 * Fluxo:
 *  1. Lê o token atual (banco → fallback env var)
 *  2. Troca por um novo token de 60 dias via graph.instagram.com
 *  3. Persiste o novo token no banco (se houver banco)
 *
 * O publish/route.ts lê o token do banco e cai no env var se não houver.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // 1. Ler token atual (banco → fallback env). Banco é opcional.
  let currentToken: string | undefined = process.env.META_ACCESS_TOKEN;
  try {
    const { sql } = await import("@vercel/postgres");
    const rows = await sql`SELECT value FROM config WHERE key = 'meta_access_token'`;
    if (rows.rows[0]?.value) currentToken = rows.rows[0].value;
  } catch { /* sem banco — usa env var */ }

  if (!currentToken) {
    return NextResponse.json(
      { ok: false, error: "Nenhum token encontrado no banco nem no env var" },
      { status: 500 }
    );
  }

  // 2. Renovar via Instagram Login API (não requer App ID/Secret)
  const refreshUrl =
    `https://graph.instagram.com/refresh_access_token` +
    `?grant_type=ig_refresh_token&access_token=${currentToken}`;

  const res  = await fetch(refreshUrl);
  const data = await res.json();

  if (!res.ok || !data.access_token) {
    return NextResponse.json({ ok: false, error: data }, { status: 500 });
  }

  const newToken: string  = data.access_token;
  const expiresIn: number = data.expires_in ?? 5183944; // ~60 dias

  // 3. Persistir novo token no banco (se houver)
  try {
    const { sql } = await import("@vercel/postgres");
    await sql`
      INSERT INTO config (key, value, updated_at)
      VALUES ('meta_access_token', ${newToken}, NOW())
      ON CONFLICT (key) DO UPDATE
        SET value = ${newToken}, updated_at = NOW()
    `;
  } catch { /* sem banco — token renovado mas não persistido */ }

  return NextResponse.json({
    ok: true,
    message: "Token renovado com sucesso",
    expires_in_days: Math.round(expiresIn / 86400),
    updated_at: new Date().toISOString(),
  });
}
