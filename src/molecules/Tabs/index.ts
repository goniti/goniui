// Independent named exports (Radix / shadcn pattern) — no Object.assign, so the
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Tabs from 'goniui/tabs'`
// then `<Tabs.Root>`, `<Tabs.List>`, `<Tabs.Trigger>`, `<Tabs.Content>`.
export {
  TabsContent as Content,
  type TabsContentProps,
  tabsContentVariants,
} from './components/TabsContent'
export { TabsList as List, type TabsListProps, tabsListVariants } from './components/TabsList'
export { TabsRoot as Root, type TabsRootProps } from './components/TabsRoot'
export {
  type TabsTriggerProps,
  tabsTriggerVariants,
  TabsTrigger as Trigger,
} from './components/TabsTrigger'
export type { TabsVariant } from './TabsContext'
