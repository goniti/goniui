// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Collapsible from 'goniui/collapsible'`
// then `<Collapsible.Root>`, `<Collapsible.Trigger>`, `<Collapsible.Content>`.
export {
  type CollapsibleContentProps,
  collapsibleContentVariants,
  CollapsibleContent as Content,
} from './components/CollapsibleContent'
export { type CollapsibleRootProps, CollapsibleRoot as Root } from './components/CollapsibleRoot'
export {
  type CollapsibleTriggerProps,
  CollapsibleTrigger as Trigger,
} from './components/CollapsibleTrigger'
