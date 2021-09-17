import { fs, path } from '@tauri-apps/api'
import { ScribuApi, Workspace, WorkspaceStatus } from '../types/ScribuApi'

const newFileContents = '# new file bossule'

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

const createNewFileInWorkspace = (
  newFilePath: string,
  contents = newFileContents,
) => {
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
              contents,
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

  replaceCurrentFile: (path) => replaceCurrentFilePath(path),

  getFileInWorkspace: (path) => fs.readTextFile(path),

  saveCurrentFile: (payload) => fs.writeFile(payload),

  createNewFile: (path) => createNewFileInWorkspace(path),

  saveAsNewfile: (path, contents) => createNewFileInWorkspace(path, contents),
}
