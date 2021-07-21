declare namespace Workspace {
  export interface Application {
    fileCurrent: Workspace.File
    fileHistory: Workspace.File[]
  }

  export interface FileMeta {
    createdAt: number
    updatedAt: number
  }

  export interface File {
    path: string
    name: string
    meta: FileMeta
  }
}
