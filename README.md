# PrimeDesk — Digital Technology Orchestration for Marketing Agencies

> **Promise:** Tell PrimeDesk how your agency works. We'll help you build the right digital system for where you are today — and where you're going next.

**Principle:** Understand first. Recommend second. PrimeDesk never becomes the CRM, PM tool, or automation platform it recommends.

---

## Start here (new niche build)

1. **`PRIMEDESK-AGENCY-PRD.md`** — the product: agency MVP, features 5.1–5.13, acceptance criteria, validation plan.
2. **`AGENCY-IMPLEMENTATION-PLAN.md`** — build order Phases 1–9 with actual status (1–6 done, 7 partial, 8–9 remaining).
3. **`DESIGN-SYSTEM-v1.md`** — the design file: light theme, Business Blue, Action Orange, Sora/Inter.
4. **`docs/`** — build record (`PRIMEDESK-PHASE-1.md`) + agency library maintenance guide.
5. **`web/`** — the working Next.js + Postgres application.

## The product loop

Agency profile → relevant processes → guided mapping → problems & needs → capabilities → readiness → NOW/LATER/FUTURE plan → chosen Drive.

* **My Map** — where are we now? (areas, processes, evidence, statuses)
* **My Plan** — what should we consider next? (prioritized, explained, incl. non-software practices)
* **My Drive** — what did we choose? (decision statuses, grouped stack)

## Run locally

```
cd web
cp .env.local.example .env.local   # then fill secrets (never commit)
npm install
npm run dev                        # http://localhost:3000
```

Postgres 16 with `primedesk` database; schema + seeds in `web/db/`.

## Deploy

Netlify (base `web/`, see `netlify.toml`). Required env vars: `DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, GMAIL_USER, GMAIL_APP_PASSWORD` (+ `TERMII_*`, `ZEPTOMAIL_*` when live). Redeploy after env changes.
