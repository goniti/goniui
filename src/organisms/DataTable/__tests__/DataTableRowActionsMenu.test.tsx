import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DataTableRowActionsMenu } from '../components/DataTableRowActionsMenu'

function openMenu(trigger: HTMLElement) {
  // Radix DropdownMenu listens to pointerdown on the trigger button.
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' })
  fireEvent.click(trigger)
}

describe('DataTableRowActionsMenu', () => {
  it('opens the menu and lists every action', async () => {
    render(
      <DataTableRowActionsMenu
        label="Actions"
        actions={[
          { label: 'Edit', onSelect: () => {} },
          { label: 'Dupliquer', onSelect: () => {} },
          { label: 'Archiver', onSelect: () => {} },
          { label: 'Delete', onSelect: () => {}, destructive: true },
        ]}
      />
    )

    openMenu(screen.getByRole('button', { name: 'Actions' }))

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeTruthy()
      expect(screen.getByRole('menuitem', { name: 'Dupliquer' })).toBeTruthy()
      expect(screen.getByRole('menuitem', { name: 'Archiver' })).toBeTruthy()
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeTruthy()
    })
  })

  it('calls the matching action callback when an item is selected', async () => {
    const onDelete = vi.fn()
    render(
      <DataTableRowActionsMenu
        label="Actions"
        actions={[
          { label: 'Edit', onSelect: () => {} },
          { label: 'Delete', onSelect: onDelete, destructive: true },
        ]}
      />
    )

    openMenu(screen.getByRole('button', { name: 'Actions' }))

    const deleteItem = await screen.findByRole('menuitem', { name: 'Delete' })
    fireEvent.click(deleteItem)

    expect(onDelete).toHaveBeenCalledOnce()
  })
})
