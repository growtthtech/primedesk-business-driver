"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { maskEmail } from "../../lib/phone";

// Only allow internal workspace destinations. Anything else falls back.
const SAFE_NEXT = new Set(["/start", "/business-profile", "/map", "/plan", "/drive", "/profile", "/dashboard"]);
function safeNext(v: string | null): string | null {
  if (!v) return null;
  if (!v.startsWith("/") || v.startsWith("//") || v.includes("?") || v.includes("#")) return null;
  const base = v.split("?")[0];
  return SAFE_NEXT.has(base) ? base : null;
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = safeNext(search.get("next"));
  const [input, setInput] = useState("");
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function afterAuth() {
    if (next && next !== "/business-profile") {
      // Return visitors to the feature they asked for; the page itself
      // redirects to setup when the agency profile is incomplete.
      router.push(next);
      return;
    }
    try {
      const r = await fetch("/api/business");
      if (r.ok) {
        const j = await r.json();
        router.push(j.ok && j.business ? (next || "/dashboard") : "/business-profile");
        return;
      }
    } catch {}
    router.push(next || "/business-profile");
  }

  async function send() {
    const v = input.trim();
    if (!v) { setMsg("Enter your email."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { setMsg("That email doesn't look right. Check it and retry."); return; }
    setBusy(true); setMsg("Sending your code...");
    try {
      const res = await authClient.emailOtp.sendVerificationOtp({ email: v, type: "sign-in" });
      if (res.error) { setMsg("We couldn't send your code. Check the email and try again."); return; }
      setTarget(v);
      setMsg(`We sent a code to ${maskEmail(v)}.`);
      setSent(true);
      setCooldown(30);
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    if (code.trim().length < 6) { setMsg("Enter the 6-digit code."); return; }
    setBusy(true); setMsg("Checking...");
    try {
      const res = await authClient.signIn.emailOtp({ email: target, otp: code.trim() });
      if (res.error) { setMsg("That code didn't work. Check it and retry, or resend a fresh one."); return; }
      setMsg("Welcome! Opening your workspace...");
      await afterAuth();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fade-in">
      <div className="card" style={{ textAlign: "center", padding: "28px 20px", background: "#F2F6FB" }}>
        <p style={{ fontSize: 40, margin: 0 }}>🧭</p>
        <h1 style={{ fontSize: 24, color: "#1A3A5C", margin: "8px 0 4px" }}>Start free</h1>
        <p style={{ margin: 0, color: "#1A3A5C" }}>Map your agency. Fix what&apos;s broken. Choose tools with confidence.</p>
        <p className="hint">No passwords — we send you a code.</p>
      </div>

      <div className="card">
        {!sent ? (
          <>
            <label htmlFor="login-id">Email<br />
              <input id="login-id" className="field" value={input} onChange={(e) => setInput(e.target.value)} placeholder="you@youragency.com" inputMode="email" autoComplete="email" />
            </label>
            <div style={{ height: 12 }} />
            <button className="btn-action" disabled={busy} onClick={send}>{busy ? "Sending..." : "Continue →"}</button>
          </>
        ) : (
          <>
            <h2>Enter your verification code</h2>
            <p className="hint">We sent a code to <b>{maskEmail(target)}</b> <button onClick={() => { setSent(false); setCode(""); setMsg(""); }} style={{ border: 0, background: "none", color: "#1A56DB", cursor: "pointer", fontSize: 13 }}>(change)</button></p>
            <p className="hint" style={{ fontSize: 13 }}>Can&apos;t find it? Check spam or promotions, then mark it “Not spam” so the next code lands in your inbox.</p>
            <label htmlFor="login-code">6-digit code<br />
              <input id="login-code" className="field" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="• • • • • •" inputMode="numeric" autoComplete="one-time-code" maxLength={6} style={{ letterSpacing: 6, textAlign: "center", fontSize: 22, fontWeight: 800 }} />
            </label>
            <div style={{ height: 12 }} />
            <button className="btn-primary" disabled={busy} onClick={verify}>{busy ? "Checking..." : "Verify & continue →"}</button>
            <button className="btn-ghost" style={{ marginTop: 8, border: 0, background: "transparent" }} disabled={busy || cooldown > 0} onClick={send}>
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>
          </>
        )}
        {msg && <p className="hint" role="status" aria-live="polite" style={{ marginTop: 10 }}>{msg}</p>}
        <Link href="/" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>← Back home</Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="card"><p className="hint">Loading login...</p></div>}>
      <LoginForm />
    </Suspense>
  );
}
