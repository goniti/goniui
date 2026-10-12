'use client'

/**
 * @internal — the ONLY file in this compound that imports `@radix-ui/react-dialog`.
 * All other Sheet files import from here, never from the primitive directly.
 * Swap the modal engine by editing this single file.
 */
export {
  Close as SheetDialogClose,
  type DialogCloseProps as SheetDialogCloseProps,
  Content as SheetDialogContent,
  type DialogContentProps as SheetDialogContentProps,
  Overlay as SheetDialogOverlay,
  type DialogOverlayProps as SheetDialogOverlayProps,
  Portal as SheetDialogPortal,
  type DialogPortalProps as SheetDialogPortalProps,
  Root as SheetDialogRoot,
  type DialogProps as SheetDialogRootProps,
  Trigger as SheetDialogTrigger,
  type DialogTriggerProps as SheetDialogTriggerProps,
} from '@radix-ui/react-dialog'
