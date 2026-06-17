import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).optional(),
  workspaceName: z.string().min(1).optional(),
  allowDuplicateLeads: z.boolean().optional(),
  skipLowIcpLeads: z.boolean().optional(),
});

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [userRecord, workspace] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.workspace.findUnique({ where: { id: user.workspaceId } }),
  ]);
  return NextResponse.json({ user: userRecord, workspace });
}

export async function PATCH(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, workspaceName, allowDuplicateLeads, skipLowIcpLeads } = parsed.data;

  await Promise.all([
    name ? prisma.user.update({ where: { id: user.id }, data: { name } }) : Promise.resolve(),
    (workspaceName !== undefined || allowDuplicateLeads !== undefined || skipLowIcpLeads !== undefined)
      ? prisma.workspace.update({
          where: { id: user.workspaceId },
          data: { name: workspaceName, allowDuplicateLeads, skipLowIcpLeads },
        })
      : Promise.resolve(),
  ]);

  return NextResponse.json({ success: true });
}
