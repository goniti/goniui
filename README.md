# goniui

Neutral, themeable React components for **Tailwind CSS v4**, built on Radix primitives.
Black & white by default, with a dark mode — re-skin everything with a handful of CSS variables.

- ~50 components: atoms (`Button`, `Input`, `Select`, `Switch`, `Text`, `Flex`…), molecules
  (`Dialog`, `DropdownMenu`, `Tabs`, `Toast`, `Calendar`, `Agenda`, `Carousel`, `Form`…) and
  organisms (`DataTable`)
- Accessible by default (Radix primitives, axe-checked stories)
- Variants with `tailwind-variants`, `className` always wins (`tailwind-merge`)
- Icons from [Lucide](https://lucide.dev)

## Install

```sh
pnpm add goniui
# peer dependencies
pnpm add react react-dom tailwindcss
# only for goniui/form
pnpm add react-hook-form
```

## Setup

Import the stylesheet right after Tailwind in your app stylesheet:

```css
@import 'tailwindcss';
@import 'goniui/styles.css';
```

`goniui/styles.css` brings the design tokens, a minimal reset, the component animations and an
`@source` directive so Tailwind generates the classes used by the components.

## Usage

```tsx
import { Button } from 'goniui'
import * as Dialog from 'goniui/dialog'

export function DeleteProject() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="destructive">Delete</Button>
      </Dialog.Trigger>
      {/* … */}
    </Dialog.Root>
  )
}
```

Compound components are exposed as namespaces under their own subpath:

| Subpath                    |
| -------------------------- |
| `goniui/form`              |
| `goniui/faq`               |
| `goniui/carousel`          |
| `goniui/collapsible`       |
| `goniui/textarea`          |
| `goniui/calendar`          |
| `goniui/countdown`         |
| `goniui/agenda`            |
| `goniui/date-calendar`     |
| `goniui/date-agenda`       |
| `goniui/dialog`            |
| `goniui/dropdown-menu`     |
| `goniui/navbar`            |
| `goniui/navigation-menu`   |
| `goniui/pagination`        |
| `goniui/sidebar`           |
| `goniui/table`             |
| `goniui/segmented-control` |
| `goniui/tabs`              |
| `goniui/toast`             |
| `goniui/sheet`             |
| `goniui/tooltip`           |
| `goniui/list`              |
| `goniui/data-table`        |
| `goniui/file-upload`       |

## Theming

Every component reads semantic tokens. Override them in your stylesheet, after the import:

```css
:root {
  --primary-400: #2563eb; /* call-to-action fill */
  --primary-300: #1d4ed8; /* its hover */
  --primary-foreground: #ffffff; /* text on the call to action */
  --background: #ffffff;
  --foreground: #0a0a0a;
}

.dark {
  --primary-400: #60a5fa;
  --primary-foreground: #0a0a0a;
}
```

Add the `dark` class on `<html>` to switch to the dark theme. The full list of tokens lives in
[`src/styles/theme.css`](src/styles/theme.css).

## Development

```sh
pnpm install
pnpm storybook       # http://localhost:6006
pnpm test            # unit tests (jsdom)
pnpm test:storybook  # every story in Chromium, a11y included (pnpm exec playwright install chromium)
pnpm lint && pnpm typecheck && pnpm build
```

### Releasing

1. `pnpm changeset` — describe the change (patch / minor / major) and commit the generated file.
2. On `main`, the **Release** workflow opens a "Version packages" pull request.
3. Merging it publishes the new version to npm (with provenance).

## License

[MIT](LICENSE)
