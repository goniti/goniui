'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react'

import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'

export interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(function FormCheckbox(
  { label, id, className, ...inputAttrs },
  ref
) {
  // A literal fallback gave every checkbox the same id: two on one page broke
  // the label → input link and duplicated an id (#723). useId() is unique per
  // instance, so the fallback is as safe as a caller-provided one.
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  return (
    <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-2">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-border text-primary-700 focus:ring-primary-400',
          className
        )}
        {...inputAttrs}
      />
      <Text as="span" variant="body">
        {label}
      </Text>
    </label>
  )
})
