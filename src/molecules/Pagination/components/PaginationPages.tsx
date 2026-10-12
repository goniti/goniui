'use client'

import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'

import { pageRange } from '../lib/pageRange'
import { usePaginationContext } from '../PaginationContext'
import { pageButtonVariants } from './pageButtonVariants'

export interface PaginationPagesProps {
  /** Pages shown either side of the current page (see `pageRange`). */
  siblingCount?: number
  /** Accessible label for a numbered page button. */
  pageLabel?: (page: number) => string
}

/**
 * Numbered page buttons with ellipsis truncation. Renders nothing without a
 * known `totalPages` (offset pattern only).
 */
export function PaginationPages({
  siblingCount = 2,
  pageLabel = (page) => `Page ${page}`,
}: PaginationPagesProps) {
  const { page, totalPages, onPageChange } = usePaginationContext()
  if (totalPages == null) return null

  const items = pageRange(page, totalPages, siblingCount)
  let ellipsisCount = 0

  return (
    <>
      {items.map((item) => {
        if (item === 'ellipsis') {
          ellipsisCount += 1
          return (
            <span
              key={`ellipsis-${ellipsisCount}`}
              aria-hidden
              className="flex h-9 min-w-9 items-center justify-center"
            >
              <Icon icon={MoreHorizontal} size="sm" intent="muted" />
            </span>
          )
        }

        const isActive = item === page
        return (
          <Button
            key={item}
            variant="ghost"
            size="none"
            aria-label={pageLabel(item)}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange(item)}
            className={pageButtonVariants({ active: isActive })}
          >
            {item}
          </Button>
        )
      })}
    </>
  )
}
