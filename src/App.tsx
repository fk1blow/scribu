import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useAppDispatch } from './store/hooks'
import { fetchWorkspace } from './features/editor/store/workspace-slice'
import StatusBar from './features/statusbar/StatusBar'
import HeaderBar from './features/headerbar/HeaderBar'
import EditorManager from './features/editor/components/EditorManager'
import { ThemeProvider } from '@emotion/react'
import { theme } from './features/theme/light'
import useTauriWindow from './features/window/hooks/use-tauri-window'
import { useTauriCommands } from '@lib/scribu-commands/use-tauri-commands'
import { fetchDocuments } from '@features/documents/store/documents-slice'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background-color: ${(props) => props.theme.app.backgroundColor};
  color: ${(props) => props.theme.app.foregroundColor};
`

function App() {
  useTauriCommands()

  const [workspaceId] = useTauriWindow()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!workspaceId) return
    dispatch(fetchWorkspace({ id: workspaceId })).then(() => {
      dispatch(fetchDocuments())
    })
  }, [workspaceId])

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <HeaderBar />
        <EditorManager />
        <StatusBar />
      </StyledApp>
    </ThemeProvider>
  )
}

export default App
