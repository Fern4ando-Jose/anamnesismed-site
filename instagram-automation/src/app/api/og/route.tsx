import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// ─── Dimensões (4:5 retrato, padrão do feed/grade do Instagram) ───────────────
const W = 1080;
const H = 1350;
const PAD = 92; // margem base — respiro generoso (look infográfico limpo)

// ─── Paleta de MARCA (alinhada ao site: teal + coral sobre navy) ──────────────
const TEAL    = "#0FA3B1"; // primary
const TEAL_DK = "#0B7C88"; // primary-dark — fundo sólido da marca
const INK     = "#0A1A24"; // navy
const CORAL   = "#FF5C49"; // accent
const WHITE   = "#ffffff";
const SOFT    = "rgba(255,255,255,0.74)"; // texto secundário sobre teal
const FAINT   = "rgba(255,255,255,0.16)"; // elementos sutis

const pad2 = (n: number) => String(n).padStart(2, "0");

// ─── Fontes (DM Sans — sans limpa, look infográfico) ──────────────────────────

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  }).then(r => r.text());
  const src = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!src) throw new Error(`Font URL not found for ${family}:${weight}`);
  return fetch(src).then(r => r.arrayBuffer());
}

// ─── Componentes de marca (consistência entre todos os slides) ────────────────
// Satori: todo container com >1 filho usa display:"flex" explícito.

// Wordmark do topo + rótulo à direita (especialidade/edição).
function BrandHeader({ right }: { right: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", width: 10, height: 10, borderRadius: 5, background: CORAL }} />
        <div style={{
          display: "flex", fontFamily: "DMSans", fontSize: 25, fontWeight: 800,
          color: WHITE, letterSpacing: "-0.3px",
        }}>
          Anamnesís<span style={{ color: CORAL, display: "flex" }}>Med</span>
        </div>
      </div>
      <div style={{
        display: "flex", fontFamily: "DMSans", fontSize: 13, fontWeight: 700,
        color: SOFT, letterSpacing: "3px", textTransform: "uppercase",
      }}>
        {right}
      </div>
    </div>
  );
}

// Rodapé: handle + indicador de página (dots + NN/TT).
function BrandFooter({ num, total, showPage, handle }: { num: number; total: number; showPage: boolean; handle: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{
        display: "flex", fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
        color: SOFT, letterSpacing: "1.5px", textTransform: "uppercase",
      }}>
        {handle}
      </div>
      {showPage && (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                display: "flex",
                width: i === num - 1 ? 22 : 7, height: 7, borderRadius: 4,
                background: i === num - 1 ? CORAL : FAINT,
              }} />
            ))}
          </div>
          <div style={{
            display: "flex", fontFamily: "DMSans", fontSize: 13, fontWeight: 700,
            color: SOFT, letterSpacing: "1px",
          }}>
            {`${pad2(num)} / ${pad2(total)}`}
          </div>
        </div>
      )}
    </div>
  );
}

// Kicker: quadradinho coral + rótulo em caixa-alta (especialidade/seção).
function Kicker({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", width: 30, height: 5, borderRadius: 3, background: CORAL }} />
      <div style={{
        display: "flex", fontFamily: "DMSans", fontSize: 18, fontWeight: 700,
        color: CORAL, letterSpacing: "4px", textTransform: "uppercase",
      }}>
        {label}
      </div>
    </div>
  );
}

