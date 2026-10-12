import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type ColumnDef, DataTable } from '../index'

interface Person {
  name: string
  role: string
}

const people: Person[] = [
  { name: 'Carla', role: 'Viewer' },
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'Editor' },
]

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name', meta: { filterLabel: 'Filter by name' } },
  { accessorKey: 'role', header: 'Role', meta: { filterLabel: 'Filter by role' } },
]

function bodyRowNames(): string[] {
  const [, body] = screen.getAllByRole('rowgroup')
  return within(body)
    .getAllByRole('row')
    .map((row) => within(row).getAllByRole('cell')[0]?.textContent ?? '')
}

describe('DataTable', () => {
  // @dnd-kit mounts a hidden announcement node as a direct child of its
  // DndContext. Rendered inside <table>, that <div> breaks the table content
  // model (only caption/colgroup/thead/tbody/tfoot allowed) — React says so in
  // the console, and it is invalid HTML either way (#783).
  it('keeps the drag-and-drop nodes out of the <table>', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={people}
        enableColumnReordering
        enableRowReordering
        getRowId={(person) => person.name}
      />
    )

    const table = container.querySelector('table')
    expect(table).not.toBeNull()
    expect(table?.querySelectorAll(':scope > div')).toHaveLength(0)
  })

  it('renders a header and one body row per data item', () => {
    render(<DataTable columns={columns} data={people} />)

    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
    expect(bodyRowNames()).toEqual(['Carla', 'Alice', 'Bob'])
  })

  it('sorts ascending by column when its header is clicked', () => {
    render(<DataTable columns={columns} data={people} />)

    const header = screen.getByRole('columnheader', { name: /name/i })
    fireEvent.click(header)

    expect(header.getAttribute('aria-sort')).toBe('ascending')
    expect(bodyRowNames()).toEqual(['Alice', 'Bob', 'Carla'])
  })

  it('toggles to descending on a second click', () => {
    render(<DataTable columns={columns} data={people} />)

    const header = screen.getByRole('columnheader', { name: /name/i })
    fireEvent.click(header)
    fireEvent.click(header)

    expect(header.getAttribute('aria-sort')).toBe('descending')
    expect(bodyRowNames()).toEqual(['Carla', 'Bob', 'Alice'])
  })

  it('clears sorting back to the original order on a third click', () => {
    render(<DataTable columns={columns} data={people} />)

    const header = screen.getByRole('columnheader', { name: /name/i })
    fireEvent.click(header)
    fireEvent.click(header)
    fireEvent.click(header)

    expect(header.getAttribute('aria-sort')).toBe('none')
    expect(bodyRowNames()).toEqual(['Carla', 'Alice', 'Bob'])
  })

  it('filters rows via the global search field', async () => {
    render(<DataTable columns={columns} data={people} searchLabel="Search" searchDebounceMs={0} />)

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'ali' } })

    await waitFor(() => expect(bodyRowNames()).toEqual(['Alice']))
  })

  it('filters rows via a per-column filter input opened from its trigger', async () => {
    render(
      <DataTable columns={columns} data={people} enableGlobalFilter={false} enableColumnFilters />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Filter by role' }))

    const input = await screen.findByRole('textbox', { name: 'Filter by role' })
    fireEvent.change(input, { target: { value: 'admin' } })

    expect(bodyRowNames()).toEqual(['Alice'])
  })

  it('filters via a faceted column filter and moves picked options out of the list', async () => {
    const facetedColumns: ColumnDef<Person>[] = [
      columns[0],
      {
        accessorKey: 'role',
        header: 'Role',
        filterFn: (row, columnId, filterValue: string[]) =>
          !filterValue?.length || filterValue.includes(row.getValue<string>(columnId)),
        meta: {
          filterLabel: 'Filter by role',
          filterVariant: 'faceted',
          filterOptions: ['Admin', 'Editor', 'Viewer'],
          filterOptionRemoveLabel: (option) => `Remove ${option}`,
        },
      },
    ]

    render(
      <DataTable
        columns={facetedColumns}
        data={people}
        enableGlobalFilter={false}
        enableColumnFilters
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Filter by role' }))

    const adminOption = await screen.findByRole('button', { name: 'Admin' })
    fireEvent.click(adminOption)

    expect(bodyRowNames()).toEqual(['Alice'])
    expect(screen.queryByRole('button', { name: 'Admin' })).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Remove Admin' }))

    expect(bodyRowNames()).toEqual(['Carla', 'Alice', 'Bob'])
    expect(screen.getByRole('button', { name: 'Admin' })).toBeTruthy()
  })

  it('renders no column filter trigger when column filters are disabled', () => {
    render(<DataTable columns={columns} data={people} />)

    expect(screen.queryByRole('button', { name: 'Filter by name' })).toBeNull()
  })

  it('renders no search field when global filter is disabled', () => {
    render(<DataTable columns={columns} data={people} enableGlobalFilter={false} />)

    expect(screen.queryByRole('searchbox')).toBeNull()
  })

  it('renders the column-visibility trigger when enabled', () => {
    render(
      <DataTable columns={columns} data={people} enableColumnVisibility columnsLabel="Columns" />
    )

    expect(screen.getByRole('button', { name: 'Columns' })).toBeTruthy()
  })

  it('renders a resize handle per column when resizing is enabled', () => {
    render(<DataTable columns={columns} data={people} enableColumnResizing resizeLabel="Resize" />)

    expect(screen.getAllByLabelText('Resize')).toHaveLength(2)
  })

  it('renders no resize handles when resizing is disabled', () => {
    render(<DataTable columns={columns} data={people} resizeLabel="Resize" />)

    expect(screen.queryAllByLabelText('Resize')).toHaveLength(0)
  })

  it('renders a drag handle per row when row reordering is enabled', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enableRowReordering
        getRowId={(person) => person.name}
        onReorder={() => {}}
        rowDragLabel="Move row"
      />
    )

    expect(screen.getAllByLabelText('Move row')).toHaveLength(people.length)
  })

  it('renders a reorder grip per column when column reordering is enabled', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enableColumnReordering
        columnDragLabel="Reorder"
      />
    )

    expect(screen.getAllByLabelText('Reorder')).toHaveLength(columns.length)
  })

  it('renders selection checkboxes and selects all rows at once', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enableRowSelection
        selectAllLabel="Select all"
        selectRowLabel="Select row"
      />
    )

    expect(screen.getAllByLabelText('Select row')).toHaveLength(people.length)

    fireEvent.click(screen.getByLabelText('Select all'))

    screen
      .getAllByLabelText('Select row')
      .forEach((checkbox) => expect(checkbox.getAttribute('aria-checked')).toBe('true'))
  })

  it('marks the header checkbox indeterminate when only some rows are selected', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enableRowSelection
        selectAllLabel="Select all"
        selectRowLabel="Select row"
      />
    )

    fireEvent.click(screen.getAllByLabelText('Select row')[0])

    expect(screen.getByLabelText('Select all').getAttribute('aria-checked')).toBe('mixed')
    expect(screen.getAllByLabelText('Select row')[0].getAttribute('aria-checked')).toBe('true')
    expect(screen.getAllByLabelText('Select row')[1].getAttribute('aria-checked')).toBe('false')
  })

  it('clears selection for all rows when select-all is toggled off', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enableRowSelection
        selectAllLabel="Select all"
        selectRowLabel="Select row"
      />
    )

    const selectAll = screen.getByLabelText('Select all')
    fireEvent.click(selectAll)
    fireEvent.click(selectAll)

    screen
      .getAllByLabelText('Select row')
      .forEach((checkbox) => expect(checkbox.getAttribute('aria-checked')).toBe('false'))
  })

  it('paginates rows client-side', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        enablePagination
        pageSize={2}
      />
    )

    const [, body] = screen.getAllByRole('rowgroup')
    expect(within(body).getAllByRole('row')).toHaveLength(2)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })

  it('renders skeleton rows while loading', () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        enableGlobalFilter={false}
        isLoading
        skeletonRowCount={3}
      />
    )

    const [, body] = screen.getAllByRole('rowgroup')
    expect(within(body).getAllByRole('row')).toHaveLength(3)
    expect(screen.queryByText('Carla')).toBeNull()
  })

  it('shows the empty state when there are no rows', () => {
    render(<DataTable columns={columns} data={[]} emptyState="No results" />)

    expect(screen.getByText('No results')).toBeTruthy()
  })

  it('shows the empty state when the search matches nothing', async () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        searchLabel="Search"
        emptyState="No results"
        searchDebounceMs={0}
      />
    )

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzz' } })

    await waitFor(() => expect(screen.getByText('No results')).toBeTruthy())
  })
})
