'use client'

import type { Column } from '@tanstack/react-table'

import { Input } from '@/atoms/Input'

export interface DataTableColumnFilterTextProps<TData> {
  column: Column<TData, unknown>
}

/** Free-text filter body — the default `filterVariant`. */
export function DataTableColumnFilterText<TData>({
  column,
}: DataTableColumnFilterTextProps<TData>) {
  const rawValue = column.getFilterValue()
  const value = typeof rawValue === 'string' ? rawValue : ''
  const { filterPlaceholder, filterLabel } = column.columnDef.meta ?? {}

  return (
    <Input
      type="text"
      value={value}
      onChange={(event) => column.setFilterValue(event.target.value)}
      placeholder={filterPlaceholder}
      aria-label={filterLabel ?? filterPlaceholder}
    />
  )
}
