'use client'

import { type ComponentPropsWithoutRef, type ReactElement } from 'react'

/**
 * Custom icons must share Lucide's signature: accept SVG props and use
 * `stroke`/`fill="currentColor"` so Tailwind `text-*` (via Icon's `intent`)
 * drives the colour, and no fixed width/height so the `size` classes apply.
 */
export type CustomIconComponent = (props: ComponentPropsWithoutRef<'svg'>) => ReactElement
