# Custom Auth System (Replace Clerk) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Clerk entirely with a custom auth system using Lucia (DB sessions), Arctic (Google OAuth), Argon2 (password hashing), and Resend (auth emails), with shadcn UI pages matching the existing app design.

**Architecture:** Lucia manages sessions stored in Postgres via the Prisma adapter; every request reads the `auth_session` httpOnly cookie, validates against the `Session` table, and attaches the user to the request. Arctic handles the Google OAuth code-exchange flow. `ensureUser()` is rewritten to read the Lucia session instead of Clerk's `auth()`.

**Tech Stack:** Next.js 14, Prisma (Postgres), Lucia v3, Arctic v2, Argon2, Resend, shadcn UI, Vitest, Zod

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Modify | `prisma/schema.prisma` | Add Session, PasswordResetToken, EmailVerificationToken; remove clerkId; add googleId/passwordHash/avatarUrl/emailVerified |
| Create | `lib/auth.ts` | Lucia instance + adapter + session cookie helpers |
| Create | `lib/arctic.ts` | Arctic Google OAuth client |
| Modify | `lib/ensureUser.ts` | Rewrite to use Lucia session instead of Clerk auth() |
| Modify | `middleware.ts` | Replace clerkMiddleware with Lucia session validation |
| Modify | `app/layout.tsx` | Remove ClerkProvider |
| Modify | `next.config.mjs` | Remove Clerk image domains |
| Delete | `app/api/webhooks/clerk/route.ts` | No longer needed |
| Create | `app/api/auth/signup/route.ts` | Email/password sign up handler |
| Create | `app/api/auth/signin/route.ts` | Email/password sign in handler |
| Create | `app/api/auth/signout/route.ts` | Sign out handler |
| Create | `app/api/auth/google/route.ts` | Google OAuth initiation |
| Create | `app/api/auth/google/callback/route.ts` | Google OAuth callback |
| Create | `app/api/auth/forgot-password/route.ts` | Send reset email |
| Create | `app/api/auth/reset-password/route.ts` | Apply new password |
| Create | `app/verify-email/route.ts` | Email verification handler (redirects) |
| Modify | `app/api/account/route.ts` | Remove clerkClient, delete sessions directly |
| Modify | `app/(auth)/login/[[...rest]]/page.tsx` | Replace Clerk SignIn with custom shadcn form |
| Modify | `app/(auth)/signup/[[...rest]]/page.tsx` | Replace Clerk SignUp with custom shadcn form |
| Create | `app/(auth)/forgot-password/page.tsx` | Forgot password form |
| Create | `app/(auth)/reset-password/page.tsx` | Reset password form |
| Modify | `components/layout/Sidebar.tsx` | Replace UserButton with custom avatar/sign-out button |
| Modify | `app/(app)/settings/DeleteAccountCard.tsx` | Remove useClerk, use fetch DELETE /api/account |
| Create | `lib/emails/VerifyEmail.tsx` | React Email verification template |
| Create | `lib/emails/ResetPassword.tsx` | React Email password reset template |

---

## Task 1: Install dependencies and remove Clerk

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install new auth packages**

```bash
npm install lucia @lucia-auth/adapter-prisma arctic argon2
```

- [ ] **Step 2: Remove Clerk and Svix packages**

```bash
npm uninstall @clerk/nextjs svix
```

- [ ] **Step 3: Verify installations**

```bash
npm ls lucia arctic argon2
```

