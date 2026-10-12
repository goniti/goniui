'use client'

import { ChevronRight } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'

import { usePaginationContext } from '../PaginationContext'
import { pageButtonVariants } from './pageButtonVariants'

export interface PaginationNextProps {
  /** Overrides the accessible label from `Pagination.Root`. */
  label?: string
  className?: string
}

/** Next-page control — disabled on the last page when `totalPages` is known. */
export function PaginationNext({ label, className }: PaginationNextProps) {
  const { page, totalPages, onPageChange, nextLabel } = usePaginationContext()
  return (
    <Button
      variant="ghost"
      size="none"
      aria-label={label ?? nextLabel}
      disabled={totalPages != null && page >= totalPages}
      onClick={() => onPageChange(page + 1)}
      className={pageButtonVariants({ active: false, className })}
    >
      <Icon icon={ChevronRight} size="sm" />
    </Button>
  )
}
