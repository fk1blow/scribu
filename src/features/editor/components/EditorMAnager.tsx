import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import styled from '@emotion/styled'

import Editor from './Editor'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  currentFileSelector,
  documentContentSelector,
} from '../store/selectors'
import { fetchCurrentFile, saveCurrentFile } from '../store/workspace-slice'
import { window } from '@tauri-apps/api'

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

  const [workspace, setWorkspace] = useState<any>(null)
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')

  const onUpdateDocument = useCallback(
    debounce((contents) => {
      if (!workspaceCurrentFile.path.length) return
      dispatch(saveCurrentFile({ path: workspaceCurrentFile.path, contents }))
    }, 500),
    [workspaceCurrentFile.path],
  )

  useEffect(() => {
    if (!workspaceCurrentFile.path) return
    dispatch(fetchCurrentFile(workspaceCurrentFile.path)).then((_) => {
      setEditorKeyRef(workspaceCurrentFile.path)
    })
    window.appWindow.setTitle(workspaceCurrentFile.path)
  }, [workspaceCurrentFile.path])

  return (
    <StyledEditorManager>
      <Editor
        key={editorKeyRef}
        document={documentContent}
        workspace={workspace}
        onUpdate={onUpdateDocument}
      />
    </StyledEditorManager>
  )
}

export default EditorManager
