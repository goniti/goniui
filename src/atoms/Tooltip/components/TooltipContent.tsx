'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { TooltipPortal } from './TooltipPortal'

export const tooltipContentVariants = tv({
  base: [
    'z-[var(--z-popover)] max-w-xs rounded-md px-2 py-1',
    'bg-surface-inverse text-foreground-inverse text-xs leading-snug shadow-md',
    'will-change-[transform,opacity]',
    'data-[state=delayed-open]:data-[side=top]:animate-tooltip-in-from-bottom',
    'data-[state=delayed-open]:data-[side=bottom]:animate-tooltip-in-from-top',
    'data-[state=delayed-open]:data-[side=left]:animate-tooltip-in-from-right',
    'data-[state=delayed-open]:data-[side=right]:animate-tooltip-in-from-left',
    'data-[state=closed]:animate-tooltip-out',
  ],
})

export interface TooltipContentProps
  extends
    ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

/**
 * Styled tooltip content panel, automatically rendered inside a portal.
 * Receives `sideOffset` (default 6px) and all other Radix Content props.
 */
export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <TooltipPortal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={tooltipContentVariants({ className })}
        {...props}
      />
    </TooltipPortal>
  )
})
