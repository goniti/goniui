import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from '@/atoms/layout/Flex'

import { Wordmark } from './Wordmark'

const meta = {
  title: 'Atoms/Wordmark',
  component: Wordmark,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Wordmark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { lead: 'Word', accent: 'mark' },
}

export const Sizes: Story = {
  args: { lead: 'Word', accent: 'mark' },
  render: () => (
    <Flex align="center" gap="md">
      <Wordmark lead="Word" accent="mark" size="sm" />
      <Wordmark lead="Word" accent="mark" size="md" />
      <Wordmark lead="Word" accent="mark" size="lg" />
    </Flex>
  ),
}

export const AnotherBrand: Story = {
  name: 'Generic — any brand text',
  args: { lead: 'Board', accent: 'Games' },
}
