import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as NavigationMenu from '../index'

function renderMenu() {
  return render(
    <NavigationMenu.Root aria-label="Primary">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Produits</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#tokens">Design tokens</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#pricing"
            className={NavigationMenu.navigationMenuTriggerStyle()}
          >
            Tarifs
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

describe('NavigationMenu', () => {
  it('renders a labelled nav landmark', () => {
    renderMenu()
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy()
  })

  it('renders a trigger button and a top-level link', () => {
    renderMenu()
    expect(screen.getByRole('button', { name: /Produits/ })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Tarifs' }).getAttribute('href')).toBe('#pricing')
  })

  it('keeps the panel content collapsed until the trigger is activated', () => {
    renderMenu()
    expect(screen.queryByRole('link', { name: 'Design tokens' })).toBeNull()
  })

  it('gives the trigger the animated wipe underline, persisting while open', () => {
    renderMenu()
    const className = screen.getByRole('button', { name: /Produits/ }).className
    expect(className).toContain('after:origin-left')
    expect(className).toContain('hover:after:scale-x-100')
    expect(className).toContain('data-[state=open]:after:scale-x-100')
  })
})

describe('NavigationMenu — panel entrance contract', () => {
  it('opens the panel with a fade + rise, leaving room above for the arrow', () => {
    const className = NavigationMenu.navigationMenuViewportVariants()
    expect(className).toContain('mt-2.5')
    expect(className).toContain('data-[state=open]:animate-navigation-menu-in')
    expect(className).toContain('data-[state=closed]:animate-navigation-menu-out')
  })

  it('exposes the group hook the arrow keys its animation off', () => {
    expect(NavigationMenu.navigationMenuIndicatorVariants()).toContain('group/arrow')
  })

  it('rises the arrow in step with the panel, not rotating it', () => {
    const className = NavigationMenu.navigationMenuArrowVariants()
    // Stays a static 45° diamond — no rotation in the animation (Tailwind v4 keeps
    // `rotate` a separate property; animating it via transform double-rotated it).
    expect(className).toContain('rotate-45')
    expect(className).toContain('group-data-[state=visible]/arrow:animate-navigation-menu-arrow-in')
  })
})
