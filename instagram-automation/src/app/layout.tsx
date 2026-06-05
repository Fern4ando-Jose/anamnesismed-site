export const metadata = {
  title: "AnamnesísMed — Instagram Automation",
  description: "Sistema de publicação automática do @anamnesismed",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f1e8" }}>
        {children}
      </body>
    </html>
  );
}
