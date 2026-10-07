import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { validateProfile } from "@/lib/business-categories";

async function userId(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session?.user?.id || null;
}

function toJson(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    category: row.type,
    subtype: row.business_subtype,
    size: row.team_size,
    years: row.years_operating,
  };
}

// GET -> current user's business or { business: null }. Never another user's.
export async function GET(req: Request) {
  const uid = await userId(req);
  if (!uid) return NextResponse.json({ ok: false, error: "Please log in first." }, { status: 401 });
  try {
    const r = await query("select * from businesses where user_id=$1 order by created_at desc limit 1", [uid]);
    if (r.rows.length === 0) return NextResponse.json({ ok: true, business: null });
    return NextResponse.json({ ok: true, business: toJson(r.rows[0]) });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load your business information. Please try again." }, { status: 500 });
  }
}

// POST { name, category, subtype, size, years } -> create or update own business.
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
  try {
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
    return NextResponse.json({ ok: true, business: toJson(row) });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't save your business information. Please try again." }, { status: 500 });
  }
}
