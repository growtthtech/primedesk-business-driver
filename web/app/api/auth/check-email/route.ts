import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// POST { email } -> { ok, exists }. Pre-login by nature (no session yet).
// Powers the closed pilot: unknown emails are sent to /start to register
// instead of auto-creating accounts at sign-in.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Enter your email." }, { status: 400 });
  }
  const email = String(body.email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }
  try {
    const r = await query('select id from "user" where lower(email)=$1 limit 1', [email]);
    return NextResponse.json({ ok: true, exists: r.rows.length > 0 });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't check that. Please try again." }, { status: 500 });
  }
}
