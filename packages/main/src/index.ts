import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { URL } from 'url'
import fs from 'fs-extra'

import { showAppMenu } from './menu'

import { fetchWorkspace, writeToFileCurrent } from './file-handlers'

import type sqlite3 from 'sqlite3'

const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

app.disableHardwareAcceleration()
app.setName('Scribu')

/**
 * Workaround for TypeScript bug
 * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
 */
const env = import.meta.env

// Install "Vue.js devtools"
if (env.MODE === 'development') {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    // .then(
    //   ({ default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS }) =>
    //     installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], {
    //       loadExtensionOptions: {
    //         allowFileAccess: true,
    //       },
    //     }),
    // )
    // .catch((e) => console.error('Failed install extension:', e))
}

let mainWindow: BrowserWindow | null = null

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    show: false, // Use 'ready-to-show' event to show window
    // titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      contextIsolation: env.MODE !== 'test', // Spectron tests can't work with contextIsolation: true
      enableRemoteModule: env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
    },
  })

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.maximize()
    mainWindow?.show()

    if (env.MODE === 'development') {
      mainWindow?.webContents.openDevTools()
    }
  })

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    env.MODE === 'development'
      ? env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()

  await mainWindow.loadURL(pageUrl)
}

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e))

// Auto-updates
if (env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e))
}

// various stuff tbd

app.whenReady().then(async () => {
  ipcMain.handle('app-ready', async (evt) => {
    const workspace = await fetchWorkspace(app)
    evt.sender.send('workspace-ready', workspace)
  })

  ipcMain.handle('write-to-current-file', async (evt, data: string) => {
    writeToFileCurrent(app, data)
  })

  // ipcMain.handle('write-current-file', (_evt, content: string) =>
  //   writeToFileCurrent(app, content),
  // )

  showAppMenu(app, mainWindow?.webContents)




  // ------------------------------------------

  const sqlite3 = require('sqlite3').verbose()
  const db: sqlite3.Database = new sqlite3.Database(':memory:')

  db.serialize(function () {
    // db.run('CREATE TABLE lorem (info TEXT)')
    // db.run('CREATE VIRTUAL TABLE docs USING fts5(sender, title, body);')

    db.run('CREATE TABLE documents (body);')
    // db.run('CREATE VIRTUAL TABLE documents USING FTS5(body);')
    // db.run(`INSERT INTO posts(title,body)
    // VALUES('2021-07-26 (4).md', '${foo}');`)

    db.run(`INSERT INTO documents VALUES ('no bears allowed to have ideeas')`)
    const stmt = db.prepare('INSERT INTO documents VALUES (?)')
    // stmt.run(`${foo}`)
    stmt.finalize()

    // const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
    // for (let i = 0; i < 10; i++) {
    //   stmt.run('Ipsum ' + i)
    // }
    // stmt.finalize()

    // db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    //   console.log(row.id + ': ' + row.info)
    // })

    // db.each("SELECT highlight(documents, 0, '<b>', '</b>') body FROM documents where documents like '%dee%';", function (err, row) {
    // db.each("SELECT * FROM documents where body like '%be%';", function (err, row) {
    //   console.log('---', row)
    // })
  })

  db.close()
})
