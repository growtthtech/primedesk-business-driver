"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../components/ProgressBar";
import { loadState, saveState } from "../../lib/store";
import booking from "../../rules/booking.json";
import orders from "../../rules/orders.json";
import followup from "../../rules/followup.json";

const templates: Record<string, any> = { booking, orders, followup };

export default function StartPage() {
  const router = useRouter();
  const [sub, setSub] = useState(1);
  const [biz, setBiz] = useState(() => loadState());

  function pick(key: string) {
    const next = { ...biz, templateKey: key, stages: [...templates[key].stages] };
    setBiz(next);
    saveState(next);
    setSub(3);
  }

  function goMap() {
    saveState(biz);
    router.push("/map");
  }

  return (
    <div className="fade-in">
      <ProgressBar step={sub} />

      {sub === 1 && (
        <div className="card">
          <h2>Tell us about your business</h2>
          <p className="hint">Takes 1 minute. Start where you are.</p>
          <label>Business name<br /><input className="field" value={biz.name} onChange={(e) => setBiz({ ...biz, name: e.target.value })} placeholder="e.g. Glow Hair Studio" /></label>
          <div style={{ height: 10 }} />
          <label>What do you do?<br />
            <select className="field" value={biz.type} onChange={(e) => setBiz({ ...biz, type: e.target.value })}>
              <option>Beauty / Wellness</option>
              <option>Food Vendor</option>
              <option>Fashion / Retail Vendor</option>
              <option>Home Services / Repairs</option>
              <option>Tutoring / Training</option>
              <option>Other service</option>
            </select>
          </label>
          <div style={{ height: 10 }} />
          <label>How do you work today?<br />
            <select className="field" value={biz.how} onChange={(e) => setBiz({ ...biz, how: e.target.value })}>
              <option>Mostly manual / paper / chat</option>
              <option>I use a few tools like WhatsApp + notebook</option>
              <option>I use many tools but they are not connected</option>
              <option>Not sure</option>
            </select>
          </label>
          <div style={{ height: 10 }} />
          <label>Team size<br />
            <select className="field" value={biz.size} onChange={(e) => setBiz({ ...biz, size: e.target.value })}>
              <option>1-2</option><option>3-10</option><option>11-20</option>
            </select>
          </label>
          <div style={{ height: 12 }} />
          <button className="btn-primary" onClick={() => { saveState(biz); setSub(2); }}>Continue →</button>
        </div>
      )}

      {sub === 2 && (
        <div className="card">
          <h2>What do you want to improve first?</h2>
          <p className="hint">Pick ONE. You can add more later.</p>
          {(Object.keys(templates) as string[]).map((k) => (
            <button key={k} className="btn-ghost" style={{ marginTop: 8 }} onClick={() => pick(k)}>
              <b>{templates[k].title}</b><br /><small>{templates[k].subtitle}</small>
            </button>
          ))}
          <button className="btn-ghost" style={{ marginTop: 8, border: 0, background: "transparent" }} onClick={() => setSub(1)}>← Back</button>
        </div>
      )}

      {sub === 3 && (
        <div className="card">
          <h2>How does this work today?</h2>
          <p className="hint">Write like chatting. Example: “Clients DM on WhatsApp, I send price, they transfer, I book in notebook.”</p>
          <textarea className="field" rows={5} value={biz.raw} onChange={(e) => setBiz({ ...biz, raw: e.target.value })} placeholder="Type how orders/bookings flow today..." />
          <div style={{ height: 12 }} />
          <button className="btn-primary" onClick={goMap}>Build My Process →</button>
          <button className="btn-ghost" style={{ marginTop: 8, border: 0, background: "transparent" }} onClick={() => setSub(2)}>← Back</button>
        </div>
      )}
    </div>
  );
}
