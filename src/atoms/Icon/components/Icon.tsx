import { type LucideIcon } from 'lucide-react'

import { iconVariants, type IconVariantsProps } from '../lib/Icon.variants'
import { type CustomIconComponent } from './types'

export interface IconProps extends IconVariantsProps {
  /** A Lucide icon (e.g. `Heart`) OR one of our custom icons — same usage. */
  icon: LucideIcon | CustomIconComponent
  className?: string
  /** Provide for meaningful icons; omitted icons are decorative (aria-hidden). */
  'aria-label'?: string
}

/**
 * The single icon atom. Callers never care whether `icon` is from Lucide or our
 * custom catalogue — uniform sizing/theming via tailwind-variants.
 */
export function Icon({ icon: IconComponent, size, intent, className, ...rest }: IconProps) {
  const label = rest['aria-label']
  return (
    <IconComponent
      className={iconVariants({ size, intent, className })}
      aria-hidden={label ? undefined : true}
      {...rest}
    />
  )
}
