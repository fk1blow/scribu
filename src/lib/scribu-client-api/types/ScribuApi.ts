import { Workspace } from "./Workspace";

export interface ScribuApi {
  getWorkspace: () => Promise<Workspace>
  getFileInWorkspace: (path: string) => Promise<string>
  // writeFile: (payload: { path: string; contents: string }) => Promise<void>
  // openFile: (payload: string) => Promise<Workspace>
  // newFile: () => Promise<Workspace>
  // saveAsFile: (path: string, contents: string) => Promise<Workspace>
  persistDocument: (payload: { path: string; contents: string }) => Promise<void>
  openDocument: (payload: string) => Promise<Workspace>
  createNewDocument: () => Promise<Workspace>
  saveAsNewDocument: (path: string, contents: string) => Promise<Workspace>
}
