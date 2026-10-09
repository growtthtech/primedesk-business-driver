import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

// POST { to } -> sends a test email. Login required: prevents open relay abuse.
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers }).catch(() => null);
  if (!session?.user?.id) return NextResponse.json({ ok: false, error: "Please log in first." }, { status: 401 });
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
