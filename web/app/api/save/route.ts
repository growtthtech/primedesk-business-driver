import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Saves one full journey: business + process + stages. Called from /map confirm.
export async function POST(req: Request) {
  try {
    const b = await req.json();
    const biz = await query(
      "insert into businesses(name,type,how_they_work,team_size,level) values($1,$2,$3,$4,$5) returning id",
      [b.name || "My Business", b.type || "", b.how || "", b.size || "", b.level || ""]
    );
    const businessId: string = biz.rows[0].id;
    const proc = await query("insert into processes(business_id,template,raw_text) values($1,$2,$3) returning id", [
      businessId,
      b.templateKey || "",
      b.raw || "",
    ]);
    const processId: string = proc.rows[0].id;
    const stages: string[] = Array.isArray(b.stages) ? b.stages : [];
    for (let i = 0; i < stages.length; i++) {
      await query("insert into stages(process_id,name,position,status) values($1,$2,$3,$4)", [
        processId,
        stages[i],
        i,
        (b.statuses && b.statuses[stages[i]]) || "Waiting",
      ]);
    }
    return NextResponse.json({ ok: true, businessId });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
