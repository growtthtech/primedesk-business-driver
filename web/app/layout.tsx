import "./globals.css";
import Link from "next/link";
import type { Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import PwaRegister from "../components/PwaRegister";

// Sora = main headlines (600 semibold subheads, 700 bold, 800 extrabold hero)
// Inter = everything else (400 body, 500 hints, 600 labels, 700 buttons, 800 badges)
const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export const metadata = {
  title: "PrimeDesk - Business Driver",
  description: "Process-first guidance for Nigeria SMEs",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent" as const, title: "PrimeDesk" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B1D33" };

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/map", label: "My Map" },
  { href: "/plan", label: "My Plan" },
  { href: "/drive", label: "My Drive" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-inter), Arial, sans-serif" }}>
        {/* FULL-WIDTH NAVBAR: logo left, links middle, Login + Start right */}
        <header style={{ background: "#0B1D33", position: "sticky", top: 0, zIndex: 20 }}>
          <div style={{ maxWidth: 1024, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ textDecoration: "none", color: "#fff", fontWeight: 800, whiteSpace: "nowrap" }}>🚗 PrimeDesk</Link>
            <nav className="nav-links" style={{ flex: 1, justifyContent: "center", gap: 20, fontSize: 13 }}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} style={{ color: "#B9C6D8", textDecoration: "none", whiteSpace: "nowrap" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: "auto" }}>
              <Link href="/login" style={{ color: "#fff", border: "1px solid #3A5068", padding: "8px 12px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
                Log in
              </Link>
              <Link href="/start" style={{ background: "#E8590C", color: "#fff", padding: "8px 14px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}>
                Start →
              </Link>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: 520, margin: "0 auto", padding: 16, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <main style={{ flex: 1 }}>{children}</main>
          <footer style={{ textAlign: "center", color: "#7A8699", fontSize: 12, padding: "20px 0 8px" }}>
            Process first • Built for Nigeria SMEs • <Link href="/drive" style={{ color: "#1A56DB" }}>My Drive</Link> • <Link href="/profile" style={{ color: "#1A56DB" }}>Profile</Link>
            <PwaRegister />
          </footer>
        </div>
      </body>
    </html>
  );
}
