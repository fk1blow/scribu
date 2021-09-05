import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchWorkspace } from './features/editor/store/workspace-slice'
import StatusBar from './features/statusbar/StatusBar'
import HeaderBar from './features/headerbar/HeaderBar'
import EditorManager from './features/editor/components/EditorManager'
import { listen } from '@tauri-apps/api/event'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #a1a1a1;
`

function App() {
  const dispatch = useAppDispatch()

  // TODO move it somewhere else
  if (window['__TAURI__']) {
    listen('tauri://window/reload', () => window.location.reload())
  }

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
