import { Workspace } from "./Workspace";

export interface ScribuApi {
  getWorkspace: () => Promise<Workspace>
  getFileInWorkspace: (path: string) => Promise<string>
  saveCurrentFile: (payload: { path: string; contents: string }) => Promise<void>
  replaceCurrentFile: (payload: string) => Promise<Workspace>
  createNewFile: () => Promise<Workspace>
  saveAsNewfile: (path: string, contents: string) => Promise<Workspace>
}
