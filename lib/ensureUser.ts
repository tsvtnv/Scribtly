import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";
import { addDays } from "@/lib/utils";
import type { User, Workspace, MemberRole } from "@prisma/client";

export interface AuthContext {
  user: User;
  workspace: Workspace;
  role: MemberRole;
}

export async function ensureUser(): Promise<AuthContext> {
  const { userId: clerkId } = auth();
  if (!clerkId) throw new UnauthorizedError();

  let user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    user = await upsertUserByClerk(clerkId);
  }

  let workspace: Workspace | null = null;
  let role: MemberRole = "OWNER";

  if (user.defaultWorkspaceId) {
    const membership = await prisma.workspaceMember.findFirst({
      where: { userId: user.id, workspaceId: user.defaultWorkspaceId },
      include: { workspace: true },
    });
    if (membership) {
      workspace = membership.workspace;
      role = membership.role;
    }
  }

  if (!workspace) {
    // Orphaned or no default — bootstrap a fresh personal workspace
    const bootstrap = await bootstrapPersonalWorkspace(user);
    workspace = bootstrap.workspace;
    role = bootstrap.role;
  }

  // Monthly script count reset (lazy)
  if (workspace.scriptCountResetAt < new Date()) {
    workspace = await prisma.workspace.update({
      where: { id: workspace.id },
      data: {
        scriptCount: 0,
        scriptCountResetAt: addDays(new Date(), 30),
      },
    });
  }

  return { user, workspace, role };
}

export async function upsertUserByClerk(clerkId: string): Promise<User> {
  // Idempotent — webhook may call this after lazy sync already ran
  const existing = await prisma.user.findUnique({ where: { clerkId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  if (!clerkUser) throw new UnauthorizedError("Clerk user not found");

  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
    clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) throw new UnauthorizedError("Clerk user missing email");

  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  const user = await prisma.$transaction(async (tx) => {
    // Check for pending invite
    const invite = await tx.invite.findFirst({
      where: {
        email,
        acceptedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    const newUser = await tx.user.create({
      data: { clerkId, email, name },
    });

    if (invite) {
      await tx.workspaceMember.create({
        data: { workspaceId: invite.workspaceId, userId: newUser.id, role: "MEMBER" },
      });
      await tx.invite.update({
        where: { id: invite.id },
        data: { acceptedAt: new Date() },
      });
      await tx.user.update({
        where: { id: newUser.id },
        data: { defaultWorkspaceId: invite.workspaceId },
      });
      return { ...newUser, defaultWorkspaceId: invite.workspaceId };
    }

    const wsName = `${clerkUser.firstName || email.split("@")[0]}'s workspace`;
    const workspace = await tx.workspace.create({
      data: {
        name: wsName,
        ownerId: newUser.id,
        scriptCountResetAt: addDays(new Date(), 30),
      },
    });
    await tx.workspaceMember.create({
      data: { workspaceId: workspace.id, userId: newUser.id, role: "OWNER" },
    });
    await tx.user.update({
      where: { id: newUser.id },
      data: { defaultWorkspaceId: workspace.id },
    });
    return { ...newUser, defaultWorkspaceId: workspace.id };
  });

  // Fire-and-forget welcome email
  void (async () => {
    try {
      const { sendWelcome } = await import("@/lib/sendEmail");
      await sendWelcome({ to: email, name: name || undefined });
    } catch (err) {
      console.error("Welcome email failed", err);
    }
  })();

  return user;
}

async function bootstrapPersonalWorkspace(user: User): Promise<{ workspace: Workspace; role: MemberRole }> {
  const email = user.email;
  const firstName = user.name?.split(" ")[0];
  const wsName = `${firstName || email.split("@")[0]}'s workspace`;

  const result = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name: wsName,
        ownerId: user.id,
        scriptCountResetAt: addDays(new Date(), 30),
      },
    });
    await tx.workspaceMember.create({
      data: { workspaceId: workspace.id, userId: user.id, role: "OWNER" },
    });
    await tx.user.update({
      where: { id: user.id },
      data: { defaultWorkspaceId: workspace.id },
    });
    return workspace;
  });

  return { workspace: result, role: "OWNER" };
}

export function requireOwner(role: MemberRole): void {
  if (role !== "OWNER") throw new ForbiddenError("Owner role required");
}
