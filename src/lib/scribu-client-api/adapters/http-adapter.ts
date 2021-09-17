import { ScribuApi, Workspace, WorkspaceStatus } from '../types/ScribuApi'

const tmpMdContents = `
# itza meee, mark down

sup, broz?!`

const emptyWorkspace: Workspace = {
  currentFile: { path: 'my-path' },
  status: WorkspaceStatus.WorkspacePristine,
  notifications: [],
}

export const HttpAdapter: ScribuApi = {
  getWorkspace: () => Promise.resolve(emptyWorkspace),

  getFileInWorkspace: (path: string) =>
    Promise.resolve(tmpMdContents),

  saveCurrentFile: (payload: { path: string; contents: string }) =>
    Promise.resolve(void 0),

  replaceCurrentFile: (payload: string) => Promise.reject(emptyWorkspace),

  createNewFile: (path) => Promise.reject(emptyWorkspace),

  saveAsNewfile: (path, contents) => Promise.reject(emptyWorkspace),
}
