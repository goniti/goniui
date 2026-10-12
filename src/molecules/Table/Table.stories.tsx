import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import * as Table from './index'

const sampleUsers = [
  { id: 1, name: 'Alice Martin', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Dupont', role: 'Editor', status: 'Active', joined: '2024-03-22' },
  { id: 3, name: 'Carla Rossi', role: 'Viewer', status: 'Inactive', joined: '2023-11-08' },
  { id: 4, name: 'David Kim', role: 'Editor', status: 'Active', joined: '2024-05-01' },
  { id: 5, name: 'Eva Schneider', role: 'Admin', status: 'Active', joined: '2023-09-14' },
] as const

const meta = {
  title: 'Molecules/Table',
  component: Table.Root,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Joined</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sampleUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
              <Table.Cell>{user.joined}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
}

export const Striped: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Joined</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sampleUsers.map((user) => (
            <Table.Row key={user.id} striped>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
              <Table.Cell>{user.joined}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
}

export const Compact: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sampleUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
}

/** Controlled sortable columns — click a header to toggle asc/desc. */
export const Sortable: Story = {
  render: function SortableStory() {
    type SortKey = 'name' | 'role' | 'joined'
    const [sortKey, setSortKey] = useState<SortKey | null>(null)
    const [sortDir, setSortDir] = useState<Table.SortDirection>('asc')

    const handleSort = (key: SortKey) => (direction: Table.SortDirection) => {
      setSortKey(key)
      setSortDir(direction)
    }

    const sorted = [...sampleUsers].sort((rowA, rowB) => {
      if (!sortKey) return 0
      const multiplier = sortDir === 'asc' ? 1 : -1
      return rowA[sortKey].localeCompare(rowB[sortKey]) * multiplier
    })

    return (
      <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head
                sortable
                sortDirection={sortKey === 'name' ? sortDir : undefined}
                onSort={handleSort('name')}
              >
                Name
              </Table.Head>
              <Table.Head
                sortable
                sortDirection={sortKey === 'role' ? sortDir : undefined}
                onSort={handleSort('role')}
              >
                Role
              </Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head
                sortable
                sortDirection={sortKey === 'joined' ? sortDir : undefined}
                onSort={handleSort('joined')}
              >
                Joined
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sorted.map((user) => (
              <Table.Row key={user.id} striped>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.status}</Table.Cell>
                <Table.Cell>{user.joined}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sampleUsers.map((user) => (
            <Table.Row key={user.id} interactive onClick={() => alert(`Selected: ${user.name}`)}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
}
