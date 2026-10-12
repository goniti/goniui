'use client'

import { Search } from 'lucide-react'

import { Icon } from '@/atoms/Icon'
import { Input } from '@/atoms/Input'

export interface DataTableSearchProps {
  value: string
  onValueChange: (value: string) => void
  /** Placeholder copy — supplied by the app (no business copy lives in the lib, §10). */
  placeholder?: string
  /** Accessible name when no placeholder describes the field. */
  label?: string
}

/** Global-filter input for the table toolbar. Renders the search affordance via the `Input` atom. */
export function DataTableSearch({
  value,
  onValueChange,
  placeholder,
  label,
}: DataTableSearchProps) {
  return (
    <Input
      type="search"
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      placeholder={placeholder}
      aria-label={label ?? placeholder}
      startIcon={<Icon icon={Search} size="sm" />}
      className="max-w-xs"
    />
  )
}
