import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from './Flex'

const meta = {
  title: 'Atoms/Layout/Flex',
  component: Flex,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

const Item = ({ label }: { label: string }) => (
  <div className="rounded bg-primary-100 px-3 py-2 text-sm text-primary-700">{label}</div>
)

export const Row: Story = {
  render: () => (
    <Flex direction="row" gap="md">
      <Item label="A" />
      <Item label="B" />
      <Item label="C" />
    </Flex>
  ),
}

export const Column: Story = {
  render: () => (
    <Flex direction="col" gap="md">
      <Item label="A" />
      <Item label="B" />
      <Item label="C" />
    </Flex>
  ),
}

export const Centered: Story = {
  render: () => (
    <Flex align="center" justify="center" className="h-40 rounded border border-neutral-200">
      <Item label="Centered" />
    </Flex>
  ),
}

export const GapScale: Story = {
  render: () => (
    <Flex direction="col" gap="lg">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((gap) => (
        <Flex key={gap} direction="row" gap={gap} align="center">
          <span className="w-10 text-xs text-neutral-500">{gap}</span>
          <Item label="A" />
          <Item label="B" />
          <Item label="C" />
        </Flex>
      ))}
    </Flex>
  ),
}

export const AsSection: Story = {
  name: 'as="section"',
  render: () => (
    <Flex
      as="section"
      direction="col"
      gap="sm"
      className="rounded-lg border border-neutral-200 p-4"
    >
      <Item label="Section item 1" />
      <Item label="Section item 2" />
    </Flex>
  ),
}
