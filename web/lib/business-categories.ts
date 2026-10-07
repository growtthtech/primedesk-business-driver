// Central business taxonomy (spec §12). Single source for profile form,
// validation, and later relevance rules. Do not scatter category checks.
export const CATEGORIES: Record<string, string[]> = {
  Food: ["Restaurant", "Bakery", "Caterer", "Food Vendor", "Cloud Kitchen", "Food Brand", "Other Food Business"],
  Beauty: ["Hair Salon", "Barbershop", "Nail Studio", "Makeup Artist", "Spa", "Beauty Product Business", "Other Beauty Business"],
  Fashion: ["Fashion Designer", "Tailor", "Clothing Brand", "Boutique", "Fashion Manufacturer", "Other Fashion Business"],
  "Service Business": ["Cleaning", "Photography", "Event Services", "Printing", "Consulting", "Digital/Creative Services", "Home Services", "Repair/Maintenance", "Professional Services", "Other Service Business"],
  Other: [],
};

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
  if (!p.category || !CATEGORIES[p.category]) return "Please choose a business category.";
  const subs = CATEGORIES[p.category];
  if (subs.length > 0) {
    if (!p.subtype || !subs.includes(p.subtype)) return "Please choose the option that fits best.";
  } else {
    if (!(p.subtype || "").trim()) return "Please describe your business.";
    if ((p.subtype || "").trim().length > 120) return "Business description is too long (max 120 characters).";
  }
  if (!p.size || !SIZES.includes(p.size)) return "Please choose your business size.";
  if (!p.years || !YEARS.includes(p.years)) return "Please choose how long you have been operating.";
  return null;
}
