export default function Loading() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 bg-[var(--color-surface)] rounded-md" />
        <div className="h-4 w-1/2 bg-[var(--color-surface)] rounded-md" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="h-24 bg-[var(--color-surface)] rounded-lg" />
          <div className="h-24 bg-[var(--color-surface)] rounded-lg" />
          <div className="h-24 bg-[var(--color-surface)] rounded-lg" />
        </div>
      </div>
    </div>
  );
}
