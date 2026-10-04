import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

// POST { to } -> sends a test email. Proves ZeptoMail is wired before pilot owners arrive.
export async function POST(req: Request) {
  try {
    const { to } = await req.json();
    if (!to || !String(to).includes("@")) {
      return NextResponse.json({ ok: false, error: "Send { to: 'you@example.com' }" }, { status: 400 });
    }
    const r = await sendEmail(
      String(to),
      "PrimeDesk email is working",
      `<div style="font-family:Arial"><h2>🚗 PrimeDesk email works</h2><p>If you got this, login codes and follow-up reminders will reach owners.</p></div>`
    );
    return NextResponse.json(r);
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
