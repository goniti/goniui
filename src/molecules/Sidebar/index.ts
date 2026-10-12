// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Sidebar from 'goniui/sidebar'`
// then `<Sidebar.Root>`, `<Sidebar.Header>`, `<Sidebar.Group>`,
// `<Sidebar.GroupLabel>`, `<Sidebar.Item>`, `<Sidebar.Footer>`, `<Sidebar.ModeControl>`.
export { SidebarFooter as Footer, type SidebarFooterProps } from './components/SidebarFooter'
export { SidebarGroup as Group, type SidebarGroupProps } from './components/SidebarGroup'
export {
  SidebarGroupLabel as GroupLabel,
  type SidebarGroupLabelProps,
} from './components/SidebarGroupLabel'
export { SidebarHeader as Header, type SidebarHeaderProps } from './components/SidebarHeader'
export {
  SidebarItem as Item,
  sidebarItemBadgeVariants,
  type SidebarItemProps,
  sidebarItemVariants,
} from './components/SidebarItem'
export { SidebarMobile as Mobile, type SidebarMobileProps } from './components/SidebarMobile'
export {
  SidebarModeControl as ModeControl,
  type SidebarModeControlProps,
} from './components/SidebarModeControl'
export {
  SidebarRoot as Root,
  type SidebarRootProps,
  sidebarVariants,
} from './components/SidebarRoot'
export { useKeySequence, type UseKeySequenceOptions } from './hooks/useKeySequence'
export { useMediaQuery } from './hooks/useMediaQuery'
export { type SidebarContextValue, type SidebarMode, useSidebar } from './SidebarContext'
