export default function PipelineLoading() {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
        <div>
          <div className="h-5 w-40 bg-[var(--color-border)] rounded animate-pulse" />
          <div className="h-3 w-24 bg-[var(--color-border)] rounded animate-pulse mt-1.5" />
        </div>
      </div>
      <div className="flex gap-3 px-4 py-3 border-b border-[var(--color-border)]">
        {[1,2,3].map(i => (
          <div key={i} className="h-6 w-16 bg-[var(--color-border)] rounded-full animate-pulse" />
        ))}
      </div>
      <div className="flex gap-3 p-4 overflow-x-auto">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="flex-shrink-0 w-[220px] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
            <div className="h-7 bg-[var(--color-border)] rounded animate-pulse mb-2" />
            {[1,2].map(j => (
              <div key={j} className="h-24 bg-[var(--color-border)] rounded-lg animate-pulse mb-2" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
