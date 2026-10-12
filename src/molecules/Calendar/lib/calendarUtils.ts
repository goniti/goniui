export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function toMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function normalizeRangeBounds(
  rangeStart: Date | null | undefined,
  rangeEnd: Date | null | undefined
): { lo: Date | null; hi: Date | null } {
  if (rangeStart == null) return { lo: null, hi: null }
  const start = toMidnight(rangeStart)
  if (rangeEnd == null) return { lo: start, hi: start }
  const end = toMidnight(rangeEnd)
  return start <= end ? { lo: start, hi: end } : { lo: end, hi: start }
}
