import { auth } from "./auth";
import { query } from "./db";

// Shared Phase C guard: session user + their latest business or a plain error.
// Never trusts client-sent user/business ids.
export async function ownBusiness(req: Request) {
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
