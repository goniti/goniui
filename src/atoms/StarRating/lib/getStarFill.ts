export type StarFill = 'full' | 'half' | 'empty'

const HALF_STEP = 0.5

/** Read-only fill for one star: rounds `value` to the nearest half-star, then
 * reports how much of `starPosition` (1-based) that rounded value covers. */
export function getStarFill(value: number, starPosition: number): StarFill {
  const roundedValue = Math.round(value / HALF_STEP) * HALF_STEP
  const filledAmount = roundedValue - (starPosition - 1)
  if (filledAmount >= 1) return 'full'
  if (filledAmount >= HALF_STEP) return 'half'
  return 'empty'
}
