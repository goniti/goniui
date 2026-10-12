'use client'

import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { Flex } from '@/atoms/layout/Flex'

export interface DataTableRowActionsLabels {
  edit?: string
  delete?: string
}

export interface DataTableRowActionsProps {
  onEdit?: () => void
  onDelete?: () => void
  /** Accessible names for the action buttons — supplied by the app (§10). */
  labels?: DataTableRowActionsLabels
}

/**
 * Edit/delete icon-button pair for a row's actions cell. Pass it as a column's
 * `cell` renderer; whichever callback is omitted, its button doesn't render —
 * the consuming app owns when/whether each action is available per row.
 */
export function DataTableRowActions({ onEdit, onDelete, labels }: DataTableRowActionsProps) {
  return (
    <Flex align="center" gap="xs">
      {onEdit ? (
        <Button variant="ghost" size="sm" aria-label={labels?.edit} onClick={onEdit}>
          <Icon icon={Pencil} size="sm" />
        </Button>
      ) : null}
      {onDelete ? (
        <Button variant="ghost" size="sm" aria-label={labels?.delete} onClick={onDelete}>
          <Icon icon={Trash2} size="sm" />
        </Button>
      ) : null}
    </Flex>
  )
}
