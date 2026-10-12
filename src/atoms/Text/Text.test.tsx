import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Text } from './Text'

describe('Text — default element from variant', () => {
  it('defaults the element to the variant semantics (no `as` needed)', () => {
    const cases: Array<[Parameters<typeof Text>[0]['variant'], string]> = [
      ['display', 'h1'],
      ['title', 'h2'],
      ['h1', 'h1'],
      ['h2', 'h2'],
      ['h3', 'h3'],
      ['bodyLg', 'p'],
      ['body', 'p'],
      ['bodySm', 'p'],
      ['label', 'span'],
      ['caption', 'span'],
    ]
    for (const [variant, tag] of cases) {
      const { container } = render(<Text variant={variant}>x</Text>)
      expect(container.querySelector(tag)).not.toBeNull()
    }
  })

  it('defaults to <p> when no variant is given', () => {
    const { container } = render(<Text>x</Text>)
    expect(container.querySelector('p')).not.toBeNull()
  })

  it('`as` overrides the default element (variant style on a chosen tag)', () => {
    const { container } = render(
      <Text as="span" variant="h1">
        x
      </Text>
    )
    expect(container.querySelector('span')).not.toBeNull()
    expect(container.querySelector('h1')).toBeNull()
  })
})
