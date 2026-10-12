import { describe, expect, it } from 'vitest'

import { reorderByIds } from '../lib/reorder'

interface Item {
  id: number
}

const items: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }]
const resolveId = (item: Item) => String(item.id)

describe('reorderByIds', () => {
  it('moves the active item to the position of the over item', () => {
    expect(reorderByIds(items, '1', '3', resolveId)).toEqual([{ id: 2 }, { id: 3 }, { id: 1 }])
  })

  it('moves an item upward', () => {
    expect(reorderByIds(items, '3', '1', resolveId)).toEqual([{ id: 3 }, { id: 1 }, { id: 2 }])
  })

  it('returns the original array when the ids are equal', () => {
    const result = reorderByIds(items, '2', '2', resolveId)
    expect(result).toBe(items)
  })

  it('returns the original array when an id is unknown', () => {
    expect(reorderByIds(items, '1', '99', resolveId)).toBe(items)
  })
})
