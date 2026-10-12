import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Flex } from './Flex'

describe('Flex — base class', () => {
  it('always renders the `flex` utility', () => {
    const { container } = render(<Flex>x</Flex>)
    expect(container.firstElementChild?.className).toContain('flex')
  })
})

describe('Flex — direction variant', () => {
  it('direction="row" → flex-row', () => {
    const { container } = render(<Flex direction="row">x</Flex>)
    expect(container.firstElementChild?.className).toContain('flex-row')
  })

  it('direction="col" → flex-col', () => {
    const { container } = render(<Flex direction="col">x</Flex>)
    expect(container.firstElementChild?.className).toContain('flex-col')
  })

  it('direction="rowReverse" → flex-row-reverse', () => {
    const { container } = render(<Flex direction="rowReverse">x</Flex>)
    expect(container.firstElementChild?.className).toContain('flex-row-reverse')
  })

  it('direction="colReverse" → flex-col-reverse', () => {
    const { container } = render(<Flex direction="colReverse">x</Flex>)
    expect(container.firstElementChild?.className).toContain('flex-col-reverse')
  })
})

describe('Flex — align variant', () => {
  it('align="center" → items-center', () => {
    const { container } = render(<Flex align="center">x</Flex>)
    expect(container.firstElementChild?.className).toContain('items-center')
  })

  it('align="start" → items-start', () => {
    const { container } = render(<Flex align="start">x</Flex>)
    expect(container.firstElementChild?.className).toContain('items-start')
  })

  it('align="end" → items-end', () => {
    const { container } = render(<Flex align="end">x</Flex>)
    expect(container.firstElementChild?.className).toContain('items-end')
  })

  it('align="stretch" → items-stretch', () => {
    const { container } = render(<Flex align="stretch">x</Flex>)
    expect(container.firstElementChild?.className).toContain('items-stretch')
  })

  it('align="baseline" → items-baseline', () => {
    const { container } = render(<Flex align="baseline">x</Flex>)
    expect(container.firstElementChild?.className).toContain('items-baseline')
  })
})

describe('Flex — justify variant', () => {
  it('justify="center" → justify-center', () => {
    const { container } = render(<Flex justify="center">x</Flex>)
    expect(container.firstElementChild?.className).toContain('justify-center')
  })

  it('justify="between" → justify-between', () => {
    const { container } = render(<Flex justify="between">x</Flex>)
    expect(container.firstElementChild?.className).toContain('justify-between')
  })

  it('justify="end" → justify-end', () => {
    const { container } = render(<Flex justify="end">x</Flex>)
    expect(container.firstElementChild?.className).toContain('justify-end')
  })
})

describe('Flex — wrap variant', () => {
  it('wrap="wrap" → flex-wrap', () => {
    const { container } = render(<Flex wrap="wrap">x</Flex>)
    expect(container.firstElementChild?.className).toContain('flex-wrap')
  })

  it('wrap="nowrap" → flex-nowrap', () => {
    const { container } = render(<Flex wrap="nowrap">x</Flex>)
    expect(container.firstElementChild?.className).toContain('flex-nowrap')
  })
})

describe('Flex — gap variant', () => {
  it('gap="none" → gap-0', () => {
    const { container } = render(<Flex gap="none">x</Flex>)
    expect(container.firstElementChild?.className).toContain('gap-0')
  })

  it('gap="xs" → gap-1', () => {
    const { container } = render(<Flex gap="xs">x</Flex>)
    expect(container.firstElementChild?.className).toContain('gap-1')
  })

  it('gap="sm" → gap-2', () => {
    const { container } = render(<Flex gap="sm">x</Flex>)
    expect(container.firstElementChild?.className).toContain('gap-2')
  })

  it('gap="md" → gap-3', () => {
    const { container } = render(<Flex gap="md">x</Flex>)
    expect(container.firstElementChild?.className).toContain('gap-3')
  })

  it('gap="lg" → gap-4', () => {
    const { container } = render(<Flex gap="lg">x</Flex>)
    expect(container.firstElementChild?.className).toContain('gap-4')
  })

  it('gap="xl" → gap-6', () => {
    const { container } = render(<Flex gap="xl">x</Flex>)
    expect(container.firstElementChild?.className).toContain('gap-6')
  })

  it('gap="2xl" → gap-8', () => {
    const { container } = render(<Flex gap="2xl">x</Flex>)
    expect(container.firstElementChild?.className).toContain('gap-8')
  })
})

describe('Flex — composed variants', () => {
  it('direction="col" + gap="lg" → flex flex-col gap-4', () => {
    const { container } = render(
      <Flex direction="col" gap="lg">
        x
      </Flex>
    )
    const cls = container.firstElementChild?.className ?? ''
    expect(cls).toContain('flex')
    expect(cls).toContain('flex-col')
    expect(cls).toContain('gap-4')
  })
})

describe('Flex — as prop', () => {
  it('as="section" renders a <section>', () => {
    const { container } = render(<Flex as="section">x</Flex>)
    expect(container.querySelector('section')).not.toBeNull()
    expect(container.querySelector('div')).toBeNull()
  })
})

describe('Flex — className merging', () => {
  it('a passed className survives and merges with variant classes', () => {
    const { container } = render(<Flex className="min-h-screen">x</Flex>)
    const cls = container.firstElementChild?.className ?? ''
    expect(cls).toContain('flex')
    expect(cls).toContain('min-h-screen')
  })
})
