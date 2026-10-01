"use client";
import { useState } from "react";
import booking from "../rules/booking.json";
import orders from "../rules/orders.json";
import followup from "../rules/followup.json";

const templates: Record<string, any> = { booking, orders, followup };

export default function Page() {
  const [step, setStep] = useState(1);
  const [biz, setBiz] = useState({ name: "", type: "Beauty / Wellness", how: "I use a few tools like WhatsApp + notebook", size: "3-10" });
  const [templateKey, setTemplateKey] = useState("booking");
  const [stages, setStages] = useState<string[]>([...booking.stages]);
  const [raw, setRaw] = useState("");
  const [tab, setTab] = useState(1);

  const tpl = templates[templateKey];

  function pick(key: string) {
    setTemplateKey(key);
    setStages([...templates[key].stages]);
    setStep(3);
  }

  return (
    <main>
      {step === 1 && (
        <div className="card">
          <h1 style={{ fontSize: 22 }}>Tell us about your business</h1>
          <p style={{ color: "#7A8699" }}>Takes 1 minute. Start where you are.</p>
          <label>Business name<br /><input value={biz.name} onChange={(e) => setBiz({ ...biz, name: e.target.value })} placeholder="e.g. Glow Hair Studio" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #E6EAF0" }} /></label>
          <div style={{ height: 8 }} />
          <label>Type<br /><select value={biz.type} onChange={(e) => setBiz({ ...biz, type: e.target.value })} style={{ width: "100%", padding: 12 }}><option>Beauty / Wellness</option><option>Food Vendor</option><option>Fashion / Retail Vendor</option><option>Home Services</option><option>Tutoring</option></select></label>
          <div style={{ height: 12 }} />
          <button className="btn-primary" onClick={() => setStep(2)}>Continue →</button>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h1 style={{ fontSize: 22 }}>What do you want to improve first?</h1>
          {(Object.keys(templates) as string[]).map((k) => (
            <button key={k} className="btn-ghost" style={{ marginTop: 8 }} onClick={() => pick(k)}>{templates[k].title}<br /><small>{templates[k].subtitle}</small></button>
          ))}
          <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => setStep(1)}>← Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h1 style={{ fontSize: 22 }}>How does this work today?</h1>
          <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={5} placeholder="Example: Clients DM on WhatsApp, I send price, they transfer, I book in notebook..." style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #E6EAF0" }} />
          <div style={{ height: 12 }} />
          <button className="btn-primary" onClick={() => setStep(4)}>Build My Process →</button>
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <h1 style={{ fontSize: 22 }}>This is how your business works</h1>
          {stages.map((s, i) => (
            <div key={i} style={{ background: "#F8FAFD", border: "1.5px solid #C9D7EA", borderRadius: 14, padding: 12, margin: "8px 0", display: "flex", justifyContent: "space-between" }}>
              <input value={s} onChange={(e) => { const c = [...stages]; c[i] = e.target.value; setStages(c); }} style={{ border: 0, background: "transparent", fontWeight: 600, width: "70%" }} />
              <button onClick={() => setStages(stages.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
          <button className="btn-ghost" onClick={() => setStages([...stages, "New stage"])}>+ Add stage</button>
          <div style={{ height: 8 }} />
          <button className="btn-primary" onClick={() => setStep(5)}>Confirm — This is my process →</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className="card card-action">
            <span style={{ background: "#E8590C", color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>⚡ START NOW — Do this today</span>
            <h3>Good for you today — don&apos;t delay</h3>
            <ul>{tpl.startNow.map((t: string) => <li key={t}>✓ {t}</li>)}</ul>
            <button className="btn-action" onClick={() => setStep(6)}>Start Now → Build My System</button>
          </div>
          <div className="card">
            <b>NEXT WHEN YOU GROW</b>
            <ul>{tpl.next.map((t: string) => <li key={t}>○ {t}</li>)}</ul>
          </div>
          <div className="card card-growth">
            <b>🌱 GROWTH PATH</b>
            <p>Today ✓ → Next → Future. Green = growth.</p>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="card">
          <h1 style={{ fontSize: 22 }}>{biz.name || "My Business"} Home</h1>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setTab(1)} style={{ fontWeight: tab === 1 ? 800 : 400 }}>My Process</button>
            <button onClick={() => setTab(2)} style={{ fontWeight: tab === 2 ? 800 : 400 }}>My Tools</button>
            <button onClick={() => setTab(3)} style={{ fontWeight: tab === 3 ? 800 : 400 }}>Growth</button>
          </div>
          {tab === 1 && <ul>{stages.map((s) => <li key={s}>{s} — Waiting ●</li>)}</ul>}
          {tab === 2 && <p>Ticked tools appear here (R2/ZeptoMail wired later).</p>}
          {tab === 3 && <p style={{ background: "#F2FBF4", padding: 12, borderRadius: 12 }}>Today ✓ → Next → Future</p>}
          <button className="btn-ghost" onClick={() => setStep(1)}>+ Start new</button>
        </div>
      )}
    </main>
  );
}
