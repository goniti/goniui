'use client'

import { type ReactNode, useCallback, useState } from 'react'

import { startOfToday, type TemporalFacet } from '@/lib/resolveTemporalBounds'
import type { DateRangeValue } from '@/molecules/Agenda/hooks/useDateRange'
import { PopoverRoot } from '@/molecules/Popover/components/PopoverRoot'

import { DateAgendaContext } from '../DateAgendaContext'

export interface DateAgendaRootProps {
  children: ReactNode
  start?: Date | null
  end?: Date | null
  defaultStart?: Date | null
  defaultEnd?: Date | null
  onRangeChange?: (range: DateRangeValue) => void
  temporal?: TemporalFacet
  locale?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

/** Popover shell for `DateAgenda` — draft range commits on Apply. */
export function DateAgendaRoot({
  children,
  start: startProp,
  end: endProp,
  defaultStart,
  defaultEnd,
  onRangeChange,
  temporal,
  locale = 'en-US',
  open: openProp,
  onOpenChange,
  defaultOpen,
}: DateAgendaRootProps) {
  const isStartControlled = startProp !== undefined
  const isEndControlled = endProp !== undefined
  const [internalStart, setInternalStart] = useState<Date | null>(defaultStart ?? null)
  const [internalEnd, setInternalEnd] = useState<Date | null>(defaultEnd ?? null)

  const committedStart = isStartControlled ? (startProp ?? null) : internalStart
  const committedEnd = isEndControlled ? (endProp ?? null) : internalEnd

  const today = startOfToday()
  const [draftStart, setDraftStart] = useState<Date | null>(committedStart)
  const [draftEnd, setDraftEnd] = useState<Date | null>(committedEnd)

  const isOpenControlled = openProp !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
  const open = isOpenControlled ? (openProp ?? false) : internalOpen

  const [viewResetKey, setViewResetKey] = useState(0)

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isOpenControlled, onOpenChange]
  )

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) {
        setDraftStart(committedStart)
        setDraftEnd(committedEnd)
        setViewResetKey((key) => key + 1)
      }
      setOpen(next)
    },
    [committedEnd, committedStart, setOpen]
  )

  const setDraftRange = useCallback((range: DateRangeValue) => {
    setDraftStart(range.start)
    setDraftEnd(range.end)
  }, [])

  const commitRange = useCallback(
    (range: DateRangeValue) => {
      if (!isStartControlled) setInternalStart(range.start)
      if (!isEndControlled) setInternalEnd(range.end)
      onRangeChange?.(range)
    },
    [isEndControlled, isStartControlled, onRangeChange]
  )

  const applyDraft = useCallback(() => {
    if (!isStartControlled) setInternalStart(draftStart)
    if (!isEndControlled) setInternalEnd(draftEnd)
    onRangeChange?.({ start: draftStart, end: draftEnd })
    setOpen(false)
  }, [draftEnd, draftStart, isEndControlled, isStartControlled, onRangeChange, setOpen])

  return (
    <DateAgendaContext.Provider
      value={{
        open,
        viewResetKey,
        draftStart,
        draftEnd,
        committedStart,
        committedEnd,
        setDraftRange,
        commitRange,
        applyDraft,
        locale,
        temporal,
        close: () => setOpen(false),
        today,
      }}
    >
      <PopoverRoot open={open} onOpenChange={handleOpenChange} defaultOpen={defaultOpen}>
        {children}
      </PopoverRoot>
    </DateAgendaContext.Provider>
  )
}
