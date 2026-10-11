import Link from "next/link";

export default function About() {
  return (
    <div className="fade-in">
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff", marginTop: -16, paddingTop: 8 }}>
        <div className="bleed-inner">
          <span style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>ABOUT</span>
          <h1 style={{ fontSize: 32, margin: "14px 0 0" }}>Your Agency. Your Destination. A Clearer Route.</h1>
        </div>
      </section>
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          <div className="card">
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0 }}>
              Clearer decisions about your processes and tech. We learn how your agency works first — then recommend.
            </p>
          </div>
          <div className="card card-action">
            <span className="badge-action">⚡ PRODUCT PRINCIPLE</span>
            <h2 style={{ marginBottom: 4 }}>Understand First. Recommend Second.</h2>
            <p style={{ color: "#8A4A1B", margin: 0 }}>
              Too many agencies buy software before understanding the problem. We reverse that: map the process,
              name the gap, then decide.
            </p>
          </div>
          <div className="card">
            <h2>What PrimeDesk is not</h2>
            <ul className="hint" style={{ fontSize: 15, lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
              <li>Not a replacement for your project, billing, or reporting tools.</li>
              <li>Not an automated integration — it does not connect to or read your external software.</li>
              <li>Not a guarantee of growth — it gives you clarity; you drive the change.</li>
            </ul>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
              Start Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
