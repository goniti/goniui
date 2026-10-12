// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Navbar from 'goniui/navbar'`
// then `<Navbar.Root>`, `<Navbar.Brand>`, `<Navbar.Actions>` — or import a piece
// directly. The Root is a `<header>` shell; render the nav links inside it with a
// `NavigationMenu` (the single nav-links widget — simple links or a mega-menu).
export { NavbarActions as Actions, type NavbarActionsProps } from './components/NavbarActions'
export { NavbarBrand as Brand, type NavbarBrandProps } from './components/NavbarBrand'
export { type NavbarRootProps, navbarVariants, NavbarRoot as Root } from './components/NavbarRoot'
