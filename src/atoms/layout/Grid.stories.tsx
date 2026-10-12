import type { Meta, StoryObj } from '@storybook/react-vite'

import { Grid } from './Grid'

const meta = {
  title: 'Atoms/Layout/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Item = ({ label }: { label: string }) => (
  <div className="rounded bg-primary-100 px-3 py-2 text-center text-sm text-primary-700">
    {label}
  </div>
)

export const ThreeColumns: Story = {
  render: () => (
    <Grid cols={{ base: 3 }} gap="md">
      {Array.from({ length: 6 }, (_, index) => (
        <Item key={index} label={`Cell ${index + 1}`} />
      ))}
    </Grid>
  ),
}

export const Centered: Story = {
  render: () => (
    <Grid place="center" className="h-40 rounded border border-neutral-200">
      <Item label="Centered" />
    </Grid>
  ),
}

export const ColsScale: Story = {
  render: () => (
    <Grid cols={{ base: 1 }} gap="lg">
      {([1, 2, 3, 4, 5, 6] as const).map((count) => (
        <div key={count}>
          <p className="mb-1 text-xs text-neutral-500">cols={`{ base: ${count} }`}</p>
          <Grid cols={{ base: count }} gap="sm">
            {Array.from({ length: count }, (_, index) => (
              <Item key={index} label={`${index + 1}`} />
            ))}
          </Grid>
        </div>
      ))}
    </Grid>
  ),
}

export const Responsive: Story = {
  name: 'Mobile-first — resize the viewport',
  render: () => (
    <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
      {Array.from({ length: 8 }, (_, index) => (
        <Item key={index} label={`Cell ${index + 1}`} />
      ))}
    </Grid>
  ),
}

export const AsSection: Story = {
  name: 'as="section"',
  render: () => (
    <Grid
      as="section"
      cols={{ base: 2 }}
      gap="md"
      className="rounded-lg border border-neutral-200 p-4"
    >
      <Item label="Section cell 1" />
      <Item label="Section cell 2" />
    </Grid>
  ),
}
