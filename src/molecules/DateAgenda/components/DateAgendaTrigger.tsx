'use client'

import { CalendarIcon, Plus } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'
import { resolveTemporalBounds } from '@/lib/resolveTemporalBounds'
import type { DateRangeValue } from '@/molecules/Agenda/hooks/useDateRange'
import {
  buildDayItems,
  buildMonthItems,
  buildYearItems,
  type DateBound,
  type DateField,
  earlierOf,
  getLocaleFieldOrder,
  getPartSeparator,
  laterOf,
  patchDateField,
  readDateField,
} from '@/molecules/Agenda/lib/dateSegmentPicker'
import { PopoverTrigger } from '@/molecules/Popover/components/PopoverTrigger'

import { useDateAgendaContext } from '../DateAgendaContext'
import { AgendaPicker, type AgendaPickerItem } from './AgendaPicker'

export interface DateAgendaTriggerProps {
  ariaLabel: string
  className?: string
  disabled?: boolean
  min?: Date
  max?: Date
  /** Confirm-button label inside the segment drum picker. */
  confirmLabel?: string
  /** Accessible label for the calendar toggle button. */
  openCalendarLabel?: string
  /** Accessible label for the "add end date" button. */
  addEndLabel?: string
}

interface ActiveSegment {
  bound: DateBound
  field: DateField
}

const segmentVariants = tv({
  base: 'rounded px-1 py-0.5 text-sm tabular-nums hover:bg-surface-2',
  variants: {
    active: { true: 'bg-primary-50 text-primary-700' },
    placeholder: { true: 'text-foreground-muted' },
  },
})

function segmentText(date: Date, field: DateField, locale: string): string {
  if (field === 'year') return String(date.getFullYear())
  if (field === 'month') return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
  return String(date.getDate()).padStart(2, '0')
}

function sameSegment(a: ActiveSegment | null, bound: DateBound, field: DateField): boolean {
  return a != null && a.bound === bound && a.field === field
}

export function DateAgendaTrigger({
  ariaLabel,
  className,
  disabled,
  min,
  max,
  confirmLabel = 'OK',
  openCalendarLabel = 'open calendar',
  addEndLabel = 'add end date',
}: DateAgendaTriggerProps) {
  const {
    open,
    draftStart,
    draftEnd,
    committedStart,
    committedEnd,
    setDraftRange,
    commitRange,
    locale,
    temporal,
    today,
  } = useDateAgendaContext()

  const effStart = open ? draftStart : committedStart
  const effEnd = open ? draftEnd : committedEnd
  const effStartTime = effStart?.getTime() ?? null
  const effEndTime = effEnd?.getTime() ?? null

  const [localStart, setLocalStart] = useState<Date | null>(effStart)
  const [localEnd, setLocalEnd] = useState<Date | null>(effEnd)
  const [active, setActive] = useState<ActiveSegment | null>(null)

  useEffect(() => {
    setLocalStart(effStart)
    setLocalEnd(effEnd)
    // Re-seed the working range from the source of truth (draft while open,
    // committed while closed) — not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [effStartTime, effEndTime, open])

  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (active == null) return
    function handlePointerDown(event: MouseEvent) {
      const target = event.target
      if (target instanceof Node && rootRef.current?.contains(target)) return
      setActive(null)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [active])

  const fieldOrder = useMemo(() => getLocaleFieldOrder(locale), [locale])
  const separator = useMemo(() => getPartSeparator(locale), [locale])
  const bounds = resolveTemporalBounds(temporal, { min, max })

  function editRange(next: DateRangeValue) {
    setLocalStart(next.start)
    setLocalEnd(next.end)
    if (open) setDraftRange(next)
    else commitRange(next)
  }

  function toggleSegment(bound: DateBound, field: DateField) {
    setActive((current) => (sameSegment(current, bound, field) ? null : { bound, field }))
  }

  function boundMin(bound: DateBound): Date | undefined {
    return bound === 'start'
      ? bounds.min
      : (laterOf(localStart ?? undefined, bounds.min) ?? undefined)
  }

  function boundMax(bound: DateBound): Date | undefined {
    return bound === 'end'
      ? bounds.max
      : (earlierOf(localEnd ?? undefined, bounds.max) ?? undefined)
  }

  function drumItems(bound: DateBound, field: DateField, base: Date): AgendaPickerItem[] {
    const lo = boundMin(bound)
    const hi = boundMax(bound)
    if (field === 'year') return buildYearItems(temporal, today, lo, hi)
    if (field === 'month')
      return buildMonthItems(locale, temporal, today, base.getFullYear(), lo, hi)
    return buildDayItems(temporal, today, base.getFullYear(), base.getMonth() + 1, lo, hi)
  }

  function handleSegmentChange(bound: DateBound, field: DateField, base: Date, rawValue: string) {
    const nextDate = patchDateField(base, field, rawValue)
    editRange(
      bound === 'start' ? { start: nextDate, end: localEnd } : { start: localStart, end: nextDate }
    )
  }

  function addEndDate() {
    const base = localStart ?? today
    editRange({ start: base, end: base })
  }

  function renderSegments(bound: DateBound, value: Date | null) {
    const base = value ?? today
    const hasValue = value != null

    return fieldOrder.map((field, index) => (
      <span key={`${bound}-${field}`} className="relative inline-flex items-center">
        {index > 0 ? <span className="px-0.5 text-foreground-muted">{separator}</span> : null}
        <Button
          variant="unstyled"
          size="none"
          aria-label={`${ariaLabel}, ${bound} ${field}`}
          disabled={disabled}
          onClick={() => toggleSegment(bound, field)}
          className={segmentVariants({
            active: sameSegment(active, bound, field),
            placeholder: !hasValue,
          })}
        >
          {segmentText(base, field, locale)}
        </Button>
        {sameSegment(active, bound, field) ? (
          <div className="absolute left-1/2 top-1/2 z-[var(--z-popover)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-1 shadow-lg">
            <AgendaPicker
              ariaLabel={`${bound} ${field}`}
              confirmLabel={confirmLabel}
              items={drumItems(bound, field, base)}
              value={readDateField(base, field)}
              onValueChange={(next) => handleSegmentChange(bound, field, base, next)}
              onConfirm={() => setActive(null)}
            />
          </div>
        ) : null}
      </span>
    ))
  }

  return (
    <div ref={rootRef} className={cn('relative w-fit', className)}>
      <Flex
        align="center"
        justify="between"
        gap="xs"
        className="rounded-lg border border-border bg-surface px-3 py-2"
      >
        <Flex align="center" gap="xs">
          <Flex align="center" gap="none">
            {renderSegments('start', localStart)}
          </Flex>
          <span className="px-1 text-foreground-muted">–</span>
          {localEnd != null ? (
            <Flex align="center" gap="none">
              {renderSegments('end', localEnd)}
            </Flex>
          ) : (
            <Button
              variant="unstyled"
              size="none"
              aria-label={`${ariaLabel}, ${addEndLabel}`}
              disabled={disabled}
              onClick={addEndDate}
              className="gap-1 rounded px-1 py-0.5 text-sm text-foreground-muted hover:bg-surface-2"
            >
              <Plus aria-hidden className="h-3.5 w-3.5" />
            </Button>
          )}
        </Flex>
        <PopoverTrigger asChild>
          <Button
            variant="unstyled"
            size="none"
            aria-label={`${ariaLabel}, ${openCalendarLabel}`}
            aria-haspopup="dialog"
            disabled={disabled}
            className="shrink-0 rounded p-1 text-foreground-muted hover:bg-surface-2 hover:text-foreground"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </Flex>
    </div>
  )
}
