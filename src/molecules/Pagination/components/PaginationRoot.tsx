'use client'

import { type ReactNode, useMemo } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'

import { PaginationContext } from '../PaginationContext'

export interface PaginationRootProps {
  /** Current page (1-based). */
  page: number
  /** Total number of pages — omit for open-ended (cursor / unknown-total) navigation. */
  totalPages?: number
  /** Called with the new page number when the user navigates. */
  onPageChange: (page: number) => void
  /** Accessible label for the "previous" control. */
  prevLabel?: string
  /** Accessible label for the "next" control. */
  nextLabel?: string
  /** Accessible label for the `nav` landmark. */
  label?: string
  className?: string
  children: ReactNode
}

/**
 * Compound pagination shell — provides the page context and the `nav` landmark.
 * Compose `Pagination.Prev/Pages/Next/Info/LoadMore` inside it. It never hides
 * itself (a single-page guard belongs to the offset preset, not the primitive).
 */
export function PaginationRoot({
  page,
  totalPages,
  onPageChange,
  prevLabel = 'Previous page',
  nextLabel = 'Next page',
  label = 'Pagination',
  className,
  children,
}: PaginationRootProps) {
  const context = useMemo(
    () => ({ page, totalPages, onPageChange, prevLabel, nextLabel }),
    [page, totalPages, onPageChange, prevLabel, nextLabel]
  )

  return (
    <PaginationContext.Provider value={context}>
      <nav aria-label={label} className={cn('flex justify-center', className)}>
        <Flex align="center" gap="xs">
          {children}
        </Flex>
      </nav>
    </PaginationContext.Provider>
  )
}
