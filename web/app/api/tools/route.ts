import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

// Read-only tool library for logged-in users (light fields for browsing).
export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers }).catch(() => null);
  if (!session?.user?.id) return NextResponse.json({ ok: false, error: "Please log in first." }, { status: 401 });
  try {
    const r = await query("select id,name,description,website,category,pricing_type,free_plan,difficulty,best_for,mobile,nigeria from digital_tools where active order by name");
    return NextResponse.json({ ok: true, tools: r.rows });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't load the tool library. Please try again." }, { status: 500 });
  }
}
