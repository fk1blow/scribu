import path from 'path'
import fs from 'fs-extra'
import { format } from 'date-fns'

const defaultWorkspace = (fileCurrent: Workspace.File) => {
  return {
    fileCurrent: fileCurrent,
    fileHistory: [fileCurrent],
  }
}

async function ensureWorkspaceExists(
  app: Electron.App,
): Promise<Workspace.Application> {
  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')
  const workspaceExists = await fs.pathExists(workspaceFilePath)

  if (!workspaceExists) {
    const now = new Date().getTime()
    const fileCurrent = format(now, 'yyyy-MM-dd')
    const startingDocFilePath = path.join(
      app.getPath('documents'),
      'scribu',
      `${fileCurrent}.md`,
    )
    const newWorkspaceFile: Workspace.File = {
      path: startingDocFilePath,
      meta: {
        createdAt: now,
        updatedAt: now,
      },
    }

    await fs.ensureFile(startingDocFilePath)

    await fs.writeJSON(
      workspaceFilePath,
      JSON.stringify(defaultWorkspace(newWorkspaceFile)),
    )
  }

  return fs
    .readJson(workspaceFilePath)
    .then((workspace) => JSON.parse(workspace))
}

export async function fetchWorkspace(
  app: Electron.App,
): Promise<{ workspace: Workspace.Application; document: string }> {
  const workspace = await ensureWorkspaceExists(app)
  const document = await fs
    .ensureFile(workspace.fileCurrent.path)
    .then(() => fs.readFile(workspace.fileCurrent.path))
    .then((content) => content.toString())

  return { workspace, document }
}

export async function writeToCurrentFile(
  app: Electron.App,
  payload: { content: string; filepath: string },
) {
  await fs.ensureFile(payload.filepath)
  await fs.writeFile(payload.filepath, payload.content)

  const { workspace } = await fetchWorkspace(app)
  const update: Workspace.Application = {
    ...workspace,
    fileCurrent: {
      ...workspace.fileCurrent,
      meta: {
        ...workspace.fileCurrent.meta,
        updatedAt: new Date().getTime(),
      },
    },
  }

  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')

  await fs.writeJSON(
    workspaceFilePath,
    JSON.stringify(update),
  )
}
