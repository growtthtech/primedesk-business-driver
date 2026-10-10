"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import BottomNav from "../../components/BottomNav";

type Rec = {
  id: string; process_id: string; process_name: string; stage: string;
  reason: string; relevance: number; covered_note: string; capability_id: string;
  rec_kind: string; practice_title: string;
  capability_name: string; tool_id: string | null; tool_name: string | null;
  tool_description: string | null; website: string | null; tool_category: string | null;
  pricing_type: string | null; free_plan: boolean | null; difficulty: string | null;
  best_for: string | null; in_drive: boolean;
  limitations: string | null; alternatives: string[];
};

const stagePill: Record<string, string> = { now: "pill-progress", later: "pill-waiting", future: "pill-todo" };
const stageWord: Record<string, string> = { now: "NOW", later: "LATER", future: "FUTURE" };

function RecCard({ r, onChange }: { r: Rec; onChange: () => void }) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const alts = Array.isArray(r.alternatives) ? r.alternatives.filter((a) => a && a !== r.tool_name) : [];
  async function toggle() {
    setBusy(true);
    try {
      await fetch(r.in_drive ? "/api/drive/remove" : "/api/drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r.in_drive ? { toolId: r.tool_id } : { toolId: r.tool_id, recommendationId: r.id }),
      });
      onChange();
    } catch {}
    setBusy(false);
  }
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <b style={{ fontSize: 16 }}>{r.tool_name}</b>
        <span className={`pill ${stagePill[r.stage] || "pill-todo"}`}>{stageWord[r.stage] || r.stage}</span>
      </div>
      {r.best_for && <p style={{ margin: "6px 0 0", fontSize: 14 }}><b>Best for:</b> {r.best_for}</p>}
      <p className="hint" style={{ margin: "6px 0" }}><b>Why PrimeDesk recommends it:</b> {r.reason}</p>
      <p className="hint" style={{ margin: "0 0 6px" }}>
        From: {r.process_name} → {r.capability_name} • {r.pricing_type}
        {r.free_plan ? " (free plan)" : ""} • {r.difficulty}
      </p>
      {(r.limitations || alts.length > 0) && (
        <button onClick={() => setOpen(!open)} style={{ border: 0, background: "transparent", color: "#1A56DB", fontSize: 13, padding: "4px 0", cursor: "pointer" }}>
          {open ? "Hide trade-offs ▲" : "See trade-offs & alternatives ▼"}
        </button>
      )}
      {open && (
        <div style={{ background: "#F8FAFD", borderRadius: 10, padding: 10, margin: "6px 0" }}>
          {r.limitations && <p className="hint" style={{ margin: "0 0 4px" }}><b>Trade-off:</b> {r.limitations}</p>}
          {alts.length > 0 && <p className="hint" style={{ margin: 0 }}><b>Alternatives:</b> {alts.join(", ")}</p>}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        {r.website && <a href={r.website} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", padding: 12, borderRadius: 12, border: "1px solid #E6EAF0", color: "#1A56DB", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Learn More</a>}
        <button className={r.in_drive ? "btn-ghost" : "btn-action"} style={{ flex: 2 }} disabled={busy} onClick={toggle}>
          {r.in_drive ? "✓ Added to My Drive" : "Add to My Drive"}
        </button>
      </div>
    </div>
  );
}

export default function PlanPage() {
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState("");
  const [summary, setSummary] = useState({ total: 0, now: 0, later: 0, future: 0 });
  const [readiness, setReadiness] = useState<{ level: number; name: string; explanation: string } | null>(null);
  const [groups, setGroups] = useState<Record<string, Rec[]>>({ now: [], later: [], future: [] });

  function load() {
    setLoading(true);
    fetch("/api/plan")
      .then((r) => (r.status === 401 ? { needLogin: true } : r.json()))
      .then((j) => {
        if (!j) { setDenied("load"); return; }
        if (j.needLogin) { setDenied("login"); return; }
        if (!j.ok) { setDenied(j.error || "load"); return; }
        setSummary(j.summary);
        setReadiness(j.readiness || null);
        setGroups(j.groups);
      })
      .catch(() => setDenied("load"))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  if (loading) return <div className="card"><p className="hint">Building your plan...</p></div>;
  if (denied === "login") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>Your plan lives here</h2>
        <p className="hint">Log in to see digital tools matched to your mapped processes.</p>
        <Link href="/login" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Log in →</Link>
      </div>
    );
  }
  if (denied && denied !== "login") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>My Plan</h2>
        <p className="hint">{denied === "load" ? "We couldn't build your plan. Check your connection and retry." : denied}</p>
        <Link href="/business-profile" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Set up my business →</Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <ProgressBar step={5} />
      <div className="card card-action">
        <span className="badge-action">⚡ YOUR DIGITAL IMPROVEMENT PLAN</span>
        {summary.total === 0 ? (
          <>
            <h2 style={{ marginBottom: 4 }}>You&apos;re doing fine for now.</h2>
            <p style={{ color: "#8A4A1B", margin: 0 }}>We didn&apos;t identify a digital tool you need at this stage. Keep using your current process and review it as you grow. <Link href="/map">Continue mapping →</Link></p>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: 4 }}>We found {summary.total} place{summary.total === 1 ? "" : "s"} digital tools may help.</h2>
            <p style={{ color: "#8A4A1B", margin: 0 }}><b>{summary.now}</b> now • <b>{summary.later}</b> later • <b>{summary.future}</b> for future growth</p>
          </>
        )}
      </div>

      {readiness && (
        <div className="card card-growth" style={{ marginTop: 12 }}>
          <span className="badge-growth">📶 YOUR DIGITAL READINESS: LEVEL {readiness.level} — {readiness.name.toUpperCase()}</span>
          <p className="hint" style={{ margin: "8px 0 0" }}>{readiness.explanation}</p>
        </div>
      )}

      {(["now", "later", "future"] as const).map((s) => (
        groups[s].length > 0 && (
          <div key={s}>
            <h2 style={{ margin: "18px 0 4px" }}>{s === "now" ? "⚡ NOW — consider first" : s === "later" ? "🌱 LATER — as you grow" : "🔭 FUTURE — when mature"}</h2>
            {groups[s].map((r) => r.tool_id ? (
              <RecCard key={r.id} r={r} onChange={load} />
            ) : r.rec_kind === "practice" ? (
              <div className="card card-growth" key={r.id}>
                <span className="badge-growth">🛠 PRACTICE — NO PURCHASE NEEDED</span>
                <p style={{ margin: "8px 0 4px" }}><b>{r.practice_title}</b></p>
                <p className="hint" style={{ margin: "0 0 6px" }}>{r.covered_note}</p>
                <p className="hint" style={{ margin: 0 }}>Why: {r.reason}</p>
                <p className="hint" style={{ margin: "4px 0 0" }}>From: {r.process_name}</p>
              </div>
            ) : (
              <div className="card card-growth" key={r.id}>
                <b>{r.capability_name}</b>
                <p className="hint" style={{ margin: "6px 0" }}>{r.covered_note}</p>
                <p className="hint" style={{ margin: 0 }}>From: {r.process_name}</p>
              </div>
            ))}
          </div>
        )
      ))}
      <BottomNav />
    </div>
  );
}
