import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from '../components/Switch'

describe('Switch', () => {
  it('renders with role="switch"', () => {
    render(<Switch aria-label="Toggle feature" />)
    expect(screen.getByRole('switch', { name: /toggle feature/i })).toBeTruthy()
  })

  it('is unchecked by default', () => {
    render(<Switch aria-label="Toggle" />)
    const control = screen.getByRole('switch')
    expect(control.getAttribute('aria-checked')).toBe('false')
    expect(control.getAttribute('data-state')).toBe('unchecked')
  })

  it('toggles state on click (uncontrolled)', () => {
    render(<Switch aria-label="Toggle" />)
    const control = screen.getByRole('switch')

    fireEvent.click(control)
    expect(control.getAttribute('aria-checked')).toBe('true')
    expect(control.getAttribute('data-state')).toBe('checked')

    fireEvent.click(control)
    expect(control.getAttribute('aria-checked')).toBe('false')
  })

  it('respects defaultChecked', () => {
    render(<Switch defaultChecked aria-label="Toggle" />)
    const control = screen.getByRole('switch')
    expect(control.getAttribute('aria-checked')).toBe('true')
    expect(control.getAttribute('data-state')).toBe('checked')
  })

  it('calls onCheckedChange when toggled', () => {
    const handleChange = vi.fn()
    render(<Switch aria-label="Toggle" onCheckedChange={handleChange} />)

    fireEvent.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledOnce()
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('does not toggle when disabled', () => {
    const handleChange = vi.fn()
    render(<Switch disabled aria-label="Toggle" onCheckedChange={handleChange} />)

    const control = screen.getByRole('switch')
    fireEvent.click(control)
    expect(handleChange).not.toHaveBeenCalled()
    expect(control.getAttribute('aria-checked')).toBe('false')
  })

  it('is controlled when checked + onCheckedChange are provided', () => {
    const handleChange = vi.fn()
    render(<Switch checked={false} onCheckedChange={handleChange} aria-label="Toggle" />)

    const control = screen.getByRole('switch')
    expect(control.getAttribute('aria-checked')).toBe('false')

    fireEvent.click(control)
    expect(handleChange).toHaveBeenCalledWith(true)
    // State stays false because it is controlled (no state update here)
    expect(control.getAttribute('aria-checked')).toBe('false')
  })

  it('applies size variant classes to the root', () => {
    const { rerender } = render(<Switch size="sm" aria-label="Toggle" />)
    let control = screen.getByRole('switch')
    expect(control.className).toContain('h-4')
    expect(control.className).toContain('w-7')

    rerender(<Switch size="lg" aria-label="Toggle" />)
    control = screen.getByRole('switch')
    expect(control.className).toContain('h-6')
    expect(control.className).toContain('w-11')
  })

  it('merges an extra className onto the root', () => {
    render(<Switch className="custom-class" aria-label="Toggle" />)
    expect(screen.getByRole('switch').className).toContain('custom-class')
  })
})
