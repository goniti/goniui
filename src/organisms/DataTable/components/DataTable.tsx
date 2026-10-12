'use client'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { type ColumnDef, type FilterFn, flexRender, type Header } from '@tanstack/react-table'
import { type ReactNode, useMemo } from 'react'

import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import { Skeleton } from '@/atoms/Skeleton'
import { cn } from '@/lib/cn'
import * as Table from '@/molecules/Table'

import { useDataTable } from '../hooks/useDataTable'
import { useDndAccessibilityContainer } from '../hooks/useDndAccessibilityContainer'
import { reorderByIds } from '../lib/reorder'
import { createSelectionColumn } from '../lib/selectionColumn'
import { DataTableDraggableRow } from './DataTableDraggableRow'
import { DataTableHeaderCell } from './DataTableHeaderCell'
import { DataTablePageSizeSelect } from './DataTablePageSizeSelect'
import { DataTablePagination, type DataTablePaginationLabels } from './DataTablePagination'
import { DataTableSearch } from './DataTableSearch'
import { DataTableSortableHeaderCell } from './DataTableSortableHeaderCell'
import { DataTableViewOptions } from './DataTableViewOptions'

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  /** Per-column sorting affordance. Default `true`. */
  enableSorting?: boolean
  /** Toolbar search filtering across all columns. Default `true`. */
  enableGlobalFilter?: boolean
  /** Delay before the global search filter is applied to the row model. Default `300`. */
  searchDebounceMs?: number
  /**
   * Overrides TanStack's default substring matching — the extension point for
   * app-specific needs (e.g. fuzzy search) without `ui-react` taking on that
   * dependency itself (ADR-006, "Recherche globale"). Unset = TanStack's default.
   */
  globalFilterFn?: FilterFn<TData>
  /** Per-column filter trigger next to the sort icon (opens a popover input). Default `false`. */
  enableColumnFilters?: boolean
  /** Toolbar menu to show/hide columns. Default `false`. */
  enableColumnVisibility?: boolean
  /** Drag-to-resize column handles. Default `false`. */
  enableColumnResizing?: boolean
  /** Drag-and-drop column reordering via header grips. Default `false`. */
  enableColumnReordering?: boolean
  /** Drag-and-drop row reordering. Requires `getRowId` + `onReorder`. Default `false`. */
  enableRowReordering?: boolean
  /** Leading checkbox column for row selection. Default `false`. */
  enableRowSelection?: boolean
  /** Client-side pagination. Default `false`. */
  enablePagination?: boolean
  /** Rows per page when pagination is enabled. Default `10`. */
  pageSize?: number
  /** Dropdown to change rows-per-page, next to the pagination controls. Default `false`. */
  enablePageSizeSelector?: boolean
  /** Selectable page sizes. Default `[10, 20, 50]` — the current `pageSize` is added if missing. */
  pageSizeOptions?: number[]
  /** Accessible name prefix for the page-size trigger — supplied by the app (§10). */
  pageSizeLabel?: string
  /** Stable row identity — required for row reordering. */
  getRowId?: (row: TData, index: number) => string
  /** Called with the reordered data after a row drag. */
  onReorder?: (data: TData[]) => void
  /** Replaces the body with placeholder rows while data loads. Default `false`. */
  isLoading?: boolean
  /** Number of skeleton rows shown while loading. Default `5`. */
  skeletonRowCount?: number
  /** Pins the header while the body scrolls. Pair with `maxHeight`. Default `false`. */
  stickyHeader?: boolean
  /** Caps the scroll container height (px or CSS length) — enables vertical scroll. */
  maxHeight?: number | string
  /** Search placeholder — supplied by the app (§10). */
  searchPlaceholder?: string
  /** Accessible name for the search field when no placeholder is given. */
  searchLabel?: string
  /** Accessible name for the column-visibility trigger. */
  columnsLabel?: string
  /** Accessible name for the column resize handles. */
  resizeLabel?: string
  /** Accessible name for the column reorder grips. */
  columnDragLabel?: string
  /** Accessible name for the row drag handles. */
  rowDragLabel?: string
  /** Accessible name for the header "select all" checkbox. */
  selectAllLabel?: string
  /** Accessible name for a row's selection checkbox. */
  selectRowLabel?: string
  /** Accessible names for the pagination controls. */
  paginationLabels?: DataTablePaginationLabels
  /** Row padding scale, forwarded to `Table.Root`. */
  size?: 'sm' | 'md'
  /** Shown in a full-width row when there are no rows to display. */
  emptyState?: ReactNode
}

