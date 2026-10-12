'use client'

import { tv } from 'tailwind-variants'

import { Text } from '@/atoms/Text'

import { useCalendar, type UseCalendarOptions } from '../hooks/useCalendar'
import { CalendarHeader } from './CalendarHeader'
import { type CalendarDayInteraction, CalendarMonthGrid, type DayShape } from './CalendarMonthGrid'

const calendarVariants = tv({
  base: 'w-fit rounded-xl border border-border bg-surface p-3 shadow-sm',
})

export interface CalendarRootProps extends UseCalendarOptions {
  /** Hide month navigation — used for secondary month in Agenda. */
  showNavigation?: boolean
  dayInteraction?: CalendarDayInteraction
  className?: string
  /**
   * Accessible label for the calendar widget (e.g. "Choose a date").
   * Passed in for i18n — never hardcoded.
   */
  ariaLabel?: string
  /** Accessible label for the "previous month" nav button. */
  prevMonthLabel?: string
  /** Accessible label for the "next month" nav button. */
  nextMonthLabel?: string
  /** Force-disable the prev arrow (e.g. it would collide with an adjacent calendar). */
  disablePrev?: boolean
  /** Force-disable the next arrow (e.g. it would collide with an adjacent calendar). */
  disableNext?: boolean
  /** Day-cell shape: `soft` (rounded, default) or `round` (circle + half-circle range ends). */
  dayShape?: DayShape
}

/**
 * Standalone calendar month-grid widget with keyboard navigation.
 *
 * Logic lives in `useCalendar`; rendering in `CalendarMonthGrid` (@internal).
 * Swap the grid or hook adapter without changing consumer imports.
 *
 * ```tsx
 * import * as Calendar from 'goniui/calendar'
 * <Calendar.Root value={date} onChange={setDate} locale="en-GB" ariaLabel="Pick a date" />
 * ```
 */
export function CalendarRoot({
  className,
  ariaLabel = 'Choose a date',
  prevMonthLabel = 'Previous month',
  nextMonthLabel = 'Next month',
  showNavigation = true,
  dayInteraction,
  disablePrev = false,
  disableNext = false,
  dayShape = 'soft',
  ...calendarOptions
}: CalendarRootProps) {
  const {
    weeks,
    monthLabel,
    weekdayLabels,
    value,
    focusedDate,
    setFocusedDate,
    prevMonth,
    nextMonth,
    isPrevMonthDisabled,
    isNextMonthDisabled,
    selectDate,
    moveFocus,
  } = useCalendar(calendarOptions)

  return (
    <div className={calendarVariants({ className })}>
      {showNavigation ? (
        <CalendarHeader
          label={monthLabel}
          prevLabel={prevMonthLabel}
          nextLabel={nextMonthLabel}
          onPrev={prevMonth}
          onNext={nextMonth}
          prevDisabled={isPrevMonthDisabled || disablePrev}
          nextDisabled={isNextMonthDisabled || disableNext}
        />
      ) : (
        <Text
          as="span"
          variant="label"
          className="block px-1 pb-3 text-center font-semibold capitalize"
        >
          {monthLabel}
        </Text>
      )}
      <CalendarMonthGrid
        weeks={weeks}
        weekdayLabels={weekdayLabels}
        ariaLabel={ariaLabel}
        value={value}
        focusedDate={focusedDate}
        setFocusedDate={setFocusedDate}
        selectDate={selectDate}
        moveFocus={moveFocus}
        dayInteraction={dayInteraction}
        dayShape={dayShape}
      />
    </div>
  )
}

export { type CalendarDay, useCalendar, type UseCalendarOptions } from '../hooks/useCalendar'
