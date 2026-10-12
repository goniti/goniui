'use client'

import { createContext, useContext } from 'react'

import type { TemporalFacet } from '@/lib/resolveTemporalBounds'

export interface DateCalendarContextValue {
  value: Date | null
  onSelect: (date: Date) => void
  locale: string
  formattedValue: string
  placeholder: string
  temporal?: TemporalFacet
}

export const DateCalendarContext = createContext<DateCalendarContextValue | null>(null)

export function useDateCalendarContext(): DateCalendarContextValue {
  const ctx = useContext(DateCalendarContext)
  if (ctx === null) {
    throw new Error('Date.Calendar subcomponents must be used inside <Date.Calendar.Root>')
  }
  return ctx
}
