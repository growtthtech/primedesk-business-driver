"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import BottomNav from "../../components/BottomNav";
import WorkspacePreview from "../../components/WorkspacePreview";

const MAP_SAMPLE_AREAS = [
  { name: "Business Development", done: "9 of 15 mapped", tone: "#1A56DB" },
  { name: "Client Management", done: "6 of 15 mapped", tone: "#E8590C" },
  { name: "Service Delivery", done: "4 of 18 mapped", tone: "#1B7A3D" },
];

export default function MapPage() {
  const router = useRouter();
  const [gate, setGate] = useState<"checking" | "in" | "preview" | "setup">("checking");

  // Gate: server-verified agency profile only. Logged-out visitors see the
  // public preview — never another agency's data, no legacy side doors.
  useEffect(() => {
    fetch("/api/business")
      .then((r) => (r.status === 401 ? { loggedOut: true } : r.json()))
      .then((j) => {
        if (!j || j.loggedOut) { setGate("preview"); return; }
        if (j.ok && j.business) setGate("in");
        else if (j.ok) setGate("setup");
        else setGate("preview");
      })
      .catch(() => setGate("preview"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const allowed = gate === "in";
  const [mapData, setMapData] = useState<{ business: { name: string }; progress: { mapped: number; total: number }; areas: { id: string; name: string; description: string; processes: { id: string; name: string; description: string; status: string; relevance: string; key: boolean }[] }[]; hidden: { id: string; name: string }[]; pendingQuestions: { trait: string; question: string }[] } | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggleArea(id: string) {
    setExpanded((cur) => ({ ...cur, [id]: !cur[id] }));
  }

  function loadMap() {
    fetch("/api/my-map")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j?.ok) setMapData(j); })
      .catch(() => {});
  }

  useEffect(() => { if (allowed) loadMap(); }, [allowed]);

  const statusPill: Record<string, string> = { not_started: "pill-todo", in_progress: "pill-progress", mapped: "pill-mapped" };
  const statusWord: Record<string, string> = { not_started: "Not Started", in_progress: "In Progress", mapped: "Mapped" };

  async function startProcess(pid: string) {
    router.push(`/map/${pid}`);
  }

  async function answerTrait(trait: string, answer: boolean | null) {
    try {
      await fetch("/api/my-map/traits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ trait, answer }) });
    } catch {}
    loadMap();
  }

  async function hideProcess(pid: string, hide: boolean) {
    try {
      await fetch("/api/my-map/hide", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ processId: pid, hide }) });
    } catch {}
    loadMap();
  }

  if (gate === "checking") return <div className="card"><p className="hint">Loading your map...</p></div>;

  if (gate === "preview") {
    return (
      <WorkspacePreview
        eyebrow="MY MAP — SAMPLE PREVIEW"
        title="Know where your agency stands."
        copy="My Map turns how work flows through your agency into a clear picture — which processes are mapped, which are in progress, and which areas need attention first."
        next="/map"
        primaryLabel="Start My Map"
        sample={
          <div>
            {MAP_SAMPLE_AREAS.map((a) => (
              <div key={a.name} style={{ border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <b>{a.name}</b>
                  <span className="pill pill-progress">{a.done}</span>
                </div>
                <div style={{ background: "#F2F4F7", borderRadius: 8, height: 8, marginTop: 8 }}>
                  <div style={{ background: a.tone, width: "45%", height: 8, borderRadius: 8 }} />
                </div>
              </div>
            ))}
            <p className="hint" style={{ margin: "8px 0 0" }}>Fictional example agency — your map reflects your own processes.</p>
          </div>
        }
      />
    );
  }

  if (gate === "setup") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>Set up your agency first</h2>
        <p className="hint">My Map is built from your agency profile — services, operating model, and priorities.</p>
        <Link href="/business-profile" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Set up my agency →</Link>
      </div>
    );
  }

  if (!allowed) return null;

  return (
    <div className="fade-in">
      <ProgressBar step={4} />
      {mapData && (
        <div className="card">
          <h2>My Map — {mapData.business.name || "My Agency"}</h2>
          <p className="hint">Where your agency stands. Start a process to map it properly.</p>
          {mapData.pendingQuestions.length > 0 && (
            <div style={{ background: "#F8FAFD", border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
              <b>Quick check — helps us show only what fits:</b>
              {mapData.pendingQuestions.slice(0, 3).map((q) => (
                <div key={q.trait} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "8px 0" }}>
                  <span style={{ fontSize: 14 }}>{q.question}</span>
                  <span style={{ display: "flex", gap: 6, whiteSpace: "nowrap" }}>
                    <button className="btn-ghost" style={{ width: 56, padding: 8 }} onClick={() => answerTrait(q.trait, true)}>Yes</button>
                    <button className="btn-ghost" style={{ width: 56, padding: 8 }} onClick={() => answerTrait(q.trait, false)}>No</button>
                    <button className="btn-ghost" style={{ width: 76, padding: 8, border: 0, background: "transparent", color: "#1A56DB" }} onClick={() => answerTrait(q.trait, null)}>Not sure</button>
                  </span>
                </div>
              ))}
            </div>
          )}
          {mapData.areas.map((a) => {
            const keyProcs = a.processes.filter((p) => p.key);
            const extra = a.processes.filter((p) => !p.key);
            const shown = expanded[a.id] ? a.processes : keyProcs.length > 0 ? keyProcs : a.processes;
            return (
            <div key={a.id} style={{ marginTop: 12 }}>
              <b>{a.name}</b>
              <p className="hint" style={{ margin: "2px 0 8px" }}>{a.processes.length} relevant process{a.processes.length === 1 ? "" : "es"}{extra.length > 0 && !expanded[a.id] && keyProcs.length > 0 ? ` — showing ${keyProcs.length} key for growth` : ""}</p>
              {shown.map((p) => (
                <div key={p.id} style={{ border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <b>{p.name}</b>
                    <span className={`pill ${statusPill[p.status] || "pill-todo"}`}>{statusWord[p.status] || p.status}</span>
                  </div>
                  <p className="hint" style={{ margin: "4px 0 8px" }}>{p.description}</p>
                  <button className="btn-ghost" style={{ padding: 10 }} onClick={() => startProcess(p.id)}>
                    {p.status === "mapped" ? "Review →" : p.status === "in_progress" ? "Continue →" : "Start →"}
                  </button>
                  {p.relevance === "possible" && p.status === "not_started" && (
                    <button onClick={() => hideProcess(p.id, true)} style={{ display: "block", width: "100%", border: 0, background: "transparent", color: "#7A8699", fontSize: 13, padding: 6, cursor: "pointer" }}>
                      Not for me — hide
                    </button>
                  )}
                </div>
              ))}
              {extra.length > 0 && keyProcs.length > 0 && (
                <button onClick={() => toggleArea(a.id)} style={{ border: 0, background: "transparent", color: "#1A56DB", fontSize: 13, cursor: "pointer", padding: "4px 0" }}>
                  {expanded[a.id] ? "Show key processes only ▲" : `Show all ${a.processes.length} processes ▼`}
                </button>
              )}
            </div>
            );
          })}
          {mapData.hidden.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <button onClick={() => setShowHidden(!showHidden)} style={{ border: 0, background: "transparent", color: "#1A56DB", fontSize: 13, cursor: "pointer" }}>
                {showHidden ? "Hide hidden processes" : `Show ${mapData.hidden.length} hidden process${mapData.hidden.length === 1 ? "" : "es"}`}
              </button>
              {showHidden && mapData.hidden.map((h) => (
                <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                  <span style={{ fontSize: 14, color: "#7A8699" }}>{h.name}</span>
                  <button onClick={() => hideProcess(h.id, false)} style={{ border: 0, background: "transparent", color: "#1A56DB", fontSize: 13, cursor: "pointer" }}>Restore</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <BottomNav />
    </div>
  );
}
