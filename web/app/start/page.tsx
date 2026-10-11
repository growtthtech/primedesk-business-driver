"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import { authClient } from "../../lib/auth-client";
import { maskEmail } from "../../lib/phone";
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
  // New-account signup (login is closed to registered emails only).
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [signupMsg, setSignupMsg] = useState("");
  const [signupBusy, setSignupBusy] = useState(false);

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

  async function sendSignupCode() {
    const v = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { setSignupMsg("Enter a valid email."); return; }
    setSignupBusy(true); setSignupMsg("Sending your code...");
    try {
      const chk = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v }),
      }).then((r) => r.json()).catch(() => null);
      if (!chk) { setSignupMsg("No connection. Check your internet and retry."); return; }
      if (chk.ok && chk.exists) { setSignupMsg("This email already has an account. Log in instead."); return; }
      // New email: sign-in OTP auto-registers the account (login stays
      // closed to unknown emails — registration happens only here).
      const res = await authClient.emailOtp.sendVerificationOtp({ email: v, type: "sign-in" });
      if (res.error) { setSignupMsg("We couldn't send your code. Check the email and try again."); return; }
      setCodeSent(true);
      setSignupMsg(`We sent a code to ${maskEmail(v)}.`);
    } finally {
      setSignupBusy(false);
    }
  }

  async function verifySignupCode() {
    const v = email.trim().toLowerCase();
    if (code.trim().length < 6) { setSignupMsg("Enter the 6-digit code."); return; }
    setSignupBusy(true); setSignupMsg("Checking...");
    try {
      const res = await authClient.signIn.emailOtp({ email: v, otp: code.trim() });
      if (res.error) { setSignupMsg("That code didn't work. Check it and retry, or resend a fresh one."); return; }
      router.push("/business-profile");
    } finally {
      setSignupBusy(false);
    }
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
        {!codeSent ? (
          <>
            <label htmlFor="start-email">Email<br />
              <input id="start-email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@youragency.com" inputMode="email" autoComplete="email" />
            </label>
            <div style={{ height: 12 }} />
            <button className="btn-action" style={{ width: "100%" }} disabled={signupBusy} onClick={sendSignupCode}>
              {signupBusy ? "Sending..." : "Create my account →"}
            </button>
          </>
        ) : (
          <>
            <h2 style={{ margin: "0 0 4px" }}>Check your inbox</h2>
            <p className="hint">We sent a code to <b>{maskEmail(email.trim().toLowerCase())}</b> <button onClick={() => { setCodeSent(false); setCode(""); setSignupMsg(""); }} style={{ border: 0, background: "none", color: "#1A56DB", cursor: "pointer", fontSize: 13 }}>(change)</button></p>
            <p className="hint" style={{ fontSize: 13 }}>Can&apos;t find it? Check spam or promotions.</p>
            <label htmlFor="start-code">6-digit code<br />
              <input id="start-code" className="field" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="• • • • • •" inputMode="numeric" autoComplete="one-time-code" maxLength={6} style={{ letterSpacing: 6, textAlign: "center", fontSize: 22, fontWeight: 800 }} />
            </label>
            <div style={{ height: 12 }} />
            <button className="btn-primary" style={{ width: "100%" }} disabled={signupBusy} onClick={verifySignupCode}>
              {signupBusy ? "Checking..." : "Verify & continue →"}
            </button>
          </>
        )}
        {signupMsg && <p className="hint" role="status" aria-live="polite" style={{ marginTop: 10 }}>{signupMsg}</p>}
        <p className="hint" style={{ textAlign: "center", margin: "10px 0 0" }}>
          Have an account? <Link href="/login?next=%2Fbusiness-profile" style={{ color: "#1A56DB" }}>Log in</Link>
          {" • "}<Link href="/how-it-works" style={{ color: "#1A56DB" }}>How it works</Link>
        </p>
      </div>
    </div>
  );
}
