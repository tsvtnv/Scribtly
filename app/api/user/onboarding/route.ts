// app/api/user/onboarding/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { errorResponse } from "@/lib/errors";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { workspace } = await ensureUser();

    // Side effect: advance to step 3 if scripts page visited and step 2 already done
    if (workspace.onboardingStep < 3 && workspace.firstScriptGeneratedAt !== null) {
      await prisma.workspace.update({
        where: { id: workspace.id },
        data: { onboardingStep: Math.max(workspace.onboardingStep, 3) },
      });
    }

    const checklist = [
      { id: 1, key: "add_client", completed: workspace.firstClientAddedAt !== null },
      { id: 2, key: "generate_script", completed: workspace.firstScriptGeneratedAt !== null },
      { id: 3, key: "explore_library", completed: workspace.onboardingStep >= 3 },
      { id: 4, key: "invite_or_upgrade", completed: workspace.plan !== "FREE" },
    ];

    return NextResponse.json({
      onboardingStep: workspace.onboardingStep,
      onboardingCompleted: workspace.onboardingCompleted,
      firstScriptGeneratedAt: workspace.firstScriptGeneratedAt,
      firstClientAddedAt: workspace.firstClientAddedAt,
      checklist,
    });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { workspace } = await ensureUser();
    const body = await req.json();

    const allowed = [
      "onboardingStep",
      "onboardingCompleted",
      "firstClientAddedAt",
      "firstScriptGeneratedAt",
    ] as const;

    const data: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) data[key] = body[key];
    }

    // onboardingStep: only allow advancing, never going back
    if ("onboardingStep" in data && typeof data.onboardingStep === "number") {
      data.onboardingStep = Math.max(workspace.onboardingStep, data.onboardingStep as number);
    }

    await prisma.workspace.update({ where: { id: workspace.id }, data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
