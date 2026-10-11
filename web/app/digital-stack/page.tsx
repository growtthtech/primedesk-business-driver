import Link from "next/link";

export default function DigitalStackInfo() {
  return (
    <div className="fade-in">
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff", marginTop: -16, paddingTop: 8 }}>
        <div className="bleed-inner">
          <span style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>DIGITAL STACK</span>
          <h1 style={{ fontSize: 32, margin: "14px 0 0" }}>Know What You Need Before You Buy.</h1>
          <p style={{ color: "#D7E0EC", fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
            What you use, what you need, what can wait — built from your mapped processes.
          </p>
        </div>
      </section>
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          {[
            ["Existing tools", "What you already run on — so advice builds on your stack."],
            ["Capability needs", "Each gap points to a job your stack needs to do."],
            ["Tool options", "Matched to your workflow, budget, and readiness — with trade-offs."],
            ["Alternatives", "Compare options instead of accepting one answer."],
            ["Readiness", "Your level decides what comes now versus later."],
          ].map(([t, d]) => (
            <div key={t} className="card" style={{ padding: 16 }}>
              <b style={{ color: "#1A3A5C" }}>{t}</b>
              <p className="hint" style={{ margin: "4px 0 0" }}>{d}</p>
            </div>
          ))}
          <div className="card card-growth">
            <span className="badge-growth">AN HONEST DISTINCTION</span>
            <p className="hint" style={{ margin: "8px 0 0" }}>
              <b>Recorded tools</b> are what you told us you use. <b>Suggested tools</b> are options worth a look.
              No live integrations — tracking stays in your hands, in My Drive.
            </p>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
              Build My Digital Stack
            </Link>
            <p className="hint" style={{ margin: "10px 0 0" }}>
              Already mapping? <Link href="/login?next=%2Fplan" style={{ color: "#1A56DB" }}>Log in to see your plan</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
