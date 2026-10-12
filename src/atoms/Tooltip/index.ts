// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Tooltip from 'goniui/tooltip'`
// then <Tooltip.Provider>, <Tooltip.Root>, <Tooltip.Trigger>, <Tooltip.Content>, <Tooltip.KeysChip>.
export {
  TooltipContent as Content,
  type TooltipContentProps,
  tooltipContentVariants,
} from './components/TooltipContent'
export {
  TooltipKeysChip as KeysChip,
  type TooltipKeysChipProps,
} from './components/TooltipKeysChip'
export { TooltipPortal as Portal, type TooltipPortalProps } from './components/TooltipPortal'
export {
  TooltipProvider as Provider,
  type TooltipProviderProps,
} from './components/TooltipProvider'
export { TooltipRoot as Root, type TooltipRootProps } from './components/TooltipRoot'
export { type TooltipTriggerProps, TooltipTrigger as Trigger } from './components/TooltipTrigger'
