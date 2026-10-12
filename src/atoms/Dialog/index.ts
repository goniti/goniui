// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Dialog from 'goniui/dialog'`
// then <Dialog.Root>, <Dialog.Trigger>, <Dialog.Content>, etc.
export { DialogClose as Close, type DialogCloseProps } from './components/DialogClose'
export {
  DialogContent as Content,
  type DialogContentProps,
  dialogContentVariants,
} from './components/DialogContent'
export {
  DialogDescription as Description,
  type DialogDescriptionProps,
  dialogDescriptionVariants,
} from './components/DialogDescription'
export {
  type DialogOverlayProps,
  dialogOverlayVariants,
  DialogOverlay as Overlay,
} from './components/DialogOverlay'
export { type DialogPortalProps, DialogPortal as Portal } from './components/DialogPortal'
export { type DialogRootProps, DialogRoot as Root } from './components/DialogRoot'
export {
  type DialogTitleProps,
  dialogTitleVariants,
  DialogTitle as Title,
} from './components/DialogTitle'
export { type DialogTriggerProps, DialogTrigger as Trigger } from './components/DialogTrigger'
