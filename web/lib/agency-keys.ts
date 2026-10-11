// Key-for-growth agency processes. My Map shows these first; the rest sit
// behind a "show more" expander per area. IDs must match catalog_processes.
// Reviewed against the agency library (6 areas); service-specific keys only
// surface when the agency offers that service (existing relevance rules).
export const KEY_PROCESSES: ReadonlySet<string> = new Set([
  // Business Development — win work
  "lead-gen", "lead-capture", "prospect-followup", "pipeline", "proposals", "pricing",
  // Client Management — keep work
  "client-onboarding", "requirements", "approvals", "change-requests", "retention", "renewal",
  // Service Delivery, general — deliver work
  "pm-initiation", "pm-assignment", "pm-progress", "pm-qa", "pm-delivery",
  // Service-specific delivery (service-gated by relevance rules)
  "sm-calendar", "sm-approval", "sm-monitoring",
  "ct-briefs", "ct-approval", "ct-eval",
  "seo-audit", "seo-monitoring", "seo-reporting",
  "ad-planning", "ad-budget", "ad-reporting",
  "em-list", "em-automation", "em-reporting",
  "web-qa", "web-approval", "web-conversion",
  "br-briefs", "br-review", "br-approval",
  // Team & Resource — run the team
  "tm-roles", "tm-workload", "tm-communication", "tm-sops", "tm-handover",
  // Financial & Commercial — get paid
  "fin-pricing", "fin-invoicing", "fin-payments", "fin-chasing", "fin-retainers", "fin-profitability",
  // Performance & Growth — prove value
  "pf-reporting", "pf-analysis", "pf-satisfaction", "pf-retention-analysis", "pf-improvement",
]);

export function isKeyProcess(pid: string): boolean {
  return KEY_PROCESSES.has(pid);
}