/**
 * Generic, domain-agnostic data table: TanStack Table drives the headless state
 * (sorting, filtering, column visibility/sizing/order, selection, pagination)
 * and `@dnd-kit` drives row + column reordering, all rendered through the
 * presentational `Table.*` primitives. Apps pass `columns` + `data` and never
 * touch TanStack or dnd-kit directly (ADR-006).
 */
export function DataTable<TData>({
  columns,
  data,
  enableSorting = true,
  enableGlobalFilter = true,
  searchDebounceMs,
  globalFilterFn,
  enableColumnFilters = false,
  enableColumnVisibility = false,
  enableColumnResizing = false,
  enableColumnReordering = false,
  enableRowReordering = false,
  enableRowSelection = false,
  enablePagination = false,
  pageSize = 10,
  enablePageSizeSelector = false,
  pageSizeOptions,
  pageSizeLabel,
  getRowId,
  onReorder,
  isLoading = false,
  skeletonRowCount = 5,
  stickyHeader = false,
  maxHeight,
  searchPlaceholder,
  searchLabel,
  columnsLabel,
  resizeLabel,
  columnDragLabel,
  rowDragLabel,
  selectAllLabel,
  selectRowLabel,
  paginationLabels,
  size,
  emptyState,
}: DataTableProps<TData>) {
  const resolvedColumns = useMemo(
    () =>
      enableRowSelection
        ? [
            createSelectionColumn<TData>({ selectAll: selectAllLabel, selectRow: selectRowLabel }),
            ...columns,
          ]
        : columns,
    [enableRowSelection, columns, selectAllLabel, selectRowLabel]
  )

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data,
    columns: resolvedColumns,
    enableSorting,
    enableGlobalFilter,
    globalFilterDebounceMs: searchDebounceMs,
    globalFilterFn,
    enableColumnFilters,
    enableColumnResizing,
    enableRowSelection,
    enablePagination,
    pageSize,
    getRowId,
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Keeps @dnd-kit's hidden nodes out of the <table> (#783).
  const accessibilityContainer = useDndAccessibilityContainer()
  const dndAccessibility = accessibilityContainer
    ? { container: accessibilityContainer }
    : undefined

  const rows = table.getRowModel().rows
  const rowIds = rows.map((row) => row.id)
  const visibleColumns = table.getVisibleLeafColumns()
  const showEmptyState = !isLoading && rows.length === 0 && emptyState != null
  const showToolbar = enableGlobalFilter || enableColumnVisibility
  const leadingColumnCount = enableRowReordering ? 1 : 0
  const totalColumnCount = visibleColumns.length + leadingColumnCount

  function handleRowDragEnd({ active, over }: DragEndEvent) {
    if (!over || !onReorder) return
    const resolveId = getRowId ?? ((_, index) => String(index))
    onReorder(reorderByIds(data, String(active.id), String(over.id), resolveId))
  }

  function handleColumnDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return
    table.setColumnOrder((previousOrder) => {
      const currentOrder = previousOrder.length
        ? previousOrder
        : table.getAllLeafColumns().map((column) => column.id)
      return reorderByIds(currentOrder, String(active.id), String(over.id), (id) => id)
    })
  }

  function renderHeaderCell(header: Header<TData, unknown>) {
    return enableColumnReordering ? (
      <DataTableSortableHeaderCell
        key={header.id}
        header={header}
        enableColumnResizing={enableColumnResizing}
        resizeLabel={resizeLabel}
        enableColumnFilters={enableColumnFilters}
        dragLabel={columnDragLabel}
      />
    ) : (
      <DataTableHeaderCell
        key={header.id}
        header={header}
        enableColumnResizing={enableColumnResizing}
        resizeLabel={resizeLabel}
        enableColumnFilters={enableColumnFilters}
      />
    )
  }

  const header = (
    <Table.Header className={cn(stickyHeader && 'sticky top-0 z-10')}>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id}>
          {enableRowReordering ? <Table.Head aria-hidden className="w-8" /> : null}
          {enableColumnReordering ? (
            <SortableContext
              items={headerGroup.headers.map((headerColumn) => headerColumn.column.id)}
              strategy={horizontalListSortingStrategy}
            >
              {headerGroup.headers.map(renderHeaderCell)}
            </SortableContext>
          ) : (
            headerGroup.headers.map(renderHeaderCell)
          )}
        </Table.Row>
      ))}
    </Table.Header>
  )

  const body = (
    <Table.Body>
      {isLoading ? (
        Array.from({ length: skeletonRowCount }, (_, rowIndex) => (
          <Table.Row key={`skeleton-${rowIndex}`}>
            {enableRowReordering ? <Table.Cell className="w-8" /> : null}
            {visibleColumns.map((column) => (
              <Table.Cell key={column.id}>
                <Skeleton variant="text" className="h-4 w-full" />
              </Table.Cell>
            ))}
          </Table.Row>
        ))
      ) : showEmptyState ? (
        <Table.Row>
          <Table.Cell colSpan={totalColumnCount} className="py-8 text-center text-foreground-muted">
            {emptyState}
          </Table.Cell>
        </Table.Row>
      ) : enableRowReordering ? (
        <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
          {rows.map((row) => (
            <DataTableDraggableRow
              key={row.id}
              row={row}
              enableColumnResizing={enableColumnResizing}
              dragLabel={rowDragLabel}
            />
          ))}
        </SortableContext>
      ) : (
        rows.map((row) => (
          <Table.Row key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                key={cell.id}
                style={enableColumnResizing ? { width: cell.column.getSize() } : undefined}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))
      )}
    </Table.Body>
  )

  return (
    <Flex direction="col" gap="md">
      {showToolbar ? (
        <Flex align="center" justify={enableGlobalFilter ? 'between' : 'end'} gap="md" wrap="wrap">
          {enableGlobalFilter ? (
            <DataTableSearch
              value={globalFilter}
              onValueChange={setGlobalFilter}
              placeholder={searchPlaceholder}
              label={searchLabel}
            />
          ) : null}
          {enableColumnVisibility ? (
            <DataTableViewOptions table={table} label={columnsLabel} />
          ) : null}
        </Flex>
      ) : null}

      <Box
        className={cn('overflow-x-auto', maxHeight != null && 'overflow-y-auto')}
        style={maxHeight != null ? { maxHeight } : undefined}
      >
        <Table.Root
          size={size}
          style={enableColumnResizing ? { width: table.getTotalSize() } : undefined}
        >
          {enableColumnReordering ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToHorizontalAxis]}
              onDragEnd={handleColumnDragEnd}
              accessibility={dndAccessibility}
            >
              {header}
            </DndContext>
          ) : (
            header
          )}

          {enableRowReordering ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleRowDragEnd}
              accessibility={dndAccessibility}
            >
              {body}
            </DndContext>
          ) : (
            body
          )}
        </Table.Root>
      </Box>

      {enablePagination ? (
        <Flex align="center" justify="center" gap="lg" wrap="wrap">
          <DataTablePagination table={table} labels={paginationLabels} />
          {enablePageSizeSelector ? (
            <DataTablePageSizeSelect
              table={table}
              options={pageSizeOptions}
              label={pageSizeLabel}
            />
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  )
}
