import { WorkspaceDocument } from '@lib/scribu-client-api/types/WorkspaceDocument'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useScribuApi } from '../../../lib/scribu-client-api'
import { RootState } from '../../../store'
import { fetchWorkspace } from '../../editor/store/workspace-slice'

export interface MarkdownDocument extends WorkspaceDocument {
  contents: string
}

export interface DocumentsSlice {
  openedDocuments: MarkdownDocument[]
  activeDocumentId?: string
}

const initialState: DocumentsSlice = {
  openedDocuments: [],
  // activeDocument?: string
}

export const fetchDocuments = createAsyncThunk<
  MarkdownDocument[],
  undefined,
  { state: RootState }
>('document/fetchDocuments', async (_, { getState }) => {
  const openedDocuments = getState().workspace.openedDocuments

  return await Promise.all(
    openedDocuments.map(({ filepath, ...rest }) =>
      useScribuApi()
        .getFileInWorkspace(filepath)
        .then((res) => ({ contents: res, ...rest } as MarkdownDocument)),
    ),
  )
})

export const documentSlice = createSlice({
  name: 'document',

  initialState,

  reducers: {
    switchToDocument: (state, action: PayloadAction<string>) => {
      state.activeDocumentId = action.payload
    },

    updateSelection: (
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) => {
      state.openedDocuments = state.openedDocuments.map((doc) => {
        if (doc.id === state.activeDocumentId) {
          return { ...doc, selection: action.payload }
        }
        return doc
      })
    },

    updateScrollPosition: (state, action: PayloadAction<number>) => {
      console.log('action.payload: ', action.payload)
      state.openedDocuments = state.openedDocuments.map((doc) => {
        if (doc.id === state.activeDocumentId) {
          return { ...doc, scroll: action.payload }
        }
        return doc
      })
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.fulfilled, (state, { payload }) => {
      state.openedDocuments = payload
    })

    builder.addCase(fetchWorkspace.fulfilled, (state, { payload }) => {
      state.activeDocumentId = payload.activeDocument
    })
  },
})

export default documentSlice.reducer

export const { switchToDocument, updateSelection, updateScrollPosition } =
  documentSlice.actions
