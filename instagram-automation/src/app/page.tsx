export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 16,
      color: "#0a0c10",
    }}>
      <div style={{
        fontFamily: "Georgia, serif",
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: "-0.5px",
      }}>
        Anamnesis<span style={{ color: "#c0392b" }}>Med</span>
      </div>
      <p style={{ fontSize: 14, color: "#6b6660", margin: 0 }}>
        Sistema de publicação automática — @anamnesismed
      </p>
    </main>
  );
}
