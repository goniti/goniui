'use client'

import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { TextareaRoot, type TextareaRootProps } from './TextareaRoot'

export const textareaVariants = tv({
  base:
    'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-base text-foreground placeholder:text-foreground-muted md:text-sm ' +
    'resize-none transition focus:outline-none focus:ring-2 disabled:opacity-50',
  variants: {
    state: {
      default: 'border-border focus:border-primary-400 focus:ring-primary-400/25',
      error: 'border-error focus:border-error focus:ring-error/25',
    },
  },
  defaultVariants: { state: 'default' },
})

export interface TextareaProps extends TextareaRootProps, VariantProps<typeof textareaVariants> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { state, className, ...props },
  ref
) {
  return <TextareaRoot ref={ref} className={textareaVariants({ state, className })} {...props} />
})
Textarea.displayName = 'Textarea'
