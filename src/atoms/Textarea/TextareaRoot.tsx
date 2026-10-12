'use client'

import { forwardRef, type TextareaHTMLAttributes } from 'react'

export type TextareaRootProps = TextareaHTMLAttributes<HTMLTextAreaElement>

/**
 * @internal — the ONLY file that renders `<textarea>`. All consumers go through
 * the public `Textarea` adapter which owns variants/tokens.
 */
export const TextareaRoot = forwardRef<HTMLTextAreaElement, TextareaRootProps>(
  function TextareaRoot(props, ref) {
    return <textarea ref={ref} {...props} />
  }
)
TextareaRoot.displayName = 'TextareaRoot'
