"use client";
import Link from "next/link";
import type { ReactNode } from "react";

// Reusable public preview for private workspace pages (My Map, My Plan,
// My Drive, Digital Stack). Shows fictional sample data only — never fetches
// or displays real agency records. Primary CTA preserves the intended
// destination via a validated ?next= path handled by /login.
export default function WorkspacePreview({
  eyebrow,
  title,
  copy,
  sampleLabel = "Sample preview — fictional demonstration data",
  sample,
  next,
  primaryLabel,
  secondaryHint = "Already have an account?",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  sampleLabel?: string;
  sample: ReactNode;
  next: string;
  primaryLabel: string;
  secondaryHint?: string;
}) {
  const loginHref = `/login?next=${encodeURIComponent(next)}`;
  return (
    <div className="fade-in">
      <div className="card" style={{ textAlign: "center", padding: "28px 20px", background: "#F2F6FB" }}>
        <span className="badge-growth">{eyebrow}</span>
        <h1 style={{ fontSize: 26, color: "#1A3A5C", margin: "10px 0 6px" }}>{title}</h1>
        <p style={{ margin: 0, color: "#1A3A5C", fontSize: 15, lineHeight: 1.6 }}>{copy}</p>
      </div>

      <div className="card" aria-label={sampleLabel}>
        <p className="hint" style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, letterSpacing: 0.4 }}>
          {sampleLabel}
        </p>
        <div aria-hidden="true" style={{ pointerEvents: "none", userSelect: "none" }}>
          {sample}
        </div>
      </div>

      <div className="card card-action" style={{ textAlign: "center" }}>
        <h2 style={{ margin: "0 0 6px" }}>Start with a clearer route.</h2>
        <p style={{ color: "#8A4A1B", margin: "0 0 12px", fontSize: 14 }}>Understand First. Recommend Second.</p>
        <Link href={next === "/start" ? "/start" : loginHref} className="btn-action" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
          {primaryLabel}
        </Link>
        <p className="hint" style={{ margin: "10px 0 0" }}>
          {secondaryHint} <Link href={loginHref} style={{ color: "#1A56DB" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
