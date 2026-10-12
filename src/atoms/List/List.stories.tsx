import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '@/atoms/Text'

import * as List from './index'

const meta = {
  title: 'Atoms/List',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Unordered: Story = {
  render: () => (
    <List.Root marker="disc" gap="xs">
      <List.Item>Design tokens for theming</List.Item>
      <List.Item>Tailwind-variants for style</List.Item>
      <List.Item>Composition over configuration</List.Item>
    </List.Root>
  ),
}

export const Ordered: Story = {
  render: () => (
    <List.Root as="ol" marker="decimal" gap="xs">
      <List.Item>Install dependencies</List.Item>
      <List.Item>Configure tokens</List.Item>
      <List.Item>Mount the Toaster at the root</List.Item>
    </List.Root>
  ),
}

export const Plain: Story = {
  render: () => (
    <List.Root gap="sm">
      <List.Item className="rounded-lg border border-neutral-200 bg-white p-3">
        <Text variant="label">Projects</Text>
        <Text variant="body" tone="muted">
          Manage your projects
        </Text>
      </List.Item>
      <List.Item className="rounded-lg border border-neutral-200 bg-white p-3">
        <Text variant="label">Team</Text>
        <Text variant="body" tone="muted">
          Invite and manage team members
        </Text>
      </List.Item>
      <List.Item className="rounded-lg border border-neutral-200 bg-white p-3">
        <Text variant="label">Billing</Text>
        <Text variant="body" tone="muted">
          Subscription and invoices
        </Text>
      </List.Item>
    </List.Root>
  ),
}
