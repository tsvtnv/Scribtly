import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--border)" }}>
        <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Scribtly</span>
        <Link href="/login"
          className="text-sm font-medium px-4 py-2 rounded-lg"
          style={{ background: "var(--accent)", color: "#fff" }}>
          Sign in
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-24">
        <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight"
          style={{ color: "var(--text-primary)" }}>
          LinkedIn outreach that{" "}
          <span style={{ color: "var(--accent)" }}>books meetings</span>
        </h1>
        <p className="mt-6 text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
          Find your ideal customers on LinkedIn, send personalised connection requests at scale,
          and turn replies into booked calls — automatically.
        </p>
        <div className="mt-10">
          <a href="https://book.octelis.com"
            className="px-6 py-3 rounded-xl font-semibold text-white inline-block"
            style={{ background: "var(--accent)" }}>
            Book a call to get access
          </a>
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>Invite-only. No self-serve signup.</p>
      </main>

      <section className="px-6 py-16 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Smart Prospecting", body: "Describe your ideal customer in plain English. We find them on LinkedIn and score each lead against your ICP." },
            { title: "Personalised at scale", body: "Connection notes and follow-ups use real profile data — name, company, headline, city. No mail-merge feel." },
            { title: "Inbox that converts", body: "All replies in one place. Auto Book detects interest and sends your booking link automatically." },
          ].map(f => (
            <div key={f.title} className="rounded-xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-6 border-t text-center text-xs"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
        Powered by{" "}
        <a href="https://octelis.com" target="_blank" rel="noopener noreferrer"
          className="underline" style={{ color: "var(--accent)" }}>
          octelis.com
        </a>
      </footer>
    </div>
  );
}
