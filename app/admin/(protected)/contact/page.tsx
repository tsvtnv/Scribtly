import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { Mail, Building2, Hash } from "lucide-react";

export default async function AdminContactPage() {
  await requireAdmin();

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Enterprise enquiries</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
          <p className="text-sm text-text-secondary">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-semibold text-sm">{s.name}</div>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-xs text-[var(--color-primary)] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Mail size={11} />
                    {s.email}
                  </a>
                </div>
                <div className="text-xs text-text-secondary shrink-0">
                  {new Date(s.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-text-secondary mb-3">
                {s.company && (
                  <span className="flex items-center gap-1">
                    <Building2 size={11} />
                    {s.company}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Hash size={11} />
                  {s.scriptsNeeded.toLocaleString()} scripts/month
                </span>
              </div>

              {s.message && (
                <p className="text-sm text-text-secondary whitespace-pre-wrap border-t border-[var(--color-border)] pt-3">
                  {s.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
