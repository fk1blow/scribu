import {
  DocumentsSlice,
  MarkdownDocument,
} from '@features/documents/store/documents-slice'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/index'

export const openedDocuments = createSelector(
  (state: RootState) => state.workspace,
  (item) => item.openedDocuments,
)

export const activeDocumentIdSelector = createSelector(
  (state: RootState) => state.documents,
  (item) => item.activeDocumentId,
)

export const activeDocumentSelector = createSelector(
  (state: RootState) => state.documents,
  (item) =>
    item.openedDocuments.find((doc) => doc.id === item.activeDocumentId) as
      | MarkdownDocument
      | undefined,
)
