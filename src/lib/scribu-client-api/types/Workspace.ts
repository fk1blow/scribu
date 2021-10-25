import { WorkspaceDocument } from './WorkspaceDocument'
import { WorkspaceWindow } from './WorkspaceWindow'

type ActiveDocumentId = string

export interface Workspace {
  id: string | null
  currentFile: { path: string }
  window: WorkspaceWindow
  activeDocument?: ActiveDocumentId
  openedDocuments: WorkspaceDocument[]
  previousDocuments: WorkspaceDocument[]
}
