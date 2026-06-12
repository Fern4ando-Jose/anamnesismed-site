import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// ─── Dimensões (4:5 retrato, padrão atual do feed/grade do Instagram) ────────
// 4:5 evita o corte lateral que o IG aplica em imagens 1:1 e ocupa mais tela.
const W = 1080;
const H = 1350;

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
            background: INK,
            display: "flex", flexDirection: "column",
            fontFamily: "DMSans",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Watermark gigante da keyword */}
          <div style={{
            position: "absolute", bottom: -70, right: -30,
            fontFamily: "Playfair", fontSize: 320, fontWeight: 900,
            color: "rgba(192,57,43,0.12)", letterSpacing: "-10px",
            lineHeight: 1,
          }}>
            {kw ? kw.slice(0, 3) : "AM"}
          </div>

          {/* Barra decorativa topo */}
          <div style={{ height: 6, background: RED, width: "100%", flexShrink: 0 }} />

          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: "64px 72px",
            justifyContent: "space-between",
            position: "relative",
          }}>
            {/* Header — marca */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                fontFamily: "Playfair", fontSize: 24, fontWeight: 900,
                color: WHITE, letterSpacing: "-0.5px", display: "flex",
              }}>
                Anamnesis<span style={{ color: RED }}>Med</span>
              </div>
              <div style={{
                fontFamily: "DMSans", fontSize: 12, color: "rgba(255,255,255,0.4)",
                letterSpacing: "3px", textTransform: "uppercase",
              }}>
                {`Edição #${ed}`}
              </div>
            </div>

            {/* Título grande */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Keyword com traço */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 4, background: RED }} />
                <div style={{
                  fontFamily: "DMSans", fontSize: 13, fontWeight: 700,
                  color: RED, letterSpacing: "4px", textTransform: "uppercase",
                }}>
                  {kw}
                </div>
              </div>
              {/* Título principal */}
              <div style={{
                fontFamily: "Playfair", fontSize: 78, fontWeight: 900,
                color: WHITE, lineHeight: 1.04, letterSpacing: "-2.5px",
              }}>
                {title}
              </div>
            </div>

            {/* Footer — ARRASTE + dots */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: RED, padding: "13px 24px", borderRadius: 100,
              }}>
                <div style={{
                  fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                  color: WHITE, letterSpacing: "1.5px", textTransform: "uppercase",
                }}>
                  Arraste
                </div>
                <div style={{ fontFamily: "DMSans", fontSize: 19, fontWeight: 700, color: WHITE, display: "flex", marginTop: -2 }}>{">"}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} style={{
                    width: i === 0 ? 22 : 7, height: 7, borderRadius: 4,
                    background: i === 0 ? RED : "rgba(255,255,255,0.2)",
                  }} />
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
    const words = text.split(" ");
    const idx   = String(Math.max(1, num - 1)).padStart(2, "0");

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
          {/* Número gigante de fundo */}
          <div style={{
            position: "absolute", top: -54, right: 40,
            fontFamily: "Playfair", fontSize: 300, fontWeight: 900,
            color: "rgba(192,57,43,0.08)", lineHeight: 1,
          }}>
            {idx}
          </div>
          {/* Barra lateral de acento */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 12, height: H, background: RED }} />
          {/* Linha topo vermelha */}
          <div style={{ height: 5, background: RED, width: "100%", flexShrink: 0 }} />

          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: "60px 72px 60px 88px",
            justifyContent: "space-between",
            position: "relative",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                fontFamily: "Playfair", fontSize: 20, fontWeight: 900,
                color: INK, display: "flex",
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

            {/* Chip de índice + texto grande com destaque */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  display: "flex", background: RED, color: WHITE,
                  fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                  letterSpacing: "1px", padding: "6px 14px", borderRadius: 6,
                }}>
                  {idx}
                </div>
                <div style={{ width: 60, height: 2, background: CREAM }} />
              </div>
              <div style={{
                display: "flex", flexWrap: "wrap",
                fontFamily: "Playfair", fontSize: 62, fontWeight: 900,
                lineHeight: 1.1, letterSpacing: "-1.5px",
              }}>
                {words.map((word, i) => (
                  <span
                    key={i}
                    style={{
                      display: "flex",
                      marginRight: "0.26em",
                      color: accent && word.toLowerCase() === accent.toLowerCase() ? RED : INK,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "DMSans", fontSize: 13, color: MUTED }}>
                anamnesismed.com
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === num - 1 ? 22 : 7,
                      height: 7, borderRadius: 4,
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

            {/* Engajamento + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                  color: WHITE, letterSpacing: "1.5px", textTransform: "uppercase",
                  border: "1.5px solid rgba(255,255,255,0.3)", padding: "11px 22px", borderRadius: 100,
                }}>
                  Salvar
                </div>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                  color: WHITE, letterSpacing: "1.5px", textTransform: "uppercase",
                  border: "1.5px solid rgba(255,255,255,0.3)", padding: "11px 22px", borderRadius: 100,
                }}>
                  Compartilhar
                </div>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                  color: WHITE, letterSpacing: "1.5px", textTransform: "uppercase",
                  border: "1.5px solid rgba(255,255,255,0.3)", padding: "11px 22px", borderRadius: 100,
                }}>
                  Marque um colega
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  display: "flex", background: RED, color: WHITE,
                  fontFamily: "DMSans", fontSize: 16, fontWeight: 700,
                  padding: "15px 30px", borderRadius: 8, letterSpacing: "0.3px",
                }}>
                  Siga @anamnesismed
                </div>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                }}>
                  Link da bio
                </div>
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
