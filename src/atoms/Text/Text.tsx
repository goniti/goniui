'use client'

import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const textVariants = tv({
  base: '',
  variants: {
    // `variant` = the typographic role (size / weight / leading + a default colour).
    variant: {
      display: 'font-display text-4xl font-bold leading-tight tracking-tight text-foreground',
      title: 'font-display text-3xl font-bold leading-tight text-foreground',
      h1: 'font-display text-2xl font-bold text-foreground',
      h2: 'font-display text-xl font-bold text-foreground',
      h3: 'font-display text-lg font-semibold text-foreground',
      bodyLg: 'text-base text-foreground',
      body: 'text-sm text-foreground',
      bodySm: 'text-xs text-foreground',
      label: 'text-sm font-medium text-foreground',
      caption: 'text-xs text-foreground-muted',
    },
    // `tone` overrides only the colour (applied after `variant`, so it wins).
    tone: {
      default: '',
      muted: 'text-foreground-muted',
      subtle: 'text-foreground-muted',
      primary: 'text-primary-700',
      error: 'text-error',
      inverse: 'text-white',
      /** Muted text on a primary/dark surface (e.g. the story panel). */
      inverseMuted: 'text-primary-100',
      /** Keep the inherited colour (e.g. contextual banners, dark surfaces). */
      inherit: 'text-inherit',
    },
  },
  defaultVariants: { variant: 'body', tone: 'default' },
})

/** Semantic elements `Text` can render. Polymorphic via `as`. */
// Semantic text elements only — `div` is layout/grouping, not typography.
type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'label' | 'strong'

/**
 * The semantic element each `variant` renders **by default** — so the DOM stays
 * correct (real `<h1>`, screen-reader headings, document outline) without anyone
 * remembering to pass `as`. Override `as` only to deliberately put a variant's
 * style on a different tag.
 */
const DEFAULT_ELEMENT = {
  display: 'h1',
  title: 'h2',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  bodyLg: 'p',
  body: 'p',
  bodySm: 'p',
  label: 'span',
  caption: 'span',
} satisfies Record<string, TextElement>

export interface TextProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  /** Override the semantic element. Defaults to the one implied by `variant`. */
  as?: TextElement
}

/**
 * Polymorphic semantic typography. `variant` picks the style **and** the default
 * element (h1 → `<h1>`, body → `<p>`, label → `<span>`…), so the semantics are
 * right out of the box. `as` overrides the element when you deliberately want a
 * variant's style on a different tag; `tone` overrides the colour. Token-backed:
 * never hardcode sizes/colours, render text through this atom.
 *
 * Not `forwardRef`'d: typography is non-interactive and the polymorphic `as`
 * makes a single ref type unsound — the documented exception to the ref rule.
 */
export function Text({ as, variant, tone, className, ...props }: TextProps) {
  const Tag = as ?? DEFAULT_ELEMENT[variant ?? 'body']
  return <Tag className={textVariants({ variant, tone, className })} {...props} />
}
