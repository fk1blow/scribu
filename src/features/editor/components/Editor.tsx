import { redo } from '@codemirror/history'
import { EditorState } from '@codemirror/state'
import { ViewUpdate } from '@codemirror/view'
import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useCodemirror, { getTheme } from '../hooks/useCodemirror'

const EditorWrapper = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: stretch;
  width: 100vw;
  height: 100%;
  overflow: hidden;

  .cm-scroller {
    flex: 1 1;
  }

  .cm-content {
    max-width: 900px;
    margin: 0 auto;
    /*
      fixes a bug in cm that scroll the content when there is overflow
      and the user selects some text(or simply clicks on the editor)
      that resides on the bottom of the editor
     */
    padding: 0;
  }

  .cm-editor {
    height: 100%;
  }

  .codemirror-container {
    flex-grow: 1;
  }

  .simplebar-track.simplebar-vertical {
    width: 14px;
  }

  .simplebar-content {
    display: flex;
    min-height: 100%;
    flex: 1 1;
  }

  .simplebar-content-wrapper {
    height: 100% !important;
  }

  .simplebar-scrollbar::before {
    border-radius: 2px;
    background-image: linear-gradient(-131deg, #c3a55f 0%, #9c8348 100%);
  }
`

interface Props {
  document: string
  onUpdate: (doc: string) => void
}

const Editor: React.FC<Props> = ({ onUpdate, document }: Props) => {
  const [editor, editorRef] = useCodemirror()
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'gray'>('light')
  const themeRef = React.useRef(theme)

  const fileStateMapRef = React.useRef<Record<string, EditorState>>({})

  useEffect(() => {
    if (!editorRef || !editor) return
  }, [editorRef, editor])

  useHotkeys(
    'ctrl+shift+Z',
    () => {
      editor && redo(editor.view)
    },
    [editor],
  )

  React.useEffect(() => {
    if (!editor) {
      return
    }

    editor.setTheme(getTheme(editor.codemirror, theme))
  }, [editor, theme])

  // bootstrap codemirror
  useEffect(() => {
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
      <div className="codemirror-container" ref={editorRef} />
    </EditorWrapper>
  )
}

export default Editor
