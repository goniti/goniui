import { Text, type TextProps } from '../Text'

/** Size presets, mapped onto the underlying `<Text>` variant. */
export type WordmarkSize = 'sm' | 'md' | 'lg'

const SIZE_VARIANTS: Record<WordmarkSize, TextProps['variant']> = {
  sm: 'body',
  md: 'h3',
  lg: 'h2',
}

export interface WordmarkProps {
  /** First segment, rendered in the neutral foreground tone. */
  lead: string
  /** Second segment, rendered in the accent tone. */
  accent: string
  /** Maps onto the underlying `<Text>` variant. Defaults to `'md'`. */
  size?: WordmarkSize
  className?: string
}

/**
 * Generic two-tone wordmark primitive — two text segments, one neutral and one
 * accented. Domain-agnostic: the brand text comes in via `lead`/`accent`, never
 * hardcoded here; the app supplies the actual brand (e.g. `lead="Word"
 * accent="mark"`).
 */
export function Wordmark({ lead, accent, size = 'md', className }: WordmarkProps) {
  return (
    <Text variant={SIZE_VARIANTS[size]} as="span" className={className}>
      <span className="text-foreground">{lead}</span>
      {/* Muted second tone: readable in both themes, re-skinned with the tokens. */}
      <span className="text-foreground-muted">{accent}</span>
    </Text>
  )
}
