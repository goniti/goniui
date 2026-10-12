'use client'

import type { EmblaViewportRefType } from 'embla-carousel-react'
import { createContext, useContext } from 'react'

export type CarouselOrientation = 'horizontal' | 'vertical'

export interface CarouselContextValue {
  /** Callback ref from Embla — attached to the viewport container. */
  emblaRef: EmblaViewportRefType
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  /** Index of the snap currently in view. */
  selectedIndex: number
  /** One entry per snap point — its length is the indicator dot count. */
  scrollSnaps: number[]
  scrollTo: (index: number) => void
  orientation: CarouselOrientation
}

export const CarouselContext = createContext<CarouselContextValue | null>(null)

export function useCarousel(): CarouselContextValue {
  const ctx = useContext(CarouselContext)
  if (!ctx) throw new Error('useCarousel must be used within Carousel.Root')
  return ctx
}
