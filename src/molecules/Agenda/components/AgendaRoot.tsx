import { AgendaPanels, type AgendaPanelsProps } from './AgendaPanels'

/** @deprecated Use `AgendaPanels` — kept as alias for inline usage. */
export type AgendaRootProps = AgendaPanelsProps

/** Inline two-month range picker — prefer `Date.Agenda` compound for popover UX. */
export const AgendaRoot = AgendaPanels
