import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Wordmark } from './Wordmark'

describe('Wordmark', () => {
  it('renders the lead and accent segments with their default tones', () => {
    render(<Wordmark lead="Word" accent="mark" />)
    expect(screen.getByText('Word').className).toContain('text-foreground')
    expect(screen.getByText('mark').className).toContain('text-foreground-muted')
    expect(screen.getByText('mark').className).not.toContain('dark:')
  })

  it('renders whatever brand text it is given — no hardcoded copy', () => {
    render(<Wordmark lead="Board" accent="Games" />)
    expect(screen.getByText('Board')).not.toBeNull()
    expect(screen.getByText('Games')).not.toBeNull()
  })

  it('merges a consumer className onto the outer element', () => {
    const { container } = render(<Wordmark lead="Word" accent="mark" className="opacity-50" />)
    expect(container.firstElementChild?.className).toContain('opacity-50')
  })
})
