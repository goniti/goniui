'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { flexRender, type Row } from '@tanstack/react-table'
import { GripVertical } from 'lucide-react'

import { Icon } from '@/atoms/Icon'
import { cn } from '@/lib/cn'
import * as Table from '@/molecules/Table'

export interface DataTableDraggableRowProps<TData> {
  row: Row<TData>
  enableColumnResizing: boolean
  /** Accessible name for the drag handle — supplied by the app (§10). */
  dragLabel?: string
}

/** A body row with a leading grip handle that reorders it via `@dnd-kit` sortable. */
export function DataTableDraggableRow<TData>({
  row,
  enableColumnResizing,
  dragLabel,
}: DataTableDraggableRowProps<TData>) {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id: row.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Table.Row
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && 'relative z-10 bg-surface shadow-sm')}
    >
      <Table.Cell className="w-8 pr-0">
        <button
          type="button"
          aria-label={dragLabel}
          className="cursor-grab touch-none text-foreground-muted hover:text-foreground active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <Icon icon={GripVertical} size="sm" className="max-w-none" />
        </button>
      </Table.Cell>
      {row.getVisibleCells().map((cell) => (
        <Table.Cell
          key={cell.id}
          style={enableColumnResizing ? { width: cell.column.getSize() } : undefined}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Cell>
      ))}
    </Table.Row>
  )
}
