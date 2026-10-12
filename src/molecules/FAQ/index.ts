// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as FAQ from 'goniui/faq'`
// then `<FAQ.Root>`, `<FAQ.Item>`… — or import a single piece directly.
export { type FAQItemProps, faqItemVariants, FAQItem as Item } from './components/FAQItem'
export { type FAQRootProps, FAQRoot as Root } from './components/FAQRoot'
