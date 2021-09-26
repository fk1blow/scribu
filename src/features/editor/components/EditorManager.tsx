import React, { useCallback, useEffect, useState } from 'react'
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
import { window as tauriWindow } from '@tauri-apps/api'

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
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')

  const onUpdateDocument = useCallback(
    debounce((contents) => {
      if (!workspaceCurrentFile.path.length) return
      dispatch(persistDocument({ path: workspaceCurrentFile.path, contents }))
    }, 500),
    [workspaceCurrentFile.path],
  )

  useEffect(() => {
    if (!workspaceCurrentFile.path) return
    dispatch(fetchDocument(workspaceCurrentFile.path)).then((_) => {
      setEditorKeyRef(workspaceCurrentFile.path)
    })
    tauriWindow.appWindow.setTitle(workspaceCurrentFile.path)
  }, [workspaceCurrentFile.path])

  return (
    <StyledEditorManager>
      <Editor
        key={editorKeyRef}
        document={documentContent}
        // move the dispatch directly inside the `Editor` component
        onUpdate={onUpdateDocument}
      />
    </StyledEditorManager>
  )
}

export default EditorManager
