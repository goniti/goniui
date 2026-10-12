import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import * as Table from '../index'

const sampleRows = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'Editor' },
  { id: 3, name: 'Carla', role: 'Viewer' },
]

describe('Table compound', () => {
  it('renders a semantic table with header and body cells', () => {
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sampleRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )

    expect(screen.getByRole('table')).toBeTruthy()
    expect(screen.getAllByRole('rowgroup')).toHaveLength(2)
    expect(screen.getAllByRole('row')).toHaveLength(4)
    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
    expect(screen.getAllByRole('cell')).toHaveLength(6)
    expect(screen.getByText('Alice')).toBeTruthy()
    expect(screen.getByText('Editor')).toBeTruthy()
  })

  it('renders a sortable column header with neutral indicator when unsorted', () => {
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable onSort={vi.fn()}>
              Name
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>
    )

    const header = screen.getByRole('columnheader', { name: /name/i })
    expect(header.getAttribute('aria-sort')).toBe('none')
  })

  it('calls onSort with "asc" when clicking an unsorted sortable header', () => {
    const onSort = vi.fn()
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable onSort={onSort}>
              Name
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>
    )

    fireEvent.click(screen.getByRole('columnheader', { name: /name/i }))
    expect(onSort).toHaveBeenCalledOnce()
    expect(onSort).toHaveBeenCalledWith('asc')
  })

  it('calls onSort with "desc" when the column is already sorted asc', () => {
    const onSort = vi.fn()
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable sortDirection="asc" onSort={onSort}>
              Name
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>
    )

    const header = screen.getByRole('columnheader', { name: /name/i })
    expect(header.getAttribute('aria-sort')).toBe('ascending')

    fireEvent.click(header)
    expect(onSort).toHaveBeenCalledWith('desc')
  })

  it('sets aria-sort="descending" when sortDirection is "desc"', () => {
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable sortDirection="desc" onSort={vi.fn()}>
              Name
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>
    )

    expect(screen.getByRole('columnheader', { name: /name/i }).getAttribute('aria-sort')).toBe(
      'descending'
    )
  })

  it('non-sortable header has no aria-sort attribute', () => {
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>
    )

    const header = screen.getByRole('columnheader', { name: /status/i })
    expect(header.getAttribute('aria-sort')).toBeNull()
  })

  it('applies the sm size variant to the root', () => {
    const { container } = render(
      <Table.Root size="sm">
        <Table.Body />
      </Table.Root>
    )

    expect(container.querySelector('table')?.className).toContain('[&_td]:px-3')
  })

  it('applies striped class when Row striped prop is set', () => {
    const { container } = render(
      <Table.Root>
        <Table.Body>
          <Table.Row striped>
            <Table.Cell>Row 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    )

    const row = container.querySelector('tr')
    expect(row?.className).toContain('even:bg-surface-2/60')
  })

  it('does not call onSort when sortable is false', () => {
    const onSort = vi.fn()
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head onSort={onSort}>Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>
    )

    fireEvent.click(screen.getByRole('columnheader', { name: /name/i }))
    expect(onSort).not.toHaveBeenCalled()
  })
})
