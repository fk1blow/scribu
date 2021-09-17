import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'

import { useAppDispatch } from './store/hooks'
import { fetchWorkspace } from './features/editor/store/workspace-slice'
import StatusBar from './features/statusbar/StatusBar'
import HeaderBar from './features/headerbar/HeaderBar'
import EditorManager from './features/editor/components/EditorManager'
import { theme } from './features/theme/light'
import Commander from './features/commander/components/Commander'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background-color: ${(props) => props.theme.app.backgroundColor};
  color: ${(props) => props.theme.app.foregroundColor};
`

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWorkspace())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Commander />
        <HeaderBar />
        <EditorManager />
        <StatusBar />
      </StyledApp>
    </ThemeProvider>
  )
}

export default App
