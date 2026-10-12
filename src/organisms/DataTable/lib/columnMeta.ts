'use client'

import type { RowData } from '@tanstack/react-table'

/**
 * Per-column configuration apps attach via `columnDef.meta`. Augmenting the
 * library type keeps `column.columnDef.meta.*` type-safe (no `any`) and is the
 * one place TanStack lets us carry presentation/copy hints per column.
 */
declare module '@tanstack/react-table' {
  // The generic signature must match TanStack's `ColumnMeta` for declaration merging,
  // even though this augmentation references neither parameter.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Human-readable column name (column-visibility menu, etc.) — falls back to the column id. */
    label?: string
    /** Placeholder for this column's filter input (copy supplied by the app, §10). */
    filterPlaceholder?: string
    /** Accessible name for this column's filter trigger/input. */
    filterLabel?: string
    /**
     * `'text'` (default) renders a free-text input. `'faceted'` renders a
     * multi-select of `filterOptions` as toggleable badges — pair with a column
     * `filterFn` that reads the array filter value (e.g. `arrIncludesSome`).
     */
    filterVariant?: 'text' | 'faceted'
    /** Selectable values for `filterVariant: 'faceted'`. */
    filterOptions?: string[]
    /** Accessible name for a faceted option's dismiss (×) button — receives the option. */
    filterOptionRemoveLabel?: (option: string) => string
  }
}

export {}
