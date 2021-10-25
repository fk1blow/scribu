import { changeCurrentFilePath, openDocument } from './store/workspace-slice'

import {
  currentWorkspaceIdSelector,
  currentFileSelector,
  currentWorkspace,
} from './store/workspace-selectors'

export { workspaceSlice } from './store/workspace-slice'

export const actions = { openDocument, changeCurrentFilePath, }

export const selectors = {
  currentWorkspaceIdSelector,
  currentFileSelector,
  currentWorkspace,
}
