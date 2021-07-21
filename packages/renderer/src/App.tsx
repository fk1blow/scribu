import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useElectron } from '/@/lib/use-electron/use-electron'
import { Editor } from './features/editor'
import styled from '@emotion/styled'

import './index.scss'
import { useRef } from 'react'

const StyledApp = styled.div`
  background: #fffbf2;
`

export default function App() {
  const { signalAppReady, listenToMain, writeToCurrentFile } = useElectron()

  const [document, setDocument] = useState('')
  const [fileCurrent, setFilecurrrent] = useState({ path: '', meta: {} })

  useEffect(() => {
    listenToMain(
      'workspace-ready',
      (_evt, data: { document: string; workspace: Workspace.Application }) => {
        setDocument(data.document)
        setFilecurrrent(data.workspace.fileCurrent)
      },
    )

    signalAppReady()
  }, [])

  const debouncedSave = useCallback(
    debounce((content) => {
      if (!fileCurrent.path.length) return
      console.log('content: ', content)
      writeToCurrentFile({ content, filepath: fileCurrent.path })
    }, 500),
    [fileCurrent.path],
  )

  const ref = useRef()

  return (
    <StyledApp>
      <Editor ref={ref} document={document} onUpdate={debouncedSave} />
    </StyledApp>
  )
}
