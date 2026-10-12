import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '@/atoms/Badge'
import { Button } from '@/atoms/Button'
import { Text } from '@/atoms/Text'

import { PageHeader } from './PageHeader'

const meta = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Overview' },
}

export const WithEyebrow: Story = {
  args: { eyebrow: 'Overview', title: 'Weekly Overview' },
}

export const WithTrailingDate: Story = {
  args: { eyebrow: 'Overview', title: 'Weekly Overview' },
  render: () => (
    <PageHeader eyebrow="Overview" title="Weekly Overview">
      <Text variant="body" tone="muted">
        Thursday, Sept 24
      </Text>
    </PageHeader>
  ),
}

export const WithActions: Story = {
  args: { eyebrow: 'Moderation', title: 'Pending games' },
  render: () => (
    <PageHeader eyebrow="Moderation" title="Pending games">
      <Badge variant="solid">12 pending</Badge>
      <Button size="sm">New event</Button>
    </PageHeader>
  ),
}
