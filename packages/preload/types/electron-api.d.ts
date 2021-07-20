interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
  getWorkspace: () => Promise<Workspace.Application>
  // writeToCurrentFile: (content: string) => Promise<any>
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
}
