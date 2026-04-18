# ScriptFast

AI video script generator for content agencies and freelancers. Generate YouTube, TikTok, Reels, LinkedIn, and Podcast scripts in your client's exact voice — in under 60 seconds.

## Tech Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Clerk · Supabase Postgres via Prisma · Anthropic Claude · Stripe · Resend · `@react-pdf/renderer` · Vercel

---

## Local Setup

### 1. Install dependencies

```bash
npm install
cp .env.example .env.local
```

### 2. Clerk (auth)

1. Create an app at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Copy the publishable + secret keys into `.env.local`
3. Under **Webhooks**, add an endpoint at `https://YOUR_DOMAIN/api/webhooks/clerk`, subscribe to `user.created`, and paste the signing secret as `CLERK_WEBHOOK_SECRET`

> The app lazy-syncs users on every request, so the webhook is optional for local dev.

### 3. Supabase / Postgres

1. Create a project at [supabase.com](https://supabase.com)
2. Add both connection strings to `.env.local`:
   - `DATABASE_URL` — pooled connection (port 6543)
   - `DIRECT_URL` — direct connection (port 5432)
3. Push the schema:

```bash
npx prisma db push
```

### 4. Anthropic

Get a key from [console.anthropic.com](https://console.anthropic.com) and set `ANTHROPIC_API_KEY`.

### 5. Stripe

1. Create three subscription products in [Stripe Dashboard](https://dashboard.stripe.com):
   - **ScriptFast Basic** — £5/mo
   - **ScriptFast Pro** — £19/mo
   - **ScriptFast Agency** — £49/mo
2. Copy each price ID into the matching `STRIPE_*_PRICE_ID` env var
3. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Create a webhook at `https://YOUR_DOMAIN/api/stripe/webhook` and subscribe to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`

### 6. Resend (email)

1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain (e.g. `scriptfast.app`) so outbound emails pass DKIM
3. Set `RESEND_API_KEY`

### 7. Cron secret

Set `CRON_SECRET` to any random string. This protects the `/api/cron/*` endpoints.

### 8. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

1. Push the repo to GitHub
2. Import into Vercel and add all env vars from `.env.example`
3. Register the daily onboarding cron in `vercel.json`:

```json
{
  "crons": [{ "path": "/api/cron/onboarding", "schedule": "0 9 * * *" }]
}
```

4. After first deploy, update the Clerk and Stripe webhook URLs to the production domain

### One-time migration (existing users)

Before the first production deploy with onboarding enabled, run the migration script to prevent welcome emails going out to users who signed up before onboarding was built:

```bash
npx tsx scripts/migrate-onboarding.ts
```

---

## Plans

| Plan | Price | Scripts/mo | Clients | Platforms | Extras | PDF Export | Team |
|------|-------|-----------|---------|-----------|--------|------------|------|
| Free | £0 | 5 | 1 | All 5 | — | — | 1 |
| Basic | £5 | 25 | 3 | All 5 | — | — | 1 |
| Pro | £19 | 100 | 10 | All 5 | ✓ | ✓ | 1 |
| Agency | £49 | 350 | ∞ | All 5 | ✓ | ✓ | 3 + bulk |
| Enterprise | Custom | Unlimited | ∞ | All 5 | ✓ | ✓ | ∞ |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm test` | Run Vitest unit tests |
| `npm run db:push` | Sync Prisma schema to DB |
| `npm run db:studio` | Open Prisma Studio |
