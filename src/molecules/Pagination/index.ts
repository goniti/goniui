// Compound parts (Radix/shadcn pattern) — consume as a namespace:
// `import * as Pagination from 'goniui/pagination'`
// then `<Pagination.Root>…<Pagination.Prev/><Pagination.Pages/><Pagination.Next/></Pagination.Root>`.
export {
  PaginationInfo as Info,
  type PaginationInfoProps,
  type PaginationRange,
} from './components/PaginationInfo'
export { PaginationLoadMore as LoadMore } from './components/PaginationLoadMore'
export { PaginationNext as Next, type PaginationNextProps } from './components/PaginationNext'
export { PaginationPages as Pages, type PaginationPagesProps } from './components/PaginationPages'
export {
  PaginationPageSize as PageSize,
  type PaginationPageSizeProps,
} from './components/PaginationPageSize'
export { type PaginationPrevProps, PaginationPrev as Prev } from './components/PaginationPrev'
export { type PaginationRootProps, PaginationRoot as Root } from './components/PaginationRoot'

// Flat offset preset + names kept on the barrel for back-compat.
export { Pagination, type PaginationProps } from './components/Pagination'
export { PaginationLoadMore, type PaginationLoadMoreProps } from './components/PaginationLoadMore'
