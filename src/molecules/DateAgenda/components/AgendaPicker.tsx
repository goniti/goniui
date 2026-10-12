'use client'

import { useCallback, useEffect, useRef, useState, type WheelEvent } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import * as List from '@/atoms/List'
import { cn } from '@/lib/cn'
import type { AgendaPickerItem } from '@/molecules/Agenda/lib/dateSegmentPicker'

export type { AgendaPickerItem }

const scrollListVariants = tv({
  base: 'overflow-y-auto scroll-smooth py-[72px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
  variants: {
    dragging: { true: 'cursor-grabbing', false: 'cursor-grab' },
  },
})

const itemVariants = tv({
  base: 'pointer-events-none flex h-9 items-center justify-center px-2 text-sm transition-colors',
  variants: {
    selected: { true: 'font-semibold text-primary-700', false: 'text-foreground-muted' },
  },
})

export interface AgendaPickerProps {
  items: AgendaPickerItem[]
  value: string
  onValueChange: (value: string) => void
  onConfirm?: () => void
  confirmLabel?: string
  ariaLabel: string
  className?: string
}

const ITEM_HEIGHT = 36
const VISIBLE_ITEMS = 5
const VIEWPORT_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS
const SCROLL_THUMB_HEIGHT = 20

/** Scroll / drag column picker — selected value sits in the center band. */
export function AgendaPicker({
  items,
  value,
  onValueChange,
  onConfirm,
  confirmLabel = 'Confirm selection',
  ariaLabel,
  className,
}: AgendaPickerProps) {
  // Direct DOM refs for imperative scroll operations — List.Root and Box are
  // not forwardRef'd (polymorphic `as` constraint), so native elements are kept.
  const listRef = useRef<HTMLUListElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const listDragRef = useRef<{ startY: number; startScroll: number } | null>(null)
  const thumbDragRef = useRef<{ startY: number; startRatio: number } | null>(null)
  const [listDragging, setListDragging] = useState(false)
  const [thumbDragging, setThumbDragging] = useState(false)
  const [scrollRatio, setScrollRatio] = useState(0)
  const syncingRef = useRef(false)
  const userInteractedRef = useRef(false)

  const selectedIndex = items.findIndex((item) => item.value === value)
  const scrollIndex = selectedIndex >= 0 ? selectedIndex : 0
  const thumbTravel = Math.max(VIEWPORT_HEIGHT - SCROLL_THUMB_HEIGHT, 0)

  const updateScrollRatio = useCallback(() => {
    const list = listRef.current
    if (list == null) return
    const maxScroll = list.scrollHeight - list.clientHeight
    setScrollRatio(maxScroll > 0 ? list.scrollTop / maxScroll : 0)
  }, [])

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'auto') => {
      const list = listRef.current
      if (list == null) return
      syncingRef.current = true
      const top = index * ITEM_HEIGHT
      if (typeof list.scrollTo === 'function') {
        list.scrollTo({ top, behavior })
      } else {
        list.scrollTop = top
      }
      window.requestAnimationFrame(() => {
        syncingRef.current = false
        updateScrollRatio()
      })
    },
    [updateScrollRatio]
  )

  useEffect(() => {
    userInteractedRef.current = false
    scrollToIndex(scrollIndex)
  }, [scrollIndex, items, scrollToIndex])

  const resolveIndexFromScroll = useCallback(() => {
    const list = listRef.current
    if (list == null || items.length === 0) return 0
    const index = Math.round(list.scrollTop / ITEM_HEIGHT)
    return Math.min(Math.max(index, 0), items.length - 1)
  }, [items.length])

  const emitScrollValue = useCallback(() => {
    updateScrollRatio()
    if (!userInteractedRef.current || syncingRef.current || items.length === 0) return
    const index = resolveIndexFromScroll()
    const next = items[index]?.value
    if (next != null && next !== value) onValueChange(next)
  }, [items, onValueChange, resolveIndexFromScroll, updateScrollRatio, value])

  const scrollBySteps = useCallback(
    (deltaY: number) => {
      userInteractedRef.current = true
      const list = listRef.current
      if (list == null) return
      list.scrollTop += deltaY > 0 ? ITEM_HEIGHT : -ITEM_HEIGHT
      emitScrollValue()
    },
    [emitScrollValue]
  )

  const scrollToRatio = useCallback(
    (ratio: number) => {
      const list = listRef.current
      if (list == null) return
      const maxScroll = list.scrollHeight - list.clientHeight
      list.scrollTop = Math.min(Math.max(ratio, 0), 1) * maxScroll
      emitScrollValue()
    },
    [emitScrollValue]
  )

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      scrollBySteps(event.deltaY)
    },
    [scrollBySteps]
  )

  useEffect(() => {
    const confirm = confirmRef.current
    if (confirm == null) return

    function onWheel(event: globalThis.WheelEvent) {
      event.preventDefault()
      event.stopPropagation()
      scrollBySteps(event.deltaY)
    }

    confirm.addEventListener('wheel', onWheel, { passive: false })
    return () => confirm.removeEventListener('wheel', onWheel)
  }, [scrollBySteps])

  const snapToNearestIndex = useCallback(() => {
    const list = listRef.current
    if (list == null) return
    const index = resolveIndexFromScroll()
    scrollToIndex(index, 'smooth')
  }, [resolveIndexFromScroll, scrollToIndex])

  const thumbOffset = scrollRatio * thumbTravel

  return (
    <Flex align="stretch" aria-label={ariaLabel} className={cn('gap-1.5 select-none', className)}>
      <Box className="relative w-28 px-1">
        <Button
          ref={confirmRef}
          variant="unstyled"
          size="none"
          aria-label={confirmLabel}
          className={cn(
            'absolute inset-x-1 top-1/2 z-30 h-9 -translate-y-1/2 rounded-md',
            'border border-border/80 bg-surface-2/80',
            'transition hover:border-primary-200 hover:bg-primary-50/90'
          )}
          onPointerDown={(event) => {
            event.stopPropagation()
          }}
          onClick={(event) => {
            event.stopPropagation()
            onConfirm?.()
          }}
        />
        <Box
          className="relative"
          onPointerDown={(event) => {
            if (event.button !== 0) return
            userInteractedRef.current = true
            const list = listRef.current
            if (list == null) return
            listDragRef.current = { startY: event.clientY, startScroll: list.scrollTop }
            setListDragging(true)
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            const list = listRef.current
            const drag = listDragRef.current
            if (list == null || drag == null) return
            // Re-arm: the re-snap effect clears this after each value change, which
            // would otherwise freeze the highlight after the first step of a drag.
            userInteractedRef.current = true
            list.scrollTop = drag.startScroll + (drag.startY - event.clientY)
            emitScrollValue()
          }}
          onPointerUp={(event) => {
            listDragRef.current = null
            setListDragging(false)
            event.currentTarget.releasePointerCapture(event.pointerId)
            snapToNearestIndex()
          }}
          onPointerCancel={() => {
            listDragRef.current = null
            setListDragging(false)
          }}
        >
          {/* Native ul kept — listRef drives imperative scroll; List.Root is not forwardRef'd */}
          <ul
            ref={listRef}
            className={scrollListVariants({ dragging: listDragging })}
            style={{ height: VIEWPORT_HEIGHT }}
            onScroll={emitScrollValue}
            onWheel={handleWheel}
          >
            {items.map((item) => (
              <List.Item
                key={item.value}
                className={itemVariants({ selected: item.value === value })}
              >
                {item.label}
              </List.Item>
            ))}
          </ul>
        </Box>
      </Box>

      {/* Native div kept — trackRef.getBoundingClientRect() drives thumb drag; Box is not forwardRef'd */}
      <div
        ref={trackRef}
        aria-hidden
        className="relative w-2 shrink-0"
        style={{ height: VIEWPORT_HEIGHT }}
      >
        <Box className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-surface-2" />
        <Box
          role="presentation"
          className={cn(
            'absolute left-0 w-full rounded-full bg-foreground/25',
            'cursor-ns-resize touch-none',
            thumbDragging && 'bg-foreground/40'
          )}
          style={{ height: SCROLL_THUMB_HEIGHT, top: thumbOffset }}
          onPointerDown={(event) => {
            if (event.button !== 0) return
            event.stopPropagation()
            userInteractedRef.current = true
            thumbDragRef.current = { startY: event.clientY, startRatio: scrollRatio }
            setThumbDragging(true)
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            const track = trackRef.current
            const drag = thumbDragRef.current
            if (track == null || drag == null || thumbTravel <= 0) return
            userInteractedRef.current = true
            const rect = track.getBoundingClientRect()
            const nextTop = event.clientY - rect.top - SCROLL_THUMB_HEIGHT / 2
            scrollToRatio(nextTop / thumbTravel)
          }}
          onPointerUp={(event) => {
            thumbDragRef.current = null
            setThumbDragging(false)
            event.currentTarget.releasePointerCapture(event.pointerId)
            snapToNearestIndex()
          }}
          onPointerCancel={() => {
            thumbDragRef.current = null
            setThumbDragging(false)
          }}
        />
      </div>
    </Flex>
  )
}
