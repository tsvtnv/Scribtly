# Onboarding System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete onboarding system — DB tracking fields, 7 plain-text email sequences via cron, in-app checklist/banner, empty states, tooltips, and upgrade nudges — to get new users generating their first script fast and converting to paid within 7 days.

**Architecture:** All onboarding state lives on the `Workspace` model (consistent with plan/scripts/clients). A daily cron endpoint (`POST /api/cron/onboarding`) processes timed emails; two event-driven emails (first-script congrats, upgrade confirmation) fire inline in existing API handlers. In-app components read state from a new `GET /api/user/onboarding` route.

**Tech Stack:** Next.js App Router, Prisma (PostgreSQL), Resend (plain-text emails), Tailwind CSS, TypeScript

---

## File Map

**New files:**
- `prisma/schema.prisma` — add onboarding fields to Workspace
- `app/api/user/onboarding/route.ts` — GET (checklist state) + PATCH (update fields)
- `app/api/user/unsubscribe/route.ts` — GET with token, sets emailOptOut
- `app/(app)/unsubscribed/page.tsx` — static confirmation page
- `app/api/cron/onboarding/route.ts` — daily cron job, processes all timed emails
- `lib/emails/onboarding.ts` — 7 plain-text email send functions
- `components/onboarding/OnboardingBanner.tsx` — welcome banner for step=0 users
- `components/onboarding/OnboardingChecklist.tsx` — 4-step checklist on dashboard
- `components/onboarding/ScriptsPageTracker.tsx` — invisible tracker on /scripts page

**Modified files:**
- `app/api/clients/route.ts` — add firstClientAddedAt tracking after create
- `app/api/generate-script/route.ts` — add firstScriptGeneratedAt tracking + first-script email
- `app/api/stripe/webhook/route.ts` — extend upgrade handler with onboarding fields + new email
- `app/(app)/dashboard/page.tsx` — add OnboardingBanner + OnboardingChecklist + 80% usage banner
- `app/(app)/scripts/page.tsx` — add ScriptsPageTracker + rich empty state
- `app/(app)/clients/page.tsx` — add rich empty state
- `app/(app)/generate/page.tsx` — add no-clients empty state + model tooltip
- `app/(app)/pipeline/page.tsx` — add empty state for eligible users + pipeline tooltip
- `components/script/ScriptActions.tsx` — add PDF export lock for FREE/BASIC

---

## Task 1: Add Onboarding Fields to Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add fields to Workspace model**

Open `prisma/schema.prisma`. After the `updatedAt` field in the `Workspace` model (line ~76), add:

```prisma
  onboardingStep          Int       @default(0)
  onboardingCompleted     Boolean   @default(false)
  firstScriptGeneratedAt  DateTime?
  firstClientAddedAt      DateTime?
  welcomeEmailSentAt      DateTime?
  day2EmailSentAt         DateTime?
  day7EmailSentAt         DateTime?
  day14EmailSentAt        DateTime?
  emailOptOut             Boolean   @default(false)
```

- [ ] **Step 2: Push schema to database**

```bash
npx prisma db push
```

Expected output includes: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 3: Regenerate Prisma client**

```bash
npx prisma generate
```

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add onboarding tracking fields to Workspace model"
```

---

## Task 2: Build GET /api/user/onboarding and PATCH /api/user/onboarding

**Files:**
- Create: `app/api/user/onboarding/route.ts`

- [ ] **Step 1: Create the route file**

```typescript
// app/api/user/onboarding/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { workspace } = await ensureUser();

    // Side effect: advance to step 3 if scripts page visited and step 2 already done
    if (workspace.onboardingStep < 3 && workspace.firstScriptGeneratedAt !== null) {
      await prisma.workspace.update({
        where: { id: workspace.id },
        data: { onboardingStep: Math.max(workspace.onboardingStep, 3) },
      });
    }

    const checklist = [
      { id: 1, key: "add_client", completed: workspace.firstClientAddedAt !== null },
      { id: 2, key: "generate_script", completed: workspace.firstScriptGeneratedAt !== null },
      { id: 3, key: "explore_library", completed: workspace.onboardingStep >= 3 },
      { id: 4, key: "invite_or_upgrade", completed: workspace.plan !== "FREE" },
    ];

    return NextResponse.json({
      onboardingStep: workspace.onboardingStep,
      onboardingCompleted: workspace.onboardingCompleted,
      firstScriptGeneratedAt: workspace.firstScriptGeneratedAt,
      firstClientAddedAt: workspace.firstClientAddedAt,
      checklist,
    });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    const body = await req.json();

    const allowed = [
      "onboardingStep",
      "onboardingCompleted",
      "firstClientAddedAt",
      "firstScriptGeneratedAt",
    ] as const;

    const data: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) data[key] = body[key];
    }

    // onboardingStep: only allow advancing, never going back
    if ("onboardingStep" in data && typeof data.onboardingStep === "number") {
      data.onboardingStep = Math.max(workspace.onboardingStep, data.onboardingStep as number);
    }

    await prisma.workspace.update({ where: { id: workspace.id }, data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
```

- [ ] **Step 2: Verify the route loads without errors**

```bash
npx tsc --noEmit
```

Expected: no errors in this file.

- [ ] **Step 3: Commit**

```bash
git add app/api/user/onboarding/route.ts
git commit -m "feat: add GET/PATCH /api/user/onboarding route"
```

---

## Task 3: Build Unsubscribe Route and Page

**Files:**
- Create: `app/api/user/unsubscribe/route.ts`
- Create: `app/(app)/unsubscribed/page.tsx`

- [ ] **Step 1: Create the unsubscribe API route**

```typescript
// app/api/user/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/unsubscribed?error=1", req.url));
  }

  try {
    await prisma.workspace.update({
      where: { id: token },
      data: { emailOptOut: true },
    });
  } catch {
    // workspace not found — still redirect gracefully
  }

  return NextResponse.redirect(new URL("/unsubscribed", req.url));
}
```

- [ ] **Step 2: Create the unsubscribed confirmation page**

```typescript
// app/(app)/unsubscribed/page.tsx
export default function UnsubscribedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">You've been unsubscribed</h1>
        <p className="text-text-secondary dark:text-dark-muted text-sm">
          You won't receive any more onboarding emails from ScriptFast. Your account remains active.
        </p>
        <a href="/dashboard" className="text-primary text-sm hover:underline">
          Back to dashboard
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/api/user/unsubscribe/route.ts app/(app)/unsubscribed/page.tsx
git commit -m "feat: add unsubscribe route and confirmation page"
```

---

## Task 4: Create lib/emails/onboarding.ts with All 7 Email Functions

**Files:**
- Create: `lib/emails/onboarding.ts`

- [ ] **Step 1: Create the file**

```typescript
// lib/emails/onboarding.ts
import { resend } from "@/lib/resend";
import type { Plan } from "@prisma/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scriptfast.app";
const FROM = "Deyan from ScriptFast <deyan@scriptfast.app>";
const REPLY_TO = "deyan@scriptfast.app";

