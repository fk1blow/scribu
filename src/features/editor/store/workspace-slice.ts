import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useScribuApi } from '../../../lib/scribu-client-api'
import {
  NotificationType,
  Workspace,
} from '../../../lib/scribu-client-api/types/ScribuApi'
import type { RootState } from '../../../store'

const initialState: Workspace = {
  currentFile: {
    path: '',
    filename: '',
    contents: '# here we go',
  },
  notifications: [{ type: NotificationType.WorkspacePristine }],
}

export const fetchWorkspace = createAsyncThunk(
  'workspace/fetchWorkspace',
  async () => {
    return useScribuApi().prepareWorkspace()
  },
)

export const workspaceSlice = createSlice({
  name: 'document',

  initialState,

  reducers: {
    // getWorkspace: (state, action: PayloadAction<Workspace>) => {
    //   state.currentFile = action.payload.currentFile
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      state.notifications.push({ type: NotificationType.WorkspacePrepared })
    })

    builder.addCase(fetchWorkspace.rejected, (state, action) => {
      state.notifications.push({ type: NotificationType.WorkspaceLoadError })
    })
  },
})

// export const { getWorkspace } = workspaceSlice.actions

// export const workspaceNotifications = (state: RootState) =>
//   state.workspace.notifications


export default workspaceSlice.reducer
