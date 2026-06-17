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
// Renova UM token (de uma conta) via Instagram Login API e persiste no banco
// sob a chave dada (se houver banco). Retorna o resultado por conta.
async function refreshOne(dbKey: string, envToken: string | undefined) {
  // 1. Ler token atual (banco → fallback env). Banco é opcional.
  let currentToken: string | undefined = envToken;
  try {
    const { sql } = await import("@vercel/postgres");
    const rows = await sql`SELECT value FROM config WHERE key = ${dbKey}`;
    if (rows.rows[0]?.value) currentToken = rows.rows[0].value;
  } catch { /* sem banco — usa env var */ }

  if (!currentToken) {
    return { ok: false as const, error: "Nenhum token (banco nem env var)" };
  }

  // 2. Renovar via Instagram Login API (não requer App ID/Secret)
  const refreshUrl =
    `https://graph.instagram.com/refresh_access_token` +
    `?grant_type=ig_refresh_token&access_token=${currentToken}`;

  const res  = await fetch(refreshUrl);
  const data = await res.json();

  if (!res.ok || !data.access_token) {
    return { ok: false as const, error: data };
  }

  const newToken: string  = data.access_token;
  const expiresIn: number = data.expires_in ?? 5183944; // ~60 dias

  // 3. Persistir novo token no banco (se houver)
  try {
    const { sql } = await import("@vercel/postgres");
    await sql`
      INSERT INTO config (key, value, updated_at)
      VALUES (${dbKey}, ${newToken}, NOW())
      ON CONFLICT (key) DO UPDATE
        SET value = ${newToken}, updated_at = NOW()
    `;
  } catch { /* sem banco — token renovado mas não persistido */ }

  return { ok: true as const, expires_in_days: Math.round(expiresIn / 86400) };
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Renova PT sempre; ES só se a conta espanhola estiver configurada.
  const pt = await refreshOne("meta_access_token", process.env.META_ACCESS_TOKEN);
  const es = process.env.META_ACCESS_TOKEN_ES
    ? await refreshOne("meta_access_token_es", process.env.META_ACCESS_TOKEN_ES)
    : null;

  const ok = pt.ok && (es === null || es.ok);
  return NextResponse.json(
    { ok, message: ok ? "Token(s) renovado(s)" : "Falha ao renovar", pt, es, updated_at: new Date().toISOString() },
    { status: ok ? 200 : 500 }
  );
}
