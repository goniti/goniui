import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from '@/atoms/layout/Flex'

import { Spinner } from './components/Spinner'

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['primary', 'muted', 'inverse', 'success'] },
    loading: { control: 'boolean' },
    'aria-label': { control: 'text' },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }

export const Muted: Story = { args: { tone: 'muted' } }
export const Success: Story = { args: { tone: 'success' } }

export const OnDark: Story = {
  args: { tone: 'inverse' },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-neutral-900 p-8">
        <Story />
      </div>
    ),
  ],
}

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <Flex align="center" gap="lg">
      <Spinner size="sm" aria-label="Loading small" />
      <Spinner size="md" aria-label="Loading medium" />
      <Spinner size="lg" aria-label="Loading large" />
    </Flex>
  ),
}

export const Hidden: Story = {
  args: { loading: false },
  name: 'Not loading (null)',
}
