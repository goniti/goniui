import type { Meta, StoryObj } from '@storybook/react-vite'

import { Countdown } from './components/Countdown'

const meta = {
  title: 'Molecules/Countdown',
  component: Countdown,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    format: { control: 'object' },
  },
} satisfies Meta<typeof Countdown>

export default meta
type Story = StoryObj<typeof meta>

// 10 minutes from now
const TEN_MINUTES = 10 * 60

export const Default: Story = {
  args: {
    target: TEN_MINUTES,
    labels: { days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec' },
  },
}

export const Large: Story = {
  args: {
    target: TEN_MINUTES,
    size: 'lg',
    labels: { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' },
  },
}

export const Small: Story = {
  args: {
    target: TEN_MINUTES,
    size: 'sm',
    labels: { days: 'd', hours: 'h', minutes: 'm', seconds: 's' },
  },
}

export const HoursMinutesOnly: Story = {
  args: {
    target: TEN_MINUTES,
    format: ['hours', 'minutes'],
    labels: { hours: 'hours', minutes: 'minutes' },
  },
}

export const MinutesSeconds: Story = {
  args: {
    target: 90,
    format: ['minutes', 'seconds'],
    labels: { minutes: 'min', seconds: 'sec' },
  },
}

export const Expired: Story = {
  name: 'Expired state',
  args: {
    target: 0,
    labels: { expired: 'Time is up!' },
    expiredSlot: <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Time is up!</span>,
  },
}

export const FutureDate: Story = {
  name: 'Target as Date',
  args: {
    target: new Date(Date.now() + 48 * 60 * 60 * 1000),
    labels: { days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec' },
  },
}
