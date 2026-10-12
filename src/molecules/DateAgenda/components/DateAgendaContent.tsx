'use client'

import { tv } from 'tailwind-variants'

import { resolveTemporalBounds } from '@/lib/resolveTemporalBounds'
import { AgendaCard } from '@/molecules/Agenda/components/AgendaCard'
import {
  type AgendaPreset,
  type AgendaPresetPlacement,
} from '@/molecules/Agenda/components/AgendaPresets'
import type { DayShape } from '@/molecules/Calendar/components/CalendarMonthGrid'
import { PopoverContent } from '@/molecules/Popover/components/PopoverContent'
import { PopoverPortal } from '@/molecules/Popover/components/PopoverPortal'

import { useDateAgendaContext } from '../DateAgendaContext'

const popoverContentVariants = tv({
  base: [
    'z-[var(--z-popover)] animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ],
})

export interface DateAgendaContentProps {
  ariaLabel?: string
  prevMonthLabel?: string
  nextMonthLabel?: string
  min?: Date
  max?: Date
  className?: string
  presets?: AgendaPreset[]
  presetsPlacement?: AgendaPresetPlacement
  clearLabel: string
  applyLabel: string
  enableDrag?: boolean
  /** Day-cell shape for the range grids: `soft` (default) or `round`. */
  dayShape?: DayShape
}

export function DateAgendaContent({
  ariaLabel,
  prevMonthLabel,
  nextMonthLabel,
  min,
  max,
  className,
  presets,
  presetsPlacement = 'left',
  clearLabel,
  applyLabel,
  enableDrag = true,
  dayShape = 'soft',
}: DateAgendaContentProps) {
  const {
    draftStart,
    draftEnd,
    setDraftRange,
    commitRange,
    applyDraft,
    close,
    locale,
    temporal,
    viewResetKey,
  } = useDateAgendaContext()
  const bounds = resolveTemporalBounds(temporal, { min, max })

  const handleClear = () => {
    commitRange({ start: null, end: null })
    close()
  }

  return (
    <PopoverPortal>
      <PopoverContent
        align="center"
        sideOffset={6}
        className={popoverContentVariants()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <AgendaCard
          start={draftStart}
          end={draftEnd}
          viewResetKey={viewResetKey}
          onRangeChange={setDraftRange}
          temporal={temporal}
          locale={locale}
          min={bounds.min}
          max={bounds.max}
          ariaLabel={ariaLabel}
          prevMonthLabel={prevMonthLabel}
          nextMonthLabel={nextMonthLabel}
          className={className}
          enableDrag={enableDrag}
          dayShape={dayShape}
          presets={presets}
          presetsPlacement={presetsPlacement}
          clearLabel={clearLabel}
          applyLabel={applyLabel}
          onClear={handleClear}
          onApply={applyDraft}
          applyDisabled={draftStart == null}
        />
      </PopoverContent>
    </PopoverPortal>
  )
}
