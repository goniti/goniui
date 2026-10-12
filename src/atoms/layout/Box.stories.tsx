import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box } from './Box'

const meta = {
  title: 'Atoms/Layout/Box',
  component: Box,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'A generic div (default)' },
}

export const AsSection: Story = {
  name: 'as="section"',
  render: () => (
    <Box as="section" className="rounded-lg border border-neutral-200 p-4">
      I am a {'<section>'}
    </Box>
  ),
}

export const AsMain: Story = {
  name: 'as="main"',
  render: () => (
    <Box as="main" className="rounded-lg border border-neutral-200 p-4">
      I am a {'<main>'}
    </Box>
  ),
}

export const SemanticElements: Story = {
  render: () => (
    <Box className="flex flex-col gap-3">
      {(['div', 'section', 'main', 'header', 'footer', 'article', 'aside', 'nav'] as const).map(
        (el) => (
          <Box key={el} as={el} className="rounded border border-neutral-200 px-3 py-2 text-sm">
            &lt;{el}&gt;
          </Box>
        )
      )}
    </Box>
  ),
}
