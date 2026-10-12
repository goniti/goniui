'use client'

/**
 * @internal — the ONLY file in this molecule that imports `sonner`.
 * Every other Toast file imports from here, never from `sonner` directly.
 * Swap the toast engine by editing this single file.
 */
export { toast, Toaster as ToasterRoot, type ToasterProps as ToasterRootProps } from 'sonner'
