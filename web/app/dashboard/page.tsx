"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type MapInfo = { business: { name: string }; progress: { mapped: number; total: number } };
type PlanInfo = { summary: { total: number; now: number; later: number; future: number }; readiness: { level: number; name: string } | null };
type DriveInfo = { tools: unknown[] };

// Dashboard: the record of everything the agency has done — the only place
// workspace links live until the first process is finished.
export default function DashboardPage() {
  const [state, setState] = useState<"checking" | "login" | "setup" | "ready" | "error">("checking");
  const [map, setMap] = useState<MapInfo | null>(null);
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [driveCount, setDriveCount] = useState(0);

  useEffect(() => {
    fetch("/api/business")
      .then((r) => (r.status === 401 ? null : r.json()))
      .then((b) => {
        if (!b) { setState("login"); return; }
        if (!b.ok) { setState("error"); return; }
        if (!b.business) { setState("setup"); return; }
        Promise.allSettled([
          fetch("/api/my-map").then((r) => (r.ok ? r.json() : null)),
          fetch("/api/plan").then((r) => (r.ok ? r.json() : null)),
          fetch("/api/drive").then((r) => (r.ok ? r.json() : null)),
        ]).then(([m, p, d]) => {
          if (m.status === "fulfilled" && m.value?.ok) setMap(m.value);
          if (p.status === "fulfilled" && p.value?.ok) setPlan(p.value);
          if (d.status === "fulfilled" && d.value?.ok) setDriveCount((d.value.tools || []).length);
          setState("ready");
        });
      })
      .catch(() => setState("error"));
  }, []);

  if (state === "checking") return <div className="card"><p className="hint">Opening your dashboard...</p></div>;
  if (state === "login") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>Your dashboard lives here</h2>
        <p className="hint">Log in to see everything your agency has done.</p>
        <Link href="/login?next=%2Fdashboard" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Log in →</Link>
      </div>
    );
  }
  if (state === "setup") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>Set up your agency first</h2>
        <p className="hint">Your dashboard builds from your agency profile.</p>
        <Link href="/business-profile" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Set up my agency →</Link>
      </div>
    );
  }
  if (state === "error" || !map) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>Dashboard</h2>
        <p className="hint">We couldn&apos;t load your records. Check your connection and retry.</p>
        <Link href="/map" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Open My Map →</Link>
      </div>
    );
  }

  const done = map.progress.mapped > 0;
  const cards: { t: string; d: string; href: string; cta: string }[] = [
    {
      t: `My Map — ${map.progress.mapped} of ${map.progress.total} mapped`,
      d: done ? "Your process picture so far." : "Start here: assess your key processes.",
      href: "/map", cta: done ? "Continue mapping →" : "Start mapping →",
    },
    {
      t: plan ? `My Plan — ${plan.summary.total} suggestions` : "My Plan",
      d: plan && plan.summary.total > 0
        ? `${plan.summary.now} now • ${plan.summary.later} later • ${plan.summary.future} future${plan.readiness ? ` • Level ${plan.readiness.level} ${plan.readiness.name}` : ""}`
        : "Appears once processes are mapped.",
      href: "/plan", cta: "Open My Plan →",
    },
    {
      t: `My Drive — ${driveCount} tool${driveCount === 1 ? "" : "s"}`,
      d: "Tools you use and decisions you track.",
      href: "/drive", cta: "Open My Drive →",
    },
  ];

  return (
    <div className="fade-in">
      <div className="card" style={{ background: "#F2F6FB" }}>
        <span className="badge-growth">YOUR DASHBOARD</span>
        <h2 style={{ margin: "8px 0 4px" }}>{map.business.name || "My Agency"}</h2>
        <p className="hint" style={{ margin: 0 }}>
          {done ? "Everything your agency has done, in one place." : "Finish your first process to unlock the full workspace."}
        </p>
      </div>
      {cards.map((c) => (
        <div key={c.t} className="card" style={{ padding: 16 }}>
          <b style={{ color: "#1A3A5C" }}>{c.t}</b>
          <p className="hint" style={{ margin: "4px 0 10px" }}>{c.d}</p>
          <Link href={c.href} className="btn-ghost" style={{ display: "block", textDecoration: "none", textAlign: "center", padding: 12 }}>{c.cta}</Link>
        </div>
      ))}
      <div className="card" style={{ textAlign: "center" }}>
        <Link href="/profile" style={{ color: "#1A56DB", fontSize: 14 }}>Account & agency profile →</Link>
      </div>
    </div>
  );
}
