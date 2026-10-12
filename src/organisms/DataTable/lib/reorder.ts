'use client'

import { arrayMove } from '@dnd-kit/sortable'

/**
 * Returns `data` with the item identified by `activeId` moved to the position of
 * `overId`. Returns the original array unchanged when either id is unknown or the
 * positions are equal. Keeps the drag-end handler a one-liner and unit-testable
 * without simulating pointer/keyboard drag.
 */
export function reorderByIds<TData>(
  data: TData[],
  activeId: string,
  overId: string,
  resolveId: (row: TData, index: number) => string
): TData[] {
  const ids = data.map((row, index) => resolveId(row, index))
  const oldIndex = ids.indexOf(activeId)
  const newIndex = ids.indexOf(overId)
  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return data
  return arrayMove(data, oldIndex, newIndex)
}
