import Link from "next/link";

export default function Landing() {
  return (
    <div className="fade-in">
      <div className="card" style={{ textAlign: "center", padding: "32px 20px" }}>
        <span className="badge-growth">🌱 For Nigeria service businesses</span>
        <h1 style={{ fontSize: 28, color: "#1A3A5C", margin: "12px 0" }}>Take your business where it needs to go.</h1>
        <p className="hint">Tell us how you work. Get your process map + the right tools for today — and what can wait.</p>
        <Link href="/start" className="btn-primary" style={{ display: "block", textDecoration: "none", marginTop: 16 }}>
          Start — takes 10 minutes →
        </Link>
        <Link href="/home" style={{ display: "block", marginTop: 12, color: "#1A56DB", fontSize: 14 }}>
          I already started — open My Home
        </Link>
      </div>

      <div className="card">
        <b>🗺 Your process, mapped</b>
        <p className="hint">From WhatsApp chats to a clear step-by-step map you confirm.</p>
      </div>
      <div className="card card-action">
        <b>⚡ Right-sized plan</b>
        <p className="hint" style={{ color: "#8A4A1B" }}>Start Now (urgent, orange) vs Next vs Later. Never oversold.</p>
      </div>
      <div className="card card-growth">
        <b>🌱 Growth path</b>
        <p className="hint" style={{ color: "#1B7A3D" }}>Today ✓ → Next → Future. Come back in 7 days.</p>
      </div>
    </div>
  );
}
