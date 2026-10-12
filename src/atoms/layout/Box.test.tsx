import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Box } from './Box'

describe('Box', () => {
  it('renders a <div> by default', () => {
    const { container } = render(<Box>content</Box>)
    expect(container.querySelector('div')).not.toBeNull()
  })

  it('renders the element specified by `as`', () => {
    const elements = ['section', 'main', 'header', 'footer', 'article', 'aside', 'nav'] as const
    for (const element of elements) {
      const { container } = render(<Box as={element}>content</Box>)
      expect(container.querySelector(element)).not.toBeNull()
    }
  })

  it('forwards className to the element', () => {
    const { container } = render(<Box className="p-4 bg-white">content</Box>)
    expect(container.firstElementChild?.className).toBe('p-4 bg-white')
  })

  it('spreads arbitrary HTML attributes', () => {
    const { container } = render(
      <Box id="root" data-testid="box">
        content
      </Box>
    )
    const el = container.firstElementChild
    expect(el?.getAttribute('id')).toBe('root')
    expect(el?.getAttribute('data-testid')).toBe('box')
  })

  it('renders children', () => {
    const { getByText } = render(<Box>hello world</Box>)
    expect(getByText('hello world')).not.toBeNull()
  })
})
