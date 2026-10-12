// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Carousel from 'goniui/carousel'`
// then `<Carousel.Root>`, `<Carousel.Viewport>`, `<Carousel.Item>`, `<Carousel.Dots>`, …
// or import a single piece: `import { Item } from 'goniui/carousel'`
export { type CarouselContextValue, type CarouselOrientation, useCarousel } from './CarouselContext'
export { type CarouselDotsProps, CarouselDots as Dots } from './components/CarouselDots'
export {
  type CarouselItemProps,
  carouselItemVariants,
  CarouselItem as Item,
} from './components/CarouselItem'
export { type CarouselMorphProps, CarouselMorph as Morph } from './components/CarouselMorph'
export { type CarouselNextProps, CarouselNext as Next } from './components/CarouselNext'
export {
  type CarouselPreviousProps,
  CarouselPrevious as Previous,
} from './components/CarouselPrevious'
export {
  type CarouselRootProps,
  carouselRootVariants,
  CarouselRoot as Root,
} from './components/CarouselRoot'
export {
  type CarouselViewportProps,
  CarouselViewport as Viewport,
} from './components/CarouselViewport'
