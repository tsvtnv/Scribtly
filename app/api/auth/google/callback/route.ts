import { NextRequest, NextResponse } from "next/server";
import { google } from "@/lib/arctic";
import { decodeIdToken } from "arctic";
import { prisma } from "@/lib/prisma";
import { lucia, setSessionCookie } from "@/lib/auth";
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

    const redirectTo = isNewUser ? "/onboarding" : "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_APP_URL!));
  } catch (err) {
    console.error("Google OAuth callback error", err);
    return NextResponse.redirect(
      new URL("/login?error=google_failed", process.env.NEXT_PUBLIC_APP_URL!)
    );
  }
}