Expected: all three listed without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap @clerk/nextjs+svix for lucia+arctic+argon2"
```

---

## Task 2: Update Prisma schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Open `prisma/schema.prisma` and replace the User model**

Find the existing `model User` block and replace it with:

```prisma
model User {
  id                 String    @id @default(cuid())
  email              String    @unique
  name               String?
  passwordHash       String?
  googleId           String?   @unique
  avatarUrl          String?
  emailVerified      Boolean   @default(false)
  defaultWorkspaceId String?
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  sessions              Session[]
  ownedWorkspaces       Workspace[]       @relation("WorkspaceOwner")
  memberships           WorkspaceMember[]
  sentInvites           Invite[]          @relation("InviteSender")
}
```

- [ ] **Step 2: Add three new models after the User model**

```prisma
model Session {
  id        String   @id
  userId    String
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model PasswordResetToken {
  id        String    @id @default(cuid())
  userId    String
  token     String    @unique
  expiresAt DateTime
  usedAt    DateTime?
}

model EmailVerificationToken {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
}
```

- [ ] **Step 3: Create and run the migration**

```bash
npx prisma migrate dev --name replace_clerk_with_custom_auth
```

Expected: migration runs, schema is pushed to the database, Prisma client regenerated.

- [ ] **Step 4: Verify generated client has new types**

```bash
npx prisma studio
```

Open browser, confirm `Session`, `PasswordResetToken`, `EmailVerificationToken` tables exist and `User` has `passwordHash`, `googleId`, `avatarUrl`, `emailVerified` columns.

- [ ] **Step 5: Commit**

```bash
git add prisma/
git commit -m "feat(db): replace clerkId with custom auth fields + Session/Token models"
```

---

## Task 3: Create Lucia auth instance

**Files:**
- Create: `lib/auth.ts`

- [ ] **Step 1: Write `lib/auth.ts`**

```typescript
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "auth_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
  getUserAttributes(attrs) {
    return {
      email: attrs.email,
      name: attrs.name,
      emailVerified: attrs.emailVerified,
      avatarUrl: attrs.avatarUrl,
      defaultWorkspaceId: attrs.defaultWorkspaceId,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      name: string | null;
      emailVerified: boolean;
      avatarUrl: string | null;
      defaultWorkspaceId: string | null;
    };
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };
  const result = await lucia.validateSession(sessionId);
  return result;
}

export async function setSessionCookie(sessionId: string) {
  const cookie = lucia.createSessionCookie(sessionId);
  cookies().set(cookie.name, cookie.value, cookie.attributes);
}

export async function clearSessionCookie() {
  const cookie = lucia.createBlankSessionCookie();
  cookies().set(cookie.name, cookie.value, cookie.attributes);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors in `lib/auth.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/auth.ts
git commit -m "feat(auth): add Lucia instance with Prisma adapter"
```

---

## Task 4: Create Arctic Google OAuth client

**Files:**
- Create: `lib/arctic.ts`

- [ ] **Step 1: Add Google OAuth env vars to `.env.local`**

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Get these from [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → Create OAuth 2.0 Client ID. Set authorized redirect URI to `http://localhost:3000/api/auth/google/callback` (dev) and your production URL.

- [ ] **Step 2: Write `lib/arctic.ts`**

```typescript
import { Google } from "arctic";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
);
```

- [ ] **Step 3: Commit**

```bash
git add lib/arctic.ts .env.example
git commit -m "feat(auth): add Arctic Google OAuth client"
```

---

## Task 5: Rewrite ensureUser.ts

**Files:**
- Modify: `lib/ensureUser.ts`

- [ ] **Step 1: Rewrite `lib/ensureUser.ts` completely**

```typescript
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";
import { addDays } from "@/lib/utils";
import type { User, Workspace, MemberRole } from "@prisma/client";

export interface AuthContext {
  user: User;
  workspace: Workspace;
  role: MemberRole;
}

export async function ensureUser(): Promise<AuthContext> {
  const { user: sessionUser, session } = await getSession();
  if (!session || !sessionUser) throw new UnauthorizedError();

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) throw new UnauthorizedError();

  let workspace: Workspace | null = null;
  let role: MemberRole = "OWNER";

  if (user.defaultWorkspaceId) {
    const membership = await prisma.workspaceMember.findFirst({
      where: { userId: user.id, workspaceId: user.defaultWorkspaceId },
      include: { workspace: true },
    });
    if (membership) {
      workspace = membership.workspace;
      role = membership.role;
    }
  }

  if (!workspace) {
    const bootstrap = await bootstrapPersonalWorkspace(user);
    workspace = bootstrap.workspace;
    role = bootstrap.role;
  }

  // Monthly script count reset (lazy)
  if (workspace.scriptCountResetAt < new Date()) {
    workspace = await prisma.workspace.update({
      where: { id: workspace.id },
      data: {
        scriptCount: 0,
        scriptCountResetAt: addDays(new Date(), 30),
      },
    });
  }

  return { user, workspace, role };
}

export async function bootstrapPersonalWorkspace(
  user: User
): Promise<{ workspace: Workspace; role: MemberRole }> {
  const firstName = user.name?.split(" ")[0];
  const wsName = `${firstName || user.email.split("@")[0]}'s workspace`;

  const result = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name: wsName,
        ownerId: user.id,
        scriptCountResetAt: addDays(new Date(), 30),
      },
    });
    await tx.workspaceMember.create({
      data: { workspaceId: workspace.id, userId: user.id, role: "OWNER" },
    });
    await tx.user.update({
      where: { id: user.id },
      data: { defaultWorkspaceId: workspace.id },
    });
    return workspace;
  });

  return { workspace: result, role: "OWNER" };
}

