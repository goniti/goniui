'use client'

import { useEffect, useState } from 'react'

/**
 * Where @dnd-kit may mount its hidden accessibility nodes (announcements and
 * the `DndDescribedBy` description). By default it renders them as a direct
 * child of its `DndContext` — inside `<table>` here, which the table content
 * model forbids (#783).
 *
 * Resolved in an effect, never during render: this library is consumed by a
 * server-rendered app (apps/web), where `document` does not exist. Until the
 * effect runs, callers pass no container and @dnd-kit keeps its default — the
 * first client render then moves the nodes out.
 */
export function useDndAccessibilityContainer(): HTMLElement | undefined {
  const [container, setContainer] = useState<HTMLElement>()

  useEffect(() => {
    setContainer(document.body)
  }, [])

  return container
}
