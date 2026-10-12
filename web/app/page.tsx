import Link from "next/link";

const problems: [string, string][] = [
  ["Client onboarding", "Requirements, access, and information are collected inconsistently."],
  ["Service delivery", "Tasks, approvals, revisions, and handoffs are difficult to coordinate."],
  ["Business development", "Enquiries, leads, and follow-ups are scattered."],
  ["Team coordination", "Responsibilities and workloads are unclear."],
  ["Reporting", "Information is distributed across tools."],
  ["Technology decisions", "It is difficult to know which tools are necessary and which can wait."],
];

const steps: [string, string, string][] = [
  ["01", "Know Your Starting Point", "Your services, tools, and how work moves today."],
  ["02", "Find the Right Route", "Bottlenecks, manual work, and unclear handoffs — named."],
  ["03", "Choose the Right Tools", "Options matched to your workflow, budget, and readiness."],
  ["04", "Keep Moving Forward", "What matters now. What can wait."],
];

const areas: [string, string][] = [
  ["Business Development", "Leads, qualification, follow-up, proposals, pricing, and conversion."],
  ["Client Management", "Onboarding, communication, approvals, changes, retention, and offboarding."],
  ["Service Delivery", "Planning, production, task coordination, quality checks, delivery, and reporting."],
  ["Team & Resource Management", "Responsibilities, workload, collaboration, handoffs, and knowledge sharing."],
  ["Financial & Commercial Management", "Pricing, costs, billing processes, payment tracking, and subscriptions."],
  ["Performance & Growth", "Agency performance, client results, reporting, retention, and continuous improvement."],
];

const outputs: [string, string, string, string][] = [
  ["My Map", "Know Where You Are", "Your workflows, mapped. Gaps flagged.", "/map"],
  ["Digital Stack", "Understand What You Need", "Tools you use, needs found, options worth a look.", "/digital-stack"],
  ["My Plan", "Know What to Do Next", "Improvements ranked: Now, Later, Future.", "/plan"],
  ["My Drive", "Track Your Decisions", "Every tool decision, in one place.", "/drive"],
];

const faqs: [string, string][] = [
  ["What is PrimeDesk?", "A process check-up for digital marketing agencies. We map how you work, flag the gaps, and recommend only the tools you need."],
  ["Who is PrimeDesk for?", "Solo consultants, specialists, and growing multi-service agencies. Questions adapt to your size — solos skip team-management topics."],
  ["How does the assessment work?", "Describe your agency, answer short questions per process, and get a Now / Later / Future plan."],
  ["Does PrimeDesk replace existing tools?", "No. It builds on your stack — and often recommends process fixes that cost nothing."],
  ["Will PrimeDesk recommend tools I do not need?", "Every suggestion explains its why. If nothing is needed yet, the plan says so."],
  ["Does PrimeDesk connect automatically to external software?", "No. It doesn't plug into your software. You track decisions manually in My Drive."],
  ["What happens after I complete an assessment?", "You keep My Map, My Plan, and My Drive — and revisit them as your agency grows."],
  ["Is PrimeDesk available now?", "Yes. Create an account and start mapping today."],
];

