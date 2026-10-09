# PrimeDesk — Phase 1 Build Document (source of truth for implementation)

Stack: Next.js 14 App Router + React + TypeScript, PostgreSQL + raw `pg`
(no ORM), Better Auth email-OTP, Tailwind present but styling is custom
`app/globals.css` classes + inline styles. Design: light theme, Business Blue
`#1A56DB`, Action Orange `#E8590C`, growth greens, Sora headings, Inter body.

## Phase B — Foundation (done)
- Auth: passwordless email OTP (`lib/auth.ts`, `/api/auth/[...all]`), login page,
  guest banner, logout on `/profile`.
- `businesses` owned by `user_id`; `/api/save` requires session + ownership
  (401 anon, 403 foreign id, 404 no business).
- `/api/business` GET/POST with shared validation (`lib/business-categories.ts`).
- `/business-profile` (category → conditional subtype, size, years), `/profile`,
  aliases `/my-map /my-plan /my-drive` via `next.config.mjs` rewrites.
- Journey state in `localStorage` (`primedesk_state_v1`) is convenience only;
  the database is the authority for ownership.

## Phase C — Business & Process Model (done)
- Tables: `business_areas`, `catalog_processes`, `relevance_rules`,
  `business_traits`, `business_processes` (per-business status + relevance).
- Central engine `lib/business-model.ts`: explicit rules win, "possible" defers
  to answered traits, unanswered stays possible (never assumes).
- Categories canonical (Food, Beauty & Grooming, Fashion, Service Business,
  Other) with legacy aliases (`Beauty`, `Nail Studio`).
- APIs: `business-model` (catalog), `my-map` (areas + relevance + questions),
  `my-map/traits`, `my-map/status`, `my-map/complete` (legacy template bridge).
- `/map` overview renders areas → process cards (Not Started / In Progress /
  Mapped) + discovery Yes/No questions.

## Phase D — My Map (this phase)

### Purpose
Guided process mapping: Business → Relevant Process → Guided Questions →
Current Workflow → Current Tools → Problems → Business Need → Mapped.
Understand first, recommend second. No tool picks anywhere in this phase.

### Mapping flow
`/map` overview → `/map/[processId]` → one question at a time → review →
complete → structured summary → Continue Mapping. Partial answers autosave
(draft) and resume with prefilled answers. Mapped processes reopen as summary.

### Question architecture
- Table `mapping_questions`: process-specific rows win, else area-generic rows.
- Fields: qkey, question, type (single|multi|text|long|yesno), options (jsonb),
  required, order, help, purpose (workflow|tools|problems|need|context).
- UI (`/map/[processId]`) renders purely from this config — new questions are
  data rows, never code changes. Types supported exactly as listed, nothing more.

### Process mapping data model
- `process_mappings(business_id, process_id, status, answers jsonb,
  workflow text[], tools text[], problems text[], need text, completed_at)`.
- `business_processes.status` stays the progress source; both rows update together.
- Workflow = selected workflow-purpose options in question order (+ Other text).
  Nothing is invented: unanswered areas stay empty, shown as "Not specified yet".
- No-problem path: selecting "No major problem" lets need stay empty; summary
  shows the "working well" line and no fake problem is stored.

### Status model
not_started → in_progress (first draft save) → mapped (complete validates all
required answers + need rule). No "Recommendations Ready" status (Phase E).

### APIs
- `GET /api/my-map/questions?processId=` — process + resolved questions +
  saved answers + status. Rejects not-relevant processes (400).
- `POST /api/my-map/answers` — sanitizes + upserts draft, flips to in_progress
  (never demotes a mapped row).
- `POST /api/my-map/complete-mapping` — full validation, derives summary,
  marks mapped on both tables, returns the summary JSON.
- All verify session → owned business → relevance. Plain-language errors only.

