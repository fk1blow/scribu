import { ScribuApi } from "../types/ScribuApi"

export const HttpAdapter: ScribuApi = {
  prepareWorkspace: () => {
    return Promise.resolve({
      currentFile: { path: "", filename: "", contents: "" },
      notifications: []
    })
  },
}
