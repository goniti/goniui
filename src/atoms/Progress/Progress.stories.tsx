import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'

import { Progress } from './components/Progress'

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  args: { label: 'Loading…' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['primary', 'success', 'warning', 'error'] },
    shape: { control: 'inline-radio', options: ['linear', 'circular'] },
    showValue: { control: 'boolean' },
    value: { control: { type: 'range', min: 0, max: 100 }, defaultValue: 40 },
  },
  // The linear bar is `w-full`; give it a width to render against (otherwise it
  // collapses to 0 under the centered layout). Harmless for the circular ring.
  decorators: [
    (Story) => (
      <Box className="w-72">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { value: 40 } }
export const Zero: Story = { args: { value: 0 } }
export const Complete: Story = { args: { value: 100 } }
export const Indeterminate: Story = { args: { indeterminate: true } }
export const WithValue: Story = { args: { value: 65, showValue: true } }

export const Sizes: Story = {
  render: (args) => (
    <Flex direction="col" gap="md">
      <Progress {...args} size="sm" value={60} label="Small" />
      <Progress {...args} size="md" value={60} label="Medium" />
      <Progress {...args} size="lg" value={60} label="Large" />
    </Flex>
  ),
}

export const Tones: Story = {
  render: (args) => (
    <Flex direction="col" gap="md">
      <Progress {...args} tone="primary" value={70} label="Primary" />
      <Progress {...args} tone="success" value={70} label="Success" />
      <Progress {...args} tone="warning" value={70} label="Warning" />
      <Progress {...args} tone="error" value={70} label="Error" />
    </Flex>
  ),
}

/** Circular ring with the value in the centre. */
export const Circular: Story = {
  args: { shape: 'circular', value: 65, showValue: true },
}

export const CircularStates: Story = {
  render: (args) => (
    <Flex align="center" gap="lg">
      <Progress {...args} shape="circular" value={25} showValue label="25 percent" />
      <Progress {...args} shape="circular" value={75} showValue tone="success" label="75 percent" />
      <Progress {...args} shape="circular" indeterminate label="Loading" />
    </Flex>
  ),
}
