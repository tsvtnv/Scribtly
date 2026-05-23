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
