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
  const workspaceExists = await fs
    .pathExists(workspaceFilePath)
    .catch((e) => console.log('e: ', e))

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
      name: fileCurrent,
      meta: {
        createdAt: now,
        updatedAt: now,
      },
    }

    await fs.ensureFile(startingDocFilePath)

    await fs.writeJSON(workspaceFilePath, defaultWorkspace(newWorkspaceFile))
  }

  return fs.readJson(workspaceFilePath).then((workspace) => workspace)
}

export async function fetchWorkspace(
  app: Electron.App,
): Promise<{ workspace: Workspace.Application; document: string }> {
  const workspace = await ensureWorkspaceExists(app)
  const document = await fs
    .ensureFile(workspace.fileCurrent.path)
    .then(() => fs.readFile(workspace.fileCurrent.path))
    .then((content) => {
      return content.toString()
    })

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

  await fs.writeJSON(workspaceFilePath, update)
}

export async function createNewFile(app: Electron.App) {
  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')

  const { workspace } = await fetchWorkspace(app)

  const now = new Date().getTime()
  let fileCurrent = format(now, 'yyyy-MM-dd')
  let startingDocFilePath = path.join(
    app.getPath('documents'),
    'scribu',
    `${fileCurrent}.md`,
  )

  const fileAlreadyExists = await fs.pathExists(startingDocFilePath)

  // if (fileAlreadyExists) fileCurrent = `${fileCurrent}(1)`
  if (fileAlreadyExists) {
    fileCurrent = `${fileCurrent}(1)`
    startingDocFilePath = path.join(
      app.getPath('documents'),
      'scribu',
      `${fileCurrent}.md`,
    )
  }

  await fs.ensureFile(startingDocFilePath)

  const newFileCurrent = {
    path: startingDocFilePath,
    name: fileCurrent,
    meta: {
      createdAt: now,
      updatedAt: now,
    },
  }

  const update: Workspace.Application = {
    ...workspace,
    fileCurrent: newFileCurrent,
    fileHistory: [newFileCurrent, ...workspace.fileHistory],
  }

  await fs.writeJSON(workspaceFilePath, update)
}
