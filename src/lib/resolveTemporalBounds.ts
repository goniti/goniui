export type TemporalFacet = 'past' | 'present' | 'future'

/** Midnight local time for today — shared bound for temporal facets. */
export function startOfToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export interface TemporalBoundsOverrides {
  min?: Date
  max?: Date
}

/**
 * Maps a temporal facet to default `min`/`max` bounds.
 * Explicit overrides win over facet defaults; `present` applies overrides only.
 */
export function resolveTemporalBounds(
  temporal: TemporalFacet | undefined,
  overrides: TemporalBoundsOverrides = {}
): { min?: Date; max?: Date } {
  if (temporal === undefined || temporal === 'present') {
    return { min: overrides.min, max: overrides.max }
  }

  const today = startOfToday()

  if (temporal === 'past') {
    return { min: overrides.min, max: overrides.max ?? today }
  }

  return { min: overrides.min ?? today, max: overrides.max }
}
