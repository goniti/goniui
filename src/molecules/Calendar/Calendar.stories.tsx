import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { Root as CalendarGrid } from '@/molecules/Calendar'
import * as Calendar from '@/molecules/DateCalendar'

const meta = {
  title: 'Molecules/Calendar',
  parameters: {
    docs: {
      description: {
        component:
          'Single-date picker (`DateCalendar` from `goniui/date-calendar`). Popover + trigger + optional `temporal` facet (`past` | `present` | `future`).',
      },
    },
  },
  decorators: [
    (Story: () => React.ReactElement) => (
      <div className="flex items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj

export const Uncontrolled: Story = {
  render: () => (
    <Calendar.Root placeholder="Select a date">
      <Calendar.Trigger ariaLabel="Choose a date" className="w-56" />
      <Calendar.Content ariaLabel="Choose a date" />
    </Calendar.Root>
  ),
}

function ControlledDemo() {
  const [date, setDate] = useState<Date | null>(null)
  return (
    <div className="space-y-4">
      <Calendar.Root value={date} onChange={setDate} placeholder="Pick a date">
        <Calendar.Trigger ariaLabel="Choose a date" className="w-64" />
        <Calendar.Content ariaLabel="Choose a date" />
      </Calendar.Root>
      <p className="text-sm text-neutral-500">Selected: {date ? date.toDateString() : 'none'}</p>
    </div>
  )
}

export const Controlled: Story = { render: () => <ControlledDemo /> }

export const FrenchLocale: Story = {
  render: () => (
    <Calendar.Root locale="en-GB" placeholder="Pick a date">
      <Calendar.Trigger ariaLabel="Pick a date" className="w-64" />
      <Calendar.Content
        ariaLabel="Pick a date"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
      />
    </Calendar.Root>
  ),
}

export const WithMinMax: Story = {
  render: () => {
    const today = new Date()
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3)
    const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
    return (
      <Calendar.Root placeholder="Select a date (restricted)">
        <Calendar.Trigger ariaLabel="Choose a date" className="w-64" />
        <Calendar.Content ariaLabel="Choose a date" min={min} max={max} />
      </Calendar.Root>
    )
  },
}

export const Past: Story = {
  render: () => (
    <Calendar.Root temporal="past" placeholder="Select a past date" defaultOpen>
      <Calendar.Trigger ariaLabel="Choose a past date" className="w-64" />
      <Calendar.Content ariaLabel="Choose a past date" />
    </Calendar.Root>
  ),
}

export const Present: Story = {
  render: () => (
    <Calendar.Root temporal="present" placeholder="Select any date" defaultOpen>
      <Calendar.Trigger ariaLabel="Choose a date" className="w-64" />
      <Calendar.Content ariaLabel="Choose a date" />
    </Calendar.Root>
  ),
}

export const Future: Story = {
  render: () => (
    <Calendar.Root temporal="future" placeholder="Select a future date" defaultOpen>
      <Calendar.Trigger ariaLabel="Choose a future date" className="w-64" />
      <Calendar.Content ariaLabel="Choose a future date" />
    </Calendar.Root>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Calendar.Root placeholder="Select a date">
      <Calendar.Trigger ariaLabel="Choose a date" disabled className="w-56" />
      <Calendar.Content ariaLabel="Choose a date" />
    </Calendar.Root>
  ),
}

export const DayCellShape: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The standalone month grid (`Calendar.Root` from `goniui/calendar`) accepts a `dayShape` prop. `soft` (default) keeps rounded cells; `round` renders selected days as circles and range ends as half-circles. Same colours, only the corner radius changes.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-500">soft (default)</p>
        <CalendarGrid
          dayShape="soft"
          rangeStart={new Date(2024, 5, 10)}
          rangeEnd={new Date(2024, 5, 14)}
          displayMonth={new Date(2024, 5, 1)}
          ariaLabel="Soft calendar"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-500">round</p>
        <CalendarGrid
          dayShape="round"
          rangeStart={new Date(2024, 5, 10)}
          rangeEnd={new Date(2024, 5, 14)}
          displayMonth={new Date(2024, 5, 1)}
          ariaLabel="Round calendar"
        />
      </div>
    </div>
  ),
}
