'use client'

import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { ButtonRoot, type ButtonRootProps } from './ButtonRoot'

export const buttonVariants = tv({
  // Structural + a11y only (focus ring, disabled handling). Visual chrome
  // (rounding, weight, colours, padding) lives in the variants so `unstyled`
  // can opt out entirely.
  base:
    'inline-flex items-center justify-center transition-all ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ' +
    'disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      // rounded-xl + bold primary: the main call to action.
      // Every text colour state (base/hover × light/dark) is spelled out, incl.
      // repeating the same value under `dark:`/`hover:` — with `asChild`, this
      // is the *last* className tailwind-variants merges in, so it's the only
      // thing that can evict a slotted child's own colour classes (e.g. Link's
      // `dark:text-primary-400`) via tailwind-merge, which never cancels across
      // different modifiers on its own.
      primary:
        'rounded-xl font-bold bg-primary-400 text-primary-foreground dark:text-primary-foreground ' +
        'hover:bg-primary-300 hover:text-primary-foreground dark:hover:text-primary-foreground',
      /** Danger actions (delete, cancel a deletion). Solid red, darker on hover —
       * the focus ring is red to match. */
      destructive:
        'rounded-xl font-medium bg-error text-white dark:text-white hover:bg-error/90 ' +
        'hover:text-white dark:hover:text-white focus-visible:ring-error/50',
      // Token-backed (not neutral-*/white): readable in both themes.
      secondary:
        'rounded-xl font-medium border border-border bg-surface text-foreground dark:text-foreground ' +
        'hover:bg-foreground/5 hover:text-foreground dark:hover:text-foreground',
      ghost:
        'rounded-xl font-medium text-foreground-muted dark:text-foreground-muted ' +
        'hover:bg-foreground/5 hover:text-foreground dark:hover:text-foreground',
      /**
       * No chrome — only the structural + a11y base. For specialized interactive
       * surfaces (calendar cells, drum picker, date segments, tabs) that own
       * their visuals via `className`. Pair with `size="none"`.
       */
      unstyled: '',
    },
    size: {
      sm: 'min-h-11 px-3 py-1.5 text-sm md:min-h-0',
      md: 'min-h-11 px-4 py-2 text-sm md:min-h-0',
      /** No padding/text sizing — pair with `variant="unstyled"`. */
      none: '',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export interface ButtonProps extends ButtonRootProps, VariantProps<typeof buttonVariants> {}

/**
 * The library's button — the single adapter our app imports. Owns the variant
 * API and our tokens, and delegates rendering to `ButtonRoot` (the vendored
 * shadcn/Radix primitive). Never renders a raw element itself, so the underlying
 * lib can be swapped in `ButtonRoot` without touching consumers.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, ...props },
  ref
) {
  return (
    <ButtonRoot ref={ref} className={buttonVariants({ variant, size, className })} {...props} />
  )
})