export function requireOwner(role: MemberRole): void {
  if (role !== "OWNER") throw new ForbiddenError("Owner role required");
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors referencing Clerk in `ensureUser.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/ensureUser.ts
git commit -m "feat(auth): rewrite ensureUser to use Lucia session"
```

---

## Task 6: Replace middleware.ts

**Files:**
- Modify: `middleware.ts`

- [ ] **Step 1: Replace `middleware.ts` entirely**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";

const publicPaths = [
  "/",
  "/pricing",
  "/youtube-scripts",
  "/tiktok-scripts",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/api/auth",
  "/api/stripe/webhook",
  "/invite",
  "/review",
  "/api/review",
  "/unsubscribed",
  "/api/user/unsubscribe",
  "/admin",
  "/api/admin",
  "/onboarding",
];

function isPublic(pathname: string): boolean {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?")
  );
}

export async function middleware(req: NextRequest) {
  if (isPublic(req.nextUrl.pathname)) return NextResponse.next();

  const sessionId = req.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { session } = await lucia.validateSession(sessionId);
  if (!session) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete(lucia.sessionCookieName);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat(auth): replace clerkMiddleware with Lucia session middleware"
```

---

## Task 7: Update layout.tsx and next.config.mjs

**Files:**
- Modify: `app/layout.tsx`
- Modify: `next.config.mjs`

- [ ] **Step 1: Remove ClerkProvider from `app/layout.tsx`**

Replace the entire file with:

```typescript
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieConsent } from "@/components/consent/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Scribtly — AI video scripts for freelancers",
  description:
    "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com"),
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ConsentProvider>
          {children}
          <CookieConsent />
        </ConsentProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Remove Clerk image domains from `next.config.mjs`**

