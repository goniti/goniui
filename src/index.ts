// Atoms
export { Badge, type BadgeProps, badgeVariants } from './atoms/Badge'
export { Button, type ButtonProps, buttonVariants } from './atoms/Button'
export { Card, type CardProps, cardVariants } from './atoms/Card'
export { Checkbox, type CheckboxProps, checkboxVariants } from './atoms/Checkbox'
export {
  brandIcons,
  type CustomIconComponent,
  Icon,
  type IconProps,
  iconVariants,
} from './atoms/Icon'
export { Input, type InputProps, inputVariants } from './atoms/Input'
export { type BlockElement, Box, type BoxProps } from './atoms/layout/Box'
export { Flex, type FlexProps, flexVariants } from './atoms/layout/Flex'
export { Grid, type GridProps, gridVariants } from './atoms/layout/Grid'
export { Link, type LinkKind, type LinkProps, linkVariants } from './atoms/Link'
export { listItemVariants, listRootVariants } from './atoms/List'
export { PasswordInput, type PasswordInputProps } from './atoms/PasswordInput'
export { Progress, type ProgressProps, progressVariants } from './atoms/Progress'
export {
  Select,
  SelectOption,
  type SelectOptionProps,
  type SelectProps,
  selectVariants,
} from './atoms/Select'
export { Separator, type SeparatorProps, separatorVariants } from './atoms/Separator'
export {
  Skeleton,
  type SkeletonElement,
  SkeletonGroup,
  type SkeletonGroupProps,
  type SkeletonProps,
  skeletonVariants,
} from './atoms/Skeleton'
export {
  Spinner,
  type SpinnerProps,
  spinnerSizePx,
  type SpinnerStyleProps,
  spinnerToneColor,
  spinnerVariants,
} from './atoms/Spinner'
export {
  StarRating,
  type StarRatingInteractiveProps,
  type StarRatingProps,
  type StarRatingReadOnlyProps,
} from './atoms/StarRating'
export { Switch, type SwitchProps, switchVariants } from './atoms/Switch'
export { Text, type TextProps, textVariants } from './atoms/Text'
export { Textarea, type TextareaProps, textareaVariants } from './atoms/Textarea'
export { Wordmark, type WordmarkProps, type WordmarkSize } from './atoms/Wordmark'

// Molecules
export {
  AssistedPasswordConfirm,
  type AssistedPasswordConfirmProps,
  type CharMatchStatus,
  passwordMatchStatuses,
  PasswordMatchStrip,
  type PasswordMatchStripProps,
} from './molecules/AssistedPasswordConfirm'
export { BackToTop, type BackToTopProps, backToTopVariants } from './molecules/BackToTop'
export {
  type PasswordRule,
  PasswordStrengthMeter,
  type PasswordStrengthMeterProps,
} from './molecules/PasswordStrengthMeter/PasswordStrengthMeter'
export { passwordRuleTests } from './molecules/PasswordStrengthMeter/rules'
// The Form compound is exposed under its own subpath for namespace import +
// tree-shaking: `import * as Form from 'goniui/form'`. FormField is
// internal to that compound and intentionally not re-exported here.
// FAQ follows the same pattern: `import * as FAQ from 'goniui/faq'`.
// Collapsible (Radix): `import * as Collapsible from 'goniui/collapsible'`.
// Calendar: `import * as Calendar from 'goniui/calendar'`.
// Carousel: `import * as Carousel from 'goniui/carousel'`.
// Agenda (range): `import * as Agenda from 'goniui/agenda'` or via `Date.Agenda`.
// Dialog (Radix): `import * as Dialog from 'goniui/dialog'`.
// DropdownMenu (Radix): `import * as DropdownMenu from 'goniui/dropdown-menu'`.
// Navbar: `import * as Navbar from 'goniui/navbar'`.
// NavigationMenu (Radix): `import * as NavigationMenu from 'goniui/navigation-menu'`.
// Tabs (Radix): `import * as Tabs from 'goniui/tabs'`.
// Toast (Radix): `import * as Toast from 'goniui/toast'`.
// Sheet (Radix Dialog): `import * as Sheet from 'goniui/sheet'`.
// Tooltip (Radix): `import * as Tooltip from 'goniui/tooltip'`.
// FileUpload: `import * as FileUpload from 'goniui/file-upload'`.
export { EmptyState, type EmptyStateProps } from './molecules/EmptyState'
export { PageHeader, type PageHeaderProps } from './molecules/PageHeader'
export {
  Pagination,
  PaginationLoadMore,
  type PaginationLoadMoreProps,
  type PaginationProps,
} from './molecules/Pagination'
// Countdown — also exposed as its own subpath: `import * as Countdown from 'goniui/countdown'`
export {
  Countdown,
  type CountdownFormat,
  type CountdownLabels,
  type CountdownProps,
  type CountdownTick,
  CountdownUnit,
  type CountdownUnitProps,
  countdownUnitVariants,
  countdownVariants,
  useCountdown,
} from './molecules/Countdown'
// The Table compound is exposed under its own subpath for namespace import +
// tree-shaking: `import * as Table from 'goniui/table'`.
// DataTable organism (headless on TanStack Table, ADR-006) is exposed under its
// own subpath, which also re-exports the column helpers/types:
// `import { DataTable, createColumnHelper } from 'goniui/data-table'`.
export {
  type SortDirection,
  type TableBodyProps,
  type TableCellProps,
  type TableHeaderProps,
  type TableHeadProps,
  tableHeadVariants,
  type TableRootProps,
  tableRootVariants,
  type TableRowProps,
  tableRowVariants,
} from './molecules/Table/index'

// Utilities
export { cn } from './lib/cn'
