'use client'

import { Fragment, type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const keyChipVariants = tv({
  // Drawn from the tooltip's own text colour (`currentColor`) instead of fixed
  // greys: the chip follows whatever surface it sits on, light or dark.
  base: 'inline-flex items-center justify-center rounded bg-current/15 px-1 py-0.5 font-mono text-xs font-medium',
})

export interface TooltipKeysChipProps {
  /** Array of key labels to render as kbd-style chips, e.g. `['G', 'B']`. */
  keys: string[]
  /** Rendered between chips — e.g. `"then"` for an ordered sequence, or `"+"`. */
  separator?: ReactNode
}

/** Renders key labels as kbd-style chips, optionally joined by a `separator`. */
export function TooltipKeysChip({ keys, separator }: TooltipKeysChipProps): ReactNode {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && separator != null ? (
            <span className="text-xs opacity-70">{separator}</span>
          ) : null}
          <kbd className={keyChipVariants()}>{key}</kbd>
        </Fragment>
      ))}
    </span>
  )
}
