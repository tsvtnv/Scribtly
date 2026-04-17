import { PipelineStage, Platform, ContentItem } from '@/types/pipeline'

export const STAGE_CONFIG: Record<PipelineStage, {
  label: string
  bg: string
  text: string
  darkBg: string
  darkText: string
}> = {
  IDEA:      { label: 'Idea',      bg: '#F1EFE8', text: '#444441', darkBg: '#2C2C2A', darkText: '#D3D1C7' },
  SCRIPTING: { label: 'Scripting', bg: '#EEEDFE', text: '#3C3489', darkBg: '#26215C', darkText: '#CECBF6' },
  REVIEW:    { label: 'Review',    bg: '#FAEEDA', text: '#633806', darkBg: '#412402', darkText: '#FAC775' },
  APPROVED:  { label: 'Approved',  bg: '#E6F1FB', text: '#0C447C', darkBg: '#042C53', darkText: '#B5D4F4' },
  SCHEDULED: { label: 'Scheduled', bg: '#E1F5EE', text: '#085041', darkBg: '#04342C', darkText: '#9FE1CB' },
  PUBLISHED: { label: 'Published', bg: '#FAECE7', text: '#4A1B0C', darkBg: '#4A1B0C', darkText: '#F5C4B3' },
}

export const PLATFORM_CONFIG: Record<Platform, {
  label: string
  bg: string
  text: string
}> = {
  YOUTUBE:  { label: 'YouTube',  bg: '#FAECE7', text: '#4A1B0C' },
  TIKTOK:   { label: 'TikTok',   bg: '#F1EFE8', text: '#2C2C2A' },
  REELS:    { label: 'Reels',    bg: '#FBEAF0', text: '#4B1528' },
  LINKEDIN: { label: 'LinkedIn', bg: '#E6F1FB', text: '#042C53' },
  PODCAST:  { label: 'Podcast',  bg: '#EEEDFE', text: '#26215C' },
}

export const STAGE_ORDER: PipelineStage[] = [
  'IDEA', 'SCRIPTING', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED'
]

export function groupByStage(items: ContentItem[]): Record<PipelineStage, ContentItem[]> {
  const grouped: Record<PipelineStage, ContentItem[]> = {
    IDEA: [], SCRIPTING: [], REVIEW: [], APPROVED: [], SCHEDULED: [], PUBLISHED: []
  }
  for (const item of items) {
    grouped[item.stage].push(item)
  }
  for (const stage of STAGE_ORDER) {
    grouped[stage].sort((a, b) => a.position - b.position)
  }
  return grouped
}

export function nextStage(stage: PipelineStage): PipelineStage | null {
  const idx = STAGE_ORDER.indexOf(stage)
  return idx < STAGE_ORDER.length - 1 ? STAGE_ORDER[idx + 1] : null
}
