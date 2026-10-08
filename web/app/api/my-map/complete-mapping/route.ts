import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { mappingContext } from "@/lib/owned";
import { validateAnswers, deriveSummary, type QuestionDef, type Answer } from "@/lib/mapping";

// POST { processId } -> validate everything, derive summary, mark Mapped.
// No-problem path: need may stay empty when "No major problem" was chosen.
export async function POST(req: Request) {
  const { processId } = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof processId !== "string" || !processId) {
    return NextResponse.json({ ok: false, error: "Please choose a process first." }, { status: 400 });
  }
  const ctx = await mappingContext(req, processId);
  if ("error" in ctx) return NextResponse.json({ ok: false, error: ctx.error }, { status: ctx.status });
  try {
    const areaId = ctx.process.area_id as string;
    const specific = await query("select id,qkey,question,type,options,required,qorder,help,purpose,allow_other from mapping_questions where process_id=$1 order by qorder", [processId]);
    const rows = specific.rows.length > 0
      ? specific.rows
      : (await query("select id,qkey,question,type,options,required,qorder,help,purpose,allow_other from mapping_questions where area_id=$1 and process_id is null order by qorder", [areaId])).rows;
    const defs: QuestionDef[] = rows.map((q) => ({
      id: q.id as string,
      qkey: q.qkey as string,
      question: q.question as string,
      type: q.type as QuestionDef["type"],
      options: (q.options || []) as string[],
      required: q.required as boolean,
      qorder: q.qorder as number,
      help: (q.help || "") as string,
      purpose: q.purpose as QuestionDef["purpose"],
      allow_other: q.allow_other as boolean,
    }));
    const saved = await query("select answers from process_mappings where business_id=$1 and process_id=$2", [ctx.business.id, processId]);
    const answers = (saved.rows[0]?.answers || {}) as Record<string, Answer>;
    const preview = deriveSummary(defs, answers);
    // No-problem path: a business doing well is not forced to invent a need.
    const err = validateAnswers(defs, answers, { needOptional: preview.noProblem });
    if (err) return NextResponse.json({ ok: false, error: err }, { status: 400 });
    const d = deriveSummary(defs, answers);
    if (!d.noProblem && !d.need) {
      return NextResponse.json({ ok: false, error: "Please tell us what you would most like to improve." }, { status: 400 });
    }
    if (d.workflow.length === 0 && d.tools.length === 0) {
      return NextResponse.json({ ok: false, error: "Please answer the workflow questions first." }, { status: 400 });
    }
    await query(
      "insert into process_mappings(business_id,process_id,status,answers,workflow,tools,problems,need,completed_at) values($1,$2,'mapped',$3,$4,$5,$6,$7,now()) on conflict (business_id,process_id) do update set answers=excluded.answers, workflow=excluded.workflow, tools=excluded.tools, problems=excluded.problems, need=excluded.need, status='mapped', completed_at=now(), updated_at=now()",
      [ctx.business.id, processId, JSON.stringify(answers), d.workflow, d.tools, d.problems, d.noProblem ? "" : d.need]
    );
    await query(
      "insert into business_processes(business_id,process_id,status) values($1,$2,'mapped') on conflict (business_id,process_id) do update set status='mapped', updated_at=now()",
      [ctx.business.id, processId]
    );
    return NextResponse.json({
      ok: true,
      summary: {
        process: ctx.process.name,
        workflow: d.workflow,
        tools: d.tools,
        problems: d.problems,
        need: d.noProblem ? "" : d.need,
        noProblem: d.noProblem,
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't complete this mapping. Please try again." }, { status: 500 });
  }
}
