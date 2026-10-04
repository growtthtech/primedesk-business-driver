import Link from "next/link";

const nav = [
  { href: "#how", label: "How it works" },
  { href: "#who", label: "Who it's for" },
  { href: "#why", label: "Why PrimeDesk" },
  { href: "#faq", label: "FAQ" },
];

export default function Landing() {
  return (
    <div className="fade-in">
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,255,255,.95)", border: "1px solid #E6EAF0", borderRadius: 16, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#1A3A5C", fontWeight: 800, whiteSpace: "nowrap" }}>🚗 PrimeDesk</Link>
        <div style={{ display: "flex", gap: 12, flex: 1, overflowX: "auto", fontSize: 13 }}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} style={{ color: "#1A3A5C", textDecoration: "none", whiteSpace: "nowrap" }}>{n.label}</a>
          ))}
        </div>
        <Link href="/start" style={{ background: "#E8590C", color: "#fff", padding: "8px 14px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}>Request ride →</Link>
      </nav>

      {/* UBER-STYLE HERO */}
      <div className="card" style={{ padding: "28px 20px", background: "#0B1D33", border: "1px solid #0B1D33", color: "#fff" }}>
        <span style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>🚗 YOUR BUSINESS UBER</span>
        <h1 style={{ fontSize: 30, margin: "14px 0 8px", lineHeight: 1.15, color: "#fff" }}>Where to, boss?</h1>
        <p style={{ margin: 0, fontSize: 16, color: "#E8B62A", fontWeight: 700 }}>Drive your business to the desired destination with the perfect digital tools.</p>
        <p style={{ fontSize: 14, color: "#B9C6D8" }}>No tech degree. No oversold software. Just tell us how you work — we handle the driving.</p>

        {/* TRIP CARD */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 14, marginTop: 14, color: "#2B3440" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#1A56DB" }} />
              <span style={{ width: 2, height: 26, background: "#E6EAF0" }} />
              <span style={{ width: 10, height: 10, background: "#E8590C" }} />
            </div>
            <div style={{ flex: 1, fontSize: 13 }}>
              <p style={{ margin: "0 0 12px" }}><span style={{ color: "#7A8699" }}>FROM — where you are</span><br /><b>Scattered chats, notebook, missed bookings</b></p>
              <p style={{ margin: 0 }}><span style={{ color: "#7A8699" }}>TO — your destination</span><br /><b>Clear process, right tools, steady growth 🌱</b></p>
            </div>
          </div>
          <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", marginTop: 12, textAlign: "center" }}>Request my ride — free, 10 mins →</Link>
        </div>
        <p style={{ fontSize: 12, color: "#B9C6D8", textAlign: "center", margin: "10px 0 0" }}>✓ Free pilot for first 20 businesses &nbsp;•&nbsp; ✓ Nothing forced &nbsp;•&nbsp; <Link href="/login" style={{ color: "#E8B62A" }}>Log in</Link></p>
      </div>

      {/* TRUST STRIP */}
      <div className="card" style={{ textAlign: "center" }}>
        <p className="hint" style={{ margin: 0 }}>RIDING WITH BUSINESSES LIKE</p>
        <p style={{ fontWeight: 800, color: "#1A3A5C", margin: "8px 0 0" }}>💇 Beauty &nbsp;•&nbsp; 🍲 Food vendors &nbsp;•&nbsp; 👗 Fashion &nbsp;•&nbsp; 🔧 Home services</p>
      </div>

      {/* HOW */}
      <div id="how" className="card">
        <span className="badge-growth">HOW YOUR TRIP WORKS</span>
        <h2>Three stops. You stay seated.</h2>
        {[
          ["🚕 Stop 1 — Pickup", "Describe your work like chatting on WhatsApp. Example: “Clients DM me, I send price, they transfer.”"],
          ["🗺 Stop 2 — Confirm the route", "We turn your words into a clear map. Fix it until you say: yes, this is my business."],
          ["⚡ Stop 3 — Arrive with a plan", "Start Now (urgent) vs Next vs Later. Tick what you use. Return in 7 days to your growth path."],
        ].map(([t, d]) => (
          <div key={t} style={{ background: "#F8FAFD", border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
            <b>{t}</b><p className="hint" style={{ margin: "4px 0 0" }}>{d}</p>
          </div>
        ))}
        <Link href="/start" className="btn-primary" style={{ display: "block", textDecoration: "none", marginTop: 8, textAlign: "center" }}>Book my pickup →</Link>
      </div>

      {/* WHO */}
      <div id="who" className="card">
        <span className="badge-growth">WHO&apos;S RIDING</span>
        <h2>For owners drowning in chats.</h2>
        {[
          ["💇 Salon / beauty owner", "“25 chats a day, 3 missed bookings a week. My notebook can’t keep up.”"],
          ["🍲 Food vendor", "“50 packs on WhatsApp, riders late, payments scattered across transfers.”"],
          ["👗 Instagram vendor", "“DMs full of ‘how much?’ — no list of who paid and who didn’t.”"],
          ["🔧 Home-service team", "“3 staff, jobs by phone calls — nobody knows who is where.”"],
        ].map(([t, q]) => (
          <div key={t} style={{ borderLeft: "3px solid #E8590C", paddingLeft: 12, margin: "10px 0" }}>
            <b>{t}</b><p className="hint" style={{ margin: "2px 0 0", fontStyle: "italic" }}>{q}</p>
          </div>
        ))}
      </div>

      {/* WHY */}
      <div id="why">
        <div className="card card-action">
          <span className="badge-action">⚡ OUR PROMISE</span>
          <h2 style={{ marginBottom: 4 }}>We never oversell you software.</h2>
          <p style={{ color: "#8A4A1B", marginTop: 0 }}>Start Now = 2–4 tools max. Every suggestion says <i>why</i> and <i>when to upgrade</i>. The business decides — the driver just drives.</p>
        </div>
        <div className="card card-growth">
          <span className="badge-growth">🌱 YOUR GROWTH ROUTE</span>
          <p style={{ margin: "8px 0" }}><b>START</b> → <b>ORGANIZE</b> → <b>CONNECT</b> → <b>OPTIMIZE</b>. You move when ready.</p>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="card">
        <span className="badge-growth">FELLOW PASSENGERS</span>
        <h2>Owners already riding</h2>
        <div style={{ background: "#F8FAFD", borderRadius: 12, padding: 12, margin: "8px 0" }}>
          <p style={{ margin: 0 }}>“For the first time I saw my whole business on one screen. We fixed follow-up the same week.”</p>
          <p className="hint" style={{ margin: "6px 0 0" }}>— Lash tech, Lekki (pilot tester) ⭐⭐⭐⭐⭐</p>
        </div>
        <div style={{ background: "#F8FAFD", borderRadius: 12, padding: 12, margin: "8px 0" }}>
          <p style={{ margin: 0 }}>“It told me NOT to buy a CRM yet. That honesty made me trust it.”</p>
          <p className="hint" style={{ margin: "6px 0 0" }}>— Lunch vendor, Ikeja (pilot tester) ⭐⭐⭐⭐⭐</p>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="card">
        <span className="badge-growth">FAQ</span>
        <h2>Questions owners ask</h2>
        {[
          ["Do I need to be tech-savvy?", "No. If you can chat on WhatsApp, you can ride. Big buttons, plain words, 10 minutes."],
          ["Will it replace my WhatsApp or payment app?", "Never. PrimeDesk sits above your tools and tells you which to keep, connect, or add later."],
          ["What does it cost?", "The map + plan are free during pilot. Paid reminders and connections come later — only what you choose."],
          ["My business is mostly manual. Is this for me?", "If you take orders on WhatsApp + transfers, yes. Pure cash-and-paper shops should wait."],
          ["Where is my data kept?", "On our secure database. Your chats are never read — you describe your process yourself."],
        ].map(([q, a]) => (
          <details key={q} style={{ border: "1px solid #E6EAF0", borderRadius: 10, padding: 10, margin: "8px 0" }}>
            <summary style={{ fontWeight: 700, cursor: "pointer" }}>{q}</summary>
            <p className="hint">{a}</p>
          </details>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="card" style={{ textAlign: "center", background: "#0B1D33", border: "1px solid #0B1D33", color: "#fff" }}>
        <h2 style={{ marginTop: 0, color: "#fff" }}>Your destination is waiting. 🚗💨</h2>
        <p style={{ color: "#B9C6D8" }}>Join the first 20 pilot businesses. Free map + plan.</p>
        <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none" }}>⚡ Request my ride — free</Link>
      </div>
    </div>
  );
}
