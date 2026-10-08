import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { mappingContext } from "@/lib/owned";

// GET ?processId= -> process + resolved questions + saved answers + status.
export async function GET(req: Request) {
  const pid = new URL(req.url).searchParams.get("processId") || "";
  if (!pid) return NextResponse.json({ ok: false, error: "Please choose a process first." }, { status: 400 });
  const ctx = await mappingContext(req, pid);
  if ("error" in ctx) return NextResponse.json({ ok: false, error: ctx.error }, { status: ctx.status });
  try {
    const specific = await query("select id,qkey,question,type,options,required,qorder,help,purpose,allow_other,area_id,process_id from mapping_questions where process_id=$1 order by qorder", [pid]);
    const areaId = ctx.process.area_id as string;
    const rows = specific.rows.length > 0
      ? specific.rows
      : (await query("select id,qkey,question,type,options,required,qorder,help,purpose,allow_other,area_id,process_id from mapping_questions where area_id=$1 and process_id is null order by qorder", [areaId])).rows;
    const questions = rows.map((q) => ({
      id: q.id,
      qkey: q.qkey,
      question: q.question,
      type: q.type,
      options: q.options as string[],
      required: q.required,
      qorder: q.qorder,
      help: q.help,
      purpose: q.purpose,
      allow_other: q.allow_other,
    }));
    const saved = ctx.saved as { answers: Record<string, unknown>; status: string } | null;
    return NextResponse.json({
      ok: true,
      process: { id: ctx.process.id, name: ctx.process.name, description: ctx.process.description, area: ctx.process.area_name },
      relevance: ctx.relevance,
      questions,
      answers: saved?.answers || {},
      status: saved?.status || "not_started",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load those questions. Please try again." }, { status: 500 });
  }
}
