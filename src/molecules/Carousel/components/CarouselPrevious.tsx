'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { CarouselArrow, type CarouselArrowVariant } from './CarouselArrow'

export interface CarouselPreviousProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CarouselArrowVariant
}

/**
 * Navigation button that scrolls to the previous slide.
 * Disabled automatically when already at the start.
 *
 * Always pass a translated `aria-label` for production use.
 * The default `"Previous slide"` is the English fallback until i18n lands.
 */
export const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  function CarouselPrevious(props, ref) {
    return <CarouselArrow ref={ref} direction="prev" {...props} />
  }
)
