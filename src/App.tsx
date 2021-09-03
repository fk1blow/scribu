import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import styled from '@emotion/styled'
import Editor from './features/editor/components/Editor'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchWorkspace } from './features/editor/store/workspace-slice'
import StatusBar from './features/statusbar/StatusBar'
import HeaderBar from './features/headerbar/HeaderBar'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #a1a1a1;
  font-family: 'Roboto';
  font-size: 16px;
`

function App() {
  const dispatch = useAppDispatch()
  const [document, setDocument] = useState('')
  const [workspace, setWorkspace] = useState<any>(null)
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')

  const onUpdateDocument = useCallback(
    debounce((content) => {
      //   if (!workspace?.fileCurrent.path.length) return
      //   writeToCurrentFile(content)
    }, 500),
    [workspace],
  )

  useEffect(() => {
    dispatch(fetchWorkspace())
  }, [])

  return (
    <StyledApp>
      <HeaderBar />

      <Editor
        key={editorKeyRef}
        document={document}
        workspace={workspace}
        onUpdate={onUpdateDocument}
      />

      <StatusBar />
    </StyledApp>
  )
}

export default App
