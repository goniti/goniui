'use client'

import { tv } from 'tailwind-variants'

import { resolveTemporalBounds } from '@/lib/resolveTemporalBounds'
import { CalendarRoot } from '@/molecules/Calendar/components/CalendarRoot'
import { PopoverContent } from '@/molecules/Popover/components/PopoverContent'
import { PopoverPortal } from '@/molecules/Popover/components/PopoverPortal'

import { useDateCalendarContext } from '../DateCalendarContext'

const popoverContentVariants = tv({
  base: [
    'z-[var(--z-popover)] animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ],
})

export interface DateCalendarContentProps {
  ariaLabel?: string
  prevMonthLabel?: string
  nextMonthLabel?: string
  min?: Date
  max?: Date
  className?: string
}

/** Popover panel — renders the Calendar primitive with temporal bounds applied. */
export function DateCalendarContent({
  ariaLabel,
  prevMonthLabel,
  nextMonthLabel,
  min,
  max,
  className,
}: DateCalendarContentProps) {
  const { value, onSelect, locale, temporal } = useDateCalendarContext()
  const bounds = resolveTemporalBounds(temporal, { min, max })

  return (
    <PopoverPortal>
      <PopoverContent
        align="start"
        sideOffset={6}
        aria-label={ariaLabel}
        className={popoverContentVariants()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <CalendarRoot
          value={value}
          onChange={onSelect}
          locale={locale}
          ariaLabel={ariaLabel}
          prevMonthLabel={prevMonthLabel}
          nextMonthLabel={nextMonthLabel}
          min={bounds.min}
          max={bounds.max}
          className={className}
        />
      </PopoverContent>
    </PopoverPortal>
  )
}
