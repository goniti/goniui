import { describe, expect, it } from 'vitest'

import {
  buildDayItems,
  buildMonthItems,
  buildYearItems,
  earlierOf,
  laterOf,
  patchDateField,
  readDateField,
} from '../lib/dateSegmentPicker'

const today = new Date(2026, 5, 10)

describe('dateSegmentPicker range bounds', () => {
  it('laterOf picks the more recent bound', () => {
    expect(laterOf(new Date(2024, 0, 1), new Date(2026, 5, 25))).toEqual(new Date(2026, 5, 25))
  })

  it('earlierOf picks the earlier bound', () => {
    expect(earlierOf(new Date(2024, 11, 31), new Date(2026, 5, 25))).toEqual(new Date(2024, 11, 31))
  })

  it('omits years before the range minimum when building end years', () => {
    const items = buildYearItems(undefined, today, new Date(2026, 5, 25), undefined)
    expect(items.some((item) => item.value === '2024')).toBe(false)
    expect(items.some((item) => item.value === '2026')).toBe(true)
  })

  it('omits years after the range maximum when building start years', () => {
    const items = buildYearItems(undefined, today, undefined, new Date(2024, 11, 31))
    expect(items.some((item) => item.value === '2026')).toBe(false)
    expect(items.some((item) => item.value === '2024')).toBe(true)
  })

  it('omits months before the range minimum in the same year', () => {
    const items = buildMonthItems('en-US', undefined, today, 2026, new Date(2026, 5, 25), undefined)
    expect(items.some((item) => item.value === '5')).toBe(false)
    expect(items.some((item) => item.value === '6')).toBe(true)
  })

  it('omits days before the range minimum in the same month', () => {
    const items = buildDayItems(undefined, today, 2026, 6, new Date(2026, 5, 25), undefined)
    expect(items.some((item) => item.value === '24')).toBe(false)
    expect(items.some((item) => item.value === '25')).toBe(true)
  })
})

describe('dateSegmentPicker field read/patch', () => {
  it('reads each field as a raw string', () => {
    const date = new Date(2026, 5, 9)
    expect(readDateField(date, 'year')).toBe('2026')
    expect(readDateField(date, 'month')).toBe('6')
    expect(readDateField(date, 'day')).toBe('9')
  })

  it('clamps the day when switching to a shorter month', () => {
    const jan31 = new Date(2026, 0, 31)
    expect(patchDateField(jan31, 'month', '2')).toEqual(new Date(2026, 1, 28))
  })

  it('clamps the day when switching to a non-leap February', () => {
    const leapFeb29 = new Date(2024, 1, 29)
    expect(patchDateField(leapFeb29, 'year', '2026')).toEqual(new Date(2026, 1, 28))
  })

  it('patches a field without touching the others', () => {
    const date = new Date(2026, 5, 9)
    expect(patchDateField(date, 'day', '15')).toEqual(new Date(2026, 5, 15))
  })
})
