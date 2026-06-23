import { NextResponse } from "next/server";

const TOKEN      = process.env.META_ACCESS_TOKEN;
const ACCOUNT_ID = process.env.META_INSTAGRAM_ACCOUNT_ID;

/**
 * GET /api/instagram
 * Lista os posts publicados no @anamnesismed via Meta Graph API.
 */
export async function GET() {
  const res = await fetch(
    `https://graph.facebook.com/v25.0/${ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${TOKEN}`
  );

  const data = await res.json();

  if (!res.ok) {
    // Não ecoar o objeto cru da Meta (metadados) ao cliente — só logar no servidor.
    console.error("[instagram] Graph API erro:", res.status);
    return NextResponse.json({ error: "Falha ao consultar a Graph API" }, { status: 502 });
  }

  return NextResponse.json(data);
}
