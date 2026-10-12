'use client'

import { Check, Minus } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { CheckboxIndicator } from './CheckboxIndicator'
import { CheckboxRoot } from './CheckboxRoot'

export const checkboxVariants = tv({
  base: [
    'flex shrink-0 items-center justify-center rounded border border-border bg-surface transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:border-primary-400 data-[state=checked]:bg-primary-400 data-[state=checked]:text-primary-foreground',
    'data-[state=indeterminate]:border-primary-400 data-[state=indeterminate]:bg-primary-400 data-[state=indeterminate]:text-primary-foreground',
  ],
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxRoot>, VariantProps<typeof checkboxVariants> {}

/**
 * Checkbox atom — Radix `Checkbox` with `role="checkbox"`, full keyboard support
 * and ARIA state. Supports the `indeterminate` state (renders a minus). Controlled
 * or uncontrolled.
 */
export const Checkbox = forwardRef<ElementRef<typeof CheckboxRoot>, CheckboxProps>(
  function Checkbox({ size, className, checked, ...props }, ref) {
    return (
      <CheckboxRoot
        ref={ref}
        checked={checked}
        className={checkboxVariants({ size, className })}
        {...props}
      >
        <CheckboxIndicator className="flex items-center justify-center text-current">
          {checked === 'indeterminate' ? (
            <Minus className="size-3" aria-hidden />
          ) : (
            <Check className="size-3" aria-hidden />
          )}
        </CheckboxIndicator>
      </CheckboxRoot>
    )
  }
)
