import "./globals.css";
import Link from "next/link";
import type { Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import PwaRegister from "../components/PwaRegister";
import SiteNav from "../components/SiteNav";

// Sora = main headlines (600 semibold subheads, 700 bold, 800 extrabold hero)
// Inter = everything else (400 body, 500 hints, 600 labels, 700 buttons, 800 badges)
const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export const metadata = {
  title: "PrimeDesk — Drive Your Agency Towards Its Next Level",
  description: "PrimeDesk helps digital marketing agencies understand their processes and choose the right digital tools. Understand First. Recommend Second.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent" as const, title: "PrimeDesk" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, "/icons/icon-192-v2.png"], apple: "/icons/apple-touch-icon-v2.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B1D33" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-inter), Arial, sans-serif" }}>
        <SiteNav />

        <div style={{ maxWidth: 520, margin: "0 auto", padding: 16, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <main style={{ flex: 1 }}>{children}</main>
        </div>
        <footer style={{ background: "#0B1D33", color: "#B9C6D8" }}>
          <div style={{ maxWidth: 1024, margin: "0 auto", padding: "32px 16px 20px" }}>
            <p style={{ margin: "0 0 4px", fontWeight: 800, color: "#fff", fontSize: 16 }}>
              <span style={{ color: "#E8590C" }}>●</span> PrimeDesk
            </p>
            <p style={{ margin: "0 0 20px", fontSize: 13 }}>Your Agency. Your Destination. A Clearer Route.</p>
            <nav aria-label="Footer" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, fontSize: 14 }}>
              <div>
                <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#fff", fontSize: 12 }}>EXPLORE</p>
                <p style={{ margin: "0 0 6px" }}><Link href="/" style={{ color: "#B9C6D8", textDecoration: "none" }}>Home</Link></p>
                <p style={{ margin: "0 0 6px" }}><Link href="/how-it-works" style={{ color: "#B9C6D8", textDecoration: "none" }}>How It Works</Link></p>
                <p style={{ margin: "0 0 6px" }}><Link href="/agency-processes" style={{ color: "#B9C6D8", textDecoration: "none" }}>Agency Processes</Link></p>
                <p style={{ margin: 0 }}><Link href="/digital-stack" style={{ color: "#B9C6D8", textDecoration: "none" }}>Digital Stack</Link></p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#fff", fontSize: 12 }}>WORKSPACE</p>
                <p style={{ margin: "0 0 6px" }}><Link href="/map" style={{ color: "#B9C6D8", textDecoration: "none" }}>My Map</Link></p>
                <p style={{ margin: "0 0 6px" }}><Link href="/plan" style={{ color: "#B9C6D8", textDecoration: "none" }}>My Plan</Link></p>
                <p style={{ margin: 0 }}><Link href="/drive" style={{ color: "#B9C6D8", textDecoration: "none" }}>My Drive</Link></p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#fff", fontSize: 12 }}>ACCOUNT</p>
                <p style={{ margin: "0 0 6px" }}><Link href="/about" style={{ color: "#B9C6D8", textDecoration: "none" }}>About</Link></p>
                <p style={{ margin: "0 0 6px" }}><Link href="/login" style={{ color: "#B9C6D8", textDecoration: "none" }}>Log in</Link></p>
                <p style={{ margin: 0 }}><Link href="/start" style={{ color: "#E8B62A", textDecoration: "none", fontWeight: 700 }}>Start Free</Link></p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link href="/start" aria-label="Start your journey today" style={{ display: "inline-block", textDecoration: "none" }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-hidden="true">
                    <defs>
                      <path id="journey-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" fill="none" />
                    </defs>
                    <g className="spin-slow">
                      <text fontSize="11.5" fontWeight="800" letterSpacing="2" fill="#E8B62A">
                        <textPath href="#journey-circle" textLength="274" lengthAdjust="spacingAndGlyphs">
                          START YOUR JOURNEY TODAY •
                        </textPath>
                      </text>
                    </g>
                    <circle cx="60" cy="60" r="22" fill="#E8590C" />
                    <path d="M52 60 h16 M62 54 l6 6 -6 6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </nav>
            <p style={{ margin: "20px 0 0", paddingTop: 16, borderTop: "1px solid #3A5068", fontSize: 12, color: "#8FA0B8" }}>
              Understand First. Recommend Second.
            </p>
            <PwaRegister />
          </div>
        </footer>
      </body>
    </html>
  );
}