Replace the remotePatterns array. If there are no other entries, remove the `images` key entirely or leave an empty array:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google avatars
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx next.config.mjs
git commit -m "feat(auth): remove ClerkProvider and Clerk image domains"
```

---

## Task 8: Create email templates

**Files:**
- Create: `lib/emails/VerifyEmail.tsx`
- Create: `lib/emails/ResetPassword.tsx`

- [ ] **Step 1: Write `lib/emails/VerifyEmail.tsx`**

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  verificationUrl: string;
  name?: string;
}

export default function VerifyEmail({ verificationUrl, name }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your Scribtly email address</Preview>
      <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "40px auto", backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
          <Heading style={{ fontSize: 22, marginBottom: 8 }}>Verify your email</Heading>
          <Text>Hi {name || "there"},</Text>
          <Text>Click the button below to verify your email address and get started with Scribtly.</Text>
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Verify email
            </Button>
          </Section>
          <Text style={{ color: "#666", fontSize: 13 }}>
            This link expires in 24 hours. If you didn&apos;t create a Scribtly account, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 2: Write `lib/emails/ResetPassword.tsx`**

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordProps {
  resetUrl: string;
  name?: string;
}

export default function ResetPassword({ resetUrl, name }: ResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Scribtly password</Preview>
      <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "40px auto", backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
          <Heading style={{ fontSize: 22, marginBottom: 8 }}>Reset your password</Heading>
          <Text>Hi {name || "there"},</Text>
          <Text>We received a request to reset your Scribtly password. Click the button below to choose a new one.</Text>
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Reset password
            </Button>
          </Section>
          <Text style={{ color: "#666", fontSize: 13 }}>
            This link expires in 1 hour. If you didn&apos;t request a password reset, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 3: Add send helpers to `lib/sendEmail.ts`**

Open `lib/sendEmail.ts` and add these two functions alongside the existing ones:

```typescript
export async function sendVerificationEmail({
  to,
  name,
  verificationUrl,
}: {
  to: string;
  name?: string;
  verificationUrl: string;
}) {
  const { default: VerifyEmail } = await import("@/lib/emails/VerifyEmail");
  const { render } = await import("@react-email/components");
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Verify your Scribtly email",
    html: await render(VerifyEmail({ verificationUrl, name })),
  });
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name?: string;
  resetUrl: string;
}) {
  const { default: ResetPassword } = await import("@/lib/emails/ResetPassword");
  const { render } = await import("@react-email/components");
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Reset your Scribtly password",
    html: await render(ResetPassword({ resetUrl, name })),
  });
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/emails/VerifyEmail.tsx lib/emails/ResetPassword.tsx lib/sendEmail.ts
git commit -m "feat(auth): add verify-email and reset-password email templates"
```

---

## Task 9: Create auth API routes

**Files:**
- Create: `app/api/auth/signup/route.ts`
- Create: `app/api/auth/signin/route.ts`
- Create: `app/api/auth/signout/route.ts`
- Create: `app/api/auth/forgot-password/route.ts`
- Create: `app/api/auth/reset-password/route.ts`

- [ ] **Step 1: Write `app/api/auth/signup/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { hash } from "argon2";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/sendEmail";
import { addDays } from "@/lib/utils";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await hash(password);
  const verificationToken = generateId(40);

  const user = await prisma.$transaction(async (tx) => {
    const invite = await tx.invite.findFirst({
      where: { email, acceptedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });

    const newUser = await tx.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
        emailVerified: false,
      },
    });

    if (invite) {
      await tx.workspaceMember.create({
        data: { workspaceId: invite.workspaceId, userId: newUser.id, role: "MEMBER" },
      });
      await tx.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
      await tx.user.update({
        where: { id: newUser.id },
        data: { defaultWorkspaceId: invite.workspaceId },
      });
    } else {
      const wsName = `${name?.split(" ")[0] || email.split("@")[0]}'s workspace`;
      const ws = await tx.workspace.create({
        data: { name: wsName, ownerId: newUser.id, scriptCountResetAt: addDays(new Date(), 30) },
      });
      await tx.workspaceMember.create({
        data: { workspaceId: ws.id, userId: newUser.id, role: "OWNER" },
      });
      await tx.user.update({ where: { id: newUser.id }, data: { defaultWorkspaceId: ws.id } });
    }

    await tx.emailVerificationToken.create({
      data: {
        userId: newUser.id,
        token: verificationToken,
        expiresAt: addDays(new Date(), 1),
      },
    });

    return newUser;
  });

  const session = await lucia.createSession(user.id, {});
  await setSessionCookie(session.id);

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
  void sendVerificationEmail({ to: email, name: name, verificationUrl }).catch(console.error);
  void import("@/lib/sendEmail").then(({ sendWelcome }) =>
    sendWelcome({ to: email, name: name || undefined }).catch(console.error)
  );

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Write `app/api/auth/signin/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await verify(user.passwordHash, password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  if (!user.emailVerified) {
    return NextResponse.json(
      { error: "Please verify your email before signing in.", code: "EMAIL_NOT_VERIFIED" },
      { status: 403 }
    );
  }

  const session = await lucia.createSession(user.id, {});
  await setSessionCookie(session.id);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Write `app/api/auth/signout/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { getSession, lucia, clearSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const { session } = await getSession();
  if (session) {
    await lucia.invalidateSession(session.id);
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Write `app/api/auth/forgot-password/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/sendEmail";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().email() });

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // Always return success to avoid leaking email existence
    return NextResponse.json({ ok: true });
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && user.passwordHash) {
    const token = generateId(40);
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: addHours(new Date(), 1),
      },
    });
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    void sendPasswordResetEmail({ to: email, name: user.name || undefined, resetUrl }).catch(
      console.error
    );
  }

  // Always respond with ok — don't leak whether email exists
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 5: Write `app/api/auth/reset-password/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { hash } from "argon2";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/auth";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { token, password } = parsed.data;

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "This link has expired. Request a new one." },
      { status: 400 }
    );
  }

  const passwordHash = await hash(password);

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  // Invalidate all sessions so the user must sign in fresh
  await lucia.invalidateUserSessions(record.userId);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 6: Commit**

