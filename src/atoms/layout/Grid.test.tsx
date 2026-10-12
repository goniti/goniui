import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Grid } from './Grid'

describe('Grid — base class', () => {
  it('always renders the `grid` utility', () => {
    const { container } = render(<Grid>x</Grid>)
    expect(container.firstElementChild?.className).toContain('grid')
  })
})

describe('Grid — cols', () => {
  const columnCounts = [1, 2, 3, 4, 5, 6] as const
  for (const count of columnCounts) {
    it(`cols={{ base: ${count} }} → grid-cols-${count}`, () => {
      const { container } = render(<Grid cols={{ base: count }}>x</Grid>)
      expect(container.firstElementChild?.className).toContain(`grid-cols-${count}`)
    })
  }

  it('emits one prefixed class per declared breakpoint', () => {
    const { container } = render(<Grid cols={{ base: 1, sm: 2, lg: 4 }}>x</Grid>)
    const cls = container.firstElementChild?.className ?? ''
    expect(cls).toContain('grid-cols-1')
    expect(cls).toContain('sm:grid-cols-2')
    expect(cls).toContain('lg:grid-cols-4')
  })

  it('omits breakpoints that were not declared', () => {
    const { container } = render(<Grid cols={{ base: 1, md: 3 }}>x</Grid>)
    const cls = container.firstElementChild?.className ?? ''
    expect(cls).toContain('md:grid-cols-3')
    expect(cls).not.toContain('sm:grid-cols')
    expect(cls).not.toContain('lg:grid-cols')
    expect(cls).not.toContain('xl:grid-cols')
  })

  it('emits no column class at all when `cols` is omitted', () => {
    const { container } = render(<Grid>x</Grid>)
    expect(container.firstElementChild?.className).not.toContain('grid-cols')
  })
})

describe('Grid — gap variant', () => {
  it('gap="none" → gap-0', () => {
    const { container } = render(<Grid gap="none">x</Grid>)
    expect(container.firstElementChild?.className).toContain('gap-0')
  })

  it('gap="sm" → gap-2', () => {
    const { container } = render(<Grid gap="sm">x</Grid>)
    expect(container.firstElementChild?.className).toContain('gap-2')
  })

  it('gap="lg" → gap-4', () => {
    const { container } = render(<Grid gap="lg">x</Grid>)
    expect(container.firstElementChild?.className).toContain('gap-4')
  })

  it('gap="2xl" → gap-8', () => {
    const { container } = render(<Grid gap="2xl">x</Grid>)
    expect(container.firstElementChild?.className).toContain('gap-8')
  })
})

describe('Grid — place variant', () => {
  it('place="center" → place-items-center', () => {
    const { container } = render(<Grid place="center">x</Grid>)
    expect(container.firstElementChild?.className).toContain('place-items-center')
  })

  it('place="start" → place-items-start', () => {
    const { container } = render(<Grid place="start">x</Grid>)
    expect(container.firstElementChild?.className).toContain('place-items-start')
  })

  it('place="end" → place-items-end', () => {
    const { container } = render(<Grid place="end">x</Grid>)
    expect(container.firstElementChild?.className).toContain('place-items-end')
  })

  it('place="stretch" → place-items-stretch', () => {
    const { container } = render(<Grid place="stretch">x</Grid>)
    expect(container.firstElementChild?.className).toContain('place-items-stretch')
  })
})

describe('Grid — as prop', () => {
  it('as="section" renders a <section>', () => {
    const { container } = render(<Grid as="section">x</Grid>)
    expect(container.querySelector('section')).not.toBeNull()
    expect(container.querySelector('div')).toBeNull()
  })
})

describe('Grid — className merging', () => {
  it('a passed className survives and merges with variant classes', () => {
    const { container } = render(
      <Grid place="center" className="flex-1 px-6">
        x
      </Grid>
    )
    const cls = container.firstElementChild?.className ?? ''
    expect(cls).toContain('grid')
    expect(cls).toContain('place-items-center')
    expect(cls).toContain('flex-1')
    expect(cls).toContain('px-6')
  })
})
