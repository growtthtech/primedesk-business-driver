import Link from "next/link";

export default function Landing() {
  return (
    <div className="fade-in">
      {/* HERO — full-bleed dark, pulled up flush under the navbar (no gap) */}
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff", marginTop: -16, paddingTop: 8 }}>
        <div className="bleed-inner">
          <span style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>🚗 YOUR BUSINESS UBER</span>
          <h1 style={{ fontSize: 40, margin: "14px 0 0", lineHeight: 1.08, letterSpacing: -0.5 }}>
            Your Business,<br />Driven to Its <span style={{ color: "#E8B62A" }}>Destination.</span>
          </h1>
          <div style={{ borderLeft: "4px solid #E8590C", paddingLeft: 16, marginTop: 18, maxWidth: 640 }}>
            <p style={{ margin: 0, fontSize: 15, color: "#D7E0EC", lineHeight: 1.6 }}>
              Drive your business to the desired destination with the perfect digital tools.
              Tell us how you work — we map your process, pick right-sized tools, and show what can wait.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <Link href="/start" style={{ background: "#E8590C", color: "#fff", padding: "15px 28px", borderRadius: 12, textDecoration: "none", fontSize: 15, fontWeight: 800, boxShadow: "0 6px 22px rgba(232,89,12,.45)" }}>REQUEST MY RIDE</Link>
            <a href="#how" style={{ border: "1px solid #3A5068", color: "#fff", padding: "15px 22px", borderRadius: 12, textDecoration: "none", fontSize: 14 }}>See how it works</a>
          </div>
          <p style={{ fontSize: 12, color: "#8FA0B8", margin: "14px 0 0" }}>✓ Free pilot for first 20 &nbsp;•&nbsp; ✓ 10 minutes &nbsp;•&nbsp; ✓ Nothing forced</p>

          {/* TRIP VISUAL */}
          <div style={{ marginTop: 22, borderRadius: 16, padding: "20px 18px", background: "linear-gradient(135deg, #14294A 0%, #1A3A5C 45%, #4A2C10 100%)", border: "1px solid #2A435F", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,182,42,.35), transparent 70%)" }} />
            <div><span style={{ background: "#1A56DB", color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 20 }}>● FROM — scattered chats</span></div>
            <div style={{ marginLeft: 12, borderLeft: "2px dashed #E8B62A", height: 34, marginTop: 6, marginBottom: 6, position: "relative" }}>
              <span style={{ position: "absolute", top: 6, left: 10, fontSize: 20 }}>🚗💨</span>
            </div>
            <div><span style={{ background: "#E8590C", color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 4 }}>■ TO — clear process, steady growth 🌱</span></div>
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", fontSize: 12, padding: "7px 12px", borderRadius: 20 }}>✓ Map confirmed</span>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", fontSize: 12, padding: "7px 12px", borderRadius: 20 }}>+12 repeat customers</span>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", fontSize: 12, padding: "7px 12px", borderRadius: 20 }}>No CRM forced</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="full-bleed" style={{ background: "#fff", borderBottom: "1px solid #E6EAF0" }}>
        <div className="bleed-inner" style={{ textAlign: "center", padding: "20px 16px" }}>
          <p className="hint" style={{ margin: 0 }}>RIDING WITH BUSINESSES LIKE</p>
          <p style={{ fontWeight: 800, color: "#1A3A5C", margin: "8px 0 0" }}>💇 Beauty &nbsp;•&nbsp; 🍲 Food vendors &nbsp;•&nbsp; 👗 Fashion &nbsp;•&nbsp; 🔧 Home services</p>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="full-bleed" style={{ background: "#F8FAFD" }}>
        <div className="bleed-inner">
          <span className="badge-growth">HOW YOUR TRIP WORKS</span>
          <h2>Three stops. You stay seated.</h2>
          {[
            ["🚕 Stop 1 — Pickup", "Describe your work like chatting on WhatsApp. Example: “Clients DM me, I send price, they transfer.”"],
            ["🗺 Stop 2 — Confirm the route", "We turn your words into a clear map. Fix it until you say: yes, this is my business."],
            ["⚡ Stop 3 — Arrive with a plan", "Start Now (urgent) vs Next vs Later. Tick what you use. Return in 7 days to your growth path."],
          ].map(([t, d]) => (
            <div key={t} style={{ background: "#fff", border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
              <b>{t}</b><p className="hint" style={{ margin: "4px 0 0" }}>{d}</p>
            </div>
          ))}
          <Link href="/start" className="btn-primary" style={{ display: "block", textDecoration: "none", marginTop: 8, textAlign: "center", maxWidth: 420 }}>Book my pickup →</Link>
        </div>
      </section>

      {/* WHO */}
      <section id="who" className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
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
      </section>

      {/* WHY */}
      <section id="why" className="full-bleed" style={{ background: "#F8FAFD" }}>
        <div className="bleed-inner">
          <div className="card card-action">
            <span className="badge-action">⚡ OUR PROMISE</span>
            <h2 style={{ marginBottom: 4 }}>We never oversell you software.</h2>
            <p style={{ color: "#8A4A1B", marginTop: 0 }}>Start Now = 2–4 tools max. Every suggestion says <i>why</i> and <i>when to upgrade</i>. The business decides — the driver just drives.</p>
          </div>
          <div className="card card-growth" style={{ marginTop: 12 }}>
            <span className="badge-growth">🌱 YOUR GROWTH ROUTE</span>
            <p style={{ margin: "8px 0" }}><b>START</b> → <b>ORGANIZE</b> → <b>CONNECT</b> → <b>OPTIMIZE</b>. You move when ready.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
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
      </section>

      {/* FAQ */}
      <section id="faq" className="full-bleed" style={{ background: "#F8FAFD" }}>
        <div className="bleed-inner">
          <span className="badge-growth">FAQ</span>
          <h2>Questions owners ask</h2>
          {[
            ["Do I need to be tech-savvy?", "No. If you can chat on WhatsApp, you can ride. Big buttons, plain words, 10 minutes."],
            ["Will it replace my WhatsApp or payment app?", "Never. PrimeDesk sits above your tools and tells you which to keep, connect, or add later."],
            ["What does it cost?", "The map + plan are free during pilot. Paid reminders and connections come later — only what you choose."],
            ["My business is mostly manual. Is this for me?", "If you take orders on WhatsApp + transfers, yes. Pure cash-and-paper shops should wait."],
            ["Where is my data kept?", "On our secure database. Your chats are never read — you describe your process yourself."],
          ].map(([q, a]) => (
            <details key={q} style={{ background: "#fff", border: "1px solid #E6EAF0", borderRadius: 10, padding: 10, margin: "8px 0" }}>
              <summary style={{ fontWeight: 700, cursor: "pointer" }}>{q}</summary>
              <p className="hint">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff" }}>
        <div className="bleed-inner" style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: 0, color: "#fff" }}>Your destination is waiting. 🚗💨</h2>
          <p style={{ color: "#B9C6D8" }}>Join the first 20 pilot businesses. Free map + plan.</p>
          <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", maxWidth: 420, margin: "0 auto" }}>⚡ REQUEST MY RIDE — FREE</Link>
        </div>
      </section>
    </div>
  );
}
