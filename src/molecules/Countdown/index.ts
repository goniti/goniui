// Named exports — no Object.assign, bundler can tree-shake unused pieces.
// Consume as: `import * as Countdown from 'goniui/countdown'`
// or import individual pieces directly.
export {
  Countdown,
  type CountdownFormat,
  type CountdownLabels,
  type CountdownProps,
  countdownVariants,
} from './components/Countdown'
export {
  CountdownUnit,
  type CountdownUnitProps,
  countdownUnitVariants,
} from './components/CountdownUnit'
export { type CountdownTick, useCountdown } from './hooks/useCountdown'
