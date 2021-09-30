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
  document: '',
  notifications: [{ type: WorkspaceStatus.WorkspacePristine }],
}

export const fetchWorkspace = createAsyncThunk(
  'workspace/fetchWorkspace',
  async () => {
    return useScribuApi().getWorkspace()
  },
)

export const fetchDocument = createAsyncThunk(
  'workspace/getDocumentContents',
  async (path: string) => {
    return useScribuApi().getFileInWorkspace(path)
  },
)

export const persistDocument = createAsyncThunk(
  'workspace/persistDocument',
  async (payload: { path: string; contents: string }) =>
    useScribuApi().persistDocument(payload),
)

export const openDocument = createAsyncThunk(
  'workspace/openDocument',
  async (payload: string) => useScribuApi().openDocument(payload),
)

export const createNewDocument = createAsyncThunk(
  'workspace/createNewDocument',
  async () => useScribuApi().createNewDocument(),
)

export const saveAsNewDocument = createAsyncThunk<
  Workspace,
  { path: string },
  { state: RootState }
>('workspace/saveAsNewDocument', async ({ path }, { getState }) =>
  useScribuApi()
    .getFileInWorkspace(getState().workspace.currentFile.path)
    .then((contents) => useScribuApi().saveAsNewDocument(path, contents)),
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

    builder.addCase(openDocument.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      state.notifications.push({ type: WorkspaceStatus.WorkspacePrepared })
      state.status = WorkspaceStatus.WorkspacePrepared
    })

    builder.addCase(openDocument.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.WorkspaceLoadError })
      state.status = WorkspaceStatus.WorkspaceLoadError
    })

    builder.addCase(fetchDocument.fulfilled, (state, action) => {
      state.document = action.payload
      state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(fetchDocument.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentLoadError })
      state.status = WorkspaceStatus.DocumentLoadError
    })

    builder.addCase(persistDocument.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentSaveError })
      state.status = WorkspaceStatus.DocumentSaveError
    })

    builder.addCase(createNewDocument.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(createNewDocument.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentNewError })
      state.status = WorkspaceStatus.DocumentNewError
    })

    builder.addCase(saveAsNewDocument.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(saveAsNewDocument.rejected, (state, action) => {
      state.notifications.push({ type: WorkspaceStatus.DocumentNewError })
      state.status = WorkspaceStatus.DocumentNewError
    })
  },
})

export default workspaceSlice.reducer
