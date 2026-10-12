// Independent named exports (Radix / shadcn pattern) — tree-shakeable.
// Consume as a namespace: `import * as NavigationMenu from 'goniui/navigation-menu'`
// then `<NavigationMenu.Root>`, `<NavigationMenu.List>`, `<NavigationMenu.Trigger>`…
export {
  NavigationMenuContent as Content,
  type NavigationMenuContentProps,
  navigationMenuContentVariants,
} from './components/NavigationMenuContent'
export {
  NavigationMenuIndicator as Indicator,
  navigationMenuArrowVariants,
  type NavigationMenuIndicatorProps,
  navigationMenuIndicatorVariants,
} from './components/NavigationMenuIndicator'
export {
  NavigationMenuItem as Item,
  type NavigationMenuItemProps,
} from './components/NavigationMenuItem'
export {
  NavigationMenuLink as Link,
  type NavigationMenuLinkProps,
  navigationMenuLinkVariants,
} from './components/NavigationMenuLink'
export {
  NavigationMenuList as List,
  type NavigationMenuListProps,
  navigationMenuListVariants,
} from './components/NavigationMenuList'
export {
  type NavigationMenuRootProps,
  navigationMenuRootVariants,
  NavigationMenuRoot as Root,
} from './components/NavigationMenuRoot'
export {
  type NavigationMenuTriggerProps,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger as Trigger,
} from './components/NavigationMenuTrigger'
export {
  type NavigationMenuViewportProps,
  navigationMenuViewportVariants,
  NavigationMenuViewport as Viewport,
} from './components/NavigationMenuViewport'
