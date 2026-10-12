'use client'

import type { FieldErrors } from 'react-hook-form'

export interface FieldErrorLike {
  message?: string
}

/**
 * Resolves a field's error from RHF's `errors` object by its dot-path `name`
 * (e.g. "parts.0.title"), matching how `register`/`useFieldArray` address
 * nested and array fields. Plain bracket access (`errors[name]`) only resolves
 * top-level names — this also walks into nested objects and array indices, so
 * `Form.Input`/`Form.Error` work unchanged for a field-array item.
 */
export function getFieldError(errors: FieldErrors, name: string): FieldErrorLike | undefined {
  const value = name
    .split('.')
    .reduce<unknown>(
      (current, key) =>
        current !== null && typeof current === 'object'
          ? (current as Record<string, unknown>)[key]
          : undefined,
      errors
    )
  return value as FieldErrorLike | undefined
}
