'use client'

import { Star, StarHalf } from 'lucide-react'
import { forwardRef } from 'react'

import { Icon, type IconProps } from '@/atoms/Icon'
import { flexVariants } from '@/atoms/layout/Flex'

import { getStarFill } from '../lib/getStarFill'

export interface StarRatingDisplayProps {
  value: number
  max: number
  size?: IconProps['size']
  label: string
  className?: string
}

/** @internal Read-only rendering — the `onRate`-less branch of the public `StarRating`. */
export const StarRatingDisplay = forwardRef<HTMLDivElement, StarRatingDisplayProps>(
  function StarRatingDisplay({ value, max, size, label, className }, ref) {
    return (
      <div
        ref={ref}
        role="img"
        aria-label={label}
        className={flexVariants({ gap: 'xs', className })}
      >
        {Array.from({ length: max }, (_, index) => index + 1).map((starPosition) => {
          const fill = getStarFill(value, starPosition)
          if (fill === 'empty') {
            return <Icon key={starPosition} icon={Star} size={size} intent="muted" />
          }
          return (
            <Icon
              key={starPosition}
              icon={fill === 'half' ? StarHalf : Star}
              size={size}
              intent="primary"
              className="fill-primary-400"
            />
          )
        })}
      </div>
    )
  }
)
