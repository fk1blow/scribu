import { dialog, Menu, MenuItem } from 'electron'

import { createAndReplaceFileCurrent } from './file-handlers'

export const showAppMenu = (
  app: Electron.App,
  webContents: Electron.WebContents | undefined,
) => {
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
          label: 'Open',
          accelerator: 'CommandOrControl+o',
          click: async () => {
            console.log('open not implemented')
            // const newWorkspace = await createAndReplaceFileCurrent(app)
            // webContents?.send('file-new', newWorkspace)
          },
        },

        {
          label: 'Save File As',
          accelerator: 'CommandOrControl+shift+s',
          click: () => {
            dialog
              .showSaveDialog({
                filters: [{ extensions: ['md'], name: 'markdown' }],
                properties: ['createDirectory'],
              })
              .then(({ canceled, filePath }) => {
                if (!canceled && filePath) {
                  console.log('filePath: ', filePath)
                  // TODO should go through workspace handlers
                  // updating the workspace(and history)
                  // fs.writeFile(filePath, '', {
                  //   encoding: 'Utf8',
                  // })
                }
              })
          },
        },

        {
          label: 'New File',
          accelerator: 'CommandOrControl+n',
          click: async () => {
            const newWorkspace = await createAndReplaceFileCurrent(app)
            webContents?.send('file-new', newWorkspace)
          },
        },

        {
          label: 'Rename File',
          accelerator: 'CommandOrControl+shift+r',
          click: async () => {
            console.log('pshould rename file')
          },
        },

        { type: 'separator' },

        {
          label: 'Copy',
          role: 'copy',
          accelerator: 'CommandOrControl+c',
        },

        {
          label: 'Pase',
          role: 'paste',
          accelerator: 'CommandOrControl+v',
        },
      ],
    }),
  )

  menu.append(
    new MenuItem({
      label: 'Window',
      submenu: [
        {
          label: 'Reload',
          role: 'reload',
          accelerator: 'CommandOrControl+r',
        },
      ],
    }),
  )

  Menu.setApplicationMenu(menu)
}
