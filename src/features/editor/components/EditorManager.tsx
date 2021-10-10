import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import styled from '@emotion/styled'

import Editor from './Editor'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  currentFileSelector,
  documentContentSelector,
} from '../store/selectors'
import { fetchDocument, persistDocument } from '../store/workspace-slice'
// importing plan `window`, witout aliasing, will screw with vite's brain
import { window as aliasedWindow } from '@tauri-apps/api'
import DocumentHighlights from './DocumentHighlight/DocumentHighlights'
import { Highlight } from './DocumentHighlight/Highlight'

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
  const documentContent = useAppSelector(documentContentSelector)
  const editorRef = useRef<{ scroll: (pos: number) => void }>()
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')
  const [docuHighlights, setDocuHighlights] = useState<Highlight[]>([])

  useEffect(() => {
    if (!workspaceCurrentFile.path) return
    dispatch(fetchDocument(workspaceCurrentFile.path)).then((_) => {
      setEditorKeyRef(workspaceCurrentFile.path)
    })
    aliasedWindow.appWindow.setTitle(workspaceCurrentFile.path)
  }, [workspaceCurrentFile.path])

  const onUpdateDocument = useCallback(
    debounce((contents) => {
      if (!workspaceCurrentFile.path.length) return
      dispatch(persistDocument({ path: workspaceCurrentFile.path, contents }))
    }, 500),
    [workspaceCurrentFile.path],
  )

  const onHighlightsChange = useCallback(
    (highlights) => {
      setDocuHighlights(highlights)
    },
    [workspaceCurrentFile.path],
  )

  const onHighlightSelect = useCallback(
    (payload) => {
      editorRef.current.scroll(payload.from)
    },
    [editorRef.current],
  )

  return (
    <StyledEditorManager>
      <DocumentHighlights
        items={docuHighlights}
        onItemSelect={onHighlightSelect}
      />

      <Editor
        key={editorKeyRef}
        ref={editorRef}
        document={documentContent}
        onUpdate={onUpdateDocument}
        onHighlightsChange={onHighlightsChange}
      />
    </StyledEditorManager>
  )
}

export default EditorManager
