import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "auth_session";

const publicPaths = [
  "/",
  "/pricing",
  "/opengraph-image",
  "/apple-icon",
  "/youtube-scripts",
  "/tiktok-scripts",
  "/instagram-reels-scripts",
  "/ai-script-writer",
  "/for-freelancers",
  "/for-agencies",
  "/blog",
  "/privacy",
  "/terms",
  "/cookies",
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
  "/ref",
  "/api/track",
  "/api/ref",
  "/api/webhooks/resend-outreach",
  "/api/v1", // bearer-token auth handled per-route via verifyOutreachApiKey
];

function isPublic(pathname: string): boolean {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?")
  );
}

const REF_PATTERN = /^\/ref\/([a-zA-Z0-9_-]{1,64})$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Set ref_lead_id cookie when visiting /ref/[leadId]
  const refMatch = pathname.match(REF_PATTERN);
  if (refMatch) {
    const leadId = refMatch[1];
    const res = NextResponse.next();
    res.cookies.set("ref_lead_id", leadId, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  }

  if (isPublic(pathname)) return NextResponse.next();

  // Only check cookie presence — full session validation happens in ensureUser() (Node.js runtime)
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value ?? null;
  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
