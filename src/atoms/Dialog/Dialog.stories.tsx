import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/atoms/Button'

import * as Dialog from './index'

const meta = {
  title: 'Atoms/Dialog',
  component: Dialog.Root,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Confirm action</Dialog.Title>
        <Dialog.Description className="mt-2">
          Are you sure you want to proceed? This action cannot be undone.
        </Dialog.Description>
        <div className="mt-6 flex justify-end gap-3">
          <Dialog.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Confirm</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const Small: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open small dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content size="sm">
        <Dialog.Title>Delete item</Dialog.Title>
        <Dialog.Description className="mt-2">
          This item will be permanently removed.
        </Dialog.Description>
        <div className="mt-6 flex justify-end gap-3">
          <Dialog.Close asChild>
            <Button variant="ghost">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Delete</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const Large: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open large dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content size="lg">
        <Dialog.Title>Terms of service</Dialog.Title>
        <Dialog.Description className="mt-2">
          Please read and accept the terms of service before continuing.
        </Dialog.Description>
        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
          ultrices aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc vel nisl.
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Dialog.Close asChild>
            <Button variant="secondary">Decline</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Accept</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const Controlled: Story = {
  render: function ControlledDialog() {
    const [open, setOpen] = useState(false)
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button>Open (controlled)</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Controlled dialog</Dialog.Title>
          <Dialog.Description className="mt-2">
            This dialog is controlled externally via <code>open</code> / <code>onOpenChange</code>.
          </Dialog.Description>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
}
