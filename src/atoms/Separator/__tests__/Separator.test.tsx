import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator } from '../components/Separator'

describe('Separator', () => {
  it('renders a decorative horizontal line by default', () => {
    const { container } = render(<Separator />)
    const el = container.querySelector('[data-slot="separator"]')

    expect(el).not.toBeNull()
    expect(el?.getAttribute('role')).toBe('none')
    expect(el?.getAttribute('data-orientation')).toBe('horizontal')
    expect(el?.className).toContain('h-px')
    expect(el?.className).toContain('w-full')
    expect(el?.className).toContain('bg-border')
  })

  it('renders a vertical separator when orientation is vertical', () => {
    const { container } = render(<Separator orientation="vertical" className="h-10" />)
    const el = container.querySelector('[data-slot="separator"]')

    expect(el?.getAttribute('data-orientation')).toBe('vertical')
    expect(el?.className).toContain('w-px')
    expect(el?.className).toContain('h-10')
  })

  it('exposes role="separator" when not decorative', () => {
    const { container } = render(<Separator decorative={false} />)
    const el = container.querySelector('[data-slot="separator"]')

    expect(el?.getAttribute('role')).toBe('separator')
  })

  it('merges a consumer className for contextual styling', () => {
    const { container } = render(<Separator className="absolute inset-x-8 bg-primary-600/30" />)
    const el = container.querySelector('[data-slot="separator"]')

    expect(el?.className).toContain('absolute')
    expect(el?.className).toContain('inset-x-8')
    expect(el?.className).toContain('bg-primary-600/30')
  })
})
