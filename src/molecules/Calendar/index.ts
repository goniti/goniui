// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Calendar from 'goniui/calendar'`
// then `<Calendar.Root value={date} onChange={setDate} />`.
export type { DayShape } from './components/CalendarMonthGrid'
export { type CalendarRootProps, CalendarRoot as Root } from './components/CalendarRoot'
// Hook re-exported for consumers who need to build a custom calendar UI.
export { type CalendarDay, useCalendar, type UseCalendarOptions } from './hooks/useCalendar'
