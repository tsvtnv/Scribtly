import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensureUser";
import { canExportPDF } from "@/lib/planLimits";
import { NotFoundError, UpgradeRequiredError, errorResponse } from "@/lib/errors";
import { ScriptPdfDocument } from "@/lib/pdf";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser();
    if (!canExportPDF(workspace)) {
      throw new UpgradeRequiredError("pdf_locked", "PDF export is a Pro feature");
    }

    const script = await prisma.script.findUnique({
      where: { id: params.id },
      include: { client: true },
    });
    if (!script || script.workspaceId !== workspace.id) throw new NotFoundError("Script not found");

    const buffer = await renderToBuffer(
      ScriptPdfDocument({ script, client: script.client, workspace })
    );

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slugify(script.title)}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
