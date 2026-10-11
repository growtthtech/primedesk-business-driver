import Link from "next/link";

const stages: [string, string][] = [
  ["Know your starting point", "Services, operating model, priorities, and current tools."],
  ["Map your processes", "Describe how work flows today, step by step."],
  ["Assess workflows and tools", "Short questions per process. Compared against agencies like yours."],
  ["Identify problems and capabilities", "Each gap links to the capability that fixes it."],
  ["Review right-sized recommendations", "Options with trade-offs — and when no software is needed."],
  ["Prioritize improvements", "Now, Later, Future. First things first."],
  ["Reassess as you evolve", "Services change, teams grow — your route updates."],
];

export default function HowItWorks() {
  return (
    <div className="fade-in">
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff", marginTop: -16, paddingTop: 8 }}>
        <div className="bleed-inner">
          <span style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>HOW IT WORKS</span>
          <h1 style={{ fontSize: 32, margin: "14px 0 0" }}>Understand First. Recommend Second.</h1>
          <p style={{ color: "#D7E0EC", fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
            Seven stages from where you are today to where you&apos;re going.
          </p>
        </div>
      </section>
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          {stages.map(([t, d], i) => (
            <div key={t} style={{ background: "#F8FAFD", border: "1px solid #E6EAF0", borderRadius: 12, padding: 14, margin: "8px 0", display: "flex", gap: 12 }}>
              <span style={{ color: "#E8590C", fontWeight: 800, fontSize: 18, whiteSpace: "nowrap" }}>{String(i + 1).padStart(2, "0")}</span>
              <div><b>{t}</b><p className="hint" style={{ margin: "4px 0 0" }}>{d}</p></div>
            </div>
          ))}
          <div className="card card-action" style={{ textAlign: "center" }}>
            <h2 style={{ margin: "0 0 6px" }}>Ready to find your route?</h2>
            <p style={{ color: "#8A4A1B", margin: "0 0 12px" }}>A few minutes. No password.</p>
            <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
              Start Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
