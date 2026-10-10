import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";

// POST { processId, hide } -> user hides (or restores) a process suggestion.
// Hiding never deletes mapping data; hidden rows are simply not shown.
export async function POST(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof body.processId !== "string" || !body.processId) {
    return NextResponse.json({ ok: false, error: "Please choose a process first." }, { status: 400 });
  }
  if (typeof body.hide !== "boolean") {
    return NextResponse.json({ ok: false, error: "We couldn't read that. Please try again." }, { status: 400 });
  }
  try {
    const known = await query("select id from catalog_processes where id=$1 and active", [body.processId]);
    if (known.rows.length === 0) {
      return NextResponse.json({ ok: false, error: "That process isn't recognized." }, { status: 400 });
    }
    await query(
      "insert into business_processes(business_id,process_id,status,user_hidden) values($1,$2,'not_started',$3) on conflict (business_id,process_id) do update set user_hidden=excluded.user_hidden, updated_at=now()",
      [own.business.id, body.processId, body.hide]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't update that process. Please try again." }, { status: 500 });
  }
}
