'use client'

import type { useSortable } from '@dnd-kit/sortable'
import { flexRender, type Header } from '@tanstack/react-table'
import { GripVertical } from 'lucide-react'
import type { CSSProperties } from 'react'

import { Icon } from '@/atoms/Icon'
import { cn } from '@/lib/cn'
import * as Table from '@/molecules/Table'

import { DataTableColumnFilter } from './DataTableColumnFilter'
import { DataTableResizeHandle } from './DataTableResizeHandle'

type SortableHandle = ReturnType<typeof useSortable>

/** Drag wiring passed by the sortable wrapper when column reordering is enabled. */
export interface HeaderCellDnd {
  ref: SortableHandle['setNodeRef']
  style: CSSProperties
  attributes: SortableHandle['attributes']
  listeners: SortableHandle['listeners']
  isDragging: boolean
  /** Accessible name for the reorder grip — supplied by the app (§10). */
  dragLabel?: string
}

export interface DataTableHeaderCellProps<TData> {
  header: Header<TData, unknown>
  enableColumnResizing: boolean
  /** Accessible name for the resize handle — supplied by the app (§10). */
  resizeLabel?: string
  /** Shows the per-column filter trigger next to the sort icon. Default `false`. */
  enableColumnFilters?: boolean
  dnd?: HeaderCellDnd
}

/** A header `<th>` wiring the column's sort affordance, optional filter trigger, reorder grip and resize handle. */
export function DataTableHeaderCell<TData>({
  header,
  enableColumnResizing,
  resizeLabel,
  enableColumnFilters = false,
  dnd,
}: DataTableHeaderCellProps<TData>) {
  const canSort = header.column.getCanSort()
  const sorted = header.column.getIsSorted()
  const canResize = enableColumnResizing && header.column.getCanResize()
  const canFilter = enableColumnFilters && header.column.getCanFilter()

  return (
    <Table.Head
      ref={dnd?.ref}
      sortable={canSort}
      sortDirection={sorted === false ? undefined : sorted}
      onSort={canSort ? () => header.column.toggleSorting() : undefined}
      style={{ ...dnd?.style, ...(enableColumnResizing ? { width: header.getSize() } : null) }}
      className={cn((canResize || dnd) && 'relative', dnd?.isDragging && 'z-10 bg-surface-2')}
    >
      {dnd ? (
        <button
          type="button"
          aria-label={dnd.dragLabel}
          className="cursor-grab touch-none text-foreground-muted hover:text-foreground active:cursor-grabbing"
          {...dnd.attributes}
          {...dnd.listeners}
        >
          <Icon icon={GripVertical} size="sm" className="max-w-none" />
        </button>
      ) : null}
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      {canFilter ? <DataTableColumnFilter column={header.column} /> : null}
      {canResize ? <DataTableResizeHandle header={header} label={resizeLabel} /> : null}
    </Table.Head>
  )
}
