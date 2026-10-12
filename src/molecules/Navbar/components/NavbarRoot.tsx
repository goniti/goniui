'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Flex } from '@/atoms/layout/Flex'

export const navbarVariants = tv({
  base: 'w-full bg-surface',
  variants: {
    /**
     * Pins the bar to the top of the viewport and lifts it above page content.
     * Apply when the navbar should scroll with a fixed position.
     */
    sticky: { true: 'sticky top-0 z-[var(--z-navbar)]' },
    /** Adds a bottom border to visually separate the navbar from page content. */
    bordered: { true: 'border-b border-border' },
  },
})

export interface NavbarRootProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof navbarVariants> {}

/**
 * The top app-bar shell — a `<header>` banner that owns the bar layout (a centred
 * flex row) and the `sticky`/`bordered` chrome. Compose `Navbar.Brand`, the
 * navigation itself (a `NavigationMenu` — the single nav-links widget, simple or
 * mega-menu), and `Navbar.Actions` inside.
 */
export const NavbarRoot = forwardRef<HTMLElement, NavbarRootProps>(function NavbarRoot(
  { sticky, bordered, className, children, ...props },
  ref
) {
  return (
    <header ref={ref} className={navbarVariants({ sticky, bordered, className })} {...props}>
      <Flex
        align="center"
        justify="between"
        className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {children}
      </Flex>
    </header>
  )
})
