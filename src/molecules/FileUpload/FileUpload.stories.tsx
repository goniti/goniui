import type { Meta, StoryObj } from '@storybook/react-vite'

import { FileUpload } from './FileUpload'

const meta = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  args: {
    onFiles: () => {},
    label: 'Drop file here or click to browse',
    hint: 'JPEG, PNG, WebP — max 5 MB',
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

/** Default single-file drop zone. */
export const SingleFile: Story = {
  args: {
    accept: 'image/jpeg,image/png,image/webp',
    multiple: false,
  },
}

/** Multiple files allowed — the file list grows with each addition. */
export const MultiFile: Story = {
  args: {
    multiple: true,
    hint: 'Any file type — max 5 MB each',
  },
}

/** Disabled state — cursor changes, zone fades, no interaction possible. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    // Disabled: the zone dims via `opacity-60`. WCAG 1.4.3 exempts inactive
    // components from the contrast minimum, so axe's color-contrast rule (which
    // sees only the dimmed pixels, not the disabled semantics) doesn't apply.
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
}

/** Zone in drag-over state — rendered by forcing the internal `data-drag-over`
 *  via Storybook decorators is not needed; this story documents the visual.
 *  To see it: drag a file over the zone in the canvas. */
export const DragOver: Story = {
  args: {
    accept: 'image/jpeg,image/png,image/webp',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Drag a file onto the zone in the canvas to see the `dragOver` state (primary border + tint).',
      },
    },
  },
}
