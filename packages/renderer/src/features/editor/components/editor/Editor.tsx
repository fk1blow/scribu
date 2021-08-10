import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { EditorState, Transaction } from '@codemirror/state'
import styled from '@emotion/styled'

import useCodemirror, { getTheme } from '../../hooks/useCodemirror'
import TabsBar from '../tabs-bar/TabsBar'
import StatusBar from '/@/features/editor/components/status-bar/StatusBar'
import { ViewUpdate } from '@codemirror/view'

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .cm-scroller {
    width: calc(800px + 180px);
    padding-left: 90px;
    padding-right: 90px;
    margin: 0 auto;
    height: 100%;
  }

  .cm-editor {
    height: 100%;
  }
`

interface Props {
  workspace: Workspace.Application | null
  document: string
  onUpdate: (doc: string) => void
}

const Editor: React.FC<Props> = ({ onUpdate, document, workspace }: Props) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const themeRef = React.useRef(theme)

  const [editor, editorRef] = useCodemirror()

  const fileStateMapRef = React.useRef<Record<string, EditorState>>({})

  React.useEffect(() => {
    if (!editor) {
      return
    }

    editor.setTheme(getTheme(editor.codemirror, theme))
  }, [editor, theme])

  // bootstrap codemirror
  React.useEffect(() => {
    if (!editor) return

    const state = fileStateMapRef.current[document]

    const theme = getTheme(editor.codemirror, themeRef.current)

    if (state) {
      // We've loaded this file before
      editor.view.setState(state)

      // TODO: only do this if the state's theme doesn't match the current one
      editor.setTheme(theme)

      return
    }

    // Create the editor state object for this file

    let didCancel = false

    editor.loadExentions({ filename: document, theme }).then((extensions) => {
      if (didCancel) return

      const { codemirror } = editor

      // Keep our state in sync with the editor's state. This listener is called
      // after view.setState and on any future updates
      const updateListener = codemirror.view.EditorView.updateListener.of(
        (update: ViewUpdate) => {
          if (update.docChanged) {
            onUpdate(update.state.doc.toString())
          }
        },
      )

      const initialState = codemirror.state.EditorState.create({
        doc: document,
        extensions: [extensions, updateListener],
      })

      editor.view.setState(initialState)
    })

    return () => {
      didCancel = true
    }
  }, [editor])

  return (
    <EditorWrapper>
      {workspace && <TabsBar />}

      <div style={{ display: 'flex', flex: 1, minHeight: '0px' }}>
        <div style={{ flex: 1, overflow: 'auto', justifyContent: 'stretch' }}>
          <div
            className="codemirror-container"
            ref={editorRef}
            style={{ height: '100%' }}
          />
        </div>
      </div>

      {workspace && <StatusBar workspace={workspace} />}
    </EditorWrapper>
  )
}

export default Editor
