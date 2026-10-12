import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PaginationPageSize } from '../components/PaginationPageSize'

function openMenu(trigger: HTMLElement) {
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' })
  fireEvent.click(trigger)
}

const OPTIONS = [20, 50, 100] as const

describe('PaginationPageSize', () => {
  it('renders without a Pagination.Root and names the trigger with the current value', () => {
    render(
      <PaginationPageSize value={20} options={OPTIONS} onValueChange={vi.fn()} label="Per page" />
    )
    expect(screen.getByRole('button', { name: 'Per page : 20' })).toBeTruthy()
  })

  it('lists every option with the current one checked', async () => {
    render(
      <PaginationPageSize value={50} options={OPTIONS} onValueChange={vi.fn()} label="Per page" />
    )
    openMenu(screen.getByRole('button', { name: 'Per page : 50' }))

    await waitFor(() => {
      expect(screen.getAllByRole('menuitemradio')).toHaveLength(3)
    })
    const checked = screen
      .getAllByRole('menuitemradio')
      .find((item) => item.getAttribute('aria-checked') === 'true')
    expect(checked?.textContent).toBe('50')
  })

  it('calls onValueChange with a number when an option is picked', async () => {
    const onValueChange = vi.fn()
    render(
      <PaginationPageSize
        value={20}
        options={OPTIONS}
        onValueChange={onValueChange}
        label="Per page"
      />
    )
    openMenu(screen.getByRole('button', { name: 'Per page : 20' }))

    fireEvent.click(await screen.findByRole('menuitemradio', { name: '100' }))

    expect(onValueChange).toHaveBeenCalledWith(100)
  })
})
