import { fs, invoke, path } from '@tauri-apps/api'
import { ScribuApi } from '../types/ScribuApi'
import { Workspace } from '../types/Workspace'

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

const replaceCurrentFile = (newPath: string) => {
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

const createNewFile = (atPath: string, contents = newFileContents) => {
  return readWorkspace()
    .then((workspace) => ({
      ...workspace,
      currentFile: { path: atPath },
    }))
    .then((workspace) =>
      path
        .appDir()
        .then((appDirPath) => path.join(appDirPath, 'workspace.json'))
        .then((workspaceJsonPath) =>
          Promise.all([
            fs.writeFile({
              path: atPath,
              contents,
            }),
            fs.writeFile({
              path: workspaceJsonPath,
              contents: JSON.stringify({
                ...workspace,
                currentFile: { path: atPath },
              }),
            }),
          ]).then((_) => workspace),
        ),
    )
}

export const TauriAdapter: ScribuApi = {
  getWorkspace: () => readWorkspace(),

  getFileInWorkspace: (path: string) => fs.readTextFile(path),

  saveCurrentFile: (payload: { path: string; contents: string }) =>
    fs.writeFile(payload),

  replaceCurrentFile: (path: string) => replaceCurrentFile(path),

  createNewFile: () =>
    path
      .documentDir()
      .then((docsPath) => path.join(docsPath, 'scribu'))
      .then((inDir) =>
        invoke('filepath_available', { inDir }).then((availPath: string) =>
          createNewFile(availPath),
        ),
      ),

  saveAsNewfile: (path: string, contents: string) =>
    createNewFile(path, contents),
}
