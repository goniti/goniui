import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '../components/Skeleton'
import { SkeletonGroup } from '../components/SkeletonGroup'

describe('Skeleton', () => {
  it('renders aria-hidden on the root and shimmer bar', () => {
    const { container } = render(<Skeleton />)
    const root = container.querySelector('[data-slot="skeleton"]')
    const shimmer = container.querySelector('[data-slot="skeleton-shimmer"]')

    expect(root?.getAttribute('aria-hidden')).toBe('true')
    expect(shimmer?.getAttribute('aria-hidden')).toBe('true')
  })

  it('uses a compositor-friendly shimmer (translateX animation class, no pulse)', () => {
    const { container } = render(<Skeleton />)
    const shimmer = container.querySelector('[data-slot="skeleton-shimmer"]')

    expect(shimmer?.className).toContain('animate-skeleton-shimmer')
    expect(shimmer?.className).toContain('absolute')
    expect(shimmer?.className).not.toContain('animate-pulse')
  })

  it('renders the text variant as span by default', () => {
    const { container } = render(<Skeleton variant="text" />)
    expect(container.querySelector('span[data-slot="skeleton"]')).not.toBeNull()
  })

  it('renders the block variant as div by default', () => {
    const { container } = render(<Skeleton variant="block" />)
    expect(container.querySelector('div[data-slot="skeleton"]')).not.toBeNull()
  })

  it('allows as="span" for inline placeholders', () => {
    const { container } = render(
      <Skeleton as="span" variant="block" className="inline-block h-4 w-24" />
    )
    expect(container.querySelector('span[data-slot="skeleton"]')).not.toBeNull()
  })

  it('merges a consumer className for arbitrary dimensions', () => {
    const { container } = render(<Skeleton className="h-32 w-64" />)
    const el = container.querySelector('[data-slot="skeleton"]')

    expect(el?.className).toContain('h-32')
    expect(el?.className).toContain('w-64')
    expect(el?.className).toContain('overflow-hidden')
  })
})

describe('SkeletonGroup', () => {
  it('exposes aria-busy and role=status with a label', () => {
    const { container } = render(
      <SkeletonGroup label="Loading profile">
        <Skeleton variant="text" />
      </SkeletonGroup>
    )
    const group = container.querySelector('[data-slot="skeleton-group"]')

    expect(group?.getAttribute('aria-busy')).toBe('true')
    expect(group?.getAttribute('role')).toBe('status')
    expect(group?.getAttribute('aria-label')).toBe('Loading profile')
  })
})
