export type PipelineStage = 'IDEA' | 'SCRIPTING' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED'

export type Platform = 'YOUTUBE' | 'TIKTOK' | 'REELS' | 'LINKEDIN' | 'PODCAST'

export interface ContentItem {
  id: string
  workspaceId: string
  clientId: string
  scriptId?: string | null
  title: string
  platform: Platform
  stage: PipelineStage
  scheduledDate?: string | null
  publishedAt?: string | null
  notes?: string | null
  views?: number | null
  position: number
  createdAt: string
  updatedAt: string
  client: {
    id: string
    name: string
    avatarColor: string
  }
  script?: {
    id: string
    title: string
  } | null
}

export interface Column {
  id: PipelineStage
  label: string
  color: string
  textColor: string
  items: ContentItem[]
}

export interface ReorderUpdate {
  id: string
  stage: PipelineStage
  position: number
}
