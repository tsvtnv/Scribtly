# Design Spec: Replace Clerk with Custom Auth System

**Date:** 2026-04-18  
**Status:** Approved  
**Scope:** Remove Clerk entirely; replace with Lucia + Arctic + Resend-based auth

---

## Overview

Replace Clerk with a fully custom authentication system. The new system uses:
- **Lucia** for session management (DB-backed sessions via Prisma adapter)
- **Arctic** for Google OAuth
- **Argon2** for password hashing
- **Resend** for transactional auth emails (already in use)
- **shadcn UI** for all auth pages (matching existing app design)

---

## 1. Database Schema Changes

### Remove
- `clerkId` field from `User` model
- `/api/webhooks/clerk` route (user creation moves to sign-up handler)

### Add to `User` model
```prisma
model User {
  id                 String    @id @default(cuid())
  email              String    @unique
  name               String?
  passwordHash       String?           // null for Google-only users
  googleId           String?   @unique // replaces clerkId
  avatarUrl          String?
  emailVerified      Boolean   @default(false)
  defaultWorkspaceId String?
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  sessions           Session[]
  ownedWorkspaces    Workspace[]
  memberships        WorkspaceMember[]
  sentInvites        Invite[]
}
```

### New models
```prisma
model Session {
  id        String   @id  // random 40-char token
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

### Migration notes
- Existing users with `clerkId` will lose their auth link. This is a breaking migration — existing users will need to reset their password or re-authenticate via Google.
- `clerkId` column dropped via Prisma migration.

---

## 2. Auth Pages & UI

All pages built with shadcn UI components. Centered card layout matching existing `/login` and `/signup` style. Inline field-level error messages (not toasts). Custom copy throughout — no Clerk branding.

| Route | Purpose |
|-------|---------|
| `/login` | Email/password sign in + Google OAuth button |
| `/signup` | Email/password sign up + Google OAuth button |
| `/forgot-password` | Submit email → receive reset link |
| `/reset-password?token=...` | Enter new password form |
| `/verify-email?token=...` | Server route handler: validates token → sets emailVerified → redirects to `/team-onboarding` |

### Custom auth message copy
- Sign in error: "Invalid email or password."
- Unverified account: "Please verify your email before signing in. Resend verification email?"
- Forgot password sent: "Check your inbox — we sent you a password reset link."
- Reset success: "Your password has been updated. You can now sign in."
- Email verified: (redirect to `/team-onboarding`, no message needed)
- Token expired: "This link has expired. Request a new one."
- Google auth error: "Something went wrong with Google sign in. Please try again."

---

## 3. Auth Flows

### Sign Up (email/password)
1. User submits email + password
2. Validate: email format, password min 8 chars
3. Check email not already registered
4. Hash password with argon2
5. Create `User` (emailVerified: false)
6. Create `EmailVerificationToken` (24hr expiry)
7. Send verification email via Resend with token link
8. Create `Session`, set `auth_session` httpOnly cookie
9. Redirect to `/dashboard` (app usable but banner prompts verification)

### Email Verification
1. User clicks link in email → hits `/verify-email?token=...`
2. Server: find token, check not expired
3. Set `emailVerified: true` on user
4. Delete token
5. Redirect to `/team-onboarding`

### Sign In (email/password)
1. User submits email + password
2. Find user by email, verify passwordHash with argon2
3. If `emailVerified: false` → show error with resend option
4. Create `Session`, set cookie
5. Redirect to `/dashboard`

### Google OAuth (Arctic)
1. `/api/auth/google` → generate state + PKCE code verifier → store in cookies → redirect to Google
2. `/api/auth/google/callback` → validate state → exchange code for tokens → fetch Google profile
3. Find user by `googleId` or `email`
4. If new user: create `User` (emailVerified: true, avatarUrl from Google), check pending invites, create/join workspace
5. If existing user: update `avatarUrl` if changed
6. Create `Session`, set cookie
7. New user → redirect to `/team-onboarding`, existing → `/dashboard`

### Forgot Password
1. User submits email on `/forgot-password`
2. If email exists: create `PasswordResetToken` (1hr expiry), send Resend email
3. Always show "Check your inbox" (don't leak whether email exists)
4. User clicks link → `/reset-password?token=...`
5. Validate token (not expired, not used)
6. User submits new password → hash → save → mark token `usedAt`
7. Invalidate all existing sessions for that user
8. Redirect to `/login` with success message

### Sign Out
1. DELETE `Session` row from DB
2. Clear `auth_session` cookie
3. Redirect to `/`

### Account Deletion
1. Cancel Stripe subscription
2. Delete all `Session` rows for user
3. Delete `User` row (cascades: workspaces, memberships, invites)
4. Clear cookie → redirect to `/`

---

## 4. Middleware & Session Management

### Session config
- Cookie name: `auth_session`
- httpOnly, Secure, SameSite=Lax
- Expiry: 30 days, rolling (refreshed on each request)
- Token: 40-char cryptographically random string

### Middleware (`middleware.ts`)
- Replace `clerkMiddleware()` with custom Lucia session validator
- Same public/protected route split (no route changes)
- Reads `auth_session` cookie → validates against `Session` table → attaches user to request
- Unauthenticated requests to protected routes → redirect to `/login`

### `ensureUser()` rewrite
- Reads Lucia session (replaces `auth()` from Clerk)
- Returns same `AuthContext` shape: `{ user, workspace, role }`
- Preserves lazy workspace bootstrap
- Preserves invite auto-acceptance on first login
- Preserves monthly quota reset logic

---

## 5. Files to Remove / Replace

### Remove entirely
- `@clerk/nextjs` package
- `svix` package
- `CLERK_*` and `NEXT_PUBLIC_CLERK_*` env vars
- `/api/webhooks/clerk/route.ts`
- `ClerkProvider` from `app/layout.tsx`
- `useClerk()` import in `DeleteAccountCard.tsx`
- Clerk image domains from `next.config.mjs`

### Replace
| Old | New |
|-----|-----|
| `middleware.ts` (clerkMiddleware) | Lucia session middleware |
| `lib/ensureUser.ts` | Lucia-based ensureUser |
| `app/(auth)/login/` | Custom shadcn sign-in page |
| `app/(auth)/signup/` | Custom shadcn sign-up page |
| `app/api/account/route.ts` (deleteUser) | Direct DB deletion |
| `components/layout/Sidebar.tsx` (UserButton) | Custom user avatar/menu |

### Add
| File | Purpose |
|------|---------|
| `lib/auth.ts` | Lucia instance + session helpers |
| `lib/arctic.ts` | Google OAuth Arctic client |
| `app/api/auth/google/route.ts` | Google OAuth initiation |
| `app/api/auth/google/callback/route.ts` | Google OAuth callback |
| `app/api/auth/signout/route.ts` | Sign out handler |
| `app/(auth)/forgot-password/page.tsx` | Forgot password page |
| `app/(auth)/reset-password/page.tsx` | Reset password page |
| `app/verify-email/route.ts` | Email verification handler |
| `emails/verify-email.tsx` | Resend email template |
| `emails/reset-password.tsx` | Resend email template |

---

## 6. Dependencies

### Add
```
lucia
arctic
@lucia-auth/adapter-prisma  (or oslo for session generation)
argon2
```

### Remove
```
@clerk/nextjs
svix
```

---

## 7. Environment Variables

### Remove
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```

### Add
```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
AUTH_SECRET          # used for any HMAC signing if needed
```

---

## 8. Out of Scope

- Admin auth panel (already uses separate password-based auth, unchanged)
- Stripe billing logic (unchanged)
- Workspace/invite logic beyond auth integration points
- 2FA / magic links (not requested)
