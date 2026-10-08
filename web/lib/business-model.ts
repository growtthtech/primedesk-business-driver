// Phase C central business/process model (Master Spec §1-10).
// Catalog data lives in Postgres (business_areas, catalog_processes,
// relevance_rules); this module holds the relevance ENGINE + trait logic +
// legacy-template bridge. No UI imports this for niche if-checks.

export type Relevance = "relevant" | "possible" | "not_relevant";

export type RuleRow = {
  business_category: string;
  business_subtype: string | null;
  process_id: string;
  relevance: Relevance;
};

export const TRAITS = ["keeps-stock", "takes-bookings", "takes-orders", "sells-physical", "does-followup"] as const;
export type Trait = (typeof TRAITS)[number];

export const TRAIT_QUESTIONS: { trait: Trait; question: string }[] = [
  { trait: "keeps-stock", question: "Do you keep physical products or materials?" },
  { trait: "sells-physical", question: "Do you sell physical products?" },
  { trait: "takes-bookings", question: "Do customers usually book a specific date or time?" },
  { trait: "takes-orders", question: "Do customers usually place orders?" },
  { trait: "does-followup", question: "Do you regularly follow up with customers?" },
];

// Processes whose relevance is decided by traits (unless an explicit rule wins).
const TRAIT_SETS: { processes: string[]; traits: Trait[] }[] = [
  { processes: ["stock-purchasing", "receiving-stock", "stock-tracking", "stock-usage", "reordering", "supplier-management"], traits: ["keeps-stock", "sells-physical"] },
  { processes: ["bookings"], traits: ["takes-bookings"] },
  { processes: ["orders"], traits: ["takes-orders"] },
  { processes: ["follow-up", "customer-follow-up"], traits: ["does-followup"] },
];

// Legacy 3-template editor covers these catalog processes (Phase D replaces this bridge).
export const TEMPLATE_PROCESSES: Record<string, string[]> = {
  booking: ["receiving-enquiries", "bookings", "customer-communication", "receiving-payments", "customer-follow-up"],
  orders: ["receiving-enquiries", "orders", "receiving-payments", "customer-communication"],
  followup: ["follow-up", "customer-follow-up", "customer-retention"],
};

function traitVerdict(processId: string, traits: Record<string, boolean>): Relevance | null {
  for (const set of TRAIT_SETS) {
    if (!set.processes.includes(processId)) continue;
    const answers = set.traits.map((t) => traits[t]).filter((a) => a !== undefined);
    if (answers.length === 0) return "possible";
    if (answers.some((a) => a === true)) return "relevant";
    return "not_relevant";
  }
  return null;
}

// Precedence: confident explicit rule (relevant/not_relevant) wins;
// explicit "possible" means "uncertain — ask", so a answered trait resolves it;
// unanswered traits stay possible (never assume).
export function computeRelevance(
  category: string,
  subtype: string,
  traits: Record<string, boolean>,
  rules: RuleRow[],
  processIds: string[]
): Record<string, Relevance> {
  const out: Record<string, Relevance> = {};
  for (const pid of processIds) {
    const hit =
      rules.find((r) => r.business_category === category && r.business_subtype === subtype && r.process_id === pid) ||
      rules.find((r) => r.business_category === category && !r.business_subtype && r.process_id === pid);
    if (hit && hit.relevance !== "possible") {
      out[pid] = hit.relevance;
      continue;
    }
    out[pid] = traitVerdict(pid, traits) || "possible";
  }
  return out;
}
