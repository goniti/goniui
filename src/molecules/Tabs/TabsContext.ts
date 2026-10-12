'use client'

import { createContext, useContext } from 'react'

/**
 * `line` — the default underline-less pill row (same-page panel switcher).
 * `segment` — full-width, equal-width segments with a bordered container
 * (the segmented-control look) for a compact same-page toggle.
 */
export type TabsVariant = 'line' | 'segment'

const TabsContext = createContext<TabsVariant>('line')

export const TabsProvider = TabsContext.Provider

/** Read the visual variant set on `Tabs.Root`, shared by `List` and `Trigger`. */
export const useTabsVariant = () => useContext(TabsContext)
