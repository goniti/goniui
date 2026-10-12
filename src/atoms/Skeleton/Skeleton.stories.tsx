import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from '@/atoms/layout/Flex'

import { Skeleton } from './components/Skeleton'
import { SkeletonGroup } from './components/SkeletonGroup'

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['block', 'text', 'circle'] },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Block: Story = { args: { variant: 'block', className: 'h-32 w-64' } }
export const Text: Story = { args: { variant: 'text', className: 'w-48' } }
export const Circle: Story = { args: { variant: 'circle', className: 'size-12' } }

export const CardPlaceholder: Story = {
  name: 'Card placeholder',
  render: () => (
    <SkeletonGroup label="Loading card">
      <Flex
        direction="col"
        gap="sm"
        className="w-64 rounded-xl border border-neutral-200 bg-white p-4"
      >
        <Skeleton variant="block" className="h-32 w-full" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </Flex>
    </SkeletonGroup>
  ),
}

export const AvatarWithText: Story = {
  name: 'Avatar with text',
  render: () => (
    <SkeletonGroup label="Loading user">
      <Flex align="center" gap="md" className="w-64">
        <Skeleton variant="circle" className="size-10 shrink-0" />
        <Flex direction="col" gap="sm" className="flex-1">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-2/3" />
        </Flex>
      </Flex>
    </SkeletonGroup>
  ),
}

export const InlineText: Story = {
  name: 'Inline text line',
  render: () => (
    <SkeletonGroup label="Loading paragraph">
      <p className="w-96">
        <Skeleton as="span" variant="text" className="inline-block w-full" />
      </p>
    </SkeletonGroup>
  ),
}
