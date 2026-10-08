"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, SIZES, YEARS, validateProfile, normalizeCategory, normalizeSubtype } from "../../lib/business-categories";

export default function BusinessProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [size, setSize] = useState("");
  const [years, setYears] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    fetch("/api/business")
      .then((r) => (r.status === 401 ? router.push("/login") : r.json()))
      .then((j) => {
        if (!j || !j.ok) { setMsg(j?.error || "We couldn't load your business information. Please try again."); return; }
        if (j.business) {
          setName(j.business.name || "");
          setCategory(normalizeCategory(j.business.category || ""));
          setSubtype(normalizeSubtype(j.business.subtype || ""));
          setSize(j.business.size || "");
          setYears(j.business.years || "");
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
  }

  async function save() {
    const err = validateProfile({ name, category, subtype, size, years });
    if (err) { setMsg(err); return; }
    setBusy(true); setMsg("Saving...");
    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, subtype, size, years }),
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
