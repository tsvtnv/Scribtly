import { getSession } from "@/lib/auth";
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
  const { user: sessionUser, session } = await getSession();
  if (!session || !sessionUser) throw new UnauthorizedError();

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) throw new UnauthorizedError();

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

export async function bootstrapPersonalWorkspace(
  user: User
): Promise<{ workspace: Workspace; role: MemberRole }> {
  const firstName = user.name?.split(" ")[0];
  const wsName = `${firstName || user.email.split("@")[0]}'s workspace`;

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
