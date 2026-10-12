import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Link } from './Link'

describe('Link', () => {
  it('defaults to external with _blank and noopener noreferrer', () => {
    render(<Link href="https://example.com">External</Link>)
    const anchor = screen.getByRole('link', { name: 'External' })
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders internal link without target or rel', () => {
    render(
      <Link kind="internal" href="/docs">
        Documentation
      </Link>
    )
    const anchor = screen.getByRole('link', { name: 'Documentation' })
    expect(anchor.getAttribute('href')).toBe('/docs')
    expect(anchor.getAttribute('target')).toBeNull()
    expect(anchor.getAttribute('rel')).toBeNull()
  })

  it('renders explicit external link with _blank and noopener noreferrer', () => {
    render(
      <Link kind="external" href="https://example.com">
        External
      </Link>
    )
    const anchor = screen.getByRole('link', { name: 'External' })
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('merges custom className', () => {
    render(
      <Link kind="internal" href="#" className="font-bold">
        Bold
      </Link>
    )
    expect(screen.getByRole('link').className).toContain('font-bold')
  })
})

describe('Link asChild', () => {
  it('renders the child element instead of an anchor, merging className', () => {
    render(
      <Link kind="internal" href="/docs" asChild className="extra-class">
        <span role="link" tabIndex={0}>
          Routed
        </span>
      </Link>
    )
    const routed = screen.getByRole('link', { name: 'Routed' })
    expect(routed.tagName).toBe('SPAN')
    expect(routed.className).toContain('extra-class')
  })

  it('keeps rendering a plain anchor without asChild', () => {
    render(
      <Link kind="internal" href="/docs">
        Plain
      </Link>
    )
    expect(screen.getByRole('link', { name: 'Plain' }).tagName).toBe('A')
  })
})

describe('Link unstyled variant', () => {
  it('applies no colour chrome so the caller fully owns the look', () => {
    render(
      <Link kind="internal" href="/docs" variant="unstyled">
        Bare
      </Link>
    )
    expect(screen.getByRole('link', { name: 'Bare' }).className).not.toContain('text-primary-700')
  })
})
