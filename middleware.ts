import { NextRequest, NextResponse } from "next/server";

const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

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
      maxAge: REF_COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
