import { tv, type VariantProps } from 'tailwind-variants'

// Sizing uses Tailwind w-/h- classes: a CSS width/height beats the SVG's
// presentational `width`/`height` attribute, so Lucide's default 24px yields.
export const iconVariants = tv({
  base: 'inline-block shrink-0',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
    intent: {
      current: 'text-current',
      primary: 'text-primary-700 dark:text-primary-400',
      muted: 'text-foreground-muted',
      danger: 'text-red-600',
    },
  },
  defaultVariants: { size: 'md', intent: 'current' },
})

export type IconVariantsProps = VariantProps<typeof iconVariants>
