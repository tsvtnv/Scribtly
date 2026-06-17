import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import type { Session, User } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "scribtly_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" ? ".scribtly.com" : undefined,
      sameSite: "lax",
    },
  },
  getUserAttributes(attributes) {
    return {
      email: attributes.email,
      name: attributes.name,
      avatarUrl: attributes.avatarUrl,
      workspaceId: attributes.workspaceId,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      name: string | null;
      avatarUrl: string | null;
      workspaceId: string;
    };
  }
}

export async function validateRequest(): Promise<
  { user: User; session: Session } | { user: null; session: null }
> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const blankCookie = lucia.createBlankSessionCookie();
      cookieStore.set(blankCookie.name, blankCookie.value, blankCookie.attributes);
    }
  } catch {
    // cookies() may throw in some RSC contexts
  }

  return result;
}
