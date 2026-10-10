// Phase C central business/process model (Master Spec §1-10).
// Catalog data lives in Postgres (business_areas, catalog_processes,
// relevance_rules); this module holds the relevance ENGINE + trait logic +
// legacy-template bridge. No UI imports this for niche if-checks.

export type Relevance = "relevant" | "possible" | "not_relevant";

export type RuleRow = {
  business_category: string;
  business_subtype: string | null;
  service?: string | null;
  process_id: string;
  relevance: Relevance;
};

export const TRAITS = ["keeps-stock", "takes-bookings", "takes-orders", "sells-physical", "does-followup", "has-team"] as const;
export type Trait = (typeof TRAITS)[number];

export const TRAIT_QUESTIONS: { trait: Trait; question: string }[] = [
  { trait: "keeps-stock", question: "Do you keep physical products or materials?" },
  { trait: "sells-physical", question: "Do you sell physical products?" },
  { trait: "takes-bookings", question: "Do customers usually book a specific date or time?" },
  { trait: "takes-orders", question: "Do customers usually place orders?" },
  { trait: "does-followup", question: "Do you regularly follow up with customers?" },
  { trait: "has-team", question: "Do you work with employees or regular contractors?" },
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

// Team-structure processes: solo operators see them as possible, not core.
export const SOLO_DOWNWEIGHT = [
  "tm-roles", "tm-onboarding", "tm-allocation", "tm-capacity", "tm-skills", "tm-handover", "tm-contractors",
];

export type RelevanceOpts = {
  services?: string[];
  solo?: boolean;
  // areaId -> areaId map + strict areas: inside a strict area, an unmatched
  // process is not_relevant (not possible) once the business offers services.
  areaOf?: Record<string, string>;
  strictAreas?: string[];
  // Segment firewall: sme businesses never see agency areas and vice versa,
  // unless an explicit rule says otherwise. segmentOf maps areaId -> segment.
  segment?: string;
  segmentOf?: Record<string, string>;
};

// Precedence: confident explicit rule (relevant/not_relevant) wins;
// service-scoped rules need the service offered; explicit "possible" defers
// to answered traits; unanswered stays possible (never assume) — except in
// strict areas with services offered, where unmatched means not_relevant.
export function computeRelevance(
  category: string,
  subtype: string,
  traits: Record<string, boolean>,
  rules: RuleRow[],
  processIds: string[],
  opts: RelevanceOpts = {}
): Record<string, Relevance> {
  const services = opts.services || [];
  const solo = opts.solo || false;
  const areaOf = opts.areaOf || {};
  const strictAreas = opts.strictAreas || [];
  const segment = opts.segment || "";
  const segmentOf = opts.segmentOf || {};
  const out: Record<string, Relevance> = {};
  for (const pid of processIds) {
    const matching = rules.filter(
      (r) =>
        r.business_category === category &&
        (!r.business_subtype || r.business_subtype === subtype) &&
        r.process_id === pid &&
        (!r.service || services.includes(r.service))
    );
    // Most specific first: subtype+service > subtype > service > general.
    matching.sort((a, b) => score(b) - score(a));
    const hit = matching[0];
    if (hit && hit.relevance !== "possible") {
      out[pid] = hit.relevance;
    } else if (segment && segmentOf[areaOf[pid] || ""] && segmentOf[areaOf[pid]] !== segment) {
      out[pid] = "not_relevant";
    } else {
      const tv = traitVerdict(pid, traits);
      if (tv) out[pid] = tv;
      else if (services.length > 0 && strictAreas.includes(areaOf[pid] || "")) out[pid] = "not_relevant";
      else out[pid] = "possible";
    }
    if (solo && out[pid] === "relevant" && SOLO_DOWNWEIGHT.includes(pid)) {
      out[pid] = "possible";
    }
  }
  return out;
}

function score(r: RuleRow): number {
  return (r.business_subtype ? 2 : 0) + (r.service ? 1 : 0);
}
