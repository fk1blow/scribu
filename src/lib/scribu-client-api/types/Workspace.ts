import { Notification } from './Notification'
import { WorkspaceStatus } from './WorkspaceStatus'

export interface Workspace {
  currentFile: { path: string }
  status: WorkspaceStatus
  notifications: Notification[]
  document?: string
}
