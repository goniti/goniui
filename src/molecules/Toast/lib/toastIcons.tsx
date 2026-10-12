import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'

import { Icon } from '@/atoms/Icon'
import { Spinner } from '@/atoms/Spinner'

/**
 * Sonner's per-type icon slots wired to our own atoms, so toasts theme uniformly
 * with the rest of the design system (no Sonner default glyphs leaking through).
 */
export const toastIcons = {
  success: <Icon icon={CircleCheck} size="sm" className="text-success" />,
  error: <Icon icon={CircleX} size="sm" className="text-error" />,
  info: <Icon icon={Info} size="sm" className="text-info" />,
  warning: <Icon icon={TriangleAlert} size="sm" className="text-warning" />,
  loading: <Spinner size="sm" />,
}
