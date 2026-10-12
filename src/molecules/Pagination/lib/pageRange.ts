/**
 * Returns the sequence of page numbers (and 'ellipsis' sentinels) to render.
 * Always includes page 1 and `total`; shows `delta` pages either side of `current`.
 *
 * Example — total=10, current=5, delta=2 → [1, 'ellipsis', 3, 4, 5, 6, 7, 'ellipsis', 10]
 */
export function pageRange(current: number, total: number, delta = 2): Array<number | 'ellipsis'> {
  if (total <= 1) return []
  if (total <= 2 * delta + 5) return Array.from({ length: total }, (_, index) => index + 1)

  const near = new Set<number>([1, total])
  for (let offset = -delta; offset <= delta; offset++) {
    const page = current + offset
    if (page >= 1 && page <= total) near.add(page)
  }

  const sorted = Array.from(near).sort((a, b) => a - b)
  const result: Array<number | 'ellipsis'> = []

  for (let index = 0; index < sorted.length; index++) {
    result.push(sorted[index])
    if (index < sorted.length - 1 && sorted[index + 1] - sorted[index] > 1) {
      result.push('ellipsis')
    }
  }

  return result
}
