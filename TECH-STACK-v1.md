# PrimeDesk Tech Stack v1 — Decision Table

**How to use:** Read Recommended column. Mark Keep / Change per row. I will build only after you approve.

## Recommended Path: Option A (Fast + Cheap for Nigeria MVP)

| # | Part (simple meaning) | Recommended Choice | What it does for you | Cost Day 1 | If you want different |
|---|---|---|---|---|---|
| 1 | Website base | Next.js + TypeScript | Builds fast pages that work well on phones, one language for all | Free | Vite + React (simpler demo, rebuild later) |
| 2 | Styling (look) | Tailwind CSS + shadcn/ui | Ready clean buttons/cards, matches Design System fast | Free | Plain CSS (full control, slower) |
| 3 | Process map drawing | React Flow | Drag boxes + arrows without coding from zero | Free | Simple vertical list (easiest MVP, no drag) |
| 4 | Login | Supabase Auth | Email/Google login ready, no password headaches | Free up to 50k users | Firebase Auth, or No login for first test |
| 5 | Database (memory) | Supabase Postgres | Stores business, process, stages, tools safely | Free up to 500MB | Firebase Firestore (less strict) |
| 6 | Hosting (where site lives) | Vercel | Free, fast, auto-updates when we push to GitHub | Free + domain ~$12/yr | Netlify / Cloudflare Pages |
| 7 | Storage (uploads later) | Supabase Storage | For price lists/photos later | Free 1GB | Skip for MVP |
| 8 | Seeing drop-offs | PostHog | Shows where owners stop (Step 2? 4?) | Free 1M events | Plausible (lighter) |
| 9 | Domain + Email | Namecheap + Resend | Cheap .ng/.com + simple emails | ~$12-20/yr | Keep current provider |

**Total Day 1:** $0-20 (domain only). Enough for first 100 businesses.

## Why not others?
- **Option B Ultra-lean (Vite + LocalStorage only):** Good for 2-week demo to 10 owners with no login. But you lose accounts, must rebuild to add DB. Use only if you want to test before spending anything.
- **Option C Python (Django + Postgres + Render):** Good if you already have Python devs. Slower for interactive map, fewer cheap frontend helpers. Pick only if your team knows Python better than JavaScript.

## Questions to help you choose
1. Do you / your builder know JavaScript or Python better?
2. Do you want login in MVP or skip login for first 10 tests?
3. Do you already own domain/hosting?
4. Phone-first is must — confirm map as vertical list is OK for MVP (drag later)? Yes/No

## Your decision format (copy-paste back to me)
```
1 Website base: Keep / Change to ___
2 Styling: Keep / Change to ___
3 Map: React Flow / Simple list
4 Login: Supabase / Firebase / Skip for now
5 Database: Supabase / Firebase
6 Hosting: Vercel / Other ___
7 Approved to scaffold /web: Yes / No
```

After Yes, I scaffold `/web` with Next.js + Tailwind + tokens from Design System and delete/replace old `/mvp` demo.
