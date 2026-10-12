import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

import { Switch } from './components/Switch'

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  args: { 'aria-label': 'Enable notifications' },
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 'md' },
}

export const Checked: Story = {
  args: { defaultChecked: true, size: 'md' },
}

export const Disabled: Story = {
  args: { disabled: true, size: 'md' },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, size: 'md' },
}

export const Sizes: Story = {
  render: () => (
    <Flex direction="col" gap="md">
      <Flex align="center" gap="sm">
        <Switch size="sm" defaultChecked aria-label="Small" />
        <Text variant="label" tone="muted">
          Small
        </Text>
      </Flex>
      <Flex align="center" gap="sm">
        <Switch size="md" defaultChecked aria-label="Medium" />
        <Text variant="label" tone="muted">
          Medium (default)
        </Text>
      </Flex>
      <Flex align="center" gap="sm">
        <Switch size="lg" defaultChecked aria-label="Large" />
        <Text variant="label" tone="muted">
          Large
        </Text>
      </Flex>
    </Flex>
  ),
}

function ControlledSwitch() {
  const [checked, setChecked] = useState(false)
  return (
    <Flex align="center" gap="sm">
      <Switch checked={checked} onCheckedChange={setChecked} aria-label="Activer" />
      <Text variant="label">{checked ? 'On' : 'Off'}</Text>
    </Flex>
  )
}

export const Controlled: Story = {
  render: () => <ControlledSwitch />,
}
