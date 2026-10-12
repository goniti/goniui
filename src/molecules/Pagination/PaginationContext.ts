'use client'

import { createContext, useContext } from 'react'

export interface PaginationContextValue {
  /** Current page (1-based). */
  page: number
  /** Total number of pages — omitted for open-ended (cursor / unknown-total) navigation. */
  totalPages?: number
  /** Called with the new page number when the user navigates. */
  onPageChange: (page: number) => void
  prevLabel: string
  nextLabel: string
}

export const PaginationContext = createContext<PaginationContextValue | null>(null)

export function usePaginationContext(): PaginationContextValue {
  const context = useContext(PaginationContext)
  if (context === null) {
    throw new Error('Pagination.* must be used within <Pagination.Root>')
  }
  return context
}
