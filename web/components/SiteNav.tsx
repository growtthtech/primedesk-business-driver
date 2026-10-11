"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/agency-processes", label: "Agency Processes" },
  { href: "/digital-stack", label: "Digital Stack" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header style={{ background: "#0B1D33", position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#fff", fontWeight: 800, whiteSpace: "nowrap" }} aria-label="PrimeDesk home"><span style={{ color: "#E8590C" }}>●</span> PrimeDesk</Link>
        <nav className="nav-links" aria-label="Primary" style={{ flex: 1, justifyContent: "center", gap: 20, fontSize: 13 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: path === l.href ? "#fff" : "#B9C6D8", textDecoration: "none", whiteSpace: "nowrap", fontWeight: path === l.href ? 800 : 400 }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-links" style={{ gap: 8, alignItems: "center", marginLeft: "auto" }}>
          <Link href="/login" style={{ color: "#fff", border: "1px solid #3A5068", padding: "8px 12px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
            Log in
          </Link>
          <Link href="/start" style={{ background: "#E8590C", color: "#fff", padding: "8px 14px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}>
            Start Free
          </Link>
        </div>
        <button
          className="nav-menu-btn"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{ marginLeft: "auto", background: "transparent", border: "1px solid #3A5068", color: "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 16, cursor: "pointer", minWidth: 48, minHeight: 48 }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" style={{ borderTop: "1px solid #3A5068", padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#fff", textDecoration: "none", padding: "12px 4px", fontSize: 16, borderBottom: "1px solid #1E3A5C" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/login" style={{ color: "#fff", textDecoration: "none", padding: "12px 4px", fontSize: 16, borderBottom: "1px solid #1E3A5C" }}>
            Log in
          </Link>
          <Link href="/start" style={{ background: "#E8590C", color: "#fff", padding: "14px", borderRadius: 12, textDecoration: "none", fontSize: 16, fontWeight: 800, textAlign: "center", marginTop: 8 }}>
            Start Free
          </Link>
        </nav>
      )}
    </header>
  );
}
