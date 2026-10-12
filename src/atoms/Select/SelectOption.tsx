'use client'

import type { OptionHTMLAttributes, ReactNode } from 'react'

export interface SelectOptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children: ReactNode
}

/** Thin `<option>` wrapper, pairs with `Select` — apps never write the raw tag. */
export function SelectOption({ children, ...props }: SelectOptionProps) {
  return <option {...props}>{children}</option>
}
