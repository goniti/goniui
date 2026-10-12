import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { StarRating } from '../components/StarRating'

const STAR_LABELS = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars']

describe('StarRating', () => {
  describe('read-only mode', () => {
    it('renders as an accessible image with the given label', () => {
      render(<StarRating value={4.2} label="4.2 out of 5" />)
      expect(screen.getByRole('img', { name: '4.2 out of 5' })).toBeTruthy()
    })

    it('renders no interactive radio elements', () => {
      render(<StarRating value={4.2} label="4.2 out of 5" />)
      expect(screen.queryAllByRole('radio')).toHaveLength(0)
    })
  })

  describe('interactive mode', () => {
    it('renders a radiogroup with one radio per star, accessibly named', () => {
      render(
        <StarRating value={0} onRate={() => {}} label="Rate this game" starLabels={STAR_LABELS} />
      )
      expect(screen.getByRole('radiogroup', { name: 'Rate this game' })).toBeTruthy()
      const stars = screen.getAllByRole('radio')
      expect(stars).toHaveLength(5)
      expect(screen.getByRole('radio', { name: '3 stars' })).toBeTruthy()
    })

    it('calls onRate with the picked value when a star is clicked', () => {
      const onRate = vi.fn()
      render(
        <StarRating value={0} onRate={onRate} label="Rate this game" starLabels={STAR_LABELS} />
      )
      fireEvent.click(screen.getByRole('radio', { name: '4 stars' }))
      expect(onRate).toHaveBeenCalledWith(4)
    })

    it('reflects the current value via aria-checked', () => {
      render(
        <StarRating value={3} onRate={() => {}} label="Rate this game" starLabels={STAR_LABELS} />
      )
      expect(screen.getByRole('radio', { name: '3 stars' }).getAttribute('aria-checked')).toBe(
        'true'
      )
      expect(screen.getByRole('radio', { name: '5 stars' }).getAttribute('aria-checked')).toBe(
        'false'
      )
    })

    it('does not fire when disabled', () => {
      const onRate = vi.fn()
      render(
        <StarRating
          value={0}
          onRate={onRate}
          label="Rate this game"
          starLabels={STAR_LABELS}
          disabled
        />
      )
      fireEvent.click(screen.getByRole('radio', { name: '4 stars' }))
      expect(onRate).not.toHaveBeenCalled()
    })
  })
})
