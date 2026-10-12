import { tv } from 'tailwind-variants'

export const pageButtonVariants = tv({
  base: 'h-9 min-w-9 px-2.5 text-sm font-medium',
  variants: {
    active: {
      true: 'bg-primary-400 text-primary-foreground hover:bg-primary-300',
      false: 'text-foreground hover:bg-surface-2',
    },
  },
  defaultVariants: { active: false },
})
