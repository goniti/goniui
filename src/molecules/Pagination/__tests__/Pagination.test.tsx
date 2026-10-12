import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from '../components/Pagination'
import { PaginationInfo } from '../components/PaginationInfo'
import { PaginationLoadMore } from '../components/PaginationLoadMore'
import { PaginationNext } from '../components/PaginationNext'
import { PaginationPages } from '../components/PaginationPages'
import { PaginationPrev } from '../components/PaginationPrev'
import { PaginationRoot } from '../components/PaginationRoot'
import { pageRange } from '../lib/pageRange'

describe('pageRange', () => {
  it('returns empty for totalPages <= 1', () => {
    expect(pageRange(1, 1)).toEqual([])
    expect(pageRange(1, 0)).toEqual([])
  })

  it('returns all pages when total is small', () => {
    expect(pageRange(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('inserts ellipsis for large page counts', () => {
    const result = pageRange(5, 20)
    expect(result).toContain('ellipsis')
    expect(result[0]).toBe(1)
    expect(result[result.length - 1]).toBe(20)
  })

  it('always includes the current page and its neighbors', () => {
    const result = pageRange(10, 20)
    expect(result).toContain(8)
    expect(result).toContain(9)
    expect(result).toContain(10)
    expect(result).toContain(11)
    expect(result).toContain(12)
  })
})

describe('Pagination', () => {
  it('renders nothing when totalPages <= 1', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('has a nav landmark with accessible label', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={vi.fn()} label="Page navigation" />)
    expect(screen.getByRole('navigation', { name: 'Page navigation' })).toBeTruthy()
  })

  it('disables prev button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} prevLabel="Previous page" />)
    const prev = screen.getByRole('button', { name: 'Previous page' }) as HTMLButtonElement
    expect(prev.disabled).toBe(true)
  })

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} nextLabel="Next page" />)
    const next = screen.getByRole('button', { name: 'Next page' }) as HTMLButtonElement
    expect(next.disabled).toBe(true)
  })

  it('calls onPageChange with the next page on next click', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} nextLabel="Next page" />)
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with the previous page on prev click', () => {
    const onPageChange = vi.fn()
    render(
      <Pagination page={3} totalPages={5} onPageChange={onPageChange} prevLabel="Previous page" />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('marks the current page button with aria-current="page"', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />)
    const page3 = screen.getByRole('button', { name: 'Page 3' })
    expect(page3.getAttribute('aria-current')).toBe('page')
  })

  it('calls onPageChange when a numbered page is clicked', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Page 4' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })
})

describe('Pagination compound', () => {
  it('Root exposes a nav landmark and its parts consume the page context', () => {
    const onPageChange = vi.fn()
    render(
      <PaginationRoot page={2} totalPages={5} onPageChange={onPageChange} label="Page navigation">
        <PaginationPrev />
        <PaginationPages />
        <PaginationNext />
      </PaginationRoot>
    )
    expect(screen.getByRole('navigation', { name: 'Page navigation' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Page 2' }).getAttribute('aria-current')).toBe('page')

    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(onPageChange).toHaveBeenCalledWith(1)
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('simple prev/next: Pages renders no numbers without a totalPages', () => {
    render(
      <PaginationRoot page={2} onPageChange={vi.fn()}>
        <PaginationPrev />
        <PaginationPages />
        <PaginationNext />
      </PaginationRoot>
    )
    expect(screen.queryByRole('button', { name: /^Page \d/ })).toBeNull()
    // Next stays enabled when the end is unknown.
    expect((screen.getByRole('button', { name: 'Next page' }) as HTMLButtonElement).disabled).toBe(
      false
    )
  })

  it('Info computes and renders the item range from the context page', () => {
    render(
      <PaginationRoot page={4} totalPages={8} onPageChange={vi.fn()}>
        <PaginationInfo pageSize={20} totalItems={150}>
          {({ from, to, total }) => `Showing ${from}–${to} of ${total}`}
        </PaginationInfo>
      </PaginationRoot>
    )
    expect(screen.getByText('Showing 61–80 of 150')).toBeTruthy()
  })

  it('Info clamps to 0–0 when there are no items', () => {
    render(
      <PaginationRoot page={1} totalPages={1} onPageChange={vi.fn()}>
        <PaginationInfo pageSize={20} totalItems={0}>
          {({ from, to, total }) => `${from}–${to} of ${total}`}
        </PaginationInfo>
      </PaginationRoot>
    )
    expect(screen.getByText('0–0 of 0')).toBeTruthy()
  })
})

describe('PaginationLoadMore', () => {
  it('renders nothing when hasMore is false', () => {
    const { container } = render(<PaginationLoadMore onClick={vi.fn()} hasMore={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the button when hasMore is true', () => {
    render(<PaginationLoadMore onClick={vi.fn()} hasMore label="Load more" />)
    expect(screen.getByRole('button', { name: 'Load more' })).toBeTruthy()
  })

  it('disables the button when loading', () => {
    render(<PaginationLoadMore onClick={vi.fn()} hasMore loading label="Load more" />)
    const btn = screen.getByRole('button', { name: 'Load more' }) as HTMLButtonElement
    expect(btn.disabled).toBe(true)
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<PaginationLoadMore onClick={onClick} hasMore label="Load more" />)
    fireEvent.click(screen.getByRole('button', { name: 'Load more' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
