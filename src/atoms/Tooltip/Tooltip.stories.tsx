import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactElement } from 'react'

import { Button } from '../Button'
import * as Tooltip from './index'

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip.Root,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: () => ReactElement) => (
      <Tooltip.Provider>
        <Story />
      </Tooltip.Provider>
    ),
  ],
} satisfies Meta<typeof Tooltip.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button>Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Save document</Tooltip.Content>
    </Tooltip.Root>
  ),
}

export const WithKeyCombo: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button>Subjects</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <span className="flex items-center gap-1.5">
          Navigate to subjects
          <Tooltip.KeysChip keys={['G', 'B']} />
        </span>
      </Tooltip.Content>
    </Tooltip.Root>
  ),
}

export const SingleKey: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button>Search</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <span className="flex items-center gap-1.5">
          Open search
          <Tooltip.KeysChip keys={['⌘', 'K']} />
        </span>
      </Tooltip.Content>
    </Tooltip.Root>
  ),
}

export const PlacementBottom: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button>Bottom tooltip</Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">Appears below the trigger</Tooltip.Content>
    </Tooltip.Root>
  ),
}

export const PlacementLeft: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button>Left tooltip</Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="left">Appears to the left</Tooltip.Content>
    </Tooltip.Root>
  ),
}

export const OpenByDefault: Story = {
  render: () => (
    <Tooltip.Root defaultOpen>
      <Tooltip.Trigger asChild>
        <Button>Already open</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>This tooltip starts open</Tooltip.Content>
    </Tooltip.Root>
  ),
}
