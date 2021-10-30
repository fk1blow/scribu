import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounce, throttle } from 'lodash'
import styled from '@emotion/styled'

import Editor from './Editor'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { currentFileSelector } from '../store/workspace-selectors'
// import { fetchDocument, persistDocument } from '../store/workspace-slice'
// importing plan `window`, witout aliasing, will screw with vite's brain
import { window as aliasedWindow } from '@tauri-apps/api'
import DocumentHighlights from './DocumentHighlight/DocumentHighlights'
import { Highlight } from './DocumentHighlight/Highlight'
import {
  updateScrollPosition,
  updateSelection,
} from '@features/documents/store/documents-slice'
import {
  activeDocumentSelector,
  activeDocumentIdSelector,
} from '@features/documents/store/documents-selectors'
import { longText } from '../../../../long-text'

const StyledEditorManager = styled.div`
  display: flex;
  height: 100vh;
  flex: 1;
  min-height: 0px;
  justify-content: stretch;
  width: 100%;
`

const EditorManager = ({}) => {
  const dispatch = useAppDispatch()
  const workspaceCurrentFile = useAppSelector(currentFileSelector)
  const activeDocumentId = useAppSelector(activeDocumentIdSelector)

  const activeDocument = useAppSelector(activeDocumentSelector)
  // const activeDocument = { contents: longText, selection: { from: 0, to: 0 } }

  const editorRef = useRef<{
    scrollToHighlight: (pos: number) => void
    updateScrollDom: (pos: number) => void
  }>()
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')
  const [docuHighlights, setDocuHighlights] = useState<Highlight[]>([])

  //
  // get the current window ID and based on that, pick the workspace, then load the document
  //
  // useEffect(() => {
  //   if (!workspaceCurrentFile.path) return
  //   dispatch(
  //     readDocumentContents({ filepath: workspaceCurrentFile.path }),
  //   ).then((_) => setEditorKeyRef(workspaceCurrentFile.path))
  //   aliasedWindow.appWindow.setTitle(workspaceCurrentFile.path)
  // }, [workspaceCurrentFile.path])

  useEffect(() => {
    if (!activeDocumentId) return
    setEditorKeyRef(activeDocumentId)
  }, [activeDocumentId])

  // useEffect(() => {
  //   // console.log('editorKeyRef: ', editorKeyRef)
  //   if (editorKeyRef === 'pristine') return

  //   const x = document.querySelectorAll('.cm-scroller')
  //   // console.log('x: ', x)

  //   if (x) {
  //     // console.log('x[0]: ', x[0].scrollTop)
  //     setTimeout(() => {
  //       x[0].scrollTop = 200
  //     }, 100)
  //   }

  //   // [0].scrollTop = 650
  // }, [editorKeyRef])

  const onUpdateDocument = useCallback(
    debounce((contents) => {
      // if (!workspaceCurrentFile.path.length) return
      // dispatch(persistDocument({ path: workspaceCurrentFile.path, contents }))
    }, 500),
    [workspaceCurrentFile.path],
  )

  const onSelectionUpdate = useCallback(
    (range: { from: number; to: number }) => dispatch(updateSelection(range)),
    [],
  )

  const onScrollPositionUpdate = useCallback(
    (pos: number) => dispatch(updateScrollPosition(pos)),
    [],
  )

  const onHighlightsChange = useCallback(
    (highlights) => {
      setDocuHighlights(highlights)
    },
    [activeDocumentId],
  )

  const onHighlightSelect = useCallback(
    (payload: { from: number; to: number }) => {
      editorRef.current?.scrollToHighlight(payload.from)
    },
    [editorRef.current],
  )

  return (
    <StyledEditorManager>
      <DocumentHighlights
        items={docuHighlights}
        onItemSelect={onHighlightSelect}
      />

      {activeDocument && (
        <Editor
          key={editorKeyRef}
          ref={editorRef}
          document={activeDocument}
          onContentsUpdate={onUpdateDocument}
          onSelectionUpdate={onSelectionUpdate}
          onScrollPositionUpdate={onScrollPositionUpdate}
          onHighlightsChange={onHighlightsChange}
        />
      )}
      {/* <div style={{ height: '3000px', overflowY: 'auto', maxHeight: '100vh' }}>
        a div here
      </div> */}
    </StyledEditorManager>
  )
}

export default EditorManager
