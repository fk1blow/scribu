import { createSelector } from '@reduxjs/toolkit'
import { WorkspaceStatus } from '../../../lib/scribu-client-api/types/ScribuApi'
import { RootState } from '../../../store'

export const lastNotification = createSelector(
  (state: RootState) => state.workspace.notifications,
  (items) => items[items.length - 1],
)

export const documentLoadedSelector = createSelector(
  (state: RootState) => state.workspace.status,
  (item) => item === WorkspaceStatus.DocumentLoaded
)

export const currentFileSelector = createSelector(
  (state: RootState) => state.workspace.currentFile,
  (item) => item
)

export const workspaceReadySelector = createSelector(
  (state: RootState) => state.workspace.status,
  (item) => item === WorkspaceStatus.WorkspacePrepared
)

export const documentContentSelector = createSelector(
  (state: RootState) => state.workspace,
  (item) => item.document || ''
)

export const workspaceSelector = createSelector(
  (state: RootState) => state.workspace,
  (item) => item
)
