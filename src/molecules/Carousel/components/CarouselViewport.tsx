'use client'

import { type HTMLAttributes } from 'react'

import { Flex } from '@/atoms/layout/Flex'

import { useCarousel } from '../CarouselContext'

export interface CarouselViewportProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: HTMLAttributes<HTMLDivElement>['children']
}

/**
 * The Embla viewport: an `overflow-hidden` wrapper carrying the engine ref, with
 * a flex track of `CarouselItem`s inside. Inter-slide spacing comes from each
 * item's symmetric padding (see `CarouselItem`), not a CSS `gap` — padding
 * travels with the slide when Embla loops, so the seam between the last and
 * first slide keeps its gap. `className` styles the track, so sizing the carousel
 * (e.g. a fixed `h-48` for vertical) lands where Embla measures it. Do not nest
 * another scroll container.
 */
export function CarouselViewport({ className, children, ...props }: CarouselViewportProps) {
  const { emblaRef, orientation } = useCarousel()

  return (
    <div ref={emblaRef} className="overflow-hidden" {...props}>
      <Flex direction={orientation === 'vertical' ? 'col' : 'row'} className={className}>
        {children}
      </Flex>
    </div>
  )
}
