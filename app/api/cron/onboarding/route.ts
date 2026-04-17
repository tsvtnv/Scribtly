// app/api/cron/onboarding/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendWelcomeEmail,
  sendDay2NoScriptEmail,
  sendDay7FreeEmail,
  sendDay7BasicEmail,
  sendDay14ReengagementEmail,
} from "@/lib/emails/onboarding";

export const runtime = "nodejs";
export const maxDuration = 300;

function firstName(name: string | null | undefined, email: string): string {
  return name?.split(" ")[0] || email.split("@")[0];
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const h48 = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const d7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const d14 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  let welcomed = 0;
  let day2Sent = 0;
  let day7Sent = 0;
  let day14Sent = 0;
  const errors: string[] = [];

  let cursor: string | undefined;
  do {
    const batch = await prisma.workspace.findMany({
      where: { emailOptOut: false },
      include: { owner: true },
      take: 200,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { id: "asc" },
    });
    if (batch.length === 0) break;

    for (const ws of batch) {
    try {
      const email = ws.owner.email;
      const name = firstName(ws.owner.name, email);

      // Welcome email
      if (!ws.welcomeEmailSentAt) {
        await sendWelcomeEmail(ws.id, email, name);
        await prisma.workspace.update({
          where: { id: ws.id },
          data: { welcomeEmailSentAt: now },
        });
        welcomed++;
        continue; // one email per workspace per run
      }

      // Day-2 no-script
      if (
        ws.createdAt <= h48 &&
        !ws.firstScriptGeneratedAt &&
        !ws.day2EmailSentAt
      ) {
        await sendDay2NoScriptEmail(ws.id, email, name);
        await prisma.workspace.update({
          where: { id: ws.id },
          data: { day2EmailSentAt: now },
        });
        day2Sent++;
        continue;
      }

      // Day-7 nudge
      if (ws.createdAt <= d7 && !ws.day7EmailSentAt) {
        if (ws.plan === "FREE") {
          await sendDay7FreeEmail(ws.id, email, name);
          await prisma.workspace.update({
            where: { id: ws.id },
            data: { day7EmailSentAt: now },
          });
          day7Sent++;
        } else if (ws.plan === "BASIC") {
          await sendDay7BasicEmail(ws.id, email, name);
          await prisma.workspace.update({
            where: { id: ws.id },
            data: { day7EmailSentAt: now },
          });
          day7Sent++;
        }
        // PRO/AGENCY/ENTERPRISE: skip, but still set day7EmailSentAt so we don't re-check
        else {
          await prisma.workspace.update({
            where: { id: ws.id },
            data: { day7EmailSentAt: now },
          });
        }
        continue;
      }

      // Day-14 re-engagement
      if (
        ws.createdAt <= d14 &&
        ws.plan === "FREE" &&
        !ws.day14EmailSentAt
      ) {
        const scriptCount = await prisma.script.count({
          where: { workspaceId: ws.id },
        });
        const shouldSend = scriptCount < 3;
        if (shouldSend) {
          await sendDay14ReengagementEmail(ws.id, email, name);
          day14Sent++;
        }
        await prisma.workspace.update({
          where: { id: ws.id },
          data: { day14EmailSentAt: now },
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Onboarding cron failed for workspace ${ws.id}:`, msg);
      errors.push(`workspace:${ws.id} — ${msg}`);
    }
    } // end for (ws of batch)
    cursor = batch.at(-1)?.id;
  } while (true);

  return NextResponse.json({ welcomed, day2Sent, day7Sent, day14Sent, errors });
}
