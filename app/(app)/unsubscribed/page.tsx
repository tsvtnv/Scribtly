export default function UnsubscribedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">You've been unsubscribed</h1>
        <p className="text-text-secondary dark:text-dark-muted text-sm">
          You won't receive any more onboarding emails from ScriptFast. Your account remains active.
        </p>
        <a href="/dashboard" className="text-primary text-sm hover:underline">
          Back to dashboard
        </a>
      </div>
    </div>
  );
}
