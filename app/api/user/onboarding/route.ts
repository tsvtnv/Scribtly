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
    let currentStep = workspace.onboardingStep;
    if (currentStep < 3 && workspace.firstScriptGeneratedAt !== null) {
      await prisma.workspace.update({
        where: { id: workspace.id },
        data: { onboardingStep: Math.max(currentStep, 3) },
      });
      currentStep = 3;
    }

    const checklist = [
      { id: 1, key: "add_client", completed: workspace.firstClientAddedAt !== null },
      { id: 2, key: "generate_script", completed: workspace.firstScriptGeneratedAt !== null },
      { id: 3, key: "explore_library", completed: currentStep >= 3 },
      { id: 4, key: "invite_or_upgrade", completed: workspace.plan !== "FREE" },
    ];

    return NextResponse.json({
      onboardingStep: currentStep,
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

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const b = body as Record<string, unknown>;
    const data: {
      onboardingStep?: number;
      onboardingCompleted?: boolean;
      firstClientAddedAt?: Date | null;
      firstScriptGeneratedAt?: Date | null;
    } = {};

    if ("onboardingStep" in b) {
      if (typeof b.onboardingStep !== "number") {
        return NextResponse.json({ error: "onboardingStep must be a number" }, { status: 400 });
      }
      data.onboardingStep = Math.max(workspace.onboardingStep, b.onboardingStep);
    }
    if ("onboardingCompleted" in b) {
      if (typeof b.onboardingCompleted !== "boolean") {
        return NextResponse.json({ error: "onboardingCompleted must be a boolean" }, { status: 400 });
      }
      data.onboardingCompleted = b.onboardingCompleted;
    }
    if ("firstClientAddedAt" in b) {
      data.firstClientAddedAt = b.firstClientAddedAt ? new Date(b.firstClientAddedAt as string) : null;
    }
    if ("firstScriptGeneratedAt" in b) {
      data.firstScriptGeneratedAt = b.firstScriptGeneratedAt ? new Date(b.firstScriptGeneratedAt as string) : null;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ ok: true });
    }

    await prisma.workspace.update({ where: { id: workspace.id }, data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
