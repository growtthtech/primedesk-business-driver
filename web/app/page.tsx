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
        <Link href="/" style={{ textDecoration: "none", color: "#1A3A5C", fontWeight: 800, whiteSpace: "nowrap" }}>PrimeDesk</Link>
        <div style={{ display: "flex", gap: 12, flex: 1, overflowX: "auto", fontSize: 13 }}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} style={{ color: "#1A3A5C", textDecoration: "none", whiteSpace: "nowrap" }}>{n.label}</a>
          ))}
        </div>
        <Link href="/start" style={{ background: "#E8590C", color: "#fff", padding: "8px 14px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" }}>Start free →</Link>
      </nav>

      {/* HERO */}
      <div className="card" style={{ textAlign: "center", padding: "36px 20px" }}>
        <span className="badge-growth">🌱 Built for Nigeria service businesses</span>
        <h1 style={{ fontSize: 30, color: "#1A3A5C", margin: "14px 0 8px", lineHeight: 1.2 }}>
          Take your business where it needs to go.
        </h1>
        <p className="hint" style={{ fontSize: 16 }}>Tell us how you work in plain words. Get your process map, the right tools for today — and what can safely wait.</p>
        <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", marginTop: 18 }}>⚡ Start now — 10 minutes, free</Link>
        <a href="#how" style={{ display: "block", marginTop: 12, color: "#1A56DB", fontSize: 14 }}>See how it works ↓</a>
        <div style={{ display: "flex", gap: 8, marginTop: 18, fontSize: 12, color: "#7A8699" }}>
          <span style={{ flex: 1, background: "#F8FAFD", borderRadius: 10, padding: 8 }}>✓ 10-min setup</span>
          <span style={{ flex: 1, background: "#F8FAFD", borderRadius: 10, padding: 8 }}>✓ 3 templates</span>
          <span style={{ flex: 1, background: "#F8FAFD", borderRadius: 10, padding: 8 }}>✓ Nothing forced</span>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div className="card" style={{ textAlign: "center" }}>
        <p className="hint" style={{ margin: 0 }}>MADE FOR BUSINESSES LIKE</p>
        <p style={{ fontWeight: 800, color: "#1A3A5C", margin: "8px 0 0" }}>💇 Beauty &nbsp;•&nbsp; 🍲 Food vendors &nbsp;•&nbsp; 👗 Fashion &nbsp;•&nbsp; 🔧 Home services</p>
      </div>

      {/* HOW */}
      <div id="how" className="card">
        <span className="badge-growth">HOW IT WORKS</span>
        <h2>Three steps. No tech degree needed.</h2>
        {[
          ["1 — Show us", "Describe your work like chatting on WhatsApp. Example: “Clients DM me, I send price, they transfer.”"],
          ["2 — Confirm your map", "We turn your words into a clear step-by-step map. Fix it until you say: yes, this is my business."],
          ["3 — Get your plan", "Start Now (urgent, orange) vs Next vs Later. Tick what you use. Come back in 7 days to your growth path."],
        ].map(([t, d]) => (
          <div key={t} style={{ background: "#F8FAFD", border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
            <b>{t}</b><p className="hint" style={{ margin: "4px 0 0" }}>{d}</p>
          </div>
        ))}
        <Link href="/start" className="btn-primary" style={{ display: "block", textDecoration: "none", marginTop: 8 }}>Try step 1 →</Link>
      </div>

      {/* WHO */}
      <div id="who" className="card">
        <span className="badge-growth">WHO IT&apos;S FOR</span>
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
        <p className="hint">Not for you yet? Cash-only with no WhatsApp Business — come back when chats grow.</p>
      </div>

      {/* WHY */}
      <div id="why">
        <div className="card card-action">
          <span className="badge-action">⚡ OUR PROMISE</span>
          <h2 style={{ marginBottom: 4 }}>We will never oversell you software.</h2>
          <p style={{ color: "#8A4A1B", marginTop: 0 }}>Start Now = 2–4 tools max, good today. Next when you grow. Later when you lead. Every suggestion says <i>why</i> and <i>when to upgrade</i>.</p>
        </div>
        <div className="card card-growth">
          <span className="badge-growth">🌱 YOUR GROWTH PATH</span>
          <p style={{ margin: "8px 0" }}><b>START</b> simple tools → <b>ORGANIZE</b> one list → <b>CONNECT</b> linked tools → <b>OPTIMIZE</b> automation.</p>
          <p className="hint" style={{ margin: 0 }}>You move when ready. PrimeDesk just shows the road.</p>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="card">
        <span className="badge-growth">EARLY TESTERS</span>
        <h2>Owners testing with us</h2>
        <div style={{ background: "#F8FAFD", borderRadius: 12, padding: 12, margin: "8px 0" }}>
          <p style={{ margin: 0 }}>“For the first time I saw my whole business on one screen. We fixed follow-up the same week.”</p>
          <p className="hint" style={{ margin: "6px 0 0" }}>— Lash tech, Lekki (pilot tester)</p>
        </div>
        <div style={{ background: "#F8FAFD", borderRadius: 12, padding: 12, margin: "8px 0" }}>
          <p style={{ margin: 0 }}>“It told me NOT to buy a CRM yet. That honesty made me trust it.”</p>
          <p className="hint" style={{ margin: "6px 0 0" }}>— Lunch vendor, Ikeja (pilot tester)</p>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="card">
        <span className="badge-growth">FAQ</span>
        <h2>Questions owners ask</h2>
        {[
          ["Do I need to be tech-savvy?", "No. If you can chat on WhatsApp, you can use PrimeDesk. Big buttons, plain words, 10 minutes."],
          ["Will it replace my WhatsApp or payment app?", "Never. PrimeDesk sits above your tools and tells you which to keep, connect, or add later."],
          ["What does it cost?", "The map + plan are free during pilot. Paid reminders and connections come later — only what you choose."],
          ["My business is mostly manual. Is this for me?", "If you take orders on WhatsApp + transfers, yes — that's Level 1, our starting point. Pure cash-and-paper shops should wait."],
          ["Where is my data kept?", "On our secure database. Your chats are never read — you describe your process yourself."],
        ].map(([q, a]) => (
          <details key={q} style={{ border: "1px solid #E6EAF0", borderRadius: 10, padding: 10, margin: "8px 0" }}>
            <summary style={{ fontWeight: 700, cursor: "pointer" }}>{q}</summary>
            <p className="hint">{a}</p>
          </details>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="card card-action" style={{ textAlign: "center" }}>
        <h2 style={{ marginTop: 0 }}>Your business has a destination.<br />Let&apos;s drive there. 🚗</h2>
        <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none" }}>⚡ Build my process map — free</Link>
        <p className="hint" style={{ color: "#8A4A1B" }}>Join the first 20 pilot businesses.</p>
      </div>
    </div>
  );
}
