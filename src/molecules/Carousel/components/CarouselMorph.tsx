'use client'

import { type HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'

import { useCarousel } from '../CarouselContext'

const morphVariants = tv({
  base: 'h-2 rounded-full transition-all duration-300 ease-out',
  variants: {
    active: {
      true: 'w-6 bg-primary-400',
      false: 'w-2 bg-foreground/25 hover:bg-foreground/40',
    },
  },
})

export interface CarouselMorphProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Accessible name for the indicator group. */
  label?: string
  /** Per-segment accessible name. Default: "Go to slide N". */
  segmentLabel?: (index: number) => string
}

/**
 * Morphing indicator: the active segment elongates into a pill while the others
 * stay dots; the width transition makes the pill appear to slide/morph between
 * slides as `selectedIndex` changes (pure CSS, neighbours reflow under the
 * transition — no motion lib).
 */
export function CarouselMorph({
  className,
  label = 'Slides',
  segmentLabel = (index) => `Go to slide ${index + 1}`,
  ...props
}: CarouselMorphProps) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()
  if (scrollSnaps.length <= 1) return null

  return (
    <Flex
      role="group"
      aria-label={label}
      align="center"
      justify="center"
      gap="sm"
      className={className}
      {...props}
    >
      {scrollSnaps.map((_, index) => {
        const isActive = index === selectedIndex
        return (
          <Button
            key={index}
            variant="unstyled"
            size="none"
            aria-label={segmentLabel(index)}
            aria-current={isActive || undefined}
            onClick={() => scrollTo(index)}
            className={morphVariants({ active: isActive })}
          />
        )
      })}
    </Flex>
  )
}
