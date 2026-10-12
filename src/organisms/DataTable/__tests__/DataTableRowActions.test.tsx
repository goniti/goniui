import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DataTableRowActions } from '../components/DataTableRowActions'

describe('DataTableRowActions', () => {
  it('renders only the edit button when no delete handler is given', () => {
    render(<DataTableRowActions onEdit={() => {}} labels={{ edit: 'Edit' }} />)

    expect(screen.getByRole('button', { name: 'Edit' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull()
  })

  it('calls onEdit and onDelete when their buttons are clicked', () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(
      <DataTableRowActions
        onEdit={onEdit}
        onDelete={onDelete}
        labels={{ edit: 'Edit', delete: 'Delete' }}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onEdit).toHaveBeenCalledOnce()
    expect(onDelete).toHaveBeenCalledOnce()
  })

  it('renders nothing when neither handler is given', () => {
    const { container } = render(<DataTableRowActions />)

    expect(container.querySelectorAll('button')).toHaveLength(0)
  })
})
