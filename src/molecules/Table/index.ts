// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Table from 'goniui/table'`
// then `<Table.Container>`, `<Table.Root>`, `<Table.Header>`, `<Table.Body>`,
// `<Table.Row>`, `<Table.Head>`, `<Table.Cell>` — or import a single piece directly.
export { TableBody as Body, type TableBodyProps } from './components/TableBody'
export { TableCell as Cell, type TableCellProps } from './components/TableCell'
export { TableContainer as Container, type TableContainerProps } from './components/TableContainer'
export {
  TableHead as Head,
  type SortDirection,
  type TableHeadProps,
  tableHeadVariants,
} from './components/TableHead'
export { TableHeader as Header, type TableHeaderProps } from './components/TableHeader'
export { TableRoot as Root, type TableRootProps, tableRootVariants } from './components/TableRoot'
export { TableRow as Row, type TableRowProps, tableRowVariants } from './components/TableRow'
