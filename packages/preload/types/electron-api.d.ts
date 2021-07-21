interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
  signalAppReady: () => Promise<boolean>
  getWorkspace: () => Promise<Workspace.Application>
  writeToCurrentFile: (payload: { content: string, filepath: string }) => Promise<any>
  listenToMain: (
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void,
  ) => Electron.IpcRenderer
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
}
