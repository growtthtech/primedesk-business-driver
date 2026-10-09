// Phone helpers: Nigerian normalization + masked display (never show full contact).

// 08012345678 / 8012345678 / +2348012345678 -> +2348012345678. Else null.
export function normalizeNG(input: string): string | null {
  const d = (input || "").replace(/\D/g, "");
  if (/^234\d{10}$/.test(d)) return "+" + d;
  if (/^0\d{10}$/.test(d)) return "+234" + d.slice(1);
  if (/^\d{10}$/.test(d)) return "+234" + d;
  return null;
}

export function looksLikePhone(input: string): boolean {
  return normalizeNG(input) !== null;
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "your email";
  const head = (user || "").slice(0, 1);
  return `${head}••••••@${domain}`;
}

export function maskPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  const tail = d.slice(-4);
  return `+${d.slice(0, 3)} ••• ••• ${tail}`;
}
