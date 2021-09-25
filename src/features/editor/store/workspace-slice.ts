import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useScribuApi } from '../../../lib/scribu-client-api'
import { Workspace } from '../../../lib/scribu-client-api/types/Workspace'
import { WorkspaceStatus } from '../../../lib/scribu-client-api/types/WorkspaceStatus'
import { RootState } from '../../../store'

const initialState: Workspace = {
  currentFile: {
    path: '',
  },
  status: WorkspaceStatus.WorkspacePristine,
  notifications: [{ type: WorkspaceStatus.WorkspacePristine }],
}

export const fetchWorkspace = createAsyncThunk(
  'workspace/fetchWorkspace',
  async () => {
    return useScribuApi().getWorkspace()
  },
)

export const fetchCurrentFile = createAsyncThunk(
  'workspace/fetchCurrentFile',
  async (path: string) => {
    return useScribuApi().getFileInWorkspace(path)
  },
)

export const saveCurrentFile = createAsyncThunk(
  'workspace/saveCurrentFile',
  async (payload: { path: string; contents: string }) =>
    useScribuApi().saveCurrentFile(payload),
)

export const replaceCurrentFile = createAsyncThunk(
  'workspace/replaceCurrentFile',
  async (payload: string) => useScribuApi().replaceCurrentFile(payload),
)

export const createNewFile = createAsyncThunk(
  'workspace/createNewFile',
  async () => useScribuApi().createNewFile(),
)

export const saveAsNewFile = createAsyncThunk<
  Workspace,
  { path: string },
  { state: RootState }
>('workspace/saveAsNewfile', async ({ path }, { getState }) =>
  useScribuApi()
    .getFileInWorkspace(getState().workspace.currentFile.path)
    .then((contents) => useScribuApi().saveAsNewfile(path, contents)),
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
      state.notifications.push({ type: WorkspaceStatus.WorkspacePrepared })
      state.status = WorkspaceStatus.WorkspacePrepared
    })

    builder.addCase(fetchWorkspace.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.WorkspaceLoadError })
      state.status = WorkspaceStatus.WorkspaceLoadError
    })

    builder.addCase(replaceCurrentFile.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      state.notifications.push({ type: WorkspaceStatus.WorkspacePrepared })
      state.status = WorkspaceStatus.WorkspacePrepared
    })

    builder.addCase(replaceCurrentFile.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.WorkspaceLoadError })
      state.status = WorkspaceStatus.WorkspaceLoadError
    })

    builder.addCase(fetchCurrentFile.fulfilled, (state, action) => {
      state.document = action.payload
      state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(fetchCurrentFile.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentLoadError })
      state.status = WorkspaceStatus.DocumentLoadError
    })

    builder.addCase(saveCurrentFile.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentSaveError })
      state.status = WorkspaceStatus.DocumentSaveError
    })

    builder.addCase(createNewFile.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(createNewFile.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentNewError })
      state.status = WorkspaceStatus.DocumentNewError
    })

    builder.addCase(saveAsNewFile.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(saveAsNewFile.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentNewError })
      state.status = WorkspaceStatus.DocumentNewError
    })
  },
})

export default workspaceSlice.reducer
