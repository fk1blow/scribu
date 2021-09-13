export interface ScribuApi {
  getWorkspace: () => Promise<Workspace>
  getFileInWorkspace: (path: string) => Promise<string>
  saveCurrentFile: (payload: { path: string; contents: string }) => Promise<void>
  replaceCurrentFile: (payload: string) => Promise<Workspace>
  createNewFile: (path: string) => Promise<Workspace>
  saveAsNewfile: (path: string, contents: string) => Promise<Workspace>
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
  DocumentSaveError = 'DocumentSaveError',
  DocumentNewError = 'DocumentNewError',
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
