# **PrimeDesk**

## **Product Requirements Document (MVP)**

**Product:** PrimeDesk
**Category:** Business Process & Digital Technology Orchestration
**Initial Target Market:** Digital Marketing Agencies
**Product Stage:** Minimum Viable Product (MVP)
**Core Principle:** Understand First. Recommend Second.

---

# **1. Product Overview**

## **1.1 Product vision**

PrimeDesk helps digital marketing agencies understand how their businesses operate, identify process problems, determine which digital capabilities they need, and choose the right technology for their current needs — without unnecessarily adding more software.

## **1.2 Problem statement**

Agencies use multiple tools for clients, projects, content, campaigns, teams, and reporting, but processes and tools often don't work together: scattered client info, delayed approvals, disorganized production, repeated manual tasks, unclear ownership, inconsistent reporting, duplicated/overlapping subscriptions, and no clear basis for the next technology decision.

## **1.3 Product solution**

A structured flow: **Understand the agency → Map its processes → Identify needs and problems → Determine required capabilities → Assess digital readiness → Recommend suitable solutions → Build an improvement plan.** The MVP also organizes existing/selected tools and documents potential connections. Live integrations and monitoring are limited to explicitly implemented, verified capabilities.

## **1.4 Product positioning**

Not a CRM, PM tool, or automation platform — a business-process-first platform that determines how an agency's processes and tools should work together.

---

# **2. Target Users**

Owners/founders (operations, bottlenecks, tech decisions), solo consultants (organize work without complexity/expense), operations and project managers (clearer workflows, visibility). Agency types: social, SEO, paid ads, content, email, web/conversion, branding/creative, multi-service. Product adapts templates and questions to services offered. **Out of scope:** e-commerce, WhatsApp/Instagram sellers, dev agencies, IT providers, general business management.

---

# **3. Product Goals**

The MVP must help an agency: (1) describe business and services, (2) understand processes, (3) identify problems/opportunities, (4) determine needed capabilities, (5) understand readiness, (6) receive evidence-based recommendations, (7) compare simple/growing/advanced options, (8) organize tools, (9) prioritize actions, (10) distinguish possible vs actually-supported connections.

**Non-goals:** replace agency software; manage projects; publish content; run ads/SEO/email; payments; accounting; auto-connect everything; real-time monitoring; arbitrary automation; predictive analytics.

---

# **4. Core Product Model**

**Agency → Business Area → Process → Process Stage → Need/Problem → Digital Capability → Solution → Tool → Improvement Action**, with **Tool → Connection → Process Event/Status** only where integrations are implemented. Every recommendation traces to a need, requirement, or finding — never to catalogue existence.

---

# **5. Core MVP Features**

## **5.1 Account and Agency Setup**
Account + sign-in; agency profile (name, services, team size, operating model solo/contractors/employees/mixed, digital adoption, improvement priorities, existing tools); save/update; service-based template selection; solo consultants never forced through employee assessments.

## **5.2 Business Process Library**
Six areas (Business Development, Client Management, Service Delivery incl. conditional service templates for social/SEO/paid/content/email/web/branding, Team & Resource, Financial & Commercial, Performance & Growth). Structured, stable IDs, service-linked, expandable without UI rewrites; custom processes allowed.

## **5.3 Process Assessment and Mapping**
Select → describe (or template) → review/edit stages → confirm → assess. Add/edit/remove/reorder stages, save incomplete work, reopen confirmed maps. Auto-interpreted stages stay editable; uncertainty is never treated as fact.

## **5.4 Needs and Problems**
Per relevant process: existence, current workings, tools, ownership, delays/errors/duplication/confusion, frequency, impact (delivery/time/cost/quality/experience), workarounds, desired outcomes. Problems link to process, stage, evidence, impact, possible causes, confidence, validation questions. Symptoms ≠ causes; no invented problems; manual ≠ broken; "Not sure"/"Not applicable" supported; findings correctable.

## **5.5 Digital Capability Mapping**
Process → Problem/Need → Capability (multi-capability problems allowed; some solved without software). Capabilities connect to processes/needs with visible reasoning; never auto-purchase pressure.

## **5.6 Digital Readiness (Levels 1–4: Start/Organize/Connect/Optimize)**
Considers maturity, tool usage, complexity, capacity, resources, required capabilities, maintainability. Every level explained; not self-assessment alone; may differ by process; never pressures advanced adoption.

## **5.7 Recommendations (Essential Now / Useful Next / Advanced Later + Simple/Growing/Advanced alternatives)**
Each explains need, evidence, capability, suitability, relation to existing tools, trade-offs, effort, constraints, next step. Existing tools considered first; process improvements included; no duplicates; no fabricated features/prices/integrations; catalogue separate from logic; unverified marked.

