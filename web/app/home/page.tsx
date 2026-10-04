"use client";
import { useState } from "react";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import BottomNav from "../../components/BottomNav";
import { loadState, saveState, clearState } from "../../lib/store";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const order = ["Waiting", "Done", "Stuck"];
const pill: Record<string, string> = { Waiting: "pill-waiting", Done: "pill-done", Stuck: "pill-stuck" };

export default function HomePage() {
  const router = useRouter();
  const [biz, setBiz] = useState(() => loadState());
  const [tab, setTab] = useState(1);

  function cycle(stage: string) {
    const cur = biz.statuses[stage] || "Waiting";
    const next = order[(order.indexOf(cur) + 1) % order.length];
    const s = { ...biz, statuses: { ...biz.statuses, [stage]: next } };
    setBiz(s);
    saveState(s);
  }

  const { data: session } = authClient.useSession();
  useEffect(() => {}, [session]);
  const stuck = biz.stages.filter((s) => (biz.statuses[s] || "Waiting") === "Stuck").length;
  const done = biz.stages.filter((s) => (biz.statuses[s] || "Waiting") === "Done").length;

  const banner = !session ? (
    <div style={{ background: "#FFF7F0", border: "1.5px solid #E8590C", borderRadius: 12, padding: 12, marginBottom: 8 }}>
      🚗 <b>Riding as guest.</b> <Link href="/login">Log in</Link> to keep this trip saved on every phone.
    </div>
  ) : null;

  return (
    <div className="fade-in">
      <ProgressBar step={5} />
      {banner}
      <div className="card">
        <h2>{biz.name || "My Business"} Home</h2>
        <p className="hint">{done} Done • {stuck} Stuck{stuck > 0 ? ` — ${stuck} stage${stuck > 1 ? "s need" : " needs"} attention` : " — all calm"}</p>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {["Process", "Tools", "Growth"].map((t, i) => (
            <button key={t} onClick={() => setTab(i + 1)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #E6EAF0", background: tab === i + 1 ? "#1A56DB" : "#F2F4F7", color: tab === i + 1 ? "#fff" : "#1A3A5C", fontWeight: tab === i + 1 ? 800 : 400, cursor: "pointer" }}>{t}</button>
          ))}
        </div>
      </div>

      {tab === 1 && (
        <div className="card">
          <b>My Process — tap a pill to change status</b>
          {biz.stages.length === 0 && <p className="hint">No process yet. <Link href="/start">Start here →</Link></p>}
          {biz.stages.map((s) => (
            <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F0F2F5" }}>
              <span>{s}</span>
              <span className={`pill ${pill[biz.statuses[s] || "Waiting"]}`} onClick={() => cycle(s)}>{biz.statuses[s] || "Waiting"}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div className="card">
          <b>My Tools</b>
          {Object.keys(biz.tools).length === 0 && <p className="hint">Nothing ticked yet — <Link href="/plan">pick your Start Now tools →</Link></p>}
          {Object.entries(biz.tools).map(([t, v]) => (
            <p key={t} style={{ margin: "6px 0" }}>{v === "yes" ? "✓ In use: " : "○ Later: "}{t}</p>
          ))}
        </div>
      )}

      {tab === 3 && (
        <div className="card card-growth">
          <span className="badge-growth">🌱 MY GROWTH PATH</span>
          <div style={{ borderLeft: "3px solid #34A853", marginLeft: 8, paddingLeft: 16, marginTop: 12 }}>
            <p><b>TODAY ✓</b><br />WhatsApp + List + Payment — solid foundation.</p>
            <p><b>NEXT — Keep growing</b><br />List + Scheduling when chats pass ~30/week.</p>
            <p><b>FUTURE — Flourish</b><br />CRM + automation when follow-up gets hard.</p>
          </div>
        </div>
      )}

      <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => { clearState(); router.push("/start"); }}>+ Start new process</button>
      <BottomNav />
    </div>
  );
}