// Fundo sólido de marca com leve profundidade (radial teal claro -> teal escuro).
const bgStyle = {
  width: W, height: H,
  display: "flex", flexDirection: "column" as const,
  fontFamily: "DMSans",
  position: "relative" as const,
  overflow: "hidden",
  backgroundColor: TEAL_DK,
  backgroundImage: `radial-gradient(circle at 84% 10%, ${TEAL} 0%, ${TEAL_DK} 58%)`,
};

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
  const kicker = searchParams.get("kicker") ?? kw; // rótulo da capa (futuro: tipo do post)
  const followLabel = searchParams.get("follow") ?? `Siga ${handle}`;
  const badges = (searchParams.get("badges") ?? "Salvar,Compartilhar,Marque um colega")
    .split(",").filter(Boolean);
  const bioLabel = searchParams.get("bio") ?? "Link na bio";
  const img    = searchParams.get("img") ?? ""; // ilustração (capa)

  const [b8, b7, r4] = await Promise.all([
    loadGoogleFont("DM Sans", 800),
    loadGoogleFont("DM Sans", 700),
    loadGoogleFont("DM Sans", 400),
  ]);
  const fonts = [
    { name: "DMSans", data: b8, weight: 800 as const, style: "normal" as const },
    { name: "DMSans", data: b7, weight: 700 as const, style: "normal" as const },
    { name: "DMSans", data: r4, weight: 400 as const, style: "normal" as const },
  ];

  // ── SLIDE CAPA ──────────────────────────────────────────────────────────────
  if (slide === "cover") {
    return new ImageResponse(
      (
        <div style={bgStyle}>
          {/* Ilustração full-bleed + scrim (quando ?img= vem). Sem img = fundo teal. */}
          {img ? (
            <>
              <img src={img} width={W} height={H}
                style={{ position: "absolute", top: 0, left: 0, width: W, height: H, objectFit: "cover" }} />
              <div style={{
                position: "absolute", top: 0, left: 0, width: W, height: H, display: "flex",
                backgroundImage: "linear-gradient(180deg, rgba(8,22,30,0.55) 0%, rgba(8,22,30,0.12) 38%, rgba(8,22,30,0.92) 100%)",
              }} />
            </>
          ) : null}
          {/* Barra de acento no topo */}
          <div style={{ display: "flex", height: 8, background: CORAL, width: "100%", flexShrink: 0, position: "relative" }} />
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: `80px ${PAD}px`, justifyContent: "space-between",
            position: "relative",
          }}>
            <BrandHeader right={`Edição #${ed}`} />

            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              <Kicker label={kicker} />
              {/* Título — texto multilinha único => div block SEM display:flex */}
              <div style={{
                fontFamily: "DMSans", fontSize: 78, fontWeight: 800,
                color: WHITE, lineHeight: 1.07, letterSpacing: "-2px",
              }}>
                {title}
              </div>
            </div>

            {/* Pílula ARRASTE + dots */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 11,
                background: CORAL, padding: "15px 28px", borderRadius: 100,
              }}>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 15, fontWeight: 700,
                  color: WHITE, letterSpacing: "2px", textTransform: "uppercase",
                }}>
                  Arraste
                </div>
                <div style={{ display: "flex", fontFamily: "DMSans", fontSize: 20, fontWeight: 800, color: WHITE, marginTop: -2 }}>
                  {">"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} style={{
                    display: "flex",
                    width: i === 0 ? 24 : 7, height: 7, borderRadius: 4,
                    background: i === 0 ? CORAL : FAINT,
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
    const step  = String(Math.max(1, num - 1)).padStart(2, "0");
    return new ImageResponse(
      (
        <div style={bgStyle}>
          <div style={{ display: "flex", height: 8, background: CORAL, width: "100%", flexShrink: 0 }} />
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            padding: `80px ${PAD}px`, justifyContent: "space-between",
            position: "relative",
          }}>
            <BrandHeader right={kw} />

            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              {/* Número do passo — grande, coral */}
              <div style={{
                display: "flex", fontFamily: "DMSans", fontSize: 120, fontWeight: 800,
                color: CORAL, lineHeight: 1, letterSpacing: "-4px",
              }}>
                {step}
              </div>
              {/* Texto: flex-wrap, cada palavra um span; destaque em coral */}
              <div style={{
                display: "flex", flexWrap: "wrap",
                fontFamily: "DMSans", fontSize: 60, fontWeight: 800,
                lineHeight: 1.14, letterSpacing: "-1px",
              }}>
                {words.map((word, i) => (
                  <span key={i} style={{
                    display: "flex", marginRight: "0.26em",
                    color: accent && word.toLowerCase().includes(accent.toLowerCase()) ? CORAL : WHITE,
                  }}>
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <BrandFooter num={num} total={total} showPage={true} handle={handle} />
          </div>
        </div>
      ),
      { width: W, height: H, fonts }
    );
  }

  // ── SLIDE CTA / REVELAÇÃO ─────────────────────────────────────────────────────
  return new ImageResponse(
    (
      <div style={bgStyle}>
        <div style={{ display: "flex", height: 8, background: CORAL, width: "100%", flexShrink: 0 }} />
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          padding: `80px ${PAD}px`, justifyContent: "space-between",
        }}>
          <BrandHeader right={kw} />

          <div style={{ display: "flex", flexDirection: "column", gap: 46 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Kicker label="Resposta" />
              {/* Frase de fechamento/revelação — texto único => div block SEM flex */}
              <div style={{
                fontFamily: "DMSans", fontSize: 64, fontWeight: 800,
                color: WHITE, lineHeight: 1.1, letterSpacing: "-1.6px",
              }}>
                {text}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                {badges.map((label, i) => (
                  <div key={i} style={{
                    display: "flex", fontFamily: "DMSans", fontSize: 14, fontWeight: 700,
                    color: WHITE, letterSpacing: "1.2px", textTransform: "uppercase",
                    border: "1.5px solid rgba(255,255,255,0.4)", padding: "12px 22px", borderRadius: 100,
                  }}>
                    {label}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  display: "flex", background: CORAL, color: WHITE,
                  fontFamily: "DMSans", fontSize: 18, fontWeight: 700,
                  padding: "16px 32px", borderRadius: 8, letterSpacing: "0.2px",
                }}>
                  {followLabel}
                </div>
                <div style={{
                  display: "flex", fontFamily: "DMSans", fontSize: 14, fontWeight: 400,
                  color: SOFT, letterSpacing: "0.5px",
                }}>
                  {bioLabel}
                </div>
              </div>
            </div>
          </div>

          <BrandFooter num={num} total={total} showPage={true} handle={handle} />
        </div>
      </div>
    ),
    { width: W, height: H, fonts }
  );
}