### Security
Phase B ownership extended: every mapping endpoint resolves the user from the
Better Auth session, loads only their business, and rejects unknown/foreign
process ids. No client-sent user/business ids trusted.

### UI flow
Existing cards/buttons/pills/fields reused; 3 new pill shades only
(`pill-todo/progress/mapped`). Mobile-first, 48px+ targets, one question per
screen, review before complete, summary with workflow arrows.

### Workflow generation / tools / problems / needs
Derived deterministically in `lib/mapping.ts` (`validateAnswers`,
`deriveSummary`). Current tools are recorded as-is — never presented as
recommendations. Needs are the owner's own words (long-text answer).

### Testing
Matrix: create/save-partial/resume/complete/update, status transitions,
auth matrix (anon 401, cross-user 403/null, business-less 404), relevance
(not-relevant rejected), 5 niches, no-problem path, refresh persistence,
regression (auth, profile, journey, aliases). See commit history for results.

### Known limitations
- Card Start/Continue/Review all enter the guided flow (no per-state deep
  branches yet); legacy template editor remains below the overview.
- Template→catalog `complete` bridge kept for the legacy editor path.
- No test-runner suite (Phase I); verification is live-API based.

### Remaining Phase E requirements (now implemented below)

## Phase E — Digital Needs & Recommendations (done)

### Digital capability model
`digital_capabilities` (id, name, description, category, maturity
foundational|growing|advanced) linked to processes via `capability_processes`,
matched by `capability_signals` keywords against the mapped problems + need.
14 capabilities seeded (communication, records, follow-up, orders, bookings,
payments, expenses, profit, stock, reorder, marketing, sales, tasks, files).

### Recommendation engine (`lib/recommend.ts`, pure, no AI)
Per mapped process (skipped when no-problem or no problems):
Problem → matching capabilities (signal must hit text) → current-tool check
(`tool_equivalents` substring match → "covered" note, no new tool) → up to 2
tools each (free + Easy first) → stage from `tool_capabilities.base_stage`,
bumped one level when tool is Advanced or capability is advanced AND the
business is small (`Just me`/`2–5`) or young (`< 1 year`). Reasons are built
from the owner's own process/problems/need words. Priority = pain count +
stage weight. No signals match → no recommendation (never forced).

### Tool library
`digital_tools` (15 seeded: honest categories only, no invented prices) +
`tool_capabilities` (base stages) + `tool_equivalents`. Read API
`GET /api/tools` (light fields, login required).

### No-recommendation logic
Empty problems, no-problem mappings, and unmatched signals all yield nothing;
Plan shows the "doing fine" empty state. Covered capabilities yield a
keep-using-what-you-have note instead of a tool.

### Current-tool handling
Mapping's recorded current tools are matched before recommending; covered
capabilities never produce duplicate software.

## Phase F — My Plan (done)
`GET /api/plan` regenerates from mapped data on every view (old active rows
→ superseded; Drive selections untouched), groups NOW/LATER/FUTURE with a
counts summary. Cards show tool, Best for, Why (traceable reason),
stage pill, pricing + difficulty, Learn More link, Add to My Drive ↔ Added
state. Covered notes render as green cards without buttons. Empty state per
spec. Trace line on every card: process → capability.

## Phase G — My Drive (done)
`my_drive_selections(business, tool, recommendation?, selected_at)` with
unique(business, tool) — duplicates return the existing row. `GET /api/drive`
groups by capability with process trace + selected date; `POST /api/drive`
validates tool active + recommendation ownership; `POST /api/drive/remove`
hard-deletes (library + Plan unaffected). Drive holds only explicit choices;
legacy localStorage ticks are ignored. UI: grouped stack, Open site, View in
Plan, Remove, spec empty state.

### Security
Every E–G endpoint resolves the user from the Better Auth session and scopes
by owned business; foreign ids → 403/404; server validation throughout;
plain-language errors; no secrets in code or logs.