```bash
git add app/api/auth/
git commit -m "feat(auth): add signup, signin, signout, forgot-password, reset-password API routes"
```

---

## Task 10: Create Google OAuth routes

**Files:**
- Create: `app/api/auth/google/route.ts`
- Create: `app/api/auth/google/callback/route.ts`

- [ ] **Step 1: Write `app/api/auth/google/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { google } from "@/lib/arctic";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["openid", "profile", "email"],
  });

  cookies().set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  cookies().set("google_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return NextResponse.redirect(url);
}
```

- [ ] **Step 2: Write `app/api/auth/google/callback/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { google } from "@/lib/arctic";
import { decodeIdToken } from "arctic";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
import { bootstrapPersonalWorkspace } from "@/lib/ensureUser";
import { addDays } from "@/lib/utils";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value;
  const codeVerifier = cookies().get("google_code_verifier")?.value;

  if (!code || !state || state !== storedState || !codeVerifier) {
    return NextResponse.redirect(
      new URL("/login?error=google_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const claims = decodeIdToken(tokens.idToken()) as {
      sub: string;
      email: string;
      name?: string;
      picture?: string;
      email_verified?: boolean;
    };

    const { sub: googleId, email, name, picture } = claims;

    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId }, { email }] },
    });

    const isNewUser = !user;

    if (!user) {
      user = await prisma.$transaction(async (tx) => {
        const invite = await tx.invite.findFirst({
          where: { email, acceptedAt: null, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: "desc" },
        });

        const newUser = await tx.user.create({
          data: {
            email,
            name: name || null,
            googleId,
            avatarUrl: picture || null,
            emailVerified: true,
          },
        });

        if (invite) {
          await tx.workspaceMember.create({
            data: { workspaceId: invite.workspaceId, userId: newUser.id, role: "MEMBER" },
          });
          await tx.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
          await tx.user.update({
            where: { id: newUser.id },
            data: { defaultWorkspaceId: invite.workspaceId },
          });
          return { ...newUser, defaultWorkspaceId: invite.workspaceId };
        } else {
          const wsName = `${name?.split(" ")[0] || email.split("@")[0]}'s workspace`;
          const ws = await tx.workspace.create({
            data: { name: wsName, ownerId: newUser.id, scriptCountResetAt: addDays(new Date(), 30) },
          });
          await tx.workspaceMember.create({
            data: { workspaceId: ws.id, userId: newUser.id, role: "OWNER" },
          });
          await tx.user.update({ where: { id: newUser.id }, data: { defaultWorkspaceId: ws.id } });
          return { ...newUser, defaultWorkspaceId: ws.id };
        }
      });
    } else if (!user.googleId || user.avatarUrl !== picture) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: user.googleId ?? googleId,
          avatarUrl: picture || user.avatarUrl,
          emailVerified: true,
        },
      });
    }

    const session = await lucia.createSession(user.id, {});
    await setSessionCookie(session.id);

    cookies().delete("google_oauth_state");
    cookies().delete("google_code_verifier");

    const redirectTo = isNewUser ? "/team-onboarding" : "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_APP_URL!));
  } catch (err) {
    console.error("Google OAuth callback error", err);
    return NextResponse.redirect(
      new URL("/login?error=google_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/auth/google/
git commit -m "feat(auth): add Google OAuth initiation and callback routes"
```

---

## Task 11: Create email verification route

**Files:**
- Create: `app/verify-email/route.ts`

- [ ] **Step 1: Write `app/verify-email/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", appUrl));
  }

  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/login?error=token_expired", appUrl));
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } }),
    prisma.emailVerificationToken.delete({ where: { id: record.id } }),
  ]);

  return NextResponse.redirect(new URL("/team-onboarding", appUrl));
}
```

- [ ] **Step 2: Commit**

```bash
git add app/verify-email/route.ts
git commit -m "feat(auth): add email verification route handler"
```

---

## Task 12: Build custom login page

**Files:**
- Modify: `app/(auth)/login/[[...rest]]/page.tsx`

- [ ] **Step 1: Replace the login page**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [unverified, setUnverified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setUnverified(false);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "EMAIL_NOT_VERIFIED") {
          setUnverified(true);
        } else {
          setError(data.error || "Invalid email or password.");
        }
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    setResendLoading(true);
    try {
      await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setResendSent(true);
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {unverified && (
        <Alert>
          <AlertDescription>
            Please verify your email before signing in.{" "}
            {resendSent ? (
              <span className="font-medium">Verification email sent!</span>
            ) : (
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="underline hover:text-primary disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend verification email"}
              </button>
            )}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-muted-foreground underline hover:text-primary">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Button variant="outline" asChild className="w-full">
        <a href="/api/auth/google">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(auth)/login/"
git commit -m "feat(auth): replace Clerk SignIn with custom shadcn login page"
```

