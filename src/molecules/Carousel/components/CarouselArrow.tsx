'use client'

import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'

import { useCarousel } from '../CarouselContext'

export type CarouselDirection = 'prev' | 'next'
export type CarouselArrowVariant = 'ghost' | 'solid'

export interface CarouselArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: CarouselDirection
  /**
   * `ghost` (default) shows just the chevron with a background on press;
   * `solid` is a permanent pill (for sliders where the arrows sit over peeking
   * slides and need contrast).
   */
  variant?: CarouselArrowVariant
}

export const carouselArrowVariants = tv({
  // The h-9/w-9 round box is the hit area; `variant` controls its chrome.
  base: 'absolute top-1/2 h-9 w-9 -translate-y-1/2 rounded-full text-foreground disabled:opacity-40',
  variants: {
    direction: { prev: 'left-2', next: 'right-2' },
    variant: {
      ghost: 'active:bg-foreground/15',
      solid: 'border border-border bg-surface hover:bg-surface-2 active:bg-foreground/15',
    },
  },
  defaultVariants: { variant: 'ghost' },
})

const DIRECTION: Record<
  CarouselDirection,
  {
    icon: LucideIcon
    defaultLabel: string
    scrollKey: 'scrollPrev' | 'scrollNext'
    canScrollKey: 'canScrollPrev' | 'canScrollNext'
  }
> = {
  prev: {
    icon: ChevronLeft,
    defaultLabel: 'Previous slide',
    scrollKey: 'scrollPrev',
    canScrollKey: 'canScrollPrev',
  },
  next: {
    icon: ChevronRight,
    defaultLabel: 'Next slide',
    scrollKey: 'scrollNext',
    canScrollKey: 'canScrollNext',
  },
}

/**
 * @internal Shared nav control — the public surface is `Carousel.Previous` /
 * `Carousel.Next` (thin wrappers over this). Routes through the `Button` atom
 * (`variant="unstyled"`) per the lib convention; the pill chrome + edge
 * positioning live in `carouselArrowVariants`, keyed on `direction`.
 *
 * The default English label is a fallback until i18n lands — always pass a
 * translated `aria-label` in production.
 */
export const CarouselArrow = forwardRef<HTMLButtonElement, CarouselArrowProps>(
  function CarouselArrow(
    { direction, variant, className, 'aria-label': ariaLabel, onClick, ...props },
    ref
  ) {
    const carousel = useCarousel()
    const { icon, defaultLabel, scrollKey, canScrollKey } = DIRECTION[direction]

    return (
      <Button
        ref={ref}
        variant="unstyled"
        size="none"
        aria-label={ariaLabel ?? defaultLabel}
        disabled={!carousel[canScrollKey]}
        onClick={(event) => {
          carousel[scrollKey]()
          onClick?.(event)
        }}
        className={carouselArrowVariants({ direction, variant, className })}
        {...props}
      >
        <Icon icon={icon} size="md" intent="current" aria-hidden />
      </Button>
    )
  }
)
