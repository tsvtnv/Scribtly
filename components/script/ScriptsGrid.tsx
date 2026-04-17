'use client'

import { useState } from 'react'
import { ScriptCard, type ScriptWithPipeline } from './ScriptCard'

interface Client2 {
  id: string
  name: string
  avatarColor: string
}

interface ScriptsGridProps {
  scripts: ScriptWithPipeline[]
  clients: Client2[]
}

export function ScriptsGrid({ scripts, clients }: ScriptsGridProps) {
  const [selectedScript, setSelectedScript] = useState<ScriptWithPipeline | null>(null)
  const [localScripts, setLocalScripts] = useState(scripts)

  function handleAdded() {
    if (!selectedScript) return
    setLocalScripts(prev =>
      prev.map(s => s.id === selectedScript.id
        ? { ...s, contentItem: { id: 'optimistic', stage: 'SCRIPTING' } }
        : s
      )
    )
    setSelectedScript(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {localScripts.map(s => (
          <ScriptCard
            key={s.id}
            script={s}
            onAddToPipeline={setSelectedScript}
          />
        ))}
      </div>

      {selectedScript && (
        <AddToPipelineModalPlaceholder
          scriptTitle={selectedScript.title}
          onClose={() => setSelectedScript(null)}
        />
      )}
    </>
  )
}

// Temporary placeholder until AddToPipelineModal is built in Task 5
function AddToPipelineModalPlaceholder({ scriptTitle, onClose }: { scriptTitle: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <p className="text-sm text-text-primary mb-4">Add &ldquo;<strong>{scriptTitle}</strong>&rdquo; to pipeline</p>
        <p className="text-xs text-text-secondary mb-4">(Modal coming in next task)</p>
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary">Close</button>
      </div>
    </div>
  )
}
