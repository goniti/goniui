'use client'

import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

/** `<thead>` — semantic header section for the table. */
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={cn('border-b border-border bg-surface-2', className)}
        {...props}
      />
    )
  }
)
