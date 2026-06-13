import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// ─── Dimensões (4:5 retrato, padrão atual do feed/grade do Instagram) ────────
// 4:5 evita o corte lateral que o IG aplica em imagens 1:1 e ocupa mais tela.
const W = 1080;
const H = 1350;

// ─── Grid de respiro (margens generosas, sensação editorial premium) ─────────
const PAD = 88; // padding horizontal base (~72–96px conforme briefing)

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

// ─── Componentes de marca reutilizáveis (consistência entre todos os slides) ──
// IMPORTANTE Satori: todo container com >1 filho usa display:"flex" explícito.

// Wordmark do topo: selo discreto "AnamnesísMed" + rótulo da edição.
// `dark` controla se o fundo é escuro (texto claro) ou claro (texto INK).
function BrandHeader({ dark, right }: { dark: boolean; right: string }) {
  const fg     = dark ? WHITE : INK;
  const subtle = dark ? "rgba(255,255,255,0.45)" : MUTED;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      {/* Selo/wordmark: ponto vermelho + nome */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", width: 9, height: 9, borderRadius: 5, background: RED }} />
        <div style={{
          display: "flex", fontFamily: "Playfair", fontSize: 23, fontWeight: 900,
          color: fg, letterSpacing: "-0.4px",
        }}>
          Anamnesís<span style={{ color: RED, display: "flex" }}>Med</span>
        </div>
      </div>
      {/* Rótulo à direita (edição / keyword) em caixa-alta com tracking forte */}
      <div style={{
        display: "flex", fontFamily: "DMSans", fontSize: 12, fontWeight: 700,
        color: subtle, letterSpacing: "4px", textTransform: "uppercase",
      }}>
        {right}
      </div>
    </div>
  );
}

