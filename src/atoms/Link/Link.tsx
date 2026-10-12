'use client'

import { type AnchorHTMLAttributes, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { LinkRoot, type LinkRootProps } from './LinkRoot'

export const linkVariants = tv({
  // Structural + a11y only (focus ring) — colour chrome lives in the variants
  // so `unstyled` can opt out entirely (same layering as buttonVariants).
  base:
    'inline-flex items-center rounded-sm transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
  variants: {
    variant: {
      default:
        'text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300',
      muted: 'text-foreground-muted hover:text-foreground',
      underline:
        'text-primary-700 underline underline-offset-4 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300',
      nav: 'font-medium text-foreground/90 hover:text-foreground',
      ghost:
        'border border-transparent text-foreground-muted transition-colors ' +
        'hover:border-foreground/10 hover:bg-foreground/5 hover:text-foreground',
      /** No colour chrome — for callers that fully own the look via `className`. */
      unstyled: '',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

/** Drives target/rel (not overridable). Defaults to `external`. */
export type LinkKind = 'internal' | 'external'

const kindAttrs: Record<
  LinkKind,
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>
> = {
  /** Same-app `<a href>`. In the CMS, prefer react-router `Link` / `NavLink` for SPA nav. */
  internal: {},
  /** Outbound URL in a new tab — always `noopener noreferrer`. */
  external: { target: '_blank', rel: 'noopener noreferrer' },
}

export interface LinkProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'referrerPolicy'>,
    Pick<LinkRootProps, 'asChild'>,
    VariantProps<typeof linkVariants> {
  href: string
  kind?: LinkKind
}

/**
 * Styled anchor atom. Defaults to `kind="external"` (new tab + secure rel).
 * `asChild` merges the styles/attrs onto the single child instead (e.g. a
 * router link) — rendering is delegated to `LinkRoot` (frontend-components §5).
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { kind = 'external', variant, size, className, ...props },
  ref
) {
  return (
    <LinkRoot
      ref={ref}
      className={linkVariants({ variant, size, className })}
      {...kindAttrs[kind]}
      {...props}
    />
  )
})
