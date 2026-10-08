import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ownBusiness } from "@/lib/owned";
import { normalizeCategory, normalizeSubtype } from "@/lib/business-categories";
import { computeRelevance, TRAIT_QUESTIONS, type RuleRow } from "@/lib/business-model";

// GET -> My Map structure: areas with relevant processes + statuses + pending questions.
export async function GET(req: Request) {
  const own = await ownBusiness(req);
  if ("error" in own) return NextResponse.json({ ok: false, error: own.error }, { status: own.status });
  try {
    const biz = own.business;
    const category = normalizeCategory(String(biz.type || ""));
    const subtype = normalizeSubtype(String(biz.business_subtype || ""));
    const [areasR, procsR, rulesR, traitsR, statesR] = await Promise.all([
      query("select id,name,description,display_order from business_areas where active order by display_order"),
      query("select id,area_id,name,description,display_order from catalog_processes where active"),
      query("select business_category,business_subtype,process_id,relevance from relevance_rules where business_category=$1", [category]),
      query("select trait,answer from business_traits where business_id=$1", [biz.id]),
      query("select process_id,status from business_processes where business_id=$1", [biz.id]),
    ]);
    const traits: Record<string, boolean> = {};
    for (const t of traitsR.rows) traits[t.trait as string] = t.answer as boolean;
    const stored: Record<string, string> = {};
    for (const s of statesR.rows) stored[s.process_id as string] = s.status as string;
    const pids = procsR.rows.map((p) => p.id as string);
    const rel = computeRelevance(category, subtype, traits, rulesR.rows as RuleRow[], pids);
    // Persist computed relevance (status untouched) so Phase D reads one place.
    for (const pid of pids) {
      await query(
        "insert into business_processes(business_id,process_id,status,relevance) values($1,$2,'not_started',$3) on conflict (business_id,process_id) do update set relevance=excluded.relevance, updated_at=now()",
        [biz.id, pid, rel[pid]]
      );
    }
    const areas = areasR.rows.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      processes: procsR.rows
        .filter((p) => p.area_id === a.id)
        .sort((x, y) => (x.display_order as number) - (y.display_order as number))
        .map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          status: stored[p.id as string] || "not_started",
          relevance: rel[p.id as string],
        }))
        .filter((p) => p.relevance !== "not_relevant"),
    })).filter((a) => a.processes.length > 0);
    const hasPossible = areas.some((a) => a.processes.some((p) => p.relevance === "possible"));
    const answered = new Set(Object.keys(traits));
    const pendingQuestions = hasPossible ? TRAIT_QUESTIONS.filter((q) => !answered.has(q.trait)) : [];
    return NextResponse.json({
      ok: true,
      business: { name: biz.name, category, subtype },
      areas,
      pendingQuestions,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load your map. Please try again." }, { status: 500 });
  }
}
