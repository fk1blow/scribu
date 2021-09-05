import { fs, path } from '@tauri-apps/api'
import { ScribuApi, Workspace, WorkspaceStatus } from '../types/ScribuApi'

const emptyWorkspace: Workspace = {
  currentFile: { path: '' },
  status: WorkspaceStatus.WorkspacePristine,
  notifications: [],
}

const readOrCreateWorkspace = () =>
  path
    .configDir()
    .then((configDirPath) =>
      path.join(configDirPath, 'scribu', 'workspace.json'),
    )
    .then<Workspace>((workspacePath) => {
      return (
        fs
          .readTextFile(workspacePath)
          // cannot read scribu workspace.json so try to create an empty config
          .catch((e) => {
            return fs
              .writeFile({
                path: workspacePath,
                contents: JSON.stringify(emptyWorkspace),
              })
              .then((_) => fs.readTextFile(workspacePath))
          })
          .then((r) => JSON.parse(r) as Workspace)
      )
    })

const replaceWorkspaceCurrentFile = (newPath: string) => {
  return readOrCreateWorkspace()
    .then((workspace) => ({
      ...workspace,
      currentFile: { path: newPath },
    }))
    .then((newWorkspace) =>
      path
        .configDir()
        .then((configDirPath) =>
          path.join(configDirPath, 'scribu', 'workspace.json'),
        )
        .then((path) =>
          fs.writeFile({ path, contents: JSON.stringify(newWorkspace) }),
        )
        .then(() => newWorkspace)
    )
}

export const TauriAdapter: ScribuApi = {
  getWorkspace: () => readOrCreateWorkspace(),

  replaceCurrentFile: (path: string) => replaceWorkspaceCurrentFile(path),

  getFileInWorkspace: (path: string) => fs.readTextFile(path),

  saveCurrentFile: (payload: { path: string; contents: string }) =>
    fs.writeFile(payload),
}
