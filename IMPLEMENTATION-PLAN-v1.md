# PrimeDesk — Implementation Plan v1 (Phased)

**Owner:** Business Driver / Business Uber for Nigeria SMEs
**Status:** DRAFT for review - No code in Phase 1 until you approve stack
**Goal:** Build in small phases you can test and adjust. No big-bang build.

> Rule: Advice before plumbing. We prove owners trust the map + plan first, then we add live connections.

---

## 1. What We Are Building (in one page)

A mobile-first website where a business owner:
1. Tells us about business (1 min)
2. Picks 1 process from 3 templates
3. Describes work in own words
4. Confirms visual process map
5. Gets Start Now / Next / Later tool plan
6. Returns to 3-tab Home: My Process / My Tools / Growth Path

MVP saves everything in the browser + simple account. No live WhatsApp/Payment link in MVP. Owner ticks "I use this" manually.

---

## 2. Design System First (So it looks trustworthy, not techy)

You asked to start here. This is what every screen will use:

**2.1 Brand feeling:** Calm driver, not software dashboard. Think Uber + TurboTax: big text, one action per screen, plain words.

**2.2 Colors:**
- Primary: Deep Green #0E7A5F (trust, growth, money) - main buttons, headers
- Dark: Charcoal #1A1D21 (text)
- Background: Off-white #F7F8F7 (app bg), White cards
- Accent: Warm Yellow #FFC53D (for "Needs attention" only, sparingly)
- Status colors: Done=Green, Waiting=Orange #E8830C, Stuck=Red #D93D3D, Neutral=Grey
- All buttons min 48px tall for thumb tap, large on small phones

**2.3 Type:**
- Font: Inter (free, clear on cheap Android phones, good for English + Pidgin)
- H1 24px bold, H2 20px, Body 16px, Hint 14px grey
- Never use tech words in UI. Say "Your tools" not "Integrations", "Waiting" not "Pending execution".

**2.4 Core Components (reused everywhere):**
1. `Wizard Step` - headline + hint + 1 input + 1 big Continue button + Back link
2. `Process Card` - large tappable card for Booking / Orders / Follow-up
3. `Stage Node` - box with arrows ↓, with Rename / Delete, + Add stage row
4. `Plan Card` - Start Now (green border) / Next (grey) / Later (light) with checkbox "I use this"
5. `Status Pill` - Done / Waiting / Stuck - owner taps to change
6. `Growth Roadmap` - vertical timeline Today → Next → Future
7. `Tool Row` - Tool name + What for + Which stage + When to upgrade

**2.5 UX Rules for Nigeria:**
- Mobile-first, must work on 3.5" Android + 2G/3G. No heavy images/video.
- Each step loads <100KB. Works if network drops, saves locally then syncs.
- Pidgin-friendly hints. Example placeholder in WhatsApp language.
- One language: English simple. No settings maze.
- Accessibility: high contrast, big tap areas for low-literacy users.

**Deliverable of Design Phase:** Figma file with 6 screens + 7 components above + clickable prototype for 5-owner paper test.

---

## 3. Architecture Plan (How the pieces fit, in simple words)

Think of 3 layers + 1 future layer:

```
[1. What owner sees]  Website (phone + desktop)
        ↓ saves / loads
[2. The Brain]  Rules: Words → Stages → Needs → Level → Plan
        ↓ stores
[3. Memory]  Database: Businesses, Processes, Stages, Tools, Statuses
        ↓ (P3+ only)
[4. Future Links]  One link at a time: Payment confirm, Form to list, etc.
```

**3.1 Frontend (Experience):** Renders 6 steps + 3-tab Home. Handles offline save. No business logic mixed in UI - calls Brain.

**3.2 Brain (Recommendation Engine):** Starts as simple JSON rules, NOT AI.
Example rule file: `booking-template.json` = stages list + each stage need + Start/Next/Later mapping.
Why: you can edit advice without changing code. Later we can add smart help to turn free text into map, but MVP can be manual/template-based.

**3.3 Memory (Data):** Tables:
- `businesses`: id, name, type, how_they_work, team_size, level
- `processes`: id, business_id, template, raw_text
- `stages`: id, process_id, name, order, status [Done/Waiting/Stuck]
- `business_tools`: id, business_id, stage_id, tool_name, in_use [yes/later]
- `plans`: snapshot of Start/Next/Later shown

No real customer personal data stored in MVP beyond business profile.

**3.4 Future Links Layer (Isolated):** When we add first live link (e.g., Paystack payment → mark Paid), it lives as a separate plug-in with on/off switch, pause/reconnect. If it fails, rest of app still works.

---

## 4. Tech Stack Proposal (Pick / Adjust - Awaiting Your Decision)

I propose one recommended path + alternatives so you can choose what suits you.

### RECOMMENDED: Option A - Fast + Cheap to Run (My pick for you)

