import type { Meta, StoryObj } from '@storybook/react-vite'
import { Settings, Trash2, User } from 'lucide-react'

import * as DropdownMenu from './index'

const meta = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu.Root,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DropdownMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
        Open menu
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>My Account</DropdownMenu.Label>
        <DropdownMenu.Separator />

        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <User className="size-4" aria-hidden />
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Settings className="size-4" aria-hidden />
            Settings
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Separator />

        <DropdownMenu.Item destructive>
          <Trash2 className="size-4" aria-hidden />
          Delete account
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const WithSubMenu: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
        Options
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>New tab</DropdownMenu.Item>
        <DropdownMenu.Item>New window</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More options</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Save as…</DropdownMenu.Item>
            <DropdownMenu.Item>Print…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>Close</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const WithCheckboxItems: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
        View
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>View options</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem checked>Status bar</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem checked={false}>Activity bar</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem>Panel</DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const WithRadioItems: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
        Theme
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>Appearance</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup value="system">
          <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}