function footer(workspaceId: string): string {
  return `\n\n---\nTo stop receiving these emails: ${APP_URL}/api/user/unsubscribe?token=${workspaceId}\nScriptFast · hello@scriptfast.app`;
}

async function sendPlain({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  if (
    !process.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY === "re_placeholder"
  ) {
    console.log("[email:skipped — no RESEND_API_KEY]", to, subject);
    return;
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to,
      subject,
      text,
    });
    if (error) console.error("Resend error", error);
  } catch (err) {
    console.error("Resend threw", err);
  }
}

export async function sendWelcomeEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYour account is set up.\n\nOne thing to do right now: add your first client.\n\nIt takes 2 minutes — you just enter their niche, who their audience is, and how they talk. After that, every script you generate automatically sounds like them.\n\nAdd your first client here: ${APP_URL}/clients/new\n\nOnce that's done, you're ready to generate your first script.\n\nDeyan\nScriptFast\n\n---\nYou're on the Free plan — 5 scripts included. No card required.` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "Your ScriptFast account is ready", text });
}

export async function sendDay2NoScriptEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYou signed up for ScriptFast 2 days ago but haven't generated a script yet.\n\nI wanted to check — did something go wrong, or did life just get in the way?\n\nIf you hit a snag, reply to this email and I'll sort it out personally.\n\nIf you're ready to try it, here's what to do:\n\n1. Add a client (2 mins): ${APP_URL}/clients/new\n2. Generate a script: ${APP_URL}/generate\n\nThe whole thing takes less than 5 minutes. Your first script will be ready before you finish your coffee.\n\nDeyan` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "Did something go wrong?", text });
}

export async function sendFirstScriptEmail(
  workspaceId: string,
  email: string,
  firstName: string,
  remainingScripts: number
) {
  const text =
    `Hi ${firstName},\n\nYou just generated your first script.\n\nHow did it feel? Did it actually sound like your client?\n\nIf it was off, the fix is usually in the client profile — adding more specific phrases they use makes a big difference. You can edit it here: ${APP_URL}/clients\n\nIf it was good, here's what to do next:\n\nYour script is saved in your library at ${APP_URL}/scripts — you can edit it, copy it, or download it as a PDF (on Pro).\n\nYou have ${remainingScripts} scripts left this month. If you're on Free and running low, Basic is £5/month for 25 scripts.\n\nDeyan\n\nP.S. Reply and let me know what you're creating. I read every reply.` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "How was it?", text });
}

export async function sendDay7FreeEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYou've been using ScriptFast for a week.\n\nI want to ask you directly: what's stopping you from upgrading?\n\nBasic is £5/month. It gives you 25 scripts, 3 clients, and all quality levels. Most freelancers make that back from one extra script they didn't have to write themselves.\n\nIf something's not working or the tool isn't clicking, I'd genuinely rather know — reply to this and tell me. I'll fix it or help you get more out of it.\n\nIf you're ready: ${APP_URL}/pricing\n\nDeyan\n\nP.S. If you're happy on Free and just don't need more scripts, that's completely fine too. No pressure.` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "What's stopping you?", text });
}

export async function sendDay7BasicEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nYou've been on Basic for a week — glad it's working.\n\nOne thing I want to show you: the content pipeline.\n\nIt's the feature that turns ScriptFast from a script generator into a full content management system. Every piece of content has a card. You drag it from Idea → Scripting → Review → Approved → Published. You can see everything you're working on across all clients in one view.\n\nIt's available on Pro for £19/month — £10 more than you're paying now.\n\nTake a look: ${APP_URL}/pricing\n\nDeyan` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "You're missing the best part", text });
}

export async function sendDay14ReengagementEmail(
  workspaceId: string,
  email: string,
  firstName: string
) {
  const text =
    `Hi ${firstName},\n\nI noticed you haven't used ScriptFast much in the past two weeks.\n\nNo hard sell here — I just want to make sure it's actually useful for you.\n\nTwo things:\n\n1. If something isn't working or it's harder than it should be, reply and tell me. I personally fix issues that users report.\n\n2. If your situation has changed and you're just not doing video content right now, that's fine — your account will be here when you need it.\n\nIf you do want to give it another shot, the fastest way is: ${APP_URL}/generate — pick a client, enter a topic, and you'll have a full script in 30 seconds.\n\nDeyan` +
    footer(workspaceId);

  return sendPlain({ to: email, subject: "Still here if you need me", text });
}

