import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useScribuApi } from '../../../lib/scribu-client-api'
import { Workspace } from '../../../lib/scribu-client-api/types/Workspace'
import { WorkspaceStatus } from '../../../lib/scribu-client-api/types/WorkspaceStatus'
import { RootState } from '../../../store'

const initialState: Workspace = {
  id: null,
  currentFile: {
    path: '',
  },
  window: {
    position: [0, 0],
    size: [0, 0],
  },
  openedDocuments: [],
  previousDocuments: [],
  // activeDocument: ''
}

export const changeCurrentFilePath = createAsyncThunk<
  Workspace,
  { path: string },
  { state: RootState }
>('workspace/changeCurrentFile', async (currentFile, { getState }) => {
  const currentWorkspace = getState().workspace

  return useScribuApi().changeCurrentFile({
    ...currentWorkspace,
    currentFile,
  })
})

export const fetchWorkspace = createAsyncThunk<
  Workspace,
  { id: string },
  { state: RootState }
>('workspace/fetchWorkspace', async ({ id }) => {
  const workspaceFound = await useScribuApi()
    .getWorkspaces()
    .then((workspaces) => workspaces.find((w) => w.id === id))

  if (!workspaceFound) return Promise.reject(`cannot find workspace ${id}`)

  return Promise.resolve(workspaceFound)
})

// TODO moving it to document-slice
// TODO document related stuff should be inside somewhere else
// export const fetchDocument = createAsyncThunk(
//   'workspace/getDocumentContents',
//   async (path: string) => {
//     return useScribuApi().getFileInWorkspace(path)
//   },
// )

// TODO moving it to document-slice
// TODO document related stuff should be inside somewhere else
// export const persistDocument = createAsyncThunk(
//   'workspace/persistDocument',
//   async (payload: { path: string; contents: string }) =>
//     useScribuApi().persistDocument(payload),
// )

export const openDocument = createAsyncThunk(
  'workspace/openDocument',
  async (payload: { workspaceId: string; filepath: string }, { getState }) => {
    return useScribuApi().openDocument(payload)
  },
)

// TODO document related stuff should be inside somewhere else
export const createNewDocument = createAsyncThunk<
  unknown,
  undefined,
  { state: RootState }
>('workspace/createNewDocument', async (_, { getState }) => {
  const currentWorkspace = getState().workspace

  // return useScribuApi().changeCurrentFile({
  //   ...currentWorkspace,
  //   currentFile,
  // })

  return useScribuApi().createNewDocument()
})

// TODO document related stuff should be inside somewhere else
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
  name: 'workspace',

  initialState,

  reducers: {
    // prepareWorkspace: (state, action: PayloadAction<{ id: string }>) => {
    //   state.id = action.payload.id
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchWorkspace.fulfilled, (state, { payload }) => {
      state.openedDocuments = payload.openedDocuments
      state.activeDocument = payload.activeDocument
      // state.id = action.payload.id
      // state.currentFile = { path: action.payload.currentFile.path }
      // state.window = action.payload.window
      // state.notifications.push({ type: WorkspaceStatus.WorkspacePrepared })
      // state.status = WorkspaceStatus.WorkspacePrepared
    })

    builder.addCase(fetchWorkspace.rejected, (state, action) => {
      // state.notifications.push({ type: WorkspaceStatus.WorkspaceLoadError })
      // state.status = WorkspaceStatus.WorkspaceLoadError
    })

    builder.addCase(changeCurrentFilePath.fulfilled, (state, action) => {
      state.currentFile = { path: action.payload.currentFile.path }
      state.window = action.payload.window
    })

    builder.addCase(changeCurrentFilePath.rejected, (state, action) => {})

    /* builder.addCase(openDocument.fulfilled, (state, action) => {
      state.currentFile = action.payload.currentFile
      // state.notifications.push({ type: WorkspaceStatus.WorkspacePrepared })
      // state.status = WorkspaceStatus.WorkspacePrepared
    })

    builder.addCase(openDocument.rejected, (state, action) => {
      // state.notifications.push({ type: WorkspaceStatus.WorkspaceLoadError })
      // state.status = WorkspaceStatus.WorkspaceLoadError
    }) */

    // builder.addCase(fetchDocument.fulfilled, (state, action) => {
    //   state.document = action.payload
    //   // state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
    //   // state.status = WorkspaceStatus.DocumentLoaded
    // })

    // builder.addCase(fetchDocument.rejected, (state, action) => {
    //   // state.notifications.push({ type: WorkspaceStatus.DocumentLoadError })
    //   // state.status = WorkspaceStatus.DocumentLoadError
    // })

    // builder.addCase(persistDocument.rejected, (state, action) => {
    //   // state.notifications.push({ type: WorkspaceStatus.DocumentSaveError })
    //   // state.status = WorkspaceStatus.DocumentSaveError
    // })

    builder.addCase(createNewDocument.fulfilled, (state, action) => {
      // state.currentFile = action.payload.currentFile
      // state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      // state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(createNewDocument.rejected, (state, action) => {
      // state.notifications.push({ type: WorkspaceStatus.DocumentNewError })
      // state.status = WorkspaceStatus.DocumentNewError
    })

    builder.addCase(saveAsNewDocument.fulfilled, (state, action) => {
      // state.currentFile = action.payload.currentFile
      // state.notifications.push({ type: WorkspaceStatus.DocumentLoaded })
      // state.status = WorkspaceStatus.DocumentLoaded
    })

    builder.addCase(saveAsNewDocument.rejected, (state, action) => {
      // state.notifications.push({ type: WorkspaceStatus.DocumentNewError })
      // state.status = WorkspaceStatus.DocumentNewError
    })
  },
})

export default workspaceSlice.reducer

// export const { prepareWorkspace } = workspaceSlice.actions
