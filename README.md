# ScriptFast

AI video script generator for freelancers. Generate YouTube, TikTok, Reels, LinkedIn, and Podcast scripts in your client's exact voice — in under 60 seconds.

- **Design spec:** [`docs/superpowers/specs/2026-04-17-scriptfast-design.md`](docs/superpowers/specs/2026-04-17-scriptfast-design.md)
- **Implementation plan:** [`docs/superpowers/plans/2026-04-17-scriptfast-implementation.md`](docs/superpowers/plans/2026-04-17-scriptfast-implementation.md)

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind · Clerk · Supabase Postgres via Prisma · Anthropic · Stripe · Resend · `@react-pdf/renderer` · Vercel.

## Setup

### 1. Install

```bash
npm install
cp .env.example .env.local
```

### 2. Clerk

1. Create a Clerk application at [dashboard.clerk.com](https://dashboard.clerk.com).
2. Copy the publishable + secret keys into `.env.local`.
3. Under **Webhooks**, create an endpoint pointing to `https://YOUR_DOMAIN/api/webhooks/clerk`, subscribe to `user.created`, and paste the signing secret as `CLERK_WEBHOOK_SECRET`. (The app also lazy-syncs users on every authenticated request, so the webhook is a redundancy — not required for local dev.)

### 3. Supabase / Postgres

1. Create a Supabase project.
2. Copy both connection strings into `DATABASE_URL` (pooled, port 6543) and `DIRECT_URL` (direct, port 5432).
3. Push the schema:

```bash
npx prisma db push
```

### 4. Anthropic

Get a key from [console.anthropic.com](https://console.anthropic.com/) and set `ANTHROPIC_API_KEY`.

### 5. Stripe

1. Create subscription products in [dashboard.stripe.com](https://dashboard.stripe.com): "ScriptFast Basic" (£5/mo), "ScriptFast Pro" (£19/mo), and "ScriptFast Agency" (£49/mo). Copy the price IDs into the matching `STRIPE_*_PRICE_ID` env vars.
2. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
3. Create a webhook endpoint pointing to `https://YOUR_DOMAIN/api/stripe/webhook`. Subscribe to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

### 6. Resend

1. Sign up at [resend.com](https://resend.com).
2. Add and verify `scriptfast.app` (or your own domain) so `hello@scriptfast.app` can send.
3. Copy the API key into `RESEND_API_KEY`.

### 7. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push the repo to GitHub/GitLab.
2. Import into Vercel, set all env vars from `.env.example` in project settings.
3. After first deploy, update the Clerk and Stripe webhook URLs to the production domain.
4. Re-run `npx prisma db push` against the production DB if needed (or use `prisma migrate deploy` if you use migrations).

## Plans

| Plan | Price | Scripts | Clients | Platforms | Extras | PDF | Team |
|------|-------|---------|---------|-----------|--------|-----|------|
| Free | £0 | 5/mo | 1 | YouTube only | — | — | — |
| Basic | £5/mo | 25/mo | 3 | All 5 | — | — | — |
| Pro | £19/mo | 100/mo | 10 | All 5 | ✓ | ✓ | 1 |
| Agency | £49/mo | 350/mo | ∞ | All 5 | ✓ | ✓ | 3 + bulk |
| Enterprise | Custom | Custom | ∞ | All 5 | ✓ | ✓ | ∞ |

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run test` — Vitest unit tests
- `npm run db:push` — sync Prisma schema to DB
- `npm run db:studio` — Prisma Studio (inspect data)
