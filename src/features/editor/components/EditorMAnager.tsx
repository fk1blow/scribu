import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import Editor from './Editor'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  currentFileSelector,
  documentContentSelector,
  documentLoadedSelector,
  workspaceReadySelector,
} from '../store/selectors'
import { fetchCurrentFile, saveCurrentFile } from '../store/workspace-slice'
import { useHotkeys } from 'react-hotkeys-hook'

const StyledEditorManager = styled.div`
  display: flex;
  height: 100vh;
  flex: 1;
  min-height: 0px;
  justify-content: stretch;
  width: 100%;
`

interface Props {
  // ...
}

const EditorManager: React.FC<Props> = ({}: Props) => {
  const dispatch = useAppDispatch()
  const workspaceReady = useAppSelector(workspaceReadySelector)
  const workspaceCurrentFile = useAppSelector(currentFileSelector)
  const documentContent = useAppSelector(documentContentSelector)
  const documentLoaded = useAppSelector(documentLoadedSelector)

  const [document, setDocument] = useState('')
  const [workspace, setWorkspace] = useState<any>(null)
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')

  const onUpdateDocument = useCallback(
    debounce((contents) => {
      if (!workspaceCurrentFile.path.length) return

      dispatch(saveCurrentFile({ path: workspaceCurrentFile.path, contents }))
    }, 500),
    // don't think if this is necessary
    [workspaceCurrentFile.path],
  )

  useEffect(() => {
    if (!workspaceReady) return
    dispatch(fetchCurrentFile(workspaceCurrentFile.path))
  }, [workspaceReady])

  useEffect(() => {
    setEditorKeyRef(workspaceCurrentFile.path)
  }, [documentLoaded])

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