export default function Landing() {
  return (
    <div className="fade-in">
      {/* 1 — HERO (keeps the dark route color) */}
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff", marginTop: -16, paddingTop: 8 }}>
        <div className="bleed-inner">
          <span className="hide-mobile" style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>
            YOUR AGENCY. YOUR DESTINATION. A CLEARER ROUTE.
          </span>
          <h1 className="hero-title" style={{ margin: "14px 0 0", lineHeight: 1.1 }}>
            Drive Your Agency Towards Its <span style={{ color: "#E8B62A" }}>Next Level.</span>
          </h1>
          <div style={{ borderLeft: "4px solid #E8590C", paddingLeft: 16, marginTop: 18, maxWidth: 640 }}>
            <p style={{ margin: 0, fontSize: 16, color: "#fff", lineHeight: 1.55, fontWeight: 600 }}>
              See how your agency really runs, fix what&apos;s broken, and choose only the tools you need.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <Link href="/start" style={{ background: "#E8590C", color: "#fff", padding: "15px 28px", borderRadius: 12, textDecoration: "none", fontSize: 15, fontWeight: 800, boxShadow: "0 6px 22px rgba(232,89,12,.45)" }}>
              Start Free
            </Link>
            <Link href="/how-it-works" style={{ border: "1px solid #3A5068", color: "#fff", padding: "15px 22px", borderRadius: 12, textDecoration: "none", fontSize: 14 }}>
              See How It Works
            </Link>
          </div>
          <p style={{ fontSize: 12, color: "#8FA0B8", margin: "16px 0 0" }}>
            Start your free agency Drive today.
          </p>

          {/* Illustrated interface preview — clearly labelled mockup */}
          <div style={{ marginTop: 22, borderRadius: 16, padding: "20px 18px", background: "linear-gradient(135deg, #14294A 0%, #1A3A5C 45%, #4A2C10 100%)", border: "1px solid #2A435F", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,182,42,.35), transparent 70%)" }} />
            <div><span style={{ background: "#1A56DB", color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 20 }}>● START — how work flows today</span></div>
            <div style={{ marginLeft: 12, borderLeft: "2px dashed #E8B62A", height: 34, marginTop: 6, marginBottom: 6, position: "relative" }}>
              <span style={{ position: "absolute", top: 6, left: 10, fontSize: 12, color: "#E8B62A", fontWeight: 700 }}>assess → prioritize → decide</span>
            </div>
            <div><span style={{ background: "#E8590C", color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 4 }}>■ DESTINATION — clear plan, right-sized tools</span></div>
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", fontSize: 12, padding: "7px 12px", borderRadius: 20 }}>✓ Processes mapped</span>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", fontSize: 12, padding: "7px 12px", borderRadius: 20 }}>⚡ Now / Later / Future plan</span>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", fontSize: 12, padding: "7px 12px", borderRadius: 20 }}>No tool forced</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — PROBLEM */}
      <section className="full-bleed" style={{ background: "#fff", borderBottom: "1px solid #E6EAF0" }}>
        <div className="bleed-inner">
          <h2>Your Agency Has Tools. But Do They Work Together?</h2>
          <p className="hint" style={{ fontSize: 15, lineHeight: 1.6 }}>
            Running the agency is getting harder than running the marketing.
          </p>
          <div className="grid-3">
            {problems.map(([t, d]) => (
              <div key={t} className="card" style={{ padding: 16 }}>
                <b style={{ color: "#1A3A5C" }}>{t}</b>
                <p className="hint" style={{ margin: "4px 0 0", fontSize: 13 }}>{d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontWeight: 700, color: "#1A3A5C", marginTop: 16 }}>
            The problem may not be a lack of software. It may be the process behind it.
          </p>
        </div>
      </section>

      {/* 3 — JOURNEY */}
      <section className="full-bleed" style={{ background: "#F8FAFD" }}>
        <div className="bleed-inner">
          <span className="badge-growth">THE AGENCY JOURNEY</span>
          <h2>Every Agency Has a Destination. Let&apos;s Find Your Route.</h2>
          {steps.map(([n, t, d]) => (
            <div key={n} style={{ background: "#fff", border: "1px solid #E6EAF0", borderRadius: 12, padding: 14, margin: "8px 0", display: "flex", gap: 12 }}>
              <span style={{ color: "#E8590C", fontWeight: 800, fontSize: 18, whiteSpace: "nowrap" }}>{n}</span>
              <div><b>{t}</b><p className="hint" style={{ margin: "4px 0 0" }}>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 — AGENCY PROCESSES */}
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          <span className="badge-growth">AGENCY PROCESSES</span>
          <h2>See the Bigger Picture of Your Agency.</h2>
          <p className="hint" style={{ fontSize: 15, lineHeight: 1.6 }}>
            Your agency is more than its services. We map the business behind them — only what&apos;s relevant to you.
          </p>
          <div className="grid-3">
            {areas.map(([t, d]) => (
              <div key={t} className="card" style={{ padding: 16 }}>
                <b style={{ color: "#1A3A5C" }}>{t}</b>
                <p className="hint" style={{ margin: "4px 0 0", fontSize: 13 }}>{d}</p>
              </div>
            ))}
          </div>
          <Link href="/agency-processes" style={{ display: "block", textAlign: "center", marginTop: 12, color: "#1A56DB", fontWeight: 700 }}>
            Explore the process library →
          </Link>
        </div>
      </section>

      {/* 5 — PRODUCT OUTPUTS */}
      <section className="full-bleed" style={{ background: "#F8FAFD" }}>
        <div className="bleed-inner">
          <span className="badge-growth">WHAT YOU GET</span>
          <h2>From a Clearer Picture to a Practical Plan.</h2>
          <div className="grid-even">
          {outputs.map(([name, tag, d, href]) => (
            <div key={name} className="card" style={{ padding: 16 }}>
              <b style={{ color: "#1A3A5C" }}>{name} — {tag}</b>
              <p className="hint" style={{ margin: "4px 0 8px" }}>{d}</p>
              <Link href={href} style={{ color: "#1A56DB", fontSize: 14, fontWeight: 700 }}>Learn more →</Link>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* 6 — RIGHT-SIZED */}
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          <div className="card card-action">
            <span className="badge-action">⚡ OUR PRINCIPLE</span>
            <h2 style={{ marginBottom: 4 }}>The Right Route Is Different for Every Agency.</h2>
            <p style={{ color: "#8A4A1B", marginTop: 0 }}>No software shopping list. We consider:</p>
            <ul style={{ color: "#8A4A1B", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px", paddingLeft: 4, listStyle: "none" }}>
              {[
                "The services you offer.",
                "Your current processes and tools.",
                "The problems you have identified.",
                "Your team size and operating model.",
                "Budget and implementation capacity.",
                "Digital readiness.",
                "Whether a process improvement is enough — or software is needed.",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, margin: "6px 0" }}>
                  <span aria-hidden="true" style={{ color: "#E8590C", fontWeight: 800 }}>●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ color: "#8A4A1B", fontWeight: 700, marginBottom: 0 }}>
              You do not need another subscription simply because a tool exists. Understand the need first,
              then decide what is worth adopting.
            </p>
          </div>
        </div>
      </section>

      {/* 7 — AUDIENCE FIT */}
      <section className="full-bleed" style={{ background: "#F8FAFD" }}>
        <div className="bleed-inner">
          <span className="badge-growth">WHO IT FITS</span>
          <h2>Built Around the Way Digital Marketing Agencies Work.</h2>
          {[
            ["Solo consultants", "Skip team-management questions. Map client work, end to end."],
            ["Specialist agencies", "Go deep on the processes behind your core service."],
            ["Growing multi-service agencies", "Fix handoffs and reporting across services — in priority order."],
          ].map(([t, d]) => (
            <div key={t} style={{ borderLeft: "3px solid #E8590C", paddingLeft: 12, margin: "10px 0" }}>
              <b>{t}</b><p className="hint" style={{ margin: "2px 0 0" }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          <span className="badge-growth">FAQ</span>
          <h2>Questions agencies ask</h2>
          {faqs.map(([q, a]) => (
            <details key={q} style={{ background: "#F8FAFD", border: "1px solid #E6EAF0", borderRadius: 10, padding: 10, margin: "8px 0" }}>
              <summary style={{ fontWeight: 700, cursor: "pointer" }}>{q}</summary>
              <p className="hint">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 9 — FINAL CTA */}
      <section className="full-bleed" style={{ background: "#fff", borderTop: "1px solid #E6EAF0" }}>
        <div className="bleed-inner" style={{ textAlign: "center", paddingTop: 56, paddingBottom: 56 }}>
          <span className="badge-growth">GET STARTED</span>
          <h2 style={{ margin: "14px auto 12px", color: "#1A3A5C", maxWidth: 560 }}>Your Agency Has Somewhere to Go. Start With a Clearer Route.</h2>
          <p className="hint" style={{ margin: "0 auto 24px", maxWidth: 520 }}>See what&apos;s holding your agency back — and what to do next.</p>
          <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", maxWidth: 420, margin: "0 auto" }}>
            Start Free
          </Link>
          <p className="hint" style={{ margin: "20px 0 0", fontSize: 13 }}>Understand First. Recommend Second.</p>
        </div>
      </section>
    </div>
  );
}
