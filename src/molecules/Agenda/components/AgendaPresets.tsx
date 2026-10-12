'use client'

import { tv } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'

import type { DateRangeValue } from '../hooks/useDateRange'

export type AgendaPresetPlacement = 'left' | 'right' | 'bottom'

const presetsVariants = tv({
  variants: {
    placement: {
      left: 'min-w-44 border-r border-border py-1 pr-3',
      right: 'min-w-44 border-l border-border py-1 pl-3',
      bottom: 'border-t border-border px-1 pt-3',
    },
  },
  defaultVariants: { placement: 'left' },
})

export interface AgendaPreset {
  label: string
  group: string
  getRange: () => DateRangeValue
}

export interface AgendaPresetsProps {
  presets: AgendaPreset[]
  onSelect: (range: DateRangeValue) => void
  placement?: AgendaPresetPlacement
  className?: string
}

function groupPresets(presets: AgendaPreset[]): Array<{ group: string; items: AgendaPreset[] }> {
  const orderedGroups = presets
    .map((preset) => preset.group)
    .filter((group, index, groups) => groups.indexOf(group) === index)

  return orderedGroups.map((group) => ({
    group,
    items: presets.filter((preset) => preset.group === group),
  }))
}

export function AgendaPresets({
  presets,
  onSelect,
  placement = 'left',
  className,
}: AgendaPresetsProps) {
  if (presets.length === 0) return null

  const groups = groupPresets(presets)
  const isVertical = placement === 'left' || placement === 'right'

  return (
    <Flex
      direction={isVertical ? 'col' : 'row'}
      wrap={isVertical ? 'nowrap' : 'wrap'}
      gap={isVertical ? 'none' : 'sm'}
      className={presetsVariants({ placement, className })}
    >
      {groups.map((group, groupIndex) => (
        <Flex
          key={group.group}
          direction={isVertical ? 'col' : 'row'}
          wrap={isVertical ? 'nowrap' : 'wrap'}
          gap="sm"
          className={cn(isVertical && groupIndex > 0 && 'mt-2 border-t border-border pt-2')}
        >
          {group.items.map((preset) => (
            <Button
              key={`${group.group}-${preset.label}`}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onSelect(preset.getRange())}
              className={cn(isVertical ? 'w-full justify-start px-2' : undefined, 'font-normal')}
            >
              {preset.label}
            </Button>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}
