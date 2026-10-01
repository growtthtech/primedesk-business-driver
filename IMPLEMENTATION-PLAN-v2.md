# PrimeDesk — Implementation Plan v2 (Locked - Build Ready)

**Owner:** Business Driver / Business Uber for Nigeria SMEs
**Status:** LOCKED v2 — Design v4 + Stack v2 approved. Ready to scaffold `/web`.
**Supersedes:** IMPLEMENTATION-PLAN-v1.md (kept as history, do not build from v1)
**Goal:** Build in small testable phases. Advice before plumbing.

> Rule: Prove owners trust the map + plan first, then add live connections.

---

## 1. What We Are Building

Mobile-first website (light theme) where an owner:
1. Business Setup — 4 picks, 1 min
2. Pick 1 process — Booking / Orders+Payment / Follow-up
3. Describe work in own words
4. Confirm visual map (rename/delete/add)
5. Get plan: Start Now (urgent orange) / Next / Later + Growth greens
6. Home with 3 tabs: My Process / My Tools / Growth Path

MVP: account + manual tick "I use this" + manual Done/Waiting/Stuck. No live WhatsApp/Payment link in MVP.

First niche: Beauty/Wellness + Food/Fashion vendors, 2-20 staff, WhatsApp + transfer already in use (Level 1 Start → Level 2 Organize).

---

## 2. Design System v4 Locked (Light Business)

Preview: open `DESIGN-PREVIEW.html`. Spec: `DESIGN-SYSTEM-v1.md` (v4 section).

- **Theme:** Light. Page white #FFFFFF, sections Mist #F8FAFD, thin 1.5px borders #E6EAF0, radius 14-16px, soft shadows, airy padding. Max width 480-680px centered, 48px+ tap targets, <100KB/screen for 2G/3G.
- **Business Blue #1A56DB:** normal Continue buttons, headers #1A3A5C, map box borders #C9D7EA on #F8FAFD bg.
- **Action Orange #E8590C (Start Now only):** 2px border, badge "⚡ START NOW — Do this today" white on orange, button "Start Now → Build My System" orange with glow, card bg #FFF7F0. Words: today/now/don't miss. Only place orange appears.
- **Growth Green family (Growth Path only):** card bg #F2FBF4, Today box #DFF5E3 / border #A9DFBF / text #1B7A3D, timeline line #34A853. Fresh progress feeling.
- **Status pastel:** Done #EDF3FE/#1A56DB, Waiting #FFF8E1/#8A6D00, Stuck #FFF1F1/#C03636.
- **Font:** Inter. Title 26/800, Section 18/700, Body 16, Hint 14 #7A8699. Plain English, WhatsApp examples.
- **7 components:** Wizard Step, Process Card, Stage Node + gold-grey ↓, Status Pill, Plan Card (Start orange / Next blue-grey / Later grey), Tool Row, Growth Timeline green.

Tailwind tokens for `/web`:
```
--primary:#1A56DB --ink:#2B3440 --mist:#F8FAFD --line:#E6EAF0
--action:#E8590C --action-dark:#C94A08 --action-bg:#FFF7F0
--growth-bg:#F2FBF4 --growth-box:#DFF5E3 --growth-border:#A9DFBF --growth-line:#34A853 --growth-text:#1B7A3D
```

---

## 3. Architecture (3 layers + future)

```
[Experience] Next.js website (phone-first) — 6 steps + 3-tab Home, offline-save first
    ↓
[Brain] /rules JSON: booking.json, orders.json, followup.json (stages → needs → Start/Next/Later) + level rule
    ↓
[Memory] Postgres tables: businesses, processes, stages, business_tools, plans
    ↓ (Phase 3 only)
[Links] Plug-ins: Paystack/Flutterwave webhook, Termii SMS/WhatsApp, R2 uploads — each with on/off + pause
```

No business logic in UI. Brain editable without code change. Links isolated — if link fails, app still works.

---

## 4. Tech Stack v2 Locked (Local-First)

Full table: `TECH-STACK-v1.md` (v2 section). Summary:

