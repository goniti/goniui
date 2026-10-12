'use client'

import { forwardRef, type HTMLAttributes } from 'react'

export interface FileUploadRootProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @internal Whether the zone is in keyboard/pointer-accessible drag-over state.
   * Applied by the public `FileUpload` adapter — callers don't set this.
   */
  'data-drag-over'?: boolean
}

/**
 * @internal The ONLY file that renders the drop zone container element.
 * `FileUpload` (public) owns variants/tokens and delegates rendering here.
 * Follow the same isolation pattern as `ButtonRoot` — keep the `@radix-ui/*`
 * or primitive boundary contained; here the boundary is the native `<div>`.
 */
export const FileUploadRoot = forwardRef<HTMLDivElement, FileUploadRootProps>(
  function FileUploadRoot({ children, ...props }, ref) {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  }
)
