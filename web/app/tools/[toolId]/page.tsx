import Link from "next/link";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

type Tool = {
  id: string; name: string; description: string; website: string; category: string;
  pricing_type: string; free_plan: boolean; difficulty: string; best_for: string;
  mobile: boolean; nigeria: string; limitations: string; alternatives: string[];
};

async function loadTool(id: string): Promise<{ tool: Tool; uses: { capability: string; processes: string[] }[] } | null> {
  if (!/^[a-z0-9-]{1,60}$/.test(id)) return null;
  try {
    const t = await query(
      "select id,name,description,website,category,pricing_type,free_plan,difficulty,best_for,mobile,nigeria,limitations,alternatives from digital_tools where id=$1 and active",
      [id]
    );
    if (t.rows.length === 0) return null;
    const u = await query(
      "select c.name as capability, array_agg(distinct p.name) as processes from tool_capabilities tc join digital_capabilities c on c.id=tc.capability_id left join capability_processes cp on cp.capability_id=c.id left join catalog_processes p on p.id=cp.process_id where tc.tool_id=$1 group by c.name order by c.name",
      [id]
    );
    return {
      tool: t.rows[0] as Tool,
      uses: (u.rows as { capability: string; processes: string[] }[]).map((r) => ({
        capability: r.capability,
        processes: (r.processes || []).filter(Boolean).slice(0, 6),
      })),
    };
  } catch {
    return null;
  }
}

export default async function ToolPage({ params }: { params: { toolId: string } }) {
  const data = await loadTool(params.toolId);
  if (!data) notFound();
  const { tool, uses } = data;
  const alts = Array.isArray(tool.alternatives) ? tool.alternatives.filter(Boolean) : [];

  return (
    <div className="fade-in">
      <section className="full-bleed" style={{ background: "#0B1D33", color: "#fff", marginTop: -16, paddingTop: 8 }}>
        <div className="bleed-inner">
          <span style={{ background: "#E8590C", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>{tool.category.toUpperCase()}</span>
          <h1 style={{ fontSize: 32, margin: "14px 0 0" }}>{tool.name}</h1>
          <p style={{ color: "#D7E0EC", fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>{tool.description}</p>
        </div>
      </section>
      <section className="full-bleed" style={{ background: "#fff" }}>
        <div className="bleed-inner">
          <div className="grid-even">
            <div className="card" style={{ padding: 16 }}>
              <b style={{ color: "#1A3A5C" }}>Pricing</b>
              <p className="hint" style={{ margin: "4px 0 0" }}>{tool.pricing_type}{tool.free_plan ? " — starts free" : ""}</p>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <b style={{ color: "#1A3A5C" }}>Best for</b>
              <p className="hint" style={{ margin: "4px 0 0" }}>{tool.best_for || "Agencies exploring this need"}</p>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <b style={{ color: "#1A3A5C" }}>Ease</b>
              <p className="hint" style={{ margin: "4px 0 0" }}>{tool.difficulty}{tool.mobile ? " • Works on mobile" : ""}</p>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <b style={{ color: "#1A3A5C" }}>In Nigeria</b>
              <p className="hint" style={{ margin: "4px 0 0" }}>{tool.nigeria || "Available online"}</p>
            </div>
          </div>

          {uses.length > 0 && (
            <div className="card">
              <h2>How it helps your agency</h2>
              {uses.map((u) => (
                <div key={u.capability} style={{ padding: "8px 0", borderBottom: "1px solid #F2F4F7" }}>
                  <b>{u.capability}</b>
                  {u.processes.length > 0 && <p className="hint" style={{ margin: "2px 0 0" }}>Useful for: {u.processes.join(", ")}</p>}
                </div>
              ))}
              <p className="hint">PrimeDesk recommends it when your mapped process shows the matching problem — never from a shopping list.</p>
            </div>
          )}

          {(tool.limitations || alts.length > 0) && (
            <div className="card card-growth">
              <span className="badge-growth">TRADE-OFFS</span>
              {tool.limitations && <p className="hint" style={{ margin: "8px 0 4px" }}>{tool.limitations}</p>}
              {alts.length > 0 && <p className="hint" style={{ margin: 0 }}><b>Alternatives:</b> {alts.join(", ")}</p>}
            </div>
          )}

          <div className="card card-action" style={{ textAlign: "center" }}>
            <h2 style={{ margin: "0 0 6px" }}>See if it fits your route.</h2>
            <p style={{ color: "#8A4A1B", margin: "0 0 12px", fontSize: 14 }}>Map your processes — your plan says if and when this tool earns a place.</p>
            <Link href="/plan" className="btn-action" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
              Check My Plan
            </Link>
            {tool.website && (
              <a href={tool.website} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>
                Visit {tool.name} website ↗
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
