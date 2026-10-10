# PrimeDesk Tech Stack v2 — Locked by You (Local-First)

**Updated:** Oct 2, 2026 — Based on your picks: Better Auth, PostgreSQL, Cloudflare R2, ZeptoMail, Local hosting.
**How to use:** This is now the build list. No more options unless you say Change.

## Final Stack Table

| # | Part (simple meaning) | Your Choice | What it does for you | What you need to get / do | When we use it |
|---|---|---|---|---|---|
| 1 | Website base | Next.js + TypeScript | Fast pages that work well on phones, one language | Install Node.js 20 LTS on your PC | Phase 1-2 |
| 2 | Styling (look) | Tailwind CSS + shadcn/ui | Clean buttons/cards matching Design System | Comes with website code, no extra account | Phase 1 |
| 3 | Process map drawing | Simple vertical list first, React Flow later | MVP: boxes + arrows you can rename/add. Later: drag to move | Free library, no account | MVP = list, P1+ = React Flow |
| 4 | Login | Better Auth | Email + password + Google login, stays in your own database (not outside) | Needs database + email below to send codes | Phase 1 |
| 5 | Database (memory) | PostgreSQL (local on your PC) | Stores businesses, processes, stages, tools safely | Install PostgreSQL 16 + create `primedesk` DB + free tool pgAdmin or DBeaver | Phase 1 |
| 6 | File storage | Cloudflare R2 | Keeps uploads (price lists, photos) cheap and safe, works like a hard drive online | Cloudflare account + R2 bucket + API keys (S3-compatible) | Phase 2 (skip in Phase 1) |
| 7 | Email sending | ZeptoMail by Zoho | Sends welcome, login codes, "12 follow-ups missing" reminders | ZeptoMail account + verified domain/sender + API key | Phase 1 login codes, Phase 2 reminders |
| 8 | Hosting (where site lives NOW) | Local on your system | Website runs on your PC only: `localhost:3000`. Good for building + testing with phones on same WiFi | Node.js + Postgres running, open port 3000, same WiFi to test phone | All MVP phases |
| 9 | Payments Nigeria | Paystack (primary) + Flutterwave (backup) | Phase 3 only: confirm "Payment received → mark Paid". MVP: owner ticks Done manually, no real money link | Paystack + Flutterwave test keys later, BVN/business for live later | Phase 3, NOT MVP |
| 10 | SMS / WhatsApp Nigeria | Termii | Sends SMS/WhatsApp reminders: "Your booking tomorrow 10am", "You have 5 follow-ups" | Termii account + sender ID + API key, test credit | Phase 2 reminders, Phase 3 auto |
| 11 | Seeing drop-offs | Umami (local) or PostHog cloud | Shows where owners stop (Step 2? 4?) so we fix right screen | Umami: runs locally with Postgres, no outside data. PostHog: free cloud, easier | Phase 1 |
| 12 | Code saving | GitHub (already done) | Saves every change, you can undo | Already connected: primedesk-business-driver | Now |

**Total Day 1 cost:** ~$0 + your PC power. R2 free 10GB, ZeptoMail free tier, Termii/Paystack pay-as-you-go only when you send/live.

## All Integrations Needed (Full List, When Each Turns On)

- **Phase 1 (now):** Better Auth → Postgres, ZeptoMail (login codes/welcome), Umami (drop-off tracking). R2 keys saved but not used yet.
- **Phase 2 (Home + reminders):** R2 (uploads), ZeptoMail (follow-up digest), Termii SMS test (manual reminders first).
- **Phase 3 (first live link):** Paystack Webhook → mark Payment Done, Termii auto-reminder, R2 customer files. Flutterwave added only if Paystack fails for a vendor.

What we do NOT connect in MVP: No live WhatsApp reading, no auto money confirm, no bulk SMS. Owner ticks Done/Waiting/Stuck manually.

## What Local Hosting Means for You (Plain Words)

1. Your site lives at `http://localhost:3000` on your PC. Only you see it until you put it online.
2. To show your phone: connect phone + PC to same WiFi, open `http://YOUR-PC-IP:3000` (e.g., 192.168.1.5:3000).
3. You must keep Postgres running when testing. If PC sleeps/off, site + DB sleep too — normal for local.
4. Backup: I will add `backup.bat` to copy DB daily to a folder. Copy that folder to external drive weekly.
5. Moving online later: same code runs on Vercel/Render + hosted Postgres + R2 + ZeptoMail without rebuild. We only change addresses/keys.

To run after scaffold:
```
npm install
npm run dev
# open http://localhost:3000
```

## Secrets You Must Create (Keep Private, Never Push to GitHub)
- `DATABASE_URL=postgresql://user:pass@localhost:5432/primedesk`
- `BETTER_AUTH_SECRET=random-long-string`
- `R2_ACCOUNT_ID, R2_ACCESS_KEY, R2_SECRET_KEY, R2_BUCKET=primedesk-uploads`
- `ZEPTOMAIL_API_KEY, ZEPTOMAIL_FROM=noreply@yourdomain`
- Later: `PAYSTACK_SECRET, FLUTTERWAVE_SECRET, TERMII_API_KEY`

These live in `.env.local` (on your PC only, ignored by Git).

## Confirmed — Ready to Scaffold?
- [x] Login: Better Auth
- [x] DB: PostgreSQL local
- [x] Storage: Cloudflare R2
- [x] Email: ZeptoMail
- [x] Hosting: Local system
- [ ] Next: I scaffold `/web` with Next.js + Tailwind + Better Auth + Postgres + R2 + ZeptoMail wiring (disabled until keys added) + simple-list map.

Reply "Scaffold web" and I start building Phase 0/1.
