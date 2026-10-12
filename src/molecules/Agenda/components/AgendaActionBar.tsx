'use client'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'

export interface AgendaActionBarProps {
  clearLabel: string
  applyLabel: string
  onClear: () => void
  onApply: () => void
  applyDisabled?: boolean
}

export function AgendaActionBar({
  clearLabel,
  applyLabel,
  onClear,
  onApply,
  applyDisabled,
}: AgendaActionBarProps) {
  return (
    <Flex justify="end" gap="sm" className="pt-3">
      <Button type="button" variant="ghost" size="sm" onClick={onClear}>
        {clearLabel}
      </Button>
      <Button type="button" size="sm" onClick={onApply} disabled={applyDisabled}>
        {applyLabel}
      </Button>
    </Flex>
  )
}
