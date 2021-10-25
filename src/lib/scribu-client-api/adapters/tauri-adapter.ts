import { fs, invoke, path } from '@tauri-apps/api'
import { ScribuApi } from '../types/ScribuApi'
import { Workspace } from '../types/Workspace'

const newFileContents = '# new file bossule'

const readWorkspaces = () =>
  path
    .appDir()
    .then((appDirPath) => path.join(appDirPath, 'workspace.json'))
    .then<Workspace[]>((workspacePath) => {
      return fs
        .readTextFile(workspacePath)
        .then((r) => JSON.parse(r) as Workspace[])
    })

const changeCurrentFile = async (update: Workspace) => {
  const allWorkspaces = await readWorkspaces()

  const newWorkspace = allWorkspaces.map((workspace) =>
    workspace.id === update.id ? update : workspace,
  )

  const appDirPath = await path.appDir()
  const workspaceJsonPath = await path.join(appDirPath, 'workspace.json')

  await fs.writeFile({
    path: workspaceJsonPath,
    contents: JSON.stringify(newWorkspace),
  })

  return update
}

const replaceCurrentFile = async ({ workspaceId, filepath }) => {
  const oldWorkspace = await readWorkspaces()
  const newWorkspace = {
    ...oldWorkspace,
    currentFile: { path: filepath },
  }

  const appDirPath = await path.appDir()
  const workspaceJsonPath = await path.join(appDirPath, 'workspace.json')

  await fs.writeFile({
    path: workspaceJsonPath,
    contents: JSON.stringify(newWorkspace),
  })
  return newWorkspace
}

const createNewFile = async (atPath: string, contents = newFileContents) => {
  const oldWorkspace = await readWorkspaces()
  const newWorkspace = {
    ...oldWorkspace,
    currentFile: { path: atPath },
  }

  const appDirPath = await path.appDir()
  const workspaceJsonPath = await path.join(appDirPath, 'workspace.json')

  const _ = await Promise.all([
    fs.writeFile({
      path: atPath,
      contents,
    }),
    fs.writeFile({
      path: workspaceJsonPath,
      contents: JSON.stringify(newWorkspace),
    }),
  ])

  return newWorkspace
}

export const TauriAdapter: ScribuApi = {
  getWorkspaces: () => readWorkspaces(),

  // TODO maybe rename it to `readFileInWorkspace`???
  getFileInWorkspace: (path: string) => fs.readTextFile(path),

  persistDocument: (payload: { path: string; contents: string }) =>
    fs.writeFile(payload),

  openDocument: ({ workspaceId, filepath }) =>
    replaceCurrentFile({ workspaceId, filepath }),

  changeCurrentFile: (update: Workspace) => changeCurrentFile(update),

  createNewDocument: () =>
    path
      .documentDir()
      .then((docsPath) => path.join(docsPath, 'scribu'))
      .then((inDir) =>
        invoke('filepath_available', { inDir }).then((availPath: string) =>
          createNewFile(availPath),
        ),
      ),

  saveAsNewDocument: (path: string, contents: string) =>
    createNewFile(path, contents),
}
