import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";

// POST { toolId } -> remove from My Drive. Library + Plan unaffected.
export async function POST(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof body.toolId !== "string" || !body.toolId) {
    return NextResponse.json({ ok: false, error: "Please choose a tool first." }, { status: 400 });
  }
  try {
    await query("delete from my_drive_selections where business_id=$1 and tool_id=$2", [own.business.id, body.toolId]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't remove that tool. Please try again." }, { status: 500 });
  }
}
