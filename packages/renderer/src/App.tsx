import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import { debounce } from 'lodash'
import { useElectron } from '/@/lib/use-electron/use-electron'
import { Editor } from './features/editor'
import styled from '@emotion/styled'

import './index.scss'

const StyledApp = styled.div`
  background: #fffbf2;
`

export interface DocumentAndWorkspace {
  document: string
  workspace: Workspace.Application
}

export default function App() {
  const { signalAppReady, listenToMain, writeToCurrentFile } = useElectron()
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')
  const editorRef = useRef()
  const [workspace, setWorkspace] = useState<Workspace.Application | null>(null)
  const [document, setDocument] = useState('')

  const workspaceChanged = useCallback(
    (data: { document: string; workspace: Workspace.Application }) => {
      setEditorKeyRef(data.workspace.fileCurrent.path)

      setWorkspace(data.workspace)
      setDocument(data.document)

      window.document.title = data.workspace.fileCurrent.name
    },
    [workspace],
  )

  useEffect(() => {
    if (!editorRef.current) return

    listenToMain('workspace-ready', (_evt, data: DocumentAndWorkspace) => {
      workspaceChanged(data)
    })

    listenToMain('filecurrent-changed', (_evt, data: DocumentAndWorkspace) => {
      workspaceChanged(data)
    })

    signalAppReady()
  }, [editorRef.current])

  const onUpdateDocument = useCallback(
    debounce((content) => {
      if (!workspace?.fileCurrent.path.length) return
      writeToCurrentFile(content)
    }, 500),
    [workspace],
  )

  return (
    <StyledApp>
      <Editor
        key={editorKeyRef}
        ref={editorRef}
        document={document}
        workspace={workspace}
        onUpdate={onUpdateDocument}
      />
    </StyledApp>
  )
}
