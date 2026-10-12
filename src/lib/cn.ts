import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind conflict resolution: later (consumer) classes
 * win over earlier (base) ones — e.g. cn('bg-primary-600', 'bg-red-500') →
 * 'bg-red-500'. This is what lets a `className` prop reliably override defaults.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
