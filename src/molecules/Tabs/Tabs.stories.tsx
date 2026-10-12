import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '@/atoms/Text'

import * as Tabs from './index'

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs.Root,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="account" className="w-full max-w-md">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="h3">Account settings</Text>
        <Text variant="body" tone="muted">
          Manage your account details here.
        </Text>
      </Tabs.Content>
      <Tabs.Content value="password" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="h3">Password</Text>
        <Text variant="body" tone="muted">
          Update your password here.
        </Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

export const ThreeTabs: Story = {
  render: () => (
    <Tabs.Root defaultValue="one" className="w-full max-w-lg">
      <Tabs.List>
        <Tabs.Trigger value="one">Overview</Tabs.Trigger>
        <Tabs.Trigger value="two">Details</Tabs.Trigger>
        <Tabs.Trigger value="three">History</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="body">Overview content</Text>
      </Tabs.Content>
      <Tabs.Content value="two" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="body">Details content</Text>
      </Tabs.Content>
      <Tabs.Content value="three" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="body">History content</Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs.Root defaultValue="active" className="w-full max-w-md">
      <Tabs.List>
        <Tabs.Trigger value="active">Active</Tabs.Trigger>
        <Tabs.Trigger value="disabled" disabled>
          Disabled
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="active" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="body">Active tab content</Text>
      </Tabs.Content>
      <Tabs.Content value="disabled" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="body">Unreachable content</Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

/** Navigation toggle without content panels — same visual style, no Tabs.Content needed.
 *  Control `value` from the active route; `asChild` lets triggers render as links. */
export const AsNavigationToggle: Story = {
  render: () => (
    <Tabs.Root value="signin" className="w-full max-w-xs">
      <Tabs.List>
        <Tabs.Trigger value="signin">Sign in</Tabs.Trigger>
        <Tabs.Trigger value="signup">Sign up</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="signin">
        <Text variant="body">Sign-in form</Text>
      </Tabs.Content>
      <Tabs.Content value="signup">
        <Text variant="body">Sign-up form</Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

export const Controlled: Story = {
  render: () => (
    <Tabs.Root value="password" className="w-full max-w-md">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="body">Account content</Text>
      </Tabs.Content>
      <Tabs.Content value="password" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="body">Password tab is forced active (controlled).</Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

/** `variant="segment"` — full-width equal segments in a bordered container.
 *  Same Radix tablist/tabpanel semantics; only the look changes. */
export const Segment: Story = {
  render: () => (
    <Tabs.Root variant="segment" defaultValue="account" className="w-full max-w-md">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="h3">Account settings</Text>
        <Text variant="body" tone="muted">
          Manage your account details here.
        </Text>
      </Tabs.Content>
      <Tabs.Content value="password" className="rounded-xl border border-neutral-200 bg-white p-4">
        <Text variant="h3">Password</Text>
        <Text variant="body" tone="muted">
          Update your password here.
        </Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

/** Segment style as a compact same-page toggle without content panels. */
export const SegmentToggle: Story = {
  render: () => (
    <Tabs.Root variant="segment" defaultValue="signin" className="w-full max-w-xs">
      <Tabs.List>
        <Tabs.Trigger value="signin">Sign in</Tabs.Trigger>
        <Tabs.Trigger value="signup">Sign up</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="signin" className="pt-4">
        Sign-in form
      </Tabs.Content>
      <Tabs.Content value="signup" className="pt-4">
        Sign-up form
      </Tabs.Content>
    </Tabs.Root>
  ),
}
