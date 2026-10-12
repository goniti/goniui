'use client'

import { createContext, useContext } from 'react'

import type { TemporalFacet } from '@/lib/resolveTemporalBounds'
import type { DateRangeValue } from '@/molecules/Agenda/hooks/useDateRange'

export interface DateAgendaContextValue {
  open: boolean
  /** Increments each time the popover opens — re-anchors the calendar months. */
  viewResetKey: number
  draftStart: Date | null
  draftEnd: Date | null
  committedStart: Date | null
  committedEnd: Date | null
  setDraftRange: (range: DateRangeValue) => void
  /** Commit a range straight to the committed value (used by the closed trigger and Clear). */
  commitRange: (range: DateRangeValue) => void
  applyDraft: () => void
  locale: string
  temporal?: TemporalFacet
  close: () => void
  today: Date
}

export const DateAgendaContext = createContext<DateAgendaContextValue | null>(null)

export function useDateAgendaContext(): DateAgendaContextValue {
  const ctx = useContext(DateAgendaContext)
  if (ctx === null) {
    throw new Error('DateAgenda subcomponents must be used inside <DateAgenda.Root>')
  }
  return ctx
}
