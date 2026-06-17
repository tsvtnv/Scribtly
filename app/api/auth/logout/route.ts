import { NextResponse } from "next/server";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  const { session } = await validateRequest();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await lucia.invalidateSession(session.id);
  const blankCookie = lucia.createBlankSessionCookie();
  const cookieStore = await cookies();
  cookieStore.set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  return NextResponse.json({ success: true });
}
