import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from '../index'

describe('Checkbox', () => {
  it('renders a checkbox with its accessible name', () => {
    render(<Checkbox aria-label="Accept" />)
    expect(screen.getByRole('checkbox', { name: 'Accept' })).toBeTruthy()
  })

  it('reflects the checked state via aria-checked', () => {
    render(<Checkbox aria-label="Accept" checked />)
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('true')
  })

  it('reflects the indeterminate state via aria-checked="mixed"', () => {
    render(<Checkbox aria-label="Accept" checked="indeterminate" />)
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('mixed')
  })

  it('calls onCheckedChange when clicked', () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept" checked={false} onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('does not fire when disabled', () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept" disabled onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