export async function sendUpgradeConfirmationEmail(
  workspaceId: string,
  email: string,
  firstName: string,
  plan: Plan,
  billingDate: string
) {
  let planName: string;
  let body: string;

  if (plan === "BASIC") {
    planName = "Basic";
    body = `Hi ${firstName},\n\nYou're on Basic. Here's what you now have:\n\n- 25 scripts per month (was 5)\n- All 3 quality levels — Standard, Quality, and Premium\n- Up to 3 client profiles\n\nReady to generate: ${APP_URL}/generate\n\nYour billing date is the ${billingDate} each month — that's when your scripts reset.\n\nDeyan`;
  } else if (plan === "PRO") {
    planName = "Pro";
    body = `Hi ${firstName},\n\nYou're on Pro. Here's everything that just unlocked:\n\n- 100 scripts per month\n- The content pipeline: ${APP_URL}/pipeline\n- Calendar view to schedule content\n- PDF export for client reports\n- Title, hashtag, and description extras on every script\n- 10 client profiles\n\nThe pipeline is worth setting up today — add your active content pieces and you'll have a clear picture of everything in flight.\n\nDeyan`;
  } else {
    planName = "Agency";
    body = `Hi ${firstName},\n\nYou're on Agency. You now have:\n\n- 350 scripts per month\n- Unlimited clients\n- 3 team member seats — invite your team at ${APP_URL}/settings/team\n- Bulk generation\n- Priority support — reply to any email and you'll hear back within a few hours\n\nDeyan`;
  }

  const text = body + footer(workspaceId);

  return sendPlain({
    to: email,
    subject: `You're on ${planName} — here's what's new`,
    text,
  });
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add lib/emails/onboarding.ts
git commit -m "feat: add 7 plain-text onboarding email functions"
```

---

## Task 5: Build the Daily Cron Email Job

**Files:**
- Create: `app/api/cron/onboarding/route.ts`

- [ ] **Step 1: Create the cron route**

```typescript
// app/api/cron/onboarding/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendWelcomeEmail,
  sendDay2NoScriptEmail,
  sendDay7FreeEmail,
  sendDay7BasicEmail,
  sendDay14ReengagementEmail,
} from "@/lib/emails/onboarding";

export const runtime = "nodejs";
export const maxDuration = 300;

