import { fs, path } from '@tauri-apps/api'
import { ScribuApi, Workspace, WorkspaceStatus } from '../types/ScribuApi'

const readWorkspace = () =>
  path
    .appDir()
    .then((appDirPath) => path.join(appDirPath, 'workspace.json'))
    .then<Workspace>((workspacePath) => {
      return fs
        .readTextFile(workspacePath)
        .then((r) => JSON.parse(r) as Workspace)
    })

const replaceCurrentFilePath = (newPath: string) => {
  return readWorkspace()
    .then((workspace) => ({
      ...workspace,
      currentFile: { path: newPath },
    }))
    .then((newWorkspace) =>
      path
        .configDir()
        .then((configDirPath) =>
          path.join(configDirPath, 'app.scribu.dev', 'workspace.json'),
        )
        .then((workspaceJsonPath) =>
          fs.writeFile({
            path: workspaceJsonPath,
            contents: JSON.stringify(newWorkspace),
          }),
        )
        .then(() => newWorkspace),
    )
}

const createNewFileInWorkspace = (newFilePath: string) => {
  return readWorkspace()
    .then((workspace) => ({
      ...workspace,
      currentFile: { path: newFilePath },
    }))
    .then((workspace) =>
      path
        .appDir()
        .then((appDirPath) => path.join(appDirPath, 'workspace.json'))
        .then((workspaceJsonPath) =>
          Promise.all([
            fs.writeFile({
              path: newFilePath,
              contents: '# new file bossule',
            }),
            fs.writeFile({
              path: workspaceJsonPath,
              contents: JSON.stringify({
                ...workspace,
                currentFile: { path: newFilePath },
              }),
            }),
          ]).then((_) => workspace),
        ),
    )
}

export const TauriAdapter: ScribuApi = {
  getWorkspace: () => readWorkspace(),

  replaceCurrentFile: (path: string) => replaceCurrentFilePath(path),

  getFileInWorkspace: (path: string) => fs.readTextFile(path),

  saveCurrentFile: (payload: { path: string; contents: string }) =>
    fs.writeFile(payload),

  createNewFile: (path: string) => createNewFileInWorkspace(path)
}
