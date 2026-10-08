"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import BottomNav from "../../components/BottomNav";

type Sel = {
  id: string; tool_id: string; tool_name: string; tool_description: string;
  website: string; tool_category: string; pricing_type: string; difficulty: string;
  capability_name: string | null; process_name: string | null; selected_at: string;
};

export default function DrivePage() {
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState("");
  const [tools, setTools] = useState<Sel[]>([]);

  function load() {
    setLoading(true);
    fetch("/api/drive")
      .then((r) => (r.status === 401 ? { needLogin: true } : r.json()))
      .then((j) => {
        if (!j) { setDenied("load"); return; }
        if (j.needLogin) { setDenied("login"); return; }
        if (!j.ok) { setDenied(j.error || "load"); return; }
        setTools(j.tools);
      })
      .catch(() => setDenied("load"))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function remove(toolId: string) {
    try {
      await fetch("/api/drive/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId }),
      });
      load();
    } catch {}
  }

  if (loading) return <div className="card"><p className="hint">Loading your drive...</p></div>;
  if (denied === "login") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>🚗 My Drive</h2>
        <p className="hint">Log in to see the tools you have chosen.</p>
        <Link href="/login" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Log in →</Link>
      </div>
    );
  }
  if (denied && denied !== "login") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>🚗 My Drive</h2>
        <p className="hint">{denied === "load" ? "We couldn't load your drive. Check your connection and retry." : denied}</p>
        <Link href="/business-profile" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Set up my business →</Link>
      </div>
    );
  }

  const groups: Record<string, Sel[]> = {};
  for (const t of tools) {
    const k = t.capability_name || "Chosen tools";
    (groups[k] || (groups[k] = [])).push(t);
  }

  return (
    <div className="fade-in">
      <ProgressBar step={5} />
      <div className="card">
        <h2>🚗 My Drive</h2>
        <p className="hint">{tools.length === 0 ? "Only tools you choose appear here." : `${tools.length} tool${tools.length === 1 ? "" : "s"} you chose.`}</p>
      </div>
      {tools.length === 0 && (
        <div className="card" style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: 4 }}>Your digital stack starts here.</h2>
          <p className="hint">As you explore your recommendations in My Plan, choose the tools that make sense for your business and they will appear here.</p>
          <Link href="/plan" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Explore My Plan →</Link>
        </div>
      )}
      {Object.entries(groups).map(([cap, list]) => (
        <div key={cap}>
          <h2 style={{ margin: "18px 0 4px" }}>{cap}</h2>
          {list.map((t) => (
            <div className="card" key={t.id}>
              <b style={{ fontSize: 16 }}>{t.tool_name}</b>
              <p className="hint" style={{ margin: "4px 0" }}>
                Used for: {t.process_name || t.tool_category} • Selected {new Date(t.selected_at).toLocaleDateString()}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {t.website && <a href={t.website} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", padding: 12, borderRadius: 12, border: "1px solid #E6EAF0", color: "#1A56DB", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Open site</a>}
                <Link href="/plan" style={{ flex: 1, textAlign: "center", padding: 12, borderRadius: 12, border: "1px solid #E6EAF0", color: "#1A56DB", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>View in Plan</Link>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => remove(t.tool_id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <BottomNav />
    </div>
  );
}
