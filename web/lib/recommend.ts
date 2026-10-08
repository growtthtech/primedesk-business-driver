// Phases E-G recommendation engine: Problem → Need → Capability → Tool.
// Deterministic and explainable. No AI. No popularity contest.
// Reads catalog rows supplied by the route; never touches the database itself.

export type MappingInput = {
  process_id: string;
  process_name: string;
  problems: string[];
  need: string;
  tools: string[];
  noProblem: boolean;
  mapping_id: string | null;
};

export type BizCtx = { size: string; years: string };

export type Catalog = {
  caps: { id: string; name: string; description: string; category: string; maturity: string }[];
  capProcs: { capability_id: string; process_id: string }[];
  signals: { capability_id: string; keyword: string }[];
  tools: { id: string; name: string; description: string; website: string; category: string; pricing_type: string; free_plan: boolean; difficulty: string; best_for: string; mobile: boolean; nigeria: string }[];
  toolCaps: { tool_id: string; capability_id: string; base_stage: "now" | "later" | "future" }[];
  equivalents: { tool_id: string; tool_name: string }[];
};

export type Rec = {
  process_id: string;
  capability_id: string;
  tool_id: string | null;
  stage: "now" | "later" | "future";
  reason: string;
  relevance: number;
  covered_note: string;
};

const SMALL = ["Just me", "2–5"];
const STAGES: ("now" | "later" | "future")[] = ["now", "later", "future"];

function bump(stage: "now" | "later" | "future"): "now" | "later" | "future" {
  return STAGES[Math.min(2, STAGES.indexOf(stage) + 1)];
}

function mentions(hay: string, needle: string): boolean {
  const h = hay.toLowerCase();
  const n = needle.toLowerCase().trim();
  return !!n && (h.includes(n) || n.includes(h));
}

export function buildRecommendations(biz: BizCtx, mappings: MappingInput[], cat: Catalog): Rec[] {
  const out: Rec[] = [];
  const small = SMALL.includes(biz.size) || biz.years === "Less than 1 year";
  for (const m of mappings) {
    // No-forced rule: no meaningful problem → no recommendation at all.
    if (m.noProblem || m.problems.length === 0) continue;
    const text = (m.problems.join(" ") + " " + (m.need || "")).toLowerCase();
    const current = (m.tools || []).join(" ").toLowerCase();
    const capIds: string[] = [];
    for (const c of cat.capProcs) {
      if (c.process_id === m.process_id && capIds.indexOf(c.capability_id) === -1) capIds.push(c.capability_id);
    }
    for (const cid of capIds) {
      const cap = cat.caps.find((c) => c.id === cid);
      if (!cap) continue;
      const sigs = cat.signals.filter((s) => s.capability_id === cid).map((s) => s.keyword);
      // Capability must match a real signal — never recommend by existence.
      if (sigs.length > 0 && !sigs.some((k) => text.includes(k.toLowerCase()))) continue;
      const probLine = m.problems.slice(0, 2).join("; ");
      const needLine = m.need ? ` You said you want: ${m.need.slice(0, 140)}.` : "";
      // Existing-tool check: already covered → say so, don't push new software.
      const hit = cat.equivalents.find((e) => {
        const toolsForCap = new Set(cat.toolCaps.filter((t) => t.capability_id === cid).map((t) => t.tool_id));
        return toolsForCap.has(e.tool_id) && mentions(current, e.tool_name);
      });
      if (hit) {
        const toolName = cat.tools.find((t) => t.id === hit.tool_id)?.name || hit.tool_name;
        out.push({
          process_id: m.process_id,
          capability_id: cid,
          tool_id: null,
          stage: "now",
          reason: `Your ${m.process_name} mapping shows: ${probLine}. You already use something that handles this.`,
          relevance: m.problems.length * 10 + 30,
          covered_note: `You already have a tool that can support this process (${toolName}). You may want to improve how you use it before adding another tool.`,
        });
        continue;
      }
      const options = cat.toolCaps
        .filter((t) => t.capability_id === cid)
        .map((t) => ({ link: t, tool: cat.tools.find((x) => x.id === t.tool_id)! }))
        .filter((o) => o.tool)
        .sort((a, b) => Number(b.tool.free_plan) - Number(a.tool.free_plan) || a.tool.difficulty.localeCompare(b.tool.difficulty))
        .slice(0, 2);
      for (const o of options) {
        let stage = o.link.base_stage;
        if (o.tool.difficulty === "Advanced" && small) stage = bump(stage);
        if (cap.maturity === "advanced" && small) stage = bump(stage);
        out.push({
          process_id: m.process_id,
          capability_id: cid,
          tool_id: o.tool.id,
          stage,
          reason: `Your ${m.process_name} mapping shows: ${probLine}.${needLine} ${cap.name} can help with this, and ${o.tool.name} (${o.tool.difficulty}, ${o.tool.pricing_type}) fits a business like yours.`,
          relevance: m.problems.length * 10 + (stage === "now" ? 30 : stage === "later" ? 20 : 10),
          covered_note: "",
        });
      }
    }
  }
  return out.sort((a, b) => b.relevance - a.relevance);
}
