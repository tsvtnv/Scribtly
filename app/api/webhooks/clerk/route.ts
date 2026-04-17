import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";
import { addDays } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET not set");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const body = await req.text();
  const headers = {
    "svix-id": req.headers.get("svix-id") || "",
    "svix-timestamp": req.headers.get("svix-timestamp") || "",
    "svix-signature": req.headers.get("svix-signature") || "",
  };

  let evt: { type: string; data: any };
  try {
    evt = new Webhook(secret).verify(body, headers) as any;
  } catch (err) {
    console.error("Clerk webhook verification failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  try {
    if (evt.type === "user.created") {
      const data = evt.data;
      const clerkId: string = data.id;
      const email: string =
        data.email_addresses?.find((e: any) => e.id === data.primary_email_address_id)?.email_address ||
        data.email_addresses?.[0]?.email_address;
      if (!email) return NextResponse.json({ received: true });

      const existing = await prisma.user.findUnique({ where: { clerkId } });
      if (existing) return NextResponse.json({ received: true });

      const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

      await prisma.$transaction(async (tx) => {
        const invite = await tx.invite.findFirst({
          where: { email, acceptedAt: null, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: "desc" },
        });

        const user = await tx.user.create({ data: { clerkId, email, name } });

        if (invite) {
          await tx.workspaceMember.create({
            data: { workspaceId: invite.workspaceId, userId: user.id, role: "MEMBER" },
          });
          await tx.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
          await tx.user.update({
            where: { id: user.id },
            data: { defaultWorkspaceId: invite.workspaceId },
          });
        } else {
          const wsName = `${data.first_name || email.split("@")[0]}'s workspace`;
          const ws = await tx.workspace.create({
            data: { name: wsName, ownerId: user.id, scriptCountResetAt: addDays(new Date(), 30) },
          });
          await tx.workspaceMember.create({
            data: { workspaceId: ws.id, userId: user.id, role: "OWNER" },
          });
          await tx.user.update({ where: { id: user.id }, data: { defaultWorkspaceId: ws.id } });
        }
      });

      void (async () => {
        try {
          const { sendWelcome } = await import("@/lib/sendEmail");
          await sendWelcome({ to: email, name: name || undefined });
        } catch (err) {
          console.error("Welcome email failed", err);
        }
      })();
    }
  } catch (err) {
    console.error("Clerk webhook handler error", err);
  }

  return NextResponse.json({ received: true });
}
