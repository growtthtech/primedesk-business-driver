"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, SIZES, YEARS, OPERATING_MODELS, PRIORITIES, validateProfile, normalizeCategory, normalizeSubtype } from "../../lib/business-categories";

export default function BusinessProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [size, setSize] = useState("");
  const [years, setYears] = useState("");
  const [operatingModel, setOperatingModel] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [techUsage, setTechUsage] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [allServices, setAllServices] = useState<{ id: string; name: string }[]>([]);
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/business-model")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j?.ok) setAllServices(j.services || []); })
      .catch(() => {});
    fetch("/api/business")
      .then((r) => (r.status === 401 ? router.push("/login") : r.json()))
      .then((j) => {
        if (!j || !j.ok) { setMsg(j?.error || "We couldn't load your business information. Please try again."); return; }
        if (j.business) {
          setName(j.business.name || "");
          setCategory(normalizeCategory(j.business.category || ""));
          setSubtype(normalizeSubtype(j.business.subtype || ""));
          setServices(j.business.services || []);
          setSize(j.business.size || "");
          setYears(j.business.years || "");
          setOperatingModel(j.business.operatingModel || "");
          setPriorities(j.business.priorities || []);
          setTechUsage(j.business.techUsage || "");
          setIsNew(false);
        }
      })
      .catch(() => setMsg("No connection. Check your internet and retry."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pickCategory(c: string) {
    setCategory(c);
    setSubtype(""); // subtypes always follow the category
    if (c !== "Digital Marketing Agency") setServices([]);
  }

  function toggleService(id: string) {
    setServices((cur) => (cur.includes(id) ? cur.filter((s) => s !== id) : [...cur, id]));
  }

  function togglePriority(p: string) {
    setPriorities((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p].slice(0, 6)));
  }

  async function save() {
    const err = validateProfile({ name, category, subtype, size, years, operatingModel, priorities, techUsage });
    if (err) { setMsg(err); return; }
    setBusy(true); setMsg("Saving...");
    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, subtype, size, years, services, operatingModel, priorities, techUsage }),
      });
      const j = await res.json();
      if (!j.ok) { setMsg(j.error || "We couldn't save your business information. Please try again."); return; }
      setIsNew(false);
      setMsg("Saved ✓");
    } catch {
      setMsg("No connection. Check your internet and retry.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="card"><p className="hint">Loading your business...</p></div>;

  const subs = category ? CATEGORIES[category] || [] : [];

  return (
    <div className="fade-in">
      <div className="card">
        <h2>{isNew ? "Tell us about your business" : "Your business profile"}</h2>
        <p className="hint">This helps PrimeDesk show only processes and tools that fit you.</p>
        <label>Business name<br /><input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Glow Hair Studio" maxLength={120} /></label>
        <div style={{ height: 10 }} />
        <label>Business category<br />
          <select className="field" value={category} onChange={(e) => pickCategory(e.target.value)}>
            <option value="">Choose...</option>
            {Object.keys(CATEGORIES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <div style={{ height: 10 }} />
        {subs.length > 0 && (
          <>
            <label>Which one fits best?<br />
              <select className="field" value={subtype} onChange={(e) => setSubtype(e.target.value)}>
                <option value="">Choose...</option>
                {subs.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <div style={{ height: 10 }} />
          </>
        )}
        {category === "Other" && (
          <>
            <label>Describe your business<br /><input className="field" value={subtype} onChange={(e) => setSubtype(e.target.value)} placeholder="e.g. POS and phone accessories kiosk" maxLength={120} /></label>
            <div style={{ height: 10 }} />
          </>
        )}
        {category === "Digital Marketing Agency" && allServices.length > 0 && (
          <>
            <label>Which services do you offer? (pick all that apply)<br /></label>
            {allServices.map((s) => {
              const on = services.includes(s.id);
              return (
                <button key={s.id} onClick={() => toggleService(s.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: 12, borderRadius: 10, margin: "6px 0", border: on ? "2px solid #1A56DB" : "1px solid #E6EAF0", background: on ? "#EDF3FE" : "#fff", fontWeight: on ? 700 : 400, cursor: "pointer", fontSize: 15 }}>
                  {on ? "✓ " : ""}{s.name}
                </button>
              );
            })}
            <div style={{ height: 10 }} />
          </>
        )}
        <label>Business size<br />
          <select className="field" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Choose...</option>
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <div style={{ height: 10 }} />
        <label>Years operating<br />
          <select className="field" value={years} onChange={(e) => setYears(e.target.value)}>
            <option value="">Choose...</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <div style={{ height: 10 }} />
        <label>How do you work? (optional)<br />
          <select className="field" value={operatingModel} onChange={(e) => setOperatingModel(e.target.value)}>
            <option value="">Choose...</option>
            {OPERATING_MODELS.map((m) => <option key={m} value={m}>{m === "Solo" ? "Solo (just me)" : m}</option>)}
          </select>
        </label>
        <div style={{ height: 10 }} />
        <label>What should improve most? (pick up to 6)<br /></label>
        {PRIORITIES.map((p) => {
          const on = priorities.includes(p);
          return (
            <button key={p} onClick={() => togglePriority(p)} style={{ display: "block", width: "100%", textAlign: "left", padding: 12, borderRadius: 10, margin: "6px 0", border: on ? "2px solid #1A56DB" : "1px solid #E6EAF0", background: on ? "#EDF3FE" : "#fff", fontWeight: on ? 700 : 400, cursor: "pointer", fontSize: 15 }}>
              {on ? "✓ " : ""}{p}
            </button>
          );
        })}
        <div style={{ height: 10 }} />
        <label>What technology do you use today? (optional)<br />
          <textarea className="field" rows={3} value={techUsage} onChange={(e) => setTechUsage(e.target.value)} placeholder="e.g. WhatsApp, notebook, Google Sheets..." maxLength={1000} />
        </label>
        <div style={{ height: 12 }} />
        <button className="btn-primary" disabled={busy} onClick={save}>{busy ? "Saving..." : isNew ? "Save and continue →" : "Save changes"}</button>
        {msg && <p className="hint" style={{ marginTop: 10 }}>{msg}</p>}
      </div>

      {!isNew && (
        <div className="card card-growth">
          <span className="badge-growth">🌱 FIRST STEP DONE</span>
          <h2 style={{ marginBottom: 4 }}>Understand How Your Business Works</h2>
          <p className="hint">PrimeDesk will help you understand how your business currently operates, identify areas that can be improved, and find digital tools that fit your business.</p>
          <button className="btn-primary" onClick={() => router.push("/map")}>Start Mapping My Business →</button>
          <Link href="/drive" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>or open My Drive</Link>
        </div>
      )}
    </div>
  );
}
