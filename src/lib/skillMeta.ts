import type { SkillTag } from '../data/roadmap'

type BadgeColor = 'slate' | 'blue' | 'green' | 'amber' | 'violet' | 'rose'

export const SKILL_META: Record<SkillTag, { label: string; color: BadgeColor; emoji: string }> = {
  reading: { label: 'ریدینگ', color: 'blue', emoji: '📖' },
  listening: { label: 'لیسنینگ', color: 'violet', emoji: '🎧' },
  speaking: { label: 'اسپیکینگ', color: 'rose', emoji: '🗣️' },
  writing: { label: 'رایتینگ', color: 'amber', emoji: '✍️' },
  vocab: { label: 'واژگان', color: 'green', emoji: '📝' },
  grammar: { label: 'گرامر', color: 'green', emoji: '🔤' },
  mock: { label: 'آزمون', color: 'rose', emoji: '🎯' },
  review: { label: 'مرور', color: 'slate', emoji: '🔁' },
  rest: { label: 'استراحت', color: 'slate', emoji: '☕' },
}
