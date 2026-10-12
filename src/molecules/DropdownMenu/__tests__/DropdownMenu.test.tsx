import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as DropdownMenu from '../index'

function openMenu(trigger: HTMLElement) {
  // Radix DropdownMenu listens to pointerdown on the trigger button.
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' })
  fireEvent.click(trigger)
}

function BasicDropdown({ onSelect }: { onSelect?: () => void }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={onSelect}>Action one</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Disabled action</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

describe('DropdownMenu', () => {
  it('renders the trigger and opens the menu on click', async () => {
    render(<BasicDropdown />)

    const trigger = screen.getByRole('button', { name: /open/i })
    expect(trigger).toBeTruthy()
    expect(screen.queryByRole('menu')).toBeNull()

    openMenu(trigger)

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeTruthy()
    })
  })

  it('lists all items when the menu is open', async () => {
    render(<BasicDropdown />)
    openMenu(screen.getByRole('button', { name: /open/i }))

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /action one/i })).toBeTruthy()
      expect(screen.getByRole('menuitem', { name: /disabled action/i })).toBeTruthy()
      expect(screen.getByRole('menuitem', { name: /delete/i })).toBeTruthy()
    })
  })

  it('marks the disabled item as aria-disabled', async () => {
    render(<BasicDropdown />)
    openMenu(screen.getByRole('button', { name: /open/i }))

    await waitFor(async () => {
      const disabled = screen.getByRole('menuitem', { name: /disabled action/i })
      expect(disabled.getAttribute('data-disabled')).toBe('')
    })
  })

  it('applies destructive variant class to the delete item', async () => {
    render(<BasicDropdown />)
    openMenu(screen.getByRole('button', { name: /open/i }))

    await waitFor(() => {
      const deleteItem = screen.getByRole('menuitem', { name: /delete/i })
      expect(deleteItem.className).toContain('text-error-600')
    })
  })

  it('renders a separator between groups', async () => {
    render(<BasicDropdown />)
    openMenu(screen.getByRole('button', { name: /open/i }))

    await waitFor(() => {
      expect(screen.getByRole('separator')).toBeTruthy()
    })
  })

  it('renders a label', async () => {
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Section title</DropdownMenu.Label>
          <DropdownMenu.Item>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    openMenu(screen.getByRole('button', { name: /open/i }))
    await waitFor(() => {
      expect(screen.getByText('Section title')).toBeTruthy()
    })
  })

  it('renders checkbox items with correct role', async () => {
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.CheckboxItem checked>Option A</DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem checked={false}>Option B</DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    openMenu(screen.getByRole('button', { name: /open/i }))

    await waitFor(() => {
      const checked = screen.getByRole('menuitemcheckbox', { name: /option a/i })
      expect(checked.getAttribute('aria-checked')).toBe('true')

      const unchecked = screen.getByRole('menuitemcheckbox', { name: /option b/i })
      expect(unchecked.getAttribute('aria-checked')).toBe('false')
    })
  })

  it('renders radio items with correct role and checked state', async () => {
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.RadioGroup value="b">
            <DropdownMenu.RadioItem value="a">Option A</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="b">Option B</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    openMenu(screen.getByRole('button', { name: /open/i }))

    await waitFor(() => {
      const radioA = screen.getByRole('menuitemradio', { name: /option a/i })
      const radioB = screen.getByRole('menuitemradio', { name: /option b/i })

      expect(radioA.getAttribute('aria-checked')).toBe('false')
      expect(radioB.getAttribute('aria-checked')).toBe('true')
    })
  })

  it('ships animation classes on the content panel', async () => {
    render(<BasicDropdown />)
    openMenu(screen.getByRole('button', { name: /open/i }))

    await waitFor(() => {
      const content = screen.getByRole('menu')
      expect(content.className).toContain('data-[state=open]:animate-in')
      expect(content.className).toContain('data-[state=closed]:animate-out')
    })
  })
})
