// Sonner-based toaster. Mount `<Toaster />` once at the app root, then fire toasts
// imperatively from anywhere: `import { toast } from 'goniui/toast'`.
//   toast.success('Saved') · toast.error(...) · toast.info(...) · toast.warning(...)
//   toast.promise(save(), { loading: 'Saving…', success: 'Saved', error: 'Failed' })
export { Toaster, type ToasterProps } from './components/Toaster'
export { toast } from './components/ToasterRoot'
