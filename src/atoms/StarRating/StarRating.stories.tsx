import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

import { StarRating } from './components/StarRating'

const STAR_LABELS = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars']

const meta = {
  title: 'Atoms/StarRating',
  component: StarRating,
  parameters: { layout: 'padded' },
  args: { value: 4.2, label: '4.2 out of 5' },
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj<typeof meta>

export const ReadOnlyAverage: Story = {
  args: { value: 4.2, label: '4.2 out of 5' },
}

export const ReadOnlyHalfStar: Story = {
  args: { value: 3.5, label: '3.5 out of 5' },
}

export const ReadOnlyEmpty: Story = {
  args: { value: 0, label: 'No reviews' },
}

export const Sizes: Story = {
  render: () => (
    <Flex direction="col" gap="md">
      <Flex align="center" gap="sm">
        <StarRating value={4.2} label="4.2 out of 5" size="sm" />
        <Text variant="label" tone="muted">
          Small
        </Text>
      </Flex>
      <Flex align="center" gap="sm">
        <StarRating value={4.2} label="4.2 out of 5" size="md" />
        <Text variant="label" tone="muted">
          Medium (default)
        </Text>
      </Flex>
      <Flex align="center" gap="sm">
        <StarRating value={4.2} label="4.2 out of 5" size="lg" />
        <Text variant="label" tone="muted">
          Large
        </Text>
      </Flex>
    </Flex>
  ),
}

function InteractiveRating() {
  const [value, setValue] = useState(0)
  return (
    <Flex align="center" gap="sm">
      <StarRating
        value={value}
        onRate={setValue}
        label="Rate this game"
        starLabels={STAR_LABELS}
        size="lg"
      />
      <Text variant="label">{value > 0 ? `${value} / 5` : 'Not rated yet'}</Text>
    </Flex>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveRating />,
}

export const InteractiveDisabled: Story = {
  args: {
    value: 3,
    onRate: () => {},
    label: 'Rate this game',
    starLabels: STAR_LABELS,
    disabled: true,
  },
}
