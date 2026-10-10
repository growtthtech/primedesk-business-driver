// Termii SMS sender for phone OTP. Server-only (key never leaves the server).
// Env-gated like email: without TERMII_API_KEY it logs (local pilot only).
// Production REQUIRES a key + approved sender ID — documented, never bypassed.

export type SmsResult = { ok: boolean; mode: "real" | "pilot"; error?: string };

export async function sendSMS(to: string, message: string): Promise<SmsResult> {
  const key = process.env.TERMII_API_KEY;
  const from = process.env.TERMII_SENDER_ID || "PrimeDesk";
  // OTPs are transactional: dnd route reaches DND-blocked lines, generic does not.
  const channel = process.env.TERMII_CHANNEL || "dnd";
  if (!key) {
    console.log(`[PrimeDesk PILOT sms] To: ${to} | ${message} (add TERMII_API_KEY to send for real)`);
    return { ok: true, mode: "pilot" };
  }
  try {
    const res = await fetch("https://api.ng.termii.com/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, from, sms: message, type: "plain", channel, api_key: key }),
    });
    const txt = await res.text();
    if (!res.ok) return { ok: false, mode: "real", error: `Termii ${res.status}: ${txt.slice(0, 200)}` };
    return { ok: true, mode: "real" };
  } catch (e) {
    return { ok: false, mode: "real", error: e instanceof Error ? e.message : String(e) };
  }
}
