"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import BottomNav from "../../components/BottomNav";
import { loadState, saveState } from "../../lib/store";

export default function MapPage() {
  const router = useRouter();
  const [biz, setBiz] = useState(() => loadState());
  const [allowed, setAllowed] = useState(false);

  // Gate: only owners who started (/start) may see the map.
  useEffect(() => {
    if (!biz.started || biz.stages.length === 0) router.push("/start");
    else setAllowed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [fresh, setFresh] = useState("");
  const [saved, setSaved] = useState("");
  const [mapData, setMapData] = useState<{ business: { name: string }; areas: { id: string; name: string; description: string; processes: { id: string; name: string; description: string; status: string; relevance: string }[] }[]; pendingQuestions: { trait: string; question: string }[] } | null>(null);

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

  async function answerTrait(trait: string, answer: boolean) {
    try {
      await fetch("/api/my-map/traits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ trait, answer }) });
    } catch {}
    loadMap();
  }

  function update(i: number, v: string) {
    const stages = [...biz.stages];
    stages[i] = v;
    setBiz({ ...biz, stages });
  }

  async function confirm() {
    const next = { ...biz };
    saveState(next);
    setSaved("Saving...");
    try {
      // Attach owned business id when logged in (server verifies ownership).
      let businessId = "";
      try {
        const mine = await fetch("/api/business");
        if (mine.ok) {
          const mj = await mine.json();
          if (mj.ok && mj.business) businessId = mj.business.id;
        }
      } catch {}
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...next, businessId, level: next.level || "ORGANIZE" }),
      });
      const j = await res.json();
      setSaved(j.ok ? "Saved ✓" : "Saved on this phone (server busy)");
      // Phase C bridge: mark covered in-progress catalog processes as mapped.
      try {
        await fetch("/api/my-map/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateKey: next.templateKey }),
        });
      } catch {}
    } catch {
      setSaved("Saved on this phone ✓ (will sync later)");
    }
    setTimeout(() => router.push("/plan"), 600);
  }

  if (!allowed) return null;

  return (
    <div className="fade-in">
      <ProgressBar step={4} />
      {mapData && (
        <div className="card">
          <h2>🗺 My Map — {mapData.business.name || "My Business"}</h2>
          <p className="hint">Where your business stands. Start a process to map it properly.</p>
          {mapData.pendingQuestions.length > 0 && (
            <div style={{ background: "#F8FAFD", border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
              <b>Quick check — helps us show only what fits:</b>
              {mapData.pendingQuestions.slice(0, 3).map((q) => (
                <div key={q.trait} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "8px 0" }}>
                  <span style={{ fontSize: 14 }}>{q.question}</span>
                  <span style={{ display: "flex", gap: 6, whiteSpace: "nowrap" }}>
                    <button className="btn-ghost" style={{ width: 64, padding: 8 }} onClick={() => answerTrait(q.trait, true)}>Yes</button>
                    <button className="btn-ghost" style={{ width: 64, padding: 8 }} onClick={() => answerTrait(q.trait, false)}>No</button>
                  </span>
                </div>
              ))}
            </div>
          )}
          {mapData.areas.map((a) => (
            <div key={a.id} style={{ marginTop: 12 }}>
              <b>{a.name}</b>
              <p className="hint" style={{ margin: "2px 0 8px" }}>{a.processes.length} relevant process{a.processes.length === 1 ? "" : "es"}</p>
              {a.processes.map((p) => (
                <div key={p.id} style={{ border: "1px solid #E6EAF0", borderRadius: 12, padding: 12, margin: "8px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <b>{p.name}</b>
                    <span className={`pill ${statusPill[p.status] || "pill-todo"}`}>{statusWord[p.status] || p.status}</span>
                  </div>
                  <p className="hint" style={{ margin: "4px 0 8px" }}>{p.description}</p>
                  <button className="btn-ghost" style={{ padding: 10 }} onClick={() => startProcess(p.id)}>
                    {p.status === "mapped" ? "Review →" : p.status === "in_progress" ? "Continue →" : "Start →"}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="card">
        <h2>This is how your business works</h2>
        <p className="hint">Fix names until you can say: “Yes, this is my business.”</p>
        {biz.stages.map((s, i) => (
          <div key={i} className="fade-in" style={{ background: "#F8FAFD", border: "1.5px solid #C9D7EA", borderRadius: 14, padding: 10, margin: "8px 0", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: "#C8962E", fontWeight: 800 }}>{i + 1}</span>
            <input className="field" style={{ border: 0, background: "transparent", fontWeight: 600 }} value={s} onChange={(e) => update(i, e.target.value)} />
            <button onClick={() => setBiz({ ...biz, stages: biz.stages.filter((_, j) => j !== i) })} style={{ border: 0, background: "transparent", fontSize: 16, cursor: "pointer" }}>✕</button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8 }}>
          <input className="field" value={fresh} onChange={(e) => setFresh(e.target.value)} placeholder="+ Add stage e.g. Delivery" />
          <button className="btn-ghost" style={{ width: 90 }} onClick={() => { if (fresh.trim()) { setBiz({ ...biz, stages: [...biz.stages, fresh.trim()] }); setFresh(""); } }}>Add</button>
        </div>
        <div style={{ height: 12 }} />
        <button className="btn-primary" onClick={confirm}>Confirm — This is my process →</button>
        {saved && <p className="hint" style={{ marginTop: 8 }}>{saved}</p>}
        <Link href="/start" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>← Back</Link>
      </div>
      <BottomNav />
    </div>
  );
}
