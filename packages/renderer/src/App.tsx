import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import { debounce } from 'lodash'
import styled from '@emotion/styled'

import { useElectron } from '@renderer/lib/use-electron/use-electron'
// import { Editor } from './features/editor'

import './assets/styles/index.scss'
// import TitleBar from '@renderer/features/titlebar/components/TitleBar/TitleBar'

const StyledApp = styled.div`
  background: #fffbf2;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export interface DocumentAndWorkspace {
  document: string
  workspace: any
  // workspace: Workspace.Application
}

export default function App() {

  return <div>not ready</div>

  const { signalAppReady, listenToMain, writeToCurrentFile } = useElectron()
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')
  // const [workspace, setWorkspace] = useState<Workspace.Application | null>(null)
  const [workspace, setWorkspace] = useState<any>(null)
  const [document, setDocument] = useState('')

  const workspaceChanged = useCallback(
    // (data: { document: string; workspace: Workspace.Application }) => {
    (data: { document: string; workspace: any }) => {
      setEditorKeyRef(data.workspace.fileCurrent.path)

      setWorkspace(data.workspace)
      setDocument(data.document)

      window.document.title = data.workspace.fileCurrent.name
    },
    [workspace],
  )

  const onUpdateDocument = useCallback(
    debounce((content) => {
      if (!workspace?.fileCurrent.path.length) return
      writeToCurrentFile(content)
    }, 500),
    [workspace],
  )

  useEffect(() => {
    listenToMain('workspace-ready', (_evt, data: DocumentAndWorkspace) => {
      workspaceChanged(data)
    })

    listenToMain('file-new', (_evt, data: DocumentAndWorkspace) => {
      workspaceChanged(data)
    })

    signalAppReady()
  }, [])

  return (
    <StyledApp>
      {/* <TitleBar workspace={workspace} /> */}

      {/* <Editor
        key={editorKeyRef}
        document={document}
        workspace={workspace}
        onUpdate={onUpdateDocument}
      /> */}

      <div>place editor here</div>
    </StyledApp>
  )
}
