export function AppFooter() {
  return (
    <footer className="px-6 py-3 border-t text-xs text-right"
      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
      Powered by{" "}
      <a href="https://octelis.com" target="_blank" rel="noopener noreferrer"
        className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>
        octelis.com
      </a>
    </footer>
  );
}
