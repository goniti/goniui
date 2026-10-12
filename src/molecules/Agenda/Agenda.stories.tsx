import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { startOfToday } from '@/lib/resolveTemporalBounds'
import * as Agenda from '@/molecules/DateAgenda'

import { AgendaPanels } from './components/AgendaPanels'

const contentLabels = {
  clearLabel: 'Clear',
  applyLabel: 'Apply',
}

// ui-react is locale-agnostic: every label is supplied by the consumer (the app's
// i18n). The stories pass a matching label set per language so the wording stays
// consistent with the locale-driven dates.
interface PresetLabels {
  today: string
  last7: string
  last30: string
  currentMonth: string
  lastMonth: string
  currentYear: string
}

const PRESET_LABELS_EN: PresetLabels = {
  today: 'Today',
  last7: 'Last 7 days',
  last30: 'Last 30 days',
  currentMonth: 'Current month',
  lastMonth: 'Last month',
  currentYear: 'Current year',
}

const PRESET_LABELS_FR: PresetLabels = {
  today: 'Today',
  last7: 'Last 7 days',
  last30: 'Last 30 days',
  currentMonth: 'Mois en cours',
  lastMonth: 'Mois dernier',
  currentYear: 'Current year',
}

function buildPastPresets(today: Date, labels: PresetLabels) {
  return [
    {
      label: labels.today,
      group: 'relative',
      getRange: () => ({ start: today, end: today }),
    },
    {
      label: labels.last7,
      group: 'relative',
      getRange: () => ({
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
        end: today,
      }),
    },
    {
      label: labels.last30,
      group: 'relative',
      getRange: () => ({
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29),
        end: today,
      }),
    },
    {
      label: labels.currentMonth,
      group: 'periods',
      getRange: () => ({
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: today,
      }),
    },
    {
      label: labels.lastMonth,
      group: 'periods',
      getRange: () => ({
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0),
      }),
    },
    {
      label: labels.currentYear,
      group: 'periods',
      getRange: () => ({
        start: new Date(today.getFullYear(), 0, 1),
        end: today,
      }),
    },
  ]
}

const meta = {
  title: 'Molecules/Agenda',
  parameters: {
    docs: {
      description: {
        component:
          'Date range picker (`DateAgenda` from `goniui/date-agenda`). Editable trigger, grouped presets inside the card, drag + edge month scroll.',
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

export const Past: Story = {
  render: () => (
    <Agenda.Root temporal="past" locale="fr-FR">
      <Agenda.Trigger ariaLabel="Pick a past period" className="min-w-80" />
      <Agenda.Content
        ariaLabel="Pick a past period"
        {...contentLabels}
        clearLabel="Reset"
        applyLabel="Apply"
        presets={buildPastPresets(startOfToday(), PRESET_LABELS_FR)}
        presetsPlacement="left"
      />
    </Agenda.Root>
  ),
}

export const Present: Story = {
  render: () => (
    <Agenda.Root temporal="present">
      <Agenda.Trigger ariaLabel="Choose a date range" className="min-w-80" />
      <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
    </Agenda.Root>
  ),
}

export const Future: Story = {
  render: () => (
    <Agenda.Root temporal="future">
      <Agenda.Trigger ariaLabel="Choose a future date range" className="min-w-80" />
      <Agenda.Content ariaLabel="Choose a future date range" {...contentLabels} />
    </Agenda.Root>
  ),
}

function ControlledDemo() {
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  return (
    <div className="space-y-4">
      <Agenda.Root
        start={start}
        end={end}
        onRangeChange={({ start: nextStart, end: nextEnd }) => {
          setStart(nextStart)
          setEnd(nextEnd)
        }}
      >
        <Agenda.Trigger ariaLabel="Choose a date range" className="min-w-96" />
        <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
      </Agenda.Root>
      <p className="text-sm text-neutral-500">
        Selected: {start ? start.toDateString() : 'none'} → {end ? end.toDateString() : 'none'}
      </p>
    </div>
  )
}

export const Controlled: Story = { render: () => <ControlledDemo /> }

export const PresetsLeft: Story = {
  render: () => (
    <Agenda.Root temporal="past" locale="fr-FR">
      <Agenda.Trigger ariaLabel="Pick a period" className="min-w-80" />
      <Agenda.Content
        ariaLabel="Pick a period"
        clearLabel="Reset"
        applyLabel="Apply"
        presets={buildPastPresets(startOfToday(), PRESET_LABELS_FR)}
        presetsPlacement="left"
      />
    </Agenda.Root>
  ),
}

export const PresetsBottom: Story = {
  render: () => (
    <Agenda.Root temporal="present">
      <Agenda.Trigger ariaLabel="Choose a date range" className="min-w-80" />
      <Agenda.Content
        ariaLabel="Choose a date range"
        {...contentLabels}
        presets={buildPastPresets(startOfToday(), PRESET_LABELS_EN).slice(0, 3)}
        presetsPlacement="bottom"
      />
    </Agenda.Root>
  ),
}

export const Inline: Story = {
  render: () => <AgendaPanels temporal="present" ariaLabel="Choose a date range" />,
}
