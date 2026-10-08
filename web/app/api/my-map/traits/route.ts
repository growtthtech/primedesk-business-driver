import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";
import { TRAITS, TEMPLATE_PROCESSES } from "@/lib/business-model";

// POST { trait, answer } -> save a discovery answer for my business.
export async function POST(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read that. Please try again." }, { status: 400 });
  }
  if (typeof body.trait !== "string" || !(TRAITS as readonly string[]).includes(body.trait)) {
    return NextResponse.json({ ok: false, error: "That question isn't recognized." }, { status: 400 });
  }
  if (typeof body.answer !== "boolean") {
    return NextResponse.json({ ok: false, error: "Please answer yes or no." }, { status: 400 });
  }
  try {
    await query(
      "insert into business_traits(business_id,trait,answer) values($1,$2,$3) on conflict (business_id,trait) do update set answer=excluded.answer, updated_at=now()",
      [own.business.id, body.trait, body.answer]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't save your answer. Please try again." }, { status: 500 });
  }
}
