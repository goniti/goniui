import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { type ColumnDef, DataTable, DataTableRowActions, DataTableRowActionsMenu } from './index'

interface Person {
  id: number
  name: string
  role: string
  age: number
}

const people: Person[] = [
  { id: 1, name: 'Alice Martin', role: 'Admin', age: 34 },
  { id: 2, name: 'Bob Dupont', role: 'Editor', age: 28 },
  { id: 3, name: 'Carla Nguyen', role: 'Viewer', age: 41 },
  { id: 4, name: 'David Okonkwo', role: 'Editor', age: 23 },
  { id: 5, name: 'Eliza Bennett', role: 'Admin', age: 37 },
]

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    meta: { label: 'Name', filterPlaceholder: 'Filter…', filterLabel: 'Filter by name' },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    meta: { label: 'Role', filterPlaceholder: 'Filter…', filterLabel: 'Filter by role' },
  },
  { accessorKey: 'age', header: 'Age', meta: { label: 'Age', filterLabel: 'Filter by age' } },
]

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable<Person>,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DataTable<Person>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns,
    data: people,
    searchPlaceholder: 'Search…',
    searchLabel: 'Search the table',
  },
}

export const WithoutSearch: Story = {
  args: {
    columns,
    data: people,
    enableGlobalFilter: false,
  },
}

const columnsWithFacetedRoleFilter: ColumnDef<Person>[] = [
  columns[0],
  {
    accessorKey: 'role',
    header: 'Role',
    filterFn: (row, columnId, filterValue: string[]) =>
      !filterValue?.length || filterValue.includes(row.getValue<string>(columnId)),
    meta: {
      label: 'Role',
      filterLabel: 'Filter by role',
      filterVariant: 'faceted',
      filterOptions: ['Admin', 'Editor', 'Viewer'],
      filterOptionRemoveLabel: (option) => `Retirer ${option}`,
    },
  },
  columns[2],
]

export const ColumnFilters: Story = {
  args: {
    columns: columnsWithFacetedRoleFilter,
    data: people,
    enableGlobalFilter: false,
    enableColumnFilters: true,
  },
}

export const ColumnVisibility: Story = {
  args: {
    columns,
    data: people,
    enableColumnVisibility: true,
    columnsLabel: 'Colonnes',
    searchPlaceholder: 'Search…',
    searchLabel: 'Search the table',
  },
}

export const Resizable: Story = {
  args: {
    columns,
    data: people,
    enableColumnResizing: true,
    resizeLabel: 'Redimensionner la colonne',
    enableGlobalFilter: false,
  },
}

export const RowSelection: Story = {
  args: {
    columns,
    data: people,
    enableGlobalFilter: false,
    enableRowSelection: true,
    selectAllLabel: 'Select all',
    selectRowLabel: 'Select row',
  },
}

export const Paginated: Story = {
  args: {
    columns,
    data: people,
    enableGlobalFilter: false,
    enablePagination: true,
    pageSize: 2,
    paginationLabels: { prev: 'Previous', next: 'Next', nav: 'Pagination' },
  },
}

export const PaginatedWithPageSizeSelector: Story = {
  args: {
    columns,
    data: people,
    enableGlobalFilter: false,
    enablePagination: true,
    pageSize: 2,
    paginationLabels: { prev: 'Previous', next: 'Next', nav: 'Pagination' },
    enablePageSizeSelector: true,
    pageSizeOptions: [2, 10, 20, 50],
    pageSizeLabel: 'Lignes par page',
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: people,
    enableGlobalFilter: false,
    isLoading: true,
    skeletonRowCount: 4,
  },
}

export const ColumnReordering: Story = {
  args: {
    columns,
    data: people,
    enableColumnReordering: true,
    columnDragLabel: 'Reorder column',
    enableGlobalFilter: false,
  },
}

function RowReorderingDemo() {
  const [rows, setRows] = useState(people)
  return (
    <DataTable
      columns={columns}
      data={rows}
      enableGlobalFilter={false}
      enableRowReordering
      getRowId={(person) => String(person.id)}
      onReorder={setRows}
      rowDragLabel="Move row"
    />
  )
}

export const RowReordering: Story = {
  args: { columns, data: people },
  render: () => <RowReorderingDemo />,
}

function RowActionsDemo() {
  const [rows, setRows] = useState(people)

  const columnsWithActions: ColumnDef<Person>[] = [
    ...columns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DataTableRowActions
          onEdit={() => {}}
          onDelete={() =>
            setRows((current) => current.filter((person) => person.id !== row.original.id))
          }
          labels={{ edit: 'Edit', delete: 'Delete' }}
        />
      ),
    },
  ]

  return (
    <DataTable
      columns={columnsWithActions}
      data={rows}
      enableGlobalFilter={false}
      enableRowReordering
      getRowId={(person) => String(person.id)}
      onReorder={setRows}
      rowDragLabel="Move row"
    />
  )
}

export const WithRowActions: Story = {
  args: { columns, data: people },
  render: () => <RowActionsDemo />,
}

function RowActionsMenuDemo() {
  const [rows, setRows] = useState(people)

  const columnsWithActionsMenu: ColumnDef<Person>[] = [
    ...columns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DataTableRowActionsMenu
          label="Actions"
          actions={[
            { label: 'Edit', onSelect: () => {} },
            {
              label: 'Dupliquer',
              onSelect: () => setRows((current) => [...current, row.original]),
            },
            { label: 'Archiver', onSelect: () => {} },
            { label: 'Exporter', onSelect: () => {} },
            {
              label: 'Delete',
              destructive: true,
              onSelect: () =>
                setRows((current) => current.filter((person) => person.id !== row.original.id)),
            },
          ]}
        />
      ),
    },
  ]

  return <DataTable columns={columnsWithActionsMenu} data={rows} enableGlobalFilter={false} />
}

export const WithRowActionsMenu: Story = {
  args: { columns, data: people },
  render: () => <RowActionsMenuDemo />,
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    searchPlaceholder: 'Search…',
    searchLabel: 'Search the table',
    emptyState: 'No results',
  },
}
