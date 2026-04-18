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
