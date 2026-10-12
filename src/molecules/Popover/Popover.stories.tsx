import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/atoms/Button'
import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

import * as Popover from './index'

/**
 * Bare Radix popover wrapper — opened on **click**, supports interactive content.
 *
 * `Popover` is a structural primitive used internally by `DateCalendar` and
 * `DateAgenda`. Consumers who need a pre-styled floating panel should use one
 * of those compounds instead. Use `Popover` directly only when building a new
 * compound that needs a positioned, focusable overlay.
 *
 * **Tooltip vs Popover**
 * | | Tooltip | Popover |
 * |---|---|---|
 * | Opens on | hover / focus | click |
 * | Content | text only | interactive elements |
 * | ARIA | `role="tooltip"` | `role="dialog"` |
 */
const meta = {
  title: 'Molecules/Popover',
  component: Popover.Root,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover.Root>

export default meta
type Story = StoryObj<typeof meta>

const panelClass =
  'z-50 min-w-48 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg ' +
  'animate-in fade-in-0 zoom-in-95 ' +
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Open popover</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={6} className={panelClass}>
          <Flex direction="col" gap="sm">
            <Text variant="label">Popover title</Text>
            <Text variant="body" tone="muted">
              Any interactive content can live here — forms, actions, date pickers.
            </Text>
          </Flex>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="secondary">Settings</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={6} className={panelClass}>
          <Flex direction="col" gap="sm">
            <Text variant="label">Notification settings</Text>
            <Flex direction="col" gap="xs">
              <Text variant="body" tone="muted">
                Choose what updates you receive.
              </Text>
            </Flex>
            <Flex gap="xs" justify="end">
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button size="sm">Save</Button>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}

export const PlacementTop: Story = {
  render: () => (
    <Popover.Root defaultOpen>
      <Popover.Trigger asChild>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={6}
          aria-label="Placement demo"
          className={panelClass}
        >
          <Text variant="body">Appears above the trigger</Text>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}

export const PlacementRight: Story = {
  render: () => (
    <Popover.Root defaultOpen>
      <Popover.Trigger asChild>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="right"
          sideOffset={6}
          aria-label="Placement demo"
          className={panelClass}
        >
          <Text variant="body">Appears to the right</Text>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}

export const PlacementBottom: Story = {
  render: () => (
    <Popover.Root defaultOpen>
      <Popover.Trigger asChild>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          sideOffset={6}
          aria-label="Placement demo"
          className={panelClass}
        >
          <Text variant="body">Appears below the trigger</Text>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}

export const PlacementLeft: Story = {
  render: () => (
    <Popover.Root defaultOpen>
      <Popover.Trigger asChild>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="left"
          sideOffset={6}
          aria-label="Placement demo"
          className={panelClass}
        >
          <Text variant="body">Appears to the left</Text>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}

function ControlledDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Flex direction="col" align="center" gap="md">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button>{open ? 'Close popover' : 'Open popover'}</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={6} className={panelClass}>
            <Flex direction="col" gap="sm">
              <Text variant="label">Controlled popover</Text>
              <Text variant="body" tone="muted">
                Open state is driven by the parent.
              </Text>
              <Box>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Close from inside
                </Button>
              </Box>
            </Flex>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Text variant="caption" tone="muted">
        open: {String(open)}
      </Text>
    </Flex>
  )
}

export const Controlled: Story = { render: () => <ControlledDemo /> }
