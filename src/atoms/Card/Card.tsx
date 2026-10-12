'use client'

import { type HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/cn'

export const cardVariants = tv({
  base: 'overflow-hidden rounded-xl border border-border bg-surface',
  variants: {
    variant: {
      default: '',
      /** Auth screens: no chrome — the form group sits directly on the layout
       * background (the split-screen shell owns the framing). */
      auth: 'border-0 bg-transparent p-0',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

function Card({ variant, className, ...props }: CardProps) {
  return <div className={cardVariants({ variant, className })} {...props} />
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-b border-border px-5 py-4', className)} {...props} />
}

function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-4', className)} {...props} />
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-t border-border px-5 py-4', className)} {...props} />
}

// Compound component: parts only make sense inside a Card.
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
