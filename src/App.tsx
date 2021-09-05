import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchWorkspace } from './features/editor/store/workspace-slice'
import StatusBar from './features/statusbar/StatusBar'
import HeaderBar from './features/headerbar/HeaderBar'
import EditorManager from './features/editor/components/EditorManager'
import { useScribuCommands } from './lib/scribu-commands/use-scribu-commands'
import FileDropModal from './features/editor/components/FileDropModal'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #a1a1a1;
`

function App() {
  useScribuCommands()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWorkspace())
  }, [])

  return (
    <StyledApp>
      <HeaderBar />
      <EditorManager />
      <StatusBar />
    </StyledApp>
  )
}

export default App
