import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { brandIcons } from '../components/brand-icons'
import { Icon } from '../components/Icon'

describe('brand icons via the Icon atom', () => {
  it('exposes the social providers used by the auth theme', () => {
    for (const alias of [
      'google',
      'apple',
      'facebook',
      'github',
      'discord',
      'microsoft',
      'x',
      'twitter',
    ]) {
      expect(brandIcons[alias]).toBeTypeOf('function')
    }
  })

  it('renders a brand icon as an <svg> sized by the Icon atom', () => {
    const { container } = render(<Icon icon={brandIcons.google} aria-label="Google" />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    // size comes from the Icon atom (md = h-5 w-5), not a fixed width/height attr
    expect(svg?.getAttribute('class')).toContain('h-5')
    expect(svg?.getAttribute('width')).toBeNull()
  })

  it('keeps the multi-colour brand fills (Google logo stays 4-colour)', () => {
    const { container } = render(<Icon icon={brandIcons.google} aria-label="Google" />)
    const coloured = container.querySelectorAll('path[fill^="#"]')
    expect(coloured.length).toBeGreaterThan(1)
  })

  it('is labelled when given aria-label, decorative (aria-hidden) otherwise', () => {
    const labelled = render(<Icon icon={brandIcons.apple} aria-label="Apple" />)
    expect(labelled.container.querySelector('svg')?.getAttribute('aria-label')).toBe('Apple')
    expect(labelled.container.querySelector('svg')?.getAttribute('aria-hidden')).toBeNull()

    const decorative = render(<Icon icon={brandIcons.apple} />)
    expect(decorative.container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })
})
