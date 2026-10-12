'use client'

import { type AnchorHTMLAttributes, forwardRef, type ReactNode, useContext, useRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Badge } from '@/atoms/Badge'
import { Box } from '@/atoms/layout/Box'
import { Text } from '@/atoms/Text'
import * as Tooltip from '@/atoms/Tooltip'

import { useKeySequence } from '../hooks/useKeySequence'
import { SidebarContext } from '../SidebarContext'
import { SidebarItemRoot, SidebarItemSlottable } from './SidebarItemRoot'

export const sidebarItemVariants = tv({
  base:
    'inline-flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
  variants: {
    active: {
      true: 'bg-primary-400/10 font-bold text-primary-700 dark:text-primary-400',
      false: 'text-foreground-muted hover:bg-foreground/5 hover:text-foreground',
    },
  },
  defaultVariants: { active: false },
})

/** `Sidebar.Item`'s `badge`, positioned inline at the end of the row when
 * expanded, or pinned to the icon's corner when collapsed. */
export const sidebarItemBadgeVariants = tv({
  base: 'pointer-events-none justify-center whitespace-nowrap text-center',
  variants: {
    placement: {
      row: 'shrink-0',
      corner:
        'absolute -right-1 -top-1 min-w-[18px] rounded-full px-1 py-0 text-[10px] leading-4 ring-2 ring-surface',
    },
  },
  defaultVariants: { placement: 'row' },
})

const BADGE_OVERFLOW_THRESHOLD = 9

/** "9" stays "9", anything past `BADGE_OVERFLOW_THRESHOLD` collapses to "9+". */
function formatBadgeValue(badge: number): string {
  return badge > BADGE_OVERFLOW_THRESHOLD ? `${BADGE_OVERFLOW_THRESHOLD}+` : String(badge)
}

export interface SidebarItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof sidebarItemVariants> {
  /** Leading icon (e.g. an `<Icon>`). Rendered before the label. */
  icon?: ReactNode
  /** The visible label. Falls back to `children` when omitted; also the hint text. */
  label?: ReactNode
  /**
   * Render the single child (a router `Link`/`NavLink`) instead of a native
   * `<a>`, so navigation stays SPA. The active highlight + `aria-current` are
   * merged onto the child, and `icon`/`label` are injected around it — the
   * child only needs to provide the navigation (`to`/`href`), same as the
   * native `<a>` mode.
   */
  asChild?: boolean
  /**
   * Keyboard shortcut sequence (e.g. `['g', 'b']`). Typing it activates the item
   * (clicks it — letting the router or `<a>` navigate); a hint with the key chips
   * shows on hover/focus. Pass `label` for the hint text.
   */
  shortcut?: string[]
  /**
   * Numeric indicator (e.g. a pending-item count). Shown inline at the end of
   * the row when expanded, or as a pastille on the icon's corner when
   * collapsed. Omitted or `0` renders nothing. Values above 9 display as "9+".
   */
  badge?: number
  /**
   * Accessible text for `badge` (e.g. "1 pending"), already translated by
   * the app. Announced as part of the link's accessible name (visually
   * hidden) and shown in the collapsed hint tooltip. Ignored when `badge` is
   * omitted or `0`.
   */
  badgeLabel?: string
}

/**
 * A single sidebar navigation item. Must be a direct child of `Sidebar.Group`.
 * Pass `active` for the current route (sets `aria-current="page"` + highlight).
 * Use `asChild` to inject your router's `<Link>` while keeping styling + a11y, and
 * `shortcut` to bind a keyboard sequence + hint.
 */
