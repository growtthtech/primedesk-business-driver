"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { normalizeNG, maskEmail, maskPhone } from "../../lib/phone";

type Channel = "email" | "phone";

export default function LoginPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [channel, setChannel] = useState<Channel>("email");
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
    try {
      const r = await fetch("/api/business");
      if (r.ok) {
        const j = await r.json();
        router.push(j.ok && j.business ? "/drive" : "/business-profile");
        return;
      }
    } catch {}
    router.push("/drive");
  }

  async function send() {
    const v = input.trim();
    if (!v) { setMsg("Enter your email or phone number."); return; }
    const isEmail = v.includes("@");
    setBusy(true); setMsg("Sending your code...");
    try {
      if (isEmail) {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { setMsg("That email doesn't look right. Check it and retry."); return; }
        const res = await authClient.emailOtp.sendVerificationOtp({ email: v, type: "sign-in" });
        if (res.error) { setMsg("We couldn't send your verification code. Please check your details and try again."); return; }
        setChannel("email"); setTarget(v);
        setMsg(`We sent a code to ${maskEmail(v)}.`);
      } else {
        const phone = normalizeNG(v);
        if (!phone) { setMsg("Enter a valid Nigerian phone number, e.g. 08012345678."); return; }
        const res = await authClient.phoneNumber.sendOtp({ phoneNumber: phone });
        if (res.error) { setMsg("We couldn't send your verification code. Please check your details and try again."); return; }
        setChannel("phone"); setTarget(phone);
        setMsg(`We sent a code to ${maskPhone(phone)}.`);
      }
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
      const res = channel === "email"
        ? await authClient.signIn.emailOtp({ email: target, otp: code.trim() })
        : await authClient.phoneNumber.verify({ phoneNumber: target, code: code.trim() });
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
        <p style={{ fontSize: 40, margin: 0 }}>🚗</p>
        <h1 style={{ fontSize: 24, color: "#1A3A5C", margin: "8px 0 4px" }}>Start with PrimeDesk</h1>
        <p style={{ margin: 0, color: "#1A3A5C" }}>Drive your business to the desired destination with the perfect digital tools.</p>
        <p className="hint">Enter your email or phone number to continue. No passwords.</p>
      </div>

      <div className="card">
        {!sent ? (
          <>
            <label htmlFor="login-id">Email or phone number<br />
              <input id="login-id" className="field" value={input} onChange={(e) => setInput(e.target.value)} placeholder="you@business.ng or 08012345678" inputMode="email" autoComplete="email tel" />
            </label>
            <div style={{ height: 12 }} />
            <button className="btn-action" disabled={busy} onClick={send}>{busy ? "Sending..." : "Continue →"}</button>
          </>
        ) : (
          <>
            <h2>Enter your verification code</h2>
            <p className="hint">We sent a code to <b>{channel === "email" ? maskEmail(target) : maskPhone(target)}</b> <button onClick={() => { setSent(false); setCode(""); setMsg(""); }} style={{ border: 0, background: "none", color: "#1A56DB", cursor: "pointer", fontSize: 13 }}>(change)</button></p>
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
