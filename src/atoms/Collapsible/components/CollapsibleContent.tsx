'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { Box } from '@/atoms/layout/Box'

export const collapsibleContentVariants = tv({
  base: [
    'overflow-hidden',
    'data-[state=open]:animate-collapsible-down',
    'data-[state=closed]:animate-collapsible-up',
  ],
})

export type CollapsibleContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>

/**
 * Radix collapsible panel with height/opacity animation via `--radix-collapsible-content-height`.
 *
 * Padding/borders MUST stay off the animated element: Radix animates its `height` to 0, but
 * a `padding-bottom` is not part of that height — it keeps the box ~1 row tall until Radix
 * sets `hidden`, then it snaps shut without animation. To make that misuse impossible, the
 * animated element carries only `overflow-hidden` + the keyframes, and the consumer's
 * `className`/`children` land on an inner `Box` that the animated container clips smoothly.
 */
export const CollapsibleContent = forwardRef<
  ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(function CollapsibleContent({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content ref={ref} className={collapsibleContentVariants()} {...props}>
      <Box className={className}>{children}</Box>
    </CollapsiblePrimitive.Content>
  )
})
