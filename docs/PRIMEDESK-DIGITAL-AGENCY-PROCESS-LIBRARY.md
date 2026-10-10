# PrimeDesk — Digital Marketing Agency Process Library

Practical maintenance document. Implementation: Phase C engine extended
(`lib/business-model.ts`), catalog in Postgres, UI unchanged in style.

## The six business areas
1. Business Development (`ag-bizdev`) — 15 processes: niche, positioning,
   lead generation, agency marketing, capture, qualification, follow-up,
   pipeline, discovery, proposals, pricing, contracts, conversion, handover,
   referrals/partnerships.
2. Client Management (`ag-client`) — 15: info, onboarding, requirements,
   goals, assets, communication, meetings, approvals, feedback, changes,
   complaints, relationship, retention, renewal, offboarding.
3. Service Delivery (`ag-delivery`) — 65 across 8 service families: social (8),
   content (8), SEO (7), paid ads (9), email (8), web (9), branding (6),
   general PM (10).
4. Team & Resource (`ag-team`) — 15: roles through contractors.
5. Financial & Commercial (`ag-finance`) — 14: pricing through contracts.
6. Performance & Growth (`ag-growth`) — 15: client measurement through planning.

## Process library structure
- `business_areas(id, name, description, display_order, segment)` — agency rows
  carry `segment='agency'`; SME rows `'sme'`.
- `catalog_processes(id, area_id, name, description, example_activities,
  display_order)` — stable slug ids; never duplicate per agency.
- `agency_services` (9: social-media … cro) + `business_services`
  (per-business picks from the profile page).
- `relevance_rules` + nullable `service` column: a service-scoped rule fires
  only when the business offers that service.

## Process relevance rules
Precedence (in `computeRelevance`): confident explicit rule →
segment firewall → trait answers → possible-by-default (delivery areas with
services offered default to not_relevant instead).
- Service links: each offered service makes its processes relevant.
- Category core: bizdev/client/finance/growth basics relevant to all agencies.
- Solo (`Just me`): team-structure processes downweight relevant→possible;
  Solo Consultant additionally marks employee machinery not_relevant.
- Shared SME processes (enquiries, bookings, follow-up, payments…) are
  explicitly relevant — the firewall hides only unmatched segments.
- Unknown/new businesses (no services): everything possible (never assume).

## Assessment question design
`mapping_questions`: process-specific rows win, else area-generic rows.
Six agency area sets (workflow/tools/problems/improve + optional impact) plus
overrides for client-onboarding, sm-approval, ad-monitoring, pf-reporting.
Types: single/multi/text/long/yesno. UI (`/map/[processId]`) renders from
config — new questions are data rows.

## Problem identification logic
Multi-select symptoms + optional impact text per area; `problem_details`
jsonb reserved on `process_mappings`. Symptom vs cause: questions record what
the owner reports; the engine never invents causes. "No major problem" is a
first-class answer that suppresses needs and recommendations.

## Digital capability definitions
17 agency capabilities (`digital_capabilities`), linked to processes via
`capability_processes`, matched by `capability_signals` keywords against the
mapped problems+need. Existing SME capabilities reused where they fit
(communication, records, tasks); agency-only needs got new rows.

## Capability-to-tool mapping
`tool_capabilities` with base NOW/LATER/FUTURE; 6 agency tools added
(Buffer, Mailchimp, Asana, Slack, Google Analytics, HubSpot Marketing) with
honest fields (categories only, limitations, alternatives, `last_verified`).
Existing tools reused (Sheets, Drive, Trello, Paystack…). Engine
(`lib/recommend.ts`): covered-check first, ≤2 tools per capability,
maturity bump for small/young businesses. No AI anywhere.

## Data relationships
User → Business → (services, traits, mappings) → Process → Capability →
Recommendation → Tool → Drive selection. Catalog tables are global;
per-business rows carry ownership. `tool_recommendations.rec_kind`:
tool|practice|covered.

## How to add a new process
1. Insert into `catalog_processes` (stable id, correct `area_id`).
2. Link services via `relevance_rules` (service column) or category rows.
3. Optionally add a process-specific question set; otherwise the area set applies.
4. Link capabilities via `capability_processes` + signal keywords.
5. Re-run seed files (all upserts, both databases).

## How to add/modify a relevance rule
Insert/update `relevance_rules` (category, subtype nullable, service
nullable, process, relevance). Specific beats general automatically.

## How to add a digital capability / maintain tools
Insert capability + process links + signals (+ practice row for the
no-purchase path). For tools: insert tool + `tool_capabilities` rows +
equivalents; set `last_verified` when facts are re-checked; never invent
prices or URLs.

## Testing instructions
Live-API pattern from this phase: OTP user → profile (category/subtype/
services) → `my-map` counts → answer/complete → plan assertions. Scripts live
in temp (not committed); key assertions: service on/off changes totals,
solo downweight, no-force total 0, cross-user 403/null, SME regression
(31 processes, 0 agency areas).

## Migration and deployment
`db/migration-agency.sql` + `seed-agency-*.sql` (6 files) — all re-runnable
upserts, applied to local PG16 and Neon. No destructive step. Netlify needs a
redeploy to serve new code (reminder: recreate project + env vars).
