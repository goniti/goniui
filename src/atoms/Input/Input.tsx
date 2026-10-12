'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/cn'

export const inputVariants = tv({
  base:
    'w-full rounded-lg border bg-surface text-base text-foreground placeholder:text-foreground-muted md:text-sm ' +
    'transition focus:outline-none focus:ring-2 disabled:opacity-50 ' +
    // Browser autofill keeps its tinted highlight; make the content dark so it stays
    // legible on it (text, caret, border all take --color-surface).
    'autofill:[-webkit-text-fill-color:var(--color-surface)] autofill:[caret-color:var(--color-surface)] ' +
    'autofill:border-surface autofill:focus:border-surface autofill:focus:ring-surface/20',
  variants: {
    state: {
      default: 'border-border focus:border-primary-400 focus:ring-primary-400/25',
      error: 'border-error focus:border-error focus:ring-error/25',
    },
  },
  defaultVariants: { state: 'default' },
})

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  /** Icon shown inside, on the left. */
  startIcon?: ReactNode
  /** Interactive slot inside, on the right (e.g. a password reveal button). */
  endSlot?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { state, startIcon, endSlot, className, ...props },
  ref
) {
  const padding = cn('py-2.5', startIcon ? 'pl-10' : 'pl-3.5', endSlot ? 'pr-10' : 'pr-3.5')
  return (
    <div className="relative">
      {startIcon && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted [&:has(~input:-webkit-autofill)]:text-surface"
        >
          {startIcon}
        </span>
      )}
      <input
        ref={ref}
        className={inputVariants({ state, className: cn(padding, className) })}
        {...props}
      />
      {endSlot && (
        <span className="absolute inset-y-0 right-0 grid w-10 place-items-center">{endSlot}</span>
      )}
    </div>
  )
})
