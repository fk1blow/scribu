export interface ScribuApi {
  prepareWorkspace: () => Promise<CurrentFile>
  getFileInWorkspace: (path: string) => Promise<string>
  saveCurrentFile: (payload: { path: string; contents: string }) => Promise<any>
}

export interface CurrentFile {
  path: string
}

export enum WorkspaceStatus {
  WorkspacePrepared = 'WorkspacePrepared',
  WorkspaceLoadError = 'WorkspaceLoadError',
  WorkspacePristine = 'WorkspacePristine',
  DocumentLoaded = 'DocumentLoaded',
  DocumentLoadError = 'DocumentLoadError',
}

export interface Notification {
  type: WorkspaceStatus
}

export interface Workspace {
  currentFile: CurrentFile
  status: WorkspaceStatus
  notifications: Notification[]
  document?: string
}
