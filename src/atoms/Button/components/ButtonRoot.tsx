'use client'

import { Slot } from '@radix-ui/react-slot'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Merge the button's props/ref onto the single child element instead of
   * rendering a native `<button>` — for links, router `Link`s, or triggers
   * (`<Button asChild><a href=…/></Button>`).
   */
  asChild?: boolean
}

/**
 * @internal The vendored shadcn/Radix button primitive: a native `<button>`,
 * or Radix `Slot` (`asChild`) merged onto the child, preserving a11y + ref.
 *
 * This is the ONLY file that imports the primitive (`@radix-ui/react-slot`).
 * `Button` layers our variants/tokens on top; swap the implementation here
 * (shadcn/Radix today) without touching `Button`'s public API. See
 * frontend-components.md §5.
 */
export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(function ButtonRoot(
  { asChild = false, type, ...props },
  ref
) {
  if (asChild) {
    // The child owns the element (e.g. <a>), so we don't impose `type`.
    return <Slot ref={ref} {...props} />
  }
  return <button ref={ref} type={type ?? 'button'} {...props} />
})
