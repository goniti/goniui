'use client'

import { UploadCloud } from 'lucide-react'
import { type HTMLAttributes, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon } from '@/atoms/Icon'
import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

import { FileUploadFileList } from './components/FileUploadFileList'
import { FileUploadRoot } from './components/FileUploadRoot'
import { useDropZone } from './hooks/useDropZone'

// ─── Variants ──────────────────────────────────────────────────────────────

export const fileUploadVariants = tv({
  base: 'relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors',
  variants: {
    state: {
      default:
        'cursor-pointer border-border bg-surface-2 hover:border-primary-400 hover:bg-primary-50',
      dragOver: 'cursor-copy border-primary-400 bg-primary-50',
      disabled: 'cursor-not-allowed border-border bg-surface-2 opacity-60',
    },
  },
  defaultVariants: { state: 'default' },
})

// ─── Props ─────────────────────────────────────────────────────────────────

export interface FileUploadProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'onDrop' | 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  /** Called with the accepted files on drop or browse. */
  onFiles: (files: File[]) => void
  /** MIME type filter passed to the native input, e.g. `"image/jpeg,image/png"`. */
  accept?: string
  /** Allow picking multiple files at once. Default `false`. */
  multiple?: boolean
  disabled?: boolean
  /** Maximum file size in bytes. Default 5 MB. */
  maxSize?: number
  /** Drag-target label. Defaults to `"Drop file here or click to browse"`. */
  label?: string
  /** Format hint shown below the label. Defaults to `"Max 5 MB"`. */
  hint?: string
  /** Accessible label for each remove button; receives the filename. */
  removeLabel?: (name: string) => string
}

const DEFAULT_LABEL = 'Drop file here or click to browse'
const DEFAULT_HINT = 'Max 5 MB'
const DEFAULT_REMOVE_LABEL = (name: string) => `Remove ${name}`

/**
 * Drag-and-drop file upload zone. The public adapter — owns `fileUploadVariants`
 * and composes `FileUploadRoot` + `FileUploadFileList` + `useDropZone`.
 *
 * Never renders the drop zone `<div>` itself — that is the sole responsibility
 * of `FileUploadRoot` (same isolation rule as `Button` → `ButtonRoot`).
 */
export function FileUpload({
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  maxSize,
  label = DEFAULT_LABEL,
  hint = DEFAULT_HINT,
  removeLabel = DEFAULT_REMOVE_LABEL,
  className,
  ...rest
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  function handleFiles(incoming: File[]) {
    const next = multiple ? [...selectedFiles, ...incoming] : incoming
    setSelectedFiles(next)
    onFiles(next)
  }

  function handleRemove(index: number) {
    const next = selectedFiles.filter((_, fileIndex) => fileIndex !== index)
    setSelectedFiles(next)
    onFiles(next)
  }

  const resolvedState = (() => {
    if (disabled) return 'disabled' as const
    return 'default' as const
  })()

  const { isDragOver, rootHandlers, inputHandlers } = useDropZone({
    onFiles: handleFiles,
    accept,
    multiple,
    maxSize,
    disabled,
  })

  const activeState = isDragOver && !disabled ? 'dragOver' : resolvedState

  return (
    <FileUploadRoot
      data-drag-over={isDragOver && !disabled}
      className={fileUploadVariants({ state: activeState, className })}
      {...rootHandlers}
      {...rest}
    >
      {/* The native input is the single interactive control: transparent and
          covering the whole zone, so a click or keyboard activation anywhere
          opens the picker — no `role="button"` wrapper nesting the input and the
          remove buttons (which axe flags as nested-interactive). */}
      <input
        type="file"
        aria-label={label}
        disabled={disabled}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...inputHandlers}
      />

      <Flex direction="col" align="center" gap="sm" className="pointer-events-none">
        <Icon icon={UploadCloud} size="xl" intent={isDragOver ? 'primary' : 'muted'} />
        <Text variant="body">{label}</Text>
        <Text variant="caption" tone="muted">
          {hint}
        </Text>
      </Flex>

      {selectedFiles.length > 0 && (
        <Box className="relative z-10 w-full">
          <FileUploadFileList
            files={selectedFiles}
            removeLabel={removeLabel}
            onRemove={handleRemove}
          />
        </Box>
      )}
    </FileUploadRoot>
  )
}
