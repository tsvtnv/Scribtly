'use client'

import { Platform } from '@/types/pipeline'
import { PLATFORM_CONFIG, PLATFORMS_TUPLE } from '@/lib/pipeline'
import { cn } from '@/lib/utils'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface PipelineFiltersProps {
  clients: Client[]
  selectedClient: string | null
  selectedPlatform: Platform | null
  onClientChange: (id: string | null) => void
  onPlatformChange: (p: Platform | null) => void
  totalItems: number
  onImportScripts?: () => void
  showImport?: boolean
}

export function PipelineFilters({
  clients, selectedClient, selectedPlatform,
  onClientChange, onPlatformChange, totalItems,
  onImportScripts, showImport,
}: PipelineFiltersProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3 flex-wrap border-b border-[var(--color-border)]">
      <span className="text-xs text-text-secondary dark:text-dark-muted mr-1">
        {totalItems} item{totalItems !== 1 ? 's' : ''}
      </span>

      <button
        onClick={() => onClientChange(null)}
        className={cn(
          'text-xs px-2.5 py-1 rounded-full border transition-colors',
          !selectedClient
            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
            : 'border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-primary-tint)]'
        )}
      >
        All clients
      </button>
      {clients.map(c => (
        <button
          key={c.id}
          onClick={() => onClientChange(selectedClient === c.id ? null : c.id)}
          className={cn(
            'text-xs px-2.5 py-1 rounded-full border transition-colors',
            selectedClient === c.id
              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
              : 'border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-primary-tint)]'
          )}
        >
          {c.name}
        </button>
      ))}

      <div className="w-px h-4 bg-[var(--color-border)] mx-1" />

      <button
        onClick={() => onPlatformChange(null)}
        className={cn(
          'text-xs px-2.5 py-1 rounded-full border transition-colors',
          !selectedPlatform
            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
            : 'border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-primary-tint)]'
        )}
      >
        All platforms
      </button>
      {PLATFORMS_TUPLE.map(p => (
        <button
          key={p}
          onClick={() => onPlatformChange(selectedPlatform === p ? null : p as Platform)}
          className="text-xs px-2.5 py-1 rounded-full border transition-colors"
          style={selectedPlatform === p
            ? { backgroundColor: PLATFORM_CONFIG[p as Platform].bg, color: PLATFORM_CONFIG[p as Platform].text, borderColor: PLATFORM_CONFIG[p as Platform].text }
            : { borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }
          }
        >
          {PLATFORM_CONFIG[p as Platform].label}
        </button>
      ))}

      {showImport && onImportScripts && (
        <button
          type="button"
          onClick={onImportScripts}
          className="text-xs px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-text-secondary hover:bg-[var(--color-bg)] transition-colors"
        >
          Import scripts
        </button>
      )}
    </div>
  )
}
