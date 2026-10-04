"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import BottomNav from "../../components/BottomNav";
import { loadState, saveState } from "../../lib/store";

export default function MapPage() {
  const router = useRouter();
  const [biz, setBiz] = useState(() => {
    const s = loadState();
    if (s.stages.length === 0) {
      s.stages = ["Enquiry (WhatsApp)", "Price / Quote", "Payment (Transfer)", "Book Time", "Do Service", "Follow-up"];
    }
    return s;
  });
  const [fresh, setFresh] = useState("");
  const [saved, setSaved] = useState("");

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
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...next, level: next.level || "ORGANIZE" }),
      });
      const j = await res.json();
      setSaved(j.ok ? "Saved ✓" : "Saved on this phone (server busy)");
    } catch {
      setSaved("Saved on this phone ✓ (will sync later)");
    }
    setTimeout(() => router.push("/plan"), 600);
  }

  return (
    <div className="fade-in">
      <ProgressBar step={4} />
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
