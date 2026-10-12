'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { CarouselArrow, type CarouselArrowVariant } from './CarouselArrow'

export interface CarouselNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CarouselArrowVariant
}

/**
 * Navigation button that scrolls to the next slide.
 * Disabled automatically when already at the end.
 *
 * Always pass a translated `aria-label` for production use.
 * The default `"Next slide"` is the English fallback until i18n lands.
 */
export const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  function CarouselNext(props, ref) {
    return <CarouselArrow ref={ref} direction="next" {...props} />
  }
)
