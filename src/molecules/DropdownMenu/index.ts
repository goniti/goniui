// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as DropdownMenu from 'goniui/dropdown-menu'`
// then `<DropdownMenu.Root>`, `<DropdownMenu.Trigger>`, `<DropdownMenu.Content>`…
// Or import a single piece directly.
export {
  DropdownMenuCheckboxItem as CheckboxItem,
  type DropdownMenuCheckboxItemProps,
  dropdownMenuCheckboxItemVariants,
} from './components/DropdownMenuCheckboxItem'
export {
  DropdownMenuContent as Content,
  type DropdownMenuContentProps,
  dropdownMenuContentVariants,
} from './components/DropdownMenuContent'
export {
  type DropdownMenuGroupProps,
  DropdownMenuGroup as Group,
} from './components/DropdownMenuGroup'
export {
  type DropdownMenuItemProps,
  dropdownMenuItemVariants,
  DropdownMenuItem as Item,
} from './components/DropdownMenuItem'
export {
  type DropdownMenuLabelProps,
  dropdownMenuLabelVariants,
  DropdownMenuLabel as Label,
} from './components/DropdownMenuLabel'
export {
  type DropdownMenuPortalProps,
  DropdownMenuPortal as Portal,
} from './components/DropdownMenuPortal'
export {
  type DropdownMenuRadioGroupProps,
  DropdownMenuRadioGroup as RadioGroup,
} from './components/DropdownMenuRadioGroup'
export {
  type DropdownMenuRadioItemProps,
  dropdownMenuRadioItemVariants,
  DropdownMenuRadioItem as RadioItem,
} from './components/DropdownMenuRadioItem'
export { type DropdownMenuRootProps, DropdownMenuRoot as Root } from './components/DropdownMenuRoot'
export {
  type DropdownMenuSeparatorProps,
  dropdownMenuSeparatorVariants,
  DropdownMenuSeparator as Separator,
} from './components/DropdownMenuSeparator'
export { type DropdownMenuSubProps, DropdownMenuSub as Sub } from './components/DropdownMenuSub'
export {
  type DropdownMenuSubContentProps,
  dropdownMenuSubContentVariants,
  DropdownMenuSubContent as SubContent,
} from './components/DropdownMenuSubContent'
export {
  type DropdownMenuSubTriggerProps,
  dropdownMenuSubTriggerVariants,
  DropdownMenuSubTrigger as SubTrigger,
} from './components/DropdownMenuSubTrigger'
export {
  type DropdownMenuTriggerProps,
  DropdownMenuTrigger as Trigger,
} from './components/DropdownMenuTrigger'
