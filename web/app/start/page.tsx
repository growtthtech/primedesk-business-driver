"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import { loadState } from "../../lib/store";

// Agency entry point (existing /start route, repositioned).
// Routes each visitor to the right next step instead of running a
// separate onboarding system:
//   logged in + agency profile  -> continue to My Map
//   logged in, no profile       -> agency setup (/business-profile)
//   logged out                  -> create account, return to agency setup
// Legacy on-device progress (started/stages) is preserved and offered
// as a continuation where it exists.
export default function StartPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [legacy, setLegacy] = useState(false);

  useEffect(() => {
    try {
      const s = loadState();
      if (s.started && s.stages.length > 0) setLegacy(true);
    } catch {}
    fetch("/api/business")
      .then((r) => {
        if (r.status === 401) return null;
        return r.json();
      })
      .then((j) => {
        if (!j) return;
        setLoggedIn(true);
        if (j.ok && j.business) setHasBusiness(true);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) return <div className="card"><p className="hint">Finding your route...</p></div>;

  if (loggedIn && hasBusiness) {
    return (
      <div className="fade-in">
        <ProgressBar step={3} />
        <div className="card card-growth" style={{ textAlign: "center" }}>
          <span className="badge-growth">WELCOME BACK</span>
          <h2 style={{ marginBottom: 4 }}>Continue your journey.</h2>
          <p className="hint">Your profile is set. Pick up where you left off.</p>
          <button className="btn-primary" onClick={() => router.push("/map")}>Continue to My Map →</button>
          {legacy && (
            <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => router.push("/map")}>
              Continue previous progress →
            </button>
          )}
          <Link href="/dashboard" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>or open my dashboard</Link>
        </div>
      </div>
    );
  }

  if (loggedIn && !hasBusiness) {
    return (
      <div className="fade-in">
        <ProgressBar step={2} />
        <div className="card">
          <span className="badge-growth">STEP 1 — YOUR STARTING POINT</span>
          <h2 style={{ marginBottom: 4 }}>Tell us about your agency.</h2>
          <p className="hint">Type, size, services, priorities, tools. Only what shapes your route.</p>
          <button className="btn-primary" onClick={() => router.push("/business-profile")}>Set up my agency profile →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <ProgressBar step={1} />
      <div className="card" style={{ textAlign: "center", padding: "28px 20px", background: "#F2F6FB" }}>
        <span className="badge-growth">START FREE</span>
        <h1 style={{ fontSize: 24, color: "#1A3A5C", margin: "10px 0 6px" }}>Know where you are. Find your route.</h1>
        <p className="hint" style={{ fontSize: 15, lineHeight: 1.6 }}>
          Account, agency profile, process map, improvement plan.
        </p>
      </div>
      <div className="card">
        {[
          ["1 — Agency profile", "Create your unique agency profile."],
          ["2 — Map", "How work flows today."],
          ["3 — Plan", "Now, Later, Future."],
          ["4 — Drive", "Your tool decisions."],
        ].map(([t, d]) => (
          <div key={t} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #F2F4F7" }}>
            <b style={{ whiteSpace: "nowrap" }}>{t}</b>
            <span className="hint">{d}</span>
          </div>
        ))}
        <div style={{ height: 12 }} />
        <Link href="/login?next=%2Fbusiness-profile" className="btn-action" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
          Create my account →
        </Link>
        <p className="hint" style={{ textAlign: "center", margin: "10px 0 0" }}>
          Have an account? <Link href="/login?next=%2Fbusiness-profile" style={{ color: "#1A56DB" }}>Log in</Link>
          {" • "}<Link href="/how-it-works" style={{ color: "#1A56DB" }}>How it works</Link>
        </p>
      </div>
    </div>
  );
}
