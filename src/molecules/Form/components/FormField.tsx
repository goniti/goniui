'use client'

import type { ReactNode } from 'react'

import { Box } from '@/atoms/layout/Box'
import { Text } from '@/atoms/Text'

export interface FormFieldProps {
  label?: ReactNode
  /** id of the control, for the label's htmlFor. */
  htmlFor?: string
  children: ReactNode
}

/**
 * Label + control wrapper, internal to the Form compound. The error message is
 * rendered separately by `Form.Error` (context-driven), so this shell only
 * stacks the label above the control. Not to be confused with the `useFormField`
 * hook, which derives the field's ids and error state from form context.
 */
export function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <Box>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block">
          {/* break-words: a label interpolating an unbreakable token (email, URL)
              must wrap instead of being clipped by an overflow-hidden ancestor. */}
          <Text variant="label" className="break-words">
            {label}
          </Text>
        </label>
      )}
      {children}
    </Box>
  )
}
