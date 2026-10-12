'use client'

import { useState } from 'react'
import { tv } from 'tailwind-variants'

import { Flex } from '@/atoms/layout/Flex'

import type { DateRangeValue } from '../hooks/useDateRange'
import { AgendaActionBar } from './AgendaActionBar'
import { AgendaPanels, type AgendaPanelsProps } from './AgendaPanels'
import { type AgendaPreset, type AgendaPresetPlacement, AgendaPresets } from './AgendaPresets'

const agendaCardVariants = tv({
  base: 'w-fit rounded-xl border border-border bg-surface p-3 shadow-sm',
})

export interface AgendaCardProps extends AgendaPanelsProps {
  presets?: AgendaPreset[]
  presetsPlacement?: AgendaPresetPlacement
  clearLabel: string
  applyLabel: string
  onClear: () => void
  onApply: () => void
  applyDisabled?: boolean
  showActionBar?: boolean
}

/** Unified Agenda card — presets inside the shell (left / right / bottom). */
export function AgendaCard({
  presets,
  presetsPlacement = 'left',
  clearLabel,
  applyLabel,
  onClear,
  onApply,
  applyDisabled,
  showActionBar = true,
  className,
  onRangeChange,
  viewResetKey = 0,
  ...panelsProps
}: AgendaCardProps) {
  const hasPresets = presets != null && presets.length > 0

  // A preset is a deliberate jump — re-anchor the visible months to its range
  // (bump alongside the popover-open key), unlike an in-grid day click.
  const [presetJumpKey, setPresetJumpKey] = useState(0)

  const handlePresetSelect = (range: DateRangeValue) => {
    onRangeChange?.(range)
    setPresetJumpKey((key) => key + 1)
  }

  // Written once; its slot (before/after the calendar, row vs column) is driven by
  // `presetsPlacement` so DOM order always matches the visual order.
  const presetsNode = hasPresets ? (
    <AgendaPresets presets={presets} placement={presetsPlacement} onSelect={handlePresetSelect} />
  ) : null

  return (
    <div className={agendaCardVariants({ className })}>
      <Flex direction={presetsPlacement === 'bottom' ? 'col' : 'row'} align="stretch" gap="md">
        {presetsPlacement === 'left' ? presetsNode : null}
        <AgendaPanels
          {...panelsProps}
          onRangeChange={onRangeChange}
          viewResetKey={viewResetKey + presetJumpKey}
          className="min-w-0 flex-1"
          embedded
        />
        {presetsPlacement === 'left' ? null : presetsNode}
      </Flex>
      {showActionBar ? (
        <AgendaActionBar
          clearLabel={clearLabel}
          applyLabel={applyLabel}
          onClear={onClear}
          onApply={onApply}
          applyDisabled={applyDisabled}
        />
      ) : null}
    </div>
  )
}
