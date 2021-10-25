import { Workspace } from "./Workspace";

export interface ScribuApi {
  getWorkspaces: () => Promise<Workspace[]>
  getFileInWorkspace: (path: string) => Promise<string>
  persistDocument: (payload: { path: string; contents: string }) => Promise<void>
  // new interface
  changeCurrentFile: (payload: Workspace) => Promise<Workspace>
  // openDocument: (payload: { workspaceId: string, filepath: string }) => Promise<Workspace>
  openDocument: (payload: { workspaceId: string, filepath: string }) => Promise<any>
  // createNewDocument: () => Promise<Workspace>
  createNewDocument: () => Promise<any>
  // saveAsNewDocument: (path: string, contents: string) => Promise<Workspace>
  saveAsNewDocument: (path: string, contents: string) => Promise<any>
}
