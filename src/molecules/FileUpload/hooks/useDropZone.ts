'use client'

import { type DragEvent, useRef, useState } from 'react'

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024

interface UseDropZoneOptions {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
  disabled?: boolean
}

interface DropZoneHandlers {
  onDragEnter: (event: DragEvent) => void
  onDragLeave: (event: DragEvent) => void
  onDragOver: (event: DragEvent) => void
  onDrop: (event: DragEvent) => void
}

interface InputHandlers {
  ref: React.RefObject<HTMLInputElement | null>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  multiple?: boolean
}

interface UseDropZoneReturn {
  isDragOver: boolean
  rootHandlers: DropZoneHandlers
  inputHandlers: InputHandlers
}

/**
 * Encapsulates all drag-and-drop + file-picker logic for the FileUpload zone.
 * Pure hook — no JSX. Validates MIME types against `accept` and size against
 * `maxSize`, then calls `onFiles` with the valid `File[]`.
 */
export function useDropZone({
  onFiles,
  accept,
  multiple = false,
  maxSize = DEFAULT_MAX_SIZE,
  disabled = false,
}: UseDropZoneOptions): UseDropZoneReturn {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptedMimeTypes = accept
    ? accept.split(',').map((type) => type.trim().toLowerCase())
    : null

  function isAcceptedType(file: File): boolean {
    if (!acceptedMimeTypes) return true
    return acceptedMimeTypes.some((accepted) => {
      if (accepted.endsWith('/*')) {
        const baseType = accepted.slice(0, -2)
        return file.type.startsWith(baseType)
      }
      return file.type === accepted
    })
  }

  function filterValidFiles(raw: FileList | File[]): File[] {
    const files = Array.from(raw)
    const candidates = multiple ? files : files.slice(0, 1)
    return candidates.filter((file) => isAcceptedType(file) && file.size <= maxSize)
  }

  function handleDragEnter(event: DragEvent) {
    event.preventDefault()
    if (!disabled) setIsDragOver(true)
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault()
    // Only clear if we're leaving the root (not entering a child element)
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault()
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault()
    setIsDragOver(false)
    if (disabled) return

    const validFiles = filterValidFiles(event.dataTransfer.files)
    if (validFiles.length > 0) onFiles(validFiles)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const validFiles = filterValidFiles(event.target.files)
    if (validFiles.length > 0) onFiles(validFiles)
    // Reset so the same file can be re-selected
    event.target.value = ''
  }

  return {
    isDragOver,
    rootHandlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
    inputHandlers: {
      ref: inputRef,
      onChange: handleInputChange,
      accept,
      multiple,
    },
  }
}
