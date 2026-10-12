'use client'

import { X } from 'lucide-react'

import { Icon } from '@/atoms/Icon'
import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

const BYTES_PER_KB = 1024
const BYTES_PER_MB = BYTES_PER_KB * 1024

function formatFileSize(bytes: number): string {
  if (bytes >= BYTES_PER_MB) return `${(bytes / BYTES_PER_MB).toFixed(1)} MB`
  if (bytes >= BYTES_PER_KB) return `${Math.round(bytes / BYTES_PER_KB)} KB`
  return `${bytes} B`
}

export interface FileUploadFileListProps {
  files: File[]
  /** Accessible label for each remove button. Receives the filename. */
  removeLabel: (name: string) => string
  onRemove: (index: number) => void
}

/**
 * Renders the list of selected files — each with name, formatted size and a
 * remove button. Uses `<Text>`, `<Flex>`, `<Box>` — no anonymous divs.
 */
export function FileUploadFileList({ files, removeLabel, onRemove }: FileUploadFileListProps) {
  return (
    <Box role="list" className="mt-3 w-full space-y-1">
      {files.map((file, index) => (
        <Flex
          key={`${file.name}-${index}`}
          role="listitem"
          align="center"
          justify="between"
          className="rounded-lg border border-border bg-surface px-3 py-2"
        >
          <Text variant="bodySm" className="truncate">
            {file.name}
            <Text as="span" variant="bodySm" tone="muted" className="ml-1">
              — {formatFileSize(file.size)}
            </Text>
          </Text>

          <button
            type="button"
            aria-label={removeLabel(file.name)}
            onClick={() => onRemove(index)}
            className="ml-2 shrink-0 rounded p-0.5 text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <Icon icon={X} size="sm" aria-hidden />
          </button>
        </Flex>
      ))}
    </Box>
  )
}
