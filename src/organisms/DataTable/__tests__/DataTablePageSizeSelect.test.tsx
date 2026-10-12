import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type ColumnDef, DataTable } from '../index'

interface Person {
  name: string
}

const people: Person[] = Array.from({ length: 5 }, (_, index) => ({ name: `Person ${index + 1}` }))
const columns: ColumnDef<Person>[] = [{ accessorKey: 'name', header: 'Name' }]

function openMenu(trigger: HTMLElement) {
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' })
  fireEvent.click(trigger)
}

function bodyRowCount() {
  return screen.getAllByRole('row').length - 1
}

describe('DataTablePageSizeSelect', () => {
  it('shows the current page size on the trigger', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enablePagination
        pageSize={2}
        enablePageSizeSelector
        pageSizeLabel="Rows per page"
      />
    )

    expect(screen.getByRole('button', { name: 'Rows per page : 2' })).toBeTruthy()
    expect(bodyRowCount()).toBe(2)
  })

  it('changes the page size and reflows the row count when an option is picked', async () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enablePagination
        pageSize={2}
        enablePageSizeSelector
        pageSizeOptions={[2, 10]}
        pageSizeLabel="Rows per page"
      />
    )

    openMenu(screen.getByRole('button', { name: 'Rows per page : 2' }))

    const option = await screen.findByRole('menuitemradio', { name: '10' })
    fireEvent.click(option)

    await waitFor(() => expect(bodyRowCount()).toBe(5))
  })

  it('includes the current page size even when missing from pageSizeOptions', async () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enablePagination
        pageSize={3}
        enablePageSizeSelector
        pageSizeOptions={[10, 20, 50]}
        pageSizeLabel="Rows per page"
      />
    )

    openMenu(screen.getByRole('button', { name: 'Rows per page : 3' }))

    const checkedOption = await screen.findByRole('menuitemradio', { name: '3' })
    expect(checkedOption.getAttribute('aria-checked')).toBe('true')
  })

  it('renders no page-size trigger when the selector is disabled', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enablePagination
        pageSize={2}
      />
    )

    expect(screen.queryByRole('button', { name: /rows per page/i })).toBeNull()
  })
})
