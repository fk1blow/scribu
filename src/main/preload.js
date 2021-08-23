const { contextBridge, ipcRenderer } = require('electron')

const apiKey = 'electron'

const validChannels = ['open_search_commander']

const api = {
  // on(channel: string, func: (...args: any[]) => void) {
  on(channel, func) {
    // if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (_event, ...args) => {
      console.log('_event: ', _event)
    })
    // }
  },

  // on(channel: string, func: (...args: any[]) => void) {
  once(channel, func) {
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (_event, ...args) => func(...args))
    }
  },
}

contextBridge.exposeInMainWorld(apiKey, api)

// contextBridge.exposeInMainWorld('electron', {
//   ipcRenderer: {
//     myPing() {
//       ipcRenderer.send('ipc-example', 'ping')
//     },
//     on(channel, func) {
//       const validChannels = ['ipc-example']
//       if (validChannels.includes(channel)) {
//         // Deliberately strip event as it includes `sender`
//         ipcRenderer.on(channel, (event, ...args) => func(...args))
//       }
//     },
//     once(channel, func) {
//       const validChannels = ['ipc-example']
//       if (validChannels.includes(channel)) {
//         // Deliberately strip event as it includes `sender`
//         ipcRenderer.once(channel, (event, ...args) => func(...args))
//       }
//     },
//   },
// })
