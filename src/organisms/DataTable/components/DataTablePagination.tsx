'use client'

import type { Table } from '@tanstack/react-table'

import { Pagination } from '@/molecules/Pagination'

export interface DataTablePaginationLabels {
  prev?: string
  next?: string
  nav?: string
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>
  labels?: DataTablePaginationLabels
}

/** Wires TanStack's pagination state to the `Pagination` molecule (1-based pages). */
export function DataTablePagination<TData>({ table, labels }: DataTablePaginationProps<TData>) {
  return (
    <Pagination
      page={table.getState().pagination.pageIndex + 1}
      totalPages={table.getPageCount()}
      onPageChange={(page) => table.setPageIndex(page - 1)}
      prevLabel={labels?.prev}
      nextLabel={labels?.next}
      label={labels?.nav}
    />
  )
}
