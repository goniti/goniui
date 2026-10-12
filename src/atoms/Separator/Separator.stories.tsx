import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import * as List from '@/atoms/List'
import { Text } from '@/atoms/Text'

import { Separator } from './components/Separator'

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <Box className="w-80">
      <Text variant="body">Above the line</Text>
      <Separator className="my-4" />
      <Text variant="body" tone="muted">
        Below the line
      </Text>
    </Box>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Flex align="center" gap="lg" className="h-10">
      <Text variant="label">Left</Text>
      <Separator orientation="vertical" />
      <Text variant="label">Right</Text>
    </Flex>
  ),
}

export const Inset: Story = {
  name: 'Inset (FAQ-style)',
  render: () => (
    <Box className="w-80 rounded-xl border border-neutral-200 bg-white">
      <List.Root className="[&>li:last-child>[data-slot=separator]]:hidden">
        {[
          { q: 'What is a design system?', a: 'A collection of reusable components and tokens.' },
          { q: 'Why use tokens?', a: 'Tokens make re-theming a one-line change.' },
          { q: 'What is composition?', a: 'Passing UI as children instead of config props.' },
        ].map((item) => (
          <List.Item key={item.q}>
            <Flex direction="col" gap="xs" className="px-6 py-4">
              <Text variant="label">{item.q}</Text>
              <Text variant="body" tone="muted">
                {item.a}
              </Text>
            </Flex>
            <Separator className="mx-6 w-auto" />
          </List.Item>
        ))}
      </List.Root>
    </Box>
  ),
}
