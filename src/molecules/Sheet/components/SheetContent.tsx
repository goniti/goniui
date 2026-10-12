'use client'

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
  useRef,
} from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/cn'

import { useSheetSnapDrag } from '../hooks/useSheetSnapDrag'
import { SheetDialogClose, SheetDialogContent, SheetDialogPortal } from './SheetDialog'
import { SheetHandle } from './SheetHandle'
import { SheetOverlay } from './SheetOverlay'

type DialogContentElement = ElementRef<typeof SheetDialogContent>

/**
 * Top inset — the gap between the top of the viewport and the sheet panel.
 * `sm` = 16px, `md` = 40px (default), `lg` = 80px, `none` = flush with the top
 * (used when `snapPoints` drives the height instead).
 *
 * Uses `top-*` (not `margin-top`) so the fixed panel actually stretches down
 * to `bottom-0` — a `margin-top` alone left the box shrink-to-fit its content,
 * which is what caused the panel to only fill ~15% of the viewport.
 */
export const sheetContentVariants = tv({
  base: [
    'fixed inset-x-0 bottom-0 z-[var(--z-dialog)]',
    'flex flex-col overflow-y-auto',
    'rounded-t-2xl bg-surface text-foreground shadow-2xl',
    'focus:outline-none',
    'data-[state=open]:animate-sheet-content-in',
    'data-[state=closed]:animate-sheet-content-out',
  ],
  variants: {
    inset: {
      sm: 'top-4',
      md: 'top-10',
      lg: 'top-20',
      none: '',
    },
  },
  defaultVariants: { inset: 'md' },
})

export interface SheetContentProps
  extends
    Omit<ComponentPropsWithoutRef<typeof SheetDialogContent>, 'children'>,
    VariantProps<typeof sheetContentVariants> {
  children?: ReactNode
  /** Hides the handle bar. Defaults to `false`. */
  hideHandle?: boolean
  /**
   * Heights (vh %, e.g. `[25, 50, 90]`) the handle can drag/snap to. Replaces
   * the static `inset` position with a draggable one — dragging past half the
   * smallest point closes the sheet.
   */
  snapPoints?: number[]
  /** Accessible name for the drag handle when `snapPoints` is set (it becomes a slider) — supplied by the app (§10). */
  handleLabel?: string
}

/**
 * Sheet panel — rendered inside a portal with a blurred overlay. Rounds the
 * top corners and shows a handle bar. Without `snapPoints`, stops short of
 * the top of the viewport by the `inset` variant. With `snapPoints`, the
 * handle becomes draggable and the panel height snaps to the closest point.
 */
export const SheetContent = forwardRef<DialogContentElement, SheetContentProps>(
  function SheetContent(
    { className, inset, hideHandle = false, snapPoints, handleLabel, children, style, ...props },
    ref
  ) {
    const closeRef = useRef<HTMLButtonElement>(null)
    const drag = useSheetSnapDrag({
      snapPoints: snapPoints ?? [],
      onClose: () => closeRef.current?.click(),
    })
    const isDraggable = snapPoints != null && snapPoints.length > 0

    return (
      <SheetDialogPortal>
        <SheetOverlay />
        <SheetDialogContent
          ref={ref}
          className={cn(
            sheetContentVariants({ inset: isDraggable ? 'none' : inset }),
            isDraggable &&
              (drag.isDragging ? 'transition-none' : 'transition-[height] duration-200 ease-out'),
            className
          )}
          style={isDraggable ? { ...style, height: `${drag.heightPercent}dvh` } : style}
          {...props}
        >
          <SheetDialogClose ref={closeRef} className="hidden" aria-hidden tabIndex={-1} />
          {!hideHandle && (
            <SheetHandle
              resizable={isDraggable}
              aria-label={isDraggable ? handleLabel : undefined}
              {...(isDraggable
                ? {
                    onPointerDown: drag.onPointerDown,
                    onPointerMove: drag.onPointerMove,
                    onPointerUp: drag.onPointerUp,
                    onKeyDown: drag.onKeyDown,
                    ...drag.sliderProps,
                  }
                : {})}
            />
          )}
          {children}
        </SheetDialogContent>
      </SheetDialogPortal>
    )
  }
)
