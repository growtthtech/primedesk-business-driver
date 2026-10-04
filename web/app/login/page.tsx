"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function sendCode() {
    if (!email.includes("@")) { setMsg("Enter a valid email first."); return; }
    setBusy(true); setMsg("Sending your code...");
    const res = await authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" });
    setBusy(false);
    if (res.error) { setMsg("Could not send code. Try again."); return; }
    setSent(true);
    setMsg("Code sent! Check your email (pilot: also printed in the server window).");
  }

  async function verify() {
    if (code.trim().length < 6) { setMsg("Enter the 6-digit code."); return; }
    setBusy(true); setMsg("Checking...");
    const res = await authClient.signIn.emailOtp({ email, otp: code.trim() });
    setBusy(false);
    if (res.error) { setMsg("Wrong or expired code. Request a new one."); return; }
    setMsg("Welcome aboard! Taking you home...");
    setTimeout(() => router.push("/drive"), 600);
  }

  return (
    <div className="fade-in">
      <div className="card" style={{ textAlign: "center", padding: "28px 20px", background: "#F2F6FB" }}>
        <p style={{ fontSize: 40, margin: 0 }}>🚗</p>
        <h1 style={{ fontSize: 24, color: "#1A3A5C", margin: "8px 0 4px" }}>Your Business Uber</h1>
        <p style={{ margin: 0, color: "#1A3A5C" }}>Drive your business to the desired destination with the perfect digital tools.</p>
        <p className="hint">Log in to keep your trip saved across phones.</p>
      </div>

      <div className="card">
        {!sent ? (
          <>
            <label>Your email<br /><input className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.ng" inputMode="email" /></label>
            <div style={{ height: 12 }} />
            <button className="btn-action" disabled={busy} onClick={sendCode}>{busy ? "Sending..." : "⚡ Send my login code"}</button>
          </>
        ) : (
          <>
            <p>Code sent to <b>{email}</b> <button onClick={() => setSent(false)} style={{ border: 0, background: "none", color: "#1A56DB", cursor: "pointer" }}>(change)</button></p>
            <label>6-digit code<br /><input className="field" value={code} onChange={(e) => setCode(e.target.value)} placeholder="• • • • • •" inputMode="numeric" maxLength={6} style={{ letterSpacing: 6, textAlign: "center", fontSize: 22, fontWeight: 800 }} /></label>
            <div style={{ height: 12 }} />
            <button className="btn-primary" disabled={busy} onClick={verify}>{busy ? "Checking..." : "Verify & continue →"}</button>
            <button className="btn-ghost" style={{ marginTop: 8, border: 0, background: "transparent" }} onClick={sendCode}>Resend code</button>
          </>
        )}
        {msg && <p className="hint" style={{ marginTop: 10 }}>{msg}</p>}
        <Link href="/" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>← Back home</Link>
      </div>
    </div>
  );
}
