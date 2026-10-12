'use client'

import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { SwitchRoot } from './SwitchRoot'
import { SwitchThumb } from './SwitchThumb'

export const switchVariants = tv({
  slots: {
    root: [
      'inline-flex shrink-0 items-center rounded-full border-2 border-transparent',
      'transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=unchecked]:bg-foreground/20',
      'data-[state=checked]:bg-primary-400',
    ],
    thumb: [
      'pointer-events-none block rounded-full bg-surface shadow-sm ring-0',
      'transition-transform duration-200',
      'data-[state=unchecked]:translate-x-0',
    ],
  },
  variants: {
    size: {
      sm: {
        root: 'h-4 w-7',
        thumb: 'size-3 data-[state=checked]:translate-x-3',
      },
      md: {
        root: 'h-5 w-9',
        thumb: 'size-4 data-[state=checked]:translate-x-4',
      },
      lg: {
        root: 'h-6 w-11',
        thumb: 'size-5 data-[state=checked]:translate-x-5',
      },
    },
  },
  defaultVariants: { size: 'md' },
})

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchRoot>, VariantProps<typeof switchVariants> {}

/**
 * Toggle switch atom — Radix `Switch` with `role="switch"`, full keyboard
 * support and ARIA state management. Controlled or uncontrolled.
 */
export const Switch = forwardRef<ElementRef<typeof SwitchRoot>, SwitchProps>(function Switch(
  { size, className, ...props },
  ref
) {
  const { root, thumb } = switchVariants({ size })

  return (
    <SwitchRoot ref={ref} className={root({ className })} {...props}>
      <SwitchThumb className={thumb()} />
    </SwitchRoot>
  )
})
