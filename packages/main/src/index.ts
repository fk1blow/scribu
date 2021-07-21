import { app, BrowserWindow, dialog, globalShortcut, ipcMain } from 'electron'
import { IpcMainEvent } from 'electron/main'
import { join } from 'path'
import { URL } from 'url'
import fs from 'fs-extra'

import { fetchWorkspace, writeToCurrentFile } from './workspace-handlers'

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
    .then(
      ({ default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS }) =>
        installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], {
          loadExtensionOptions: {
            allowFileAccess: true,
          },
        }),
    )
    .catch((e) => console.error('Failed install extension:', e))
}

let mainWindow: BrowserWindow | null = null

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    show: false, // Use 'ready-to-show' event to show window
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

app.whenReady().then(() => {
  // fetchWorkspace(app).then((workspace) =>
  //   mainWindow?.webContents.send('prepare-workspace', workspace),
  // )

  ipcMain.handle('app-ready', async (evt) => {
    const workspace = await fetchWorkspace(app)
    evt.sender.send('workspace-ready', workspace)
  })

  ipcMain.handle(
    'write-to-current-file',
    async (evt, data: { content: string; filepath: string }) => {
      writeToCurrentFile(app, data)
    },
  )

  // ipcMain.handle('get-workspace', (_evt) => fetchWorkspace(app))
  // ipcMain.handle('write-current-file', (_evt, content: string) =>
  //   writeCurrentFile(app, content),
  // )

  // globalShortcut.register('CommandOrControl+s', () => {
  //   dialog.showSaveDialog({
  //     filters: [{ extensions: ['md'], name: 'markdown' }],
  //     properties: ['createDirectory'],
  //   }).then()
  // })

  const { Menu, MenuItem } = require('electron')

  const menu = new Menu()
  menu.append(
    new MenuItem({
      label: 'Scribu',
      submenu: [
        {
          label: 'About',
          // role: 'fileMenu',
          // accelerator: 'CommandOrControl+s',
          click: () => {
            console.log('Electron rocks!')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit Scribu',
          role: 'quit',
          accelerator: 'CommandOrControl+q',
        },
      ],
    }),
  )
  menu.append(
    new MenuItem({
      label: 'File',
      submenu: [
        {
          label: 'Save File',
          accelerator: 'CommandOrControl+s',
          click: () => {
            dialog
              .showSaveDialog({
                filters: [{ extensions: ['md'], name: 'markdown' }],
                properties: ['createDirectory'],
              })
              .then(({ canceled, filePath }) => {
                if (!canceled && filePath) {
                  fs.writeJSON(filePath, 'my first thing here?')
                }
              })
          },
        },
      ],
    }),
  )

  // Menu.setApplicationMenu(menu)
})

// should have access to the current file displayed
// store it inside the tmp folder(`dd-mm-yyyy.md`) and have a link to it
// inside the Workspace

// when the app is ready, read the workspace, get the current file
// and if there is one, send it to the renderer
