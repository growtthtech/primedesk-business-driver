import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";

// GET -> my chosen stack, grouped by capability, with process trace.
export async function GET(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  try {
    const r = await query(
      "select s.id,s.tool_id,s.selected_at, t.name as tool_name, t.description as tool_description, t.website, t.category as tool_category, t.pricing_type, t.difficulty, c.name as capability_name, p.name as process_name from my_drive_selections s join digital_tools t on t.id=s.tool_id left join tool_recommendations r on r.id=s.recommendation_id left join digital_capabilities c on c.id=r.capability_id left join catalog_processes p on p.id=r.process_id where s.business_id=$1 order by s.selected_at",
      [own.business.id]
    );
    return NextResponse.json({ ok: true, tools: r.rows });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load your drive. Please try again." }, { status: 500 });
  }
}

// POST { toolId, recommendationId? } -> add to My Drive. Duplicates return existing.
export async function POST(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof body.toolId !== "string" || !body.toolId) {
    return NextResponse.json({ ok: false, error: "Please choose a tool first." }, { status: 400 });
  }
  try {
    const tool = await query("select id from digital_tools where id=$1 and active", [body.toolId]);
    if (tool.rows.length === 0) {
      return NextResponse.json({ ok: false, error: "That tool isn't available." }, { status: 400 });
    }
    let recId: string | null = null;
    if (typeof body.recommendationId === "string" && body.recommendationId) {
      const rec = await query("select id,tool_id from tool_recommendations where id=$1 and business_id=$2 and status='active'", [body.recommendationId, own.business.id]);
      if (rec.rows.length === 0) {
        return NextResponse.json({ ok: false, error: "That recommendation isn't yours." }, { status: 403 });
      }
      if (rec.rows[0].tool_id && rec.rows[0].tool_id !== body.toolId) {
        return NextResponse.json({ ok: false, error: "That recommendation is for a different tool." }, { status: 400 });
      }
      recId = body.recommendationId;
    }
    const r = await query(
      "insert into my_drive_selections(business_id,tool_id,recommendation_id) values($1,$2,$3) on conflict (business_id,tool_id) do update set recommendation_id=coalesce(excluded.recommendation_id, my_drive_selections.recommendation_id) returning id",
      [own.business.id, body.toolId, recId]
    );
    return NextResponse.json({ ok: true, selectionId: r.rows[0].id });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't save that tool. Please try again." }, { status: 500 });
  }
}
