import { SheetDialogRoot, type SheetDialogRootProps } from './SheetDialog'

export type SheetRootProps = SheetDialogRootProps

/** Sheet root — owns open state (controlled or uncontrolled). */
export function SheetRoot(props: SheetRootProps) {
  return <SheetDialogRoot {...props} />
}
