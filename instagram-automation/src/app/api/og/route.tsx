import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// ─── Dimensões (1:1 quadrado, padrão Instagram feed) ─────────────────────────
const W = 1080;
const H = 1080;

// ─── Paleta AnamnesísMed ──────────────────────────────────────────────────────
const INK    = "#0a0c10";
const PAPER  = "#f5f1e8";
const CREAM  = "#ede8d8";
const RED    = "#c0392b";
const TEAL   = "#1a5c5c";
const MUTED  = "#6b6660";
const WHITE  = "#ffffff";

// ─── Carrega fontes do Google Fonts ──────────────────────────────────────────

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css  = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  }).then(r => r.text());

  const src = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!src) throw new Error(`Font URL not found for ${family}:${weight}`);

  return fetch(src).then(r => r.arrayBuffer());
}

// ─── Quebra texto em múltiplas linhas para o JSX ─────────────────────────────

function wrapText(text: string, accentWord: string): React.ReactNode {
  if (!accentWord) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(\\b${accentWord}\\b)`, "i"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === accentWord.toLowerCase()
          ? <span key={i} style={{ color: RED }}>{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const slide  = searchParams.get("slide")  ?? "cover";
  const title  = searchParams.get("title")  ?? "";
  const text   = searchParams.get("text")   ?? "";
  const accent = searchParams.get("accent") ?? "";
  const kw     = searchParams.get("kw")     ?? "";
  const ed     = searchParams.get("ed")     ?? "001";
  const num    = parseInt(searchParams.get("num")   ?? "1");
  const total  = parseInt(searchParams.get("total") ?? "5");

  // Carregar fontes em paralelo
  const [serifBold, serifRegular, sansReg] = await Promise.all([
    loadGoogleFont("Playfair Display", 900),
    loadGoogleFont("Playfair Display", 700),
    loadGoogleFont("DM Sans", 400),
  ]);

  const fonts = [
    { name: "Playfair", data: serifBold,    weight: 900 as const, style: "normal" as const },
    { name: "Playfair", data: serifRegular, weight: 700 as const, style: "normal" as const },
    { name: "DMSans",   data: sansReg,      weight: 400 as const, style: "normal" as const },
  ];

  // ── SLIDE CAPA ──────────────────────────────────────────────────────────────
  if (slide === "cover") {
    return new ImageResponse(
      (
        <div
          style={{
            width: W, height: H,
            background: PAPER,
            display: "flex", flexDirection: "column",
            fontFamily: "DMSans",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Barra decorativa topo */}
          <div style={{ height: 5, background: RED, width: "100%", flexShrink: 0 }} />

          {/* Conteúdo principal */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: "60px 72px",
            justifyContent: "space-between",
          }}>

            {/* Header — marca */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                fontFamily: "Playfair", fontSize: 22, fontWeight: 900,
                color: INK, letterSpacing: "-0.5px",
                display: "flex",
              }}>
                Anamnesis<span style={{ color: RED }}>Med</span>
              </div>
              <div style={{
                fontFamily: "DMSans", fontSize: 11, color: MUTED,
                letterSpacing: "2px", textTransform: "uppercase",
              }}>
                {`Edição #${ed}`}
              </div>
            </div>

            {/* Título grande */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 24,
            }}>
              {/* Keyword em destaque */}
              <div style={{
                fontFamily: "DMSans", fontSize: 11, fontWeight: 400,
                color: RED, letterSpacing: "4px", textTransform: "uppercase",
              }}>
                {kw}
              </div>

              {/* Título principal */}
              <div style={{
                fontFamily: "Playfair", fontSize: 68, fontWeight: 900,
                color: INK, lineHeight: 1.05, letterSpacing: "-2px",
              }}>
                {title}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{
                fontFamily: "DMSans", fontSize: 13, color: MUTED,
                letterSpacing: "0.5px",
              }}>
                anamnesismed.com
              </div>
              <div style={{
                display: "flex", gap: 5, alignItems: "center",
              }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === 0 ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === 0 ? RED : CREAM,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      { width: W, height: H, fonts }
    );
  }

  // ── SLIDE INSIGHT ───────────────────────────────────────────────────────────
  if (slide === "insight") {
    // Destacar accentWord no texto
    const words = text.split(" ");

    return new ImageResponse(
      (
        <div
          style={{
            width: W, height: H,
            background: PAPER,
            display: "flex", flexDirection: "column",
            fontFamily: "DMSans",
            position: "relative",
          }}
        >
          {/* Linha topo vermelha */}
          <div style={{ height: 5, background: RED, width: "100%", flexShrink: 0 }} />

          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: "60px 72px",
            justifyContent: "space-between",
          }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                fontFamily: "Playfair", fontSize: 20, fontWeight: 900,
                color: INK,
                display: "flex",
              }}>
                Anamnesis<span style={{ color: RED }}>Med</span>
              </div>
              <div style={{
                fontFamily: "DMSans", fontSize: 11, color: MUTED,
                letterSpacing: "2px", textTransform: "uppercase",
              }}>
                {kw}
              </div>
            </div>

            {/* Texto grande com destaque */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 0,
            }}>
              <div style={{
                fontFamily: "Playfair", fontSize: 64, fontWeight: 900,
                color: INK, lineHeight: 1.08, letterSpacing: "-1.5px",
              }}>
                {accent
                  ? words.map((word, i) => (
                      <span key={i}>
                        {word.toLowerCase() === accent.toLowerCase()
                          ? <span style={{ color: RED }}>{word}</span>
                          : word}
                        {i < words.length - 1 ? " " : ""}
                      </span>
                    ))
                  : text
                }
              </div>
            </div>

            {/* Footer */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{
                fontFamily: "DMSans", fontSize: 13, color: MUTED,
              }}>
                anamnesismed.com
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === num - 1 ? 20 : 6,
                      height: 6, borderRadius: 3,
                      background: i === num - 1 ? RED : CREAM,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      { width: W, height: H, fonts }
    );
  }

  // ── SLIDE CTA ───────────────────────────────────────────────────────────────
  return new ImageResponse(
    (
      <div
        style={{
          width: W, height: H,
          background: INK,
          display: "flex", flexDirection: "column",
          fontFamily: "DMSans",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Barra vermelha topo */}
        <div style={{ height: 5, background: RED, width: "100%", flexShrink: 0 }} />

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          padding: "60px 72px",
          justifyContent: "space-between",
        }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{
              fontFamily: "Playfair", fontSize: 20, fontWeight: 900,
              color: WHITE,
              display: "flex",
            }}>
              Anamnesis<span style={{ color: RED }}>Med</span>
            </div>
            <div style={{
              fontFamily: "DMSans", fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "2px", textTransform: "uppercase",
            }}>
              {kw}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <div style={{
              fontFamily: "Playfair", fontSize: 56, fontWeight: 900,
              color: WHITE, lineHeight: 1.1, letterSpacing: "-1.5px",
              fontStyle: "italic",
            }}>
              {text}
            </div>

            {/* Botão / badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{
                background: RED, color: WHITE,
                fontFamily: "DMSans", fontSize: 15, fontWeight: 400,
                padding: "14px 32px", borderRadius: 8,
                letterSpacing: "0.3px",
              }}>
                Experimente grátis
              </div>
              <div style={{
                fontFamily: "DMSans", fontSize: 14,
                color: "rgba(255,255,255,0.45)",
              }}>
                anamnesismed.com
              </div>
            </div>
          </div>

          {/* Footer dots */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{
              fontFamily: "DMSans", fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "1px", textTransform: "uppercase",
            }}>
              @anamnesismed
            </div>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === num - 1 ? 20 : 6,
                    height: 6, borderRadius: 3,
                    background: i === num - 1 ? RED : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H, fonts }
  );
}
