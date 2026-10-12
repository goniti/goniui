'use client'

import { Slot } from '@radix-ui/react-slot'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const segmentedControlItemVariants = tv({
  base:
    'flex flex-1 shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-3 py-2.5 ' +
    'text-center text-sm font-semibold transition-colors focus-visible:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-primary-400',
  variants: {
    active: {
      true: 'bg-primary-400 text-primary-foreground',
      false: 'text-foreground-muted hover:text-foreground',
    },
  },
  defaultVariants: { active: false },
})

export interface SegmentedControlItemProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof segmentedControlItemVariants> {
  /**
   * Render the segment as the single child element (a link, router `Link`, or a
   * static `<span>` for the current page) instead of a native `<button>`, so a
   * navigation segmented control keeps real anchors and correct semantics.
   */
  asChild?: boolean
}

/**
 * One segment. Defaults to a native `<button>`; pass `asChild` to render your
 * own element (an `<a>` for the other page, a `<span aria-current>` for the
 * current one). `active` paints the primary fill; every segment is centered and
 * fills its share of the row.
 */
export const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  function SegmentedControlItem({ asChild = false, active, type, className, ...props }, ref) {
    const classes = segmentedControlItemVariants({ active, className })
    if (asChild) {
      return <Slot ref={ref} className={classes} {...props} />
    }
    return <button ref={ref} type={type ?? 'button'} className={classes} {...props} />
  }
)
