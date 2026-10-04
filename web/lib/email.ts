// Single email sender for PrimeDesk.
// REAL mode: ZeptoMail API (needs ZEPTOMAIL_API_KEY + ZEPTOMAIL_FROM in .env.local).
// PILOT mode: prints to the server terminal so testing never blocks on keys.

export type SendResult = { ok: boolean; mode: "real" | "pilot"; error?: string };

export async function sendEmail(to: string, subject: string, html: string): Promise<SendResult> {
  const key = process.env.ZEPTOMAIL_API_KEY;
  const from = process.env.ZEPTOMAIL_FROM;
  if (!key || !from || from.includes("yourdomain")) {
    console.log(`[PrimeDesk PILOT email] To: ${to} | Subject: ${subject}\n${html.replace(/<[^>]+>/g, "")}`);
    return { ok: true, mode: "pilot" };
  }
  try {
    const res = await fetch("https://api.zeptomail.com/v1.1/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Zoho-encapi ${key}` },
      body: JSON.stringify({
        from: { address: from, name: "PrimeDesk" },
        to: [{ email_address: { address: to } }],
        subject,
        htmlbody: html,
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      return { ok: false, mode: "real", error: `ZeptoMail ${res.status}: ${txt.slice(0, 200)}` };
    }
    return { ok: true, mode: "real" };
  } catch (e) {
    return { ok: false, mode: "real", error: e instanceof Error ? e.message : String(e) };
  }
}
