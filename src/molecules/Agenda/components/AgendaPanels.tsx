'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { tv } from 'tailwind-variants'

import { Flex } from '@/atoms/layout/Flex'
import { resolveTemporalBounds, type TemporalFacet } from '@/lib/resolveTemporalBounds'
import type { DayShape } from '@/molecules/Calendar/components/CalendarMonthGrid'
import { CalendarRoot } from '@/molecules/Calendar/components/CalendarRoot'

import { useAgendaViewMonth } from '../hooks/useAgendaViewMonth'
import { type DateRangeValue, useDateRange } from '../hooks/useDateRange'
import { useDragEdgeScroll } from '../hooks/useDragEdgeScroll'
import { useRangeDragSession } from '../hooks/useRangeDragSession'

const agendaVariants = tv({
  base: 'w-fit rounded-xl border border-border bg-surface p-3 shadow-sm',
  variants: {
    embedded: {
      true: 'w-full rounded-none border-0 bg-transparent p-0 shadow-none',
      false: '',
    },
  },
  defaultVariants: { embedded: false },
})

export interface AgendaPanelsProps {
  start?: Date | null
  end?: Date | null
  defaultStart?: Date | null
  defaultEnd?: Date | null
  onRangeChange?: (range: DateRangeValue) => void
  temporal?: TemporalFacet
  locale?: string
  min?: Date
  max?: Date
  ariaLabel?: string
  prevMonthLabel?: string
  nextMonthLabel?: string
  className?: string
  enableDrag?: boolean
  embedded?: boolean
  /** Bumped when the calendar popover opens — re-anchors the visible months. */
  viewResetKey?: number
  /** Day-cell shape forwarded to both month grids: `soft` (default) or `round`. */
  dayShape?: DayShape
}

/**
 * Inline two-month range grid — building block for `Date.Agenda.Content`.
 * The two calendars navigate independently: shifting one (header arrow or
 * drag-to-edge) never moves the other.
 */
export function AgendaPanels({
  start,
  end,
  defaultStart,
  defaultEnd,
  onRangeChange,
  temporal,
  locale = 'en-US',
  min,
  max,
  ariaLabel = 'Choose a date range',
  prevMonthLabel = 'Previous month',
  nextMonthLabel = 'Next month',
  className,
  enableDrag = true,
  embedded = false,
  viewResetKey = 0,
  dayShape = 'soft',
}: AgendaPanelsProps) {
  const bounds = resolveTemporalBounds(temporal, { min, max })
  const { displayStart, displayEnd, selectDate, beginDrag, updateDrag, endDrag, isDragging } =
    useDateRange({ start, end, defaultStart, defaultEnd, onRangeChange })

  const { leftMonth, rightMonth, shiftLeft, shiftRight, goLeft, goRight } = useAgendaViewMonth({
    start: displayStart,
    end: displayEnd,
    min: bounds.min,
    max: bounds.max,
    resetKey: viewResetKey,
  })

  const gridRef = useRef<HTMLDivElement>(null)

  const { onDayMouseDown, onDayMouseEnter } = useRangeDragSession({
    enabled: enableDrag,
    beginDrag,
    updateDrag,
    endDrag,
  })

  const edgeDirection = useDragEdgeScroll({
    enabled: isDragging,
    gridRef,
    onShift: (delta) => (delta < 0 ? shiftLeft(-1) : shiftRight(1)),
  })

  const dayInteraction = enableDrag ? { onDayMouseDown, onDayMouseEnter } : undefined

  // Keep the two calendars from showing the same month: block the left's forward
  // arrow (and the right's back arrow) once they sit on adjacent months.
  const leftMonthIndex = leftMonth.getFullYear() * 12 + leftMonth.getMonth()
  const rightMonthIndex = rightMonth.getFullYear() * 12 + rightMonth.getMonth()
  const leftNextDisabled = leftMonthIndex + 1 >= rightMonthIndex
  const rightPrevDisabled = rightMonthIndex - 1 <= leftMonthIndex

  // Only the temporal facet bounds days — the second pick may land before the
  // start; `useDateRange` orders the range, so earlier days stay selectable.
  const sharedCalendarProps = {
    ariaLabel,
    locale,
    min: bounds.min,
    max: bounds.max,
    value: null,
    rangeStart: displayStart,
    rangeEnd: displayEnd,
    onChange: selectDate,
    prevMonthLabel,
    nextMonthLabel,
    dayInteraction,
    dayShape,
  }

  return (
    <div className={agendaVariants({ embedded, className })}>
      <div ref={gridRef} className="relative flex gap-3">
        <DragEdgeOverlay side="left" active={edgeDirection === 'prev'} />
        <DragEdgeOverlay side="right" active={edgeDirection === 'next'} />
        <CalendarRoot
          {...sharedCalendarProps}
          displayMonth={leftMonth}
          onDisplayMonthChange={goLeft}
          disableNext={leftNextDisabled}
        />
        <CalendarRoot
          {...sharedCalendarProps}
          displayMonth={rightMonth}
          onDisplayMonthChange={goRight}
          disablePrev={rightPrevDisabled}
        />
      </div>
    </div>
  )
}

const edgeOverlayVariants = tv({
  base: [
    'pointer-events-none absolute inset-y-0 z-20 w-9',
    'bg-primary-400/[0.06] backdrop-blur-[1px] transition-opacity duration-150',
  ],
  variants: {
    side: { left: 'left-0', right: 'right-0' },
    active: { true: 'opacity-100', false: 'opacity-0' },
  },
})

interface DragEdgeOverlayProps {
  side: 'left' | 'right'
  active: boolean
}

function DragEdgeOverlay({ side, active }: DragEdgeOverlayProps) {
  const Arrow = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <Flex
      aria-hidden
      align="center"
      justify="center"
      className={edgeOverlayVariants({ side, active })}
    >
      <Arrow className="h-5 w-5 text-primary-700" />
    </Flex>
  )
}
