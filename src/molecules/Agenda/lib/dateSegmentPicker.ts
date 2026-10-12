import type { TemporalFacet } from '@/lib/resolveTemporalBounds'
import { toMidnight } from '@/molecules/Calendar/lib/calendarUtils'

export type DateField = 'day' | 'month' | 'year'
export type DateBound = 'start' | 'end'

export interface AgendaPickerItem {
  value: string
  label: string
}

/** Unambiguous date used only to read a locale's field order and separator. */
const LOCALE_PROBE_DATE = new Date(2024, 5, 15)

function isDateField(type: Intl.DateTimeFormatPartTypes): type is DateField {
  return type === 'day' || type === 'month' || type === 'year'
}

export function getLocaleFieldOrder(locale: string): DateField[] {
  return new Intl.DateTimeFormat(locale)
    .formatToParts(LOCALE_PROBE_DATE)
    .map((part) => part.type)
    .filter(isDateField)
}

export function getPartSeparator(locale: string): string {
  const parts = new Intl.DateTimeFormat(locale).formatToParts(LOCALE_PROBE_DATE)
  return parts.find((part) => part.type === 'literal' && /[/\-.]/.test(part.value))?.value ?? '/'
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function compareDate(a: Date, b: Date): number {
  return toMidnight(a).getTime() - toMidnight(b).getTime()
}

/** Latest of two optional bounds — used to merge temporal min with range start. */
export function laterOf(a: Date | undefined, b: Date | undefined): Date | undefined {
  if (a == null) return b
  if (b == null) return a
  return compareDate(a, b) >= 0 ? a : b
}

/** Earliest of two optional bounds — used to merge temporal max with range end. */
export function earlierOf(a: Date | undefined, b: Date | undefined): Date | undefined {
  if (a == null) return b
  if (b == null) return a
  return compareDate(a, b) <= 0 ? a : b
}

function yearBounds(
  temporal: TemporalFacet | undefined,
  today: Date,
  min?: Date,
  max?: Date
): { minYear: number; maxYear: number } {
  const baseMinYear = min?.getFullYear() ?? today.getFullYear() - 100
  const baseMaxYear = max?.getFullYear() ?? today.getFullYear() + 100

  return {
    minYear: temporal === 'future' ? Math.max(baseMinYear, today.getFullYear()) : baseMinYear,
    maxYear: temporal === 'past' ? Math.min(baseMaxYear, today.getFullYear()) : baseMaxYear,
  }
}

export function buildYearItems(
  temporal: TemporalFacet | undefined,
  today: Date,
  min?: Date,
  max?: Date
): AgendaPickerItem[] {
  const { minYear, maxYear } = yearBounds(temporal, today, min, max)
  return Array.from(
    { length: Math.max(maxYear - minYear + 1, 0) },
    (_, index) => minYear + index
  ).map((year) => ({ value: String(year), label: String(year) }))
}

export function buildMonthItems(
  locale: string,
  temporal: TemporalFacet | undefined,
  today: Date,
  year: number,
  min?: Date,
  max?: Date
): AgendaPickerItem[] {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  const isCurrentYear = year === today.getFullYear()

  const monthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const onOrAfterMin = (month: number) =>
    min == null || compareDate(new Date(year, month, 1), monthStart(min)) >= 0
  const onOrBeforeMax = (month: number) =>
    max == null || compareDate(new Date(year, month, 1), monthStart(max)) <= 0
  const withinTemporal = (month: number) => {
    if (temporal === 'past' && isCurrentYear) return month <= today.getMonth()
    if (temporal === 'future' && isCurrentYear) return month >= today.getMonth()
    return true
  }

  return Array.from({ length: 12 }, (_, month) => month)
    .filter((month) => onOrAfterMin(month) && onOrBeforeMax(month) && withinTemporal(month))
    .map((month) => ({
      value: String(month + 1),
      label: formatter.format(new Date(year, month, 1)),
    }))
}

export function buildDayItems(
  temporal: TemporalFacet | undefined,
  today: Date,
  year: number,
  month: number,
  min?: Date,
  max?: Date
): AgendaPickerItem[] {
  const total = daysInMonth(year, month - 1)
  const isCurrentMonth = year === today.getFullYear() && month - 1 === today.getMonth()

  const onOrAfterMin = (day: number) =>
    min == null || compareDate(new Date(year, month - 1, day), min) >= 0
  const onOrBeforeMax = (day: number) =>
    max == null || compareDate(new Date(year, month - 1, day), max) <= 0
  const withinTemporal = (day: number) => {
    if (temporal === 'past' && isCurrentMonth) return day <= today.getDate()
    if (temporal === 'future' && isCurrentMonth) return day >= today.getDate()
    return true
  }

  return Array.from({ length: total }, (_, index) => index + 1)
    .filter((day) => onOrAfterMin(day) && onOrBeforeMax(day) && withinTemporal(day))
    .map((day) => ({ value: String(day), label: String(day).padStart(2, '0') }))
}

export function patchDateField(date: Date, field: DateField, rawValue: string): Date {
  const year = field === 'year' ? Number.parseInt(rawValue, 10) : date.getFullYear()
  const month = field === 'month' ? Number.parseInt(rawValue, 10) - 1 : date.getMonth()
  const requestedDay = field === 'day' ? Number.parseInt(rawValue, 10) : date.getDate()
  const day = Math.min(requestedDay, daysInMonth(year, month))
  return toMidnight(new Date(year, month, day))
}

const FIELD_READERS: Record<DateField, (date: Date) => number> = {
  year: (date) => date.getFullYear(),
  month: (date) => date.getMonth() + 1,
  day: (date) => date.getDate(),
}

export function readDateField(date: Date, field: DateField): string {
  return String(FIELD_READERS[field](date))
}
