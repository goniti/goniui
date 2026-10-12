'use client'

import { PaginationNext } from './PaginationNext'
import { PaginationPages } from './PaginationPages'
import { PaginationPrev } from './PaginationPrev'
import { PaginationRoot } from './PaginationRoot'

export interface PaginationProps {
  /** Current page (1-based). */
  page: number
  /** Total number of pages. */
  totalPages: number
  /** Called with the new page number when the user navigates. */
  onPageChange: (page: number) => void
  /** Accessible label for the "previous" button. */
  prevLabel?: string
  /** Accessible label for the "next" button. */
  nextLabel?: string
  /** Accessible label for the nav element. */
  label?: string
  className?: string
}

/**
 * Offset pagination preset (prev · numbered pages · next) composing the compound
 * parts. Renders nothing when `totalPages <= 1`. For custom layouts (simple
 * prev/next, a range summary…) compose `Pagination.Root` + parts directly.
 */
export function Pagination({ page, totalPages, onPageChange, ...labels }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <PaginationRoot page={page} totalPages={totalPages} onPageChange={onPageChange} {...labels}>
      <PaginationPrev />
      <PaginationPages />
      <PaginationNext />
    </PaginationRoot>
  )
}
