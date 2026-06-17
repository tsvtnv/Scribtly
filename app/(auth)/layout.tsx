export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "var(--bg-subtle)" }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>LinkedIn outreach that books meetings</p>
        </div>
        {children}
      </div>
      <footer className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
        Powered by <a href="https://octelis.com" className="underline">octelis.com</a>
      </footer>
    </div>
  );
}