function firstName(name: string | null | undefined, email: string): string {
  return name?.split(" ")[0] || email.split("@")[0];
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const h48 = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const d7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const d14 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const workspaces = await prisma.workspace.findMany({
    where: { emailOptOut: false },
    include: { owner: true },
  });

  let welcomed = 0;
  let day2Sent = 0;
  let day7Sent = 0;
  let day14Sent = 0;
  const errors: string[] = [];

  for (const ws of workspaces) {
    try {
      const email = ws.owner.email;
      const name = firstName(ws.owner.name, email);

      // Welcome email
      if (!ws.welcomeEmailSentAt) {
        await sendWelcomeEmail(ws.id, email, name);
        await prisma.workspace.update({
          where: { id: ws.id },
          data: { welcomeEmailSentAt: now },
        });
        welcomed++;
        continue; // one email per workspace per run
      }

      // Day-2 no-script
      if (
        ws.createdAt <= h48 &&
        !ws.firstScriptGeneratedAt &&
        !ws.day2EmailSentAt
      ) {
        await sendDay2NoScriptEmail(ws.id, email, name);
        await prisma.workspace.update({
          where: { id: ws.id },
          data: { day2EmailSentAt: now },
        });
        day2Sent++;
        continue;
      }

      // Day-7 nudge
      if (ws.createdAt <= d7 && !ws.day7EmailSentAt) {
        if (ws.plan === "FREE") {
          await sendDay7FreeEmail(ws.id, email, name);
          await prisma.workspace.update({
            where: { id: ws.id },
            data: { day7EmailSentAt: now },
          });
          day7Sent++;
        } else if (ws.plan === "BASIC") {
          await sendDay7BasicEmail(ws.id, email, name);
          await prisma.workspace.update({
            where: { id: ws.id },
            data: { day7EmailSentAt: now },
          });
          day7Sent++;
        }
        // PRO/AGENCY/ENTERPRISE: skip
        continue;
      }

      // Day-14 re-engagement
      if (
        ws.createdAt <= d14 &&
        ws.plan === "FREE" &&
        !ws.day14EmailSentAt
      ) {
        const scriptCount = await prisma.script.count({
          where: { workspaceId: ws.id },
        });
        if (scriptCount < 3) {
          await sendDay14ReengagementEmail(ws.id, email, name);
          await prisma.workspace.update({
            where: { id: ws.id },
            data: { day14EmailSentAt: now },
          });
          day14Sent++;
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Onboarding cron failed for workspace ${ws.id}:`, msg);
      errors.push(`workspace:${ws.id} — ${msg}`);
    }
  }

  return NextResponse.json({ welcomed, day2Sent, day7Sent, day14Sent, errors });
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/api/cron/onboarding/route.ts
git commit -m "feat: add daily onboarding cron email job"
```

---

## Task 6: Add Tracking Hooks to POST /api/clients

**Files:**
- Modify: `app/api/clients/route.ts`

- [ ] **Step 1: Add firstClientAddedAt tracking after client creation**

In `app/api/clients/route.ts`, after the `prisma.client.create(...)` call (line ~78), add before the `return` statement:

```typescript
    // Onboarding: track first client added
    if (!workspace.firstClientAddedAt) {
      void prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          firstClientAddedAt: new Date(),
          onboardingStep: Math.max(workspace.onboardingStep, 1),
        },
      });
    }
```

The full POST handler after modification:

```typescript
export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    const body = await req.json();
    const parsed = clientSchema.safeParse(body);
    if (!parsed.success) throw new ValidationError("Invalid client data", { issues: parsed.error.issues });

    const count = await prisma.client.count({ where: { workspaceId: workspace.id } });
    if (!canAddClient(workspace, count)) {
      throw new UpgradeRequiredError("client_limit_reached", "You've reached your client limit");
    }

    const data = parsed.data;
    const client = await prisma.client.create({
      data: {
        workspaceId: workspace.id,
        name: data.name,
        niche: data.niche,
        targetAudience: data.targetAudience,
        toneOfVoice: data.toneOfVoice,
        examplePhrases: data.examplePhrases || null,
        avoidTopics: data.avoidTopics || null,
        primaryPlatform: data.primaryPlatform,
        avatarColor: data.avatarColor,
        contentGoal: data.contentGoal || null,
        videoPace: data.videoPace || null,
        languageStyle: data.languageStyle || null,
        ctaStyle: data.ctaStyle || null,
        brandKeywords: data.brandKeywords || null,
        competitorNames: data.competitorNames || null,
        postingFrequency: data.postingFrequency || null,
        contentPillars: data.contentPillars || null,
      },
    });

    // Onboarding: track first client added
    if (!workspace.firstClientAddedAt) {
      void prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          firstClientAddedAt: new Date(),
          onboardingStep: Math.max(workspace.onboardingStep, 1),
        },
      });
    }

    return NextResponse.json({ client }, { status: 201 });
  } catch (err) {
    return errorResponse(err);
  }
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/api/clients/route.ts
git commit -m "feat: track first client added for onboarding"
```

---

## Task 7: Add Tracking Hook to POST /api/generate-script

**Files:**
- Modify: `app/api/generate-script/route.ts`

- [ ] **Step 1: Import the first-script email function**

At the top of `app/api/generate-script/route.ts`, the existing imports already include what we need. We'll add the email import inline (fire-and-forget pattern used elsewhere in the file).

- [ ] **Step 2: Add tracking after successful stream completion**

In the stream's `start(controller)` function, find the line `succeeded = true;` (line ~115). Immediately after it, add:

```typescript
          succeeded = true;

          // Onboarding: track first script generated
          if (!workspace.firstScriptGeneratedAt) {
            void (async () => {
              try {
                await prisma.workspace.update({
                  where: { id: workspaceId! },
                  data: {
                    firstScriptGeneratedAt: new Date(),
                    onboardingStep: Math.max(workspace.onboardingStep, 2),
                  },
                });
                const { getRemainingScripts } = await import("@/lib/planLimits");
                const remaining = getRemainingScripts({ ...workspace, scriptCount: updated.scriptCount });
                const { user } = await ensureUser();
                const { sendFirstScriptEmail } = await import("@/lib/emails/onboarding");
                const firstName = user.name?.split(" ")[0] || user.email.split("@")[0];
                await sendFirstScriptEmail(workspace.id, user.email, firstName, remaining);
              } catch (err) {
                console.error("First script onboarding failed", err);
              }
            })();
          }
```

Note: `workspace` and `updated` are already in scope. `updated` is the result of the `prisma.workspace.update({ data: { scriptCount: { increment: 1 } } })` call earlier in the handler (line ~70–73). `workspaceId` is already declared at the top of the outer function.

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/api/generate-script/route.ts
git commit -m "feat: track first script generated, fire congrats email"
```

---

## Task 8: Extend Stripe Webhook with Onboarding Completion

**Files:**
- Modify: `app/api/stripe/webhook/route.ts`

- [ ] **Step 1: Extend the checkout.session.completed handler**

Find the `checkout.session.completed` case in `app/api/stripe/webhook/route.ts`. Replace the existing fire-and-forget email block (lines ~45–52) with an extended version that also sets onboarding fields and sends the new plan-specific email:

```typescript
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const workspaceId = session.metadata?.workspaceId || session.client_reference_id;
        if (!workspaceId || !session.subscription) break;

        const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
        const subscription = await stripe.subscriptions.retrieve(subId);
        const priceId = subscription.items.data[0]?.price.id;
        const plan = priceIdToPlan(priceId);

        const workspace = await prisma.workspace.update({
          where: { id: workspaceId },
          data: {
            plan,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
            onboardingStep: 4,
            onboardingCompleted: true,
          },
          include: { owner: true },
        });

        void (async () => {
          try {
            const { sendUpgradeConfirmationEmail } = await import("@/lib/emails/onboarding");
            const firstName = workspace.owner.name?.split(" ")[0] || workspace.owner.email.split("@")[0];
            const billingDate = new Date().getDate().toString();
            await sendUpgradeConfirmationEmail(
              workspace.id,
              workspace.owner.email,
              firstName,
              plan,
              billingDate
            );
          } catch (err) {
            console.error("Upgrade onboarding email failed", err);
          }
        })();
        break;
      }
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/api/stripe/webhook/route.ts
git commit -m "feat: set onboarding complete on upgrade, send plan-specific email"
```

---

## Task 9: Build OnboardingBanner Component

**Files:**
- Create: `components/onboarding/OnboardingBanner.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/onboarding/OnboardingBanner.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const LS_KEY = "sf_banner_dismissed";

export function OnboardingBanner({ onboardingStep }: { onboardingStep: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (onboardingStep === 0 && !localStorage.getItem(LS_KEY)) {
      setVisible(true);
    }
  }, [onboardingStep]);

  async function dismiss() {
    localStorage.setItem(LS_KEY, "1");
    setVisible(false);
    try {
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 1 }),
      });
    } catch {
      // non-critical
    }
  }

  if (!visible) return null;

  return (
    <Card className="relative border-[var(--color-primary)] bg-[var(--color-primary-tint)]">
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 text-text-secondary hover:text-text-primary"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
      <div className="pr-6">
        <h2 className="font-semibold text-base mb-1">Welcome to ScriptFast</h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
          You're 3 steps away from your first AI-generated script.
        </p>
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center font-semibold">1</span>
            Add client
          </span>
          <span className="text-text-secondary">→</span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full border border-text-secondary text-text-secondary text-xs flex items-center justify-center font-semibold">2</span>
            Generate script
          </span>
          <span className="text-text-secondary">→</span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full border border-text-secondary text-text-secondary text-xs flex items-center justify-center font-semibold">3</span>
            Ship content
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/clients/new">
            <Button size="sm" onClick={dismiss}>Add your first client</Button>
          </Link>
          <button onClick={dismiss} className="text-sm text-text-secondary hover:underline">
            Dismiss
          </button>
        </div>
      </div>
    </Card>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/onboarding/OnboardingBanner.tsx
git commit -m "feat: add OnboardingBanner component"
```

---

## Task 10: Build OnboardingChecklist Component

**Files:**
- Create: `components/onboarding/OnboardingChecklist.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/onboarding/OnboardingChecklist.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";

type ChecklistItem = { id: number; key: string; completed: boolean };

const STEPS = [
  { id: 1, key: "add_client", title: "Add your first client", description: "Set up a client profile with their niche and tone of voice", cta: "Add a client", link: "/clients/new" },
  { id: 2, key: "generate_script", title: "Generate your first script", description: "See AI write in your client's exact voice", cta: "Generate a script", link: "/generate" },
  { id: 3, key: "explore_library", title: "View your script library", description: "See your saved scripts organised by client", cta: "View library", link: "/scripts" },
  { id: 4, key: "invite_or_upgrade", title: "Unlock the full toolkit", description: "Get the pipeline, calendar, PDF export and more", cta: "See plans", link: "/pricing" },
];

export function OnboardingChecklist({
  initialCompleted,
  initialOnboardingCompleted,
}: {
  initialCompleted: ChecklistItem[];
  initialOnboardingCompleted: boolean;
}) {
  const [items, setItems] = useState(initialCompleted);
  const [dismissed, setDismissed] = useState(initialOnboardingCompleted);
  const [celebrating, setCelebrating] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const allDone = completedCount === 4;
  const progress = (completedCount / 4) * 100;

  useEffect(() => {
    if (allDone && !dismissed) {
      setCelebrating(true);
      const t = setTimeout(() => {
        setDismissed(true);
        void fetch("/api/user/onboarding", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ onboardingCompleted: true }),
        });
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [allDone, dismissed]);

  async function dismiss() {
    setDismissed(true);
    try {
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingCompleted: true }),
      });
    } catch {
      // non-critical
    }
  }

  if (dismissed && !celebrating) return null;

  return (
    <Card
      className={`transition-opacity duration-700 ${celebrating ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm">Getting started</h2>
        <span className="text-xs text-text-secondary dark:text-dark-muted">
          {completedCount} of 4 complete
        </span>
      </div>
      <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: "#7F77DD" }}
        />
      </div>
      <div className="space-y-3">
        {STEPS.map((step) => {
          const item = items.find((i) => i.id === step.id);
          const done = item?.completed ?? false;
          return (
            <div key={step.id} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                {done ? (
                  <CheckCircle size={18} className="text-[#7F77DD]" />
                ) : (
                  <Circle size={18} className="text-text-secondary dark:text-dark-muted" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${done ? "line-through text-text-secondary dark:text-dark-muted" : ""}`}>
                  {step.title}
                </div>
                {!done && (
                  <div className="text-xs text-text-secondary dark:text-dark-muted mt-0.5">
                    {step.description}
                  </div>
                )}
              </div>
              {!done && (
                <Link
                  href={step.link}
                  className="text-xs text-[#7F77DD] hover:underline flex-shrink-0"
                >
                  {step.cta} →
                </Link>
              )}
            </div>
          );
        })}
      </div>
      {!allDone && (
        <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
          <button onClick={dismiss} className="text-xs text-text-secondary hover:underline">
            Dismiss
          </button>
        </div>
      )}
    </Card>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/onboarding/OnboardingChecklist.tsx