### Testing (live)
5 niches with differing recs; bump rule both directions (Zoho FUTURE for
tiny salon, LATER for 50+ consultancy); covered path (no duplicate Sheets);
no-force plan (total 0); Drive add/dup/remove/plan-unaffected; isolation
(null/404/403 ×3 endpoints); full Business→Drive traceability in one SQL
query; regression (auth, profile, journey, aliases, save).

### Known limitations
- Plan regenerates per view (fine at pilot scale; cache later if slow).
- Legacy template ticks ignored by new Drive (documented behavior change).
- No test-runner suite (Phase I); verification is live-API based.

### Phase H requirements (now implemented below)

## Phase H — Auth, PWA, Production Readiness (done, with external caveats)

### Authentication architecture
- Better Auth 1.7.7, single architecture extended (not replaced): emailOTP
  (unchanged) + phoneNumber plugin (passwordless OTP login).
- Unified `/login` = Start/Login screen: one input accepts email or Nigerian
  phone (`080…`/`8…`/`+234…` normalized by `lib/phone.ts`), masked destination
  display, 6-digit code, 30s resend cooldown, change option. Post-verify
  routing: existing business → `/drive`, else `/business-profile`.
- Phone users auto-provision with temp email `<digits>@phone.primedesk.local`
  (plugin design); email and phone remain separate accounts (known limitation).
- OTP: 6 digits, 10-min expiry, single-use, server rate limiting observed;
  no OTPs in production logs.

### SMS provider
`lib/sms.ts` → Termii `api.ng.termii.com/api/sms/send` (generic channel,
server-side key only). Env-gated: without `TERMII_API_KEY` it pilot-logs
(local only). Production needs key + approved sender ID (external, pending).

### Environment variables (names only)
`DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, ZEPTOMAIL_API_KEY,
ZEPTOMAIL_FROM, GMAIL_USER, GMAIL_APP_PASSWORD, TERMII_API_KEY,
TERMII_SENDER_ID, TERMII_CHANNEL`. Secrets never in code/logs/GitHub.

### Database changes
`migration-phase-h.sql`: `"user"."phoneNumber"` (unique, nullable) +
`"phoneNumberVerified"` (default false). Applied local + Neon.

### PWA implementation
- `app/manifest.ts` → `/manifest.webmanifest` (name, short name, standalone,
  theme `#0B1D33`, 192 + 512 maskable icons).
- Icons reused from existing brand mark (`public/icons/`, generated pilot set).
- Hand-written `public/sw.js` (no new packages): app-shell precache,
  static cache-first, navigations network-first with `/offline` fallback,
  `/api/*` never cached. `PwaRegister` registers SW + online/offline pill in
  footer; `InstallButton` surfaces `beforeinstallprompt` on landing.
- `netlify.toml`: `/sw.js` no-cache (prevents phones stuck on old versions), icons immutable,
  manifest daily, `/api/*` no-store.

### Route protection / security
- Server ownership on every user endpoint (Phases B–G re-verified).
- `/api/email-test` now requires login (was an open mail relay).
- Parameterized queries throughout; plain-language errors; focus-visible
  outlines + labeled inputs + `aria-live` status + one-time-code autocomplete.

### Testing (live, local)
Phone send→verify→session→authed API; bad phone 400; wrong code 400; email
OTP regression; full B–G regression (business, map, plan, drive, 7 pages
200); PWA routes (manifest/sw/offline/icons) 200. Test data cleaned.

### Known limitations / external setup still required
- Termii account + API key + approved sender ID + SMS balance (owner action).
- Domain + ZeptoMail sender (owner action); Gmail SMTP is the working pilot path.
- Netlify env vars for any fresh project + redeploy (owner clicks).
- Rotation of secrets previously pasted in chat (Neon password, ZeptoMail
  token, Gmail app password) when pilot ends.
- Responsive spot-checks at 320–430px/768/1024/1280+ and install-prompt UX
  need a real device pass (owner's phone recommended).
