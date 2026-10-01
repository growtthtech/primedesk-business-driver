# PrimeDesk Web Scaffold (Phase 0)

Starter Next.js site with locked Design v4 + Stack v2. Blank but wired.

## Run locally (after installing Node 20 + Postgres 16)
```
cd web
cp .env.local.example .env.local
# create db: createdb primedesk  (or via pgAdmin)
# run schema: psql postgresql://postgres:postgres@localhost:5432/primedesk -f db/schema.sql
npm install
npm run dev
# open http://localhost:3000
# phone test: same WiFi → http://YOUR-PC-IP:3000
```

## What's inside
- `app/` 6-step skeleton: Setup → Pick → Describe → Map → Plan (orange Start Now) → Home 3 tabs
- `rules/` booking/orders/followup JSON (Brain v1)
- `lib/tokens.ts` colors, `lib/brain.ts` level rule, `lib/db.ts` Postgres pool
- `db/schema.sql` tables
- Integrations OFF until keys added: Better Auth, R2, ZeptoMail, Paystack/Flutterwave, Termii

## Next
Fill Phase 1: auth pages, save to DB, drop-off logging, Figma polish.
