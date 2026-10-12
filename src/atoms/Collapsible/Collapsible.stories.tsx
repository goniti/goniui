import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '@/atoms/Text'

import * as Collapsible from './index'

const meta = {
  title: 'Atoms/Collapsible',
  component: Collapsible.Root,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Collapsible.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible.Root className="w-full max-w-md rounded-xl border border-neutral-200 bg-white">
      <Collapsible.Trigger className="w-full cursor-pointer px-5 py-4 text-left hover:bg-transparent">
        <Text variant="h3">Toggle section</Text>
      </Collapsible.Trigger>
      <Collapsible.Content className="px-5 pb-4">
        <Text variant="body" tone="muted">
          Collapsible content powered by Radix — keyboard and aria wiring included.
        </Text>
      </Collapsible.Content>
    </Collapsible.Root>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible.Root
      defaultOpen
      className="w-full max-w-md rounded-xl border border-neutral-200 bg-white"
    >
      <Collapsible.Trigger className="w-full cursor-pointer px-5 py-4 text-left hover:bg-transparent">
        <Text variant="h3">Already open</Text>
      </Collapsible.Trigger>
      <Collapsible.Content className="px-5 pb-4">
        <Text variant="body" tone="muted">
          Starts expanded via <code>defaultOpen</code>.
        </Text>
      </Collapsible.Content>
    </Collapsible.Root>
  ),
}