git commit -m "feat: add OnboardingChecklist component"
```

---

## Task 11: Build ScriptsPageTracker Component

**Files:**
- Create: `components/onboarding/ScriptsPageTracker.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/onboarding/ScriptsPageTracker.tsx
"use client";
import { useEffect } from "react";

export function ScriptsPageTracker() {
  useEffect(() => {
    void fetch("/api/user/onboarding").catch(() => {});
  }, []);
  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/onboarding/ScriptsPageTracker.tsx
git commit -m "feat: add ScriptsPageTracker component"
```

---

## Task 12: Add Onboarding Components to Dashboard

**Files:**
- Modify: `app/(app)/dashboard/page.tsx`

- [ ] **Step 1: Fetch onboarding data alongside existing data**

The dashboard page is a Server Component. Add an onboarding data fetch in the existing `Promise.all`:

```typescript
  const [totalClients, recentScripts, clients, onboardingData] = await Promise.all([
    prisma.client.count({ where: { workspaceId: workspace.id } }),
    prisma.script.findMany({
      where: { workspaceId: workspace.id },
      include: { client: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.client.findMany({
      where: { workspaceId: workspace.id },
      include: { _count: { select: { scripts: true } } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.workspace.findUnique({
      where: { id: workspace.id },
      select: {
        onboardingStep: true,
        onboardingCompleted: true,
        firstClientAddedAt: true,
        firstScriptGeneratedAt: true,
        plan: true,
      },
    }),
  ]);
```

- [ ] **Step 2: Add imports and components to the JSX**

Add these imports at the top:
```typescript
import { OnboardingBanner } from "@/components/onboarding/OnboardingBanner";
import { OnboardingChecklist } from "@/components/onboarding/OnboardingChecklist";
import { getScriptLimit, getRemainingScripts } from "@/lib/planLimits";
```

In the JSX, after `<ScriptUsageCard .../>` and before the welcome heading, add:
```typescript
      {onboardingData && !onboardingData.onboardingCompleted && (
        <OnboardingBanner onboardingStep={onboardingData.onboardingStep} />
      )}
```

After the existing FREE upgrade prompt card (after line ~68), add:
```typescript
      {onboardingData && !onboardingData.onboardingCompleted && (
        <OnboardingChecklist
          initialCompleted={[
            { id: 1, key: "add_client", completed: onboardingData.firstClientAddedAt !== null },
            { id: 2, key: "generate_script", completed: onboardingData.firstScriptGeneratedAt !== null },
            { id: 3, key: "explore_library", completed: onboardingData.onboardingStep >= 3 },
            { id: 4, key: "invite_or_upgrade", completed: onboardingData.plan !== "FREE" },
          ]}
          initialOnboardingCompleted={onboardingData.onboardingCompleted}
        />
      )}
```

Also add the 80% usage amber banner. After the `OnboardingChecklist` block, add:

```typescript
      {(() => {
        const limit = getScriptLimit(workspace.plan);
        const used = workspace.scriptCount;
        const resetDate = workspace.scriptCountResetAt.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
        if (limit !== Infinity && used / limit >= 0.8) {
          return (
            <div className="rounded-md border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-sm text-amber-800 dark:text-amber-300">
                You've used <strong>{used}</strong> of <strong>{limit}</strong> scripts this month — resets {resetDate}.
              </span>
              <Link href="/pricing" className="text-xs font-medium text-amber-800 dark:text-amber-300 hover:underline flex-shrink-0">
                Upgrade for more →
              </Link>
            </div>
          );
        }
        return null;
      })()}
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/(app)/dashboard/page.tsx
git commit -m "feat: add onboarding banner, checklist, and usage warning to dashboard"
```

---

## Task 13: Add Empty States and ScriptsPageTracker to /scripts Page

**Files:**
- Modify: `app/(app)/scripts/page.tsx`

- [ ] **Step 1: Read the current scripts page to understand its structure**

Read `app/(app)/scripts/page.tsx` to find where the empty state is currently rendered.

- [ ] **Step 2: Add ScriptsPageTracker import and rich empty state**

Add this import:
```typescript
import { ScriptsPageTracker } from "@/components/onboarding/ScriptsPageTracker";
import { Button } from "@/components/ui/Button";
```

Add `<ScriptsPageTracker />` as the first child inside the page's outermost `<div>`.

Replace the existing empty state (wherever `scripts.length === 0` is handled) with:
```typescript
        {scripts.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <h2 className="text-lg font-semibold">Your script library is empty</h2>
            <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
              Generate your first script and it will appear here, organised by client and platform.
            </p>
            <Link href="/generate">
              <Button size="sm">Generate a script</Button>
            </Link>
          </div>
        ) : ( /* existing scripts list */ )}
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/(app)/scripts/page.tsx
git commit -m "feat: add ScriptsPageTracker and rich empty state to scripts page"
```

---

## Task 14: Add Rich Empty State to /clients Page

**Files:**
- Modify: `app/(app)/clients/page.tsx`

- [ ] **Step 1: Read the current clients page**

Read `app/(app)/clients/page.tsx` to find the empty state location.

- [ ] **Step 2: Replace empty state**

Replace the existing empty state with:
```typescript
        {clients.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <h2 className="text-lg font-semibold">Add your first client</h2>
            <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
              Set up a client profile once and every script you generate will automatically match their voice.
            </p>
            <Link href="/clients/new">
              <Button size="sm"><Plus size={14} /> Add a client</Button>
            </Link>
          </div>
        ) : ( /* existing clients grid */ )}
```

- [ ] **Step 3: Type check + commit**

```bash
npx tsc --noEmit
git add app/(app)/clients/page.tsx
git commit -m "feat: add rich empty state to clients page"
```

---

## Task 15: Add No-Clients Empty State and Model Tooltip to /generate Page

**Files:**
- Modify: `app/(app)/generate/page.tsx` or `components/generate/GenerateForm.tsx`

- [ ] **Step 1: Read the generate page and GenerateForm to understand where client list is loaded**

Read `app/(app)/generate/page.tsx` and `components/generate/GenerateForm.tsx`.

- [ ] **Step 2: Add no-clients guard**

In the generate page (server component), fetch the client count alongside other data. If count is 0, render the empty state instead of the form:

```typescript
  const clientCount = await prisma.client.count({ where: { workspaceId: workspace.id } });

  if (clientCount === 0) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <div className="text-center py-16 space-y-3">
          <h2 className="text-lg font-semibold">Add a client first</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
            To generate a script in your client's voice, you need to set up their profile first.
          </p>
          <Link href="/clients/new">
            <Button size="sm"><Plus size={14} /> Add a client</Button>
          </Link>
        </div>
      </div>
    );
  }
```

- [ ] **Step 3: Add model selector tooltip in GenerateForm**

In `components/generate/GenerateForm.tsx`, find the model selector section. Add a one-time localStorage-gated callout below it:

```typescript
// At the top of GenerateForm component (client component), add:
const [showModelTooltip, setShowModelTooltip] = useState(false);
useEffect(() => {
  if (!localStorage.getItem("sf_tooltip_model_seen")) {
    setShowModelTooltip(true);
  }
}, []);

// Below the model selector JSX, add:
{showModelTooltip && (
  <div className="mt-1 p-3 rounded-md bg-[var(--color-primary-tint)] border border-[var(--color-primary)]/20 text-xs text-text-secondary dark:text-dark-muted flex items-start justify-between gap-2">
    <span>Standard is great for TikTok and short clips. Quality works for most scripts. Premium is best for long YouTube videos.</span>
    <button
      onClick={() => {
        localStorage.setItem("sf_tooltip_model_seen", "1");
        setShowModelTooltip(false);
      }}
      className="flex-shrink-0 text-text-secondary hover:text-text-primary"
      aria-label="Dismiss"
    >
      ✕
    </button>
  </div>
)}
```

- [ ] **Step 4: Type check + commit**

```bash
npx tsc --noEmit
git add app/(app)/generate/page.tsx components/generate/GenerateForm.tsx
git commit -m "feat: add no-clients empty state and model tooltip to generate page"
```

---

## Task 16: Add Empty State and Tooltip to /pipeline Page

**Files:**
- Modify: `app/(app)/pipeline/page.tsx` or `components/pipeline/KanbanBoard.tsx`

- [ ] **Step 1: Read the pipeline page and KanbanBoard component**

Read `app/(app)/pipeline/page.tsx` and `components/pipeline/KanbanBoard.tsx`.

- [ ] **Step 2: Add empty-state for eligible users with no pipeline items**

In the pipeline page (after the upgrade gate for FREE/BASIC), if the user is PRO+ and has zero content items, show:

```typescript
  if (contentItems.length === 0) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <div className="text-center py-16 space-y-3">
          <h2 className="text-lg font-semibold">Nothing in your pipeline yet</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
            Add a content idea to start tracking it from concept to published.
          </p>
          <Link href="/pipeline/new">
            <Button size="sm"><Plus size={14} /> Add first piece</Button>
          </Link>
        </div>
      </div>
    );
  }
```

- [ ] **Step 3: Add first-column tooltip**

In `components/pipeline/KanbanBoard.tsx` (client component), add a one-time tooltip on the first column header:

```typescript
const [showPipelineTooltip, setShowPipelineTooltip] = useState(false);
useEffect(() => {
  if (!localStorage.getItem("sf_tooltip_pipeline_seen")) {
    setShowPipelineTooltip(true);
  }
}, []);
```

On the first `KanbanColumn` render (the IDEA column), pass an optional tooltip prop or render inline below its header:

```typescript
{showPipelineTooltip && firstColumnIndex === 0 && (
  <div className="mx-2 mb-2 p-2 rounded bg-[var(--color-primary-tint)] text-xs text-text-secondary dark:text-dark-muted flex items-start justify-between gap-2">
    <span>Drag cards between columns as your content moves through production.</span>
    <button
      onClick={() => {
        localStorage.setItem("sf_tooltip_pipeline_seen", "1");
        setShowPipelineTooltip(false);
      }}
      aria-label="Dismiss"
      className="flex-shrink-0"
    >
      ✕
    </button>
  </div>
)}
```

- [ ] **Step 4: Type check + commit**

```bash
npx tsc --noEmit
git add app/(app)/pipeline/page.tsx components/pipeline/KanbanBoard.tsx
git commit -m "feat: add pipeline empty state and first-column tooltip"
```

---

## Task 17: Add PDF Export Lock for FREE/BASIC in ScriptActions

**Files:**
- Modify: `components/script/ScriptActions.tsx`

- [ ] **Step 1: Read ScriptActions.tsx**

Read `components/script/ScriptActions.tsx` to find where the PDF download button is rendered.

- [ ] **Step 2: Add inline lock message for FREE/BASIC**

Find the PDF download button. Wrap it with a plan check. The component likely already receives a `plan` prop or workspace context. If it doesn't receive `plan`, add it as a prop.

Replace the PDF button with:
```typescript
{canExportPDF(plan) ? (
  <button onClick={handlePdfDownload} /* existing props */ >
    Download PDF
  </button>
) : (
  <div className="text-xs text-text-secondary dark:text-dark-muted p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
    PDF export is available on Pro.{" "}
    <Link href="/pricing" className="text-primary hover:underline">
      Upgrade to Pro
    </Link>{" "}
    to send polished reports to clients.
  </div>
)}
```

Import `canExportPDF` from `@/lib/planLimits` if not already imported.

- [ ] **Step 3: Type check + commit**

```bash
npx tsc --noEmit
git add components/script/ScriptActions.tsx
git commit -m "feat: lock PDF export for FREE/BASIC with inline upgrade prompt"
```

---

## Task 18: Add 80% Usage Banner to Generate Page

**Files:**
- Modify: `app/(app)/generate/page.tsx` or `components/generate/GenerateForm.tsx`

- [ ] **Step 1: Add usage banner to generate page**

In the generate page server component, add after the `clientCount === 0` guard and before rendering the form:

```typescript
  const limit = getScriptLimit(workspace.plan);
  const usagePct = limit === Infinity ? 0 : workspace.scriptCount / limit;
  const resetDate = workspace.scriptCountResetAt.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
```

At the top of the returned JSX (inside the main wrapper div), add:
```typescript
        {usagePct >= 0.8 && limit !== Infinity && (
          <div className="rounded-md border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-4 py-3 flex items-center justify-between gap-4 flex-wrap mb-4">
            <span className="text-sm text-amber-800 dark:text-amber-300">
              You've used <strong>{workspace.scriptCount}</strong> of <strong>{limit}</strong> scripts this month — resets {resetDate}.
            </span>
            <Link href="/pricing" className="text-xs font-medium text-amber-800 dark:text-amber-300 hover:underline flex-shrink-0">
              Upgrade for more →
            </Link>
          </div>
        )}
```

Import `getScriptLimit` from `@/lib/planLimits` if not already present.

- [ ] **Step 2: Type check + commit**

```bash
npx tsc --noEmit
git add app/(app)/generate/page.tsx
git commit -m "feat: add 80% usage amber banner to generate page"
```

---

## Task 19: Verify PipelineUpgradePrompt Gates Both FREE and BASIC

**Files:**
- Modify: `components/pipeline/PipelineUpgradePrompt.tsx` (if needed)

- [ ] **Step 1: Read PipelineUpgradePrompt.tsx**

Read `components/pipeline/PipelineUpgradePrompt.tsx` to check what plans it blocks.

- [ ] **Step 2: Ensure FREE is gated**

In the pipeline page, the upgrade gate should be:
```typescript
if (!canAccessPipeline(workspace.plan)) {
  return <PipelineUpgradePrompt />;
}
```

`canAccessPipeline` in `lib/planLimits.ts` returns false for FREE and BASIC. Verify this is the case by reading `lib/planLimits.ts`. If the component or gate only checks one plan, extend it to cover both.

- [ ] **Step 3: Type check + commit if changed**

```bash
npx tsc --noEmit
git add components/pipeline/PipelineUpgradePrompt.tsx app/(app)/pipeline/page.tsx
git commit -m "fix: ensure pipeline upgrade prompt gates both FREE and BASIC users"
```

---

## Task 20: Existing-User Migration (Run Before First Cron Deploy)

**Files:**
- Create: `scripts/migrate-onboarding.ts`

This one-time script prevents the cron job from sending welcome emails to users who signed up before onboarding was deployed.

- [ ] **Step 1: Create migration script**

```typescript
// scripts/migrate-onboarding.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const result = await prisma.workspace.updateMany({
    where: { welcomeEmailSentAt: null },
    data: { welcomeEmailSentAt: now },
  });
  console.log(`Marked ${result.count} existing workspaces as welcomed.`);
}

