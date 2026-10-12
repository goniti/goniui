import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'

const meta = {
  title: 'Atoms/Text',
  component: Text,
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text as="h1" variant="display">
        Display
      </Text>
      <Text as="h2" variant="title">
        Title
      </Text>
      <Text as="h1" variant="h1">
        Heading 1
      </Text>
      <Text as="h2" variant="h2">
        Heading 2
      </Text>
      <Text as="h3" variant="h3">
        Heading 3
      </Text>
      <Text variant="bodyLg">Body large.</Text>
      <Text variant="body">Body — the default paragraph style.</Text>
      <Text variant="bodySm">Body small.</Text>
      <Text as="label" variant="label">
        Label
      </Text>
      <Text variant="caption">Caption.</Text>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text>Default tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="subtle">Subtle tone</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="error">Error tone</Text>
    </div>
  ),
}
