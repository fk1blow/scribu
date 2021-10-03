import { configureStore, Middleware } from "@reduxjs/toolkit"
import { createLogger } from 'redux-logger'
import workspaceSlice from "../features/editor/store/workspace-slice"

const logger = createLogger({
  collapsed: true
}) as Middleware

export const store = configureStore({
  reducer: {
    workspace: workspaceSlice
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