main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
```

- [ ] **Step 2: Run the migration against your database**

```bash
npx tsx scripts/migrate-onboarding.ts
```

Expected output: `Marked N existing workspaces as welcomed.`

- [ ] **Step 3: Commit**

```bash
git add scripts/migrate-onboarding.ts
git commit -m "chore: add one-time migration to prevent welcome emails to existing users"
```

---

## Task 22: Final Type Check and Build Verification

- [ ] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Run the test suite**

```bash
npm test
```

Expected: all existing tests pass.

- [ ] **Step 3: Start dev server and manually verify**

```bash
npm run dev
```

Manual verification checklist:
- [ ] Sign up as a new user → OnboardingBanner appears on dashboard
- [ ] Add a client → checklist step 1 checks off
- [ ] Generate a script → checklist step 2 checks off, banner/checklist still visible
- [ ] Visit /scripts → step 3 checks off
- [ ] Visit /scripts with no scripts → rich empty state with CTA shown
- [ ] Visit /clients with no clients → rich empty state with CTA shown
- [ ] Visit /generate with no clients → "Add a client first" shown instead of form
- [ ] Visit /generate with clients → model tooltip visible on first visit, dismisses on click
- [ ] Dashboard shows amber banner when scriptCount ≥ 80% of limit
- [ ] Dismiss checklist → disappears, doesn't return on refresh
- [ ] Unsubscribe link works: `/api/user/unsubscribe?token={workspaceId}` → redirects to /unsubscribed

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete onboarding system — cron emails, checklist, empty states, upgrade nudges"
```
