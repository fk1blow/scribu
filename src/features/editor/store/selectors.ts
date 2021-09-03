import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../../store'

const notifications = (state: RootState) => state.workspace.notifications

export const lastNotification = createSelector(
  (state: RootState) => state.workspace.notifications,
  (items) => items[items.length - 1],
)
