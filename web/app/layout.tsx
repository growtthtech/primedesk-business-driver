import "./globals.css";
import Link from "next/link";

export const metadata = { title: "PrimeDesk - Business Driver", description: "Process-first guidance for Nigeria SMEs" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: 16, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <header
            style={{
              background: "#F2F6FB",
              border: "1px solid #DDE7F3",
              borderRadius: 16,
              padding: "12px 16px",
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/" style={{ textDecoration: "none", color: "#1A3A5C", fontWeight: 800, fontSize: 18 }}>
              PrimeDesk <span style={{ fontWeight: 400, fontSize: 12, color: "#5B6B80" }}>Business Driver</span>
            </Link>
            <Link href="/start" style={{ background: "#1A56DB", color: "#fff", padding: "8px 14px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
              Start →
            </Link>
          </header>

          <main style={{ flex: 1 }}>{children}</main>

          <footer style={{ textAlign: "center", color: "#7A8699", fontSize: 12, padding: "20px 0 8px" }}>
            Process first • Built for Nigeria SMEs • <Link href="/home" style={{ color: "#1A56DB" }}>My Home</Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
