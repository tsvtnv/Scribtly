'use client'

import { useState } from 'react'
import type { Script, Client } from '@prisma/client'
import { ScriptCard, type ScriptWithPipeline } from './ScriptCard'
import { AddToPipelineModal } from '@/components/pipeline/AddToPipelineModal'
import type { ContentItem } from '@/types/pipeline'

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

  function handleAdded(item: ContentItem) {
    if (!selectedScript) return
    setLocalScripts(prev =>
      prev.map(s => s.id === selectedScript.id
        ? { ...s, contentItem: { id: item.id, stage: item.stage } }
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
        <AddToPipelineModal
          script={selectedScript}
          clients={clients}
          isOpen={!!selectedScript}
          onClose={() => setSelectedScript(null)}
          onAdded={handleAdded}
        />
      )}
    </>
  )
}
