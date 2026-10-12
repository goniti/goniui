'use client'

import { ChevronDown } from 'lucide-react'
import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import * as Collapsible from '@/atoms/Collapsible'
import { Icon } from '@/atoms/Icon'
import { Flex } from '@/atoms/layout/Flex'
import { Separator } from '@/atoms/Separator'
import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'

export const faqItemVariants = tv({
  base: 'group relative',
  slots: {
    trigger:
      'w-full border-0 bg-transparent px-8 py-6 text-left transition-colors hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
    question:
      'pr-4 transition-all duration-300 group-data-[state=open]:bg-gradient-to-r group-data-[state=open]:from-primary-800 group-data-[state=open]:via-primary-600 group-data-[state=open]:to-primary-400 group-data-[state=open]:bg-clip-text group-data-[state=open]:text-transparent',
    chevron:
      'shrink-0 text-foreground-muted transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-700',
    answer: 'px-8 pb-6',
    divider:
      'pointer-events-none absolute inset-x-8 bottom-0 w-auto transition-colors duration-300 group-data-[state=open]:bg-primary-400/30 group-data-[state=closed]:bg-border',
  },
})

export interface FAQItemProps {
  question: ReactNode
  answer: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

/**
 * A single FAQ accordion row. Built on the Radix `Collapsible` atom (shadcn
 * pattern). Presentational — question and answer are passed as props (already
 * translated by the app).
 */
export function FAQItem({
  question,
  answer,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
}: FAQItemProps) {
  const styles = faqItemVariants()
  const isControlled = openProp !== undefined

  return (
    <Collapsible.Root
      className={cn(styles.base(), className)}
      {...(isControlled ? { open: openProp } : { defaultOpen })}
      onOpenChange={onOpenChange}
    >
      <Separator decorative className={styles.divider()} />

      <Collapsible.Trigger className={styles.trigger()}>
        <Flex align="center" justify="between" gap="md" className="w-full">
          <Text as="span" variant="h3" className={styles.question()}>
            {question}
          </Text>
          <Icon
            icon={ChevronDown}
            size="md"
            intent="current"
            className={styles.chevron()}
            aria-hidden
          />
        </Flex>
      </Collapsible.Trigger>

      <Collapsible.Content>
        <Text as="p" variant="bodyLg" tone="muted" className={styles.answer()}>
          {answer}
        </Text>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