| Part | Choice | Notes |
|------|--------|-------|
| Website | Next.js + TypeScript | `localhost:3000`, Node 20 LTS |
| Styling | Tailwind + shadcn/ui | Tokens above |
| Map MVP | Simple vertical list | React Flow later for drag |
| Login | Better Auth (email+password+Google) | Needs Postgres + ZeptoMail for codes |
| Database | PostgreSQL 16 local, db `primedesk` | pgAdmin/DBeaver, daily backup |
| Storage | Cloudflare R2 (S3-compatible) | Keys saved now, used Phase 2 |
| Email | ZeptoMail (Zoho) | Welcome, login codes, digests |
| Hosting now | Local on your PC | Same-WiFi phone test via `YOUR-PC-IP:3000`, PC+DB must be on |
| Payments | Paystack primary + Flutterwave backup | Phase 3 only, test keys later |
| SMS/WhatsApp | Termii | Phase 2 test reminders, Phase 3 auto |
| Tracking | Umami local (or PostHog cloud free) | Where owners drop off |
| Code | GitHub primedesk-business-driver | Already connected |

Secrets in `.env.local` only (never push): DATABASE_URL, BETTER_AUTH_SECRET, R2 keys, ZEPTOMAIL keys, later PAYSTACK/FLUTTERWAVE/TERMII keys.

Local run: `npm install → npm run dev → http://localhost:3000`. Moving online later = same code, change addresses/keys only.

---

## 5. Phased Build (with exit gates)

**Phase 0 — Foundation (Wk 1-2) — current**
- [x] Lock design v4 + stack v2
- [ ] Scaffold `/web`: Next.js+TS+Tailwind+shadcn, tokens above, `/rules/*.json`, Postgres schema, Better Auth skeleton, `.env.local.example`, Umami hook
- [ ] Figma/paper test 5 owners with preview HTML
- Exit: 4/5 say map looks like their business.

**Phase 1 — Guided Journey (Wk 3-6)**
Screens 1-5, auth + save (local + DB), 3 templates, map editor, level calc (manual→Start / few tools→Organize / many→Connect), Plan with orange Start Now, tick save, drop-off logging.
Exit: 70% finish <10min, 50% accept Start Now.

**Phase 2 — Home + Manual Tracking (Wk 7-8)**
3-tab Home, Done/Waiting/Stuck toggle, My Tools + When-to-upgrade, Growth Path greens, R2 uploads, ZeptoMail digest, Termii manual test.
Exit: 30% return in 7 days.

**Phase 3 — First Live Link (Wk 9-12, ONE only)**
Paystack confirm → mark Paid Done OR order form → customer list. Connect → Choose → Confirm → Connected + Pause/Reconnect/Remove.
Exit: stays Connected 2 weeks.

**Phase 4 — Grow (post-validation)**
2nd process, staff roles, "12 no follow-up" nudges, more templates, comparison, automation.

Never in 0-2: live WhatsApp read, auto % health, activity feed, multi-tool Connection Center, charts.

---

## 6. Data Model (Postgres)

- `businesses(id, name, type, how_they_work, team_size, level, owner_email)`
- `processes(id, business_id, template, raw_text)`
- `stages(id, process_id, name, position, status)`
- `business_tools(id, business_id, stage_id, tool_name, in_use)`
- `plans(id, business_id, start_json, next_json, later_json, created_at)`
Better Auth tables separate (`user, session, account, verification`).

---

## 7. Nigeria Risks + Mitigations
Network/power → light pages, offline-save-then-sync. Trust → small Start Now max 4 tools + Why/When lines, owner controls Later. Shared phones → owner-only MVP. Fake transfers → manual Done in MVP, provider proof only in Phase 3. Scope creep → gates above; fix words/templates before adding features.

---

## 8. Next Action
Say **"Scaffold web"** → I create `/web` with above tokens/stack skeleton and push. Old `/mvp` demo replaced.
Old v1 plan kept for history. Build only from this v2.

*End v2.*
