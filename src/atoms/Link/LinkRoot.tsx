'use client'

import { Slot } from '@radix-ui/react-slot'
import { type AnchorHTMLAttributes, forwardRef } from 'react'

export interface LinkRootProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Merge the link's props/ref onto the single child element instead of
   * rendering a native `<a>` — for router links (`<Link asChild><NextLink …/></Link>`).
   */
  asChild?: boolean
}

/**
 * @internal The link primitive: a native `<a>`, or Radix `Slot` (`asChild`)
 * merged onto the child, preserving a11y + ref. This is the ONLY file that
 * imports the primitive (`@radix-ui/react-slot`) — `Link` layers variants/kind
 * on top. Same layering as `Button`/`ButtonRoot` (frontend-components.md §5).
 */
export const LinkRoot = forwardRef<HTMLAnchorElement, LinkRootProps>(function LinkRoot(
  { asChild = false, ...props },
  ref
) {
  if (asChild) {
    return <Slot ref={ref} {...props} />
  }
  return <a ref={ref} {...props} />
})
