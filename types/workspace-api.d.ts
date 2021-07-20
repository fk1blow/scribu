declare namespace Workspace {
  export interface Application {
    fileCurrent: Workspace.File
    fileHistory: Workspace.File[]
  }

  export interface FileMeta {
    createdAt: number
    updatedAt: number
    createdBy: string
  }

  export interface File {
    name: string
    content: string
    meta?: FileMeta
  }
}
