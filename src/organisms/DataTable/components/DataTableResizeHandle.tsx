'use client'

import type { Header } from '@tanstack/react-table'

import { cn } from '@/lib/cn'

export interface DataTableResizeHandleProps<TData> {
  header: Header<TData, unknown>
  /** Accessible name for the handle — supplied by the app (§10). */
  label?: string
}

/**
 * Drag-to-resize affordance pinned to the right edge of a header cell. Pointer
 * resizing only — keyboard resizing is out of scope for V1. `stopPropagation`
 * on click keeps a resize drag from also triggering the column's sort.
 */
export function DataTableResizeHandle<TData>({ header, label }: DataTableResizeHandleProps<TData>) {
  return (
    <button
      type="button"
      aria-label={label}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      onClick={(event) => event.stopPropagation()}
      className={cn(
        'absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none',
        'bg-border opacity-0 transition-opacity hover:opacity-100',
        header.column.getIsResizing() && 'bg-primary-400 opacity-100'
      )}
    />
  )
}
