import React, { useEffect, useState } from 'react'
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
`

function App() {
  useScribuCommands()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWorkspace())
  }, [])

  const [ counter, setCounter ] = useState(0)

  return (
    <ThemeProvider theme={theme.app}>
      <StyledApp>
        <HeaderBar />
        <EditorManager />
        <StatusBar />
      </StyledApp>
    </ThemeProvider>
    // <div>works so so?
    //   counter: {counter}<br />
    //   <button onClick={() => setCounter(counter + 1)}>inc</button>
    // </div>
  )
}

export default App
