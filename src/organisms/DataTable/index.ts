// Public surface of the DataTable organism. TanStack Table is abstracted here:
// apps consume the component AND its column types from this subpath
// (`import { DataTable, type ColumnDef } from 'goniui/data-table'`)
// and never import `@tanstack/react-table` directly (ADR-006, §5).
//
// Columns are plain `ColumnDef<TData>[]` (use `accessorKey` for the value and
// `cell: ({ row }) => row.original.field` for typed custom rendering). We do not
// re-export `createColumnHelper`: its per-column `TValue` makes a mixed array
// unassignable to `ColumnDef<TData>[]` without `any` — `row.original` gives the
// same type-safety with none of that.
export { DataTable, type DataTableProps } from './components/DataTable'
export {
  DataTableRowActions,
  type DataTableRowActionsLabels,
  type DataTableRowActionsProps,
} from './components/DataTableRowActions'
export {
  type DataTableRowAction,
  DataTableRowActionsMenu,
  type DataTableRowActionsMenuProps,
} from './components/DataTableRowActionsMenu'
export {
  useDataTable,
  type UseDataTableOptions,
  type UseDataTableResult,
} from './hooks/useDataTable'
export {
  type CellContext,
  type ColumnDef,
  type FilterFn,
  type SortingState,
} from '@tanstack/react-table'
