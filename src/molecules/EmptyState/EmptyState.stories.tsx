import type { Meta, StoryObj } from '@storybook/react-vite'
import { Inbox } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'

import { EmptyState } from './EmptyState'

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Coming soon' },
}

export const WithDescription: Story = {
  args: {
    title: 'Coming soon',
    description: 'This section is under construction.',
  },
}

export const WithIcon: Story = {
  args: {
    icon: <Icon icon={Inbox} size="lg" />,
    title: 'No messages yet',
    description: 'New messages will show up here.',
  },
}

export const WithAction: Story = {
  args: { title: "Couldn't load the list" },
  render: () => (
    <EmptyState icon={<Icon icon={Inbox} size="lg" />} title="Couldn't load the list">
      <Button size="sm">Retry</Button>
    </EmptyState>
  ),
}
