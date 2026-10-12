'use client'

import { forwardRef, type HTMLAttributes, type KeyboardEvent, useCallback } from 'react'
import { tv } from 'tailwind-variants'

import {
  CarouselContext,
  type CarouselContextValue,
  type CarouselOrientation,
} from '../CarouselContext'
import {
  type CarouselAutoplay,
  type CarouselOptions,
  useCarouselEngine,
} from '../hooks/useCarouselEngine'

export const carouselRootVariants = tv({
  base: 'relative',
})

export interface CarouselRootProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Scroll axis. Horizontal (default) is the standard slideshow layout.
   * Vertical requires a fixed height on the viewport.
   */
  orientation?: CarouselOrientation
  /** Wrap around at the edges (infinite scroll). Off by default. */
  loop?: boolean
  /** Auto-advance the slides. `true` for defaults, or Embla Autoplay options. */
  autoplay?: CarouselAutoplay
  /** Escape hatch for any other Embla option (align, dragFree, slidesToScroll…). */
  opts?: CarouselOptions
}

const PREV_KEYS: Record<CarouselOrientation, string> = {
  horizontal: 'ArrowLeft',
  vertical: 'ArrowUp',
}
const NEXT_KEYS: Record<CarouselOrientation, string> = {
  horizontal: 'ArrowRight',
  vertical: 'ArrowDown',
}

/**
 * Carousel root — owns the Embla engine (drag/touch/trackpad/loop) and a
 * keyboard listener (←/→ or ↑/↓), exposed via context. Renders as a
 * `role="region"` with `aria-roledescription="carousel"`; pass `aria-label`
 * for screen readers.
 *
 * Compose with: `Viewport`, `Item`, `Previous`/`Next`, `Dots`, `Morph`.
 */
export const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>(function CarouselRoot(
  { orientation = 'horizontal', loop = false, autoplay, opts, className, children, ...props },
  ref
) {
  const engine = useCarouselEngine(orientation, { loop, ...opts }, autoplay)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === PREV_KEYS[orientation]) {
        event.preventDefault()
        engine.scrollPrev()
      } else if (event.key === NEXT_KEYS[orientation]) {
        event.preventDefault()
        engine.scrollNext()
      }
    },
    [orientation, engine]
  )

  const ctx: CarouselContextValue = { ...engine, orientation }

  return (
    <CarouselContext.Provider value={ctx}>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        className={carouselRootVariants({ className })}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
