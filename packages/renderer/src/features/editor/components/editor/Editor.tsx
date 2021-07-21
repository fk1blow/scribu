import React, { forwardRef } from 'react'
import { EditorState } from '@codemirror/state'
import styled from '@emotion/styled'

import useCodemirror, { getTheme } from '../../../../useCodemirror'
import TabsBar from '../tabs-bar/TabsBar'
import StatusBar from '/@/features/editor/components/status-bar/StatusBar'

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

interface Props {
  document: string
  onUpdate: (doc: string) => void
}

const Editor = ({ document, onUpdate }: Props, ref) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const themeRef = React.useRef(theme)

  React.useEffect(() => {
    themeRef.current = theme
  }, [theme])

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
        (update) => {
          // fileStateMapRef.current[filename] = update.state
          onUpdate(update.state.doc.toString())
        },
      )

      const state = codemirror.state.EditorState.create({
        doc: document,
        extensions: [extensions, updateListener],
      })

      editor.view.setState(state)
    })

    return () => {
      didCancel = true
    }
  }, [editor, document])

  return (
    <EditorWrapper>
      <TabsBar />

      <div style={{ display: 'flex', flex: 1, minHeight: '0px' }}>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div className="codemirror-container" ref={editorRef} />
        </div>
      </div>

      <StatusBar />
    </EditorWrapper>
  )
}

export default forwardRef(Editor)
