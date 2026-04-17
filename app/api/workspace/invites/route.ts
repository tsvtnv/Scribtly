import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureUser, requireOwner } from "@/lib/ensureUser";
import { canInviteMembers, getMaxMembers } from "@/lib/planLimits";
import {
  UpgradeRequiredError,
  ValidationError,
  AppError,
  errorResponse,
} from "@/lib/errors";
import { randomToken, addDays } from "@/lib/utils";
import { sendInvite } from "@/lib/sendEmail";

export const runtime = "nodejs";

const bodySchema = z.object({ email: z.string().email().toLowerCase() });

export async function GET() {
  try {
    const { workspace, role } = await ensureUser();
    requireOwner(role);
    const invites = await prisma.invite.findMany({
      where: { workspaceId: workspace.id, acceptedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ invites });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, workspace, role } = await ensureUser();
    requireOwner(role);
    if (!canInviteMembers(workspace)) {
      throw new UpgradeRequiredError("team_locked", "Team invites require the Agency plan");
    }

    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError("Invalid email");
    const email = parsed.data.email;

    const [memberCount, pendingCount] = await Promise.all([
      prisma.workspaceMember.count({ where: { workspaceId: workspace.id } }),
      prisma.invite.count({
        where: { workspaceId: workspace.id, acceptedAt: null, expiresAt: { gt: new Date() } },
      }),
    ]);
    const maxMembers = getMaxMembers(workspace.plan);
    if (memberCount + pendingCount >= maxMembers) {
      throw new AppError("Seat cap reached", 400, "seat_cap_reached");
    }

    const token = randomToken(24);
    const expiresAt = addDays(new Date(), 7);

    const invite = await prisma.invite.upsert({
      where: { workspaceId_email: { workspaceId: workspace.id, email } },
      update: { token, expiresAt, acceptedAt: null, invitedById: user.id },
      create: {
        workspaceId: workspace.id,
        email,
        token,
        expiresAt,
        invitedById: user.id,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    void sendInvite({
      to: email,
      inviterName: user.name || user.email,
      workspaceName: workspace.name,
      acceptUrl: `${appUrl}/invite/${token}`,
    });

    return NextResponse.json({ invite }, { status: 201 });
  } catch (err) {
    return errorResponse(err);
  }
}
