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
    const [areasR, procsR, rulesR, traitsR, statesR, svcR] = await Promise.all([
      query("select id,name,description,display_order,segment from business_areas where active order by display_order"),
      query("select id,area_id,name,description,display_order from catalog_processes where active"),
      query("select business_category,business_subtype,service,process_id,relevance from relevance_rules where business_category=$1", [category]),
      query("select trait,answer from business_traits where business_id=$1", [biz.id]),
      query("select process_id,status,user_hidden from business_processes where business_id=$1", [biz.id]),
      query("select service_id from business_services where business_id=$1", [biz.id]),
    ]);
    const traits: Record<string, boolean> = {};
    for (const t of traitsR.rows) traits[t.trait as string] = t.answer as boolean;
    const stored: Record<string, string> = {};
    const hidden = new Set<string>();
    for (const s of statesR.rows) {
      stored[s.process_id as string] = s.status as string;
      if (s.user_hidden) hidden.add(s.process_id as string);
    }
    const services = svcR.rows.map((r) => r.service_id as string);
    const solo = String(biz.team_size || "") === "Just me";
    const pids = procsR.rows.map((p) => p.id as string);
    const areaOf: Record<string, string> = {};
    const segmentOf: Record<string, string> = {};
    for (const p of procsR.rows) areaOf[p.id as string] = p.area_id as string;
    for (const a of areasR.rows) segmentOf[a.id as string] = (a.segment as string) || "sme";
    const segment = category === "Digital Marketing Agency" ? "agency" : "sme";
    const rel = computeRelevance(category, subtype, traits, rulesR.rows as RuleRow[], pids, { services, solo, areaOf, strictAreas: ["ag-delivery"], segment, segmentOf });
    // Persist computed relevance in one round trip (status untouched).
    await query(
      "insert into business_processes(business_id,process_id,status,relevance) select $1, u.pid, 'not_started', u.rel from unnest($2::text[], $3::text[]) as u(pid, rel) on conflict (business_id,process_id) do update set relevance=excluded.relevance, updated_at=now()",
      [biz.id, pids, pids.map((p) => rel[p])]
    );
    const hiddenList: { id: string; name: string }[] = [];
    const areas = areasR.rows.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      processes: procsR.rows
        .filter((p) => p.area_id === a.id)
        .sort((x, y) => (x.display_order as number) - (y.display_order as number))
        .map((p) => {
          const pid = p.id as string;
          if (hidden.has(pid)) {
            hiddenList.push({ id: pid, name: p.name as string });
            return null;
          }
          return {
            id: pid,
            name: p.name,
            description: p.description,
            status: stored[pid] || "not_started",
            relevance: rel[pid],
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null)
        .filter((p) => p.relevance !== "not_relevant"),
    })).filter((a) => a.processes.length > 0);
    const hasPossible = areas.some((a) => a.processes.some((p) => p.relevance === "possible"));
    const answered = new Set(Object.keys(traits));
    const pendingQuestions = hasPossible ? TRAIT_QUESTIONS.filter((q) => !answered.has(q.trait)) : [];
    const mapped = Object.values(stored).filter((s) => s === "mapped").length;
    return NextResponse.json({
      ok: true,
      business: { name: biz.name, category, subtype },
      services,
      areas,
      hidden: hiddenList,
      pendingQuestions,
      progress: { mapped, total: areas.reduce((n, a) => n + a.processes.length, 0) },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load your map. Please try again." }, { status: 500 });
  }
}
