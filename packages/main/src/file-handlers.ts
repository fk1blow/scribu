import path from 'path'
import fs, { ensureFile } from 'fs-extra'
import { format } from 'date-fns'
import unusedFilename from 'unused-filename'

// it creates a workspace no matter what and fill the `fileCurrent`
// with empty strings(not safe but...)
async function ensureWorkspaceExists(
  app: Electron.App,
): Promise<Workspace.Application> {
  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')
  const workspaceExists = await fs.pathExists(workspaceFilePath)

  if (!workspaceExists) {
    await fs.writeJSON(workspaceFilePath, {
      fileCurrent: { path: '', name: '', meta: {} },
      fileHistory: [],
    })
  }

  return fs.readJson(workspaceFilePath) // .then((workspace) => workspace)
}

// creates a new `fileCurrent` and ensures it on disk
async function createGenericFileCurrent(
  app: Electron.App,
): Promise<Workspace.File> {
  const now = new Date().getTime()

  const fileName = format(now, 'yyyy-MM-dd')
  const filePath = path.join(
    app.getPath('documents'),
    'scribu',
    `${fileName}.md`,
  )
  const newWorkspaceFile: Workspace.File = {
    path: filePath,
    name: `${fileName}.md`,
    meta: {
      createdAt: now,
      updatedAt: now,
    },
  }

  // ensure the fileCurrent at filePath exists
  await fs.ensureFile(filePath)

  return newWorkspaceFile
}

// ensures that path to file at `fileCurrent.path` exists
// if the file doesn't exists, create it then update the workspace
async function ensureWorkspaceAndFileCurrentExists(
  app: Electron.App,
): Promise<Workspace.Application> {
  const workspace = await ensureWorkspaceExists(app)
  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')

  // if the entry seems to exists, ensure the file is there
  // or create a new fileCurrent and update the workspace
  // with a reference to its path
  if (workspace.fileCurrent.path.length) {
    await ensureFile(workspace.fileCurrent.path)
    return workspace
  } else {
    const newFileCurrent = await createGenericFileCurrent(app)

    // write the new updated workspace
    await fs.writeJSON(workspaceFilePath, {
      fileCurrent: newFileCurrent,
      fileHistory: [newFileCurrent, ...workspace.fileHistory],
    })

    // read and return the updated workspace
    return fs.readJson(workspaceFilePath)
  }
}

export async function fetchWorkspace(
  app: Electron.App,
): Promise<{ workspace: Workspace.Application; document: string }> {
  const workspace = await ensureWorkspaceAndFileCurrentExists(app)

  const document = await fs
    .readFile(workspace.fileCurrent.path)
    .then((c) => c.toString())

  return { workspace, document }
}

export async function writeToFileCurrent(app: Electron.App, content: string) {
  const { workspace } = await fetchWorkspace(app)

  // update current file
  await fs.writeFile(workspace.fileCurrent.path, content)

  // update workspace
  // ...
  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')

  const now = new Date().getTime()

  const fileHistoryUpdate = workspace.fileHistory.map((f) => {
    if (f.path === workspace.fileCurrent.path) {
      return { ...f, meta: { ...f.meta, updatedAt: now } }
    }
    return f
  })

  const fileCurrentUpdate = {
    ...workspace.fileCurrent,
    meta: {
      ...workspace.fileCurrent.meta,
      updatedAt: now,
    },
  }

  const update: Workspace.Application = {
    ...workspace,
    fileCurrent: fileCurrentUpdate,
    fileHistory: fileHistoryUpdate,
  }

  await fs.writeJSON(workspaceFilePath, update)
}

// defines a file path to `documents/scribu`, writes the wilf to the path
// updates the workspace, switching the `fileCurrent` and returns
// the newly created document and updated workspace
export async function createAndReplaceFileCurrent(app: Electron.App) {
  const workspaceFilePath = path.join(app.getPath('userData'), 'workspace.json')

  const fileName = format(new Date().getTime(), 'yyyy-MM-dd')

  const filePath = path.join(
    app.getPath('documents'),
    'scribu',
    `${fileName}.md`,
  )

  const { workspace } = await fetchWorkspace(app)
  const filePathUnused = await unusedFilename(filePath)

  await fs.outputFile(filePathUnused, 'gg scribule')

  const now = new Date().getTime()

  const fileCurrent = {
    path: filePathUnused,
    name: path.basename(filePathUnused),
    meta: {
      createdAt: now,
      updatedAt: now,
    },
  }

  const workspaceUpdate: Workspace.Application = {
    fileCurrent,
    fileHistory: [fileCurrent, ...workspace.fileHistory],
  }

  await fs.writeJSON(workspaceFilePath, workspaceUpdate)
  const document = await fs.readFile(filePathUnused).then((c) => {
    const x = c.toString()
    // console.log('x: ', x)
    return x
  })

  return { document, workspace: workspaceUpdate }
}
