import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";
import { buildRecommendations, type Catalog, type MappingInput } from "@/lib/recommend";
import { assessReadiness } from "@/lib/readiness";

async function loadCatalog(): Promise<Catalog> {
  const [caps, capProcs, signals, tools, toolCaps, equivalents, practices] = await Promise.all([
    query("select id,name,description,category,maturity from digital_capabilities where active"),
    query("select capability_id,process_id from capability_processes"),
    query("select capability_id,keyword from capability_signals"),
    query("select id,name,description,website,category,pricing_type,free_plan,difficulty,best_for,mobile,nigeria from digital_tools where active"),
    query("select tool_id,capability_id,base_stage from tool_capabilities"),
    query("select tool_id,tool_name from tool_equivalents"),
    query("select capability_id,title,guidance from improvement_practices"),
  ]);
  return {
    caps: caps.rows as Catalog["caps"],
    capProcs: capProcs.rows as Catalog["capProcs"],
    signals: signals.rows as Catalog["signals"],
    tools: tools.rows as Catalog["tools"],
    toolCaps: toolCaps.rows as Catalog["toolCaps"],
    equivalents: equivalents.rows as Catalog["equivalents"],
    practices: practices.rows as Catalog["practices"],
  };
}

// GET -> generate (and persist) recommendations from mapped processes, grouped.
export async function GET(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  try {
    const biz = own.business;
    const maps = await query(
      "select m.id,m.process_id,m.problems,m.need,m.tools,p.name as process_name from process_mappings m join catalog_processes p on p.id=m.process_id where m.business_id=$1 and m.status='mapped' and not exists (select 1 from business_processes bp where bp.business_id=m.business_id and bp.process_id=m.process_id and bp.user_hidden)",
      [biz.id]
    );
    const inputs: MappingInput[] = maps.rows.map((r) => {
      const probs = (r.problems || []) as string[];
      const noProblem = probs.some((p: string) => String(p).toLowerCase().startsWith("no major"));
      return {
        process_id: r.process_id as string,
        process_name: r.process_name as string,
        problems: probs.map(String),
        need: String(r.need || ""),
        tools: ((r.tools || []) as string[]).map(String),
        noProblem,
        mapping_id: r.id as string,
      };
    });
    const cat = await loadCatalog();
    const recs = buildRecommendations({ size: String(biz.team_size || ""), years: String(biz.years_operating || "") }, inputs, cat);
    const readiness = assessReadiness(
      {
        size: String(biz.team_size || ""),
        years: String(biz.years_operating || ""),
        operatingModel: String(biz.operating_model || ""),
        techUsage: String(biz.tech_usage || ""),
      },
      {
        mapped: inputs.length,
        problems: inputs.reduce((n, m) => n + m.problems.length, 0),
      }
    );
    await query("update tool_recommendations set status='superseded' where business_id=$1 and status='active'", [biz.id]);
    for (const r of recs) {
      await query(
        "insert into tool_recommendations(business_id,process_id,mapping_id,capability_id,tool_id,rec_kind,practice_title,stage,reason,relevance,covered_note) values($1,$2,(select id from process_mappings where business_id=$1 and process_id=$2 order by updated_at desc limit 1),$3,$4,$5,$6,$7,$8,$9,$10)",
        [biz.id, r.process_id, r.capability_id, r.tool_id, r.kind, r.practice_title, r.stage, r.reason, r.relevance, r.covered_note]
      );
    }
    const saved = await query(
      "select r.id,r.process_id,r.stage,r.reason,r.relevance,r.covered_note,r.rec_kind,r.practice_title,r.capability_id, c.name as capability_name, p.name as process_name, t.id as tool_id, t.name as tool_name, t.description as tool_description, t.website, t.category as tool_category, t.pricing_type, t.free_plan, t.difficulty, t.best_for, t.limitations, t.alternatives, case when d.tool_id is null then false else true end as in_drive from tool_recommendations r join digital_capabilities c on c.id=r.capability_id join catalog_processes p on p.id=r.process_id left join digital_tools t on t.id=r.tool_id left join my_drive_selections d on d.business_id=r.business_id and d.tool_id=r.tool_id where r.business_id=$1 and r.status='active' order by r.relevance desc",
      [biz.id]
    );
    const groups: Record<string, unknown[]> = { now: [], later: [], future: [] };
    for (const row of saved.rows) (groups[row.stage as string] || (groups[row.stage as string] = [])).push(row);
    return NextResponse.json({
      ok: true,
      readiness,
      summary: { total: saved.rows.length, now: groups.now.length, later: groups.later.length, future: groups.future.length },
      groups,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't build your plan. Please try again." }, { status: 500 });
  }
}
