import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

// Saves one journey: business (owned by caller) + process + stages.
// Requires login. Guests keep working on their phone (localStorage) only.
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  const uid = session?.user?.id;
  if (!uid) return NextResponse.json({ ok: false, error: "Please log in first." }, { status: 401 });
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read that. Please try again." }, { status: 400 });
  }
  try {
    let businessId = typeof b.businessId === "string" ? b.businessId : "";
    if (businessId) {
      const own = await query("select id from businesses where id=$1 and user_id=$2", [businessId, uid]);
      if (own.rows.length === 0) {
        return NextResponse.json({ ok: false, error: "That business doesn't belong to this account." }, { status: 403 });
      }
    } else {
      const mine = await query("select id from businesses where user_id=$1 order by created_at desc limit 1", [uid]);
      if (mine.rows.length === 0) {
        return NextResponse.json({ ok: false, error: "Set up your business profile first." }, { status: 404 });
      }
      businessId = mine.rows[0].id as string;
    }
    const proc = await query("insert into processes(business_id,template,raw_text) values($1,$2,$3) returning id", [
      businessId,
      String(b.templateKey || ""),
      String(b.raw || ""),
    ]);
    const processId: string = proc.rows[0].id;
    const stages: string[] = Array.isArray(b.stages) ? b.stages.filter((s): s is string => typeof s === "string" && s.trim().length > 0).slice(0, 50) : [];
    const statuses = (b.statuses && typeof b.statuses === "object" ? b.statuses : {}) as Record<string, string>;
    for (let i = 0; i < stages.length; i++) {
      const st = ["Waiting", "Done", "Stuck"].includes(statuses[stages[i]]) ? statuses[stages[i]] : "Waiting";
      await query("insert into stages(process_id,name,position,status) values($1,$2,$3,$4)", [processId, stages[i].slice(0, 120), i, st]);
    }
    return NextResponse.json({ ok: true, businessId });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't save this information. Please try again." }, { status: 500 });
  }
}
