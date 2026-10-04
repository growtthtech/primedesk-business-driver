"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../components/ProgressBar";
import BottomNav from "../../components/BottomNav";
import { loadState, saveState } from "../../lib/store";
import { getLevel } from "../../lib/brain";
import booking from "../../rules/booking.json";
import orders from "../../rules/orders.json";
import followup from "../../rules/followup.json";

const templates: Record<string, any> = { booking, orders, followup };

export default function PlanPage() {
  const router = useRouter();
  const [biz, setBiz] = useState(() => loadState());
  const tpl = templates[biz.templateKey] || booking;
  const lv = getLevel(biz.how || "");

  function tick(tool: string) {
    const tools = { ...biz.tools };
    tools[tool] = tools[tool] === "yes" ? "later" : "yes";
    const next = { ...biz, tools, level: lv.level, levelWhy: lv.why };
    setBiz(next);
    saveState(next);
  }

  function build() {
    saveState({ ...biz, level: lv.level, levelWhy: lv.why });
    router.push("/home");
  }

  return (
    <div className="fade-in">
      <ProgressBar step={5} />
      <div className="card">
        <h2>You don&apos;t need everything at once</h2>
        <p><b>Your level: {lv.level}</b></p>
        <p className="hint">Why? {lv.why}</p>
        <p className="hint">Advice: start with essentials. Tick what you already use.</p>
      </div>

      <div className="card card-action">
        <span className="badge-action">⚡ START NOW — Do this today</span>
        <div style={{ height: 8 }} />
        {tpl.startNow.map((t: string) => (
          <label key={t} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0", cursor: "pointer" }}>
            <input type="checkbox" checked={biz.tools[t] === "yes"} onChange={() => tick(t)} style={{ width: 20, height: 20 }} />
            <span>✓ {t}</span>
          </label>
        ))}
        <button className="btn-action" onClick={build}>Start Now → Build My System</button>
      </div>

      <div className="card">
        <b>NEXT WHEN YOU GROW</b>
        {tpl.next.map((t: string) => (
          <p key={t} style={{ margin: "6px 0" }}>○ {t}</p>
        ))}
        <p className="hint">Add when chats pass ~30/week or you miss bookings.</p>
      </div>

      <div className="card card-growth">
        <span className="badge-growth">🌱 LATER — Ignore for now</span>
        {tpl.later.map((t: string) => (
          <p key={t} style={{ margin: "6px 0" }}>○ {t}</p>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
