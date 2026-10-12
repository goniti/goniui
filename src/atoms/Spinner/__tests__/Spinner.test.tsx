import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from '../components/Spinner'

describe('Spinner', () => {
  it('renders with role="status" and default aria-label', () => {
    const { container } = render(<Spinner />)
    const el = container.querySelector('[data-slot="spinner"]')

    expect(el).not.toBeNull()
    expect(el?.getAttribute('role')).toBe('status')
    expect(el?.getAttribute('aria-label')).toBe('Loading…')
    expect(el?.getAttribute('aria-live')).toBe('polite')
  })

  it('accepts a custom aria-label', () => {
    const { container } = render(<Spinner aria-label="Loading" />)
    const el = container.querySelector('[data-slot="spinner"]')

    expect(el?.getAttribute('aria-label')).toBe('Loading')
  })

  it('renders nothing when loading is false', () => {
    const { container } = render(<Spinner loading={false} />)
    expect(container.querySelector('[data-slot="spinner"]')).toBeNull()
  })

  it('renders a visual indicator inside the status wrapper', () => {
    const { container } = render(<Spinner size="md" />)
    const wrapper = container.querySelector('[data-slot="spinner"]')

    expect(wrapper?.childElementCount).toBe(1)
    expect(wrapper?.querySelector('[aria-hidden]')).not.toBeNull()
  })

  it('applies wrapper className', () => {
    const { container } = render(<Spinner className="mt-4" />)
    const el = container.querySelector('[data-slot="spinner"]')

    expect(el?.className).toContain('mt-4')
    expect(el?.className).toContain('inline-flex')
  })
})
