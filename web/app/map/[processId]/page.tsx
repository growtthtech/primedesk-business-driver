"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProgressBar from "../../../components/ProgressBar";

type Q = {
  qkey: string; question: string; type: "single" | "multi" | "text" | "long" | "yesno";
  options: string[]; required: boolean; help: string; allow_other: boolean;
};
type A = { selected?: string[]; text?: string; other?: string };
type Summary = { process: string; workflow: string[]; tools: string[]; problems: string[]; need: string; noProblem: boolean };

export default function MappingPage({ params }: { params: { processId: string } }) {
  const router = useRouter();
  const pid = params.processId;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<string, A>>({});
  const [idx, setIdx] = useState(0);
  const [review, setReview] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/my-map/questions?processId=${encodeURIComponent(pid)}`)
      .then((r) => (r.status === 401 ? router.push("/login") : r.json()))
      .then((j) => {
        if (!j || !j.ok) { setMsg(j?.error || "We couldn't load those questions. Please try again."); return; }
        setName(j.process.name);
        setIntro(j.process.description);
        setQuestions(j.questions);
        setAnswers(j.answers || {});
        if (j.status === "mapped") {
          complete(true);
          return;
        }
      })
      .catch(() => setMsg("No connection. Check your internet and retry."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setAns(qkey: string, a: A) {
    setAnswers((cur) => ({ ...cur, [qkey]: a }));
  }

  function toggle(q: Q, opt: string) {
    const cur = answers[q.qkey]?.selected || [];
    if (q.type === "single" || q.type === "yesno") setAns(q.qkey, { ...answers[q.qkey], selected: [opt] });
    else setAns(q.qkey, { ...answers[q.qkey], selected: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] });
  }

  async function saveDraft() {
    try {
      await fetch("/api/my-map/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ processId: pid, answers }),
      });
    } catch {}
  }

  async function next() {
    setMsg("");
    await saveDraft();
    if (idx + 1 >= questions.length) setReview(true);
    else setIdx(idx + 1);
  }

  async function complete(silent?: boolean) {
    if (!silent) { setBusy(true); setMsg("Saving..."); }
    try {
      await saveDraft();
      const res = await fetch("/api/my-map/complete-mapping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ processId: pid }),
      });
      const j = await res.json();
      if (!j.ok) { setMsg(j.error || "Please answer the remaining questions first."); if (j.error?.startsWith("Please answer")) setReview(false); return; }
      setSummary(j.summary);
      setReview(false);
    } catch {
      setMsg("No connection. Check your internet and retry.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="card"><p className="hint">Loading your questions...</p></div>;
  if (!questions.length && !summary) {
    return (
      <div className="card">
        <p>{msg || "Something went wrong."}</p>
        <Link href="/map" style={{ color: "#1A56DB", fontSize: 14 }}>← Back to My Map</Link>
      </div>
    );
  }

  if (summary) {
    return (
      <div className="fade-in">
        <div className="card card-growth">
          <span className="badge-growth">✓ MAPPED</span>
          <h2 style={{ marginBottom: 4 }}>Process mapped</h2>
          <p className="hint">Here is how {summary.process} works in your business, based on your answers.</p>
        </div>
        <div className="card">
          <b>Current workflow</b>
          {summary.workflow.length === 0 && <p className="hint">Not specified yet.</p>}
          {summary.workflow.map((s, i) => (
            <div key={i}>
              <div style={{ background: "#F8FAFD", border: "1.5px solid #C9D7EA", borderRadius: 12, padding: 10, margin: "6px 0", fontWeight: 600 }}>{s}</div>
              {i < summary.workflow.length - 1 && <div style={{ textAlign: "center", color: "#C8962E", fontWeight: 800 }}>↓</div>}
            </div>
          ))}
        </div>
        <div className="card">
          <b>Current tools</b>
          {summary.tools.length === 0 ? <p className="hint">No specific tool.</p> : summary.tools.map((t) => <p key={t} style={{ margin: "6px 0" }}>• {t}</p>)}
        </div>
        <div className="card">
          <b>Problems</b>
          {summary.noProblem
            ? <p className="hint">Your current process appears to be working well based on what you told us. ✓</p>
            : summary.problems.map((p) => <p key={p} style={{ margin: "6px 0" }}>• {p}</p>)}
        </div>
        {!summary.noProblem && summary.need && (
          <div className="card">
            <b>Business need</b>
            <p style={{ margin: "6px 0" }}>{summary.need}</p>
          </div>
        )}
        <button className="btn-primary" onClick={() => router.push("/map")}>Continue Mapping →</button>
        <Link href="/map" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>Back to My Map</Link>
      </div>
    );
  }

  if (review) {
    return (
      <div className="fade-in">
        <ProgressBar step={4} />
        <div className="card">
          <h2>Review — {name}</h2>
          <p className="hint">Check your answers, then complete the mapping.</p>
          {questions.map((q) => {
            const a = answers[q.qkey];
            const shown = a?.text?.trim() || (a?.selected || []).join(", ") || "—";
            return (
              <div key={q.qkey} style={{ padding: "8px 0", borderBottom: "1px solid #F0F2F5" }}>
                <p className="hint" style={{ margin: 0 }}>{q.question}</p>
                <b style={{ fontSize: 14 }}>{shown}{a?.other ? ` (${a.other})` : ""}</b>
              </div>
            );
          })}
          <div style={{ height: 12 }} />
          <button className="btn-action" disabled={busy} onClick={() => complete()}>{busy ? "Saving..." : "✓ Complete mapping"}</button>
          {msg && <p className="hint" style={{ marginTop: 8 }}>{msg}</p>}
          <button className="btn-ghost" style={{ marginTop: 8, border: 0, background: "transparent" }} onClick={() => setReview(false)}>← Back to questions</button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const a = answers[q.qkey] || {};
  return (
    <div className="fade-in">
      <ProgressBar step={4} />
      <div className="card">
        <p className="hint" style={{ marginTop: 0 }}>{name} • Question {idx + 1} of {questions.length}</p>
        <h2>{q.question}</h2>
        {q.help && <p className="hint">{q.help}</p>}
        {(q.type === "single" || q.type === "multi") && q.options.map((o) => {
          const on = (a.selected || []).includes(o);
          return (
            <button key={o} onClick={() => toggle(q, o)} style={{ display: "block", width: "100%", textAlign: "left", padding: 12, borderRadius: 10, margin: "6px 0", border: on ? "2px solid #1A56DB" : "1px solid #E6EAF0", background: on ? "#EDF3FE" : "#fff", fontWeight: on ? 700 : 400, cursor: "pointer", fontSize: 15 }}>
              {on ? "✓ " : ""}{o}
            </button>
          );
        })}
        {q.allow_other && (q.type === "single" || q.type === "multi") && (
          <input className="field" value={a.other || ""} onChange={(e) => setAns(q.qkey, { ...a, other: e.target.value })} placeholder="Other — type here (optional)" style={{ marginTop: 6 }} />
        )}
        {(q.type === "text") && (
          <input className="field" value={a.text || ""} onChange={(e) => setAns(q.qkey, { text: e.target.value })} placeholder="Type here..." />
        )}
        {(q.type === "long") && (
          <textarea className="field" rows={4} value={a.text || ""} onChange={(e) => setAns(q.qkey, { text: e.target.value })} placeholder="One or two sentences..." />
        )}
        {(q.type === "yesno") && (
          <div style={{ display: "flex", gap: 8 }}>
            {(["Yes", "No"] as const).map((o) => {
              const on = (a.selected || []).includes(o);
              return <button key={o} onClick={() => toggle(q, o)} style={{ flex: 1, padding: 14, borderRadius: 12, border: on ? "2px solid #1A56DB" : "1px solid #E6EAF0", background: on ? "#EDF3FE" : "#fff", fontWeight: on ? 800 : 400, cursor: "pointer", fontSize: 16 }}>{o}</button>;
            })}
          </div>
        )}
        <div style={{ height: 12 }} />
        <div style={{ display: "flex", gap: 8 }}>
          {idx > 0 && <button className="btn-ghost" style={{ flex: 1 }} onClick={async () => { await saveDraft(); setIdx(idx - 1); }}>← Back</button>}
          <button className="btn-primary" style={{ flex: 2 }} onClick={next}>{idx + 1 >= questions.length ? "Review →" : "Continue →"}</button>
        </div>
        {msg && <p className="hint" style={{ marginTop: 8 }}>{msg}</p>}
        <Link href="/map" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>Save & exit to My Map</Link>
      </div>
    </div>
  );
}
