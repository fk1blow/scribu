import { invoke, fs } from '@tauri-apps/api'
import { ScribuApi } from '../types/ScribuApi'

export const TauriAdapter: ScribuApi = {
  prepareWorkspace: () =>
    invoke<{ current_file: { path: string } }>('prepare_workspace').then(
      (r) => ({
        path: r['current_file']['path'],
      }),
    ),

  getFileInWorkspace: (path: string) => fs.readTextFile(path),

  saveCurrentFile: (payload: { path: string; contents: string }) =>
    fs.writeFile(payload),
}
