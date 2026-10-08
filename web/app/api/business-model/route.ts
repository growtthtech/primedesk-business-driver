import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { CATEGORIES, SIZES, YEARS } from "@/lib/business-categories";

// Read-only global catalog for logged-in users. Never modified by businesses.
export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers }).catch(() => null);
  if (!session?.user?.id) return NextResponse.json({ ok: false, error: "Please log in first." }, { status: 401 });
  try {
    const areas = await query("select id,name,description,display_order from business_areas where active order by display_order");
    const procs = await query("select id,area_id,name,description,example_activities,display_order from catalog_processes where active order by display_order");
    return NextResponse.json({ ok: true, categories: CATEGORIES, sizes: SIZES, years: YEARS, areas: areas.rows, processes: procs.rows });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load the business catalog. Please try again." }, { status: 500 });
  }
}
