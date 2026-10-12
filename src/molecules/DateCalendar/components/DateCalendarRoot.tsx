'use client'

import { type ReactNode, useMemo, useState } from 'react'

import type { TemporalFacet } from '@/lib/resolveTemporalBounds'
import { PopoverRoot } from '@/molecules/Popover/components/PopoverRoot'

import { DateCalendarContext } from '../DateCalendarContext'

export interface DateCalendarRootProps {
  children: ReactNode
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date) => void
  /**
   * Temporal facet — `past` caps at today, `future` floors at today, `present` is unconstrained.
   * Bounds merge with explicit `min`/`max` on `DateCalendar.Content`.
   */
  temporal?: TemporalFacet
  locale?: string
  placeholder?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

/** Root of `DateCalendar` — popover shell around the Calendar primitive. */
export function DateCalendarRoot({
  children,
  value: valueProp,
  defaultValue,
  onChange,
  temporal,
  locale = 'en-US',
  placeholder = 'Select a date',
  open,
  onOpenChange,
  defaultOpen,
}: DateCalendarRootProps) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
  const value = isControlled ? (valueProp ?? null) : internalValue

  const formattedValue = useMemo(
    () =>
      value != null ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(value) : '',
    [value, locale]
  )

  function handleSelect(date: Date) {
    if (!isControlled) setInternalValue(date)
    onChange?.(date)
  }

  return (
    <DateCalendarContext.Provider
      value={{ value, onSelect: handleSelect, locale, formattedValue, placeholder, temporal }}
    >
      <PopoverRoot open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
        {children}
      </PopoverRoot>
    </DateCalendarContext.Provider>
  )
}
