import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { validateProfile } from "@/lib/business-categories";

async function userId(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session?.user?.id || null;
}

function toJson(row: Record<string, unknown>, services: string[] = []) {
  return {
    id: row.id,
    name: row.name,
    category: row.type,
    subtype: row.business_subtype,
    size: row.team_size,
    years: row.years_operating,
    services,
  };
}

async function servicesOf(businessId: string): Promise<string[]> {
  const r = await query("select s.id from business_services bs join agency_services s on s.id=bs.service_id where bs.business_id=$1", [businessId]);
  return r.rows.map((x) => x.id as string);
}

// GET -> current user's business (+ services) or { business: null }. Never another user's.
export async function GET(req: Request) {
  const uid = await userId(req);
  if (!uid) return NextResponse.json({ ok: false, error: "Please log in first." }, { status: 401 });
  try {
    const r = await query("select * from businesses where user_id=$1 order by created_at desc limit 1", [uid]);
    if (r.rows.length === 0) return NextResponse.json({ ok: true, business: null });
    return NextResponse.json({ ok: true, business: toJson(r.rows[0], await servicesOf(r.rows[0].id as string)) });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load your business information. Please try again." }, { status: 500 });
  }
}

// POST { name, category, subtype, size, years, services? } -> create or update own business.
export async function POST(req: Request) {
  const uid = await userId(req);
  if (!uid) return NextResponse.json({ ok: false, error: "Please log in first." }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read that. Please try again." }, { status: 400 });
  }
  const err = validateProfile({
    name: String(body.name || ""),
    category: String(body.category || ""),
    subtype: String(body.subtype || ""),
    size: String(body.size || ""),
    years: String(body.years || ""),
  });
  if (err) return NextResponse.json({ ok: false, error: err }, { status: 400 });
  const services = Array.isArray(body.services) ? body.services.filter((s): s is string => typeof s === "string").slice(0, 12) : [];
  try {
    const known = await query("select id from agency_services");
    const valid = new Set(known.rows.map((r) => r.id as string));
    const clean = services.filter((s) => valid.has(s));
    const existing = await query("select id from businesses where user_id=$1 order by created_at desc limit 1", [uid]);
    let row;
    if (existing.rows.length > 0) {
      const r = await query(
        "update businesses set name=$1, type=$2, business_subtype=$3, team_size=$4, years_operating=$5, updated_at=now() where id=$6 and user_id=$7 returning *",
        [String(body.name).trim(), body.category, String(body.subtype).trim(), body.size, body.years, existing.rows[0].id, uid]
      );
      row = r.rows[0];
    } else {
      const r = await query(
        "insert into businesses(user_id,name,type,business_subtype,team_size,years_operating) values($1,$2,$3,$4,$5,$6) returning *",
        [uid, String(body.name).trim(), body.category, String(body.subtype).trim(), body.size, body.years]
      );
      row = r.rows[0];
    }
    const bid = row.id as string;
    await query("delete from business_services where business_id=$1", [bid]);
    for (const s of clean) {
      await query("insert into business_services(business_id,service_id) values($1,$2) on conflict do nothing", [bid, s]);
    }
    return NextResponse.json({ ok: true, business: toJson(row, clean) });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't save your business information. Please try again." }, { status: 500 });
  }
}
