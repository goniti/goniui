'use client'

import { type CSSProperties } from 'react'

import { toastIcons } from '../lib/toastIcons'
import { ToasterRoot, type ToasterRootProps } from './ToasterRoot'

const TOAST_DURATION = 4000

/**
 * Per-tone accent colour. Sonner applies `classNames.default` to EVERY toast and
 * then the type key — by plain string concatenation, with no tailwind-merge — so
 * a per-type *utility* (border/bg) is unsafe (which wins is source-order luck).
 * Instead each type sets a single custom property, `--toast-accent`; the toaster
 * seeds a neutral default that **inherits** to untyped toasts, and the type key
 * overrides it on its own element. The left bar + progress bar both read this var,
 * so one declaration drives both — token-driven, re-skin via `design-tokens`.
 */
const toneAccent = {
  success: '[--toast-accent:var(--color-success)]',
  error: '[--toast-accent:var(--color-error)]',
  warning: '[--toast-accent:var(--color-warning)]',
  info: '[--toast-accent:var(--color-info)]',
}

/** Tone-coloured left accent stripe — pseudo-element so it never fights the card border. */
const accentBar =
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[var(--toast-accent)] before:content-['']"

/**
 * Discreet tone-coloured auto-dismiss progress bar along the bottom edge. The
 * `toast-progress` keyframe + its hover-pause / loading-hide rules live in
 * `design-tokens` (loaded by both the app and Storybook); its duration tracks
 * `--toast-progress-duration`, set on the toaster from the active `duration`.
 */
const progressBar = [
  "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-[var(--toast-accent)] after:content-['']",
  'after:[animation-name:toast-progress] after:[animation-timing-function:linear] after:[animation-fill-mode:forwards] after:[animation-duration:var(--toast-progress-duration)]',
].join(' ')

export type ToasterProps = ToasterRootProps

/**
 * App-wide toaster — mount once at the root. Wraps Sonner (drag-to-dismiss,
 * stacking, pause-on-hover, timer cleanup on close are all native) and owns our
 * stable defaults: tokenised tones, our `Icon`/`Spinner` glyphs, a close button,
 * and the bottom progress bar. Position via `position`
 * (`top-left` … `bottom-right`); default `bottom-right`.
 */
type SwipeDirection = 'top' | 'bottom' | 'left' | 'right'

function swipeDirectionsFor(position: string): SwipeDirection[] {
  const [y, x] = position.split('-') as SwipeDirection[]
  return [...new Set<SwipeDirection>([y, x, 'top'])]
}

export function Toaster({
  position = 'bottom-right',
  duration = TOAST_DURATION,
  closeButton = true,
  style,
  ...props
}: ToasterProps) {
  return (
    <ToasterRoot
      position={position}
      duration={duration}
      closeButton={closeButton}
      icons={toastIcons}
      swipeDirections={swipeDirectionsFor(position)}
      style={
        {
          '--toast-progress-duration': `${duration}ms`,
          '--toast-accent': 'var(--color-border)',
          ...style,
        } as CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `group relative flex w-full items-start gap-3 overflow-hidden rounded-xl border border-border bg-surface p-4 pr-10 text-foreground shadow-lg select-none ${accentBar} ${progressBar}`,
          title: 'text-sm font-semibold leading-tight',
          description: 'text-sm opacity-80',
          icon: 'mt-0.5 shrink-0',
          actionButton:
            'inline-flex shrink-0 items-center rounded-md border border-current/30 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-current/10',
          cancelButton:
            'inline-flex shrink-0 items-center rounded-md px-3 py-1.5 text-xs font-medium opacity-70 transition-opacity hover:opacity-100',
          closeButton:
            'absolute right-3 top-3 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
          success: toneAccent.success,
          error: toneAccent.error,
          warning: toneAccent.warning,
          info: toneAccent.info,
        },
      }}
      {...props}
    />
  )
}
