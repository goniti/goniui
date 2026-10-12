// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Sheet from 'goniui/sheet'`
// then <Sheet.Root>, <Sheet.Trigger>, <Sheet.Content>, <Sheet.Overlay>, <Sheet.Handle>, <Sheet.Close>.
export { SheetClose as Close, type SheetCloseProps } from './components/SheetClose'
export {
  SheetContent as Content,
  type SheetContentProps,
  sheetContentVariants,
} from './components/SheetContent'
export {
  SheetHandle as Handle,
  type SheetHandleProps,
  sheetHandleVariants,
} from './components/SheetHandle'
export {
  SheetOverlay as Overlay,
  type SheetOverlayProps,
  sheetOverlayVariants,
} from './components/SheetOverlay'
export { SheetRoot as Root, type SheetRootProps } from './components/SheetRoot'
export { type SheetTriggerProps, SheetTrigger as Trigger } from './components/SheetTrigger'
