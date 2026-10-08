import { auth } from "./auth";
import { query } from "./db";
import { normalizeCategory, normalizeSubtype } from "./business-categories";
import { computeRelevance, type RuleRow, type Relevance } from "./business-model";

// Shared Phase C guard: session user + their latest business or a plain error.
// Never trusts client-sent user/business ids.
export type OwnResult =
  | { business: Record<string, unknown>; uid: string }
  | { error: string; status: number };

export async function ownBusiness(req: Request): Promise<OwnResult> {
  let session = null;
  try {
    session = await auth.api.getSession({ headers: req.headers });
  } catch {
    return { error: "We couldn't confirm your login. Please try again.", status: 500 as const };
  }
  const uid = session?.user?.id;
  if (!uid) return { error: "Please log in first.", status: 401 as const };
  try {
    const r = await query("select * from businesses where user_id=$1 order by created_at desc limit 1", [uid]);
    if (r.rows.length === 0) return { error: "Set up your business profile first.", status: 404 as const };
    return { business: r.rows[0] as Record<string, unknown>, uid };
  } catch {
    return { error: "We couldn't load your business. Please try again.", status: 500 as const };
  }
}

// Phase D context: owned business + normalized profile + rules + traits +
// relevance map. Rejects processes outside the business's map.
export type MappingCtx =
  | {
      business: Record<string, unknown>;
      process: Record<string, unknown>;
      relevance: Relevance;
      saved: Record<string, unknown> | null;
    }
  | { error: string; status: number };

export async function mappingContext(req: Request, processId: string): Promise<MappingCtx> {
  const own = await ownBusiness(req);
  if ("error" in own) return own;
  try {
    const biz = own.business;
    const category = normalizeCategory(String(biz.type || ""));
    const subtype = normalizeSubtype(String(biz.business_subtype || ""));
    const proc = await query(
      "select p.id,p.name,p.description,p.area_id,a.name as area_name from catalog_processes p join business_areas a on a.id=p.area_id where p.id=$1 and p.active",
      [processId]
    );
    if (proc.rows.length === 0) return { error: "That process isn't part of your map.", status: 400 as const };
    const rulesR = await query("select business_category,business_subtype,process_id,relevance from relevance_rules where business_category=$1", [category]);
    const traitsR = await query("select trait,answer from business_traits where business_id=$1", [biz.id]);
    const traits: Record<string, boolean> = {};
    for (const t of traitsR.rows) traits[t.trait as string] = t.answer as boolean;
    const rel = computeRelevance(category, subtype, traits, rulesR.rows as RuleRow[], [processId])[processId];
    if (rel === "not_relevant") return { error: "That process isn't part of your map.", status: 400 as const };
    const saved = await query("select answers,status from process_mappings where business_id=$1 and process_id=$2", [biz.id, processId]);
    return {
      business: biz,
      process: proc.rows[0] as Record<string, unknown>,
      relevance: rel,
      saved: saved.rows.length > 0 ? (saved.rows[0] as Record<string, unknown>) : null,
    };
  } catch {
    return { error: "We couldn't load that process. Please try again.", status: 500 as const };
  }
}
