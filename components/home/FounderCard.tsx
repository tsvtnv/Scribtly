import Image from "next/image";

/* Compact quote — used on signup page and landing pages */
export function FounderNote() {
  return (
    <div className="flex items-start gap-3 rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <Image
        src="/founder.jpeg"
        alt="Kristiyan Tsvetanov — Founder of Scribtly"
        width={44}
        height={44}
        className="rounded-full object-cover shrink-0 ring-2 ring-primary/20"
      />
      <div className="min-w-0">
        <p className="text-xs leading-relaxed text-text-secondary dark:text-dark-muted">
          &ldquo;I built Scribtly because freelancers I know were spending hours on scripts that should take minutes.
          I reply to every support email personally — if something isn&apos;t working, just reach out.&rdquo;
        </p>
        <p className="mt-1.5 text-[11px] font-semibold text-[var(--color-text)]">
          Kristiyan Tsvetanov{" "}
          <span className="font-normal text-text-secondary dark:text-dark-muted">· Founder, Scribtly</span>
        </p>
      </div>
    </div>
  );
}

/* Full homepage section */
export function FounderSection() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-16">
      <div className="rounded-2xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start shadow-sm">
        <div className="shrink-0 flex flex-col items-center gap-3">
          <Image
            src="/founder.jpeg"
            alt="Kristiyan Tsvetanov — Founder of Scribtly"
            width={96}
            height={96}
            className="rounded-full object-cover ring-4 ring-primary/15 shadow-md"
          />
          <div className="text-center">
            <p className="text-sm font-semibold">Kristiyan Tsvetanov</p>
            <p className="text-xs text-text-secondary dark:text-dark-muted">Founder, Scribtly</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
            A note from the founder
          </p>
          <blockquote className="text-base leading-relaxed text-[var(--color-text)] mb-4">
            &ldquo;I built Scribtly because I watched freelancers waste hours on scripts that should take minutes.
            Every client re-brief, every blank page, every round of revisions that could have been avoided —
            I wanted to fix that at the source.
          </blockquote>
          <blockquote className="text-base leading-relaxed text-[var(--color-text)] mb-4">
            Scribtly is a solo project. I built it, I maintain it, and I read every support email personally.
            If something isn&apos;t working for you, tell me — I&apos;ll fix it.&rdquo;
          </blockquote>
          <a
            href="mailto:kristiyan@scribtly.com"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
          >
            kristiyan@scribtly.com
          </a>
        </div>
      </div>
    </section>
  );
}
