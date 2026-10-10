// Central business taxonomy (Master Spec §12 + Phase C canonical names).
// Single source for profile form, validation, and relevance. Do not scatter checks.
export const CATEGORIES: Record<string, string[]> = {
  Food: ["Restaurant", "Bakery", "Caterer", "Food Vendor", "Cloud Kitchen", "Food Brand", "Other Food Business"],
  "Beauty & Grooming": ["Hair Salon", "Barbershop", "Beauty Studio", "Makeup Artist", "Spa", "Beauty Product Business", "Other Beauty Business"],
  Fashion: ["Fashion Designer", "Tailor", "Clothing Brand", "Boutique", "Fashion Manufacturer", "Other Fashion Business"],
  "Service Business": ["Cleaning", "Photography", "Event Services", "Printing", "Consulting", "Digital/Creative Services", "Home Services", "Repair/Maintenance", "Professional Services", "Other Service Business"],
  "Digital Marketing Agency": ["Solo Consultant", "Small Agency", "Growing Agency", "Established Agency"],
  Other: [],
};

// Grandfathered Phase B values → canonical. Old rows keep working everywhere.
const CATEGORY_ALIASES: Record<string, string> = { Beauty: "Beauty & Grooming" };
const SUBTYPE_ALIASES: Record<string, string> = { "Nail Studio": "Beauty Studio" };

export function normalizeCategory(c: string): string {
  return CATEGORY_ALIASES[c] || c;
}

export function normalizeSubtype(s: string): string {
  return SUBTYPE_ALIASES[s] || s;
}

export const SIZES = ["Just me", "2–5", "6–10", "11–50", "50+"];

export const YEARS = ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"];

export type ProfileInput = {
  name: string;
  category: string;
  subtype: string;
  size: string;
  years: string;
};

// Shared client+server validation. Server never trusts the client alone.
export function validateProfile(p: Partial<ProfileInput>): string | null {
  const name = (p.name || "").trim();
  if (!name) return "Please enter your business name.";
  if (name.length > 120) return "Business name is too long (max 120 characters).";
  if (!p.category || !CATEGORIES[normalizeCategory(p.category)]) return "Please choose a business category.";
  const cat = normalizeCategory(p.category);
  const sub = normalizeSubtype(p.subtype || "");
  const subs = CATEGORIES[cat];
  if (subs.length > 0) {
    if (!sub || !subs.includes(sub)) return "Please choose the option that fits best.";
  } else {
    if (!sub.trim()) return "Please describe your business.";
    if (sub.trim().length > 120) return "Business description is too long (max 120 characters).";
  }
  if (!p.size || !SIZES.includes(p.size)) return "Please choose your business size.";
  if (!p.years || !YEARS.includes(p.years)) return "Please choose how long you have been operating.";
  return null;
}
