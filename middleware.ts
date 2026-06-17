import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // connect.scribtly.com → /connect routes
  if (host.startsWith("connect.")) {
    if (!pathname.startsWith("/connect")) {
      return NextResponse.rewrite(new URL(`/connect${pathname}`, request.url));
    }
    return NextResponse.next();
  }

  // scribtly.com (no subdomain) → marketing
  if (!host.startsWith("app.") && !host.startsWith("connect.")) {
    return NextResponse.next();
  }

  // app.scribtly.com → protect all non-auth routes
  const publicPaths = ["/login", "/signup", "/api/auth"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  const sessionCookie = request.cookies.get("scribtly_session");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
