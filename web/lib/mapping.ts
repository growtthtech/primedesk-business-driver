// Phase D mapping engine: validates guided answers and derives the structured
// summary (workflow/tools/problems/need) deterministically. No AI, no tool picks.
export type QuestionDef = {
  id: string;
  qkey: string;
  question: string;
  type: "single" | "multi" | "text" | "long" | "yesno";
  options: string[];
  required: boolean;
  qorder: number;
  help: string;
  purpose: "workflow" | "tools" | "problems" | "need" | "context";
  allow_other: boolean;
};

export type Answer = { selected?: string[]; text?: string; other?: string };

function cleanList(a: Answer | undefined, q: QuestionDef): string[] {
  if (!a) return [];
  const out: string[] = [];
  for (const s of a.selected || []) {
    if (q.options.includes(s)) out.push(s);
    else if (s === "Other" && q.allow_other && (a.other || "").trim()) out.push(`Other — ${(a.other || "").trim().slice(0, 120)}`);
  }
  return out;
}

// One answer is complete when it holds a usable response.
function isAnswered(a: Answer | undefined, q: QuestionDef): boolean {
  if (!a) return false;
  if (q.type === "text" || q.type === "long") return (a.text || "").trim().length > 0;
  if (q.type === "yesno") return (a.selected || []).some((s) => s === "Yes" || s === "No");
  return cleanList(a, q).length > 0;
}

export function validateAnswers(
  questions: QuestionDef[],
  answers: Record<string, Answer>,
  opts?: { needOptional?: boolean }
): string | null {
  const known = new Set(questions.map((q) => q.qkey));
  for (const key of Object.keys(answers)) {
    if (!known.has(key)) return "An answer didn't match any question. Please start this mapping again.";
  }
  for (const q of questions) {
    const a = answers[q.qkey];
    const requiredNow = q.required && !(opts?.needOptional && q.purpose === "need");
    if (!a) {
      if (requiredNow) return `Please answer: ${q.question}`;
      continue;
    }
    if ((q.type === "text" || q.type === "long") && (a.text || "").length > 2000) {
      return "One answer is too long. Please shorten it.";
    }
    if (q.required && !isAnswered(a, q)) {
      if (opts?.needOptional && q.purpose === "need") continue;
      return `Please answer: ${q.question}`;
    }
    if ((a.selected || []).length > 30) return "Too many selections on one question.";
  }
  return null;
}

export function deriveSummary(questions: QuestionDef[], answers: Record<string, Answer>) {
  const ordered = [...questions].sort((a, b) => a.qorder - b.qorder);
  const workflow: string[] = [];
  const tools: string[] = [];
  const problems: string[] = [];
  const needs: string[] = [];
  for (const q of ordered) {
    const a = answers[q.qkey];
    if (q.purpose === "need") {
      const t = (a?.text || "").trim();
      if (t) needs.push(t);
      continue;
    }
    const items = cleanList(a, q);
    if (q.purpose === "workflow") workflow.push(...items);
    else if (q.purpose === "tools") tools.push(...items);
    else if (q.purpose === "problems") problems.push(...items);
  }
  const noProblem = problems.some((p) => p.toLowerCase().startsWith("no major"));
  return { workflow, tools, problems, need: needs.join(" ").slice(0, 2000), noProblem };
}
