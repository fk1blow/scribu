import React, { useEffect, useState } from 'react'
import { useElectron } from '/@/lib/use-electron/use-electron'
import { Editor } from './features/editor'
import useDebounce from 'react-use/lib/useDebounce'

import './index.scss'

export default function App() {
  const { signalAppReady, listenToMain, writeToCurrentFile } = useElectron()

  const [initialDoc, setInitialDoc] = useState('')
  const [currentDoc, setCurrentDoc] = useState('')
  const [fileCurrent, setFilecurrrent] = useState({ path: '', meta: {} })

  useEffect(() => {
    listenToMain(
      'workspace-ready',
      (_evt, data: { document: string; workspace: Workspace.Application }) => {
        setInitialDoc(data.document)
        setCurrentDoc(data.document)
        setFilecurrrent(data.workspace.fileCurrent)
      },
    )

    signalAppReady()
  }, [])

  useDebounce(
    () => {
      writeToCurrentFile({ content: currentDoc, filepath: fileCurrent.path })
    },
    500,
    [currentDoc],
  )

  return (
    <div className="App">
      <Editor document={initialDoc} onUpdate={(doc) => setCurrentDoc(doc)} />
    </div>
  )
}
