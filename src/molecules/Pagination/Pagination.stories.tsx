import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import * as Pagination from './index'

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination.Pagination,
  args: {
    page: 5,
    totalPages: 10,
    onPageChange: () => {},
    prevLabel: 'Previous page',
    nextLabel: 'Next page',
  },
} satisfies Meta<typeof Pagination.Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FirstPage: Story = { args: { page: 1 } }

export const LastPage: Story = { args: { page: 10 } }

export const FewPages: Story = { args: { page: 2, totalPages: 4 } }

function ControlledDemo() {
  const [page, setPage] = useState(5)
  return (
    <Pagination.Pagination
      page={page}
      totalPages={10}
      onPageChange={setPage}
      prevLabel="Previous page"
      nextLabel="Next page"
    />
  )
}

export const Controlled: Story = { render: () => <ControlledDemo /> }

/** Pattern 3 — prev/next only, composed from the compound parts (no page numbers). */
function SimpleDemo() {
  const [page, setPage] = useState(3)
  return (
    <Pagination.Root page={page} totalPages={6} onPageChange={setPage}>
      <Pagination.Prev />
      <Pagination.Next />
    </Pagination.Root>
  )
}

export const SimplePrevNext: StoryObj = { render: () => <SimpleDemo /> }

/** Offset with a range summary — `Pagination.Info` renders the copy from the range. */
function WithInfoDemo() {
  const [page, setPage] = useState(4)
  return (
    <Pagination.Root page={page} totalPages={8} onPageChange={setPage}>
      <Pagination.Info pageSize={20} totalItems={150}>
        {({ from, to, total }) => `Showing ${from}–${to} of ${total}`}
      </Pagination.Info>
      <Pagination.Prev />
      <Pagination.Pages />
      <Pagination.Next />
    </Pagination.Root>
  )
}

export const WithInfo: StoryObj = { render: () => <WithInfoDemo /> }

/** Pattern 2 — cursor / infinite. */
function LoadMoreDemo() {
  const [count, setCount] = useState(5)
  const total = 20
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-neutral-600">
        Showing {count} of {total} results
      </p>
      <Pagination.LoadMore
        hasMore={count < total}
        onClick={() => setCount((prev) => Math.min(prev + 5, total))}
        label="Load more"
      />
    </div>
  )
}

export const LoadMorePattern: StoryObj = { render: () => <LoadMoreDemo /> }

export const LoadMoreLoading: StoryObj = {
  render: () => <Pagination.LoadMore onClick={() => {}} loading hasMore label="Load more" />,
}

/** Standalone page-size selector — works outside `Pagination.Root`. */
function PageSizeDemo() {
  const [pageSize, setPageSize] = useState(20)
  return (
    <Pagination.PageSize
      value={pageSize}
      options={[20, 50, 100]}
      onValueChange={setPageSize}
      label="Items per page"
    />
  )
}

export const PageSize: StoryObj = { render: () => <PageSizeDemo /> }
