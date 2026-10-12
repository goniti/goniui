'use client'

import { Star } from 'lucide-react'
import { type ElementRef, forwardRef, useId, useState } from 'react'

import { Icon, type IconProps } from '@/atoms/Icon'
import { flexVariants } from '@/atoms/layout/Flex'

import { StarRatingGroupItem } from './StarRatingGroupItem'
import { StarRatingGroupRoot } from './StarRatingGroupRoot'

export interface StarRatingInteractiveProps {
  value: number
  max: number
  size?: IconProps['size']
  label: string
  starLabels: string[]
  onRate: (value: number) => void
  disabled?: boolean
  className?: string
}

/** @internal Interactive rendering — the `onRate` branch of the public `StarRating`. */
export const StarRatingInteractive = forwardRef<
  ElementRef<typeof StarRatingGroupRoot>,
  StarRatingInteractiveProps
>(function StarRatingInteractive(
  { value, max, size, label, starLabels, onRate, disabled, className },
  ref
) {
  const groupId = useId()
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const displayValue = hoveredValue ?? value

  return (
    <StarRatingGroupRoot
      ref={ref}
      aria-label={label}
      value={String(value)}
      disabled={disabled}
      onValueChange={(nextValue) => onRate(Number(nextValue))}
      onPointerLeave={() => setHoveredValue(null)}
      className={flexVariants({ gap: 'xs', className })}
    >
      {Array.from({ length: max }, (_, index) => index + 1).map((starValue) => {
        const isFilled = starValue <= displayValue
        return (
          <StarRatingGroupItem
            key={`${groupId}-${starValue}`}
            value={String(starValue)}
            aria-label={starLabels[starValue - 1]}
            onPointerEnter={() => setHoveredValue(starValue)}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon
              icon={Star}
              size={size}
              intent={isFilled ? 'primary' : 'muted'}
              className={isFilled ? 'fill-primary-400' : undefined}
            />
          </StarRatingGroupItem>
        )
      })}
    </StarRatingGroupRoot>
  )
})
