import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "auth_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
  getUserAttributes(attrs) {
    return {
      email: attrs.email,
      name: attrs.name,
      emailVerified: attrs.emailVerified,
      avatarUrl: attrs.avatarUrl,
      defaultWorkspaceId: attrs.defaultWorkspaceId,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      name: string | null;
      emailVerified: boolean;
      avatarUrl: string | null;
      defaultWorkspaceId: string | null;
    };
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };
  const result = await lucia.validateSession(sessionId);
  return result;
}

export async function setSessionCookie(sessionId: string) {
  const cookie = lucia.createSessionCookie(sessionId);
  cookies().set(cookie.name, cookie.value, cookie.attributes);
}

export async function clearSessionCookie() {
  const cookie = lucia.createBlankSessionCookie();
  cookies().set(cookie.name, cookie.value, cookie.attributes);
}
