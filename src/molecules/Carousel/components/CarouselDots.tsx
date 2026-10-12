'use client'

import { type HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'

import { useCarousel } from '../CarouselContext'

const DOT = 8 // px, the big dot box (w-2)
const GAP = 6 // px, gap-1.5
const PITCH = DOT + GAP // constant centre-to-centre step (sizing is scale-only, so layout never shifts)
const WINDOW = 3 // full-size reach each side of the active dot
const VISIBLE = 2 * WINDOW + 1 // dots framed by the clip
const CONTAINER = VISIBLE * PITCH - GAP

// Distance-from-active → scale. Layout-neutral (transform), so the strip keeps a
// constant pitch and only slides — that is what makes the transition smooth.
const SCALES = [1, 1, 0.75, 0.5]
const scaleFor = (distance: number) => SCALES[distance] ?? 0

const dotVariants = tv({
  base: 'h-2 w-2 rounded-full',
  variants: {
    active: { true: 'bg-primary-400', false: 'bg-foreground/25 group-hover:bg-foreground/40' },
  },
})

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export interface CarouselDotsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Accessible name for the dot group. */
  label?: string
  /** Per-dot accessible name. Default: "Go to slide N". */
  dotLabel?: (index: number) => string
}

/**
 * Instagram-style dynamic dots: size steps down with distance from the active
 * dot (big → medium → small), and the strip slides so the active stays centred,
 * clamped at the ends so the first/last dot rests big. Sizing is scale-only and
 * every dot stays mounted, so both the resize and the slide animate smoothly.
 */
export function CarouselDots({
  className,
  label = 'Slides',
  dotLabel = (index) => `Go to slide ${index + 1}`,
  ...props
}: CarouselDotsProps) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()
  if (scrollSnaps.length <= 1) return null

  const stripWidth = scrollSnaps.length * PITCH - GAP
  const centred = CONTAINER / 2 - (selectedIndex * PITCH + DOT / 2)
  const translate = clamp(centred, Math.min(0, CONTAINER - stripWidth), 0)

  return (
    <Flex role="group" aria-label={label} justify="center" className={className} {...props}>
      <Box className="overflow-hidden" style={{ width: Math.min(CONTAINER, stripWidth) }}>
        <Flex
          align="center"
          className="gap-1.5 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${translate}px)` }}
        >
          {scrollSnaps.map((_, index) => {
            const isActive = index === selectedIndex
            return (
              <Button
                key={index}
                variant="unstyled"
                size="none"
                aria-label={dotLabel(index)}
                aria-current={isActive || undefined}
                onClick={() => scrollTo(index)}
                className="group flex h-11 w-2 shrink-0 items-center justify-center transition-transform duration-300 ease-out"
                style={{ transform: `scale(${scaleFor(Math.abs(index - selectedIndex))})` }}
              >
                <span aria-hidden className={dotVariants({ active: isActive })} />
              </Button>
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}