---

## Task 13: Build custom signup page

**Files:**
- Modify: `app/(auth)/signup/[[...rest]]/page.tsx`

- [ ] **Step 1: Replace the signup page**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Button variant="outline" asChild className="w-full">
        <a href="/api/auth/google">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(auth)/signup/"
git commit -m "feat(auth): replace Clerk SignUp with custom shadcn signup page"
```

---

## Task 14: Build forgot-password and reset-password pages

**Files:**
- Create: `app/(auth)/forgot-password/page.tsx`
- Create: `app/(auth)/reset-password/page.tsx`

- [ ] **Step 1: Write `app/(auth)/forgot-password/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {sent ? (
        <Alert>
          <AlertDescription>
            Check your inbox — we sent you a password reset link.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}

      <p className="text-center text-sm">
        <Link href="/login" className="underline hover:text-primary text-muted-foreground">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Write `app/(auth)/reset-password/page.tsx`**

```tsx
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      router.push("/login?reset=success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          This link has expired. Request a new one.{" "}
          <Link href="/forgot-password" className="underline">
            Forgot password?
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Set new password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a strong password for your account.
        </p>
      </div>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 3: Update `app/(auth)/login/[[...rest]]/page.tsx` to show reset success message**

Add at the top of the component, reading `searchParams`:

```tsx
// Add this import at the top
import { useSearchParams } from "next/navigation";

// Add inside the component, after the existing state declarations:
const searchParams = useSearchParams();
const resetSuccess = searchParams.get("reset") === "success";

// Add this Alert above the form (below the existing error Alert):
{resetSuccess && (
  <Alert>
    <AlertDescription>
      Your password has been updated. You can now sign in.
    </AlertDescription>
  </Alert>
)}
```

Because `useSearchParams` requires Suspense, wrap the login form content in a `<Suspense>` boundary — split the form into a `LoginForm` sub-component and wrap it:

```tsx
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";
  const googleError = searchParams.get("error") === "google_failed";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [unverified, setUnverified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setUnverified(false);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "EMAIL_NOT_VERIFIED") {
          setUnverified(true);
        } else {
          setError(data.error || "Invalid email or password.");
        }
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    setResendLoading(true);
    try {
      await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setResendSent(true);
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {resetSuccess && (
        <Alert>
          <AlertDescription>Your password has been updated. You can now sign in.</AlertDescription>
        </Alert>
      )}
      {googleError && (
        <Alert variant="destructive">
          <AlertDescription>Something went wrong with Google sign in. Please try again.</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {unverified && (
        <Alert>
          <AlertDescription>
            Please verify your email before signing in.{" "}
            {resendSent ? (
              <span className="font-medium">Verification email sent!</span>
            ) : (
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="underline hover:text-primary disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend verification email"}
              </button>
            )}
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-muted-foreground underline hover:text-primary">Forgot password?</Link>
          </div>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </div>
        <Button type="submit" disabled={loading} className="w-full">{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
      </div>
      <Button variant="outline" asChild className="w-full">
        <a href="/api/auth/google">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>
      </Button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline hover:text-primary">Sign up</Link>
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add "app/(auth)/forgot-password/" "app/(auth)/reset-password/" "app/(auth)/login/"
git commit -m "feat(auth): add forgot-password, reset-password pages; update login with searchParams"
```

---

## Task 15: Add resend-verification route

**Files:**
- Create: `app/api/auth/resend-verification/route.ts`

- [ ] **Step 1: Write `app/api/auth/resend-verification/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/sendEmail";
import { addDays } from "@/lib/utils";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: true });

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && !user.emailVerified) {
    // Delete any existing tokens for this user
    await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });

    const token = generateId(40);
    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: addDays(new Date(), 1),
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    void sendVerificationEmail({
      to: email,
      name: user.name || undefined,
      verificationUrl,
    }).catch(console.error);
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/auth/resend-verification/route.ts
git commit -m "feat(auth): add resend-verification endpoint"
```

---

## Task 16: Update account deletion route

**Files:**
- Modify: `app/api/account/route.ts`

- [ ] **Step 1: Rewrite `app/api/account/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { ensureUser } from "@/lib/ensureUser";
import { lucia, clearSessionCookie, getSession } from "@/lib/auth";
import { ValidationError, errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest) {
  try {
    const { user } = await ensureUser();
    const body = await req.json().catch(() => ({}));
    if (body?.confirm !== "DELETE") throw new ValidationError("Confirmation missing");

    const ownedWorkspaces = await prisma.workspace.findMany({
      where: { ownerId: user.id, stripeSubscriptionId: { not: null } },
    });
    for (const ws of ownedWorkspaces) {
      try {
        if (ws.stripeSubscriptionId) {
          await stripe.subscriptions.cancel(ws.stripeSubscriptionId);
        }
      } catch (err) {
        console.error("Failed to cancel subscription", ws.id, err);
      }
    }

    await lucia.invalidateUserSessions(user.id);
    await prisma.user.delete({ where: { id: user.id } });
    await clearSessionCookie();

    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/account/route.ts
git commit -m "feat(auth): remove clerkClient from account deletion, use Lucia session invalidation"
```

---

## Task 17: Update DeleteAccountCard

**Files:**
- Modify: `app/(app)/settings/DeleteAccountCard.tsx`

- [ ] **Step 1: Remove `useClerk` and update sign-out after deletion**

Open `app/(app)/settings/DeleteAccountCard.tsx`. Find any `useClerk` import and usage. The component calls `signOut()` from `useClerk` after deletion — replace that with a redirect to `/` (the server already cleared the session cookie).

Replace the entire file:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DeleteAccountCard() {
  const router = useRouter();
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (confirm !== "DELETE") return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to delete account.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        This will permanently delete your account, all your workspaces, and cancel any active subscriptions. This cannot be undone.
      </p>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm">Type <span className="font-mono font-semibold">DELETE</span> to confirm.</p>
        <Input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="DELETE"
          className="max-w-xs"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        variant="destructive"
        onClick={handleDelete}
        disabled={confirm !== "DELETE" || loading}
        className="w-fit"
      >
        {loading ? "Deleting..." : "Delete account"}
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(app)/settings/DeleteAccountCard.tsx"
git commit -m "feat(auth): remove useClerk from DeleteAccountCard"
```

---

## Task 18: Update Sidebar UserButton

**Files:**
- Modify: `components/layout/Sidebar.tsx`

- [ ] **Step 1: Replace `UserButton` with a custom user avatar + sign-out button**

In `components/layout/Sidebar.tsx`:

1. Remove the `UserButton` import from `@clerk/nextjs`
2. Find both places where `<UserButton afterSignOutUrl="/" ... />` is rendered (desktop and mobile)
3. Replace each with a custom component

First add this import at the top of Sidebar.tsx:
```tsx
import { useRouter } from "next/navigation";
```

Then replace each `<UserButton ... />` instance with:
```tsx
<UserAvatar />
```

And add this component inside the file (before or after the Sidebar component):
```tsx
function UserAvatar() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium hover:opacity-80 transition-opacity"
      title="Sign out"
    >
      <span>↪</span>
    </button>
  );
}
```

> **Note:** If the Sidebar already has user data available (e.g. name/avatar from props or context), use it to render initials or an avatar image. The `UserAvatar` above is the minimal implementation — enhance with user data if it's available in scope.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Sidebar.tsx
git commit -m "feat(auth): replace Clerk UserButton with custom sign-out button in Sidebar"
```

---

## Task 19: Delete Clerk webhook route

**Files:**
- Delete: `app/api/webhooks/clerk/route.ts`

- [ ] **Step 1: Delete the file**

```bash
rm "app/api/webhooks/clerk/route.ts"
# If the directory is now empty:
rmdir "app/api/webhooks/clerk"
rmdir "app/api/webhooks"
```

- [ ] **Step 2: Remove env vars from `.env.example`**

Open `.env.example` and remove these lines:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Add these instead:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: delete Clerk webhook route and update env vars"
```

---

## Task 20: Final TypeScript check and smoke test

- [ ] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: zero errors. Fix any remaining Clerk import references reported.

- [ ] **Step 2: Search for any remaining Clerk imports**

```bash
grep -r "@clerk" . --include="*.ts" --include="*.tsx" --exclude-dir=node_modules
```

Expected: no output. If any files are returned, remove or replace the Clerk imports.

- [ ] **Step 3: Run existing tests**

```bash
npx vitest run
```

Expected: all existing tests pass (referral-copy tests are unrelated to auth and should still pass).

- [ ] **Step 4: Start dev server and manually test the sign-up flow**

```bash
npm run dev
```

Navigate to `http://localhost:3000/signup` — create a new account, check the verification email arrives, click the link, confirm redirect to `/team-onboarding`.

- [ ] **Step 5: Manually test sign-in and forgot-password**

1. Go to `/login`, sign in with the account you just created — confirm redirect to `/dashboard`
2. Go to `/forgot-password`, enter your email — confirm email arrives with reset link
3. Click the reset link — confirm `/reset-password` page loads, update password, confirm redirect to `/login` with success message

- [ ] **Step 6: Manually test Google OAuth**

1. Go to `/login`, click "Continue with Google" — confirm Google consent screen appears
2. Authorize — confirm redirect to `/dashboard` (existing user) or `/team-onboarding` (new user)

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat(auth): complete Clerk removal — custom auth system fully operational"
```
