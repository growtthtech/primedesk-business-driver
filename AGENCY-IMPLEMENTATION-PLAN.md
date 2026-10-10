# PrimeDesk Agency Build — Implementation Plan

Target: digital marketing agencies. Principle: Understand First, Recommend Second.
Status notes reflect the actual build (`web/`); unchecked items are the remaining path.

## Phase 1 — Audit & Foundation ✅ DONE
Routes, auth (Better Auth email OTP + phone), Postgres + raw SQL, ownership middleware, design system (Sora/Inter, blue/orange/green), Netlify config. Reuse everything below.

## Phase 2 — Agency Profile & Process Library ✅ DONE
- Profile: name, category/subtype, size, years, operating model, priorities, tech usage, services multi-select (`business_services`).
- Library in Postgres: 6 areas, 139 agency processes (+31 shared/SME rows), 9 services, service-conditional relevance, solo adjustments, segment firewall.
- 46 mapped question sets (6 area-generic + 4 process overrides), 31 capabilities, 21 tools, 8 no-purchase practices.

## Phase 3 — Mapping & Assessment ✅ DONE
Guided per-process flow (`/map/[processId]`): one question at a time, drafts autosave/resume, review → complete → structured summary (workflow/tools/problems/need). No-problem path supported. Custom stages via legacy editor (retained).

## Phase 4 — Problems & Capabilities ✅ DONE
Problems + need stored per mapping with evidence (answers jsonb); capability matching by signal keywords; covered-tool check before recommending; practices emitted per capability.

## Phase 5 — Readiness & Recommendations ✅ DONE
Deterministic readiness Levels 1–4 with written explanation on Plan. NOW/LATER/FUTURE + Simple/Growing/Advanced posture via maturity bump rules. Reasons cite owner words; trade-offs + alternatives shown; unverified fields marked via `last_verified`.

## Phase 6 — Map/Plan/Drive ✅ DONE
My Map (areas, statuses, discovery, hide/restore), My Plan (grouped cards, summary, readiness), My Drive (grouped stack, 5 decision statuses, remove). Ownership enforced on all endpoints.

## Phase 7 — Stack & Connection Planning ⏳ PARTIAL
Stack = Drive groupings + tool details (done). Connection planning: show proposed-vs-active honestly — **deferred until ONE real integration ships** (candidate: Paystack payment→Paid). Never label proposed as active.

## Phase 8 — Security, Testing, Pilot Prep 🔲 REMAINING
- [ ] Netlify project recreation + 7 env vars + redeploy + outside verification
- [ ] Termii account/key/sender approval (or stay on email)
- [ ] Secret rotation (Neon password, Gmail app password — both in chat history)
- [ ] 5–10 agency pilot + validation questions (§12 of PRD)
- [ ] Phone-device responsive/install pass

## Phase 9 — Optional Integrations 🔲 DEFERRED
Only after core stability + pilot evidence. Candidates: Paystack (payment events), then nothing else until validated.

## Rules of the road
Smallest safe changes; reuse → extend → create; no new frameworks; no AI; deterministic logic; plain-language errors; mobile-first; test live before claiming done.
