import { Workspace } from "./Workspace";

export interface ScribuApi {
  getWorkspace: () => Promise<Workspace>
  getFileInWorkspace: (path: string) => Promise<string>
  persistDocument: (payload: { path: string; contents: string }) => Promise<void>
  openDocument: (payload: string) => Promise<Workspace>
  createNewDocument: () => Promise<Workspace>
  saveAsNewDocument: (path: string, contents: string) => Promise<Workspace>
}
