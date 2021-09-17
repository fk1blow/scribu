import { ScribuApi, Workspace, WorkspaceStatus } from '../types/ScribuApi'

const tmpMdContents = `
# itza meee, mark down

store the handlers using [this lib](https://github.com/jakearchibald/idb-keyval)

attempt to open up the latest file that was edited(opened)

build the *Commander* feature(fuzzy, files, commands, etc)

restore the cursor after getting bluring the commander(hit esc)`

const emptyWorkspace: Workspace = {
  currentFile: { path: 'my-path' },
  status: WorkspaceStatus.WorkspacePristine,
  notifications: [],
}

export const IndexedDbAdapter: ScribuApi = {
  getWorkspace: () => Promise.resolve(emptyWorkspace),

  getFileInWorkspace: (path: string) =>
    Promise.resolve(tmpMdContents),

  saveCurrentFile: (payload: { path: string; contents: string }) =>
    Promise.resolve(void 0),

  replaceCurrentFile: (payload: string) => Promise.reject(emptyWorkspace),

  createNewFile: (path) => Promise.reject(emptyWorkspace),

  saveAsNewfile: (path, contents) => Promise.reject(emptyWorkspace),
}
