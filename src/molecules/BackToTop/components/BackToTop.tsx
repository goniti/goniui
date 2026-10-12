'use client'

import { ArrowUp } from 'lucide-react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'

import { useScrolledPast } from '../hooks/useScrolledPast'

const DEFAULT_THRESHOLD_VIEWPORTS = 1.5

export const backToTopVariants = tv({
  // z-overlay: above page content, below dialogs — an open Sheet/Dialog
  // (z-dialog) covers it instead of being overlapped.
  base: 'fixed bottom-4 right-4 z-[var(--z-overlay)] size-11 rounded-full p-0 shadow-lg',
})

export interface BackToTopProps extends VariantProps<typeof backToTopVariants> {
  /** Accessible name — supplied already translated by the app (§10). */
  label: string
  /** Viewport-heights of scroll before the button appears. Defaults to 1.5. */
  thresholdViewports?: number
  className?: string
}

/**
 * Floating "back to top" button: appears after `thresholdViewports` of scroll,
 * scrolls smoothly unless the user prefers reduced motion. Tap target ≥ 44px.
 */
export function BackToTop({
  label,
  thresholdViewports = DEFAULT_THRESHOLD_VIEWPORTS,
  className,
}: BackToTopProps) {
  const isVisible = useScrolledPast(thresholdViewports)

  if (!isVisible) return null

  return (
    <Button
      variant="secondary"
      aria-label={label}
      onClick={scrollToTop}
      className={backToTopVariants({ className })}
    >
      <Icon icon={ArrowUp} />
    </Button>
  )
}

function scrollToTop(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}
