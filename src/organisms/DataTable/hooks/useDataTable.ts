'use client'

import '../lib/columnMeta'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnSizingState,
  type FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Table,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { useState } from 'react'

import { useDebouncedValue } from './useDebouncedValue'

const DEFAULT_GLOBAL_FILTER_DEBOUNCE_MS = 300

export interface UseDataTableOptions<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  enableSorting: boolean
  enableGlobalFilter: boolean
  enableColumnFilters: boolean
  enableColumnResizing: boolean
  enableRowSelection: boolean
  enablePagination: boolean
  pageSize: number
  /** Stable row identity — required for row drag-and-drop to track rows across reorders. */
  getRowId?: (row: TData, index: number) => string
  /** Delay before the global search filter is applied to the row model. Default `300`. */
  globalFilterDebounceMs?: number
  /**
   * Overrides TanStack's default substring matching (e.g. to plug in fuzzy search
   * from the consuming app). Left unset, no extra dependency is pulled into
   * `ui-react` — YAGNI until a screen actually needs it (ADR-006, "Recherche globale").
   */
  globalFilterFn?: FilterFn<TData>
}

export interface UseDataTableResult<TData> {
  table: Table<TData>
  globalFilter: string
  setGlobalFilter: (value: string) => void
}

/**
 * Wraps TanStack's `useReactTable` with the row models the table needs and owns
 * the headless UI state (sorting, filters, column visibility/sizing/order, row
 * selection, pagination). This is the only place that touches
 * `@tanstack/react-table` — the organism re-exports what apps need, so nothing
 * outside `DataTable` imports the library (ADR-006, §5).
 *
 * `enableSortingRemoval: true` (TanStack's default) cycles a header through
 * none → asc → desc → none, so a third click drops back to the data's
 * original (unsorted) order rather than getting stuck toggling asc/desc.
 */
export function useDataTable<TData>({
  data,
  columns,
  enableSorting,
  enableGlobalFilter,
  enableColumnFilters,
  enableColumnResizing,
  enableRowSelection,
  enablePagination,
  pageSize,
  getRowId,
  globalFilterDebounceMs = DEFAULT_GLOBAL_FILTER_DEBOUNCE_MS,
  globalFilterFn,
}: UseDataTableOptions<TData>): UseDataTableResult<TData> {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const debouncedGlobalFilter = useDebouncedValue(globalFilter, globalFilterDebounceMs)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [columnOrder, setColumnOrder] = useState<string[]>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize })

  const isFilterable = enableGlobalFilter || enableColumnFilters

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      globalFilter: debouncedGlobalFilter,
      columnFilters,
      columnVisibility,
      columnSizing,
      columnOrder,
      rowSelection,
      pagination,
    },
    enableSorting,
    enableSortingRemoval: true,
    enableColumnFilters,
    enableColumnResizing,
    enableRowSelection,
    columnResizeMode: 'onChange',
    ...(globalFilterFn ? { globalFilterFn } : {}),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: isFilterable ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
  })

  return { table, globalFilter, setGlobalFilter }
}
