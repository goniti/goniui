'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

import { useCarousel } from '../CarouselContext'

export const carouselItemVariants = tv({
  // basis-full = one slide per view; override with `basis-1/2` etc. With
  // border-box the slide stays exactly one view wide; the symmetric padding is
  // the inter-slide gap (8px each side → 16px between slides) and, being part of
  // the slide box, it survives Embla's loop reposition — unlike a CSS `gap`.
  base: 'min-w-0 shrink-0 grow-0 basis-full',
  variants: {
    orientation: { horizontal: 'px-2', vertical: 'py-2' },
  },
  defaultVariants: { orientation: 'horizontal' },
})

export type CarouselItemProps = HTMLAttributes<HTMLDivElement>

/**
 * A single carousel slide. Generic by design — layout and content are the
 * consumer's concern. For screen readers, pass a descriptive `aria-label`
 * (e.g. "Slide 1 of 4").
 */
export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(
  { className, children, ...props },
  ref
) {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={carouselItemVariants({ orientation, className })}
      {...props}
    >
      {children}
    </div>
  )
})