// Rodapé de assinatura: handle @anamnesismed + indicador de página "NN / TT".
// Sem indicador na capa (passar showPage=false).
function BrandFooter({
  dark, num, total, showPage, handle,
}: { dark: boolean; num: number; total: number; showPage: boolean; handle: string }) {
  const handleColor = dark ? "rgba(255,255,255,0.5)" : MUTED;
  const inactive    = dark ? "rgba(255,255,255,0.18)" : CREAM;
  const pageNum     = String(num).padStart(2, "0");
  const pageTot     = String(total).padStart(2, "0");
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{
        display: "flex", fontFamily: "DMSans", fontSize: 13, fontWeight: 700,
        color: handleColor, letterSpacing: "1.5px", textTransform: "uppercase",
      }}>
        {handle}
      </div>
      {showPage && (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Dots de progressão */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                display: "flex",
                width: i === num - 1 ? 22 : 7, height: 7, borderRadius: 4,
                background: i === num - 1 ? RED : inactive,
              }} />
            ))}
          </div>
          {/* Contador numérico NN / TT */}
          <div style={{
            display: "flex", fontFamily: "DMSans", fontSize: 13, fontWeight: 700,
            color: handleColor, letterSpacing: "1px",
          }}>
            {`${pageNum} / ${pageTot}`}
          </div>
        </div>
      )}
    </div>
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
  const handle = searchParams.get("handle") ?? "@anamnesismed";
  const followLabel = searchParams.get("follow") ?? `Siga ${handle}`;

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
  // Gancho forte: keyword sobreposta gigante (watermark), título Playfair grande,
  // pílula "ARRASTE >" clara e alto contraste sobre fundo INK.
  if (slide === "cover") {
    return new ImageResponse(
      (
        <div
          style={{
            width: W, height: H,
            display: "flex", flexDirection: "column",
            fontFamily: "DMSans",
            position: "relative",
            overflow: "hidden",
            // Gradiente sutil para dar profundidade ao fundo escuro
            backgroundImage: `radial-gradient(circle at 78% 18%, #16191f 0%, ${INK} 55%)`,
            backgroundColor: INK,
          }}
        >
          {/* Watermark gigante da keyword (profundidade tipográfica) */}
          <div style={{
            position: "absolute", bottom: -88, right: -40,
            display: "flex",
            fontFamily: "Playfair", fontSize: 360, fontWeight: 900,
            color: "rgba(192,57,43,0.13)", letterSpacing: "-12px",
            lineHeight: 1,
          }}>
            {kw ? kw.slice(0, 3).toUpperCase() : "AM"}
          </div>

          {/* Vinheta leve no rodapé para assentar o conteúdo */}
          <div style={{
            position: "absolute", left: 0, bottom: 0, width: W, height: 360,
            display: "flex",
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))`,
          }} />

          {/* Barra decorativa topo */}
          <div style={{ display: "flex", height: 7, background: RED, width: "100%", flexShrink: 0 }} />

          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: `72px ${PAD}px`,
            justifyContent: "space-between",
            position: "relative",
          }}>
            {/* Header — marca + edição */}
            <BrandHeader dark={true} right={`Edição #${ed}`} />

            {/* Título grande */}
            <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
              {/* Keyword com traço (rótulo de seção) */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", width: 52, height: 4, background: RED }} />
                <div style={{
                  display: "flex",
                  fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                  color: RED, letterSpacing: "5px", textTransform: "uppercase",
                }}>
                  {kw}
                </div>
              </div>
              {/* Título principal — Playfair grande, leading apertado, alto contraste.
                  É um único texto multilinha => div block SEM display:flex. */}
              <div style={{
                fontFamily: "Playfair", fontSize: 86, fontWeight: 900,
                color: WHITE, lineHeight: 1.03, letterSpacing: "-2.8px",
              }}>
                {title}
              </div>
            </div>

            {/* Footer — pílula ARRASTE + dots de progressão */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 11,
                background: RED, padding: "15px 28px", borderRadius: 100,
              }}>
                <div style={{
                  display: "flex",
                  fontFamily: "DMSans", fontSize: 15, fontWeight: 700,
                  color: WHITE, letterSpacing: "2px", textTransform: "uppercase",
                }}>
                  Arraste
                </div>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 20, fontWeight: 700,
                  color: WHITE, marginTop: -2,
                }}>
                  {">"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} style={{
                    display: "flex",
                    width: i === 0 ? 24 : 7, height: 7, borderRadius: 4,
                    background: i === 0 ? RED : "rgba(255,255,255,0.22)",
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
  // Texto editorial grande com palavra de destaque em vermelho, número gigante de
  // fundo, barra lateral de acento. Header/footer de marca consistentes.
  if (slide === "insight") {
    const words = text.split(" ");
    const idx   = String(Math.max(1, num - 1)).padStart(2, "0");

    return new ImageResponse(
      (
        <div
          style={{
            width: W, height: H,
            display: "flex", flexDirection: "column",
            fontFamily: "DMSans",
            position: "relative",
            overflow: "hidden",
            // Gradiente papel sutil (profundidade no fundo claro)
            backgroundImage: `linear-gradient(160deg, ${PAPER} 0%, ${CREAM} 100%)`,
            backgroundColor: PAPER,
          }}
        >
          {/* Número gigante de fundo (índice do insight) */}
          <div style={{
            position: "absolute", top: -70, right: 36,
            display: "flex",
            fontFamily: "Playfair", fontSize: 340, fontWeight: 900,
            color: "rgba(192,57,43,0.08)", lineHeight: 1, letterSpacing: "-6px",
          }}>
            {idx}
          </div>
          {/* Barra lateral de acento */}
          <div style={{ position: "absolute", top: 0, left: 0, display: "flex", width: 12, height: H, background: RED }} />
          {/* Linha topo vermelha */}
          <div style={{ display: "flex", height: 6, background: RED, width: "100%", flexShrink: 0 }} />

          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: `72px ${PAD}px 72px ${PAD + 16}px`,
            justifyContent: "space-between",
            position: "relative",
          }}>
            {/* Header — marca + keyword */}
            <BrandHeader dark={false} right={kw} />

            {/* Chip de índice + texto grande com destaque palavra-a-palavra */}
            <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  display: "flex", background: RED, color: WHITE,
                  fontFamily: "DMSans", fontSize: 15, fontWeight: 700,
                  letterSpacing: "1px", padding: "7px 16px", borderRadius: 6,
                }}>
                  {idx}
                </div>
                <div style={{ display: "flex", width: 72, height: 2, background: "rgba(10,12,16,0.14)" }} />
              </div>
              {/* Texto editorial: container flex-wrap, cada palavra um span flex.
                  Palavra de destaque vira vermelha. */}
              <div style={{
                display: "flex", flexWrap: "wrap",
                fontFamily: "Playfair", fontSize: 66, fontWeight: 900,
                lineHeight: 1.08, letterSpacing: "-1.8px",
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

            {/* Footer — assinatura + indicador de página */}
            <BrandFooter dark={false} num={num} total={total} showPage={true} handle={handle} />
          </div>
        </div>
      ),
      { width: W, height: H, fonts }
    );
  }

  // ── SLIDE CTA ───────────────────────────────────────────────────────────────
  // Fechamento: frase em itálico Playfair, pílulas de engajamento, CTA de seguir
  // com alto contraste. Header/footer de marca consistentes.
  return new ImageResponse(
    (
      <div
        style={{
          width: W, height: H,
          display: "flex", flexDirection: "column",
          fontFamily: "DMSans",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `radial-gradient(circle at 22% 82%, #16191f 0%, ${INK} 58%)`,
          backgroundColor: INK,
        }}
      >
        {/* Watermark discreto "AM" para profundidade */}
        <div style={{
          position: "absolute", top: -70, left: -30,
          display: "flex",
          fontFamily: "Playfair", fontSize: 320, fontWeight: 900,
          color: "rgba(255,255,255,0.04)", letterSpacing: "-10px", lineHeight: 1,
        }}>
          AM
        </div>

        {/* Barra vermelha topo */}
        <div style={{ display: "flex", height: 6, background: RED, width: "100%", flexShrink: 0 }} />

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          padding: `72px ${PAD}px`,
          justifyContent: "space-between",
          position: "relative",
        }}>

          {/* Header — marca + keyword */}
          <BrandHeader dark={true} right={kw} />

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {/* Frase de fechamento — texto multilinha único => div block SEM flex */}
            <div style={{
              fontFamily: "Playfair", fontSize: 60, fontWeight: 900,
              color: WHITE, lineHeight: 1.08, letterSpacing: "-1.8px",
              fontStyle: "italic",
            }}>
              {text}
            </div>

            {/* Engajamento + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {["Salvar", "Compartilhar", "Marque um colega"].map((label, i) => (
                  <div key={i} style={{
                    display: "flex", fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                    color: "rgba(255,255,255,0.92)", letterSpacing: "1.5px", textTransform: "uppercase",
                    border: "1.5px solid rgba(255,255,255,0.28)", padding: "12px 24px", borderRadius: 100,
                  }}>
                    {label}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  display: "flex", background: RED, color: WHITE,
                  fontFamily: "DMSans", fontSize: 17, fontWeight: 700,
                  padding: "16px 32px", borderRadius: 8, letterSpacing: "0.3px",
                }}>
                  {followLabel}
                </div>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 14,
                  color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px",
                }}>
                  Link na bio
                </div>
              </div>
            </div>
          </div>

          {/* Footer — assinatura + indicador de página */}
          <BrandFooter dark={true} num={num} total={total} showPage={true} handle={handle} />
        </div>
      </div>
    ),
    { width: W, height: H, fonts }
  );
}