export const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(function SidebarItem(
  {
    asChild,
    active,
    icon,
    label,
    href,
    shortcut,
    badge,
    badgeLabel,
    className,
    children,
    ...props
  },
  ref
) {
  // Default to expanded when used outside Sidebar.Root (e.g. in isolation).
  const sidebar = useContext(SidebarContext)
  const expanded = sidebar?.expanded ?? true
  const innerRef = useRef<HTMLAnchorElement | null>(null)

  const setRefs = (node: HTMLAnchorElement | null) => {
    innerRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  // WCAG 2.1.4: no listener and no hint once shortcuts are turned off app-wide.
  const shortcutsEnabled = sidebar?.shortcutsEnabled ?? true
  const activeShortcut = shortcutsEnabled ? shortcut : undefined

  // Typing the sequence activates the item; navigation stays the link's concern.
  useKeySequence(activeShortcut ?? [], () => innerRef.current?.click())

  // `badge` itself (not a derived boolean) drives every render decision below,
  // so "0 shows nothing" has a single source of truth.
  const badgeValue = badge ? formatBadgeValue(badge) : null

  // The number is announced through this hidden text, not through the visual
  // badge (which stays `aria-hidden`) — screen readers get the translated
  // phrase ("1 pending"), not a bare digit.
  const badgeAnnouncement =
    badgeValue && badgeLabel ? (
      <Text as="span" variant="caption" className="sr-only">
        {badgeLabel}
      </Text>
    ) : null

  const rowBadge =
    badgeValue && expanded ? (
      <Badge variant="solid" aria-hidden className={sidebarItemBadgeVariants({ placement: 'row' })}>
        {badgeValue}
      </Badge>
    ) : null

  const cornerBadge =
    badgeValue && !expanded ? (
      <Badge
        variant="solid"
        aria-hidden
        className={sidebarItemBadgeVariants({ placement: 'corner' })}
      >
        {badgeValue}
      </Badge>
    ) : null

  // Icon is shrink-0 and first, so it sits at a constant left offset — the
  // rail's width animates around it; only the label truncates away. `relative`
  // anchors the collapsed pastille (`cornerBadge`) to the icon's corner.
  const iconNode = icon ? (
    <Box className="relative shrink-0">
      {icon}
      {cornerBadge}
    </Box>
  ) : null

  const anchor = (
    <SidebarItemRoot
      ref={setRefs}
      asChild={asChild}
      aria-current={active ? 'page' : undefined}
      className={sidebarItemVariants({ active, className })}
      {...(asChild ? {} : { href })}
      {...props}
    >
      {/* Direct children, never grouped in a Fragment: Radix `Slot` (in
          `SidebarItemRoot`) reads `children` via `React.Children.forEach` — a
          single Fragment child would be treated as the slot target itself
          instead of its own items. */}
      {iconNode}
      {asChild ? (
        <SidebarItemSlottable>{children}</SidebarItemSlottable>
      ) : (
        <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      )}
      {asChild && label ? <span className="min-w-0 flex-1 truncate">{label}</span> : null}
      {/* A real space text node — screen readers concatenate element name
          contributions with no space of their own, so without it the
          announcement runs into the label ("Moderation1 pending"). */}
      {badgeAnnouncement ? ' ' : null}
      {badgeAnnouncement}
      {rowBadge}
    </SidebarItemRoot>
  )

  // Hint on hover/focus: the key chips when a shortcut is set (and enabled), and/or
  // the label when collapsed (it is truncated away in the rail). Needs Sidebar.Root's provider.
  const showHint = Boolean(activeShortcut) || !expanded

  return (
    <li>
      {showHint ? (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>{anchor}</Tooltip.Trigger>
          <Tooltip.Content side="right" sideOffset={8} className="flex items-center gap-2">
            {label}
            {badgeValue ? (
              <Badge variant="solid" className={sidebarItemBadgeVariants({ placement: 'row' })}>
                {badgeValue}
              </Badge>
            ) : null}
            {activeShortcut ? (
              <Tooltip.KeysChip
                keys={activeShortcut.map((key) => key.toUpperCase())}
                separator={sidebar?.shortcutSeparator}
              />
            ) : null}
          </Tooltip.Content>
        </Tooltip.Root>
      ) : (
        anchor
      )}
    </li>
  )
})
