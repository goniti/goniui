import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as Navbar from '../index'

describe('Navbar.Root', () => {
  it('renders a <header> banner shell', () => {
    const { container } = render(<Navbar.Root>content</Navbar.Root>)
    expect(container.querySelector('header')).not.toBeNull()
  })

  it('applies sticky variant classes when sticky is true', () => {
    const { container } = render(<Navbar.Root sticky>content</Navbar.Root>)
    expect(container.querySelector('header')?.className).toContain('sticky')
  })

  it('applies bordered variant classes when bordered is true', () => {
    const { container } = render(<Navbar.Root bordered>content</Navbar.Root>)
    expect(container.querySelector('header')?.className).toContain('border-b')
  })

  it('forwards a custom className', () => {
    const { container } = render(<Navbar.Root className="custom-class">content</Navbar.Root>)
    expect(container.querySelector('header')?.className).toContain('custom-class')
  })
})

describe('Navbar.Brand', () => {
  it('renders its children', () => {
    render(<Navbar.Brand>Brand</Navbar.Brand>)
    expect(screen.getByText('Brand')).toBeDefined()
  })

  it('applies shrink-0 so it does not shrink', () => {
    const { container } = render(<Navbar.Brand>Logo</Navbar.Brand>)
    expect((container.firstChild as HTMLElement).className).toContain('shrink-0')
  })
})

describe('Navbar.Actions', () => {
  it('renders its children', () => {
    const { container } = render(
      <Navbar.Actions>
        <button>Sign in</button>
      </Navbar.Actions>
    )
    expect(container.querySelector('button')?.textContent).toBe('Sign in')
  })

  it('applies gap utility so children are spaced', () => {
    const { container } = render(
      <Navbar.Actions>
        <button>A</button>
      </Navbar.Actions>
    )
    expect((container.firstChild as HTMLElement).className).toContain('gap-3')
  })
})

describe('Navbar composition', () => {
  it('renders the shell with brand + actions without errors', () => {
    const { container } = render(
      <Navbar.Root bordered>
        <Navbar.Brand>Brand</Navbar.Brand>
        <Navbar.Actions>
          <button>Sign in</button>
        </Navbar.Actions>
      </Navbar.Root>
    )
    expect(container.querySelector('header')).not.toBeNull()
    expect(screen.getByText('Brand')).toBeDefined()
    expect(container.querySelector('button')?.textContent).toBe('Sign in')
  })
})
