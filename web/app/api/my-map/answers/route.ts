import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { mappingContext } from "@/lib/owned";
import { type Answer } from "@/lib/mapping";

async function loadDefsFor(processId: string) {
  const specific = await query("select id,qkey,question,type,options,required,qorder,help,purpose,allow_other,area_id from mapping_questions where process_id=$1 order by qorder", [processId]);
  let rows = specific.rows;
  if (rows.length === 0) {
    const area = await query("select area_id from catalog_processes where id=$1", [processId]);
    const areaId = area.rows[0]?.area_id as string;
    rows = (await query("select id,qkey,question,type,options,required,qorder,help,purpose,allow_other,area_id from mapping_questions where area_id=$1 and process_id is null order by qorder", [areaId])).rows;
  }
  return rows.map((q) => ({
    id: q.id as string,
    qkey: q.qkey as string,
    question: q.question as string,
    type: q.type as "single" | "multi" | "text" | "long" | "yesno",
    options: (q.options || []) as string[],
    required: q.required as boolean,
    qorder: q.qorder as number,
    help: (q.help || "") as string,
    purpose: q.purpose as "workflow" | "tools" | "problems" | "need" | "context",
    allow_other: q.allow_other as boolean,
  }));
}

// POST { processId, answers } -> save draft (partial allowed), mark In Progress.
export async function POST(req: Request) {
  const { processId, answers } = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof processId !== "string" || !processId) {
    return NextResponse.json({ ok: false, error: "Please choose a process first." }, { status: 400 });
  }
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return NextResponse.json({ ok: false, error: "We couldn't read those answers. Please try again." }, { status: 400 });
  }
  const ctx = await mappingContext(req, processId);
  if ("error" in ctx) return NextResponse.json({ ok: false, error: ctx.error }, { status: ctx.status });
  try {
    const defs = await loadDefsFor(processId);
    const clean: Record<string, Answer> = {};
    for (const d of defs) {
      const raw = (answers as Record<string, Answer>)[d.qkey];
      if (raw === undefined) continue;
      if (d.type === "text" || d.type === "long") {
        clean[d.qkey] = { text: String((raw as Answer).text || "").slice(0, 2000) };
      } else if (d.type === "yesno") {
        const s = ((raw as Answer).selected || []).filter((x) => x === "Yes" || x === "No");
        clean[d.qkey] = { selected: s.slice(0, 1) };
      } else {
        const s = ((raw as Answer).selected || []).filter((x) => typeof x === "string").slice(0, 30);
        const o = typeof (raw as Answer).other === "string" ? (raw as Answer).other!.slice(0, 120) : "";
        clean[d.qkey] = o ? { selected: s, other: o } : { selected: s };
      }
    }
    await query(
      "insert into process_mappings(business_id,process_id,status,answers) values($1,$2,'in_progress',$3) on conflict (business_id,process_id) do update set answers=excluded.answers, status=case when process_mappings.status='mapped' then 'mapped' else 'in_progress' end, completed_at=case when process_mappings.status='mapped' then process_mappings.completed_at else null end, updated_at=now()",
      [ctx.business.id, processId, JSON.stringify(clean)]
    );
    await query(
      "insert into business_processes(business_id,process_id,status) values($1,$2,'in_progress') on conflict (business_id,process_id) do update set status=case when business_processes.status='mapped' then 'mapped' else 'in_progress' end, updated_at=now()",
      [ctx.business.id, processId]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't save your answers. Please try again." }, { status: 500 });
  }
}
