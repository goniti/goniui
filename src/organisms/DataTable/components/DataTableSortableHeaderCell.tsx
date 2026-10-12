'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Header } from '@tanstack/react-table'

import { DataTableHeaderCell } from './DataTableHeaderCell'

export interface DataTableSortableHeaderCellProps<TData> {
  header: Header<TData, unknown>
  enableColumnResizing: boolean
  resizeLabel?: string
  enableColumnFilters?: boolean
  /** Accessible name for the reorder grip — supplied by the app (§10). */
  dragLabel?: string
}

/** Header cell made draggable for column reordering via `@dnd-kit` sortable. */
export function DataTableSortableHeaderCell<TData>({
  header,
  enableColumnResizing,
  resizeLabel,
  enableColumnFilters,
  dragLabel,
}: DataTableSortableHeaderCellProps<TData>) {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id: header.column.id,
  })

  return (
    <DataTableHeaderCell
      header={header}
      enableColumnResizing={enableColumnResizing}
      resizeLabel={resizeLabel}
      enableColumnFilters={enableColumnFilters}
      dnd={{
        ref: setNodeRef,
        style: { transform: CSS.Translate.toString(transform), transition },
        attributes,
        listeners,
        isDragging,
        dragLabel,
      }}
    />
  )
}
