import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublic = createRouteMatcher([
  "/",
  "/pricing",
  "/youtube-scripts",
  "/tiktok-scripts",
  "/login(.*)",
  "/signup(.*)",
  "/api/stripe/webhook",
  "/api/webhooks/clerk",
  "/invite/(.*)",
  "/review/(.*)",
  "/api/review/(.*)",
  "/unsubscribed",
  "/api/user/unsubscribe",
  "/admin(.*)",
  "/api/admin/(.*)",
  "/onboarding",
  "/ref/(.*)",
  "/api/track",
  "/api/ref/(.*)",
  "/api/webhooks/resend-outreach",
]);

const REF_PATTERN = /^\/ref\/([^/]+)/;

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;
  const refMatch = pathname.match(REF_PATTERN);

  if (refMatch) {
    const leadId = refMatch[1];
    const res = NextResponse.next();
    res.cookies.set("ref_lead_id", leadId, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return res;
  }

  if (!isPublic(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
