import { ScribuApi } from '../types/ScribuApi'

export const HttpAdapter: ScribuApi = {
  prepareWorkspace: () => {
    return Promise.resolve({ path: '' })
  },

  getFileInWorkspace: (path: string) => Promise.resolve('this is me, the _file_')
}
