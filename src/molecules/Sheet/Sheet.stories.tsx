import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

import * as Sheet from './index'

const meta = {
  title: 'Molecules/Sheet',
  component: Sheet.Root,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sheet.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button>Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content aria-label="Default sheet">
        <Flex direction="col" gap="lg" className="p-6">
          <Text variant="h3">Sheet title</Text>
          <Text variant="body">This is a bottom sheet. Drag down or tap outside to dismiss.</Text>
          <Sheet.Close asChild>
            <Button variant="secondary">Close</Button>
          </Sheet.Close>
        </Flex>
      </Sheet.Content>
    </Sheet.Root>
  ),
}

export const SmallInset: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button>Open (small inset)</Button>
      </Sheet.Trigger>
      <Sheet.Content inset="sm" aria-label="Small inset sheet">
        <Flex direction="col" gap="lg" className="p-6">
          <Text variant="h3">Small inset</Text>
          <Text variant="body">Stops just 4px from the top of the screen.</Text>
          <Sheet.Close asChild>
            <Button>Done</Button>
          </Sheet.Close>
        </Flex>
      </Sheet.Content>
    </Sheet.Root>
  ),
}

export const LargeInset: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button>Open (large inset)</Button>
      </Sheet.Trigger>
      <Sheet.Content inset="lg" aria-label="Large inset sheet">
        <Flex direction="col" gap="lg" className="p-6">
          <Text variant="h3">Large inset</Text>
          <Text variant="body">Leaves 80px at the top.</Text>
          <Sheet.Close asChild>
            <Button>Done</Button>
          </Sheet.Close>
        </Flex>
      </Sheet.Content>
    </Sheet.Root>
  ),
}

export const NoHandle: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button>Open (no handle)</Button>
      </Sheet.Trigger>
      <Sheet.Content hideHandle aria-label="Sheet without handle">
        <Flex direction="col" gap="lg" className="p-6">
          <Text variant="h3">No drag handle</Text>
          <Text variant="body">The handle is hidden via the `hideHandle` prop.</Text>
          <Sheet.Close asChild>
            <Button>Close</Button>
          </Sheet.Close>
        </Flex>
      </Sheet.Content>
    </Sheet.Root>
  ),
}

export const Controlled: Story = {
  render: function ControlledSheet() {
    const [open, setOpen] = useState(false)
    return (
      <Sheet.Root open={open} onOpenChange={setOpen}>
        <Sheet.Trigger asChild>
          <Button>Open (controlled)</Button>
        </Sheet.Trigger>
        <Sheet.Content aria-label="Controlled sheet">
          <Flex direction="col" gap="lg" className="p-6">
            <Text variant="h3">Controlled sheet</Text>
            <Text variant="body">
              Open state driven externally via <code>open</code> / <code>onOpenChange</code>.
            </Text>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Flex>
        </Sheet.Content>
      </Sheet.Root>
    )
  },
}

export const SnapPoints: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button>Open (drag to resize)</Button>
      </Sheet.Trigger>
      <Sheet.Content
        snapPoints={[25, 50, 90]}
        handleLabel="Resize sheet"
        aria-label="Snap points sheet"
      >
        <Flex direction="col" gap="lg" className="p-6">
          <Text variant="h3">Drag the handle</Text>
          <Text variant="body">
            Snaps to 25%, 50% or 90% of the viewport height. Drag past half the smallest point to
            close, or use arrow keys / Home / End on the handle.
          </Text>
          <Sheet.Close asChild>
            <Button variant="secondary">Close</Button>
          </Sheet.Close>
        </Flex>
      </Sheet.Content>
    </Sheet.Root>
  ),
}
