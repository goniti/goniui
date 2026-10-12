'use client'

import type { HTMLAttributes } from 'react'

/** Semantic block elements `Box` (and layout primitives) can render. */
export type BlockElement =
  | 'div'
  | 'section'
  | 'main'
  | 'header'
  | 'footer'
  | 'article'
  | 'aside'
  | 'nav'
  | 'ul'
  | 'ol'
  | 'li'

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  /**
   * The semantic HTML block element to render. Defaults to `div`.
   * Use this to give grouping containers the correct role in the document
   * outline (`section`, `main`, `header`, `footer`, `article`, `aside`, `nav`).
   */
  as?: BlockElement
}

/**
 * The base polymorphic block primitive. No layout opinions of its own — use
 * `Flex` or `Grid` when layout is the point. `Box` gives a meaningless `div`
 * its correct semantic element (`section`, `main`, …) and lets `className`
 * carry the one-off utilities that don't warrant a variant.
 *
 * Not `forwardRef`'d: the polymorphic `as` makes a single ref type unsound —
 * the documented exception for layout/typography primitives.
 */
export function Box({ as: Tag = 'div', ...props }: BoxProps) {
  return <Tag {...props} />
}
