'use client'

import { Slot } from '@radix-ui/react-slot'
import { type AnchorHTMLAttributes, forwardRef } from 'react'

export interface SidebarItemRootProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Merge the item's props/ref onto the single child (a router `Link`/`NavLink`)
   * instead of rendering a native `<a>`, so navigation stays SPA.
   */
  asChild?: boolean
}

/**
 * @internal Marks which child of `SidebarItemRoot`'s `Slot` is the actual
 * navigation element (the router `Link`) so the icon/label siblings around it
 * render normally instead of being merged onto it. Re-exported so `SidebarItem`
 * never imports `@radix-ui/react-slot` directly (frontend-components.md §5).
 */
export { Slottable as SidebarItemSlottable } from '@radix-ui/react-slot'

/**
 * @internal Anchor-or-`Slot` primitive for `SidebarItem` — the ONLY file here
 * that imports `@radix-ui/react-slot`. `SidebarItem` layers the variants + the
 * active state on top (frontend-components.md §5).
 */
export const SidebarItemRoot = forwardRef<HTMLAnchorElement, SidebarItemRootProps>(
  function SidebarItemRoot({ asChild = false, ...props }, ref) {
    if (asChild) return <Slot ref={ref} {...props} />
    return <a ref={ref} {...props} />
  }
)