## **5.8 Digital Stack**
Tool records (name, category, purpose, capabilities, processes, website). Statuses: Already using, Recommended, Under consideration, Selected, Planned for later, Rejected. Selection ≠ connection ≠ purchase. Decisions updatable.

## **5.9 My Map — "Where am I now?"**
Profile summary, areas, processes + stages, assessment status, tools, problems + evidence, clarification needs. Labels: Working / Needs attention / Not working (confirmed only) / Not assessed / Not enough data / Not currently relevant. Never label unassessed as broken.

## **5.10 My Plan — "What should I improve next?"**
Prioritized NOW/LATER/FUTURE actions, each with description, problem/opportunity, evidence, outcome, steps, software-necessity, capabilities/tools, priority/effort, dependencies. Includes non-software actions. Statuses trackable.

## **5.11 My Drive — "What have I chosen?"**
Decisions with statuses (Under consideration / Selected / Already using / Implementation in progress / Implemented / Rejected), linked to problem/capability/process/action. Recommendations never auto-selected; updates persist; consistent with Stack and Plan.

## **5.12 Visibility**
Assessment/manual/verified-integration/insufficient-data sourcing shown per status. Unknown ≠ failure. No real-time claims without live data.

## **5.13 Connection Planning**
Show potential tool relationships, purpose, supported stages, and supported-vs-proposed status. Never label proposed as active. Live integrations optional, separately secured and tested.

---

# **6. Primary User Journey**

Sign up/in → agency profile → services + priorities → template or custom process → describe workflow → confirm map → assessment questions → needs/problems review → capabilities → readiness → compare options → select/retain tools → Digital Stack → My Map → My Plan → My Drive → revisit as the agency changes.

---

# **7. MVP Screens (reuse routes/components where practical)**

Landing, Authentication, Agency setup, Improvement priorities, Process selection, Process discovery, Editable process map, Requirements & assessment, Digital readiness, Recommendations & alternatives, Digital Stack, My Map, My Plan, My Drive, Process details/editing, Tool details, Account & agency settings. No Connection Center unless working integrations ship.

---

# **8. Core Data Requirements**

User → Business → Business Service → Business Area → Process Template → Business Process → Process Stage → Assessment → Response → Problem → Need → Capability → Tool → Business Tool → Recommendation → Improvement Action → Tool Relationship → Integration Connection (only where implemented). Stable IDs, ownership preserved, templates separate from agency records, logic separate from UI, history preserved, server authorization, versioned migrations, no destructive changes.

---

# **9. Technical Requirements**

Reuse architecture; separate logic from presentation; structured data; persist assessments/decisions; server validation; ownership/authorization; secret protection; loading/empty/error states; mobile + accessible; core-logic tests; preserve working features. Deterministic explainable engine; no AI APIs required.

---

# **10. Security and Data Protection**

Auth for private data; per-record ownership; server validation; credential protection; no sensitive logs; safe DB errors; cross-business tests; data-preserving migrations. Fix serious vulnerabilities before exposing affected features.

---

# **11. Acceptance Criteria (ready for validation when)**

Registration + profile (services/characteristics) → templates available → stages editable → assessments saved → problems traceable → capabilities mapped → explainable readiness → existing-tool-aware recommendations with alternatives → Stack reflects decisions → Map/Plan/Drive correct → proposed vs active connections honest → no fake live statuses → persistence + authorization → journey tested → desktop + mobile → demonstrable without misrepresentation.

---

# **12. Validation Plan**

Pilot 5–10 agencies/consultants across operating models and service mixes. Validate: plain-language mapping, problem recognition, capability relevance, budget/readiness fit, clear next steps, proposed-vs-live understanding, return intent. Track: profile/first-assessment/map completion, usefulness, actions saved, decisions, returns, clarity feedback. Refine before integrations, live monitoring, or new niches.

---

# **13. Implementation Priorities**

1. Audit & Foundation. 2. Agency Profile & Process Library. 3. Mapping & Assessment. 4. Problems & Capabilities. 5. Readiness & Recommendations. 6. Map/Plan/Drive integration. 7. Stack & Connection Planning. 8. Security, Testing, Pilot Prep. 9. Optional selected integrations only after core stability. One phase at a time.

---

# **14. Final Product Definition**

PrimeDesk is a business-process-first digital technology orchestration platform for digital marketing agencies: understand processes, find problems, determine capabilities, choose tools, organize the stack, prioritize improvements. Central question: **Given how your agency works today, what digital system do you need now, and what should you improve next?**
