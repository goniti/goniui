import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Select } from './Select'
import { SelectOption } from './SelectOption'

describe('Select', () => {
  it('renders its options', () => {
    render(
      <Select aria-label="Category">
        <SelectOption value="drink">Boisson</SelectOption>
        <SelectOption value="snack">Snack</SelectOption>
      </Select>
    )

    const select = screen.getByRole('combobox', { name: 'Category' })
    expect(screen.getByRole('option', { name: 'Boisson' })).not.toBeNull()
    expect(screen.getByRole('option', { name: 'Snack' })).not.toBeNull()
    expect(select.tagName).toBe('SELECT')
  })

  it('forwards the ref to the native select element', () => {
    const ref = createRef<HTMLSelectElement>()
    render(
      <Select ref={ref} aria-label="Category">
        <SelectOption value="drink">Boisson</SelectOption>
      </Select>
    )

    expect(ref.current?.tagName).toBe('SELECT')
  })

  it('applies the error state classes and forwards aria-invalid', () => {
    render(
      <Select state="error" aria-invalid aria-label="Category">
        <SelectOption value="drink">Boisson</SelectOption>
      </Select>
    )

    const select = screen.getByRole('combobox', { name: 'Category' })
    expect(select.className).toContain('border-error')
    expect(select.getAttribute('aria-invalid')).toBe('true')
  })

  it('merges a passed className', () => {
    render(
      <Select className="w-40" aria-label="Category">
        <SelectOption value="drink">Boisson</SelectOption>
      </Select>
    )

    expect(screen.getByRole('combobox', { name: 'Category' }).className).toContain('w-40')
  })
})
