// Central agency taxonomy. The category key ("Digital Marketing Agency") is
// load-bearing for relevance/segment rules — do not rename it. Subtypes are
// agency specialisms + Other (free text). Old SME categories are dropped from
// signup; grandfathered rows keep working through existing relevance rules.
export const CATEGORIES: Record<string, string[]> = {
  "Digital Marketing Agency": [
    "SEO Agency",
    "Social Media Agency",
    "Content Marketing Agency",
    "Paid Advertising Agency",
    "Email Marketing Agency",
    "Full-Service Agency",
    "Other",
  ],
};

// Grandfathered pre-agency values → canonical. Old rows keep working everywhere.
const CATEGORY_ALIASES: Record<string, string> = { Beauty: "Beauty & Grooming" };
const SUBTYPE_ALIASES: Record<string, string> = { "Nail Studio": "Beauty Studio" };

export function normalizeCategory(c: string): string {
  return CATEGORY_ALIASES[c] || c;
}

export function normalizeSubtype(s: string): string {
  return SUBTYPE_ALIASES[s] || s;
}

export const SIZES = ["Just me", "2–5", "6–10", "11–50", "50+"];

export const OPERATING_MODELS = ["Solo", "Contractors", "Employees", "Mixed"];

export const PRIORITIES = [
  "Get more clients",
  "Deliver work faster",
  "Fewer manual tasks",
  "Clearer client communication",
  "Better reporting",
  "Steadier income",
];

export const YEARS = ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"];

export type ProfileInput = {
  name: string;
  category: string;
  subtype: string;
  otherSubtype: string;
  size: string;
  years: string;
  operatingModel: string;
  priorities: string[];
  techUsage: string;
};

// Shared client+server validation. Server never trusts the client alone.
export function validateProfile(p: Partial<ProfileInput>): string | null {
  const name = (p.name || "").trim();
  if (!name) return "Please enter your agency name.";
  if (name.length > 120) return "Agency name is too long (max 120 characters).";
  if (!p.category || !CATEGORIES[normalizeCategory(p.category)]) return "Please choose a business category.";
  const cat = normalizeCategory(p.category);
  const sub = normalizeSubtype(p.subtype || "");
  const subs = CATEGORIES[cat];
  if (subs.length > 0) {
    if (!sub || !subs.includes(sub)) return "Please choose the agency type that fits best.";
    if (sub === "Other") {
      const custom = (p.otherSubtype || "").trim();
      if (custom.length < 2) return "Please describe your agency type.";
      if (custom.length > 120) return "Agency description is too long (max 120 characters).";
    }
  } else {
    if (!sub.trim()) return "Please describe your business.";
    if (sub.trim().length > 120) return "Business description is too long (max 120 characters).";
  }
  if (!p.size || !SIZES.includes(p.size)) return "Please choose your business size.";
  if (!p.years || !YEARS.includes(p.years)) return "Please choose how long you have been operating.";
  if (p.operatingModel && !OPERATING_MODELS.includes(p.operatingModel)) return "Please choose a valid operating model.";
  const prs = p.priorities || [];
  if (prs.length > 6) return "Please pick at most 6 priorities.";
  for (const pr of prs) {
    if (!PRIORITIES.includes(pr)) return "One priority isn't recognized. Please re-check your picks.";
  }
  if ((p.techUsage || "").length > 1000) return "Technology notes are too long (max 1000 characters).";
  return null;
}
