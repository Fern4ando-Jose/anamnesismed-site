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
    return NextResponse.json({ error: data }, { status: 500 });
  }

  return NextResponse.json(data);
}
