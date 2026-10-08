import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";

const STATUSES = ["not_started", "in_progress", "mapped"];

// POST { processId, status } -> move one of MY processes along. No recommendation statuses yet.
export async function POST(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read that. Please try again." }, { status: 400 });
  }
  if (typeof body.processId !== "string" || !body.processId) {
    return NextResponse.json({ ok: false, error: "Please choose a process first." }, { status: 400 });
  }
  if (typeof body.status !== "string" || !STATUSES.includes(body.status)) {
    return NextResponse.json({ ok: false, error: "That status isn't recognized." }, { status: 400 });
  }
  try {
    const known = await query("select id from catalog_processes where id=$1 and active", [body.processId]);
    if (known.rows.length === 0) {
      return NextResponse.json({ ok: false, error: "That process isn't recognized." }, { status: 400 });
    }
    await query(
      "insert into business_processes(business_id,process_id,status) values($1,$2,$3) on conflict (business_id,process_id) do update set status=excluded.status, updated_at=now()",
      [own.business.id, body.processId, body.status]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't update that process. Please try again." }, { status: 500 });
  }
}