| Part | Choice | Why in simple words | Alternative if you don't like it |
|------|--------|---------------------|----------------------------------|
| Website Framework | **Next.js + TypeScript** | One language for whole site, fast on phones, easy to grow from MVP to full product | Plain React (Vite) - simpler but more work later |
| Look / Styling | **Tailwind CSS + shadcn/ui** | Use ready-made clean buttons/cards, matches Design System fast | Plain CSS - you control everything but slower |
| Process Map UI | **React Flow (for map only)** | Drag boxes + arrows without building from scratch | Custom boxes list (what we started in /mvp) - simplest for MVP |
| Account + Login | **Supabase Auth** | Email + Google login ready, no need to build password system | Firebase Auth, or skip login in very first test |
| Database | **Supabase Postgres** | One place for Memory tables above, free to start, scales | Firebase Firestore (easier but less structured) |
| Hosting Website | **Vercel** | Free to start, fast in Nigeria via CDN, push from GitHub auto-updates | Netlify / Cloudflare Pages - similar |
| File / Image | **Supabase Storage** | If owners upload price list later | - |
| Analytics (simple) | **PostHog** | See where owners drop off (Step 2? Step 4?) without guessing | Plausible (lighter, privacy-friendly) |
| Domain + Email | Namecheap + Resend | Cheap domain, simple emails | - |

**Running cost Day 1:** ~$0-15/month (domain only). All above have free tiers enough for first 100 businesses.

### Option B - Ultra-Lean (If you want zero backend to manage)
Frontend only: Vite + React + LocalStorage save. No login, no database. Good for 2-week demo to 10 owners, but you will rebuild to add accounts. I don't recommend beyond paper test.

### Option C - Python Route (If you / your team know Python better)
Django + HTMX + Postgres + Render hosting. Solid, but slower for highly interactive map UI and harder to find cheap frontend help in Nigeria. Only pick if you already have Python devs.

**My professional advice:** Approve Option A. It lets us build Phase 1 in 3-4 weeks, keep costs near zero, and you won't need to rebuild when we add login + first live link.

> ACTION FOR YOU: Tell me Keep / Change for each row. Especially: Do you have a team that knows JavaScript or Python? Do you already have domain/hosting?

---

## 5. Phased Build Plan

### PHASE 0 - Foundation (Week 1-2) - We are here
- [ ] Approve this plan + stack
- [ ] Finalize Figma for 6 screens using Design System 2.2-2.4
- [ ] Set up repo: `/web` (Next.js app), `/rules` (JSON templates), `/docs`
- [ ] Define data tables (section 3.3) in Supabase
- [ ] Test prototype with 5 owners on phone (no code needed)
- Exit: 4/5 owners say "Yes, this is my process" on paper.

### PHASE 1 - Guided Journey MVP (Week 3-6)
Build Screens 1-5 only, no Home polish.
- Auth (simple), Business Setup save
- 3 templates from `/rules`, Describe → Show map (template match first, manual edit)
- Map editor: rename/delete/add
- Level calc: simple rule (if manual → Start, if few tools → Organize, if many → Connect)
- Plan page from JSON, tick "I use this"
- Save locally + to DB. Basic analytics: % finish each step.
- Exit: 70% finish in <10 min, 50% accept Start Now.

### PHASE 2 - Home + Manual Tracking (Week 7-8)
- 3-tab Home, Status Pill Done/Waiting/Stuck manual toggle
- My Tools list + Growth Path timeline
- Return visit + 7-day reminder (email/WhatsApp message - manual for now)
- Exit: 30% return in 7 days.

### PHASE 3 - First Live Link (Week 9-12) - P1 starts, only ONE
Pick ONE based on Phase 1 data. Likely:
- Option 1: Payment recorded → mark Payment Done (Paystack/Flutterwave/Moniepoint manual confirm first, auto later)
- Option 2: Simple order form → adds to customer list
Includes Connect → Choose what it should do → Confirm → Connected + Pause/Reconnect/Remove.
Exit: One link stays Connected for 2 weeks without breaking.

### PHASE 4 - Grow (After validation)
- 2nd process, staff roles, reminders "12 no follow-up", more templates, comparison, advanced automation.

What we DELIBERATELY do NOT build in Phases 0-2: live WhatsApp link, auto % health, activity feed, Connection Center with many tools, team chat, analytics charts.

---

## 6. Risks for Nigeria + How we handle

1. Poor network/power → Light pages, offline save, no auto-play.
2. Low trust in new software → No big promise, show Why for each tool, owner controls Add Later.
3. Staff share one phone → MVP is owner-only, no complex roles yet.
4. Transfer scams / fake payments → In MVP we don't auto-confirm money, owner marks Done. Auto-confirm only in Phase 3 with provider proof.
5. Building too much → Phase gates above. If Phase 1 metrics fail, we fix advice, not add features.

---

## 7. What I need from you to start Phase 0

1. Stack decision: Approve Option A or tell me what to swap (e.g., "I want Firebase, not Supabase" / "My dev knows Django")
2. Confirm niche for templates: Keep Beauty + Food + Fashion for first 3 templates? Yes/No
3. App name + domain: Keep PrimeDesk? Do you own primedesk.ng / .com?
4. Figma or skip to code? I recommend 3-day Figma first.

Once you reply, I will scaffold `/web` with Next.js + Tailwind + Design System tokens and replace the current `/mvp` demo.

---
*End of Plan v1. Next file after approval: `/web` starter + `rules/booking-template.json`*
