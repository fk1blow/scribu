import path from 'path'
import fs from 'fs-extra'

const defaultWorkspace = { fileCurrent: '', fileHistory: [] }

async function ensureWorkspaceExists(
  app: Electron.App,
): Promise<Workspace.Application> {
  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')
  const workspaceExists = await fs.pathExists(workspaceFilePath)
  if (!workspaceExists) {
    await fs.writeJSON(workspaceFilePath, JSON.stringify(defaultWorkspace))
  }
  return fs.readJson(workspaceFilePath).then((file) => JSON.parse(file))
}

export async function fetchWorkspace(
  app: Electron.App,
): Promise<Workspace.Application> {
  return ensureWorkspaceExists(app)
}

// export async function writeCurrentFile(app: Electron.App, content: string) {
//   const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')
//   const f = app.getPath('temp')
//   console.log('f: ', f)

//   const workspace = await ensureWorkspaceExists(app)
//   workspace.fileCurrent = {
//     ...workspace.fileCurrent,
//     content,
//   }
//   // ambigous interface - tbd
//   // workspace.fileHistory = [
//   //   ...workspace.fileHistory,
//   // ]

//   fs.writeJSON(workspaceFilePath, JSON.stringify(workspace))

//   return fs.readJson(workspaceFilePath).then((file) => JSON.parse(file))
// }

// save files to "Documents/scribu" folder
