// Single email sender for PrimeDesk.
// Priority: ZeptoMail (needs domain) → Gmail SMTP (no domain needed) → pilot log.
// No-domain pilot path: set GMAIL_USER + GMAIL_APP_PASSWORD and real emails flow.

import nodemailer from "nodemailer";

export type SendResult = { ok: boolean; mode: "real" | "pilot"; via?: string; error?: string };

async function sendViaGmail(to: string, subject: string, html: string): Promise<SendResult | null> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  try {
    const t = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await t.sendMail({ from: `"PrimeDesk" <${user}>`, to, subject, html });
    return { ok: true, mode: "real", via: "gmail" };
  } catch (e) {
    return { ok: false, mode: "real", via: "gmail", error: e instanceof Error ? e.message : String(e) };
  }
}

export async function sendEmail(to: string, subject: string, html: string): Promise<SendResult> {
  const key = process.env.ZEPTOMAIL_API_KEY;
  const from = process.env.ZEPTOMAIL_FROM;
  if (key && from && !from.includes("yourdomain")) {
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
        return { ok: false, mode: "real", via: "zeptomail", error: `ZeptoMail ${res.status}: ${txt.slice(0, 200)}` };
      }
      return { ok: true, mode: "real", via: "zeptomail" };
    } catch (e) {
      return { ok: false, mode: "real", via: "zeptomail", error: e instanceof Error ? e.message : String(e) };
    }
  }
  const gmail = await sendViaGmail(to, subject, html);
  if (gmail) return gmail;
  console.log(`[PrimeDesk PILOT email] To: ${to} | Subject: ${subject}\n${html.replace(/<[^>]+>/g, "")}`);
  return { ok: true, mode: "pilot" };
}
