import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchWorkspace } from './features/editor/store/workspace-slice'
import StatusBar from './features/statusbar/StatusBar'
import HeaderBar from './features/headerbar/HeaderBar'
import EditorManager from './features/editor/components/EditorManager'
import { useScribuCommands } from './lib/scribu-commands/use-scribu-commands'
import { ThemeProvider } from '@emotion/react'
import { theme } from './features/theme/light'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.foregroundColor};
`

function App() {
  useScribuCommands()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWorkspace())
  }, [])

  return (
    <ThemeProvider theme={theme.app}>
      <StyledApp>
        <HeaderBar />
        <EditorManager />
        <StatusBar />
      </StyledApp>
    </ThemeProvider>
  )
}

export default App
