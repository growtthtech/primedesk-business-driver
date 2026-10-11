import Link from "next/link";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

type Area = { id: string; name: string; description: string };
type Proc = { id: string; area_id: string; name: string; example_activities: string };

const SERVICE_NOTES: [string, string][] = [
  ["Social media", "Content calendars, approval flows, and publishing consistency live in Service Delivery and Client Management."],
  ["Content marketing", "Editorial planning, production handoffs, and quality checks map to Service Delivery processes."],
  ["SEO", "Audits, retainers, and reporting rhythms sit across Service Delivery and Performance & Growth."],
  ["Paid advertising", "Budget approvals, testing workflows, and client reporting span Client Management and Performance & Growth."],
  ["Email marketing", "List handling, campaign production, and performance reviews map to Service Delivery and Performance & Growth."],
  ["Websites & conversion", "Discovery, builds, revisions, and launch checklists live in Service Delivery and Client Management."],
  ["Branding & creative", "Briefs, concept rounds, and revision control map to Service Delivery and Client Management."],
];

async function loadCatalog(): Promise<{ areas: Area[]; byArea: Record<string, Proc[]> } | null> {
  try {
    const [a, p] = await Promise.all([
      query("select id,name,description from business_areas where active and id like 'ag-%' order by display_order"),
      query("select id,area_id,name,example_activities from catalog_processes where active and area_id like 'ag-%' order by display_order"),
    ]);
    const byArea: Record<string, Proc[]> = {};
    for (const r of p.rows as Proc[]) (byArea[r.area_id] || (byArea[r.area_id] = [])).push(r);
    return { areas: a.rows as Area[], byArea };
  } catch {
    return null;
  }
}

export default async function AgencyProcesses() {
  const catalog = await loadCatalog();

  return (
    <div className="fade-in">
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff", marginTop: -16, paddingTop: 8 }}>
        <div className="bleed-inner">
          <span style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>AGENCY PROCESSES</span>
          <h1 style={{ fontSize: 32, margin: "14px 0 0" }}>The Business Behind the Marketing.</h1>
          <p style={{ color: "#D7E0EC", fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
            Six areas. You only assess what fits your services and size.
          </p>
        </div>
      </section>
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          {!catalog && (
            <div className="card">
              <p className="hint">We couldn&apos;t load the live process library right now. The six areas below are what your assessment covers.</p>
            </div>
          )}
          {(catalog?.areas ?? []).map((a) => (
            <div key={a.id} className="card" style={{ padding: 16 }}>
              <b style={{ color: "#1A3A5C", fontSize: 16 }}>{a.name}</b>
              <p className="hint" style={{ margin: "4px 0 8px" }}>{a.description}</p>
              {(catalog?.byArea[a.id] ?? []).slice(0, 6).map((p) => (
                <p key={p.id} style={{ margin: "4px 0", fontSize: 14 }}>
                  • {p.name}
                  {p.example_activities && <span className="hint"> — {p.example_activities}</span>}
                </p>
              ))}
              {(catalog?.byArea[a.id]?.length ?? 0) > 6 && (
                <p className="hint" style={{ margin: "4px 0 0" }}>+ {(catalog?.byArea[a.id]?.length ?? 0) - 6} more in the assessment</p>
              )}
            </div>
          ))}
          <div className="card card-growth">
            <span className="badge-growth">RELEVANCE, NOT ONE-SIZE-FITS-ALL</span>
            <p className="hint" style={{ margin: "8px 0" }}>
              Solos skip team-management topics. Specialists skip workflows they never run.
            </p>
            {SERVICE_NOTES.map(([s, n]) => (
              <p key={s} style={{ margin: "6px 0", fontSize: 14 }}><b>{s}:</b> <span className="hint">{n}</span></p>
            ))}
          </div>
          <div className="card card-action" style={{ textAlign: "center" }}>
            <h2 style={{ margin: "0 0 6px" }}>Find which processes need attention in your agency.</h2>
            <Link href="/start" className="btn-action" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
              Begin an Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
