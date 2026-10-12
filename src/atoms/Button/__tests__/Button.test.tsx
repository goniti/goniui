import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Link } from '../../Link/Link'
import { Button, type ButtonProps } from '../components/Button'

describe('Button', () => {
  it('renders a native button defaulting to type="button"', () => {
    render(<Button>Click</Button>)
    const button = screen.getByRole('button', { name: 'Click' })
    expect(button.tagName).toBe('BUTTON')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('applies the primary variant chrome by default', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByRole('button', { name: 'Primary' })
    expect(button.className).toContain('bg-primary-400')
    expect(button.className).toContain('rounded-xl')
    expect(button.className).toContain('font-bold')
  })

  it('renders the ghost variant without a solid background', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole('button', { name: 'Ghost' })
    expect(button.className).not.toContain('bg-primary-400')
    expect(button.className).toContain('rounded-xl')
  })

  it('unstyled variant drops all chrome but keeps the a11y base', () => {
    render(
      <Button variant="unstyled" size="none">
        Bare
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Bare' })
    expect(button.className).not.toContain('rounded-xl')
    expect(button.className).not.toContain('font-medium')
    expect(button.className).not.toContain('bg-primary-400')
    expect(button.className).not.toContain('px-4')
    // a11y/structural base is still present
    expect(button.className).toContain('inline-flex')
    expect(button.className).toContain('focus-visible:ring-2')
    expect(button.className).toContain('disabled:pointer-events-none')
  })

  it('merges a passed className over the variant defaults', () => {
    render(
      <Button variant="unstyled" size="none" className="h-9 w-9 rounded-full">
        X
      </Button>
    )
    const button = screen.getByRole('button', { name: 'X' })
    expect(button.className).toContain('h-9')
    expect(button.className).toContain('rounded-full')
  })

  it('renders as its child element when asChild is set (Slot adapter)', () => {
    render(
      <Button asChild variant="primary">
        <a href="/somewhere">Link button</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Link button' })
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe('/somewhere')
    expect(link.className).toContain('bg-primary-400')
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('forwards the ref to the underlying button', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('passes through native props (onClick, disabled)', () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Disabled' }) as HTMLButtonElement
    expect(button.disabled).toBe(true)
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Button asChild + Link colour ownership', () => {
  // Link's own `default` variant (base/hover × light/dark) — none of these may
  // survive on the rendered element once a Button owns the colour.
  const LINK_DEFAULT_COLOUR_CLASSES = [
    'text-primary-700',
    'dark:text-primary-400',
    'hover:text-primary-800',
    'dark:hover:text-primary-300',
  ]

  const OWNED_VARIANTS: { variant: ButtonProps['variant']; ownClass: string }[] = [
    { variant: 'primary', ownClass: 'text-primary-foreground' },
    { variant: 'destructive', ownClass: 'text-white' },
    { variant: 'secondary', ownClass: 'text-foreground' },
    { variant: 'ghost', ownClass: 'text-foreground-muted' },
  ]

  for (const { variant, ownClass } of OWNED_VARIANTS) {
    it(`gives the ${variant} button's colour to a slotted Link — none of Link's own colour classes leak through`, () => {
      render(
        <Button asChild variant={variant}>
          <Link kind="internal" href="/somewhere">
            Go
          </Link>
        </Button>
      )
      const link = screen.getByRole('link', { name: 'Go' })
      for (const colourClass of LINK_DEFAULT_COLOUR_CLASSES) {
        expect(link.className).not.toContain(colourClass)
      }
      expect(link.className).toContain(ownClass)
    })
  }
})
