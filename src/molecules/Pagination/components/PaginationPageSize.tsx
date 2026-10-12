'use client'

import { ChevronDown } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import * as DropdownMenu from '@/molecules/DropdownMenu'

export interface PaginationPageSizeProps {
  /** Currently selected page size. */
  value: number
  /** Selectable page sizes. */
  options: readonly number[]
  /** Called with the chosen page size. */
  onValueChange: (size: number) => void
  /** Accessible name prefix for the trigger (e.g. "Items per page") — supplied by the app. */
  label: string
  className?: string
}

/**
 * Page-size dropdown. Standalone — it does not read the `Pagination.Root`
 * context, so it can sit outside the root (e.g. when there is a single page
 * and the page controls are hidden).
 */
export function PaginationPageSize({
  value,
  options,
  onValueChange,
  label,
  className,
}: PaginationPageSizeProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className={className}
          aria-label={`${label} : ${value}`}
        >
          {value}
          <Icon icon={ChevronDown} size="sm" className="max-w-none" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.RadioGroup
          value={String(value)}
          onValueChange={(selected) => onValueChange(Number(selected))}
        >
          {options.map((option) => (
            <DropdownMenu.RadioItem key={option} value={String(option)}>
              {option}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
