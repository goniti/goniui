// Named exports (Radix / shadcn pattern) — no Object.assign, so the bundler can
// tree-shake either subcomponent the app never uses.
// Consume as a namespace: `import * as SegmentedControl from 'goniui/segmented-control'`
// then `<SegmentedControl.Root>` / `<SegmentedControl.Item>`.
export {
  SegmentedControl as Root,
  type SegmentedControlProps,
  segmentedControlVariants,
} from './components/SegmentedControl'
export {
  SegmentedControlItem as Item,
  type SegmentedControlItemProps,
  segmentedControlItemVariants,
} from './components/SegmentedControlItem'
