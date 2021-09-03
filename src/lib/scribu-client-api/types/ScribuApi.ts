export interface ScribuApi {
  prepareWorkspace: () => Promise<Workspace>
}

export interface CurrentFile {
  path: string
  filename: string
  contents: string
}

export enum NotificationType {
  WorkspacePrepared = 'WorkspacePrepared',
  WorkspaceLoadError = 'WorkspaceLoadError',
  WorkspacePristine = 'WorkspacePristine',
}

export interface Notification {
  type: NotificationType
}

export interface Workspace {
  currentFile: CurrentFile
  notifications: Notification[]
}
