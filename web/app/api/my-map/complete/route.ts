import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";
import { TEMPLATE_PROCESSES } from "@/lib/business-model";

// POST { templateKey } -> after the legacy editor confirm, mark the covered
// in-progress processes as mapped. Phase D replaces this bridge with per-process mapping.
export async function POST(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read that. Please try again." }, { status: 400 });
  }
  const covered = typeof body.templateKey === "string" ? TEMPLATE_PROCESSES[body.templateKey] : undefined;
  if (!covered) return NextResponse.json({ ok: false, error: "That mapping isn't recognized." }, { status: 400 });
  try {
    const r = await query(
      "update business_processes set status='mapped', updated_at=now() where business_id=$1 and status='in_progress' and process_id = any($2) returning process_id",
      [own.business.id, covered]
    );
    return NextResponse.json({ ok: true, mapped: r.rows.map((x) => x.process_id) });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't update your map. Please try again." }, { status: 500 });
  }
}
