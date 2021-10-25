import { createSelector } from '@reduxjs/toolkit'
import { WorkspaceStatus } from '../../../lib/scribu-client-api/types/WorkspaceStatus'
import { RootState } from '../../../store'
import { longText } from '../../../../long-text'
import { shortText } from '../../../../short-text'

export const lastNotification = createSelector(
  (state: RootState) => state.workspace.notifications,
  (items) => items[items.length - 1],
)

export const documentLoadedSelector = createSelector(
  (state: RootState) => state.workspace.status,
  (item) => item === WorkspaceStatus.DocumentLoaded
)

export const currentWorkspace = createSelector(
  (state: RootState) => state.workspace,
  (item) => item
)

export const currentFileSelector = createSelector(
  (state: RootState) => state.workspace.currentFile,
  (item) => item
)

export const currentWorkspaceIdSelector = createSelector(
  (state: RootState) => state.workspace.id,
  (item) => item
)

export const workspaceReadySelector = createSelector(
  (state: RootState) => state.workspace.status,
  (item) => item === WorkspaceStatus.WorkspacePrepared
)

// export const documentContentSelector = createSelector(
//   (state: RootState) => state.workspace,
//   (item) => item.document
//   // used when testing
//   // (item) => item.document || longText
// )

export const workspaceSelector = createSelector(
  (state: RootState) => state.workspace,
  (item) => item
)
