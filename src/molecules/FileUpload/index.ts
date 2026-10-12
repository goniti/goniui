// Namespace-import pattern: `import * as FileUpload from 'goniui/file-upload'`
// then `<FileUpload.Root … />`, `<FileUpload.FileList … />`.
//
// Or import individual pieces directly:
// `import { FileUpload } from 'goniui/file-upload'`
export {
  FileUploadFileList as FileList,
  type FileUploadFileListProps as FileListProps,
} from './components/FileUploadFileList'
export {
  fileUploadVariants,
  FileUpload as Root,
  type FileUploadProps as RootProps,
} from './FileUpload'
