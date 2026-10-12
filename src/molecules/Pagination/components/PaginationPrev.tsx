'use client'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'

import { usePaginationContext } from '../PaginationContext'
import { pageButtonVariants } from './pageButtonVariants'

export interface PaginationPrevProps {
  /** Overrides the accessible label from `Pagination.Root`. */
  label?: string
  className?: string
}

/** Previous-page control — disabled on the first page. */
export function PaginationPrev({ label, className }: PaginationPrevProps) {
  const { page, onPageChange, prevLabel } = usePaginationContext()
  return (
    <Button
      variant="ghost"
      size="none"
      aria-label={label ?? prevLabel}
      disabled={page <= 1}
      onClick={() => onPageChange(page - 1)}
      className={pageButtonVariants({ active: false, className })}
    >
      <Icon icon={ChevronLeft} size="sm" />
    </Button>
  )
}
