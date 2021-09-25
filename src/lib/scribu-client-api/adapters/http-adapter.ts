import { Workspace } from "../types/Workspace"
import { WorkspaceStatus } from "../types/WorkspaceStatus"

const emptyWorkspace: Workspace = {
  currentFile: { path: '' },
  status: WorkspaceStatus.WorkspacePristine,
  notifications: [],
}

export const HttpAdapter: any = {
  getWorkspace: () => Promise.resolve(emptyWorkspace),

  getFileInWorkspace: (path: string) =>
    Promise.resolve('this is me, the _file_'),

  saveCurrentFile: (payload: { path: string; contents: string }) =>
    Promise.resolve(void 0),

  replaceCurrentFile: (payload: string) => Promise.reject(emptyWorkspace)
}
