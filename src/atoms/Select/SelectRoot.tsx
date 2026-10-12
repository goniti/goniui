'use client'

import { forwardRef, type SelectHTMLAttributes } from 'react'

export type SelectRootProps = SelectHTMLAttributes<HTMLSelectElement>

/**
 * @internal — the ONLY file that renders `<select>`. All consumers go through
 * the public `Select` adapter which owns variants/tokens.
 */
export const SelectRoot = forwardRef<HTMLSelectElement, SelectRootProps>(
  function SelectRoot(props, ref) {
    return <select ref={ref} {...props} />
  }
)
SelectRoot.displayName = 'SelectRoot'
