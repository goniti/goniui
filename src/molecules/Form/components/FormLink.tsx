'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface FormLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function FormLink({ className, children, ...props }: FormLinkProps) {
  return (
    <a
      className={cn(
        'font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
